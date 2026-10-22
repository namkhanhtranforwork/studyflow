import { describe, expect, it } from "vitest";
import { quickStudyLogSchema } from "@/features/study-logs/schemas";

describe("quickStudyLogSchema", () => {
  it("accepts the minimum and maximum study durations", () => {
    expect(quickStudyLogSchema.safeParse({ minutes: "1", note: "" }).success).toBe(true);
    expect(quickStudyLogSchema.safeParse({ minutes: "1440", note: "Ôn tập" }).success).toBe(true);
  });

  it("rejects values outside the duration range and non-integer values", () => {
    expect(quickStudyLogSchema.safeParse({ minutes: "0", note: "" }).success).toBe(false);
    expect(quickStudyLogSchema.safeParse({ minutes: "1441", note: "" }).success).toBe(false);
    expect(quickStudyLogSchema.safeParse({ minutes: "1.5", note: "" }).success).toBe(false);
    expect(quickStudyLogSchema.safeParse({ minutes: "", note: "" }).success).toBe(false);
  });

  it("trims notes and rejects notes longer than 120 characters", () => {
    expect(
      quickStudyLogSchema.parse({ minutes: 25, note: "  Học React  " }).note,
    ).toBe("Học React");
    expect(
      quickStudyLogSchema.safeParse({ minutes: 25, note: "x".repeat(121) }).success,
    ).toBe(false);
  });
});
