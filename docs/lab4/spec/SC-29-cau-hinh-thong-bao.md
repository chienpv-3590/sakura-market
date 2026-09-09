# SC-29 — Cấu hình thông báo

| | |
|---|---|
| Mã thi công | — (chưa dựng) |
| Route | — (đề xuất `/admin/notifications`) |
| Loại | Form |
| Actor chính | Quản trị vận hành — ánh xạ sang ROLE-SYS-ADMIN, xem giả định #1 |
| FE- / FR- | FE-040 / `FR-NOTIFY-03` (P1) |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

**Lý do ngoài phạm vi — chép từ `../../pham-vi-va-phan-mock.md:82`:** `FR-NOTIFY-01..03` (P1, thông
báo) — **NGOÀI PHẠM VI**: "Cần hạ tầng email/queue ngoài phạm vi 11h."

**Ràng buộc cứng của `FR-NOTIFY-03`:** "Việc thay đổi cấu hình không làm mất lịch sử gửi trong quá
khứ." Nghĩa là cấu hình **không được** sửa tại chỗ theo kiểu ghi đè — hoặc có phiên bản, hoặc log
gửi phải giữ snapshot của cấu hình đã dùng. Đây là điểm thiết kế, không phải chi tiết.

## 1. Mục đích

Cho quản trị vận hành chọn: event nào bật, gửi qua kênh nào, gửi cho ai, ở ngưỡng nào và vào thời
điểm nào — để hệ thống thông báo khớp với cách tổ chức thật của chợ chứ không cứng trong code. Là
màn cấu hình cho SC-28 tiêu thụ.

## 2. Điều kiện vào màn

- Đăng nhập: **bắt buộc**, phiên đã đủ mức xác thực theo SC-02 nếu vai trò thuộc diện bắt buộc MFA.
- Vai trò được vào: **chỉ ROLE-SYS-ADMIN** (ánh xạ của "Quản trị vận hành" — giả định #1).
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên).
- Tiền đề dữ liệu: danh sách `event_type` phải tồn tại (do SC-28 định nghĩa, xem mục 9 của file đó).

## 3. Bảng field

