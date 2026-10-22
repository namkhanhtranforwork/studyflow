"use server";

import { revalidatePath } from "next/cache";
import { createProfileRepository } from "@/features/profile/repository";
import { updateProfile as updateProfileService } from "@/features/profile/service";
import { requireUser } from "@/lib/auth";

export interface ProfileActionState {
  error?: string;
  success?: string;
}

export async function saveProfile(
  _previous: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const { supabase, user } = await requireUser();
  const result = await updateProfileService(
    createProfileRepository(supabase),
    user.id,
    {
      displayName: formData.get("displayName"),
      timezone: formData.get("timezone"),
    },
  );

  if (!result.ok) return { error: result.error };
  revalidatePath("/app", "layout");
  return { success: "Đã cập nhật hồ sơ." };
}
