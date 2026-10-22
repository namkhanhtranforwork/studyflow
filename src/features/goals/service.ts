import { z } from "zod";
import { goalSchema, goalStatusSchema, updateGoalSchema, type GoalInput, type GoalUpdateInput } from "@/features/goals/schemas";
import type { Goal, GoalRepository } from "@/features/goals/repository";
import type { Result } from "@/features/shared/result";

export async function listGoals(
  repository: GoalRepository,
  userId: string,
): Promise<Result<Goal[]>> {
  try {
    return { ok: true, data: await repository.list(userId) };
  } catch (error) {
    console.error("Could not list goals:", error);
    return { ok: false, error: "Chưa thể tải mục tiêu. Vui lòng thử lại." };
  }
}

export async function createGoal(
  repository: GoalRepository,
  input: unknown,
): Promise<Result<Goal>> {
  const parsed = goalSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Thông tin mục tiêu chưa hợp lệ." };
  }
  return saveGoal(() => repository.create(parsed.data));
}

export async function updateGoal(
  repository: GoalRepository,
  input: unknown,
  userId: string,
): Promise<Result<Goal>> {
  const parsed = updateGoalSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Thông tin mục tiêu chưa hợp lệ." };
  }
  return saveGoal(() => repository.update(parsed.data, userId));
}

export async function archiveGoal(
  repository: GoalRepository,
  id: string,
  userId: string,
): Promise<Result<null>> {
  if (!z.uuid().safeParse(id).success) {
    return { ok: false, error: "Mục tiêu không hợp lệ." };
  }
  return saveGoal(async () => {
    await repository.archive(id, userId);
    return null;
  });
}

export async function setGoalStatus(
  repository: GoalRepository,
  input: unknown,
  userId: string,
): Promise<Result<null>> {
  const parsed = goalStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Trạng thái mục tiêu không hợp lệ." };
  }
  return saveGoal(async () => {
    await repository.updateStatus(
      parsed.data.id,
      userId,
      parsed.data.status,
    );
    return null;
  });
}

export async function deleteGoal(
  repository: GoalRepository,
  id: string,
  userId: string,
): Promise<Result<null>> {
  if (!z.uuid().safeParse(id).success) {
    return { ok: false, error: "Mục tiêu không hợp lệ." };
  }
  return saveGoal(async () => {
    await repository.remove(id, userId);
    return null;
  });
}

async function saveGoal<T>(
  operation: () => Promise<T>,
): Promise<Result<T>> {
  try {
    return { ok: true, data: await operation() };
  } catch (error) {
    console.error("Could not save goal:", error);
    return { ok: false, error: "Chưa thể lưu mục tiêu. Vui lòng thử lại." };
  }
}

export type { GoalInput, GoalUpdateInput };
