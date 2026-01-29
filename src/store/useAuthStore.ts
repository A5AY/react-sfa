import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,

  login: (username, password) => {
    if (username === "sysadmin" && password === "a") {
      set({ isLoggedIn: true });
      return true;
    }
    return false;
  },

  logout: () => set({ isLoggedIn: false }),
}));
