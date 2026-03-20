import React, { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function ChangePasswordModal({
  open,
  onClose,
  operatorId,
  password_active,
  onSuccess,
}) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm({
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      });
      setError("");
      setSuccess("");
      setLoading(false);
      setShowOld(false);
      setShowNew(false);
      setShowRepeat(false);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.oldPassword || !form.newPassword || !form.repeatPassword) {
      setError("Barcha maydonlarni to‘ldiring.");
      toast.error("Barcha maydonlarni to‘ldiring.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Yangi parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      toast.error("Yangi parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      return;
    }

    if (form.newPassword !== form.repeatPassword) {
      setError("Yangi parollar bir xil emas.");
      toast.error("Yangi parollar bir xil emas.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://navbat.kstu.uz/api/operator/updated/operator?id=${operatorId}`,
        {
          method: "PUT", // kerak bo‘lsa PATCH qilib ko‘ring
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // token kerak bo‘lsa oching
          },
          body: JSON.stringify({
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
            repeatPassword: form.repeatPassword,
          }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Parolni almashtirib bo‘lmadi.");
      }

      setSuccess(data?.message || "Parol muvaffaqiyatli almashtirildi.");
      toast.success(data?.message || "Parol muvaffaqiyatli almashtirildi.");
      onSuccess();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || "Xatolik yuz berdi.");
      toast.error(err.message || "Xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };


  const inputClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Parolni almashtirish
          </h2>
          {password_active && (
            <p className="text-[11px] text-red-500 font-medium leading-tight mt-0.5">
              * Xavfsizlik uchun parolni o'zgartirishingiz shart!
            </p>
          )}
          {password_active ? (
            ""
          ) : (
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Eski parol
            </label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                placeholder="Eski parolni kiriting"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowOld((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Yangi parol
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Yangi parolni kiriting"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Yangi parolni takrorlang
            </label>
            <div className="relative">
              <input
                type={showRepeat ? "text" : "password"}
                name="repeatPassword"
                value={form.repeatPassword}
                onChange={handleChange}
                placeholder="Yangi parolni qayta kiriting"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowRepeat((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showRepeat ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Yuborilmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
