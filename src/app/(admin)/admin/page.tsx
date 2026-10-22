import type { Metadata } from "next";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Quản trị tài khoản" };

const searchSchema = z.string().trim().max(100).catch("");

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ supabase }, params] = await Promise.all([requireAdmin(), searchParams]);
  const query = searchSchema.parse(params.q ?? "");
  const escapedQuery = query.replace(/[\\%_]/g, "\\$&");
  const profilesQuery = supabase
    .from("profiles")
    .select("id,display_name,role,created_at")
    .order("created_at", { ascending: false });
  const { data: profiles, error: profileError } = query
    ? await profilesQuery.ilike("display_name", `%${escapedQuery}%`).limit(100)
    : await profilesQuery.limit(100);

  if (profileError) {
    console.error("Could not load admin account profiles:", profileError.message);
    throw new Error("Chưa thể tải hồ sơ tài khoản.");
  }

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(query);
  const idMatch = isUuid
    ? await supabase
        .from("profiles")
        .select("id,display_name,role,created_at")
        .eq("id", query)
        .maybeSingle()
    : null;

  if (idMatch?.error) {
    console.error("Could not search admin account profiles by id:", idMatch.error.message);
    throw new Error("Chưa thể tìm hồ sơ tài khoản.");
  }

  const accountsById = new Map(profiles.map((profile) => [profile.id, profile]));
  if (idMatch?.data) accountsById.set(idMatch.data.id, idMatch.data);
  const accounts = [...accountsById.values()];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">Chỉ dành cho Admin</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Tài khoản</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Chỉ xem tên hiển thị, vai trò và ngày tạo hồ sơ. Nội dung riêng tư không hiển thị.</p>
      </div>

      <form className="flex flex-wrap gap-2" action="/admin">
        <label htmlFor="admin-search" className="sr-only">Tìm theo tên hoặc mã tài khoản</label>
        <input
          id="admin-search"
          name="q"
          type="search"
          maxLength={100}
          defaultValue={query}
          placeholder="Tìm theo tên hoặc mã tài khoản"
          className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <button className="h-10 rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white">Tìm kiếm</button>
      </form>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {accounts.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-500">Không tìm thấy tài khoản phù hợp.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:bg-slate-800/70">
                <tr>
                  <th className="px-5 py-3">Tài khoản</th>
                  <th className="px-5 py-3">Vai trò</th>
                  <th className="px-5 py-3">Ngày tạo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs dark:divide-slate-800">
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{account.display_name ?? "Chưa có tên hiển thị"}</p>
                      <p className="mt-1 break-all text-[10px] text-slate-400">{account.id}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${account.role === "admin" ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>
                        {account.role === "admin" ? "Admin" : "Người dùng"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{formatDate(account.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <p className="text-[11px] text-slate-400">
        Hiển thị tối đa 100 kết quả phù hợp; nội dung riêng tư của người dùng không được truy cập.
      </p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
