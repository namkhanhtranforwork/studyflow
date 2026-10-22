import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type { TaskInput, TaskUpdateInput } from "@/features/tasks/schemas";

type Task = Database["public"]["Tables"]["tasks"]["Row"];

export interface TaskRepository {
  list(userId: string): Promise<Task[]>;
  create(input: TaskInput): Promise<Task>;
  update(input: TaskUpdateInput, userId: string): Promise<Task>;
  updateStatus(id: string, userId: string, status: "todo" | "completed"): Promise<void>;
  remove(id: string, userId: string): Promise<void>;
  removeCompleted(userId: string): Promise<void>;
}

export function createTaskRepository(
  supabase: SupabaseClient<Database>,
): TaskRepository {
  return {
    async list(userId) {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("due_date", { ascending: true, nullsFirst: false });
      if (error) throw error;
      return data;
    },
    async create(input) {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          title: input.title,
          goal_id: input.goalId,
          due_date: input.dueDate,
        })
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
    async update(input, userId) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: input.title,
          goal_id: input.goalId,
          due_date: input.dueDate,
        })
        .eq("id", input.id)
        .eq("user_id", userId)
        .select("*")
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Task was not found for this account.");
      return data;
    },
    async updateStatus(id, userId, status) {
      const { error } = await supabase
        .from("tasks")
        .update({ status })
        .eq("id", id)
        .eq("user_id", userId);
      if (error) throw error;
    },
    async remove(id, userId) {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) throw error;
    },
    async removeCompleted(userId) {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("user_id", userId)
        .eq("status", "completed");
      if (error) throw error;
    },
  };
}

export type { Task };
