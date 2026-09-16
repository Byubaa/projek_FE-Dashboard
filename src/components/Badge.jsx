const VARIANTS = {
  slate: "bg-slate-200 text-slate-600",
  blue: "bg-blue-200 text-blue-800",
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
};

export function Badge({ children, variant = "slate", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium whitespace-nowrap ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

const DOT_VARIANTS = {
  green: "bg-green-600 text-green-700",
  amber: "bg-amber-600 text-amber-700",
  red: "bg-red-600 text-red-700",
  slate: "bg-slate-400 text-slate-600",
};

export function StatusDot({ children, variant = "green" }) {
  const dot = DOT_VARIANTS[variant] || DOT_VARIANTS.green;
  const [dotColor, textColor] = dot.split(" ");
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap">
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      <span className={textColor}>{children}</span>
    </span>
  );
}
