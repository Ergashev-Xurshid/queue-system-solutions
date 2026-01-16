import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = getToken();
      const role = localStorage.getItem("role"); // login'dan olingan

      if (!token || role !== "ROLE_ADMIN") {
        setAuthorized(false);
        return;
      }

      try {
        const res = await fetch("https://navbat.kstu.uz/user/tekshiruv", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          removeToken();
          setAuthorized(false);
          return;
        }

        setAuthorized(true);
        
      } catch (err) {
        console.error(err);
        removeToken();
        setAuthorized(false);
      }
    };

    checkToken();
  }, []);

  if (authorized === null) return <div>Loading...</div>;

  return authorized ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
