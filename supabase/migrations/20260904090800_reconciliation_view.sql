-- F007 A1 reconciliation table: computed on demand, not a physical table, so it
-- never duplicates transaction/seri_result/delivery_shipment data (assumption
-- in dailyreconcileandlock/technical-spec.md §5.2).
-- security_invoker = true: the view runs with the CALLER's own RLS, not the
-- view owner's -- otherwise it could leak rows the caller has no policy for.
create view public.reconciliation_line
  with (security_invoker = true) as
select
  t.business_date,
  'aitai'::text as source_type,
  t.id as source_id,
  t.buyer_participant_id as participant_id,
  t.qty,
  (t.qty * t.unit_price)::integer as amount_jpy,
  t.qty - coalesce((
    select sum(ds.qty)
      from public.delivery_shipment ds
      join public.delivery d on d.id = ds.delivery_id
     where d.transaction_id = t.id
  ), 0) as variance
from public.transaction t
where t.status <> 'cancelled'

union all

select
  s.business_date,
  'seri'::text as source_type,
  s.id as source_id,
  s.winner_participant_id as participant_id,
  s.qty,
  (s.qty * s.unit_price)::integer as amount_jpy,
  null::numeric as variance
from public.seri_result s

union all

select
  ds.business_date,
  'delivery'::text as source_type,
  ds.id as source_id,
  null::uuid as participant_id,
  ds.qty,
  null::integer as amount_jpy,
  null::numeric as variance
from public.delivery_shipment ds;

comment on view public.reconciliation_line is
  'F007 A1 (SCR013) source. variance is only meaningful for source_type=aitai '
  '(qty ordered minus cumulative shipped so far).';
