import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type { GoalInput, GoalUpdateInput } from "@/features/goals/schemas";

type Goal = Database["public"]["Tables"]["goals"]["Row"];

export interface GoalRepository {
  list(userId: string): Promise<Goal[]>;
  create(input: GoalInput): Promise<Goal>;
  update(input: GoalUpdateInput, userId: string): Promise<Goal>;
  archive(id: string, userId: string): Promise<void>;
  updateStatus(id: string, userId: string, status: "active" | "completed" | "archived"): Promise<void>;
  remove(id: string, userId: string): Promise<void>;
}

export function createGoalRepository(
  supabase: SupabaseClient<Database>,
): GoalRepository {
  return {
    async list(userId) {
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    async create(input) {
      const { data, error } = await supabase
        .from("goals")
        .insert({
          title: input.title,
          description: input.description,
          category: input.category,
          start_date: input.startDate,
          target_date: input.targetDate,
        })
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
    async update(input, userId) {
      const { data, error } = await supabase
        .from("goals")
        .update({
          title: input.title,
          description: input.description,
          category: input.category,
          start_date: input.startDate,
          target_date: input.targetDate,
        })
        .eq("id", input.id)
        .eq("user_id", userId)
        .select("*")
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Goal was not found for this account.");
      return data;
    },
    async archive(id, userId) {
      const { error } = await supabase
        .from("goals")
        .update({ status: "archived" })
        .eq("id", id)
        .eq("user_id", userId);
      if (error) throw error;
    },
    async updateStatus(id, userId, status) {
      const { error } = await supabase
        .from("goals")
        .update({ status })
        .eq("id", id)
        .eq("user_id", userId);
      if (error) throw error;
    },
    async remove(id, userId) {
      const { error } = await supabase
        .from("goals")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) throw error;
    },
  };
}

export type { Goal };
