import { taskSchema, taskStatusSchema, updateTaskSchema, type TaskInput, type TaskUpdateInput } from "@/features/tasks/schemas";
import type { Task, TaskRepository } from "@/features/tasks/repository";
import type { Result } from "@/features/shared/result";

export async function listTasks(
  repository: TaskRepository,
  userId: string,
): Promise<Result<Task[]>> {
  try {
    return { ok: true, data: await repository.list(userId) };
  } catch (error) {
    console.error("Could not list tasks:", error);
    return { ok: false, error: "Chưa thể tải nhiệm vụ. Vui lòng thử lại." };
  }
}

export async function createTask(
  repository: TaskRepository,
  input: unknown,
): Promise<Result<Task>> {
  const parsed = taskSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Thông tin nhiệm vụ chưa hợp lệ." };
  }
  return execute(() => repository.create(parsed.data));
}

export async function updateTask(
  repository: TaskRepository,
  input: unknown,
  userId: string,
): Promise<Result<Task>> {
  const parsed = updateTaskSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Thông tin nhiệm vụ chưa hợp lệ." };
  }
  return execute(() => repository.update(parsed.data, userId));
}

export async function setTaskStatus(
  repository: TaskRepository,
  input: unknown,
  userId: string,
): Promise<Result<null>> {
  const parsed = taskStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Trạng thái nhiệm vụ không hợp lệ." };
  }
  return execute(async () => {
    await repository.updateStatus(parsed.data.id, userId, parsed.data.status);
    return null;
  });
}

export async function deleteTask(
  repository: TaskRepository,
  id: string,
  userId: string,
): Promise<Result<null>> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return { ok: false, error: "Nhiệm vụ không hợp lệ." };
  }
  return execute(async () => {
    await repository.remove(id, userId);
    return null;
  });
}

export async function deleteCompletedTasks(
  repository: TaskRepository,
  userId: string,
): Promise<Result<null>> {
  return execute(async () => {
    await repository.removeCompleted(userId);
    return null;
  });
}

async function execute<T>(operation: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, data: await operation() };
  } catch (error) {
    console.error("Could not save task:", error);
    return { ok: false, error: "Chưa thể lưu nhiệm vụ. Vui lòng thử lại." };
  }
}

export type { TaskInput, TaskUpdateInput };
