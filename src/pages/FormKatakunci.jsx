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
  Tags,
  Info,
  Lightbulb,
  FileText,
  Search,
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
  layanan_id: "",
  keyword: "",
};

// ============================================================
// PAGE
// ============================================================

export default function FormKataKunci() {

  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const editId =
    searchParams.get("id");

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
  // LAYANAN LIST
  // ==========================================================

  const [
    layananList,
    setLayananList,
  ] = useState([]);

  // ==========================================================
  // SEARCH LAYANAN
  // ==========================================================

  const [
    layananSearch,
    setLayananSearch,
  ] = useState("");

  // ==========================================================
  // LOADING
  // ==========================================================

  const [
    loadingPage,
    setLoadingPage,
  ] = useState(
    isEdit
  );

  const [
    loadingLayanan,
    setLoadingLayanan,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  // ==========================================================
  // ERROR
  // ==========================================================

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  // ==========================================================
  // LOAD LAYANAN
  // ==========================================================
  //
  // Hanya ambil 50 data awal.
  // Tidak lagi mengambil seluruh 837 layanan.
  //

  async function loadLayanan(
    searchValue = ""
  ) {

    setLoadingLayanan(
      true
    );

    try {

      const params =
        new URLSearchParams();

      params.set(
        "page",
        "1"
      );

      params.set(
        "limit",
        "50"
      );

      if (
        searchValue.trim()
      ) {

        params.set(
          "search",
          searchValue.trim()
        );
      }

      const result =
        await apiRequest(
          `/layanan?${params.toString()}`
        );

      setLayananList(
        result?.data || []
      );

    } catch (err) {

      console.error(
        "Gagal mengambil layanan:",
        err
      );

      setError(
        err.message ||
        "Gagal mengambil data layanan."
      );

      setLayananList([]);

    } finally {

      setLoadingLayanan(
        false
      );
    }
  }

  // ==========================================================
  // LOAD DATA EDIT
  // ==========================================================

  async function loadEditData() {

    if (!editId) {

      setLoadingPage(
        false
      );

      return;
    }

    try {

      const result =
        await apiRequest(
          `/layanan-keyword/${editId}`
        );

      const item =
        result?.data;

      if (!item) {

        throw new Error(
          "Data kata kunci tidak ditemukan."
        );
      }

      setForm({

        layanan_id:
          String(
            item.layanan_id
          ),

        keyword:
          item.keyword ||
          "",

      });

      // Pastikan layanan yang sedang diedit
      // tersedia dalam dropdown.

      setLayananList(
        (current) => {

          const exists =
            current.some(
              (itemLayanan) =>
                String(
                  itemLayanan.id
                ) ===
                String(
                  item.layanan_id
                )
            );

          if (exists) {
            return current;
          }

          return [
            ...current,
            {
              id:
                item.layanan_id,

              kode_layanan:
                item.kode_layanan,

              nama_layanan:
                item.nama_layanan,
            },
          ];
        }
      );

    } catch (err) {

      setError(
        err.message ||
        "Gagal mengambil data kata kunci."
      );

    } finally {

      setLoadingPage(
        false
      );
    }
  }

  // ==========================================================
  // INITIAL
  // ==========================================================

  useEffect(() => {

    loadLayanan();

    if (isEdit) {
      loadEditData();
    } else {
      setLoadingPage(
        false
      );
    }

  }, [
    editId,
  ]);

  // ==========================================================
  // SEARCH DEBOUNCE
  // ==========================================================

  useEffect(() => {

    const timer =
      setTimeout(() => {

        loadLayanan(
          layananSearch
        );

      }, 400);

    return () =>
      clearTimeout(
        timer
      );

  }, [
    layananSearch,
  ]);

  // ==========================================================
  // HANDLE FORM
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
  // SELECTED LAYANAN
  // ==========================================================

  const selectedLayanan =
    layananList.find(
      (item) =>
        String(
          item.id
        ) ===
        String(
          form.layanan_id
        )
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
    // VALIDATION
    // ========================================================

    if (
      !form.layanan_id
    ) {

      setError(
        "Layanan wajib dipilih."
      );

      setSaving(false);

      return;
    }

    if (
      !form.keyword.trim()
    ) {

      setError(
        "Kata kunci wajib diisi."
      );

      setSaving(false);

      return;
    }

    // ========================================================
    // PAYLOAD
    // ========================================================

    const payload = {

      layanan_id:
        Number(
          form.layanan_id
        ),

      keyword:
        form.keyword.trim(),

    };

    // ========================================================
    // SAVE
    // ========================================================

    try {

      let result;

      if (isEdit) {

        result =
          await apiRequest(
            `/layanan-keyword/${editId}`,
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
            "/layanan-keyword",
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
            ? "Kata kunci berhasil diperbarui."
            : "Kata kunci berhasil ditambahkan."
        )
      );

      setTimeout(() => {

        navigate(
          "/kata-kunci"
        );

      }, 700);

    } catch (err) {

      setError(
        err.message ||
        "Gagal menyimpan kata kunci."
      );

    } finally {

      setSaving(false);

    }
  }

  // ==========================================================
  // PAGE LOADING
  // ==========================================================

  if (loadingPage) {

    return (
      <>
        <Topbar
          title={
            isEdit
              ? "Edit Kata Kunci"
              : "Form Kata Kunci"
          }
          subtitle="
            Kelola kata kunci layanan informasi publik
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
            Memuat data...
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
            ? "Edit Kata Kunci"
            : "Form Kata Kunci"
        }
        subtitle="
          Kelola kata kunci layanan informasi publik
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
                "Kata Kunci",
              to:
                "/kata-kunci",
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

                  <Tags
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
                    Form Kata Kunci
                  </h1>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-slate-400
                    "
                  >
                    {isEdit
                      ? "Ubah kata kunci layanan"
                      : "Tambah kata kunci layanan baru"}
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
                      "/kata-kunci"
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
                  form="form-kata-kunci"
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

            {/* =================================================
                FORM
            ================================================== */}

            <form
              id="form-kata-kunci"
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

                {/* SECTION HEADER */}

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
                    Data Kata Kunci
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-slate-400
                    "
                  >
                    Hubungkan kata kunci dengan layanan yang sesuai.
                  </p>

                </div>

                <div
                  className="
                    space-y-5
                    p-5
                  "
                >

                  {/* =========================================
                      SEARCH LAYANAN
                  ========================================== */}

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
                      Layanan
                      <span
                        className="
                          ml-1
                          text-red-500
                        "
                      >
                        *
                      </span>
                    </label>

                    <div
                      className="
                        relative
                        mb-2
                      "
                    >

                      <Search
                        size={14}
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        type="text"
                        value={
                          layananSearch
                        }
                        onChange={(e) =>
                          setLayananSearch(
                            e.target.value
                          )
                        }
                        placeholder="
                          Cari kode atau nama layanan...
                        "
                        className="
                          w-full
                          rounded-lg
                          border
                          border-slate-300
                          bg-slate-50
                          py-2.5
                          pl-9
                          pr-3
                          text-xs
                          text-slate-700
                          outline-none
                          focus:bg-white
                          focus:ring-2
                          focus:ring-red-400
                        "
                      />

                    </div>

                    {/* SELECT */}

                    {loadingLayanan ? (

                      <div
                        className="
                          rounded-lg
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-4
                          text-xs
                          text-slate-400
                        "
                      >
                        Mencari layanan...
                      </div>

                    ) : (

                      <select
                        value={
                          form.layanan_id
                        }
                        onChange={(e) =>
                          handleChange(
                            "layanan_id",
                            e.target.value
                          )
                        }
                        required
                        size={7}
                        className="
                          w-full
                          rounded-lg
                          border
                          border-slate-300
                          bg-white
                          px-3
                          py-2
                          text-xs
                          text-slate-700
                          outline-none
                          focus:ring-2
                          focus:ring-red-400
                        "
                      >

                        {layananList.length ===
                          0 ? (

                          <option
                            value=""
                            disabled
                          >
                            Layanan tidak ditemukan
                          </option>

                        ) : (

                          layananList.map(
                            (item) => (

                              <option
                                key={
                                  item.id
                                }
                                value={
                                  item.id
                                }
                              >
                                {
                                  item.kode_layanan
                                }
                                {" — "}
                                {
                                  item.nama_layanan
                                }
                              </option>

                            )
                          )

                        )}

                      </select>

                    )}

                  </div>

                  {/* =========================================
                      SELECTED SERVICE
                  ========================================== */}

                  {selectedLayanan && (

                    <div
                      className="
                        rounded-lg
                        border
                        border-blue-200
                        bg-blue-50
                        p-4
                      "
                    >

                      <p
                        className="
                          mb-1
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-blue-600
                        "
                      >
                        Layanan Terpilih
                      </p>

                      <p
                        className="
                          text-xs
                          font-semibold
                          text-blue-900
                        "
                      >
                        {
                          selectedLayanan.nama_layanan
                        }
                      </p>

                      <p
                        className="
                          mt-1
                          font-mono
                          text-[10px]
                          text-blue-600
                        "
                      >
                        {
                          selectedLayanan.kode_layanan
                        }
                      </p>

                    </div>

                  )}

                  {/* =========================================
                      KEYWORD
                  ========================================== */}

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
                      Kata Kunci
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
                        form.keyword
                      }
                      onChange={(e) =>
                        handleChange(
                          "keyword",
                          e.target.value
                        )
                      }
                      placeholder="
                        Contoh: kartu keluarga
                      "
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

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-slate-400
                      "
                    >
                      Masukkan istilah yang relevan dengan layanan.
                    </p>

                  </div>

                </div>

              </div>

              {/* BOTTOM BUTTON */}

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
                      "/kata-kunci"
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
                  Tentang Kata Kunci
                </h3>

              </div>

              <p
                className="
                  text-[11px]
                  leading-5
                  text-slate-500
                "
              >
                Kata kunci digunakan untuk membantu
                sistem menemukan layanan yang relevan
                berdasarkan istilah pencarian pengguna.
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
                  • Pilih layanan yang tepat.
                </p>

                <p>
                  • Gunakan istilah yang relevan.
                </p>

                <p>
                  • Hindari keyword duplikat pada layanan yang sama.
                </p>

                <p>
                  • Gunakan istilah yang kemungkinan dipakai pengguna saat mencari layanan.
                </p>

              </div>

            </aside>

            {/* CONTOH */}

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
                    Layanan
                  </p>

                  <p
                    className="
                      mt-1
                      leading-5
                      text-red-700
                    "
                  >
                    Penerbitan Kartu Keluarga
                  </p>

                </div>

                <div>

                  <p
                    className="
                      font-semibold
                      text-red-700
                    "
                  >
                    Kata Kunci
                  </p>

                  <p
                    className="
                      mt-1
                      leading-5
                      text-red-700
                    "
                  >
                    kartu keluarga
                  </p>

                </div>

              </div>

            </aside>

            {/* DATABASE */}

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

                <Tags
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
                    Keyword disimpan pada tabel
                    layanan_keyword dan terhubung
                    ke layanan melalui layanan_id.
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