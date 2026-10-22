import { NextResponse, type NextRequest } from "next/server";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  if (!hasSupabaseConfig()) {
    if (
      request.nextUrl.pathname.startsWith("/app") ||
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/login?setup=required", request.url));
    }

    return NextResponse.next();
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
