"use client";

import { useActionState } from "react";
import { deleteTask, setTaskStatus, type TaskActionState } from "@/features/tasks/actions";

export function TaskActions({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) {
  const [status, statusAction, changing] = useActionState<TaskActionState, FormData>(setTaskStatus, {});
  const [deletion, deleteAction, deleting] = useActionState<TaskActionState, FormData>(deleteTask, {});

  return (
    <div className="flex items-center gap-2">
      <form action={statusAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="status" value={completed ? "todo" : "completed"} />
        <button disabled={changing} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold disabled:opacity-50 ${completed ? "bg-slate-100 text-slate-500 dark:bg-slate-800" : "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"}`}>
          {changing ? "Đang lưu..." : completed ? "Mở lại" : "Hoàn thành"}
        </button>
        {status.error && <span role="alert" className="sr-only">{status.error}</span>}
      </form>
      <form action={deleteAction}>
        <input type="hidden" name="id" value={id} />
        <button disabled={deleting} aria-label="Xóa nhiệm vụ" className="rounded-lg px-2 py-1.5 text-[10px] font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-50 dark:hover:bg-rose-500/10">
          {deleting ? "…" : "Xóa"}
        </button>
        {deletion.error && <span role="alert" className="sr-only">{deletion.error}</span>}
      </form>
    </div>
  );
}
