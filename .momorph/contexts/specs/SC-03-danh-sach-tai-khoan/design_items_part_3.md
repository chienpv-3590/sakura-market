# Design Context - SC-03 Danh sách tài khoản

- Nguồn: ảnh `.momorph/shots/SC-03-danh-sach-tai-khoan.png` (1280x1805; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-03-danh-sach-tai-khoan-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 3/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 6.6 | 6 | img-031 | Ghi chú lý do bắt buộc và dấu vết | Cấp · tạm ngừng · mở lại đều bắt buộc kèm lý do và đều sinh một dòng lịch sử before/after xem được ở SC-04. Mở khoá tạm thuộc NFR-SEC-03. |  | false |  | 42 | 980 | 1010 | 1012 |
| 7 |  | img-032 | Khối trạng thái màn | Trạng thái |  | true | img-033; img-034 | 26 | 1052 | 1026 | 1322 |
| 7.1 | 7 | img-033 | Tiêu đề khối trạng thái màn | Trạng thái |  | false |  | 42 | 1068 | 1010 | 1085 |
| 7.2 | 7 | img-034 | Lưới thẻ trạng thái màn | Rỗng / Đang tải / Lỗi tải / Không có quyền / Đang gửi / Thiếu lý do / Bị chặn theo quy tắc / Gửi lỗi |  | true | img-035 | 42 | 1096 | 1010 | 1306 |
| 7.2.1 | 7.2 | img-035 | Thẻ trạng thái màn (đại diện) | Rỗng — Bộ lọc không khớp tài khoản nào: nói rõ là do lọc; kèm nút xoá lọc. |  | false |  | 42 | 1096 | 277 | 1188 |
| 8 |  | img-036 | Khối đối chiếu prototype | ĐỐI CHIẾU PROTOTYPE |  | true | img-037; img-038 | 26 | 1335 | 1026 | 1649 |
| 8.1 | 8 | img-037 | Tiêu đề khối đối chiếu prototype | ĐỐI CHIẾU PROTOTYPE |  | false |  | 42 | 1351 | 1010 | 1368 |
| 8.2 | 8 | img-038 | Bảng đối chiếu thiết kế và prototype | Thiết kế đòi / Prototype làm / Mức |  | true | img-039 | 42 | 1379 | 1010 | 1633 |
| 8.2.1 | 8.2 | img-039 | Dòng đối chiếu kèm thẻ mức lệch (đại diện) | Cấp · tạm ngừng · mở lại quyền tài khoản qua màn quản trị / Không có màn; tài khoản cố định / khác có chủ đích — hoãn cùng quyết định với MFA (SC-02) |  | false |  | 43 | 1407 | 1010 | 1456 |
| 9 |  | img-040 | Khối ghi chú phân quyền và yêu cầu khách | Phân quyền: chỉ ROLE-SYS-ADMIN vào được; 6 vai trò còn lại nhận 404 ở trang và bị từ chối khi gọi API ghi. Chặn 404 che trang; không che dữ liệu. |  | false |  | 26 | 1664 | 1026 | 1783 |
