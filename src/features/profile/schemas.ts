import { z } from "zod";

const timeZones = new Set([
  "UTC",
  ...Intl.supportedValuesOf("timeZone"),
]);

export const profileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Tên hiển thị cần có ít nhất 2 ký tự.")
    .max(80, "Tên hiển thị tối đa 80 ký tự."),
  timezone: z.string().refine((value) => timeZones.has(value), {
    message: "Chọn múi giờ hợp lệ.",
  }),
});

export type ProfileInput = z.infer<typeof profileSchema>;
