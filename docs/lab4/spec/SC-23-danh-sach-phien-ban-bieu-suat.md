# SC-23 — Danh sách phiên bản biểu suất

| | |
|---|---|
| Mã thi công | SCR022_RuleVersionList |
| Route | `/incentive/rules` |
| Loại | List |
| Actor chính | Quản trị rule (ROLE-RULE-ADMIN) — cả vai maker và vai checker |
| FE- / FR- | FE-031 / FR-101, SM-001, GOV-RULE-01 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Danh sách toàn bộ phiên bản biểu suất 完納奨励金: phiên bản nào đang hiệu lực, phiên bản nào chờ
duyệt, phiên bản nào đã bị thay thế hoặc rollback, ai tạo và ai duyệt. Đây là trang đích của
ROLE-RULE-ADMIN (`role-landing` đưa cả hai tài khoản maker/checker vào đây) và là điểm vào của
SC-24.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc (`src/app/(app)/layout.tsx:11`)
- Vai trò được vào: chỉ **ROLE-RULE-ADMIN** (`incentive/rules/page.tsx:24`)
- Mã lỗi khi thiếu quyền: **404** (`require-role.ts:72-77`)
- Tiền đề dữ liệu: không cần — bảng rỗng thì hiện trạng thái rỗng kèm nút tạo phiên bản

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `status` (bộ lọc) | Lọc theo trạng thái | 状態で絞り込み | select | Không — rỗng = tất cả | `incentive_rule_version.status` | `<select>` chỉ có 4 lựa chọn: rỗng + `pending_approval`/`active`/`rolled_back` (`rules/page.tsx:15,60-65`) | whitelist: `STATUSES.includes(status)` else `undefined` (bỏ lọc), không báo lỗi (`rules/page.tsx:27`). API `GET /api/incentive-rules` **không** whitelist — đưa thẳng vào `.eq()` (`incentive-rules/route.ts:62`, `rule-version-queries.ts:32`) | không có — giá trị lạ chỉ làm bỏ lọc (trang) hoặc trả 0 dòng (API) |
| 2 | `version_no` | Phiên bản | バージョン | integer | Có | `incentive_rule_version.version_no` NOT NULL + unique index (`20260904090700_incentive.sql:3,19`) | không có input | server tự sinh `max+1` khi tạo (SC-24) | — |
| 3 | `effective_from` | Ngày hiệu lực | 発効日 | date | Có | `incentive_rule_version.effective_from` NOT NULL (`…incentive.sql:5`) | không có input | không có input trên màn này | — |
| 4 | Trạng thái | Chờ duyệt · Đang hiệu lực · Đã rollback · **Đã bị thay thế** · **Đã duyệt, chờ tới ngày hiệu lực** | 承認待ち · 有効 · ロールバック済み · 置き換え済み · 承認済み・発効日待ち | enum dẫn xuất | Có | `incentive_rule_version.status` CHECK in (pending_approval/active/rolled_back) — **chỉ 3 giá trị lưu trong DB**; `superseded` và `scheduled` là nhãn tính tại thời điểm đọc (`rule-version-display-status.ts:1,9-18,19-41`) | không có input | không có input | — |
| 5 | Người tạo | Người tạo | 作成者 | text — chỉ đọc | Không (nullable) | `app_user.display_name` join qua `created_by`; **rơi về `app_user.email`** nếu `display_name` rỗng, rồi `—` nếu join rỗng (`rule-version-queries.ts:18`, `rule-version-table.tsx:49`) | không có input | không có input | — |
| 6 | Người duyệt | Người duyệt | 承認者 | text — chỉ đọc | Không (nullable) | `app_user.display_name` join qua `approved_by`; cùng chuỗi rơi về `email` rồi `—` (`rule-version-queries.ts:19`, `rule-version-table.tsx:50`) | không có input | không có input | — |
| 7 | `rate_table` | *không hiện trên màn* | `chưa có key JA` | jsonb nullable | Không | `incentive_rule_version.rate_table` — server ghi `{numerator:110, denominator:100, note}` (`create-rule-version.ts:53`) | không có input | không có input — biểu suất 110/100 cố định trong code, không cấu hình qua UI (`create-rule-version.ts:24-26`) | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | `rows.length === 0` | `EmptyState` "Chưa có phiên bản biểu suất nào." | Tạo phiên bản mới (SC-24) |
| rỗng do lọc | có dữ liệu nhưng lọc không khớp | cùng `EmptyState` — **không phân biệt** với "chưa có gì" | Bỏ lọc |
| đang tải | Server Component đang render | streaming `PageFrame` | không |
| lỗi tải | `listRuleVersions` throw (`rule-version-queries.ts:35-37`) | error boundary Next.js | Tải lại |
| không có quyền | vai trò ≠ ROLE-RULE-ADMIN | trang 404 | không |
| đang gửi / gửi lỗi | **không áp dụng** — màn chỉ đọc, không có hành động ghi nào (`rules/page.tsx` không gọi API ghi) | — | — |
| read-only vì ngày đã lock (423) | **không áp dụng** — `incentive_rule_version` không nằm trong 4 bảng mang `trg_block_after_lock` (`business_day_lock.sql:56-75`) | — | — |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-RULE-ADMIN | ✓ | toàn bộ 5 cột | chỉ đọc · lọc theo trạng thái · mở chi tiết (SC-24) · link tạo mới | không có mã lỗi nghiệp vụ trên màn này |
| ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-SYS-ADMIN | ✗ | không | không | trang **404**; `GET /api/incentive-rules` **404** |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được** `incentive_rule_version`
(FR-601, `rls_core.sql:29,57`). Chặn là ở **vào trang** và ở **ghi**: policy insert/update chỉ
cho `ROLE-RULE-ADMIN` (`rls_ops.sql:61-67`). Nghĩa là một tài khoản ROLE-SETTLEMENT **đọc được
bảng này bằng API Supabase trực tiếp**, chỉ không vào được trang.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Lọc theo trạng thái | không có API — form `method="GET"` về chính trang (`rules/page.tsx:52`) | không ghi | không | không |
| Mở một phiên bản | điều hướng `/incentive/rules/{id}` (`rule-version-table.tsx:38`) | không ghi | không | 404 nếu id không tồn tại (SC-24, `rules/[id]/page.tsx:28`) |
| Tạo phiên bản mới | điều hướng `/incentive/rules/new` (`rules/page.tsx:43`) | không ghi ở màn này | — | — |
| Đọc qua API | `GET /api/incentive-rules?status=` | không ghi | không | 404 khi sai vai trò · 500 `internal_error` |

