export const LAPORAN_STATS = [
  { label: "Total Permohonan", value: 245, change: "+12%", changeUp: true, helper: "Permohonan layanan informasi" },
  { label: "Diproses", value: 120, change: "+8%", changeUp: true, helper: "Sedang dalam proses" },
  { label: "Selesai", value: 105, change: "+15%", changeUp: true, helper: "Telah ditanggapi" },
  { label: "Ditolak", value: 20, change: "-5%", changeUp: false, helper: "Tidak memenuhi syarat" },
];

export const STATUS_LAYANAN_BREAKDOWN = [
  { label: "Selesai", value: 43, count: 105, color: "#20b982" },
  { label: "Diproses", value: 49, count: 120, color: "#2f8df5" },
  { label: "Ditolak", value: 8, count: 20, color: "#f04455" },
];

// Representative sample trend (the source chart was a flattened SVG export,
// so exact daily values weren't recoverable) — swap in real API data later.
export const TREN_PERMOHONAN = [
  { tanggal: "15 Mei", Total: 28, Selesai: 14, Ditolak: 3 },
  { tanggal: "18 Mei", Total: 32, Selesai: 16, Ditolak: 3 },
  { tanggal: "20 Mei", Total: 26, Selesai: 12, Ditolak: 4 },
  { tanggal: "23 Mei", Total: 34, Selesai: 18, Ditolak: 4 },
  { tanggal: "25 Mei", Total: 38, Selesai: 19, Ditolak: 5 },
  { tanggal: "28 Mei", Total: 33, Selesai: 15, Ditolak: 4 },
  { tanggal: "31 Mei", Total: 36, Selesai: 17, Ditolak: 4 },
];

export const REKAP_DINAS = [
  { id: 1, dinas: "Dinas Pendidikan", jumlah: 54, selesai: 28, diproses: 22, ditolak: 4 },
  { id: 2, dinas: "Dinas Kesehatan", jumlah: 42, selesai: 20, diproses: 18, ditolak: 4 },
  { id: 3, dinas: "Dinas Kominfo", jumlah: 38, selesai: 16, diproses: 18, ditolak: 4 },
  { id: 4, dinas: "Dinas Pariwisata", jumlah: 27, selesai: 12, diproses: 12, ditolak: 3 },
  { id: 5, dinas: "Dinas Pekerjaan Umum", jumlah: 24, selesai: 10, diproses: 11, ditolak: 3 },
  { id: 6, dinas: "Dinas Sosial", jumlah: 18, selesai: 7, diproses: 9, ditolak: 2 },
  { id: 7, dinas: "Dinas Perhubungan", jumlah: 16, selesai: 6, diproses: 8, ditolak: 2 },
  { id: 8, dinas: "Dinas Lingkungan Hidup", jumlah: 12, selesai: 5, diproses: 6, ditolak: 1 },
  { id: 9, dinas: "Dinas Koperasi dan UKM", jumlah: 8, selesai: 3, diproses: 4, ditolak: 1 },
];

export const LAPORAN_TERBARU = [
  { nomor: "PPD-2025-0045", dinas: "Dinas Pendidikan", tanggal: "02 Mei 2025", status: "Ditolak" },
  { nomor: "PPD-2025-0044", dinas: "Dinas Kesehatan", tanggal: "01 Mei 2025", status: "Selesai" },
  { nomor: "PPD-2025-0043", dinas: "Dinas Kominfo", tanggal: "30 Apr 2025", status: "Diproses" },
  { nomor: "PPD-2025-0042", dinas: "Dinas Pariwisata", tanggal: "29 Apr 2025", status: "Selesai" },
  { nomor: "PPD-2025-0041", dinas: "Dinas Sosial", tanggal: "28 Apr 2025", status: "Ditolak" },
  { nomor: "PPD-2025-0040", dinas: "Dinas Perhubungan", tanggal: "27 Apr 2025", status: "Diproses" },
];

export const LAPORAN_STATUS_PILL = {
  Diproses: "bg-blue-50 text-blue-600",
  Selesai: "bg-green-50 text-green-600",
  Ditolak: "bg-red-50 text-red-600",
};
