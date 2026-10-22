-- Hàm kiểm tra admin (đọc profiles bỏ qua RLS để tránh vòng lặp policy)
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- profiles
alter table public.profiles enable row level security;

drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Người dùng chỉ được sửa display_name và timezone, KHÔNG sửa được role
revoke update on public.profiles from authenticated;
grant update (display_name, timezone) on public.profiles to authenticated;

-- goals, tasks, study_logs: chủ sở hữu toàn quyền, admin chỉ đọc
do $$
declare t text;
begin
  foreach t in array array['goals', 'tasks', 'study_logs'] loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists %I on public.%I', t || '_owner_all', t);
    execute format(
      'create policy %I on public.%I for all to authenticated
         using ((select auth.uid()) = user_id)
         with check ((select auth.uid()) = user_id)',
      t || '_owner_all', t);

    execute format('drop policy if exists %I on public.%I', t || '_admin_read', t);
    execute format(
      'create policy %I on public.%I for select to authenticated
         using (public.is_admin())',
      t || '_admin_read', t);
  end loop;
end
$$;
