import { Shredder } from "lucide-react";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function BackDistribution({ data, title }) {
  const totalValue = data?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  if (totalValue === 0) {
    return (
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm transition-all hover:shadow-md h-80 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
          {title}
        </h3>

        {/* Bo'sh holat uchun vizual qism */}
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 mt-2">
          <div className="relative w-24 h-24 mb-3">
            {/* Kulrang donut halqasi (dummy chart) */}
            <div className="absolute inset-0 rounded-full border-2.5 border-slate-100"></div>
            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
              <Shredder />
            </div>
          </div>
          <p className="text-slate-500 font-medium text-sm">
            Ma'lumot mavjud emas
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Ushbu davr uchun statistika topilmadi
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
        {title}
      </h3>

      <div className="h-[420px]  w-full ">
        <ResponsiveContainer width="100%" height="100%" >
          <PieChart>
            <Pie
              data={data}
              cx="50%" // Markazni biroz o'ngroqqa suramiz (30% dan 35% ga)
              cy="50%"
              innerRadius={65}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  cornerRadius={6}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
                fontWeight: "500",
                color: "#64748b",
              }}
              // Sektor nomi va yonida qiymati
              formatter={(value, entry) => (
                <span className="text-slate-600 mr-2">
                  {value}{" "}
                  <span className="text-slate-400 font-normal">
                    ({entry.payload.value})
                  </span>
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BackDistribution;
