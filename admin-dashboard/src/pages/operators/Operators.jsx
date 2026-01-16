import { Plus } from "lucide-react";
import AddOperator from "./AddOperator";
import { useState } from "react";
import CardOperator from "./CardOperator";
export default function Operators() {
  const [showOperatorModal, setShowOperatorModal] = useState(false);

  const handleAddOperator = () => {
    setShowOperatorModal(true);
  };
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Operators
        </h2>
        <button
          onClick={handleAddOperator}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add Operator
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <CardOperator />
      </div>

      {showOperatorModal && (
        <AddOperator setShowOperatorModal={setShowOperatorModal} />
      )}
    </div>
  );
}
