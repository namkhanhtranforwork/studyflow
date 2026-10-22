import { z } from "zod";

const optionalDate = z.preprocess(
  (value) => (value === "" || value === null ? null : value),
  z.union([z.iso.date(), z.null()]),
);

export const goalSchema = z.object({
  title: z.string().trim().min(1, "Nhập tên mục tiêu.").max(120, "Tên mục tiêu tối đa 120 ký tự."),
  description: z
    .string()
    .trim()
    .max(2000, "Mô tả tối đa 2000 ký tự.")
    .transform((value) => value || null),
  category: z.enum(["study", "work"], {
    error: "Chọn loại mục tiêu hợp lệ.",
  }),
  startDate: optionalDate,
  targetDate: optionalDate,
});

export const updateGoalSchema = goalSchema.extend({
  id: z.uuid("Mục tiêu không hợp lệ."),
});

export const goalStatusSchema = z.object({
  id: z.uuid("Mục tiêu không hợp lệ."),
  status: z.enum(["active", "completed", "archived"]),
});

export type GoalInput = z.infer<typeof goalSchema>;
export type GoalUpdateInput = z.infer<typeof updateGoalSchema>;
