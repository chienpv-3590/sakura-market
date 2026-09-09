# SC-26 — Xem và xuất báo cáo

| | |
|---|---|
| Mã thi công | SCR026_ReportViewer (composite) |
| Route | `/reports/[reportCode]` |
| Loại | Detail composite — bộ lọc + bảng kết quả + xuất CSV + (riêng RPT-06) khối batch kế toán |
| Actor chính | Mọi người dùng nội bộ đang hoạt động — cả 7 vai trò; tạo batch chỉ ROLE-SETTLEMENT |
| FE- / FR- | FE-034, FE-035, FE-036 / FR-RPT-01, FR-RPT-02, FR-RPT-03, IF-ACC-01, FR-SETTLE-02 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Xem dữ liệu của một mã báo cáo theo bộ lọc, phân trang 50 dòng/trang, rồi xuất CSV toàn bộ tập
đã lọc (không giới hạn theo trang). Báo cáo mẫu bị chặn xuất. RPT-06 là trường hợp riêng: nó
kiêm luôn chức năng của **SC-27** — tạo và tra batch xuất dữ liệu kế toán (IF-ACC-01).

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc — `requireUser()`, **không** `requireRole` (`reports/[reportCode]/page.tsx:42`)
- Vai trò được vào: **cả 7 vai trò**
- Mã lỗi khi thiếu quyền: **không áp dụng cho việc vào màn**. Chưa đăng nhập / `is_active=false`
  → **307** `/login`. Riêng hành động **tạo batch** thì sai vai trò → **404**
  (`accounting/export-batches/route.ts:29-35`)
- `reportCode` không có trong registry → `notFound()` → **404** (`page.tsx:47-48`);
  API tương ứng trả **404 `report_not_found`** (`api/reports/[reportCode]/route.ts:20`)

### 2.1 Mã nào thật, mã nào mock — kiểm từ `registry.ts`

| Trạng thái | Mã | Dòng khai `isMock` | Bộ lọc thật (`filterFields`) |
|---|---|---|---|
| **Thật — 7 mã** | RPT-01 | 66 | `businessDate` |
| | RPT-02 | 75 | `lotId`, `txnStatus` |
| | RPT-03 | 84 | `participantId`, `eligibilityStatus` |
| | RPT-05 | 102 | `businessDate` |
| | RPT-06 | 111 | `businessDate`, `batchCode` |
| | RPT-07 | 120 | `period`, `participantId` |
| | RPT-08 | 129 | `businessDate`, `actorId` |
| **Mock — 5 mã** | RPT-04 · RPT-09 · RPT-10 · RPT-11 · RPT-12 | 93 · 138 · 147 · 156 · 165 | `[]` — không có bộ lọc, không có cột |

Mock trả **403 `MOCK_REPORT`** khi xuất CSV (`export.csv/route.ts:33`) và luôn 0 dòng
(`load-report-rows.ts:78`). RPT-04/RPT-09 mock vĩnh viễn (`registry.ts:55-58`).
`docs/generated/permissions-matrix.md:1029` khai cùng con số.

## 3. Bảng field

