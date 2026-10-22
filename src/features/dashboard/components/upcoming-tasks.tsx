import { Icon } from "@/components/icons";
import { deleteCompletedTasks } from "@/features/tasks/actions";
import type { DashboardGoal, DashboardTask } from "@/features/dashboard/sample-data";
import { dueInfo } from "@/features/dashboard/lib/stats";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { TaskQuickActions } from "@/features/tasks/components/task-quick-actions";

export function UpcomingTasks({
  tasks,
  goals,
  today,
}: {
  tasks: DashboardTask[];
  goals: DashboardGoal[];
  today: string;
}) {
  const sortedTasks = [...tasks].sort((a, b) => (a.dueDate ?? "9999-12-31").localeCompare(b.dueDate ?? "9999-12-31"));
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingTasks = sortedTasks.filter((task) => !task.completed).slice(0, 6);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Nhiệm vụ sắp tới</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {tasks.length - completedCount} nhiệm vụ cần hoàn thành
          </p>
        </div>
        {completedCount > 0 && (
          <form action={deleteCompletedTasks}>
            <button className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10">
              <Icon name="trash" size={14} />
              Dọn việc xong
            </button>
          </form>
        )}
      </div>

      {pendingTasks.length === 0 ? (
        <EmptyState
          icon={tasks.length ? "check-circle" : "plus"}
          title={tasks.length ? "Bạn đã hoàn thành mọi nhiệm vụ" : "Bạn chưa có nhiệm vụ nào"}
          description={tasks.length ? "Tạo một nhiệm vụ mới khi bạn sẵn sàng." : "Khi có nhiệm vụ mới, chúng sẽ xuất hiện ở đây."}
        />
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {pendingTasks.map((task) => {
            const due = dueInfo(task.dueDate, today);
            const goal = goals.find((item) => item.id === task.goalId);

            return (
              <li key={task.id} className="flex items-start gap-3 py-3 first:pt-1 last:pb-1">
                <TaskQuickActions task={task} />
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-semibold leading-5 ${
                    task.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-700 dark:text-slate-200"
                  }`}>
                    {task.title}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-slate-400">
                    {goal?.title ?? "Chưa gắn mục tiêu"}
                  </p>
                </div>
                <span
                  className={`mt-0.5 shrink-0 rounded-md px-2 py-1 text-[9px] font-bold ${
                    due.status === "overdue"
                      ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
                      : due.status === "today"
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300"
                        : "bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {due.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
