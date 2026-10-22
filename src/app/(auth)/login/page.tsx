import { Suspense } from "react";
import { AuthPage } from "@/features/auth/components/auth-page";

type LoginPageProps = {
  searchParams: Promise<{ next?: string; setup?: string; error?: string }>;
};

export default function LoginPage(props: LoginPageProps) {
  return (
    <Suspense fallback={<AuthPage mode="login" />}>
      <LoginContent {...props} />
    </Suspense>
  );
}

async function LoginContent({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <AuthPage
      mode="login"
      nextPath={params.next}
      setupRequired={params.setup === "required"}
      initialError={
        params.error === "confirmation-failed"
          ? "Liên kết xác nhận không hợp lệ hoặc đã hết hạn. Hãy đăng ký lại hoặc yêu cầu liên kết mới."
          : undefined
      }
    />
  );
}
