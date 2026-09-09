# SC-05 — Danh sách người tham gia

| | |
|---|---|
| Mã thi công | SCR003_ParticipantList |
| Route | `/participants` |
| Loại | List |
| Actor chính | Nhân viên vận hành chợ (đọc) · ROLE-SYS-ADMIN (tạo mới) |
| FE- / FR- | FE-005 / FR-PARTY-01, PERM (create) `permissions-matrix.md:880-891` |
| Trạng thái | Đã dựng |

## 1. Mục đích

Tra cứu người tham gia chợ theo **4 phân loại** và **4 trạng thái hiệu lực**. Đây là điểm vào của
toàn bộ nghiệp vụ F002: mọi màn cần biết "ai được phép mua/bán hôm nay" đều bắt đầu từ đây. Chỉ
ROLE-SYS-ADMIN thấy nút tạo mới; các vai trò khác thấy dòng nhắc ai là người làm việc đó.

## 2. Điều kiện vào màn

- **Đăng nhập**: bắt buộc — `(app)/layout.tsx:11` gọi `requireUser()`, kế thừa cho mọi trang trong nhóm
- **Vai trò được vào**: **cả 7 vai trò**. Trang không gọi `requireRole` — chỉ `getCurrentUser()` để biết có hiện nút tạo hay không (`src/app/(app)/participants/page.tsx:25-27,49`)
- **Mã lỗi khi thiếu quyền**: không có nhánh nào 404 ở màn này. Không session → **307** về `/login?reason=unauthenticated` (`src/lib/supabase/proxy.ts:41-54`); session hợp lệ nhưng `is_active = false` → **307** về `/login?reason=inactive` (`require-role.ts:58-64`). Quy tắc **404 thay 403** (`notFound()`, không lộ sự tồn tại tài nguyên) áp cho màn có `requireRole`, ví dụ nút "Tạo mới" dẫn tới `/participants/new` (`participants/new/page.tsx:11`)
- **Tiền đề dữ liệu**: không cần — bảng rỗng vẫn vào được, hiện `EmptyState`

## 3. Bảng field

