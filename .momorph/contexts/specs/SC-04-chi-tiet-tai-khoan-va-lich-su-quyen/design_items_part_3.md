# Design Context - SC-04 Chi tiết tài khoản và lịch sử quyền

- Nguồn: ảnh `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.png` (1280x1823; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 3/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 6.1 | 6 | img-031 | Tiêu đề khối đối chiếu prototype | ĐỐI CHIẾU PROTOTYPE |  | false |  | 42 | 1304 | 1010 | 1321 |
| 6.2 | 6 | img-032 | Bảng đối chiếu thiết kế và prototype | Thiết kế đòi / Prototype làm / Mức |  | true | img-033 | 42 | 1332 | 1010 | 1651 |
| 6.2.1 | 6.2 | img-033 | Dòng đối chiếu kèm thẻ mức lệch (đại diện) | Lịch sử quyền before/after hiển thị được: trước · sau · lý do · chủ thể · thời điểm; chỉ ghi thêm / Chưa có nơi lưu lịch sử quyền tài khoản nội bộ / khác có chủ đích — có tiền lệ cấu trúc đã chạy thật để bắt chước |  | false |  | 43 | 1360 | 1010 | 1427 |
| 7 |  | img-034 | Khối ghi chú phân quyền và yêu cầu khách | Phân quyền: chỉ ROLE-SYS-ADMIN vào được; 6 vai trò còn lại nhận 404 ở trang và bị từ chối khi gọi API ghi. Chặn 404 che trang; không che dữ liệu. |  | false |  | 26 | 1682 | 1026 | 1801 |
