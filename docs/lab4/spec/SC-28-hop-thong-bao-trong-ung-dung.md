# SC-28 — Hộp thông báo trong ứng dụng

| | |
|---|---|
| Mã thi công | — (chưa dựng) |
| Route | — (đề xuất `/notifications`, kèm badge đếm chưa đọc trên top header) |
| Loại | List |
| Actor chính | Toàn bộ người dùng nội bộ (7 vai trò) |
| FE- / FR- | FE-038, FE-039 / `FR-NOTIFY-01`, `FR-NOTIFY-02` (P1) |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

**Lý do ngoài phạm vi — chép từ `../../pham-vi-va-phan-mock.md:82`:** `FR-NOTIFY-01..03` (P1, thông
báo) — **NGOÀI PHẠM VI**: "Cần hạ tầng email/queue ngoài phạm vi 11h."

## 1. Mục đích

Cho mỗi người dùng nội bộ một hộp thông báo trong ứng dụng, để các việc cần xử lý tự tìm đến người
phụ trách thay vì phải gọi điện — đúng lý do `FR-NOTIFY-01` nêu ("giảm phụ thuộc vào điện thoại").
Bốn nhóm event thuộc phạm vi cơ bản mà RFP liệt: profile sắp hết hiệu lực, tranh chấp đang mở, lỗi
xuất dữ liệu, giao hàng bị ùn tắc. **SMS và FAX không thuộc kênh thông báo** (`FR-NOTIFY-01`).

## 2. Điều kiện vào màn

- Đăng nhập: **bắt buộc**.
- Vai trò được vào: **cả 7 vai trò** — mỗi người chỉ thấy thông báo gửi cho mình hoặc cho vai trò
  của mình. Đây là một trong ít màn không giới hạn vai trò.
- Mã lỗi khi thiếu quyền: **404** khi mở thẳng một thông báo không thuộc người dùng (không phải 403
  — có chủ đích, không lộ sự tồn tại tài nguyên).
- Tiền đề dữ liệu: không có. Hộp rỗng là trạng thái hợp lệ.

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `severity` | Mức độ | chưa có key JA | badge (cột) | — | `notification.severity` — **bảng chưa có** | — | chưa có — đề xuất: CHECK `critical` / `thường` (`FR-NOTIFY-02` chỉ định nghĩa phân loại Critical) | — |
| 2 | `eventType` | Loại event | chưa có key JA | badge (cột) | — | `notification.event_type` — **bảng chưa có** | — | chưa có — đề xuất: CHECK theo danh sách 4 nhóm của `FR-NOTIFY-01` | — |
| 3 | `title` | Tiêu đề | chưa có key JA | text (cột) | — | `notification.title` — **bảng chưa có** | — | chưa có — đề xuất: không rỗng | — |
| 4 | `body` | Nội dung | chưa có key JA | text | — | `notification.body` — **bảng chưa có** | — | chưa có — đề xuất | — |
| 5 | `entityLink` | Liên kết đối tượng | chưa có key JA | link (cột) | — | dẫn xuất — `notification.entity` + `entity_id`, cùng khuôn `audit_log` | chưa có — đề xuất: chỉ điều hướng nội bộ, không nhận URL từ dữ liệu | chưa có — đề xuất: dựng URL ở server từ `entity`, không lưu URL thô | — |
| 6 | `createdAt` | Thời điểm | chưa có key JA | datetime (cột) | — | `notification.created_at` — **bảng chưa có** | — | — | — |
| 7 | `readAt` | Đã đọc | chưa có key JA | badge (cột) | — | `notification.read_at` — **bảng chưa có** | — | chưa có — đề xuất: chỉ chủ sở hữu đặt được | — |
| 8 | `deliveryState` | Kết quả gửi | chưa có key JA | badge (cột) | — | dẫn xuất — `notification_delivery`: kênh, kết quả, số lần thử (`FR-NOTIFY-01` nghiệm thu) | — | — | — |
| 9 | `filterUnread` | Chỉ chưa đọc | chưa có key JA | checkbox | không | chỉ UI | chưa có — đề xuất | chưa có — đề xuất | — |
| 10 | `filterSeverity` | Lọc theo mức độ | chưa có key JA | select | không | chỉ UI | chưa có — đề xuất: `tất cả` / `critical` / `thường` | chưa có — đề xuất: giá trị lạ thì bỏ qua bộ lọc | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Không có thông báo nào cho người dùng | "Không có thông báo" | — |
| đang tải | Đang đọc `notification` | Skeleton danh sách | — |
| lỗi tải | Truy vấn thất bại | Thông báo lỗi + nút thử lại | Thử lại |
| không có quyền | Mở thẳng một thông báo của người khác | **404** | — |
| đang gửi | Đang đánh dấu đã đọc | Dòng đó disabled | — |
| gửi lỗi | Ghi `read_at` thất bại | Toast lỗi, giữ nguyên trạng thái chưa đọc | Thử lại |
| gửi ngoài thất bại | `notification_delivery` còn dòng thất bại sau khi hết số lần retry | Nhãn "gửi email thất bại" trên dòng thông báo | Xem chi tiết log gửi |