Trang chỉ đọc. Bốn field đầu là bộ lọc (ghi vào query string), sáu field sau là cột bảng.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `category` (lọc) | Phân loại | 区分 | select — 4 giá trị + "Tất cả" | Không | Query param `?category=`, đối chiếu `PARTICIPANT_CATEGORIES` (`src/lib/participants/category-rules.ts:8-13`) | `<select>` chỉ render 4 giá trị hợp lệ nên không nhập tay được (`participant-filters.tsx:42-46`) | Trang: `isParticipantCategory(category)` — sai thì **bỏ qua im lặng**, coi như không lọc (`page.tsx:32`). API `GET /api/participants`: sai thì **400** `invalid_category` (`api/participants/route.ts:25-27`). **Hai chỗ lệch — xem mục 7** | Không có thông báo trên UI (bỏ qua im lặng) |
| 2 | `status` (lọc) | Trạng thái hiệu lực | 有効状態 | select — 4 giá trị + "Tất cả" | Không | Query param `?status=`, đối chiếu `PARTICIPANT_STATUSES` (`src/lib/participants/state-machine.ts:12-17`) | Như trên (`participant-filters.tsx:57-61`) | Trang: `isParticipantStatus` — sai thì bỏ qua im lặng (`page.tsx:33`). API: **400** `invalid_status` (`api/participants/route.ts:28-30`) | Không có thông báo trên UI |
| 3 | `name` | Tên | 名称 | text | — (chỉ đọc) | `participant.name` — `text not null` (`supabase/migrations/20260904090100_participant.sql:5`) | Không áp dụng — cột hiển thị, là link sang SC-06 (`participant-table.tsx:39-41`) | Không áp dụng | — |
| 4 | `category` | Phân loại | 区分 | text — 1 trong 4 | — (chỉ đọc) | `participant.category` — `text not null check (category in ('卸売業者','仲卸','売買参加者','買出人'))` (`participant.sql:4`) | Không áp dụng | CHECK ở tầng DB (`participant.sql:4`) + `isParticipantCategory` ở tầng app (`category-rules.ts:27-29`) | — |
| 5 | `license_type` | Căn cứ tham gia | 参加根拠 | text — 1 trong 3 nhãn | — (chỉ đọc) | `participant.license_type` — **`text not null`, KHÔNG có CHECK** (`participant.sql:6`) | Không áp dụng | **Ràng buộc nằm ở tầng app, không phải tầng DB**: cặp (`category`, `license_type`) chỉ bị chặn bởi `isValidCategoryLicensePair()` (`category-rules.ts:32-34`), gọi từ `POST /api/participants:85-87` và `PATCH /api/participants/[id]:66-68`, trả **422** `category_license_mismatch`. Ghi thẳng vào bảng bằng `service_role` sẽ **lọt** | Nhãn hiển thị `licenseType.<giá trị>`: "Đăng ký" / "Giấy phép (許可)" / "Chấp thuận (承認)" (`vi/participants.json:57-59`), 登録 / 許可 / 承認 (`ja/participants.json:57-59`) |
| 6 | `status` | Trạng thái | 状態 | badge — 1 trong 4 | — (chỉ đọc) | `participant.status` — `text not null default 'có hiệu lực' check (status in (...))` (`participant.sql:7-8`) | Không áp dụng | CHECK ở tầng DB + `isParticipantStatus` ở tầng app (`state-machine.ts:43-45`) | Nhãn `status.<giá trị>`: Có hiệu lực / Tạm ngừng / Mất hiệu lực / Xét lại (`vi/participants.json:60-63`), 有効 / 停止中 / 失効 / 再審査中 (`ja/participants.json:60-63`) |
| 7 | `valid_from` | Hiệu lực từ | 有効開始日 | date | — (chỉ đọc) | `participant.valid_from` — `date not null` (`participant.sql:9`) | Không áp dụng | Định dạng `YYYY-MM-DD` kiểm ở API tạo/sửa (`api/participants/route.ts:12,88-90`) | — |
| 8 | `valid_to` | Hiệu lực đến | 有効終了日 | date, nullable | — (chỉ đọc) | `participant.valid_to` — `date` (cho phép null) (`participant.sql:10`) | Không áp dụng | Null hợp lệ; có giá trị thì phải `YYYY-MM-DD` (`api/participants/route.ts:91-93`) | Null hiển thị `participants.detail.validToNone` — "Không giới hạn" / 無期限 (`vi/participants.json:21`) |

**Mapping (category → license_type)** — bảng duy nhất, ở `category-rules.ts:20-25`:
卸売業者 → `đăng ký` · 仲卸 → `giấy phép` (許可) · 売買参加者 → `chấp thuận` (承認) · 買出人 → `đăng ký`.

