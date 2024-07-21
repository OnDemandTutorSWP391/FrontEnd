import create from "zustand";

const useToggleStore = create((set) => ({
  isActive: false, // Initial state
  toggle: () => set((state) => ({ isActive: !state.isActive })), // Function to toggle the boolean state
}));

export default useToggleStore;
