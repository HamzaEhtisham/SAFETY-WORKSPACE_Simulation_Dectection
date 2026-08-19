import os
import bcrypt
from pymongo import MongoClient
from dotenv import load_dotenv
from urllib.parse import urlsplit, urlunsplit

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
mongo_dbname = os.getenv("MONGO_DBNAME", "safety_workspace")
if mongo_uri and not urlsplit(mongo_uri).path.strip("/"):
    parsed_mongo_uri = urlsplit(mongo_uri)
    mongo_uri = urlunsplit(parsed_mongo_uri._replace(path=f"/{mongo_dbname}"))
client = MongoClient(mongo_uri)
db = client[mongo_dbname]
users_collection = db.users

def reset_admin(username="admin", password="admin123", email="admin@example.com"):
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    result = users_collection.update_one(
        {"username": username},
        {
            "$set": {
                "email": email,
                "password": hashed_password,
                "role": "admin",
            },
            "$setOnInsert": {"username": username},
        },
        upsert=True,
    )
    action = "created" if result.upserted_id else "updated"
    print(f"Admin account {action}: {username}")
    print("Login: admin")
    print("Password: admin123")

if __name__ == "__main__":
    reset_admin()
