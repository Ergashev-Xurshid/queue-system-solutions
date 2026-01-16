import { create } from "zustand";

export const useOperatorStore = create((set) => ({
  operators: [],
  loading: false,
  error: null,

  fetchOperators: async () => {
    set({ loading: true, error: null });

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://navbat.kstu.uz/user/all/operator", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Server xatosi: " + res.status);
      }

      const data = await res.json();

      set({
        operators: data.body || [],
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({
        error: err.message,
        loading: false,
      });
    }
  },
}));
