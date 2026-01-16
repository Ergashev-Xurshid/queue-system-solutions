import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  category: [],
  loading: false,
  error: null,

  fetchCategory: async (menuId, token) => {
    if (!menuId) return;

    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `https://navbat.kstu.uz/api/category/all?menu_id=${menuId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      set({ category: data.body || [] });
    } catch (error) {
      console.log(" Category Error:", error);
      set({ error: "Category yuklashda xatolik!" });
    } finally {
      set({ loading: false });
    }
  },

  clearCategory: () => set({ category: [] }), // 🔥 YANGI FUNKSIYA
}));
