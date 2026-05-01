import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.get_database()
users_collection = db.users

def check_admin(login_id):
    user = users_collection.find_one({"$or": [{"username": login_id}, {"email": login_id}]})
    if user:
        print(f"User found: {user.get('username')} ({user.get('email')})")
        print(f"Role: {user.get('role')}")
        if user.get("role") != "admin":
            print("Promoting to admin...")
            users_collection.update_one({"_id": user["_id"]}, {"$set": {"role": "admin"}})
            print("User promoted to admin successfully.")
    else:
        print(f"User with identifier '{login_id}' not found.")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        check_admin(sys.argv[1])
    else:
        print("Please provide a username or email as an argument.")
