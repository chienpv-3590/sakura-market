# Design Context - SC-25 · Danh mục báo cáo

## Screen info

- **screen**: SC-25 · Danh mục báo cáo
- **source-family**: image
- **source-token**: SC-25-danh-muc-bao-cao
- **source-image**: .momorph/shots/SC-25-danh-muc-bao-cao.png
- **canvas**: 1280 x 1544 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-033 · FE-034 (FN-10) · ưu tiên P0
- **requirement-refs**: FR-RPT-01 (RFP:707) · FR-RPT-03 (RFP:709) · TBL-REPORT-01 (RFP:740-757)
- **data-domain**: D-SETTLE · D-TRADE · D-DELIVERY (RFP:707) — màn danh mục không đọc thực thể nghiệp vụ nào
- **actor**: Mọi người dùng nội bộ đang hoạt động — cả 7 vai trò
- **note**: Danh mục là hằng của yêu cầu khách: đúng 12 mã, không thêm không bớt
- **batch**: 2/2 (10 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.1 | 4 | img-016 | Thẻ trạng thái Rỗng | Rỗng — Không xảy ra: catalog là danh sách bắt buộc của yêu cầu khách, luôn đúng 12 dòng | - | false | - | 42 | 915 | 277 | 1007 |
| 4.2 | 4 | img-017 | Thẻ trạng thái Đang tải | Đang tải — Khung trang hiện trước, danh mục stream dần | - | false | - | 286 | 915 | 522 | 1007 |
| 4.3 | 4 | img-018 | Thẻ trạng thái Lỗi tải | Lỗi tải — Khối lỗi kèm nút tải lại; không rơi về danh mục rỗng | - | false | - | 531 | 915 | 766 | 1007 |
| 4.4 | 4 | img-019 | Thẻ trạng thái Không có quyền | Không có quyền — Không áp dụng: màn không gác vai trò. Cả 7 vai trò thấy đúng 12 dòng giống nhau | - | false | - | 775 | 915 | 1010 | 1007 |
| 4.5 | 4 | img-020 | Thẻ trạng thái Chưa đăng nhập hoặc tài khoản bị vô hiệu | Chưa đăng nhập / tài khoản bị vô hiệu — Đưa về trang đăng nhập kèm lý do: chưa xác thực, hoặc tài khoản đã bị vô hiệu | - | false | - | 42 | 1016 | 277 | 1091 |
| 4.6 | 4 | img-021 | Thẻ trạng thái Đang gửi và gửi lỗi | Đang gửi / gửi lỗi — Không áp dụng: màn chỉ đọc, không có hành động ghi và không có input | - | false | - | 286 | 1016 | 522 | 1091 |
| 4.7 | 4 | img-022 | Thẻ trạng thái Read-only vì lock | Read-only vì lock — Không áp dụng: danh mục không phụ thuộc ngày nghiệp vụ nào | - | false | - | 531 | 1016 | 766 | 1091 |
| 5 | - | img-023 | Khối đối chiếu thiết kế và prototype | ĐỐI CHIẾU PROTOTYPE | - | true | 5.1 | 26 | 1120 | 1026 | 1442 |
| 5.1 | 5 | img-024 | Bảng đối chiếu ba cột | Thiết kế đòi / Prototype làm / Mức — năm dòng lệch: 12 mã chạy thật thì hiện 7 thật 5 mẫu; cột bộ lọc lệch nguồn với form lọc; RPT-09 chặn bởi SC-19; RPT-04 chặn bởi SC-17; một ghi chú nội bộ khai sai con số | - | false | - | 42 | 1164 | 1010 | 1426 |
| 6 | - | img-025 | Ghi chú chân màn về phân quyền | Phân quyền: chỉ cần đăng nhập, không gác vai trò — cả 7 vai trò vào được và thấy đúng 12 dòng giống nhau. Không có session hoặc tài khoản bị vô hiệu thì bị đưa về trang đăng nhập. Việc phân biệt vai trò xảy ra ở SC-26 và SC-27 | - | false | - | 26 | 1457 | 1026 | 1522 |
