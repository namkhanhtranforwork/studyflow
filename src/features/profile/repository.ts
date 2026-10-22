import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type { ProfileInput } from "@/features/profile/schemas";

export interface ProfileRepository {
  update(userId: string, input: ProfileInput): Promise<void>;
}

export function createProfileRepository(
  supabase: SupabaseClient<Database>,
): ProfileRepository {
  return {
    async update(userId, input) {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: input.displayName,
          timezone: input.timezone,
        })
        .eq("id", userId);
      if (error) throw error;
    },
  };
}
