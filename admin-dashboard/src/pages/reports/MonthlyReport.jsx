import { Filter } from 'lucide-react';
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const monthlyData = [
  { week: 'Week 1', served: 450 },
  { week: 'Week 2', served: 520 },
  { week: 'Week 3', served: 480 },
  { week: 'Week 4', served: 610 }
];

export default function MonthlyReport() {
  return (
    <div className="bg-white w-full dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Monthly Trend
        </h3>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer">
          <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="week" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="served"
            stroke="#8b5cf6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
