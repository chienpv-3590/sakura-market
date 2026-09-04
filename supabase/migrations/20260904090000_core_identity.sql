-- Core identity: private schema, app_user, audit_log, RLS recursion-breaker function.
-- private schema holds SECURITY DEFINER helpers so RLS policies on app_user (and
-- every other table) never query app_user directly and trip 42P17 recursion.

create schema if not exists private;

create table public.app_user (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text,
  role text not null check (
    role in (
      'ROLE-INTAKE', 'ROLE-JUDGE', 'ROLE-TRADE', 'ROLE-DELIVERY',
      'ROLE-SETTLEMENT', 'ROLE-RULE-ADMIN', 'ROLE-SYS-ADMIN'
    )
  ),
  is_active boolean not null default true,
  failed_login_count integer not null default 0,
  locked_until timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.app_user is
  'F001/F011 internal operator accounts; role drives every RLS policy in the system.';

create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.app_user (id),
  action text not null,
  entity text not null,
  entity_id text not null,
  before jsonb,
  after jsonb,
  reason text,
  created_at timestamptz not null default now()
);

comment on table public.audit_log is
  'FR-AUDIT-01 (F011) trail: actor/timestamp/before-after/reason. Append-only -- '
  'no update/delete policy exists anywhere for this table.';

-- SECURITY DEFINER breaks RLS recursion: every policy that needs the caller's
-- role calls this function instead of querying public.app_user directly.
-- set search_path = '' + schema-qualified names is required to avoid a
-- search_path privilege-escalation hole on a SECURITY DEFINER function.
create or replace function private.current_user_role()
returns text
language sql
security definer
set search_path = ''
stable
as $$
  select role from public.app_user
   where id = (select auth.uid()) and is_active
$$;

comment on function private.current_user_role() is
  'Returns the caller role, or null if unknown/inactive. SECURITY DEFINER avoids '
  '42P17 recursion when app_user (and every other table) reads it from an RLS policy.';

grant usage on schema private to authenticated;
grant execute on function private.current_user_role() to authenticated;
