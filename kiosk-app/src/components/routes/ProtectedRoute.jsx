// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const apiBaseURL = localStorage.getItem("apiBaseURL");

  if(!apiBaseURL){
    return <Navigate to="/base-url-setup" replace />;
  }
  else if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
