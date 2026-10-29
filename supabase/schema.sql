-- StudyHub backend schema. Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Every table is private to its owner via row-level security (RLS).

-- ---------------------------------------------------------------- helpers
create or replace function public.touch_synced()
returns trigger language plpgsql as $$
begin
  new.synced_at := now();   -- server clock: used as the pull cursor so offline devices never miss rows
  return new;
end $$;

-- ---------------------------------------------------------------- profile
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Student',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data->>'display_name'), ''), split_part(new.email, '@', 1)))
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- study data
create table if not exists public.attempts (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  uid uuid not null,
  qid text not null,
  subject text not null,
  topic text not null,
  score integer not null,
  max integer not null,
  ts bigint not null,
  synced_at timestamptz not null default now(),
  primary key (user_id, uid)
);

create table if not exists public.cards (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null,
  subject text not null,
  topic text not null,
  ease double precision not null,
  interval double precision not null,
  reps integer not null,
  lapses integer not null,
  due bigint not null,
  updated bigint not null,
  synced_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.note_state (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  key text not null,
  subject text not null,
  status text,
  bookmarked boolean,
  last_opened bigint,
  updated bigint not null,
  synced_at timestamptz not null default now(),
  primary key (user_id, key)
);

create table if not exists public.activity (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  day text not null,
  count integer not null,
  updated bigint not null,
  synced_at timestamptz not null default now(),
  primary key (user_id, day)
);

-- written notes from "My notes" (uploaded files stay on the device)
create table if not exists public.docs (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  uid uuid not null,
  subject text not null,
  topic text not null default '',
  title text not null,
  body text not null default '',
  tags text[] not null default '{}',
  created bigint not null,
  updated bigint not null,
  deleted boolean not null default false,
  synced_at timestamptz not null default now(),
  primary key (user_id, uid)
);

-- pull cursors
create index if not exists attempts_synced on public.attempts (user_id, synced_at);
create index if not exists cards_synced on public.cards (user_id, synced_at);
create index if not exists note_state_synced on public.note_state (user_id, synced_at);
create index if not exists activity_synced on public.activity (user_id, synced_at);
create index if not exists docs_synced on public.docs (user_id, synced_at);

do $$
declare t text;
begin
  foreach t in array array['attempts','cards','note_state','activity','docs'] loop
    execute format('drop trigger if exists touch_synced on public.%I', t);
    execute format('create trigger touch_synced before insert or update on public.%I for each row execute function public.touch_synced()', t);
  end loop;
end $$;

-- ---------------------------------------------------------------- row-level security
alter table public.profiles enable row level security;
alter table public.attempts enable row level security;
alter table public.cards enable row level security;
alter table public.note_state enable row level security;
alter table public.activity enable row level security;
alter table public.docs enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

do $$
declare t text;
begin
  foreach t in array array['attempts','cards','note_state','activity','docs'] loop
    execute format('drop policy if exists "own rows" on public.%I', t);
    execute format('create policy "own rows" on public.%I for all using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
  end loop;
end $$;

-- the public anon key can only reach what these policies allow: nothing without a signed-in user.
revoke all on all tables in schema public from anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
