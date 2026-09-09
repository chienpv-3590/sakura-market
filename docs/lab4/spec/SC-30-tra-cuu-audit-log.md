# SC-30 — Tra cứu audit log

| | |
|---|---|
| Mã thi công | — (chưa dựng; bảng `audit_log` đã có và **đang ghi** ở F011) |
| Route | — (đề xuất `/audit`) |
| Loại | List |
| Actor chính | Kiểm toán nội bộ, bộ phận hành chính |
| FE- / FR- | FE-042 · `FR-AUDIT-02` · `NFR-PERF-01` · RFP §09-06 (APPI) |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

## 1. Mục đích

Cho kiểm toán nội bộ và bộ phận hành chính tự tra dấu vết thao tác thay vì phải nhờ người viết
truy vấn. Ranh giới:

| | Hiện trạng |
|---|---|
| **Đã có** | Bảng `audit_log` append-only, đang ghi thật ở 32 điểm gọi `writeAuditLog` khắp F001–F011 (kiểm 2026-09-08: 331 dòng sống). Chi tiết audit theo **một** thực thể đã render được trên SC-10 và SC-12 |
| **Còn thiếu** | Màn tra cứu **xuyên thực thể** theo 4 tiêu chí `FR-AUDIT-02` đòi. Ba rào riêng biệt, không phải "3/4 tiêu chí": tiêu chí **ID giao dịch** tra được nhưng phải qua **cặp** `entity` + `entity_id` chứ không một cột · tiêu chí **ngày nghiệp vụ** và **người tham gia** **không có cột nào** · và `audit_log` **không có index nào ngoài PK** nên `NFR-PERF-01` (p95 ≤ 2s) không có đường đạt. Xem mục 9 |

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc
- Vai trò được vào: đề xuất **ROLE-SYS-ADMIN** cho vòng đầu. `FR-AUDIT-02` nêu actor là "bộ phận
  hành chính / kiểm toán nội bộ" — hai vai trò nghiệp vụ **không có** trong 7 vai trò `TBL-ROLE-01`
  (`src/lib/auth/role-landing.ts:1-10`). Việc chọn vai trò cuối cùng là quyết định kiến trúc, xem
  mục 9
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên)
- Tiền đề dữ liệu: không cần

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ID giao dịch | ID giao dịch | chưa có key JA | text | Không | `audit_log.entity_id` (lọc kèm `entity = 'transaction'`) | chưa có — đề xuất: uuid hoặc mã giao dịch; trim | chưa có — đề xuất: không parse được → danh sách rỗng, không 4xx | chưa có — đề xuất |
| 2 | Ngày nghiệp vụ | Ngày nghiệp vụ | 営業日 (`reports.filter.businessDate`) | date | Không | **không có cột — đề xuất**; hiện chỉ suy từ `.created_at` theo JST, xem mục 9 | chưa có — đề xuất: `YYYY-MM-DD` | chưa có — đề xuất: dùng lại `isValidReportDate` | chưa có — đề xuất |
| 3 | Người tham gia | Người tham gia | 参加者 (`nav.participants`) | select | Không | **không có cột — đề xuất**; hiện chỉ tới được qua join theo từng `entity`, xem mục 9 | chưa có — đề xuất: chỉ id trong danh sách nạp về | chưa có — đề xuất: id không tồn tại → danh sách rỗng | chưa có — đề xuất |
| 4 | Loại thao tác | Loại thao tác | chưa có key JA | select | Không | `audit_log.action` | chưa có — đề xuất: chỉ giá trị trong tập nạp từ server | chưa có — đề xuất: ngoài tập → 422 | chưa có — đề xuất |
| 5 | Thực thể | Thực thể | chưa có key JA | select | Không | `audit_log.entity` | chưa có — đề xuất: 12 giá trị đang có trong code | chưa có — đề xuất: ngoài tập → 422 | chưa có — đề xuất |
| 6 | Người thực hiện | Người thực hiện | 実施者 (`participants.detail.historyHeaderChangedBy`) | select | Không | `.actor_id` → `app_user.display_name` | chưa có — đề xuất | chưa có — đề xuất | chưa có — đề xuất |
| 7 | Thời điểm | Thời điểm | 日時 (`participants.detail.historyHeaderChangedAt`) | timestamptz | — | `.created_at` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 8 | Thao tác (cột) | Thao tác | chưa có key JA | text | — | `.action` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 9 | Thực thể / ID | Thực thể / ID | chưa có key JA | text | — | `.entity` + `.entity_id` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 10 | Lý do | Lý do | 理由 (`participants.detail.historyHeaderReason`) | text | — | `.reason` (nullable) | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 11 | Before / After | Trước / Sau | 変更前 / 変更後 (`participants.detail.historyHeaderFrom` / `...HeaderTo`) | jsonb | — | `.before`, `.after` (nullable) | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |

