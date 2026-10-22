import { Suspense, type ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";
import { getTodayDateKey } from "@/features/dashboard/sample-data";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AdminWorkspace>{children}</AdminWorkspace>
    </Suspense>
  );
}

async function AdminWorkspace({ children }: { children: ReactNode }) {
  const { supabase, user } = await requireAdmin();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("timezone,display_name")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Could not load the admin timezone:", error.message);
    throw new Error("Chưa thể tải khu vực quản trị.");
  }

  return (
    <AppShell
      isAdmin
      today={getTodayDateKey(
        new Date(),
        profile?.timezone ?? "Asia/Ho_Chi_Minh",
      )}
      displayName={profile?.display_name}
    >
      {children}
    </AppShell>
  );
}
