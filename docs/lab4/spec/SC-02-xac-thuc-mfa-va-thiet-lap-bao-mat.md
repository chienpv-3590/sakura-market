# SC-02 — Xác thực MFA và thiết lập bảo mật

| | |
|---|---|
| Mã thi công | — (chưa dựng) |
| Route | — (đề xuất `/security/mfa`) |
| Loại | Form |
| Actor chính | Quản trị hệ thống (ROLE-SYS-ADMIN) và các vai trò phê duyệt nội bộ |
| FE- / FR- | FE-002, FE-004 / `NFR-SEC-01`, `NFR-SEC-03` |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

**Lý do hoãn — chép từ `../../pham-vi-va-phan-mock.md:75`:** `FE-002`/`NFR-SEC-01` (P0, MFA) —
**HOÃN CÓ CHỦ ĐÍCH**: "Bật MFA làm 9 tài khoản demo dùng chung một mật khẩu không trình bày được;
Supabase Auth có sẵn MFA, chỉ chưa bật; sẽ bật trước khi lên production." Đây là lý do đã sửa; lý
do cũ ("không cần vì demo cố định") đã bị bỏ, đừng dùng lại.

**Giới hạn của tài liệu này:** repo là public. Spec chỉ mô tả **yêu cầu và luồng**. Chi tiết cấu
hình khoá, cách sinh và lưu yếu tố xác thực, nội dung mã dự phòng, luồng khôi phục khi mất thiết bị
đều nằm ngoài tài liệu này — chốt riêng ở tài liệu bảo mật nội bộ (xem mục 9).

## 1. Mục đích

Bắt buộc yếu tố xác thực thứ hai cho tài khoản quản trị và các vai trò có quyền phê duyệt, ngay sau
bước mật khẩu của SC-01 và trước khi người dùng chạm được vào dữ liệu nghiệp vụ. Cùng màn cho người
dùng tự xem, tự đăng ký yếu tố của mình, và thấy trạng thái bảo mật của phiên đang dùng — phần
`NFR-SEC-03` về timeout, khóa tạm và log hành vi bất thường.

## 2. Điều kiện vào màn

- Đăng nhập: **bắt buộc** — bước mật khẩu đã đúng, phiên chưa đủ mức xác thực.
- Vai trò được vào: ROLE-SYS-ADMIN và các vai trò phê duyệt (ROLE-RULE-ADMIN ở vai checker của
  SC-24, ROLE-SETTLEMENT ở vai phê duyệt của SC-21). Danh sách vai trò thuộc diện bắt buộc MFA là
  **giả định cần chốt** — `NFR-SEC-01` chỉ nói "tài khoản quản trị và các role phê duyệt nội bộ".
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên;
  cùng cơ chế `requireRole()` đang dùng).
- Tiền đề dữ liệu: `app_user` đang hoạt động (`is_active = true`), không trong thời gian khóa tạm.

## 3. Bảng field

### 3.1 Bước thử thách MFA — sau khi mật khẩu đúng

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `factorId` | Phương thức xác thực | chưa có key JA | select | có | dẫn xuất — yếu tố đã đăng ký của phiên | chưa có — đề xuất: bắt buộc chọn khi có nhiều hơn một yếu tố | chưa có — đề xuất: yếu tố phải thuộc chính người dùng của phiên | "Phương thức xác thực không hợp lệ." |
| 2 | `code` | Mã xác thực một lần | chưa có key JA | text | có | chỉ UI | chưa có — đề xuất: chỉ chữ số, độ dài do provider quy định (khối `[auth.mfa.phone]` có `otp_length` ở `supabase/config.toml:309`; TOTP thì provider cố định) | chưa có — đề xuất: để provider xác thực, không tự so sánh ở tầng app | "Mã không đúng hoặc đã hết hiệu lực." |
| 3 | `rememberDevice` | Ghi nhớ thiết bị này | chưa có key JA | checkbox | không | chỉ UI | chưa có — đề xuất | chưa có — đề xuất: thời hạn ghi nhớ lấy từ cấu hình server, không nhận từ client | — |

