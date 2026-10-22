import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import {
  getTodayDateKey,
  type DashboardData,
  type DashboardGoal,
  type DashboardTask,
  type DailyStudy,
  type StudyLog,
} from "@/features/dashboard/sample-data";

export async function getDashboardData(
  supabase: SupabaseClient<Database>,
  userId: string,
  timeZone: string,
): Promise<DashboardData> {
  const today = getTodayDateKey(new Date(), timeZone);
  const [statsResult, goalsResult, tasksResult, logsResult] = await Promise.all([
    supabase.rpc("weekly_stats", { p_days: 7 }),
    supabase
      .from("goals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("due_date", { ascending: true, nullsFirst: false }),
    supabase
      .from("study_logs")
      .select("*")
      .eq("user_id", userId)
      .order("study_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  if (statsResult.error) {
    console.error("Could not load weekly dashboard statistics:", statsResult.error.message);
    throw new Error("Chưa thể tải thống kê học tập.");
  }
  if (goalsResult.error) {
    console.error("Could not load dashboard goals:", goalsResult.error.message);
    throw new Error("Chưa thể tải mục tiêu.");
  }
  if (tasksResult.error) {
    console.error("Could not load dashboard tasks:", tasksResult.error.message);
    throw new Error("Chưa thể tải nhiệm vụ.");
  }
  if (logsResult.error) {
    console.error("Could not load recent study logs:", logsResult.error.message);
    throw new Error("Chưa thể tải nhật ký học.");
  }
  if (statsResult.data.length !== 7) {
    throw new Error("Thống kê tuần cần đủ bảy ngày.");
  }

  const weeklyStudy: DailyStudy[] = statsResult.data.map((day) => ({
    date: day.day,
    label: getWeekdayLabel(day.day),
    minutes: Number(day.minutes),
  }));
  const tasks: DashboardTask[] = tasksResult.data.map((task) => ({
    id: task.id,
    title: task.title,
    dueDate: task.due_date,
    goalId: task.goal_id ?? "",
    completed: task.status === "completed",
  }));
  const taskCounts = new Map<string, { completed: number; total: number }>();

  for (const task of tasksResult.data) {
    if (!task.goal_id) continue;
    const count = taskCounts.get(task.goal_id) ?? { completed: 0, total: 0 };
    count.total += 1;
    if (task.status === "completed") count.completed += 1;
    taskCounts.set(task.goal_id, count);
  }

  const goals: DashboardGoal[] = goalsResult.data.map((goal) => {
    const count = taskCounts.get(goal.id) ?? { completed: 0, total: 0 };
    return {
      id: goal.id,
      title: goal.title,
      completedTasks: count.completed,
      totalTasks: count.total,
      status: goal.status,
    };
  });

  const studyLogs: StudyLog[] = logsResult.data.map((log) => ({
    id: log.id,
    date: log.study_date,
    minutes: log.minutes,
    note: log.note ?? "",
  }));

  return { today, weeklyStudy, studyLogs, tasks, goals };
}

function getWeekdayLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}
