-- RLS layer, part 1/2: enable RLS on all 16 business tables, add the shared
-- read policy, then write policies for F001 (app_user), F011 (audit_log),
-- F002 (participant, participant_status_history) and F003 (lot, mekiki_record).
-- See rls_ops.sql for F004..F009 write policies (split only to keep both files
-- under the 200-line limit -- both are one logical layer).
--
-- Every auth.uid()/current_user_role() call is written so Postgres evaluates it
-- once per statement rather than once per row (Supabase performance guidance):
-- current_user_role() itself already wraps auth.uid() as (select auth.uid()).

alter table public.app_user enable row level security;
alter table public.audit_log enable row level security;
alter table public.participant enable row level security;
alter table public.participant_status_history enable row level security;
alter table public.lot enable row level security;
alter table public.mekiki_record enable row level security;
alter table public.transaction enable row level security;
alter table public.seri_result enable row level security;
alter table public.delivery enable row level security;
alter table public.delivery_shipment enable row level security;
alter table public.business_day_lock enable row level security;
alter table public.correction_request enable row level security;
alter table public.transaction_adjustment enable row level security;
alter table public.incentive_rule_version enable row level security;
alter table public.incentive_result enable row level security;
alter table public.payment_record enable row level security;

-- Shared read policy: any active app_user can SELECT any business table.
-- FR-601 (F007) requires other roles to at least have read-only visibility, and
-- the LAB-7 reviewer accounts need to see the whole system end to end.
create policy "read_all_active_users" on public.app_user for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.audit_log for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.participant for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.participant_status_history for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.lot for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.mekiki_record for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.transaction for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.seri_result for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.delivery for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.delivery_shipment for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.business_day_lock for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.correction_request for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.transaction_adjustment for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.incentive_rule_version for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.incentive_result for select to authenticated
  using (private.current_user_role() is not null);
create policy "read_all_active_users" on public.payment_record for select to authenticated
  using (private.current_user_role() is not null);

-- audit_log: insert-only for every active role. No update/delete policy exists
-- for this table anywhere -- audit rows must be immutable.
create policy "insert_any_active_user" on public.audit_log for insert to authenticated
  with check (private.current_user_role() is not null);

-- participant / participant_status_history: ROLE-SYS-ADMIN writes
-- (phase-03 §Architecture "Bảng và quyền ghi").
create policy "write_sys_admin_insert" on public.participant for insert to authenticated
  with check (private.current_user_role() = 'ROLE-SYS-ADMIN');
create policy "write_sys_admin_update" on public.participant for update to authenticated
  using (private.current_user_role() = 'ROLE-SYS-ADMIN')
  with check (private.current_user_role() = 'ROLE-SYS-ADMIN');
create policy "write_sys_admin_insert" on public.participant_status_history for insert to authenticated
  with check (private.current_user_role() = 'ROLE-SYS-ADMIN');

-- lot: ROLE-INTAKE creates (F003 A1); ROLE-INTAKE/ROLE-JUDGE/ROLE-TRADE/
-- ROLE-SETTLEMENT update available_qty/status from their own flows (F003 A2
-- publish, F004/F005 reserve-release, F003 A6 adjust). QĐ-3: no lock check here.
create policy "write_intake" on public.lot for insert to authenticated
  with check (private.current_user_role() = 'ROLE-INTAKE');
create policy "write_lot_operational" on public.lot for update to authenticated
  using (private.current_user_role() in ('ROLE-INTAKE', 'ROLE-JUDGE', 'ROLE-TRADE', 'ROLE-SETTLEMENT'))
  with check (private.current_user_role() in ('ROLE-INTAKE', 'ROLE-JUDGE', 'ROLE-TRADE', 'ROLE-SETTLEMENT'));

-- mekiki_record: ROLE-JUDGE inserts (F003 A2). F003 defines no edit action, but
-- the lock-aware update/delete policies are added anyway for defense in depth,
-- matching the 4-table trigger set in business_day_lock.sql.
create policy "write_judge" on public.mekiki_record for insert to authenticated
  with check (private.current_user_role() = 'ROLE-JUDGE');
create policy "no_write_when_locked" on public.mekiki_record for update to authenticated
  using (private.current_user_role() = 'ROLE-JUDGE' and not private.is_business_day_locked(business_date))
  with check (private.current_user_role() = 'ROLE-JUDGE' and not private.is_business_day_locked(business_date));
create policy "no_delete_when_locked" on public.mekiki_record for delete to authenticated
  using (private.current_user_role() = 'ROLE-JUDGE' and not private.is_business_day_locked(business_date));
