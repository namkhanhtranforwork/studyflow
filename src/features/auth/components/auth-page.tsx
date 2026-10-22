import Link from "next/link";
import { Icon } from "@/components/icons";
import { AuthForm } from "@/features/auth/components/auth-form";

const copy = {
  login: {
    eyebrow: "Chào mừng trở lại",
    title: "Tiếp tục hành trình của bạn",
    description: "Đăng nhập để xem mục tiêu và kế hoạch đang theo đuổi.",
  },
  register: {
    eyebrow: "Bắt đầu miễn phí",
    title: "Tạo không gian học tập của bạn",
    description: "Chia mục tiêu lớn thành những bước nhỏ, rõ ràng và dễ thực hiện.",
  },
  "forgot-password": {
    eyebrow: "Khôi phục tài khoản",
    title: "Đặt lại mật khẩu",
    description: "Nhập email đã đăng ký để nhận hướng dẫn khôi phục.",
  },
  "reset-password": {
    eyebrow: "Bảo mật tài khoản",
    title: "Tạo mật khẩu mới",
    description: "Chọn mật khẩu mới để tiếp tục sử dụng StudyFlow.",
  },
} as const;

export function AuthPage({
  mode,
  nextPath,
  setupRequired,
  initialError,
}: {
  mode: keyof typeof copy;
  nextPath?: string;
  setupRequired?: boolean;
  initialError?: string;
}) {
  const content = copy[mode];

  return (
    <main className="grid min-h-screen bg-white dark:bg-slate-950 lg:grid-cols-[1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-28 -top-24 size-[460px] rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-8 size-[320px] rounded-full border border-white/10" />
        <div className="absolute -bottom-32 -left-24 size-[420px] rounded-full bg-violet-500/30 blur-3xl" />
        <Link href="/" className="relative flex w-fit items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-white/15">
            <Icon name="sparkles" size={22} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">studyflow</span>
        </Link>
        <div className="relative max-w-xl py-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
            Không gian cho điều bạn muốn đạt được
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
            Học tập và làm việc, từng bước một.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-indigo-100">
            Gom mục tiêu, nhiệm vụ và tiến độ vào một nơi dễ nhìn, dễ bắt đầu.
          </p>
        </div>
        <p className="relative text-xs text-indigo-200">StudyFlow · Tiến bộ theo cách của bạn</p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-12 xl:px-20">
        <Link href="/" className="flex w-fit items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white lg:hidden">
          <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Icon name="sparkles" size={19} />
          </span>
          study<span className="-ml-2 text-indigo-600">flow</span>
        </Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-300">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {content.title}
          </h2>
          <p className="mt-2 mb-7 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {content.description}
          </p>
          <AuthForm
            mode={mode}
            nextPath={nextPath}
            setupRequired={setupRequired}
            initialError={initialError}
          />
        </div>
        <p className="text-center text-[11px] leading-5 text-slate-400">
          Bằng việc tiếp tục, bạn đồng ý với{" "}
          <Link href="/terms" className="underline underline-offset-2">Điều khoản sử dụng</Link>
          {" "}và{" "}
          <Link href="/privacy" className="underline underline-offset-2">Chính sách bảo mật</Link>.
        </p>
      </section>
    </main>
  );
}