### 3.2 Thiết lập bảo mật của tài khoản

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 4 | `mfaStatus` | Trạng thái MFA | chưa có key JA | read-only | — | dẫn xuất — số yếu tố đã đăng ký của phiên | — | — | — |
| 5 | `currentPassword` | Mật khẩu hiện tại | chưa có key JA | password | có | chỉ UI | chưa có — đề xuất: không rỗng | chưa có — đề xuất: xác thực lại trước mọi thay đổi yếu tố | "Xác thực lại không thành công." |
| 6 | `enrollMethod` | Đăng ký phương thức mới | chưa có key JA | select | có | chỉ UI | chưa có — đề xuất: chỉ liệt phương thức đang bật ở cấu hình | chưa có — đề xuất: từ chối phương thức chưa bật | "Phương thức này chưa được bật." |
| 7 | `recoveryStatus` | Mã dự phòng | chưa có key JA | read-only | — | dẫn xuất — còn hay hết, **không hiển thị nội dung** | — | — | — |
| 8 | `sessionPolicy` | Chính sách phiên | chưa có key JA | read-only | — | dẫn xuất — cấu hình timeout của provider | — | — | — |
| 9 | `lockoutState` | Trạng thái khóa tạm | chưa có key JA | read-only | — | `app_user.failed_login_count`, `app_user.locked_until` | — | — | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Chưa đăng ký yếu tố nào | Lời mời đăng ký, không có ô nhập mã | Đăng ký yếu tố |
| đang tải | Đang đọc danh sách yếu tố của phiên | Skeleton | — |
| lỗi tải | Provider không trả lời | Thông báo lỗi + nút thử lại | Thử lại, đăng xuất |
| không có quyền | Vai trò không thuộc diện bắt buộc MFA | **404** | — |
| đang gửi | Đã bấm xác thực hoặc đăng ký | Nút disabled, spinner | — |
| gửi lỗi | Mã sai, hết hiệu lực, hoặc provider từ chối | Lỗi tại field, giữ nguyên form | Nhập lại |
| bị khóa tạm | `app_user.locked_until` còn hiệu lực | Còn bao lâu mới thử lại được | Chỉ đăng xuất |
| chờ nâng mức phiên | Mật khẩu đúng, MFA chưa xong | Chặn mọi route nghiệp vụ | Chỉ hoàn tất MFA hoặc đăng xuất |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | Có | 3.1 + 3.2 của chính mình | Xác thực, đăng ký, thay yếu tố | 404 |
| ROLE-RULE-ADMIN | Có, nếu thuộc diện bắt buộc | 3.1 + 3.2 của chính mình | Như trên | 404 |
| ROLE-SETTLEMENT | Có, nếu thuộc diện bắt buộc | 3.1 + 3.2 của chính mình | Như trên | 404 |
| 4 vai trò còn lại | Không, theo thiết kế hiện tại | — | — | 404 |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (`FR-601`, có chủ đích —
`supabase/migrations/20260904090900_rls_core.sql:28-32`). Màn này **không** được xây trên giả định
RLS che dữ liệu: mọi field ở 3.2 thuộc **chính phiên đang đăng nhập**, lấy từ provider, không phải
truy vấn `app_user` của người khác.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Xác thực yếu tố | đề xuất `POST /api/auth/mfa/verify` | `app_user` — reset bộ đếm sai | đề xuất `mfa_verified` | 401 mã sai · 423 đang khóa tạm · 429 thử quá nhiều |
| Đăng ký yếu tố mới | đề xuất `POST /api/auth/mfa/enroll` | — (yếu tố do provider giữ) | đề xuất `mfa_enrolled` | 401 xác thực lại thất bại · 409 vượt số yếu tố cho phép |
| Huỷ một yếu tố | đề xuất `DELETE /api/auth/mfa/factors/{id}` | — | đề xuất `mfa_unenrolled` | 401 · 409 nếu là yếu tố cuối của tài khoản bắt buộc MFA |
| Đếm lần sai và khóa tạm | đã có — luồng SC-01 | `app_user.failed_login_count`, `locked_until` | đã có `login_failed`, `login_locked` | 423 |

## 7. Edge case

- **Tài khoản thuộc diện bắt buộc nhưng chưa đăng ký yếu tố nào.** Phải chặn ở bước nâng mức phiên,
  không cho đi tiếp bằng mật khẩu — bỏ chỗ này thì `NFR-SEC-01` chỉ còn là hình thức.
- **Vai trò bị đổi giữa phiên** (từ SC-04) sang một vai trò bắt buộc MFA → phiên hiện tại thành
  chưa đủ mức, lần điều hướng tiếp theo phải quay về màn này.
- **Huỷ yếu tố cuối** khi tài khoản vẫn thuộc diện bắt buộc → 409, không cho tài khoản tự hạ mức.
- **Khóa tạm đang đếm theo số lần sai liên tiếp, không phải cửa sổ trượt thật** — hạn chế đã ghi ở
  `../../pham-vi-va-phan-mock.md:167-171`. MFA sinh ra loại "sai" thứ hai là sai mã; phải chốt hai
  loại dùng chung một bộ đếm hay tách.
- **Session timeout đang tắt** (`supabase/config.toml:271-275`, khối `[auth.sessions]` bị comment)
  → phần timeout của `NFR-SEC-03` chưa thoả, kể cả sau khi bật MFA.
