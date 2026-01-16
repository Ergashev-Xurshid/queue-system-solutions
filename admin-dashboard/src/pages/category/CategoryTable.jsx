import { CopyPlus, FolderOpen, SquarePen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMenuStore } from "../../store/menuStore";
import SubCategoryModal from "./SubCategoryModal";
import { useCategoryStore } from "../../store/useCategoryStore";
import { toast } from "sonner";

function CategoryTable({ setShowCategory, setEditData }) {
  // Menu ma'lumotlarini olish uchun useMenuStore dan foydalanamiz
  const { menu } = useMenuStore();
  useEffect(() => {
    useMenuStore.getState().fetchMenu();
  }, []);

  useEffect(() => {
    const savedMenuName = localStorage.getItem("selectedMenuName");
    const savedMenuId = localStorage.getItem("selectedMenuId");

    if (savedMenuName && savedMenuId) {
      setSelectedMenuName(savedMenuName);
      setselectedMenuId(Number(savedMenuId));
    }
  }, []);

  // Dropdown menyu ochish va tanlangan elementni saqlash uchun statelar
  const [open, setOpen] = useState(false);
  const [selectedMenuName, setSelectedMenuName] = useState(null);
  const [selectedMenuId, setselectedMenuId] = useState(null);
  const handleSelect = (item) => {
    setSelectedMenuName(item.name_uz);
    setselectedMenuId(item.id);

    // LocalStorage ga yozamiz
    localStorage.setItem("selectedMenuName", item.name_uz);
    localStorage.setItem("selectedMenuId", item.id);

    setOpen(false);
  };

  // Modal ochish va tanlangan kategoriya ID sini saqlash uchun statelar
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setselectedCategoryId] = useState(null);
  const handleModal = (id) => {
    setselectedCategoryId(id);
    setShowModal(true);
  };

  // Category ma'lumotlarini olish uchun useCategoryStore dan foydalanamiz
  const token = localStorage.getItem("token");
  const { category, fetchCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategory(selectedMenuId, token);
  }, [selectedMenuId]);

  //delete
  const deleteCategory = async (id) => {
    if (!confirm("Rostdan ham o'chirmoqchimisiz?")) return;

    try {
      const res = await fetch(
        `https://navbat.kstu.uz/api/category/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        fetchCategory(selectedMenuId, token); // ♻️ qayta yuklash
      } else {
        toast.error(data.message || "O'chirishda xatolik");
      }
    } catch (err) {
      toast.error("Server bilan bog‘lanishda xatolik!");
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Scrollable tbody uchun konteyner */}
        <div className="max-h-[600px]  scrollbar-none pb-2">
          <table className="w-full text-sm text-left text-gray-700 border-collapse">
            <thead className="bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-medium">Category name</th>
                <th className=" px-6 py-4 font-medium flex justify-end z-90">
                  <div className="relative w-[200px]">
                    <button
                      type="button"
                      onClick={() => setOpen(!open)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left cursor-pointer"
                    >
                      {selectedMenuName || "Menu tanlang"}
                    </button>

                    {open && (
                      <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-90">
                        {menu.map((group) => (
                          <div
                            key={group.id}
                            onClick={() => handleSelect(group)}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {group.name_uz}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {category.length === 0 ? (
                <tr>
                  <td colSpan={2}>
                    <div className="flex flex-col items-center justify-center py-16">
                      <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4 text-gray-600 font-medium">
                        Category malimotlari topilmadi
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Yaratish uchun "Add category" ni bosing
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                category.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b border-gray-200"
                  >
                    <td className="px-6 py-4 font-medium">{item.name_uz}</td>
                    <td className="w-[426px] px-6 py-4">
                      <div className="flex gap-2 ">
                        <button
                          onClick={() => {
                            setEditData(item);
                            setShowCategory(true);
                          }}
                          className="flex gap-2 py-2 px-3 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <SquarePen className="w-5 h-5" />
                          <p className="font-semibold">Change</p>
                        </button>
                        <button
                          onClick={() => deleteCategory(item.id)}
                          className="flex gap-2 py-2 px-3 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash className="w-5 h-5" />
                          <p className="font-semibold">Delete</p>
                        </button>
                        <button
                          onClick={() => handleModal(item.id)}
                          className="flex items-center gap-2 py-2 px-3 text-green-600 hover:bg-green-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <CopyPlus className="w-5 h-5" />
                          <p className="font-semibold">Add SubCategory</p>
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
      {showModal && (
        <SubCategoryModal
          selectedCategoryId={selectedCategoryId}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default CategoryTable;
