import React, { useEffect, useState } from "react";
import { useCategoryStore } from "../../store/useCategoryStore";
import { useSubCategoryStore } from "../../store/useSubCategoryStore";
import {
  ChevronDown,
  ChevronRight,
  FolderOpen,
  SquarePen,
  SquaresSubtract,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import SubCategoryEdit from "./SubCategoryEdit";

function SubCategoryTableItems({ selectedMenuId }) {
  const [open, setOpen] = useState(null);
  const token = localStorage.getItem("token");

  const [editingSub, setEditingSub] = useState(null);
  // CATEGORY
  const { category, fetchCategory } = useCategoryStore();

  useEffect(() => {
    if (selectedMenuId) {
      fetchCategory(selectedMenuId, token);
    }
  }, [selectedMenuId]);

  // SUBCATEGORY
  const { subCategoryMap, loadingMap, errorMap, fetchSubCategory } =
    useSubCategoryStore();

  const toggle = (catId) => {
    setOpen(open === catId ? null : catId);

    if (subCategoryMap[catId] === undefined && !loadingMap[catId]) {
      fetchSubCategory(catId, token);
    }
  };

  //delete
  const deleteCategory = async (id) => {
    if (!confirm("Rostdan ham o'chirmoqchimisiz?")) return;

    try {
      const res = await fetch(
        `https://navbat.kstu.uz/api/subcategory/delete/${id}`,
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
    <div className="w-full space-y-2  mt-5">
      {category.length === 0 ? (
        <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
          <div className="flex flex-col items-center justify-center py-16">
            <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-600 font-medium">
              Ma'limotlar topilmadi
            </p>
            <p className="text-sm text-gray-500 mt-1">Menu ni tanlang</p>
          </div>
        </div>
      ) : (
        category.map((cat) => (
          <div
            key={cat.id}
            className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
          >
            {/* HEADER */}
            <div
              className="bg-gray-100 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-body rounded-lg border-gray-300  border hover:text-heading hover:bg-neutral-secondary-medium gap-3 cursor-pointer"
              onClick={() => toggle(cat.id)}
            >
              <div className="flex gap-2">
                <SquaresSubtract />
                <span className="font-semibold text-lg capitalize">
                  {cat.name_uz}
                </span>
              </div>
              <span className="text-gray-500">
                {open === cat.id ? <ChevronDown /> : <ChevronRight />}
              </span>
            </div>

            {/* SUBCATEGORY LIST */}
            {open === cat.id && (
              <div className="ml-7 mt-2 space-y-2 border border-gray-300 p-2 rounded-lg
      max-h-64 overflow-y-auto">
                {/* Loading */}
                {loadingMap[cat.id] && (
                  <div className="text-gray-400 italic">Yuklanmoqda...</div>
                )}

                {/* Error */}
                {errorMap[cat.id] && !loadingMap[cat.id] && (
                  <div className="text-red-500 italic">{errorMap[cat.id]}</div>
                )}

                {/* Empty */}
                {subCategoryMap[cat.id]?.length === 0 &&
                  !loadingMap[cat.id] &&
                  !errorMap[cat.id] && (
                    <div className="text-gray-400 italic">
                      Subcategory mavjud emas
                    </div>
                  )}

                {/* Normal */}
                {subCategoryMap[cat.id]?.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gray-100"
                  >
                    <div className="flex gap-2 items-center">
                      <span className="text-gray-400">
                        <SquaresSubtract size={16} />
                      </span>
                      <span className="capitalize font-medium">
                        {sub.name_uz}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingSub(sub)} className="flex gap-2 p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer">
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCategory(sub.id)}
                        className="flex gap-2 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
      {editingSub && (
        <SubCategoryEdit
          subCategory={editingSub}
          onClose={() => setEditingSub(null)}
          onUpdate={() => fetchCategory(selectedMenuId, token)}
        />
      )}
    </div>
  );
}

export default SubCategoryTableItems;
