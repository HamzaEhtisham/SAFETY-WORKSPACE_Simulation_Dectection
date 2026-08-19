import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate(data.user.role === "admin" ? "/admin-panel" : "/");
      } else alert(data.message || data.error);
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
      <div className="pointer-events-none absolute -left-28 top-12 h-96 w-96 rounded-full bg-teal-400/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-300/10 blur-[130px]" />
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-5 flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black text-[16px] font-medium tracking-[-0.08em] text-white">
            HE<span className="text-teal-300">.</span>
          </span>
          <span className="text-[25px] font-black leading-none tracking-[-0.06em] text-white">
            HE<span className="text-teal-300">.</span>DEV
          </span>
        </div>
        <div className="grid overflow-hidden rounded-[2rem] border border-teal-100/10 bg-[#0a2929]/90 shadow-[0_28px_90px_rgba(0,0,0,0.34)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="hidden border-r border-teal-100/10 bg-[#061d1e] p-10 lg:block">
            <h1 className="mt-4 text-4xl font-black leading-tight text-white">
              Stay one step
              <br />
              <span className="text-teal-300">ahead of scams.</span>
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-teal-50/60">
              Build practical phishing awareness through lessons, scenarios, and
              quick safety checks.
            </p>
            <div className="mt-12 space-y-4 text-sm text-teal-50/70">
              <p>01 &nbsp; Learn real warning signs</p>
              <p>02 &nbsp; Test your knowledge</p>
              <p>03 &nbsp; Check suspicious links</p>
            </div>
          </section>
          <section className="p-6 sm:p-10">
            <div className="lg:hidden"></div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-teal-100/55">
              Welcome back
            </p>
            <h2 className="mt-3 text-3xl font-black text-white">
              Sign in to continue
            </h2>
            <p className="mt-2 text-sm text-teal-50/55">
              Access your learning path and progress.
            </p>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-bold text-teal-50/80">
                Email or username
                <div className="relative mt-2">
                  <Mail
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal-100/40"
                  />
                  <input
                    required
                    type="text"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#061d1e] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-teal-50/25 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                  />
                </div>
              </label>
              <label className="block text-sm font-bold text-teal-50/80">
                Password
                <div className="relative mt-2">
                  <LockKeyhole
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal-100/40"
                  />
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-[#061d1e] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-teal-50/25 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </label>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-300 py-3.5 font-extrabold text-[#062122] transition hover:-translate-y-0.5 hover:bg-teal-200"
              >
                Sign in <ArrowRight size={18} />
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-teal-50/55">
              New here?{" "}
              <Link
                to="/signup"
                className="font-bold text-teal-200 hover:text-teal-100"
              >
                Create an account
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
