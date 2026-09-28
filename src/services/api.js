const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

// ============================================================
// REQUEST UTAMA
// ============================================================

export async function apiRequest(
  endpoint,
  options = {}
) {
  const token =
    localStorage.getItem(
      "token"
    );

  const headers = {
    "Content-Type":
      "application/json",

    ...(options.headers || {}),
  };

  // ==========================================================
  // JWT
  // ==========================================================

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  // ==========================================================
  // REQUEST
  // ==========================================================

  let response;

  try {

    response =
      await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
          ...options,
          headers,
        }
      );

  } catch (error) {

    throw new Error(
      "Tidak dapat terhubung ke backend Golang. Pastikan server berjalan di http://localhost:8080."
    );
  }

  // ==========================================================
  // RESPONSE
  // ==========================================================

  let data = null;

  try {

    const text =
      await response.text();

    data = text
      ? JSON.parse(text)
      : null;

  } catch {

    data = null;
  }

  // ==========================================================
  // JWT EXPIRED
  // ==========================================================

  if (
    response.status === 401
  ) {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "isLoggedIn"
    );

    window.location.hash =
      "#/login";

    throw new Error(
      data?.message ||
        "Sesi login sudah tidak valid."
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (
    !response.ok
  ) {

    throw new Error(
      data?.message ||
        data?.error ||
        `Request gagal (${response.status})`
    );
  }

  // ==========================================================
  // SUCCESS
  // ==========================================================

  return data;
}

// ============================================================
// LOGIN
// ============================================================

export async function login(
  username,
  password
) {
  return apiRequest(
    "/login",
    {
      method: "POST",

      body:
        JSON.stringify({
          username,
          password,
        }),
    }
  );
}

// ============================================================
// REGISTER
// ============================================================

export async function register(
  username,
  password
) {
  return apiRequest(
    "/register",
    {
      method: "POST",

      body:
        JSON.stringify({
          username,
          password,
        }),
    }
  );
}

// ============================================================
// GET LAYANAN
// ============================================================

export async function getLayanan(
  params = {}
) {

  const query =
    new URLSearchParams();

  Object.entries(
    params
  ).forEach(
    ([key, value]) => {

      if (
        value !==
          undefined &&
        value !== null &&
        value !== ""
      ) {

        query.set(
          key,
          value
        );
      }
    }
  );

  const queryString =
    query.toString();

  return apiRequest(
    queryString
      ? `/layanan?${queryString}`
      : "/layanan"
  );
}

// ============================================================
// GET LAYANAN BY ID
// ============================================================

export async function getLayananById(
  id
) {
  return apiRequest(
    `/layanan/${id}`
  );
}

// ============================================================
// CREATE
// ============================================================

export async function createLayanan(
  data
) {
  return apiRequest(
    "/layanan",
    {
      method: "POST",

      body:
        JSON.stringify(data),
    }
  );
}

// ============================================================
// UPDATE
// ============================================================

export async function updateLayanan(
  id,
  data
) {
  return apiRequest(
    `/layanan/${id}`,
    {
      method: "PUT",

      body:
        JSON.stringify(data),
    }
  );
}

// ============================================================
// DELETE
// ============================================================

export async function deleteLayanan(
  id
) {
  return apiRequest(
    `/layanan/${id}`,
    {
      method: "DELETE",
    }
  );
}

// ============================================================
// WILAYAH
// ============================================================

export async function getWilayah() {
  return apiRequest(
    "/wilayah"
  );
}

export async function getWilayahById(
  id
) {
  return apiRequest(
    `/wilayah/${id}`
  );
}

// ============================================================
// INSTANSI
// ============================================================

export async function getInstansi() {
  return apiRequest(
    "/instansi"
  );
}

export async function getInstansiById(
  id
) {
  return apiRequest(
    `/instansi/${id}`
  );
}

// ============================================================
// KATEGORI
// ============================================================

export async function getKategoriLayanan() {
  return apiRequest(
    "/kategori-layanan"
  );
}

export async function getKategoriLayananById(
  id
) {
  return apiRequest(
    `/kategori-layanan/${id}`
  );
}