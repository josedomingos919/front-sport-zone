import { create } from "zustand";

export const useAppState = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}));
