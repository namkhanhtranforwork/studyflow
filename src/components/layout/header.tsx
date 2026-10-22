import { Icon } from "@/components/icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { signOut } from "@/features/auth/actions";
import Link from "next/link";

function getDateLabel(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12));

  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    }).format(new Date()),
  );

  if (hour < 12) return "Chào buổi sáng";
  if (hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

export function Header({
  today,
  displayName,
}: {
  today: string;
  displayName?: string | null;
}) {
  return (
    <header className="mb-7 flex items-center justify-between gap-4">
      <div>
        <p className="mb-1 text-xs font-medium capitalize text-slate-500 dark:text-slate-400">
          {getDateLabel(today)}
        </p>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          {getGreeting()}, bạn nhé <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-1 hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
          Cùng xem hành trình học tập của bạn hôm nay.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />
        <Link
          href="/app/settings"
          aria-label="Mở cài đặt tài khoản"
          className="flex size-10 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
        >
          {Array.from(displayName?.trim() ?? "")[0]?.toLocaleUpperCase("vi") ?? "A"}
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg px-2 py-2 text-[11px] font-semibold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
          >
            Đăng xuất
          </button>
        </form>
        <Icon
          name="chevron-down"
          size={16}
          className="hidden text-slate-400 sm:block"
        />
      </div>
    </header>
  );
}
