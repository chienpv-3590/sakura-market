-- Business-day lock (F007): the DB-level guarantee, not just an RLS policy.
--
-- Layer 1 = RLS write policies on transaction/seri_result/mekiki_record/
--   delivery_shipment (see rls_core.sql + rls_ops.sql) -- blocks the normal
--   `authenticated` app path with a clean, policy-shaped rejection.
-- Layer 2 = the trigger below -- the real guarantee. service_role (used by any
--   server-side admin client) carries Postgres's BYPASSRLS attribute and skips
--   every RLS policy outright, so RLS alone does NOT stop a Route Handler bug
--   (or a direct psql session) from writing through a locked day. A trigger is
--   a different mechanism than RLS and fires regardless of caller.

create table public.business_day_lock (
  business_date date primary key,
  locked_at timestamptz not null default now(),
  locked_by uuid references public.app_user (id)
);

comment on table public.business_day_lock is
  'F007 A2. The existence of a row IS "locked". Insert-only; the primary key on '
  'business_date rejects a double-lock race with a unique-violation.';

create or replace function private.is_business_day_locked(d date)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (select 1 from public.business_day_lock where business_date = d)
$$;

comment on function private.is_business_day_locked(date) is
  'Shared lookup used by both the RLS policies (layer 1) and the trigger (layer 2).';

grant execute on function private.is_business_day_locked(date) to authenticated;

create or replace function private.block_writes_when_locked()
returns trigger
language plpgsql
as $$
begin
  if private.is_business_day_locked(coalesce(new.business_date, old.business_date)) then
    raise exception 'ERR_LOCKED_BUSINESS_DAY: ngay nghiep vu % da lock, khong the sua/xoa ban ghi',
      coalesce(new.business_date, old.business_date)
      using errcode = 'P0001';
  end if;
  return coalesce(new, old);
end;
$$;

comment on function private.block_writes_when_locked() is
  'BEFORE UPDATE/DELETE guard, raises ERR_LOCKED_BUSINESS_DAY (SQLSTATE P0001). '
  'Fires for every caller including service_role/BYPASSRLS clients and raw psql -- '
  'this is the actual guarantee behind BR-001/BR-002/FR-402, RLS is only layer 1.';

-- QĐ-3: exactly these 4 tables carry the trigger. NEVER lot or delivery -- both
-- legitimately span business days (a lot received on a locked day still sells
-- the next day; a delivery for a locked-day transaction still ships the next
-- day). Locking either would freeze live business, not just historical data.

create trigger trg_block_after_lock
  before update or delete on public.transaction
  for each row execute function private.block_writes_when_locked();

create trigger trg_block_after_lock
  before update or delete on public.seri_result
  for each row execute function private.block_writes_when_locked();

create trigger trg_block_after_lock
  before update or delete on public.mekiki_record
  for each row execute function private.block_writes_when_locked();

create trigger trg_block_after_lock
  before update or delete on public.delivery_shipment
  for each row execute function private.block_writes_when_locked();
