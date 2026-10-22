import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

const publicLinks = [
  { href: "/features", label: "Tính năng" },
  { href: "/about", label: "Về StudyFlow" },
  { href: "/faq", label: "Câu hỏi thường gặp" },
];

export function PublicSite({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Icon name="sparkles" size={19} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              study<span className="text-indigo-600">flow</span>
            </span>
          </Link>
          <nav aria-label="Điều hướng công khai" className="hidden items-center gap-7 md:flex">
            {publicLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs font-semibold text-slate-600 transition hover:text-indigo-600 dark:text-slate-300">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2.5">
            <Link href="/login" className="rounded-xl px-3 py-2 text-xs font-bold text-slate-600 transition hover:text-indigo-600 dark:text-slate-300">
              Đăng nhập
            </Link>
            <Link href="/register" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700">
              Bắt đầu miễn phí
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-slate-100 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto]">
          <div>
            <Link href="/" className="text-base font-extrabold tracking-tight">
              study<span className="text-indigo-600">flow</span>
            </Link>
            <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
              Một không gian rõ ràng để biến điều bạn muốn làm thành những bước có thể bắt đầu.
            </p>
          </div>
          <nav aria-label="Liên kết cuối trang" className="flex flex-wrap items-start gap-x-5 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link href="/contact" className="hover:text-indigo-600">Liên hệ</Link>
            <Link href="/terms" className="hover:text-indigo-600">Điều khoản</Link>
            <Link href="/privacy" className="hover:text-indigo-600">Quyền riêng tư</Link>
          </nav>
          <p className="text-[10px] text-slate-400 md:col-span-2">
            StudyFlow. Tiến bộ theo cách của bạn.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function PublicContentPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <PublicSite>
      <main className="mx-auto min-h-[55vh] max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.17em] text-indigo-600 dark:text-indigo-300">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        <div className="mt-10 space-y-8">{children}</div>
      </main>
    </PublicSite>
  );
}
