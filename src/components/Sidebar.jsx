import { NavLink } from "react-router-dom";
import {
  Home,
  Archive,
  Landmark,
  Shield,
  BookOpen,
  FileText,
  MessageSquare,
  Users,
  Settings,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Logo from "./Logo";
import Avatar from "./Avatar";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: Home, end: true, hasSubmenu: false },
  { to: "/data-layanan", label: "Data Layanan", icon: Archive, hasSubmenu: true },
  { to: "/dinas", label: "Dinas / Instansi", icon: Landmark, hasSubmenu: true },
  { to: "/status", label: "Status", icon: Shield, hasSubmenu: true },
  { to: "/kata-kunci", label: "Kata Kunci", icon: BookOpen, hasSubmenu: true },
  { to: "/laporan", label: "Laporan", icon: FileText, hasSubmenu: true },
  { to: "/pengaduan", label: "Pengaduan", icon: MessageSquare, hasSubmenu: true },
  { to: "/pengguna", label: "Pengguna", icon: Users, hasSubmenu: true },
  { to: "/pengaturan", label: "Pengaturan", icon: Settings, hasSubmenu: true },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[280px] shrink-0 h-screen sticky top-0 bg-[#9F1D1D] text-white overflow-hidden">
      {/* Brand header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#991B1B]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-1">
          <Logo size={32} className="rounded-full" />
        </div>
        <div className="min-w-0">
          <h1 className="font-semibold text-sm leading-tight text-[#FFFFFF] truncate">
            Layanan Informasi Publik
          </h1>
          <p className="text-xs text-[#FECACA] truncate">
            Pemerintah Daerah DIY
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end, hasSubmenu }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center justify-between gap-2.5 rounded-[8px] px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-[#FFFFFF] text-[#981611]"
                  : "text-[#FECACA] hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-3 min-w-0">
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className={`shrink-0 ${isActive ? "text-[#981611]" : "text-[#FCA5A5]"}`}
                  />
                  <span className="truncate">{label}</span>
                </span>
                {hasSubmenu && (
                  <ChevronRight
                    size={15}
                    className={`shrink-0 ${isActive ? "text-[#981611]" : "text-[#FCA5A5]"}`}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Profile */}
      <div className="shrink-0 p-3 border-t border-[#991B1B]">
        <div className="flex items-center gap-3 rounded-[8px] px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors">
          <Avatar
            name="Admin PPID"
            size={38}
            bg="bg-[#FCA5A5]"
            textColor="text-[#981611]"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#FFFFFF] truncate">Admin PPID</p>
            <p className="text-xs text-[#FECACA] truncate">Super Admin</p>
          </div>
          <ChevronDown size={14} className="text-[#FCA5A5] shrink-0" />
        </div>
      </div>
    </aside>
  );
}
