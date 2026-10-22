"use client";

import { useActionState } from "react";
import { saveProfile, type ProfileActionState } from "@/features/profile/actions";

export function ProfileForm({
  displayName,
  timezone,
}: {
  displayName: string;
  timezone: string;
}) {
  const [state, action, pending] = useActionState<ProfileActionState, FormData>(saveProfile, {});

  return (
    <form action={action} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div>
        <label htmlFor="profile-display-name" className="mb-1.5 block text-xs font-semibold">Tên hiển thị</label>
        <input id="profile-display-name" name="displayName" required minLength={2} maxLength={80} defaultValue={displayName} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
      </div>
      <div>
        <label htmlFor="profile-timezone" className="mb-1.5 block text-xs font-semibold">Múi giờ</label>
        <select id="profile-timezone" name="timezone" defaultValue={timezone} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          <option value="Asia/Ho_Chi_Minh">Việt Nam (UTC+07:00)</option>
          <option value="UTC">UTC</option>
          <option value="Asia/Singapore">Singapore (UTC+08:00)</option>
          <option value="Asia/Tokyo">Tokyo (UTC+09:00)</option>
          <option value="America/Los_Angeles">Los Angeles</option>
          <option value="America/New_York">New York</option>
          <option value="Europe/London">London</option>
        </select>
      </div>
      {state.error && <p role="alert" className="text-xs font-medium text-rose-600">{state.error}</p>}
      {state.success && <p role="status" className="text-xs font-medium text-emerald-600">{state.success}</p>}
      <button type="submit" disabled={pending} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60">
        {pending ? "Đang lưu..." : "Lưu hồ sơ"}
      </button>
    </form>
  );
}
