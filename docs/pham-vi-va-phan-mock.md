# Phạm vi bản chốt và phần mock — Sakura Market (LAB-3)

Tài liệu này là bản chốt cuối của deliverable #4: 20 màn đã dựng, 12 màn để
ngoài phạm vi, phần nào đang mock, và các quyết định kỹ thuật phát sinh khi
thi công khác với thiết kế gốc. Nguồn: `plan.md`, `spec/feature-list.md`,
`supabase/migrations/`, và mã nguồn `src/`.

## 1. 20 màn đã dựng (SCR001..SCR020), theo 11 feature F001..F011

| Feature | Màn (mã LAB-3) | LAB-1 | Tên màn |
|---|---|---|---|
| F001_AuthAndRole | SCR001_Login | SC-01 | Đăng nhập |
| F002_ParticipantEligibility | SCR002_ParticipantList | SC-05 | Danh sách người tham gia |
| F002_ParticipantEligibility | SCR003_ParticipantDetail | SC-06 | Chi tiết và vòng đời hiệu lực |
| F003_LotIntakeAndMekiki | SCR004_LotIntake | SC-08 | Tiếp nhận lô hàng |
| F003_LotIntakeAndMekiki | SCR005_MekikiEntry | SC-09 | Ghi nhận kết quả 目利き |
| F003_LotIntakeAndMekiki | SCR006_LotDetail | SC-10 | Chi tiết lô hàng và điều chỉnh |
| F004_AitaiTransaction | SCR007_AitaiCreate | SC-11 | Tạo giao dịch 相対取引 |
| F004_AitaiTransaction | SCR008_TransactionList | SC-12 | Danh sách và chi tiết giao dịch |
| F005_SeriResultEntry | SCR009_SeriEntry | SC-13 | Nhập kết quả せり |
| F005_SeriResultEntry | SCR010_SeriLookup | SC-14 | Tra cứu bản ghi せり |
| F006_DeliveryTracking | SCR011_DeliveryList | SC-15 | Danh sách giao hàng |
| F006_DeliveryTracking | SCR012_DeliveryDetail | SC-16 | Chi tiết giao hàng và các lần giao |
| F007_DailyReconcileAndLock | SCR013_ReconcileAndLock | SC-18 | Bảng đối chiếu ngày và lock kỳ |
| F008_PostLockCorrection | SCR014_CorrectionRequest | SC-20 | Tạo yêu cầu điều chỉnh |
| F008_PostLockCorrection | SCR015_CorrectionApproval | SC-21 | Phê duyệt yêu cầu điều chỉnh |
| F009_IncentiveAndRuleVersion | SCR016_IncentiveResult | SC-22 | Kết quả tính 完納奨励金 |
| F009_IncentiveAndRuleVersion | SCR017_RuleVersionList | SC-23 | Danh sách phiên bản biểu suất |
| F009_IncentiveAndRuleVersion | SCR018_RuleVersionEditor | SC-24 | Tạo và phê duyệt phiên bản biểu suất |
| F010_ReportAndExport | SCR019_ReportCatalog | SC-25 | Danh mục báo cáo |
| F010_ReportAndExport | SCR020_ReportViewer | SC-26 | Xem và xuất báo cáo |

F011_SharedFoundation (audit log, RLS, i18n VI/JA, seed) không có màn hình
riêng — chạy nền, cắt ngang toàn bộ 20 màn ở trên.

## 2. 12 màn ngoài phạm vi LAB-3

Chép nguyên từ `spec/feature-list.md` mục "Ngoài phạm vi LAB-3", không đổi lý do:

| Màn LAB-1 | Tên | Lý do để ngoài phạm vi |
|---|---|---|
| SC-02 | Xác thực MFA | Supabase Auth có sẵn MFA nhưng bật lên làm tài khoản demo khó dùng cho reviewer LAB-7 |
| SC-03, SC-04 | Quản lý tài khoản và lịch sử quyền | Tài khoản demo cố định, không cần màn quản trị |
| SC-07 | Cảnh báo hiệu lực sắp hết hạn | P1, phái sinh từ F002, không thêm hiểu biết nghiệp vụ mới |
| SC-17 | Ghi nhận ngoại lệ giao hàng | P1, biến thể của F006 |
| SC-19 | Quản lý tranh chấp | P1, nhánh riêng của F007 |
| SC-27 | Batch xuất kế toán | Cần hệ thống kế toán đối tác — không mô phỏng thật được |
| SC-28, SC-29 | Thông báo và cấu hình | P1, cần hạ tầng email/queue ngoài phạm vi 10h |
| SC-30 | Tra cứu audit log | Audit **có ghi** ở F011; chỉ bỏ màn tra cứu và ngưỡng p95 ≤ 2s |
| SC-31 | Quản lý file đính kèm | F008 có upload bằng chứng tối thiểu; màn quản lý riêng theo policy 7 năm là ngoài phạm vi |
| SC-32 | Trạng thái vận hành suy giảm | Cần offline queue — không khả thi trong prototype |

