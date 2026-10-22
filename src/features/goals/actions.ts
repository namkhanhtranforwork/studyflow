"use server";

import { revalidatePath } from "next/cache";
import { createGoal as createGoalService, updateGoal as updateGoalService, archiveGoal as archiveGoalService, deleteGoal as deleteGoalService, setGoalStatus as setGoalStatusService } from "@/features/goals/service";
import { createGoalRepository } from "@/features/goals/repository";
import { requireUser } from "@/lib/auth";

export interface GoalActionState {
  error?: string;
  success?: string;
}

function readGoalInput(formData: FormData) {
  return {
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description") ?? "",
    category: formData.get("category"),
    startDate: formData.get("startDate") ?? "",
    targetDate: formData.get("targetDate") ?? "",
  };
}

export async function saveGoal(
  _previous: GoalActionState,
  formData: FormData,
): Promise<GoalActionState> {
  const { supabase, user } = await requireUser();
  const repository = createGoalRepository(supabase);
  const id = formData.get("id");
  const result =
    typeof id === "string" && id
      ? await updateGoalService(repository, readGoalInput(formData), user.id)
      : await createGoalService(repository, readGoalInput(formData));

  if (!result.ok) return { error: result.error };
  revalidatePath("/app");
  revalidatePath("/app/goals");
  return { success: "Đã lưu mục tiêu." };
}

export async function archiveGoal(
  _previous: GoalActionState,
  formData: FormData,
): Promise<GoalActionState> {
  const { supabase, user } = await requireUser();
  const result = await archiveGoalService(
    createGoalRepository(supabase),
    String(formData.get("id") ?? ""),
    user.id,
  );
  if (!result.ok) return { error: result.error };
  revalidatePath("/app");
  revalidatePath("/app/goals");
  revalidatePath("/app/tasks");
  return { success: "Đã lưu trữ mục tiêu." };
}

export async function deleteGoal(
  _previous: GoalActionState,
  formData: FormData,
): Promise<GoalActionState> {
  const { supabase, user } = await requireUser();
  const result = await deleteGoalService(
    createGoalRepository(supabase),
    String(formData.get("id") ?? ""),
    user.id,
  );
  if (!result.ok) return { error: result.error };
  revalidatePath("/app");
  revalidatePath("/app/goals");
  revalidatePath("/app/tasks");
  return { success: "Đã xóa mục tiêu." };
}

export async function setGoalStatus(
  _previous: GoalActionState,
  formData: FormData,
): Promise<GoalActionState> {
  const { supabase, user } = await requireUser();
  const result = await setGoalStatusService(
    createGoalRepository(supabase),
    { id: formData.get("id"), status: formData.get("status") },
    user.id,
  );
  if (!result.ok) return { error: result.error };
  revalidatePath("/app");
  revalidatePath("/app/goals");
  return { success: "Đã cập nhật trạng thái mục tiêu." };
}
