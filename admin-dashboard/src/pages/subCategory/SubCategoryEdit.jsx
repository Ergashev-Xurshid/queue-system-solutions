import { Save } from "lucide-react";
import React, { useState, useEffect } from "react";

function SubCategoryEdit({ subCategory, onClose, onUpdate }) {
  const [name_uz, setNameUZ] = useState(subCategory.name_uz || "");
  const [name_en, setNameEN] = useState(subCategory.name_en || "");
  const [name_ru, setNameRU] = useState(subCategory.name_ru || "");
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://navbat.kstu.uz/api/subcategory/update/${subCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name_uz,
            name_ru,
            name_en,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        onUpdate(); // parent component ni yangilash
        onClose();
      } else {
        alert(data.message || "Yangilashda xatolik");
      }
    } catch (err) {
      alert("Server bilan bog‘lanishda xatolik!");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0  bg-gray-50 bg-opacity-50 flex  justify-center z-90 pt-40"
    >
      <div className="space-y-6 ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white border border-indigo-100 rounded-lg "
        >
          <div className=" flex justify-between bg-linear-to-r from-indigo-50 to-gray-50 border-b border-indigo-100 px-6 py-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Update SubCategory
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="flex gap-5">
                <div className="w-full space-y-4 flex gap-5">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Category Name UZ <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={name_uz}
                      onChange={(e) => setNameUZ(e.target.value)}
                      type="text"
                      placeholder={`Enter SubCategory name`}
                      className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none transition-all 
                      `}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      SubCategory Name RU{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={name_ru}
                      onChange={(e) => setNameRU(e.target.value)}
                      type="text"
                      placeholder={`Enter SubCategory name`}
                      className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none transition-all 
                      `}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      SubCategory Name EN{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={name_en}
                      onChange={(e) => setNameEN(e.target.value)}
                      type="text"
                      placeholder={`Enter SubCategory name`}
                      className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none transition-all 
                      `}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-3 px-6 pb-6">
              <button
                disabled={isLoading}
                type="submit"
                className={`flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors  ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <div className="w-full flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Yuklanmoqda...</span>
                  </div>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-1" />
                    <span>Save Category</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    // <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    //   <div className="bg-white p-5 rounded-lg w-96">
    //     <h2 className="text-lg font-semibold mb-3">
    //       SubCategory ni tahrirlash
    //     </h2>
    //     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    //       <input
    //         type="text"
    //         value={name_uz}
    //         onChange={(e) => setNameUZ(e.target.value)}
    //         className="border border-gray-300 p-2 rounded"
    //       />
    //       <input
    //         type="text"
    //         value={name_en}
    //         onChange={(e) => setNameEN(e.target.value)}
    //         className="border border-gray-300 p-2 rounded"
    //       />
    //       <input
    //         type="text"
    //         value={name_ru}
    //         onChange={(e) => setNameRU(e.target.value)}
    //         className="border border-gray-300 p-2 rounded"
    //       />
    //       <div className="flex justify-end gap-2">
    //         <button
    //           type="button"
    //           onClick={onClose}
    //           className="px-4 py-2 border rounded hover:bg-gray-100"
    //         >
    //           Bekor qilish
    //         </button>
    //         <button
    //           type="submit"
    //           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    //         >
    //           Saqlash
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}

export default SubCategoryEdit;
