import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImage from "../../logo.png";

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
  const isAuthPage = ["/login", "/signup"].includes(location.pathname.toLowerCase());

  if (isAuthPage) return null;

  return (
    <div className="sticky top-0 z-50 px-4 py-3 sm:px-8">
      <nav className="max-w-7xl mx-auto bg-slate-800/60 backdrop-blur-md border border-slate-700/40 rounded-2xl shadow-2xl flex justify-between items-center px-6 py-1">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle (Only in Simulator) */}
          {isSimulator && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-slate-900/40 border border-slate-700/50 text-indigo-400 hover:text-white transition-colors"
              title="Toggle Sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="Phishing Simulator Logo"
              className="w-16 h-16 md:w-24 md:h-24 object-contain 
                         drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]
                         hover:scale-110 transition-transform duration-300"
            />
          </Link>
          
          {isHomePage && (
            <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight hidden sm:block">
              Phishing Simulator Dashboard
            </h1>
          )}
        </div>
        
        <div className="flex items-center gap-5">
          {user && (
            <>
              <div className="hidden md:flex flex-col items-end leading-tight">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">User</span>
                <span className="text-sm text-emerald-400 font-bold">{user.username || "User"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all shadow-lg hover:shadow-red-900/40 active:scale-95 border border-red-500/20"
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
