import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    uz: {
      translation: {
        university: "Qarshi Davlat Texnika Universiteti",
        back: "Orqaga",
        services: "Xizmat turlari",
        api_saved: "API manzil saqlandi!",
        api_reset: "API URL reset qilindi!",
        noData: "Ma'lumotlar mavjud emas",
        webview_error:
          "WebView javob bermadi. Internet yoki printerni tekshiring.",
      },
    },
    ru: {
      translation: {
        university: "Каршинский Государственный Технический Университет",
        back: "Назад",
        services: "услуг",
        api_saved: "API адрес сохранён!",
        api_reset: "API URL сброшен!",
        noData: "Данные отсутствуют",
        webview_error: "WebView не ответил. Проверьте интернет или принтер.",
      },
    },
    en: {
      translation: {
        university: "Karshi State Technical University",
        back: "Back",
        services: "Services",
        api_saved: "API address has been saved!",
        api_reset: "API URL has been reset!",
        noData: "No data available",
        webview_error:
          "WebView did not respond. Please check the internet or the printer.",
      },
    },
  },
  lng: "uz",
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
