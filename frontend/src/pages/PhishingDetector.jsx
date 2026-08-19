import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, CheckCircle2, ChevronRight, Clipboard, Info, Link2, Radar, ScanSearch, ShieldAlert, ShieldCheck } from "lucide-react";

const suspiciousTerms = [
  "account", "bank", "confirm", "invoice", "login", "password", "recovery", "secure", "signin", "update", "verify", "wallet",
];
const suspiciousTlds = ["click", "country", "gq", "link", "live", "monster", "rest", "top", "work", "zip"];

function scanLink(value) {
  const submittedValue = value.trim();
  const link = /^https?:\/\//i.test(submittedValue) ? submittedValue : `https://${submittedValue}`;
  let parsed;

  try {
    parsed = new URL(link);
  } catch {
    return { invalid: true };
  }

  const findings = [];
  const hostname = parsed.hostname.toLowerCase();
  const fullLink = `${hostname}${parsed.pathname}${parsed.search}`.toLowerCase();
  let score = 0;

  const addFinding = (label, detail, points) => {
    findings.push({ label, detail, points });
    score += points;
  };

  if (parsed.protocol !== "https:") {
    addFinding("No HTTPS encryption", "This link does not use a secure HTTPS connection.", 18);
  }
  if (hostname.includes("xn--")) {
    addFinding("Encoded domain name", "Punycode can be used to imitate familiar-looking domains.", 28);
  }
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
    addFinding("Direct IP address", "Legitimate public services normally use a recognizable domain name.", 25);
  }
  if (submittedValue.includes("@")) {
    addFinding("Misleading @ symbol", "Anything before @ can disguise the actual destination domain.", 22);
  }
  if (hostname.split(".").filter((part) => part !== "www").length > 3) {
    addFinding("Deep subdomain chain", "Extra subdomains can make a destination appear familiar at a glance.", 12);
  }
  if (hostname.split("-").length > 3) {
    addFinding("Hyphen-heavy domain", "Multiple hyphens are a common imitation pattern.", 10);
  }
  if (submittedValue.length > 90) {
    addFinding("Very long link", "Long URLs can conceal the destination or tracking details.", 8);
  }
  if (suspiciousTlds.some((tld) => hostname.endsWith(`.${tld}`))) {
    addFinding("Unusual top-level domain", "This domain ending is frequently seen in deceptive campaigns.", 14);
  }
  const matchedTerms = suspiciousTerms.filter((term) => fullLink.includes(term));
  if (matchedTerms.length) {
    addFinding("Sensitive action language", `Contains: ${matchedTerms.slice(0, 3).join(", ")}. Treat credential or payment requests with care.`, 12);
  }

  const boundedScore = Math.min(100, score);
  const level = boundedScore >= 55 ? "High risk" : boundedScore >= 25 ? "Use caution" : "Low risk";
  const summary = boundedScore >= 55
    ? "Several link patterns deserve a closer look. Avoid entering credentials until you verify the sender independently."
    : boundedScore >= 25
      ? "There are a few warning signs. Verify the domain through an official source before opening it."
      : "No common URL warning signs were found. This is not a guarantee that the destination is safe.";

  return { invalid: false, link: parsed.href, hostname, score: boundedScore, level, summary, findings };
}

