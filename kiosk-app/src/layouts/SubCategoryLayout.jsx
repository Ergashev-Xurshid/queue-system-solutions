import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoaderFunction from "../components/ui/LoaderFunction";
import ErrorFunction from "../components/ui/ErrorFunction";
import left from "../assets/left-arrow-28.png";
import { useSubCategoryStore } from "../store/useSubCategoryStore";
import PrintingModal from "../components/PrintingModal";
import { toast } from "sonner";
import { AlertTriangle, WifiOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getBaseURL, getToken } from "../utils/api";
import { useNetworkStore } from "../store/useNetworkStore";

export default function SubCategoryLayout() {
  const { i18n, t } = useTranslation();
  const propName = `name_${i18n.language}`;

  const navigate = useNavigate();
  const { categoryId } = useParams();

  const { subCategores, fetchSubCategories, loading, error } =
    useSubCategoryStore();

  useEffect(() => {
    fetchSubCategories(categoryId);
  }, [categoryId, fetchSubCategories]);

  // =========================
  //     SUB CLICK → API → PRINT
  // =========================
  const handleSubClick = async (sub, subId) => {
    const baseURL = getBaseURL();
    const token = getToken();

    try {
      const res = await fetch(
        `${baseURL}/api/queues/select?subCategoryId=${subId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!res.ok) {
        if (res.status === 403) toast.error("Ruxsat yo‘q (403)");
        else toast.error(`Server xatosi: ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("SUB RESPONSE:", data);

      if (!data.body) {
        toast.error("Ma'lumot topilmadi");
        return;
      }

      // API qaytargan sub queue ma’lumotlari → PRINT ga
      sendSubToPrint(data.body);
    } catch (err) {
      console.error(err);
      toast.error("Aloqa xatosi!", err);
    }
  };

  // =========================
  //     WEBVIEW PRINT LOGIC
  // =========================
  const [printing, setPrinting] = useState(false);

  const sendSubToPrint = (sub) => {
    setPrinting(true);

    const formattedTime = sub.createdTime ? sub.createdTime.split(".")[0] : "";

    const dateTimeForPrint = `${sub.createdDate ?? ""} ${formattedTime}`;

    // SAFETY TIMEOUT — agar WebView javob bermasa
    const timeoutId = setTimeout(() => {
      setPrinting(false);
      toast(
        <div className="flex items-center gap-4">
          <AlertTriangle className="text-yellow-500 w-10 h-10" />
          <span className="text-xl font-semibold">{t("webview_error")}</span>
        </div>,
        { duration: 5000 }
      );
    }, 5000);

    const handler = (event) => {
      if (event.data?.type === "print-complete") {
        clearTimeout(timeoutId);
        setPrinting(false);

        if (event.data.status === "success") {
          navigate("/");
        } else {
          toast.error(event.data.message || "Chop qilishda xatolik!");
        }

        window.chrome?.webview?.removeEventListener("message", handler);
      }
    };

    window.chrome?.webview?.addEventListener("message", handler);

    // PRINTGA YUBORILADIGAN DATA
    console.log("📨 PRINT DATA:", {
      type: "silent-print",
      category: sub[`subCategoryName_${i18n.language}`],
      date: dateTimeForPrint,
      number: sub.queueNumber,
    });

    window.chrome?.webview?.postMessage({
      type: "silent-print",
      category: sub[`subCategoryName_${i18n.language}`],
      date: dateTimeForPrint,
      number: sub.queueNumber,
    });
  };

  const isOnline = useNetworkStore((state) => state.isOnline);
  useEffect(() => {
    if (isOnline) {
      fetchSubCategories(categoryId);
    }
  }, [isOnline]);
  return (
    <>
      <PrintingModal isOpen={printing} />

      <div className="min-h-screen relative py-20 px-10 flex flex-col layoutBackground2">
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

                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Internet aloqasi uzildi
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Iltimos, internetni tekshiring. Ulanish tiklangach sahifa
                  avtomatik yangilanadi.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="py-6 px-5 bg-[#a3d6bff1]">
          <h1 className="text-6xl font-bold text-center uppercase">
            {t("services")}
          </h1>
        </div>

        <div className="w-full h-[1300px] overflow-y-scroll flex flex-col items-center mt-30">
          {isOnline && (
            <div className="w-full grid grid-cols-1 gap-6 px-10">
              {loading && <LoaderFunction />}

              {subCategores.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => handleSubClick(sub, sub.id)}
                  className="flex items-center justify-center bg-white py-6 px-4 rounded-2xl cursor-pointer"
                >
                  <p className="text-3xl text-center font-semibold">
                    {sub[propName]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <button
            className="flex items-center gap-2 bg-white py-4 px-8 rounded-2xl"
            onClick={() => navigate(-1)}
          >
            <img src={left} alt="" className="w-10" />
            <p className="text-2xl font-semibold uppercase">ORQAGA</p>
          </button>
        </div>
      </div>
    </>
  );
}