### 3.1 REG bộ lọc — `ReportFilterForm`, một component chung cho cả 12 mã

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `businessDate` | Ngày nghiệp vụ | 営業日 | date | Có (`required: true` trong registry, nhưng chỉ là metadata) | tham số URL; lọc trên `transaction.business_date` v.v. | `<input type="date">`, **không** `required`, không `min`/`max` (`report-filter-form.tsx:51-58`) | `isValidReportDate()` — đúng `YYYY-MM-DD` và là ngày lịch thật; sai hoặc thiếu → **âm thầm rơi về `todayJst()`** (`load-report-rows.ts:25-27`, `is-valid-report-date.ts:7-12`) | không có — không báo gì |
| 2 | `period` | Kỳ | 対象期間 | date | Có (chỉ RPT-07) | tham số URL; lọc `incentive_result.period` | như trên | như trên — rơi về `todayJst()` | không có |
| 3 | `participantId` | Người tham gia | 参加者 | select | Không | `participant.id` / `participant.name` (`filter-options.ts:18-22`) | `<select>` với option rỗng "Tất cả người tham gia" | rỗng → bỏ lọc; giá trị lạ → **không kiểm uuid**, đưa vào `.eq()`, trả 0 dòng (`load-report-rows.ts:27-28`) | không có |
| 4 | `lotId` | Lô hàng | ロット | select | Không | `lot.id` / `lot.lot_code` (`filter-options.ts:24-28`) | như trên | như trên | không có |
| 5 | `txnStatus` | Trạng thái giao dịch | 取引ステータス | select (enum tĩnh) | Không | `transaction.status` — enum tĩnh, không đọc DB (`filter-options.ts:39-46`) | như trên | như trên | không có |
| 6 | `eligibilityStatus` | Trạng thái hiệu lực | 資格状態 | select (enum tĩnh) | Không | 4 trạng thái hiệu lực của F002 | như trên | như trên | không có |
| 7 | `actorId` | Chủ thể thực hiện | 実施者 | select | Không | `app_user.id`; nhãn `display_name` **rơi về `email`** (`filter-options.ts:30-37`) | như trên | khớp `correction_request.approved_by` — "chủ thể" là người *duyệt*, không phải người *yêu cầu* (`rpt-08-post-lock-adjustments.ts:33-35`) | không có |
| 8 | `batchCode` | Batch code | バッチコード | text | Không (chỉ RPT-06) | `accounting_export_batch.batch_code` unique (`20260908090000_accounting_export.sql:18`) | `maxLength={40}` (`report-filter-form.tsx:73-80`, `registry-filters.ts:67`) | `trim()` + `slice(0,40)`; **khi xuất CSV**: thiếu → **422 `BATCH_CODE_REQUIRED`**; sai regex `^ACC-\d{8}-\d{2}$` → **404 `BATCH_NOT_FOUND`**; không khớp `business_date` của batch → **404 `BATCH_NOT_FOUND`** (`export.csv/route.ts:20,47-58`) | không có khoá i18n cho 3 mã này — `chưa có — đề xuất` |
| 9 | `page` | *không có nhãn* | `chưa có key JA` | integer | Không | tham số URL | link phân trang tự sinh (`report-result-table.tsx:6-10`) | `Math.max(1, Number(...) \|\| 1)` — giá trị lạ về 1 (`page.tsx:53`, `api/reports/[reportCode]/route.ts:23`) | không có |

### 3.2 REG bảng kết quả — `ReportResultTable`

Cột lấy từ `definition.columns` (`registry-columns.ts`), một component chung cho mọi mã. Không
có input, **không có validation client/server nào** — chỉ đọc.

| Nhóm cột | Nguồn | Ghi chú |
|---|---|---|
| RPT-06 — 13 cột | `accounting_export_batch.lines` (chế độ batch) hoặc `buildAccountingLines()` (chế độ xem trước) (`registry-columns.ts:87-101`, `rpt-06-accounting-export.ts:63-80`) | `taxJpy` = `floor(net * 800 / 10000)` — 8% 軽減税率, **giả định chờ khách xác nhận** (`tax.ts:15-16,25-27`) |
| RPT-08 — 15 cột | `transaction_adjustment` + `correction_request` + `business_day_lock` (`registry-columns.ts:106-122`) | **`evidence_path` cố ý không có cột nào** (`registry-columns.ts:103-105`) |
| Mã mock | `[]` | 0 cột, 0 dòng |
| Phân trang | `REPORT_PAGE_SIZE = 50`, cố định, không cấu hình được (`report-page-size.ts:1-2`) | Xuất CSV thì `paginate: false` — lấy **toàn bộ** tập đã lọc (`load-report-rows.ts:65-70,81`) |

