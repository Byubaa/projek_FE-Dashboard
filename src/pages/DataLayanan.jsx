import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Plus,
  Search,
} from "lucide-react";

import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import LayananTable from "../components/LayananTable";

import { apiRequest } from "../services/api";

// ============================================================
// MAPPING BACKEND → TABLE
// ============================================================

function mapLayanan(item) {
  return {
    id: item.id,

    wilayah:
      item.instansi?.wilayah?.nama ||
      "-",

    dinas:
      item.instansi?.nama_instansi ||
      "-",

    layanan:
      item.nama_layanan ||
      "-",

    kataKunci:
      (
        item.keywords ||
        []
      ).map(
        (keyword) =>
          typeof keyword ===
          "string"
            ? keyword
            : keyword.keyword
      ),

    status:
      item.status ||
      "-",

    link:
      item.sumber?.[0]?.url ||
      "",
  };
}

// ============================================================
// PAGE
// ============================================================

export default function DataLayanan() {

  const navigate =
    useNavigate();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  // ==========================================================
  // STATE DATA
  // ==========================================================

  const [
    data,
    setData,
  ] = useState([]);

  const [
    wilayahList,
    setWilayahList,
  ] = useState([]);

  // ==========================================================
  // SEARCH
  // ==========================================================

  const [
    searchInput,
    setSearchInput,
  ] = useState(
    searchParams.get(
      "search"
    ) || ""
  );

  const [
    search,
    setSearch,
  ] = useState(
    searchParams.get(
      "search"
    ) || ""
  );

  // ==========================================================
  // FILTER
  // ==========================================================

  const [
    wilayah,
    setWilayah,
  ] = useState(
    searchParams.get(
      "wilayah"
    ) || ""
  );

  const [
    status,
    setStatus,
  ] = useState(
    searchParams.get(
      "status"
    ) || ""
  );

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const [
    page,
    setPage,
  ] = useState(
    Number(
      searchParams.get(
        "page"
      )
    ) || 1
  );

  const [
    pagination,
    setPagination,
  ] = useState({
    page: 1,
    limit: 8,
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
  // RELOAD
  // ==========================================================

  const [
    reloadKey,
    setReloadKey,
  ] = useState(0);

  // ==========================================================
  // SINKRONISASI URL → STATE
  // ==========================================================

  useEffect(() => {

    const urlSearch =
      searchParams.get(
        "search"
      ) || "";

    const urlWilayah =
      searchParams.get(
        "wilayah"
      ) || "";

    const urlStatus =
      searchParams.get(
        "status"
      ) || "";

    const urlPage =
      Number(
        searchParams.get(
          "page"
        )
      ) || 1;

    setSearchInput(
      urlSearch
    );

    setSearch(
      urlSearch
    );

    setWilayah(
      urlWilayah
    );

    setStatus(
      urlStatus
    );

    setPage(
      urlPage
    );

  }, [
    searchParams,
  ]);

  // ==========================================================
  // LOAD WILAYAH
  // ==========================================================

  useEffect(() => {

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

    loadWilayah();

  }, []);

  // ==========================================================
  // DEBOUNCE SEARCH
  // ==========================================================
  //
  // Search atas menggunakan Enter,
  // sedangkan search di halaman ini
  // tetap bisa mencari otomatis.
  //

  useEffect(() => {

    const timer =
      setTimeout(() => {

        const value =
          searchInput.trim();

        setSearch(
          value
        );

        // ----------------------------------------------------
        // RESET PAGE
        // ----------------------------------------------------

        setPage(1);

        // ----------------------------------------------------
        // UPDATE URL
        // ----------------------------------------------------

        const params =
          new URLSearchParams();

        if (value) {

          params.set(
            "search",
            value
          );
        }

        if (wilayah) {

          params.set(
            "wilayah",
            wilayah
          );
        }

        if (status) {

          params.set(
            "status",
            status
          );
        }

        if (value ||
            wilayah ||
            status) {

          setSearchParams(
            params,
            {
              replace: true,
            }
          );

        } else {

          setSearchParams(
            {},
            {
              replace: true,
            }
          );
        }

      }, 400);

    return () => {
      clearTimeout(
        timer
      );
    };

  }, [
    searchInput,
  ]);

  // ==========================================================
  // LOAD LAYANAN
  // ==========================================================

  useEffect(() => {

    async function loadLayanan() {

      setLoading(true);
      setError("");

      try {

        const params =
          new URLSearchParams();

        // ----------------------------------------------------
        // PAGE
        // ----------------------------------------------------

        params.set(
          "page",
          String(page)
        );

        // ----------------------------------------------------
        // LIMIT
        // ----------------------------------------------------

        params.set(
          "limit",
          "8"
        );

        // ----------------------------------------------------
        // SEARCH
        // ----------------------------------------------------

        if (
          search.trim()
        ) {

          params.set(
            "search",
            search.trim()
          );
        }

        // ----------------------------------------------------
        // WILAYAH
        // ----------------------------------------------------

        if (wilayah) {

          params.set(
            "wilayah",
            wilayah
          );
        }

        // ----------------------------------------------------
        // STATUS
        // ----------------------------------------------------

        if (status) {

          params.set(
            "status",
            status
          );
        }

        // ----------------------------------------------------
        // REQUEST
        // ----------------------------------------------------

        const result =
          await apiRequest(
            `/layanan?${params.toString()}`
          );

        // ----------------------------------------------------
        // DATA
        // ----------------------------------------------------

        setData(
          (
            result?.data ||
            []
          ).map(
            mapLayanan
          )
        );

        // ----------------------------------------------------
        // PAGINATION
        // ----------------------------------------------------

        setPagination(
          result?.pagination ||
          {
            page,
            limit: 8,
            total: 0,
            total_pages: 1,
          }
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

      } finally {

        setLoading(false);

      }

    }

    loadLayanan();

  }, [
    page,
    search,
    wilayah,
    status,
    reloadKey,
  ]);

  // ==========================================================
  // SEARCH CHANGE
  // ==========================================================

  function handleSearchChange(
    e
  ) {

    setSearchInput(
      e.target.value
    );
  }

  // ==========================================================
  // WILAYAH CHANGE
  // ==========================================================

  function handleWilayahChange(
    e
  ) {

    const value =
      e.target.value;

    setWilayah(
      value
    );

    setPage(1);
  }

  // ==========================================================
  // STATUS CHANGE
  // ==========================================================

  function handleStatusChange(
    e
  ) {

    const value =
      e.target.value;

    setStatus(
      value
    );

    setPage(1);
  }

  // ==========================================================
  // PAGE CHANGE
  // ==========================================================

  function handlePageChange(
    nextPage
  ) {

    setPage(
      nextPage
    );

    const params =
      new URLSearchParams();

    if (search.trim()) {

      params.set(
        "search",
        search.trim()
      );
    }

    if (wilayah) {

      params.set(
        "wilayah",
        wilayah
      );
    }

    if (status) {

      params.set(
        "status",
        status
      );
    }

    params.set(
      "page",
      String(nextPage)
    );

    setSearchParams(
      params,
      {
        replace: true,
      }
    );
  }

  // ==========================================================
  // DELETE
  // ==========================================================

  async function handleDelete(
    row
  ) {

    const confirmed =
      window.confirm(
        `Hapus layanan "${row.layanan}"?`
      );

    if (!confirmed) {
      return;
    }

    try {

      await apiRequest(
        `/layanan/${row.id}`,
        {
          method:
            "DELETE",
        }
      );

      // ------------------------------------------------------
      // Jika halaman terakhir hanya mempunyai satu data
      // ------------------------------------------------------

      if (
        data.length === 1 &&
        page > 1
      ) {

        setPage(
          (current) =>
            current - 1
        );

      } else {

        setReloadKey(
          (current) =>
            current + 1
        );
      }

    } catch (err) {

      alert(
        err.message ||
        "Gagal menghapus layanan."
      );
    }
  }

  return (
    <>
      {/* ====================================================
          TOPBAR
      ===================================================== */}

      <Topbar
        title="Data Layanan"
        subtitle="Layanan Informasi Publik"
      />

      {/* ====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          flex-1
          p-6
        "
      >

        {/* ==================================================
            BREADCRUMB
        =================================================== */}

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
                "Data Layanan",
            },
          ]}
        />

        {/* ==================================================
            CARD
        =================================================== */}

        <div
          className="
            rounded-xl
            bg-white
            p-6
            shadow-card
          "
        >

          {/* =================================================
              HEADER
          ================================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
              mb-4
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
                Daftar Layanan Informasi Publik
              </h2>

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Data diambil langsung dari backend Golang.
              </p>

            </div>

            {/* TAMBAH */}

            <Link
              to="/data-layanan/tambah"
              className="
                flex
                items-center
                gap-1.5
                rounded-lg
                bg-brand-600
                px-4
                py-2
                text-xs
                font-semibold
                text-white
                hover:bg-brand-700
                transition
              "
            >

              <Plus size={14} />

              Tambah Layanan

            </Link>

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
              mb-4
            "
          >

            {/* WILAYAH */}

            <select
              value={wilayah}
              onChange={
                handleWilayahChange
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
                focus:outline-none
                focus:ring-2
                focus:ring-brand-400
              "
            >

              <option value="">
                Semua Wilayah
              </option>

              {wilayahList.map(
                (item) => (

                  <option
                    key={item.id}
                    value={item.nama}
                  >
                    {item.nama}
                  </option>

                )
              )}

            </select>

            {/* STATUS */}

            <select
              value={status}
              onChange={
                handleStatusChange
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
                focus:outline-none
                focus:ring-2
                focus:ring-brand-400
              "
            >

              <option value="">
                Semua Status
              </option>

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

            {/* SEARCH HALAMAN */}

            <label
              className="
                relative
                flex-1
                min-w-[220px]
              "
            >

              <Search
                size={14}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  pointer-events-none
                "
              />

              <input
                type="text"
                placeholder="
                  Cari nama dinas, layanan...
                "
                value={
                  searchInput
                }
                onChange={
                  handleSearchChange
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  py-2
                  pl-9
                  pr-3
                  text-xs
                  text-slate-600
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-brand-400
                "
              />

            </label>

          </div>

          {/* =================================================
              ERROR
          ================================================== */}

          {error && (

            <div
              className="
                mb-4
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

          {/* =================================================
              TABLE
          ================================================== */}

          {loading ? (

            <div
              className="
                py-12
                text-center
                text-xs
                text-slate-400
              "
            >
              Memuat data layanan dari backend...
            </div>

          ) : (

            <LayananTable
              data={
                data
              }
              pageSize={
                pagination.limit ||
                8
              }
              showActions

              serverPage={
                pagination.page
              }

              serverTotalPages={
                pagination.total_pages
              }

              serverTotalItems={
                pagination.total
              }

              onServerPageChange={
                handlePageChange
              }

              onEdit={(row) =>
                navigate(
                  `/data-layanan/tambah?id=${row.id}`
                )
              }

              onDelete={
                handleDelete
              }
            />

          )}

        </div>

      </main>
    </>
  );
}