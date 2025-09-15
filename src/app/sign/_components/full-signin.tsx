"use client";

import { useAuthCtx } from "@/ctx/auth";
import { useMemo, useState } from "react";
import { LeftPanel } from "./left-panel";
import { RightPanel, SocialLogin } from "./right-panel";

export function FullSignIn() {
  const [loading, setLoading] = useState<string | null>(null);
  const { signInWithGoogle, signInWithGithub, user, signOut } = useAuthCtx();

  const handleGoogle = async () => {
    try {
      setLoading("google");
      await signInWithGoogle();
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const handleGithub = async () => {
    try {
      setLoading("github");
      await signInWithGithub();
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const social_logins = useMemo(
    () =>
      [
        {
          id: "google",
          name: "Google",
          icon: "google",
          fn: handleGoogle,
          disabled: false,
        },
        {
          id: "github",
          name: "GitHub",
          icon: "github",
          fn: handleGithub,
          // disabled: true,
        },
        {
          id: "apple",
          name: "Apple",
          icon: "apple",
          fn: handleGoogle,
          disabled: true,
        },
      ] as Array<SocialLogin>,
    [],
  );

  return (
    <div className="w-full flex items-center justify-center font-figtree">
      <div className="bg-white dark:bg-zinc-500  w-full md:rounded-4xl md:shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[70lvh]">
          <LeftPanel />
          <RightPanel
            user={user}
            signOut={signOut}
            socialLogins={social_logins}
          />
        </div>
      </div>
    </div>
  );
}
