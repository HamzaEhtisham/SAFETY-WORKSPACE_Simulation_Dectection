"""URL feature extraction and ML/DL/RL phishing-risk ensemble.

Runtime models are deliberately loaded from local artifacts.  This keeps
training data and retraining separate from the web application and avoids
claiming that a rule-only score is a trained classifier.
"""

from __future__ import annotations

import math
import json
import re
from pathlib import Path
from urllib.parse import urlparse

try:
    import joblib
except ImportError:  # The API remains usable until optional ML dependencies are installed.
    joblib = None


ARTIFACT_DIR = Path(__file__).parent / "model_artifacts"
SUSPICIOUS_TLDS = {"click", "country", "gq", "link", "live", "monster", "rest", "top", "work", "zip"}
SUSPICIOUS_WORDS = {"account", "bank", "confirm", "invoice", "login", "password", "recovery", "secure", "signin", "update", "verify", "wallet"}
FEATURE_NAMES = (
    "uses_http", "has_ip_host", "has_punycode", "has_at_symbol", "url_length",
    "host_length", "subdomain_count", "hyphen_count", "digit_ratio",
    "suspicious_tld", "suspicious_word_count", "query_length", "encoded_count",
)
RUNTIME_FEATURE_NAMES = (
    "length_url", "length_hostname", "ip", "nb_dots", "nb_hyphens", "nb_at",
    "nb_qm", "nb_and", "nb_or", "nb_eq", "nb_underscore", "nb_percent",
    "nb_slash", "nb_www", "nb_com", "nb_dslash", "http_in_path", "https_token",
    "ratio_digits_url", "ratio_digits_host", "punycode", "port",
)


def normalise_url(value: str) -> str:
    value = value.strip()
    if not value:
        raise ValueError("A URL is required.")
    url = value if re.match(r"^https?://", value, re.I) else f"https://{value}"
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise ValueError("Enter a valid HTTP or HTTPS URL.")
    return url


def extract_features(value: str) -> tuple[str, str, list[float], list[dict]]:
    url = normalise_url(value)
    parsed = urlparse(url)
    hostname = (parsed.hostname or "").lower()
    path_query = f"{parsed.path}?{parsed.query}".lower()
    all_text = f"{hostname}{path_query}"
    labels = [part for part in hostname.split(".") if part and part != "www"]
    matched_words = sorted(word for word in SUSPICIOUS_WORDS if word in all_text)
    encoded_count = len(re.findall(r"%[0-9a-fA-F]{2}", url))
    digits = sum(char.isdigit() for char in hostname)
    is_ip = bool(re.fullmatch(r"(?:\d{1,3}\.){3}\d{1,3}", hostname))
    tld = labels[-1] if labels else ""
    features = [
        float(parsed.scheme == "http"), float(is_ip), float("xn--" in hostname),
        float("@" in value), min(len(url) / 180, 1), min(len(hostname) / 80, 1),
        min(max(len(labels) - 2, 0) / 5, 1), min(hostname.count("-") / 6, 1),
        digits / max(len(hostname), 1), float(tld in SUSPICIOUS_TLDS),
        min(len(matched_words) / 4, 1), min(len(parsed.query) / 120, 1), min(encoded_count / 5, 1),
    ]
    findings = []
    for condition, label, detail in (
        (parsed.scheme == "http", "No HTTPS encryption", "The URL uses HTTP instead of HTTPS."),
        (is_ip, "Direct IP address", "A numeric IP can hide the organisation behind a link."),
        ("xn--" in hostname, "Encoded domain name", "Punycode can visually imitate a familiar domain."),
        ("@" in value, "Misleading @ symbol", "Text before @ can disguise the final destination."),
        (tld in SUSPICIOUS_TLDS, "High-risk domain ending", f".{tld} is on this app's watch list."),
    ):
        if condition:
            findings.append({"label": label, "detail": detail})
    if matched_words:
        findings.append({"label": "Sensitive-action language", "detail": f"Contains: {', '.join(matched_words[:4])}."})
    return url, hostname, features, findings


def runtime_features(value: str) -> list[float]:
    """Features that can be computed safely from a URL without visiting it."""
    url = normalise_url(value)
    parsed = urlparse(url)
    hostname = (parsed.hostname or "").lower()
    is_ip = bool(re.fullmatch(r"(?:\d{1,3}\.){3}\d{1,3}", hostname))
    host_digits = sum(char.isdigit() for char in hostname)
    url_digits = sum(char.isdigit() for char in url)
    port = float(parsed.port is not None) if parsed.port else 0.0
    after_scheme = re.sub(r"^https?://", "", url, flags=re.I)
    return [
        len(url), len(hostname), float(is_ip), url.count("."), url.count("-"), url.count("@"),
        url.count("?"), url.count("&"), url.count("|"), url.count("="), url.count("_"), url.count("%"),
        url.count("/"), url.lower().count("www"), url.lower().count(".com"), after_scheme.count("//"),
        float("http" in (parsed.path + "?" + parsed.query).lower()),
        float("https" in after_scheme.lower()), url_digits / max(len(url), 1),
        host_digits / max(len(hostname), 1), float("xn--" in hostname), port,
    ]


