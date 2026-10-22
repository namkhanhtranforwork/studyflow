import type { DashboardGoal } from "@/features/dashboard/sample-data";
import { goalDone } from "@/features/dashboard/lib/stats";
import { EmptyState } from "@/features/dashboard/components/empty-state";

export function GoalProgress({ goals }: { goals: DashboardGoal[] }) {
  const activeGoals = goals.filter((goal) => goal.status === "active");

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Mục tiêu của bạn</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Tiếp tục tiến về phía trước</p>
        </div>
        <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
          {activeGoals.length} đang thực hiện
        </span>
      </div>

      {activeGoals.length === 0 ? (
        <EmptyState
          icon="target"
          title="Chưa có mục tiêu đang thực hiện"
          description="Tạo một mục tiêu nhỏ để bắt đầu hành trình của bạn."
        />
      ) : (
        <div className="space-y-5">
          {activeGoals.map((goal) => {
            const progress = goalDone(goal.completedTasks, goal.totalTasks);

            return (
              <div key={goal.id}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {goal.title}
                  </p>
                  <span className="shrink-0 text-[10px] font-bold text-indigo-600 dark:text-indigo-300">
                    {progress}%
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label={`Tiến độ mục tiêu: ${goal.title}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-slate-400">
                  {goal.completedTasks}/{goal.totalTasks} nhiệm vụ hoàn thành
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
