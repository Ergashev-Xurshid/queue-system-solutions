import React, { useState, useEffect } from "react";
import { verifyURL, setBaseURL, getBaseURL } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function BaseURLSetupPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setUrl(getBaseURL());
  }, []);

  const handleSaveURL = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const isValid = await verifyURL(url);

    if (!isValid) {
      setIsLoading(false);
      setError("API manzili noto‘g‘ri yoki server ishlamayapti!");
      return;
    }

    setBaseURL(url);
    setIsLoading(false);

    toast.success("API manzili saqlandi!");
    navigate("/login");
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-linear-to-br from-indigo-100 via-indigo-100 to-cyan-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="absolute top-0 left-1/6 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200/20 rounded-full blur-3xl"></div>
      </div>
      <div className="flex flex-col gap-6 w-[350px] h-[300px] rounded-2xl bg-[#fcfcfc] p-6 border border-gray-200 z-10">
        <div className="w-full text-center">
          <h2 className="font-bold text-2xl mb-2">Welcome</h2>
          <p className="text-gray-600">URL sozlamalari</p>
        </div>
        <form onSubmit={handleSaveURL} className="flex flex-col space-y-4">
          <label className="flex flex-col gap-2">
            <div className="relative group">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="bg-white w-full text-gray-500 py-2 px-4 shadow-sm border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                type="text"
                placeholder="Enter your url"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 mt-6 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg cursor-pointer hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Tekshirilmoqda...</span>
              </div>
            ) : (
              "Saqlash"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BaseURLSetupPage;
