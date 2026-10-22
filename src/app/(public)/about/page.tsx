import type { Metadata } from "next";
import { PublicContentPage } from "@/components/layout/public-site";

export const metadata: Metadata = {
  title: "Về StudyFlow",
  description: "Tìm hiểu về cách StudyFlow hỗ trợ bạn tiến bộ từng bước.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PublicContentPage
      eyebrow="Về StudyFlow"
      title="Một không gian rõ ràng cho những điều bạn muốn làm"
      description="StudyFlow được xây dựng để giúp người học và người làm việc độc lập biến mục tiêu thành các bước nhỏ, theo dõi tiến độ và điều chỉnh kế hoạch khi cần."
    >
      <section className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-900">
        <h2 className="text-sm font-bold">Cách chúng tôi tiếp cận</h2>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
          Ưu tiên sự tập trung, tiến độ dễ hiểu và quyền kiểm soát dữ liệu cá nhân. Không cần một kế hoạch hoàn hảo để bắt đầu; một bước phù hợp cũng đủ tạo đà.
        </p>
      </section>
    </PublicContentPage>
  );
}
