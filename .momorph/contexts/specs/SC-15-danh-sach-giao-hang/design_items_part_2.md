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
- **batch**: 2/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 3.2 | 3 | img-016 | Ghi chú điều hướng và lũy kế | Mỗi dòng mở sang SC-16 để xem từng lần giao và ghi lần giao mới. Màn này chỉ đọc. Dòng ngoại lệ mở được kèm sang SC-17. Lũy kế và còn lại hiện ngay trên danh sách | - | false | - | 42 | 574 | 1010 | 606 |
| 4 | - | img-017 | Khối nghĩa nghiệp vụ của bốn trạng thái | 3 · Bốn trạng thái của FR-DEL-01 — nghĩa nghiệp vụ | - | true | 4.1; 4.2; 4.3; 4.4 | 26 | 646 | 1026 | 815 |
| 4.1 | 4 | img-018 | Thẻ định nghĩa trạng thái Chờ | Chờ · 待機 — Có chỉ thị giao hàng, chưa lần giao nào được ghi nhận. Lũy kế = 0 | - | false | - | 42 | 690 | 277 | 799 |
| 4.2 | 4 | img-019 | Thẻ định nghĩa trạng thái Đang giao | Đang giao · 配送中 — Đã có ít nhất một lần giao và còn lại lớn hơn 0. Theo FIG-029 đây là trạng thái lặp | - | false | - | 286 | 690 | 522 | 799 |
| 4.3 | 4 | img-020 | Thẻ định nghĩa trạng thái Hoàn tất | Hoàn tất · 完了 — Đã chốt hoàn tất ở SC-16 theo BR-DEL-03. Còn lại bằng 0 chưa đủ. Trạng thái cuối, không quay lại | - | false | - | 531 | 690 | 766 | 799 |
| 4.4 | 4 | img-021 | Thẻ định nghĩa trạng thái Ngoại lệ | Ngoại lệ · 例外 — Có ngoại lệ giao hàng đã ghi nhận và chưa được xử lý xong: giao thiếu · giao thừa · hoàn trả · hủy một phần | - | false | - | 775 | 690 | 1010 | 799 |
| 5 | - | img-022 | Khối trạng thái màn | 4 · Trạng thái màn | - | true | 5.1; 5.2; 5.3; 5.4; 5.5; 5.6 | 26 | 828 | 1026 | 1133 |
| 5.1 | 5 | img-023 | Thẻ trạng thái Có dữ liệu | Có dữ liệu — Bảng sắp theo ngày nghiệp vụ giảm dần; trong cùng ngày thì giao dịch còn hàng chưa giao lên trước | - | false | - | 42 | 872 | 277 | 998 |
| 5.2 | 5 | img-024 | Thẻ trạng thái Rỗng | Rỗng — Phân biệt hai lý do: không có giao dịch nào cần giao trong ngày; hay bộ lọc không khớp. Nói rõ lý do và cho xoá lọc | - | false | - | 286 | 872 | 522 | 998 |
| 5.3 | 5 | img-025 | Thẻ trạng thái Đang tải và Lỗi tải | Đang tải · Lỗi tải — Skeleton bảng khi tải; lỗi thì hiện khối lỗi kèm nút thử lại, giữ nguyên bộ lọc | - | false | - | 531 | 872 | 766 | 998 |
| 5.4 | 5 | img-026 | Thẻ trạng thái Ngày đã lock | Ngày đã lock — Lock chặn ghi, không chặn đọc: giao dịch của ngày đã lock vẫn hiện đủ và vẫn mở được chi tiết. Màn không có hành động ghi nên không có chế độ chỉ đọc riêng | - | false | - | 775 | 872 | 1010 | 998 |
| 5.5 | 5 | img-027 | Thẻ trạng thái Không có quyền | Không có quyền — Đọc mở cho mọi vai đang hoạt động; đây là điểm vào chung của khâu giao nhận. Khác biệt theo vai chỉ xuất hiện ở SC-16 và SC-17 | - | false | - | 42 | 1007 | 277 | 1117 |
| 5.6 | 5 | img-028 | Thẻ trạng thái Khối lượng ngày cao điểm | Khối lượng ngày cao điểm — FIG-021 đặt ngày cao điểm ở 1.200 giao dịch. Danh sách phải phân trang và lọc ở tầng truy vấn, không tải hết rồi lọc | - | false | - | 286 | 1007 | 522 | 1117 |
| 6 | - | img-029 | Khối đối chiếu thiết kế và prototype | ĐỐI CHIẾU PROTOTYPE | - | true | 6.1 | 26 | 1146 | 1026 | 1468 |
| 6.1 | 6 | img-030 | Bảng đối chiếu ba cột | Thiết kế đòi / Prototype làm / Mức — năm dòng lệch: bốn trạng thái; trạng thái theo từng lần giao; ngày tương lai; phân trang; ngưỡng ùn tắc | - | false | - | 42 | 1190 | 1010 | 1452 |
