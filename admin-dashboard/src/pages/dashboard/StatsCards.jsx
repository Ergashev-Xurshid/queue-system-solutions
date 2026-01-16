import React, { useEffect, useState } from "react";
import { Activity, Calendar } from "lucide-react";

import OperatorsNum from "./OperatorsNum";

function StatsCards() {
const [statistics, setStatistics] = useState({
  todayAll: 0,
  monthAll: 0,
  yearAll: 0,
});

  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token topilmadi");
      return;
    }

    try {
      setError(null);

      const res = await fetch("https://navbat.kstu.uz/statistics/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Status:", res.status);

      if (!res.ok) {
        throw new Error(`Xatolik: ${res.status}`);
      }

      const data = await res.json();
      setStatistics(data.body);
    } catch (err) {
      console.log("statistics Error:", err);
      setError("Statistikani yuklashda xatolik");
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {statistics.todayAll}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Bugun xizmat qildi
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {statistics.monthAll}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Oylik jami</p>
      </div>

      <OperatorsNum />
    </div>
  );
}

export default StatsCards;
