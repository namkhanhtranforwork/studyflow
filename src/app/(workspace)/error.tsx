"use client";

import { useEffect } from "react";
import { Icon } from "@/components/icons";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("StudyFlow workspace error:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
      <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-500/10">
        <Icon name="activity" size={23} />
      </span>
      <h1 className="text-lg font-bold text-slate-900 dark:text-white">Chưa thể tải không gian của bạn</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Kiểm tra kết nối rồi thử lại. Dữ liệu cá nhân vẫn được bảo vệ.</p>
      <button type="button" onClick={reset} className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Thử lại</button>
    </main>
  );
}
