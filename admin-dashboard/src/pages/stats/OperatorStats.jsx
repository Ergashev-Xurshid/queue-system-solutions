import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Anvar", served: 124 },
  { name: "Laylo", served: 98 },
  { name: "Kamol", served: 156 },
];

export default function OperatorStats() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Operatorlar Statistikasi</h1>

      <div className="bg-white p-4 shadow rounded">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="served" fill="#4caf50" />
        </BarChart>
      </div>
    </div>
  );
}
