# SC-03 — Danh sách tài khoản

| | |
|---|---|
| Mã thi công | — (chưa dựng) |
| Route | — (đề xuất `/admin/accounts`) |
| Loại | List |
| Actor chính | Quản trị hệ thống (ROLE-SYS-ADMIN) |
| FE- / FR- | FE-003 / `FR-IAM-02` (P0) |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

**Lý do hoãn — chép từ `../../pham-vi-va-phan-mock.md:76`:** `FE-003`/`FR-IAM-02` (P0, quản trị tài
khoản) — **HOÃN CÓ CHỦ ĐÍCH**: "Cùng quyết định với MFA — tài khoản demo cố định qua `seed:users`,
không qua màn quản trị riêng." Quyết định gốc nằm ở dòng 75: bật MFA làm 9 tài khoản demo dùng
chung một mật khẩu không trình bày được. Lý do cũ ("không cần vì demo cố định") đã bị bỏ.

**Điểm khác các màn mức 3 còn lại:** bảng `app_user` **đã tồn tại thật**
(`supabase/migrations/20260904090000_core_identity.sql:7-21`). Phần **danh sách** vì thế bám được
cột thật; chỉ phần **hành động** (tạo, vô hiệu, đổi vai trò, mở khoá) là đề xuất.

## 1. Mục đích

Cho quản trị hệ thống thấy toàn bộ tài khoản người dùng nội bộ trong một danh sách lọc được, để
biết ai đang hoạt động, ai giữ vai trò nào, tài khoản nào đang bị khóa tạm — và là cửa vào SC-04
khi cần cấp, tạm ngừng hoặc mở lại quyền theo `FR-IAM-02`.

## 2. Điều kiện vào màn

- Đăng nhập: **bắt buộc**, và phiên đã đủ mức xác thực theo SC-02.
- Vai trò được vào: **chỉ ROLE-SYS-ADMIN**. Sáu vai trò còn lại không vào được.
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên).
- Tiền đề dữ liệu: không có. Danh sách luôn có tối thiểu tài khoản của chính người đang xem.

## 3. Bảng field

Cột danh sách. `app_user.*` là cột thật; các ô hành động là đề xuất.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `displayName` | Tên hiển thị | chưa có key JA | text (cột) | — | `app_user.display_name` | — | — | — |
| 2 | `email` | Email | chưa có key JA | text (cột) | — | `app_user.email` | — | — | — |
| 3 | `role` | Vai trò | chưa có key JA | badge (cột) | — | `app_user.role` | — | — | — |
| 4 | `isActive` | Đang hoạt động | chưa có key JA | badge (cột) | — | `app_user.is_active` | — | — | — |
| 5 | `lockState` | Khóa tạm | chưa có key JA | badge (cột) | — | dẫn xuất — `app_user.locked_until > now()` | — | — | — |
| 6 | `failedLoginCount` | Số lần sai liên tiếp | chưa có key JA | number (cột) | — | `app_user.failed_login_count` | — | — | — |
| 7 | `createdAt` | Ngày tạo | chưa có key JA | date (cột) | — | `app_user.created_at` | — | — | — |
| 8 | `mfaStatus` | Trạng thái MFA | chưa có key JA | badge (cột) | — | dẫn xuất — số yếu tố đã đăng ký; **chưa có nguồn**, phụ thuộc SC-02 | — | — | — |
| 9 | `filterRole` | Lọc theo vai trò | chưa có key JA | select | không | chỉ UI | chưa có — đề xuất: chỉ 7 giá trị của CHECK trên `app_user.role` | chưa có — đề xuất: giá trị lạ thì bỏ qua bộ lọc, không lỗi 500 | "Vai trò không hợp lệ." |
| 10 | `filterActive` | Lọc theo trạng thái | chưa có key JA | select | không | chỉ UI | chưa có — đề xuất: `tất cả` / `đang hoạt động` / `đã vô hiệu` | chưa có — đề xuất | — |
| 11 | `keyword` | Tìm theo tên hoặc email | chưa có key JA | text | không | chỉ UI | chưa có — đề xuất: trim, độ dài tối đa là giả định cần chốt | chưa có — đề xuất: escape ký tự wildcard trước khi ghép truy vấn | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Bộ lọc không khớp tài khoản nào | "Không có tài khoản khớp điều kiện" + nút xoá lọc | Xoá lọc |
| đang tải | Đang đọc `app_user` | Skeleton bảng | — |
| lỗi tải | Truy vấn thất bại | Thông báo lỗi + nút thử lại | Thử lại |
| không có quyền | Vai trò khác ROLE-SYS-ADMIN | **404** | — |
| đang gửi | Đang vô hiệu / mở lại / mở khoá một tài khoản | Dòng đó disabled, spinner | — |
| gửi lỗi | Ghi thất bại hoặc bị RLS chặn | Toast lỗi, danh sách giữ nguyên giá trị cũ | Thử lại |

