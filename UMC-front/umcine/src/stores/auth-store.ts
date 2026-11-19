// src/stores/auth-store.ts


import { create } from "zustand";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,

      setAccessToken: (accessToken) =>
        set({ accessToken }),

      clearAccessToken: () =>
        set({ accessToken: null }),
    }),
    {
      name: "umcine-auth-store",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    },
  ),
);
