import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { topicsData } from '../data/topicsData';
import { BookOpen } from 'lucide-react';

const SubTopics = () => {
  const { topicId } = useParams();
  const topic = topicsData.find((t) => t.id === parseInt(topicId));

  if (!topic) {
    return <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">Topic not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {topic.title} — Subtopics
          </h1>
          <p className="mt-1 text-slate-300">
            Select a subtopic to start its simulation.
          </p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topic.subtopics.map((subtopic) => (
            <section key={subtopic.id} className="rounded-xl bg-gradient-to-b from-slate-700/40 to-slate-700/20 p-6 flex flex-col justify-between border border-slate-700/40">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-slate-900/40">
                  <BookOpen size={36} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{subtopic.title}</h2>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <Link
                  to={`/simulator/${topic.id}/${subtopic.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition font-medium"
                >
                  Start Simulation
                </Link>
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default SubTopics;