Màn này **không** chạm bảng bị lock ngày (`transaction`, `seri_result`, `mekiki_record`,
`delivery_shipment`) → không có dòng `read-only vì ngày đã lock`, không có 423.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | Có | Toàn bộ cột 1–8 | Lọc, mở SC-04, tạo tài khoản, vô hiệu, mở lại, mở khoá tạm | — |
| 6 vai trò còn lại | Không | — | — | 404 khi vào route; 403 khi gọi API ghi |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (`FR-601`, có chủ đích).
`app_user` nằm trong diện đó — policy `read_all_active_users` trên chính `app_user`
(`supabase/migrations/20260904090900_rls_core.sql:31-32`). Nghĩa là **404 ở tầng route là toàn bộ
lớp chắn của màn này**: một người dùng đã đăng nhập với vai trò bất kỳ, nếu gọi thẳng PostgREST,
vẫn đọc được email, vai trò và trạng thái khóa của mọi tài khoản. Đánh đổi này khai ở mục 9.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Mở SC-04 | — (điều hướng) | — | — | 404 nếu id không tồn tại |
| Tạo tài khoản | đề xuất `POST /api/admin/accounts` | `auth.users` (Admin API) + `app_user` + bảng lịch sử quyền (mục 9) | đề xuất `account_created` | 403 sai vai trò · 409 email đã tồn tại (`app_user.email` là `unique`) |
| Vô hiệu tài khoản | đề xuất `PATCH /api/admin/accounts/{id}` | `app_user.is_active = false` + bảng lịch sử quyền | đề xuất `account_deactivated`, kèm `reason` | 403 · 409 nếu là tài khoản ROLE-SYS-ADMIN cuối đang hoạt động · 422 thiếu `reason` |
| Mở lại tài khoản | đề xuất `PATCH /api/admin/accounts/{id}` | `app_user.is_active = true` + bảng lịch sử quyền | đề xuất `account_reactivated`, kèm `reason` | 403 · 422 thiếu `reason` |
| Mở khoá tạm | đề xuất `POST /api/admin/accounts/{id}/unlock` | `app_user.failed_login_count = 0`, `locked_until = null` | đề xuất `account_unlocked` | 403 · 409 nếu tài khoản không đang bị khoá |

Đổi vai trò thuộc SC-04 (cần trang before/after), không đặt ở danh sách.

## 7. Edge case

- **Tự vô hiệu chính mình.** ROLE-SYS-ADMIN vô hiệu tài khoản của chính mình là tự đuổi mình ra
  khỏi hệ thống. Phải chặn, hoặc tối thiểu buộc xác nhận hai bước.
- **Vô hiệu ROLE-SYS-ADMIN cuối cùng** → hệ thống không còn ai quản trị. Phải chặn ở tầng API,
  không chỉ ẩn nút.
- **Không có transaction xuyên bảng** (`../../pham-vi-va-phan-mock.md:152-159`). Tạo tài khoản chạm
  ba nơi: `auth.users`, `app_user`, bảng lịch sử quyền. Crash giữa hai lệnh để lại tài khoản
  `auth.users` không có dòng `app_user` — mà `private.current_user_role()` trả `null` cho ca đó
  (`20260904090000_core_identity.sql:53-55`), tức tài khoản đăng nhập được nhưng không đọc được gì.
  Cần ghi bù hoặc một database function chạy trong transaction Postgres thật.
- **Quyền bị thu hồi giữa phiên.** Vô hiệu một tài khoản đang có phiên sống: `requireUser()` đẩy về
  `/login?reason=inactive` ở lần điều hướng tiếp theo (`src/lib/auth/require-role.ts:57-63`), nhưng
  phiên chưa bị thu hồi ở tầng provider ngay lập tức.
- **Đồng thời hai quản trị sửa cùng một tài khoản.** Không có cột version trên `app_user` → cần CAS
  theo giá trị cũ (`is_active`, `role`) chứ không ghi đè mù.
- **Email là dữ liệu cá nhân.** Danh sách này hiển thị email của toàn bộ nhân sự nội bộ; kết hợp với
  `FR-601` đọc rộng, đây là mặt phơi cần siết trước khi lên production.

