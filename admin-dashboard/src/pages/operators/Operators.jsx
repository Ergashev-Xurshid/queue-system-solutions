import { Plus } from "lucide-react";
import { useState } from "react";
import AddOperator from "./AddOperator";
import CardOperator from "./CardOperator";

export default function Operators() {
  const [showOperatorModal, setShowOperatorModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedOperator, setSelectedOperator] = useState(null);

  const handleAddOperator = () => {
    setModalMode("add");
    setSelectedOperator(null);
    setShowOperatorModal(true);
  };

  const handleEditOperator = (operator) => {
    setModalMode("edit");
    setSelectedOperator(operator);
    setShowOperatorModal(true);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Operators
        </h2>

        <button
          onClick={handleAddOperator}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Add Operator
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <CardOperator onEdit={handleEditOperator} />
      </div>

      {showOperatorModal && (
        <AddOperator
          mode={modalMode}
          initialData={selectedOperator}
          setShowOperatorModal={setShowOperatorModal}
        />
      )}
    </div>
  );
}