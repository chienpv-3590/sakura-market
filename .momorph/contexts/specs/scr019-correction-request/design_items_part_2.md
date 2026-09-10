# Design Context - scr019-correction-request

## Screen info

- source family: `image`
- source token: `SC-20-tao-yeu-cau-dieu-chinh`
- source image: `.momorph/shots/SC-20-tao-yeu-cau-dieu-chinh.png` (1280x1999 px)
- targetLanguage: Vietnamese
- screen: SC-20 · Tạo yêu cầu điều chỉnh
- batch: 2/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 5.1 | 5 | img-016 | Ô nhập Lý do | Số lượng nhận thực tế thiếu 12kg so với phiếu; đã đối chiếu với bộ phận giao hàng. | - | false | - | 42 | 735 | 1010 | 831 |
| 5.2 | 5 | img-017 | Ô chọn tệp Bằng chứng đính kèm | [ Chọn tệp ] — chưa chọn tệp nào | - | false | - | 42 | 841 | 1010 | 909 |
| 5.3 | 5 | img-018 | Ô hiển thị Trạng thái phê duyệt khi tạo | Chờ duyệt — hệ thống đặt; người tạo không chọn | - | false | - | 42 | 920 | 1010 | 988 |
| 5.4 | 5 | img-019 | Nút Gửi yêu cầu | Gửi yêu cầu | - | false | - | 42 | 1001 | 130 | 1030 |
| 5.5 | 5 | img-020 | Nút Gửi yêu cầu ở trạng thái vô hiệu | Gửi yêu cầu (khi thiếu lý do hoặc thiếu bằng chứng) | - | false | - | 133 | 1001 | 423 | 1030 |
| 6 | - | img-021 | Khối bất biến thiết kế | Yêu cầu điều chỉnh và giao dịch gốc là hai bản ghi tách rời. Cả hai bảng chỉ thêm; không sửa | - | false | - | 26 | 1059 | 1026 | 1178 |
| 7 | - | img-022 | Khối trạng thái màn | Trạng thái | - | true | img-023; img-024; img-025; img-026; img-027; img-028; img-029; img-030; img-031; img-032 | 26 | 1191 | 1026 | 1546 |
| 7.1 | 7 | img-023 | Thẻ trạng thái Rỗng | Chưa tra mã giao dịch — chỉ hiện khối tra mã; chưa có form nội dung | - | false | - | 42 | 1236 | 277 | 1328 |
| 7.2 | 7 | img-024 | Thẻ trạng thái Đang tải | Đang lấy giao dịch đích; khung trang hiện trước; dữ liệu vào sau | - | false | - | 286 | 1236 | 522 | 1328 |
| 7.3 | 7 | img-025 | Thẻ trạng thái Lỗi tải | Không lấy được giao dịch — thông báo kèm nút tải lại | - | false | - | 531 | 1236 | 766 | 1328 |
| 7.4 | 7 | img-026 | Thẻ trạng thái Không có quyền | Ngoài bộ phận quyết toán thì không vào được màn; cũng không gửi được yêu cầu qua đường API | - | false | - | 775 | 1236 | 1010 | 1328 |
| 7.5 | 7 | img-027 | Thẻ trạng thái Không tìm thấy giao dịch | Mã sai — lỗi ngay tại ô nhập; sửa mã rồi tra lại | - | false | - | 42 | 1337 | 277 | 1429 |
| 7.6 | 7 | img-028 | Thẻ trạng thái Ngày đã chốt | Form nội dung hiện đủ. Đây là đường ghi hợp lệ duy nhất sau khi chốt kỳ | - | false | - | 286 | 1337 | 522 | 1429 |
| 7.7 | 7 | img-029 | Thẻ trạng thái Ngày chưa chốt — từ chối | Không nhận yêu cầu; chỉ đường về màn giao dịch để sửa trực tiếp. Điều kiện đảo ngược so với các màn sửa thẳng | - | false | - | 531 | 1337 | 766 | 1429 |
| 7.8 | 7 | img-030 | Thẻ trạng thái Đang gửi | Nút vô hiệu; không cho gửi trùng | - | false | - | 775 | 1337 | 1010 | 1429 |
