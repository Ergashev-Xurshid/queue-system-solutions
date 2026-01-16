import { useEffect } from "react";
import { useNetworkStore } from "../store/useNetworkStore";

export default function useNetworkChecker(fetchMenus) {
  const setOnline = useNetworkStore((state) => state.setOnline);

  useEffect(() => {
    const checkInternet = async () => {
      if (!navigator.onLine) {
        setOnline(false);
        return;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      try {
        const res = await fetch("https://navbat.kstu.uz/api/health", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (res.ok) {
          setOnline(true);
        } else {
          setOnline(false);
        }
      } catch (err) {
        setOnline(false);
      } finally {
        clearTimeout(timeout);
      }
    };

    checkInternet();

    window.addEventListener("online", checkInternet);
    window.addEventListener("offline", () => setOnline(false));

    const interval = setInterval(checkInternet, 20000);

    return () => {
      window.removeEventListener("online", checkInternet);
      window.removeEventListener("offline", () => setOnline(false));
      clearInterval(interval);
    };
  }, []);
}
