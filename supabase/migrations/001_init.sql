-- ========== BẢNG ==========
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  timezone text not null default 'Asia/Ho_Chi_Minh',
  created_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 120),
  description text,
  status text not null default 'active'
    check (status in ('active', 'completed', 'archived')),
  target_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users(id) on delete cascade,
  goal_id uuid,
  title text not null check (char_length(trim(title)) between 1 and 160),
  due_date date,
  status text not null default 'todo'
    check (status in ('todo', 'completed')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Nhiệm vụ chỉ được gắn vào mục tiêu của cùng người dùng.
  -- Khi xóa mục tiêu, chỉ đặt goal_id về null (cần PostgreSQL 15 trở lên, Supabase đã hỗ trợ).
  constraint tasks_goal_same_user_fk
    foreign key (goal_id, user_id)
    references public.goals (id, user_id)
    on delete set null (goal_id)
);

create table if not exists public.study_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users(id) on delete cascade,
  study_date date not null default current_date,
  minutes integer not null check (minutes between 1 and 1440),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists goals_user_id_idx on public.goals(user_id);
create index if not exists tasks_user_id_due_date_idx on public.tasks(user_id, due_date);
create index if not exists tasks_goal_id_idx on public.tasks(goal_id);
create index if not exists study_logs_user_id_date_idx on public.study_logs(user_id, study_date);

-- ========== TRIGGER ==========
-- Tự cập nhật updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists goals_set_updated_at on public.goals;
create trigger goals_set_updated_at before update on public.goals
  for each row execute function public.set_updated_at();

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at before update on public.tasks
  for each row execute function public.set_updated_at();

-- Tự đồng bộ completed_at theo status
create or replace function public.sync_task_completed_at()
returns trigger language plpgsql as $$
begin
  if new.status = 'completed' then
    new.completed_at = coalesce(new.completed_at, now());
  else
    new.completed_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_sync_completed_at on public.tasks;
create trigger tasks_sync_completed_at before insert or update on public.tasks
  for each row execute function public.sync_task_completed_at();

-- Tự tạo hồ sơ khi có tài khoản mới (vai trò mặc định luôn là 'user')
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Tạo hồ sơ cho tài khoản đã tồn tại trước khi có trigger (nếu có)
insert into public.profiles (id, display_name)
select id, split_part(email, '@', 1) from auth.users
on conflict (id) do nothing;

create or replace function public.weekly_stats(p_days int default 7)
returns table (day date, minutes bigint, tasks_completed bigint)
language sql stable security invoker set search_path = '' as $$
  with tz as (
    select coalesce(
      (select p.timezone from public.profiles p where p.id = (select auth.uid())),
      'Asia/Ho_Chi_Minh'
    ) as name
  ),
  days as (
    select ((now() at time zone tz.name)::date - (p_days - 1) + g.i) as day, tz.name
    from tz, generate_series(0, p_days - 1) as g(i)
  )
  select
    d.day,
    coalesce((
      select sum(l.minutes) from public.study_logs l
      where l.user_id = (select auth.uid()) and l.study_date = d.day
    ), 0)::bigint,
    coalesce((
      select count(*) from public.tasks t
      where t.user_id = (select auth.uid())
        and t.status = 'completed'
        and (t.completed_at at time zone d.name)::date = d.day
    ), 0)::bigint
  from days d
  order by d.day;
$$;

revoke execute on function public.weekly_stats(int) from public, anon;
grant execute on function public.weekly_stats(int) to authenticated;