## 7. Edge case

- **`display_name` rỗng thì rơi về `email`** (`rule-version-queries.ts:18-19`) — email nội bộ
  lộ ra UI. Chuỗi rơi này **lệch** với RPT-08, nơi cố ý rơi về `id` chứ không bao giờ về email
  (`rpt-08-post-lock-adjustments.ts:16-18,28`). `chưa có — đề xuất`: đổi
  `creator?.display_name ?? creator?.email` thành `?? row.created_by` cho khớp kỷ luật của
  RPT-08. Ảnh hưởng: cả SC-23 và SC-24 (dùng chung hàm `flatten`).
- **Không lọc được theo `scheduled`/`superseded`**: hai nhãn này chỉ tính tại thời điểm đọc, còn
  dropdown chỉ đưa 3 giá trị lưu trong DB (`rules/page.tsx:15`,
  `rule-version-display-status.ts:9-18`). Muốn tìm "đã duyệt nhưng chưa tới ngày" phải lọc
  `active` rồi tự đọc cột trạng thái.
- **Nhiều dòng `active` cùng lúc là bình thường, không phải lỗi dữ liệu**: ALG-001 luôn chọn
  dòng `active` có `effective_from` lớn nhất mà `<= today`; những dòng `active` khác được dán
  nhãn `superseded` khi hiển thị (`rule-version-display-status.ts:19-41`,
  `resolve-rule-version.ts:19-26`).
- **Nhãn tính theo `todayJst()` ở phía server**: hai người xem cùng lúc ở hai múi giờ vẫn thấy
  giống nhau, nhưng nhãn của một dòng **tự đổi khi qua ngày** mà không có ai ghi gì
  (`rules/page.tsx:31`). Đúng thiết kế — tránh job nền chỉ để lật một cột theo ngày.
- **API không whitelist `status`**: `GET /api/incentive-rules?status=<lạ>` trả 0 dòng thay vì bỏ
  lọc như trang (`incentive-rules/route.ts:62`). Hai đường vào cùng dữ liệu, hai hành vi khác
  nhau. `chưa có — đề xuất`: dùng chung whitelist.
- **Không phân trang**: `listRuleVersions` lấy hết, sắp `version_no` giảm dần
  (`rule-version-queries.ts:28-32`). Với trần GOV-RULE-01 (≤4 lần đổi/năm) thì chấp nhận được,
  nhưng trần đó **không được code kiểm tra** — xem SC-24 § 7.
- **Quyền bị thu hồi giữa phiên**: `is_active=false` → 307 `/login?reason=inactive`
  (`require-role.ts:58-64`); đổi vai trò → 404 ở lần render sau.

## 8. Dẫn chứng

- `src/app/(app)/incentive/rules/page.tsx:15,17-18,24,27,31,41-48,52-74,76` — whitelist 3 trạng thái, chú thích trang đích, `requireRole`, `computeDisplayStatuses`, link tạo mới, form lọc
- `src/components/incentive/rule-version-table.tsx:7-8,18-20,27-31,38,44-50` — nhãn tính sẵn, trạng thái rỗng, 5 cột, link chi tiết, `—` khi thiếu tên
- `src/lib/incentive/rule-version-queries.ts:14-21,24-39` — `flatten` rơi về `email`, query danh sách
- `src/lib/incentive/rule-version-display-status.ts:1,9-18,19-41` — `superseded`/`scheduled` là nhãn read-time
- `src/lib/incentive/resolve-rule-version.ts:4-13,19-26` — ALG-001 chọn version đang hiệu lực
- `src/lib/incentive/create-rule-version.ts:24-26,53` — biểu suất 110/100 cố định, `rate_table` chỉ là metadata
- `src/app/api/incentive-rules/route.ts:58-69` — API danh sách, `requireRole`, không whitelist `status`
- `supabase/migrations/20260904090700_incentive.sql:2-19` — DDL + unique index `version_no`
- `supabase/migrations/20260904091000_rls_ops.sql:61-67` — RLS ghi chỉ ROLE-RULE-ADMIN
- `supabase/migrations/20260904090900_rls_core.sql:29,57` — FR-601, mọi vai trò đọc được
- `supabase/migrations/20260904090500_business_day_lock.sql:56-75` — bảng này không mang trigger lock
- `src/lib/reports/queries/rpt-08-post-lock-adjustments.ts:16-18,28` — kỷ luật rơi về `id`, để đối chiếu
- `docs/generated/permissions-matrix.md:659-675` — PERM018, ROLE-RULE-ADMIN độc quyền
