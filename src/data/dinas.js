export const DINAS = [
  { id: 1, nama: "Dinas Komunikasi, Informatika dan Statistik", wilayah: "Kota Yogyakarta", kode: "DISKOMINFO-001", layanan: 12, status: "Aktif" },
  { id: 2, nama: "Dinas Kependudukan dan Pencatatan Sipil", wilayah: "Kota Yogyakarta", kode: "DISDUKCAPIL-002", layanan: 10, status: "Aktif" },
  { id: 3, nama: "Dinas Pendidikan", wilayah: "Kab. Sleman", kode: "DISDIK-003", layanan: 15, status: "Aktif" },
  { id: 4, nama: "Dinas Kesehatan", wilayah: "Kab. Bantul", kode: "DINKES-004", layanan: 11, status: "Aktif" },
  { id: 5, nama: "DPMPTSP", wilayah: "Kota Yogyakarta", kode: "DPMPTSP-005", layanan: 8, status: "Perlu Verifikasi" },
  { id: 6, nama: "Dinas Sosial", wilayah: "Kab. Gunungkidul", kode: "DINSOS-006", layanan: 7, status: "Aktif" },
  { id: 7, nama: "Dinas Perhubungan", wilayah: "Kab. Kulon Progo", kode: "DISHUB-007", layanan: 6, status: "Nonaktif" },
  { id: 8, nama: "Dinas Pariwisata", wilayah: "Kab. Sleman", kode: "DISPAR-008", layanan: 9, status: "Aktif" },
  { id: 9, nama: "Dinas Pekerjaan Umum", wilayah: "Kab. Bantul", kode: "DPUPR-009", layanan: 5, status: "Aktif" },
  { id: 10, nama: "Dinas Pertanian", wilayah: "Kab. Kulon Progo", kode: "DINPERTAN-010", layanan: 6, status: "Nonaktif" },
];

export const DINAS_PER_WILAYAH = [
  { label: "Kota Yogyakarta", value: 8, color: "#800a17" },
  { label: "Kab. Sleman", value: 7, color: "#e55353" },
  { label: "Kab. Bantul", value: 6, color: "#f88f8f" },
  { label: "Kab. Kulon Progo", value: 5, color: "#fbbfbf" },
  { label: "Kab. Gunungkidul", value: 4, color: "#fde2e2" },
];

export const DINAS_ACTIVITY = [
  { color: "bg-emerald-100", iconColor: "text-emerald-600", nama: "Dinas Pendidikan", time: "12:45", text: 'Baru saja menambahkan layanan "Informasi PPDB"' },
  { color: "bg-blue-100", iconColor: "text-blue-600", nama: "Dinas Kesehatan", time: "10:32", text: "Mengubah data instansi" },
  { color: "bg-amber-100", iconColor: "text-amber-600", nama: "DPMPTSP", time: "09:15", text: "Menunggu verifikasi data instansi" },
  { color: "bg-red-100", iconColor: "text-red-600", nama: "Dinas Sosial", time: "08:20", text: "Menonaktifkan layanan" },
  { color: "bg-emerald-100", iconColor: "text-emerald-600", nama: "Dinas Kominfo", time: "Kemarin", text: "Menambahkan layanan baru" },
];
