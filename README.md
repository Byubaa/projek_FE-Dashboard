# Layanan Informasi Publik — Dashboard

Hasil konversi desain Figma ([FE Dashboard](https://www.figma.com/design/5KYPvDI3uROz2vmphsJt1g)) menjadi aplikasi React.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Build untuk produksi:

```bash
npm run build
```

## Stack

- **Vite + React 19** — build tool & UI library
- **React Router v7** — routing antar halaman/frame
- **Tailwind CSS 3** — styling
- **Recharts** — semua chart (line chart & donut chart)
- **lucide-react** — icon set

## Struktur halaman (routes)

| Route | Halaman | Frame Figma asal |
|---|---|---|
| `/login` | Login | Login |
| `/` | Dashboard | Dashboard |
| `/data-layanan` | Data Layanan (list) | *(dibangun dari tabel di Dashboard)* |
| `/data-layanan/tambah` | Form Layanan | Form |
| `/dinas` | Dinas / Instansi | Dinas |
| `/status` | Status Layanan | Status |
| `/kata-kunci` | Kata Kunci | bhkl |
| `/laporan` | Laporan | SCREEN - CODETEA |
| `/pengaduan`, `/pengguna`, `/pengaturan` | Placeholder "belum tersedia" | *(tidak ada frame di Figma)* |

Navigasi Sidebar & Topbar sudah terhubung ke semua route di atas (highlight menu aktif otomatis mengikuti URL).

## Catatan penting: aset gambar

Beberapa aset di desain Figma asli **tidak bisa diunduh otomatis** karena di-hosting di
`figma.com` yang tidak dapat diakses dari environment saya saat membangun project ini
(bukan karena aset tidak ada, tapi karena pembatasan jaringan sandbox). Yang terdampak:

- **Logo instansi** (lambang di sidebar & halaman login) → diganti komponen SVG sederhana di `src/components/Logo.jsx`
- **Foto avatar "Admin PPID"** → diganti avatar inisial di `src/components/Avatar.jsx`
- **Ilustrasi latar halaman Login** (Tugu Jogja, pendopo, dst) → diganti ilustrasi SVG di `src/components/YogyaBackdrop.jsx`
- **Tekstur batik di sidebar** → diganti pola dot CSS ringan

Semua ikon kecil (nav, search, bell, dll) sudah diganti dengan **lucide-react** yang
setara secara visual dan tidak butuh file eksternal.

**Untuk hasil 100% identik dengan desain asli:** export aset-aset di atas langsung dari
Figma (klik kanan node → Export), lalu taruh di `src/assets/` dan ganti pemanggilannya
di komponen terkait.

## Data

Semua data (daftar layanan, dinas, status permohonan, kata kunci, laporan) saat ini
memakai data contoh di `src/data/*.js`, mengikuti isi asli di desain Figma. Ganti
dengan pemanggilan API sungguhan saat backend sudah tersedia.

Dua chart (grafik statistik per wilayah di Dashboard, dan tren permohonan di Laporan)
dibangun ulang sebagai **Recharts interaktif** — desain aslinya berupa SVG hasil
export statis, sehingga nilai datanya didekati secara representatif.
