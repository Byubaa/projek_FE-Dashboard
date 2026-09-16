import { useMemo, useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  CalendarDays,
  SlidersHorizontal,
  PieChart as PieIcon,
  History,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import StatCard from "../components/StatCard";
import Pagination from "../components/Pagination";
import StatusDonutChart from "../components/StatusDonutChart";
import { PERMOHONAN, STATUS_BREAKDOWN, PERMOHONAN_TERBARU } from "../data/status";

const STATS = [
  { icon: FileText, iconBg: "bg-blue-50", iconColor: "text-blue-600", label: "Total Permohonan", value: 128, helper: "Permohonan layanan informasi" },
  { icon: Clock, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", label: "Diproses", value: 48, helper: "Sedang dalam proses" },
  { icon: CheckCircle2, iconBg: "bg-amber-50", iconColor: "text-amber-600", label: "Selesai", value: 72, helper: "Telah ditanggapi" },
  { icon: XCircle, iconBg: "bg-rose-50", iconColor: "text-rose-600", label: "Ditolak", value: 8, helper: "Tidak memenuhi syarat" },
];

const STATUS_PILL = {
  Diproses: "bg-blue-100/70 text-blue-600",
  Selesai: "bg-emerald-100/70 text-emerald-600",
  Ditolak: "bg-rose-100/70 text-rose-600",
};

export default function Status() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(PERMOHONAN.length / pageSize));
  const rows = useMemo(() => PERMOHONAN.slice((page - 1) * pageSize, page * pageSize), [page]);

  return (
    <>
      <Topbar title="Status Layanan" subtitle="Pantau status permohonan layanan informasi publik" />

      <main className="flex-1 p-6 space-y-6">
        <Breadcrumb items={[{ label: "Beranda", to: "/" }, { label: "Status" }]} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6 items-start">
          {/* Table */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative flex-1 min-w-[200px]">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan kata kunci..."
                  className="w-full rounded-lg border border-slate-200 py-2 pl-8 pr-3 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
              </label>
              <select className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
                <option>Semua Instansi</option>
              </select>
              <select className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
                <option>Semua Status</option>
              </select>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
                <CalendarDays size={13} /> Pilih Tanggal
              </button>
              <button className="flex items-center gap-1.5 rounded-lg bg-[#b81d24] px-4 py-2 text-xs font-medium text-white hover:bg-red-700">
                <SlidersHorizontal size={12} /> Filter
              </button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 font-semibold text-slate-600">
                      <th className="px-3 py-3">No</th>
                      <th className="px-3 py-3">Nomor Permohonan</th>
                      <th className="px-3 py-3">Nama Pemohon</th>
                      <th className="px-3 py-3">Instansi</th>
                      <th className="px-3 py-3">Jenis Informasi</th>
                      <th className="px-3 py-3">Tanggal</th>
                      <th className="px-3 py-3">Status</th>
                      <th className="px-3 py-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((p) => (
                      <tr key={p.id} className="border-b border-slate-100 last:border-0">
                        <td className="px-3 py-3 font-semibold text-slate-800">{p.id}</td>
                        <td className="px-3 py-3 text-slate-600">{p.nomor}</td>
                        <td className="px-3 py-3 font-medium text-slate-800">{p.pemohon}</td>
                        <td className="px-3 py-3 text-slate-600">{p.instansi}</td>
                        <td className="px-3 py-3 text-slate-600">{p.jenis}</td>
                        <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{p.tanggal}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_PILL[p.status]}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <button className="rounded border border-rose-200 bg-rose-50/50 px-2.5 py-1.5 text-[11px] font-medium text-rose-600 hover:bg-rose-50">
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-100 px-5 py-4">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  totalItems={PERMOHONAN.length}
                  pageSize={pageSize}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                <PieIcon size={14} className="text-slate-400" /> Statistik Status
              </h3>
              <p className="text-[10px] text-slate-400 mb-3">Persentase jumlah permohonan berdasarkan status</p>
              <StatusDonutChart data={STATUS_BREAKDOWN} total={128} />
              <div className="mt-4 space-y-2">
                {STATUS_BREAKDOWN.map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-slate-800 font-medium">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                      {s.label}
                    </span>
                    <span className="font-bold text-slate-800">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4">
                <History size={14} className="text-slate-400" /> Permohonan Terbaru
              </h3>
              <ul className="space-y-4">
                {PERMOHONAN_TERBARU.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{p.pemohon}</p>
                        <p className="text-[10px] text-slate-400 truncate">{p.instansi}</p>
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-medium ${STATUS_PILL[p.status]}`}>
                          • {p.status}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{p.tanggal}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 flex items-center gap-1 text-xs font-medium text-rose-600 hover:underline">
                Lihat semua <ArrowRight size={11} />
              </button>
            </div>

            <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100">
                  <LifeBuoy size={14} className="text-rose-600" />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">Pusat Bantuan</p>
                  <p className="mt-1 text-[10px] text-slate-600">Butuh bantuan terkait permohonan informasi?</p>
                  <button className="mt-2 flex items-center gap-1 text-xs font-medium text-rose-600 hover:underline">
                    Lihat panduan <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
