import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthPage } from "@/features/auth/components/auth-page";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Đặt lại mật khẩu" };

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
          Đang xác minh liên kết khôi phục...
        </main>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}

async function ResetPasswordContent() {
  await requireUser();
  return <AuthPage mode="reset-password" />;
}
