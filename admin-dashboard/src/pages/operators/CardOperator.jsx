import { Edit, Layers2, Mail, Phone, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useOperatorStore } from "../../store/operatorStore";

function CardOperator() {
  const { operators, error, fetchOperators } = useOperatorStore();

  useEffect(() => {
    fetchOperators();
  }, []);

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {operators.map((operator) => (
        <div
          key={operator.id}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold uppercase">
                {operator.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white capitalize">
                  {operator.fullName}
                </h3>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
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
                onClick={() => handleEditOperator(operator)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={() => handleDeleteOperator(operator.id)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Mail className="w-4 h-4" />
              {operator.email}
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Phone className="w-4 h-4" />
              {operator.phoneNumber}
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 line-clamp-2">
              <Layers2  className="w-4 h-4" />
              <span className="line-clamp-2">{operator.categoryName}</span>              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardOperator;
