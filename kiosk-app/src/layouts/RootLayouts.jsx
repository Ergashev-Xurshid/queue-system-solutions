import React, { useState, useEffect, use } from "react";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";
import ApiSettingsModal from "../components/ApiSettingsModal";
import HomeSelect from "../components/common/HomeSelect";
import LanguageSelection from "../components/common/LanguageSelection";
import { Wifi, WifiOff } from "lucide-react";
import { useMenuStore } from "../store/useMenuStore";
import { useNetworkStore } from "../store/useNetworkStore";

function RootLayouts() {
  //onle and ofile start
  // const [isOnline, setIsOnline] = useState(false);

  // useEffect(() => {
  //   const checkInternet = async () => {
  //     if (!navigator.onLine) {
  //       setIsOnline(false);
  //       return;
  //     }

  //     const controller = new AbortController();
  //     const timeout = setTimeout(() => controller.abort(), 5000);

  //     try {
  //       const res = await fetch("https://navbat.kstu.uz/api/health", {
  //         method: "GET",
  //         cache: "no-store",
  //         signal: controller.signal,
  //       });

  //       setIsOnline(res.ok);
  //       fetchMenus()
  //     } catch (err) {
  //       setIsOnline(false);
  //     } finally {
  //       clearTimeout(timeout);
  //     }
  //   };

  //   checkInternet();

  //   window.addEventListener("online", checkInternet);
  //   window.addEventListener("offline", () => setIsOnline(false));

  //   const interval = setInterval(checkInternet, 20000);

  //   return () => {
  //     window.removeEventListener("online", checkInternet);
  //     window.removeEventListener("offline", () => setIsOnline(false));
  //     clearInterval(interval);
  //   };
  // }, []);

  //onle and ofile  end

  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Alt + A kombinatsiyasi
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { fetchMenus } = useMenuStore();
  const isOnline = useNetworkStore((state) => state.isOnline);
  useEffect(() => {
    if (isOnline) {
      fetchMenus();
    }
  }, []);
  return (
    <div className="relative min-h-screen py-20 px-20 layoutBackground flex flex-col overflow-hidden">
      {!isOnline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal */}
          <div
            className="relative z-10 w-[90%] max-w-sm rounded-2xl bg-white dark:bg-slate-900
                 p-6 shadow-2xl animate-scaleIn"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full
                     bg-red-100 text-red-600"
              >
                <WifiOff size={28} className="animate-pulse" />
              </div>

              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Internet aloqasi uzildi
              </h2>

              <p className="text-lg text-slate-600 dark:text-slate-400">
                Iltimos, internetni tekshiring. Ulanish tiklangach sahifa
                avtomatik yangilanadi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center w-[95%] max-w-6xl mx-auto mb-10">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="h-auto">
          <h1 className="text-5xl font-bold uppercase text-[#046f3f] text-center leading-tight">
            {t("university")}
          </h1>
        </div>
      </div>

      <ApiSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {isOnline && <HomeSelect />}

      {/* Pastki element */}
      <div className="mt-auto mx-auto w-[600px]">
        <LanguageSelection />
      </div>
    </div>
  );
}

export default RootLayouts;
