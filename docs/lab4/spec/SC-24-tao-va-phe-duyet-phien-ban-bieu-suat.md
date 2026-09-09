# SC-24 — Tạo và phê duyệt phiên bản biểu suất

| | |
|---|---|
| Mã thi công | SCR023_RuleVersionNew + SCR024_RuleVersionDetail |
| Route | `/incentive/rules/new`, `/incentive/rules/[id]` |
| Loại | Form (SCR023) + Detail (SCR024) |
| Actor chính | Quản trị rule (ROLE-RULE-ADMIN) — maker và checker là hai người khác nhau |
| FE- / FR- | FE-031 / FR-201, FR-202, FR-203, FR-204, BR-003, DEC-001, SM-001, GOV-RULE-01 |
| Trạng thái | Đã dựng |

Một mã `SC-` ứng **hai SCR**. Mục 3, 4 và 6 tách theo từng SCR con.

## 1. Mục đích

Tạo một phiên bản biểu suất 完納奨励金 có hiệu lực từ một ngày tương lai, rồi để **một người
khác** phê duyệt cho nó thành `active`. Từ màn chi tiết cũng rollback được phiên bản đang hiệu
lực về một phiên bản trước đó. Hai chiều đều chịu maker-checker: **người duyệt phải khác người
tạo, tự duyệt là 403**.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc (`src/app/(app)/layout.tsx:11`)
- Vai trò được vào: chỉ **ROLE-RULE-ADMIN** cho cả hai route
  (`rules/new/page.tsx:10`, `rules/[id]/page.tsx:23`)
- Mã lỗi khi thiếu quyền: **404** (`require-role.ts:72-77`)
- Tiền đề dữ liệu SCR023: không cần
- Tiền đề dữ liệu SCR024: `id` phải tồn tại, không thì `notFound()` → **404**
  (`rules/[id]/page.tsx:28`)

## 3. Bảng field

### 3.1 SCR023_RuleVersionNew — `/incentive/rules/new`

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `effectiveFrom` | Ngày hiệu lực | 発効日 | date | Có | `incentive_rule_version.effective_from` NOT NULL (`20260904090700_incentive.sql:5`) | `trim().length > 0` mới bật nút; gợi ý "Phải là một ngày trong tương lai (sau hôm nay)."; **không** có `min` trên input (`rule-version-form.tsx:23,55-64`) | `isFutureBusinessDate()`: đúng `YYYY-MM-DD`, là ngày lịch thật, **và `value > todayJst()`** (strictly sau hôm nay) → sai thì **422 `INVALID_EFFECTIVE_DATE`** (`create-rule-version.ts:12-21,38-40`, `incentive-rules/route.ts:11`) | "Ngày hiệu lực phải ở tương lai." / 「発効日は未来の日付である必要があります。」 |
| 2 | `note` | Ghi chú (tùy chọn) | メモ(任意) | text | Không | `incentive_rule_version.rate_table` jsonb, khoá `note` (`create-rule-version.ts:53`) | không kiểm gì; rỗng → gửi `undefined` (`rule-version-form.tsx:35`) | `typeof === "string"` và `trim().length > 0` mới nhận, else `undefined` → lưu `note: null` (`incentive-rules/route.ts:24`) | không có |
| 3 | `version_no` | *không hiện* | `chưa có key JA` | integer — server sinh | Có | `incentive_rule_version.version_no` NOT NULL + unique index (`…incentive.sql:3,19`) | không có input | `max(version_no) + 1`; đua nhau → `23505` → **409 `VERSION_CONFLICT`** (`create-rule-version.ts:42-51,68`) | rơi về "Có lỗi xảy ra, vui lòng thử lại." (`rule-version-form.tsx:9`) |
| 4 | `status` | *không hiện* | `chưa có key JA` | enum — server gán | Có | DEFAULT `'pending_approval'` CHECK in (pending_approval/active/rolled_back) (`…incentive.sql:6-7`) | không có input | ghi cứng `'pending_approval'` (`create-rule-version.ts:57`) | — |
| 5 | `rate_table` (biểu suất) | *không hiện — không cấu hình được* | `chưa có key JA` | jsonb | Không (nullable) | server ghi `{numerator:110, denominator:100, note}` (`create-rule-version.ts:53`) | **không có input** — 110/100 cố định bởi BR-INC-01, không lộ ra UI (`rule-version-form.tsx:12-14`) | không nhận từ client; `calculate-incentive.ts` **không đọc** `rate_table`, chỉ dùng hằng 110/100 trong code (`create-rule-version.ts:24-26`, `calculate-incentive.ts:15`) | — |
| 6 | `created_by` | *không hiện* | `chưa có key JA` | uuid — server gán | Không (nullable) | `incentive_rule_version.created_by` FK `app_user(id)` (`…incentive.sql:9`) | không có input | `user.id` từ `requireRole` (`incentive-rules/route.ts:30,46`) | — |