const PhishingDetector = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState("");

  const statusStyles = useMemo(() => {
    if (!result || result.invalid) return null;
    if (result.score >= 55) return { accent: "text-rose-200", badge: "bg-rose-400/15 border-rose-300/25 text-rose-100", ring: "border-rose-300/30" };
    if (result.score >= 25) return { accent: "text-amber-200", badge: "bg-amber-300/15 border-amber-200/25 text-amber-100", ring: "border-amber-200/30" };
    return { accent: "text-teal-200", badge: "bg-teal-300/15 border-teal-200/25 text-teal-100", ring: "border-teal-200/30" };
  }, [result]);

  const runDetection = async (value) => {
    setIsScanning(true);
    setScanError("");
    try {
      // During local development, route API traffic through Vite so the browser
      // sees a same-origin request and never has to negotiate CORS.
      const apiBase = import.meta.env.VITE_API_URL || "/api";
      const response = await fetch(`${apiBase}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Detection request failed.");
      setResult(data);
    } catch (error) {
      // Keep the page useful when the local API has not been started yet.
      const localResult = scanLink(value);
      setResult(localResult);
      setScanError(`${error.message} Showing the browser fallback result.`);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (url.trim()) runDetection(url);
  };

  const tryExample = () => {
    const example = "http://paypal-account-verify.top/login?secure=true";
    setUrl(example);
    runDetection(example);
  };

  const copyDomain = async () => {
    if (!result?.hostname) return;
    try {
      await navigator.clipboard.writeText(result.hostname);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden px-4 pb-12 pt-4 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-70" />
      <div className="pointer-events-none absolute left-[10%] top-16 h-80 w-80 rounded-full bg-teal-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-amber-300/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-teal-100/65 transition hover:text-teal-100">
          <ArrowLeft size={17} /> Back to workspace
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <section className="pt-2 lg:pr-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100/15 bg-teal-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-100">
              <Radar size={14} /> Link radar
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
              Look closer<br />before you go.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-teal-50/65">
              Paste a URL to check for common phishing patterns. The check happens in your browser and never opens the link.
            </p>

            <div className="mt-9 space-y-4">
              {[
                ["Read the real destination", "Domains, subdomains, and encoded characters can tell a different story than link text."],
                ["Pause before credentials", "A trustworthy-looking URL can still be a fake. Use an official bookmark to sign in."],
              ].map(([title, description]) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-teal-300" />
                  <div><p className="font-bold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-teal-50/55">{description}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.8rem] border border-teal-100/12 bg-[#0a2929]/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-300 text-[#062122]"><ScanSearch size={22} /></span>
              <div><h2 className="font-extrabold text-white">Scan a link</h2><p className="text-sm text-teal-50/55">No links are opened during this check.</p></div>
            </div>

            <form onSubmit={handleSubmit} className="mt-7">
              <label htmlFor="suspicious-url" className="text-xs font-bold uppercase tracking-[0.16em] text-teal-100/50">Suspicious URL</label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Link2 size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal-100/45" />
                  <input
                    id="suspicious-url"
                    type="text"
                    value={url}
                    onChange={(event) => { setUrl(event.target.value); setResult(null); setScanError(""); }}
                    placeholder="example.com/login"
                    className="w-full rounded-xl border border-white/10 bg-[#061d1e] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-teal-50/25 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
                    autoComplete="off"
                  />
                </div>
                <button type="submit" disabled={!url.trim() || isScanning} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-300 px-5 py-3 font-extrabold text-[#062122] transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-40">
                  {isScanning ? "Scanning..." : "Detect"} <ChevronRight size={18} />
                </button>
              </div>
            </form>

            {scanError && <p className="mt-3 text-xs text-amber-200">{scanError}</p>}

            {!result && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3">
                <span className="text-xs text-teal-50/50">Want to see it in action?</span>
                <button onClick={tryExample} className="text-xs font-bold text-amber-200 transition hover:text-amber-100">Try a safe example →</button>
              </div>
            )}

            {result?.invalid && (
              <div className="mt-6 flex gap-3 rounded-2xl border border-rose-300/20 bg-rose-400/10 p-4 text-rose-50">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-rose-200" />
                <div><p className="font-bold">That doesn’t look like a valid URL.</p><p className="mt-1 text-sm text-rose-100/70">Try a web address such as example.com or https://example.com.</p></div>
              </div>
            )}

            {result && !result.invalid && statusStyles && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-[#061d1e] p-4 sm:p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className={`flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-4 ${statusStyles.ring} bg-white/[0.025]`}>
                    <span className={`text-2xl font-black ${statusStyles.accent}`}>{result.score}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-50/45">risk score</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-extrabold ${statusStyles.badge}`}>{result.level}</span>
                    <p className="mt-3 text-sm leading-6 text-teal-50/70">{result.summary}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.035] p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-teal-50/40">Destination domain</p><p className="mt-1 truncate font-mono text-sm text-teal-100">{result.hostname}</p></div>
                    <button onClick={copyDomain} className="rounded-lg p-2 text-teal-100/55 transition hover:bg-white/10 hover:text-teal-100" title="Copy domain"><Clipboard size={17} /></button>
                  </div>
                  {copied && <p className="mt-2 text-xs font-bold text-teal-200">Domain copied</p>}
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-50/45">What we noticed</p>
                  {result.findings.length ? (
                    <div className="mt-3 space-y-2.5">
                      {result.findings.map((finding) => (
                        <div key={finding.label} className="flex gap-3 rounded-xl border border-white/7 bg-white/[0.025] p-3">
                          <ShieldAlert size={18} className={`mt-0.5 shrink-0 ${statusStyles.accent}`} />
                          <div><p className="text-sm font-bold text-teal-50">{finding.label}</p><p className="mt-0.5 text-xs leading-5 text-teal-50/55">{finding.detail}</p></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 flex gap-3 rounded-xl border border-teal-200/10 bg-teal-300/5 p-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-teal-300" /><p className="text-sm leading-6 text-teal-50/65">The URL did not match the common warning patterns checked here. Still verify unexpected requests independently.</p></div>
                  )}
                </div>

                {result.models && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-50/45">Ensemble models</p><span className="text-[10px] uppercase tracking-wide text-teal-50/40">{result.model_status === "trained" ? "trained artifacts" : "training needed"}</span></div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {Object.entries(result.models).map(([key, model]) => (
                        <div key={key} className="rounded-xl border border-white/7 bg-white/[0.025] p-3"><p className="text-xs font-bold text-teal-50">{model.name}</p><p className="mt-1 text-lg font-black text-teal-200">{model.risk}%</p><p className="text-[11px] text-teal-50/45">{model.action ? `Action: ${model.action}` : "Phishing risk"}</p></div>
                      ))}
                    </div>
                  </div>
                )}

                {result.reputation?.enabled && (
                  <div className="mt-5 rounded-xl border border-cyan-200/15 bg-cyan-300/[0.04] p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">Live reputation</p>
                      <span className={result.reputation.known_threat ? "text-xs font-bold text-rose-200" : "text-xs font-bold text-teal-200"}>
                        {result.reputation.known_threat ? "Known threat found" : "No known threat found"}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      <div className="rounded-lg border border-white/7 bg-black/10 p-2.5"><p className="text-[11px] font-bold text-teal-50/60">Threat sources</p><p className="mt-1 text-sm font-bold text-teal-50">{result.reputation.sources?.join(", ") || "No API response"}</p></div>
                      <div className="rounded-lg border border-white/7 bg-black/10 p-2.5"><p className="text-[11px] font-bold text-teal-50/60">VirusTotal</p><p className="mt-1 text-sm font-bold text-teal-50">{result.reputation.virustotal ? `${result.reputation.virustotal.malicious} malicious, ${result.reputation.virustotal.suspicious} suspicious` : "Not available"}</p></div>
                      <div className="rounded-lg border border-white/7 bg-black/10 p-2.5"><p className="text-[11px] font-bold text-teal-50/60">Domain intelligence</p><p className="mt-1 text-sm font-bold text-teal-50">{result.reputation.domain_age_days !== null ? `${result.reputation.domain_age_days} days old` : result.reputation.dns_resolves === false ? "DNS did not resolve" : result.reputation.dns_resolves ? "DNS resolved" : "Not available"}</p></div>
                    </div>
                  </div>
                )}

                {result.llm_review && (
                  <div className="mt-5 rounded-xl border border-violet-200/15 bg-violet-300/[0.04] p-3.5">
                    <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">Local AI review</p><span className="text-xs font-bold text-violet-200">{result.llm_review.model || "Ollama unavailable"}</span></div>
                    <p className="mt-2 text-sm leading-6 text-teal-50/75">{result.llm_review.summary || result.llm_review.error}</p>
                    <p className="mt-2 text-[11px] text-teal-50/40">The reputation verdict is queued as verified feedback for controlled batch retraining; the local LLM does not change the model directly.</p>
                  </div>
                )}

              </div>
            )}

            <div className="mt-5 flex gap-2 text-xs leading-5 text-teal-50/40"><Info size={15} className="mt-0.5 shrink-0" /> This is a quick education-focused check, not a guarantee of safety. If a message is unexpected, navigate to the organization yourself rather than using its link.</div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PhishingDetector;
