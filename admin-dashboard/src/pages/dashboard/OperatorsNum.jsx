import React, { useEffect } from "react";
import { useOperatorStore } from "../../store/operatorStore";
import { User } from "lucide-react";

function OperatorsNum() {
  const { operators, fetchOperators } = useOperatorStore();

  useEffect(() => {
    fetchOperators();
  }, []);
  const activeCount = operators.filter(op => op.active).length;
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <span className="flex items-center gap-1 text-sm font-medium text-slate-500">
          {operators?.length} total
        </span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
        {activeCount}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Active Operators
      </p>
    </div>
  );
}

export default OperatorsNum;