### 3.3 REG khối batch kế toán — chỉ RPT-06 (kiêm chức năng SC-27)

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Nút Tạo batch | Tạo batch xuất kế toán | 会計エクスポートバッチを作成 | hành động | — | ghi `accounting_export_batch` | chỉ render khi `user.role === "ROLE-SETTLEMENT"` (`page.tsx:127`) | `requireRole(["ROLE-SETTLEMENT"])` → **404** khi sai vai trò; `isValidReportDate` → **422 `INVALID_BUSINESS_DATE`**; ngày chưa lock → **409 `DAY_NOT_LOCKED`**; đua `seq` 5 lần → **409 `SEQ_RACE_EXHAUSTED`** (`export-batches/route.ts:10-16,25,34-46`, `create-export-batch.ts:34-37,48`) | "Ngày nghiệp vụ chưa lock, không thể tạo batch." · "Có nhiều yêu cầu tạo batch cùng lúc, hãy thử lại." · "Ngày nghiệp vụ không hợp lệ." |
| 2 | `batch_code` | Batch code | バッチコード | text — server sinh | Có | `ACC-YYYYMMDD-NN`, `NN` = `max(seq)+1` **theo lần xuất**, không theo ngày lịch (`batch-code.ts:4-14,23-38`) | không có input | unique constraint; `23505` → thử lại tối đa 5 lần (`create-export-batch.ts:9,48`) | — |
| 3 | Loại | Lần đầu / Xuất lại | 初回 / 再エクスポート | enum | Có | `kind` CHECK in (full/re-export); `seq === 1 ? 'full' : 're-export'` (`create-export-batch.ts:54`) | không có input | không có input | — |
| 4 | Thuế suất | Thuế suất | 税率 | integer bps | Có | `tax_rate_bps` đóng dấu lên từng batch = `TAX_RATE_BPS` 800 (`tax.ts:15`, `create-export-batch.ts:55`) | không có input | CHECK `>= 0` | — |
| 5 | Người tạo | Người tạo | 作成者 | text — chỉ đọc | Không (nullable) | `app_user.display_name` qua `exported_by`; **rơi về `email`** (`rpt-06-accounting-export.ts:47-49`) | không có input | không có input | — |
| 6 | Số dòng / Tổng tiền / Tổng thuế | Số dòng · Tổng tiền (JPY) · Tổng thuế (JPY) | 行数 · 合計金額(JPY) · 消費税合計(JPY) | integer / bigint | Có | `row_count`, `total_net_amount_jpy`, `total_tax_jpy` (`…accounting_export.sql:24-26`) | không có input | CHECK `row_count >= 0` | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | `rows.length === 0` | `EmptyState` "Không có dữ liệu khớp với bộ lọc đã chọn." (`report-result-table.tsx:33-35`) | Đổi bộ lọc · vẫn xuất CSV được (file chỉ có dòng header) |
| **báo cáo mẫu** | `definition.isMock` | `MockDataBadge` + "Báo cáo này đang ở dạng mẫu, chưa có dữ liệu thật." + nút xuất `disabled` (`page.tsx:94-106`) | không xuất được — server cũng chặn **403** |
| **RPT-06 chế độ xem trước** | RPT-06, không có `batchCode` | "Đang xem trước — số liệu hiện tại, chưa gửi kế toán." + nút xuất `disabled` (`page.tsx:111,118-126`) | Tạo batch (nếu ROLE-SETTLEMENT) |
| **RPT-06 chế độ xem batch** | RPT-06, có `batchCode` | "Đang xem batch đã tạo — số liệu đã gửi kế toán." + link xuất CSV hoạt động (`page.tsx:111-116`) | Xuất CSV |
| mã báo cáo không tồn tại | `getReportDefinition` trả `undefined` | trang **404** (`page.tsx:48`) | không |
| đang tải | Server Component đang render | streaming `PageFrame` | không |
| lỗi tải | query throw (`load-report-rows.ts` hoặc `filter-options.ts`) | error boundary Next.js | Tải lại |
| không có quyền | **không áp dụng khi vào màn**; chỉ nút Tạo batch bị ẩn khi vai trò ≠ ROLE-SETTLEMENT | khối batch vẫn hiện danh sách batch, chỉ thiếu nút | Xem, xuất CSV |
| đang gửi | Tạo batch: `pending === true` | nút `disabled` + `aria-busy` (`create-export-batch-button.tsx:52-60`) | không |
| gửi lỗi | 404/409/422 khi tạo batch | `<p role="alert">` theo khoá `reports.rpt06.createBatchError.*` | Thử lại |
| **read-only vì ngày đã lock (423)** | **không áp dụng — có chủ đích**: `accounting_export_batch` chỉ nhận INSERT và cố ý **không** mang `trg_block_after_lock` (`…accounting_export.sql:59-67`); ngược lại, tạo batch **bắt buộc** ngày đã lock, chưa lock thì **409** | Tạo batch trên ngày đã lock | — |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| Cả 7 vai trò, đang hoạt động | ✓ | toàn bộ bộ lọc, bảng kết quả, danh sách batch của RPT-06 | Lọc · Phân trang · Xuất CSV (mã thật) | **403 `MOCK_REPORT`** khi xuất mã mẫu · 404 `report_not_found` · 422 `BATCH_CODE_REQUIRED` · 404 `BATCH_NOT_FOUND` |
| ROLE-SETTLEMENT | ✓ | thêm nút **Tạo batch xuất kế toán** | Tạo batch | 422 `INVALID_BUSINESS_DATE` · 409 `DAY_NOT_LOCKED` · 409 `SEQ_RACE_EXHAUSTED` |
| 6 vai trò còn lại | ✓ | **không** thấy nút Tạo batch | không tạo batch được | `POST /api/accounting/export-batches` → **404** |
| Không session / `is_active=false` | ✗ | không | không | **307** `/login` |

