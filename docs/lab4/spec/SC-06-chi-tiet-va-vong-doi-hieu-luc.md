# SC-06 — Chi tiết và vòng đời hiệu lực người tham gia

| | |
|---|---|
| Mã thi công | SCR005_ParticipantDetail (composite — 4 khối: REG001_Profile · REG002_Edit · REG003_Transition · REG004_History) |
| Route | `/participants/[id]` |
| Loại | Detail |
| Actor chính | Nhân viên vận hành chợ (đọc) · ROLE-SYS-ADMIN (sửa + chuyển trạng thái) |
| FE- / FR- | FE-005, FE-006 / FR-PARTY-01, SM-001 (FIG-010) |
| Trạng thái | Đã dựng |

## 1. Mục đích

Một hồ sơ người tham gia, cộng toàn bộ vòng đời hiệu lực của họ. Bốn khối trong cùng một trang:
xem hồ sơ, sửa hồ sơ, chuyển trạng thái theo máy trạng thái FIG-010, và đọc lại lịch sử chuyển
trạng thái. Hai khối ghi thuộc ROLE-SYS-ADMIN; vai trò khác vẫn thấy card và dòng nhắc ai làm.

## 2. Điều kiện vào màn

- **Đăng nhập**: bắt buộc — `requireUser()` kế thừa từ `(app)/layout.tsx:11`
- **Vai trò được vào**: **cả 7 vai trò**. Trang chỉ gọi `getCurrentUser()` để tính `canWrite` (`src/app/(app)/participants/[id]/page.tsx:27,68`)
- **Mã lỗi khi thiếu quyền**: không có nhánh 404 theo vai trò ở màn này. **404** chỉ khi `id` không tồn tại, hoặc khi `category`/`status` trong DB rơi ra ngoài tập hợp lệ (`page.tsx:41-43`). Riêng hai API ghi thì `requireRole(["ROLE-SYS-ADMIN"])` → **404** (`notFound()`, không phải 403 — không lộ sự tồn tại tài nguyên) (`api/participants/[id]/route.ts:23`, `api/participants/[id]/transition/route.ts:23`)
- **Tiền đề dữ liệu**: hàng `participant` tồn tại. **Không có `GET /api/participants/:id`** — trang query Supabase trực tiếp (`page.tsx:31-35`; xác nhận ở `docs/generated/permissions-matrix.md:916,923`)

## 3. Bảng field

### 3.1 REG001_Profile — chỉ đọc, mọi vai trò

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `category` | Phân loại | 区分 | text — 1 trong 4 | — | `participant.category`, `check (category in ('卸売業者','仲卸','売買参加者','買出人'))` (`supabase/migrations/20260904090100_participant.sql:4`) | Không áp dụng (chỉ hiển thị) | CHECK ở DB + `isParticipantCategory` khi render (`page.tsx:41`) | Rơi ngoài tập → `notFound()` |
| 2 | `license_type` | Căn cứ tham gia | 参加根拠 | text — 1 trong 3 | — | `participant.license_type` — **`text not null`, KHÔNG CHECK** (`participant.sql:6`) | Không áp dụng | **Chỉ ở tầng app**: `isValidCategoryLicensePair()` (`src/lib/participants/category-rules.ts:32-34`) | Nhãn `licenseType.*` (`vi/participants.json:57-59`) |
| 3 | `status` | Trạng thái hiệu lực | 有効状態 | badge — 1 trong 4 | — | `participant.status`, `default 'có hiệu lực'` + CHECK 4 giá trị (`participant.sql:7-8`) | Không áp dụng | CHECK ở DB + `isParticipantStatus` (`page.tsx:41`) | Rơi ngoài tập → `notFound()` |
| 4 | `valid_from` | Hiệu lực từ | 有効開始日 | date | — | `participant.valid_from` — `date not null` (`participant.sql:9`) | Không áp dụng | — | — |
| 5 | `valid_to` | Hiệu lực đến | 有効終了日 | date, nullable | — | `participant.valid_to` — `date` (`participant.sql:10`) | Không áp dụng | — | Null → "Không giới hạn" / 無期限 (`vi/participants.json:21`) |

