import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Building2,
  Search,
  Plus,
  Pencil,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  X,
  ExternalLink,
} from "lucide-react";

import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import Pagination from "../components/Pagination";

import {
  apiRequest,
} from "../services/api";

// ============================================================
// PAGE
// ============================================================

export default function Dinas() {

  const navigate =
    useNavigate();

  // ==========================================================
  // DATA
  // ==========================================================

  const [
    instansi,
    setInstansi,
  ] = useState([]);

  const [
    wilayahList,
    setWilayahList,
  ] = useState([]);

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const [
    summary,
    setSummary,
  ] = useState({
    total: 0,
    aktif: 0,
    nonaktif: 0,
    perlu_verifikasi: 0,
  });

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const [
    pagination,
    setPagination,
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
  });

  // ==========================================================
  // FILTER
  // ==========================================================

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    wilayah,
    setWilayah,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState("");

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // ==========================================================
  // DETAIL
  // ==========================================================

  const [
    selected,
    setSelected,
  ] = useState(null);

  const [
    showDetail,
    setShowDetail,
  ] = useState(false);

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

      console.error(
        "Gagal mengambil wilayah:",
        err
      );

    }
  }

  // ==========================================================
  // LOAD SUMMARY
  // ==========================================================

  async function loadSummary() {

    try {

      const result =
        await apiRequest(
          "/instansi/summary"
        );

      setSummary(
        result?.data || {
          total: 0,
          aktif: 0,
          nonaktif: 0,
          perlu_verifikasi: 0,
        }
      );

    } catch (err) {

      console.error(
        "Gagal mengambil summary instansi:",
        err
      );

    }
  }

  // ==========================================================
  // LOAD DATA INSTANSI
  // ==========================================================

  async function loadInstansi() {

    setLoading(true);
    setError("");

    try {

      const params =
        new URLSearchParams();

      params.set(
        "page",
        String(
          pagination.page
        )
      );

      params.set(
        "limit",
        String(
          pagination.limit
        )
      );

      if (
        search.trim()
      ) {

        params.set(
          "search",
          search.trim()
        );
      }

      if (
        wilayah
      ) {

        params.set(
          "wilayah_id",
          wilayah
        );
      }

      if (
        status
      ) {

        params.set(
          "aktif",
          status === "Aktif"
            ? "true"
            : "false"
        );
      }

      const result =
        await apiRequest(
          `/instansi?${params.toString()}`
        );

      setInstansi(
        result?.data || []
      );

      if (
        result?.pagination
      ) {

        setPagination(
          result.pagination
        );
      }

    } catch (err) {

      setError(
        err.message ||
        "Gagal mengambil data instansi."
      );

      setInstansi([]);

    } finally {

      setLoading(false);

    }
  }

  // ==========================================================
  // INITIAL
  // ==========================================================

  useEffect(() => {

    loadWilayah();
    loadSummary();

  }, []);

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  useEffect(() => {

    loadInstansi();

  }, [
    pagination.page,
    pagination.limit,
    search,
    wilayah,
    status,
  ]);

  // ==========================================================
  // SEARCH
  // ==========================================================

  function handleSearch(
    e
  ) {

    setSearch(
      e.target.value
    );

    setPagination(
      (current) => ({
        ...current,
        page: 1,
      })
    );
  }

  // ==========================================================
  // WILAYAH FILTER
  // ==========================================================

  function handleWilayah(
    e
  ) {

    setWilayah(
      e.target.value
    );

    setPagination(
      (current) => ({
        ...current,
        page: 1,
      })
    );
  }

  // ==========================================================
  // STATUS FILTER
  // ==========================================================

  function handleStatus(
    e
  ) {

    setStatus(
      e.target.value
    );

    setPagination(
      (current) => ({
        ...current,
        page: 1,
      })
    );
  }

  // ==========================================================
  // VIEW
  // ==========================================================

  async function handleView(
    item
  ) {

    try {

      const result =
        await apiRequest(
          `/instansi/${item.id}`
        );

      setSelected(
        result?.data ||
        item
      );

    } catch {

      setSelected(
        item
      );
    }

    setShowDetail(
      true
    );
  }

  // ==========================================================
  // DELETE
  // ==========================================================

  async function handleDelete(
    item
  ) {

    const confirmed =
      window.confirm(
        `Hapus instansi "${item.nama_instansi}"?`
      );

    if (!confirmed) {
      return;
    }

    try {

      await apiRequest(
        `/instansi/${item.id}`,
        {
          method:
            "DELETE",
        }
      );

      await loadSummary();

      // Kalau data terakhir di halaman
      if (
        instansi.length === 1 &&
        pagination.page > 1
      ) {

        setPagination(
          (current) => ({
            ...current,
            page:
              current.page - 1,
          })
        );

      } else {

        await loadInstansi();

      }

    } catch (err) {

      window.alert(
        err.message ||
        "Gagal menghapus instansi."
      );
    }
  }

  // ==========================================================
  // CLOSE DETAIL
  // ==========================================================

  function closeDetail() {

    setShowDetail(
      false
    );

    setSelected(
      null
    );
  }

  return (
    <>
      {/* =====================================================
          TOPBAR
      ====================================================== */}

      <Topbar
        title="Dinas / Instansi"
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
          p-6
        "
      >

        {/* BREADCRUMB */}

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
            },
          ]}
        />

        {/* ERROR */}

        {error && (

          <div
            className="
              mb-5
              rounded-lg
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-xs
              text-red-600
            "
          >
            {error}
          </div>

        )}

        {/* ===================================================
            STAT CARDS
        ==================================================== */}

        <div
          className="
            mb-6
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {/* TOTAL */}

          <StatCard
            icon={Building2}
            iconBg="bg-red-50"
            iconColor="text-red-600"
            label="Total Dinas / Instansi"
            value={
              summary.total
            }
            helper="
              Seluruh data instansi
            "
          />

          {/* AKTIF */}

          <StatCard
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            label="Aktif"
            value={
              summary.aktif
            }
            helper="
              Instansi aktif
            "
          />

          {/* NONAKTIF */}

          <StatCard
            icon={XCircle}
            iconBg="bg-slate-100"
            iconColor="text-slate-500"
            label="Nonaktif"
            value={
              summary.nonaktif
            }
            helper="
              Instansi nonaktif
            "
          />

          {/* VERIFIKASI */}

          <StatCard
            icon={ShieldAlert}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            label="Perlu Verifikasi"
            value={
              summary.perlu_verifikasi
            }
            helper="
              Website belum tersedia
            "
          />

        </div>

        {/* ===================================================
            DATA CARD
        ==================================================== */}

        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-slate-100
            bg-white
            shadow-card
          "
        >

          {/* HEADER */}

          <div
            className="
              border-b
              border-slate-100
              px-6
              py-5
            "
          >

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-3
              "
            >

              <div>

                <h2
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Daftar Dinas / Instansi
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  Data langsung dari tabel instansi.
                </p>

              </div>

              <Link
                to="/dinas/tambah"
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-red-700
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  hover:bg-red-800
                "
              >

                <Plus
                  size={14}
                />

                Tambah Dinas / Instansi

              </Link>

            </div>

          </div>

          {/* =================================================
              FILTER
          ================================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              px-6
              py-4
            "
          >

            {/* SEARCH */}

            <label
              className="
                relative
                min-w-[240px]
                flex-1
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
                  search
                }
                onChange={
                  handleSearch
                }
                placeholder="
                  Cari dinas atau instansi...
                "
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  bg-slate-50
                  py-2
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

            </label>

            {/* WILAYAH */}

            <select
              value={
                wilayah
              }
              onChange={
                handleWilayah
              }
              className="
                rounded-lg
                border
                border-slate-300
                bg-slate-50
                px-3
                py-2
                text-xs
                font-medium
                text-slate-700
                outline-none
              "
            >

              <option value="">
                Semua Wilayah
              </option>

              {wilayahList.map(
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
                      item.nama
                    }
                  </option>

                )
              )}

            </select>

            {/* STATUS */}

            <select
              value={
                status
              }
              onChange={
                handleStatus
              }
              className="
                rounded-lg
                border
                border-slate-300
                bg-slate-50
                px-3
                py-2
                text-xs
                font-medium
                text-slate-700
                outline-none
              "
            >

              <option value="">
                Semua Status
              </option>

              <option value="Aktif">
                Aktif
              </option>

              <option value="Nonaktif">
                Nonaktif
              </option>

            </select>

          </div>

          {/* =================================================
              LOADING
          ================================================== */}

          {loading ? (

            <div
              className="
                px-6
                py-14
                text-center
                text-xs
                text-slate-400
              "
            >
              Memuat data instansi...
            </div>

          ) : (

            <div
              className="
                overflow-x-auto
              "
            >

              <table
                className="
                  w-full
                  min-w-[950px]
                  text-left
                  text-xs
                "
              >

                <thead>

                  <tr
                    className="
                      border-y
                      border-slate-100
                      bg-slate-50/70
                      text-slate-600
                    "
                  >

                    <th
                      className="
                        w-12
                        px-4
                        py-3
                        text-center
                        font-bold
                      "
                    >
                      No
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      Nama Dinas / Instansi
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      Wilayah
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      Kode Instansi
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        text-center
                        font-bold
                      "
                    >
                      Jumlah Layanan
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      Status
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        text-center
                        font-bold
                      "
                    >
                      Aksi
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {instansi.map(
                    (
                      item,
                      index
                    ) => {

                      const nomor =
                        (
                          pagination.page -
                          1
                        ) *
                          pagination.limit +
                        index +
                        1;

                      const aktif =
                        item.aktif ===
                        true;

                      return (

                        <tr
                          key={
                            item.id
                          }
                          className="
                            border-b
                            border-slate-100
                            hover:bg-slate-50/60
                          "
                        >

                          {/* NO */}

                          <td
                            className="
                              px-4
                              py-4
                              text-center
                              text-slate-500
                            "
                          >
                            {nomor}
                          </td>

                          {/* NAMA */}

                          <td
                            className="
                              px-4
                              py-4
                            "
                          >

                            <div>

                              <p
                                className="
                                  font-semibold
                                  text-slate-800
                                "
                              >
                                {
                                  item.nama_instansi
                                }
                              </p>

                              {item.singkatan && (

                                <p
                                  className="
                                    mt-0.5
                                    text-[10px]
                                    text-slate-400
                                  "
                                >
                                  {
                                    item.singkatan
                                  }
                                </p>

                              )}

                            </div>

                          </td>

                          {/* WILAYAH */}

                          <td
                            className="
                              px-4
                              py-4
                              text-slate-600
                            "
                          >
                            {
                              item.wilayah
                                ?.nama ||
                              "-"
                            }
                          </td>

                          {/* KODE */}

                          <td
                            className="
                              px-4
                              py-4
                              font-mono
                              text-slate-500
                            "
                          >
                            {
                              item.kode_instansi ||
                              "-"
                            }
                          </td>

                          {/* JUMLAH */}

                          <td
                            className="
                              px-4
                              py-4
                              text-center
                              font-semibold
                              text-slate-700
                            "
                          >
                            {
                              item.jumlah_layanan ??
                              0
                            }
                          </td>

                          {/* STATUS */}

                          <td
                            className="
                              px-4
                              py-4
                            "
                          >

                            {aktif ? (

                              <span
                                className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-full
                                  bg-emerald-50
                                  px-2.5
                                  py-1
                                  text-[10px]
                                  font-semibold
                                  text-emerald-700
                                "
                              >

                                <span
                                  className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-emerald-500
                                  "
                                />

                                Aktif

                              </span>

                            ) : (

                              <span
                                className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-full
                                  bg-slate-100
                                  px-2.5
                                  py-1
                                  text-[10px]
                                  font-semibold
                                  text-slate-600
                                "
                              >

                                <span
                                  className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-red-500
                                  "
                                />

                                Nonaktif

                              </span>

                            )}

                          </td>

                          {/* AKSI */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                justify-center
                                gap-1.5
                              "
                            >

                              {/* VIEW */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleView(
                                    item
                                  )
                                }
                                className="
                                  flex
                                  h-7
                                  w-7
                                  items-center
                                  justify-center
                                  rounded
                                  border
                                  border-slate-300
                                  text-slate-500
                                  hover:bg-slate-50
                                "
                                title="Lihat"
                              >

                                <Eye
                                  size={12}
                                />

                              </button>

                              {/* EDIT */}

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/dinas/tambah?id=${item.id}`
                                  )
                                }
                                className="
                                  flex
                                  h-7
                                  w-7
                                  items-center
                                  justify-center
                                  rounded
                                  border
                                  border-slate-300
                                  text-slate-500
                                  hover:bg-slate-50
                                "
                                title="Edit"
                              >

                                <Pencil
                                  size={12}
                                />

                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    item
                                  )
                                }
                                className="
                                  flex
                                  h-7
                                  w-7
                                  items-center
                                  justify-center
                                  rounded
                                  border
                                  border-red-200
                                  text-red-500
                                  hover:bg-red-50
                                "
                                title="Hapus"
                              >

                                <Trash2
                                  size={12}
                                />

                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )}

                  {instansi.length ===
                    0 && (

                    <tr>

                      <td
                        colSpan={7}
                        className="
                          px-4
                          py-14
                          text-center
                          text-xs
                          text-slate-400
                        "
                      >
                        Tidak ada data instansi yang sesuai.

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          )}

          {/* =================================================
              PAGINATION
          ================================================== */}

          {!loading && (

            <div
              className="
                border-t
                border-slate-100
                px-6
                py-4
              "
            >

              <Pagination
                page={
                  pagination.page
                }

                totalPages={
                  pagination.total_pages
                }

                totalItems={
                  pagination.total
                }

                pageSize={
                  pagination.limit
                }

                onPageChange={
                  (nextPage) =>
                    setPagination(
                      (current) => ({
                        ...current,
                        page:
                          nextPage,
                      })
                    )
                }
              />

            </div>

          )}

        </div>

      </main>

      {/* =====================================================
          DETAIL MODAL
      ====================================================== */}

      {showDetail &&
        selected && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            p-4
          "
          onMouseDown={
            closeDetail
          }
        >

          <div
            className="
              w-full
              max-w-xl
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                px-6
                py-4
              "
            >

              <div>

                <h2
                  className="
                    text-sm
                    font-bold
                    text-slate-800
                  "
                >
                  Detail Dinas / Instansi
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-slate-400
                  "
                >
                  Data langsung dari database
                </p>

              </div>

              <button
                type="button"
                onClick={
                  closeDetail
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  hover:bg-slate-100
                "
              >

                <X
                  size={16}
                />

              </button>

            </div>

            <div
              className="
                space-y-4
                p-6
              "
            >

              <Info
                label="ID"
                value={
                  selected.id
                }
              />

              <Info
                label="Nama Instansi"
                value={
                  selected.nama_instansi
                }
              />

              <Info
                label="Kode Instansi"
                value={
                  selected.kode_instansi
                }
              />

              <Info
                label="Singkatan"
                value={
                  selected.singkatan ||
                  "-"
                }
              />

              <Info
                label="Wilayah"
                value={
                  selected.wilayah
                    ?.nama ||
                  "-"
                }
              />

              <Info
                label="Tipe Wilayah"
                value={
                  selected.wilayah
                    ?.tipe ||
                  "-"
                }
              />

              <Info
                label="Level Pemerintahan"
                value={
                  selected.level
                    ?.nama ||
                  "-"
                }
              />

              <Info
                label="Jumlah Layanan"
                value={
                  selected.jumlah_layanan ??
                  0
                }
              />

              <Info
                label="Status"
                value={
                  selected.aktif
                    ? "Aktif"
                    : "Nonaktif"
                }
              />

              {selected.website && (

                <div>

                  <p
                    className="
                      mb-1
                      text-[10px]
                      font-bold
                      uppercase
                      text-slate-400
                    "
                  >
                    Website
                  </p>

                  <a
                    href={
                      selected.website
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      text-red-600
                      hover:underline
                    "
                  >

                    <ExternalLink
                      size={12}
                    />

                    {
                      selected.website
                    }

                  </a>

                </div>

              )}

            </div>

            <div
              className="
                flex
                justify-end
                border-t
                border-slate-100
                px-6
                py-4
              "
            >

              <button
                type="button"
                onClick={
                  closeDetail
                }
                className="
                  rounded-lg
                  border
                  border-slate-200
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-slate-600
                  hover:bg-slate-50
                "
              >
                Tutup
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

// ============================================================
// INFO
// ============================================================

function Info({
  label,
  value,
}) {

  return (
    <div>

      <p
        className="
          mb-1
          text-[10px]
          font-bold
          uppercase
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          text-xs
          font-medium
          text-slate-700
        "
      >
        {value || "-"}
      </p>

    </div>
  );
}
// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  helper,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-100
        bg-white
        p-5
        shadow-card
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
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${iconBg}
            ${iconColor}
          `}
        >
          <Icon size={21} />
        </div>

        <div>
          <p
            className="
              text-xs
              text-slate-500
            "
          >
            {label}
          </p>

          <p
            className="
              text-2xl
              font-bold
              text-slate-800
            "
          >
            {value}
          </p>

          <p
            className="
              text-[10px]
              text-slate-400
            "
          >
            {helper}
          </p>
        </div>
      </div>
    </div>
  );
}