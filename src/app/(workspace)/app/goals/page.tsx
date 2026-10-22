import type { Metadata } from "next";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { GoalActions } from "@/features/goals/components/goal-actions";
import { GoalForm } from "@/features/goals/components/goal-form";
import { listGoals } from "@/features/goals/service";
import { createGoalRepository } from "@/features/goals/repository";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Mục tiêu" };

export default async function GoalsPage() {
  const { supabase, user } = await requireUser();
  const result = await listGoals(createGoalRepository(supabase), user.id);
  if (!result.ok) throw new Error(result.error);

  const goals = result.data;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">Kế hoạch của bạn</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Mục tiêu</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Chọn điều quan trọng và chia thành những bước dễ thực hiện.</p>
      </div>

      <GoalForm />

      {goals.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <EmptyState icon="target" title="Bạn chưa có mục tiêu nào" description="Tạo mục tiêu đầu tiên để bắt đầu lên kế hoạch." />
        </section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {goals.map((goal) => (
            <article key={goal.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${goal.category === "work" ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300" : "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"}`}>
                    {goal.category === "work" ? "Công việc" : "Học tập"}
                  </span>
                  <h2 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{goal.title}</h2>
                  {goal.description && <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{goal.description}</p>}
                  <p className="mt-3 text-[10px] text-slate-400">
                    {goal.start_date ? `Bắt đầu ${formatDate(goal.start_date)}` : "Chưa đặt ngày bắt đầu"}
                    {goal.target_date ? ` · Hạn ${formatDate(goal.target_date)}` : ""}
                  </p>
                </div>
                <span className="shrink-0 rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  {goal.status === "completed" ? "Hoàn thành" : goal.status === "archived" ? "Đã lưu trữ" : "Đang thực hiện"}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <GoalForm goal={goal} />
                <GoalActions id={goal.id} completed={goal.status === "completed"} />
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

function formatDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}
