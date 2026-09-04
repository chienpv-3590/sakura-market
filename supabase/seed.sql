-- Idempotent mock/demo seed data (LAB-3, F011 A2 seedLoader / phase-03 step 10).
-- Run this AFTER `node scripts/seed-demo-users.mjs` (app_user rows referenced
-- below must already exist). Paste directly into the Supabase Studio SQL
-- Editor -- `supabase db push --include-seed` silently no-ops once there are
-- no pending migrations (research §4 / phase-03 §Key Insights), so this file
-- is applied by hand, not by the CLI.
--
-- Safe to re-run any number of times: the repo (and its demo credentials) are
-- public, so anyone can mutate this data -- re-running restores a clean state
-- instead of requiring a project rebuild. app_user and audit_log are left
-- untouched (app_user is owned by seed-demo-users.mjs; audit_log is an
-- append-only trail, not demo fixture data). business_day_lock is included in
-- the truncate below so a locked day from a previous demo session does not
-- leak into the next one -- lock state is meant to be created live, by hand,
-- during the demo itself.

do $$
begin
  if not exists (select 1 from public.app_user where email = 'sysadmin@sakura-market.local') then
    raise exception
      'seed.sql requires the demo accounts first -- run "node scripts/seed-demo-users.mjs" before this file';
  end if;
end $$;

-- TRUNCATE ... CASCADE also clears every table with a foreign key pointing
-- (directly or transitively) at the ones listed: participant_status_history,
-- transaction, seri_result, mekiki_record, delivery, delivery_shipment,
-- correction_request, transaction_adjustment, incentive_result, payment_record.
truncate table
  public.participant,
  public.lot,
  public.business_day_lock,
  public.incentive_rule_version
  restart identity cascade;

-- ---------------------------------------------------------------------------
-- Participants -- 4 categories x mixed FIG-010 status (10 rows, >= 8 required,
-- distinct category count = 4).
-- ---------------------------------------------------------------------------
insert into public.participant (category, name, license_type, status, valid_from, valid_to) values
  ('卸売業者', 'Sakura Wholesale Co.',   'đăng ký',    'có hiệu lực', '2020-01-01', null),
  ('卸売業者', 'Minato Wholesale K.K.',  'đăng ký',    'tạm ngừng',   '2019-01-01', null),
  ('仲卸',     'Tokyo Nakaoroshi Co.',   'giấy phép',  'có hiệu lực', '2021-04-01', '2027-03-31'),
  ('仲卸',     'Sakura Nakaoroshi K.K.', 'giấy phép',  'xét lại',     '2018-04-01', '2026-03-31'),
  ('仲卸',     'Minato Nakaoroshi Co.',  'giấy phép',  'có hiệu lực', '2022-01-01', '2028-01-01'),
  ('売買参加者', 'Yamada Trading',        'chấp thuận', 'có hiệu lực', '2022-06-01', '2027-05-31'),
  ('売買参加者', 'Sato Kaiten Co.',       'chấp thuận', 'mất hiệu lực','2020-01-01', '2025-12-31'),
  ('売買参加者', 'Kobayashi Suisan',      'chấp thuận', 'tạm ngừng',   '2021-01-01', '2026-06-30'),
  ('買出人',   'Suzuki Kaidashi',        'đăng ký',    'có hiệu lực', '2023-01-01', null),
  ('買出人',   'Tanaka Kaidashi',        'đăng ký',    'có hiệu lực', '2023-06-01', null);

insert into public.participant_status_history (participant_id, from_status, to_status, reason, changed_by, changed_at) values
  ((select id from public.participant where name = 'Minato Wholesale K.K.'), 'có hiệu lực', 'tạm ngừng',
    'Vi pham quy dinh ve sinh khu ban hang',
    (select id from public.app_user where email = 'sysadmin@sakura-market.local'), '2026-08-20 09:00+09'),
  ((select id from public.participant where name = 'Sakura Nakaoroshi K.K.'), 'mất hiệu lực', 'xét lại',
    'Da nop don xin xet lai giay phep 許可',
    (select id from public.app_user where email = 'sysadmin@sakura-market.local'), '2026-08-25 10:00+09'),
  ((select id from public.participant where name = 'Sato Kaiten Co.'), 'có hiệu lực', 'mất hiệu lực',
    'Giay chap thuan 承認 het han 2025-12-31',
    (select id from public.app_user where email = 'sysadmin@sakura-market.local'), '2026-01-05 09:00+09'),
  ((select id from public.participant where name = 'Kobayashi Suisan'), 'có hiệu lực', 'tạm ngừng',
    'Khieu nai chua giai quyet tu doi tac giao dich',
    (select id from public.app_user where email = 'sysadmin@sakura-market.local'), '2026-07-10 09:00+09');

