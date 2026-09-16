export const PERMOHONAN = [
  { id: 1, nomor: "PPID-2025-0012", pemohon: "Rina Amelia", instansi: "Dinas Pendidikan", jenis: "Data Program Kerja", tanggal: "12 Mei 2025", status: "Diproses" },
  { id: 2, nomor: "PPID-2025-0011", pemohon: "Budi Santoso", instansi: "Dinas Kesehatan", jenis: "Data Vaksinasi", tanggal: "10 Mei 2025", status: "Selesai" },
  { id: 3, nomor: "PPID-2025-0010", pemohon: "Siti Nurhaliza", instansi: "Dinas Kominfo", jenis: "Data Anggaran", tanggal: "8 Mei 2025", status: "Diproses" },
  { id: 4, nomor: "PPID-2025-0009", pemohon: "Andi Pratama", instansi: "Dinas Sosial", jenis: "Data Bantuan Sosial", tanggal: "6 Mei 2025", status: "Selesai" },
  { id: 5, nomor: "PPID-2025-0008", pemohon: "Dewi Lestari", instansi: "Dinas Pariwisata", jenis: "Data Event Daerah", tanggal: "4 Mei 2025", status: "Ditolak" },
  { id: 6, nomor: "PPID-2025-0007", pemohon: "Agus Setiawan", instansi: "Dinas Pekerjaan Umum", jenis: "Data Proyek Infrastruktur", tanggal: "2 Mei 2025", status: "Selesai" },
  { id: 7, nomor: "PPID-2025-0006", pemohon: "Maya Sari", instansi: "Dinas Perhubungan", jenis: "Data Transportasi", tanggal: "30 Apr 2025", status: "Diproses" },
  { id: 8, nomor: "PPID-2025-0005", pemohon: "Rizky Wijaya", instansi: "Dinas Pertanian", jenis: "Data Produksi Pertanian", tanggal: "28 Apr 2025", status: "Selesai" },
  { id: 9, nomor: "PPID-2025-0004", pemohon: "Lina Marlina", instansi: "Dinas Lingkungan Hidup", jenis: "Data Pengelolaan Sampah", tanggal: "25 Apr 2025", status: "Diproses" },
  { id: 10, nomor: "PPID-2025-0003", pemohon: "Fajar Hidayat", instansi: "Dinas Kependudukan", jenis: "Data Kependudukan", tanggal: "22 Apr 2025", status: "Selesai" },
];

export const STATUS_BREAKDOWN = [
  { label: "Selesai", value: 56, color: "#059669" },
  { label: "Diproses", value: 38, color: "#2563eb" },
  { label: "Ditolak", value: 6, color: "#e11d48" },
];

export const PERMOHONAN_TERBARU = PERMOHONAN.slice(0, 5);
