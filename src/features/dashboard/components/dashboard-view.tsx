import { Icon } from "@/components/icons";
import { GoalProgress } from "@/features/dashboard/components/goal-progress";
import { QuickLogForm } from "@/features/dashboard/components/quick-log-form";
import { RecentLogs } from "@/features/dashboard/components/recent-logs";
import { StatCards } from "@/features/dashboard/components/stat-cards";
import { UpcomingTasks } from "@/features/dashboard/components/upcoming-tasks";
import { WeeklyChart } from "@/features/dashboard/components/weekly-chart";
import {
  activeGoalCount,
  studyStreak,
  weekTotal,
} from "@/features/dashboard/lib/stats";
import type { DashboardData } from "@/features/dashboard/sample-data";

export function DashboardView({ data }: { data: DashboardData }) {
  const completedTasks = data.tasks.filter((task) => task.completed).length;
  const activeGoals = activeGoalCount(data.goals);
  const studyMinutes = weekTotal(data.weeklyStudy);
  const streak = studyStreak(data.weeklyStudy, data.today);

  const stats = [
    {
      label: "Thời gian học tuần này",
      value: `${studyMinutes} phút`,
      detail: `${data.weeklyStudy.at(-1)?.minutes ?? 0} phút hôm nay`,
      icon: "clock" as const,
      tone: "indigo" as const,
    },
    {
      label: "Nhiệm vụ hoàn thành",
      value: `${completedTasks}/${data.tasks.length}`,
      detail: data.tasks.length
        ? `${Math.round((completedTasks / data.tasks.length) * 100)}% tổng nhiệm vụ`
        : "Chưa có nhiệm vụ",
      icon: "check-circle" as const,
      tone: "emerald" as const,
    },
    {
      label: "Chuỗi ngày học",
      value: `${streak} ngày`,
      detail: streak ? "Bạn đang giữ nhịp rất tốt" : "Bắt đầu một phiên học hôm nay",
      icon: "flame" as const,
      tone: "orange" as const,
    },
    {
      label: "Mục tiêu đang thực hiện",
      value: `${activeGoals}`,
      detail: `${data.goals.filter((goal) => goal.status === "completed").length} mục tiêu đã hoàn thành`,
      icon: "target" as const,
      tone: "violet" as const,
    },
  ];

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 dark:border-indigo-500/20 dark:bg-indigo-500/10 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-300">
            <Icon name="sparkles" size={18} />
          </span>
          <div>
            <p className="text-xs font-bold text-indigo-950 dark:text-indigo-100">Chào mừng đến không gian của bạn</p>
            <p className="mt-0.5 text-[10px] text-indigo-700/80 dark:text-indigo-200/75">
              Bắt đầu với bước nhỏ tiếp theo trong kế hoạch.
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-300 sm:flex">
          <Icon name="trend" size={14} />
          {studyMinutes} phút tuần này
        </span>
      </div>

      <StatCards stats={stats} />
      <div className="mt-5 grid items-start gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-5">
          <WeeklyChart days={data.weeklyStudy} />
          <UpcomingTasks tasks={data.tasks} goals={data.goals} today={data.today} />
        </div>
        <div className="space-y-5">
          <GoalProgress goals={data.goals} />
          <RecentLogs logs={data.studyLogs} today={data.today} />
          <QuickLogForm />
        </div>
      </div>
    </>
  );
}
