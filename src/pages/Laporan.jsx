import { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Download,
  Info,
  ArrowRight,
} from "lucide-react";
import Topbar from "../components/Topbar";
import Pagination from "../components/Pagination";
import TrendChart from "../components/TrendChart";
import StatusDonutChart from "../components/StatusDonutChart";
import {
  LAPORAN_STATS,
  STATUS_LAYANAN_BREAKDOWN,
  TREN_PERMOHONAN,
  REKAP_DINAS,
  LAPORAN_TERBARU,
  LAPORAN_STATUS_PILL,
} from "../data/laporan";

const STAT_ICONS = [
  { icon: FileText, bg: "bg-blue-50", color: "text-blue-600" },
  { icon: Clock, bg: "bg-emerald-50", color: "text-emerald-600" },
  { icon: CheckCircle2, bg: "bg-amber-50", color: "text-amber-600" },
  { icon: XCircle, bg: "bg-rose-50", color: "text-rose-600" },
];

export default function Laporan() {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(REKAP_DINAS.length / pageSize));
  const rows = REKAP_DINAS.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <Topbar title="Laporan" subtitle="Rekapitulasi data layanan informasi publik" />

      <main className="flex-1 p-6 space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-4">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-card">
            <p className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <CalendarDays size={12} /> Periode
            </p>
            <p className="text-sm font-medium text-slate-800">01 Mei 2025 - 31 Mei 2025</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-card">
            <p className="text-xs text-slate-400 mb-1">Kategori</p>
            <p className="text-sm font-medium text-slate-800">Semua Kategori</p>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-card">
            <div>
              <p className="text-xs text-slate-400 mb-1">Dinas / Instansi</p>
              <p className="text-sm font-medium text-slate-800">Semua Instansi</p>
            </div>
            <button className="flex shrink-0 items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-medium text-white hover:bg-brand-600">
              <Download size={13} /> Unduh Laporan
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LAPORAN_STATS.map((s, i) => {
            const { icon: Icon, bg, color } = STAT_ICONS[i];
            return (
              <div key={s.label} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-card">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                  <Icon size={18} className={color} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-500">{s.label}</p>
                  <p className="text-xl font-bold text-slate-900">
                    {s.value}{" "}
                    <span className={`text-xs font-normal ${s.changeUp ? "text-emerald-500" : "text-red-500"}`}>
                      {s.change}
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-400">{s.helper}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="space-y-6">
            {/* Trend chart */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-slate-800 mb-2">Tren Permohonan Layanan</h2>
              <TrendChart data={TREN_PERMOHONAN} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
              {/* Donut */}
              <div className="rounded-xl bg-white p-6 shadow-card">
                <h3 className="text-base font-bold text-slate-800 mb-4">Perbandingan Status Layanan</h3>
                <div className="flex items-center gap-6">
                  <StatusDonutChart data={STATUS_LAYANAN_BREAKDOWN} total={245} />
                  <div className="flex-1 space-y-3">
                    {STATUS_LAYANAN_BREAKDOWN.map((s) => (
                      <div key={s.label}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                            {s.label}
                          </span>
                          <span className="font-bold" style={{ color: s.color }}>{s.value}%</span>
                        </div>
                        <p className="text-right text-[10px] text-slate-400">{s.count} laporan</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rekap table */}
              <div className="rounded-xl bg-white p-6 shadow-card">
                <h3 className="text-sm font-bold text-slate-800 mb-4">Rekapitulasi Laporan per Dinas/Instansi</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 font-bold text-slate-400">
                        <th className="py-2 pr-2">No</th>
                        <th className="py-2 pr-2">Dinas / Instansi</th>
                        <th className="py-2 pr-2">Jumlah</th>
                        <th className="py-2 pr-2">Selesai</th>
                        <th className="py-2 pr-2">Diproses</th>
                        <th className="py-2 pr-2">Ditolak</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.id} className="border-b border-slate-100 last:border-0">
                          <td className="py-2.5 pr-2 text-slate-700">{r.id}</td>
                          <td className="py-2.5 pr-2 text-slate-800">{r.dinas}</td>
                          <td className="py-2.5 pr-2 font-bold text-blue-600">{r.jumlah}</td>
                          <td className="py-2.5 pr-2 font-bold text-emerald-600">{r.selesai}</td>
                          <td className="py-2.5 pr-2 font-bold text-blue-600">{r.diproses}</td>
                          <td className="py-2.5 pr-2 font-bold text-red-600">{r.ditolak}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    totalItems={REKAP_DINAS.length}
                    pageSize={pageSize}
                    onPageChange={setPage}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl bg-white p-5 shadow-card">
              <h3 className="text-base font-bold text-slate-800 mb-1">Laporan Terbaru</h3>
              <ul className="divide-y divide-slate-100">
                {LAPORAN_TERBARU.map((l) => (
                  <li key={l.nomor} className="flex items-start justify-between gap-2 py-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800">{l.nomor}</p>
                      <p className="text-[11px] text-slate-500">{l.dinas}</p>
                      <p className="text-[10px] text-slate-400">{l.tanggal}</p>
                    </div>
                    <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold ${LAPORAN_STATUS_PILL[l.status]}`}>
                      {l.status}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline">
                Lihat Semua <ArrowRight size={11} />
              </button>
            </div>

            <div className="rounded-xl bg-rose-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-200">
                  <Info size={13} className="text-rose-700" />
                </span>
                <p className="text-sm font-bold text-rose-800">Informasi</p>
              </div>
              <p className="text-xs text-slate-600">
                Laporan ini menampilkan rekapitulasi data permohonan informasi publik berdasarkan periode yang dipilih
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
