-- AI daily limits. Run once in Supabase: SQL Editor -> New query -> paste -> Run (safe to re-run).
-- The "ai" Edge Function calls ai_take_quota() before every model request.

create table if not exists public.ai_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null default ((now() at time zone 'utc')::date),
  count integer not null default 0,
  primary key (user_id, day)
);

alter table public.ai_usage enable row level security;
-- no policies on purpose: nobody can read or edit counters directly, only through the function below.

create or replace function public.ai_take_quota(max_per_day integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  used integer;
begin
  if auth.uid() is null then
    return -1;
  end if;

  insert into public.ai_usage (user_id, day, count)
  values (auth.uid(), (now() at time zone 'utc')::date, 1)
  on conflict (user_id, day)
  do update set count = public.ai_usage.count + 1
  where public.ai_usage.count < max_per_day
  returning count into used;

  if used is null then
    return -1;                     -- limit reached: row not updated
  end if;
  return max_per_day - used;       -- requests left today
end $$;

revoke all on function public.ai_take_quota(integer) from public, anon;
grant execute on function public.ai_take_quota(integer) to authenticated;
