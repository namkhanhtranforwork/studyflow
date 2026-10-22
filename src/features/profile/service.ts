import { profileSchema } from "@/features/profile/schemas";
import type { ProfileRepository } from "@/features/profile/repository";
import type { Result } from "@/features/shared/result";

export async function updateProfile(
  repository: ProfileRepository,
  userId: string,
  input: unknown,
): Promise<Result<null>> {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Thông tin hồ sơ chưa hợp lệ.",
    };
  }

  try {
    await repository.update(userId, parsed.data);
    return { ok: true, data: null };
  } catch (error) {
    console.error("Could not update profile:", error);
    return { ok: false, error: "Chưa thể cập nhật hồ sơ. Vui lòng thử lại." };
  }
}
