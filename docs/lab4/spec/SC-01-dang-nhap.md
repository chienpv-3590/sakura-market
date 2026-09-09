# SC-01 — Đăng nhập

| | |
|---|---|
| Mã thi công | SCR001_Login |
| Route | `/login` |
| Loại | Form |
| Actor chính | Toàn bộ người dùng nội bộ — 9 tài khoản / 7 vai trò |
| FE- / FR- | FE-001 / PERM001, NFR-SEC-03 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Cổng duy nhất vào hệ thống. Đây là màn duy nhất đứng **trước** cả hai tầng gate: Tầng 1 (proxy kiểm
session) và Tầng 2 (`requireUser()` kiểm `app_user.is_active`). Đăng nhập xong, người dùng được đẩy
thẳng tới màn nghiệp vụ của vai trò mình, không qua trang trung gian.

## 2. Điều kiện vào màn

- **Đăng nhập**: không — `/login` nằm trong `isPublicPath` cùng `/api/auth/*` (`src/lib/supabase/proxy.ts:39`)
- **Vai trò được vào**: tất cả, kể cả khách chưa có session
- **Đã đăng nhập rồi**: `redirect(roleLanding(user.role))` chạy trước khi form render (`src/app/(auth)/login/page.tsx:23-25`), tránh vòng lặp `/login` ↔ landing
- **Mã lỗi khi thiếu quyền**: không áp dụng — màn công khai. Quy tắc **404** (`notFound()`, không phải 403) chỉ áp cho màn có `requireRole` (`src/lib/auth/require-role.ts:72-77`)
- **Tiền đề dữ liệu**: có hàng trong `public.app_user` với `is_active = true` và `role` thuộc 7 giá trị CHECK (`supabase/migrations/20260904090000_core_identity.sql:11-17`)

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `email` | Email | メールアドレス | text (`type="email"`) | Có | `app_user.email` — `text not null unique` (`core_identity.sql:10`) | `required` + `type="email"` của trình duyệt (`src/components/auth/login-form.tsx:73-74`) | `typeof === "string"` và khớp regex `[^\s@]+@[^\s@]+\.[^\s@]+`; sau đó `.trim().toLowerCase()` (`src/app/api/auth/sign-in/route.ts:10,38-46`) | `auth.login.error.invalidRequest` — "Vui lòng nhập email và mật khẩu hợp lệ." (`vi/common.json:42`, `ja/common.json:42`) · HTTP **400** `invalid_request` |
| 2 | `password` | Mật khẩu | パスワード | text (`type="password"`) | Có | Chỉ UI — `public.app_user` không có cột mật khẩu; hash nằm ở `auth.users` của Supabase Auth | `required` + `autoComplete="current-password"` (`login-form.tsx:87-93`) | `typeof === "string"` và chặn `password.length === 0` (`sign-in/route.ts:38-45`). Độ dài tối thiểu / độ mạnh: **chưa có — đề xuất** | Sai mật khẩu → `auth.login.error.invalidCredentials` (`vi/common.json:41`) · HTTP **401** `invalid_credentials` |
| 3 | `reason` (query param) | — (không có nhãn; chỉ chọn câu lỗi hiển thị) | — | text trên URL `?reason=` | Không | Chỉ UI — proxy gắn `unauthenticated` (`proxy.ts:44`), `requireUser()` gắn `inactive` (`require-role.ts:61`) | Chỉ so `reason === "inactive"` (`login-form.tsx:24`). Giá trị `unauthenticated` **không có nhánh nào** → vào màn im lặng. **Lệch — xem mục 7** | Không có — field chỉ đọc, không gửi lên server | `auth.login.reason.inactive` — "Tài khoản của bạn đã bị vô hiệu hoá, vui lòng liên hệ quản trị viên." (`vi/common.json:44`) |

