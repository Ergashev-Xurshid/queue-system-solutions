import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

function BackDistribution() {
  const serviceDataTwo = [
    {
      name: "Statistik maʼlumotlarni yuritish sektori",
      value: 35,
      color: "green", // to‘q sariq
    },
    {
      name: "O‘quv jarayonini muvofiqlashtirish sektori",
      value: 40,
      color: "#ef4444", // qizil
    },
    {
      name: "Marketing va amaliyotlarni tashkil etish hamda buxgalteriya bo‘yicha xizmat ko‘rsatish sektori",
      value: 25,
      color: "#facc15", 
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        Maʼlumotlar bazasi
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={serviceDataTwo}
            cx={160}
            cy={120}
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
          >
            {serviceDataTwo.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Legend layout="vertical" align="right" verticalAlign="middle"   wrapperStyle={{ width: 800 }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BackDistribution;
