import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  ShieldCheck,
  AlertTriangle,
  Database,
  RefreshCcw,
  Eye,
  X,
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

export default function Status() {

  // ==========================================================
  // DATA
  // ==========================================================

  const [
    rows,
    setRows,
  ] = useState([]);

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const [
    summary,
    setSummary,
  ] = useState({
    total: 0,
    verified: 0,
    need_review: 0,
    ready_rag: 0,
    cleaned: 0,
    raw: 0,
  });

  // ==========================================================
  // FILTER
  // ==========================================================

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState("");

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
  // LOAD SUMMARY
  // ==========================================================

  async function loadSummary() {

    try {

      const result =
        await apiRequest(
          "/layanan-status/summary"
        );

      setSummary(
        result?.data || {
          total: 0,
          verified: 0,
          need_review: 0,
          ready_rag: 0,
          cleaned: 0,
          raw: 0,
        }
      );

    } catch (err) {

      console.error(
        "Gagal mengambil summary:",
        err
      );

    }
  }

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  async function loadData() {

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
        status
      ) {

        params.set(
          "status",
          status
        );
      }

      const result =
        await apiRequest(
          `/layanan-status?${params.toString()}`
        );

      setRows(
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
        "Gagal mengambil data status layanan."
      );

      setRows([]);

    } finally {

      setLoading(false);

    }
  }

  // ==========================================================
  // INITIAL
  // ==========================================================

  useEffect(() => {

    loadSummary();

  }, []);

  // ==========================================================
  // DATA
  // ==========================================================

  useEffect(() => {

    loadData();

  }, [
    pagination.page,
    pagination.limit,
    search,
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
  // FILTER STATUS
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
  // VIEW DETAIL
  // ==========================================================

  async function handleView(
    item
  ) {

    try {

      const result =
        await apiRequest(
          `/layanan-status/${item.id}`
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
  // REFRESH
  // ==========================================================

  async function handleRefresh() {

    await Promise.all([
      loadSummary(),
      loadData(),
    ]);
  }

  // ==========================================================
  // STATUS BADGE
  // ==========================================================

  function renderStatus(
    value
  ) {

    const normalized =
      String(
        value || ""
      ).toUpperCase();

    switch (
      normalized
    ) {

      case "VERIFIED":

        return (
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

            VERIFIED

          </span>
        );

      case "NEED_REVIEW":

        return (
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-amber-50
              px-2.5
              py-1
              text-[10px]
              font-semibold
              text-amber-700
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-amber-500
              "
            />

            NEED REVIEW

          </span>
        );

      case "READY_RAG":

        return (
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-blue-50
              px-2.5
              py-1
              text-[10px]
              font-semibold
              text-blue-700
            "
          >
            READY RAG
          </span>
        );

      case "CLEANED":

        return (
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-indigo-50
              px-2.5
              py-1
              text-[10px]
              font-semibold
              text-indigo-700
            "
          >
            CLEANED
          </span>
        );

      case "RAW":

        return (
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
            RAW
          </span>
        );

      default:

        return (
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
            {normalized || "-"}
          </span>
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
        title="Status"
        subtitle="
          Monitor status knowledge base layanan
        "
      />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main
        className="
          flex-1
          bg-slate-100
          p-6
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
                "Status",
            },
          ]}
        />

        {/* ===================================================
            ERROR
        ==================================================== */}

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
              text-red-700
            "
          >
            {error}
          </div>

        )}

        {/* ===================================================
            SUMMARY CARDS
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

          <StatusCard
            icon={Database}
            iconBg="bg-slate-100"
            iconColor="text-slate-600"
            label="Total Status"
            value={
              summary.total
            }
            description="
              Seluruh record layanan_status
            "
          />

          {/* VERIFIED */}

          <StatusCard
            icon={ShieldCheck}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            label="Terverifikasi"
            value={
              summary.verified
            }
            description="
              Status VERIFIED
            "
          />

          {/* NEED REVIEW */}

          <StatusCard
            icon={AlertTriangle}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            label="Perlu Review"
            value={
              summary.need_review
            }
            description="
              Status NEED_REVIEW
            "
          />

          {/* READY RAG */}

          <StatusCard
            icon={RefreshCcw}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            label="Ready RAG"
            value={
              summary.ready_rag
            }
            description="
              Status READY_RAG
            "
          />

        </div>

        {/* ===================================================
            TABLE CARD
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
                  Status Knowledge Base
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  Data langsung dari tabel layanan_status.
                </p>

              </div>

              <button
                type="button"
                onClick={
                  handleRefresh
                }
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-slate-600
                  hover:bg-slate-50
                "
              >

                <RefreshCcw
                  size={13}
                />

                Refresh

              </button>

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
                min-w-[250px]
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
                  Cari layanan, instansi, wilayah...
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

              <option value="VERIFIED">
                VERIFIED
              </option>

              <option value="NEED_REVIEW">
                NEED_REVIEW
              </option>

              <option value="READY_RAG">
                READY_RAG
              </option>

              <option value="CLEANED">
                CLEANED
              </option>

              <option value="RAW">
                RAW
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
              Memuat data status...
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
                  min-w-[1000px]
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
                      Layanan
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      Instansi
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
                      Status
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      Checked At
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

                  {rows.map(
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

                          {/* LAYANAN */}

                          <td
                            className="
                              px-4
                              py-4
                            "
                          >

                            <p
                              className="
                                font-semibold
                                text-slate-800
                              "
                            >
                              {
                                item.nama_layanan ||
                                "-"
                              }
                            </p>

                            <p
                              className="
                                mt-0.5
                                font-mono
                                text-[10px]
                                text-slate-400
                              "
                            >
                              {
                                item.kode_layanan ||
                                "-"
                              }
                            </p>

                          </td>

                          {/* INSTANSI */}

                          <td
                            className="
                              px-4
                              py-4
                              text-slate-600
                            "
                          >
                            {
                              item.nama_instansi ||
                              "-"
                            }
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
                              item.wilayah ||
                              "-"
                            }
                          </td>

                          {/* STATUS */}

                          <td
                            className="
                              px-4
                              py-4
                            "
                          >

                            {
                              renderStatus(
                                item.status
                              )
                            }

                          </td>

                          {/* CHECKED AT */}

                          <td
                            className="
                              px-4
                              py-4
                              text-slate-500
                            "
                          >

                            {item.checked_at
                              ? new Date(
                                  item.checked_at
                                ).toLocaleString(
                                  "id-ID"
                                )
                              : "-"}

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
                                justify-center
                              "
                            >

                              <button
                                type="button"
                                onClick={() =>
                                  handleView(
                                    item
                                  )
                                }
                                title="Lihat detail"
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
                              >

                                <Eye
                                  size={12}
                                />

                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

                  {/* EMPTY */}

                  {rows.length ===
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
                        Tidak ada data status yang sesuai.

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

            {/* HEADER */}

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
                  Detail Status Layanan
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-slate-400
                  "
                >
                  Data dari layanan_status
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

            {/* BODY */}

            <div
              className="
                space-y-4
                p-6
              "
            >

              <DetailItem
                label="ID Status"
                value={
                  selected.id
                }
              />

              <DetailItem
                label="ID Layanan"
                value={
                  selected.layanan_id
                }
              />

              <DetailItem
                label="Kode Layanan"
                value={
                  selected.kode_layanan
                }
              />

              <DetailItem
                label="Nama Layanan"
                value={
                  selected.nama_layanan
                }
              />

              <DetailItem
                label="Instansi"
                value={
                  selected.nama_instansi
                }
              />

              <DetailItem
                label="Wilayah"
                value={
                  selected.wilayah
                }
              />

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
                  Status
                </p>

                {
                  renderStatus(
                    selected.status
                  )
                }

              </div>

              <DetailItem
                label="Checked At"
                value={
                  selected.checked_at
                    ? new Date(
                        selected.checked_at
                      ).toLocaleString(
                        "id-ID"
                      )
                    : "-"
                }
              />

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
                  Catatan
                </p>

                <div
                  className="
                    max-h-48
                    overflow-y-auto
                    rounded-lg
                    border
                    border-slate-200
                    bg-slate-50
                    p-3
                    text-xs
                    leading-5
                    text-slate-600
                  "
                >
                  {
                    selected.catatan ||
                    "-"
                  }
                </div>

              </div>

            </div>

            {/* FOOTER */}

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
// STAT CARD
// ============================================================

function StatusCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  description,
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
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${iconBg}
            ${iconColor}
          `}
        >

          <Icon
            size={21}
          />

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
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}

// ============================================================
// DETAIL ITEM
// ============================================================

function DetailItem({
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