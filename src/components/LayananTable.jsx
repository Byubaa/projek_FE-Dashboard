import { useMemo, useState } from "react";
import { Pencil, ExternalLink } from "lucide-react";
import { Badge, StatusDot } from "./Badge";
import Pagination from "./Pagination";

const STATUS_DOT_VARIANT = { Aktif: "green", "Perlu Update": "amber", "Non aktif": "red" };

export default function LayananTable({ data, pageSize = 6, showActions = false, onEdit }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const rows = useMemo(
    () => data.slice((page - 1) * pageSize, page * pageSize),
    [data, page, pageSize]
  );

  return (
    <div>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[720px] text-left text-xs">
          <thead>
            <tr className="text-slate-600 font-semibold">
              <th className="px-3 py-2 w-10">No</th>
              <th className="px-3 py-2">Wilayah</th>
              <th className="px-3 py-2">Dinas</th>
              <th className="px-3 py-2">Layanan</th>
              <th className="px-3 py-2">Kata Kunci</th>
              <th className="px-3 py-2">Status Layanan</th>
              {showActions && <th className="px-3 py-2 text-right">Aksi</th>}
            </tr>
          </thead>
          <tbody className="space-y-2">
            {rows.map((row, i) => (
              <tr key={row.id} className="bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.05)] rounded-lg">
                <td className="px-3 py-4 rounded-l-lg text-slate-600 align-top">
                  {(page - 1) * pageSize + i + 1}
                </td>
                <td className="px-3 py-4 text-slate-600 align-top whitespace-nowrap">{row.wilayah}</td>
                <td className="px-3 py-4 text-slate-600 align-top max-w-[220px]">{row.dinas}</td>
                <td className="px-3 py-4 text-slate-600 align-top whitespace-nowrap">{row.layanan}</td>
                <td className="px-3 py-4 align-top">
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {row.kataKunci.map((k) => (
                      <Badge key={k} variant="blue">
                        {k}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-4 align-top whitespace-nowrap">
                  <StatusDot variant={STATUS_DOT_VARIANT[row.status]}>{row.status}</StatusDot>
                </td>
                {showActions && (
                  <td className="px-3 py-4 rounded-r-lg align-top text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit?.(row)}
                        className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-slate-600 hover:bg-slate-50"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-slate-600 hover:bg-slate-50">
                        <ExternalLink size={12} /> Buka
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={data.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