**Sắp xếp và phân trang**: `order("created_at", { ascending: false }).limit(50)` — mới nhất trước,
tối đa 50 hàng, **không có phân trang** (`page.tsx:36-40`; API cũng `PAGE_SIZE = 50`,
`api/participants/route.ts:11`).

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | `participants.length === 0` (bảng rỗng hoặc bộ lọc không khớp) | `EmptyState` với `participants.list.empty` — "Không có người tham gia nào phù hợp với bộ lọc." (`participant-table.tsx:18-20`) | Đổi bộ lọc; ROLE-SYS-ADMIN còn nút "Tạo mới" |
| đang tải | Điều hướng đổi query param | Không có `loading.tsx` cho route này — **chưa có skeleton, đề xuất**. Hiện tại là streaming mặc định của Next | — |
| lỗi tải | Query Supabase trả `error` | `throw new Error(...)` → error boundary của Next; **chưa có UI riêng, đề xuất** (`page.tsx:44-47`) | Tải lại trang |
| không có quyền | Không xảy ra ở màn này — mọi vai trò active đều vào được | — | — |
| đang gửi | Không áp dụng — màn không có form ghi | — | — |
| gửi lỗi | Không áp dụng | — | — |
| không phải ROLE-SYS-ADMIN | `user?.role !== "ROLE-SYS-ADMIN"` | Thay nút "Tạo mới" bằng `HandoffCaption` nói rõ hành động này thuộc ROLE-SYS-ADMIN (`page.tsx:56-65`) | Chỉ đọc và lọc |
| read-only vì ngày đã lock | Không áp dụng — `participant` **không** thuộc 4 bảng có `trg_block_after_lock` (`supabase/migrations/20260904090500_business_day_lock.sql:61-75`) | — | — |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | ✓ | Toàn bộ 6 cột | Lọc · mở SC-06 · **nút "Tạo mới"** → `/participants/new` | — |
| ROLE-INTAKE | ✓ | Toàn bộ 6 cột | Lọc · mở SC-06 | Vào `/participants/new` → **404** (`participants/new/page.tsx:11`) |
| ROLE-JUDGE | ✓ | Toàn bộ 6 cột | Lọc · mở SC-06 | Như trên |
| ROLE-TRADE | ✓ | Toàn bộ 6 cột | Lọc · mở SC-06 | Như trên |
| ROLE-DELIVERY | ✓ | Toàn bộ 6 cột | Lọc · mở SC-06 | Như trên |
| ROLE-SETTLEMENT | ✓ | Toàn bộ 6 cột | Lọc · mở SC-06 | Như trên |
| ROLE-RULE-ADMIN | ✓ | Toàn bộ 6 cột | Lọc · mở SC-06 | Như trên |

**Lưu ý về đọc:** RLS `read_all_active_users` trên `participant` cho **mọi vai trò đang hoạt động
đọc được** (`rls_core.sql:35-36`), có chủ đích theo FR-601. Không có cột nào bị ẩn theo vai trò.
Chặn là ở **ghi** (`write_sys_admin_insert` / `write_sys_admin_update`, `rls_core.sql:71-75`) và ở
**vào trang** của các màn khác.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Lọc theo phân loại / trạng thái | Không gọi API — `router.push` đổi query string, server component tự đọc lại (`participant-filters.tsx:21-30`) | Không | Không | Không |
| Mở chi tiết (SC-06) | Điều hướng `/participants/{id}` (`participant-table.tsx:39`) | Không | Không | 404 nếu id không tồn tại (`participants/[id]/page.tsx:41-43`) |
| Nút "Tạo mới" | Điều hướng `/participants/new`, form ở đó gọi `POST /api/participants` | `participant` (insert) | `create` trên entity `participant` (`api/participants/route.ts:109-115`) | **404** nếu không phải ROLE-SYS-ADMIN (`:59`) · **400** `invalid_json` · **422** `invalid_category` / `invalid_name` / `category_license_mismatch` / `invalid_valid_from` / `invalid_valid_to` · **500** `internal_error` |

Màn này còn có API đọc riêng `GET /api/participants` (`api/participants/route.ts:18`) —
`requireUser()`, mọi vai trò active gọi được. Trang không dùng nó (đọc Supabase trực tiếp), nhưng
LAB-5 cần biết là nó tồn tại và validation của nó **khác** trang.

## 7. Edge case

- **Bộ lọc lạ xử lý lệch ở hai chỗ.** `?category=abc` vào trang thì bị bỏ qua im lặng, hiện toàn bộ
  danh sách (`page.tsx:32-33`); cùng tham số đó gọi vào `GET /api/participants` thì **400**
  (`api/participants/route.ts:25-30`). Người dùng sửa URL tay không hề biết bộ lọc của mình bị bỏ.
  Task LAB-5: chọn một hành vi.
- **Trần 50 hàng không có phân trang.** Quá 50 người tham gia là mất dữ liệu khỏi màn mà không có
  dấu hiệu gì — không có tổng số, không có nút trang sau (`page.tsx:40`). Đây là gap thật, không phải
  quyết định có chủ đích nào được ghi lại.
