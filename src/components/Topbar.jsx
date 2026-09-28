import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Search,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

// ============================================================
// TOPBAR
// ============================================================

export default function Topbar({
  title,
  subtitle,
}) {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [
    searchParams,
  ] = useSearchParams();

  // ==========================================================
  // SEARCH
  // ==========================================================

  const [
    searchInput,
    setSearchInput,
  ] = useState("");

  // ==========================================================
  // USER MENU
  // ==========================================================

  const [
    userMenuOpen,
    setUserMenuOpen,
  ] = useState(false);

  const userMenuRef =
    useRef(null);

  // ==========================================================
  // SINKRONISASI SEARCH DENGAN URL
  // ==========================================================

  useEffect(() => {

    const urlSearch =
      searchParams.get(
        "search"
      ) || "";

    setSearchInput(
      urlSearch
    );

  }, [
    searchParams,
  ]);

  // ==========================================================
  // CLOSE USER MENU SAAT KLIK DI LUAR
  // ==========================================================

  useEffect(() => {

    function handleClickOutside(
      event
    ) {

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(
          event.target
        )
      ) {

        setUserMenuOpen(
          false
        );
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // ==========================================================
  // SEARCH SUBMIT
  // ==========================================================

  function handleSearchSubmit(
    e
  ) {

    e.preventDefault();

    const query =
      searchInput.trim();

    if (!query) {

      navigate(
        "/data-layanan"
      );

      return;
    }

    navigate(
      `/data-layanan?search=${encodeURIComponent(
        query
      )}`
    );
  }

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
  // CLEAR SEARCH
  // ==========================================================

  function handleClearSearch() {

    setSearchInput("");

    if (
      location.pathname ===
      "/data-layanan"
    ) {

      navigate(
        "/data-layanan"
      );
    }
  }

  // ==========================================================
  // LOGOUT
  // ==========================================================

  function handleLogout() {

    // --------------------------------------------------------
    // Hapus JWT
    // --------------------------------------------------------

    localStorage.removeItem(
      "token"
    );

    // --------------------------------------------------------
    // Hapus data user
    // --------------------------------------------------------

    localStorage.removeItem(
      "user"
    );

    // --------------------------------------------------------
    // Hapus status login lama
    // --------------------------------------------------------

    localStorage.removeItem(
      "isLoggedIn"
    );

    // --------------------------------------------------------
    // Tutup menu
    // --------------------------------------------------------

    setUserMenuOpen(
      false
    );

    // --------------------------------------------------------
    // Kembali ke login
    // --------------------------------------------------------

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  }

  // ==========================================================
  // AMBIL DATA USER
  // ==========================================================

  let user = null;

  try {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {
      user =
        JSON.parse(
          storedUser
        );
    }

  } catch {
    user = null;
  }

  const username =
    user?.username ||
    "Admin PPID";

  // Ambil inisial
  const initials =
    username
      .split(" ")
      .filter(Boolean)
      .map(
        (word) =>
          word[0]
            ?.toUpperCase()
      )
      .join("")
      .slice(0, 2) ||
    "AP";

  return (
    <header
      className="
        h-[104px]
        border-b
        border-slate-200
        bg-white
        flex
        items-center
        justify-between
        px-8
        shrink-0
      "
    >

      {/* ====================================================
          LEFT
      ===================================================== */}

      <div>

        <h1
          className="
            text-2xl
            font-bold
            text-slate-800
            leading-tight
          "
        >
          {title}
        </h1>

        <p
          className="
            text-sm
            text-slate-500
            mt-0.5
          "
        >
          {subtitle}
        </p>

      </div>

      {/* ====================================================
          RIGHT
      ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >

        {/* ==================================================
            GLOBAL SEARCH
        =================================================== */}

        <form
          onSubmit={
            handleSearchSubmit
          }
          className="
            relative
            w-[320px]
          "
        >

          <Search
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              pointer-events-none
            "
          />

          <input
            type="text"
            value={
              searchInput
            }
            onChange={
              handleSearchChange
            }
            placeholder="
              Cari layanan, dinas, kata kunci...
            "
            className="
              w-full
              h-[46px]
              rounded-xl
              border
              border-slate-300
              bg-white
              pl-11
              pr-10
              text-sm
              text-slate-700
              placeholder:text-slate-400
              outline-none
              focus:border-brand-500
              focus:ring-2
              focus:ring-brand-100
              transition
            "
          />

          {searchInput && (
            <button
              type="button"
              onClick={
                handleClearSearch
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                hover:text-slate-600
              "
              title="Hapus pencarian"
            >
              ×
            </button>
          )}

        </form>

        {/* ==================================================
            DARK MODE
        =================================================== */}

        <button
          type="button"
          className="
            text-slate-500
            hover:text-slate-700
            transition
          "
          title="Mode gelap"
        >
          <Moon size={21} />
        </button>

        {/* ==================================================
            NOTIFICATION
        =================================================== */}

        <button
          type="button"
          className="
            relative
            text-slate-500
            hover:text-slate-700
            transition
          "
          title="Notifikasi"
        >

          <Bell size={21} />

          <span
            className="
              absolute
              -right-2
              -top-2
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
            "
          >
            5
          </span>

        </button>

        {/* ==================================================
            USER MENU
        =================================================== */}

        <div
          className="
            relative
          "
          ref={userMenuRef}
        >

          {/* USER BUTTON */}

          <button
            type="button"
            onClick={() =>
              setUserMenuOpen(
                (value) =>
                  !value
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-lg
              px-1
              py-1
              hover:bg-slate-50
              transition
            "
          >

            {/* AVATAR */}

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-sm
                font-bold
                text-white
              "
            >
              {initials}
            </div>

            {/* USERNAME */}

            <span
              className="
                max-w-[130px]
                truncate
                text-sm
                font-semibold
                text-slate-700
              "
            >
              {username}
            </span>

            <ChevronDown
              size={17}
              className={`
                text-slate-500
                transition-transform
                ${
                  userMenuOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />

          </button>

          {/* =================================================
              DROPDOWN
          ================================================== */}

          {userMenuOpen && (

            <div
              className="
                absolute
                right-0
                top-full
                z-50
                mt-2
                w-56
                rounded-xl
                border
                border-slate-200
                bg-white
                p-2
                shadow-xl
              "
            >

              {/* USER INFO */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-3
                  mb-1
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-red-100
                    text-xs
                    font-bold
                    text-red-600
                  "
                >
                  {initials}
                </div>

                <div
                  className="
                    min-w-0
                  "
                >

                  <p
                    className="
                      truncate
                      text-xs
                      font-semibold
                      text-slate-700
                    "
                  >
                    {username}
                  </p>

                  <p
                    className="
                      text-[10px]
                      text-slate-400
                    "
                  >
                    Administrator
                  </p>

                </div>

              </div>

              <div
                className="
                  my-1
                  border-t
                  border-slate-100
                "
              />

              {/* PROFILE */}

              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(
                    false
                  );

                  navigate(
                    "/pengguna"
                  );
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-xs
                  text-slate-600
                  hover:bg-slate-50
                "
              >

                <User
                  size={15}
                  className="
                    text-slate-400
                  "
                />

                Profil

              </button>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={
                  handleLogout
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-xs
                  font-semibold
                  text-red-600
                  hover:bg-red-50
                "
              >

                <LogOut
                  size={15}
                />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}