### 3.2 SCR024_RuleVersionDetail — `/incentive/rules/[id]`

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `version_no` | Phiên bản | バージョン | integer — chỉ đọc | — | `incentive_rule_version.version_no` | không có input | không có input | — |
| 2 | `effective_from` | Ngày hiệu lực | 発効日 | date — chỉ đọc | — | `incentive_rule_version.effective_from` | không có input | không có input | — |
| 3 | Trạng thái | Chờ duyệt · Đang hiệu lực · Đã rollback · Đã bị thay thế · Đã duyệt, chờ tới ngày hiệu lực | 承認待ち · 有効 · ロールバック済み · 置き換え済み · 承認済み・発効日待ち | enum dẫn xuất — chỉ đọc | — | `status` (3 giá trị DB) + nhãn tính read-time (`rule-version-display-status.ts:19-41`, `rules/[id]/page.tsx:38`) | không có input | không có input | — |
| 4 | Người tạo | Người tạo | 作成者 | text — chỉ đọc | — | `app_user.display_name` qua `created_by`; **rơi về `email`**, rồi `—` (`rule-version-queries.ts:18`, `rule-version-fields.tsx:39`) | không có input | không có input | — |
| 5 | Người duyệt | Người duyệt | 承認者 | text — chỉ đọc | — | `app_user.display_name` qua `approved_by`; cùng chuỗi rơi (`rule-version-queries.ts:19`, `rule-version-fields.tsx:40`) | không có input | không có input | — |
| 6 | Nút Phê duyệt | Phê duyệt | 承認 | hành động | — | ghi `status='active'`, `approved_by` | chỉ render khi `canApprove = status==='pending_approval' && !isCreator` (`rules/[id]/page.tsx:31`, `rule-version-detail-actions.tsx:52-56`) | **`created_by === actorId` → `SELF_APPROVAL` → 403**; `status !== 'pending_approval'` → **409 `ALREADY_DECIDED`**; không tìm thấy → **404** (`approve-rule-version.ts:29-33`, `incentive-rules/[id]/approve/route.ts:9-13`) | "Bạn không thể phê duyệt phiên bản do chính mình tạo." · "Phiên bản này đã được xử lý trước đó." |
| 7 | `targetVersionId` | Khôi phục về phiên bản | 復元先バージョン | select | Có khi rollback | `incentive_rule_version.id` của phiên bản đích | danh sách ứng viên lọc server-side: `id !== hiện tại` và `status ∈ {active, rolled_back}` (`rules/[id]/page.tsx:35-37`); `!targetVersionId` thì không gửi (`rule-version-detail-actions.tsx:79`) | `typeof === "string"` và không rỗng → else **422 `invalid_request`**; `activeVersionId === targetVersionId` → **422 `INVALID_TARGET`**; đích `status='pending_approval'` → **422 `INVALID_TARGET`** (`rollback/route.ts:20-25,42`, `rollback-rule-version.ts:31-33,58`) | "Phiên bản đích không hợp lệ để rollback." |
| 8 | Nút Rollback | Rollback | ロールバック | hành động | — | demote hiện tại → `rolled_back`, promote đích → `active` | chỉ render khi `canRollback = status==='active' && !isCreator` (`rules/[id]/page.tsx:32`) | **`created_by` của phiên bản ĐANG ACTIVE `=== actorId` → `SELF_ROLLBACK` → 403**; `status !== 'active'` → **409 `NOT_ACTIVE`** (`rollback-rule-version.ts:44-47`, `rollback/route.ts:9-14`) | "Bạn không thể rollback phiên bản do chính mình tạo." · "Phiên bản này hiện không ở trạng thái đang hiệu lực." |

