"use client";

import { useActionState } from "react";
import {
  archiveGoal,
  deleteGoal,
  setGoalStatus,
  type GoalActionState,
} from "@/features/goals/actions";

export function GoalActions({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) {
  const [archiveState, archiveAction, archiving] = useActionState<GoalActionState, FormData>(archiveGoal, {});
  const [deleteState, deleteAction, deleting] = useActionState<GoalActionState, FormData>(deleteGoal, {});
  const [statusState, statusAction, changingStatus] = useActionState<GoalActionState, FormData>(setGoalStatus, {});

  return (
    <div className="flex flex-wrap items-center gap-2">
      <form action={statusAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="status" value={completed ? "active" : "completed"} />
        <button disabled={changingStatus} className="rounded-lg bg-indigo-50 px-2.5 py-1.5 text-[10px] font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 dark:bg-indigo-500/10 dark:text-indigo-300">
          {changingStatus ? "Đang lưu..." : completed ? "Tiếp tục" : "Hoàn thành"}
        </button>
        {statusState.error && <span role="alert" className="sr-only">{statusState.error}</span>}
      </form>
      <form action={archiveAction}>
        <input type="hidden" name="id" value={id} />
        <button disabled={archiving} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-50 dark:border-slate-700">
          {archiving ? "Đang lưu..." : "Lưu trữ"}
        </button>
        {archiveState.error && <span role="alert" className="sr-only">{archiveState.error}</span>}
      </form>
      <form action={deleteAction}>
        <input type="hidden" name="id" value={id} />
        <button disabled={deleting} className="rounded-lg border border-rose-100 px-2.5 py-1.5 text-[10px] font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50 dark:border-rose-500/20">
          {deleting ? "Đang xóa..." : "Xóa"}
        </button>
        {deleteState.error && <span role="alert" className="sr-only">{deleteState.error}</span>}
      </form>
    </div>
  );
}
