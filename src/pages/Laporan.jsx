import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  Info,
  ChevronDown,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import Topbar from "../components/Topbar";
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
  { icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
  { icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
  { icon: XCircle, bg: "bg-rose-50", color: "text-rose-600" },
];

export default function Laporan() {
  const [page, setPage] = useState(1);
  const totalPages = 5;

  return (
    <>
      <Topbar title="Laporan" subtitle="Rekapitulasi data layanan informasi publik" />

      <main className="flex-1 p-6 space-y-6">
        {/* Top Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.5fr_auto] gap-4 items-center">
          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 shadow-sm">
            <p className="text-[11px] text-slate-400">Periode</p>
            <div className="flex items-center justify-between gap-2 mt-0.5">
              <span className="text-xs font-semibold text-slate-800">01 Mei 2025 - 31 Mei 2025</span>
              <ChevronDown size={14} className="text-slate-400 shrink-0" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 shadow-sm">
            <p className="text-[11px] text-slate-400">Kategori</p>
            <div className="flex items-center justify-between gap-2 mt-0.5">
              <span className="text-xs font-semibold text-slate-800">Semua Kategori</span>
              <ChevronDown size={14} className="text-slate-400 shrink-0" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 shadow-sm">
            <p className="text-[11px] text-slate-400">Dinas / Instansi</p>
            <div className="flex items-center justify-between gap-2 mt-0.5">
              <span className="text-xs font-semibold text-slate-800">Semua Instansi</span>
              <ChevronDown size={14} className="text-slate-400 shrink-0" />
            </div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#8B1816] hover:bg-[#781412] px-5 py-3 text-xs font-semibold text-white shadow-sm transition-colors whitespace-nowrap"
          >
            <Download size={14} />
            <span>Unduh Laporan</span>
            <ChevronDown size={13} />
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LAPORAN_STATS.map((s, i) => {
            const { icon: Icon, bg, color } = STAT_ICONS[i];
            return (
              <div
                key={s.label}
                className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                  <Icon size={20} className={color} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-500">{s.label}</p>
                  <p className="text-xl font-bold text-slate-900 mt-0.5">
                    {s.value}{" "}
                    <span
                      className={`text-xs font-semibold ${
                        s.changeUp ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {s.change}
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{s.helper}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid: Left Wide Area + Right Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-6 items-start">
          {/* Left Area: Charts Row + Rekap Table Below */}
          <div className="space-y-6 min-w-0">
            {/* 2 Charts Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6">
              {/* Card 1: Tren Permohonan Layanan */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <h2 className="text-sm sm:text-base font-bold text-slate-800 mb-3">
                  Tren Permohonan Layanan
                </h2>
                <TrendChart data={TREN_PERMOHONAN} height={210} />
              </div>

              {/* Card 2: Perbandingan Status Layanan */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col">
                <h2 className="text-sm sm:text-base font-bold text-slate-800 mb-4">
                  Perbandingan Status Layanan
                </h2>
                <div className="flex-1 flex items-center justify-center gap-4">
                  <StatusDonutChart
                    data={STATUS_LAYANAN_BREAKDOWN}
                    total={245}
                    subtitle="Total Laporan"
                    size={145}
                  />
                  <div className="space-y-3 min-w-[110px]">
                    {STATUS_LAYANAN_BREAKDOWN.map((s) => (
                      <div key={s.label}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 font-bold text-slate-800">
                            <span
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: s.color }}
                            />
                            {s.label}
                          </span>
                          <span className="font-bold" style={{ color: s.color }}>
                            {s.value}%
                          </span>
                        </div>
                        <p className="text-right text-[10px] text-slate-400 mt-0.5">
                          {s.count} laporan
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Wide Table: Rekapitulasi Laporan per Dinas/Instansi */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <h2 className="text-sm sm:text-base font-bold text-slate-800 mb-4">
                Rekapitulasi Laporan per Dinas/Instansi
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-medium">
                      <th className="py-2.5 px-3 w-12">No</th>
                      <th className="py-2.5 px-3">Dinas / Instansi</th>
                      <th className="py-2.5 px-3">Jumlah Laporan</th>
                      <th className="py-2.5 px-3">Selesai</th>
                      <th className="py-2.5 px-3">Diproses</th>
                      <th className="py-2.5 px-3">Ditolak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {REKAP_DINAS.map((r, idx) => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-3 text-slate-700">{idx === 8 ? 10 : r.id}</td>
                        <td className="py-3 px-3 text-slate-800 font-medium">{r.dinas}</td>
                        <td className="py-3 px-3 font-bold text-blue-600">{r.jumlah}</td>
                        <td className="py-3 px-3 font-bold text-emerald-600">{r.selesai}</td>
                        <td className="py-3 px-3 font-bold text-blue-600">{r.diproses}</td>
                        <td className="py-3 px-3 font-bold text-red-600">{r.ditolak}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer / Pagination */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500">Menampilkan 1 - 10 dari 128 data</p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                        page === p
                          ? "bg-[#981611] text-white"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-5 w-full">
            {/* Laporan Terbaru */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-800">Laporan Terbaru</h3>
                <Link
                  to="#"
                  className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors"
                >
                  <span>Lihat Semua</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
              <ul className="divide-y divide-slate-100">
                {LAPORAN_TERBARU.map((l) => (
                  <li key={l.nomor} className="py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-800">{l.nomor}</p>
                      <span
                        className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold ${LAPORAN_STATUS_PILL[l.status]}`}
                      >
                        {l.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{l.dinas}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{l.tanggal}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informasi Banner */}
            <div className="rounded-xl bg-red-50/70 border border-red-100/80 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold">
                  <Info size={12} />
                </span>
                <p className="text-xs font-bold text-red-800">Informasi</p>
              </div>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Laporan ini menampilkan rekapitulasi data permohonan informasi publik berdasarkan
                periode yang dipilih
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