## 4. Trạng thái màn

### 4.1 SCR023_RuleVersionNew

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng (mặc định) | vừa mở trang | form trống, nút `disabled` | Nhập ngày hiệu lực |
| đang tải | Server Component đang render | streaming `PageFrame` | không |
| lỗi tải | `getDictionary` lỗi | error boundary Next.js | Tải lại |
| không có quyền | vai trò ≠ ROLE-RULE-ADMIN | trang 404 | không |
| đang gửi | `pending === true` | nút `disabled` + `aria-busy` | không |
| gửi lỗi | 422 hoặc 409 | `<p role="alert">` theo khoá lỗi | Sửa ngày, gửi lại |
| gửi xong | 201 | điều hướng về `/incentive/rules` (`rule-version-form.tsx:43`) | — |
| read-only vì ngày đã lock (423) | **không áp dụng** — `incentive_rule_version` ngoài 4 bảng mang `trg_block_after_lock` (`business_day_lock.sql:56-75`) | — | — |

### 4.2 SCR024_RuleVersionDetail

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| không tìm thấy | `loadRuleVersion` trả null | trang **404** (`rules/[id]/page.tsx:28`) | không |
| đang tải | Server Component đang render | streaming `PageFrame` | không |
| lỗi tải | `loadRuleVersion` throw (`rule-version-queries.ts:51-53`) | error boundary Next.js | Tải lại |
| không có quyền | vai trò ≠ ROLE-RULE-ADMIN | trang 404 | không |
| chờ duyệt, được duyệt | `pending_approval` và người xem ≠ người tạo | card "Thao tác" với nút Phê duyệt | Phê duyệt |
| **chờ duyệt, tự tạo** | `pending_approval` và người xem = người tạo | card "Thao tác" chỉ chứa ghi chú "Bạn không thể phê duyệt phiên bản do chính mình tạo." | không |
| đang hiệu lực, rollback được | `active` và người xem ≠ người tạo | nút Rollback + select phiên bản đích | Rollback |
| **đang hiệu lực, tự tạo** | `active` và người xem = người tạo | ghi chú "Bạn không thể rollback phiên bản do chính mình tạo." | không |
| không còn gì để làm | `rolled_back`, hoặc `active` bị `superseded` | **không render card Thao tác** (`rules/[id]/page.tsx:44,73`) | không |
| đang gửi | `pending === true` | nút `disabled` + `aria-busy` | không |
| gửi lỗi | 403/404/409/422 | `<p role="alert">` theo khoá lỗi | Tải lại |
| read-only vì ngày đã lock (423) | **không áp dụng** — cùng lý do § 4.1 | — | — |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-RULE-ADMIN **và** `created_by !== user.id` | ✓ | toàn bộ | Tạo · Phê duyệt · Rollback | 422 `INVALID_EFFECTIVE_DATE`/`INVALID_TARGET` · 409 `VERSION_CONFLICT`/`ALREADY_DECIDED`/`NOT_ACTIVE` · 404 `NOT_FOUND` |
| ROLE-RULE-ADMIN **và** `created_by === user.id` | ✓ | toàn bộ, nhưng nút Phê duyệt/Rollback bị ẩn | Tạo phiên bản mới. **Tự phê duyệt → 403 `SELF_APPROVAL`; tự rollback → 403 `SELF_ROLLBACK`** kể cả khi gọi API trực tiếp | **403** |
| ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-SYS-ADMIN | ✗ | không | không | trang **404**; `POST /api/incentive-rules`, `…/:id/approve`, `…/:id/rollback` đều **404** |

