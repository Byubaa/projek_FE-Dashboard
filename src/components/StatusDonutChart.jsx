import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function StatusDonutChart({ data, total, subtitle = "Total", size = 150 }) {
  const innerR = Math.round(size * 0.32);
  const outerR = Math.round(size * 0.48);

  return (
    <div className="relative mx-auto shrink-0" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={innerR}
            outerRadius={outerR}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.label} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-2xl font-bold text-slate-800 leading-none">{total}</p>
        <p className="text-[10px] font-medium text-slate-400 mt-1 leading-none">{subtitle}</p>
      </div>
    </div>
  );
}
