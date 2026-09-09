# SC-04 — Chi tiết tài khoản và lịch sử quyền

| | |
|---|---|
| Mã thi công | — (chưa dựng) |
| Route | — (đề xuất `/admin/accounts/[id]`) |
| Loại | Detail |
| Actor chính | Quản trị hệ thống (ROLE-SYS-ADMIN) |
| FE- / FR- | FE-003 / `FR-IAM-02` (P0) |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

**Lý do hoãn — chép từ `../../pham-vi-va-phan-mock.md:76`:** `FE-003`/`FR-IAM-02` (P0, quản trị tài
khoản) — **HOÃN CÓ CHỦ ĐÍCH**: "Cùng quyết định với MFA — tài khoản demo cố định qua `seed:users`,
không qua màn quản trị riêng." Quyết định gốc ở dòng 75: bật MFA làm 9 tài khoản demo dùng chung
một mật khẩu không trình bày được. Lý do cũ ("không cần vì demo cố định") đã bị bỏ.

**Ràng buộc cứng của màn này:** Screen List LAB-1 ghi "**Bắt buộc hiển thị before/after**", và RFP
`FR-IAM-02` nghiệm thu bằng "Mọi thay đổi quyền đều có before/after, chủ thể thực hiện và
timestamp". Bảng lịch sử quyền **chưa tồn tại** — đề xuất DDL ở mục 9.

## 1. Mục đích

Xem một tài khoản nội bộ ở mức chi tiết, và cấp / tạm ngừng / mở lại / đổi vai trò cho tài khoản
đó — mỗi lần đổi để lại một dòng lịch sử bất biến có giá trị trước, giá trị sau, lý do, người thực
hiện và thời điểm. Đây là chỗ `FR-IAM-02` được thoả hay không được thoả.

## 2. Điều kiện vào màn

- Đăng nhập: **bắt buộc**, phiên đã đủ mức xác thực theo SC-02.
- Vai trò được vào: **chỉ ROLE-SYS-ADMIN**.
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên).
  `id` không tồn tại cũng trả **404**, cùng một mã — người xem không phân biệt được hai ca.
- Tiền đề dữ liệu: một dòng `app_user` theo `id` trên route.

## 3. Bảng field

### 3.1 Thông tin tài khoản

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `email` | Email | chưa có key JA | read-only | — | `app_user.email` | — | chưa có — đề xuất: không cho đổi ở màn này (đổi email là luồng của provider) | — |
| 2 | `displayName` | Tên hiển thị | chưa có key JA | text | không | `app_user.display_name` | chưa có — đề xuất: trim, cho phép rỗng vì cột `nullable` | chưa có — đề xuất: độ dài tối đa là giả định cần chốt | "Tên hiển thị quá dài." |
| 3 | `role` | Vai trò | chưa có key JA | select | có | `app_user.role` | chưa có — đề xuất: đúng 7 giá trị của CHECK trên `app_user.role` | chưa có — đề xuất: CHECK của Postgres là chốt cuối, tầng app không tự nới | "Vai trò không hợp lệ." |
| 4 | `isActive` | Đang hoạt động | chưa có key JA | toggle | có | `app_user.is_active` | chưa có — đề xuất | chưa có — đề xuất: chặn nếu là ROLE-SYS-ADMIN cuối đang hoạt động | "Không thể vô hiệu tài khoản quản trị cuối cùng." |
| 5 | `reason` | Lý do thay đổi | chưa có key JA | textarea | có (đề xuất) | ghi vào bảng lịch sử quyền (mục 9) | chưa có — đề xuất: không rỗng sau trim | chưa có — đề xuất: không rỗng, nếu rỗng thì **không** ghi thay đổi | "Phải nhập lý do thay đổi quyền." |
| 6 | `lockState` | Khóa tạm | chưa có key JA | read-only | — | dẫn xuất — `app_user.locked_until`, `failed_login_count` | — | — | — |
| 7 | `mfaStatus` | Trạng thái MFA | chưa có key JA | read-only | — | dẫn xuất — phụ thuộc SC-02, **chưa có nguồn** | — | — | — |
| 8 | `createdAt` | Ngày tạo | chưa có key JA | read-only | — | `app_user.created_at` | — | — | — |

