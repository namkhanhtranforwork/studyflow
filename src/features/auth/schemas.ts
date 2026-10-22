import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Nhập địa chỉ email hợp lệ.")
  .max(254, "Email quá dài.");

const passwordSchema = z
  .string()
  .min(8, "Mật khẩu cần có ít nhất 8 ký tự.")
  .max(72, "Mật khẩu không được dài quá 72 ký tự.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Vui lòng nhập mật khẩu."),
});

export const registerSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Tên hiển thị cần có ít nhất 2 ký tự.")
    .max(80, "Tên hiển thị không được dài quá 80 ký tự."),
  email: emailSchema,
  password: passwordSchema,
});

export const requestPasswordResetSchema = z.object({
  email: emailSchema,
});

export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận chưa khớp.",
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
