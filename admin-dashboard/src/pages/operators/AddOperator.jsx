import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useMenuStore } from "../../store/menuStore";
import { useCategoryStore } from "../../store/useCategoryStore";
import { operetorNUMBER } from "../../data/operators";
import { useOperatorStore } from "../../store/operatorStore";

export default function OperatorModal({
  setShowOperatorModal,
  mode = "add",
  initialData = null,
}) {
  const isEdit = mode === "edit";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { fetchOperators } = useOperatorStore();
  const { menu, fetchMenu } = useMenuStore();
  const { category, fetchCategory } = useCategoryStore();

  const [loading, setLoading] = useState(false);

  // MENU
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  // CATEGORY
  const [openCat, setOpenCat] = useState(false);
  const [selectedCats, setSelectedCats] = useState([]);

  // DESK NUMBER
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [openDesk, setOpenDesk] = useState(false);
  const [selectedDesk, setSelectedDesk] = useState("");

  // FORM
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (menu.length === 0) {
      fetchMenu();
    }
  }, [menu.length, fetchMenu]);

  const handleSelectMenu = (value) => {
    setSelectedMenuId(value.id);
    setSelectedMenu(value.name_uz);
    setOpenMenu(false);
    setSelectedCats([]);
  };

  const handleToggleCat = (item) => {
    setSelectedCats((prev) => {
      const exists = prev.some((cat) => Number(cat.id) === Number(item.id));

      if (exists) {
        return prev.filter((cat) => Number(cat.id) !== Number(item.id));
      }

      return [...prev, item];
    });
  };

  const handleRemoveCat = (id) => {
    setSelectedCats((prev) => prev.filter((cat) => Number(cat.id) !== Number(id)));
  };

  useEffect(() => {
    if (selectedMenuId) {
      useCategoryStore.getState().clearCategory?.();
      fetchCategory(selectedMenuId, token);
    }
  }, [selectedMenuId, fetchCategory, token]);

  useEffect(() => {
    const fetchDeskNumbers = async () => {
      if (isEdit) return;

      try {
        const res = await fetch("https://navbat.kstu.uz/api/operator/desk-numbers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUsedNumbers((data?.body || []).map(Number));
      } catch (error) {
        console.error("Desk number error:", error);
      }
    };

    fetchDeskNumbers();
  }, [token, isEdit]);

  useEffect(() => {
    const free = operetorNUMBER.filter((num) => !usedNumbers.includes(num));
    setAvailableNumbers(free);
  }, [usedNumbers]);

  const selectedCategoryIds = useMemo(() => {
    return selectedCats.map((item) => Number(item.id));
  }, [selectedCats]);

  const primaryCategoryId = selectedCategoryIds[0] || 0;

  // initial reset / fill
  useEffect(() => {
    setOpenMenu(false);
    setOpenCat(false);
    setOpenDesk(false);

    useCategoryStore.getState().clearCategory?.();

    if (isEdit && initialData) {
      setFullName(initialData.fullName || "");
      setEmail(initialData.email || "");
      setPhoneNumber(initialData.phoneNumber || "");
      setPassword("");
      setAge(initialData.age ?? "");
      setSelectedDesk(initialData.deskNumber || "");

      if (initialData.menuId && menu.length > 0) {
        const foundMenu = menu.find(
          (m) => Number(m.id) === Number(initialData.menuId)
        );
        if (foundMenu) {
          setSelectedMenu(foundMenu.name_uz);
          setSelectedMenuId(foundMenu.id);
        }
      } else {
        setSelectedMenu("");
        setSelectedMenuId(null);
      }

      return;
    }

    setSelectedMenu("");
    setSelectedMenuId(null);
    setSelectedCats([]);
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setAge("");
    setSelectedDesk("");
  }, [isEdit, initialData, menu]);

  // category loaded bo'lgandan keyin editdagi categorylarni tanlab qo'yish
  useEffect(() => {
    if (!isEdit || !initialData || category.length === 0) return;
    if (!initialData.categoryIds?.length) return;

    const selected = category.filter((item) =>
      initialData.categoryIds.some((id) => Number(id) === Number(item.id))
    );

    setSelectedCats(selected);
  }, [isEdit, initialData, category]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    if (!fullName.trim()) {
      toast.error("Full name kiriting");
      return;
    }

    if (!phoneNumber.trim()) {
      toast.error("Phone number kiriting");
      return;
    }

    if (!selectedMenuId) {
      toast.error("Menu tanlang");
      return;
    }

    if (selectedCategoryIds.length === 0) {
      toast.error("Kamida bitta category tanlang");
      return;
    }

    if (!isEdit && !email.trim()) {
      toast.error("Email kiriting");
      return;
    }

    if (!isEdit && !password.trim()) {
      toast.error("Password kiriting");
      return;
    }

    if (!isEdit && !selectedDesk) {
      toast.error("Desk number tanlang");
      return;
    }

    const body = isEdit
      ? {
          fullName: fullName.trim(),
          age: Number(age) || 0,
          phoneNumber: phoneNumber.trim(),
          categoryId: primaryCategoryId,
          categoryIds: selectedCategoryIds,
        }
      : {
          fullName: fullName.trim(),
          email: email.trim(),
          age: Number(age) || 0,
          phoneNumber: phoneNumber.trim(),
          categoryId: primaryCategoryId,
          categoryIds: selectedCategoryIds,
          deskNumber: Number(selectedDesk),
          password: password.trim(),
        };

    const url = isEdit
      ? `https://navbat.kstu.uz/auth/operator/updates?id=${initialData?.id}`
      : "https://navbat.kstu.uz/auth/saveOperator";

    const method = isEdit ? "PUT" : "POST";

    try {
      setLoading(true);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => null);

      console.log("Yuborilgan body:", body);
      console.log("Server response:", data);

      if (!res.ok) {
        throw new Error(data?.message || "Server xatosi");
      }

      toast.success(
        isEdit
          ? "Operator muvaffaqiyatli yangilandi!"
          : "Operator muvaffaqiyatli qo‘shildi!"
      );

      await fetchOperators();
      setShowOperatorModal(false);
      navigate("/admin/operators");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message ||
          (isEdit
            ? "Xatolik yuz berdi! Operator yangilanmadi."
            : "Xatolik yuz berdi! Operator qo‘shilmadi.")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 p-4 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center py-6">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            {isEdit ? "Edit Operator" : "Add Operator"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg bg-slate-100 px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {!isEdit && (
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-slate-100 px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}

              <input
                name="phoneNumber"
                type="tel"
                placeholder="Phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-lg bg-slate-100 px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {!isEdit && (
                <input
                  name="password"
                  type="text"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-slate-100 px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}

              <input
                name="age"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg bg-slate-100 px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-3 pt-4">
              {/* MENU */}
              <div
                className="relative w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu((prev) => !prev)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {selectedMenu || "Select a menu"}
                </button>

                {openMenu && (
                  <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                    {menu.map((group) => (
                      <div
                        key={group.id}
                        onClick={() => handleSelectMenu(group)}
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                      >
                        <p className="font-semibold text-gray-600">
                          {group.name_uz}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CATEGORY */}
              <div
                className="relative w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpenCat((prev) => !prev)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {selectedCats.length > 0
                    ? `${selectedCats.length} ta category tanlandi`
                    : "Select categories"}
                </button>

                {category.length > 0 && openCat && (
                  <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                    {category.map((group) => {
                      const checked = selectedCats.some(
                        (item) => Number(item.id) === Number(group.id)
                      );

                      return (
                        <label
                          key={group.id}
                          className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleToggleCat(group)}
                          />
                          <span className="font-medium text-gray-700">
                            {group.name_uz}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SELECTED CATEGORIES */}
              {selectedCats.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCats.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
                    >
                      <span>
                        {item.name_uz}
                        {index === 0 ? " (asosiy)" : ""}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCat(item.id)}
                        className="cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* DESK NUMBER - faqat add uchun */}
              {!isEdit && (
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => setOpenDesk((prev) => !prev)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {selectedDesk || "Select desk number"}
                  </button>

                  {openDesk && (
                    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
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
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        >
                          <p className="font-semibold text-gray-600">{num}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Saqlanmoqda..." : isEdit ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={() => setShowOperatorModal(false)}
                className="flex-1 cursor-pointer rounded-lg bg-slate-200 px-4 py-2 text-slate-900 transition-colors hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}