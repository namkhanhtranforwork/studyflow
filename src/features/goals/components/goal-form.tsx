"use client";

import { useActionState, useState } from "react";
import { saveGoal, type GoalActionState } from "@/features/goals/actions";
import type { Goal } from "@/features/goals/repository";

export function GoalForm({ goal }: { goal?: Goal }) {
  const [state, action, pending] = useActionState<GoalActionState, FormData>(saveGoal, {});
  const [open, setOpen] = useState(!goal);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-bold">{goal ? "Chỉnh sửa mục tiêu" : "Tạo mục tiêu mới"}</span>
        <span aria-hidden="true" className="text-xl leading-none text-indigo-600">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <form action={action} className="mt-5 grid gap-4 sm:grid-cols-2">
          {goal && <input type="hidden" name="id" value={goal.id} />}
          <div className="sm:col-span-2">
            <label htmlFor={`goal-title-${goal?.id ?? "new"}`} className="mb-1.5 block text-xs font-semibold">Tên mục tiêu</label>
            <input id={`goal-title-${goal?.id ?? "new"}`} name="title" required maxLength={120} defaultValue={goal?.title} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950" placeholder="Ví dụ: Hoàn thành khóa học..." />
          </div>
          <div>
            <label htmlFor={`goal-category-${goal?.id ?? "new"}`} className="mb-1.5 block text-xs font-semibold">Loại</label>
            <select id={`goal-category-${goal?.id ?? "new"}`} name="category" defaultValue={goal?.category ?? "study"} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option value="study">Học tập</option>
              <option value="work">Công việc</option>
            </select>
          </div>
          <div>
            <label htmlFor={`goal-start-${goal?.id ?? "new"}`} className="mb-1.5 block text-xs font-semibold">Ngày bắt đầu</label>
            <input id={`goal-start-${goal?.id ?? "new"}`} name="startDate" type="date" defaultValue={goal?.start_date ?? ""} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
          </div>
          <div>
            <label htmlFor={`goal-deadline-${goal?.id ?? "new"}`} className="mb-1.5 block text-xs font-semibold">Hạn hoàn thành</label>
            <input id={`goal-deadline-${goal?.id ?? "new"}`} name="targetDate" type="date" defaultValue={goal?.target_date ?? ""} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`goal-description-${goal?.id ?? "new"}`} className="mb-1.5 block text-xs font-semibold">Mô tả</label>
            <textarea id={`goal-description-${goal?.id ?? "new"}`} name="description" rows={3} maxLength={2000} defaultValue={goal?.description ?? ""} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder="Mô tả ngắn về mục tiêu" />
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <button type="submit" disabled={pending} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60">
              {pending ? "Đang lưu..." : goal ? "Lưu thay đổi" : "Tạo mục tiêu"}
            </button>
            {state.error && <p role="alert" className="text-xs text-rose-600">{state.error}</p>}
            {state.success && <p role="status" className="text-xs text-emerald-600">{state.success}</p>}
          </div>
        </form>
      )}
    </section>
  );
}
