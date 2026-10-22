"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";

const links: { href: string; label: string; icon: IconName }[] = [
  { href: "/app", label: "Tổng quan", icon: "grid" },
  { href: "/app/goals", label: "Mục tiêu", icon: "target" },
  { href: "/app/tasks", label: "Nhiệm vụ", icon: "check-circle" },
  { href: "/app/study", label: "Ghi nhận học", icon: "book" },
  { href: "/app/stats", label: "Thống kê", icon: "trend" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const visibleLinks = isAdmin
    ? [...links, { href: "/admin", label: "Quản trị", icon: "users" as const }]
    : links;

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[252px] flex-col border-r border-slate-200/80 bg-white px-5 py-7 dark:border-slate-800 dark:bg-slate-900 min-[900px]:flex">
      <Link href="/" className="mb-10 flex items-center gap-3 px-2">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
          <Icon name="sparkles" size={22} />
        </span>
        <span className="text-[19px] font-extrabold tracking-tight text-slate-900 dark:text-white">
          study<span className="text-indigo-600">flow</span>
        </span>
      </Link>

      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
        Không gian học tập
      </p>
      <nav aria-label="Điều hướng chính" className="flex flex-col gap-1.5">
        {visibleLinks.map((link) => {
          const active = isActive(pathname, link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`flex h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-semibold transition ${
                active
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              <Icon name={link.icon} size={18} />
              {link.label}
              {active && (
                <span className="ml-auto size-1.5 rounded-full bg-indigo-600" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-4 text-white">
        <span className="mb-3 flex size-9 items-center justify-center rounded-xl bg-white/15">
          <Icon name="trophy" size={19} />
        </span>
        <p className="text-sm font-bold">Mỗi ngày một chút</p>
        <p className="mt-1 text-xs leading-5 text-indigo-100">
          Tiến bộ nhỏ hôm nay tạo nên khác biệt ngày mai.
        </p>
      </div>
    </aside>
  );
}

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Điều hướng chính"
      className="safe-bottom fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200/80 bg-white/95 px-2 pt-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 min-[900px]:hidden"
    >
      {links.map((link) => {
        const active = isActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
              active ? "text-indigo-600 dark:text-indigo-300" : "text-slate-400"
            }`}
          >
            <Icon name={link.icon} size={19} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
