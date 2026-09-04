-- RLS layer, part 2/2: write policies for F004..F009, continuing from
-- rls_core.sql. Every "no_write_when_locked" policy here is layer 1 only --
-- service_role bypasses RLS entirely (BYPASSRLS), so the real guarantee is the
-- trg_block_after_lock trigger in business_day_lock.sql, not this policy.

-- transaction (F004): ROLE-TRADE only.
create policy "write_trade" on public.transaction for insert to authenticated
  with check (private.current_user_role() = 'ROLE-TRADE');
create policy "no_write_when_locked" on public.transaction for update to authenticated
  using (private.current_user_role() = 'ROLE-TRADE' and not private.is_business_day_locked(business_date))
  with check (private.current_user_role() = 'ROLE-TRADE' and not private.is_business_day_locked(business_date));

-- seri_result (F005): ROLE-TRADE creates; ROLE-TRADE or ROLE-SETTLEMENT can
-- later edit with a reason (F005 A3).
create policy "write_trade" on public.seri_result for insert to authenticated
  with check (private.current_user_role() = 'ROLE-TRADE');
create policy "no_write_when_locked" on public.seri_result for update to authenticated
  using (
    private.current_user_role() in ('ROLE-TRADE', 'ROLE-SETTLEMENT')
    and not private.is_business_day_locked(business_date)
  )
  with check (
    private.current_user_role() in ('ROLE-TRADE', 'ROLE-SETTLEMENT')
    and not private.is_business_day_locked(business_date)
  );

-- delivery (F006): ROLE-DELIVERY + ROLE-SETTLEMENT (both may confirm
-- completion per functional-spec.md §5.2). QĐ-3: no lock check -- spans days.
create policy "write_delivery_ops_insert" on public.delivery for insert to authenticated
  with check (private.current_user_role() in ('ROLE-DELIVERY', 'ROLE-SETTLEMENT'));
create policy "write_delivery_ops_update" on public.delivery for update to authenticated
  using (private.current_user_role() in ('ROLE-DELIVERY', 'ROLE-SETTLEMENT'))
  with check (private.current_user_role() in ('ROLE-DELIVERY', 'ROLE-SETTLEMENT'));

-- delivery_shipment (F006 A2): ROLE-DELIVERY inserts; locked by its own
-- business_date (QĐ-2), independent of the parent transaction's business_date.
create policy "write_delivery" on public.delivery_shipment for insert to authenticated
  with check (private.current_user_role() = 'ROLE-DELIVERY');
create policy "no_write_when_locked" on public.delivery_shipment for update to authenticated
  using (private.current_user_role() = 'ROLE-DELIVERY' and not private.is_business_day_locked(business_date))
  with check (private.current_user_role() = 'ROLE-DELIVERY' and not private.is_business_day_locked(business_date));

-- business_day_lock (F007 A2): ROLE-SETTLEMENT, insert-only. The primary key on
-- business_date turns a double-lock race into a 409 at the app layer.
create policy "write_settlement" on public.business_day_lock for insert to authenticated
  with check (private.current_user_role() = 'ROLE-SETTLEMENT');

-- correction_request / transaction_adjustment (F008): ROLE-SETTLEMENT on both
-- ends. Maker-checker (requester != approver) is enforced by the app layer
-- comparing requested_by to the caller, not by a separate DB role. Never
-- touched by the lock trigger -- this pair is the one valid write path after
-- lock (BR-001/BR-002).
create policy "write_settlement_insert" on public.correction_request for insert to authenticated
  with check (private.current_user_role() = 'ROLE-SETTLEMENT');
create policy "write_settlement_update" on public.correction_request for update to authenticated
  using (private.current_user_role() = 'ROLE-SETTLEMENT')
  with check (private.current_user_role() = 'ROLE-SETTLEMENT');
create policy "write_settlement" on public.transaction_adjustment for insert to authenticated
  with check (private.current_user_role() = 'ROLE-SETTLEMENT');

-- incentive_rule_version (F009): ROLE-RULE-ADMIN on both ends (maker-checker
-- BR-003 enforced in the app layer, same pattern as F008).
create policy "write_rule_admin_insert" on public.incentive_rule_version for insert to authenticated
  with check (private.current_user_role() = 'ROLE-RULE-ADMIN');
create policy "write_rule_admin_update" on public.incentive_rule_version for update to authenticated
  using (private.current_user_role() = 'ROLE-RULE-ADMIN')
  with check (private.current_user_role() = 'ROLE-RULE-ADMIN');

-- incentive_result: system/background job only (F009 A5) -- deliberately no
-- authenticated write policy. Written via service_role (bypasses RLS) or a
-- SECURITY DEFINER function; regular sessions get read-only access from
-- rls_core.sql's shared read policy.

-- payment_record: seed-only mock data (see 20260904090700_incentive.sql) --
-- deliberately no authenticated write policy either.
