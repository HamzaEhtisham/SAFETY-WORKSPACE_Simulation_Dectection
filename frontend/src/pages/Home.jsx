import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Radar, ScanSearch, ShieldCheck, Sparkles } from "lucide-react";

export default function PhishingHome() {
  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden px-4 pb-10 pt-3 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-70" />
      <div className="pointer-events-none absolute -left-28 top-20 h-80 w-80 rounded-full bg-teal-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-amber-300/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-teal-100/10 bg-[#0a2525]/85 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/15 bg-teal-200/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-100">
                <Sparkles size={14} /> Your safety workspace
              </div>
              <h1 className="mt-7 max-w-xl text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Spot the signal
                <span className="block text-teal-300">before the click.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-teal-50/70 sm:text-lg">
                Practice recognizing phishing tactics, then run a quick link check whenever a message feels off.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/detect"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-300 px-5 py-3.5 font-extrabold text-[#062122] shadow-[0_10px_30px_rgba(94,234,212,0.18)] transition hover:-translate-y-0.5 hover:bg-teal-200"
                >
                  <ScanSearch size={20} /> Detect a suspicious link
                </Link>
                <Link
                  to="/topics"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 font-bold text-white transition hover:border-teal-100/40 hover:bg-white/10"
                >
                  Start learning <ArrowRight size={18} />
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6">
                <div>
                  <p className="text-xl font-black text-white">01</p>
                  <p className="mt-1 text-xs leading-5 text-teal-100/55">check the link</p>
                </div>
                <div>
                  <p className="text-xl font-black text-white">02</p>
                  <p className="mt-1 text-xs leading-5 text-teal-100/55">learn the clue</p>
                </div>
                <div>
                  <p className="text-xl font-black text-white">03</p>
                  <p className="mt-1 text-xs leading-5 text-teal-100/55">report safely</p>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[420px] items-center justify-center border-t border-teal-100/10 bg-[#061a1b] p-7 lg:min-h-0 lg:border-l lg:border-t-0 sm:p-10">
              <div className="absolute inset-0 scanner-orbit" />
              <div className="relative w-full max-w-sm rounded-[1.7rem] border border-teal-100/15 bg-[#0d3131]/90 p-5 shadow-2xl sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-300 text-[#062122]"><Radar size={23} /></span>
                    <div>
                      <p className="text-sm font-extrabold text-white">Link radar</p>
                      <p className="text-xs text-teal-100/55">ready to scan</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-200"><span className="h-2 w-2 animate-pulse rounded-full bg-teal-300" /> Live</span>
                </div>
                <div className="mt-7 rounded-2xl border border-white/10 bg-[#061d1e] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-100/45">Quick checks</p>
                  <div className="mt-4 space-y-3">
                    {["Disguised or unusual domain", "Pressure-language in the URL", "Secure connection signals"].map((item) => (
                      <div className="flex items-center gap-3 text-sm text-teal-50/80" key={item}>
                        <CheckCircle2 size={17} className="shrink-0 text-teal-300" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/detect" className="mt-5 flex items-center justify-between rounded-xl bg-white/8 px-4 py-3 text-sm font-bold text-teal-50 transition hover:bg-white/12">
                  Open detector <ArrowRight size={17} className="text-teal-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 md:grid-cols-2">
          <Link to="/detect" className="group rounded-3xl border border-white/8 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-teal-200/25 hover:bg-white/[0.06] sm:p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300 text-[#392b02]"><ShieldCheck size={22} /></span>
            <h2 className="mt-5 text-xl font-extrabold text-white">Check an unfamiliar URL</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-teal-50/60">Inspect common warning signs before opening a link from an email, message, or social post.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-200">Run a check <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>
          <Link to="/topics" className="group rounded-3xl border border-white/8 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-teal-200/25 hover:bg-white/[0.06] sm:p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-300 text-[#062122]"><BookOpen size={22} /></span>
            <h2 className="mt-5 text-xl font-extrabold text-white">Build your phishing instincts</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-teal-50/60">Learn common social-engineering patterns through focused topics and simulated scenarios.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-200">Explore lessons <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>
        </section>
      </div>
    </main>
  );
}
