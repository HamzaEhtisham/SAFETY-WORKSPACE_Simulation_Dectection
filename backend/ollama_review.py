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


def chat_about_cybersecurity(messages: list[dict]) -> dict:
    """Return a concise chatbot answer from the locally running Ollama model."""
    system_message = {
        "role": "system",
        "content": (
            "You are a friendly phishing-awareness assistant. Answer only about "
            "phishing, online safety, passwords, scams, and cybersecurity. Keep "
            "answers clear, practical, and concise. Never claim you browsed a link."
        ),
    }
    try:
        response = requests.post(
            os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434") + "/api/chat",
            json={
                "model": os.getenv("OLLAMA_CHAT_MODEL", os.getenv("OLLAMA_MODEL", "qwen2.5-coder:14b")),
                "messages": [system_message, *messages[-8:]],
                "stream": False,
                "keep_alive": "5m",
                "options": {"temperature": 0.3, "num_predict": 300},
            },
            timeout=float(os.getenv("OLLAMA_TIMEOUT_SECONDS", "90")),
        )
        if not response.ok:
            return {"available": False, "error": "Local Ollama returned an error."}
        payload = response.json()
        answer = (payload.get("message") or {}).get("content", "").strip()
        if not answer:
            return {"available": False, "error": "Local Ollama returned an empty response."}
        return {"available": True, "model": payload.get("model"), "answer": answer}
    except (requests.RequestException, ValueError):
        return {"available": False, "error": "Local Ollama is unavailable. Start Ollama and make sure the configured model is installed."}
