-- 完納奨励金 rule versions + results (F009).
create table public.incentive_rule_version (
  id uuid primary key default gen_random_uuid(),
  version_no integer not null,
  effective_from date not null,
  status text not null default 'pending_approval'
    check (status in ('pending_approval', 'active', 'rolled_back')),
  rate_table jsonb,
  created_by uuid references public.app_user (id),
  approved_by uuid references public.app_user (id),
  created_at timestamptz not null default now()
);

comment on table public.incentive_rule_version is
  'F009 SM-001: maker-checker (BR-003, enforced in the app layer, not a DB '
  'constraint -- it compares created_by to the caller), future effective_from, '
  'per-version rollback.';

create unique index idx_incentive_rule_version_no on public.incentive_rule_version (version_no);

create table public.incentive_result (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participant (id),
  period date not null,
  amount_jpy integer not null, -- JPY, integer only
  rule_version_id uuid not null references public.incentive_rule_version (id),
  kind text not null default 'normal' check (kind in ('normal', 'delta')),
  origin_period date,
  source_correction_id uuid references public.correction_request (id),
  created_at timestamptz not null default now()
);

comment on table public.incentive_result is
  'F009 A5 output, append-only. kind=delta rows amend a locked prior period '
  'without ever touching that period''s kind=normal row (FR-401).';

create index idx_incentive_result_participant_period on public.incentive_result (participant_id, period);

-- MOCK TABLE -- added by the LAB-3 plan, not defined in any F00x spec. F009's
-- ALG-002 needs eligible_amount_jpy and paid_on_time as inputs and no spec
-- supplies a source table for them. Declare this as mock in Phase 10's
-- deliverables; do not treat it as a real payment ledger.
create table public.payment_record (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participant (id),
  business_date date not null,
  due_date date not null,
  paid_on date, -- date only, like every other business date in this schema (JST)
  eligible_amount_jpy integer not null check (eligible_amount_jpy >= 0),
  paid_on_time boolean generated always as
    (paid_on is not null and paid_on <= due_date) stored, -- date <= date is IMMUTABLE
  created_at timestamptz not null default now()
);

comment on table public.payment_record is
  'MOCK -- added by the LAB-3 plan, not defined in any F00x spec. Supplies '
  'ALG-002 inputs (eligible_amount_jpy, paid_on_time). See Phase 10 disclosure.';

create index idx_payment_record_participant_business_date
  on public.payment_record (participant_id, business_date);
