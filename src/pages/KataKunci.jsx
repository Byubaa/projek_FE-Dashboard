import { useMemo, useState } from "react";
import { Search, Tag, Lightbulb, HelpCircle, ArrowRight } from "lucide-react";
import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import Pagination from "../components/Pagination";
import { KATA_KUNCI_POPULER, KATA_KUNCI_ROWS, KATEGORI_KATA_KUNCI, KATEGORI_BADGE } from "../data/kataKunci";

export default function KataKunci() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(KATA_KUNCI_ROWS.length / pageSize));
  const rows = useMemo(() => KATA_KUNCI_ROWS.slice((page - 1) * pageSize, page * pageSize), [page]);

  return (
    <>
      <Topbar title="Kata Kunci" subtitle="Cari informasi berdasarkan kata kunci yang tersedia" />

      <main className="flex-1 p-6 space-y-6">
        <Breadcrumb items={[{ label: "Beranda", to: "/" }, { label: "Kata Kunci" }]} />

        {/* Search card */}
        <div className="rounded-xl bg-white p-6 shadow-card">
          <div className="flex gap-3 mb-5">
            <label className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari kata kunci (contoh: pendidikan, kesehatan, dll)"
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </label>
            <button className="rounded-lg bg-brand-700 px-6 text-sm font-bold text-white hover:bg-brand-600">
              Cari
            </button>
          </div>
          <p className="text-sm font-bold text-slate-700 mb-2">Kategori Populer:</p>
          <div className="flex flex-wrap gap-2">
            {KATA_KUNCI_POPULER.map((k) => (
              <button
                key={k}
                onClick={() => setQuery(k)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 hover:bg-slate-200"
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Results table */}
          <div className="rounded-xl bg-white p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-700">Hasil Pencarian Kata Kunci</h2>
              <p className="text-xs text-slate-500">Menampilkan 1 - {rows.length} dari {KATA_KUNCI_ROWS.length} data</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 font-bold text-slate-500">
                    <th className="py-2 pr-3">No</th>
                    <th className="py-2 pr-3">Kata Kunci</th>
                    <th className="py-2 pr-3">Jumlah Layanan</th>
                    <th className="py-2 pr-3">Dinas / Instansi</th>
                    <th className="py-2 pr-3">Kategori</th>
                    <th className="py-2 pr-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-3.5 pr-3 text-slate-700">{r.id}</td>
                      <td className="py-3.5 pr-3 font-bold text-slate-800">{r.kata}</td>
                      <td className="py-3.5 pr-3">
                        <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">
                          {r.jumlah}
                        </span>
                      </td>
                      <td className="py-3.5 pr-3 text-slate-700">{r.dinas}</td>
                      <td className="py-3.5 pr-3">
                        <span className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-bold ${KATEGORI_BADGE[r.color]}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                          {r.kategori}
                        </span>
                      </td>
                      <td className="py-3.5 pr-3 text-right">
                        <button className="text-xs font-medium text-brand-600 hover:underline">Lihat</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                totalItems={KATA_KUNCI_ROWS.length}
                pageSize={pageSize}
                onPageChange={setPage}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl bg-white p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-700 mb-4">
                <Tag size={15} className="text-slate-400" /> Kategori Kata Kunci
              </h3>
              <div className="space-y-3">
                {KATEGORI_KATA_KUNCI.map((k) => (
                  <div key={k.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className={`h-2 w-2 rounded-full ${k.dot}`} />
                      {k.label}
                    </span>
                    <span className="font-bold text-slate-700">{k.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border-l-4 border-orange-400 bg-white p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-base font-bold text-orange-500 mb-3">
                <Lightbulb size={16} /> Tips Pencarian
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Gunakan kata kunci yang spesifik untuk hasil yang lebih akurat. Contoh: &quot;beasiswa&quot;, &quot;KTP&quot;, &quot;BPJS&quot;.
              </p>
              <button className="flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline">
                Lihat Panduan <ArrowRight size={11} />
              </button>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-700 mb-3">
                <HelpCircle size={15} className="text-slate-400" /> Belum menemukan kata kunci?
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Anda dapat mengajukan kata kunci baru melalui menu Pengaduan.
              </p>
              <button className="flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline">
                Ajukan Kata Kunci <ArrowRight size={11} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
