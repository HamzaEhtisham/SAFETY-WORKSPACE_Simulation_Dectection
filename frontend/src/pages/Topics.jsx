import React from "react";
import { Link } from "react-router-dom";
import { topicsData } from "../data/topicsData";
import { ArrowRight, BookOpen, Layers3, Play, ShieldCheck } from "lucide-react";

const Topics = () => (
  <main className="relative min-h-[calc(100vh-80px)] overflow-hidden px-4 pb-12 pt-4 sm:px-6 lg:px-8">
    <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
    <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-teal-400/10 blur-[110px]" />
    <div className="relative mx-auto max-w-7xl">
      <header className="max-w-2xl py-8 sm:py-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-100/15 bg-teal-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-100"><BookOpen size={14} /> Learning library</span>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Train your eye<br /><span className="text-teal-300">to spot the clues.</span></h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-teal-50/65">Choose a focused lesson or dive into scenario-based phishing techniques. Each module includes visual guidance and a quiz.</p>
        <div className="mt-7 flex items-center gap-3 text-sm text-teal-100/60"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-teal-300"><Layers3 size={18} /></span> {topicsData.length} learning modules available</div>
      </header>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {topicsData.map((topic) => (
          <article key={topic.id} className="group flex min-h-56 flex-col rounded-3xl border border-white/8 bg-[#0b2929]/75 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-1 hover:border-teal-200/25 hover:bg-[#0e3131] sm:p-6">
            <div className="flex items-start justify-between gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-300 text-[#062122]"><BookOpen size={21} /></span><span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-50/50">Module {String(topic.id).padStart(2, "0")}</span></div>
            <div className="mt-6"><h2 className="text-xl font-extrabold leading-7 text-white">{topic.title}</h2><p className="mt-2 text-sm leading-6 text-teal-50/55">{topic.subtopics.length ? `${topic.subtopics.length} focused scenarios to explore` : "Lesson slides and a knowledge check"}</p></div>
            <div className="mt-auto pt-6">{topic.subtopics.length > 0 ? <Link to={`/topics/${topic.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-teal-200 transition hover:text-teal-100">Explore scenarios <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link> : <Link to={`/simulator/${topic.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-teal-200 transition hover:text-teal-100">Start lesson <Play size={15} className="transition group-hover:translate-x-1" /></Link>}</div>
          </article>
        ))}
      </section>
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-amber-200/10 bg-amber-300/[0.055] p-4 text-sm text-amber-100/75"><ShieldCheck size={19} className="shrink-0 text-amber-200" /> Take your time—phishing awareness is about building a habit of pausing before you click.</div>
    </div>
  </main>
);

export default Topics;
