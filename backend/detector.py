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

import pandas as pd
from reputation import lookup_url
from ollama_review import review_disagreement
from verified_feedback import queue_verified_label

try:
    import joblib
except ImportError:  # The API remains usable until optional ML dependencies are installed.
    joblib = None


ARTIFACT_DIR = Path(__file__).parent / "model_artifacts"
_MODEL_CACHE = None
_MODEL_CACHE_MTIME = None
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
CSV_FEATURE_NAMES = (
    "url_length", "valid_url", "at_symbol", "sensitive_words_count", "path_length",
    "isHttps", "nb_dots", "nb_hyphens", "nb_and", "nb_or", "nb_www", "nb_com",
    "nb_underscore",
)
UNIFIED_FEATURE_NAMES = (
    "length_url", "nb_at", "nb_dots", "nb_hyphens", "nb_and", "nb_or",
    "nb_www", "nb_com", "nb_underscore",
)
KAGGLE_FEATURE_NAMES = (
    "url_length", "at_count", "question_count", "hyphen_count", "equals_count", "dot_count",
    "hash_count", "percent_count", "plus_count", "dollar_count", "bang_count", "star_count",
    "comma_count", "double_slash_count", "uses_https", "digit_count", "letter_count",
    "shortening_service", "ip_address", "suspicious_word_count",
)
SHORTENING_SERVICES = re.compile(
    r"bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|"
    r"tiny\.cc|bit\.do|lnkd\.in|db\.tt|adf\.ly|po\.st|j\.mp|cutt\.us|v\.gd|qr\.net",
    re.I,
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


def csv_runtime_features(value: str) -> list[float]:
    """Recreate the features used by the supplementary CSV URL dataset."""
    url = normalise_url(value)
    parsed = urlparse(url)
    text = f"{(parsed.hostname or '').lower()}{parsed.path.lower()}?{parsed.query.lower()}"
    return [
        len(url), 1.0, float("@" in url),
        float(sum(word in text for word in SUSPICIOUS_WORDS)), len(parsed.path),
        float(parsed.scheme == "https"), url.count("."), url.count("-"), url.count("&"),
        url.count("|"), url.lower().count("www"), url.lower().count(".com"), url.count("_"),
    ]


def unified_runtime_features(value: str) -> list[float]:
    """Features shared by both supplied phishing datasets."""
    features = runtime_features(value)
    return [features[index] for index in (0, 5, 3, 4, 7, 8, 13, 14, 10)]


def kaggle_runtime_features(value: str) -> list[float]:
    """Static URL signals based on the pulled Kaggle notebook's feature set."""
    url = normalise_url(value)
    parsed = urlparse(url)
    hostname = (parsed.hostname or "").lower()
    text = f"{hostname}{parsed.path.lower()}?{parsed.query.lower()}"
    is_ip = bool(re.fullmatch(r"(?:\d{1,3}\.){3}\d{1,3}", hostname))
    return [
        len(url), url.count("@"), url.count("?"), url.count("-"), url.count("="), url.count("."),
        url.count("#"), url.count("%"), url.count("+"), url.count("$"), url.count("!"), url.count("*"),
        url.count(","), url.replace("https://", "", 1).replace("http://", "", 1).count("//"),
        float(parsed.scheme == "https"), sum(char.isdigit() for char in url), sum(char.isalpha() for char in url),
        float(bool(SHORTENING_SERVICES.search(hostname))), float(is_ip),
        float(sum(word in text for word in SUSPICIOUS_WORDS)),
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
    model = _load_model(file_path)
    if isinstance(model, dict):
        return float(sum(_predict_probability(item, features) for item in model.values()) / len(model))
    return _predict_probability(model, features)


def _load_model(file_path: Path):
    """Load the large ensemble once and reload only after a new training artifact is saved."""
    global _MODEL_CACHE, _MODEL_CACHE_MTIME
    modified = file_path.stat().st_mtime_ns
    if _MODEL_CACHE is None or _MODEL_CACHE_MTIME != modified:
        _MODEL_CACHE = joblib.load(file_path)
        _MODEL_CACHE_MTIME = modified
    return _MODEL_CACHE


def warm_model_cache() -> bool:
    """Load trained artifacts during backend startup instead of the first user scan."""
    if not joblib:
        return False
    file_path = ARTIFACT_DIR / "url_ml.joblib"
    if not file_path.exists():
        return False
    _load_model(file_path)
    return True


def _predict_probability(model, features: list[float]) -> float:
    """Preserve training feature names so scikit-learn can validate inference input."""
    feature_names = getattr(model, "feature_names_in_", None)
    model_input = pd.DataFrame([features], columns=feature_names) if feature_names is not None else [features]
    return float(model.predict_proba(model_input)[0][1])


def _ensemble_risks(features: list[float]) -> dict[str, int] | None:
    if not joblib:
        return None
    file_path = ARTIFACT_DIR / "url_ml.joblib"
    if not file_path.exists():
        return None
    model = _load_model(file_path)
    if not isinstance(model, dict):
        return None
    return {name: round(_predict_probability(item, features) * 100) for name, item in model.items()}


def analyse_url(value: str) -> dict:
    url, hostname, features, findings = extract_features(value)
    kaggle_features = kaggle_runtime_features(value)
    unified = _predict_artifact("url_ml.joblib", kaggle_features) or _predict_artifact("ml_logistic.joblib", features)
    ensemble_risks = _ensemble_risks(kaggle_features)
    fallback = _fallback_probability(features)
    ml_probability = fallback if unified is None else unified
    probability = ml_probability
    reputation = lookup_url(url)
    llm_review = None
    if reputation["known_threat"]:
        ml_risk = round(ml_probability * 100)
        # A source-confirmed reputation verdict is safe training evidence; the LLM only explains the disagreement.
        if ml_risk < 65:
            queue_verified_label(url, 1, reputation["sources"], ml_risk)
            llm_review = review_disagreement(url, ml_risk, json.dumps(reputation, sort_keys=True))
        probability = max(probability, 0.99)
        findings.append({"label": "Known malicious URL", "detail": "A configured threat-intelligence source reported this URL."})
    elif reputation.get("domain_age_days") is not None and reputation["domain_age_days"] < 30:
        probability = min(1.0, probability + 0.06)
        findings.append({"label": "Newly registered domain", "detail": f"Domain age is about {reputation['domain_age_days']} days."})
    elif reputation.get("dns_resolves") is False:
        probability = min(1.0, probability + 0.04)
        findings.append({"label": "Domain did not resolve", "detail": "DNS lookup failed when this scan ran."})
    score = round(probability * 100)
    level = "High risk" if score >= 65 else "Use caution" if score >= 35 else "Low risk"
    trained = (ARTIFACT_DIR / "url_ml.joblib").exists()

    return {
        "url": url, "hostname": hostname, "score": score, "level": level,
        "summary": "Avoid opening this link or entering credentials until you verify it independently." if score >= 65 else "Verify the sender and use an official bookmark before sharing credentials." if score >= 35 else "No major indicators were found. A low score is not a safety guarantee.",
        "findings": findings,
        "models": {
            "decision_tree": {"name": "Decision Tree Classifier", "risk": ensemble_risks["Decision Tree"]} if ensemble_risks else None,
            "random_forest": {"name": "Random Forest Classifier", "risk": ensemble_risks["Random Forest"]} if ensemble_risks else None,
            "extra_trees": {"name": "Extra Trees Classifier", "risk": ensemble_risks["Extra Trees"]} if ensemble_risks else None,
            "ml": {"name": "Three-Model Ensemble", "risk": round(probability * 100)},
        },
        "reputation": reputation,
        "llm_review": llm_review,
        "model_status": "trained" if trained else "fallback_pending_training",
    }


def learn_from_feedback(value: str, label: int) -> bool:
    """Online updates are disabled; retrain the single model with verified data."""
    return False
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
