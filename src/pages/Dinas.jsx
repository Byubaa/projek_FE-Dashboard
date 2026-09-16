import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Search,
  Plus,
  Pencil,
  Eye,
  Trash2,
  BarChart3,
  History,
  FilePlus2,
  FileEdit,
  ClipboardCheck,
  Ban,
} from "lucide-react";
import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import StatCard from "../components/StatCard";
import Pagination from "../components/Pagination";
import { DINAS, DINAS_PER_WILAYAH, DINAS_ACTIVITY } from "../data/dinas";

const STATUS_STYLES = {
  Aktif: { bg: "bg-emerald-50", dot: "bg-emerald-500", text: "text-emerald-700" },
  Nonaktif: { bg: "bg-slate-100", dot: "bg-red-600", text: "text-red-600" },
  "Perlu Verifikasi": { bg: "bg-amber-50", dot: "bg-amber-500", text: "text-amber-700" },
};

function activityIcon(text) {
  if (text.startsWith("Baru saja menambahkan") || text.startsWith("Menambahkan")) return FilePlus2;
  if (text.startsWith("Mengubah")) return FileEdit;
  if (text.startsWith("Menunggu")) return ClipboardCheck;
  return Ban;
}

const STATS = [
  { icon: Building2, iconBg: "bg-red-50", iconColor: "text-brand-600", label: "Total Dinas / Instansi", value: 35, helper: "Dinas / instansi terdaftar" },
  { icon: CheckCircle2, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", label: "Aktif", value: 28, helper: "Dinas / instansi aktif" },
  { icon: XCircle, iconBg: "bg-slate-100", iconColor: "text-slate-500", label: "Nonaktif", value: 4, helper: "Dinas / instansi nonaktif" },
  { icon: ShieldAlert, iconBg: "bg-amber-50", iconColor: "text-amber-600", label: "Perlu Verifikasi", value: 3, helper: "Menunggu verifikasi" },
];

export default function Dinas() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(DINAS.length / pageSize));
  const rows = useMemo(() => DINAS.slice((page - 1) * pageSize, page * pageSize), [page]);
  const maxWilayah = Math.max(...DINAS_PER_WILAYAH.map((d) => d.value));

  return (
    <>
      <Topbar title="Dinas / Instansi" subtitle="Kelola data dinas dan instansi yang terdaftar" />

      <main className="flex-1 p-6 space-y-6">
        <Breadcrumb items={[{ label: "Beranda", to: "/" }, { label: "Dinas / Instansi" }]} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Table card */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Building2 size={14} className="text-slate-400" /> Daftar Dinas / Instansi
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 px-5 py-4">
              <label className="relative flex-1 min-w-[200px]">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari dinas atau instansi..."
                  className="w-full rounded-lg border border-slate-300 py-2 pl-8 pr-3 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
              </label>
              <select className="rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-600">
                <option>Semua Wilayah</option>
              </select>
              <select className="rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-600">
                <option>Semua Status</option>
              </select>
              <Link
                to="#"
                className="flex items-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2 text-xs font-medium text-white hover:bg-brand-600"
              >
                <Plus size={13} /> Tambah Dinas / Instansi
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-xs">
                <thead>
                  <tr className="border-y border-slate-100 bg-slate-50/70 font-bold text-slate-600">
                    <th className="px-3 py-3 text-center w-10">No</th>
                    <th className="px-3 py-3">Nama Dinas / Instansi</th>
                    <th className="px-3 py-3">Wilayah</th>
                    <th className="px-3 py-3">Kode Instansi</th>
                    <th className="px-3 py-3 text-center">Jumlah Layanan</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((d) => {
                    const s = STATUS_STYLES[d.status];
                    return (
                      <tr key={d.id} className="border-b border-slate-100 last:border-0">
                        <td className="px-3 py-3 text-center text-slate-600">{d.id}</td>
                        <td className="px-3 py-3 font-semibold text-slate-800">{d.nama}</td>
                        <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{d.wilayah}</td>
                        <td className="px-3 py-3 text-slate-500">{d.kode}</td>
                        <td className="px-3 py-3 text-center text-slate-600">{d.layanan}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${s.bg} ${s.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                            {d.status}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <button className="flex h-6 w-6 items-center justify-center rounded border border-slate-300 text-slate-500 hover:bg-slate-50">
                              <Eye size={11} />
                            </button>
                            <button className="flex h-6 w-6 items-center justify-center rounded border border-slate-300 text-slate-500 hover:bg-slate-50">
                              <Pencil size={11} />
                            </button>
                            <button className="flex h-6 w-6 items-center justify-center rounded border border-red-200 text-red-500 hover:bg-red-50">
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 px-5 py-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                totalItems={DINAS.length}
                pageSize={pageSize}
                onPageChange={setPage}
              />
            </div>
          </div>

          {/* Side panels */}
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-1">
                <BarChart3 size={14} className="text-slate-400" /> Statistik Dinas / Instansi
              </h3>
              <p className="text-[11px] text-slate-400 mb-4">Jumlah dinas / instansi berdasarkan wilayah</p>
              <div className="space-y-3">
                {DINAS_PER_WILAYAH.map((d) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                      <span className="font-medium">{d.label}</span>
                      <span className="font-semibold">{d.value}</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-2.5 rounded-full"
                        style={{ width: `${(d.value / maxWilayah) * 100}%`, backgroundColor: d.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
                <History size={14} className="text-slate-400" /> Aktivitas Terbaru
              </h3>
              <ul className="space-y-4">
                {DINAS_ACTIVITY.map((a, i) => {
                  const Icon = activityIcon(a.text);
                  return (
                    <li key={i} className="flex gap-3">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${a.color}`}>
                        <Icon size={11} className={a.iconColor} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-800 truncate">{a.nama}</p>
                          <span className="text-[9px] text-slate-400 shrink-0">{a.time}</span>
                        </div>
                        <p className="text-xs text-slate-500">{a.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