Màn này **không** chạm bảng bị lock ngày → không có dòng `read-only vì ngày đã lock`, không 423.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| Cả 7 vai trò | Có | Thông báo của **chính mình** hoặc của vai trò mình giữ | Đọc, đánh dấu đã đọc, mở đối tượng liên quan | 404 khi mở thông báo của người khác |
| ROLE-SYS-ADMIN | Có | Thêm cột `deliveryState` chi tiết (log gửi) | Như trên | — |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (`FR-601`, có chủ đích —
`supabase/migrations/20260904090900_rls_core.sql:28-32`). Nếu bảng `notification` dùng chung khuôn
policy `read_all_active_users` thì **mọi người đọc được thông báo của mọi người**. Thông báo mang
nội dung nhắm đích ("profile X sắp hết hiệu lực", "tranh chấp Y đang mở") nên đây là bảng đầu tiên
trong hệ **không nên** theo khuôn đọc rộng — cần policy theo `recipient_id`. Xem mục 9.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Mở danh sách | đề xuất `GET /api/notifications` | — | không ghi audit (đọc thuần) | 401 |
| Đánh dấu đã đọc | đề xuất `PATCH /api/notifications/{id}/read` | `notification.read_at` | không cần audit (không phải thay đổi nghiệp vụ) | 404 nếu không thuộc người dùng |
| Đánh dấu tất cả đã đọc | đề xuất `POST /api/notifications/read-all` | `notification.read_at` nhiều dòng | — | 401 |
| Mở đối tượng liên quan | — (điều hướng) | — | — | 404 nếu đối tượng đã bị xoá |
| Sinh thông báo | **không phải hành động của màn này** — do nguồn event gọi | `notification`, `notification_delivery` | đề xuất `notification_created` | phụ thuộc phương án ở mục 9 |

## 7. Edge case

- **Nguồn event chưa tồn tại.** Ba trong bốn nhóm event của `FR-NOTIFY-01` phụ thuộc màn chưa dựng:
  profile sắp hết hiệu lực → SC-07 (`FR-PARTY-03`), tranh chấp đang mở → SC-19 (`FR-SETTLE-03`,
  hiện **không có bảng tranh chấp** — `../../pham-vi-va-phan-mock.md:112-115`), giao hàng ùn tắc →
  SC-17 (`FR-DEL-03`, hiện **không đường ghi nào đặt được** `delivery.status='ngoại lệ'`,
  `../../pham-vi-va-phan-mock.md:106-112`). Chỉ "lỗi xuất dữ liệu" có nguồn thật
  (`accounting_export_batch`, `RPT-06`). Dựng SC-28 trước ba màn kia là dựng một hộp gần như rỗng.
- **Không có hạ tầng queue trong stack hiện tại.** Engine 完納奨励金 đã phải chạy **đồng bộ ngay
  trong request** vì lý do này (`../../pham-vi-va-phan-mock.md:148-151`). Sinh thông báo cũng vướng
  cùng rào: hoặc chạy đồng bộ trong request nghiệp vụ (làm request chậm thêm), hoặc thêm hạ tầng.
