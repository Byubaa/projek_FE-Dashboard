import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Settings,
  Bell,
  RefreshCcw,
  Trash2,
  Database,
  Server,
  Save,
  LogOut,
  CheckCircle2,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";

import {
  apiRequest,
} from "../services/api";

// ============================================================
// DEFAULT SETTINGS
// ============================================================

const defaultSettings = {
  notifications: true,
  autoRefresh: false,
  confirmDelete: true,
  pageSize: 10,
};

// ============================================================
// LOAD SETTINGS
// ============================================================

function getSettings() {
  try {
    const saved =
      localStorage.getItem(
        "dashboard_settings"
      );

    if (!saved) {
      return defaultSettings;
    }

    const parsed =
      JSON.parse(saved);

    return {
      ...defaultSettings,
      ...parsed,
    };
  } catch {
    return defaultSettings;
  }
}

// ============================================================
// PAGE
// ============================================================

export default function Pengaturan() {

  const navigate =
    useNavigate();

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    settings,
    setSettings,
  ] = useState(
    defaultSettings
  );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    saved,
    setSaved,
  ] = useState(false);

  const [
    connectionStatus,
    setConnectionStatus,
  ] = useState("checking");

  const [
    error,
    setError,
  ] = useState("");

  // ==========================================================
  // INITIAL
  // ==========================================================

  useEffect(() => {

    setSettings(
      getSettings()
    );

    checkConnection();

  }, []);

  // ==========================================================
  // CHECK BACKEND
  // ==========================================================

  async function checkConnection() {

    setConnectionStatus(
      "checking"
    );

    try {

      const result =
        await apiRequest(
          "/layanan?page=1&limit=1"
        );

      if (
        result &&
        result.success === true
      ) {

        setConnectionStatus(
          "connected"
        );

      } else {

        setConnectionStatus(
          "error"
        );
      }

    } catch (err) {

      console.error(
        "Koneksi backend gagal:",
        err
      );

      setConnectionStatus(
        "error"
      );
    }
  }

  // ==========================================================
  // CHANGE SETTING
  // ==========================================================

  function updateSetting(
    field,
    value
  ) {

    setSettings(
      (current) => ({
        ...current,
        [field]:
          value,
      })
    );

    setSaved(false);
  }

  // ==========================================================
  // SAVE SETTINGS
  // ==========================================================

  function saveSettings() {

    setSaving(true);
    setSaved(false);
    setError("");

    try {

      localStorage.setItem(
        "dashboard_settings",
        JSON.stringify(
          settings
        )
      );

      localStorage.setItem(
        "dashboard_page_size",
        String(
          settings.pageSize
        )
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);

    } catch (err) {

      console.error(
        "Gagal menyimpan pengaturan:",
        err
      );

      setError(
        "Gagal menyimpan pengaturan."
      );

    } finally {

      setSaving(false);
    }
  }

  // ==========================================================
  // RESET
  // ==========================================================

  function resetSettings() {

    const confirmed =
      window.confirm(
        "Kembalikan semua pengaturan ke nilai default?"
      );

    if (!confirmed) {
      return;
    }

    setSettings(
      defaultSettings
    );

    localStorage.setItem(
      "dashboard_settings",
      JSON.stringify(
        defaultSettings
      )
    );

    localStorage.setItem(
      "dashboard_page_size",
      String(
        defaultSettings.pageSize
      )
    );

    setSaved(true);
  }

  // ==========================================================
  // LOGOUT
  // ==========================================================

  function handleLogout() {

    const confirmed =
      window.confirm(
        "Apakah kamu yakin ingin logout?"
      );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "dashboard_user"
    );

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  }

  return (
    <>
      {/* =====================================================
          TOPBAR
      ====================================================== */}

      <Topbar
        title="Pengaturan"
        subtitle="
          Kelola preferensi dashboard dan sistem
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
                "Pengaturan",
            },
          ]}
        />

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            mb-6
            rounded-xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-card
          "
        >

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
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
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-50
                  text-red-600
                "
              >

                <Settings
                  size={23}
                />

              </div>

              <div>

                <h1
                  className="
                    text-base
                    font-bold
                    text-slate-800
                  "
                >
                  Pengaturan Sistem
                </h1>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  Atur preferensi penggunaan dashboard admin.
                </p>

              </div>

            </div>

            {/* SAVE */}

            <button
              type="button"
              onClick={
                saveSettings
              }
              disabled={
                saving
              }
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-red-700
                px-5
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
                size={14}
              />

              {saving
                ? "Menyimpan..."
                : "Simpan Pengaturan"}

            </button>

          </div>

        </div>

        {/* ===================================================
            SUCCESS
        ==================================================== */}

        {saved && (

          <div
            className="
              mb-5
              flex
              items-center
              gap-2
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

            <CheckCircle2
              size={15}
            />

            Pengaturan berhasil disimpan.

          </div>

        )}

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
            CONTENT GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-[minmax(0,1fr)_320px]
          "
        >

          {/* =================================================
              LEFT
          ================================================== */}

          <div
            className="
              space-y-5
            "
          >

            {/* ===============================================
                PREFERENSI DASHBOARD
            ================================================ */}

            <section
              className="
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-card
              "
            >

              {/* SECTION HEADER */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-slate-100
                  px-6
                  py-5
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-50
                    text-red-600
                  "
                >

                  <SlidersHorizontal
                    size={17}
                  />

                </div>

                <div>

                  <h2
                    className="
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    Preferensi Dashboard
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-slate-400
                    "
                  >
                    Atur perilaku dan tampilan dashboard.
                  </p>

                </div>

              </div>

              <div>

                {/* =========================================
                    NOTIFICATION
                ========================================== */}

                <SettingRow
                  icon={Bell}
                  title="Notifikasi aktivitas"
                  description="
                    Tampilkan notifikasi aktivitas pada dashboard.
                  "
                >

                  <Toggle
                    checked={
                      settings.notifications
                    }
                    onChange={
                      (value) =>
                        updateSetting(
                          "notifications",
                          value
                        )
                    }
                  />

                </SettingRow>

                {/* =========================================
                    AUTO REFRESH
                ========================================== */}

                <SettingRow
                  icon={RefreshCcw}
                  title="Refresh otomatis"
                  description="
                    Izinkan halaman melakukan pembaruan data secara berkala.
                  "
                >

                  <Toggle
                    checked={
                      settings.autoRefresh
                    }
                    onChange={
                      (value) =>
                        updateSetting(
                          "autoRefresh",
                          value
                        )
                    }
                  />

                </SettingRow>

                {/* =========================================
                    CONFIRM DELETE
                ========================================== */}

                <SettingRow
                  icon={Trash2}
                  title="Konfirmasi sebelum menghapus"
                  description="
                    Tampilkan dialog konfirmasi sebelum data dihapus.
                  "
                >

                  <Toggle
                    checked={
                      settings.confirmDelete
                    }
                    onChange={
                      (value) =>
                        updateSetting(
                          "confirmDelete",
                          value
                        )
                    }
                  />

                </SettingRow>

                {/* =========================================
                    PAGE SIZE
                ========================================== */}

                <div
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-6
                    border-t
                    border-slate-100
                    px-6
                    py-5
                  "
                >

                  <div
                    className="
                      flex
                      min-w-0
                      items-start
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                      "
                    >

                      <Database
                        size={16}
                      />

                    </div>

                    <div
                      className="
                        min-w-0
                      "
                    >

                      <p
                        className="
                          text-xs
                          font-semibold
                          text-slate-700
                        "
                      >
                        Jumlah data per halaman
                      </p>

                      <p
                        className="
                          mt-1
                          max-w-xl
                          text-[11px]
                          leading-5
                          text-slate-400
                        "
                      >
                        Jumlah data yang ditampilkan
                        dalam setiap halaman tabel.
                      </p>

                    </div>

                  </div>

                  <select
                    value={
                      settings.pageSize
                    }
                    onChange={(e) =>
                      updateSetting(
                        "pageSize",
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="
                      shrink-0
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      px-3
                      py-2
                      text-xs
                      text-slate-700
                      outline-none
                      transition
                      focus:border-red-400
                      focus:ring-2
                      focus:ring-red-100
                    "
                  >

                    <option value={5}>
                      5 data
                    </option>

                    <option value={10}>
                      10 data
                    </option>

                    <option value={20}>
                      20 data
                    </option>

                    <option value={50}>
                      50 data
                    </option>

                    <option value={100}>
                      100 data
                    </option>

                  </select>

                </div>

              </div>

            </section>

            {/* ===============================================
                SYSTEM
            ================================================ */}

            <section
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
                  items-center
                  gap-3
                  border-b
                  border-slate-100
                  px-6
                  py-5
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-slate-50
                    text-slate-600
                  "
                >

                  <Server
                    size={17}
                  />

                </div>

                <div>

                  <h2
                    className="
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    Informasi Sistem
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-slate-400
                    "
                  >
                    Status koneksi aplikasi dan database.
                  </p>

                </div>

              </div>

              {/* BODY */}

              <div
                className="
                  space-y-4
                  p-6
                "
              >

                {/* BACKEND */}

                <SystemItem
                  label="Backend API"
                  value="http://localhost:8080"
                />

                {/* DATABASE */}

                <SystemItem
                  label="Database"
                  value="Supabase PostgreSQL"
                />

                {/* CONNECTION */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <span
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Status koneksi
                  </span>

                  {connectionStatus ===
                    "connected" && (

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

                      Terhubung

                    </span>

                  )}

                  {connectionStatus ===
                    "checking" && (

                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-amber-50
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        text-amber-700
                      "
                    >
                      Memeriksa...
                    </span>

                  )}

                  {connectionStatus ===
                    "error" && (

                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-red-50
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        text-red-700
                      "
                    >
                      Tidak terhubung
                    </span>

                  )}

                </div>

                <button
                  type="button"
                  onClick={
                    checkConnection
                  }
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    border
                    border-slate-200
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-slate-600
                    transition
                    hover:bg-slate-50
                  "
                >

                  <RefreshCcw
                    size={13}
                  />

                  Cek Koneksi Lagi

                </button>

              </div>

            </section>

            {/* ===============================================
                RESET
            ================================================ */}

            <section
              className="
                rounded-xl
                border
                border-amber-200
                bg-amber-50
                p-5
              "
            >

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-4
                "
              >

                <div>

                  <h3
                    className="
                      text-xs
                      font-bold
                      text-amber-800
                    "
                  >
                    Reset Pengaturan
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-amber-700
                    "
                  >
                    Mengembalikan preferensi dashboard
                    ke nilai default.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={
                    resetSettings
                  }
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    border
                    border-amber-300
                    bg-white
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-amber-700
                    transition
                    hover:bg-amber-100
                  "
                >

                  <RotateCcw
                    size={13}
                  />

                  Reset

                </button>

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <div
            className="
              space-y-5
            "
          >

            {/* PROFILE */}

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
                    rounded-full
                    bg-red-100
                    text-sm
                    font-bold
                    text-red-700
                  "
                >
                  A
                </div>

                <div>

                  <p
                    className="
                      text-xs
                      font-bold
                      text-slate-800
                    "
                  >
                    Admin
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-slate-400
                    "
                  >
                    Administrator Dashboard
                  </p>

                </div>

              </div>

              <p
                className="
                  text-[11px]
                  leading-5
                  text-slate-500
                "
              >
                Pengelolaan akun pengguna tersedia
                pada halaman Pengguna.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/pengguna"
                  )
                }
                className="
                  mt-4
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-50
                "
              >
                Kelola Pengguna
              </button>

            </aside>

            {/* SESSION */}

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

                <LogOut
                  size={16}
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
                  Sesi Login
                </h3>

              </div>

              <p
                className="
                  text-[11px]
                  leading-5
                  text-red-700
                "
              >
                Keluar dari dashboard akan menghapus
                token autentikasi dari browser.
              </p>

              <button
                type="button"
                onClick={
                  handleLogout
                }
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
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
                "
              >

                <LogOut
                  size={13}
                />

                Logout

              </button>

            </aside>

          </div>

        </div>

      </main>
    </>
  );
}

