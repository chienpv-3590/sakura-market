# Design Context - scr018-reconcile-and-lock

## Screen info

- source family: `image`
- source token: `SC-18-bang-doi-chieu-ngay-va-lock-ky`
- source image: `.momorph/shots/SC-18-bang-doi-chieu-ngay-va-lock-ky.png` (1280x2517 px)
- targetLanguage: Vietnamese
- screen: SC-18 · Bảng đối chiếu ngày và lock kỳ
- batch: 3/3 (9 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 7 | - | img-031 | Khối 6 — trạng thái màn | 6 · Trạng thái màn | - | true | img-032; img-033; img-034; img-035; img-036; img-037 | 26 | 1575 | 1026 | 1862 |
| 7.1 | 7 | img-032 | Thẻ trạng thái Chưa lock có dữ liệu | Bảng đầy đủ + nút lock cho đúng vai. Đổi ngày · truy vết · lock | - | false | - | 42 | 1619 | 277 | 1711 |
| 7.2 | 7 | img-033 | Thẻ trạng thái Chưa lock rỗng | Không có gì đủ điều kiện. Lock một ngày trắng là khoá vĩnh viễn một ngày trắng — phải cảnh báo riêng trước khi cho lock | - | false | - | 286 | 1619 | 522 | 1711 |
| 7.3 | 7 | img-034 | Thẻ trạng thái Đã lock chỉ đọc | Nút lock biến mất; bảng vẫn hiện đủ kèm thời điểm và người lock. Chỉ dẫn sang SC-20 cho mọi nhu cầu sửa | - | false | - | 531 | 1619 | 766 | 1711 |
| 7.4 | 7 | img-035 | Thẻ trạng thái Đang gửi và Gửi lỗi | Nút vô hiệu khi đang gửi. Lỗi phải phân biệt được lý do: ngày sai · đã lock rồi · không đủ quyền · lỗi hệ thống | - | false | - | 775 | 1619 | 1010 | 1711 |
| 7.5 | 7 | img-036 | Thẻ trạng thái Hai người lock cùng lúc | Chỉ một lần lock có hiệu lực; người sau nhận thông báo "ngày đã được lock"; không tạo kỳ thứ hai | - | false | - | 42 | 1720 | 277 | 1846 |
| 7.6 | 7 | img-037 | Thẻ trạng thái Khung giờ chốt | RFP §02-07 đặt chốt kỳ vào 08:00–10:00; đoạn 05:00–08:00 dùng cùng màn ở chế độ đối chiếu tạm | - | false | - | 286 | 1720 | 522 | 1846 |
| 8 | - | img-038 | Khối đối chiếu prototype | Thiết kế đòi \| Prototype làm \| Mức | - | false | - | 26 | 1875 | 1026 | 2397 |
| 9 | - | img-039 | Chân ghi chú phân quyền và tính một chiều của lock | Phân quyền: đọc mở cho mọi vai đang hoạt động; lock chỉ thuộc bộ phận đối chiếu. Lock là một chiều | - | false | - | 26 | 2412 | 1026 | 2495 |
