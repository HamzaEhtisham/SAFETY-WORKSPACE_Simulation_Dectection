"""Train one URL model from both the Parquet and CSV phishing datasets."""
import argparse
import json

import joblib
import pandas as pd
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

from detector import ARTIFACT_DIR, KAGGLE_FEATURE_NAMES, SHORTENING_SERVICES, SUSPICIOUS_WORDS


def extract_features(urls):
    urls = urls.astype(str).str.strip()
    normalised = urls.where(urls.str.match(r"^https?://", case=False), "https://" + urls)
    lower = normalised.str.lower()
    hosts = lower.str.extract(r"^https?://([^/:?#]+)", expand=False).fillna("")
    return pd.DataFrame({
        "url_length": normalised.str.len(), "at_count": normalised.str.count("@"), "question_count": normalised.str.count(r"\?"),
        "hyphen_count": normalised.str.count("-"), "equals_count": normalised.str.count("="), "dot_count": normalised.str.count(r"\."),
        "hash_count": normalised.str.count("#"), "percent_count": normalised.str.count("%"), "plus_count": normalised.str.count(r"\+"),
        "dollar_count": normalised.str.count(r"\$"), "bang_count": normalised.str.count("!"), "star_count": normalised.str.count(r"\*"),
        "comma_count": normalised.str.count(","), "double_slash_count": normalised.str.replace(r"^https?://", "", regex=True).str.count("//"),
        "uses_https": lower.str.startswith("https://").astype(int), "digit_count": normalised.str.count(r"\d"),
        "letter_count": normalised.str.count(r"[A-Za-z]"), "shortening_service": hosts.str.contains(SHORTENING_SERVICES, na=False).astype(int),
        "ip_address": hosts.str.fullmatch(r"(?:\d{1,3}\.){3}\d{1,3}").fillna(False).astype(int),
        "suspicious_word_count": sum(lower.str.contains(word, regex=False).astype(int) for word in SUSPICIOUS_WORDS),
    }).loc[:, KAGGLE_FEATURE_NAMES]


def load_url_labels(path, label_column, malicious):
    frame = pd.read_csv(path, usecols=["url", label_column]).dropna()
    labels = malicious(frame[label_column])
    return extract_features(frame["url"]), labels.astype(int)


def main():
    parser = argparse.ArgumentParser(description="Train one model from both phishing datasets")
    parser.add_argument("malicious_csv")
    args = parser.parse_args()

    x, y = load_url_labels(args.malicious_csv, "type", lambda labels: labels.str.lower() != "benign")
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, stratify=y, random_state=42)

    ARTIFACT_DIR.mkdir(exist_ok=True)
    model = ExtraTreesClassifier(n_estimators=250, min_samples_leaf=2, class_weight="balanced", n_jobs=-1, random_state=42)
    model.fit(x_train, y_train)
    joblib.dump(model, ARTIFACT_DIR / "url_ml.joblib")
    metrics = {
        "model": "Unified Extra Trees Classifier",
        "training_rows": int(len(x_train)),
        "testing_rows": int(len(x_test)),
        "features": list(KAGGLE_FEATURE_NAMES),
        "accuracy": round(float(accuracy_score(y_test, model.predict(x_test))), 4),
        "report": classification_report(y_test, model.predict(x_test), target_names=["legitimate", "malicious"], output_dict=True),
    }
    with (ARTIFACT_DIR / "url_model_metrics.json").open("w", encoding="utf-8") as output:
        json.dump(metrics, output, indent=2)
    print(json.dumps(metrics, indent=2))


if __name__ == "__main__":
    main()
