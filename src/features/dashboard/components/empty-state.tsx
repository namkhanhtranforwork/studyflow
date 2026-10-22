import { Icon, type IconName } from "@/components/icons";

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: IconName;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center px-4 py-6 text-center">
      <span className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-300">
        <Icon name={icon} size={20} />
      </span>
      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{title}</p>
      <p className="mt-1 max-w-56 text-[10px] leading-4 text-slate-400">{description}</p>
    </div>
  );
}
