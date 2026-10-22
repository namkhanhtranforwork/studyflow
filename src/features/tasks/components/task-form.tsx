"use client";

import { useActionState } from "react";
import { saveTask, type TaskActionState } from "@/features/tasks/actions";
import type { Goal } from "@/features/goals/repository";
import type { Task } from "@/features/tasks/repository";

export function TaskForm({
  goals,
  task,
}: {
  goals: Goal[];
  task?: Task;
}) {
  const [state, action, pending] = useActionState<TaskActionState, FormData>(saveTask, {});

  return (
    <form action={action} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2">
      {task && <input type="hidden" name="id" value={task.id} />}
      <div className="sm:col-span-2">
        <label htmlFor={`task-title-${task?.id ?? "new"}`} className="mb-1.5 block text-xs font-semibold">Tên nhiệm vụ</label>
        <input id={`task-title-${task?.id ?? "new"}`} name="title" required maxLength={160} defaultValue={task?.title} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950" placeholder="Việc cần hoàn thành" />
      </div>
      <div>
        <label htmlFor={`task-goal-${task?.id ?? "new"}`} className="mb-1.5 block text-xs font-semibold">Mục tiêu</label>
        <select id={`task-goal-${task?.id ?? "new"}`} name="goalId" defaultValue={task?.goal_id ?? ""} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          <option value="">Chưa gắn mục tiêu</option>
          {goals.filter((goal) => goal.status !== "archived").map((goal) => (
            <option key={goal.id} value={goal.id}>{goal.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`task-due-${task?.id ?? "new"}`} className="mb-1.5 block text-xs font-semibold">Hạn hoàn thành</label>
        <input id={`task-due-${task?.id ?? "new"}`} name="dueDate" type="date" defaultValue={task?.due_date ?? ""} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
      </div>
      <div className="flex items-center gap-3 sm:col-span-2">
        <button type="submit" disabled={pending} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60">
          {pending ? "Đang lưu..." : task ? "Lưu thay đổi" : "Tạo nhiệm vụ"}
        </button>
        {state.error && <p role="alert" className="text-xs text-rose-600">{state.error}</p>}
        {state.success && <p role="status" className="text-xs text-emerald-600">{state.success}</p>}
      </div>
    </form>
  );
}
