# ADR-014 — Siết quyền đọc dữ liệu nhạy: `FR-601` đá với §09-06 (APPI)

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | **Đề xuất** — hướng đã chốt, **vai trò được đọc còn `[CHƯA CHỐT]`** |
| Phạm vi ảnh hưởng | Policy `read_all_active_users` trên `app_user`, `audit_log`, `participant_status_history`, `lot_attachment` và `storage.objects` của bucket; bảng `app_user_permission_history` (đề xuất, chưa có); màn SC-03, SC-04, SC-30, SC-31 |

## Bối cảnh

Bốn spec màn chưa dựng đụng **cùng một xung đột**, mỗi bên để ngỏ một quyết định kiến
trúc và cùng đề nghị gộp về một ADR. Đây là bản đó.

**Xung đột giữa hai yêu cầu đều thật của khách:**

- **`FR-601`** — mọi vai trò đang hoạt động đọc được mọi bảng. Không phải sơ suất:
  `rls_core.sql:28-30` ghi thẳng lý do — "FR-601 (F007) requires other roles to at
  least have read-only visibility, and the LAB-7 reviewer accounts need to see the
  whole system end to end". Hiện có **16 policy `read_all_active_users` trong
  `rls_core.sql`**, cộng `lot_attachment` và `accounting_export_batch` — 18 bảng dùng
  chung một khuôn.
- **RFP §09-06 (dòng 881–888, APPI)** — dòng 886 đòi *"Cơ chế mã hóa, **kiểm soát truy
  cập theo vai trò (RBAC)** và log truy cập áp dụng cho thông tin cá nhân"*. Dòng 883
  định nghĩa phạm vi gồm thông tin đăng ký, hiệu lực 許可/承認, và lịch sử giao dịch gắn
  với cá nhân.

Ba mặt phơi:

| Mặt | Policy | Dữ liệu phơi |
|---|---|---|
| `app_user` + `participant_status_history` | `rls_core.sql:31-32`, `:37-38` | Email, vai trò, trạng thái khoá của **mọi** tài khoản |
| `audit_log` | `rls_core.sql:33-34` | Toàn bộ dấu vết thao tác; `before`/`after` là `jsonb` chứa cả bản ghi |
| `lot_attachment` + `storage.objects` | `lot_attachment.sql:35-36`, `:53-54` | Metadata và nội dung chứng từ tiếp nhận |

**Chỗ ADR-009 nối vào, và giới hạn của nó.** ADR-009 chọn trả 404 thay 403 để không lộ
sự tồn tại của tài nguyên. Nhưng 404 che **trang**, không che **dữ liệu**: một người
dùng đã đăng nhập với vai trò bất kỳ, gọi thẳng PostgREST bằng token hợp lệ, vẫn đọc
được cả ba mặt trên. `SC-03:78-80` khai đúng điều đó — *"404 ở tầng route là toàn bộ lớp
chắn của màn này"*. Điều này **không làm ADR-009 sai**; nó chỉ cho thấy 404 không phải
lớp chắn dữ liệu, và ai đọc ADR-009 rồi tưởng dữ liệu đã kín thì tưởng sai.

## Lựa chọn

**Siết theo bảng, chỉ cho ba mặt nhạy; giữ `FR-601` nguyên cho các bảng nghiệp vụ.**
`lot`, `transaction`, `seri_result`, `delivery`, `mekiki_record`… vẫn đọc rộng — chúng
là dữ liệu nghiệp vụ của chợ, không phải thông tin cá nhân theo nghĩa dòng 883, và
`FR-601` phục vụ đúng nhu cầu đối chiếu chéo ở đó.

Ba việc cụ thể:

1. Policy select riêng cho `app_user` và `participant_status_history` thay khuôn dùng
   chung. Bảng `app_user_permission_history` (SC-04 đề xuất, **chưa có**) **không được**
   dùng lại khuôn `read_all_active_users` — nếu dùng thì mọi vai trò đọc được toàn bộ
   lịch sử phân quyền.
2. Policy select riêng cho `audit_log`.
3. Siết `lot_attachment` **và** `storage.objects` của bucket **cùng lúc** — siết bảng mà
   để bucket mở là siết nửa vời.

**`[CHƯA CHỐT]` — vai trò nào được đọc.** `FR-AUDIT-02` nêu người đọc audit là "bộ phận
hành chính / kiểm toán nội bộ", **không khớp vai trò nào trong 7 vai trò
`TBL-ROLE-01`** (`SC-30:156-157`). Cơ chế thì chốt được vì §09-06 dòng 886 đòi RBAC
bằng chữ; nhưng *ai* thì phải chủ đầu tư quyết, và ADR này không tự chọn — cùng cách
ADR-007 khai `[CHƯA CHỐT]` cho đường gỡ tạm ngừng của 買出人.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Giữ `FR-601` nguyên cho cả 18 bảng | §09-06 dòng 886 đòi RBAC cho thông tin cá nhân **bằng chữ**, không phải khuyến nghị. Và mặt phơi nặng nhất không phải dữ liệu nghiệp vụ mà là `app_user`: email cộng trạng thái khoá của mọi tài khoản, đọc được bởi mọi vai trò |
| Siết theo **cột** (`email` chỉ `ROLE-SYS-ADMIN`) | RLS của Postgres lọc **dòng**, không lọc cột. Phải dùng column privileges (`grant select (cols)`) — một cơ chế khác, không đi qua `private.current_user_role()`, và PostgREST trả lỗi chứ không ẩn cột nên UI vỡ. Cũng không giải được `audit_log.before/after` là `jsonb` chứa cả bản ghi trong một cột |
| Thêm view lọc rồi cho đọc view thay bảng | View `security_invoker` vẫn chạy RLS của bảng nền nên không siết được gì; view `security_definer` siết được nhưng biến mỗi bảng thành hai đối tượng phải giữ đồng bộ. `reconciliation_line` đã chọn `security_invoker` có chủ đích để không leak (`reconciliation_view.sql:4-5`) — đi ngược khuôn đang có |
| Siết bằng `requireRole` ở tầng route, giữ RLS mở | Chính là hiện trạng, và ADR-009 đã cho thấy giới hạn: 404 che trang, không che dữ liệu khỏi ai gọi thẳng PostgREST với token hợp lệ |
| Thu hồi quyền `authenticated`, cho mọi truy vấn đi qua `service_role` ở server | Bỏ RLS làm lớp chắn hoàn toàn, dồn hết vào kỷ luật code — ngược hướng ADR-004 đã chọn, và mất luôn cả `security_invoker` của `reconciliation_line` |
| Tự chọn vai trò được đọc audit cho xong | `FR-AUDIT-02` nêu "bộ phận hành chính / kiểm toán nội bộ", không khớp vai trò nào trong `TBL-ROLE-01`. Chọn hộ khách một vai trò không có trong ma trận vai trò của khách là tự phát minh yêu cầu |

