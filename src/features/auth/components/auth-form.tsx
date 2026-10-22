"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  changePassword,
  requestPasswordReset,
  signIn,
  signUp,
  type AuthActionState,
} from "@/features/auth/actions";

type AuthMode = "login" | "register" | "forgot-password" | "reset-password";

const actions = {
  login: signIn,
  register: signUp,
  "forgot-password": requestPasswordReset,
  "reset-password": changePassword,
};

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-500/15";

export function AuthForm({
  mode,
  nextPath = "/app",
  setupRequired = false,
  initialError,
}: {
  mode: AuthMode;
  nextPath?: string;
  setupRequired?: boolean;
  initialError?: string;
}) {
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
    actions[mode],
    initialError ? { error: initialError } : {},
  );
  const isRegister = mode === "register";
  const isLogin = mode === "login";
  const isResetRequest = mode === "forgot-password";
  const isResetPassword = mode === "reset-password";
  const submitLabel = isRegister
    ? "Tạo tài khoản"
    : isLogin
      ? "Đăng nhập"
      : isResetRequest
        ? "Gửi hướng dẫn"
        : "Cập nhật mật khẩu";

  return (
    <form action={formAction} className="space-y-4">
      {setupRequired && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          Cần cấu hình Supabase trong môi trường ứng dụng trước khi sử dụng tài khoản.
        </p>
      )}

      {isRegister && (
        <div>
          <label htmlFor="displayName" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Tên hiển thị
          </label>
          <input id="displayName" name="displayName" autoComplete="name" required minLength={2} maxLength={80} className={inputClass} placeholder="Tên của bạn" />
        </div>
      )}

      {!isResetPassword && (
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} placeholder="ban@email.com" />
        </div>
      )}

      {(isLogin || isRegister || isResetPassword) && (
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
            {isResetPassword ? "Mật khẩu mới" : "Mật khẩu"}
          </label>
          <input id="password" name="password" type="password" autoComplete={isLogin ? "current-password" : "new-password"} required minLength={isLogin ? 1 : 8} maxLength={72} className={inputClass} placeholder={isLogin ? "Nhập mật khẩu" : "Ít nhất 8 ký tự"} />
        </div>
      )}

      {isResetPassword && (
        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Nhập lại mật khẩu mới
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} maxLength={72} className={inputClass} placeholder="Nhập lại mật khẩu" />
        </div>
      )}

      {isLogin && <input type="hidden" name="next" value={nextPath} />}

      {state.error && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-65"
      >
        {pending ? "Đang xử lý..." : submitLabel}
      </button>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
        {isLogin && (
          <>
            <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300">
              Quên mật khẩu?
            </Link>
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300">
              Tạo tài khoản
            </Link>
          </>
        )}
        {isRegister && (
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300">
            Đã có tài khoản? Đăng nhập
          </Link>
        )}
        {(isResetRequest || isResetPassword) && (
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300">
            Quay lại đăng nhập
          </Link>
        )}
      </div>
    </form>
  );
}
