import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, Trophy, Users, RefreshCcw } from "lucide-react";

const monthOptions = [
  { value: 1, label: "Yanvar" },
  { value: 2, label: "Fevral" },
  { value: 3, label: "Mart" },
  { value: 4, label: "Aprel" },
  { value: 5, label: "May" },
  { value: 6, label: "Iyun" },
  { value: 7, label: "Iyul" },
  { value: 8, label: "Avgust" },
  { value: 9, label: "Sentabr" },
  { value: 10, label: "Oktabr" },
  { value: 11, label: "Noyabr" },
  { value: 12, label: "Dekabr" },
];

function OperatorReports() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const yearOptions = useMemo(() => {
    const start = currentYear - 3;
    const end = currentYear + 1;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentYear]);

  const selectedMonthName =
    monthOptions.find((item) => item.value === month)?.label || `${month}-oy`;

  const topOperator = data?.[0] || null;
  const totalQueues = data.reduce((sum, item) => sum + (item.queueCount || 0), 0);
  const operatorsCount = data.length;

  const fetchOperators = async () => {
    if (!token) {
      setError("Token topilmadi");
      setData([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://navbat.kstu.uz/api/statistics/operators/by-month?year=${year}&month=${month}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Operator statistikalarini olishda xatolik yuz berdi");
      }

      const result = await response.json();

      setData(Array.isArray(result?.body) ? result.body : []);
      setMessage(result?.message || "");
    } catch (err) {
      setError(err.message || "Noma’lum xatolik yuz berdi");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, [year, month]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Operatorlar hisoboti
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Oy va yil bo‘yicha operatorlar xizmat ko‘rsatish statistikasi
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
            <CalendarDays className="h-4 w-4 text-slate-500" />
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none"
            >
              {monthOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none"
            >
              {yearOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchOperators}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <RefreshCcw className="h-4 w-4" />
            Yangilash
          </button>
        </div>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Top operator */}
        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-amber-400 via-yellow-400 to-orange-400 p-px shadow-sm">
          <div className="h-full rounded-3xl bg-white/95 p-5 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Eng ko‘p xizmat ko‘rsatgan
                </p>
                <h2 className="mt-2 text-lg font-bold text-slate-900">
                  {topOperator ? topOperator.operatorName : "Ma’lumot yo‘q"}
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  {selectedMonthName} {year}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">Xizmat soni</p>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {topOperator ? topOperator.queueCount : 0}
                </p>
              </div>

              {topOperator && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  TOP operator
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Total queues */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Jami xizmatlar</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {totalQueues}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            {selectedMonthName} {year} bo‘yicha umumiy ko‘rsatkich
          </p>
        </div>

        {/* Operators count */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Faol operatorlar soni
              </p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {operatorsCount}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
              <Users className="h-6 w-6 text-violet-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Statistikada qatnashgan operatorlar
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Operatorlar ro‘yxati
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {message || `${year}-yil ${selectedMonthName} oyi uchun statistik ma’lumot`}
          </p>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-500">Ma’lumot topilmadi</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    O‘rin
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Operator
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Xizmat soni
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Holat
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {data.map((item, index) => (
                  <tr
                    key={item.operatorId}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                            index === 0
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {item.operatorName}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          ID: {item.operatorId}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {item.queueCount} ta
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {index === 0 ? (
                        <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          Eng yuqori natija
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          Faol
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default OperatorReports;