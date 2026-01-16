import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;

  if (role !== "ROLE_OPERATOR") {
    return <Navigate to="/staff" replace />;
  }

  return <Outlet />;
}
