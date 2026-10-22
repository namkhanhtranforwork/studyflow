create or replace function public.weekly_stats(p_days int default 7)
returns table (day date, minutes bigint, tasks_completed bigint)
language plpgsql stable security invoker set search_path = '' as $$
begin
  if p_days is null or p_days < 1 or p_days > 31 then
    raise exception 'p_days must be between 1 and 31'
      using errcode = '22023';
  end if;

  return query
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
end;
$$;

revoke execute on function public.weekly_stats(int) from public, anon;
grant execute on function public.weekly_stats(int) to authenticated;
