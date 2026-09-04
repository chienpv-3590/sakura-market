-- 相対取引 (F004) + せり (F005).
-- QĐ-1: seri_result stays its own table. F004's raw spec describes a
-- transaction.type discriminator (DISC-001) shared with seri, but F005/F007/F010
-- all treat seri as a separate table (3-vs-1) -- LAB-3 follows the majority and
-- keeps transaction.type CHECK'd to 'aitai' only, so the diagram in LAB-4 can
-- record exactly where the prototype diverged from the original design.
create table public.transaction (
  id uuid primary key default gen_random_uuid(),
  txn_code text not null unique,
  type text not null default 'aitai' check (type = 'aitai'),
  lot_id uuid not null references public.lot (id),
  buyer_participant_id uuid not null references public.participant (id),
  qty numeric(12, 2) not null check (qty > 0),
  unit_price integer not null check (unit_price > 0), -- JPY, integer only, no decimals
  business_date date not null,
  status text not null default 'draft' check (status in ('draft', 'confirmed', 'cancelled')),
  confirmed_by uuid references public.app_user (id),
  confirmed_at timestamptz,
  cancel_reason text,
  cancelled_by uuid references public.app_user (id),
  cancelled_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.transaction is
  'F004 相対取引. Locked by trg_block_after_lock once business_date is locked.';

create index idx_transaction_lot on public.transaction (lot_id);
create index idx_transaction_business_date on public.transaction (business_date);

create table public.seri_result (
  id uuid primary key default gen_random_uuid(),
  lot_id uuid not null references public.lot (id),
  winner_participant_id uuid not null references public.participant (id),
  qty numeric(12, 2) not null check (qty > 0),
  unit_price integer not null check (unit_price > 0),
  decided_at timestamptz not null default now(),
  confirmed_by uuid references public.app_user (id),
  business_date date not null, -- QĐ-2 denormalization
  created_at timestamptz not null default now()
);

comment on table public.seri_result is
  'F005 せり, kept separate from transaction (QĐ-1). '
  'Locked by trg_block_after_lock once business_date is locked.';

create index idx_seri_result_lot on public.seri_result (lot_id);