**Chặn xuất mã mẫu là data-driven, không phải theo vai trò** — cả 7 vai trò đều bị chặn như
nhau (`export.csv/route.ts:33`, `permissions-matrix.md:1020-1031`).

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng**, kể cả
`accounting_export_batch` (FR-601, `rls_core.sql:29`, `…accounting_export.sql:49-50`). Chặn là ở
**ghi** (`write_settlement` insert-only, `…accounting_export.sql:56-57`, **không có policy
update/delete** — append-only) và ở **hành động**, không phải ở vào trang.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Lọc / phân trang | không có API — form `method="GET"` + link (`report-filter-form.tsx:47`, `report-result-table.tsx:6-10`) | không ghi | không | không |
| Đọc dữ liệu qua API | `GET /api/reports/[reportCode]?<filters>&page=` | không ghi | không | 404 `report_not_found` · 500 `internal_error` |
| Xuất CSV | `GET /api/reports/[reportCode]/export.csv?<filters>` | không ghi | **không có audit** — không dòng nào ghi lại ai xuất báo cáo gì (`export.csv/route.ts:25-82`) | 404 `report_not_found` · **403 `MOCK_REPORT`** · 422 `BATCH_CODE_REQUIRED` · 404 `BATCH_NOT_FOUND` · 500 |
| Tạo batch xuất kế toán (**chức năng của SC-27**) | `POST /api/accounting/export-batches` `{businessDate}` | `accounting_export_batch` INSERT, `lines` là snapshot bất biến của đúng các dòng đã gửi | `create_accounting_export_batch` (`create-export-batch.ts:67-70`) | **404** khi sai vai trò · 400 `invalid_json` · 422 `INVALID_BUSINESS_DATE` · 409 `DAY_NOT_LOCKED` · 409 `SEQ_RACE_EXHAUSTED` · 500 |
| Mở một batch trong lịch sử | điều hướng `/reports/RPT-06?businessDate=&batchCode=` (`export-batch-list.tsx:4-7,39-40`) | không ghi | không | batch không khớp ngày → 0 dòng |

**Định dạng CSV:** UTF-8 **có BOM** (`U+FEFF`), phân tách `,`, quoting RFC 4180, kết dòng
**CRLF** (`to-csv.ts:6-11,15-19,25`). Chở được cả chữ Nhật và tiếng Việt có dấu — Shift-JIS bị
loại vì không biểu diễn được dấu tiếng Việt. Tên file: `{code}-{date}.csv`, riêng RPT-06 là
`RPT-06-{batch_code}.csv` dựng từ `batch.batch_code` **đã xác nhận trong DB**, không phải từ
query string — lớp chống header injection thứ hai sau regex (`export.csv/route.ts:59-62,70`).

