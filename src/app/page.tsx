import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { PublicSite } from "@/components/layout/public-site";

export const metadata: Metadata = {
  title: "StudyFlow — Biến mục tiêu thành tiến bộ mỗi ngày",
  description:
    "Lập kế hoạch học tập và công việc, chia mục tiêu thành nhiệm vụ nhỏ và theo dõi tiến độ trong một không gian tập trung.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "StudyFlow — Tiến bộ theo cách của bạn",
    description: "Mục tiêu rõ ràng. Từng bước nhỏ. Tiến bộ bền vững.",
    type: "website",
  },
};

const features = [
  {
    icon: "target" as const,
    title: "Mục tiêu có định hướng",
    description: "Xác định điều bạn muốn đạt được và thời điểm bạn muốn hoàn thành.",
  },
  {
    icon: "check-circle" as const,
    title: "Nhiệm vụ vừa sức",
    description: "Biến mục tiêu lớn thành những việc cụ thể, có thời hạn rõ ràng.",
  },
  {
    icon: "trend" as const,
    title: "Tiến độ dễ theo dõi",
    description: "Nhìn lại việc đang làm, việc đã xong và bước tiếp theo cần ưu tiên.",
  },
];

export default function HomePage() {
  return (
    <PublicSite>
      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-violet-50/60 dark:from-indigo-950/60 dark:via-slate-950 dark:to-slate-950">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-[11px] font-bold text-indigo-700 shadow-sm dark:border-indigo-500/25 dark:bg-slate-900 dark:text-indigo-200">
                <Icon name="sparkles" size={14} />
                Không gian cho mục tiêu của bạn
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-[58px]">
                Biến mục tiêu thành{" "}
                <span className="text-indigo-600 dark:text-indigo-300">tiến bộ</span>{" "}
                mỗi ngày.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">
                Lập kế hoạch học tập và công việc, chia việc lớn thành bước nhỏ, rồi theo dõi hành trình trong một nơi gọn gàng.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/register" className="inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 dark:shadow-none">
                  Bắt đầu miễn phí
                  <Icon name="arrow-up-right" size={17} />
                </Link>
                <Link href="/features" className="inline-flex h-12 items-center rounded-xl border border-slate-200 bg-white/80 px-5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  Khám phá tính năng
                </Link>
              </div>
              <p className="mt-4 text-[11px] text-slate-400">Miễn phí để bắt đầu · Không cần thẻ thanh toán</p>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-indigo-200/60 to-violet-200/40 blur-2xl dark:from-indigo-500/15 dark:to-violet-500/10" />
              <div className="relative rounded-[26px] border border-white bg-white p-5 shadow-[0_24px_90px_rgba(59,49,130,0.16)] dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Không gian của bạn</p>
                    <h2 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">Tiến độ tuần này</h2>
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                    <Icon name="trend" size={20} />
                  </span>
                </div>
                <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Hoàn thành khóa học</p>
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-300">60%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                  </div>
                  <p className="mt-2 text-[10px] text-slate-400">6 trên 10 nhiệm vụ hoàn thành</p>
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    { label: "Ôn lại kiến thức hôm nay", done: true },
                    { label: "Hoàn thành bài tập tiếp theo", done: false },
                    { label: "Chuẩn bị kế hoạch ngày mai", done: false },
                  ].map((task) => (
                    <div key={task.label} className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3 dark:border-slate-800">
                      <span className={`flex size-5 items-center justify-center rounded-md border ${task.done ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 text-transparent dark:border-slate-600"}`}>
                        {task.done && <Icon name="check" size={13} />}
                      </span>
                      <span className={`text-xs font-semibold ${task.done ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-200"}`}>{task.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-indigo-50/80 px-3.5 py-3 dark:bg-indigo-500/10">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white text-indigo-600 dark:bg-slate-800 dark:text-indigo-300">
                    <Icon name="sparkles" size={16} />
                  </span>
                  <p className="text-[11px] font-semibold text-indigo-900 dark:text-indigo-100">Mỗi bước nhỏ đều đưa bạn tiến lên.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">Ít rối hơn, tập trung hơn</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Một cách rõ ràng để bắt đầu và tiếp tục</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Không cần kế hoạch hoàn hảo. Chỉ cần biết bước tiếp theo của bạn là gì.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <article key={feature.title} className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                  <Icon name={feature.icon} size={19} />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">0{index + 1}</p>
                <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-5 mb-16 rounded-[28px] bg-slate-950 px-6 py-12 text-center text-white sm:mx-8 sm:px-10 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">Bắt đầu từ hôm nay</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Điều bạn muốn đạt được xứng đáng có một kế hoạch.</h2>
          <Link href="/register" className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50">
            Tạo tài khoản miễn phí
            <Icon name="arrow-up-right" size={16} />
          </Link>
        </section>
      </main>
    </PublicSite>
  );
}
