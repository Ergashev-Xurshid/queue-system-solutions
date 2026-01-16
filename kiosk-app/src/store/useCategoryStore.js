import { create } from "zustand";
import { getBaseURL, getToken } from "../utils/api";

export const useCategoryStore = create((set) => ({
  categores: [],
  loading: false,
  errorType: null,

  fetchCategores: async (menuId) => {
    if (!menuId) return;
    const baseURL = getBaseURL();
    const token = getToken();

    set({ loading: true, errorType: null, categores: [] });

    try {
      const res = await fetch(`${baseURL}/api/category/all?menu_id=${menuId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
      set({ categores: data.body || [] });
    } catch (error) {
      // 🌐 internet yo‘q / serverga ulanib bo‘lmadi
      set({ errorType: "SERVER" }); 
    } finally {
      set({ loading: false });
    }
  },
}));
