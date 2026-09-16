import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileEdit, ArrowLeft, Save, Link2, AlertTriangle, Info, Lightbulb, FileText } from "lucide-react";
import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import FormField, { inputClass } from "../components/FormField";
import TagInput from "../components/TagInput";

const STATUS_INFO = [
  { color: "text-green-500", bg: "bg-green-500", label: "Online / Aktif", desc: "Layanan dapat diakses langsung" },
  { color: "text-red-500", bg: "bg-red-500", label: "Offline / Tidak Aktif", desc: "Layanan tidak dapat diakses online" },
  { color: "text-amber-500", bg: "bg-amber-500", label: "Perlu Pembaruan", desc: "Data layanan perlu diverifikasi" },
];

export default function FormLayanan() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    wilayah: "",
    provinsiKabKota: "",
    dinas: "",
    statusLayanan: "",
    kategoriLayanan: "",
    namaLayanan: "",
    kataKunci: ["nik", "kependudukan", "data pribadi"],
    link: "",
    ketersediaan: "online",
    deskripsi: "",
  });

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/data-layanan");
  }

  return (
    <>
      <Topbar title="Data Layanan" subtitle="Layanan Informasi Publik" />

      <main className="flex-1 p-6">
        <Breadcrumb
          items={[
            { label: "Beranda", to: "/" },
            { label: "Data Layanan", to: "/data-layanan" },
            { label: "Form Layanan" },
          ]}
        />

        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6 items-start">
          {/* Main card */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <FileEdit size={18} className="text-brand-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Form Layanan Informasi Publik</p>
                  <p className="text-xs text-slate-500">Tambah atau perbarui data layanan informasi publik</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-1.5 rounded bg-[#ce5151] px-4 py-2 text-xs text-white hover:bg-red-500"
                >
                  <ArrowLeft size={13} /> Kembali
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded bg-brand-600 px-4 py-2 text-xs text-white hover:bg-brand-700"
                >
                  <Save size={13} /> Simpan Data
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-4 space-y-5">
              <p className="text-sm font-semibold text-brand-600 -mt-1">Data Layanan</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Wilayah">
                  <select className={inputClass} value={form.wilayah} onChange={(e) => set("wilayah", e.target.value)}>
                    <option value="">Pilih wilayah</option>
                    <option>Provinsi DIY</option>
                    <option>Kota Yogyakarta</option>
                    <option>Kab. Sleman</option>
                    <option>Kab. Bantul</option>
                    <option>Kab. Kulon Progo</option>
                    <option>Kab. Gunungkidul</option>
                  </select>
                </FormField>
                <FormField label="Provinsi / Kab. / Kota">
                  <input
                    className={inputClass}
                    value={form.provinsiKabKota}
                    onChange={(e) => set("provinsiKabKota", e.target.value)}
                  />
                </FormField>
                <FormField label="Dinas / OPD">
                  <select className={inputClass} value={form.dinas} onChange={(e) => set("dinas", e.target.value)}>
                    <option value="">Pilih dinas / OPD</option>
                    <option>Dinas Kependudukan dan Pencatatan Sipil</option>
                    <option>Dinas Pendidikan</option>
                    <option>Dinas Kesehatan</option>
                    <option>Dinas Sosial</option>
                    <option>DPMPTSP</option>
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Status Layanan" required>
                  <select
                    className={inputClass}
                    value={form.statusLayanan}
                    onChange={(e) => set("statusLayanan", e.target.value)}
                    required
                  >
                    <option value="">Pilih status</option>
                    <option>Aktif</option>
                    <option>Perlu Update</option>
                    <option>Non aktif</option>
                  </select>
                </FormField>
                <FormField label="Kategori Layanan" required>
                  <select
                    className={inputClass}
                    value={form.kategoriLayanan}
                    onChange={(e) => set("kategoriLayanan", e.target.value)}
                    required
                  >
                    <option value="">Pilih kategori</option>
                    <option>Informasi Publik</option>
                    <option>Kependudukan</option>
                    <option>Pendidikan</option>
                    <option>Kesehatan</option>
                    <option>Perizinan</option>
                  </select>
                </FormField>
                <FormField label="Jenis Layanan / Nama Layanan" required>
                  <input
                    className={inputClass}
                    placeholder="Contoh: Cek NIK, Permohonan Informasi, dll"
                    value={form.namaLayanan}
                    onChange={(e) => set("namaLayanan", e.target.value)}
                    required
                  />
                </FormField>
              </div>

              <FormField label="Kata Kunci" required>
                <TagInput tags={form.kataKunci} onChange={(t) => set("kataKunci", t)} />
              </FormField>

              <FormField label="Link Layanan" required>
                <div className="flex gap-2">
                  <input
                    className={inputClass}
                    placeholder="https://..."
                    value={form.link}
                    onChange={(e) => set("link", e.target.value)}
                    required
                  />
                  <a
                    href={form.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex shrink-0 items-center gap-1.5 rounded bg-brand-600 px-4 text-xs text-white hover:bg-brand-700"
                  >
                    <Link2 size={12} /> Buka Link
                  </a>
                </div>
              </FormField>

              <FormField label="Status Layanan" required>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <input
                      type="radio"
                      name="ketersediaan"
                      checked={form.ketersediaan === "online"}
                      onChange={() => set("ketersediaan", "online")}
                      className="accent-brand-600"
                    />
                    Online / Aktif
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-500">
                    <input
                      type="radio"
                      name="ketersediaan"
                      checked={form.ketersediaan === "offline"}
                      onChange={() => set("ketersediaan", "offline")}
                      className="accent-brand-600"
                    />
                    Offline / Tidak Aktif
                  </label>
                </div>
              </FormField>

              {form.ketersediaan === "offline" && (
                <div className="rounded border border-red-300 bg-red-50 p-3">
                  <p className="flex items-center gap-2 text-xs font-semibold text-red-700 mb-2">
                    <AlertTriangle size={13} /> Tata Cara Menampilkan Layanan (Jika Offline)
                  </p>
                  <ul className="space-y-1 text-xs text-red-700 list-disc list-inside">
                    <li>Hubungi Dinas/OPD terkait melalui kontak resmi.</li>
                    <li>Datangi langsung kantor Dinas/OPD pada jam layanan.</li>
                    <li>Layanan dapat diakses melalui kanal resmi lainnya sesuai informasi dari Dinas/OPD.</li>
                  </ul>
                </div>
              )}

              <FormField label="Deskripsi / Keterangan">
                <textarea
                  rows={4}
                  maxLength={500}
                  className={inputClass}
                  placeholder="Masukkan deskripsi singkat mengenai layanan (opsional)..."
                  value={form.deskripsi}
                  onChange={(e) => set("deskripsi", e.target.value)}
                />
                <p className="mt-1 text-right text-[10px] text-slate-400">{form.deskripsi.length} / 500</p>
              </FormField>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-brand-600 mb-3">
                <Info size={13} /> Informasi Status
              </p>
              <div className="space-y-3">
                {STATUS_INFO.map((s) => (
                  <div key={s.label} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${s.bg}`} />
                    <div>
                      <p className={`text-xs font-semibold ${s.color}`}>{s.label}</p>
                      <p className="text-xs text-slate-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-green-500 bg-green-50 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-green-800 mb-3">
                <Lightbulb size={13} /> Tips Pengisian:
              </p>
              <ul className="space-y-2 text-xs text-green-800 list-disc list-inside">
                <li>Pastikan URL layanan berasal dari situs resmi.</li>
                <li>Gunakan kata kunci yang relevan dan mudah dicari.</li>
                <li>Perbarui status layanan secara berkala.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-red-300 bg-red-50 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-red-700 mb-3">
                <FileText size={13} /> Contoh Pengisian:
              </p>
              <dl className="space-y-1.5 text-xs text-red-700">
                <div className="flex gap-1">
                  <dt className="font-semibold w-14 shrink-0">Wilayah</dt>
                  <dd>: Provinsi DIY</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="font-semibold w-14 shrink-0">Dinas</dt>
                  <dd>: Dinas Kependudukan dan Pencatatan Sipil</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="font-semibold w-14 shrink-0">Layanan</dt>
                  <dd>: Cek NIK</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="font-semibold w-14 shrink-0">Link</dt>
                  <dd>: https://dukcapil.jogjaprov.go.id</dd>
                </div>
              </dl>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
