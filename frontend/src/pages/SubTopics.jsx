import React from "react";
import { useParams, Link } from "react-router-dom";
import { topicsData } from "../data/topicsData";
import { ArrowLeft, ArrowRight, BookOpen, Play } from "lucide-react";

const SubTopics = () => {
  const { topicId } = useParams();
  const topic = topicsData.find((item) => item.id === Number(topicId));
  if (!topic) return <div className="min-h-[calc(100vh-80px)] flex items-center justify-center text-teal-50">Topic not found.</div>;

  return <main className="relative min-h-[calc(100vh-80px)] overflow-hidden px-4 pb-12 pt-4 sm:px-6 lg:px-8">
    <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
    <div className="relative mx-auto max-w-7xl">
      <Link to="/topics" className="inline-flex items-center gap-2 text-sm font-bold text-teal-100/60 transition hover:text-teal-100"><ArrowLeft size={17} /> All learning modules</Link>
      <header className="py-8 sm:py-10"><span className="inline-flex rounded-full border border-teal-100/15 bg-teal-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-100">Scenario collection</span><h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">{topic.title}</h1><p className="mt-4 text-base text-teal-50/65">Select a scenario to open its guided lesson and assessment.</p></header>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{topic.subtopics.map((subtopic) => <article key={subtopic.id} className="group flex min-h-52 flex-col rounded-3xl border border-white/8 bg-[#0b2929]/75 p-6 transition hover:-translate-y-1 hover:border-teal-200/25 hover:bg-[#0e3131]"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-300 text-[#062122]"><BookOpen size={21} /></span><h2 className="mt-6 text-xl font-extrabold leading-7 text-white">{subtopic.title}</h2><div className="mt-auto pt-6"><Link to={`/simulator/${topic.id}/${subtopic.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-teal-200 transition hover:text-teal-100">Start lesson <Play size={15} /><ArrowRight size={15} className="transition group-hover:translate-x-1" /></Link></div></article>)}</section>
    </div>
  </main>;
};

export default SubTopics;
