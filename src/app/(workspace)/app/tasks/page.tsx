import type { Metadata } from "next";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { createGoalRepository } from "@/features/goals/repository";
import { listGoals } from "@/features/goals/service";
import { TaskActions } from "@/features/tasks/components/task-actions";
import { TaskForm } from "@/features/tasks/components/task-form";
import { createTaskRepository } from "@/features/tasks/repository";
import { listTasks } from "@/features/tasks/service";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Nhiệm vụ" };

export default async function TasksPage() {
  const { supabase, user } = await requireUser();
  const repository = createTaskRepository(supabase);
  const [taskResult, goalResult] = await Promise.all([
    listTasks(repository, user.id),
    listGoals(createGoalRepository(supabase), user.id),
  ]);

  if (!taskResult.ok) throw new Error(taskResult.error);
  if (!goalResult.ok) throw new Error(goalResult.error);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">Từng bước thực hiện</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Nhiệm vụ</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Sắp xếp việc cần làm và đánh dấu tiến độ.</p>
      </div>

      <TaskForm goals={goalResult.data} />

      {taskResult.data.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <EmptyState icon="check-circle" title="Bạn chưa có nhiệm vụ nào" description="Tạo nhiệm vụ đầu tiên để biến mục tiêu thành hành động." />
        </section>
      ) : (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {taskResult.data.map((task) => {
              const goal = goalResult.data.find((item) => item.id === task.goal_id);
              return (
                <li key={task.id} className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-5">
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${task.status === "completed" ? "text-slate-400 line-through" : "text-slate-800 dark:text-slate-100"}`}>{task.title}</p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {goal?.title ?? "Chưa gắn mục tiêu"}
                      {task.due_date ? ` · Hạn ${task.due_date}` : " · Chưa đặt hạn"}
                    </p>
                  </div>
                  <TaskActions id={task.id} completed={task.status === "completed"} />
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
