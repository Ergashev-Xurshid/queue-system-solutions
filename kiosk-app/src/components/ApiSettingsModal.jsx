import React, { useState, useEffect } from "react";
import { setBaseURL, getBaseURL } from "../utils/api";
import { toast } from "sonner";
import { CircleCheck, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

function ApiSettingsModal({ isOpen, onClose }) {
  const [url, setUrl] = useState(getBaseURL());

  const { t } = useTranslation();

  useEffect(() => {
    setUrl(getBaseURL());
  }, [isOpen]);

  const handleSave = () => {
    setBaseURL(url);
    toast(
      <div className="flex items-center gap-4">
        <CircleCheck className="text-yellow-500 w-10 h-10" />
        <span className="text-xl font-semibold">{t("api_saved")}</span>
      </div>,
      {
        duration: 7000,
        style: { padding: "16px 22px", minWidth: "460px" },
      }
    );
    onClose();
    // 🔥 Sahifani to'liq qayta yuklaymiz
    setTimeout(() => {
      window.location.reload();
    }, 400); // modal yopilishi uchun kichik kechikish
  };
  const handleRemove = () => {
    localStorage.removeItem("apiBaseURL");
    localStorage.removeItem("token");
    toast(
      <div className="flex items-center gap-4">
        <AlertTriangle className="text-yellow-500 w-10 h-10" />
        <span className="text-xl font-semibold">{t("api_reset")}</span>
      </div>,
      {
        duration: 5000,
        style: { padding: "16px 22px", minWidth: "460px" },
      }
    );

    onClose();
    // 🔥 Sahifani to'liq qayta yuklaymiz
    setTimeout(() => {
      window.location.reload();
    }, 400); // modal yopilishi uchun kichik kechikish
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">API sozlamalari</h2>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          placeholder="https://my-api.uz"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete URL
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Bekor qilish
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApiSettingsModal;