def _fallback_probability(features: list[float]) -> float:
    # Conservative fallback used only until train_models.py has produced artifacts.
    weights = [1.1, 1.5, 1.6, 1.2, .7, .4, .7, .5, .8, 1.0, 1.1, .2, .4]
    logit = -2.15 + sum(weight * feature for weight, feature in zip(weights, features))
    return 1 / (1 + math.exp(-logit))


def _predict_artifact(filename: str, features: list[float]) -> float | None:
    if not joblib:
        return None
    file_path = ARTIFACT_DIR / filename
    if not file_path.exists():
        return None
    model = joblib.load(file_path)
    return float(model.predict_proba([features])[0][1])


def analyse_url(value: str) -> dict:
    url, hostname, features, findings = extract_features(value)
    url_features = runtime_features(value)
    ml = _predict_artifact("url_ml.joblib", url_features) or _predict_artifact("ml_logistic.joblib", features)
    dl = _predict_artifact("url_dl.joblib", url_features) or _predict_artifact("dl_mlp.joblib", features)
    fallback = _fallback_probability(features)
    ml = fallback if ml is None else ml
    dl = fallback if dl is None else dl

    # A trained tabular Q-policy selects the operational action for risk bands.
    # If not trained yet, this uses calibrated Q-values rather than overriding model evidence.
    risk_state = min(4, int(((ml + dl) / 2) * 5))
    q_policy = {0: [0.92, 0.08, 0.01], 1: [0.72, 0.34, 0.05], 2: [0.30, 0.76, 0.25], 3: [0.08, 0.61, 0.94], 4: [0.01, 0.38, 0.99]}
    policy_file = ARTIFACT_DIR / "rl_q_policy.json"
    if policy_file.exists():
        with policy_file.open(encoding="utf-8") as policy_data:
            q_policy = {int(state): values for state, values in json.load(policy_data).items()}
    actions = ("allow", "review", "block")
    q_values = q_policy[risk_state]
    action = actions[q_values.index(max(q_values))]
    rl_probability = {"allow": 0.10, "review": 0.55, "block": 0.94}[action]
    probability = 0.45 * ml + 0.45 * dl + 0.10 * rl_probability
    score = round(probability * 100)
    level = "High risk" if score >= 65 else "Use caution" if score >= 35 else "Low risk"
    trained = (ARTIFACT_DIR / "url_ml.joblib").exists() and (ARTIFACT_DIR / "url_dl.joblib").exists()

    return {
        "url": url, "hostname": hostname, "score": score, "level": level,
        "summary": "Avoid opening this link or entering credentials until you verify it independently." if score >= 65 else "Verify the sender and use an official bookmark before sharing credentials." if score >= 35 else "No major indicators were found. A low score is not a safety guarantee.",
        "findings": findings,
        "models": {
            "ml": {"name": "Logistic Regression", "risk": round(ml * 100)},
            "dl": {"name": "MLP Neural Network", "risk": round(dl * 100)},
            "rl": {"name": "Q-policy", "action": action, "risk": round(rl_probability * 100)},
        },
        "model_status": "trained" if trained else "fallback_pending_training",
    }


def learn_from_feedback(value: str, label: int) -> bool:
    """Apply one trusted, labelled feedback item to the DL and RL online models."""
    if label not in (0, 1) or not joblib:
        return False
    model_file = ARTIFACT_DIR / "url_dl.joblib"
    if not model_file.exists():
        return False
    try:
        features = runtime_features(value)
        model = joblib.load(model_file)
        # ``partial_fit`` cannot run with early stopping enabled.  Older saved
        # artifacts were trained with it enabled, so make those artifacts safe
        # for online feedback before updating them.
        if getattr(model, "early_stopping", False):
            model.set_params(early_stopping=False)
            # Models trained with early stopping do not retain ``best_loss_``;
            # scikit-learn expects it when incremental training is later enabled.
            loss_curve = getattr(model, "loss_curve_", [])
            model.best_loss_ = min(loss_curve) if loss_curve else float("inf")
        model.partial_fit([features], [label])
        joblib.dump(model, model_file)
    except Exception as error:
        # A feedback submission must never fail just because online learning
        # cannot update a legacy or incompatible model artifact.
        print(f"Online feedback update skipped: {error}")
        return False

    policy_file = ARTIFACT_DIR / "rl_q_policy.json"
    if policy_file.exists():
        with policy_file.open(encoding="utf-8") as input_file:
            policy = {int(state): values for state, values in json.load(input_file).items()}
        probability = float(model.predict_proba([features])[0][1])
        state = min(4, int(probability * 5))
        actions = ("allow", "review", "block")
        q_values = policy[state]
        action_index = q_values.index(max(q_values))
        reward = (1.0, -0.2, -1.0)[action_index] if label == 0 else (-3.0, 0.6, 2.0)[action_index]
        q_values[action_index] = round(q_values[action_index] + 0.12 * (reward - q_values[action_index]), 4)
        with policy_file.open("w", encoding="utf-8") as output_file:
            json.dump(policy, output_file)
    return True
