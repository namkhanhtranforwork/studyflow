import { z } from "zod";

export const quickStudyLogSchema = z.object({
  minutes: z.coerce
    .number()
    .int("Số phút phải là số nguyên.")
    .min(1, "Thời gian học tối thiểu là 1 phút.")
    .max(1440, "Thời gian học tối đa là 1440 phút."),
  note: z
    .string()
    .trim()
    .max(120, "Ghi chú không được dài quá 120 ký tự."),
});

export type QuickStudyLogInput = z.infer<typeof quickStudyLogSchema>;
