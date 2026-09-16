import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Moon, Bell, ChevronDown, LogOut, User } from "lucide-react";
import Avatar from "./Avatar";

export default function Topbar({ title, subtitle, notifCount = 5 }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    setDropdownOpen(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center gap-4 min-w-0">
        <button
          type="button"
          className="lg:hidden text-slate-500 hover:text-slate-700"
          aria-label="Buka menu"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-slate-800 truncate">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 truncate">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <label className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari layanan, dinas, kata kunci..."
            className="w-64 rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </label>

        <button
          type="button"
          className="text-slate-500 hover:text-slate-700"
          aria-label="Ganti tema"
        >
          <Moon size={18} />
        </button>

        <button
          type="button"
          className="relative text-slate-500 hover:text-slate-700"
          aria-label="Notifikasi"
        >
          <Bell size={18} />
          {notifCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {notifCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg pl-1 pr-2 py-1 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <Avatar name="Admin PPID" size={34} />
            <span className="hidden sm:block text-xs font-semibold text-slate-600">Admin PPID</span>
            <ChevronDown
              size={12}
              className={`hidden sm:block text-slate-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white p-2 shadow-xl border border-slate-100 z-50">
              <div className="px-3 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">Admin PPID</p>
                <p className="text-[11px] text-slate-400">admin.ppid@jogjaprov.go.id</p>
                <span className="mt-1 inline-flex items-center gap-1 rounded bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-brand-600">
                  Super Admin
                </span>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/pengguna");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-left"
                >
                  <User size={14} className="text-slate-400" />
                  <span>Profil Akun</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                  <LogOut size={14} className="text-red-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
