import { FolderOpen, SquarePen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMenuStore } from "../../store/menuStore";

function MenuTable({ onEdit }) {
  const { menu, fetchMenu, deleteMenu } = useMenuStore();
  const [sortedMenu, setSortedMenu] = useState([]);

  useEffect(() => {
    if (menu.length === 0) fetchMenu();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Rostdan ham ushbu menu o‘chirilsinmi?")) {
      deleteMenu(id);
    }
  };
  useEffect(() => {
    // id bo'yicha tartiblash va active filter
    setSortedMenu(
      menu.filter((item) => item.active).sort((a, b) => a.id - b.id)
    );
  }, [menu]);

  return (
    <div className="relative bg-white rounded-lg border border-gray-200">
      {/* Scrollable tbody uchun konteyner */}
      <div className="max-h-[600px] overflow-y-auto scrollbar-none pb-2">
        <table className="w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
            <tr className="text-xl">
              <th className="px-6 py-4 font-medium">Menu name</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedMenu.length === 0 ? (
              <tr>
                <td colSpan={3}>
                  <div className="flex flex-col items-center justify-center py-16">
                    <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600 font-medium">
                      Menu malimotlari topilmadi
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Yaratish uchun "Add Menu" ni bosing
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedMenu.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <th className="px-6 py-4 flex gap-2">
                    <p className="font-medium text-xl capitalize ">
                      {item.name_uz}
                    </p>
                  </th>
                  <th className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        item.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </th>
                  <td className="w-60 px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="flex gap-2 py-2 px-3 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <SquarePen className="w-5 h-5" />
                        <p className="font-semibold">Change</p>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex gap-2 py-2 px-3 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash className="w-5 h-5" />
                        <p className="font-semibold">Delete</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MenuTable;
