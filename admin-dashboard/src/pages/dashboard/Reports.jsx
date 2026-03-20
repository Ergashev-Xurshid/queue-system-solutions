import { useEffect, useState, useCallback } from "react";
import FrontDistribution from "../stats/FrontDistribution";
import BackDistribution from "../stats/BackDistribution";

export default function Reports() {
  const currentDate = new Date();
  const [filters, setFilters] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1, // JS da oylar 0 dan boshlanadi
  });
  
  const [stats, setStats] = useState({ front: [], back: [], loading: true });

  const fetchData = useCallback(async () => {
    setStats(prev => ({ ...prev, loading: true }));
    try {
      const token = localStorage.getItem("token");
      // Query parametrlari bilan API chaqiruvi
      const response = await fetch(
        `https://navbat.kstu.uz/api/statistics/categories/by-month?year=${filters.year}&month=${filters.month}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      
      const json = await response.json();
      if (json.success) {
        const body = json.body || [];
        const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"];

        const formatData = (items) => items.map((item, index) => ({
          name: item.nameUz,
          value: item.queueCount,
          color: colors[index % colors.length]
        }));

        setStats({
          front: formatData(body.filter(item => item.menuId === 1)),
          back: formatData(body.filter(item => item.menuId === 2)),
          loading: false
        });
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  }, [filters.year, filters.month]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const months = [
    { id: 1, name: "Yanvar" }, { id: 2, name: "Fevral" }, { id: 3, name: "Mart" },
    { id: 4, name: "Aprel" }, { id: 5, name: "May" }, { id: 6, name: "Iyun" },
    { id: 7, name: "Iyul" }, { id: 8, name: "Avgust" }, { id: 9, name: "Sentyabr" },
    { id: 10, name: "Oktyabr" }, { id: 11, name: "Noyabr" }, { id: 12, name: "Dekabr" }
  ];

  const years = [2024, 2025, 2026];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        {/* Filtrlar qismi */}
        <div className="flex gap-3 bg-white p-2 rounded-xl border border-slate-100 shadow-sm ml-auto">
          <select 
            value={filters.year}
            onChange={(e) => setFilters(f => ({ ...f, year: e.target.value }))}
            className="bg-slate-50 border-none text-slate-600 text-sm rounded-lg focus:ring-blue-500 block p-2.5 outline-none"
          >
            {years.map(y => <option key={y} value={y}>{y}-yil</option>)}
          </select>

          <select 
            value={filters.month}
            onChange={(e) => setFilters(f => ({ ...f, month: e.target.value }))}
            className="bg-slate-50 border-none text-slate-600 text-sm rounded-lg focus:ring-blue-500 block p-2.5 outline-none"
          >
            {months.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
      </div>

      {stats.loading ? (
        <div className="h-[400px] flex items-center justify-center text-slate-400">Yuklanmoqda...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FrontDistribution data={stats.front} title="Xizmat ko'rsatish (Front-office)" />
          <BackDistribution data={stats.back} title="Ma'lumotlar bazasi (Back-office)" />
        </div>
      )}
    </div>
  );
}