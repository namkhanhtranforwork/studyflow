"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icons";
import type { DashboardTask } from "@/features/dashboard/sample-data";
import { setTaskStatus, type TaskActionState } from "@/features/tasks/actions";

export function TaskQuickActions({ task }: { task: DashboardTask }) {
  const [state, action, pending] = useActionState<TaskActionState, FormData>(setTaskStatus, {});

  return (
    <form action={action} className="mt-0.5 shrink-0">
      <input type="hidden" name="id" value={task.id} />
      <input type="hidden" name="status" value={task.completed ? "todo" : "completed"} />
      <button
        type="submit"
        disabled={pending}
        aria-label={`${task.completed ? "Bỏ hoàn thành" : "Đánh dấu hoàn thành"}: ${task.title}`}
        aria-pressed={task.completed}
        className={`flex size-[18px] items-center justify-center rounded-md border transition ${
          task.completed
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-slate-300 bg-white text-transparent hover:border-indigo-500 dark:border-slate-600 dark:bg-slate-900"
        }`}
      >
        {task.completed && <Icon name="check" size={13} />}
      </button>
      {state.error && <span role="alert" className="sr-only">{state.error}</span>}
    </form>
  );
}
