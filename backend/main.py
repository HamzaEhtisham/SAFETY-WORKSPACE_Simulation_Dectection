from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import bcrypt
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from marshmallow import ValidationError

from models import UserSchema, QuizAttemptSchema

# Load environment variables first
load_dotenv()

app = Flask(__name__)

# Debug: Print to check if .env is loading
print("=" * 60)
print("🔍 Checking Environment Variables...")
mongo_uri = os.getenv("MONGO_URI")
secret_key = os.getenv("SECRET_KEY")

if mongo_uri:
    print(f"✅ MONGO_URI loaded: {mongo_uri[:30]}..." if len(mongo_uri) > 30 else f"✅ MONGO_URI loaded: {mongo_uri}")
else:
    print("❌ MONGO_URI not found!")
    
if secret_key:
    print(f"✅ SECRET_KEY loaded")
else:
    print("❌ SECRET_KEY not found!")
print("=" * 60)

# Configure Flask app
app.config["MONGO_URI"] = mongo_uri
app.config["SECRET_KEY"] = secret_key

# Initialize PyMongo
mongo = PyMongo(app)

# Test MongoDB connection
try:
    mongo.db.command('ping')
    print("✅ MongoDB Connected Successfully!")
    print(f"📁 Database: {mongo.db.name}")
except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")
    print("\n🔧 Troubleshooting:")
    print("1. Check if .env file exists in the same folder as main.py")
    print("2. Verify MONGO_URI has database name: ...mongodb.net/DATABASE_NAME?...")
    print("3. Check IP whitelist in MongoDB Atlas (0.0.0.0/0)")
    print("4. Verify username and password are correct")

CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}}, supports_credentials=True)

# Initialize collections
users_collection = mongo.db.users
quiz_attempts_collection = mongo.db.quiz_attempts

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

    print(f"🔍 Login attempt for: {login_identifier}")

    if not login_identifier or not password:
        return jsonify({"error": "Login identifier and password are required"}), 400

    user = users_collection.find_one({"$or": [{"username": login_identifier}, {"email": login_identifier}]})

    if not user:
        print(f"❌ User not found: {login_identifier}")
        return jsonify({"error": "Invalid credentials"}), 401
    
    print(f"✅ User found: {user['username']} with role: {user.get('role')}")

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        print(f"❌ Password mismatch for user: {user['username']}")
        return jsonify({"error": "Invalid credentials"}), 401
    
    payload = {
        "username": user["username"],
        "exp": datetime.utcnow() + timedelta(hours=24),
    }

    if user.get("role") == "admin":
        payload["admin"] = True
        print(f"👑 Admin access granted for: {user['username']}")

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
    app.run(debug=True)