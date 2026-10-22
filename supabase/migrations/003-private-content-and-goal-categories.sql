alter table public.goals
  add column if not exists category text not null default 'study'
    check (category in ('study', 'work')),
  add column if not exists start_date date;

drop policy if exists goals_admin_read on public.goals;
drop policy if exists tasks_admin_read on public.tasks;
drop policy if exists study_logs_admin_read on public.study_logs;