Nhãn nút: `auth.login.submit` "Đăng nhập" / ログイン · `auth.login.submitting` "Đang đăng nhập..." /
ログイン中... (`vi/common.json:39-40`, `ja/common.json:39-40`).

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng (mặc định) | Không session, không `?reason` | 2 field trống, nút "Đăng nhập" | Nhập, submit |
| đang tải | Không áp dụng — server component chỉ đọc session, không query bảng nghiệp vụ | — | — |
| lỗi tải | `getCurrentUser()` throw khi query `app_user` lỗi (`require-role.ts:44-46`) | Rơi vào error boundary của Next — **chưa có UI riêng, đề xuất** | Tải lại trang |
| không có quyền | Không áp dụng — màn công khai | — | — |
| đang gửi | `submitting === true` | 2 input `disabled`, nút `aria-busy` + spinner + nhãn "Đang đăng nhập..." (`login-form.tsx:78,95,120-128`) | Không — submit thứ hai bị chặn ở `if (submitting) return` (`:30`) |
| gửi lỗi | `!response.ok` hoặc body thiếu `redirectTo` | Khối `role="alert"` `cds-alert--error`, 2 input `aria-invalid` (`login-form.tsx:79,96,100-119`) | Sửa và submit lại |
| bị khoá tạm | `locked_until > now()` | **Y hệt "gửi lỗi"** — body byte-identical với sai mật khẩu (`sign-in/route.ts:16-18,60-68`) | Chờ hết 15 phút |
| đã đăng nhập | Session hợp lệ + `is_active = true` | Không render form — redirect sang `roleLanding(role)` | — |
| read-only vì ngày đã lock | Không áp dụng — màn không chạm `transaction` / `seri_result` / `mekiki_record` / `delivery_shipment` | — | — |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| Chưa đăng nhập | ✓ | `email`, `password` | Đăng nhập | 400 / 401 / 403 — xem mục 6 |
| ROLE-INTAKE | ✓ rồi bị redirect ngay | — | — | Landing `/lots/new` (`role-landing.ts:25`) |
| ROLE-JUDGE | ✓ rồi bị redirect ngay | — | — | Landing `/lots` |
| ROLE-TRADE | ✓ rồi bị redirect ngay | — | — | Landing `/transactions` |
| ROLE-DELIVERY | ✓ rồi bị redirect ngay | — | — | Landing `/deliveries` |
| ROLE-SETTLEMENT | ✓ rồi bị redirect ngay | — | — | Landing `/reconciliation` |
| ROLE-RULE-ADMIN | ✓ rồi bị redirect ngay | — | — | Landing `/incentive/rules` |
| ROLE-SYS-ADMIN | ✓ rồi bị redirect ngay | — | — | Landing `/participants` (`role-landing.ts:31`) |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601,
`supabase/migrations/20260904090900_rls_core.sql:31-62`). Màn này không đọc bảng nghiệp vụ nào, nên
chặn ở đây là chặn **xác thực**, không phải chặn theo vai trò.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Đăng nhập | `POST /api/auth/sign-in` (`sign-in/route.ts:134`) | `app_user.failed_login_count`, `app_user.locked_until` qua `registerFailure`/`clearFailures` (`src/lib/auth/lockout.ts:34-41,45-52`) — dùng admin client vì chưa có session cho RLS xác thực | `login_success` · `login_failed` · `login_locked` · `login_inactive` (`sign-in/route.ts:63,85,101,126`) | **400** `invalid_json` / `invalid_request` · **401** `invalid_credentials` (sai mật khẩu, hoặc mật khẩu đúng nhưng `is_active = false`) · **403** `invalid_credentials` (đang bị khoá) · **500** `internal_error` |
| Đăng xuất | `POST /api/auth/sign-out` (`sign-out/route.ts:10`) | Không ghi bảng nghiệp vụ — chỉ xoá session cookie | `logout`, ghi **trước** `signOut()` vì sau đó không còn biết actor là ai (`sign-out/route.ts:8-9,21-26`) | **500** `internal_error` |

## 7. Edge case

- **Sai 5 lần liên tiếp → khoá tạm 15 phút.** `MAX_FAILED_ATTEMPTS = 5`,
  `LOCK_DURATION_MINUTES = 15` (`src/lib/auth/lockout.ts:10-11`). Cả hai là **mặc định prototype**,
  RFP chưa chốt số ở NFR-SEC-03 (`lockout.ts:5-9`) — khách chọn số khác thì chỉ hai hằng số này đổi.
