import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  FileEdit,
  ArrowLeft,
  Save,
  Link2,
  AlertTriangle,
  Info,
  Lightbulb,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";

import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";

import FormField, {
  inputClass,
} from "../components/FormField";

import TagInput from "../components/TagInput";

import { apiRequest } from "../services/api";

// ============================================================
// INFORMASI STATUS
// ============================================================

const STATUS_INFO = [
  {
    color: "text-green-500",
    bg: "bg-green-500",
    label: "Online / Aktif",
    desc: "Layanan dapat diakses langsung",
  },
  {
    color: "text-red-500",
    bg: "bg-red-500",
    label: "Offline / Tidak Aktif",
    desc: "Layanan tidak dapat diakses online",
  },
  {
    color: "text-amber-500",
    bg: "bg-amber-500",
    label: "Perlu Pembaruan",
    desc: "Data layanan perlu diverifikasi",
  },
];

// ============================================================
// STATUS KNOWLEDGE BASE
// ============================================================

const KNOWLEDGE_STATUS = [
  "RAW",
  "CLEANED",
  "VERIFIED",
  "READY_RAG",
  "NEED_REVIEW",
];

// ============================================================
// DATE
// ============================================================

function toDateInput(value) {

  if (!value) {
    return "";
  }

  return String(value).slice(
    0,
    10
  );
}

function toISODate(value) {

  if (!value) {
    return null;
  }

  return `${value}T00:00:00Z`;
}

// ============================================================
// SOURCE
// ============================================================

function emptySource() {

  return {
    url: "",
    tipe_sumber:
      "OFFICIAL_WEBSITE",
    verified_at: "",
  };
}

// ============================================================
// FORM
// ============================================================

