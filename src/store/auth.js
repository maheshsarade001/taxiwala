import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const authStore = (set) => ({
  user: null,

  setUser: (user) => {
    set({ user });
  },

  createUser: (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  login: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  logout: () => {
    return signOut(auth);
  },
});

const useAuthStore = create(devtools(authStore));
export default useAuthStore;
