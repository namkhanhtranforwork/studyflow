import type {
  DashboardGoal,
  DailyStudy,
} from "@/features/dashboard/sample-data";
import { shiftDateKey } from "@/features/dashboard/sample-data";

export function weekTotal(days: readonly DailyStudy[]): number {
  return days.reduce((total, day) => total + day.minutes, 0);
}

export function studyStreak(
  days: readonly DailyStudy[],
  today: string,
): number {
  const minutesByDate = new Map(days.map((day) => [day.date, day.minutes]));
  let date = (minutesByDate.get(today) ?? 0) > 0 ? today : shiftDateKey(today, -1);
  let streak = 0;

  while ((minutesByDate.get(date) ?? 0) > 0) {
    streak += 1;
    date = shiftDateKey(date, -1);
  }

  return streak;
}

export function goalDone(completedTasks: number, totalTasks: number): number {
  if (totalTasks <= 0) {
    return 0;
  }

  const progress = Math.min(Math.max(completedTasks, 0), totalTasks);
  return Math.round((progress / totalTasks) * 100);
}

export type DueStatus = "overdue" | "today" | "upcoming" | "none";

export interface DueInfo {
  status: DueStatus;
  label: string;
}

export function dueInfo(dueDate: string | null, today: string): DueInfo {
  if (!dueDate) {
    return { status: "none", label: "Chưa đặt hạn" };
  }

  if (dueDate < today) {
    return { status: "overdue", label: "Quá hạn" };
  }

  if (dueDate === today) {
    return { status: "today", label: "Hôm nay" };
  }

  const [, month, day] = dueDate.split("-");
  return {
    status: "upcoming",
    label: `${Number(day)}/${Number(month)}`,
  };
}

export function formatMinutes(minutes: number): string {
  const safeMinutes = Math.max(0, Math.floor(minutes));

  if (safeMinutes < 60) {
    return `${safeMinutes} phút`;
  }

  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  return remainingMinutes === 0
    ? `${hours} giờ`
    : `${hours} giờ ${remainingMinutes} phút`;
}

export function activeGoalCount(goals: readonly DashboardGoal[]): number {
  return goals.filter((goal) => goal.status === "active").length;
}
