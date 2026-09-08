-- IF-ACC-01 / FN-11 / FE-037 (P0): the batch table RFP §08-03/§08-05
-- requires but that has nowhere to live otherwise -- the daily reconciled
-- data exported to the finance department's own accounting system, tagged
-- with the batch code + creation time + business date + creator those two
-- sections mandate. See plan phase-02 §Key Insights for the two working
-- assumptions this table encodes (tax rate/basis, batch lifecycle) --
-- both PENDING CUSTOMER CONFIRMATION, not settled fact.
--
-- No tax column on `transaction` (grep for tax/thuế/消費税 across the repo
-- returns 0 hits, and RFP never states rate/basis/per-line-vs-per-day) --
-- tax is derived at export time from a single constant (src/lib/accounting/
-- tax.ts) and the rate used is stamped onto every batch row as
-- `tax_rate_bps`, the same FR-AUDIT-03 discipline `incentive_result` already
-- uses for `rule_version_id`: change the constant later and old batches
-- still explain themselves.
create table public.accounting_export_batch (
  id uuid primary key default gen_random_uuid(),
  batch_code text not null unique,               -- ACC-YYYYMMDD-NN, working assumption (see batch-code.ts)
  business_date date not null,
  seq integer not null check (seq > 0),           -- 1-based, per business_date -- NOT unique per calendar day alone
  kind text not null check (kind in ('full', 're-export')),
  tax_rate_bps integer not null check (tax_rate_bps >= 0),
  tax_basis text not null check (tax_basis in ('exclusive', 'inclusive')),
  row_count integer not null check (row_count >= 0),
  total_net_amount_jpy bigint not null,           -- bigint: a wholesale market's daily total can exceed int4
  total_tax_jpy bigint not null,
  lines jsonb not null,                           -- immutable snapshot of exactly the lines this batch sent
  exported_by uuid references public.app_user (id),
  exported_at timestamptz not null default now(),
  unique (business_date, seq)
);

comment on table public.accounting_export_batch is
  'IF-ACC-01/FR-SETTLE-02. Append-only: no update/delete policy exists anywhere '
  '(matches audit_log/lot_attachment) -- an export already handed to the finance '
  'department must never be edited in place, only superseded by a new batch. '
  'Every export -- including a re-export of an already-exported day -- gets a '
  'brand new batch_code (working assumption, see phase-02 §Key Insights #2): a '
  'locked day can still change through transaction_adjustment (F008, the one '
  'lawful post-lock write path), so a single immutable batch per day would '
  'leave accounting permanently out of step after the first correction.';

create index idx_accounting_export_batch_business_date on public.accounting_export_batch (business_date);

alter table public.accounting_export_batch enable row level security;

-- Read: every active role, consistent with read_all_active_users on the
-- other 17 business tables (rls_core.sql).
create policy "read_all_active_users" on public.accounting_export_batch for select to authenticated
  using (private.current_user_role() is not null);

-- Write: ROLE-SETTLEMENT only -- they own F007 reconciliation/lock and F008
-- post-lock correction, so exporting the reconciled result to accounting is
-- their action too (mirrors business_day_lock's own "write_settlement").
-- Deliberately no update/delete policy -- append-only, matching audit_log.
create policy "write_settlement" on public.accounting_export_batch for insert to authenticated
  with check (private.current_user_role() = 'ROLE-SETTLEMENT');

-- No trg_block_after_lock here, and none is missing by accident: that
-- trigger is BEFORE UPDATE OR DELETE on exactly 4 tables (transaction,
-- seri_result, mekiki_record, delivery_shipment -- see
-- 20260904091100_lock_enforcement_fix.sql) and never fires on INSERT. This
-- table only ever receives INSERTs, and an export is the one write that
-- MUST succeed for an already-locked business day -- QĐ-3/QĐ-4 exempt it
-- for the same reason correction_request/transaction_adjustment/
-- lot_attachment carry no such trigger: this is a record made ABOUT a
-- locked day, not a write INTO that day's own business events.
