import {jwtDecode} from "jwt-decode"; // Ensure this is correct

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      loggedIn: false,
      setUser: (user) => set({ user, loggedIn: !!user }),
      setToken: (token) => {
        try {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          const currentTime = Date.now() / 1000; // Get the current time in seconds
          console.log(currentTime);
          const isExpired = decodedToken.exp < currentTime; // Check if the token has expired
          console.log(decodedToken.exp);
          console.log(isExpired);
          if (!isExpired) {
            set({ accessToken: token, loggedIn: true, user: decodedToken });
          } else {
            set({ accessToken: null, loggedIn: false, user: null });
          }
        } catch (error) {
          console.error("Invalid token", error);
          set({ accessToken: null, loggedIn: false, user: null });
        }
      },
      setRefreshToken: (reToken) => set({ refreshToken: reToken }),
      clearToken: () => set({ accessToken: null, refreshToken: null, loggedIn: false, user: null }),
      isLoggedIn: () => get().loggedIn, // Selector for checking if the user is logged in
    }),
    {
      name: 'auth-storage', // unique name
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export default useStore;
