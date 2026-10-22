import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { PublicContentPage } from "@/components/layout/public-site";

export const metadata: Metadata = {
  title: "Tính năng",
  description:
    "Khám phá cách StudyFlow giúp bạn tổ chức mục tiêu, nhiệm vụ và tiến độ học tập hoặc công việc.",
  alternates: { canonical: "/features" },
};

const items = [
  ["target", "Mục tiêu có cấu trúc", "Phân loại mục tiêu học tập hoặc công việc, thêm mô tả, ngày bắt đầu và hạn hoàn thành."],
  ["check-circle", "Nhiệm vụ theo từng mục tiêu", "Tách một mục tiêu thành những việc cụ thể, có trạng thái và ngày đến hạn."],
  ["trend", "Dashboard cá nhân", "Theo dõi mục tiêu đang thực hiện, nhiệm vụ sắp tới và tiến độ trong một màn hình."],
  ["book", "Nhật ký học tập", "Ghi lại thời gian học và xem lại những phiên gần đây để duy trì nhịp học."],
] as const;

export default function FeaturesPage() {
  return (
    <PublicContentPage
      eyebrow="Tính năng"
      title="Tập trung vào bước tiếp theo"
      description="StudyFlow kết hợp mục tiêu, nhiệm vụ và tiến độ để việc bắt đầu trở nên rõ ràng hơn."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(([icon, title, description]) => (
          <article key={title} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
              <Icon name={icon} size={20} />
            </span>
            <h2 className="mt-4 text-sm font-bold">{title}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
          </article>
        ))}
      </div>
    </PublicContentPage>
  );
}