**`writeAuditLog()`** chạy sau khi INSERT commit, không rollback được (QĐ-5,
`write-audit-log.ts:44-50`).

## 7. Edge case

- **SC-27 chưa có màn riêng.** Chức năng "xuất được dữ liệu kế toán" đã xong và nằm trong RPT-06:
  bảng `accounting_export_batch` tồn tại thật, có nút tạo batch và danh sách batch theo ngày
  (`page.tsx:68-76,127-128`). Nhưng **màn quản lý batch riêng** (theo dõi batch code, trạng thái
  gửi, xuyên nhiều ngày) là SC-27, **chưa dựng** — xem `docs/lab4/00-roster-va-gap.md:64-74`.
  Kiểm sống 2026-09-08: **0 batch** trong bảng. LAB-5 phải tách hai task này, đừng gộp.
- **Tên người rơi về `email` ở RPT-06, rơi về `id` ở RPT-08.** RPT-08 giữ đúng kỷ luật
  `display_name ?? id`, **không bao giờ email** (`rpt-08-post-lock-adjustments.ts:16-18,28`).
  RPT-06 thì `display_name ?? email` (`rpt-06-accounting-export.ts:47-49`) — email nội bộ **ra
  được cột `exportedBy` của CSV gửi kế toán**. Dropdown "Chủ thể thực hiện" cũng vậy
  (`filter-options.ts:36`). `chưa có — đề xuất`: đổi cả hai chỗ về `?? id`.
- **`evidence_path` không bao giờ ra CSV** — RPT-08 cố ý không khai cột này
  (`registry-columns.ts:103-105`). Đúng yêu cầu bảo mật của SC-20.
- **Xuất CSV không được audit**: không có `writeAuditLog` nào trong đường xuất
  (`export.csv/route.ts:25-82`). Không truy được ai đã tải dữ liệu kế toán ra ngoài.
  `chưa có — đề xuất`.
- **Ngày sai âm thầm rơi về hôm nay**: `?businessDate=2026-13-45` không báo lỗi, chỉ hiện số của
  hôm nay (`load-report-rows.ts:25-27`). Người dùng dễ đọc lệch ngày. `chưa có — đề xuất`: báo
  lỗi thay vì thay thế im lặng.
- **Ba mã lỗi RPT-06 chưa có khoá i18n**: `BATCH_CODE_REQUIRED`, `BATCH_NOT_FOUND`,
  `MOCK_REPORT` trả JSON trần, mà đường xuất là link `<a href>` nên người dùng nhìn thẳng vào
  JSON thay vì thông báo tiếng Việt (`page.tsx:113-116`). `chưa có — đề xuất`.
- **Thuế 8% là GIẢ ĐỊNH chờ khách xác nhận**, không phải sự thật đã chốt: RFP không nêu thuế
  suất, cũng không nói `unit_price` là 税込 hay 税抜 (`tax.ts:1-16`). Màn hiện đúng cảnh báo
  đó (`page.tsx:109`). Thuế suất được đóng dấu lên từng batch nên batch cũ vẫn tự giải thích
  được khi đổi hằng số.
- **Xuất lại một ngày đã xuất là hành động bình thường**: ngày đã lock vẫn đổi được qua
  `transaction_adjustment` (SC-20/21), nên một batch bất biến mỗi ngày sẽ làm kế toán lệch mãi
  sau lần điều chỉnh đầu tiên (`…accounting_export.sql:33-41`, `batch-code.ts:4-10`).
- **`accounting_export_batch` append-only**: không có policy update/delete ở bất kỳ đâu
  (`…accounting_export.sql:55-57`). Batch đã gửi kế toán chỉ được thay bằng batch mới.
- **Tạo batch không có transaction**: một INSERT duy nhất; cửa sổ lỗi còn lại là "INSERT xong
  nhưng client không thấy response" → batch mồ côi, vô hại, xuất lại là xong
  (`create-export-batch.ts:22-27`).
- **Chú thích trong code đã cũ**: `page.tsx:27` viết "Mock reports (8/12)"; registry hiện là
  **5/12**. Chỉ là comment. `chưa có — đề xuất`: cập nhật.
