import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSelection() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      {/* Til tanlash tugmalari */}
      <div className="flex justify-between gap-4 w-full">
        <button
          onClick={() => changeLanguage("uz")}
          className="w-[120px]  font-medium text-4xl text-white"
        >
          O'zbekcha
        </button>
        <button
          onClick={() => changeLanguage("ru")}
          className="w-[120px]  font-medium text-4xl text-white"
        >
          Русский
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className="w-[120px] font-medium text-4xl text-white"
        >
          English
        </button>
      </div>
    </>
  );
}

export default LanguageSelection;
