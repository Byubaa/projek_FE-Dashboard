import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Search,
  Users,
  Database,
  Eye,
  Pencil,
  Trash2,
  X,
  RefreshCcw,
  UserPlus,
  ShieldCheck,
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

export default function Pengguna() {

  const navigate =
    useNavigate();

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
  });

  // ==========================================================
  // SEARCH
  // ==========================================================

  const [
    search,
    setSearch,
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
  // LOADING
  // ==========================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // ==========================================================
  // ERROR
  // ==========================================================

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
          "/users/summary"
        );

      if (
        result?.success
      ) {

        setSummary(
          result.data ||
          {
            total: 0,
          }
        );
      }

    } catch (err) {

      console.error(
        "Gagal mengambil summary pengguna:",
        err
      );
    }
  }

  // ==========================================================
  // LOAD USERS
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

      const result =
        await apiRequest(
          `/users?${params.toString()}`
        );

      if (
        result?.success
      ) {

        setRows(
          result.data ||
          []
        );

        if (
          result.pagination
        ) {

          setPagination(
            result.pagination
          );
        }

      } else {

        setRows([]);

      }

    } catch (err) {

      setError(
        err.message ||
        "Gagal mengambil data pengguna."
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

  useEffect(() => {

    loadData();

  }, [
    pagination.page,
    pagination.limit,
    search,
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
  // VIEW DETAIL
  // ==========================================================

  async function handleView(
    item
  ) {

    try {

      const result =
        await apiRequest(
          `/users/${item.id}`
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
        `Hapus pengguna "${item.username}"?`
      );

    if (!confirmed) {
      return;
    }

    try {

      await apiRequest(
        `/users/${item.id}`,
        {
          method:
            "DELETE",
        }
      );

      await loadSummary();

      if (
        rows.length === 1 &&
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

        await loadData();

      }

    } catch (err) {

      window.alert(
        err.message ||
        "Gagal menghapus pengguna."
      );
    }
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
  // CLOSE
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
        title="Pengguna"
        subtitle="
          Kelola akun pengguna dashboard admin
        "
      />

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
                "Pengguna",
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
            SUMMARY
        ==================================================== */}

        <div
          className="
            mb-6
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >

          <UserCard
            icon={Database}
            iconBg="bg-red-50"
            iconColor="text-red-600"
            label="Total Pengguna"
            value={
              summary.total
            }
            description="
              Seluruh akun pengguna
            "
          />

          <UserCard
            icon={Users}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            label="Akun Terdaftar"
            value={
              summary.total
            }
            description="
              Data dari tabel users
            "
          />

          <UserCard
            icon={ShieldCheck}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            label="Akses Dashboard"
            value={
              summary.total
            }
            description="
              Akun yang tersimpan
            "
          />

        </div>

        {/* ===================================================
            TABLE
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
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
              border-b
              border-slate-100
              px-6
              py-5
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
                Daftar Pengguna
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Data diambil langsung dari tabel users.
              </p>

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

              <Link
                to="/pengguna/tambah"
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

                <UserPlus
                  size={13}
                />

                Tambah Pengguna

              </Link>

            </div>

          </div>

          {/* =================================================
              SEARCH
          ================================================== */}

          <div
            className="
              px-6
              py-4
            "
          >

            <label
              className="
                relative
                block
                max-w-xl
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
                  Cari username...
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

            </label>

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
              Memuat data pengguna...
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
                  min-w-[700px]
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
                        w-16
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
                      Username
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      Password
                    </th>

                    <th
                      className="
                        px-4
                        py-3
                        text-center
                        font-bold
                      "
                    >
                      Status
                    </th>

                    <th
                      className="
                        w-32
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

                          {/* USERNAME */}

                          <td
                            className="
                              px-4
                              py-4
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
                                  h-8
                                  w-8
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-red-50
                                  text-red-600
                                "
                              >

                                <Users
                                  size={14}
                                />

                              </div>

                              <div>

                                <p
                                  className="
                                    font-semibold
                                    text-slate-800
                                  "
                                >
                                  {
                                    item.username
                                  }
                                </p>

                                <p
                                  className="
                                    mt-0.5
                                    text-[10px]
                                    text-slate-400
                                  "
                                >
                                  ID: {
                                    item.id
                                  }
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* PASSWORD */}

                          <td
                            className="
                              px-4
                              py-4
                              font-mono
                              text-slate-400
                            "
                          >
                            ••••••••••
                          </td>

                          {/* STATUS */}

                          <td
                            className="
                              px-4
                              py-4
                              text-center
                            "
                          >

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

                          </td>

                          {/* ACTION */}

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
                                title="Lihat"
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

                              {/* EDIT */}

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/pengguna/tambah?id=${item.id}`
                                  )
                                }
                                title="Edit"
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
                                title="Hapus"
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

                  {rows.length ===
                    0 && (

                    <tr>

                      <td
                        colSpan={5}
                        className="
                          px-4
                          py-14
                          text-center
                          text-xs
                          text-slate-400
                        "
                      >
                        Tidak ada pengguna yang ditemukan.

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
              max-w-md
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
                  Detail Pengguna
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-slate-400
                  "
                >
                  Informasi akun
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

              <DetailItem
                label="ID"
                value={
                  selected.id
                }
              />

              <DetailItem
                label="Username"
                value={
                  selected.username
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

              </div>

              <div
                className="
                  rounded-lg
                  border
                  border-blue-200
                  bg-blue-50
                  p-3
                  text-[11px]
                  leading-5
                  text-blue-700
                "
              >
                Password tersimpan dalam bentuk hash
                dan tidak ditampilkan pada dashboard.
              </div>

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
// CARD
// ============================================================

function UserCard({
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