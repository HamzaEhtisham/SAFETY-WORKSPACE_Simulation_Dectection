"""Queue reputation-verified labels for controlled batch retraining."""
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path


QUEUE_FILE = Path(__file__).parent / "model_artifacts" / "verified_reputation_feedback.jsonl"


def queue_verified_label(url: str, label: int, sources: list[str], ml_risk: int) -> None:
    """Persist only high-confidence third-party reputation evidence, never LLM guesses."""
    QUEUE_FILE.parent.mkdir(exist_ok=True)
    record = {
        "url": url, "label": label, "sources": sources, "ml_risk": ml_risk,
        "queued_at": datetime.now(timezone.utc).isoformat(),
    }
    with QUEUE_FILE.open("a", encoding="utf-8") as output:
        output.write(json.dumps(record) + "\n")
