-- Delivery tracking (F006).
-- QĐ-3: delivery itself is NOT locked -- a delivery for a transaction on a
-- locked day still has to ship the next day. Only delivery_shipment (the
-- per-event ledger, one row per actual shipment) carries business_date and the
-- lock trigger, because a single shipment event is the thing that truly
-- belongs to one business day.
create table public.delivery (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.transaction (id),
  status text not null default 'chờ'
    check (status in ('chờ', 'đang giao', 'hoàn tất', 'ngoại lệ')),
  delivered_qty numeric(12, 2) not null default 0 check (delivered_qty >= 0),
  created_at timestamptz not null default now()
);

comment on table public.delivery is
  'F006. QĐ-3: NOT covered by trg_block_after_lock -- spans business days.';

create index idx_delivery_transaction on public.delivery (transaction_id);

create table public.delivery_shipment (
  id uuid primary key default gen_random_uuid(),
  delivery_id uuid not null references public.delivery (id),
  seq integer not null check (seq > 0),
  qty numeric(12, 2) not null check (qty > 0),
  shipped_at timestamptz not null default now(),
  confirmed_by uuid references public.app_user (id),
  business_date date not null, -- QĐ-2: the day THIS shipment happened
  created_at timestamptz not null default now(),
  unique (delivery_id, seq)
);

comment on table public.delivery_shipment is
  'F006 A2: one row per shipment event, cumulative into delivery.delivered_qty. '
  'Locked by trg_block_after_lock once its OWN business_date is locked -- '
  'independent of the parent transaction''s business_date.';

create index idx_delivery_shipment_delivery on public.delivery_shipment (delivery_id);