**Maker-checker (GOV-RULE-01 / BR-003 / DEC-001):** điều kiện không phải "vai trò nào", mà là
**"người duyệt phải khác người tạo"** — hai tài khoản demo tách đôi (ruleadmin / rulechecker) là
cố ý. Hai tầng: FE tính `isCreator` rồi ẩn nút (`rules/[id]/page.tsx:30-32`), server so
`created_by` với `actorId` rồi trả 403 (`approve-rule-version.ts:30-32`,
`rollback-rule-version.ts:44-46`). **403 mới là biên giới thật**; ẩn nút chỉ là gợi ý.
Riêng rollback: kiểm `created_by` của **phiên bản đang bị hạ cấp**, không phải của phiên bản
đích — spec gốc không nói rõ, code đã chọn và ghi lý do (`rollback-rule-version.ts:10-25`).

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được** `incentive_rule_version`
(FR-601, `rls_core.sql:29,57`). Chặn ở **ghi** (`rls_ops.sql:61-67`, chỉ ROLE-RULE-ADMIN) và ở
**vào trang**. Bản thân maker-checker **không** được cài ở DB — chỉ ở tầng app
(`20260904090700_incentive.sql:14-17`, `rls_ops.sql:61-62`).

## 6. Hành động và hậu quả

### 6.1 SCR023_RuleVersionNew

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Tạo phiên bản nháp | `POST /api/incentive-rules` `{effectiveFrom, note?}` | `incentive_rule_version` INSERT, `status='pending_approval'` | **không có audit** — `createRuleVersion` không gọi `writeAuditLog` (`create-rule-version.ts:34-73`). Lệch với luồng duyệt/rollback | 400 `invalid_json` · 422 `invalid_request`/`INVALID_EFFECTIVE_DATE` · 409 `VERSION_CONFLICT` · 500 |

### 6.2 SCR024_RuleVersionDetail

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Phê duyệt | `POST /api/incentive-rules/[id]/approve` (không body) | `incentive_rule_version` CAS `pending_approval → active` + `approved_by` (`approve-rule-version.ts:35-45`) | `approve_rule_version`, `before {status:pending_approval}`, `after {status:active, approved_by}` | **403 `SELF_APPROVAL`** · 404 `NOT_FOUND` · 409 `ALREADY_DECIDED` · 500 |
| Rollback | `POST /api/incentive-rules/[id]/rollback` `{targetVersionId}` | hai UPDATE: demote hiện tại `active → rolled_back` (CAS), promote đích `→ active`; promote lỗi → bù ngược demote (`rollback-rule-version.ts:60-82`) | `rollback_rule_version`, `before {active: <cũ>}`, `after {active: <mới>}` | 400 `invalid_json` · 422 `invalid_request`/`INVALID_TARGET` · **403 `SELF_ROLLBACK`** · 404 `NOT_FOUND` · 409 `NOT_ACTIVE` · 500 |

`writeAuditLog()` chạy **sau** khi nghiệp vụ commit và không rollback được (QĐ-5,
`write-audit-log.ts:44-50`).

## 7. Edge case

- **Trần GOV-RULE-01 (≤4 lần đổi rule/năm) KHÔNG được kiểm**: `createRuleVersion` không đếm số
  phiên bản tạo trong năm, không chặn lần thứ 5 (`docs/pham-vi-va-phan-mock.md:85`,
  `create-rule-version.ts:34-73`). Yêu cầu này chỉ tồn tại trên giấy. `chưa có — đề xuất`.
- **Tạo phiên bản không ghi audit**, còn duyệt và rollback thì có. Dấu vết "ai tạo" chỉ nằm ở
  cột `created_by`, không có dòng audit_log nào. `chưa có — đề xuất`.
- **Client không có `min` trên input ngày**: người dùng chọn được ngày quá khứ rồi mới bị server
  trả 422 (`rule-version-form.tsx:56-62`). `chưa có — đề xuất`: thêm `min={todayJst()+1}`.
- **`VERSION_CONFLICT` hiện thông báo chung**: 409 map về `incentive.error.generic`, người dùng
  không biết là do đua nhau và nên thử lại (`rule-version-form.tsx:9`). `chưa có — đề xuất`:
  thêm khoá i18n riêng.
- **Hai người duyệt cùng lúc**: CAS `.eq("status","pending_approval")` là điểm serialize; người
  thứ hai nhận `ALREADY_DECIDED` → **409** (`approve-rule-version.ts:45`).
- **Rollback không được promote một bản `pending_approval`** — nếu cho, một bản chưa ai duyệt
  sẽ thành `active` mà bỏ qua hẳn cổng maker-checker; chặn bằng **422 `INVALID_TARGET`**
  (`rollback-rule-version.ts:22-25,58`).