- **Không có cửa sổ trượt 15 phút.** `app_user` không có cột timestamp cho từng lần sai, nên "5 lần
  sai trong 15 phút" bị xấp xỉ thành "5 lần sai liên tiếp kể từ lần đăng nhập thành công hoặc lần
  khoá gần nhất" (`lockout.ts:13-19`). Sai rải rác nhiều ngày sẽ **không** bị khoá.
- **Ba nhánh từ chối cùng body nhưng khác status.** Chủ ý ở `sign-in/route.ts:12-15` là không cho
  người ngoài dò email nào tồn tại, và body đúng là byte-identical. Nhưng **status thì lệch**: đang
  bị khoá trả **403** (`:67`), sai mật khẩu và tài khoản inactive trả **401** (`:90,105`). Ai đó vẫn
  phân biệt được "tài khoản này đang bị khoá" chỉ bằng mã HTTP. Task LAB-5: gộp về một mã.
- **`?reason=unauthenticated` không hiện thông báo gì.** Proxy gắn tham số này khi hết session
  (`proxy.ts:44`) nhưng `login-form.tsx:24` chỉ nhận `inactive`. Người bị đẩy về `/login` giữa lúc
  làm việc không biết vì sao. Chưa có key i18n cho trường hợp này → **đề xuất thêm**.
- **Email không tồn tại không tăng bộ đếm.** `registerFailure` chỉ chạy khi `appUser` khác null
  (`sign-in/route.ts:81-83`). Đúng ý — dò email lạ không tự khoá tài khoản thật — nhưng cũng có
  nghĩa là **chưa có rate-limit theo IP, đề xuất thêm**.
- **Quyền bị thu hồi giữa phiên**: `is_active` chuyển false → lần render `(app)/*` kế tiếp,
  `requireUser()` redirect về `/login?reason=inactive` (`require-role.ts:58-64`). Cookie session vẫn
  còn nhưng vô dụng, vì RLS `read_all_active_users` chặn cả select hàng của chính mình.
- **Chưa có MFA** — SC-02 chưa dựng; lý do hoãn xem `docs/pham-vi-va-phan-mock.md` § 2b.
- Bấm nút trước khi component hydrate: `<form method="post">` để trình duyệt fallback về native
  submit bằng POST, không để mật khẩu lọt vào URL / Referer / server log (`login-form.tsx:61-65`).

## 8. Dẫn chứng

- `src/app/(auth)/login/page.tsx:15-25` — đọc `searchParams` + session song song, redirect nếu đã đăng nhập
- `src/components/auth/login-form.tsx:9-16` — map error code → key i18n; code lạ rơi về `auth.login.error.network`
- `src/components/auth/login-form.tsx:47-53` — route handler set cookie trên chính response, rồi `router.push` + `router.refresh()`
- `src/app/api/auth/sign-in/route.ts:10,16-18,38-46,60-68,78-91,97-106` — regex email, `genericFailure`, ba nhánh từ chối
- `src/lib/auth/lockout.ts:10-19,26-42` — ngưỡng 5/15 và giới hạn của cách đếm
- `src/lib/auth/require-role.ts:29-47,58-64,72-77` — `getCurrentUser` fail-closed, `requireUser` redirect, `requireRole` 404
- `src/lib/auth/role-landing.ts:3-20,24-32` — 7 vai trò và landing của từng vai trò
- `src/lib/supabase/proxy.ts:39,41-54` — public path, redirect 307 khi không có session
- `src/proxy.ts:8-12` — matcher bao mọi request trừ static asset
- `supabase/migrations/20260904090000_core_identity.sql:7-21` — cột `app_user` gồm `failed_login_count`, `locked_until`
- `src/lib/i18n/dictionaries/vi/common.json:36-45` · `ja/common.json:36-45` — toàn bộ nhãn và câu lỗi
- `docs/generated/permissions-matrix.md:76-120` — PERM001, khớp code: 307 ở Tầng 1, 404 ở `requireRole`
- `docs/generated/screen-list.md:57` — mã SCR của màn này khớp cả hai hệ ("identical file:file mapping"); đây là màn duy nhất trong bộ 6 không lệch số SCR
