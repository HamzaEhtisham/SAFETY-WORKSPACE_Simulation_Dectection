"""Local Ollama review for high-confidence reputation/ML disagreements."""
from __future__ import annotations

import json
import os
from functools import lru_cache

import requests


def _enabled() -> bool:
    return os.getenv("OLLAMA_REVIEW_ENABLED", "false").lower() in {"1", "true", "yes"}


@lru_cache(maxsize=512)
def review_disagreement(url: str, ml_risk: int, reputation_json: str) -> dict | None:
    """Ask a local model for a short explanation, never for a training label."""
    if not _enabled():
        return None
    reputation = json.loads(reputation_json)
    prompt = (
        "You are a cybersecurity analyst. Explain this disagreement in 2 short sentences. "
        "Do not claim to have browsed the URL and do not invent evidence. A live reputation verdict is the "
        "authoritative label; the ML score is only a static URL-feature estimate. "
        f"URL: {url}\nML phishing risk: {ml_risk}%\nLive reputation: {json.dumps(reputation)}"
    )
    try:
        response = requests.post(
            os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434") + "/api/generate",
            json={
                "model": os.getenv("OLLAMA_MODEL", "qwen2.5-coder:14b"),
                "prompt": prompt, "stream": False, "keep_alive": "5m",
                "options": {"temperature": 0.1, "num_predict": 100},
            },
            timeout=float(os.getenv("OLLAMA_TIMEOUT_SECONDS", "45")),
        )
        if not response.ok:
            return {"available": False, "error": "Local Ollama review failed."}
        return {"available": True, "model": response.json().get("model"), "summary": response.json().get("response", "").strip()}
    except (requests.RequestException, ValueError):
        return {"available": False, "error": "Local Ollama is unavailable."}
