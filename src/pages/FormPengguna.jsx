import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Save,
  UserPlus,
  Info,
  Lightbulb,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";

import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";

import {
  apiRequest,
} from "../services/api";

// ============================================================
// DEFAULT
// ============================================================

const defaultForm = {
  username: "",
  password: "",
};

// ============================================================
// PAGE
// ============================================================

export default function FormPengguna() {

  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const editId =
    searchParams.get(
      "id"
    );

  const isEdit =
    Boolean(editId);

  // ==========================================================
  // FORM
  // ==========================================================

  const [
    form,
    setForm,
  ] = useState(
    defaultForm
  );

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    loading,
    setLoading,
  ] = useState(
    isEdit
  );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  // ==========================================================
  // LOAD EDIT
  // ==========================================================

  async function loadUser() {

    if (!editId) {

      setLoading(
        false
      );

      return;
    }

    setLoading(
      true
    );

    try {

      const result =
        await apiRequest(
          `/users/${editId}`
        );

      const item =
        result?.data;

      if (!item) {

        throw new Error(
          "Data pengguna tidak ditemukan."
        );
      }

      setForm({
        username:
          item.username ||
          "",

        password:
          "",
      });

    } catch (err) {

      setError(
        err.message ||
        "Gagal mengambil data pengguna."
      );

    } finally {

      setLoading(
        false
      );
    }
  }

  // ==========================================================
  // INITIAL
  // ==========================================================

  useEffect(() => {

    loadUser();

  }, [
    editId,
  ]);

  // ==========================================================
  // CHANGE
  // ==========================================================

  function handleChange(
    field,
    value
  ) {

    setForm(
      (current) => ({
        ...current,
        [field]:
          value,
      })
    );

    setError("");
    setSuccess("");
  }

  // ==========================================================
  // SUBMIT
  // ==========================================================

  async function handleSubmit(
    e
  ) {

    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    // ========================================================
    // VALIDATION USERNAME
    // ========================================================

    if (
      !form.username.trim()
    ) {

      setError(
        "Username wajib diisi."
      );

      setSaving(false);

      return;
    }

    // ========================================================
    // VALIDATION PASSWORD CREATE
    // ========================================================

    if (
      !isEdit &&
      !form.password
    ) {

      setError(
        "Password wajib diisi."
      );

      setSaving(false);

      return;
    }

    // ========================================================
    // PAYLOAD
    // ========================================================

    const payload = {

      username:
        form.username.trim(),

      password:
        form.password,

    };

    // ========================================================
    // SAVE
    // ========================================================

    try {

      let result;

      if (isEdit) {

        result =
          await apiRequest(
            `/users/${editId}`,
            {
              method:
                "PUT",

              body:
                JSON.stringify(
                  payload
                ),
            }
          );

      } else {

        result =
          await apiRequest(
            "/users",
            {
              method:
                "POST",

              body:
                JSON.stringify(
                  payload
                ),
            }
          );
      }

      setSuccess(
        result?.message ||
        (
          isEdit
            ? "Pengguna berhasil diperbarui."
            : "Pengguna berhasil ditambahkan."
        )
      );

      setTimeout(() => {

        navigate(
          "/pengguna"
        );

      }, 700);

    } catch (err) {

      setError(
        err.message ||
        "Gagal menyimpan pengguna."
      );

    } finally {

      setSaving(false);

    }
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <>
        <Topbar
          title={
            isEdit
              ? "Edit Pengguna"
              : "Form Pengguna"
          }
          subtitle="
            Kelola akun pengguna dashboard
          "
        />

        <main
          className="
            flex-1
            bg-slate-100
            p-6
          "
        >

          <div
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              p-12
              text-center
              text-xs
              text-slate-400
              shadow-card
            "
          >
            Memuat data pengguna...
          </div>

        </main>
      </>
    );
  }

  return (
    <>
      <Topbar
        title={
          isEdit
            ? "Edit Pengguna"
            : "Form Pengguna"
        }
        subtitle="
          Kelola akun pengguna dashboard
        "
      />

      <main
        className="
          flex-1
          bg-slate-100
          p-5
        "
      >

        {/* ===================================================
            BREADCRUMB
        ==================================================== */}

        <Breadcrumb
          items={[
            {
              label:
                "Beranda",
              to:
                "/dashboard",
            },

            {
              label:
                "Pengguna",
              to:
                "/pengguna",
            },

            {
              label:
                isEdit
                  ? "Edit"
                  : "Tambah",
            },
          ]}
        />

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-[minmax(0,1fr)_300px]
          "
        >

          {/* =================================================
              FORM CARD
          ================================================== */}

          <div
            className="
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-card
            "
          >

            {/* HEADER */}

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
                border-b
                border-slate-100
                px-6
                py-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-50
                    text-red-600
                  "
                >

                  <UserPlus
                    size={21}
                  />

                </div>

                <div>

                  <h1
                    className="
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    Form Pengguna
                  </h1>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-slate-400
                    "
                  >
                    {isEdit
                      ? "Ubah akun pengguna"
                      : "Tambah akun pengguna baru"}
                  </p>

                </div>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/pengguna"
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    bg-red-500
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    hover:bg-red-600
                  "
                >

                  <ArrowLeft
                    size={13}
                  />

                  Kembali

                </button>

                <button
                  type="submit"
                  form="form-pengguna"
                  disabled={
                    saving
                  }
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    bg-red-700
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    hover:bg-red-800
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  <Save
                    size={13}
                  />

                  {saving
                    ? "Menyimpan..."
                    : "Simpan Data"}

                </button>

              </div>

            </div>

            {/* MESSAGE */}

            {(error ||
              success) && (

              <div
                className="
                  px-6
                  pt-5
                "
              >

                {error && (

                  <div
                    className="
                      rounded-lg
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-xs
                      text-red-700
                    "
                  >
                    {error}
                  </div>

                )}

                {success && (

                  <div
                    className="
                      rounded-lg
                      border
                      border-emerald-200
                      bg-emerald-50
                      px-4
                      py-3
                      text-xs
                      text-emerald-700
                    "
                  >
                    {success}
                  </div>

                )}

              </div>

            )}

            {/* FORM */}

            <form
              id="form-pengguna"
              onSubmit={
                handleSubmit
              }
            >

              <div
                className="
                  mx-6
                  my-5
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                "
              >

                {/* SECTION */}

                <div
                  className="
                    border-b
                    border-slate-100
                    px-5
                    py-4
                  "
                >

                  <h2
                    className="
                      text-sm
                      font-bold
                      text-red-700
                    "
                  >
                    Data Pengguna
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-slate-400
                    "
                  >
                    Masukkan username dan password akun.
                  </p>

                </div>

                <div
                  className="
                    space-y-5
                    p-5
                  "
                >

                  {/* USERNAME */}

                  <div>

                    <label
                      className="
                        mb-1.5
                        block
                        text-[11px]
                        font-bold
                        text-slate-700
                      "
                    >
                      Username
                      <span
                        className="
                          ml-1
                          text-red-500
                        "
                      >
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      value={
                        form.username
                      }
                      onChange={(e) =>
                        handleChange(
                          "username",
                          e.target.value
                        )
                      }
                      placeholder="
                        Contoh: admin
                      "
                      autoComplete="username"
                      required
                      className="
                        w-full
                        rounded-lg
                        border
                        border-slate-300
                        bg-white
                        px-3
                        py-2.5
                        text-xs
                        text-slate-700
                        outline-none
                        placeholder:text-slate-300
                        focus:border-red-400
                        focus:ring-2
                        focus:ring-red-100
                      "
                    />

                  </div>

                  {/* PASSWORD */}

                  <div>

                    <label
                      className="
                        mb-1.5
                        block
                        text-[11px]
                        font-bold
                        text-slate-700
                      "
                    >
                      Password

                      {!isEdit && (
                        <span
                          className="
                            ml-1
                            text-red-500
                          "
                        >
                          *
                        </span>
                      )}

                    </label>

                    <div
                      className="
                        relative
                      "
                    >

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={
                          form.password
                        }
                        onChange={(e) =>
                          handleChange(
                            "password",
                            e.target.value
                          )
                        }
                        placeholder={
                          isEdit
                            ? "Kosongkan jika tidak ingin mengubah password"
                            : "Masukkan password"
                        }
                        autoComplete={
                          isEdit
                            ? "new-password"
                            : "new-password"
                        }
                        required={
                          !isEdit
                        }
                        className="
                          w-full
                          rounded-lg
                          border
                          border-slate-300
                          bg-white
                          py-2.5
                          pl-3
                          pr-10
                          text-xs
                          text-slate-700
                          outline-none
                          placeholder:text-slate-300
                          focus:border-red-400
                          focus:ring-2
                          focus:ring-red-100
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) =>
                              !current
                          )
                        }
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                          hover:text-slate-600
                        "
                      >

                        {showPassword ? (

                          <EyeOff
                            size={15}
                          />

                        ) : (

                          <Eye
                            size={15}
                          />

                        )}

                      </button>

                    </div>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-slate-400
                      "
                    >
                      {isEdit
                        ? "Biarkan kosong apabila password tidak ingin diubah."
                        : "Password akan disimpan dalam bentuk hash."}
                    </p>

                  </div>

                </div>

              </div>

              {/* BOTTOM */}

              <div
                className="
                  flex
                  items-center
                  justify-end
                  gap-2
                  border-t
                  border-slate-100
                  px-6
                  py-4
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/pengguna"
                    )
                  }
                  className="
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-xs
                    font-medium
                    text-slate-600
                    hover:bg-slate-50
                  "
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={
                    saving
                  }
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    bg-red-700
                    px-5
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    hover:bg-red-800
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  <Save
                    size={13}
                  />

                  {saving
                    ? "Menyimpan..."
                    : isEdit
                    ? "Simpan Perubahan"
                    : "Simpan Pengguna"}

                </button>

              </div>

            </form>

          </div>

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <div
            className="
              space-y-4
            "
          >

            {/* INFO */}

            <aside
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-card
              "
            >

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                "
              >

                <Info
                  size={15}
                  className="
                    text-red-600
                  "
                />

                <h3
                  className="
                    text-xs
                    font-bold
                    text-red-700
                  "
                >
                  Informasi Akun
                </h3>

              </div>

              <p
                className="
                  text-[11px]
                  leading-5
                  text-slate-500
                "
              >
                Data pengguna digunakan untuk
                autentikasi dashboard melalui username,
                password, dan JWT.
              </p>

            </aside>

            {/* SECURITY */}

            <aside
              className="
                rounded-xl
                border
                border-blue-200
                bg-blue-50
                p-5
              "
            >

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                "
              >

                <Info
                  size={15}
                  className="
                    text-blue-600
                  "
                />

                <h3
                  className="
                    text-xs
                    font-bold
                    text-blue-700
                  "
                >
                  Keamanan Password
                </h3>

              </div>

              <p
                className="
                  text-[11px]
                  leading-5
                  text-blue-700
                "
              >
                Password tidak disimpan dalam bentuk
                teks biasa. Backend mengenkripsi password
                menggunakan hashing bcrypt sebelum
                disimpan ke database.
              </p>

            </aside>

            {/* TIPS */}

            <aside
              className="
                rounded-xl
                border
                border-emerald-200
                bg-emerald-50
                p-5
              "
            >

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                "
              >

                <Lightbulb
                  size={15}
                  className="
                    text-emerald-600
                  "
                />

                <h3
                  className="
                    text-xs
                    font-bold
                    text-emerald-700
                  "
                >
                  Tips Pengisian
                </h3>

              </div>

              <div
                className="
                  space-y-2
                  text-[11px]
                  leading-5
                  text-emerald-800
                "
              >

                <p>
                  • Gunakan username yang mudah dikenali.
                </p>

                <p>
                  • Jangan menggunakan username yang sama.
                </p>

                <p>
                  • Gunakan password yang tidak mudah ditebak.
                </p>

                <p>
                  • Saat edit, password boleh dikosongkan jika tidak ingin diganti.
                </p>

              </div>

            </aside>

            {/* EXAMPLE */}

            <aside
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                p-5
              "
            >

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                "
              >

                <FileText
                  size={15}
                  className="
                    text-red-600
                  "
                />

                <h3
                  className="
                    text-xs
                    font-bold
                    text-red-700
                  "
                >
                  Contoh
                </h3>

              </div>

              <div
                className="
                  space-y-3
                  text-[11px]
                "
              >

                <div>

                  <p
                    className="
                      font-semibold
                      text-red-700
                    "
                  >
                    Username
                  </p>

                  <p
                    className="
                      mt-1
                      text-red-700
                    "
                  >
                    admin
                  </p>

                </div>

                <div>

                  <p
                    className="
                      font-semibold
                      text-red-700
                    "
                  >
                    Password
                  </p>

                  <p
                    className="
                      mt-1
                      text-red-700
                    "
                  >
                    ••••••••••
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </main>
    </>
  );
}