export function DashboardSkeleton() {
  return (
    <div aria-label="Đang tải tổng quan" role="status" className="space-y-5">
      <div className="h-20 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800" />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800" />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="h-72 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800" />
        <div className="h-72 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800" />
      </div>
    </div>
  );
}
