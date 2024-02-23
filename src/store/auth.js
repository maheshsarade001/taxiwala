import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const authStore = persist(
  (set) => ({
    user: null,

    setUser: (user) => {
      set({ user });
    },
  }),
  {
    name: "user",
    storage: createJSONStorage(() => sessionStorage),
  }
);

const useAuthStore = create(devtools(authStore));
export default useAuthStore;