`name` hiển thị làm tiêu đề trang, không nằm trong khối field (`page.tsx:73`).

### 3.2 REG002_Edit — form sửa, chỉ ROLE-SYS-ADMIN

`PATCH /api/participants/[id]`. Client dùng `ParticipantForm mode="edit"`.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `category` | Phân loại | 区分 | read-only, khoá | — | `participant.category` | **Không cho sửa** — render dạng text kèm hint "không thể đổi sau khi tạo" (`participant-form.tsx:97-101`; `vi/participants.json:40`) | Request **mang key `category` là bị từ chối luôn**, kể cả khi giá trị không đổi → **422** `category_immutable` (`api/participants/[id]/route.ts:34-36`) | Client chỉ hiện một câu chung, xem ghi chú dưới bảng |
| 2 | `license_type` | Căn cứ tham gia | 参加根拠 | read-only, **suy từ `category`** | Có (gửi lên) | `participant.license_type` | **Không cho nhập tự do** — tính bằng `requiredLicenseType(category)` (`participant-form.tsx:40,107-110`), hint "Được xác định tự động theo phân loại đã chọn." | `isValidCategoryLicensePair(before.category, input.license_type)` → **422** `category_license_mismatch` (`[id]/route.ts:65-68`) | như trên |
| 3 | `name` | Tên | 名称 | text | Có | `participant.name` — `text not null` | `required` trên input (`participant-form.tsx:112-119`); gửi `name.trim()` (`:52-58`) | Chỉ patch khi `typeof string && trim().length > 0`; **chuỗi rỗng bị bỏ qua im lặng, không 422** (`[id]/route.ts:60-64`) — xem mục 7 | như trên |
| 4 | `valid_from` | Hiệu lực từ | 有効開始日 | date | Có | `participant.valid_from` | `type="date" required` (`participant-form.tsx:122-130`) | Regex `^\d{4}-\d{2}-\d{2}$` → **422** `invalid_valid_from` (`[id]/route.ts:10,73-77`) | như trên |
| 5 | `valid_to` | Hiệu lực đến | 有効終了日 | date, nullable | Không | `participant.valid_to` | `type="date"`, không `required`; rỗng gửi `null` (`participant-form.tsx:132-142,52-58`) | `null` hợp lệ; kiểu khác string → **422** `invalid_valid_to`; string phải khớp regex (`[id]/route.ts:81-92`). **Không có kiểm `valid_to >= valid_from` ở bất kỳ tầng nào — chưa có, đề xuất** | như trên |
| 6 | `reason` | Lý do cập nhật | 更新理由 | text | Có | Không lưu vào `participant`; đi vào `audit_log.reason` (`[id]/route.ts:108-116`) | `required` (`participant-form.tsx:144-154`), placeholder "Nhập lý do thay đổi (bắt buộc)" | `trim().length === 0` → **422** `reason_required` (`[id]/route.ts:37-40`) | như trên |

Không field nào được patch → **422** `no_fields_to_update` (`[id]/route.ts:94-96`).
**Thông báo lỗi client:** mọi response không OK đều rơi về **một câu duy nhất**
`participants.form.error.generic` — "Có lỗi xảy ra, vui lòng kiểm tra lại thông tin." /
"エラーが発生しました。入力内容をご確認ください。" (`participant-form.tsx:67-71`;
`vi/participants.json:52`, `ja/participants.json:52`). Sáu mã 422 khác nhau nhìn giống nhau trên UI.

### 3.3 REG003_Transition — chuyển trạng thái FIG-010, chỉ ROLE-SYS-ADMIN