Một dòng cấu hình cho mỗi `event_type`.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `eventType` | Loại event | chưa có key JA | read-only | — | `notification_rule.event_type` — **bảng chưa có** | — | chưa có — đề xuất: CHECK theo danh sách của `FR-NOTIFY-01` | — |
| 2 | `isEnabled` | Bật thông báo | chưa có key JA | toggle | có | `notification_rule.is_enabled` — **bảng chưa có** | chưa có — đề xuất | chưa có — đề xuất | — |
| 3 | `severity` | Phân loại | chưa có key JA | select | có | `notification_rule.severity` — **bảng chưa có** | chưa có — đề xuất: `critical` / `thường` | chưa có — đề xuất: `critical` kéo theo mốc 5 phút của `FR-NOTIFY-02` | "Phân loại không hợp lệ." |
| 4 | `channels` | Kênh gửi | chưa có key JA | checkbox nhiều | có | `notification_rule.channels` — **bảng chưa có** | chưa có — đề xuất: chỉ `in_app` và `email`; **SMS/FAX không phải kênh** (`FR-NOTIFY-01`) | chưa có — đề xuất: từ chối kênh ngoài danh sách; phải chọn tối thiểu một kênh | "Phải chọn ít nhất một kênh." |
| 5 | `recipientRoles` | Người nhận theo vai trò | chưa có key JA | select nhiều | có (nếu không chọn #6) | `notification_rule.recipient_roles` — **bảng chưa có** | chưa có — đề xuất: chỉ 7 giá trị của CHECK trên `app_user.role` | chưa có — đề xuất: vai trò lạ thì từ chối cả request | "Vai trò không hợp lệ." |
| 6 | `recipientUsers` | Người nhận đích danh | chưa có key JA | select nhiều | có (nếu không chọn #5) | `notification_rule.recipient_user_ids` — **bảng chưa có** | chưa có — đề xuất: chỉ tài khoản `is_active = true` | chưa có — đề xuất: bỏ tài khoản đã vô hiệu khi gửi, không lỗi | "Tài khoản không còn hoạt động." |
| 7 | `thresholdValue` | Ngưỡng | chưa có key JA | number | không | `notification_rule.threshold_value` — **bảng chưa có** | chưa có — đề xuất: số nguyên dương; **không đặt mặc định bịa** | chưa có — đề xuất: bắt buộc nếu `event_type` là loại có ngưỡng | "Ngưỡng phải là số nguyên dương." |
| 8 | `thresholdUnit` | Đơn vị ngưỡng | chưa có key JA | select | không | `notification_rule.threshold_unit` — **bảng chưa có** | chưa có — đề xuất: `ngày` / `số lượng` tuỳ event | chưa có — đề xuất | — |
| 9 | `sendAtJst` | Thời điểm gửi (JST) | chưa có key JA | time | không | `notification_rule.send_at_jst` — **bảng chưa có** | chưa có — đề xuất: nằm trong khung giờ dịch vụ 02:00–10:00 JST (`NFR-AVL-01`) hoặc khai rõ là gửi ngoài khung | chưa có — đề xuất: mốc thời gian luôn hiểu theo JST, không theo timezone client | "Thời điểm ngoài khung giờ dịch vụ." |
| 10 | `reason` | Lý do thay đổi | chưa có key JA | textarea | có (đề xuất) | ghi vào lịch sử cấu hình (mục 9) | chưa có — đề xuất: không rỗng sau trim | chưa có — đề xuất: rỗng thì không ghi thay đổi | "Phải nhập lý do thay đổi cấu hình." |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Chưa có dòng cấu hình nào | Danh sách `event_type` với trạng thái "chưa cấu hình" | Tạo cấu hình |
| đang tải | Đang đọc `notification_rule` | Skeleton | — |
| lỗi tải | Truy vấn thất bại | Thông báo lỗi + nút thử lại | Thử lại |
| không có quyền | Vai trò khác ROLE-SYS-ADMIN | **404** | — |
| đang gửi | Đang lưu cấu hình | Form disabled, spinner | — |
| gửi lỗi | Validation server từ chối, hoặc CAS thất bại | Lỗi tại field, giữ nguyên giá trị đang nhập | Sửa và gửi lại |
| kênh chưa khả dụng | Đã chọn `email` nhưng chưa có hạ tầng gửi (mục 9) | Cảnh báo rõ: cấu hình lưu được, **email sẽ không gửi** | Lưu, hoặc bỏ chọn email |

Màn này **không** chạm bảng bị lock ngày → không có dòng `read-only vì ngày đã lock`, không 423.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | Có | Toàn bộ 1–10 | Tạo, sửa, bật/tắt cấu hình | — |
| 6 vai trò còn lại | Không | — | — | 404 khi vào route; 403 khi gọi API ghi |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (`FR-601`, có chủ đích —
`supabase/migrations/20260904090900_rls_core.sql:28-32`). Cấu hình thông báo không phải dữ liệu
nhạy như nội dung thông báo, nên đọc rộng ở đây chấp nhận được; chặn là ở **ghi** và ở **vào trang**.
Nhưng cột `recipient_user_ids` phơi ra ai nhận cảnh báo gì — cân khi chốt policy.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Tạo cấu hình | đề xuất `POST /api/admin/notification-rules` | `notification_rule` + 1 dòng lịch sử cấu hình | đề xuất `notification_rule_created` | 403 · 409 đã có cấu hình cho `event_type` đó · 422 validation |
| Sửa cấu hình | đề xuất `PATCH /api/admin/notification-rules/{id}` | `notification_rule` (hoặc tạo phiên bản mới, xem mục 9) + 1 dòng lịch sử | đề xuất `notification_rule_updated`, `before`/`after` | 403 · 409 CAS thất bại · 422 thiếu `reason` |
| Bật / tắt | đề xuất `PATCH /api/admin/notification-rules/{id}` | `notification_rule.is_enabled` + 1 dòng lịch sử | đề xuất `notification_rule_toggled` | 403 · 422 |
| Gửi thử | đề xuất `POST /api/admin/notification-rules/{id}/test` | `notification`, `notification_delivery` | đề xuất `notification_test_sent` | 403 · 503 nếu kênh chưa khả dụng |

## 7. Edge case

- **`FR-NOTIFY-03` cấm thay đổi cấu hình làm mất lịch sử gửi.** Sửa tại chỗ một dòng
  `notification_rule` sẽ khiến log gửi cũ trỏ tới một cấu hình không còn đúng như lúc gửi. Hai
  cách: (i) `notification_rule` có phiên bản, log gửi trỏ tới `rule_version_id` — cùng khuôn
  `incentive_rule_version` đã có; (ii) log gửi giữ snapshot cấu hình dạng `jsonb` — cùng khuôn cột
  `lines` của `accounting_export_batch` (`../../pham-vi-va-phan-mock.md:125-130`). Chốt ở ADR.
- **Không có transaction xuyên bảng** (`../../pham-vi-va-phan-mock.md:152-159`). Ghi
  `notification_rule` và dòng lịch sử là hai lệnh; ghi lịch sử trước, rồi CAS bảng chính.
- **Người nhận đích danh bị vô hiệu** (SC-04) hoặc **đổi vai trò** → cấu hình trỏ tới một người
  không còn phù hợp. Gửi phải lọc theo `is_active` tại thời điểm gửi, không tại thời điểm cấu hình.
- **Cấu hình còn tồn tại nhưng nguồn event không có.** Ba trong bốn nhóm event phụ thuộc SC-07,
  SC-17, SC-19 chưa dựng (xem SC-28 mục 7). Cấu hình bật cho một event không bao giờ phát sinh sẽ
  im lặng — UI phải cho thấy điều đó, không để quản trị tưởng đã hoạt động.
- **Ngưỡng bị đặt hai chỗ.** `EXPIRY_WARNING_DAYS = 30` hiện là hằng số cứng trong `RPT-03`
  (`src/lib/reports/queries/rpt-03-participant-eligibility.ts:11`). Nếu SC-29 cấu hình được ngưỡng
  cảnh báo hết hiệu lực thì phải bỏ hằng số đó, không để hai nguồn chân lý — vi phạm DRY và sẽ lệch.
- **Chọn kênh `email` khi chưa có hạ tầng gửi.** Không được để cấu hình trông như đã hoạt động;
  UI phải nói rõ, cùng lý do mà `RPT-04` bị giữ declared-out thay vì dựng nửa vời
  (`../../pham-vi-va-phan-mock.md:116-124`).

## 8. Dẫn chứng

- RFP `FR-NOTIFY-03` (§07-04) — cấu hình người nhận, ngưỡng và thời điểm gửi; nghiệm thu "thay đổi
  cấu hình không làm mất lịch sử gửi trong quá khứ".
- RFP `FR-NOTIFY-01` (§07-04) — chỉ in-app và email; **SMS và FAX không thuộc kênh**.
- RFP `FR-NOTIFY-02` (§07-04) — Critical trong **5 phút**, email retry tối đa **3 lần**.
- RFP `NFR-AVL-01` / FIG-020 (§09-01) — khung giờ dịch vụ **02:00–10:00 JST**.
- RFP `NFR-OPS-01` (§09-01) — phải giám sát được lỗi gửi thông báo.
- `../../pham-vi-va-phan-mock.md:82` — lý do ngoài phạm vi.
- `../../pham-vi-va-phan-mock.md:148-151` — không có hạ tầng queue trong stack hiện tại.
- `src/lib/reports/queries/rpt-03-participant-eligibility.ts:11` — `EXPIRY_WARNING_DAYS = 30`, hằng
  số cứng một chỗ, là nguồn xung đột nếu ngưỡng thành cấu hình được.
- `supabase/migrations/20260904090000_core_identity.sql:11-16` — CHECK 7 vai trò cho field #5.
- `src/lib/i18n/dictionaries/ja/` — không có namespace thông báo → nhãn JA chưa có.

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | **`notification_rule` — chưa có.** `id` uuid pk · `event_type` text not null unique (hoặc unique theo phiên bản) · `is_enabled` boolean not null default false · `severity` text not null CHECK (`critical`, `thường`) · `channels` text[] CHECK ⊆ (`in_app`, `email`) · `recipient_roles` text[] · `recipient_user_ids` uuid[] · `threshold_value` integer · `threshold_unit` text · `send_at_jst` time · `updated_by` uuid → `app_user(id)` · `updated_at` timestamptz | Ràng buộc: `recipient_roles` và `recipient_user_ids` không cùng rỗng |
| Bảng/cột | **Lịch sử cấu hình — chưa có.** Hoặc bảng `notification_rule_history` cùng khuôn `participant_status_history` (`20260904090100_participant.sql:18-32`), hoặc phiên bản hoá cùng khuôn `incentive_rule_version`. Cần vì `FR-NOTIFY-03` cấm mất lịch sử gửi | Chốt ở ADR, xem mục 7 |
| Bảng/cột | `notification` và `notification_delivery` — đề xuất ở `SC-28-hop-thong-bao-trong-ung-dung.md` mục 9. **Dùng chung, không tạo hai bộ bảng** | |
| Hạ tầng | **Email/queue ngoài — hai phương án, chưa quyết. Xem `SC-28-hop-thong-bao-trong-ung-dung.md` mục 9 "Hai phương án hạ tầng".** SC-29 không tự quyết thay | Cấu hình được kênh `email` mà không có hạ tầng gửi thì màn này bán một lời hứa rỗng |
| Hạ tầng | Scheduler để thực hiện field #9 (`send_at_jst`) — gửi theo thời điểm cần một thứ chạy ngoài request. Stack hiện tại không có; engine incentive đã phải chạy đồng bộ vì đúng lý do đó | Đây là phần khiến phương án (a) in-app polling **cũng** không đủ nếu giữ field #9 |
| Màn/API phụ thuộc | SC-28 (tiêu thụ cấu hình), SC-07/SC-17/SC-19 (nguồn event), SC-03/SC-04 (danh sách tài khoản cho field #6), SC-02 (mức xác thực) | |

### Giả định cần chốt

| # | Giả định | Ảnh hưởng nếu sai | Nơi phải sửa |
|---|---|---|---|
| 1 | "Quản trị vận hành" trong `FR-NOTIFY-03` ánh xạ sang **ROLE-SYS-ADMIN**. Hệ hiện có **7 vai trò** và không vai trò nào tên "quản trị vận hành" | Nếu khách có bộ phận vận hành tách khỏi quản trị hệ thống thì thiếu một vai trò, và CHECK trên `app_user.role` phải mở rộng | Mục 2, mục 5, `20260904090000_core_identity.sql:11-16` |
| 2 | Giá trị ngưỡng mặc định cho từng event — **RFP không cho một con số nào**. `EXPIRY_WARNING_DAYS = 30` hiện có là mặc định prototype của `RPT-03`, không phải yêu cầu khách chốt (xem `../../gia-dinh-tich-hop-ke-toan.md` § 5) | Đặt sai ngưỡng thì cảnh báo đến quá muộn (mất hiệu lực trước khi kịp gia hạn) hoặc quá sớm (nhiễu, người dùng bỏ qua) | Field #7, `src/lib/reports/queries/rpt-03-participant-eligibility.ts:11` |
| 3 | `send_at_jst` mặc định nằm trong khung giờ dịch vụ 02:00–10:00 JST (`NFR-AVL-01`) | Gửi ngoài khung thì không ai đọc kịp trước ngày nghiệp vụ; nhưng nếu khách muốn cảnh báo tối hôm trước thì ràng buộc này sai | Field #9 |
| 4 | Cấu hình là **một dòng cho mỗi `event_type`**, không tách theo vai trò hay theo người tham gia | Nếu cùng một event cần ngưỡng khác nhau cho từng nhóm thì mô hình một dòng không đủ | DDL `notification_rule` |
| 5 | `reason` bắt buộc khi sửa cấu hình. `FR-NOTIFY-03` không đòi lý do, chỉ đòi không mất lịch sử gửi | Bắt buộc thì thao tác bật/tắt nhanh thành nặng tay; không bắt buộc thì lịch sử cấu hình mất phần "vì sao" | Field #10, DDL lịch sử |
