import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 flex items-center justify-center p-6">
      <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="your_username"
              className="w-full px-4 py-2 rounded-lg bg-slate-900/40 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-slate-900/40 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-slate-900/40 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-slate-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