- **`FR-NOTIFY-02` đòi Critical gửi xong trong 5 phút.** Với in-app thuần, "gửi xong" chỉ có nghĩa
  nếu dòng `notification` được insert đồng bộ; phần email thì không có gì bảo đảm 5 phút mà không
  có queue + retry đúng nghĩa.
- **Retry email tối đa 3 lần** (`FR-NOTIFY-02`) và "vẫn thất bại thì đưa vào queue cảnh báo vận
  hành" — nghĩa là cần **hai** queue: queue gửi và queue cảnh báo. Không có cái nào hiện tại.
- **Không có transaction xuyên bảng** (`../../pham-vi-va-phan-mock.md:152-159`). Insert
  `notification` rồi insert `notification_delivery` có thể lệch; nếu để việc sinh thông báo cùng
  request với ghi nghiệp vụ thì thông báo thất bại **không được** làm rollback ghi nghiệp vụ.
- **Đối tượng bị xoá hoặc mất hiệu lực sau khi thông báo đã gửi** → liên kết dẫn tới 404. Thông báo
  phải chịu được ca này, không hiện lỗi kỹ thuật.
- **Thông báo trùng.** Một profile sắp hết hiệu lực bị quét mỗi ngày sẽ sinh thông báo mỗi ngày —
  cần khoá chống trùng theo (`recipient`, `event_type`, `entity_id`, chu kỳ).

## 8. Dẫn chứng

- RFP `FR-NOTIFY-01` (§07-04) — in-app + email, 4 nhóm event, SMS/FAX không thuộc kênh, nghiệm thu
  "log gửi thể hiện kênh, người nhận, kết quả và số lần thử".
- RFP `FR-NOTIFY-02` (§07-04) — Critical gửi xong trong **5 phút**, email retry tối đa **3 lần**,
  thất bại sau retry thì vào queue cảnh báo vận hành.
- RFP `NFR-OPS-01` (§09-01) — hệ thống phải giám sát được lỗi gửi thông báo.
- `../../pham-vi-va-phan-mock.md:82` — lý do ngoài phạm vi.
- `../../pham-vi-va-phan-mock.md:148-151` — không có queue: engine incentive chạy đồng bộ trong
  request.
- `../../pham-vi-va-phan-mock.md:106-115` — SC-17 và SC-19 không dựng được vì thiếu nguồn dữ liệu.
- `supabase/migrations/20260904090000_core_identity.sql:26-40` — khuôn `entity`/`entity_id` của
  `audit_log`, dùng lại cho `notification`.
- `src/components/layout/top-header.tsx:39-71` — top header hiện có sẵn chỗ đặt badge, cạnh
  `BusinessDayIndicator`.
- `package.json:14-21` — 6 dependency, không có client email, không có client queue.
- `src/lib/i18n/dictionaries/ja/` — không có namespace thông báo → nhãn JA chưa có.

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | **`notification` — chưa có.** Đề xuất: `id` uuid pk · `recipient_id` uuid → `app_user(id)` · `recipient_role` text (gửi theo vai trò) · `event_type` text not null CHECK theo 4 nhóm `FR-NOTIFY-01` · `severity` text not null CHECK (`critical`, `thường`) · `title` text not null · `body` text · `entity` text · `entity_id` text · `read_at` timestamptz · `created_at` timestamptz not null default now() · index theo (`recipient_id`, `read_at`) | Cho phép **hoặc** `recipient_id` **hoặc** `recipient_role`, không cả hai rỗng |
| Bảng/cột | **`notification_delivery` — chưa có.** `notification_id` · `channel` text CHECK (`in_app`, `email`) · `result` text · `attempt_count` integer · `last_attempt_at` · `final_state` — đúng nghiệm thu `FR-NOTIFY-01` (kênh, người nhận, kết quả, số lần thử) | Append-only cho từng lần thử, hoặc một dòng có bộ đếm — chốt ở ADR |
| Hạ tầng | **Xem hai phương án bên dưới. Chưa quyết.** | |
| Bảo mật | Policy RLS theo `recipient_id`/`recipient_role`, **không** dùng khuôn `read_all_active_users` | Xem mục 5 |
| Màn/API phụ thuộc | SC-07, SC-17, SC-19 để có nguồn event thật; SC-29 để có cấu hình người nhận/ngưỡng; SC-32 (thông báo sinh khi offline) | Xem edge case đầu mục 7 |