- **Rollback không có transaction**: demote xong mà promote lỗi thì bù ngược bằng UPDATE thứ ba;
  nếu chính UPDATE bù đó lỗi thì hệ thống ở trạng thái không có phiên bản nào `active` cho tới
  khi có người sửa tay (`rollback-rule-version.ts:78-82`). Chấp nhận có chủ đích (QĐ-5).
- **Duyệt xong nhưng chưa tới ngày hiệu lực**: `status='active'` nhưng nhãn hiển thị là
  `scheduled` và ALG-001 vẫn chưa chọn nó (`rule-version-display-status.ts:33-34`,
  `resolve-rule-version.ts:23`). Số thưởng không đổi ngay khi bấm Phê duyệt.
- **Đổi biểu suất thật thì phải sửa code**: 110/100 là hằng trong `calculate-incentive.ts:15`,
  `rate_table` chỉ là metadata. Tạo phiên bản mới **không** làm số thưởng thay đổi — chỉ đổi
  `rule_version_id` được đóng dấu lên dòng kết quả. Divergence so với ý nghĩa "phiên bản biểu
  suất"; ảnh hưởng trực tiếp tới SC-22.
- **`display_name` rỗng rơi về `email`** (`rule-version-queries.ts:18-19`) — lệch kỷ luật của
  RPT-08 (rơi về `id`). Xem SC-23 § 7.
- **Quyền bị thu hồi giữa phiên**: `is_active=false` → 307 `/login?reason=inactive`; đổi vai trò → 404.

## 8. Dẫn chứng

- `src/app/(app)/incentive/rules/new/page.tsx:8,10` — SCR023, `requireRole(["ROLE-RULE-ADMIN"])`
- `src/app/(app)/incentive/rules/[id]/page.tsx:23,28,30-32,34-37,38,42-44,70-84` — `requireRole`, 404, `isCreator`/`canApprove`/`canRollback`, ứng viên rollback, nhãn tính, card Thao tác
- `src/components/incentive/rule-version-form.tsx:9,12-14,23,32-43,55-64` — map lỗi, biểu suất không lộ, gate client, điều hướng sau 201
- `src/components/incentive/rule-version-detail-actions.tsx:7-17,40-44,52-56,63,79-87` — map lỗi, ghi chú maker-checker, ẩn nút, gọi API
- `src/components/incentive/rule-version-fields.tsx:4-7,27-40` — 5 field chỉ đọc
- `src/lib/incentive/create-rule-version.ts:12-21,24-33,38-40,42-51,53-60,68` — ngày tương lai, `version_no`, `rate_table`, `23505` → 409, không audit
- `src/lib/incentive/approve-rule-version.ts:10-16,29-33,35-45,47-54` — GOV-RULE-01, 403/409/404, CAS, audit
- `src/lib/incentive/rollback-rule-version.ts:10-25,31-33,44-47,58,60-82,84-91` — quyết định maker-checker cho rollback, 422/403/409, bù trừ, audit
- `src/app/api/incentive-rules/route.ts:10-13,24,29-30,46,51` — bảng mã lỗi, parse `note`, `requireRole`, 201
- `src/app/api/incentive-rules/[id]/approve/route.ts:9-13,15-16,21` — **403 `SELF_APPROVAL`**, chú thích tiền lệ F008, `requireRole`
- `src/app/api/incentive-rules/[id]/rollback/route.ts:9-14,20-25,32,42` — **403 `SELF_ROLLBACK`**, 422 `INVALID_TARGET`
- `supabase/migrations/20260904090700_incentive.sql:2-19` — DDL, unique `version_no`, chú thích "maker-checker enforced in the app layer, not a DB constraint"
- `supabase/migrations/20260904091000_rls_ops.sql:61-67` — RLS ghi chỉ ROLE-RULE-ADMIN
- `supabase/migrations/20260904090900_rls_core.sql:29,57` — FR-601, mọi vai trò đọc được
- `supabase/migrations/20260904090500_business_day_lock.sql:56-75` — bảng này ngoài 4 bảng có trigger lock
- `docs/pham-vi-va-phan-mock.md:85` — trần 4 lần đổi rule/năm không được kiểm
- `docs/generated/permissions-matrix.md:697-747,769-820` — PERM019/PERM020 khai đúng hai cổng 403
