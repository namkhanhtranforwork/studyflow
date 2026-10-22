import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";

export async function updateSession(request: NextRequest) {
  const { url, key } = getSupabaseConfig();
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        for (const [name, value] of Object.entries(headers)) {
          response.headers.set(name, value);
        }
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();
  if (error) {
    console.error("Could not refresh the Supabase session:", error.message);
  }

  const hasSession = Boolean(data?.claims);
  const { pathname } = request.nextUrl;
  const isWorkspace =
    pathname.startsWith("/app") ||
    pathname.startsWith("/admin") ||
    pathname === "/reset-password";
  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
  ].includes(pathname);

  if (!hasSession && isWorkspace) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/reset-password") {
      loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    }
    return redirectWithSession(loginUrl, response);
  }

  if (hasSession && isAuthPage) {
    return redirectWithSession(new URL("/app", request.url), response);
  }

  return response;
}

function redirectWithSession(url: URL, sessionResponse: NextResponse) {
  const redirectResponse = NextResponse.redirect(url);
  for (const cookie of sessionResponse.cookies.getAll()) {
    redirectResponse.cookies.set(cookie);
  }
  for (const name of ["cache-control", "expires", "pragma"]) {
    const value = sessionResponse.headers.get(name);
    if (value) redirectResponse.headers.set(name, value);
  }
  return redirectResponse;
}
