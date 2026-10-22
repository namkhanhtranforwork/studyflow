"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icons";
import {
  saveStudyLog,
  type StudyLogActionState,
} from "@/features/study-logs/actions";

export function QuickLogForm() {
  const [state, action, pending] = useActionState<StudyLogActionState, FormData>(
    saveStudyLog,
    {},
  );

  return (
    <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white shadow-lg shadow-indigo-200/60 dark:shadow-none sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-xl bg-white/15">
          <Icon name="plus" size={18} />
        </span>
        <div>
          <h2 className="text-sm font-bold">Ghi nhanh phiên học</h2>
          <p className="text-[10px] text-indigo-100">Ghi lại một chút tiến bộ hôm nay</p>
        </div>
      </div>

      <form action={action} className="space-y-3">
        <div>
          <label htmlFor="study-minutes" className="mb-1.5 block text-[11px] font-semibold text-indigo-100">
            Thời gian học (phút)
          </label>
          <input
            id="study-minutes"
            name="minutes"
            type="number"
            min={1}
            max={1440}
            step={1}
            inputMode="numeric"
            defaultValue={25}
            required
            aria-invalid={Boolean(state.error)}
            className="h-10 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white outline-none placeholder:text-indigo-200 focus:border-white/70 focus:ring-2 focus:ring-white/20"
          />
          {state.error && (
            <p role="alert" className="mt-1 text-[11px] font-medium text-amber-100">
              {state.error}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="study-note" className="mb-1.5 flex justify-between text-[11px] font-semibold text-indigo-100">
            Ghi chú <span className="font-normal">Tối đa 120 ký tự</span>
          </label>
          <textarea
            id="study-note"
            name="note"
            rows={2}
            maxLength={120}
            placeholder="Hôm nay bạn đã học gì?"
            className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white outline-none placeholder:text-indigo-200 focus:border-white/70 focus:ring-2 focus:ring-white/20"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-wait disabled:opacity-70"
        >
          <Icon name="check" size={15} />
          {pending ? "Đang lưu..." : "Lưu phiên học"}
        </button>
        <p aria-live="polite" className="min-h-4 text-center text-[11px] font-medium text-indigo-100">
          {state.success}
        </p>
      </form>
    </section>
  );
}