- `before`/`after` là jsonb tự do, nội dung do từng feature quyết định — **không** hiện thô trên
  bảng. Đề xuất dùng lại `src/components/audit/audit-diff.tsx` và
  `audit-field-maps.ts` (đã dựng cho SC-10/SC-12) ở panel chi tiết một dòng.
- **Không hiện email** ở bất kỳ cột nào; chỉ `display_name`. Email là thông tin cá nhân thuộc phạm
  vi APPI (RFP §09-06) và quy tắc "không đưa email actor ra output" đã có tiền lệ ở
  `src/lib/reports/registry-columns.ts:103-105`.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Query trả 0 dòng | "Không có bản ghi audit nào khớp điều kiện" | Đổi filter |
| đang tải | Query đang chạy | Skeleton bảng | Không |
| lỗi tải | Query lỗi | Khối lỗi + nút thử lại | Thử lại |
| không có quyền | Vai trò không được vào | Trang **404** | Không |
| đang gửi | Không áp dụng — màn chỉ đọc, không có form ghi | — | — |
| gửi lỗi | Không áp dụng — cùng lý do trên | — | — |
| quá nhiều kết quả | Số dòng khớp vượt ngưỡng trang | Thông báo cần thu hẹp điều kiện + phân trang | Thu hẹp filter, sang trang |

