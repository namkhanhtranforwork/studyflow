"use server";

import { redirect } from "next/navigation";
import { changePasswordSchema, loginSchema, registerSchema, requestPasswordResetSchema } from "@/features/auth/schemas";
import { getSiteUrl, hasSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export interface AuthActionState {
  error?: string;
  success?: string;
}

function missingConfigState(): AuthActionState {
  return {
    error: "Đăng nhập chưa được cấu hình. Vui lòng thử lại sau.",
  };
}

function safeNextPath(value: FormDataEntryValue | null): string {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\")
  ) {
    return value;
  }

  return "/app";
}

export async function signIn(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Thông tin đăng nhập chưa hợp lệ." };
  }

  if (!hasSupabaseConfig()) {
    return missingConfigState();
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    console.error("Supabase sign-in failed:", error.message);
    return { error: "Email hoặc mật khẩu không đúng." };
  }

  redirect(safeNextPath(formData.get("next")));
}

export async function signUp(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Thông tin đăng ký chưa hợp lệ." };
  }

  if (!hasSupabaseConfig()) {
    return missingConfigState();
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/app`,
      data: { display_name: parsed.data.displayName },
    },
  });

  if (error) {
    console.error("Supabase sign-up failed:", error.message);
    return {
      error:
        error.code === "user_already_exists"
          ? "Email này đã được đăng ký. Hãy đăng nhập hoặc khôi phục mật khẩu."
          : "Chưa thể tạo tài khoản. Vui lòng kiểm tra thông tin và thử lại.",
    };
  }

  if (data.session) {
    redirect("/app");
  }

  return {
    success: "Tài khoản đã được tạo. Hãy kiểm tra email để xác nhận trước khi đăng nhập.",
  };
}

export async function requestPasswordReset(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = requestPasswordResetSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Nhập địa chỉ email hợp lệ." };
  }

  if (!hasSupabaseConfig()) {
    return missingConfigState();
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${getSiteUrl()}/auth/callback?next=/reset-password`,
  });

  if (error) {
    console.error("Supabase password-reset request failed:", error.message);
    return { error: "Chưa thể gửi email khôi phục. Vui lòng thử lại sau." };
  }

  return {
    success: "Nếu email thuộc một tài khoản, hướng dẫn khôi phục sẽ được gửi đến hộp thư.",
  };
}

export async function changePassword(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = changePasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Mật khẩu chưa hợp lệ." };
  }

  if (!hasSupabaseConfig()) {
    return missingConfigState();
  }

  const supabase = await createClient();
  const { data, error: userError } = await supabase.auth.getUser();

  if (userError || !data.user) {
    if (userError) {
      console.error("Could not verify password-reset session:", userError.message);
    }
    return { error: "Liên kết khôi phục không còn hợp lệ. Hãy yêu cầu liên kết mới." };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    console.error("Supabase password update failed:", error.message);
    return { error: "Chưa thể cập nhật mật khẩu. Vui lòng thử lại." };
  }

  redirect("/app");
}

export async function signOut(): Promise<void> {
  if (!hasSupabaseConfig()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Supabase sign-out failed:", error.message);
    throw new Error("Chưa thể đăng xuất. Vui lòng thử lại.");
  }

  redirect("/login");
}
