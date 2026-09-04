-- Lot intake + 目利き (F003).
-- BR-LOT-02: available_qty never negative. This CHECK is the second line of
-- defense; the first is the atomic conditional UPDATE used at every call site
-- in F004/F005/F006 (UPDATE ... WHERE available_qty >= qty).
create table public.lot (
  id uuid primary key default gen_random_uuid(),
  lot_code text not null unique,
  item text not null,
  package_count integer not null check (package_count > 0),
  initial_qty numeric(12, 2) not null check (initial_qty > 0),
  available_qty numeric(12, 2) not null check (available_qty >= 0),
  status text not null default 'received'
    check (status in ('received', 'published', 'traded', 'delivered')),
  business_date date not null, -- QĐ-2 denormalization; see phase-03 §Architecture
  created_at timestamptz not null default now()
);

comment on table public.lot is
  'F003. QĐ-3: NOT covered by trg_block_after_lock -- a lot received on a locked '
  'day still sells the next day, so it must stay writable across business days.';

create table public.mekiki_record (
  id uuid primary key default gen_random_uuid(),
  lot_id uuid not null references public.lot (id),
  grade text not null,
  assessor_id uuid references public.app_user (id),
  assessed_at timestamptz not null default now(),
  business_date date not null -- QĐ-2: trigger reads this column directly, no JOIN
);

comment on table public.mekiki_record is
  'F003 A2: manual 目利き input only, no auto-grading (SCOPE-OUT-01). '
  'Locked by trg_block_after_lock once business_date is locked.';

create index idx_mekiki_record_lot on public.mekiki_record (lot_id);
