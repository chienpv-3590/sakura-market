# Design Context - SC-03 Danh sách tài khoản

- Nguồn: ảnh `.momorph/shots/SC-03-danh-sach-tai-khoan.png` (1280x1805; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-03-danh-sach-tai-khoan-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 2/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.5 | 4 | img-016 | Ô Tìm theo tên hoặc định danh | Tìm theo tên hoặc định danh / Nhập tên hoặc định danh / Khớp một phần. Độ dài tối đa là giả định cần chốt. |  | false |  | 776 | 466 | 1010 | 561 |
| 5 |  | img-017 | Khối danh sách tài khoản nội bộ | 3 · Danh sách tài khoản nội bộ |  | true | img-018; img-019; img-024 | 26 | 600 | 1026 | 891 |
| 5.1 | 5 | img-018 | Tiêu đề khối danh sách | 3 · Danh sách tài khoản nội bộ |  | false |  | 42 | 616 | 1010 | 633 |
| 5.2 | 5 | img-019 | Bảng danh sách tài khoản | Tên hiển thị / Định danh / Vai trò / Quyền tài khoản / Khoá tạm / Yếu tố xác thực / Ngày cấp / Thay đổi quyền gần nhất / Hành động |  | true | img-020; img-021; img-022; img-023 | 42 | 644 | 1010 | 829 |
| 5.2.1 | 5.2 | img-020 | Dòng tài khoản (đại diện) | Quản trị A / quantri-a@vi-du.local / ROLE-SYS-ADMIN / Đang hoạt động / — / Bắt buộc · đã đăng ký / 2026-01-05 / 2026-01-05 · Quản trị A / Mở chi tiết |  | false |  | 43 | 688 | 1010 | 735 |
| 5.2.2 | 5.2 | img-021 | Nút Mở chi tiết trong dòng | Mở chi tiết |  | false |  | 910 | 694 | 992 | 723 |
| 5.2.3 | 5.2 | img-022 | Thẻ quyền tài khoản trong dòng (đại diện) | Đang hoạt động |  | false |  | 372 | 694 | 459 | 713 |
| 5.2.4 | 5.2 | img-023 | Thẻ yếu tố xác thực trong dòng (đại diện) | Bắt buộc · đã đăng ký |  | false |  | 555 | 694 | 665 | 713 |
| 5.3 | 5 | img-024 | Ghi chú hai cột đặc biệt của danh sách | Cột Thay đổi quyền gần nhất mang thời điểm và chủ thể của dòng lịch sử mới nhất. Cột Yếu tố xác thực phải phân biệt ba giá trị. |  | false |  | 42 | 832 | 1010 | 864 |
| 6 |  | img-025 | Khối hành động của màn | 4 · Hành động của màn |  | true | img-026; img-027; img-028; img-029; img-030; img-031 | 26 | 904 | 1026 | 1039 |
| 6.1 | 6 | img-026 | Tiêu đề khối hành động | 4 · Hành động của màn |  | false |  | 42 | 920 | 1010 | 937 |
| 6.2 | 6 | img-027 | Nút Cấp tài khoản | Cấp tài khoản |  | false |  | 42 | 948 | 140 | 977 |
| 6.3 | 6 | img-028 | Nút Mở lại | Mở lại |  | false |  | 143 | 948 | 203 | 977 |
| 6.4 | 6 | img-029 | Nút Mở khoá tạm | Mở khoá tạm |  | false |  | 207 | 948 | 303 | 977 |
| 6.5 | 6 | img-030 | Nút Tạm ngừng | Tạm ngừng |  | false |  | 306 | 948 | 393 | 977 |
