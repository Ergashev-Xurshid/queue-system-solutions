import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StaffQueueHandlingSystem from "./pages/Staff-Service";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <HashRouter>
        <Routes>
          {/* 🔓 Public */}
          <Route path="/" element={<LoginPage />} />

          {/* 🔐 Protected */}
          <Route
            path="/staff"
            element={<PrivateRoute />}
          >
            <Route index element={<StaffQueueHandlingSystem />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
