import type { Metadata } from "next";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Cài đặt tài khoản" };

export default async function SettingsPage() {
  const { supabase, user } = await requireUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name,timezone")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Could not load profile settings:", error.message);
    throw new Error("Chưa thể tải hồ sơ tài khoản.");
  }
  if (!profile) throw new Error("Hồ sơ tài khoản chưa sẵn sàng.");

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div>
        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">Tài khoản cá nhân</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Cài đặt hồ sơ</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
      </div>
      <ProfileForm
        displayName={profile.display_name ?? ""}
        timezone={profile.timezone}
      />
    </div>
  );
}
