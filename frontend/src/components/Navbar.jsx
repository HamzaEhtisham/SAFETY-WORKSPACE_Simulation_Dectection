import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, ScanSearch, X } from "lucide-react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isHomePage = location.pathname === "/";
  const isSimulator = location.pathname.toLowerCase().startsWith("/simulator");
  const isAuthPage = ["/login", "/signup"].includes(
    location.pathname.toLowerCase(),
  );

  if (isAuthPage) return null;

  return (
    <div className="sticky top-0 z-50 px-3 py-3 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl border border-teal-100/10 bg-[#071c1d]/90 px-3 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-4">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle (Only in Simulator) */}
          {isSimulator && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-xl border border-teal-200/10 bg-white/5 p-2 text-teal-200 transition-colors hover:bg-white/10 hover:text-white"
              title="Toggle Sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="HE.DEV home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black text-[16px] font-medium tracking-[-0.08em] text-white shadow-inner transition duration-300 group-hover:border-teal-200/50 sm:h-11 sm:w-11 sm:text-[17px]">
              HE<span className="text-teal-300">.</span>
            </span>
            <span className="text-[24px] font-black leading-none tracking-[-0.06em] text-white sm:text-[27px]">
              HE<span className="text-teal-300">.</span>DEV
            </span>
          </Link>

          {isHomePage && (
            <span className="hidden border-l border-white/10 pl-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-100/60 lg:block">
              Safety workspace
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/detect"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-300 px-3 py-2 text-xs font-extrabold text-[#062122] transition hover:bg-teal-200 hover:-translate-y-0.5 sm:px-4 sm:text-sm"
          >
            <ScanSearch size={17} strokeWidth={2.5} />
            <span className="hidden sm:inline">Scan a link</span>
            <span className="sm:hidden">Scan</span>
          </Link>
          {user && (
            <>
              <div className="hidden md:flex flex-col items-end leading-tight">
                <span className="text-[10px] text-teal-100/40 uppercase tracking-widest font-bold">
                  Signed in
                </span>
                <span className="text-sm text-teal-100 font-bold">
                  {user.username || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white transition hover:bg-rose-500 hover:border-rose-400 sm:px-4 sm:text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
