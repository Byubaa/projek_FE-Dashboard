import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, ArrowLeft, Mail, Eye, EyeOff } from "lucide-react";
import loginBg from "../assets/LoginPage.png";
import logoJogja from "../assets/logo_jogja.png";

function GithubMark(props) {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.5 5.74 18.27.5 12 .5Z" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("splash"); // "splash" | "form"
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  function handleLoginSubmit(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-y-auto px-4 py-8 select-none"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {step === "splash" ? (
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl mx-auto -mt-6 animate-in fade-in duration-300">
          {/* Logo Pemda DIY */}
          <img
            src={logoJogja}
            alt="Logo Pemda DIY"
            className="w-30 h-30 sm:w-36 sm:h-36 object-contain mb-6 drop-shadow-md"
          />

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            Layanan Informasi Publik
          </h1>

          {/* Subtitle */}
          <p className="mt-2 text-xs sm:text-sm md:text-[15px] text-white/70 font-normal max-w-md leading-relaxed">
            Sistem Informasi untuk Pengelolaan Layanan Publik
          </p>

          {/* Tombol ke Form Login */}
          <button
            type="button"
            onClick={() => setStep("form")}
            className="mt-8 sm:mt-10 inline-flex items-center justify-between gap-4 bg-[#AD1B1C] hover:bg-[#941617] active:scale-[0.98] text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-3 rounded-lg shadow-[0_4px_14px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-all duration-150 min-w-[220px]"
          >
            <Lock size={16} strokeWidth={2.2} className="shrink-0" />
            <span className="flex-1 text-center">LOGIN ADMIN</span>
            <ArrowRight size={16} strokeWidth={2.2} className="shrink-0" />
          </button>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center w-full max-w-[460px] mx-auto animate-in fade-in zoom-in-95 duration-200">
          {/* Header atas */}
          <div className="flex flex-col items-center gap-2 mb-4 text-center">
            <img
              src={logoJogja}
              alt="Logo Pemda DIY"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                Layanan Informasi Publik
              </h1>
              <p className="text-xs text-white/80 mt-1">
                Sistem Informasi untuk Pengelolaan Layanan Publik
              </p>
            </div>
          </div>

          {/* Card Form Login */}
          <div className="w-full rounded-2xl bg-white p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 shrink-0">
                <Lock size={16} strokeWidth={2.5} />
              </span>
              <div>
                <p className="font-bold text-slate-800 text-[16px] leading-tight">Login Admin</p>
                <p className="text-xs text-slate-400 mt-0.5">Silakan masuk untuk mengakses sistem</p>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase text-slate-400">
                  Email
                </label>
                <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50/60 px-3 h-10 focus-within:border-red-400 focus-within:bg-white transition-colors">
                  <Mail size={15} className="text-slate-400 shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="Masukkan email admin"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="flex-1 bg-transparent text-xs sm:text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase text-slate-400">
                  Password
                </label>
                <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50/60 px-3 h-10 focus-within:border-red-400 focus-within:bg-white transition-colors">
                  <Lock size={15} className="text-slate-400 shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Masukkan password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="flex-1 bg-transparent text-xs sm:text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-slate-400 hover:text-slate-600 shrink-0"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-start">
                <a href="#" className="text-xs font-semibold text-red-600 hover:underline">
                  Lupa password?
                </a>
              </div>

              <button
                type="submit"
                className="h-10 sm:h-11 w-full rounded-lg bg-[#AD1B1C] hover:bg-[#941617] text-xs sm:text-sm font-bold text-white transition-all uppercase tracking-wider shadow-md hover:shadow-lg mt-1"
              >
                LOGIN
              </button>
            </form>

            <div className="flex items-center gap-2.5 my-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[11px] text-slate-400">atau</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-[11px] text-slate-400 mb-2">Login dengan</p>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                className="flex h-9 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
              >
                <Mail size={15} className="text-slate-500" />
              </button>
              <button
                type="button"
                className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
              >
                <GithubMark className="text-slate-600" />
                <span className="text-xs font-medium text-slate-600">GitHub</span>
              </button>
              <button
                type="button"
                className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
              >
                <Mail size={15} className="text-slate-500" />
                <span className="text-xs font-medium text-slate-600">Google</span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-400">Belum punya akun?</p>
              <button
                type="button"
                className="h-9 w-full rounded-lg border border-red-500 bg-white text-xs font-bold text-red-600 hover:bg-red-50 uppercase tracking-wider transition-colors"
              >
                REGISTRASI AKUN
              </button>
            </div>

            {/* Tombol Kembali ke Splash */}
            <button
              type="button"
              onClick={() => setStep("splash")}
              className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-400 hover:text-slate-600 mx-auto transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Kembali</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
