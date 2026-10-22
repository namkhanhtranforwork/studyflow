import { Icon, type IconName } from "@/components/icons";

export interface StatItem {
  label: string;
  value: string;
  detail: string;
  icon: IconName;
  tone: "indigo" | "emerald" | "orange" | "violet";
}

const tones = {
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
};

export function StatCards({ stats }: { stats: StatItem[] }) {
  return (
    <section aria-label="Tổng quan chỉ số" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.025)] dark:border-slate-800 dark:bg-slate-900 sm:p-5"
        >
          <div className="mb-4 flex items-start justify-between gap-2">
            <p className="text-[11px] font-semibold leading-4 text-slate-500 dark:text-slate-400 sm:text-xs">
              {stat.label}
            </p>
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${tones[stat.tone]}`}>
              <Icon name={stat.icon} size={17} />
            </span>
          </div>
          <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-[28px]">
            {stat.value}
          </p>
          <p className="mt-1 text-[10px] font-medium text-slate-400 sm:text-[11px]">
            {stat.detail}
          </p>
        </article>
      ))}
    </section>
  );
}
