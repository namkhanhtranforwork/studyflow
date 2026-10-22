import { z } from "zod";

const optionalDate = z.preprocess(
  (value) => (value === "" || value === null ? null : value),
  z.union([z.iso.date(), z.null()]),
);

export const taskSchema = z.object({
  title: z.string().trim().min(1, "Nhập tên nhiệm vụ.").max(160, "Tên nhiệm vụ tối đa 160 ký tự."),
  goalId: z.preprocess(
    (value) => (value === "" || value === null ? null : value),
    z.union([z.uuid(), z.null()]),
  ),
  dueDate: optionalDate,
});

export const updateTaskSchema = taskSchema.extend({
  id: z.uuid("Nhiệm vụ không hợp lệ."),
});

export const taskStatusSchema = z.object({
  id: z.uuid("Nhiệm vụ không hợp lệ."),
  status: z.enum(["todo", "completed"]),
});

export type TaskInput = z.infer<typeof taskSchema>;
export type TaskUpdateInput = z.infer<typeof updateTaskSchema>;
