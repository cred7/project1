import { create } from "zustand";

type User = {
  name: string;
  email: string;
  role: string;
};
type AuthState = {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  stopLoading: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  login: (user) => set({ user, loading: false }),

  logout: () => set({ user: null, loading: false }),

  stopLoading: () => set({ loading: false }),
}));
