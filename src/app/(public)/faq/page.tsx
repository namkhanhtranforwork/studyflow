import type { Metadata } from "next";
import { PublicContentPage } from "@/components/layout/public-site";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp",
  description: "Câu trả lời về mục tiêu, nhiệm vụ và cách sử dụng StudyFlow.",
  alternates: { canonical: "/faq" },
};

const questions = [
  ["StudyFlow dùng để làm gì?", "StudyFlow giúp bạn lập mục tiêu học tập hoặc công việc, chia mục tiêu thành nhiệm vụ và theo dõi tiến độ."],
  ["Tôi có thể quản lý cả mục tiêu cá nhân và công việc không?", "Có. Mục tiêu có thể được phân loại là học tập hoặc công việc."],
  ["Tôi có cần trả phí để bắt đầu không?", "Phiên bản MVP hiện chưa có thanh toán. Bạn có thể tạo tài khoản để trải nghiệm các chức năng được triển khai."],
  ["Dữ liệu của tôi có riêng tư không?", "Mỗi tài khoản chỉ được phép truy cập dữ liệu của chính mình. Quyền truy cập của Admin được giới hạn theo chính sách bảo mật của sản phẩm."],
];

export default function FaqPage() {
  return (
    <PublicContentPage
      eyebrow="Trợ giúp"
      title="Câu hỏi thường gặp"
      description="Một vài thông tin nhanh để bạn bắt đầu với StudyFlow."
    >
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {questions.map(([question, answer]) => (
          <article key={question} className="py-5 first:pt-0">
            <h2 className="text-sm font-bold">{question}</h2>
            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">{answer}</p>
          </article>
        ))}
      </div>
    </PublicContentPage>
  );
}
