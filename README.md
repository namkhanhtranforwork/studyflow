# StudyFlow

StudyFlow là ứng dụng tiếng Việt giúp quản lý mục tiêu, nhiệm vụ và nhật ký học tập. Website công khai có nội dung giới thiệu; mỗi người dùng đã đăng nhập có workspace riêng, còn trang quản trị chỉ xem hồ sơ cơ bản và không truy cập nội dung cá nhân.

## Phát triển cục bộ

1. Cài dependencies và tạo `.env.local` từ `.env.example`.
2. Thay giá trị Supabase bằng URL và publishable key của project.
3. Chạy migrations theo thứ tự trong SQL Editor của Supabase trên project development.
4. Chạy ứng dụng:

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Không đưa secret/service-role key vào biến `NEXT_PUBLIC_*` hoặc bundle trình duyệt.

### Cấu hình Supabase Auth

- Thêm `http://localhost:3000/auth/callback` vào danh sách redirect URLs của Supabase Auth; bổ sung URL production khi triển khai.
- Đăng ký yêu cầu xác nhận email nếu bật xác minh email trong Supabase.
- Admin được cấp thủ công bởi người có quyền database, ví dụ cập nhật `profiles.role` cho đúng UUID. Không có chức năng tự nâng quyền trong ứng dụng.
- Admin chỉ đọc danh sách hồ sơ (`display_name`, vai trò, ngày tạo); RLS không cho Admin xem hoặc sửa mục tiêu, nhiệm vụ, nhật ký học của người khác.

### Kiểm thử RLS

`supabase/tests/rls.sql` là kịch bản thủ công cho project development. Tạo hai user thường và một Admin cùng các goal/task/study-log fixture như hướng dẫn đầu file, thay toàn bộ UUID placeholder, rồi chạy bằng database owner. Kịch bản rollback các thay đổi kiểm thử.

## Kiểm tra

```bash
npm run lint
npm test
npm run build
```

## Cấu trúc chính

- `src/app/`: website công khai, auth, workspace `/app/*` và `/admin`.
- `src/features/`: UI, validation, actions và truy cập dữ liệu theo tính năng.
- `src/lib/supabase/`: Supabase SSR clients, session proxy và database types.
- `supabase/migrations/`: schema và RLS theo thứ tự tăng dần.
- `supabase/tests/rls.sql`: kịch bản kiểm thử RLS thủ công trên project development.
