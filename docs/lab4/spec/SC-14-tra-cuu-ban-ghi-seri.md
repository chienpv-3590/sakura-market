# SC-14 — Tra cứu bản ghi せり

| | |
|---|---|
| Mã thi công | SCR014_SeriList + SCR015_SeriDetail |
| Route | `/seri`, `/seri/[id]` |
| Loại | List-Detail |
| Actor chính | Bộ phận đối chiếu (ROLE-SETTLEMENT) và vận hành giao dịch (ROLE-TRADE) |
| FE- / FR- | FE-019 / FR-SERI-03 |
| Trạng thái | Đã dựng |

Một mã `SC-` ứng **hai SCR** (roster § 3.2) nên bảng field tách theo từng SCR con.

> **QĐ-1**: dữ liệu ở đây đến từ bảng `seri_result` riêng, không phải từ `transaction`.
> `transaction.type` bị `check (type = 'aitai')` ghim một literal — không có nhánh nào để lọc ra
> "giao dịch loại せり" (`20260904090300_transaction.sql:10`).

## 1. Mục đích

Tìm lại bản ghi せり theo mã lô hàng, ngày nghiệp vụ hoặc tên người thắng, xem lại đủ 5 trường đã
nhập, và **sửa kèm lý do bắt buộc** với lịch sử before/after xem được (FR-SERI-03). Đây là màn bộ
phận đối chiếu dùng khi số liệu せり lệch với sổ tay tại sàn.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc — cả hai trang gọi `requireUser()`, **không** `requireRole()`
  (`seri/page.tsx:24`, `seri/[id]/page.tsx:22`).
- Vai trò được vào: **cả 7 vai trò**, đều thấy đủ dữ liệu (FR-601).
- Mã lỗi khi thiếu quyền: không có 404 theo vai ở màn này. Chặn theo vai nằm ở **hành động sửa**:
  `PATCH /api/seri-results/[id]` trả **404** cho 5 vai không thuộc allowlist
  (`seri-results/[id]/route.ts:137`).
- Tiền đề dữ liệu: detail cần `seri_result` tồn tại, không có → `notFound()` → **404**
  (`[id]/page.tsx:29`).

## 3. Bảng field

### 3.1 SCR014_SeriList — `/seri`

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Lọc mã lô hàng | Mã lô hàng | ロット番号 | input text | Không | query `?lotCode` → `lot.lot_code` | `type="text"`, không `required`, không pattern (`page.tsx:69-74`) | **Khớp chính xác**, không phải chứa: tra `lot` bằng `.eq("lot_code", ...)`, không tìm thấy thì trả `[]` (`seri-queries.ts:75-84`) | Không có thông báo — ra danh sách rỗng |
| 2 | Lọc ngày nghiệp vụ | Ngày nghiệp vụ | 業務日 | input date | Không | query `?businessDate` → `seri_result.business_date` | `type="date"` native (`page.tsx:79-84`) | **chưa có — đề xuất**: truyền thẳng vào `.eq()` không validate định dạng (`seri-queries.ts:72-74`); giá trị rác làm PostgREST lỗi → `searchSeriResults` throw → 500 | **chưa có — đề xuất**: hiện là trang lỗi 500 |
| 3 | Lọc người thắng | Người thắng | 落札者 | input text | Không | query `?winnerName` → `participant.name` | `type="text"` (`page.tsx:86-92`) | **Chứa, không phân biệt hoa thường**: `ilike '%...%'` rồi lấy tập id (`seri-queries.ts:85-94`). Không escape `%` và `_` nên người dùng nhập `%` sẽ khớp tất cả | Không có thông báo — danh sách rỗng nếu không ai khớp |
| 4 | Lô hàng | Lô hàng | ロット | text | — | dẫn xuất `lot.lot_code` join theo `lot_id`, fallback uuid (`page.tsx:37-40,119`) | Chỉ đọc | — | — |
| 5 | Người thắng | Người thắng | 落札者 | text | — | dẫn xuất `participant.name` join theo `winner_participant_id` (`page.tsx:41-44`) | Chỉ đọc | — | — |
| 6 | Số lượng | Số lượng | 数量 | numeric(12,2) | — | `seri_result.qty` | Chỉ đọc, canh phải mono | — | — |
| 7 | Đơn giá | Đơn giá | 単価 | integer | — | `seri_result.unit_price`, format `toLocaleString()` (`page.tsx:122`) | Chỉ đọc | — | — |
| 8 | Thời điểm quyết định | Thời điểm quyết định | 決定時刻 | timestamptz | — | `seri_result.decided_at`, format theo giờ trình duyệt (`page.tsx:123`) | Chỉ đọc | — | — |
| 9 | Thao tác | Thao tác | 操作 | link | — | chỉ UI — link "Xem chi tiết" tới `/seri/[id]` (`page.tsx:124-128`) | Chỉ đọc, mọi vai trò đều thấy | — | — |