### 3.2 Lịch sử quyền — before/after, bắt buộc theo `FR-IAM-02`

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 9 | `changedAt` | Thời điểm | chưa có key JA | datetime (cột) | — | `app_user_permission_history.changed_at` — **bảng chưa có** | — | — | — |
| 10 | `changeType` | Loại thay đổi | chưa có key JA | badge (cột) | — | `app_user_permission_history.change_type` — **bảng chưa có** | — | — | — |
| 11 | `before` | Trước | chưa có key JA | text (cột) | — | dẫn xuất — `from_role` + `from_is_active` | — | — | — |
| 12 | `after` | Sau | chưa có key JA | text (cột) | — | dẫn xuất — `to_role` + `to_is_active` | — | — | — |
| 13 | `reasonRow` | Lý do | chưa có key JA | text (cột) | — | `app_user_permission_history.reason` — **bảng chưa có** | — | — | — |
| 14 | `changedBy` | Người thực hiện | chưa có key JA | text (cột) | — | `app_user_permission_history.changed_by` → `app_user.display_name` | — | — | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Tài khoản chưa có dòng lịch sử quyền nào | Khối 3.1 đầy đủ; khối 3.2 hiện "Chưa có thay đổi quyền nào" | Đổi vai trò, vô hiệu |
| đang tải | Đang đọc `app_user` + lịch sử | Skeleton hai khối | — |
| lỗi tải | Truy vấn thất bại | Thông báo lỗi + nút thử lại | Thử lại |
| không có quyền | Vai trò khác ROLE-SYS-ADMIN | **404** | — |
| không tìm thấy | `id` không tồn tại | **404** — cùng mã với ca trên, có chủ đích | — |
| đang gửi | Đã bấm lưu thay đổi quyền | Form disabled, spinner | — |
| gửi lỗi | CAS thất bại, thiếu lý do, hoặc bị chặn | Lỗi tại field, giữ nguyên giá trị đang nhập | Sửa và gửi lại |

Màn này **không** chạm bảng bị lock ngày → không có dòng `read-only vì ngày đã lock`, không 423.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | Có | 3.1 + 3.2 đầy đủ | Đổi vai trò, vô hiệu, mở lại, mở khoá tạm | — |
| 6 vai trò còn lại | Không | — | — | 404 khi vào route; 403 khi gọi API ghi |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (`FR-601`, có chủ đích —
`supabase/migrations/20260904090900_rls_core.sql:28-32`). `app_user` nằm trong diện đó. Nếu bảng
lịch sử quyền được thêm mà dùng chung khuôn policy `read_all_active_users` như
`participant_status_history` (`20260904090900_rls_core.sql:37-38`), thì **mọi vai trò đọc được toàn
bộ lịch sử phân quyền của mọi người**. Đây là đánh đổi phải quyết trước khi tạo bảng — xem mục 9.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Đổi vai trò | đề xuất `PATCH /api/admin/accounts/{id}` | `app_user.role` + 1 dòng `app_user_permission_history` | đề xuất `account_role_changed`, `before`/`after` là JSON của vai trò | 403 · 409 CAS thất bại · 422 thiếu `reason` hoặc vai trò lạ |
| Vô hiệu | đề xuất `PATCH /api/admin/accounts/{id}` | `app_user.is_active = false` + 1 dòng lịch sử | đề xuất `account_deactivated` | 403 · 409 nếu là ROLE-SYS-ADMIN cuối · 422 thiếu `reason` |
| Mở lại | đề xuất `PATCH /api/admin/accounts/{id}` | `app_user.is_active = true` + 1 dòng lịch sử | đề xuất `account_reactivated` | 403 · 422 thiếu `reason` |
| Mở khoá tạm | đề xuất `POST /api/admin/accounts/{id}/unlock` | `app_user.failed_login_count`, `locked_until` + 1 dòng lịch sử | đề xuất `account_unlocked` | 403 · 409 nếu không đang bị khoá |
| Sửa tên hiển thị | đề xuất `PATCH /api/admin/accounts/{id}` | `app_user.display_name` | đề xuất `account_profile_updated` | 403 · 422 |

