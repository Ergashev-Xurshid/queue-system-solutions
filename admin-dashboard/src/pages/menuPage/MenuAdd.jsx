import { Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMenuStore } from "../../store/menuStore";
import { toast } from "sonner";

function MenuAdd({ setShowMenu, editData = null }) {
  const { addMenu, editMenu, error } = useMenuStore();
  const isEdit = Boolean(editData);

  const [name_uz, setName_uz] = useState("");
  const [name_en, setName_en] = useState("");
  const [name_ru, setName_ru] = useState("");

  // editData o'zgarganda inputlarni yangilash
  useEffect(() => {
    if (editData) {
      setName_uz(editData.name_uz || "");
      setName_en(editData.name_en || "");
      setName_ru(editData.name_ru || "");
    } else {
      setName_uz("");
      setName_en("");
      setName_ru("");
    }
  }, [editData]);

  // errorni toast orqali ko'rsatish
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const menuBody = { name_uz, name_en, name_ru };

    if (isEdit) {
      await editMenu(editData.id, menuBody);
      toast.success("Menu muvaffaqiyatli yangilandi");
    } else {
      await addMenu(menuBody);
      toast.success("Menu muvaffaqiyatli qo'shildi");
    }

    setShowMenu(false);
  };

  return (
    <div
      onClick={() => setShowMenu(false)}
      className="absolute inset-0  bg-gray-50 bg-opacity-50 flex  justify-center z-90 pt-40"
    >
      <div className="space-y-6 ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white border border-indigo-100 rounded-lg shadow-lg overflow-hidden"
        >
          <div className=" flex justify-between bg-linear-to-r from-indigo-50 to-gray-50 border-b border-indigo-100 px-6 py-5">
            <h2 className="text-2xl font-bold text-gray-900">{isEdit ? "Changes Menu" : "Save Menu"}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5 p-6">
              <div className="w-full space-y-4 flex gap-5">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Menu Name UZ <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={name_uz}
                    onChange={(e) => setName_uz(e.target.value)}
                    type="text"
                    placeholder={`Enter Menu name`}
                    className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all border-gray-300
                    `}
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Menu Name EN <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={name_en}
                    onChange={(e) => setName_en(e.target.value)}
                    type="text"
                    placeholder={`Enter Menu name`}
                    className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all border-gray-300
                    `}
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Menu Name RU <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={name_ru}
                    onChange={(e) => setName_ru(e.target.value)}
                    type="text"
                    placeholder={`Enter Menu name`}
                    className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all border-gray-300
                    `}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pr-6 pb-6">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                <Save className="h-5 w-5 mr-1" />
                {isEdit ? "Save Changes" : "Save Menu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MenuAdd;
