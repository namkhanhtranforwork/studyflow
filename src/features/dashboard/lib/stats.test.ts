import { describe, expect, it } from "vitest";
import {
  dueInfo,
  formatMinutes,
  goalDone,
  studyStreak,
  weekTotal,
} from "@/features/dashboard/lib/stats";
import {
  createSampleDashboardData,
  shiftDateKey,
} from "@/features/dashboard/sample-data";

const today = "2026-10-22";

describe("dashboard stats", () => {
  it("adds the minutes across the seven-day range, including zero-study days", () => {
    const data = createSampleDashboardData(today);

    expect(data.weeklyStudy).toHaveLength(7);
    expect(data.weeklyStudy.filter((day) => day.minutes === 0)).toHaveLength(2);
    expect(weekTotal(data.weeklyStudy)).toBe(245);
  });

  it("counts a streak from today or yesterday and stops at the first gap", () => {
    const data = createSampleDashboardData(today);

    expect(studyStreak(data.weeklyStudy, today)).toBe(3);
    expect(studyStreak(data.weeklyStudy, "2026-10-23")).toBe(3);
    expect(studyStreak([{ date: today, label: "hôm nay", minutes: 0 }], today)).toBe(0);
  });

  it("clamps goal progress and handles goals without tasks", () => {
    expect(goalDone(2, 5)).toBe(40);
    expect(goalDone(8, 5)).toBe(100);
    expect(goalDone(-2, 5)).toBe(0);
    expect(goalDone(2, 0)).toBe(0);
  });

  it("classifies overdue, today, and future deadlines", () => {
    expect(dueInfo("2026-10-21", today)).toEqual({
      status: "overdue",
      label: "Quá hạn",
    });
    expect(dueInfo(today, today)).toEqual({ status: "today", label: "Hôm nay" });
    expect(dueInfo("2026-11-02", today)).toEqual({
      status: "upcoming",
      label: "2/11",
    });
  });

  it("formats zero, sub-hour, whole-hour, and mixed durations", () => {
    expect(formatMinutes(0)).toBe("0 phút");
    expect(formatMinutes(59)).toBe("59 phút");
    expect(formatMinutes(60)).toBe("1 giờ");
    expect(formatMinutes(90)).toBe("1 giờ 30 phút");
    expect(formatMinutes(-4)).toBe("0 phút");
  });
});

describe("date helpers", () => {
  it("shifts dates across month and year boundaries", () => {
    expect(shiftDateKey("2026-03-01", -1)).toBe("2026-02-28");
    expect(shiftDateKey("2026-01-01", -1)).toBe("2025-12-31");
    expect(shiftDateKey("2024-03-01", -1)).toBe("2024-02-29");
  });
});
