import { describe, expect, it } from "vitest";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
  requestPasswordResetSchema,
} from "@/features/auth/schemas";

describe("auth schemas", () => {
  it("normalizes names and emails before registration", () => {
    expect(
      registerSchema.parse({
        displayName: "  An Nguyễn  ",
        email: "  an@example.com ",
        password: "secure-password",
      }),
    ).toEqual({
      displayName: "An Nguyễn",
      email: "an@example.com",
      password: "secure-password",
    });
  });

  it("rejects invalid email and overlong registration passwords", () => {
    expect(loginSchema.safeParse({ email: "invalid", password: "x" }).success).toBe(false);
    expect(
      registerSchema.safeParse({
        displayName: "An",
        email: "an@example.com",
        password: "x".repeat(73),
      }).success,
    ).toBe(false);
  });

  it("requires matching passwords when changing credentials", () => {
    expect(
      changePasswordSchema.safeParse({
        password: "secure-password",
        confirmPassword: "secure-password",
      }).success,
    ).toBe(true);
    expect(
      changePasswordSchema.safeParse({
        password: "secure-password",
        confirmPassword: "different-password",
      }).success,
    ).toBe(false);
  });

  it("validates password-reset request emails", () => {
    expect(requestPasswordResetSchema.safeParse({ email: "an@example.com" }).success).toBe(true);
    expect(requestPasswordResetSchema.safeParse({ email: "not-an-email" }).success).toBe(false);
  });
});
