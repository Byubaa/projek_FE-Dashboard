import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

function GithubMark(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.5 5.74 18.27.5 12 .5Z" />
    </svg>
  );
}
import YogyaBackdrop from "../components/YogyaBackdrop";
import Logo from "../components/Logo";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    // No backend wired up yet — this just demonstrates the connected flow.
    navigate("/");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
      <YogyaBackdrop />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center gap-3 mb-6 text-center">
          <Logo size={72} />
          <div>
            <h1 className="text-2xl font-bold text-red-100">Layanan Informasi Publik</h1>
            <p className="text-sm text-red-200/80">Sistem Informasi untuk Pengelolaan Layanan Publik</p>
          </div>
        </div>

        <div className="w-full max-w-[480px] rounded-xl bg-white p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <ShieldCheck size={16} className="text-brand-600" />
            </span>
            <div>
              <p className="font-bold text-slate-800 text-[17px]">Login Admin</p>
              <p className="text-xs text-slate-400">Silakan masuk untuk mengakses sistem</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase text-slate-400">
                Email
              </label>
              <div className="flex items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3 h-10">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="Masukkan email admin"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase text-slate-400">
                Password
              </label>
              <div className="flex items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3 h-10">
                <Lock size={16} className="text-slate-400 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Masukkan password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-400 shrink-0"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs font-medium text-brand-600 hover:underline">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-brand-600 text-sm font-bold text-white hover:bg-brand-700 transition-colors"
            >
              LOGIN
            </button>
          </form>

          <div className="flex items-center gap-2.5 my-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">atau</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-[11px] text-slate-400 mb-2.5">Login dengan</p>
          <div className="flex gap-2 mb-5">
            <button className="flex h-[38px] flex-1 items-center justify-center rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100">
              <Mail size={16} className="text-slate-500" />
            </button>
            <button className="flex h-[38px] flex-1 items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100">
              <GithubMark className="text-slate-500" />
              <span className="text-xs font-medium text-slate-500">GitHub</span>
            </button>
            <button className="flex h-[38px] flex-1 items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100">
              <Mail size={16} className="text-slate-500" />
              <span className="text-xs font-medium text-slate-500">Google</span>
            </button>
          </div>

          <div className="h-px bg-slate-100 mb-4" />

          <div className="flex flex-col items-center gap-2.5">
            <p className="text-xs text-slate-400">Belum punya akun?</p>
            <button
              type="button"
              className="h-[38px] w-full rounded-lg border border-brand-400 bg-white text-xs font-bold text-brand-600 hover:bg-brand-50"
            >
              REGISTRASI AKUN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
