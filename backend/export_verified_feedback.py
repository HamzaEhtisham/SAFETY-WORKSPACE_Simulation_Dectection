"""Export admin-verified URL feedback for use with train_url_models.py."""
import csv
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()
client = MongoClient(os.environ["MONGO_URI"])
rows = client.get_default_database().detection_feedback.find({"status": "verified"}, {"_id": 0, "url": 1, "label": 1})
output = Path("model_artifacts/verified_feedback.csv")
output.parent.mkdir(exist_ok=True)
with output.open("w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["url", "label"])
    writer.writeheader()
    writer.writerows(rows)
print(output.resolve())
