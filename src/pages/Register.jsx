import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  UserPlus,
} from "lucide-react";

import loginBg from "../assets/LoginPage.png";
import logoJogja from "../assets/logo_jogja.png";

import { apiRequest } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ========================================================
  // REGISTER
  // ========================================================

  async function handleRegister(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ======================================================
    // VALIDASI
    // ======================================================

    if (!form.username.trim()) {
      setError(
        "Username wajib diisi."
      );
      return;
    }

    if (!form.password) {
      setError(
        "Password wajib diisi."
      );
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password minimal 6 karakter."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Konfirmasi password tidak sama."
      );
      return;
    }

    setLoading(true);

    try {
      // ==================================================
      // POST /api/register
      // ==================================================

      const result =
        await apiRequest(
          "/register",
          {
            method: "POST",

            body: JSON.stringify({
              username:
                form.username.trim(),

              password:
                form.password,
            }),
          }
        );

      setSuccess(
        result?.message ||
          "Registrasi berhasil."
      );

      // Kosongkan form
      setForm({
        username: "",
        password: "",
        confirmPassword: "",
      });

      // ==================================================
      // KEMBALI LOGIN
      // ==================================================

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      setError(
        err.message ||
          "Registrasi gagal."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        flex items-center justify-center
        bg-cover bg-center bg-no-repeat
        overflow-y-auto
        px-4 py-8
        select-none
      "
      style={{
        backgroundImage:
          `url(${loginBg})`,
      }}
    >

      {/* ================================================== */}
      {/* CONTAINER */}
      {/* ================================================== */}

      <div
        className="
          relative z-10
          flex flex-col
          items-center
          w-full
          max-w-[460px]
          mx-auto
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            flex flex-col
            items-center
            gap-2
            mb-4
            text-center
          "
        >

          <img
            src={logoJogja}
            alt="Logo Pemda DIY"
            className="
              w-20 h-20
              sm:w-24 sm:h-24
              object-contain
              drop-shadow-md
            "
          />

          <div>

            <h1
              className="
                text-xl sm:text-2xl
                font-bold
                text-white
                tracking-tight
              "
            >
              Layanan Informasi Publik
            </h1>

            <p
              className="
                text-xs
                text-white/80
                mt-1
              "
            >
              Sistem Informasi untuk Pengelolaan Layanan Publik
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* CARD */}
        {/* ================================================= */}

        <div
          className="
            w-full
            rounded-2xl
            bg-white
            p-6 sm:p-7
            shadow-2xl
          "
        >

          {/* TITLE */}

          <div
            className="
              flex items-center
              gap-3
              mb-5
            "
          >

            <span
              className="
                flex h-8 w-8
                items-center
                justify-center
                rounded-full
                bg-red-100
                text-red-600
              "
            >
              <UserPlus size={16} />
            </span>

            <div>

              <p
                className="
                  font-bold
                  text-slate-800
                  text-[16px]
                "
              >
                Registrasi Akun
              </p>

              <p
                className="
                  text-xs
                  text-slate-400
                  mt-0.5
                "
              >
                Buat akun untuk mengakses sistem admin
              </p>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div
              className="
                mb-3
                rounded-lg
                border border-red-200
                bg-red-50
                px-3 py-2
                text-xs
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div
              className="
                mb-3
                rounded-lg
                border border-green-200
                bg-green-50
                px-3 py-2
                text-xs
                text-green-600
              "
            >
              {success}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleRegister}
            className="space-y-3"
          >

            {/* USERNAME */}

            <div>

              <label
                className="
                  mb-1 block
                  text-[11px]
                  font-bold
                  uppercase
                  text-slate-400
                "
              >
                Username
              </label>

              <div
                className="
                  flex items-center
                  gap-2.5
                  rounded-lg
                  border border-slate-200
                  bg-slate-50/60
                  px-3 h-10
                  focus-within:border-red-400
                  focus-within:bg-white
                "
              >

                <User
                  size={15}
                  className="
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Masukkan username"
                  value={
                    form.username
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      username:
                        e.target.value,
                    })
                  }
                  className="
                    flex-1
                    bg-transparent
                    text-xs sm:text-sm
                    text-slate-700
                    placeholder:text-slate-300
                    focus:outline-none
                  "
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label
                className="
                  mb-1 block
                  text-[11px]
                  font-bold
                  uppercase
                  text-slate-400
                "
              >
                Password
              </label>

              <div
                className="
                  flex items-center
                  gap-2.5
                  rounded-lg
                  border border-slate-200
                  bg-slate-50/60
                  px-3 h-10
                  focus-within:border-red-400
                  focus-within:bg-white
                "
              >

                <Lock
                  size={15}
                  className="
                    text-slate-400
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  autoComplete="new-password"
                  placeholder="Masukkan password"
                  value={
                    form.password
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password:
                        e.target.value,
                    })
                  }
                  className="
                    flex-1
                    bg-transparent
                    text-xs sm:text-sm
                    text-slate-700
                    placeholder:text-slate-300
                    focus:outline-none
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) =>
                        !value
                    )
                  }
                  className="
                    text-slate-400
                    hover:text-slate-600
                  "
                >
                  {showPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <label
                className="
                  mb-1 block
                  text-[11px]
                  font-bold
                  uppercase
                  text-slate-400
                "
              >
                Konfirmasi Password
              </label>

              <div
                className="
                  flex items-center
                  gap-2.5
                  rounded-lg
                  border border-slate-200
                  bg-slate-50/60
                  px-3 h-10
                  focus-within:border-red-400
                  focus-within:bg-white
                "
              >

                <Lock
                  size={15}
                  className="
                    text-slate-400
                  "
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  required
                  autoComplete="new-password"
                  placeholder="Ulangi password"
                  value={
                    form.confirmPassword
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword:
                        e.target.value,
                    })
                  }
                  className="
                    flex-1
                    bg-transparent
                    text-xs sm:text-sm
                    text-slate-700
                    placeholder:text-slate-300
                    focus:outline-none
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (value) =>
                        !value
                    )
                  }
                  className="
                    text-slate-400
                    hover:text-slate-600
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>

              </div>

            </div>

            {/* REGISTER */}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-3
                h-10 sm:h-11
                w-full
                rounded-lg
                bg-[#AD1B1C]
                hover:bg-[#941617]
                disabled:opacity-60
                text-xs sm:text-sm
                font-bold
                text-white
                uppercase
                tracking-wider
                shadow-md
                transition-all
              "
            >
              {loading
                ? "MENDAFTARKAN..."
                : "REGISTRASI"}
            </button>

          </form>

          {/* BACK LOGIN */}

          <button
            type="button"
            onClick={() =>
              navigate("/login")
            }
            className="
              mt-4
              flex items-center
              justify-center
              gap-1
              text-xs
              text-slate-400
              hover:text-slate-600
              mx-auto
            "
          >

            <ArrowLeft size={13} />

            Kembali ke Login

          </button>

        </div>

      </div>

    </div>
  );
}