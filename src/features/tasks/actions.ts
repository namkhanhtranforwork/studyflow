"use server";

import { revalidatePath } from "next/cache";
import { createTask as createTaskService, deleteCompletedTasks as deleteCompletedTasksService, deleteTask as deleteTaskService, setTaskStatus as setTaskStatusService, updateTask as updateTaskService } from "@/features/tasks/service";
import { createTaskRepository } from "@/features/tasks/repository";
import { requireUser } from "@/lib/auth";

export interface TaskActionState {
  error?: string;
  success?: string;
}

function readTaskInput(formData: FormData) {
  return {
    id: formData.get("id"),
    title: formData.get("title"),
    goalId: formData.get("goalId") ?? "",
    dueDate: formData.get("dueDate") ?? "",
  };
}

function revalidateTaskPages() {
  revalidatePath("/app");
  revalidatePath("/app/tasks");
  revalidatePath("/app/goals");
}

export async function saveTask(
  _previous: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const { supabase, user } = await requireUser();
  const repository = createTaskRepository(supabase);
  const id = formData.get("id");
  const result =
    typeof id === "string" && id
      ? await updateTaskService(repository, readTaskInput(formData), user.id)
      : await createTaskService(repository, readTaskInput(formData));

  if (!result.ok) return { error: result.error };
  revalidateTaskPages();
  return { success: "Đã lưu nhiệm vụ." };
}

export async function setTaskStatus(
  _previous: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const { supabase, user } = await requireUser();
  const result = await setTaskStatusService(
    createTaskRepository(supabase),
    { id: formData.get("id"), status: formData.get("status") },
    user.id,
  );
  if (!result.ok) return { error: result.error };
  revalidateTaskPages();
  return { success: "Đã cập nhật trạng thái nhiệm vụ." };
}

export async function deleteTask(
  _previous: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const { supabase, user } = await requireUser();
  const result = await deleteTaskService(
    createTaskRepository(supabase),
    String(formData.get("id") ?? ""),
    user.id,
  );
  if (!result.ok) return { error: result.error };
  revalidateTaskPages();
  return { success: "Đã xóa nhiệm vụ." };
}

export async function deleteCompletedTasks(): Promise<void> {
  const { supabase, user } = await requireUser();
  const result = await deleteCompletedTasksService(
    createTaskRepository(supabase),
    user.id,
  );
  if (!result.ok) {
    throw new Error(result.error);
  }
  revalidateTaskPages();
}
