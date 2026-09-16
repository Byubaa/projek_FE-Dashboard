export default function Avatar({
  name = "Admin PPID",
  size = 40,
  className = "",
  bg = "bg-gradient-to-br from-brand-400 to-brand-600",
  textColor = "text-white",
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold shrink-0 ${bg} ${textColor} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
