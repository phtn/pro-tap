"use client";
import { UserNavbar } from "@/components/ui/navbar-user";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background bg-blend-multiply min-h-screen">
      <UserNavbar />
      <main className="max-w-6xl mx-auto border border-zinc-800/0">
        {children}
      </main>
    </div>
  );
}