-- ---------------------------------------------------------------------------
-- Lots -- 12 rows across D-2/D-1/D (JST business dates), >= 10 required.
-- business_date denormalized per QĐ-2. available_qty is hand-computed below
-- from the confirmed transactions/seri results that consume each lot, so the
-- numbers stay internally consistent and satisfy the available_qty >= 0 CHECK.
-- ---------------------------------------------------------------------------
insert into public.lot (lot_code, item, package_count, initial_qty, available_qty, status, business_date) values
  ('LOT-20260902-01', 'Cá ngừ vây xanh', 20, 500, 150, 'published', '2026-09-02'),
  ('LOT-20260902-02', 'Cá hồi Na Uy',    15, 300, 0,   'traded',    '2026-09-02'),
  ('LOT-20260902-03', 'Tôm sú',          10, 200, 200, 'published', '2026-09-02'),
  ('LOT-20260902-04', 'Mực ống',          8, 150, 150, 'received',  '2026-09-02'),
  ('LOT-20260903-01', 'Cua huỳnh đế',    12, 250, 150, 'published', '2026-09-03'),
  ('LOT-20260903-02', 'Cá thu',          18, 400, 0,   'traded',    '2026-09-03'),
  ('LOT-20260903-03', 'Sò điệp',          9, 180, 100, 'published', '2026-09-03'),
  ('LOT-20260903-04', 'Bạch tuộc',        6, 120, 120, 'received',  '2026-09-03'),
  ('LOT-20260904-01', 'Cá ngừ mắt to',   22, 550, 330, 'published', '2026-09-04'),
  ('LOT-20260904-02', 'Cá hố',           14, 280, 0,   'traded',    '2026-09-04'),
  ('LOT-20260904-03', 'Ghẹ xanh',         7, 140, 80,  'published', '2026-09-04'),
  ('LOT-20260904-04', 'Cá basa nuôi',    25, 600, 600, 'received',  '2026-09-04');

insert into public.mekiki_record (lot_id, grade, assessor_id, assessed_at, business_date)
select l.id, m.grade, (select id from public.app_user where email = 'judge@sakura-market.local'), m.assessed_at, l.business_date
from (values
  ('LOT-20260902-01', 'Loại A - tươi, kích thước lớn', timestamptz '2026-09-02 03:10+09'),
  ('LOT-20260902-02', 'Loại A - đông lạnh, đạt chuẩn xuất khẩu', timestamptz '2026-09-02 03:20+09'),
  ('LOT-20260902-03', 'Loại B - tươi, kích thước trung bình', timestamptz '2026-09-02 03:30+09'),
  ('LOT-20260903-01', 'Loại A - sống, càng nguyên vẹn', timestamptz '2026-09-03 03:10+09'),
  ('LOT-20260903-02', 'Loại A - tươi, béo', timestamptz '2026-09-03 03:15+09'),
  ('LOT-20260903-03', 'Loại B - tươi', timestamptz '2026-09-03 03:25+09'),
  ('LOT-20260904-01', 'Loại A - tươi, kích thước lớn', timestamptz '2026-09-04 03:10+09'),
  ('LOT-20260904-02', 'Loại B - tươi', timestamptz '2026-09-04 03:20+09'),
  ('LOT-20260904-03', 'Loại A - sống', timestamptz '2026-09-04 03:30+09')
) as m(lot_code, grade, assessed_at)
join public.lot l on l.lot_code = m.lot_code;

