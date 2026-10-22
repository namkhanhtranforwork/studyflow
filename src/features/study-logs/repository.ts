import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

export interface StudyLogInput {
  studyDate: string;
  minutes: number;
  note: string | null;
}

export interface StudyLogRepository {
  create(input: StudyLogInput): Promise<void>;
}

export function createStudyLogRepository(
  supabase: SupabaseClient<Database>,
): StudyLogRepository {
  return {
    async create(input) {
      const { error } = await supabase.from("study_logs").insert({
        study_date: input.studyDate,
        minutes: input.minutes,
        note: input.note,
      });
      if (error) throw error;
    },
  };
}
