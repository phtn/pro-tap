import { create } from "zustand";
import { User, UserMetadata } from "firebase/auth";
// import { CreateUser, InsertUser } from "../../../convex/users/d";

interface AuthState {
  user: User | null;
  metadata: UserMetadata | undefined;
  isLoading: boolean;
  isAuthed: boolean;
  createUser: (user: User) => void;
  updateUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setAuthed: (authed: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  metadata: undefined,
  isLoading: true,
  isAuthed: false,
  createUser: (user) => set({ user, metadata: user.metadata }),
  updateUser: (user) =>
    set(() => ({
      ...user,
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setAuthed: (isAuthed) => set({ isAuthed }),
  reset: () =>
    set({
      user: null,
      metadata: undefined,
      isLoading: false,
      isAuthed: false,
    }),
}));