-- ---------------------------------------------------------------------------
-- Aitai transactions -- 12 rows, mixed status (draft/confirmed/cancelled),
-- >= 12 required. type stays 'aitai' (QĐ-1). TXN-20260904-02 is deliberately
-- left 'draft' against an already mất-hiệu-lực buyer (Sato Kaiten Co.) to
-- demo BR-PERM-01 rejecting confirm at Phase 07, not at draft-create time.
-- ---------------------------------------------------------------------------
insert into public.transaction (
  txn_code, lot_id, buyer_participant_id, qty, unit_price, business_date, status,
  confirmed_by, confirmed_at, cancel_reason, cancelled_by, cancelled_at
)
select
  x.txn_code,
  (select id from public.lot where lot_code = x.lot_code),
  (select id from public.participant where name = x.buyer_name),
  x.qty, x.unit_price, x.business_date::date, x.status,
  case when x.status = 'confirmed' then (select id from public.app_user where email = 'trade@sakura-market.local') end,
  case when x.status = 'confirmed' then x.business_date::timestamptz + interval '4 hours' end,
  case when x.status = 'cancelled' then x.cancel_reason end,
  case when x.status = 'cancelled' then (select id from public.app_user where email = 'trade@sakura-market.local') end,
  case when x.status = 'cancelled' then x.business_date::timestamptz + interval '5 hours' end
from (values
  ('TXN-20260902-01', 'LOT-20260902-01', 'Suzuki Kaidashi', 200, 3000, '2026-09-02', 'confirmed', null),
  ('TXN-20260902-02', 'LOT-20260902-01', 'Tanaka Kaidashi', 150, 3050, '2026-09-02', 'confirmed', null),
  ('TXN-20260902-03', 'LOT-20260902-02', 'Yamada Trading',  300, 1800, '2026-09-02', 'confirmed', null),
  ('TXN-20260902-04', 'LOT-20260902-03', 'Yamada Trading',   50, 3500, '2026-09-02', 'cancelled', 'Nguoi mua doi y truoc khi chot'),
  ('TXN-20260903-01', 'LOT-20260903-01', 'Suzuki Kaidashi', 100, 4200, '2026-09-03', 'confirmed', null),
  ('TXN-20260903-02', 'LOT-20260903-01', 'Tanaka Kaidashi',  50, 4100, '2026-09-03', 'draft',     null),
  ('TXN-20260903-03', 'LOT-20260903-02', 'Yamada Trading',  400, 1500, '2026-09-03', 'confirmed', null),
  ('TXN-20260903-04', 'LOT-20260903-03', 'Tanaka Kaidashi',  30, 2200, '2026-09-03', 'cancelled', 'Sai lech so luong dat truoc'),
  ('TXN-20260904-01', 'LOT-20260904-01', 'Tanaka Kaidashi', 220, 2600, '2026-09-04', 'confirmed', null),
  ('TXN-20260904-02', 'LOT-20260904-01', 'Sato Kaiten Co.', 100, 2650, '2026-09-04', 'draft',     null),
  ('TXN-20260904-03', 'LOT-20260904-02', 'Suzuki Kaidashi', 280, 1900, '2026-09-04', 'confirmed', null),
  ('TXN-20260904-04', 'LOT-20260904-03', 'Suzuki Kaidashi',  20, 5000, '2026-09-04', 'draft',     null)
) as x(txn_code, lot_code, buyer_name, qty, unit_price, business_date, status, cancel_reason);

-- ---------------------------------------------------------------------------
-- せり results -- draw down lots not touched by any aitai transaction above,
-- so the seeded available_qty arithmetic above stays simple to verify by hand.
-- ---------------------------------------------------------------------------
insert into public.seri_result (lot_id, winner_participant_id, qty, unit_price, decided_at, confirmed_by, business_date)
values
  ((select id from public.lot where lot_code = 'LOT-20260903-03'),
   (select id from public.participant where name = 'Yamada Trading'),
   80, 2400, timestamptz '2026-09-03 05:00+09',
   (select id from public.app_user where email = 'trade@sakura-market.local'), '2026-09-03'),
  ((select id from public.lot where lot_code = 'LOT-20260904-03'),
   (select id from public.participant where name = 'Suzuki Kaidashi'),
   60, 6000, timestamptz '2026-09-04 05:00+09',
   (select id from public.app_user where email = 'trade@sakura-market.local'), '2026-09-04');

