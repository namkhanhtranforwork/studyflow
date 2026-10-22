import type { Metadata } from "next";
import { AuthPage } from "@/features/auth/components/auth-page";

export const metadata: Metadata = { title: "Đăng ký tài khoản" };

export default function RegisterPage() {
  return <AuthPage mode="register" />;
}
