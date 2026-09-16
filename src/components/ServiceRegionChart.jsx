import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Representative sample data (the source Figma file only exported this chart as a
// flattened SVG path, so exact underlying values weren't recoverable) — swap in
// real numbers from your API once available.
const DATA = [
  { wilayah: "Provinsi DIY", Aktif: 180, "Perlu Update": 40, Offline: 15, Draft: 8 },
  { wilayah: "Kota Yogyakarta", Aktif: 150, "Perlu Update": 35, Offline: 12, Draft: 6 },
  { wilayah: "Sleman", Aktif: 120, "Perlu Update": 30, Offline: 10, Draft: 5 },
  { wilayah: "Bantul", Aktif: 95, "Perlu Update": 25, Offline: 8, Draft: 4 },
  { wilayah: "Kulon Progo", Aktif: 80, "Perlu Update": 20, Offline: 6, Draft: 3 },
  { wilayah: "Gunungkidul", Aktif: 65, "Perlu Update": 18, Offline: 5, Draft: 2 },
  { wilayah: "Pusat", Aktif: 60, "Perlu Update": 15, Offline: 4, Draft: 2 },
];

const SERIES = [
  { key: "Aktif", color: "#16a34a" },
  { key: "Perlu Update", color: "#ea580c" },
  { key: "Offline", color: "#dc2626" },
  { key: "Draft", color: "#cbd5e1" },
];

export default function ServiceRegionChart() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1 text-[10px] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.key}
          </span>
        ))}
      </div>
      <div className="h-[190px] -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={DATA} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="wilayah"
              tick={{ fontSize: 8, fill: "#94a3b8" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={30}
            />
            <YAxis tick={{ fontSize: 8, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={24} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.5}
                dot={{ r: 2, fill: s.color, strokeWidth: 0 }}
                activeDot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