`POST /api/participants/[id]/transition`.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `event` | (nhãn theo từng nút, key `event.*`) | như VI, key `event.*` | chọn 1 trong các nút khả dụng | Có | 5 cạnh trong `TRANSITIONS` (`src/lib/participants/state-machine.ts:35-41`) | Chỉ render đúng các nút `allowedEvents(currentStatus)` trả về — **không** render cả 5 rồi disable (`transition-actions.tsx:26,79-92`) | `isTransitionEvent(event)` → **422** `invalid_event` (`transition/route.ts:36-38`); rồi `resolveTarget(from, event)` trả null → **422** `illegal_transition` kèm `{from, event}` (`:58-61`) | `participants.detail.transitionError` — "Chuyển trạng thái thất bại, vui lòng thử lại." (`vi/participants.json:35`) |
| 2 | `reason` | Lý do chuyển trạng thái | 変更理由 | textarea (2 dòng) | Có | `participant_status_history.reason` — `text not null` (`participant.sql:23`) và `audit_log.reason` | `reason.trim().length === 0` → chặn tại client, hiện `participants.detail.transitionReasonRequired` (`transition-actions.tsx:45-48`) | `trim().length === 0` → **422** `reason_required` (`transition/route.ts:39-41`) | "Vui lòng nhập lý do trước khi xác nhận." (`vi/participants.json:36`) / 確定する前に理由を入力してください。 |

**Năm cạnh hợp lệ** (`state-machine.ts:35-41`) — mọi cặp ngoài bảng này bị từ chối:

| # | Từ | Event | Đến | Nhãn VI (`vi/participants.json:64-68`) |
|---|---|---|---|---|
| 1 | có hiệu lực | `vi_pham` | tạm ngừng | Vi phạm → Tạm ngừng |
| 2 | tạm ngừng | `go` | có hiệu lực | Gỡ tạm ngừng → Có hiệu lực |
| 3 | có hiệu lực | `het_han` | mất hiệu lực | Hết hạn → Mất hiệu lực |
| 4 | mất hiệu lực | `nop_don` | xét lại | Nộp đơn xét lại → Xét lại |
| 5 | xét lại | `chap_thuan` | có hiệu lực | Chấp thuận → Có hiệu lực |

### 3.4 REG004_History — chỉ đọc, mọi vai trò

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `from_status` | Từ | 変更前 | badge, nullable | — | `participant_status_history.from_status` — `text` nullable (`participant.sql:21`) | Không áp dụng | Không áp dụng — bảng chỉ ghi thêm, không có route/policy update hay delete | Null hiển thị `—` (`transition-history-table.tsx:40-47`) |
| 2 | `to_status` | Đến | 変更後 | badge | — | `participant_status_history.to_status` — `text not null` (`participant.sql:22`) | Không áp dụng | Không áp dụng | — |
| 3 | `reason` | Lý do | 理由 | text | — | `participant_status_history.reason` — `text not null` (`participant.sql:23`) | Không áp dụng | Không áp dụng | — |
| 4 | `changed_by` | Người thực hiện | 実施者 | text (tên hiển thị) | — | `participant_status_history.changed_by` → `app_user.display_name`, **fallback sang `app_user.email`** khi `display_name` null (`page.tsx:59-65`) | Không áp dụng | Không áp dụng | Null hiển thị `—` |
| 5 | `changed_at` | Thời điểm | 日時 | timestamptz | — | `participant_status_history.changed_at` — `default now()` (`participant.sql:25`) | Không áp dụng | Không áp dụng | Render bằng `toLocaleString()` của trình duyệt — **không cố định timezone, đề xuất chuẩn hoá về JST** (`transition-history-table.tsx:57`) |