-- ---------------------------------------------------------------------------
-- Deliveries -- covers both "đủ" (fully delivered) and "thiếu" (partial, still
-- in progress) cases. QĐ-2: delivery_shipment.business_date is the day the
-- shipment itself happened, independent of the parent transaction's
-- business_date -- TXN-20260902-01 (bdate 09-02) ships on 09-03 on purpose, to
-- demonstrate that a locked 09-02 will NOT block a 09-03-dated shipment row.
-- ---------------------------------------------------------------------------
insert into public.delivery (transaction_id, status, delivered_qty)
select (select id from public.transaction where txn_code = d.txn_code), d.status, d.delivered_qty
from (values
  ('TXN-20260902-01', 'hoàn tất', 200),
  ('TXN-20260902-03', 'đang giao', 270),
  ('TXN-20260903-01', 'chờ', 0),
  ('TXN-20260903-03', 'hoàn tất', 400),
  ('TXN-20260904-01', 'đang giao', 150),
  ('TXN-20260904-03', 'hoàn tất', 280)
) as d(txn_code, status, delivered_qty);

insert into public.delivery_shipment (delivery_id, seq, qty, shipped_at, confirmed_by, business_date)
select
  (select del.id from public.delivery del
     join public.transaction t on t.id = del.transaction_id
    where t.txn_code = s.txn_code),
  s.seq, s.qty, s.shipped_at,
  (select id from public.app_user where email = 'delivery@sakura-market.local'),
  s.business_date::date
from (values
  ('TXN-20260902-01', 1, 200, timestamptz '2026-09-03 08:00+09', '2026-09-03'),
  ('TXN-20260902-03', 1, 180, timestamptz '2026-09-03 08:30+09', '2026-09-03'),
  ('TXN-20260902-03', 2,  90, timestamptz '2026-09-04 08:00+09', '2026-09-04'),
  ('TXN-20260903-03', 1, 400, timestamptz '2026-09-04 08:00+09', '2026-09-04'),
  ('TXN-20260904-01', 1, 150, timestamptz '2026-09-04 09:00+09', '2026-09-04'),
  ('TXN-20260904-03', 1, 280, timestamptz '2026-09-04 09:30+09', '2026-09-04')
) as s(txn_code, seq, qty, shipped_at, business_date);

-- ---------------------------------------------------------------------------
-- Incentive rule versions -- exactly 2 (1 active, 1 pending_approval with a
-- future effective_from), as required.
-- ---------------------------------------------------------------------------
insert into public.incentive_rule_version (version_no, effective_from, status, rate_table, created_by, approved_by) values
  (1, '2026-01-01', 'active',
    '{"rate_numerator": 110, "rate_denominator": 100}'::jsonb,
    (select id from public.app_user where email = 'ruleadmin@sakura-market.local'),
    (select id from public.app_user where email = 'rulechecker@sakura-market.local')),
  (2, '2026-12-01', 'pending_approval',
    '{"rate_numerator": 112, "rate_denominator": 100}'::jsonb,
    (select id from public.app_user where email = 'ruleadmin@sakura-market.local'),
    null);

-- ---------------------------------------------------------------------------
-- Payment records (MOCK, see 20260904090700_incentive.sql) -- both on-time and
-- overdue cases so F009's ALG-002 has real inputs to compute against. One row
-- is left unpaid (paid_on = null) to also cover the "not yet settled" case.
-- ---------------------------------------------------------------------------
insert into public.payment_record (participant_id, business_date, due_date, paid_on, eligible_amount_jpy) values
  ((select id from public.participant where name = 'Yamada Trading'),  '2026-09-02', '2026-09-09', '2026-09-05', 987654),
  ((select id from public.participant where name = 'Suzuki Kaidashi'), '2026-09-02', '2026-09-09', null,        620000),
  ((select id from public.participant where name = 'Sato Kaiten Co.'), '2026-09-03', '2026-09-05', '2026-09-10', 500000),
  ((select id from public.participant where name = 'Tanaka Kaidashi'), '2026-09-03', '2026-09-10', '2026-09-08', 750000);
