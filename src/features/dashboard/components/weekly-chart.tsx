import type { DailyStudy } from "@/features/dashboard/sample-data";

export function WeeklyChart({ days }: { days: DailyStudy[] }) {
  const maxMinutes = Math.max(...days.map((day) => day.minutes), 1);
  const total = days.reduce((sum, day) => sum + day.minutes, 0);
  const chartDescription = days
    .map((day) => `${day.date}: ${day.minutes} phút`)
    .join(", ");

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">Thời gian học</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">7 ngày gần nhất</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-extrabold text-slate-900 dark:text-white">{total}</p>
          <p className="text-[10px] text-slate-400">phút tổng cộng</p>
        </div>
      </div>

      <div
        role="img"
        aria-label={`Biểu đồ thời gian học trong 7 ngày gần nhất. ${chartDescription}`}
        className="grid h-40 grid-cols-7 items-end gap-2 sm:h-48 sm:gap-4"
      >
        {days.map((day) => {
          const height = day.minutes > 0 ? Math.max((day.minutes / maxMinutes) * 100, 8) : 0;

          return (
            <div key={day.date} className="flex h-full min-w-0 flex-col items-center justify-end gap-2">
              <span className="h-4 text-[9px] font-semibold text-slate-400">
                {day.minutes > 0 ? day.minutes : ""}
              </span>
              <div className="flex h-[calc(100%-24px)] w-full items-end">
                <div
                  className={`w-full rounded-t-md transition-all ${
                    day.minutes > 0
                      ? "bg-indigo-500 hover:bg-indigo-600"
                      : "h-1 rounded-full bg-slate-100 dark:bg-slate-700"
                  }`}
                  style={day.minutes > 0 ? { height: `${height}%` } : undefined}
                />
              </div>
              <span className="text-[9px] font-medium capitalize text-slate-400 sm:text-[10px]">
                {day.label.replace(".", "")}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
