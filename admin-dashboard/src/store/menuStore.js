import { create } from "zustand";

export const useMenuStore = create((set, get) => ({
  menu: [],
  loading: false,
  error: null,

  // GET MENU
  fetchMenu: async () => {
    const token = localStorage.getItem("token");

    set({ loading: true, error: null });

    try {
      const res = await fetch("https://navbat.kstu.uz/api/menu/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Status:", res.status);

      const data = await res.json();
      // **ID bo‘yicha qat’iy tartiblash**
      const sorted = data.body.sort((a, b) => a.id - b.id);

      console.log("Menu Data:", data);

      set({ menu: sorted });
    } catch (error) {
      console.log("Menu Error:", error);
      set({ error: "Menu Ma'lumotni olishda xatolik yuz berdi" });
    } finally {
      set({ loading: false });
    }
  },

  // ADD MENU
  addMenu: async (newMenu) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://navbat.kstu.uz/api/menu/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMenu),
      });

      if (!res.ok) throw new Error("Add error");
      await useMenuStore.getState().fetchMenu();
    } catch (error) {
      set({ error: err.message });
    }
  },

  // EDIT MENU
  editMenu: async (id, updatedMenu) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://navbat.kstu.uz/api/menu/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMenu),
      });

      if (!res.ok) throw new Error("Bu menu active emas");

      await useMenuStore.getState().fetchMenu();
    } catch (error) {
      set({ error: err.message });
    }
  },

  // DELETE MENU
  deleteMenu: async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://navbat.kstu.uz/api/menu/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Delete error");

      // 🔄 DELETE bo‘lgandan keyin yangilash
      await get().fetchMenu();
    } catch (err) {
      set({ error: err.message });
    }
  },
}));
