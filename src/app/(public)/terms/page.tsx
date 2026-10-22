import type { Metadata } from "next";
import { PublicContentPage } from "@/components/layout/public-site";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description: "Điều khoản sử dụng dịch vụ StudyFlow.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PublicContentPage
      eyebrow="Pháp lý"
      title="Điều khoản sử dụng"
      description="Bản dự thảo điều khoản cho giai đoạn thử nghiệm MVP; cần được rà soát pháp lý trước khi dịch vụ được phát hành chính thức."
    >
      <section>
        <h2 className="text-sm font-bold">Sử dụng dịch vụ</h2>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
          Bạn chịu trách nhiệm bảo vệ thông tin đăng nhập và chỉ sử dụng StudyFlow cho mục đích hợp pháp. Không cố truy cập trái phép dữ liệu, tài khoản hoặc hệ thống của người khác.
        </p>
      </section>
      <section>
        <h2 className="text-sm font-bold">Tài khoản và dữ liệu</h2>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
          Bạn có thể quản lý mục tiêu, nhiệm vụ và thông tin hồ sơ trong tài khoản của mình. Không nhập thông tin nhạy cảm không cần thiết vào nội dung mục tiêu hoặc nhiệm vụ.
        </p>
      </section>
      <section>
        <h2 className="text-sm font-bold">Thay đổi dịch vụ</h2>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
          StudyFlow đang trong giai đoạn MVP. Tính năng, khả năng truy cập và các điều khoản có thể được cập nhật; thay đổi quan trọng cần được thông báo phù hợp trước khi áp dụng.
        </p>
      </section>
    </PublicContentPage>
  );
}
