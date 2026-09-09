# ADR-009 — Trả 404 thay vì 403 khi thiếu quyền vào trang

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | Đã áp dụng |
| Phạm vi ảnh hưởng | `requireRole()` / `requireUser()` / `getCurrentUser()`; đầu mọi Server Component và Route Handler có giới hạn vai trò; toàn bộ 20 màn đã dựng |

## Bối cảnh

20 màn, mỗi màn giới hạn theo vai trò. Một vai trò không có quyền mở màn thì hệ
thống trả gì?

`403` là mã đúng về mặt HTTP, nhưng bản thân nó là thông tin: `ROLE-DELIVERY` thử
`/reports/RPT-06` mà nhận 403 là biết báo cáo kế toán tồn tại và có người xem
được. Ghép vài chục lần thử như thế lại là dựng được bản đồ phân quyền từ bên
ngoài, không cần đăng nhập đúng vai.

## Lựa chọn

`requireRole()` gọi `notFound()` → **404**, cùng trang như một route không tồn tại.
Vai trò sai và URL sai trả về đúng một thứ, không phân biệt được.

Chặn ở **tầng ứng dụng**, gọi ở đầu **cả** Server Component **và** Route Handler —
không phải RLS. RLS vẫn là tầng riêng bảo vệ dữ liệu; ADR này nói về *trang*.

Cùng khuôn với `getCurrentUser()`: policy `read_all_active_users` đòi dòng của
chính người gọi phải `is_active = true` trước khi bất kỳ select nào chạy, nên tài
khoản inactive select ra rỗng y như "không có dòng" — fail closed cả hai đường,
không đoán xem là trường hợp nào.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Trả `403` kèm trang "Bạn không có quyền" | Rò rỉ sự tồn tại của tài nguyên theo vai trò. Ghép nhiều 403 với 404 lại là dựng được ma trận phân quyền từ ngoài |
| Chỉ ẩn menu/link, không chặn route | Soft guard: biết URL là vào được. `require-role.ts:69-70` ghi thẳng "guarding only the UI is a soft guard" |
| Chặn bằng RLS thay cho route guard | RLS lọc **dòng**, không chặn **trang**: màn không có dữ liệu sẽ render rỗng chứ không 404, và `service_role` bỏ qua RLS. Cùng mạch với ADR-004 nhưng ngược chiều — ở đó trigger mạnh hơn RLS, ở đây route guard đúng tầng hơn RLS |
| Redirect về dashboard của vai trò | Êm hơn cho người dùng, nhưng vẫn phân biệt được "route tồn tại" (bị redirect) với "route không tồn tại" (404) — vẫn rò rỉ đúng thứ cần che |
| Chỉ chặn ở Server Component, không chặn Route Handler | API gọi trực tiếp được, bỏ qua toàn bộ UI. Nửa cái guard |

## Hệ quả

**Chấp nhận được:** không rò rỉ sự tồn tại của màn theo vai trò; một mặt phẳng trả
về duy nhất cho cả hai loại lỗi. Cùng một nguyên tắc fail-closed áp cho cả session
không hợp lệ, tài khoản inactive, và vai trò sai — không có nhánh nào "đoán rồi mở
rộng quyền".

**Phải chịu:** người dùng hợp lệ bị nhầm là "trang không tồn tại". Họ sẽ báo "hệ
thống lỗi" chứ không báo "tôi thiếu quyền", và người hỗ trợ phải tự đoán ra đó là
vấn đề vai trò. Nặng hơn: log phải phân biệt được 404-thật với 404-vì-quyền, mà
hiện `notFound()` **không ghi audit gì cả** — nghĩa là không có vết nào để phân
biệt, kể cả khi cần điều tra một chuỗi thử URL. Và SC-30 (tra cứu audit log) ngoài
phạm vi nên cũng chưa có chỗ để tra. `getCurrentUser()` cũng nuốt luôn khác biệt
giữa "tài khoản bị vô hiệu hoá" và "không có dòng" — đúng chủ đích, nhưng người
dùng bị vô hiệu hoá chỉ thấy `/login?reason=inactive` mà không biết vì sao.

## Dẫn chứng

- `src/lib/auth/require-role.ts:66-77` — `requireRole()` gọi `notFound()`; "404s rather than showing a 'forbidden' page, so an unauthorized role gets no signal about what exists behind the guard"
- `src/lib/auth/require-role.ts:69-70` — "Call this at the top of both Server Components AND Route Handlers -- guarding only the UI is a soft guard"
- `src/lib/auth/require-role.ts:75` — `notFound()`, không kèm ghi audit nào
- `src/lib/auth/require-role.ts:20-24` — `read_all_active_users` làm tài khoản inactive select ra rỗng y như "không có dòng"; "fail closed either way, never widen access by guessing which case it was"
- `src/lib/auth/require-role.ts:57-64` — `requireUser()` redirect `/login?reason=inactive`
- RFP `§02-08` — nguyên tắc phân tách trách nhiệm và truy vết cho thao tác nhạy cảm
