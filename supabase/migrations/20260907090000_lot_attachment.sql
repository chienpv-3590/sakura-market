-- FR-LOT-01 chứng từ tiếp nhận (D-LOT, TBL-ATTACH-01, DR-IMAGE-01): the
-- receipt document handed over at intake becomes a real file, not the typed
-- string phase-06 smuggled into audit_log.after (see docs/pham-vi-va-phan-
-- mock.md § SC-31). One lot can carry more than one receipt image/PDF, so
-- this is its own table keyed to lot -- not a single `lot.intake_docs`
-- column -- mirroring the shape correction_request/evidence_path (F008)
-- already proved out for attachment storage.
--
-- No business_date column and no trg_block_after_lock trigger here, on
-- purpose: QĐ-3 (see 20260904090200_lot.sql) already exempts `lot` itself
-- from the day-lock -- a lot received on a locked day still sells the next
-- day -- and this table is that same lot's own intake-time evidence, not a
-- day-scoped event row like mekiki_record/seri_result/delivery_shipment.
create table public.lot_attachment (
  id uuid primary key default gen_random_uuid(),
  lot_id uuid not null references public.lot (id),
  file_path text not null,
  file_name text not null,
  mime_type text not null,
  file_size integer not null check (file_size > 0),
  uploaded_by uuid references public.app_user (id),
  created_at timestamptz not null default now()
);

comment on table public.lot_attachment is
  'FR-LOT-01. Append-only: no update/delete policy exists, matching '
  'audit_log -- receipt evidence is not edited in place, only added to.';

create index idx_lot_attachment_lot on public.lot_attachment (lot_id);

alter table public.lot_attachment enable row level security;

-- Read: every active role, consistent with read_all_active_users on the
-- other 16 business tables (rls_core.sql).
create policy "read_all_active_users" on public.lot_attachment for select to authenticated
  using (private.current_user_role() is not null);

-- Write: ROLE-INTAKE only -- they are the ones receiving the lot (mirrors
-- lot's own "write_intake" insert policy in rls_ops.sql).
create policy "write_intake" on public.lot_attachment for insert to authenticated
  with check (private.current_user_role() = 'ROLE-INTAKE');

-- Private evidence bucket (never public -- Security Considerations, same as
-- F008's correction-evidence). Phase 08-follow-up serves files through a
-- server-generated signed URL only.
insert into storage.buckets (id, name, public)
values ('lot-attachment', 'lot-attachment', false)
on conflict (id) do nothing;

create policy "lot_attachment_insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'lot-attachment' and private.current_user_role() = 'ROLE-INTAKE');

create policy "lot_attachment_read" on storage.objects for select to authenticated
  using (bucket_id = 'lot-attachment' and private.current_user_role() is not null);
