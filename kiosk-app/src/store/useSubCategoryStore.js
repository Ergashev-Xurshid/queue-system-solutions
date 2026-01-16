import { create } from "zustand";
import { getBaseURL, getToken } from "../utils/api";

export const useSubCategoryStore = create((set) => ({
  subCategores: [],
  loading: false,
  errorType: null,

  fetchSubCategories: async (categoryId) => {
    if (!categoryId) return [];

    const baseURL = getBaseURL();
    const token = getToken();

    set({ loading: true, errorType: null , subCategores:[]});

    try {
      const res = await fetch(
        `${baseURL}/api/subcategory/all?categoryId=${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 401) {
        localStorage.removeItem("token");
        set({ errorType: "UNAUTHORIZED" });
        return;
      }

      if (res.status === 403) {
        set({ errorType: "FORBIDDEN" });
        return;
      }

      if (res.status === 404) {
        set({ errorType: "NOT_FOUND" });
        return;
      }

      if (!res.ok) {
        set({ errorType: "SERVER" });
        return;
      }

      const data = await res.json();
      const body = data.body || [];

      set({ subCategores: body });
      return body;
    } catch (err) {
      // 🌐 internet yo‘q / serverga ulanib bo‘lmadi
      set({ errorType: "SERVER" });
      return []; // MUHIM
    } finally {
      set({ loading: false });
    }
  },
}));
