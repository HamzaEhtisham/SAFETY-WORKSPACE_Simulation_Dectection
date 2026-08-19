"""Train URL classifiers from a CSV containing `url,label` (0=benign, 1=phishing)."""
import argparse
import json
from pathlib import Path

import joblib
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier

from detector import ARTIFACT_DIR, _fallback_probability, extract_features


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("dataset", help="CSV with url and label columns")
    args = parser.parse_args()
    data = pd.read_csv(args.dataset).dropna(subset=["url", "label"])
    rows, labels = [], []
    for row in data.itertuples(index=False):
        try:
            rows.append(extract_features(str(row.url))[2])
            labels.append(int(row.label))
        except ValueError:
            continue
    if len(set(labels)) < 2:
        raise ValueError("Dataset must contain both benign (0) and phishing (1) labels.")
    ARTIFACT_DIR.mkdir(exist_ok=True)
    joblib.dump(LogisticRegression(max_iter=1500, class_weight="balanced").fit(rows, labels), ARTIFACT_DIR / "ml_logistic.joblib")
    # Keep artifacts compatible with incremental learning from user feedback.
    joblib.dump(MLPClassifier(hidden_layer_sizes=(32, 16), max_iter=800, early_stopping=False, random_state=42).fit(rows, labels), ARTIFACT_DIR / "dl_mlp.joblib")
    # Learn a tabular Q-policy: allow/review/block rewards conditioned on risk state.
    # Wrongly allowing phishing is penalised most heavily.
    rewards = {0: (1.0, -0.2, -1.0), 1: (-3.0, 0.6, 2.0)}
    policy = {}
    for state in range(5):
        state_labels = [label for features, label in zip(rows, labels) if min(4, int(_fallback_probability(features) * 5)) == state]
        source = state_labels or labels
        policy[state] = [round(sum(rewards[label][action] for label in source) / len(source), 4) for action in range(3)]
    with (ARTIFACT_DIR / "rl_q_policy.json").open("w", encoding="utf-8") as policy_file:
        json.dump(policy, policy_file)
    print(f"Saved trained ML, DL, and RL artifacts to {Path(ARTIFACT_DIR).resolve()}")


if __name__ == "__main__":
    main()
