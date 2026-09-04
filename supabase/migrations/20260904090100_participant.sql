-- Participant lifecycle (F002): 4 fixed categories, FIG-010 eligibility state.
create table public.participant (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('卸売業者', '仲卸', '売買参加者', '買出人')),
  name text not null,
  license_type text not null,
  status text not null default 'có hiệu lực'
    check (status in ('có hiệu lực', 'tạm ngừng', 'mất hiệu lực', 'xét lại')),
  valid_from date not null,
  valid_to date,
  created_at timestamptz not null default now()
);

comment on table public.participant is
  'F002: 1 of 4 fixed categories + FIG-010 eligibility status. category is '
  'immutable after create (enforced by the app layer, not a DB constraint).';

create table public.participant_status_history (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participant (id),
  from_status text,
  to_status text not null,
  reason text not null,
  changed_by uuid references public.app_user (id),
  changed_at timestamptz not null default now()
);

comment on table public.participant_status_history is
  'F002 A3: one row per FIG-010 transition, source for audit trail + state replay.';

create index idx_participant_status_history_participant
  on public.participant_status_history (participant_id);
