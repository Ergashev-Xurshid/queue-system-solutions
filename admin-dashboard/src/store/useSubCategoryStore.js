import { create } from "zustand";

export const useSubCategoryStore = create((set) => ({
  subCategoryMap: {}, // Har bir categoryId uchun subcategory
  loadingMap: {},     // Har bir categoryId uchun loading
  errorMap: {},       // Har bir categoryId uchun error

  fetchSubCategory: async (categoryId, token) => {
    if (!categoryId) return;

    // Loading boshlanishi
    set((state) => ({
      loadingMap: { ...state.loadingMap, [categoryId]: true },
      errorMap: { ...state.errorMap, [categoryId]: null },
    }));

    try {
      const res = await fetch(
        `https://navbat.kstu.uz/api/subcategory/all?categoryId=${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (!data.success) {
        // Xato bo‘lsa
        set((state) => ({
          subCategoryMap: { ...state.subCategoryMap, [categoryId]: [] },
          errorMap: { ...state.errorMap, [categoryId]: data.message },
        }));
        return;
      }

      // Success bo‘lsa
      set((state) => ({
        subCategoryMap: { ...state.subCategoryMap, [categoryId]: data.body },
        errorMap: { ...state.errorMap, [categoryId]: null },
      }));
    } catch (err) {
      console.error("SubCategory fetch error:", err);
      set((state) => ({
        subCategoryMap: { ...state.subCategoryMap, [categoryId]: [] },
        errorMap: { ...state.errorMap, [categoryId]: "Yuklashda xatolik yuz berdi" },
      }));
    } finally {
      set((state) => ({
        loadingMap: { ...state.loadingMap, [categoryId]: false },
      }));
    }
  },
}));
