from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import bcrypt
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from marshmallow import ValidationError
from bson import ObjectId
import json
from pathlib import Path

from models import UserSchema, QuizAttemptSchema
from detector import analyse_url, learn_from_feedback, warm_model_cache

# Load environment variables first
load_dotenv()

app = Flask(__name__)

# Debug: Print to check if .env is loading
print("=" * 60)
print("Checking environment variables...")
mongo_uri = os.getenv("MONGO_URI")
secret_key = os.getenv("SECRET_KEY")

if mongo_uri:
    print("MONGO_URI loaded")
else:
    print("MONGO_URI not found!")
    
if secret_key:
    print("SECRET_KEY loaded")
else:
    print("SECRET_KEY not found!")
print("=" * 60)

# Configure Flask app
app.config["MONGO_URI"] = mongo_uri
app.config["SECRET_KEY"] = secret_key

# Initialize MongoDB without preventing the URL detector from starting if Atlas is unreachable.
mongo = None
try:
    mongo = PyMongo(app)
    mongo.db.command('ping')
    print("MongoDB connected successfully!")
    print(f"Database: {mongo.db.name}")
except Exception as e:
    mongo = None
    print(f"MongoDB connection failed: {e}")
    print("Starting detector without MongoDB. Login and cloud feedback storage are unavailable until it reconnects.")

# Development frontend may be opened with either hostname; allow the bearer-token header explicitly.
CORS(
    app,
    resources={r"/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
    }},
    supports_credentials=True,
)

# Initialize collections
users_collection = mongo.db.users if mongo else None
quiz_attempts_collection = mongo.db.quiz_attempts if mongo else None
detection_feedback_collection = mongo.db.detection_feedback if mongo else None