- **Log hành vi bất thường hiện chỉ có `login_failed`/`login_locked`**
  (`../../pham-vi-va-phan-mock.md:77`); các event MFA mới phải ghi vào cùng `audit_log`.

## 8. Dẫn chứng

- `../../pham-vi-va-phan-mock.md:75` — lý do hoãn `FE-002`/`NFR-SEC-01`, bản đã sửa.
- `../../pham-vi-va-phan-mock.md:77` — `FE-004`/`NFR-SEC-03` đang ở trạng thái **MỘT PHẦN**.
- `supabase/config.toml:296,301-303` — khối `[auth.mfa]`/`[auth.mfa.totp]` có sẵn nhưng
  `enroll_enabled` và `verify_enabled` đang `false`; dòng 295 ghi MFA thuộc gói Supabase Pro.
- `supabase/config.toml:271-275` — `[auth.sessions]` bị comment, timeout chưa bật.
- `src/lib/auth/lockout.ts:5-19` — khóa tạm 5 lần sai / 15 phút, kèm ghi chú RFP không định lượng.
- `src/lib/auth/require-role.ts:66-78` — cơ chế trả 404 thay vì 403.
- `src/app/api/auth/sign-in/route.ts:63,86,126` — `login_locked`, `login_failed`, `login_success`.
- `src/lib/i18n/dictionaries/ja/` — 10 namespace, không có namespace bảo mật/tài khoản → mọi nhãn
  JA ở mục 3 là `chưa có key JA`.

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Hạ tầng | **MFA provider**: bật `[auth.mfa.totp]` của Supabase Auth. `supabase/config.toml:295` ghi MFA thuộc **gói Pro** → có thể phát sinh nâng gói, không chỉ là bật một cờ | Hạng mục chi phí, LAB-5 phải tính |
| Hạ tầng | Bật `[auth.sessions]` (timebox + inactivity timeout) để thoả `NFR-SEC-03` | Đang comment, không phải chưa có |
| Bảng/cột | Cách đánh dấu tài khoản thuộc diện bắt buộc MFA: thêm cột trên `app_user`, hoặc suy ra từ `role` qua một bảng ánh xạ vai trò → mức bảo mật | Nếu suy từ `role` thì không cần cột mới — chốt ở ADR |
| Bảng/cột | Bộ đếm sai riêng cho bước MFA, nếu chốt tách khỏi `failed_login_count` | Xem edge case |
| Màn/API phụ thuộc | SC-01 phải thêm bước nâng mức phiên; SC-03/SC-04 phải hiển thị được trạng thái MFA của từng tài khoản | |
| Tài liệu | Tài liệu bảo mật nội bộ (không public): chính sách khoá, luồng khôi phục khi mất thiết bị, quy trình cấp lại | Cố ý không viết ở đây |

### Giả định cần chốt

| # | Giả định | Ảnh hưởng nếu sai | Nơi phải sửa |
|---|---|---|---|
| 1 | Diện bắt buộc MFA = ROLE-SYS-ADMIN + ROLE-RULE-ADMIN + ROLE-SETTLEMENT. `NFR-SEC-01` chỉ nói "quản trị và role phê duyệt nội bộ", không liệt vai trò | Thiếu vai trò thì không thoả `NFR-SEC-01`; thừa vai trò thì cản trở vận hành hiện trường | Mục 2, mục 5, bảng ánh xạ vai trò → mức bảo mật |
| 2 | Ngưỡng khóa tạm **5 lần sai / 15 phút** là mặc định prototype, **RFP không định lượng** (`src/lib/auth/lockout.ts:5-9`) | Khách chốt số khác thì phải sửa hai hằng số và cả thông báo lỗi | `src/lib/auth/lockout.ts:10-11` |
| 3 | Thời lượng timeout phiên và thời hạn "ghi nhớ thiết bị" — RFP chỉ nói phải có timeout | Quá dài thì hở bảo mật; quá ngắn thì bị đăng xuất giữa khung giờ nghiệp vụ 02:00–10:00 JST (`NFR-AVL-01`) | `supabase/config.toml` khối `[auth.sessions]`, field #3 |
| 4 | Bộ đếm sai của MFA dùng chung với bộ đếm sai mật khẩu | Dùng chung thì kẻ biết mật khẩu vẫn khoá được tài khoản nạn nhân bằng mã sai | Mục 6, `src/lib/auth/lockout.ts` |
| 5 | Số lượng và cách phát mã dự phòng — cố ý không ghi con số trong tài liệu public này | Không chốt thì người dùng mất thiết bị là mất truy cập | Tài liệu bảo mật nội bộ |
