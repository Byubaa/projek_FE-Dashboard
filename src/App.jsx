import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DataLayanan from "./pages/DataLayanan";
import FormLayanan from "./pages/FormLayanan";
import Dinas from "./pages/Dinas";
import Status from "./pages/Status";
import KataKunci from "./pages/KataKunci";
import Laporan from "./pages/Laporan";
import Login from "./pages/Login";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-layanan" element={<DataLayanan />} />
        <Route path="/data-layanan/tambah" element={<FormLayanan />} />
        <Route path="/dinas" element={<Dinas />} />
        <Route path="/status" element={<Status />} />
        <Route path="/kata-kunci" element={<KataKunci />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/pengaduan" element={<ComingSoon title="Pengaduan" />} />
        <Route path="/pengguna" element={<ComingSoon title="Pengguna" />} />
        <Route path="/pengaturan" element={<ComingSoon title="Pengaturan" />} />
      </Route>
    </Routes>
  );
}
