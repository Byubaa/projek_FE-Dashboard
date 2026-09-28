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
  Building2,
  Info,
  Lightbulb,
  FileText,
  Globe2,
  ShieldCheck,
  CircleCheck,
  CircleX,
} from "lucide-react";

import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";

import {
  apiRequest,
} from "../services/api";

// ============================================================
// DEFAULT FORM
// ============================================================

const defaultForm = {
  wilayah_id: "",
  kode_instansi: "",
  nama_instansi: "",
  singkatan: "",
  website: "",
  aktif: true,
};

// ============================================================
// MAPPING TIPE WILAYAH → LEVEL PEMERINTAHAN
// ============================================================

function getLevelFromWilayah(
  wilayah
) {

  if (!wilayah) {
    return "";
  }

  const tipe =
    String(
      wilayah.tipe || ""
    )
      .trim()
      .toLowerCase();

  switch (tipe) {

    case "nasional":
      return "Pusat";

    case "pusat":
      return "Pusat";

    case "provinsi":
      return "Provinsi";

    case "kabupaten":
      return "Kabupaten";

    case "kota":
      return "Kota";

    default:
      return wilayah.tipe || "";
  }
}

// ============================================================
// PAGE
// ============================================================

export default function FormInstansi() {

  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  // ==========================================================
  // EDIT ID
  // ==========================================================

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
  // WILAYAH
  // ==========================================================

  const [
    wilayahList,
    setWilayahList,
  ] = useState([]);

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

  // ==========================================================
  // LOAD WILAYAH
  // ==========================================================

  async function loadWilayah() {

    try {

      const result =
        await apiRequest(
          "/wilayah"
        );

      setWilayahList(
        result?.data || []
      );

    } catch (err) {

      setError(
        err.message ||
        "Gagal mengambil data wilayah."
      );

    }
  }

  // ==========================================================
  // LOAD DATA EDIT
  // ==========================================================

  async function loadInstansi() {

    if (!editId) {
      return;
    }

    setLoading(true);
    setError("");

    try {

      const result =
        await apiRequest(
          `/instansi/${editId}`
        );

      const item =
        result?.data;

      if (!item) {

        throw new Error(
          "Data instansi tidak ditemukan."
        );
      }

      setForm({

        wilayah_id:
          item.wilayah_id
            ? String(
                item.wilayah_id
              )
            : "",

        kode_instansi:
          item.kode_instansi ||
          "",

        nama_instansi:
          item.nama_instansi ||
          "",

        singkatan:
          item.singkatan ||
          "",

        website:
          item.website ||
          "",

        aktif:
          item.aktif === true,

      });

    } catch (err) {

      setError(
        err.message ||
        "Gagal mengambil data instansi."
      );

    } finally {

      setLoading(false);

    }
  }

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    async function initialize() {

      await loadWilayah();

      await loadInstansi();

    }

    initialize();

  }, [
    editId,
  ]);

  // ==========================================================
  // HANDLE CHANGE
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
  // WILAYAH TERPILIH
  // ==========================================================

  const selectedWilayah =
    wilayahList.find(
      (item) =>
        String(
          item.id
        ) ===
        String(
          form.wilayah_id
        )
    );

  // ==========================================================
  // LEVEL OTOMATIS
  // ==========================================================

  const levelPemerintahan =
    getLevelFromWilayah(
      selectedWilayah
    );

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
    // VALIDASI WILAYAH
    // ========================================================

    if (!form.wilayah_id) {

      setError(
        "Wilayah wajib dipilih."
      );

      setSaving(false);

      return;
    }

    // ========================================================
    // VALIDASI LEVEL
    // ========================================================

    if (!levelPemerintahan) {

      setError(
        "Level pemerintahan tidak dapat ditentukan dari wilayah."
      );

      setSaving(false);

      return;
    }

    // ========================================================
    // VALIDASI KODE
    // ========================================================

    if (
      !form.kode_instansi.trim()
    ) {

      setError(
        "Kode instansi wajib diisi."
      );

      setSaving(false);

      return;
    }

    // ========================================================
    // VALIDASI NAMA
    // ========================================================

    if (
      !form.nama_instansi.trim()
    ) {

      setError(
        "Nama dinas / instansi wajib diisi."
      );

      setSaving(false);

      return;
    }

    // ========================================================
    // PAYLOAD
    // ========================================================
    //
    // level_id sengaja TIDAK dikirim.
    //
    // Backend akan menentukan level_id
    // berdasarkan wilayah.tipe.
    //

    const payload = {

      wilayah_id:
        Number(
          form.wilayah_id
        ),

      kode_instansi:
        form.kode_instansi.trim(),

      nama_instansi:
        form.nama_instansi.trim(),

      singkatan:
        form.singkatan.trim(),

      website:
        form.website.trim(),

      aktif:
        Boolean(
          form.aktif
        ),
    };

    // ========================================================
    // CREATE / UPDATE
    // ========================================================

    try {

      let result;

      if (isEdit) {

        result =
          await apiRequest(
            `/instansi/${editId}`,
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
            "/instansi",
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

      // ======================================================
      // SUCCESS
      // ======================================================

      setSuccess(
        result?.message ||
        (
          isEdit
            ? "Instansi berhasil diperbarui."
            : "Instansi berhasil ditambahkan."
        )
      );

      // Beri waktu supaya pesan sukses terlihat
      setTimeout(() => {

        navigate(
          "/dinas"
        );

      }, 700);

    } catch (err) {

      setError(
        err.message ||
        "Gagal menyimpan data instansi."
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
              ? "Edit Dinas / Instansi"
              : "Form Dinas / Instansi"
          }
          subtitle="
            Kelola data dinas dan instansi
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
              text-sm
              text-slate-400
              shadow-card
            "
          >
            Memuat data instansi...
          </div>

        </main>
      </>
    );
  }

  return (
    <>
      {/* =====================================================
          TOPBAR
      ====================================================== */}

      <Topbar
        title={
          isEdit
            ? "Edit Dinas / Instansi"
            : "Form Dinas / Instansi"
        }
        subtitle="
          Kelola data dinas dan instansi yang terdaftar
        "
      />

      {/* =====================================================
          MAIN
      ====================================================== */}

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
                "Dinas / Instansi",
              to:
                "/dinas",
            },

            {
              label:
                "Form Dinas / Instansi",
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
              LEFT
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

            {/* ===============================================
                FORM HEADER
            ================================================ */}

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

                  <Building2
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
                    Form Dinas / Instansi
                  </h1>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-slate-400
                    "
                  >
                    {isEdit
                      ? "Ubah data dinas / instansi"
                      : "Tambah data dinas / instansi baru"}
                  </p>

                </div>

              </div>

              {/* =============================================
                  HEADER BUTTON
              ============================================== */}

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
                      "/dinas"
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
                    transition
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
                  form="form-instansi"
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
                    transition
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

            {/* ===============================================
                ERROR / SUCCESS
            ================================================ */}

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

            {/* ===============================================
                FORM
            ================================================ */}

            <form
              id="form-instansi"
              onSubmit={
                handleSubmit
              }
            >

              {/* =============================================
                  SECTION: DATA INSTANSI
              ============================================== */}

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

                {/* SECTION TITLE */}

                <div
                  className="
                    border-b
                    border-slate-100
                    bg-white
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
                    Data Dinas / Instansi
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-slate-400
                    "
                  >
                    Masukkan informasi utama dinas atau instansi.
                  </p>

                </div>

                {/* FORM CONTENT */}

                <div
                  className="
                    space-y-5
                    p-5
                  "
                >

                  {/* =========================================
                      ROW 1
                  ========================================== */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-3
                    "
                  >

                    {/* KODE */}

                    <div>

                      <FieldLabel
                        label="Kode Instansi"
                        required
                      />

                      <input
                        type="text"
                        value={
                          form.kode_instansi
                        }
                        onChange={(e) =>
                          handleChange(
                            "kode_instansi",
                            e.target.value
                          )
                        }
                        placeholder="
                          Contoh: DISDIK-001
                        "
                        required
                        className={inputClass}
                      />

                    </div>

                    {/* WILAYAH */}

                    <div>

                      <FieldLabel
                        label="Wilayah"
                        required
                      />

                      <select
                        value={
                          form.wilayah_id
                        }
                        onChange={(e) =>
                          handleChange(
                            "wilayah_id",
                            e.target.value
                          )
                        }
                        required
                        className={inputClass}
                      >

                        <option value="">
                          Pilih wilayah
                        </option>

                        {wilayahList.map(
                          (
                            item
                          ) => (

                            <option
                              key={
                                item.id
                              }
                              value={
                                item.id
                              }
                            >
                              {
                                item.nama
                              }
                            </option>

                          )
                        )}

                      </select>

                    </div>

                    {/* LEVEL */}

                    <div>

                      <FieldLabel
                        label="Level Pemerintahan"
                      />

                      <input
                        type="text"
                        value={
                          levelPemerintahan
                        }
                        readOnly
                        placeholder="
                          Otomatis dari wilayah
                        "
                        className="
                          w-full
                          rounded-lg
                          border
                          border-slate-200
                          bg-slate-100
                          px-3
                          py-2.5
                          text-xs
                          font-medium
                          text-slate-600
                          outline-none
                        "
                      />

                      <p
                        className="
                          mt-1
                          text-[10px]
                          text-slate-400
                        "
                      >
                        Otomatis berdasarkan tipe wilayah.
                      </p>

                    </div>

                  </div>

                  {/* =========================================
                      NAMA
                  ========================================== */}

                  <div>

                    <FieldLabel
                      label="Nama Dinas / Instansi"
                      required
                    />

                    <input
                      type="text"
                      value={
                        form.nama_instansi
                      }
                      onChange={(e) =>
                        handleChange(
                          "nama_instansi",
                          e.target.value
                        )
                      }
                      placeholder="
                        Contoh: Dinas Pendidikan Kabupaten Sleman
                      "
                      required
                      className={inputClass}
                    />

                  </div>

                  {/* =========================================
                      SINGKATAN + WEBSITE
                  ========================================== */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-2
                    "
                  >

                    {/* SINGKATAN */}

                    <div>

                      <FieldLabel
                        label="Singkatan"
                      />

                      <input
                        type="text"
                        value={
                          form.singkatan
                        }
                        onChange={(e) =>
                          handleChange(
                            "singkatan",
                            e.target.value
                          )
                        }
                        placeholder="
                          Contoh: DISDIK
                        "
                        className={inputClass}
                      />

                    </div>

                    {/* WEBSITE */}

                    <div>

                      <FieldLabel
                        label="Website Resmi"
                      />

                      <div
                        className="
                          relative
                        "
                      >

                        <Globe2
                          size={14}
                          className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                          "
                        />

                        <input
                          type="url"
                          value={
                            form.website
                          }
                          onChange={(e) =>
                            handleChange(
                              "website",
                              e.target.value
                            )
                          }
                          placeholder="
                            https://contoh.go.id
                          "
                          className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            py-2.5
                            pl-9
                            pr-3
                            text-xs
                            text-slate-700
                            outline-none
                            transition
                            focus:border-red-400
                            focus:ring-2
                            focus:ring-red-100
                          "
                        />

                      </div>

                    </div>

                  </div>

                  {/* =========================================
                      STATUS
                  ========================================== */}

                  <div
                    className="
                      rounded-lg
                      border
                      border-slate-200
                      bg-slate-50
                      p-4
                    "
                  >

                    <FieldLabel
                      label="Status Instansi"
                    />

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-3
                      "
                    >

                      {/* AKTIF */}

                      <label
                        className="
                          flex
                          cursor-pointer
                          items-center
                          gap-2
                          rounded-lg
                          border
                          border-emerald-200
                          bg-emerald-50
                          px-4
                          py-2.5
                        "
                      >

                        <input
                          type="radio"
                          name="aktif"
                          checked={
                            form.aktif ===
                            true
                          }
                          onChange={() =>
                            handleChange(
                              "aktif",
                              true
                            )
                          }
                          className="
                            h-4
                            w-4
                            accent-emerald-600
                          "
                        />

                        <CircleCheck
                          size={14}
                          className="
                            text-emerald-600
                          "
                        />

                        <span
                          className="
                            text-xs
                            font-semibold
                            text-emerald-700
                          "
                        >
                          Aktif
                        </span>

                      </label>

                      {/* NONAKTIF */}

                      <label
                        className="
                          flex
                          cursor-pointer
                          items-center
                          gap-2
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          px-4
                          py-2.5
                        "
                      >

                        <input
                          type="radio"
                          name="aktif"
                          checked={
                            form.aktif ===
                            false
                          }
                          onChange={() =>
                            handleChange(
                              "aktif",
                              false
                            )
                          }
                          className="
                            h-4
                            w-4
                            accent-red-600
                          "
                        />

                        <CircleX
                          size={14}
                          className="
                            text-slate-500
                          "
                        />

                        <span
                          className="
                            text-xs
                            font-semibold
                            text-slate-600
                          "
                        >
                          Nonaktif
                        </span>

                      </label>

                    </div>

                  </div>

                </div>

              </div>

              {/* =============================================
                  BOTTOM ACTION
              ============================================== */}

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
                      "/dinas"
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
                    : "Simpan Data"}

                </button>

              </div>

            </form>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <div
            className="
              space-y-4
            "
          >

            {/* ===============================================
                INFORMATION STATUS
            ================================================ */}

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
                  Informasi Status
                </h3>

              </div>

              {/* AKTIF */}

              <div
                className="
                  mb-4
                  flex
                  items-start
                  gap-2
                "
              >

                <span
                  className="
                    mt-1
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-emerald-500
                  "
                />

                <div>

                  <p
                    className="
                      text-xs
                      font-semibold
                      text-emerald-600
                    "
                  >
                    Aktif
                  </p>

                  <p
                    className="
                      text-[10px]
                      text-slate-400
                    "
                  >
                    Instansi dapat digunakan pada layanan.
                  </p>

                </div>

              </div>

              {/* NONAKTIF */}

              <div
                className="
                  mb-4
                  flex
                  items-start
                  gap-2
                "
              >

                <span
                  className="
                    mt-1
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-slate-400
                  "
                />

                <div>

                  <p
                    className="
                      text-xs
                      font-semibold
                      text-slate-600
                    "
                  >
                    Nonaktif
                  </p>

                  <p
                    className="
                      text-[10px]
                      text-slate-400
                    "
                  >
                    Instansi tetap tersimpan tetapi tidak aktif.
                  </p>

                </div>

              </div>

              {/* VERIFIKASI */}

              <div
                className="
                  flex
                  items-start
                  gap-2
                "
              >

                <span
                  className="
                    mt-1
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-amber-500
                  "
                />

                <div>

                  <p
                    className="
                      text-xs
                      font-semibold
                      text-amber-600
                    "
                  >
                    Perlu Verifikasi
                  </p>

                  <p
                    className="
                      text-[10px]
                      text-slate-400
                    "
                  >
                    Website resmi belum tersedia atau perlu diperiksa.
                  </p>

                </div>

              </div>

            </aside>

            {/* ===============================================
                TIPS
            ================================================ */}

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
                  • Pilih wilayah sesuai lokasi pemerintahan instansi.
                </p>

                <p>
                  • Level pemerintahan akan terisi otomatis dari wilayah.
                </p>

                <p>
                  • Gunakan kode instansi yang unik.
                </p>

                <p>
                  • Gunakan website resmi instansi bila tersedia.
                </p>

              </div>

            </aside>

            {/* ===============================================
                CONTOH
            ================================================ */}

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
                  Contoh Pengisian
                </h3>

              </div>

              <div
                className="
                  space-y-2
                  text-[11px]
                  leading-5
                "
              >

                <ExampleRow
                  label="Wilayah"
                  value="Kabupaten Bantul"
                />

                <ExampleRow
                  label="Level"
                  value="Kabupaten"
                />

                <ExampleRow
                  label="Kode"
                  value="BTL-DKPSB-001"
                />

                <ExampleRow
                  label="Instansi"
                  value="
                    Dinas Kependudukan dan Pencatatan Sipil Kabupaten Bantul
                  "
                />

                <ExampleRow
                  label="Singkatan"
                  value="DISDUKCAPIL"
                />

                <ExampleRow
                  label="Status"
                  value="Aktif"
                />

              </div>

            </aside>

            {/* ===============================================
                DATABASE INFO
            ================================================ */}

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
                  flex
                  items-start
                  gap-3
                "
              >

                <ShieldCheck
                  size={18}
                  className="
                    mt-0.5
                    text-red-600
                  "
                />

                <div>

                  <h3
                    className="
                      text-xs
                      font-bold
                      text-slate-700
                    "
                  >
                    Relasi Database
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      leading-5
                      text-slate-400
                    "
                  >
                    Data instansi akan terhubung dengan
                    wilayah, level pemerintahan, dan layanan
                    yang dimiliki instansi.
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

// ============================================================
// FIELD LABEL
// ============================================================

function FieldLabel({
  label,
  required = false,
}) {

  return (
    <label
      className="
        mb-1.5
        block
        text-[11px]
        font-bold
        text-slate-700
      "
    >

      {label}

      {required && (
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
  );
}

// ============================================================
// INPUT CLASS
// ============================================================

const inputClass = `
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
  transition
  placeholder:text-slate-300
  focus:border-red-400
  focus:ring-2
  focus:ring-red-100
`;

// ============================================================
// EXAMPLE ROW
// ============================================================

function ExampleRow({
  label,
  value,
}) {

  return (
    <div
      className="
        grid
        grid-cols-[75px_1fr]
        gap-2
      "
    >

      <span
        className="
          font-semibold
          text-red-700
        "
      >
        {label}
      </span>

      <span
        className="
          text-red-700
        "
      >
        :
        <span className="ml-1">
          {value}
        </span>
      </span>

    </div>
  );
}