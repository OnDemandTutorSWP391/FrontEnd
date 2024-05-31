import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create((set) => ({
    accessToken: null,
    setToken: (token) => set({ accessToken: token }),
    clearToken: () => set({ accessToken: null }),
  }));

export default useStore;