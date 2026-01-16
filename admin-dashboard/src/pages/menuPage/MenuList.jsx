import { Layers2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import MenuAdd from "./MenuAdd";
import MenuTable from "./MenuTable";

function MenuList() {
  const [showMenu, setShowMenu] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null); // ADD rejimi
    setShowMenu(true);
  };

  const handleEdit = (menuItem) => {
    setEditData(menuItem); // EDIT rejimi
    setShowMenu(true);
  };

  return (
    <div className="relative h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Menu
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <Layers2 className="w-5 h-5" />
          Add Menu
        </button>
      </div>
      {showMenu && <MenuAdd setShowMenu={setShowMenu} editData={editData} />}
      <MenuTable  onEdit={handleEdit}/>
    </div>
  );
}

export default MenuList;
