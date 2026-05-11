import { useEffect } from "react";
import { useNetworkStore } from "../store/useNetworkStore";
import { getBaseURL } from "../utils/api";

export default function useNetworkChecker() {
  const setOnline = useNetworkStore((state) => state.setOnline);

  useEffect(() => {
    const checkInternet = async () => {
      if (!navigator.onLine) {
        setOnline(false);
        return;
      }

      const baseURL = getBaseURL();
      if (!baseURL) {
        setOnline(false);
        return;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      try {
        const res = await fetch(`${baseURL}/api/health`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        setOnline(res.ok);
      } catch {
        setOnline(false);
      } finally {
        clearTimeout(timeout);
      }
    };

    const handleOffline = () => setOnline(false);

    checkInternet();

    window.addEventListener("online", checkInternet);
    window.addEventListener("offline", handleOffline);

    const interval = setInterval(checkInternet, 20000);

    return () => {
      window.removeEventListener("online", checkInternet);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, [setOnline]);
}
