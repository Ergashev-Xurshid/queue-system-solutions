import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useMenuStore } from "../../store/useMenuStore";
import { useEffect } from "react";

import { toast } from "sonner";

function HomeSelect() {
  const navigate = useNavigate();
  const { menus, fetchMenus, errorType  } = useMenuStore();
  useEffect(() => {
    fetchMenus();
  }, []);

  // website tilini olish
  const { i18n } = useTranslation();
  const propName = `name_${i18n.language}`;



  useEffect(() => {
    if (errorType === "UNAUTHORIZED") {
      navigate("/login", { replace: true });
    }

    if (errorType === "FORBIDDEN") {
      navigate("/login", { replace: true });
    }

    // if (errorType === "OFFLINE") {
    //   navigate("/", { replace: true });
    // }

    // if (errorType === "SERVER") {
    //   navigate("/base-url-setup", { replace: true });
    // }
  }, [errorType, navigate]);



  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="relative w-full overflow-y-scroll h-[750px]  flex flex-col items-center justify-start gap-10 py-10 mt-10 ">
      {menus?.length === 0 ? (
        <div></div>
      ) : (
        menus.map((item) => (
          <button key={item.id} onClick={() => navigate(`/menu/${item.id}`)}>
            <div className="w-[600px] h-auto py-10 px-20 bg-[#006a00] font-bold text-white text-6xl flex justify-center items-center rounded-xl">
              {item[propName]}
            </div>
          </button>
        ))
      )}
    </div>
  );
}

export default HomeSelect;
