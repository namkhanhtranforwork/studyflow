import { Icon } from "@/components/icons";
import type { StudyLog } from "@/features/dashboard/sample-data";
import { formatMinutes } from "@/features/dashboard/lib/stats";
import { EmptyState } from "@/features/dashboard/components/empty-state";

function formatLogDate(dateKey: string, today: string) {
  if (dateKey === today) return "Hôm nay";

  const [year, month, day] = dateKey.split("-").map(Number);
  const weekday = new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    timeZone: "UTC",
  })
    .format(new Date(Date.UTC(year, month - 1, day, 12)))
    .replace(".", "");

  return `${weekday}, ${day}/${month}`;
}

export function RecentLogs({
  logs,
  today,
}: {
  logs: StudyLog[];
  today: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Nhật ký học gần đây</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Những bước tiến của bạn</p>
      </div>
      {logs.length === 0 ? (
        <EmptyState
          icon="book"
          title="Chưa có nhật ký học"
          description="Ghi lại phiên học đầu tiên để theo dõi tiến độ nhé."
        />
      ) : (
        <ul className="space-y-2.5">
          {logs.slice(0, 5).map((log) => (
            <li key={log.id} className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-3 dark:bg-slate-800/60">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm dark:bg-slate-700 dark:text-indigo-300">
                <Icon name="book" size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {log.note || "Phiên học"}
                </p>
                <p className="mt-1 text-[10px] text-slate-400">{formatLogDate(log.date, today)}</p>
              </div>
              <span className="shrink-0 text-[10px] font-bold text-indigo-600 dark:text-indigo-300">
                {formatMinutes(log.minutes)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