export default function FormLayanan() {

  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const editId =
    searchParams.get("id");

  const isEdit =
    Boolean(editId);

  // ========================================================
  // MASTER DATA
  // ========================================================

  const [
    wilayahList,
    setWilayahList,
  ] = useState([]);

  const [
    instansiList,
    setInstansiList,
  ] = useState([]);

  const [
    kategoriList,
    setKategoriList,
  ] = useState([]);

  // ========================================================
  // STATE
  // ========================================================

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    loadingMaster,
    setLoadingMaster,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // ========================================================
  // FORM
  // ========================================================

  const [
    form,
    setForm,
  ] = useState({

    kodeLayanan: "",

    wilayahId: "",

    dinasId: "",

    statusLayanan: "Aktif",

    kategoriLayanan: "",

    namaLayanan: "",

    kataKunci: [],

    sumber: [
      emptySource(),
    ],

    ketersediaan: "online",

    deskripsi: "",

    kebutuhanUser: "",

    persyaratan: "",

    prosedur: "",

    knowledgeStatus: "RAW",

    knowledgeCatatan: "",
  });

  // ========================================================
  // SET FIELD
  // ========================================================

  function set(
    field,
    value
  ) {

    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );
  }

  // ========================================================
  // LOAD MASTER
  // ========================================================

  useEffect(() => {

    async function loadMaster() {

      setLoadingMaster(true);
      setError("");

      try {

        const [
          wilayahResult,
          instansiResult,
          kategoriResult,
        ] = await Promise.all([
          apiRequest("/wilayah"),
          apiRequest("/instansi"),
          apiRequest(
            "/kategori-layanan"
          ),
        ]);

        setWilayahList(
          wilayahResult?.data ||
            []
        );

        setInstansiList(
          instansiResult?.data ||
            []
        );

        setKategoriList(
          kategoriResult?.data ||
            []
        );

      } catch (err) {

        setError(
          err.message ||
            "Gagal mengambil data master."
        );

      } finally {

        setLoadingMaster(false);

      }
    }

    loadMaster();

  }, []);

  // ========================================================
  // LOAD DATA EDIT
  // ========================================================

  useEffect(() => {

    if (!editId) {
      return;
    }

    async function loadDetail() {

      setLoading(true);
      setError("");

      try {

        const result =
          await apiRequest(
            `/layanan/${editId}`
          );

        const item =
          result?.data;

        if (!item) {
          throw new Error(
            "Data layanan tidak ditemukan."
          );
        }

        const detail =
          item?.detail?.[0] ||
          {};

        const statuses =
          item?.statuses ||
          [];

        const latestStatus =
          statuses[
            statuses.length - 1
          ];

        const sourceList =
          item?.sumber ||
          [];

        setForm({

          kodeLayanan:
            item?.kode_layanan ||
            "",

          wilayahId:
            item?.instansi?.wilayah?.id
              ?.toString() ||
            "",

          dinasId:
            item?.instansi?.id
              ?.toString() ||
            "",

          statusLayanan:
            item?.status ||
            "Aktif",

          kategoriLayanan:
            item?.kategori?.id
              ?.toString() ||
            "",

          namaLayanan:
            item?.nama_layanan ||
            "",

          kataKunci:
            (
              item?.keywords ||
              []
            ).map(
              (keyword) =>
                typeof keyword ===
                "string"
                  ? keyword
                  : keyword.keyword
            ),

          sumber:
            sourceList.length > 0
              ? sourceList.map(
                  (source) => ({
                    url:
                      source.url ||
                      "",

                    tipe_sumber:
                      source.tipe_sumber ||
                      "OFFICIAL_WEBSITE",

                    verified_at:
                      toDateInput(
                        source.verified_at
                      ),
                  })
                )
              : [
                  emptySource(),
                ],

          ketersediaan:
            String(
              detail.kanal ||
                ""
            )
              .toLowerCase()
              .includes(
                "offline"
              )
              ? "offline"
              : "online",

          deskripsi:
            detail.deskripsi ||
            "",

          kebutuhanUser:
            detail.kebutuhan_user ||
            "",

          persyaratan:
            detail.persyaratan ||
            "",

          prosedur:
            detail.prosedur ||
            "",

          knowledgeStatus:
            KNOWLEDGE_STATUS.includes(
              latestStatus?.status
            )
              ? latestStatus.status
              : "RAW",

          knowledgeCatatan:
            latestStatus?.catatan ||
            "",
        });

      } catch (err) {

        setError(
          err.message ||
            "Gagal mengambil data layanan."
        );

      } finally {

        setLoading(false);

      }
    }

    loadDetail();

  }, [editId]);

  // ========================================================
  // FILTER INSTANSI BERDASARKAN WILAYAH
  // ========================================================

  const filteredInstansi =
    useMemo(() => {

      if (!form.wilayahId) {
        return [];
      }

      return instansiList.filter(
        (item) =>
          item.wilayah_id
            ?.toString() ===
          form.wilayahId
      );

    }, [
      instansiList,
      form.wilayahId,
    ]);

  // ========================================================
  // WILAYAH TERPILIH
  // ========================================================

  const selectedWilayah =
    wilayahList.find(
      (item) =>
        item.id?.toString() ===
        form.wilayahId
    );

  // ========================================================
  // CHANGE WILAYAH
  // ========================================================

  function handleWilayahChange(e) {

    setForm(
      (current) => ({
        ...current,

        wilayahId:
          e.target.value,

        dinasId: "",
      })
    );
  }

  // ========================================================
  // SOURCE UPDATE
  // ========================================================

  function updateSource(
    index,
    field,
    value
  ) {

    setForm(
      (current) => ({
        ...current,

        sumber:
          current.sumber.map(
            (
              source,
              sourceIndex
            ) =>
              sourceIndex ===
              index
                ? {
                    ...source,
                    [field]:
                      value,
                  }
                : source
          ),
      })
    );
  }

  // ========================================================
  // ADD SOURCE
  // ========================================================

  function addSource() {

    setForm(
      (current) => ({
        ...current,

        sumber: [
          ...current.sumber,
          emptySource(),
        ],
      })
    );
  }

  // ========================================================
  // REMOVE SOURCE
  // ========================================================

  function removeSource(
    index
  ) {

    setForm(
      (current) => ({
        ...current,

        sumber:
          current.sumber
            .length === 1
            ? [
                emptySource(),
              ]
            : current.sumber.filter(
                (
                  _,
                  sourceIndex
                ) =>
                  sourceIndex !==
                  index
              ),
      })
    );
  }

  // ========================================================
  // SUBMIT
  // ========================================================

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    // ======================================================
    // VALIDASI
    // ======================================================

    if (
      !form.kodeLayanan.trim()
    ) {

      setError(
        "Kode layanan wajib diisi."
      );

      return;
    }

    if (!form.wilayahId) {

      setError(
        "Wilayah wajib dipilih."
      );

      return;
    }

    if (!form.dinasId) {

      setError(
        "Dinas / OPD wajib dipilih."
      );

      return;
    }

    if (
      !form.kategoriLayanan
    ) {

      setError(
        "Kategori layanan wajib dipilih."
      );

      return;
    }

    if (
      !form.namaLayanan.trim()
    ) {

      setError(
        "Nama layanan wajib diisi."
      );

      return;
    }

    // ======================================================
    // LOADING
    // ======================================================

    setLoading(true);

    // ======================================================
    // SUMBER
    // ======================================================

    const sumber =
      form.sumber
        .filter(
          (source) =>
            source.url.trim()
        )
        .map(
          (source) => ({
            url:
              source.url.trim(),

            tipe_sumber:
              source.tipe_sumber ||
              "UNKNOWN",

            ...(source.verified_at
              ? {
                  verified_at:
                    toISODate(
                      source.verified_at
                    ),
                }
              : {}),
          })
        );

    // ======================================================
    // PAYLOAD BACKEND
    // ======================================================

    const payload = {

      kode_layanan:
        form.kodeLayanan.trim(),

      nama_layanan:
        form.namaLayanan.trim(),

      status:
        form.statusLayanan,

      instansi_id:
        Number(
          form.dinasId
        ),

      kategori_id:
        Number(
          form.kategoriLayanan
        ),

      detail: {

        deskripsi:
          form.deskripsi.trim(),

        kebutuhan_user:
          form.kebutuhanUser.trim(),

        persyaratan:
          form.persyaratan.trim(),

        prosedur:
          form.prosedur.trim(),

        kanal:
          form.ketersediaan ===
          "offline"
            ? "Offline"
            : "Online/Hybrid",
      },

      sumber,

      keywords:
        form.kataKunci,

      status_knowledge: {

        status:
          form.knowledgeStatus,

        catatan:
          form.knowledgeCatatan.trim(),
      },
    };

    // ======================================================
    // POST / PUT
    // ======================================================

    try {

      if (isEdit) {

        await apiRequest(
          `/layanan/${editId}`,
          {
            method: "PUT",

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      } else {

        await apiRequest(
          "/layanan",
          {
            method: "POST",

            body:
              JSON.stringify(
                payload
              ),
          }
        );
      }

      // ====================================================
      // KEMBALI
      // ====================================================

      navigate(
        "/data-layanan",
        {
          replace: true,
        }
      );

    } catch (err) {

      setError(
        err.message ||
          "Gagal menyimpan layanan."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <>
      <Topbar
        title="Data Layanan"
        subtitle="Layanan Informasi Publik"
      />

      <main
        className="
          flex-1
          p-6
        "
      >

        <Breadcrumb
          items={[
            {
              label: "Beranda",
              to: "/dashboard",
            },
            {
              label:
                "Data Layanan",
              to: "/data-layanan",
            },
            {
              label:
                isEdit
                  ? "Edit Layanan"
                  : "Form Layanan",
            },
          ]}
        />

        <form
          onSubmit={
            handleSubmit
          }
          className="
            grid
            grid-cols-1
            xl:grid-cols-[1fr_280px]
            gap-6
            items-start
          "
        >

          {/* ================================================= */}
          {/* MAIN FORM */}
          {/* ================================================= */}

          <div
            className="
              rounded-lg
              border border-slate-200
              bg-white
              p-6
            "
          >

            {/* HEADER */}

            <div
              className="
                flex flex-wrap
                items-center
                justify-between
                gap-3
                mb-6
              "
            >

              <div
                className="
                  flex items-center
                  gap-3
                "
              >

                <span
                  className="
                    flex h-10 w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-50
                  "
                >
                  <FileEdit
                    size={18}
                    className="text-brand-600"
                  />
                </span>

                <div>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-800
                    "
                  >
                    Form Layanan Informasi Publik
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    {isEdit
                      ? "Perbarui data layanan informasi publik"
                      : "Tambah data layanan informasi publik"}
                  </p>

                </div>

              </div>

              <div
                className="
                  flex items-center
                  gap-2
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    navigate(-1)
                  }
                  className="
                    flex items-center
                    gap-1.5
                    rounded
                    bg-[#ce5151]
                    px-4 py-2
                    text-xs
                    text-white
                    hover:bg-red-500
                  "
                >
                  <ArrowLeft
                    size={13}
                  />

                  Kembali
                </button>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    loadingMaster
                  }
                  className="
                    flex items-center
                    gap-1.5
                    rounded
                    bg-brand-600
                    px-4 py-2
                    text-xs
                    text-white
                    hover:bg-brand-700
                    disabled:opacity-60
                  "
                >
                  <Save size={13} />

                  {loading
                    ? "Menyimpan..."
                    : "Simpan Data"}
                </button>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div
                className="
                  mb-4
                  rounded-lg
                  border border-red-200
                  bg-red-50
                  px-4 py-3
                  text-xs
                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {/* ================================================= */}
            {/* DATA LAYANAN */}
            {/* ================================================= */}

            <div
              className="
                rounded-lg
                border border-slate-200
                p-4
                space-y-5
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  text-brand-600
                  -mt-1
                "
              >
                Data Layanan
              </p>

              {/* KODE / WILAYAH */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-4
                "
              >

                <FormField
                  label="Kode Layanan"
                  required
                >
                  <input
                    className={
                      inputClass
                    }
                    placeholder="
                      Contoh:
                      BTL-DUK-KIA-001
                    "
                    value={
                      form.kodeLayanan
                    }
                    onChange={(e) =>
                      set(
                        "kodeLayanan",
                        e.target.value
                      )
                    }
                    required
                  />
                </FormField>

                <FormField
                  label="Wilayah"
                  required
                >
                  <select
                    className={
                      inputClass
                    }
                    value={
                      form.wilayahId
                    }
                    onChange={
                      handleWilayahChange
                    }
                    required
                  >

                    <option value="">
                      Pilih wilayah
                    </option>

                    {wilayahList.map(
                      (item) => (

                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.nama}
                        </option>

                      )
                    )}

                  </select>
                </FormField>

                <FormField
                  label="
                    Provinsi / Kab. / Kota
                  "
                >
                  <input
                    className={`
                      ${inputClass}
                      bg-slate-50
                    `}
                    value={
                      selectedWilayah
                        ?.nama ||
                      ""
                    }
                    readOnly
                    placeholder="
                      Otomatis dari wilayah
                    "
                  />
                </FormField>

              </div>

              {/* INSTANSI / STATUS / KATEGORI */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-4
                "
              >

                <FormField
                  label="Dinas / OPD"
                  required
                >
                  <select
                    className={
                      inputClass
                    }
                    value={
                      form.dinasId
                    }
                    onChange={(e) =>
                      set(
                        "dinasId",
                        e.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      {form.wilayahId
                        ? "Pilih dinas / OPD"
                        : "Pilih wilayah terlebih dahulu"}
                    </option>

                    {filteredInstansi.map(
                      (item) => (

                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {
                            item.nama_instansi
                          }
                        </option>

                      )
                    )}

                  </select>
                </FormField>

                <FormField
                  label="Status Layanan"
                  required
                >
                  <select
                    className={
                      inputClass
                    }
                    value={
                      form.statusLayanan
                    }
                    onChange={(e) =>
                      set(
                        "statusLayanan",
                        e.target.value
                      )
                    }
                    required
                  >

                    <option value="Aktif">
                      Aktif
                    </option>

                    <option value="Perlu Update">
                      Perlu Update
                    </option>

                    <option value="Non aktif">
                      Non aktif
                    </option>

                  </select>
                </FormField>

                <FormField
                  label="Kategori Layanan"
                  required
                >
                  <select
                    className={
                      inputClass
                    }
                    value={
                      form.kategoriLayanan
                    }
                    onChange={(e) =>
                      set(
                        "kategoriLayanan",
                        e.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Pilih kategori
                    </option>

                    {kategoriList.map(
                      (item) => (

                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {
                            item.nama_kategori
                          }
                        </option>

                      )
                    )}

                  </select>
                </FormField>

              </div>

              {/* NAMA */}

              <FormField
                label="Nama Layanan"
                required
              >
                <input
                  className={
                    inputClass
                  }
                  placeholder="
                    Contoh: Penerbitan
                    Kartu Identitas
                    Anak (KIA)
                  "
                  value={
                    form.namaLayanan
                  }
                  onChange={(e) =>
                    set(
                      "namaLayanan",
                      e.target.value
                    )
                  }
                  required
                />
              </FormField>

              {/* KEYWORD */}

              <FormField
                label="Kata Kunci"
                required
              >
                <TagInput
                  tags={
                    form.kataKunci
                  }
                  onChange={(tags) =>
                    set(
                      "kataKunci",
                      tags
                    )
                  }
                />
              </FormField>

              {/* SUMBER */}

              <FormField
                label="Sumber Resmi"
              >

                <div
                  className="
                    space-y-2
                  "
                >

                  {form.sumber.map(
                    (
                      source,
                      index
                    ) => (

                      <div
                        key={`${index}-${source.url}`}
                        className="
                          rounded-lg
                          border
                          border-slate-200
                          p-3
                        "
                      >

                        <div
                          className="
                            grid
                            grid-cols-1
                            md:grid-cols-[1fr_180px_140px_auto]
                            gap-2
                            items-end
                          "
                        >

                          {/* URL */}

                          <div>

                            <label
                              className="
                                mb-1 block
                                text-[11px]
                                font-semibold
                                text-slate-500
                              "
                            >
                              URL
                            </label>

                            <input
                              className={
                                inputClass
                              }
                              type="url"
                              placeholder="
                                https://...
                              "
                              value={
                                source.url
                              }
                              onChange={(e) =>
                                updateSource(
                                  index,
                                  "url",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          {/* TYPE */}

                          <div>

                            <label
                              className="
                                mb-1 block
                                text-[11px]
                                font-semibold
                                text-slate-500
                              "
                            >
                              Tipe Sumber
                            </label>

                            <select
                              className={
                                inputClass
                              }
                              value={
                                source.tipe_sumber
                              }
                              onChange={(e) =>
                                updateSource(
                                  index,
                                  "tipe_sumber",
                                  e.target.value
                                )
                              }
                            >

                              <option value="OFFICIAL_WEBSITE">
                                OFFICIAL_WEBSITE
                              </option>

                              <option value="OFFICIAL_DOCUMENT">
                                OFFICIAL_DOCUMENT
                              </option>

                              <option value="TEST">
                                TEST
                              </option>

                              <option value="UNKNOWN">
                                UNKNOWN
                              </option>

                            </select>

                          </div>

                          {/* VERIFIED */}

                          <div>

                            <label
                              className="
                                mb-1 block
                                text-[11px]
                                font-semibold
                                text-slate-500
                              "
                            >
                              Verified
                            </label>

                            <input
                              className={
                                inputClass
                              }
                              type="date"
                              value={
                                source.verified_at
                              }
                              onChange={(e) =>
                                updateSource(
                                  index,
                                  "verified_at",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          {/* DELETE SOURCE */}

                          <button
                            type="button"
                            onClick={() =>
                              removeSource(
                                index
                              )
                            }
                            className="
                              flex
                              h-9
                              items-center
                              justify-center
                              rounded
                              border
                              border-red-200
                              px-3
                              text-red-600
                              hover:bg-red-50
                            "
                            title="Hapus sumber"
                          >
                            <Trash2
                              size={14}
                            />
                          </button>

                        </div>

                      </div>

                    )
                  )}

                  {/* ADD SOURCE */}

                  <button
                    type="button"
                    onClick={
                      addSource
                    }
                    className="
                      flex items-center
                      gap-1.5
                      rounded
                      border border-slate-200
                      px-3 py-2
                      text-xs
                      font-semibold
                      text-slate-600
                      hover:bg-slate-50
                    "
                  >
                    <Plus
                      size={13}
                    />

                    Tambah Sumber
                  </button>

                </div>

              </FormField>

              {/* KETERSEDIAAN */}

              <FormField
                label="
                  Ketersediaan Layanan
                "
                required
              >

                <div
                  className="
                    flex
                    flex-wrap
                    gap-6
                  "
                >

                  <label
                    className="
                      flex items-center
                      gap-2
                      text-xs
                      font-semibold
                      text-slate-800
                    "
                  >

                    <input
                      type="radio"
                      name="ketersediaan"
                      checked={
                        form.ketersediaan ===
                        "online"
                      }
                      onChange={() =>
                        set(
                          "ketersediaan",
                          "online"
                        )
                      }
                      className="
                        accent-brand-600
                      "
                    />

                    Online / Hybrid

                  </label>

                  <label
                    className="
                      flex items-center
                      gap-2
                      text-xs
                      text-slate-500
                    "
                  >

                    <input
                      type="radio"
                      name="ketersediaan"
                      checked={
                        form.ketersediaan ===
                        "offline"
                      }
                      onChange={() =>
                        set(
                          "ketersediaan",
                          "offline"
                        )
                      }
                      className="
                        accent-brand-600
                      "
                    />

                    Offline

                  </label>

                </div>

              </FormField>

              {/* OFFLINE INFO */}

              {form.ketersediaan ===
                "offline" && (

                <div
                  className="
                    rounded
                    border border-red-300
                    bg-red-50
                    p-3
                  "
                >

                  <p
                    className="
                      flex items-center
                      gap-2
                      text-xs
                      font-semibold
                      text-red-700
                      mb-2
                    "
                  >
                    <AlertTriangle
                      size={13}
                    />

                    Tata Cara Menampilkan Layanan
                  </p>

                  <ul
                    className="
                      space-y-1
                      text-xs
                      text-red-700
                      list-disc
                      list-inside
                    "
                  >

                    <li>
                      Hubungi Dinas/OPD melalui kontak resmi.
                    </li>

                    <li>
                      Datangi kantor Dinas/OPD pada jam layanan.
                    </li>

                    <li>
                      Gunakan kanal resmi lainnya.
                    </li>

                  </ul>

                </div>

              )}

              {/* DESKRIPSI */}

              <FormField
                label="
                  Deskripsi / Keterangan
                "
              >

                <textarea
                  rows={4}
                  maxLength={1000}
                  className={
                    inputClass
                  }
                  placeholder="
                    Masukkan deskripsi layanan...
                  "
                  value={
                    form.deskripsi
                  }
                  onChange={(e) =>
                    set(
                      "deskripsi",
                      e.target.value
                    )
                  }
                />

                <p
                  className="
                    mt-1
                    text-right
                    text-[10px]
                    text-slate-400
                  "
                >
                  {
                    form.deskripsi
                      .length
                  }
                  {" "}
                  / 1000
                </p>

              </FormField>

              {/* KEBUTUHAN */}

              <FormField
                label="Kebutuhan User"
              >

                <textarea
                  rows={4}
                  className={
                    inputClass
                  }
                  placeholder="
                    Kebutuhan/use case masyarakat terhadap layanan...
                  "
                  value={
                    form.kebutuhanUser
                  }
                  onChange={(e) =>
                    set(
                      "kebutuhanUser",
                      e.target.value
                    )
                  }
                />

              </FormField>

              {/* PERSYARATAN */}

              <FormField
                label="Persyaratan"
              >

                <textarea
                  rows={5}
                  className={
                    inputClass
                  }
                  placeholder="
                    Dokumen atau syarat yang diperlukan...
                  "
                  value={
                    form.persyaratan
                  }
                  onChange={(e) =>
                    set(
                      "persyaratan",
                      e.target.value
                    )
                  }
                />

              </FormField>

              {/* PROSEDUR */}

              <FormField
                label="Prosedur"
              >

                <textarea
                  rows={5}
                  className={
                    inputClass
                  }
                  placeholder="
                    Langkah-langkah memperoleh layanan...
                  "
                  value={
                    form.prosedur
                  }
                  onChange={(e) =>
                    set(
                      "prosedur",
                      e.target.value
                    )
                  }
                />

              </FormField>

              {/* KNOWLEDGE */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                "
              >

                <FormField
                  label="
                    Status Knowledge Base
                  "
                  required
                >

                  <select
                    className={
                      inputClass
                    }
                    value={
                      form.knowledgeStatus
                    }
                    onChange={(e) =>
                      set(
                        "knowledgeStatus",
                        e.target.value
                      )
                    }
                    required
                  >

                    {KNOWLEDGE_STATUS.map(
                      (status) => (

                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>

                      )
                    )}

                  </select>

                </FormField>

                <FormField
                  label="
                    Catatan Knowledge Base
                  "
                >

                  <input
                    className={
                      inputClass
                    }
                    value={
                      form.knowledgeCatatan
                    }
                    onChange={(e) =>
                      set(
                        "knowledgeCatatan",
                        e.target.value
                      )
                    }
                    placeholder="
                      Catatan verifikasi/audit...
                    "
                  />

                </FormField>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* SIDEBAR */}
          {/* ================================================= */}

          <div
            className="
              space-y-4
            "
          >

            {/* STATUS */}

            <div
              className="
                rounded-lg
                border border-slate-200
                bg-white
                p-4
              "
            >

              <p
                className="
                  flex items-center
                  gap-2
                  text-xs
                  font-semibold
                  text-brand-600
                  mb-3
                "
              >
                <Info size={13} />

                Informasi Status
              </p>

              <div
                className="
                  space-y-3
                "
              >

                {STATUS_INFO.map(
                  (item) => (

                    <div
                      key={item.label}
                      className="
                        flex items-start
                        gap-2
                      "
                    >

                      <span
                        className={`
                          mt-1.5
                          h-2.5 w-2.5
                          shrink-0
                          rounded-full
                          ${item.bg}
                        `}
                      />

                      <div>

                        <p
                          className={`
                            text-xs
                            font-semibold
                            ${item.color}
                          `}
                        >
                          {item.label}
                        </p>

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          {item.desc}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* TIPS */}

            <div
              className="
                rounded-lg
                border border-green-500
                bg-green-50
                p-4
              "
            >

              <p
                className="
                  flex items-center
                  gap-2
                  text-xs
                  font-semibold
                  text-green-800
                  mb-3
                "
              >
                <Lightbulb
                  size={13}
                />

                Tips Pengisian:
              </p>

              <ul
                className="
                  space-y-2
                  text-xs
                  text-green-800
                  list-disc
                  list-inside
                "
              >

                <li>
                  Gunakan sumber resmi.
                </li>

                <li>
                  Gunakan kata kunci yang relevan.
                </li>

                <li>
                  Perbarui status knowledge base setelah verifikasi.
                </li>

              </ul>

            </div>

            {/* CONTOH */}

            <div
              className="
                rounded-lg
                border border-red-300
                bg-red-50
                p-4
              "
            >

              <p
                className="
                  flex items-center
                  gap-2
                  text-xs
                  font-semibold
                  text-red-700
                  mb-3
                "
              >
                <FileText
                  size={13}
                />

                Contoh Pengisian:
              </p>

              <dl
                className="
                  space-y-1.5
                  text-xs
                  text-red-700
                "
              >

                <div
                  className="
                    flex gap-1
                  "
                >
                  <dt
                    className="
                      font-semibold
                      w-20
                      shrink-0
                    "
                  >
                    Wilayah
                  </dt>

                  <dd>
                    : Kabupaten Bantul
                  </dd>
                </div>

                <div
                  className="
                    flex gap-1
                  "
                >
                  <dt
                    className="
                      font-semibold
                      w-20
                      shrink-0
                    "
                  >
                    Dinas
                  </dt>

                  <dd>
                    : Dinas Kependudukan dan Pencatatan Sipil
                  </dd>
                </div>

                <div
                  className="
                    flex gap-1
                  "
                >
                  <dt
                    className="
                      font-semibold
                      w-20
                      shrink-0
                    "
                  >
                    Layanan
                  </dt>

                  <dd>
                    : Penerbitan KIA
                  </dd>
                </div>

                <div
                  className="
                    flex gap-1
                  "
                >
                  <dt
                    className="
                      font-semibold
                      w-20
                      shrink-0
                    "
                  >
                    Kanal
                  </dt>

                  <dd>
                    : Online/Hybrid
                  </dd>
                </div>

              </dl>

            </div>

          </div>

        </form>

      </main>
    </>
  );
}