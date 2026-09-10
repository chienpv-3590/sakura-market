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
- **batch**: 2/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.7 | 4 | img-016 | Trường ngày nghiệp vụ của ngoại lệ | Ngày nghiệp vụ · 業務日 * — 2026-09-09 (JST) — Hệ thống đặt. Quyết định ngoại lệ này vào bảng đối chiếu của ngày nào | - | false | - | 368 | 890 | 684 | 1001 |
| 4.8 | 4 | img-017 | Trường ảnh và chứng từ bằng chứng | Ảnh / chứng từ bằng chứng — Chọn tệp… (không bắt buộc) — TBL-ATTACH-01 · DR-IMAGE-01: nhóm bằng chứng ngoại lệ thuộc diện lưu 3 năm. Không có chức năng tự phán định chất lượng từ ảnh | - | false | - | 695 | 890 | 1010 | 1001 |
| 4.9 | 4 | img-018 | Nút ghi ngoại lệ | Ghi ngoại lệ | - | false | - | 42 | 1024 | 131 | 1053 |
| 4.10 | 4 | img-019 | Ghi chú hậu quả sau khi ghi ngoại lệ | Ghi xong: trạng thái giao hàng chuyển sang ngoại lệ · 例外 và đường chốt hoàn tất ở SC-16 bị khoá cho tới khi ngoại lệ được xử lý. Không sửa ngoại lệ đã ghi — FR-CORR-02 đòi điều chỉnh phải sinh bản ghi mới thay vì ghi đè lịch sử | - | false | - | 42 | 1056 | 1010 | 1089 |
| 5 | - | img-020 | Khối bảng ngoại lệ đã ghi | 3 · Danh sách ngoại lệ đã ghi — nghiệm thu FR-DEL-03 | - | true | 5.1; 5.2 | 26 | 1128 | 1026 | 1333 |
| 5.1 | 5 | img-021 | Bảng ngoại lệ tám cột | Ngày nghiệp vụ · Giao dịch · Lần giao · Loại · Số lượng · Lý do · Người xác nhận · Bằng chứng | - | true | 5.1.1; 5.1.2 | 42 | 1172 | 1010 | 1287 |
| 5.1.1 | 5.1 | img-022 | Hàng tiêu đề bảng ngoại lệ | Ngày nghiệp vụ / Giao dịch / Lần giao / Loại / Số lượng / Lý do / Người xác nhận / Bằng chứng | - | false | - | 43 | 1173 | 1010 | 1200 |
| 5.1.2 | 5.1 | img-023 | Dòng ngoại lệ (đại diện cho ba dòng mẫu) | 2026-09-09 / TXN-0001 / SHP-0002 / Giao thiếu / 8.00 / Hỏng bao bì tại kho / Người dùng B / 1 tệp | - | false | - | 43 | 1200 | 1010 | 1229 |
| 5.2 | 5 | img-024 | Ghi chú hai chỗ tiêu thụ dữ liệu ngoại lệ | Bảng này là nguồn của RPT-04 (giao hàng ùn tắc và ngoại lệ giao hàng, lọc theo ngày nghiệp vụ và loại ngoại lệ) và là đầu vào ngoại lệ đủ điều kiện của bảng đối chiếu ngày ở SC-18 (FR-SETTLE-01) | - | false | - | 42 | 1290 | 1010 | 1306 |
| 6 | - | img-025 | Khối trạng thái màn | 4 · Trạng thái màn | - | true | 6.1; 6.2; 6.3; 6.4; 6.5; 6.6 | 26 | 1346 | 1026 | 1616 |
| 6.1 | 6 | img-026 | Thẻ trạng thái Chưa có lần giao nào | Chưa có lần giao nào — Vẫn ghi được ngoại lệ cấp phiếu giao hàng: hủy một phần xảy ra trước khi giao | - | false | - | 42 | 1390 | 277 | 1499 |
| 6.2 | 6 | img-027 | Thẻ trạng thái Giao hàng đã hoàn tất | Giao hàng đã hoàn tất — Chỉ đọc. Ngoại lệ phát sinh sau khi đã chốt hoàn tất phải đi đường điều chỉnh SC-20, không ghi ở đây | - | false | - | 286 | 1390 | 522 | 1499 |
| 6.3 | 6 | img-028 | Thẻ trạng thái Ngày của lần giao đã lock | Ngày của lần giao đã lock — Không ghi ngoại lệ mới cho ngày đã lock theo BR-CLOSE-01; số của ngày đã chốt sẽ đổi. Đường ra: SC-20 | - | false | - | 531 | 1390 | 766 | 1499 |
| 6.4 | 6 | img-029 | Thẻ trạng thái Giao thừa | Giao thừa — Không ghi được như một lần giao vì vượt số lượng đặt, nên loại này chỉ tồn tại dưới dạng bản ghi ngoại lệ. Đó là lý do nó phải nằm trong 4 giá trị | - | false | - | 775 | 1390 | 1010 | 1499 |
| 6.5 | 6 | img-030 | Thẻ trạng thái Đang gửi và Gửi lỗi | Đang gửi · Gửi lỗi — Nút vô hiệu khi đang gửi; lỗi thì giữ nguyên dữ liệu đã nhập và nói rõ trường nào sai | - | false | - | 42 | 1508 | 277 | 1600 |