Sửa tên hiển thị **không** phải thay đổi quyền → không sinh dòng lịch sử quyền, chỉ vào `audit_log`.

## 7. Edge case

- **Không có transaction xuyên bảng** (`../../pham-vi-va-phan-mock.md:152-159`). Một lần đổi vai trò
  chạm hai bảng: `app_user` và bảng lịch sử. Crash giữa hai lệnh cho ra vai trò đã đổi mà **không
  có dòng before/after** — đúng thứ `FR-IAM-02` cấm. Thứ tự ghi phải là: ghi lịch sử trước (đọc
  được giá trị cũ), rồi CAS `app_user`; CAS thất bại thì ghi bù một dòng huỷ, không xoá dòng đã ghi.
- **CAS trên `app_user`.** Bảng không có cột version. Update phải kèm điều kiện giá trị cũ
  (`eq('role', roleCũ)`), 0 dòng bị ảnh hưởng thì trả 409 — không ghi đè mù.
- **Tự đổi vai trò của chính mình** ra khỏi ROLE-SYS-ADMIN là tự mất quyền quản trị. Phải chặn hoặc
  buộc xác nhận hai bước.
- **Vô hiệu ROLE-SYS-ADMIN cuối cùng** → không còn ai quản trị được hệ thống. Chặn ở tầng API.
- **Quyền bị thu hồi giữa phiên.** Người bị đổi vai trò đang có phiên sống vẫn giữ vai trò cũ trong
  phiên đó cho tới lần điều hướng tiếp theo; `private.current_user_role()` đọc lại từ `app_user`
  mỗi lần policy chạy, nên tầng RLS cập nhật ngay, còn UI thì không. Nếu vai trò mới thuộc diện bắt
  buộc MFA thì phiên thành chưa đủ mức — xem SC-02 mục 7.
- **Lịch sử phải append-only.** Không policy update/delete, giống `audit_log` và `lot_attachment`
  (`../../pham-vi-va-phan-mock.md:125-130`). Sửa được lịch sử quyền thì lịch sử vô nghĩa.
- **Dòng lịch sử của tài khoản đã bị xoá.** `app_user.id` có `on delete cascade` từ `auth.users`
  (`20260904090000_core_identity.sql:8`); xoá tài khoản ở provider sẽ kéo mất cả lịch sử quyền nếu
  khoá ngoại cũng cascade. Đề xuất **không** cascade trên bảng lịch sử.

## 8. Dẫn chứng

- `supabase/migrations/20260904090100_participant.sql:18-32` — `participant_status_history`: tiền lệ
  đúng khuôn cần bắt chước (một dòng cho mỗi lần chuyển trạng thái, có `from_status`/`to_status`/
  `reason` not null/`changed_by`/`changed_at`, kèm index theo khoá ngoại).
- `supabase/migrations/20260904090000_core_identity.sql:7-21` — DDL `app_user`.
- `supabase/migrations/20260904090000_core_identity.sql:26-40` — DDL `audit_log`: đã có `before`
  và `after` dạng `jsonb`, append-only, "no update/delete policy exists anywhere for this table".
- `supabase/migrations/20260904090900_rls_core.sql:28-38` — `read_all_active_users` trên `app_user`
  và `participant_status_history`, kèm lý do `FR-601`.
- `src/lib/audit/write-audit-log.ts:4-32` — primitive `writeAuditLog` đã có, dùng lại được; ghi chú
  của nó nói rõ việc `reason` có bắt buộc hay không là quyết định của từng feature.
