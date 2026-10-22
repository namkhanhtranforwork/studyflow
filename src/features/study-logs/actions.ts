"use server";

import { revalidatePath } from "next/cache";
import { createStudyLog as createStudyLogService } from "@/features/study-logs/service";
import { createStudyLogRepository } from "@/features/study-logs/repository";
import { getTodayDateKey } from "@/features/dashboard/sample-data";
import { requireUser } from "@/lib/auth";

export interface StudyLogActionState {
  error?: string;
  success?: string;
}

export async function saveStudyLog(
  _previous: StudyLogActionState,
  formData: FormData,
): Promise<StudyLogActionState> {
  const { supabase, user } = await requireUser();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("timezone")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Could not load timezone for a study log:", profileError.message);
    return { error: "Chưa thể xác định múi giờ tài khoản. Vui lòng thử lại." };
  }

  const value = formData.get("minutes");
  const result = await createStudyLogService(
    createStudyLogRepository(supabase),
    {
      minutes: typeof value === "string" ? value : "",
      note: formData.get("note"),
    },
    getTodayDateKey(new Date(), profile?.timezone ?? "Asia/Ho_Chi_Minh"),
  );

  if (!result.ok) return { error: result.error };
  revalidatePath("/app");
  revalidatePath("/app/study");
  return { success: "Đã lưu phiên học. Tiến bộ nhỏ cũng rất đáng tự hào!" };
}
