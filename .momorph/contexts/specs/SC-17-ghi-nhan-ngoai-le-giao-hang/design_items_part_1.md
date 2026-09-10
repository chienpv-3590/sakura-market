# Design Context - SC-17 · Ghi nhận ngoại lệ giao hàng

## Screen info

- **screen**: SC-17 · Ghi nhận ngoại lệ giao hàng
- **source-family**: image
- **source-token**: SC-17-ghi-nhan-ngoai-le-giao-hang
- **source-image**: .momorph/shots/SC-17-ghi-nhan-ngoai-le-giao-hang.png
- **canvas**: 1280 x 2172 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-023 (FN-06) · ưu tiên P1
- **requirement-refs**: FR-DEL-03 (RFP:683) · liên quan FR-DEL-01 (RFP:681) · FR-CORR-02 (RFP:657) · FR-SETTLE-01 · RPT-04 (RFP:747) · TBL-ATTACH-01 · DR-IMAGE-01
- **data-domain**: D-DELIVERY (RFP:733)
- **state-machine**: FIG-014 (RFP:693) luồng ngoại lệ khi giao hàng — ba nhánh
- **actor**: Bộ phận vận chuyển (đề xuất ROLE-DELIVERY)
- **note**: Màn thuần thiết kế: prototype chưa có bảng; route hay đường ghi nào cho ngoại lệ
- **batch**: 1/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | - | img-001 | Khối đầu trang màn ghi ngoại lệ giao hàng | SC-17 · Ghi nhận ngoại lệ giao hàng · FE-023 · FN-06 · ưu tiên P1 · yêu cầu FR-DEL-03 · sơ đồ FIG-014 · báo cáo tiêu thụ RPT-04 | - | true | 1.1; 1.2; 1.3 | 26 | 22 | 1026 | 121 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-17 · Ghi nhận ngoại lệ giao hàng | - | false | - | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-023 Ghi nhận ngoại lệ giao hàng · FN-06 · ưu tiên P1 · yêu cầu FR-DEL-03 · miền dữ liệu D-DELIVERY · sơ đồ FIG-014 · báo cáo tiêu thụ RPT-04 · route đề xuất | - | false | - | 26 | 60 | 1026 | 97 |
| 1.3 | 1 | img-004 | Nhãn trạng thái thi công | Chưa thi công | - | false | - | 582 | 78 | 658 | 97 |
| 2 | - | img-005 | Dải cảnh báo màn thuần thiết kế | Thiết kế đòi, prototype chưa có gì. Mọi field và trạng thái dưới đây đọc từ FR-DEL-03 và FIG-014, không phải từ code. Đây là màn duy nhất sinh ra dữ liệu ngoại lệ mà SC-15, SC-16, SC-18 và RPT-04 đều cần | - | false | - | 26 | 137 | 1026 | 190 |
| 3 | - | img-006 | Khối sơ đồ FIG-014 luồng ngoại lệ khi giao hàng | 1 · FIG-014 · Luồng ngoại lệ khi giao hàng | - | true | 3.1; 3.2 | 26 | 206 | 1026 | 517 |
| 3.1 | 3 | img-007 | Sơ đồ FIG-014 ba nhánh | Bắt đầu giao hàng → Số lượng khớp? → nhánh Khớp thì Hoàn tất; nhánh Có chênh lệch thì Đăng ký giao hàng một phần rồi còn số lượng sang lần giao tiếp theo; nhánh Kiểm tra quyền thì Quyền đã mất hiệu lực rồi sau khi gỡ mới tiếp tục giao | - | false | - | 42 | 250 | 1010 | 455 |
| 3.2 | 3 | img-008 | Ghi chú phân vai ba nhánh của FIG-014 | Ba nhánh, ba nghiệp vụ khác nhau. Nhánh có chênh lệch là màn này: chênh lệch phải được ghi lại có lý do và người xác nhận. Nhánh kiểm tra quyền nối sang FE-007 và BR-PERM-01 | - | false | - | 42 | 458 | 1010 | 490 |
| 4 | - | img-009 | Khối form ghi ngoại lệ | 2 · Ghi ngoại lệ — 4 loại của FR-DEL-03 | - | true | 4.1; 4.2; 4.3; 4.4; 4.5; 4.6; 4.7; 4.8; 4.9; 4.10 | 26 | 530 | 1026 | 1115 |
| 4.1 | 4 | img-010 | Trường giao hàng đang ghi ngoại lệ | Giao hàng · 配送 * — TXN-0001 (lấy từ ngữ cảnh, không nhập) | - | false | - | 42 | 574 | 521 | 669 |
| 4.2 | 4 | img-011 | Trường lần giao liên quan | Lần giao liên quan · 回数 — Lần 2 — SHP-0002 · 60.00 — Không bắt buộc: ngoại lệ có thể thuộc cả phiếu giao hàng, ví dụ hủy một phần trước khi giao | - | false | - | 532 | 574 | 1010 | 669 |
| 4.3 | 4 | img-012 | Trường loại ngoại lệ | Loại ngoại lệ * — Giao thiếu — Đúng 4 giá trị FR-DEL-03: giao thiếu · giao thừa · hoàn trả · hủy một phần. Không có giá trị thứ năm | - | false | - | 42 | 679 | 521 | 774 |
| 4.4 | 4 | img-013 | Trường số lượng liên quan | Số lượng liên quan · 数量 — 8.00 — Lớn hơn 0. Với giao thiếu và hoàn trả không vượt phần đã giao; với hủy một phần không vượt số lượng còn lại | - | false | - | 532 | 679 | 1010 | 774 |
| 4.5 | 4 | img-014 | Trường lý do ngoại lệ | Lý do · 理由 * — FR-DEL-03 đòi lưu lý do, đây là trường bắt buộc, không được để trống hay chỉ chọn mã lý do khô | - | false | - | 42 | 784 | 1010 | 879 |
| 4.6 | 4 | img-015 | Trường người xác nhận ngoại lệ | Người xác nhận · 実施者 * — Người dùng B (từ phiên đăng nhập) — Nghiệm thu FR-DEL-03: có danh sách lý do và người xác nhận | - | false | - | 42 | 890 | 357 | 1001 |
