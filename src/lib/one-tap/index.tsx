"use client";

import { onError } from "@/ctx/toast";
import { env } from "@/env";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/ctx/auth/store";
import { Err } from "@/utils/helpers";
import { Log } from "@/utils/logger";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { type CredentialResponse } from "google-one-tap";
import { useCallback, useEffect } from "react";

// Narrow, explicit typings for the Google One Tap surface we use
type GoogleAccountsID = {
  initialize: (params: {
    client_id: string;
    callback: (res: CredentialResponse) => void;
    nonce?: string;
    use_fedcm_for_prompt?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  prompt: () => void;
  cancel?: () => void;
};

type GoogleOneTapNamespace = {
  accounts: { id: GoogleAccountsID };
};

declare global {
  interface Window {
    google?: GoogleOneTapNamespace;
    _oneTapScriptLoaded?: boolean;
  }
}

// Client-side cookie setter to avoid CORS issues from server actions
type ClientCookieOptions = {
  maxAgeSeconds?: number;
  path?: string;
  secure?: boolean;
  sameSite?: "Lax" | "Strict" | "None";
};

const setClientCookie = (
  name: string,
  value: string,
  opts?: ClientCookieOptions,
): void => {
  if (typeof document === "undefined") return;
  const path = opts?.path ?? "/";
  const sameSite = opts?.sameSite ?? "Lax";
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const secure = (opts?.secure ?? isHttps) ? "; Secure" : "";
  const maxAge =
    opts?.maxAgeSeconds !== undefined ? `; Max-Age=${opts.maxAgeSeconds}` : "";
  const cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}; Path=${path}; SameSite=${sameSite}${secure}${maxAge}`;
  document.cookie = cookie;
};

// Simple session detector: Firebase currentUser OR presence of client cookie
const hasSession = (): boolean => {
  if (typeof window === "undefined") return false;
  const firebaseSession = !!auth.currentUser;
  const hasCookie =
    typeof document !== "undefined" &&
    document.cookie.split("; ").some((c) => c.startsWith("protap-user-id="));
  return firebaseSession || hasCookie;
};

export const GoogleOneTap = () => {
  const { user, updateUser } = useAuthStore();

  // Check if user is already authenticated in the store
  const isAuthenticated = !!user;

  const generateNonce = useCallback(async () => {
    const nonce = btoa(
      String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))),
    );
    const enc = new TextEncoder();
    const encodedNonce = enc.encode(nonce);
    return crypto.subtle
      .digest("SHA-256", encodedNonce)
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedNonce = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        return { nonce, hashedNonce };
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }, []);

  useEffect(() => {
    Log("GoogleOneTap: store user", user);

    // Only initialize Google One Tap if NO user AND NO session are present
    const shouldInit = !isAuthenticated && !hasSession();
    if (!shouldInit) {
      Log(
        "GoogleOneTap: user or session present, skipping One Tap init",
        false,
      );
      return;
    }

    const initializeGoogleOneTap = async () => {
      const n = await generateNonce();
      if (!n) return;

      const handleGoogleCredentialResponse = (response: CredentialResponse) => {
        (async () => {
          Log(
            "OneTap Response (JWT prefix)",
            response.credential.substring(0, 8),
          );

          try {
            const credential = GoogleAuthProvider.credential(
              response.credential,
            );
            const result = await signInWithCredential(auth, credential);

            if (result.user) {
              updateUser(result.user);
              setClientCookie("protap-user-id", result.user.uid, {
                maxAgeSeconds: 60 * 60 * 24 * 30,
              });
              setClientCookie("protap-user-email", result.user.email ?? "", {
                maxAgeSeconds: 60 * 60 * 24 * 30,
              });
              Log("Firebase Auth Success", result.user.uid);
            }
          } catch (err) {
            Log(
              "Firebase Auth Error",
              err instanceof Error ? err.message : "Unknown error",
            );
            onError("Error authenticating with Firebase");
          }
        })().catch(Err);
      };

      const loadGoogleScriptAndInit = () => {
        if (window._oneTapScriptLoaded) {
          Log("Google GSI script already loaded, initializing directly", true);
          try {
            window.google?.accounts.id.initialize({
              client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              callback: handleGoogleCredentialResponse,
              nonce: n.hashedNonce,
              use_fedcm_for_prompt: true,
              cancel_on_tap_outside: true,
            });
            window.google?.accounts.id.prompt();
          } catch (err) {
            onError("Error initializing Google One Tap");
            console.error("One Tap init error", err);
          }
          return;
        }

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.referrerPolicy = "strict-origin-when-cross-origin";
        script.onload = () => {
          window._oneTapScriptLoaded = true;

          if (!window.google) {
            Log("Google GSI library not found.", window.google);
            return;
          }

          try {
            window.google.accounts.id.initialize({
              client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              callback: handleGoogleCredentialResponse,
              nonce: n.hashedNonce,
              use_fedcm_for_prompt: true,
              cancel_on_tap_outside: true,
            });
            window.google.accounts.id.prompt();
          } catch (err) {
            onError("Error initializing Google One Tap");
            console.error("One Tap init error", err);
          }
        };
        document.body.appendChild(script);
      };

      Log("GoogleOneTap: unauthenticated, loading Google script", true);
      loadGoogleScriptAndInit();
    };

    const timeout = setTimeout(() => {
      initializeGoogleOneTap().catch(Err);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      // Optionally cancel prompt if active
      try {
        window.google?.accounts.id.cancel?.();
      } catch {
        // ignore
      }
    };
  }, [isAuthenticated, generateNonce, updateUser, user]);

  return (
    <div id="tap-dat-ass" className="hidden">
      Google One Tap is enabled.
    </div>
  );
};