`business_date` **không có cột nào trên bảng** dù là tiêu chí lọc — người dùng lọc theo ngày mà không
thấy ngày trong kết quả. Danh sách giới hạn **100 dòng**, sắp `created_at` giảm dần, **không phân
trang** (`seri-queries.ts:70`). Cả hai: **chưa có — đề xuất**.

### 3.2 SCR015_SeriDetail — `/seri/[id]`

Ba mục: bản ghi chỉ đọc (`SeriRecordFields`) · form sửa (`SeriEntryForm mode="edit"`) · lịch sử sửa
(`SeriEditHistory`). Mục chỉ đọc tồn tại để vai không có quyền sửa vẫn thấy bản ghi
(`seri-record-fields.tsx:3-9`).

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Lô hàng | Lô hàng | ロット | text | — | `lot.lot_code` + `lot.item` | **Chỉ đọc, không sửa được** — form edit không render select lô hàng (`seri-entry-form.tsx:127`) | Không có trong `parsePatchBody` → mọi `lotId` client gửi đều bị bỏ | — |
| 2 | Người thắng | Người thắng | 落札者 | select (uuid) | Có | `seri_result.winner_participant_id` | Select có sửa được trên form, danh sách không lọc hiệu lực (`[id]/page.tsx:34,77`) | **KHÔNG ĐƯỢC ĐỌC.** Client gửi `winnerParticipantId` (`seri-entry-form.tsx:103`) nhưng `parsePatchBody` chỉ nhận `qty`, `unitPrice`, `decidedAt`, `confirmedBy`, `reason` (`[id]/route.ts:17-43`) → **đổi người thắng lưu im lặng không có tác dụng**, API trả 200 và form báo thành công | **Lệch client/server thật.** Không có thông báo nào. Đề xuất cho LAB-5: task riêng — bổ sung `winner_participant_id` vào `parsePatchBody` hoặc bỏ select khỏi form edit |
| 3 | Số lượng | Số lượng | 数量 | number | Có | `seri_result.qty` | `required`, `min=0.01`, `step=0.01` (`seri-form-fields.tsx:70-80`) | Optional trong PATCH; nếu có thì `typeof number` và finite và `> 0` (`[id]/route.ts:24-27`) → 422. Bằng giá trị cũ thì bị loại khỏi `update` (`:74-78`) | `seri.edit.error.invalidRequest` |
| 4 | Đơn giá | Đơn giá (JPY) | 単価 (JPY) | number | Có | `seri_result.unit_price` | `required`, `min=1`, `step=1` (`seri-form-fields.tsx:86-96`) | Optional; nếu có thì `Number.isInteger` và `> 0` (`[id]/route.ts:28-31`) → 422 | `seri.edit.error.invalidRequest` |
| 5 | Thời điểm quyết định | Thời điểm quyết định | 決定時刻 | datetime-local | Có | `seri_result.decided_at` | `required` (`seri-form-fields.tsx:102-110`) | Optional; parse `new Date`, `NaN` → 422 (`[id]/route.ts:32-37`). Không chặn tương lai | `seri.edit.error.invalidRequest` |
| 6 | Người xác nhận | Người xác nhận | 確認者 | select (uuid) | Có | `seri_result.confirmed_by` → `app_user.id` | Option = `app_user` có `is_active=true` (`[id]/page.tsx:35`) | Optional; string non-empty sau trim (`[id]/route.ts:38-41`) → 422; FK `23503` → 422 (`:102`) | `seri.edit.error.invalidRequest` |
| 7 | Lý do chỉnh sửa | Lý do chỉnh sửa | 修正理由 | input text | **Có** | `audit_log.reason` (không lưu vào `seri_result`) | `required`; nút Lưu disable khi `reason.trim()` rỗng (`seri-entry-form.tsx:167-176,186`) | **Bắt buộc tuyệt đối**: trim rỗng → `parsePatchBody` trả `null` → 422, không ghi gì (`[id]/route.ts:20-22`) | "Bạn phải nhập lý do trước khi lưu thay đổi." |
| 8 | Lịch sử chỉnh sửa | Lịch sử chỉnh sửa | 変更履歴 | bảng audit | — | `audit_log` lọc `entity='seri_result'` + `entity_id`, mới nhất trước (`seri-queries.ts:28-43`) | Chỉ đọc; before/after render qua `AuditDiff` với `SERI_FIELD_LABELS` (`audit-field-maps.ts:40-48`) | `before`/`after` dùng tên cột snake_case đúng như DB (`[id]/route.ts:53-56`) | Rỗng → `seri.detail.historyEmpty` |

