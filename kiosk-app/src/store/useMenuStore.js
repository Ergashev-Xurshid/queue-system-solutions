import { create } from "zustand";
import { getBaseURL, getToken } from "../utils/api";

export const useMenuStore = create((set) => ({
  menus: [],
  loading: false,
  errorType: null, // UNAUTHORIZED | FORBIDDEN | OFFLINE | SERVER | NOT_FOUND

  fetchMenus: async () => {
    const baseURL = getBaseURL();
    const token = getToken();

    set({ loading: true, errorType: null, menus: [] });

    try {
      const res = await fetch(`${baseURL}/api/menu/all`, {
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
      set({ menus: data.body });
    } catch (err) {
      // 🌐 internet yo‘q / serverga ulanib bo‘lmadi
      set({ errorType: "SERVER" });
    } finally {
      set({ loading: false });
    }
  },
}));
