import { create } from "zustand";

export const useNetworkStore = create((set) => ({
  isOnline: false,
  setOnline: (status) => set({ isOnline: status }),
}));
