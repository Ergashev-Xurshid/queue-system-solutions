import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMenuStore } from "../../store/menuStore";
import { useCategoryStore } from "../../store/useCategoryStore";
import { operetorNUMBER } from "../../data/operators";
import { useOperatorStore } from "../../store/operatorStore";

export default function AddOperator({ setShowOperatorModal }) {

  const { fetchOperators } = useOperatorStore();


  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { menu, fetchMenu } = useMenuStore();

  useEffect(() => {
    if (menu.length === 0) fetchMenu();
  }, []);

  // menu
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  // Menu tanlash funksiyasi
  const handleSelectMenu = (value) => {
    setSelectedMenuId(value.id);
    setSelectedMenu(value.name_uz);
    setOpenMenu(false);
  };

  // CATEGORY
  const [openCat, setOpenCat] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedCatId, setSelectedCatId] = useState(null);

  const handleSelectCat = (value) => {
    setSelectedCat(value.name_uz);
    setSelectedCatId(value.id);
    setOpenCat(false);
  };

  const { category, fetchCategory } = useCategoryStore();

  useEffect(() => {
    if (selectedMenuId) {
      useCategoryStore.getState().clearCategory();
      fetchCategory(selectedMenuId, token);
    }
  }, [selectedMenuId]);

  /* ================= DESK NUMBERS ================= */
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [openDesk, setOpenDesk] = useState(false);
  const [selectedDesk, setSelectedDesk] = useState("");

  // API’dan band desk raqamlar
  useEffect(() => {
    const fetchDeskNumbers = async () => {
      try {
        const res = await fetch(
          "https://navbat.kstu.uz/api/operator/desk-numbers",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();
        setUsedNumbers((data.body || []).map(Number));
      } catch (e) {
        console.error("Desk number error:", e);
      }
    };

    fetchDeskNumbers();
  }, []);

  // 1–35 ichidan bo‘shlarini chiqarish
  useEffect(() => {
    const free = operetorNUMBER.filter((num) => !usedNumbers.includes(num));
    setAvailableNumbers(free);
  }, [usedNumbers]);

  /* ================= DESK NUMBERS END ================= */

  // 🔹 Alohida state lar
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(true);
  const [age, setAge] = useState(0);

  // 🔹 Operatorni POST bilan yuborish
  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedDesk && !selectedCatId) {
      toast.error("Desk number yoki categoryani tanlang tanlang!");
      return;
    }

    const body = {
      fullName,
      email,
      phoneNumber,
      password,
      categoryId: Number(selectedCatId),
      active,
      deskNumber: Number(selectedDesk),
      age: Number(age),
    };

    try {
      const res = await fetch("https://navbat.kstu.uz/auth/saveOperator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Server xatosi");
      }

      toast.success("Operator muvaffaqiyatli qo‘shildi!");
      await fetchOperators();
      setShowOperatorModal(false);
      navigate("/admin/operators");
    } catch (error) {
      console.error(error);
      toast.error("Xatolik yuz berdi! Operator qo‘shilmadi.");
    }
  }

  useEffect(() => {
    // modal har safar ochilganda formani tozalash
    setSelectedMenu("");
    setSelectedMenuId(null);
    setSelectedCat("");
    setSelectedCatId(null);
    setOpenMenu(false);
    setOpenCat(false);

    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setAge(0);

    // category store tozalash (agar kerak bo‘lsa)
    useCategoryStore.getState().clearCategory?.();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Add Operator
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-slate-900 dark:text-white"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-slate-900 dark:text-white"
            />

            <input
              name="phoneNumber"
              type="tel"
              placeholder="Phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-slate-900 dark:text-white"
            />

            <input
              name="password"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-slate-900 dark:text-white"
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2 pt-4">
            {/* menu */}
            <div
              className="relative w-60 "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenMenu((prev) => !prev)} // shu boshqaradi
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {selectedMenu || "Select a menu"}
              </button>

              {openMenu && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                  {menu.map((group) => (
                    <div
                      key={group.id}
                      onClick={() => handleSelectMenu(group)}
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
            {/* category */}
            <div
              className="relative w-60 "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenCat((prev) => !prev)} // shu boshqaradi
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {selectedCat || "Select a cat"}
              </button>

              {category.length !== 0 && openCat && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                  {category.map((group) => (
                    <div
                      key={group.id}
                      onClick={() => handleSelectCat(group)}
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
          </div>
          {/* DESK NUMBER */}
          <div className="relative w-full mt-4 ">
            <button
              type="button"
              onClick={() => setOpenDesk(!openDesk)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {selectedDesk || "Select desk number"}
            </button>

            {openDesk && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                {availableNumbers.length === 0 && (
                  <p className="p-2 text-gray-500">Bo‘sh raqam yo‘q</p>
                )}
                {availableNumbers.map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      setSelectedDesk(num);
                      setOpenDesk(false);
                    }}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="font-semibold text-gray-600">{num}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setShowOperatorModal(false)}
              className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
