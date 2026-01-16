import React from "react";

import StatsCards from "./StatsCards";
import DailyReport from "../reports/DailyReport";
import MonthlyReport from "../reports/MonthlyReport";
import { getToken } from "../../utils/auth";

// Fake data
const weeklyData = [
  { name: "Dush", mijoz: 40 },
  { name: "Sesh", mijoz: 55 },
  { name: "Chor", mijoz: 32 },
  { name: "Pay", mijoz: 61 },
  { name: "Jum", mijoz: 49 },
];

const yonalishlar = [
  { name: "Passport", value: 320 },
  { name: "Visa", value: 180 },
  { name: "Registratsiya", value: 240 },
];

const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

function Dashboard() {
  return (
    <div>
      <StatsCards />

      {/* Charts  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DailyReport />
        <MonthlyReport />
      </div>
    </div>
  );
}

export default Dashboard;
