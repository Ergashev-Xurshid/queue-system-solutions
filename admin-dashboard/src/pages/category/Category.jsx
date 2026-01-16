import { Layers2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import CategoryAdd from "./CategoryAdd";

function Category() {
  const [showCategory, setShowCategory] = useState(false);
  const [editData, setEditData] = useState(null);


  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Category
        </h2>
        <button
          onClick={() => setShowCategory(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <Layers2 className="w-5 h-5" />
          Add Category
        </button>
      </div>
      {showCategory && (
        <CategoryAdd editData={editData} setShowCategory={setShowCategory} />
      )}

      <div className="flex-1 overflow-y-auto">
        <CategoryTable
          setShowCategory={setShowCategory}
          setEditData={setEditData}
        />
      </div>
    </div>
  );
}

export default Category;
