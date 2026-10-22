import type { Metadata } from "next";
import { PublicContentPage } from "@/components/layout/public-site";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Thông tin hỗ trợ và liên hệ StudyFlow.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PublicContentPage
      eyebrow="Liên hệ"
      title="Chúng tôi muốn lắng nghe bạn"
      description="Kênh hỗ trợ trực tiếp sẽ được công bố trước khi StudyFlow mở đăng ký chính thức. Trong thời gian thử nghiệm, vui lòng liên hệ người quản lý dự án qua kênh bạn nhận được lời mời."
    >
      <section className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
        <h2 className="text-sm font-bold">Góp ý sản phẩm</h2>
        <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
          Gửi nhận xét về trải nghiệm, lỗi bạn gặp hoặc tính năng bạn muốn thấy. Không gửi mật khẩu hay khóa truy cập trong nội dung góp ý.
        </p>
      </section>
    </PublicContentPage>
  );
}
