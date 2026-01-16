import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function SubCategoryModal({ setShowModal , selectedCategoryId }) {
  useEffect(() => {
    // modal ochilganda scrollni o'chiramiz
    document.body.classList.add("overflow-hidden");
    return () => {
      // modal yopilganda scrollni tiklaymiz
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  //Post SubCategory
  const token = localStorage.getItem("token");
  const [name_uz, setName_uz] = useState("");
  const [name_en, setName_en] = useState("");
  const [name_ru, setName_ru] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://navbat.kstu.uz/api/subcategory/saved?categoryId=${selectedCategoryId}`,
        {
          method: "POST",
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
      console.log("🔵 POST /category/saved — Javob:", data);

      if (data.success === true) {
        toast.success(data.message);
        // formni tozalash
        setName_uz("");
        setName_ru("");
        setName_en("");
        setShowModal(false);
      } else {
        toast.error(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      console.error(
        "🔵 POST Server bilan bog‘lanishda xatolik yuz berdi ",
        err
      );
      toast.error("Server bilan bog‘lanishda xatolik!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowModal(false)}
      className="absolute inset-0  bg-gray-50 bg-opacity-50 flex  justify-center z-90 pt-40"
    >
      <div className="space-y-6 ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white border border-indigo-100 rounded-lg shadow-lg overflow-hidden"
        >
          <div className=" flex justify-between bg-linear-to-r from-indigo-50 to-gray-50 border-b border-indigo-100 px-6 py-5">
            <h2 className="text-2xl font-bold text-gray-900">Add SubMenu</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5 p-6">
              <div className="w-full space-y-4 flex gap-5">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    SubMenu Name UZ <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={name_uz}
                    onChange={(e) => setName_uz(e.target.value)}
                    type="text"
                    placeholder={`Enter SubMenu name`}
                    className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all border-gray-300
                    `}
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    SubMenu Name EN <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={name_en}
                    onChange={(e) => setName_en(e.target.value)}
                    type="text"
                    placeholder={`Enter SubMenu name`}
                    className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all border-gray-300
                    `}
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    SubMenu Name RU <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={name_ru}
                    onChange={(e) => setName_ru(e.target.value)}
                    type="text"
                    placeholder={`Enter SubMenu name`}
                    className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all border-gray-300
                    `}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pr-6 pb-6">
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
                    <span>Save SubCategory</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubCategoryModal;
