# Design Context - SC-01 Đăng nhập

- Nguồn: ảnh `.momorph/shots/SC-01-dang-nhap.png` (1280x1892; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-01-dang-nhap-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 2/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 3.2.1 | 3.2 | img-016 | Dòng vai trò và khu vực làm việc (đại diện) | ROLE-INTAKE / Tiếp nhận lô hàng |  | false |  | 43 | 610 | 1010 | 639 |
| 3.3 | 3 | img-017 | Ghi chú thời điểm gán vai trò | Vai trò được gán tại thời điểm đăng nhập; không phải lúc dựng menu. |  | false |  | 42 | 816 | 1010 | 848 |
| 4 |  | img-018 | Khối ghi log truy cập | 3 · Ghi log truy cập — FR-IAM-01 đòi; không hiển thị trên màn |  | true | img-019; img-020; img-022 | 26 | 888 | 1026 | 1150 |
| 4.1 | 4 | img-019 | Tiêu đề khối ghi log truy cập | 3 · Ghi log truy cập — FR-IAM-01 đòi; không hiển thị trên màn |  | false |  | 42 | 904 | 1010 | 921 |
| 4.2 | 4 | img-020 | Bảng sự kiện log bắt buộc | Sự kiện phải ghi / Nội dung bắt buộc của bản ghi |  | true | img-021 | 42 | 932 | 1010 | 1104 |
| 4.2.1 | 4.2 | img-021 | Dòng sự kiện log (đại diện) | Xác thực thành công / Chủ thể · thời điểm · vai trò được gán |  | false |  | 43 | 959 | 1010 | 988 |
| 4.3 | 4 | img-022 | Ghi chú nơi sinh log và nơi tra cứu | Màn này là nơi sinh ra bản ghi log; nơi tra cứu là SC-30. |  | false |  | 42 | 1107 | 1010 | 1123 |
| 5 |  | img-023 | Khối trạng thái màn | Trạng thái |  | true | img-024; img-025 | 26 | 1163 | 1026 | 1450 |
| 5.1 | 5 | img-024 | Tiêu đề khối trạng thái màn | Trạng thái |  | false |  | 42 | 1179 | 1010 | 1196 |
| 5.2 | 5 | img-025 | Lưới thẻ trạng thái màn | Mặc định / Đang xác thực / Bị từ chối / Quyền đã bị tạm ngừng / Đang bị khoá tạm / Phiên hết hiệu lực / Đã có phiên hợp lệ / Chưa đủ mức bảo mật |  | true | img-026 | 42 | 1207 | 1010 | 1434 |
| 5.2.1 | 5.2 | img-026 | Thẻ trạng thái màn (đại diện) | Mặc định — Hai trường bắt buộc còn rỗng; nút bật; không có thông báo nào. |  | false |  | 42 | 1207 | 277 | 1316 |
| 6 |  | img-027 | Khối đối chiếu prototype | ĐỐI CHIẾU PROTOTYPE |  | true | img-028; img-029 | 26 | 1463 | 1026 | 1772 |
| 6.1 | 6 | img-028 | Tiêu đề khối đối chiếu prototype | ĐỐI CHIẾU PROTOTYPE |  | false |  | 42 | 1479 | 1010 | 1496 |
| 6.2 | 6 | img-029 | Bảng đối chiếu thiết kế và prototype | Thiết kế đòi / Prototype làm / Mức |  | true | img-030 | 42 | 1507 | 1010 | 1756 |
| 6.2.1 | 6.2 | img-030 | Dòng đối chiếu kèm thẻ mức lệch (đại diện) | Vai trò thuộc diện bắt buộc MFA phải qua bước nâng mức phiên / Xác thực xong bí mật là vào thẳng khu vực làm việc / khác có chủ đích |  | false |  | 43 | 1535 | 1010 | 1583 |