Sắp xếp `changed_at` tăng dần — cũ nhất trước (`page.tsx:49`).

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng (lịch sử) | `history.length === 0` | `EmptyState compact` — "Chưa có lần chuyển trạng thái nào." (`transition-history-table.tsx:20-22`) | — |
| rỗng (transition) | `allowedEvents(status).length === 0` | `EmptyState compact` — "Không có transition nào khả dụng từ trạng thái hiện tại." (`transition-actions.tsx:70-74`). Thực tế cả 4 trạng thái đều có ít nhất 1 cạnh, nên đây là nhánh phòng xa | — |
| đang tải | Điều hướng vào trang | Không có `loading.tsx` — **chưa có skeleton, đề xuất** | — |
| lỗi tải | Query `participant` hoặc `participant_status_history` trả error | `throw new Error(...)` → error boundary Next; **chưa có UI riêng, đề xuất** (`page.tsx:36-38,50-52`) | Tải lại |
| không tìm thấy | `!participant` hoặc `status`/`category` rơi ngoài tập | `notFound()` → trang 404 (`page.tsx:41-43`) | — |
| không có quyền ghi | `user?.role !== "ROLE-SYS-ADMIN"` | Giữ nguyên 2 card nhưng thay nội dung bằng `HandoffCaption` nói rõ hành động thuộc ROLE-SYS-ADMIN (`page.tsx:84-113`) | Chỉ đọc |
| đang gửi (edit) | `submitting === true` | Mọi input `disabled`, nút `aria-busy` + "Đang lưu..." (`participant-form.tsx:118,160-171`) | Không — chặn ở `if (submitting) return` |
| đang gửi (transition) | `submitting === true` | Textarea + 2 nút `disabled`, `aria-busy` (`transition-actions.tsx:101,113-129`) | Không |
| gửi lỗi (edit) | `!response.ok` | `<p role="alert">` với một câu chung (`participant-form.tsx:155-159`) | Sửa và gửi lại |
| gửi lỗi (transition) | `!response.ok` | `<p role="alert">` `transitionError` (`transition-actions.tsx:107-111`) | Chọn lại event, gửi lại |
| read-only vì ngày đã lock | Không áp dụng — `participant` và `participant_status_history` **không** thuộc 4 bảng có `trg_block_after_lock` (`supabase/migrations/20260904090500_business_day_lock.sql:56-75`). Vòng đời hiệu lực trải nhiều ngày nghiệp vụ nên không bị khoá theo ngày | — | — |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | ✓ | Toàn bộ 4 khối | Sửa hồ sơ · chuyển trạng thái | 422 theo từng field (mục 3) |
| 6 vai trò còn lại (INTAKE, JUDGE, TRADE, DELIVERY, SETTLEMENT, RULE-ADMIN) | ✓ | Toàn bộ 4 khối — **đọc đủ, không ẩn cột nào** | Chỉ đọc; 2 card ghi thay bằng `HandoffCaption` | Gọi trực tiếp `PATCH /api/participants/:id` hoặc `POST .../transition` → **404** (`[id]/route.ts:23`, `transition/route.ts:23`) |

**Lưu ý về đọc:** RLS `read_all_active_users` cho mọi vai trò active đọc `participant`,
`participant_status_history` và `app_user` (`rls_core.sql:31-38`) — có chủ đích theo FR-601. Chặn là
ở **ghi**: `write_sys_admin_insert` / `write_sys_admin_update` trên `participant`,
`write_sys_admin_insert` trên `participant_status_history` (`rls_core.sql:71-77`).

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Sửa hồ sơ | `PATCH /api/participants/[id]` (`[id]/route.ts:19`) | `participant` (update, chỉ các field có trong allowlist) | `update` trên `participant`, kèm `before`/`after` **chỉ chứa field thực sự đổi** và `reason` bắt buộc (`[id]/route.ts:108-116`) | **404** sai vai trò hoặc `not_found` (`:53`) · **400** `invalid_json` · **422** `category_immutable` / `reason_required` / `category_license_mismatch` / `invalid_valid_from` / `invalid_valid_to` / `no_fields_to_update` · **500** `internal_error` |
| Chuyển trạng thái | `POST /api/participants/[id]/transition` (`transition/route.ts:19`) | `participant.status` (update) **rồi** `participant_status_history` (insert) — hai lệnh tuần tự (`transition/route.ts:63-83`) | `status_change`, `before = {status: from}`, `after = {status: to}`, `reason` bắt buộc (`:85-93`) | **404** sai vai trò hoặc `not_found` (`:54`) · **400** `invalid_json` · **422** `invalid_event` / `reason_required` / `illegal_transition` · **500** `internal_error` |