(32 màn LAB-1 − 20 màn trong phạm vi = 12 màn ở trên.)

## 3. Phần mock — khai rõ, không lẫn với phần thật

- **Toàn bộ dữ liệu là một bộ seed mock.** Không có dữ liệu nghiệp vụ thật ở
  bất kỳ bảng nào; chạy lại `npm run seed:users` (+ seed nghiệp vụ nếu có)
  là khôi phục được từ đầu.
- **`payment_record` là bảng không có trong bất kỳ spec F00x nào.** Bảng
  này được thêm vì engine 完納奨励金 (ALG-002) cần hai đầu vào
  `eligible_amount_jpy` và `paid_on_time` mà không spec nào cấp nguồn cho
  chúng. Xem chú thích `MOCK` ngay trong migration
  `supabase/migrations/20260904090700_incentive.sql`.
- **9/12 báo cáo chưa được dựng.** Chỉ `RPT-01`, `RPT-05`, `RPT-07` chạy
  thật (đọc Postgres, xuất CSV thật). Chín báo cáo còn lại
  (`RPT-02, 03, 04, 06, 08, 09, 10, 11, 12`) được khai `isMock: true` trong
  `src/lib/reports/registry.ts`, hiển thị nhãn mock trên UI, và endpoint
  `export.csv` của chúng trả **403 `MOCK_REPORT`** trước khi chạy bất kỳ
  truy vấn nào — không để một tập dữ liệu mẫu giả làm bản xuất thật.
- **Không có test tự động nào trong repo** — đây là miễn trừ đã ghi vết ở
  `plan.md` (mục "Quyết định: không cài test runner cho LAB-3"), không phải
  thiếu sót bỏ quên. Lý do: đề không chấm điểm test, ngân sách 10h đã căng
  ở mức 11h thật, và phần lõi cần chứng minh (trigger khóa ngày chặn cả
  `service_role`, CAS chặn oversell) nằm ở tầng Postgres — unit test với
  mock client sẽ không bắt được những lỗi đó. Thay vào đó, mọi phase đã
  chứng minh bằng **script chạy thật vào database đang sống** (xem mục 5).
  Nếu làm thật, cần thêm: unit test cho tầng service (`src/lib/**`) bằng
  Vitest/Jest, và Playwright cho luồng đăng nhập + luồng xác nhận giao dịch
  (transaction-confirm).
- **Engine 完納奨励金 chạy đồng bộ ngay trong request khóa/duyệt**, không
  phải job nền như spec mô tả — Vercel không có hạ tầng queue trong phạm vi
  10h này (xem `runIncentiveDeltaAfterApproval` trong
  `src/app/api/corrections/[id]/approve/route.ts`).
- **Không có transaction database xuyên bảng nào trong stack này**
  (PostgREST không cấp `BEGIN`/`COMMIT` xuyên nhiều lệnh cho client). Ghi
  nhiều bảng dùng compare-and-swap (CAS) cộng với ghi bù (compensating
  write) thay vì transaction thật — xem mục 4 (QĐ-5). Hệ quả thật: nếu
  server crash đúng giữa hai lệnh ghi (ví dụ đã trừ `available_qty` của lô
  nhưng chưa ghi được dòng `transaction`), cặp ghi có thể lệch nhau tạm
  thời và cần dọn bằng tay. Làm thật cần database function
  (PL/pgSQL) chạy trong một transaction Postgres thật.
- **Một lần ghi bị chặn mà đi vòng qua tầng app** (ví dụ psql trực tiếp
  hoặc một client khác gọi thẳng PostgREST) vẫn bị trigger chặn đúng, nhưng
  **có thể không được ghi log** — chỉ đường đi qua tầng app
  (`respondLockedWrite` trong `src/lib/reconciliation/handle-locked-write.ts`)
  mới chủ động ghi `audit_log`; bản thân trigger không tự ghi audit vì
  Postgres không có autonomous transaction để giữ một INSERT sống sót song
  song với một statement vừa bị rollback.
- **Khóa tạm đăng nhập sai đếm theo số lần sai liên tiếp, không phải cửa sổ
  trượt 15 phút thật.** `app_user` không có cột timestamp cho từng lần sai
  (`src/lib/auth/lockout.ts`), nên "5 lần sai trong 15 phút" được xấp xỉ
  bằng "5 lần sai liên tiếp kể từ lần đăng nhập thành công hoặc lần khóa
  gần nhất". Một lần đăng nhập thành công luôn reset bộ đếm.
