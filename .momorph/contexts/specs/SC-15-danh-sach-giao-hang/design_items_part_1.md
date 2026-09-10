# Design Context - SC-15 · Danh sách giao hàng

## Screen info

- **screen**: SC-15 · Danh sách giao hàng
- **source-family**: image
- **source-token**: SC-15-danh-sach-giao-hang
- **source-image**: .momorph/shots/SC-15-danh-sach-giao-hang.png
- **canvas**: 1280 x 1588 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-020 (FN-06) · ưu tiên P0
- **requirement-refs**: FR-DEL-01 (RFP:681) · liên quan FR-DEL-05 (RFP:685) · FIG-014 (RFP:693) · FIG-029 (RFP:714)
- **data-domain**: D-DELIVERY · D-TRADE (RFP:733)
- **actor**: Bộ phận vận chuyển (ROLE-DELIVERY) — điểm vào chung của khâu giao nhận
- **note**: Màn chỉ đọc; mọi đường ghi nằm ở SC-16 và SC-17
- **batch**: 1/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | - | img-001 | Khối đầu trang màn danh sách giao hàng | SC-15 · Danh sách giao hàng · FE-020 · FN-06 · ưu tiên P0 · yêu cầu FR-DEL-01 · miền dữ liệu D-DELIVERY · D-TRADE · sơ đồ liên quan FIG-014 | - | true | 1.1; 1.2; 1.3 | 26 | 22 | 1026 | 121 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-15 · Danh sách giao hàng | - | false | - | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-020 Theo dõi trạng thái giao hàng · FN-06 Quản lý giao nhận hàng · ưu tiên P0 · yêu cầu FR-DEL-01 · miền dữ liệu D-DELIVERY · D-TRADE | - | false | - | 26 | 60 | 1026 | 97 |
| 1.3 | 1 | img-004 | Nhãn trạng thái thi công | Đã dựng | - | false | - | 523 | 78 | 575 | 97 |
| 2 | - | img-005 | Khối bộ lọc danh sách | 1 · Bộ lọc — Ngày nghiệp vụ · Trạng thái · Mã giao dịch · Người tham gia · nút Lọc | - | true | 2.1; 2.2; 2.3; 2.4; 2.5 | 26 | 137 | 1026 | 347 |
| 2.1 | 2 | img-006 | Ô lọc ngày nghiệp vụ | Ngày nghiệp vụ · 業務日 — 2026-09-09 — Neo theo JST. Không chọn được ngày tương lai | - | false | - | 42 | 181 | 276 | 292 |
| 2.2 | 2 | img-007 | Ô lọc trạng thái giao hàng | Trạng thái · 状態 — Tất cả — Đủ 4 giá trị FR-DEL-01: chờ · đang giao · hoàn tất · ngoại lệ | - | false | - | 287 | 181 | 521 | 292 |
| 2.3 | 2 | img-008 | Ô lọc mã giao dịch | Mã giao dịch · 取引番号 — TXN-0001 | - | false | - | 532 | 181 | 765 | 292 |
| 2.4 | 2 | img-009 | Ô lọc người tham gia | Người tham gia · 買出人 — Tất cả — Chỉ tên hiển thị, không bao giờ hiện email | - | false | - | 776 | 181 | 1010 | 292 |
| 2.5 | 2 | img-010 | Nút áp dụng bộ lọc | Lọc | - | false | - | 42 | 302 | 87 | 331 |
| 3 | - | img-011 | Khối danh sách giao hàng | 2 · Danh sách — một dòng là một giao dịch, trạng thái tính theo các lần giao | - | true | 3.1; 3.2 | 26 | 360 | 1026 | 633 |
| 3.1 | 3 | img-012 | Bảng danh sách giao hàng tám cột | Mã giao dịch · Người tham gia · Ngày nghiệp vụ · Số lượng đặt · Đã giao lũy kế · Còn lại · Số lần giao · Trạng thái | - | true | 3.1.1; 3.1.2; 3.1.3 | 42 | 404 | 1010 | 571 |
| 3.1.1 | 3.1 | img-013 | Hàng tiêu đề tám cột | Mã giao dịch取引番号 / Người tham gia買出人 / Ngày nghiệp vụ業務日 / Số lượng đặt注文数量 / Đã giao lũy kế配送済み累計 / Còn lại残数量 / Số lần giao回数 / Trạng thái状態 | - | false | - | 43 | 405 | 1010 | 448 |
| 3.1.2 | 3.1 | img-014 | Dòng giao dịch (đại diện cho bốn dòng mẫu) | TXN-0004 / Người tham gia A / 2026-09-09 / 40.00 / 0.00 / 40.00 / 0 / Chờ · 待機 | - | false | - | 43 | 448 | 1010 | 479 |
| 3.1.3 | 3.1 | img-015 | Nhãn trạng thái giao hàng trên dòng | Chờ · 待機 / Đang giao · 配送中 / Hoàn tất · 完了 / Ngoại lệ · 例外 | - | false | - | 872 | 454 | 932 | 473 |