`SERI_FIELD_LABELS` **không có key cho `confirmed_by`** (`audit-field-maps.ts:40-46`) → sửa người xác
nhận thì dòng diff hiện tên cột thô thay vì nhãn. **chưa có — đề xuất**: thêm key.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | list: `results.length === 0` | `EmptyState` — `seri.list.empty` "Chưa có kết quả せり nào." (`page.tsx:101-102`) | Lọc lại |
| đang tải | — | **chưa có — đề xuất**: không có `loading.tsx` nào trong `src/app` | — |
| lỗi tải | `searchSeriResults` throw | Error boundary mặc định của Next; **chưa có — đề xuất**: không có `error.tsx` nào trong cây | Không |
| không tìm thấy | detail: `seriResult === null` | `notFound()` → **404** (`[id]/page.tsx:29`) | Không |
| không có quyền sửa | `role` ngoài {ROLE-TRADE, ROLE-SETTLEMENT} | Vẫn thấy đủ bản ghi và lịch sử; form sửa thay bằng `HandoffCaption` chỉ đích hai vai đó (`[id]/page.tsx:87-92`) | Chỉ đọc |
| đang gửi | `submitting === true` | Mọi field `disabled`, nút `aria-busy` + "Đang lưu..." (`seri-entry-form.tsx:160,184-195`) | Không |
| lưu thành công | PATCH 200 | `seri.edit.success` — "Đã lưu thay đổi và ghi audit log." rồi `router.refresh()` (`seri-entry-form.tsx:115-118,183`) | Sửa tiếp |
| gửi lỗi | `!response.ok` | **Một message duy nhất** `seri.edit.error.invalidRequest` — "Bạn phải nhập lý do trước khi lưu thay đổi." cho **mọi** mã lỗi (`seri-entry-form.tsx:110-113`). Nghĩa là 423 ngày đã lock cũng hiện đúng câu "bạn phải nhập lý do" — **sai lệch nghiêm trọng**, đề xuất map theo mã như `reject-reasons.ts` đã làm cho `transaction` | Thử lại |
| **read-only vì ngày đã lock** | `business_day_lock` có dòng cho `seri_result.business_date` | **Mã 423.** `trg_block_after_lock` bắt UPDATE và raise `P0001` (`business_day_lock.sql:42-46,65-67`); route bắt `P0001` → `{error:'locked_business_date'}` status **423** (`[id]/route.ts:101`). **Form sửa vẫn hiện bình thường**, lock chỉ lộ ra sau khi bấm Lưu — và lộ bằng thông báo sai (dòng trên). Khác `transaction`: nhánh 423 ở đây **không** ghi audit `locked_write_attempt`, không gọi `respondLockedWrite()`. **chưa có — đề xuất**: đọc `business_day_lock` ở server và render read-only | Chỉ còn đường SC-20 / SC-21 (yêu cầu điều chỉnh) |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-TRADE | ✓ | Toàn bộ | Xem · Sửa · thấy link "Nhập kết quả せり" sang SC-13 (`page.tsx:46,53-59`) | 422 dữ liệu/thiếu lý do · 423 ngày đã lock · 404 · 500 |
| ROLE-SETTLEMENT | ✓ | Toàn bộ | Xem · **Sửa** (`[id]/page.tsx:39`) · **không** tạo mới, link SC-13 đổi thành `HandoffCaption` | 422 · 423 · 404 · 500 |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-DELIVERY, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | ✓ | Toàn bộ | Chỉ đọc | Gọi `PATCH` trực tiếp → **404** (`[id]/route.ts:137`) |

