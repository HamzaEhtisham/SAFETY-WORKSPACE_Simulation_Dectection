import React from "react";
import { Link } from "react-router-dom";

export default function PhishingHome() {
  return (
    <div className="text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-slate-800/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 min-h-[75vh] flex flex-col border border-slate-700/40">
        {/* Mobile Heading (Shown only on small screens where Navbar hides it) */}
        <h1 className="text-3xl font-bold text-white mb-8 lg:hidden text-center">
          Phishing Simulator Dashboard
        </h1>

        {/* 📊 Dashboard Box */}
        <div className="flex-1 w-full">
          <section className="rounded-2xl bg-gradient-to-b from-slate-700/40 to-slate-700/20 p-8 sm:p-12 border border-slate-700/40 shadow-inner h-full flex flex-col justify-center">
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Create phishing campaign simulations to train users: craft fake
              emails, schedule deliveries, and collect simulated responses.
            </p>

            {/* Features */}
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              <ul className="text-slate-300 space-y-4 text-base md:text-lg">
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  Template-based email composer
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  Scheduling, tracking, and reporting
                </li>
              </ul>

              <ul className="text-slate-300 space-y-4 text-base md:text-lg sm:ml-8">
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  Real-time user metrics
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  Comprehensive analytics
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-12">
              <Link
                to="/topics"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl 
                           bg-emerald-600 hover:bg-emerald-500 transition-all 
                           font-bold text-lg shadow-lg hover:-translate-y-1 transform duration-200"
              >
                Open Simulator Dashboard →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
