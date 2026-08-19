import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, AtSign, LockKeyhole, UserRound } from "lucide-react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) navigate("/login");
      else alert(data.message);
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };
  const fields = [
    {
      label: "Username",
      value: username,
      setValue: setUsername,
      type: "text",
      placeholder: "your_username",
      icon: UserRound,
    },
    {
      label: "Email",
      value: email,
      setValue: setEmail,
      type: "email",
      placeholder: "you@example.com",
      icon: AtSign,
    },
    {
      label: "Password",
      value: password,
      setValue: setPassword,
      type: "password",
      placeholder: "••••••••",
      icon: LockKeyhole,
    },
  ];
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-[#061a1b] px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
      <div className="pointer-events-none absolute -right-28 top-10 h-96 w-96 rounded-full bg-teal-400/10 blur-[130px]" />
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
              Make safer
              <br />
              <span className="text-teal-300">choices online.</span>
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-teal-50/60">
              Create your free learning workspace and start recognizing phishing
              with confidence.
            </p>
          </section>
          <section className="p-6 sm:p-10">
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-teal-100/55">
              Get started
            </p>
            <h2 className="mt-3 text-3xl font-black text-white">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-teal-50/55">
              Your phishing-awareness workspace is ready.
            </p>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {fields.map(
                ({ label, value, setValue, type, placeholder, icon }) => (
                  <label
                    key={label}
                    className="block text-sm font-bold text-teal-50/80"
                  >
                    {label}
                    <div className="relative mt-2">
                      {React.createElement(icon, {
                        size: 17,
                        className:
                          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal-100/40",
                      })}
                      <input
                        required
                        type={type}
                        placeholder={placeholder}
                        className="w-full rounded-xl border border-white/10 bg-[#061d1e] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-teal-50/25 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                      />
                    </div>
                  </label>
                ),
              )}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-300 py-3.5 font-extrabold text-[#062122] transition hover:-translate-y-0.5 hover:bg-teal-200"
              >
                Create account <ArrowRight size={18} />
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-teal-50/55">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-bold text-teal-200 hover:text-teal-100"
              >
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
