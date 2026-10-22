import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    if (error) {
      console.error("Could not verify the current user:", error.message);
    }
    redirect("/login");
  }

  return { supabase, user: data.user };
}

export async function requireAdmin() {
  const { supabase, user } = await requireUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Could not verify the current user's role:", error.message);
    throw new Error("Không thể xác minh quyền quản trị lúc này.");
  }

  if (profile?.role !== "admin") {
    redirect("/app");
  }

  return { supabase, user };
}