- `src/lib/auth/require-role.ts:66-78` — 404 thay vì 403.
- `../../pham-vi-va-phan-mock.md:76` — lý do hoãn `FE-003`/`FR-IAM-02`, bản đã sửa.
- `src/lib/i18n/dictionaries/ja/` — không có namespace tài khoản → nhãn JA chưa có.

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | **Bảng lịch sử quyền — chưa có.** Đề xuất `app_user_permission_history`, cùng khuôn `participant_status_history`: `id` uuid pk · `app_user_id` uuid not null → `app_user(id)`, **không cascade** · `change_type` text not null CHECK (`cấp`, `đổi vai trò`, `tạm ngừng`, `mở lại`, `mở khoá tạm`) · `from_role` text · `to_role` text · `from_is_active` boolean · `to_is_active` boolean · `reason` text not null · `changed_by` uuid → `app_user(id)` · `changed_at` timestamptz not null default now() · index theo `app_user_id` | Append-only: chỉ policy select + insert, **không** update/delete. Cột `before`/`after` tách thành hai cặp thay vì `jsonb` để truy vấn theo vai trò được, khác `audit_log` |
| Bảng/cột | Cột đánh dấu diện bắt buộc MFA (dùng chung với SC-02) để field #7 có nguồn | Chốt ở ADR của SC-02 |
| Hạ tầng | Supabase Admin API + `service_role` cho các thao tác chạm `auth.users` | Cùng cơ chế `createAdminClient()` đang dùng ở `src/lib/auth/lockout.ts` |
| Bảo mật | **Quyết định RLS cho bảng lịch sử quyền.** Dùng chung khuôn `read_all_active_users` là để mọi vai trò đọc được toàn bộ lịch sử phân quyền — không giữ được khi có màn quản trị thật. Cần policy select riêng cho ROLE-SYS-ADMIN | Cùng vấn đề với `app_user` ở SC-03 mục 9 |
| Màn/API phụ thuộc | SC-03 (danh sách, cửa vào), SC-02 (mức xác thực + trạng thái MFA), SC-30 (tra cứu `audit_log`) | Lịch sử quyền và `audit_log` là **hai** vết ghi khác nhau, không thay nhau |

### Giả định cần chốt

| # | Giả định | Ảnh hưởng nếu sai | Nơi phải sửa |
|---|---|---|---|
| 1 | `reason` **bắt buộc** cho mọi thay đổi quyền. `FR-IAM-02` đòi before/after, chủ thể, timestamp — không nói rõ về lý do | Không bắt buộc thì lịch sử mất phần "vì sao"; bắt buộc thì thao tác mở khoá tạm hằng ngày thành nặng tay | Field #5, `reason text not null` trong DDL đề xuất |
| 2 | Lịch sử quyền là **bảng riêng**, không gộp vào `audit_log`. Lý do: `audit_log.before/after` là `jsonb` tự do, không truy vấn được "ai từng giữ ROLE-SETTLEMENT" | Nếu khách chỉ cần vết audit chung thì bảng này là dư — nhưng khi đó màn 3.2 phải đọc `audit_log` và mất khả năng lọc theo vai trò | Mục 9 dòng đầu, mục 3.2 |
| 3 | Không cho đổi email ở màn này | Nếu khách cần đổi email nội bộ thì phải thêm luồng đồng bộ `auth.users` ↔ `app_user.email` (cột `unique`) | Field #1 |
| 4 | Độ dài tối đa của `display_name` và `reason` — RFP không nói | Không chặn thì một dòng lý do dài vô hạn vào bảng append-only, không sửa được về sau | Field #2, #5 |
| 5 | Lịch sử quyền lưu **vô thời hạn**. `DR-RET-01` nói dữ liệu nghiệp vụ tra cứu online lưu 7 năm, không nói rõ vết phân quyền có thuộc diện đó | Nếu thuộc diện 7 năm thì cần policy dọn; nếu không thì bảng chỉ tăng, chấp nhận được | Quy trình vận hành, mục 9 |
