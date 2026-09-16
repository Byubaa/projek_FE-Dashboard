import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = new Set([1, totalPages, page, page - 1, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const items = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) items.push("...");
    items.push(p);
    prev = p;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
      <p className="text-xs text-slate-400">
        Menampilkan {start} - {end} dari {totalItems} data
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 disabled:opacity-40"
          aria-label="Sebelumnya"
        >
          <ChevronLeft size={12} />
        </button>
        {items.map((p, i) =>
          p === "..." ? (
            <span key={`e${i}`} className="flex h-7 w-7 items-center justify-center text-xs text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`flex h-7 min-w-7 items-center justify-center rounded border px-1 text-xs font-medium ${
                p === page
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 disabled:opacity-40"
          aria-label="Berikutnya"
        >
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
