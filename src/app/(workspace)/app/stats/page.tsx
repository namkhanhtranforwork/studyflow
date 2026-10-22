import type { Metadata } from "next";
import { GoalProgress } from "@/features/dashboard/components/goal-progress";
import { StatCards } from "@/features/dashboard/components/stat-cards";
import { WeeklyChart } from "@/features/dashboard/components/weekly-chart";
import { activeGoalCount, formatMinutes, studyStreak, weekTotal } from "@/features/dashboard/lib/stats";
import { getCurrentDashboardData } from "@/features/dashboard/get-current-dashboard-data";

export const metadata: Metadata = { title: "Thống kê" };

export default async function StatsPage() {
  const data = await getCurrentDashboardData();
  const total = weekTotal(data.weeklyStudy);
  const done = data.tasks.filter((task) => task.completed).length;
  const activeGoals = activeGoalCount(data.goals);

  const stats = [
    { label: "Thời gian học", value: formatMinutes(total), detail: "7 ngày gần nhất", icon: "clock" as const, tone: "indigo" as const },
    { label: "Nhiệm vụ hoàn thành", value: `${done}/${data.tasks.length}`, detail: "Nhiệm vụ cá nhân", icon: "check-circle" as const, tone: "emerald" as const },
    { label: "Chuỗi ngày học", value: `${studyStreak(data.weeklyStudy, data.today)} ngày`, detail: "Tính theo múi giờ tài khoản", icon: "flame" as const, tone: "orange" as const },
    { label: "Mục tiêu đang thực hiện", value: `${activeGoals}`, detail: `${data.goals.length} mục tiêu tất cả`, icon: "target" as const, tone: "violet" as const },
  ];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">Nhìn lại hành trình</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Thống kê</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Dữ liệu được tính theo múi giờ trong hồ sơ của bạn.</p>
      </div>
      <StatCards stats={stats} />
      <div className="grid items-start gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <WeeklyChart days={data.weeklyStudy} />
        <GoalProgress goals={data.goals} />
      </div>
    </div>
  );
}
