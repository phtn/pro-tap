"use client";

import { auth } from "@/lib/firebase";
import { updateUser } from "@/lib/firebase/users";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  UserCredential,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  createContext,
  useMemo,
  useContext,
  type ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthCtxValues {
  user: User | null;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithGithub: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthCtxValues | null>(null);

const AuthCtxProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        void updateUser(u).catch((err) => {
          if (process.env.NODE_ENV !== "production") {
            console.error("updateUser failed", err);
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback((): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, provider);
  }, []);

  const signInWithGithub = useCallback((): Promise<UserCredential> => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }, []);

  const signOut = useCallback((): Promise<void> => {
    return firebaseSignOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      signInWithGoogle,
      signInWithGithub,
      signOut,
    }),
    [user, signInWithGoogle, signInWithGithub, signOut],
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

const useAuthCtx = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("AuthCtxProvider is missing");
  return ctx;
};

export { AuthCtx, AuthCtxProvider, useAuthCtx };
