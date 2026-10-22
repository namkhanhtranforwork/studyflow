-- Create fixtures first and replace these placeholders with their UUIDs:
-- USER_A_UUID, USER_B_UUID, ADMIN_UUID, USER_A_GOAL_UUID, USER_B_GOAL_UUID,
-- USER_A_TASK_UUID, USER_B_TASK_UUID, USER_A_LOG_UUID, USER_B_LOG_UUID.
-- USER_A and USER_B must each own a goal, a task, and a study log.
-- Run against a development project as a database owner, not in production.

do $$
begin
  if not exists (select 1 from public.profiles where id = 'USER_A_UUID'::uuid)
    or not exists (select 1 from public.profiles where id = 'USER_B_UUID'::uuid)
    or not exists (
      select 1 from public.profiles
      where id = 'ADMIN_UUID'::uuid and role = 'admin'
    )
    or not exists (
      select 1 from public.goals
      where id = 'USER_A_GOAL_UUID'::uuid and user_id = 'USER_A_UUID'::uuid
    )
    or not exists (
      select 1 from public.goals
      where id = 'USER_B_GOAL_UUID'::uuid and user_id = 'USER_B_UUID'::uuid
    )
    or not exists (
      select 1 from public.tasks
      where id = 'USER_A_TASK_UUID'::uuid and user_id = 'USER_A_UUID'::uuid
    )
    or not exists (
      select 1 from public.tasks
      where id = 'USER_B_TASK_UUID'::uuid and user_id = 'USER_B_UUID'::uuid
    )
    or not exists (
      select 1 from public.study_logs
      where id = 'USER_A_LOG_UUID'::uuid and user_id = 'USER_A_UUID'::uuid
    )
    or not exists (
      select 1 from public.study_logs
      where id = 'USER_B_LOG_UUID'::uuid and user_id = 'USER_B_UUID'::uuid
    )
  then
    raise exception 'Create the documented RLS test fixtures before running this script';
  end if;
end
$$;

begin;
  set local role authenticated;
  select set_config(
    'request.jwt.claims',
    json_build_object('sub', 'USER_A_UUID', 'role', 'authenticated')::text,
    true
  );

  do $$
  begin
    if not exists (
      select 1 from public.profiles where id = 'USER_A_UUID'::uuid
    ) or exists (
      select 1 from public.profiles where id = 'USER_B_UUID'::uuid
    ) then
      raise exception 'User A profile visibility is incorrect';
    end if;

    if not exists (
      select 1 from public.goals where id = 'USER_A_GOAL_UUID'::uuid
    ) or exists (
      select 1 from public.goals where id = 'USER_B_GOAL_UUID'::uuid
    ) then
      raise exception 'User A goal isolation is incorrect';
    end if;

    if not exists (
      select 1 from public.tasks where id = 'USER_A_TASK_UUID'::uuid
    ) or exists (
      select 1 from public.tasks where id = 'USER_B_TASK_UUID'::uuid
    ) then
      raise exception 'User A task isolation is incorrect';
    end if;

    if not exists (
      select 1 from public.study_logs where id = 'USER_A_LOG_UUID'::uuid
    ) or exists (
      select 1 from public.study_logs where id = 'USER_B_LOG_UUID'::uuid
    ) then
      raise exception 'User A study-log isolation is incorrect';
    end if;

    begin
      perform 1 from public.weekly_stats(0);
      raise exception 'weekly_stats unexpectedly accepted an invalid day count';
    exception
      when invalid_parameter_value then null;
    end;

    begin
      insert into public.goals (user_id, title)
      values ('USER_B_UUID', 'RLS test');
      raise exception 'User A unexpectedly inserted a goal for user B';
    exception
      when insufficient_privilege then null;
    end;

    begin
      update public.profiles set role = 'admin'
      where id = 'USER_A_UUID'::uuid;
      raise exception 'User A unexpectedly changed their role';
    exception
      when insufficient_privilege then null;
    end;

    begin
      insert into public.tasks (user_id, goal_id, title)
      values ('USER_A_UUID', 'USER_B_GOAL_UUID', 'Cross-account RLS test');
      raise exception 'User A unexpectedly attached a task to user B''s goal';
    exception
      when foreign_key_violation then null;
    end;
  end
  $$;
rollback;

begin;
  set local role authenticated;
  select set_config(
    'request.jwt.claims',
    json_build_object('sub', 'ADMIN_UUID', 'role', 'authenticated')::text,
    true
  );

  do $$
  declare
    affected_rows integer;
  begin
    if not exists (
      select 1 from public.profiles where id = 'USER_A_UUID'::uuid
    ) then
      raise exception 'Admin cannot read user profiles';
    end if;

    if exists (
      select 1 from public.goals where id = 'USER_A_GOAL_UUID'::uuid
    ) or exists (
      select 1 from public.tasks where id = 'USER_A_TASK_UUID'::uuid
    ) or exists (
      select 1 from public.study_logs where id = 'USER_A_LOG_UUID'::uuid
    ) then
      raise exception 'Admin can read private user content';
    end if;

    begin
      update public.profiles set role = 'admin'
      where id = 'USER_A_UUID'::uuid;
      raise exception 'Admin unexpectedly changed a user role';
    exception
      when insufficient_privilege then null;
    end;

    update public.goals set title = 'Admin write test'
    where id = 'USER_A_GOAL_UUID'::uuid;
    get diagnostics affected_rows = row_count;
    if affected_rows <> 0 then
      raise exception 'Admin unexpectedly changed a private goal';
    end if;
  end
  $$;
rollback;
