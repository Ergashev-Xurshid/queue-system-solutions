import { Edit, Layers2, Mail, Phone, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useOperatorStore } from "../../store/operatorStore";
import { toast } from "sonner";

function CardOperator({ onEdit }) {
  const { operators, error, fetchOperators } = useOperatorStore();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOperators();
  }, [fetchOperators]);

  const confirmDeleteOperator = (id) => {
    toast.warning("Operatorni o'chirishni tasdiqlaysizmi?", {
      duration: 5000,
      action: {
        label: "O'chirish",
        onClick: async () => {
          const loadingToast = toast.loading("O'chirilmoqda...");

          try {
            const response = await fetch(
              `https://navbat.kstu.uz/user/${id}?active=false`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Serverda xatolik yuz berdi");
            }

            toast.success("Operator muvaffaqiyatli o'chirildi", {
              id: loadingToast,
            });

            fetchOperators();
          } catch (error) {
            toast.error("O'chirishda xatolik yuz berdi", {
              id: loadingToast,
              description: error.message || "Server bilan aloqa yo'q",
            });
          }
        },
      },
      cancel: {
        label: "Bekor qilish",
        onClick: () => toast.dismiss(),
      },
    });
  };

  if (error) {
    return <p>Xatolik: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {operators
        ?.filter((operator) => operator.active)
        .map((operator) => (
          <div
            key={operator.id}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 font-semibold uppercase text-white">
                  {operator.fullName?.charAt(0) || "O"}
                </div>

                <div>
                  <h3 className="font-semibold capitalize text-slate-900 dark:text-white">
                    {operator.fullName}
                  </h3>

                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      operator.active
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {operator.active ? "active" : "inactive"}
                  </span>
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => onEdit?.(operator)}
                  className="rounded-lg p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Edit className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </button>

                <button
                  onClick={() => confirmDeleteOperator(operator.id)}
                  className="rounded-lg p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-all">{operator.email}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{operator.phoneNumber}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <Layers2 className="mt-1 h-4 w-4 shrink-0" />
                <div className="flex flex-wrap gap-2">
                  {operator.categoryNames?.length ? (
                    operator.categoryNames.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">
                      Category biriktirilmagan
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CardOperator;