### Hai phương án hạ tầng — cần ADR, spec này không tự quyết

| | (a) In-app polling, không cần hạ tầng ngoài | (b) Email + queue thật |
|---|---|---|
| Cách làm | Bảng `notification` + client poll định kỳ hoặc Supabase Realtime; event sinh đồng bộ ngay trong request nghiệp vụ, cùng cách engine incentive đang làm | Provider email + queue/scheduler ngoài (worker riêng hoặc cron của một dịch vụ thứ ba) |
| Thoả `FR-NOTIFY-01` | **Một nửa** — có in-app, **không có email**. RFP đòi cả hai kênh | Đủ hai kênh |
| Thoả `FR-NOTIFY-02` | Không chứng minh được "Critical trong 5 phút" cho email; không có retry 3 lần; không có queue cảnh báo vận hành | Đủ, nếu queue có retry và dead-letter |
| Chi phí kỹ thuật | Gần bằng 0 — nằm trong Vercel + Supabase hiện tại | Thêm ít nhất một service, một khoản chi phí, một điểm hỏng mới, và phần giám sát của `NFR-OPS-01` |
| Ảnh hưởng hiệu năng | Event sinh đồng bộ làm request nghiệp vụ chậm thêm; polling tạo tải đọc đều đặn | Request nghiệp vụ chỉ đẩy vào queue, nhanh hơn |
| Rủi ro | Khách nhận một màn "đã có thông báo" nhưng thiếu hẳn kênh email — đúng loại lỗi niềm tin mà `../../pham-vi-va-phan-mock.md:116-124` đã quyết định tránh ở `RPT-04` | Vượt ngân sách; kéo theo `NFR-OPS-01` (alert lỗi gửi) thành hạng mục riêng |

**Quyết định này thuộc ADR, không thuộc spec.** Nó đổi cả kiến trúc (có hay không có worker ngoài
Vercel) và cả phạm vi nghiệm thu (`FR-NOTIFY-01` có được coi là thoả khi thiếu email hay không).

### Giả định cần chốt

| # | Giả định | Ảnh hưởng nếu sai | Nơi phải sửa |
|---|---|---|---|
| 1 | Danh sách `event_type` đúng bằng 4 nhóm `FR-NOTIFY-01` liệt kê. RFP nói "như:" — tức là ví dụ, không phải danh sách đóng | Thiếu nhóm thì phải sửa CHECK và migrate dữ liệu đã có | Field #2, DDL `notification` |
| 2 | Chu kỳ polling của phương án (a) — RFP không nói. `FR-NOTIFY-02` chỉ ràng buộc 5 phút cho Critical | Quá dày thì tốn tải đọc, quá thưa thì vỡ mốc 5 phút | Client poll, mục 9 phương án (a) |
| 3 | Thời hạn lưu thông báo trong hộp và số dòng mỗi trang — RFP không nói. `DR-RET-01` nói dữ liệu nghiệp vụ online 7 năm nhưng không xếp thông báo vào diện nào | Không dọn thì bảng chỉ tăng; dọn sai thì mất vết gửi mà `FR-NOTIFY-03` đòi giữ | DDL, quy trình vận hành |
| 4 | Gửi theo **vai trò** là đủ cho phần lớn event, không cần chọn từng người | Nếu khách muốn chỉ định đích danh từng người thì `recipient_role` không đủ và SC-29 phải phức tạp hơn | Cột `recipient_role`, SC-29 |
| 5 | "Đã đọc" là trạng thái theo từng người nhận | Nếu một thông báo gửi cho cả vai trò và cần biết ai đã đọc thì phải tách bảng `notification_read` theo người | Field #7, DDL |
