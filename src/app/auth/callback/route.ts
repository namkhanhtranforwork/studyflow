import { NextResponse, type NextRequest } from "next/server";
import { getSiteUrl } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

function getSafeNextPath(value: string | null): string {
  if (
    value &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\")
  ) {
    return value;
  }

  return "/app";
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = getSafeNextPath(request.nextUrl.searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=confirmation-failed", getSiteUrl()),
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Could not exchange the Supabase auth code:", error.message);
    return NextResponse.redirect(
      new URL("/login?error=confirmation-failed", getSiteUrl()),
    );
  }

  return NextResponse.redirect(new URL(next, getSiteUrl()));
}
