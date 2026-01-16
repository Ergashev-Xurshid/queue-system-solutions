import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

function FrontDistribution() {
  const serviceData = [
    {
      name: "Talabalarga xizmat ko‘rsatish sektori",
      value: 35,
      color: "#6366f1",
    },
    {
      name: "Ilmiy va innovatsion faoliyat bo‘yicha xizmat ko‘rsatish sektori",
      value: 25,
      color: "#8b5cf6",
    },
    {
      name: "Xalqaro aloqalar va akademik mobillik bo‘yicha xizmat ko‘rsatish sektori",
      value: 20,
      color: "#ec4899",
    },
    {
      name: "Marketing va amaliyotlarni tashkil etish hamda buxgalteriya bo‘yicha xizmat ko‘rsatish sektori",
      value: 20,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="bg-white  rounded-xl p-6 border border-slate-200 focus:outline-none">
      <h3 className="text-lg font-semibold text-slate-900 ">
        Maʼlumotlar bazasi
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart  tabIndex={-1}>
          <Pie
            data={serviceData}
            cx={160}
            cy={120}
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
          >
            {serviceData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ width: 800 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FrontDistribution;
