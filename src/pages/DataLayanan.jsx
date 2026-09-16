import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Search, Plus } from "lucide-react";
import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import LayananTable from "../components/LayananTable";
import { LAYANAN } from "../data/layanan";

export default function DataLayanan() {
  const navigate = useNavigate();
  return (
    <>
      <Topbar title="Data Layanan" subtitle="Layanan Informasi Publik" />

      <main className="flex-1 p-6">
        <Breadcrumb items={[{ label: "Beranda", to: "/dashboard" }, { label: "Data Layanan" }]} />

        <div className="rounded-xl bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-700">Daftar Layanan Informasi Publik</h2>
              <p className="text-xs text-slate-400">Kelola seluruh layanan informasi publik yang terdaftar</p>
            </div>
            <Link
              to="/data-layanan/tambah"
              className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
            >
              <Plus size={14} /> Tambah Layanan
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700">
              Semua Wilayah <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700">
              Semua Status <ChevronDown size={12} />
            </button>
            <label className="relative flex-1 min-w-[180px]">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama dinas, layanan..."
                className="w-full rounded-lg border border-slate-300 py-2 pl-8 pr-3 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </label>
          </div>

          <LayananTable
            data={LAYANAN}
            pageSize={8}
            showActions
            onEdit={() => navigate("/data-layanan/tambah")}
          />
        </div>
      </main>
    </>
  );
}
