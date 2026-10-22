import type { Metadata } from "next";
import { PublicContentPage } from "@/components/layout/public-site";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: "Thông tin về quyền riêng tư và dữ liệu trong StudyFlow.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PublicContentPage
      eyebrow="Pháp lý"
      title="Chính sách bảo mật"
      description="Thông tin dưới đây mô tả dự kiến xử lý dữ liệu trong MVP và cần được đối chiếu với cấu hình triển khai thực tế trước khi mở dịch vụ."
    >
      <section>
        <h2 className="text-sm font-bold">Dữ liệu được sử dụng</h2>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
          StudyFlow cần địa chỉ email để xác thực tài khoản; tên hiển thị, múi giờ, mục tiêu và nhiệm vụ do bạn tạo để cung cấp chức năng quản lý kế hoạch.
        </p>
      </section>
      <section>
        <h2 className="text-sm font-bold">Quyền truy cập</h2>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
          Quy tắc truy cập cơ sở dữ liệu giới hạn mục tiêu và nhiệm vụ cho chủ sở hữu. Quyền Admin được giới hạn theo nhu cầu vận hành; Admin không mặc nhiên xem nội dung riêng tư của bạn.
        </p>
      </section>
      <section>
        <h2 className="text-sm font-bold">Lưu trữ và yêu cầu dữ liệu</h2>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
          Thời hạn lưu trữ, quy trình xuất/xóa dữ liệu và thông tin nhà cung cấp hạ tầng cần được xác nhận trước khi phát hành chính thức.
        </p>
      </section>
    </PublicContentPage>
  );
}
