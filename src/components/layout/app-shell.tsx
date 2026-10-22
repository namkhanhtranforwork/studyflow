import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar, TabBar } from "@/components/layout/navigation";

export function AppShell({
  children,
  isAdmin = false,
  today,
  displayName,
}: {
  children: ReactNode;
  isAdmin?: boolean;
  today: string;
  displayName?: string | null;
}) {
  return (
    <>
      <Sidebar isAdmin={isAdmin} />
      <div className="min-h-screen min-[900px]:pl-[252px]">
        <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-6 sm:px-7 sm:pt-8 lg:px-10 lg:pb-10">
          <Header today={today} displayName={displayName} />
          {children}
        </main>
      </div>
      <TabBar />
    </>
  );
}
