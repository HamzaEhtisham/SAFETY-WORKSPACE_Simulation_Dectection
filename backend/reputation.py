"""Optional, privacy-aware live URL reputation and domain intelligence checks."""
from __future__ import annotations

import base64
import os
import socket
from datetime import datetime, timezone
from functools import lru_cache
from urllib.parse import urlparse

import requests


def _enabled() -> bool:
    return os.getenv("ENABLE_REPUTATION_CHECKS", "false").lower() in {"1", "true", "yes"}


@lru_cache(maxsize=2_048)
def lookup_url(url: str) -> dict:
    """Return cached network intelligence; never fail an offline detection request."""
    if not _enabled():
        return {"enabled": False, "sources": [], "known_threat": False}
    host = (urlparse(url).hostname or "").lower()
    result = {
        "enabled": True, "sources": [], "known_threat": False,
        "dns_resolves": None, "domain_age_days": None,
        "virustotal": None, "google_safe_browsing": None,
    }
    try:
        socket.getaddrinfo(host, None)
        result["dns_resolves"] = True
    except socket.gaierror:
        result["dns_resolves"] = False
    if host and not _is_ip_address(host):
        _add_domain_age(host, result)
    google_key = os.getenv("GOOGLE_SAFE_BROWSING_API_KEY")
    if google_key:
        _add_google_verdict(url, google_key, result)
    vt_key = os.getenv("VIRUSTOTAL_API_KEY")
    if vt_key:
        _add_virustotal_verdict(url, vt_key, result)
    return result


def _is_ip_address(host: str) -> bool:
    try:
        socket.inet_aton(host)
        return True
    except OSError:
        return False


def _add_domain_age(host: str, result: dict) -> None:
    try:
        response = requests.get(f"https://rdap.org/domain/{host}", timeout=2.5)
        if not response.ok:
            return
        for event in response.json().get("events", []):
            if event.get("eventAction") == "registration" and event.get("eventDate"):
                created = datetime.fromisoformat(event["eventDate"].replace("Z", "+00:00"))
                result["domain_age_days"] = max(0, (datetime.now(timezone.utc) - created).days)
                result["sources"].append("RDAP")
                return
    except (requests.RequestException, ValueError, TypeError):
        return


def _add_google_verdict(url: str, api_key: str, result: dict) -> None:
    payload = {
        "client": {"clientId": "safety-workspace", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
            "platformTypes": ["ANY_PLATFORM"], "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}],
        },
    }
    try:
        response = requests.post(
            "https://safebrowsing.googleapis.com/v4/threatMatches:find",
            params={"key": api_key}, json=payload, timeout=3,
        )
        if response.ok:
            threats = response.json().get("matches", [])
            result["google_safe_browsing"] = {"matches": len(threats), "threats": threats}
            result["known_threat"] |= bool(threats)
            result["sources"].append("Google Safe Browsing")
    except requests.RequestException:
        return


def _add_virustotal_verdict(url: str, api_key: str, result: dict) -> None:
    url_id = base64.urlsafe_b64encode(url.encode()).decode().rstrip("=")
    try:
        response = requests.get(
            f"https://www.virustotal.com/api/v3/urls/{url_id}",
            headers={"x-apikey": api_key}, timeout=3,
        )
        if not response.ok:
            return
        stats = response.json().get("data", {}).get("attributes", {}).get("last_analysis_stats", {})
        malicious, suspicious = int(stats.get("malicious", 0)), int(stats.get("suspicious", 0))
        result["virustotal"] = {"malicious": malicious, "suspicious": suspicious}
        result["known_threat"] |= malicious > 0
        result["sources"].append("VirusTotal")
    except (requests.RequestException, ValueError, TypeError):
        return