@app.route("/detect", methods=["POST"])
def detect_url():
    data = request.get_json(silent=True) or {}
    url = data.get("url", "")
    if not isinstance(url, str):
        return jsonify({"error": "url must be a string"}), 400
    try:
        return jsonify(analyse_url(url)), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 400

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    try:
        UserSchema().load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users_collection.insert_one({"username": username, "email": email, "password": hashed_password, "role": "user"})

    return jsonify({"message": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    login_identifier = data.get("login")
    password = data.get("password")

    print(f"Login attempt for: {login_identifier}")

    if not login_identifier or not password:
        return jsonify({"error": "Login identifier and password are required"}), 400

    user = users_collection.find_one({"$or": [{"username": login_identifier}, {"email": login_identifier}]})

    if not user:
        print(f"User not found: {login_identifier}")
        return jsonify({"error": "Invalid credentials"}), 401
    
    print(f"User found: {user['username']} with role: {user.get('role')}")

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        print(f"Password mismatch for user: {user['username']}")
        return jsonify({"error": "Invalid credentials"}), 401
    
    payload = {
        "username": user["username"],
        "exp": datetime.utcnow() + timedelta(hours=24),
    }

    if user.get("role") == "admin":
        payload["admin"] = True
        print(f"Admin access granted for: {user['username']}")

    token = jwt.encode(
        payload,
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    user_data = UserSchema(exclude=["password"]).dump(user)

    return jsonify({"token": token, "user": user_data}), 200

def get_current_user():
    token = request.headers.get("Authorization")
    if not token:
        return None
    try:
        decoded = jwt.decode(token.split(" ")[1], app.config["SECRET_KEY"], algorithms=["HS256"])
        return decoded["username"]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def is_admin_request():
    token = request.headers.get("Authorization")
    if not token:
        return False
    try:
        return bool(jwt.decode(token.split(" ")[1], app.config["SECRET_KEY"], algorithms=["HS256"]).get("admin"))
    except (IndexError, jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return False

@app.route("/detect/feedback", methods=["POST"])
def save_detection_feedback():
    """Store a user label for later review/retraining; never self-train on guesses."""
    username = get_current_user()
    if not username:
        return jsonify({"error": "Sign in to submit training feedback."}), 401
    data = request.get_json(silent=True) or {}
    url, label = data.get("url", ""), data.get("label")
    if label not in (0, 1) or not isinstance(url, str):
        return jsonify({"error": "url and label (0=safe, 1=phishing) are required."}), 400
    try:
        analysis = analyse_url(url)
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    try:
        learned = learn_from_feedback(analysis["url"], label)
    except Exception as error:
        # Feedback must still be retained when an optional online-model update
        # fails (for example, a legacy MLP artifact with incompatible settings).
        print(f"Online feedback update skipped: {error}")
        learned = False
    feedback_record = {"username": username, "url": analysis["url"], "label": label,
                       "status": "trained_online" if learned else "pending_review", "submitted_at": datetime.utcnow()}
    if detection_feedback_collection is not None:
        detection_feedback_collection.update_one(
            {"username": username, "url": analysis["url"]}, {"$set": feedback_record}, upsert=True
        )
    else:
        # Keep the learning loop usable during a temporary Atlas/DNS outage.
        fallback_file = Path(__file__).parent / "model_artifacts" / "offline_feedback.jsonl"
        fallback_file.parent.mkdir(exist_ok=True)
        feedback_record["submitted_at"] = feedback_record["submitted_at"].isoformat()
        with fallback_file.open("a", encoding="utf-8") as output:
            output.write(json.dumps(feedback_record) + "\n")
    message = (
        "Feedback saved and applied to the online model."
        if learned
        else "Feedback saved for review; the online model update is currently unavailable."
    )
    return jsonify({"message": message}), 201

@app.route("/admin/detection-feedback", methods=["GET"])
def get_detection_feedback():
    if not is_admin_request():
        return jsonify({"error": "Unauthorized"}), 401
    entries = list(detection_feedback_collection.find({}, {"url": 1, "label": 1, "username": 1, "status": 1, "submitted_at": 1}).sort("submitted_at", -1))
    for entry in entries:
        entry["_id"] = str(entry["_id"])
    return jsonify(entries), 200

@app.route("/admin/detection-feedback/<string:feedback_id>", methods=["PATCH"])
def review_detection_feedback(feedback_id):
    if not is_admin_request():
        return jsonify({"error": "Unauthorized"}), 401
    status = (request.get_json(silent=True) or {}).get("status")
    if status not in {"verified", "rejected"}:
        return jsonify({"error": "status must be verified or rejected"}), 400
    try:
        updated = detection_feedback_collection.update_one({"_id": ObjectId(feedback_id)}, {"$set": {"status": status, "reviewed_at": datetime.utcnow()}})
    except Exception:
        return jsonify({"error": "Invalid feedback id"}), 400
    if not updated.matched_count:
        return jsonify({"error": "Feedback not found"}), 404
    return jsonify({"message": f"Feedback marked {status}"}), 200

@app.route("/save_quiz_attempt", methods=["POST"])
def save_quiz_attempt():
    username = get_current_user()
    if not username:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    data["username"] = username
    data["date"] = datetime.utcnow()

    try:
        QuizAttemptSchema().load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

  
    quiz_attempts_collection.insert_one(data)

    return jsonify({"message": "Quiz attempt saved successfully"}), 201

@app.route("/user_progress", methods=["GET"])
def user_progress():
    username = get_current_user()
    if not username:
        return jsonify({"error": "Unauthorized"}), 401

    attempts = list(quiz_attempts_collection.find({"username": username}, {"_id": 0}))
    schema = QuizAttemptSchema(many=True)
    result = schema.dump(attempts)
    return jsonify(result), 200




@app.route("/admin/users", methods=["GET"])
def get_all_users():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Unauthorized"}), 401
    try:
        decoded = jwt.decode(token.split(" ")[1], app.config["SECRET_KEY"], algorithms=["HS256"])
        if not decoded.get("admin"):
            return jsonify({"error": "Unauthorized"}), 401
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return jsonify({"error": "Unauthorized"}), 401

    users = list(users_collection.find({}, {"_id": 0, "password": 0}))
    schema = UserSchema(many=True, exclude=["password"])
    result = schema.dump(users)
    return jsonify(result), 200

@app.route("/admin/quiz_attempts", methods=["GET"])
def get_all_quiz_attempts():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Unauthorized"}), 401
    try:
        decoded = jwt.decode(token.split(" ")[1], app.config["SECRET_KEY"], algorithms=["HS256"])
        if not decoded.get("admin"):
            return jsonify({"error": "Unauthorized"}), 401
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return jsonify({"error": "Unauthorized"}), 401

    attempts = list(quiz_attempts_collection.find({}, {"_id": 0}))
    schema = QuizAttemptSchema(many=True)
    result = schema.dump(attempts)
    return jsonify(result), 200

@app.route("/admin/users/<string:username>", methods=["DELETE"])
def delete_user(username):
    # Check for admin privileges from JWT token
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Unauthorized"}), 401
    try:
        decoded = jwt.decode(token.split(" ")[1], app.config["SECRET_KEY"], algorithms=["HS256"])
        if not decoded.get("admin"):
            return jsonify({"error": "Unauthorized"}), 401
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return jsonify({"error": "Unauthorized"}), 401

    # Prevent deleting the main admin user
    if username == "admin":
        return jsonify({"error": "Cannot delete the primary admin account"}), 403

    # Find and delete the user
    user_to_delete = users_collection.find_one({"username": username})
    if not user_to_delete:
        return jsonify({"error": "User not found"}), 404

    # Delete the user and their quiz attempts
    users_collection.delete_one({"username": username})
    quiz_attempts_collection.delete_many({"username": username})

    return jsonify({"message": f"User '{username}' and all their quiz attempts have been deleted"}), 200

if __name__ == "__main__":
    # Avoid Windows watchdog spawning a detached child when launched from the IDE/background.
    print("Loading URL detection models...")
    warm_model_cache()
    app.run(debug=True, use_reloader=False)
