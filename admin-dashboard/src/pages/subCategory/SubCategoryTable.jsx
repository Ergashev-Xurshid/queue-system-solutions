import React, { useEffect, useState } from "react";
import { useMenuStore } from "../../store/menuStore";
import SubCategoryTableItems from "./SubCategoryTableItems";

function SubCategoryTable() {
  useEffect(() => {
    const savedMenuId = localStorage.getItem("selectedMenuId");
    const savedMenuName = localStorage.getItem("selectedMenuName");

    if (savedMenuId && savedMenuName) {
      setSelectedMenuId(Number(savedMenuId));
      setSelected(savedMenuName);
    }
  }, []);

  //GET Menu Groups
  const { menu, fetchMenu } = useMenuStore();
  useEffect(() => {
    if (menu.length === 0) fetchMenu();
  }, []);

  // Dropdown ochilish-yopilish holati
  const [openMenu, setOpenMenu] = useState(false);

  // Tanlangan menu qiymati
  const [selected, setSelected] = useState("");
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  // Menu tanlash funksiyasi
  const handleSelectMenu = (value) => {
    setSelectedMenuId(value.id);
    setSelected(value.name_uz);

    // localStorage ga saqlaymiz
    localStorage.setItem("selectedMenuId", value.id);
    localStorage.setItem("selectedMenuName", value.name_uz);
    setOpenMenu(false); // tanlangandan keyin yopilsin
  };

  return (
    <div
      className="relative h-full flex flex-col"
      onClick={() => setOpenMenu(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          SubCategory
        </h2>
      </div>
      <div className="border-gray-300 rounded-lg py-4 px-6 mb-6">
        <div className="relative w-60 " onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => setOpenMenu((prev) => !prev)} // shu boshqaradi
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {selected || "Select a menu"}
          </button>

          {openMenu && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
              {menu.map((group) => (
                <div
                  key={group.id}
                  onClick={() => handleSelectMenu(group)}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                >
                  <p className="font-semibold text-gray-600">{group.name_uz}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="max-h-[600px] scrollbar-none overflow-y-auto">
          <SubCategoryTableItems selectedMenuId={selectedMenuId} />
        </div>
      </div>
    </div>
  );
}

export default SubCategoryTable;
