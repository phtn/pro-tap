"use client";

import { ProfileCard } from "@/components/react-bits/profile-card";
import { useAuthCtx } from "@/ctx/auth";

export const Content = () => {
  const { user } = useAuthCtx();
  return (
    <main>
      <ProfileCard
        avatarUrl={user?.photoURL ?? ""}
        iconUrl={""}
        grainUrl={""}
        behindGradient={""}
        innerGradient={""}
        showBehindGradient={false}
        className={""}
        enableTilt={true}
        enableMobileTilt={false}
        mobileTiltSensitivity={0}
        miniAvatarUrl={""}
        name={""}
        title={""}
        handle={""}
        status={""}
        contactText={""}
        showUserInfo={false}
        onContactClick={() => console.log("")}
      />
    </main>
  );
};
