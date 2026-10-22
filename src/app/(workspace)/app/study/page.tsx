import type { Metadata } from "next";
import { QuickLogForm } from "@/features/dashboard/components/quick-log-form";
import { RecentLogs } from "@/features/dashboard/components/recent-logs";
import { getCurrentDashboardData } from "@/features/dashboard/get-current-dashboard-data";

export const metadata: Metadata = { title: "Ghi nhận học" };

export default async function StudyPage() {
  const data = await getCurrentDashboardData();

  return (
    <div className="mx-auto grid max-w-4xl items-start gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">Duy trì nhịp học</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Thời gian học</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ghi lại một phiên học để theo dõi tiến độ của bạn.</p>
        </div>
        <QuickLogForm />
      </div>
      <RecentLogs logs={data.studyLogs} today={data.today} />
    </div>
  );
}
