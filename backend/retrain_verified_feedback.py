"""Rebuild the deployed three-model ensemble from base data plus verified reputation feedback."""
import argparse
import json
from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import ExtraTreesClassifier, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

from detector import ARTIFACT_DIR
from train_unified_url_model import extract_features
from verified_feedback import QUEUE_FILE


BASE_DATASET = Path(r"C:\Users\hp\Desktop\archive (3)\malicious_phish.csv")


def main():
    parser = argparse.ArgumentParser(description="Retrain only after enough reputation-verified feedback is available")
    parser.add_argument("--min-feedback", type=int, default=100)
    args = parser.parse_args()
    if not QUEUE_FILE.exists():
        raise SystemExit("No verified feedback has been queued yet.")
    feedback = pd.read_json(QUEUE_FILE, lines=True).drop_duplicates("url", keep="last")
    if len(feedback) < args.min_feedback:
        raise SystemExit(f"Queued {len(feedback)} verified labels; need {args.min_feedback} before retraining.")
    base = pd.read_csv(BASE_DATASET, usecols=["url", "type"]).dropna()
    base_x, base_y = extract_features(base["url"]), (base["type"].str.lower() != "benign").astype(int)
    feedback_x, feedback_y = extract_features(feedback["url"]), feedback["label"].astype(int)
    x_train, x_test, y_train, y_test = train_test_split(base_x, base_y, test_size=0.2, stratify=base_y, random_state=42)
    x_train = pd.concat([x_train, feedback_x], ignore_index=True)
    y_train = pd.concat([y_train, feedback_y], ignore_index=True)
    models = {
        "Decision Tree": DecisionTreeClassifier(class_weight="balanced", random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=150, min_samples_leaf=2, class_weight="balanced", n_jobs=-1, random_state=42),
        "Extra Trees": ExtraTreesClassifier(n_estimators=250, min_samples_leaf=2, class_weight="balanced", n_jobs=-1, random_state=42),
    }
    for model in models.values():
        model.fit(x_train, y_train)
    ARTIFACT_DIR.mkdir(exist_ok=True)
    joblib.dump(models, ARTIFACT_DIR / "url_ml.joblib")
    print(json.dumps({"status": "retrained", "verified_feedback_rows": int(len(feedback)), "training_rows": int(len(x_train))}))


if __name__ == "__main__":
    main()
