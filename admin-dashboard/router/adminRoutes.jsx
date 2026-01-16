import {HashRouter, Routes ,Route} from "react-router-dom";
import AdminLayout from "../src/layouts/AdminLayout";

import OperatorsList from "../src/pages/operators/Operators";
import AddOperator from "../src/pages/operators/AddOperator";
import Reports from "../src/pages/reports/Reports";
import DailyReport from "../src/pages/reports/DailyReport";
import MonthlyReport from "../src/pages/reports/MonthlyReport";
import Dashboard from "../src/pages/dashboard/Dashboard";
import LoginPage from "../src/pages/LoginPage/LoginPage";
import Category from "../src/pages/category/Category";
import ProtectedRoute from "../src/components/ProtectedRoute";
import MenuList from "../src/pages/menuPage/menuList";
import SubCategoryTable from "../src/pages/subCategory/SubCategoryTable";
import Devices from "../src/pages/devices/Devices";

export const router = (setAdmin, admin) => (
  <HashRouter>
    <Routes>
      {/* 🔓 Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* 🔒 Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute setAdmin={setAdmin}>
            <AdminLayout admin={admin} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="operators" element={<OperatorsList />} />
        <Route path="operators/add" element={<AddOperator />} />
        <Route path="reports" element={<Reports />} />
        <Route path="reports/daily" element={<DailyReport />} />
        <Route path="reports/monthly" element={<MonthlyReport />} />
        <Route path="menu" element={<MenuList />} />
        <Route path="category" element={<Category />} />
        <Route path="sub-category" element={<SubCategoryTable />} />
        <Route path="devices" element={<Devices />} />
      </Route>
    </Routes>
  </HashRouter>
  )
