import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useNavigate, useParams } from "react-router-dom";

import LoaderFunction from "../components/ui/LoaderFunction";

import ErrorFunction from "../components/ui/ErrorFunction";

import left from "../assets/left-arrow-28.png";

import { useCategoryStore } from "../store/useCategoryStore";

import EmptyFunction from "../components/ui/EmptyFunction";
import PrintingModal from "../components/PrintingModal";
import { toast } from "sonner";
import { AlertTriangle, WifiOff } from "lucide-react";
import { getBaseURL, getToken } from "../utils/api";
import { useNetworkStore } from "../store/useNetworkStore";

export default function CategoryLayout() {
  // website tilini olish*

  const { i18n, t } = useTranslation();

  const propName = `name_${i18n.language}`;

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { menuId } = useParams();
  const [printing, setPrinting] = useState(false);
  //store dan ma'lumotlarni olish
  const { categores, fetchCategores } = useCategoryStore();

  useEffect(() => {
    fetchCategores(menuId);
  }, [menuId]);

  const handleCategoryClick = async (catId, cat) => {
    const baseURL = getBaseURL();
    const token = getToken();

    try {
      const res = await fetch(
        `${baseURL}/api/queues/by-category?categoryId=${catId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!res.ok) {
        console.error("SERVER ERROR → ", res.status);
        toast.error(`Server xatosi: ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("SERVER RESPONSE =>", data);

      const body = data.body;

      // ✅ Agar sub-category mavjud bo‘lsa (array qaytarilsa)
      if (Array.isArray(body) && body.length > 0 && data.success === false) {
        // Sub-category ro'yxati sahifasiga o'tish
        navigate(`/menu/${menuId}/category/${catId}`, {
          state: { subCategories: body },
        });
        return;
      }

      // ✅ Agar queue object bo‘lsa (print qilish kerak bo‘lsa)
      if (body && typeof body === "object" && data.success === true) {
        sendToPrint(body);
        return;
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      toast.error("Aloqa xatosi!");
    }
  };

  const sendToPrint = (cat) => {
    setPrinting(true);
    // createdTime ni formatlash
    const formattedTime = cat.createdTime ? cat.createdTime.split(".")[0] : "";

    // sana + vaqt
    const dateTimeForPrint = `${cat.createdDate ?? ""} ${formattedTime}`;

    const timeoutId = setTimeout(() => {
      setPrinting(false);
      toast(
        <div className="flex items-center gap-4">
          <AlertTriangle className="text-yellow-500 w-10 h-10" />
          <span className="text-xl font-semibold">{t("webview_error")}</span>
        </div>,
        {
          duration: 5000,
          style: { padding: "16px 22px", minWidth: "460px" },
        }
      );
    }, 5000);

    const handler = (event) => {
      if (event.data?.type === "print-complete") {
        clearTimeout(timeoutId);
        setPrinting(false);

        if (event.data.status === "success") {
          navigate("/");
        } else {
          toast(
            <div className="flex items-center gap-4">
              <AlertTriangle className="text-yellow-500 w-10 h-10" />
              <span className="text-xl font-semibold">
                {t("webview_error")} {event.data.message}
              </span>
            </div>,
            {
              duration: 5000,
              style: { padding: "16px 22px", minWidth: "460px" },
            }
          );
        }

        window.chrome?.webview?.removeEventListener("message", handler);
      }
    };

    window.chrome?.webview?.addEventListener("message", handler);

    // ❗❗ ENG MUHIM QISM — to‘g‘ri ma'lumot yuborish
    console.log("📨 PRINTGA YUBORILYATGAN DATA:", {
      type: "silent-print",
      category: cat[`categoryName_${i18n.language}`],
      date: dateTimeForPrint,
      number: cat.queueNumber,
    });

    window.chrome?.webview?.postMessage({
      type: "silent-print",

      // kategoriya nomi: tanlangan til bo‘yicha
      category: cat[`categoryName_${i18n.language}`],

      // sana + vaqt
      date: dateTimeForPrint,

      // backenddan kelgan B001 yoki shunga o‘xshash navbat raqami
      number: cat.queueNumber,
    });
  };

  const isOnline = useNetworkStore((state) => state.isOnline);
  useEffect(() => {
    if (isOnline) {
      fetchCategores(menuId);
    }
  }, [isOnline]);
  return (
    <>
      <PrintingModal isOpen={printing} />
      <div className="min-h-screen relative w-full py-20 px-10 flex flex-col layoutBackground2">
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

        <div className="h-auto py-6 px-5 bg-[#a3d6bff1]">
          <h1 className="text-6xl text-black font-bold text-center uppercase">
            {t("services")}
          </h1>
        </div>
        <div className=" w-full overflow-y-scroll h-[1300px] flex flex-col items-center  gap-10 mt-30">
          {isOnline && (
            <div className="w-full grid grid-cols-1 items-center gap-6 overflow-y-auto custom-scroll px-10">
              {categores?.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id, cat)}
                  className="flex items-center justify-center bg-white text-center py-6 px-4 rounded-2xl"
                >
                  <p className="text-black text-center text-3xl font-semibold">
                    {cat[propName]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <button
            className="flex items-center gap-2 bg-white py-4 px-8 rounded-2xl"
            onClick={() => goBack()}
          >
            <img src={left} alt="left arrow" className="w-10 h-auto" />

            <p className="text-black text-2xl font-semibold uppercase">
              {t("back")}
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
