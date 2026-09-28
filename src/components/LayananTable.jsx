import {
  useMemo,
  useState,
} from "react";

import {
  Pencil,
  ExternalLink,
  Trash2,
} from "lucide-react";

import {
  Badge,
  StatusDot,
} from "./Badge";

import Pagination from "./Pagination";

// ============================================================
// STATUS
// ============================================================

const STATUS_DOT_VARIANT = {
  Aktif: "green",
  "Perlu Update": "amber",
  "Non aktif": "red",
};

// ============================================================
// TABLE
// ============================================================

export default function LayananTable({
  data = [],
  pageSize = 8,
  showActions = false,
  onEdit,
  onDelete,

  serverPage,
  serverTotalPages,
  serverTotalItems,
  onServerPageChange,
}) {

  const [localPage, setLocalPage] =
    useState(1);

  const serverPagination =
    Number.isInteger(
      serverPage
    );

  const currentPage =
    serverPagination
      ? serverPage
      : localPage;

  const totalPages =
    serverPagination
      ? Math.max(
          1,
          serverTotalPages || 1
        )
      : Math.max(
          1,
          Math.ceil(
            data.length /
              pageSize
          )
        );

  const rows =
    useMemo(() => {

      if (
        serverPagination
      ) {
        return data;
      }

      return data.slice(
        (currentPage - 1) *
          pageSize,
        currentPage *
          pageSize
      );

    }, [
      data,
      currentPage,
      pageSize,
      serverPagination,
    ]);

  const totalItems =
    serverPagination
      ? serverTotalItems || 0
      : data.length;

  // ========================================================
  // PAGE CHANGE
  // ========================================================

  function handlePageChange(
    nextPage
  ) {

    if (
      serverPagination
    ) {

      onServerPageChange?.(
        nextPage
      );

      return;
    }

    setLocalPage(
      nextPage
    );
  }

  return (
    <div>

      <div
        className="
          overflow-x-auto
          -mx-1
        "
      >

        <table
          className="
            w-full
            min-w-[820px]
            text-left
            text-xs
          "
        >

          <thead>

            <tr
              className="
                text-slate-600
                font-semibold
              "
            >

              <th
                className="
                  px-3 py-2
                  w-10
                "
              >
                No
              </th>

              <th className="px-3 py-2">
                Wilayah
              </th>

              <th className="px-3 py-2">
                Dinas
              </th>

              <th className="px-3 py-2">
                Layanan
              </th>

              <th className="px-3 py-2">
                Kata Kunci
              </th>

              <th className="px-3 py-2">
                Status Layanan
              </th>

              {showActions && (
                <th
                  className="
                    px-3 py-2
                    text-right
                  "
                >
                  Aksi
                </th>
              )}

            </tr>

          </thead>

          <tbody
            className="space-y-2"
          >

            {rows.map(
              (row, index) => (

                <tr
                  key={row.id}
                  className="
                    bg-white
                    shadow-[0px_1px_1.5px_rgba(0,0,0,0.05)]
                    rounded-lg
                  "
                >

                  {/* NO */}

                  <td
                    className="
                      px-3 py-4
                      rounded-l-lg
                      text-slate-600
                      align-top
                    "
                  >
                    {
                      (currentPage - 1) *
                        pageSize +
                      index +
                      1
                    }
                  </td>

                  {/* WILAYAH */}

                  <td
                    className="
                      px-3 py-4
                      text-slate-600
                      align-top
                      whitespace-nowrap
                    "
                  >
                    {row.wilayah || "-"}
                  </td>

                  {/* DINAS */}

                  <td
                    className="
                      px-3 py-4
                      text-slate-600
                      align-top
                      max-w-[220px]
                    "
                  >
                    {row.dinas || "-"}
                  </td>

                  {/* LAYANAN */}

                  <td
                    className="
                      px-3 py-4
                      text-slate-600
                      align-top
                      whitespace-nowrap
                    "
                  >
                    {row.layanan || "-"}
                  </td>

                  {/* KEYWORDS */}

                  <td
                    className="
                      px-3 py-4
                      align-top
                    "
                  >

                    <div
                      className="
                        flex flex-wrap
                        gap-1
                        max-w-[180px]
                      "
                    >

                      {(row.kataKunci || [])
                        .map(
                          (keyword) => (

                            <Badge
                              key={keyword}
                              variant="blue"
                            >
                              {keyword}
                            </Badge>

                          )
                        )}

                    </div>

                  </td>

                  {/* STATUS */}

                  <td
                    className="
                      px-3 py-4
                      align-top
                      whitespace-nowrap
                    "
                  >

                    <StatusDot
                      variant={
                        STATUS_DOT_VARIANT[
                          row.status
                        ] || "amber"
                      }
                    >
                      {row.status || "-"}
                    </StatusDot>

                  </td>

                  {/* ACTION */}

                  {showActions && (

                    <td
                      className="
                        px-3 py-4
                        rounded-r-lg
                        align-top
                        text-right
                      "
                    >

                      <div
                        className="
                          flex items-center
                          justify-end
                          gap-2
                        "
                      >

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            onEdit?.(row)
                          }
                          className="
                            flex items-center
                            gap-1
                            rounded
                            border border-slate-200
                            px-2 py-1
                            text-slate-600
                            hover:bg-slate-50
                          "
                        >
                          <Pencil
                            size={12}
                          />

                          Edit
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            onDelete?.(row)
                          }
                          className="
                            flex items-center
                            gap-1
                            rounded
                            border border-red-200
                            px-2 py-1
                            text-red-600
                            hover:bg-red-50
                          "
                        >
                          <Trash2
                            size={12}
                          />

                          Hapus
                        </button>

                        {/* OPEN SOURCE */}

                        {row.link && (

                          <a
                            href={row.link}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              flex items-center
                              gap-1
                              rounded
                              border border-slate-200
                              px-2 py-1
                              text-slate-600
                              hover:bg-slate-50
                            "
                          >
                            <ExternalLink
                              size={12}
                            />

                            Buka
                          </a>

                        )}

                      </div>

                    </td>

                  )}

                </tr>

              )
            )}

            {/* EMPTY */}

            {rows.length === 0 && (

              <tr>

                <td
                  colSpan={
                    showActions
                      ? 7
                      : 6
                  }
                  className="
                    px-3 py-10
                    text-center
                    text-xs
                    text-slate-400
                  "
                >
                  Tidak ada data layanan.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={
          handlePageChange
        }
      />

    </div>
  );
}