## Hệ quả

**Chấp nhận được:** §09-06 dòng 886 được đáp ứng ở đúng ba mặt mang thông tin cá nhân,
mà không phá `FR-601` ở nơi nó có ích. Bốn spec màn (SC-03, SC-04, SC-30, SC-31) có một
chỗ chung để dẫn tới thay vì mỗi bản để ngỏ một nửa. Và bảng lịch sử quyền mới được
chặn trước khi nó kịp thừa hưởng khuôn sai.

**Phải chịu:**

- **Siết đọc là đổi hành vi đã hứa với khách.** `FR-601` là một yêu cầu có thật, không
  phải sơ suất, và các vai trò khác đang dựa vào việc nhìn được dữ liệu ở mức chỉ-đọc
  để đối chiếu chéo. Nên đây là **đánh đổi giữa hai yêu cầu khách chống nhau**, không
  phải sửa lỗi — phải trình bày cho chủ đầu tư như một câu hỏi, không phải một bản vá
  lặng lẽ.
- **Đường review LAB-7 vỡ.** `rls_core.sql:30` nói thẳng tài khoản review cần thấy toàn
  hệ thống end-to-end. Siết là tài khoản đó không xem được hết nữa — phải cấp một vai
  trò review riêng, hoặc chấp nhận review hẹp hơn. Chưa quyết cái nào.
- **Mất tính "một khuôn cho tất cả".** 18 bảng đang dùng đúng một policy cùng tên; tách
  ba–bốn bảng ra là từ nay phải nhớ bảng nào theo khuôn nào. Đây là chỗ dễ sai khi thêm
  bảng mới, và không có gì ở tầng DB nhắc.
- **`storage.objects` là schema của Supabase**, không phải bảng của mình. Migration
  chạm vào policy ở đó rủi ro hơn, và nó phải đi cùng lượt với `lot_attachment`.
- **`[CHƯA CHỐT]` chặn thi công phần audit.** SC-30 không dựng được cho tới khi biết vai
  trò nào đọc `audit_log` — nên ADR này mở được ba mặt nhưng chỉ đóng được hai.
- **ADR-009 vẫn cần nhưng không giúp gì ở đây.** Hai lớp giải hai việc khác nhau; giữ cả
  hai, và đừng để ai đọc một bản rồi kết luận về bản kia.

## Dẫn chứng

- `supabase/migrations/20260904090900_rls_core.sql:28-30` — comment nêu `FR-601` và nhu cầu review LAB-7 là lý do đọc rộng
- `supabase/migrations/20260904090900_rls_core.sql:31-32` (`app_user`), `:33-34` (`audit_log`), `:37-38` (`participant_status_history`) — ba policy `read_all_active_users` của ba mặt nhạy; **16 policy cùng tên** trong file này
- `supabase/migrations/20260907090000_lot_attachment.sql:35-36` (bảng) và `:53-54` (`storage.objects` của bucket) — hai chỗ phải siết cùng lượt
- `supabase/migrations/20260904090800_reconciliation_view.sql:4-5` — `security_invoker = true` có chủ đích "otherwise it could leak rows the caller has no policy for": khuôn hiện có, phương án view đi ngược nó
- RFP dòng 881-888 — §09-06 APPI; **dòng 886** đòi kiểm soát truy cập theo vai trò (RBAC) và log truy cập cho thông tin cá nhân; dòng 883 định nghĩa phạm vi
- `docs/lab4/spec/SC-30-tra-cuu-audit-log.md:156-165` — giả định #1: hai yêu cầu đá nhau, "phải có ADR riêng, spec này không tự quyết"; `:157` — `FR-AUDIT-02` nêu vai trò không có trong `TBL-ROLE-01`
- `docs/lab4/spec/SC-31-quan-ly-file-dinh-kem.md:183-189` — giả định #3: cùng loại đánh đổi, "cần chung một ADR với SC-30"
- `docs/lab4/spec/SC-03-danh-sach-tai-khoan.md:76-80,134` — "404 ở tầng route là toàn bộ lớp chắn của màn này"; mục bảo mật đòi policy riêng cho `app_user`
- `docs/lab4/spec/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.md:85-87,144,147` — bảng `app_user_permission_history` đề xuất và cảnh báo không dùng lại khuôn `read_all_active_users`
- `docs/lab4/adr/ADR-009-tra-404-thay-vi-403-khi-thieu-quyen.md` — 404 che trang; ADR-014 là lớp che dữ liệu, hai việc khác nhau