// ============================================================
// SETTING ROW
// ============================================================

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}) {

  return (
    <div
      className="
        flex
        w-full
        items-center
        justify-between
        gap-6
        border-b
        border-slate-100
        px-6
        py-5
      "
    >

      <div
        className="
          flex
          min-w-0
          items-start
          gap-3
        "
      >

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-slate-50
            text-slate-600
          "
        >

          <Icon
            size={16}
          />

        </div>

        <div
          className="
            min-w-0
          "
        >

          <p
            className="
              text-xs
              font-semibold
              text-slate-700
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              max-w-xl
              text-[11px]
              leading-5
              text-slate-400
            "
          >
            {description}
          </p>

        </div>

      </div>

      <div
        className="
          shrink-0
        "
      >
        {children}
      </div>

    </div>
  );
}

// ============================================================
// TOGGLE
// ============================================================

function Toggle({
  checked,
  onChange,
}) {

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() =>
        onChange(
          !checked
        )
      }
      className={`
        relative
        inline-flex
        h-6
        w-11
        shrink-0
        cursor-pointer
        items-center
        rounded-full
        border
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-red-200
        ${
          checked
            ? "border-red-700 bg-red-700"
            : "border-slate-300 bg-slate-200"
        }
      `}
    >

      <span
        className={`
          pointer-events-none
          block
          h-5
          w-5
          rounded-full
          bg-white
          shadow-sm
          transition-transform
          duration-200
          ${
            checked
              ? "translate-x-5"
              : "translate-x-0.5"
          }
        `}
      />

    </button>
  );
}

// ============================================================
// SYSTEM ITEM
// ============================================================

function SystemItem({
  label,
  value,
}) {

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        justify-between
        gap-3
      "
    >

      <span
        className="
          text-xs
          text-slate-500
        "
      >
        {label}
      </span>

      <span
        className="
          text-xs
          font-medium
          text-slate-700
        "
      >
        {value}
      </span>

    </div>
  );
}