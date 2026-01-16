import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMenuStore } from "../../store/menuStore";
import { alphabet } from "../../data/operators";

function CategoryAdd({ setShowCategory, editData }) {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setName_uz(editData.name_uz);
      setName_ru(editData.name_ru);
      setName_en(editData.name_en);
      setSelectedId(editData.menu_id);
      setSelected(editData.menu_name_uz);
      setSelectedType(editData.letter);
    }
  }, [editData]);

  //post uchun states
  const [name_uz, setName_uz] = useState("");
  const [name_en, setName_en] = useState("");
  const [name_ru, setName_ru] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [selected, setSelected] = useState("");

  //check message
  const [message, setMessage] = useState(false);

  //POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!editData) {
      if (!selectedId || !selectedType) {
        toast.info("Iltimos, kategoriya va turini tanlang!");
        setIsLoading(false);
        return;
      }
    }

    const url = editData
      ? `https://navbat.kstu.uz/api/category/update/${editData.id}`
      : `https://navbat.kstu.uz/api/category/saved?id=${selectedId}`;

    const method = editData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name_uz,
          name_ru,
          name_en,
          letter: selectedType,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setShowCategory(false);
      } else {
        toast.error(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      toast.error("Server bilan bog‘lanishda xatolik!");
    } finally {
      setIsLoading(false);
    }
  };

  //GET Menu Groups
  const { menu, fetchMenu } = useMenuStore();
  useEffect(() => {
    if (menu.length === 0) fetchMenu();
  }, []);

  // Dropdown ochish yopilishi menu uchun
  const [open, setOpen] = useState(false);
  const handleSelect = (value) => {
    setSelectedId(value.id);
    setSelected(value.name_uz);
    setOpen(false);
  };
  // Dropdown ochish yopilishi type uchun
  const [openType, setOpenType] = useState(false);
  const handleSelectType = (value) => {
    setSelectedType(value);
    setOpenType(false);
  };
  // GET Category Type Letters
  const [usedLetters, setUsedLetters] = useState([]);
  useEffect(() => {
    const fetchCategoryType = async () => {
      try {
        const res = await fetch("https://navbat.kstu.uz/api/category/letters", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log("🟣 GET /category/letters — Javob:", data);

        setUsedLetters(data.body); // API dagi harflar
      } catch (error) {
        console.log("🟣 GET /category/letters — Error :", error);
      }
    };

    fetchCategoryType();
  }, []);
  // Yangi array yaratish ishlatilmagan harflar bilan
  const [newArray, setNewArray] = useState([]);
  useEffect(() => {
    const lettersUpper = usedLetters.map((l) => l.toUpperCase());
    setNewArray(alphabet.filter((letter) => !lettersUpper.includes(letter)));
  }, [usedLetters]);



  return (
    <div
      onClick={() => setShowCategory(false)}
      className="absolute inset-0  bg-gray-50 bg-opacity-50 flex  justify-center z-90 pt-40"
    >
      <div className="space-y-6 ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white border border-indigo-100 rounded-lg "
        >
          <div className=" flex justify-between bg-linear-to-r from-indigo-50 to-gray-50 border-b border-indigo-100 px-6 py-5">
            <h2 className="text-2xl font-bold text-gray-900">
              {editData ? "Update Category" : "Save Category"}
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
                      onChange={(e) => setName_uz(e.target.value)}
                      type="text"
                      placeholder={`Enter Category name`}
                      className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none transition-all 
                      ${
                        message
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-indigo-500"
                      }`}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Category Name RU <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={name_ru}
                      onChange={(e) => setName_ru(e.target.value)}
                      type="text"
                      placeholder={`Enter Category name`}
                      className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none transition-all 
                      ${
                        message
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-indigo-500"
                      }`}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Category Name EN <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={name_en}
                      onChange={(e) => setName_en(e.target.value)}
                      type="text"
                      placeholder={`Enter Category name`}
                      className={`w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none transition-all 
                      ${
                        message
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-indigo-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
              <p className="text-red-400">{message}</p>
            </div>
            <div className="flex justify-between gap-3 px-6 pb-6">
              <div className="flex gap-2">
                {/* Birinchi dropdown */}
                {!editData && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpen(!open)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      {selected || "Select a menu"}
                    </button>

                    {open && (
                      <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                        {menu.map((group) => (
                          <div
                            onClick={() => handleSelect(group)}
                            key={group.id}
                            className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                          >
                            <p className="font-semibold text-gray-600">
                              {group.name_uz}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Ikkinchi dropdown */}
                {!editData && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenType(!openType)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      {selectedType || "Select a type"}
                    </button>

                    {openType && (
                      <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                        {newArray.map((item) => (
                          <div
                            key={item}
                            onClick={() => handleSelectType(item)}
                            className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                          >
                            <p className="font-semibold text-gray-700">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
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
  );
}

export default CategoryAdd;
