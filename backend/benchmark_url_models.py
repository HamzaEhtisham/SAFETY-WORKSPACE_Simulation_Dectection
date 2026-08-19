"""Benchmark the seven classifiers used by the pulled Kaggle URL notebook."""
import json
from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import AdaBoostClassifier, ExtraTreesClassifier, RandomForestClassifier
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import accuracy_score, classification_report, recall_score
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier

from detector import ARTIFACT_DIR
from train_unified_url_model import extract_features

DATASET = Path(r"C:\Users\hp\Desktop\archive (3)\malicious_phish.csv")


def main():
    data = pd.read_csv(DATASET, usecols=["url", "type"]).dropna()
    x = extract_features(data["url"])
    y = (data["type"].str.lower() != "benign").astype(int)
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.2, stratify=y, random_state=42
    )
    # KNN has high prediction cost on 130k test rows; a reproducible representative subset is used.
    knn_train = x_train.sample(n=min(100_000, len(x_train)), random_state=42)
    knn_labels = y_train.loc[knn_train.index]
    candidates = {
        "Decision Tree": (DecisionTreeClassifier(class_weight="balanced", random_state=42), x_train, y_train),
        "Random Forest": (RandomForestClassifier(n_estimators=150, min_samples_leaf=2, class_weight="balanced", n_jobs=-1, random_state=42), x_train, y_train),
        "AdaBoost": (AdaBoostClassifier(n_estimators=150, random_state=42), x_train, y_train),
        "KNeighbors": (make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=7, n_jobs=-1)), knn_train, knn_labels),
        "SGD": (make_pipeline(StandardScaler(), SGDClassifier(loss="log_loss", class_weight="balanced", max_iter=2000, random_state=42)), x_train, y_train),
        "Extra Trees": (ExtraTreesClassifier(n_estimators=250, min_samples_leaf=2, class_weight="balanced", n_jobs=-1, random_state=42), x_train, y_train),
        "Gaussian NB": (GaussianNB(), x_train, y_train),
    }
    results, trained = [], {}
    for name, (model, fit_x, fit_y) in candidates.items():
        model.fit(fit_x, fit_y)
        prediction = model.predict(x_test)
        result = {
            "model": name,
            "accuracy": round(float(accuracy_score(y_test, prediction)), 4),
            "malicious_recall": round(float(recall_score(y_test, prediction)), 4),
            "fit_rows": int(len(fit_x)),
        }
        results.append(result)
        trained[name] = model
        print(json.dumps(result))
    # Deploy the user's selected three-model ensemble; its final probability is the mean.
    ensemble_names = ("Decision Tree", "Random Forest", "Extra Trees")
    ensemble = {name: trained[name] for name in ensemble_names}
    ensemble_probability = sum(model.predict_proba(x_test)[:, 1] for model in ensemble.values()) / len(ensemble)
    ensemble_prediction = (ensemble_probability >= 0.5).astype(int)
    ensemble_result = {
        "model": "Decision Tree + Random Forest + Extra Trees Ensemble",
        "accuracy": round(float(accuracy_score(y_test, ensemble_prediction)), 4),
        "malicious_recall": round(float(recall_score(y_test, ensemble_prediction)), 4),
        "fit_rows": int(len(x_train)),
    }
    joblib.dump(ensemble, ARTIFACT_DIR / "url_ml.joblib")
    report = {"ensemble": ensemble_result, "benchmarks": results}
    with (ARTIFACT_DIR / "url_model_metrics.json").open("w", encoding="utf-8") as output:
        json.dump(report, output, indent=2)
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
