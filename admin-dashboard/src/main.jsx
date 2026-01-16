import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../router/adminRoutes.jsx";
import { Toaster } from "sonner";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App/>
);