Allowlist 2 vai cho việc sửa là quyết định có chủ đích (Open Decision của functional-spec LAB-3),
khớp đúng policy `write_trade_settlement_update` (`20260904091100_lock_enforcement_fix.sql:38-41`) và
`permissions-matrix.md` PERM009. Quyền sửa **theo vai, không theo người tạo** — ai thuộc hai vai đó
cũng sửa được bản ghi của người khác.

**Lưu ý về đọc:** RLS `read_all_active_users` mở đọc `seri_result` cho mọi vai trò đang hoạt động
(`20260904090900_rls_core.sql:45`, FR-601). Chặn là ở **ghi** và ở **hành động**, không ở đọc.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Tìm kiếm | không (form `method="GET"`, server render lại) | — | — | 500 nếu `businessDate` rác |
| Mở chi tiết | `GET /api/seri-results/[id]` khi gọi qua API; trang tự query trực tiếp | — | — | 404 `not_found` · `requireUser()` cho mọi vai (`[id]/route.ts:119-124`) |
| Sửa bản ghi | `PATCH /api/seri-results/[id]` | `seri_result` UPDATE — chỉ những cột thật sự đổi (`[id]/route.ts:71-99`) | `action='update'`, `before`/`after` theo tên cột DB, **`reason` bắt buộc** (`:106-114`) | 200 · 400 `invalid_json` · 404 `not_found` · 404 sai vai · 422 `invalid_request` · **423** `locked_business_date` · 500 |
| Sửa mà không đổi gì | cùng endpoint | **Không ghi gì** | **Không ghi audit** — trả 200 với bản ghi cũ (`[id]/route.ts:95-97`) | 200 |
| Đọc danh sách qua API | `GET /api/seri-results` | — | — | `requireUser()` — mọi vai trò đọc được (`route.ts:121`) |

`writeAuditLog()` chạy **sau** khi UPDATE đã commit và không rollback được (QĐ-5,
`write-audit-log.ts:44-50`) — audit lỗi thì thay đổi vẫn đã ghi vào `seri_result` dù route trả 500,
và bản ghi mất dấu lý do sửa. Đúng điểm FR-SERI-03 quan tâm nhất.

## 7. Edge case

- **Đổi người thắng không có tác dụng** — client gửi, server bỏ, UI báo thành công. Xem mục 3.2
  field 2. Đây là lỗi lệch client/server, không phải hạn chế thiết kế.
- **Ngày lock giữa lúc đang mở form sửa** → bấm Lưu nhận 423 nhưng thông báo hiện "Bạn phải nhập lý
  do trước khi lưu thay đổi." Người dùng sẽ nhập lại lý do và thử mãi. Xem mục 4.
