-- Fix #1 -- service_role could not even reach the trigger's own lock lookup:
-- BYPASSRLS only skips RLS policies, it does NOT grant schema/function
-- privileges. private schema + its functions were only granted to
-- `authenticated`, so a service-role UPDATE tripped over the trigger calling
-- private.is_business_day_locked() with "permission denied for schema private"
-- instead of the intended ERR_LOCKED_BUSINESS_DAY. Verified empirically while
-- proving the lock (Success Criteria #1 / #5): PATCH via the secret key
-- returned 42501, not P0001.
grant usage on schema private to service_role;
grant execute on function private.is_business_day_locked(date) to service_role;

-- Fix #2 -- the lock condition inside RLS's USING clause silently filters the
-- row out of the UPDATE before the BEFORE ROW trigger ever runs (RLS row
-- filtering happens ahead of trigger execution), so a normal `authenticated`
-- client hit a plain "200 / []" -- not the ERR_LOCKED_BUSINESS_DAY error the
-- rest of the system depends on to tell "locked" apart from "no such row" or
-- "wrong role". Confirmed empirically against the deployed policies.
--
-- Fix: RLS keeps only the ROLE check (still blocks the wrong role's write
-- outright); the lock check is removed from RLS entirely and left as the
-- trigger's exclusive job, so trg_block_after_lock fires -- and raises the
-- same P0001 -- for every caller: authenticated, service_role, and psql alike.

drop policy "no_write_when_locked" on public.mekiki_record;
create policy "write_judge_update" on public.mekiki_record for update to authenticated
  using (private.current_user_role() = 'ROLE-JUDGE')
  with check (private.current_user_role() = 'ROLE-JUDGE');

drop policy "no_delete_when_locked" on public.mekiki_record;
create policy "write_judge_delete" on public.mekiki_record for delete to authenticated
  using (private.current_user_role() = 'ROLE-JUDGE');

drop policy "no_write_when_locked" on public.transaction;
create policy "write_trade_update" on public.transaction for update to authenticated
  using (private.current_user_role() = 'ROLE-TRADE')
  with check (private.current_user_role() = 'ROLE-TRADE');

drop policy "no_write_when_locked" on public.seri_result;
create policy "write_trade_settlement_update" on public.seri_result for update to authenticated
  using (private.current_user_role() in ('ROLE-TRADE', 'ROLE-SETTLEMENT'))
  with check (private.current_user_role() in ('ROLE-TRADE', 'ROLE-SETTLEMENT'));

drop policy "no_write_when_locked" on public.delivery_shipment;
create policy "write_delivery_update" on public.delivery_shipment for update to authenticated
  using (private.current_user_role() = 'ROLE-DELIVERY')
  with check (private.current_user_role() = 'ROLE-DELIVERY');
