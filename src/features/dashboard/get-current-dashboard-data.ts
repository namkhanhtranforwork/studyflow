import "server-only";

import { getDashboardData } from "@/features/dashboard/data";
import { requireUser } from "@/lib/auth";

export async function getCurrentDashboardData() {
  const { supabase, user } = await requireUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("timezone")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Could not load the profile timezone:", error.message);
    throw new Error("Chưa thể tải cài đặt tài khoản.");
  }

  return getDashboardData(
    supabase,
    user.id,
    profile?.timezone ?? "Asia/Ho_Chi_Minh",
  );
}
