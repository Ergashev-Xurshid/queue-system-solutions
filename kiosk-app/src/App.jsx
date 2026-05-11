import { HashRouter, Routes, Route } from "react-router-dom";

import RootLayouts from "./layouts/RootLayouts";
import CategoryLayout from "./layouts/CategoryLayout";
import SubCategoryLayout from "./layouts/SubCategoryLayout";
import LoginPage from "./pages/LoginPage";
// 🔒 PROTECTED ROUTE
import ProtectedRoute from "./components/routes/ProtectedRoute";
import BaseURLSetupPage from "./pages/BaseURLSetupPage";
import useNetworkChecker from "./hooks/useNetworkChecker";

export default function App() {
  useNetworkChecker();
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/base-url-setup" element={<BaseURLSetupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RootLayouts />
              </ProtectedRoute>
            }
          />

          <Route
            path="menu/:menuId"
            element={
              <ProtectedRoute>
                <CategoryLayout />
              </ProtectedRoute>
            }
          />

          <Route
            path="menu/:menuId/category/:categoryId"
            element={
              <ProtectedRoute>
                <SubCategoryLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}
