import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/supabase/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const routes = [
    "",
    "/features",
    "/about",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
    "/login",
    "/register",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/features" ? 0.8 : 0.5,
  }));
}
