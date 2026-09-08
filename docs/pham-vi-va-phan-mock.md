# Phạm vi bản chốt và phần mock — Sakura Market (LAB-3)

Tài liệu này là bản chốt của deliverable #4: 20 màn đã dựng, 12 màn để
ngoài phạm vi, phần nào đang mock, và các quyết định kỹ thuật phát sinh khi
thi công khác với thiết kế gốc. Nguồn: `plan.md`, `spec/feature-list.md`,
`supabase/migrations/`, và mã nguồn `src/`.

**Cập nhật 2026-09-08 (P0 kế toán):** `IF-ACC-01`/`FN-11`/`FE-037` — khoảng
trống P0 nặng nhất theo cả ba audit ngày 2026-09-07 — nay **đã dựng thật**
(`RPT-06`). Báo cáo thật tăng từ 3/12 lên **7/12**. Mục 2b khai lại toàn bộ
khoảng trống còn lại **theo ID yêu cầu RFP**, không chỉ theo tên màn — đúng
lỗi truy vết mà audit đã bắt (RFP §13-01 liệt "không truy vết được yêu cầu
theo ID" là hạng mục loại thẳng đề xuất). Giả định phát sinh khi dựng kế toán
nằm ở [`docs/gia-dinh-tich-hop-ke-toan.md`](./gia-dinh-tich-hop-ke-toan.md).

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
| SC-02 | Xác thực MFA | **Hoãn có chủ đích cho một yêu cầu P0** — xem mục 2b (`FE-002`/`NFR-SEC-01`) |
| SC-03, SC-04 | Quản lý tài khoản và lịch sử quyền | **Hoãn có chủ đích, cùng quyết định với MFA** — xem mục 2b (`FE-003`/`FR-IAM-02`) |
| SC-07 | Cảnh báo hiệu lực sắp hết hạn | P1, phái sinh từ F002 — xem mục 2b (`FR-PARTY-03`) |
| SC-17 | Ghi nhận ngoại lệ giao hàng | P1, biến thể của F006 — xem mục 2b (`FR-DEL-03`) |
| SC-19 | Quản lý tranh chấp | P1, nhánh riêng của F007 — xem mục 2b (`FR-SETTLE-03`) |
| SC-27 | Batch xuất kế toán | **Đã dựng** — dùng chung màn báo cáo (`RPT-06`), xem mục 2b (`FN-11`/`FE-037`/`IF-ACC-01`) |
| SC-28, SC-29 | Thông báo và cấu hình | P1, cần hạ tầng email/queue ngoài phạm vi 10h — xem mục 2b (`FR-NOTIFY-01..03`) |
| SC-30 | Tra cứu audit log | Audit **có ghi** ở F011; chỉ bỏ màn tra cứu — xem mục 2b (`FR-AUDIT-02`) |
| SC-31 | Quản lý file đính kèm | F003/F008 đã có upload + đọc lại thật (QĐ-6); màn **quản lý** theo policy lưu trữ riêng vẫn ngoài phạm vi — xem mục 2b (`TBL-ATTACH-01`/`DR-RET-01`) |
| SC-32 | Trạng thái vận hành suy giảm | Cần offline queue — xem mục 2b (`NFR-AVL-02`) |

(32 màn LAB-1 − 20 màn trong phạm vi = 12 màn ở trên. `SC-27` vẫn liệt ở đây
vì không có màn riêng — chức năng của nó chạy trong `SC-26`.)

## 2b. Khai theo ID yêu cầu RFP — không chỉ theo tên màn

Bảng 12 màn ở trên khai đúng nhưng khai theo tên màn hình; một khách hàng cầm
bảng ID yêu cầu gốc dò từng dòng sẽ không thấy `FR-SETTLE-03`, `FR-AUDIT-02`…
được gọi tên. Bảng dưới đây khai lại toàn bộ khoảng trống P0/P1 còn lại
**theo ID**, cộng cả `IF-ACC-01` (đã dựng) và `GOV-RULE-01` (chưa từng được
nhắc ở đâu trước bản này).

| ID yêu cầu | Màn / vị trí | Trạng thái | Phụ thuộc thiếu / lý do |
|---|---|---|---|
| `FN-11` / `FE-037` / `IF-ACC-01` (P0) | SC-27 (= `RPT-06`) | **ĐÃ DỰNG** | `registry.ts` `isMock:false`; bảng `accounting_export_batch` thật; nút tạo batch trên màn báo cáo gọi `POST /api/accounting/export-batches` |
| `FE-002` / `NFR-SEC-01` (P0, MFA) | SC-02 | **HOÃN CÓ CHỦ ĐÍCH** | Bật MFA làm 9 tài khoản demo dùng chung một mật khẩu không trình bày được; Supabase Auth có sẵn MFA, chỉ chưa bật; sẽ bật trước khi lên production |
| `FE-003` / `FR-IAM-02` (P0, quản trị tài khoản) | SC-03, SC-04 | **HOÃN CÓ CHỦ ĐÍCH** | Cùng quyết định với MFA — tài khoản demo cố định qua `seed:users`, không qua màn quản trị riêng |
| `FE-004` / `NFR-SEC-03` (P0, session) | — | **MỘT PHẦN** | Khóa 5 lần sai/15 phút có thật (`lockout.ts`); session timeout đang **tắt** (`supabase/config.toml` khối `[auth.sessions]` bị comment); log hành vi bất thường chỉ có `login_failed`/`login_locked` |
| `RPT-04` / `FR-DEL-03` | SC-17 | **KHÔNG DỰNG ĐƯỢC** | Xem mục 3 "RPT-04 và RPT-09" — không đường ghi nào đặt được `delivery.status='ngoại lệ'`, không cột `reason` |
| `RPT-09` / `FR-SETTLE-03` | SC-19 | **KHÔNG DỰNG ĐƯỢC** | Xem mục 3 — không bảng tranh chấp, không SLA, không gì để đếm |
| `FR-AUDIT-02` (P1, tra cứu audit) | SC-30 | **NGOÀI PHẠM VI** | Audit có ghi (331 dòng sống, kiểm 2026-09-08); chỉ thiếu UI tìm theo ID giao dịch/ngày/người tham gia/loại thao tác |
| `FR-PARTY-03` (P1, cảnh báo hết hạn) | SC-07 | **NGOÀI PHẠM VI** | `RPT-03` tính được "sắp mất hiệu lực" (ngưỡng 30 ngày, xem giả định #5 ở `gia-dinh-tich-hop-ke-toan.md`) nhưng không có màn cảnh báo chủ động riêng |
| `FR-NOTIFY-01..03` (P1, thông báo) | SC-28, SC-29 | **NGOÀI PHẠM VI** | Cần hạ tầng email/queue ngoài phạm vi 11h |
| `TBL-ATTACH-01` / `DR-RET-01` (lưu trữ đính kèm) | SC-31 | **NGOÀI PHẠM VI** | Upload/đọc lại thật đã có (F003, F008); màn quản lý theo policy 7 năm/3 năm riêng thì chưa |
| `NFR-AVL-02` (vận hành suy giảm) | SC-32 | **NGOÀI PHẠM VI** | Cần offline queue — không khả thi trong prototype |
| `GOV-RULE-01` §trần 4 lần đổi rule/năm | — (thuộc F009) | **KHÔNG KIỂM TRA** | `create-rule-version.ts` không đếm số version tạo trong năm hiện tại, không chặn lần thứ 5 |

## 3. Phần mock — khai rõ, không lẫn với phần thật

- **Toàn bộ dữ liệu là một bộ seed mock.** Không có dữ liệu nghiệp vụ thật ở
  bất kỳ bảng nào; chạy lại `npm run seed:users` (+ seed nghiệp vụ nếu có)
  là khôi phục được từ đầu.
- **`payment_record` là bảng không có trong bất kỳ spec F00x nào.** Bảng
  này được thêm vì engine 完納奨励金 (ALG-002) cần hai đầu vào
  `eligible_amount_jpy` và `paid_on_time` mà không spec nào cấp nguồn cho
  chúng. Xem chú thích `MOCK` ngay trong migration
  `supabase/migrations/20260904090700_incentive.sql`.
- **7/12 báo cáo chạy thật, 5/12 còn mock.** `RPT-01, 02, 03, 05, 06, 07, 08`
  đọc Postgres và xuất CSV thật (`isMock: false` trong
  `src/lib/reports/registry.ts`). `RPT-04, 09, 10, 11, 12` còn `isMock: true`
  (`filterFields`/`columns` rỗng), hiển thị nhãn mock trên UI, và endpoint
  `export.csv` của chúng trả **403 `MOCK_REPORT`** trước khi chạy bất kỳ truy
  vấn nào — không để một tập dữ liệu mẫu giả làm bản xuất thật. `RPT-10,
  11, 12` (báo cáo tháng, thay đổi rule) mock vì hết ngân sách vòng này,
  không phải vì thiếu nguồn dữ liệu — ứng viên rẻ nhất cho vòng sau
  (`plan.md` §Next Steps). `RPT-04` và `RPT-09` khác hẳn: xem ngay dưới đây.
- **`RPT-04` và `RPT-09` không dựng được — vì thiếu nguồn dữ liệu, không
  phải thiếu giờ.** `RPT-04` (Giao hàng ùn tắc và ngoại lệ giao hàng) phụ
  thuộc `FR-DEL-03`/`SC-17` (ngoài phạm vi): CHECK trên `delivery.status`
  cho phép `'ngoại lệ'` (`supabase/migrations/20260904090400_delivery.sql:10`)
  nhưng **không một đường ghi nào** trong `src/lib/deliveries/` hay
  `src/app/api/deliveries/` đặt được giá trị đó, và `delivery`/
  `delivery_shipment` không có cột `reason`. `RPT-09` (Tổng hợp tranh chấp
  và SLA xử lý) phụ thuộc `FR-SETTLE-03`/`SC-19` (ngoài phạm vi): không bảng
  tranh chấp, không trạng thái tranh chấp, không mốc SLA nào tồn tại trong
  migrations — không có gì để đếm.
  **Phương án nửa vời đã cân rồi bỏ:** nửa "ùn tắc" của `RPT-04` dựng được
  về mặt dữ liệu (`transaction.qty` trừ tổng `delivery_shipment.qty`), nhưng
  cột `variance` của `RPT-05` (`reconciliation_line`, xem
  `supabase/migrations/20260904090800_reconciliation_view.sql:20`) đã hiển
  thị đúng con số đó cho `source_type='aitai'`. Dựng thêm một báo cáo mang
  đúng mã và tiêu đề RFP nhưng chỉ làm được nửa việc sẽ mời khách hiểu nhầm
  nửa báo cáo là báo cáo đủ — vi phạm DRY và đúng loại lỗi niềm tin audit đã
  bắt ở trạng thái "ngoại lệ" hiển thị trên UI mà backend không tạo ra được.
  Quyết định: giữ cả hai declared-out, không dựng nửa vời.
- **`accounting_export_batch` — bảng mới cho `IF-ACC-01`, append-only,
  không trigger khóa ngày.** RFP §08-03/§08-05 đòi batch code, ngày nghiệp
  vụ, người tham gia, tổng tiền, thuế và trạng thái — không bảng nào sẵn có
  để lưu. Bảng này chứa snapshot bất biến của đúng các dòng đã gửi (cột
  `lines` jsonb), không có policy update/delete (giống `audit_log`/
  `lot_attachment`). Không mang trigger khóa ngày (QĐ-3 mở rộng): 4 bảng bị
  khóa (`transaction`, `seri_result`, `mekiki_record`, `delivery_shipment`)
  là dữ liệu **vào** một ngày nghiệp vụ; bảng này là một bản ghi **về** một
  ngày đã khóa — nó phải ghi được ngay cả khi ngày đó đã lock, vì lock chính
  là điều kiện để export (`createExportBatch` từ chối 409 `DAY_NOT_LOCKED`
  nếu ngày chưa lock). Kiểm sống 2026-09-08: bảng tồn tại trên project
  `esgqneojskshvidhivgv`, hiện **0 batch** — chưa ai xuất lần nào trong môi
  trường demo.
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
  báo (notification), tra cứu audit log, **màn quản lý file đính kèm**
  (SC-31 — liệt kê/xóa theo policy lưu trữ, không phải việc upload/đọc lại
  bản thân file, đã thật từ QĐ-6), chế độ vận hành suy giảm khi mất kết nối
  (degraded-offline mode), và toàn bộ nhóm NFR đo lường vận hành —
  `NFR-AVL-01/02/03` (khả dụng, liên tục, DR), `NFR-PERF-01/02` (hiệu năng),
  `NFR-OPS-01` (giám sát), `NFR-COMP-01` (ma trận tương thích), accessibility
  (§09-05) — không test, không ngưỡng cấu hình, không log giám sát nào cho
  các mục này trong prototype 11h.
- **`TBL-ATTACH-01`'s lưu trữ 7 năm (phiếu tiếp nhận) / 3 năm rồi cold
  archive (ảnh/chứng từ phụ trợ) là policy vận hành, không phải thứ
  prototype này triển khai.** Không có lifecycle rule, không có job dọn/di
  chuyển file theo tuổi — `lot-attachment` (F003) và `correction-evidence`
  (F008) chỉ là hai bucket riêng tư lưu vô thời hạn cho tới khi ai đó xóa
  tay. Restore ≤2 ngày làm việc từ cold storage cũng chưa mô phỏng.

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
- **QĐ-6 — `chứng từ tiếp nhận` (`FR-LOT-01`, `D-LOT`) trở thành file đính
  kèm thật, thay cho chuỗi text đã smuggle vào `audit_log.after` ở phase-06.**
  Bảng riêng `lot_attachment` (1 lô — nhiều chứng từ, vì `TBL-ATTACH-01` liệt
  cả "phiếu tiếp nhận" lẫn ảnh phụ trợ dưới cùng một domain) + bucket riêng
  tư `lot-attachment`, mirror đúng pattern `correction_request`/
  `correction-evidence` (F008): allow-list 4 MIME type, trần 5MB, kiểm tra ở
  server (không tin `accept` phía client), đọc lại chỉ qua signed URL
  (`createSignedUrl`, TTL 300s). RLS: `ROLE-INTAKE` insert (họ là người tiếp
  nhận lô), mọi role active select (đồng nhất với `read_all_active_users`
  trên 16 bảng còn lại) — không có policy update/delete, cùng kiểu
  append-only với `audit_log`. Đính kèm là **tùy chọn**: nghiệm thu của
  `FR-LOT-01` chỉ đòi hệ thống *lưu được* chứng từ bắt buộc
  ("lưu được các chứng từ bắt buộc"), không có `BR-LOT` nào đặt số lượng tối
  thiểu như `BR-003` làm với bằng chứng F008 — nên không chặn tạo lô khi
  chưa có file. Ghi `lot_attachment` là một write riêng, có `audit_log` của
  chính nó (`action='attach_document'`, `entity='lot_attachment'`), tách
  khỏi audit ghi nhận `lot` (`action='create'`, `entity='lot'`) — không còn
  gộp `intake_docs` vào `after` của audit lô nữa (dọn khỏi
  `LOT_FIELD_LABELS`/`LOT_CREATE_FIELDS`). Không có transaction xuyên bảng
  (QĐ-5 cùng lý do): nếu file đã upload lên storage mà insert
  `lot_attachment` sau đó lỗi, route tự xóa lại object vừa upload
  (`attach-intake-doc.ts`) thay vì để lại object mồ côi không có dòng DB nào
  trỏ tới. Xem `supabase/migrations/20260907090000_lot_attachment.sql`.
- **QĐ-7 — thuế suất/cơ sở tính thuế là một hằng số ở tầng ứng dụng, không
  phải cột trên `transaction`.** Giả định, chưa chốt với khách — chi tiết
  đầy đủ (ảnh hưởng nếu sai, chi phí đổi) ở mục 1 của
  [`gia-dinh-tich-hop-ke-toan.md`](./gia-dinh-tich-hop-ke-toan.md). Xem
  `src/lib/accounting/tax.ts`.
- **QĐ-8 — batch code mới mỗi lần xuất, không unique theo ngày.** Giả định,
  chưa chốt với khách — câu hỏi thật là hệ thống nhận **thay thế** hay
  **cộng dồn** theo batch code. Chi tiết ở mục 2 của
  [`gia-dinh-tich-hop-ke-toan.md`](./gia-dinh-tich-hop-ke-toan.md). Xem
  `src/lib/accounting/batch-code.ts`.
- **QĐ-9 — không có cột mã người tham gia riêng cho phía kế toán.** Giả
  định, chưa chốt với khách — chi tiết ở mục 3 của
  [`gia-dinh-tich-hop-ke-toan.md`](./gia-dinh-tich-hop-ke-toan.md).
- **QĐ-10 — kết nối là tải CSV thủ công, không SFTP/API/lịch chạy.** Giả
  định, chưa chốt với khách — RFP §08-03 để ngỏ, hẹn buổi làm việc riêng.
  Chi tiết ở mục 4 của
  [`gia-dinh-tich-hop-ke-toan.md`](./gia-dinh-tich-hop-ke-toan.md).

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
- **Chứng từ tiếp nhận (QĐ-6), kiểm end-to-end trên `intake@`**: tạo lô kèm
  1 PNG thật → `201`, có đủ dòng `lot`, `lot_attachment`, object thật trong
  bucket `lot-attachment`, và 2 dòng `audit_log` (`create` +
  `attach_document`). Đọc lại bằng signed URL do **`trade@`** (một role khác
  `intake@`, chứng minh "mọi role active đọc được") ký → `200`, đúng
  `image/png`. Cùng path đó gọi thẳng endpoint object không kèm chữ ký/không
  kèm auth → bị từ chối (bucket private, không phải public). File
  `text/plain` → `422 {"reason":"INVALID_TYPE"}`; file 6MB → `422
  {"reason":"TOO_LARGE"}` — cả hai đều không tạo ra lô mồ côi. Tạo lô không
  kèm file nào vẫn `201` (đính kèm là tùy chọn). Toàn bộ dòng/object test đã
  được dọn sạch sau khi verify.
- **Bàn phím trên form tiếp nhận (`NFR-USE-01`) sau khi thêm file input**:
  kiểm bằng trình duyệt thật (Chromium, headless), không phải đọc code —
  Tab từ ô mặt hàng đi đúng 3 lần tới `#intakeDocs`; `Enter` VÀ `Space` trên
  đó đều bắn sự kiện mở file-picker của trình duyệt (Puppeteer
  `filechooser`) mà không submit/điều hướng form; Tab thêm một lần nữa tới
  đúng nút submit — không trường nào bị bỏ qua. Đây là lý do
  `keyboard-operable-form.tsx` phải loại trừ `input[type=file]` khỏi hành vi
  "Enter luôn submit": nếu không, `Enter` trên ô file sẽ bị `preventDefault`
  cướp mất trước khi trình duyệt kịp mở picker.
- **IF-ACC-01, kiểm sống 2026-09-08**: bảng `accounting_export_batch` tồn
  tại trên project `esgqneojskshvidhivgv` (0 batch — chưa ai export trong
  môi trường demo). Cùng lúc: `audit_log` có **331 dòng** so với **31 dòng**
  nghiệp vụ cốt lõi cộng dồn trên 4 bảng bị khóa (`transaction`=12,
  `seri_result`=2, `delivery_shipment`=7, `mekiki_record`=10) — tỷ lệ
  audit/nghiệp vụ ~10,7:1, cơ sở cho nhận định "OBJ-03 có cơ chế chắc nhất"
  ở mục 6, nhưng đây vẫn chỉ là số suy ra bằng tay, không phải % app tự tính.

## 6. Mục tiêu KPI đối khách — cơ chế đã có, con số nào chưa đo

RFP §13-07 `ACC-03`: *"mỗi NFR phải kèm báo cáo test thực tế hoặc bằng chứng
vận hành — không chấp nhận cam kết chỉ bằng lời."* Bảng dưới tách rõ hai cột
để không ai đọc nhầm "có cơ chế" thành "đã đạt chỉ tiêu".

| Mục tiêu | Baseline → Target | Cơ chế trong prototype | App tự đo? |
|---|---|---|---|
| `OBJ-01` giảm nhập lại | 2,4 → ≤1,2 lần/giao dịch | 1 mã lô + 1 mã giao dịch xuyên suốt mekiki/aitai/seri giảm nhập lại một phần; `IF-ACC-01` nay thay được phần nhập lại thủ công sang kế toán | **Không** |
| `OBJ-02` rút ngắn tra cứu | 15–30′ → ≤2′ | Audit ghi đầy đủ; **không** có màn tra cứu (`FR-AUDIT-02`/SC-30 ngoài phạm vi) | **Không** |
| `OBJ-03` tăng audit trail | 35% → ≥98% | `writeAuditLog()` gọi tại mọi thao tác nhạy cảm (đọc code xác nhận); sống 2026-09-08: `audit_log` 331 dòng vs 31 dòng nghiệp vụ cốt lõi | **Không** — tỷ lệ suy bằng tay, không dashboard % |
| `OBJ-04` rút ngắn báo cáo ngày | 90′ → ≤15′; batch xong trước 11:00 JST | Báo cáo tính on-demand từ query, không phải batch theo lịch; `POST /api/accounting/export-batches` chạy khi `ROLE-SETTLEMENT` bấm nút trên UI, không cron | **Không** — không SLA giờ nào được enforce |
| `OBJ-05` giảm chênh lệch đối chiếu | 1,8% → ≤0,3% | `reconciliation_line.variance` tính qty đặt trừ qty giao lũy kế theo dòng `aitai`; `IF-ACC-01` hợp nhất thêm nguồn kế toán | **Không** — variance là số per-row, không phải % tổng hợp |

**Không KPI nào trong 5 mục được app tự tính ra một con số %.** Cơ chế nền có
ở các mức khác nhau (`OBJ-03` chắc nhất — audit ghi rất đầy đủ, kiểm chứng
được bằng code + DB sống; `OBJ-01/02/04/05` chỉ có một phần cơ chế), nhưng
không mục nào có dashboard hay counter tính % — mọi con số trong bảng KPI
gốc là mục tiêu hợp đồng, không phải số hệ thống đang hiển thị.
