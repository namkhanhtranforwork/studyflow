import { Suspense, type ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";
import { getTodayDateKey } from "@/features/dashboard/sample-data";
import { requireUser } from "@/lib/auth";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AuthenticatedWorkspace>{children}</AuthenticatedWorkspace>
    </Suspense>
  );
}

async function AuthenticatedWorkspace({ children }: { children: ReactNode }) {
  const { supabase, user } = await requireUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role,timezone,display_name")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Could not load the workspace role:", error.message);
    throw new Error("Chưa thể tải không gian cá nhân.");
  }

  if (!profile) {
    throw new Error("Hồ sơ tài khoản chưa sẵn sàng. Vui lòng liên hệ hỗ trợ.");
  }

  return (
    <AppShell
      isAdmin={profile.role === "admin"}
      today={getTodayDateKey(new Date(), profile.timezone)}
      displayName={profile.display_name}
    >
      {children}
    </AppShell>
  );
}
