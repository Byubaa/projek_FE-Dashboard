import { Menu, Search, Moon, Bell, ChevronDown } from "lucide-react";
import Avatar from "./Avatar";

export default function Topbar({ title, subtitle, notifCount = 5 }) {
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

        <button type="button" className="flex items-center gap-2 rounded-lg pl-1 pr-2 py-1 hover:bg-slate-50">
          <Avatar name="Admin PPID" size={34} />
          <span className="hidden sm:block text-xs font-semibold text-slate-600">Admin PPID</span>
          <ChevronDown size={12} className="hidden sm:block text-slate-400" />
        </button>
      </div>
    </header>
  );
}
