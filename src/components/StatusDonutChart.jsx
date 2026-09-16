import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function StatusDonutChart({ data, total }) {
  return (
    <div className="relative h-[130px] w-[130px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={38}
            outerRadius={58}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.label} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xl font-extrabold text-slate-800">{total}</p>
        <p className="text-[10px] font-semibold uppercase text-slate-400">Total</p>
      </div>
    </div>
  );
}
