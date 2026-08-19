"""Train browser-safe URL models from the supplied Parquet phishing dataset."""
import argparse
import json

import joblib
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.neural_network import MLPClassifier

from detector import ARTIFACT_DIR, RUNTIME_FEATURE_NAMES, runtime_features


def load_dataset(path):
    frame = pd.read_parquet(path)
    missing = set(RUNTIME_FEATURE_NAMES) - set(frame.columns)
    if missing or "status" not in frame.columns:
        raise ValueError(f"Dataset is missing columns: {sorted(missing)}")
    features = frame.loc[:, RUNTIME_FEATURE_NAMES].fillna(0)
    labels = (frame["status"].str.lower() == "phishing").astype(int)
    return features, labels


def load_feedback(path):
    frame = pd.read_csv(path).dropna(subset=["url", "label"])
    if not {"url", "label"}.issubset(frame.columns):
        raise ValueError("Feedback CSV requires url,label columns")
    rows, labels = [], []
    for row in frame.itertuples(index=False):
        try:
            rows.append(runtime_features(str(row.url)))
            labels.append(int(row.label))
        except (ValueError, TypeError):
            continue
    return pd.DataFrame(rows, columns=RUNTIME_FEATURE_NAMES), pd.Series(labels)


def main():
    parser = argparse.ArgumentParser(description="Train from Training.parquet and evaluate on Testing.parquet")
    parser.add_argument("training_parquet")
    parser.add_argument("testing_parquet")
    parser.add_argument("--feedback-csv", help="Optional admin-verified url,label CSV")
    args = parser.parse_args()
    x_train, y_train = load_dataset(args.training_parquet)
    if args.feedback_csv:
        feedback_features, feedback_labels = load_feedback(args.feedback_csv)
        x_train = pd.concat([x_train, feedback_features], ignore_index=True)
        y_train = pd.concat([y_train, feedback_labels], ignore_index=True)
    x_test, y_test = load_dataset(args.testing_parquet)
    ARTIFACT_DIR.mkdir(exist_ok=True)
    # Store estimators without DataFrame column metadata; runtime supplies this fixed feature order.
    x_train_values, x_test_values = x_train.to_numpy(), x_test.to_numpy()
    ml = LogisticRegression(max_iter=2000, class_weight="balanced").fit(x_train_values, y_train)
    # Feedback uses partial_fit at runtime, which is incompatible with
    # MLPClassifier's early_stopping mode.
    dl = MLPClassifier(hidden_layer_sizes=(64, 32), max_iter=800, early_stopping=False, random_state=42).fit(x_train_values, y_train)
    joblib.dump(ml, ARTIFACT_DIR / "url_ml.joblib")
    joblib.dump(dl, ARTIFACT_DIR / "url_dl.joblib")
    # Train a small Q-policy from the same labelled examples. Actions: allow, review, block.
    # The reward makes a phishing URL that is allowed substantially more costly.
    probabilities = (ml.predict_proba(x_train_values)[:, 1] + dl.predict_proba(x_train_values)[:, 1]) / 2
    rewards = {0: (1.0, -0.2, -1.0), 1: (-3.0, 0.6, 2.0)}
    q_policy = {}
    for state in range(5):
        state_labels = [int(label) for probability, label in zip(probabilities, y_train) if min(4, int(probability * 5)) == state]
        source = state_labels or [int(label) for label in y_train]
        q_policy[state] = [round(sum(rewards[label][action] for label in source) / len(source), 4) for action in range(3)]
    with (ARTIFACT_DIR / "rl_q_policy.json").open("w", encoding="utf-8") as output:
        json.dump(q_policy, output)
    metrics = {
        "training_rows": int(len(x_train)), "testing_rows": int(len(x_test)),
        "features": list(RUNTIME_FEATURE_NAMES),
        "logistic_accuracy": round(float(accuracy_score(y_test, ml.predict(x_test_values))), 4),
        "mlp_accuracy": round(float(accuracy_score(y_test, dl.predict(x_test_values))), 4),
        "rl_policy": q_policy,
        "mlp_report": classification_report(y_test, dl.predict(x_test_values), target_names=["legitimate", "phishing"], output_dict=True),
    }
    with (ARTIFACT_DIR / "url_model_metrics.json").open("w", encoding="utf-8") as output:
        json.dump(metrics, output, indent=2)
    print(json.dumps(metrics, indent=2))


if __name__ == "__main__":
    main()
