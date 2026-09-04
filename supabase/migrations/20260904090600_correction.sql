-- Post-lock correction (F008): append-only reverse/delta ledger.
-- INSERT into either table below is NEVER blocked by trg_block_after_lock --
-- this pair is the one valid write path once a business day is locked.
create table public.correction_request (
  id uuid primary key default gen_random_uuid(),
  target_txn_id uuid not null references public.transaction (id),
  reason text not null,
  evidence_path text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  requested_by uuid references public.app_user (id),
  approved_by uuid references public.app_user (id),
  created_at timestamptz not null default now()
);

comment on table public.correction_request is
  'F008 A1/A3. BR-001: the original transaction is never touched -- only this '
  'row and transaction_adjustment change, both append-only.';

create table public.transaction_adjustment (
  id uuid primary key default gen_random_uuid(),
  source_correction_id uuid not null references public.correction_request (id),
  target_txn_id uuid not null references public.transaction (id),
  kind text not null check (kind in ('reverse', 'delta')),
  qty_delta numeric(12, 2) not null,
  unit_price_delta integer not null,
  amount_delta integer not null, -- JPY, integer only
  created_at timestamptz not null default now()
);

comment on table public.transaction_adjustment is
  'F008 A3 approve output. Append-only: kind=reverse zeroes the original value, '
  'kind=delta records a partial correction. Never an UPDATE of the original row.';

create index idx_correction_request_target on public.correction_request (target_txn_id);
create index idx_transaction_adjustment_target on public.transaction_adjustment (target_txn_id);

-- Private evidence bucket (Security Considerations): no public access ever.
-- Phase 08 serves files through a server-generated signed URL.
insert into storage.buckets (id, name, public)
values ('correction-evidence', 'correction-evidence', false)
on conflict (id) do nothing;

create policy "correction_evidence_rw"
  on storage.objects for all to authenticated
  using (bucket_id = 'correction-evidence' and private.current_user_role() = 'ROLE-SETTLEMENT')
  with check (bucket_id = 'correction-evidence' and private.current_user_role() = 'ROLE-SETTLEMENT');