## 7. Edge case

- **DIVERGENCE FIG-004 — một transition gỡ tạm ngừng dùng chung cho cả 4 phân loại.**
  `src/lib/participants/state-machine.ts:37` khai đúng một cạnh
  `{ from: "tạm ngừng", event: "go", to: "có hiệu lực" }`. RFP **FIG-004** đòi ba đường khác nhau
  tuỳ phân loại — 卸売業者 → Chấp thuận, 仲卸 → Có điều kiện, 売買参加者 → Xét lại — và RFP §02-08
  dòng 309 **cấm gộp** ba đường này. Code hiện tại gộp. Hệ quả: một 仲卸 bị tạm ngừng được gỡ bằng
  đúng một cú bấm, không qua bước "có điều kiện" nào; ba nhóm pháp lý khác nhau đi cùng một đường.
  *Trạng thái dẫn chứng*: cạnh trong code kiểm được tại `state-machine.ts:37`; hai ID RFP (FIG-004,
  §02-08 dòng 309) **không có trong repo này** — `grep -rn "FIG-004" docs/` không ra kết quả, tài
  liệu RFP nằm ngoài repo. Ai xác nhận lại thì đối chiếu bản RFP gốc, đừng tìm trong `docs/`.
  Đây là task LAB-5 cỡ trung bình: tách `go` thành 3 event theo `category`, sửa cả `TRANSITIONS`,
  `allowedEvents()`, nhãn i18n `event.*`, và test cho từng phân loại.
- **Chuyển trạng thái không nguyên tử.** Ba lệnh ghi tuần tự (`participant.status` → history →
  audit) mà không có transaction — lý do ghi ở `transition/route.ts:14-18`: PostgREST không cho
  BEGIN/COMMIT nhiều bảng, muốn nguyên tử thật phải viết một RPC trong migration. Nếu insert history
  lỗi sau khi status đã đổi, trạng thái đã chuyển nhưng **không có hàng lịch sử nào** —
  `throw` xong trả 500, không có bù trừ. Sổ hiệu lực bị hổng đúng ở chỗ audit cần nhất.
- **Không có CAS trên transition.** Hai ROLE-SYS-ADMIN cùng bấm hai event khác nhau trên cùng một
  người tham gia: cả hai đọc `from` cũ (`:45-49`), cả hai `resolveTarget` thành công, cả hai update
  → hàng lịch sử thứ hai ghi `from_status` đã không còn đúng. `UPDATE ... .eq("status", from)` sẽ
  giải quyết được; **chưa có, đề xuất**.
- **`name` rỗng bị bỏ qua im lặng ở server.** Client có `required` nên UI chặn được, nhưng gọi API
  trực tiếp với `{ name: "", reason: "x" }` thì `name` không vào patch (`[id]/route.ts:60-64`) và
  nếu đó là field duy nhất thì rơi vào **422** `no_fields_to_update` — thông báo sai bản chất lỗi.
- **Không kiểm `valid_to >= valid_from`.** Không tầng nào kiểm. Lưu được một hồ sơ hết hiệu lực
  trước ngày bắt đầu, và `checkParticipantEligibility()` sẽ luôn trả `eligible: false` cho hồ sơ đó
  (`src/lib/participants/eligibility.ts:49-60`) mà không ai biết vì sao. **Đề xuất thêm.**
- **Sáu mã 422 hiện chung một câu.** `participant-form.tsx:67-71` bỏ hết body lỗi. Người dùng không
  biết mình sai `valid_from` hay thiếu `reason`. Task LAB-5: map `body.error` → key i18n như
  `login-form.tsx:9-16` và `mekiki-form.tsx:8-12` đã làm.