- **Ngoài phạm vi hoàn toàn**: MFA, các màn quản lý tài khoản/quyền, thông
  báo (notification), tra cứu audit log, quản lý file đính kèm, và chế độ
  vận hành suy giảm khi mất kết nối (degraded-offline mode).

## 4. Quyết định phát sinh khi thi công (input cho ADR ở LAB-4)

- **QĐ-1 — `seri_result` là bảng riêng, không phải discriminator trên
  `transaction`.** Spec gốc của F004 mô tả `transaction.type` dùng chung
  cho cả せり, nhưng F005/F007/F010 đều xử lý せり như bảng độc lập (3 spec
  chọn tách, 1 spec chọn gộp) — LAB-3 theo đa số, `transaction.type` chỉ
  còn CHECK cố định `'aitai'`. Xem `supabase/migrations/20260904090300_transaction.sql`.
- **QĐ-2 — `business_date` denormalize xuống `mekiki_record`,
  `seri_result`, `delivery_shipment`** (và cả `lot`, dù `lot` không bị
  khóa) để trigger khóa ngày đọc trực tiếp một cột, không phải JOIN ngược
  lên bảng cha.
- **QĐ-3 — `lot` và `delivery` cố ý được miễn trigger khóa ngày.** Một lô
  hàng nhận vào đúng ngày bị lock vẫn phải bán được ở ngày hôm sau; một
  giao hàng của giao dịch thuộc ngày bị lock vẫn phải giao tiếp ở ngày hôm
  sau. Chỉ 4 bảng sự kiện-theo-ngày (`transaction`, `seri_result`,
  `mekiki_record`, `delivery_shipment`) mang trigger.
- **QĐ-4 — điều kiện khóa nằm ở trigger, KHÔNG nằm trong RLS.** Lý do: RLS
  lọc dòng ra khỏi tập ứng viên của UPDATE **trước khi** trigger `BEFORE
  ROW` chạy, nên nếu để điều kiện khóa trong `USING` của policy, một client
  `authenticated` bình thường chỉ nhận `200 []` im lặng thay vì lỗi rõ ràng
  — không phân biệt được "đã lock" với "không có dòng" hay "sai vai trò".
  Giải pháp: RLS chỉ giữ điều kiện vai trò, điều kiện khóa là việc riêng
  của trigger, nên trigger bắn cùng một lỗi `P0001` cho mọi loại caller —
  kể cả `authenticated`, `service_role`, và psql trực tiếp. Ngoài ra,
  `service_role` cần được `grant usage` tường minh lên schema `private` —
  thuộc tính `BYPASSRLS` chỉ bỏ qua RLS, không tự cấp quyền schema/hàm.
  Xem `supabase/migrations/20260904091100_lock_enforcement_fix.sql`.
- **QĐ-5 — kiểm soát số lượng bằng vòng lặp compare-and-swap (CAS), không
  phải transaction xuyên bảng.** PostgREST chỉ nhận giá trị cột dạng literal
  trong payload UPDATE, nên biểu thức kiểu
  `available_qty = available_qty - :qty` không viết được qua client này, và
  không có `BEGIN`/`COMMIT` xuyên nhiều bảng qua REST. Thay vào đó:
  đọc `available_qty` hiện tại → tính giá trị mới ở tầng ứng dụng → ghi lại
  với điều kiện `available_qty` vẫn đúng giá trị vừa đọc; thua CAS thì đọc
  lại và thử tiếp (tối đa 25 lần). Đã kiểm chứng với 20 request đồng thời
  (xem mục 5). Xem `src/lib/lots/availability-service.ts`.

## 5. Bằng chứng đã kiểm (verify trên database đang sống, không phải mock)

- Trigger khóa ngày nghiệp vụ từ chối **cả** client `authenticated` bình
  thường lẫn client `service_role` (BYPASSRLS) với đúng mã lỗi `P0001`.
- 20 request đặt chỗ (`reserveLotQty`) đồng thời trên cùng một lô hàng →
  đúng **10 request thành công**, `available_qty` không bao giờ âm.
- 8 request xác nhận giao dịch đồng thời trên cùng một giao dịch → đúng
  **1 request thành công**, số lượng chỉ bị trừ đúng một lần.
- Engine 完納奨励金: `987654 → 1086419` (đúng hạn), quá hạn `→ 0`, và
  `1235 → 1358` — chứng minh làm tròn XUỐNG (floor), không phải làm tròn
  thông thường (round sẽ ra 1359).
- Tự phê duyệt bị từ chối **403** ở cả hai luồng maker-checker: phê duyệt
  yêu cầu điều chỉnh (F008) và phê duyệt phiên bản biểu suất (F009,
  `GOV-RULE-01`).
- File CSV xuất ra mang đúng BOM UTF-8 ở đầu file, một dòng dữ liệu chứa cả
  tiếng Việt và tiếng Nhật vẫn giữ nguyên không bị mojibake.