Không có dòng `read-only vì ngày đã lock`: `audit_log` không nằm trong 4 bảng bị lock
(`transaction`, `seri_result`, `mekiki_record`, `delivery_shipment`) và màn này không ghi gì. Màn
này không bao giờ trả **423**.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | Có (đề xuất) | Toàn bộ | Xem, lọc, phân trang | — |
| ROLE-SETTLEMENT | Cần quyết định — xem mục 9 | — | — | **404** nếu không được cấp |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-TRADE, ROLE-DELIVERY, ROLE-RULE-ADMIN | Không (đề xuất) | — | — | **404** |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601, có chủ đích) —
`audit_log` cũng vậy (`20260904090900_rls_core.sql:28-34`). Nghĩa là gác màn này ở tầng route
**không** làm dữ liệu audit trở thành bí mật ở tầng dữ liệu; nó chỉ khiến dữ liệu đó không còn một
giao diện tiện lợi để duyệt hàng loạt. Đây là một đánh đổi thật, đã ghi ở mục 9 và **cần ADR** —
spec này không tự quyết.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Tra cứu theo 4 tiêu chí | `GET /api/audit` — **chưa có, đề xuất** | Không | Cân nhắc: ghi chính hành vi tra cứu (xem giả định #3) | 404 (sai vai trò), 422 (tham số ngoài tập), 500 |
| Mở chi tiết một dòng | Cùng endpoint hoặc `GET /api/audit/{id}` — **chưa có, đề xuất** | Không | Như trên | 404, 500 |
| Xuất CSV kết quả | **Không đề xuất cho vòng đầu** | — | — | — |

Không đề xuất xuất CSV: `FR-AUDIT-02` chỉ đòi **tìm kiếm**, và `FR-RPT-03` (dòng 709) khoanh phạm
vi xuất dữ liệu vào catalog 12 báo cáo — audit không nằm trong catalog. Thêm CSV ở đây là mở một
đường mang dữ liệu APPI ra ngoài hệ thống mà RFP không yêu cầu.

## 7. Edge case

- **`actor_id` là NULL** — cột nullable (`20260904090000_core_identity.sql:28`) và các đường ghi
  trước khi có session (đăng nhập thất bại) truyền `null`. Bảng phải hiện "hệ thống", không hiện ô
  trống.
- **Người thực hiện đã bị vô hiệu hoá hoặc xoá tên** — dòng audit vẫn phải hiện; join hỏng thì rơi
  về `actor_id`, không ẩn dòng.
- **`before`/`after` cùng NULL** — đúng với các action chỉ ghi sự kiện
  (`locked_write_attempt`, `login_failed`): panel diff phải chịu được, không throw.
- **Lọc theo ngày nghiệp vụ lệch một ngày** — `created_at` là giờ tường, ngày nghiệp vụ chạy
  02:00–10:00 JST (RFP §02-07, dòng 299-305) và mọi điều chỉnh sau 10:00 (`FR-CORR-01`) ghi **về**
  một ngày trước đó. Suy ngày nghiệp vụ từ `created_at` là **sai** ở đúng những dòng kiểm toán quan
  tâm nhất. Xem mục 9.
- **Kết quả quá lớn** — 331 dòng hôm nay không nói gì về một năm vận hành thật. Phải phân trang từ
  đầu, không "tải hết rồi lọc client".
- **`NFR-PERF-01` p95 ≤ 2 giây** (dòng 807) — `audit_log` hiện **không có index nào** ngoài primary
  key (`20260904090000_core_identity.sql:26-36`). Lọc theo `entity`/`action`/`created_at` sẽ quét
  toàn bảng.
- **Quyền bị thu hồi giữa phiên** — `getCurrentUser` trả `null` khi `is_active = false`
  (`require-role.ts:47`) → **404** ở lần điều hướng sau.

## 8. Dẫn chứng

- `supabase/migrations/20260904090000_core_identity.sql:26-36` — DDL `audit_log`: 9 cột, **không**
  `business_date`, **không** `participant_id`, **không index** nào ngoài primary key
- `supabase/migrations/20260904090000_core_identity.sql:38-40` — comment: append-only, không policy
  update/delete
- `supabase/migrations/20260904090900_rls_core.sql:28-34` — read policy rộng cho mọi vai trò, kèm lý
  do FR-601
- `supabase/migrations/20260904090900_rls_core.sql:64-67` — `insert_any_active_user`, không có
  policy update/delete
- `src/lib/audit/write-audit-log.ts:30-51` — primitive dùng chung; `reason` bắt buộc hay không là
  quyết định của từng feature, không của bảng
- `src/components/audit/audit-diff.tsx`, `src/components/audit/audit-field-maps.ts` — component
  diff đã dựng, dùng lại được
- `src/lib/auth/role-landing.ts:1-10` — 7 vai trò `TBL-ROLE-01`; không có vai trò kiểm toán
- `src/lib/reports/registry-columns.ts:103-105` — tiền lệ "không đưa email actor ra output"
- `../../pham-vi-va-phan-mock.md` § 2b — `FR-AUDIT-02` khai NGOÀI PHẠM VI, audit **có ghi**
- RFP `../../../../RFP_He-thong-ho-tro-nghiep-vu-cho-ban-buon-thuy-san_VI_v1.0.md`: dòng 711
  (`FR-AUDIT-02`, 4 tiêu chí tìm kiếm), dòng 710 (`FR-AUDIT-01`, phạm vi ghi), dòng 807
  (`NFR-PERF-01` p95 ≤ 2 giây), dòng 299-305 (§02-07 khung giờ ngày nghiệp vụ), dòng 881-888
  (§09-06 APPI: RBAC và log truy cập cho thông tin cá nhân)

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | `audit_log`: thêm `business_date date null` | Tiêu chí "ngày nghiệp vụ" của `FR-AUDIT-02` không có cột nào chứa nó. Suy từ `created_at` sai ở đúng nhóm dòng quan trọng nhất (điều chỉnh hậu-lock). Cột này phải do từng đường ghi truyền vào, không tính được ngược. Ghi vào `../10-database-diagram.md` § bảng cần thêm |
| Bảng/cột | `audit_log`: index cho `created_at`, `entity + entity_id`, `action` | Bảng hiện chỉ có primary key. Không có index thì `NFR-PERF-01` (p95 ≤ 2 giây) không có cách nào đạt khi bảng lớn |
| Bảng/cột | Đường tới "người tham gia": hoặc thêm `participant_id` vào `audit_log`, hoặc một view join theo từng `entity` | `entity` hiện có 12 giá trị trong code (`transaction`, `lot`, `participant`, `delivery`, `correction_request`, `seri_result`, `incentive_result`, `incentive_rule_version`, `business_day_lock`, `lot_attachment`, `accounting_export_batch`, `app_user`) — mỗi giá trị tới `participant` bằng một đường khác nhau, có giá trị **không tới được** |
| Hạ tầng | Không cần thêm gì | Bảng, đường ghi và RLS đã có |
| Màn/API phụ thuộc | `GET /api/audit` (chưa có) | Không có endpoint audit nào ở `src/app/api/` |
| Màn/API phụ thuộc | **ADR về siết đọc `audit_log`** | Bắt buộc trước khi dựng — xem giả định #1 |

### Giả định cần chốt

1. **Ai được tra cứu audit, và có siết RLS đọc `audit_log` hay không.** `FR-AUDIT-02` nêu "bộ phận
   hành chính / kiểm toán nội bộ" — không khớp vai trò nào trong 7 vai trò `TBL-ROLE-01`. Hiện
   `audit_log` đọc rộng cho mọi vai trò đang hoạt động (`rls_core.sql:28-34`), là quyết định **có
   chủ đích** của FR-601 và của nhu cầu review LAB-7. Dựng một màn duyệt hàng loạt lên trên một
   bảng đọc rộng là chỗ hai yêu cầu đúng đắn đá nhau: FR-601 muốn mở, §09-06 (APPI) đòi kiểm soát
   truy cập theo vai trò cho thông tin cá nhân.
   *Ảnh hưởng nếu chọn sai:* siết quá thì phá FR-601 và làm hỏng đường review; mở quá thì mọi vai
   trò nghiệp vụ duyệt được toàn bộ dấu vết thao tác của đồng nghiệp.
   *Nơi sửa:* policy trên `audit_log`, `requireRole` của route mới, và `src/lib/nav-items.ts`.
   **Đây là quyết định kiến trúc — phải có ADR riêng, spec này không tự quyết.**
2. **Tập giá trị `action` hiển thị trong dropdown "Loại thao tác".** Code hiện có
   28 giá trị `action` phân biệt trên 32 điểm gọi, đều là chuỗi tự do — không CHECK constraint,
   không hằng số dùng chung — và trộn hai lối đặt tên (`create`/`update` chung chung dùng lại cho
   nhiều thực thể, cạnh `approve_correction`/`lock_business_day` đặc thù).
   *Ảnh hưởng nếu sai:* dropdown liệt thiếu hoặc liệt cả những chuỗi đã chết; kiểm toán tìm không
   ra vì chọn sai nhãn.
   *Nơi sửa:* một hằng số dùng chung cho toàn bộ `action` (chưa có), rồi dropdown đọc từ đó.
3. **Có ghi audit cho chính hành vi tra cứu audit hay không.** RFP §09-06 (dòng 886) đòi "log truy
   cập" cho thông tin cá nhân, nhưng không nói rõ có áp cho việc đọc audit hay không.
   *Ảnh hưởng nếu sai:* nếu khách coi đây là bắt buộc mà không ghi thì thiếu bằng chứng tuân thủ;
   nếu ghi mà không cần thì mỗi lần tra cứu lại sinh thêm dòng audit, làm bảng phình và nhiễu.
   *Nơi sửa:* route `GET /api/audit` (chưa có) gọi `writeAuditLog`.
4. **Số dòng mỗi trang và trần kết quả.** RFP chỉ chốt `NFR-PERF-01` p95 ≤ 2 giây, không nói kích
   thước trang.
   *Ảnh hưởng nếu sai:* trang quá lớn thì vỡ ngưỡng p95; quá nhỏ thì kiểm toán phải lật hàng chục
   trang cho một vụ việc.
   *Nơi sửa:* hằng số phân trang của route mới và mục 4 (trạng thái "quá nhiều kết quả") của file
   này.