- **Hai người sửa cùng một bản ghi đồng thời** → **không có CAS, không có optimistic lock**:
  `[id]/route.ts:68` đọc `current` rồi `:99` UPDATE bằng `.eq("id", id)` trần. Ai ghi sau thắng, ghi
  đè im lặng. `before` trong audit của người sau là giá trị *người đó đã đọc*, không phải giá trị
  thực trước lúc ghi → lịch sử có thể đọc lệch. Đề xuất cho LAB-5: task riêng, thêm cột version hoặc
  CAS theo `updated_at`.
- **Sửa không đổi gì** → 200, không audit, không lịch sử. Người dùng thấy "Đã lưu thay đổi và ghi
  audit log." nhưng không có gì được ghi (`seri-entry-form.tsx:115`, `[id]/route.ts:95-97`).
- **Người thắng mất hiệu lực giữa phiên** → không ảnh hưởng gì, luồng せり không có cửa hiệu lực nào
  (xem SC-13 mục 3 field 2).
- **`?lotCode=` khớp chính xác** → nhập thiếu một ký tự là ra rỗng, không có gợi ý. Khác `winnerName`
  vốn dùng `ilike`.
- **`?winnerName=%`** → khớp mọi người tham gia vì `%` không được escape (`seri-queries.ts:89`).
- **Vượt 100 dòng** → dòng thứ 101 trở đi mất khỏi màn, không cảnh báo.
- **Lô có hai bản ghi せり** (do khoảng hở TOCTOU ở SC-13, không có `unique (lot_id)`) → cả hai đều
  hiện trên danh sách, lọc theo `lotCode` ra hai dòng. Màn này không có chỗ nào cảnh báo trùng.
- **Quyền bị thu hồi giữa phiên** → `is_active=false` → `redirect('/login?reason=inactive')` ngay
  request kế tiếp (`require-role.ts:47,58-64`).

## 8. Dẫn chứng

- `src/app/(app)/seri/page.tsx:24,30,46` — `requireUser`, `searchSeriResults`, `canCreate`
- `src/app/(app)/seri/page.tsx:37-44,66-100,101-134` — join tên, form lọc GET, bảng 6 cột
- `src/app/(app)/seri/[id]/page.tsx:22,29,34-39,87-92` — `requireUser`, `notFound`, `canEdit`,
  `HandoffCaption`
- `src/lib/seri/seri-queries.ts:28-43` — `loadSeriAuditHistory`
- `src/lib/seri/seri-queries.ts:66-99` — `searchSeriResults`: `lotCode` eq, `winnerName` ilike,
  limit 100
- `src/app/api/seri-results/[id]/route.ts:17-43` — `parsePatchBody`: **không có** `winnerParticipantId`
- `src/app/api/seri-results/[id]/route.ts:53-56,71-99` — audit dùng tên cột DB, chỉ ghi cột đổi
- `src/app/api/seri-results/[id]/route.ts:95-97,101-103,106-114,137` — no-op 200, 423 `P0001`,
  audit `update`, `requireRole` 2 vai
- `src/components/seri/seri-entry-form.tsx:98-118,167-176,186` — PATCH gửi `winnerParticipantId`,
  message lỗi gộp, lý do bắt buộc
- `src/components/seri/seri-record-fields.tsx:3-9,30-45` — lý do có mục chỉ đọc, 6 field
- `src/components/seri/seri-edit-history.tsx:16-45` — bảng lịch sử 4 cột
- `src/components/audit/audit-field-maps.ts:40-48` — `SERI_FIELD_LABELS` thiếu `confirmed_by`
- `supabase/migrations/20260904090300_transaction.sql:10,31-47` — cột chết `type`, DDL `seri_result`
- `supabase/migrations/20260904090500_business_day_lock.sql:42-46,65-67` — P0001 và trigger
  `before update or delete`
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:38-41` — policy update 2 vai
- `supabase/migrations/20260904090900_rls_core.sql:45` — đọc mở cho mọi vai trò đang hoạt động
- `docs/generated/permissions-matrix.md:391-420` — PERM009, khớp code
