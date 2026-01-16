import { Download } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';


export default function DailyReport() {
  const dailyData = [
  { hour: '9AM', served: 12 },
  { hour: '10AM', served: 19 },
  { hour: '11AM', served: 25 },
  { hour: '12PM', served: 18 },
  { hour: '1PM', served: 22 },
  { hour: '2PM', served: 28 },
  { hour: '3PM', served: 24 },
  { hour: '4PM', served: 20 }
];
  return (
    <div className="bg-white w-full dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Daily Performance
        </h3>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer">
          <Download className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="hour" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="served" fill="#6366f1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