- **`license_type` chỉ được chặn ở tầng app.** Cột là `text not null` không CHECK
  (`participant.sql:6`). Nghĩa là hàng ghi qua `service_role`, qua psql, hoặc qua migration mới có
  thể mang giá trị lạ, và bảng vẫn hiển thị nó nguyên văn (`dict[...] ?? p.license_type`,
  `participant-table.tsx:44`). Nếu muốn ràng buộc thật, phải thêm CHECK hoặc bảng tham chiếu —
  ghi ngược vào `../10-database-diagram.md`.
- **`status` không tự đổi khi qua `valid_to`.** Không có cron nào flip trạng thái, nên một hàng vẫn
  hiển thị "Có hiệu lực" sau ngày hết hiệu lực. Hiệu lực thật được tính lại mỗi lần dùng ở
  `checkParticipantEligibility()` (`src/lib/participants/eligibility.ts:19-22,43-60`). Bảng này là
  ảnh của cột `status`, **không phải** kết luận "hôm nay được giao dịch hay không".
- **Quyền bị thu hồi giữa phiên**: `user` chuyển inactive → lần render kế tiếp `requireUser()` ở
  layout redirect về `/login?reason=inactive`. Nút "Tạo mới" cũng biến mất vì `canWrite` đọc từ
  `getCurrentUser()` mỗi request (`page.tsx:49`).
- **Đồng thời**: màn chỉ đọc, không có CAS nào. Hai người cùng xem một danh sách có thể thấy dữ liệu
  lệch nhau vài giây; không có gì hỏng.

## 8. Dẫn chứng

- `src/app/(app)/participants/page.tsx:25-49` — đọc searchParams + user + locale, lọc, `canWrite`
- `src/app/(app)/participants/page.tsx:36-40` — `order created_at desc` + `limit(50)`
- `src/app/(app)/participants/page.tsx:56-65` — nút "Tạo mới" vs `HandoffCaption`
- `src/components/participants/participant-filters.tsx:21-30,42-46,57-61` — cách ghi query string và 2 select
- `src/components/participants/participant-table.tsx:18-20,27-49` — `EmptyState`, 6 cột, link sang SC-06
- `src/lib/participants/category-rules.ts:8-13,20-25,32-34,37-39` — 4 phân loại, mapping license, `isValidCategoryLicensePair`, `requiredLicenseType`
- `src/lib/participants/state-machine.ts:10-17,43-45` — 4 trạng thái hiệu lực
- `src/app/api/participants/route.ts:11,18-30,58-93,109-115` — `PAGE_SIZE`, validation GET, validation POST, audit
- `supabase/migrations/20260904090100_participant.sql:2-12` — DDL đầy đủ: CHECK trên `category` và `status`, **không có** CHECK trên `license_type`
- `supabase/migrations/20260904090900_rls_core.sql:35-36,71-75` — read cho mọi vai trò active, write chỉ ROLE-SYS-ADMIN
- `supabase/migrations/20260904090500_business_day_lock.sql:56-75` — 4 bảng có trigger lock; `participant` không nằm trong đó
- `src/lib/i18n/dictionaries/vi/participants.json:2-14,21,53-63` · `ja/participants.json:2-14,21,53-63` — nhãn VI/JA
- `docs/generated/permissions-matrix.md:880-891` — PERM tạo người tham gia, khớp code
- `docs/generated/screen-list.md:125-153` — SCR003_ParticipantList

**Ghi chú lệch mã màn:** comment trong file page ghi `SCR002_ParticipantList`
(`src/app/(app)/participants/page.tsx:18`) — đó là hệ mã cũ 20 SCR. Roster LAB-4 và
`docs/generated/screen-list.md:125` dùng hệ 26 mã đọc từ code: `SCR003_ParticipantList`. Hai hệ
song song, xem `../00-roster-va-gap.md` § 3.3.
