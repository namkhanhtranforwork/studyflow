import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardView } from "@/features/dashboard/components/dashboard-view";
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";
import { getCurrentDashboardData } from "@/features/dashboard/get-current-dashboard-data";

export const metadata: Metadata = { title: "Tổng quan" };

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const data = await getCurrentDashboardData();
  return <DashboardView data={data} />;
}
