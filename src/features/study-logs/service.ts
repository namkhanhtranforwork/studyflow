import { quickStudyLogSchema } from "@/features/study-logs/schemas";
import type { StudyLogRepository } from "@/features/study-logs/repository";
import type { Result } from "@/features/shared/result";

export async function createStudyLog(
  repository: StudyLogRepository,
  input: unknown,
  studyDate: string,
): Promise<Result<null>> {
  const parsed = quickStudyLogSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Thông tin phiên học chưa hợp lệ." };
  }

  try {
    await repository.create({
      studyDate,
      minutes: parsed.data.minutes,
      note: parsed.data.note || null,
    });
    return { ok: true, data: null };
  } catch (error) {
    console.error("Could not create study log:", error);
    return { ok: false, error: "Chưa thể lưu phiên học. Vui lòng thử lại." };
  }
}