- **Email nội bộ lộ ra cột "Người thực hiện".** Khi `display_name` null, bảng lịch sử hiển thị
  `app_user.email` (`page.tsx:64`), và mọi vai trò active đều đọc được `app_user`
  (`rls_core.sql:31-32`). Không phải lỗi bảo mật lớn trong hệ nội bộ, nhưng là dữ liệu cá nhân hiện
  ra ở chỗ chỉ cần một cái tên. **Đề xuất**: fallback sang `—` hoặc `app_user.id` viết tắt.
- **`status` không tự đổi khi qua `valid_to`** — không có cron nào flip trạng thái; hiệu lực thật
  tính lại mỗi lần dùng (`eligibility.ts:19-22`). Badge trên màn là ảnh của cột `status`, không phải
  kết luận "hôm nay được giao dịch hay không".
- **Quyền bị thu hồi giữa phiên**: `canWrite` đọc từ `getCurrentUser()` mỗi request (`page.tsx:68`)
  nên form biến mất ở lần render kế tiếp; và `requireRole` ở API chặn luôn request đang bay.

## 8. Dẫn chứng

- `src/app/(app)/participants/[id]/page.tsx:26-68` — query participant + history + tên người thực hiện, tính `canWrite`
- `src/app/(app)/participants/[id]/page.tsx:41-43,78-121` — `notFound()` và 4 `SectionCard`
- `src/components/participants/participant-profile-fields.tsx:16-35` — 5 field hồ sơ
- `src/components/participants/participant-form.tsx:40,52-58,67-71,97-101,107-110,112-154` — license suy từ category, body request, xử lý lỗi, category khoá
- `src/components/participants/transition-actions.tsx:26,45-48,70-74,79-92,98-105` — chỉ render nút khả dụng, reason bắt buộc
- `src/components/participants/transition-history-table.tsx:20-22,29-57` — 5 cột lịch sử
- `src/lib/participants/state-machine.ts:10-17,23,31-41,56-58,65-71` — 4 trạng thái, 5 cạnh, `allowedEvents`, `resolveTarget`
- `src/lib/participants/category-rules.ts:20-25,32-34,37-39` — mapping category → license_type, kiểm cặp, `requiredLicenseType`
- `src/lib/participants/eligibility.ts:19-22,43-60` — hiệu lực tính lại mỗi lần, không tin `status` cũ
- `src/app/api/participants/[id]/route.ts:10,23,34-40,60-96,108-116` — allowlist field, category bất biến, reason bắt buộc, audit
- `src/app/api/participants/[id]/transition/route.ts:14-18,23,36-41,45-61,63-93` — ghi tuần tự, 5 cạnh, audit
- `supabase/migrations/20260904090100_participant.sql:2-32` — DDL `participant` + `participant_status_history`
- `supabase/migrations/20260904090900_rls_core.sql:31-38,71-77` — read mọi vai trò, write chỉ ROLE-SYS-ADMIN
- `supabase/migrations/20260904090500_business_day_lock.sql:56-75` — 4 bảng có trigger lock; hai bảng của màn này không nằm trong đó
- `src/lib/i18n/dictionaries/vi/participants.json:15-52,57-68` · `ja/participants.json:15-52,57-68` — nhãn VI/JA
- `docs/generated/permissions-matrix.md:913-931,953-966` — PERM sửa hồ sơ và PERM chuyển trạng thái, khớp code; `:916` xác nhận không có `GET /api/participants/:id`
- `docs/generated/screen-list.md:186-225` — SCR005_ParticipantDetail composite, 4 REG

**Ghi chú lệch mã màn:** comment trong file page ghi `SCR003_ParticipantDetail`
(`src/app/(app)/participants/[id]/page.tsx:19`) — hệ mã cũ 20 SCR. Roster LAB-4 và
`docs/generated/screen-list.md:186-189` dùng hệ 26 mã: `SCR005_ParticipantDetail`, legacy ref
`SCR003_ParticipantDetail`. Xem `../00-roster-va-gap.md` § 3.3.
