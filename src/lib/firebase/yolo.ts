'use client'
import { GoogleAuthProvider } from 'firebase/auth'
import * as fbui from 'firebaseui'

export const yoloConfig = {
  signInSuccessUrl: '',
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  credentialHelper: fbui.auth.CredentialHelper.GOOGLE_YOLO,
}

/*
import { yolo_config } from "@/lib/firebase/yolo";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, UserCredential } from "firebase/auth";
useEffect(() => {
    if (window && typeof window !== "undefined" && authRef.current) {
      // Get the FirebaseUI Auth instance
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(auth);

      // Configure FirebaseUI for Google One Tap
      const uiConfig = {
        signInSuccessUrl: "/alpha", // Replace with your desired post-login URL
        signInOptions: [
          GoogleAuthProvider.PROVIDER_ID, // Enable Google Sign-In
          // Add other providers if needed, e.g., firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // The magic for Google One Tap!
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        callbacks: {
          signInSuccessWithAuthResult: function (
            authResult: UserCredential,
            redirectUrl: string,
          ) {
            console.log(authResult, redirectUrl);
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or if we handle it ourselves.
            return true; // Return true to redirect, or false to prevent redirect
          },
          uiShown: function () {
            // The widget is rendered.
            // Hide the loader if you have one.
          },
        },
      };
    }
    return () => {
      const y = firebaseui.auth.AuthUI.getInstance();
      if (y && y.delete) {
        y.delete();
      }
    };
  }, []);
*/
