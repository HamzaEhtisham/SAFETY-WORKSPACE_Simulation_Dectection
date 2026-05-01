import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const PhishingDetector = () => {
  return (
    <div className="text-white flex items-center justify-center p-20">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Phishing Detector</h1>
        <p className="mt-2 text-slate-400">This feature is coming soon.</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium">
          <ChevronLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PhishingDetector;
