import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SERIES = [
  { key: "Total", color: "#8491a5" },
  { key: "Selesai", color: "#20b982" },
  { key: "Ditolak", color: "#f04455" },
];

export default function TrendChart({ data }) {
  return (
    <div className="h-[276px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid vertical={false} stroke="#eef1f5" />
          <XAxis dataKey="tanggal" tick={{ fontSize: 11, fill: "#8491a5" }} axisLine={{ stroke: "#eef1f5" }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#8491a5" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: "#8491a5", top: -8 }}
          />
          {SERIES.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={2}
              dot={{ r: 3, fill: s.color, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