## 8. Dẫn chứng

- `supabase/migrations/20260904090000_core_identity.sql:7-21` — DDL `app_user`: `email` unique,
  `role` CHECK 7 giá trị, `is_active`, `failed_login_count`, `locked_until`, `created_at`.
- `supabase/migrations/20260904090900_rls_core.sql:28-32` — policy `read_all_active_users` trên
  `app_user`, kèm lý do `FR-601`.
- `supabase/migrations/20260904090000_core_identity.sql:46-59` — `private.current_user_role()` trả
  `null` khi tài khoản không có dòng `app_user` hoặc `is_active = false`.
- `src/lib/auth/require-role.ts:57-78` — `requireUser()` redirect, `requireRole()` trả 404.
- `../../pham-vi-va-phan-mock.md:76` — lý do hoãn `FE-003`/`FR-IAM-02`, bản đã sửa.
- `../../pham-vi-va-phan-mock.md:152-159` — không có transaction xuyên bảng, dùng CAS + ghi bù.
- `src/lib/i18n/dictionaries/ja/` — 10 namespace, không có namespace tài khoản → nhãn JA chưa có.

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | **Không cần bảng mới cho phần danh sách** — `app_user` đã đủ 7 cột hiển thị | Đây là màn nhẹ nhất của nhóm mức 3 |
| Bảng/cột | Bảng **lịch sử quyền** cho phần hành động — đề xuất chi tiết ở `SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.md` mục 9. Dùng chung, không tạo hai bảng | `FR-IAM-02` đòi before/after cho mọi thay đổi quyền |
| Hạ tầng | **Supabase Admin API + `service_role`** để tạo/xoá `auth.users` — PostgREST của client không làm được. Nghĩa là API route phía server, không phải gọi trực tiếp từ browser | Cùng cơ chế `createAdminClient()` mà `src/lib/auth/lockout.ts` đang dùng |
| Hạ tầng | Kênh phát mật khẩu ban đầu / thư mời cho tài khoản mới → phụ thuộc hạ tầng email, cùng khoảng trống với SC-28/SC-29 | Có thể tạm thay bằng quản trị đặt mật khẩu và giao tay — là một giả định |
| Bảo mật | **Siết RLS trên `app_user`** nếu màn này được dựng: hiện `FR-601` cho mọi vai trò đọc mọi bảng, kể cả email và trạng thái khóa của người khác. Cần policy riêng cho `app_user` thay vì dùng chung `read_all_active_users` | Đánh đổi có chủ đích của LAB-3, nhưng không giữ được khi có màn quản trị thật |
| Màn/API phụ thuộc | SC-02 (để có cột `mfaStatus` và để phiên đủ mức xác thực), SC-04 (chi tiết + lịch sử), SC-30 (tra cứu audit log) | |

### Giả định cần chốt

| # | Giả định | Ảnh hưởng nếu sai | Nơi phải sửa |
|---|---|---|---|
| 1 | Chỉ ROLE-SYS-ADMIN vào được màn này. RFP `FR-IAM-02` nói "Quản trị hệ thống", không nói có vai trò quản trị nhân sự tách riêng | Nếu khách có bộ phận hành chính cấp tài khoản mà không phải quản trị hệ thống thì thiếu một vai trò | Mục 2, mục 5, CHECK trên `app_user.role` |
| 2 | Số dòng mỗi trang và độ dài tối đa của ô tìm kiếm — RFP không nói. `NFR-PERF-01` chỉ đặt p95 ≤ 2 giây cho tìm kiếm thông thường | Đặt quá lớn thì vượt ngưỡng `NFR-PERF-01` khi số tài khoản tăng | Field #11, tham số phân trang của API |
| 3 | `reason` là **bắt buộc** khi vô hiệu / mở lại. `FR-IAM-02` chỉ đòi before/after, chủ thể và timestamp — không nói rõ có bắt buộc lý do | Không bắt buộc thì lịch sử quyền mất phần "vì sao", đúng loại thiếu mà audit hay bắt | Mục 6, DDL bảng lịch sử quyền ở SC-04 |
| 4 | Vô hiệu tài khoản **không** xoá dữ liệu nghiệp vụ do tài khoản đó tạo (`audit_log.actor_id`, `changed_by` vẫn trỏ tới) | Nếu khách muốn xoá thật theo yêu cầu dữ liệu cá nhân thì `on delete cascade` hiện tại từ `auth.users` sẽ kéo mất cả vết audit | `20260904090000_core_identity.sql:8`, quy trình vận hành |
