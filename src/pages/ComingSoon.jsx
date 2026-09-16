import { Construction } from "lucide-react";
import Topbar from "../components/Topbar";

export default function ComingSoon({ title }) {
  return (
    <>
      <Topbar title={title} subtitle="Layanan Informasi Publik" />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Construction size={24} className="text-slate-400" />
          </div>
          <h2 className="text-base font-semibold text-slate-700">Halaman {title} belum tersedia</h2>
          <p className="mt-1 text-sm text-slate-500">
            Frame untuk halaman ini belum ada di desain Figma, jadi belum dibuatkan tampilannya di sini.
          </p>
        </div>
      </main>
    </>
  );
}
