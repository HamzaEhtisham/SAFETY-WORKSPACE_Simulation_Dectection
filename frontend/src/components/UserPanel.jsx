// src/pages/UserPanel.jsx
import React from "react";
import { Trophy, CheckCircle, BarChart3 } from "lucide-react";

export default function UserPanel({ topics }) {
  const attempted = topics.filter((t) => t.attempted);
  const total = topics.length;
  const totalScore = attempted.reduce((sum, t) => {
    const [score, outOf] = t.score.split("/").map(Number);
    return sum + (score / outOf) * 100;
  }, 0);

  const avgScore =
    attempted.length > 0 ? (totalScore / attempted.length).toFixed(1) : 0;

  return (
    <div className="bg-slate-800/40 rounded-2xl p-6 shadow-lg h-fit">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="text-indigo-400" />
        <h2 className="text-xl font-semibold">User Progress Panel</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Total Topics:</span>
          <span className="font-medium">{total}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Attempted Quizzes:</span>
          <span className="font-medium text-emerald-400">
            {attempted.length}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Average Score:</span>
          <span className="font-medium text-yellow-400">{avgScore}%</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="text-sm text-slate-400 mb-1">Overall Progress</div>
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-3 bg-indigo-500 transition-all duration-700"
              style={{
                width: `${(attempted.length / total) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* List of attempted topics */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Trophy size={18} className="text-yellow-400" /> Quiz Results
          </h4>
          {attempted.length === 0 ? (
            <p className="text-slate-400 text-sm">No quizzes attempted yet.</p>
          ) : (
            <ul className="space-y-2">
              {attempted.map((t, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-slate-900/50 rounded-lg px-3 py-2 text-sm"
                >
                  <span>{t.title}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle size={14} /> {t.score}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
