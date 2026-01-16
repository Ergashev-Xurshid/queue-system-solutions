import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="top-right"  richColors closeButton toastOptions={{ style: { zIndex: 999999 } }}/>
    <App />
  </>
);