- **Quyền bị thu hồi giữa phiên**: `is_active=false` → **307** `/login?reason=inactive`; đổi vai
  trò khỏi ROLE-SETTLEMENT → nút tạo batch biến mất và API trả 404.

## 8. Dẫn chứng

- `src/app/(app)/reports/[reportCode]/page.tsx:24,26-31,42,47-48,53,68-76,94-106,107-129,130-137,139-155` — hằng vai trò, chú thích composite (comment 8/12 đã cũ), `requireUser`, 404, `page`, khối RPT-06, nhánh mock, hai chế độ, xuất, bộ lọc, bảng
- `src/components/reports/report-filter-form.tsx:30-32,44,47,51-58,59-72,73-80` — một form chung, `maxLength`, không `required`
- `src/components/reports/report-result-table.tsx:6-10,12-13,33-35,37,42` — link phân trang, trạng thái rỗng, `totalPages`
- `src/components/accounting/create-export-batch-button.tsx:7-17,30-41,52-60` — POST-only, ba tầng chặn, map lỗi
- `src/components/accounting/export-batch-list.tsx:4-7,17-19,26-33,39-40` — lịch sử batch, 8 cột, link vào chế độ batch
- `src/lib/reports/registry.ts:46-58,66,75,84,93,102,111,120,129,138,147,156,165` — chú thích FR-RPT-03, `isMock` từng mã
- `src/lib/reports/load-report-rows.ts:21-35,42-62,65-70,78,81,83-85` — parse bộ lọc, dispatch 7 mã thật, mock trả rỗng, `paginate:false` cho CSV
- `src/lib/reports/to-csv.ts:6-11,15-19,25` — BOM + CRLF + RFC 4180 · `report-page-size.ts:1-2` — 50 dòng/trang · `is-valid-report-date.ts:7-12` — validator ngày
- `src/lib/reports/registry-columns.ts:87-101,103-105,106-122` — 13 cột RPT-06, chú thích không có `evidence_path`, 15 cột RPT-08
- `src/lib/reports/filter-options.ts:18-22,24-28,30-37,39-46` — nguồn dropdown; **`display_name ?? email`** ở dòng 36
- `src/lib/reports/queries/rpt-06-accounting-export.ts:37-50,52-62,63-80` — rơi về `email`, hai chế độ
- `src/lib/reports/queries/rpt-08-post-lock-adjustments.ts:16-18,26-28,33-35` — rơi về `id`, "chủ thể" là người duyệt
- `src/app/api/reports/route.ts:5-16` — danh mục, không đọc DB · `[reportCode]/route.ts:10-12,17,20,23` — 404 khi mã lạ, `page`
- `src/app/api/reports/[reportCode]/export.csv/route.ts:20,22-24,31-33,42-63,65-70,72-78` — regex batch code, **403 `MOCK_REPORT`**, 422/404 của RPT-06, tên file từ DB, header CSV
- `src/app/api/accounting/export-batches/route.ts:10-16,25,29-35,44-46,50-54` — bảng mã lỗi, `requireRole` → 404, 422/409
- `src/lib/accounting/create-export-batch.ts:9,17-27,34-37,48-64,67-70` — retry `23505`, ngày chưa lock → 409, INSERT + audit
- `src/lib/accounting/batch-code.ts:4-14,23-38` — `ACC-YYYYMMDD-NN`, `seq` theo lần xuất · `tax.ts:1-16,25-27` — 8% là giả định chờ xác nhận, `floor`
- `supabase/migrations/20260908090000_accounting_export.sql:1-15,16-31,33-41,45-57,59-67` — giả định thuế, DDL, append-only, RLS, cố ý không có trigger lock
- `supabase/migrations/20260904090900_rls_core.sql:29` — FR-601, mọi vai trò đọc được
- `docs/lab4/00-roster-va-gap.md:64-74` — SC-27 khai hai chỗ mâu thuẫn, kiểm sống 0 batch
- `docs/generated/permissions-matrix.md:981-1005,1023-1031` — PERM025 tạo batch, PERM026 chặn xuất mock (5/12)
