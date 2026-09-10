# Design Context - scr020-correction-approval

## Screen info

- source family: `image`
- source token: `SC-21-phe-duyet-yeu-cau-dieu-chinh`
- source image: `.momorph/shots/SC-21-phe-duyet-yeu-cau-dieu-chinh.png` (1280x2369 px)
- targetLanguage: Vietnamese
- screen: SC-21 · Phê duyệt yêu cầu điều chỉnh
- batch: 2/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.4 | 4 | img-016 | Ô nhập Lý do quyết định | Đã đối chiếu phiếu giao hàng; xác nhận thiếu 12kg — duyệt phần chênh lệch. | - | false | - | 42 | 925 | 1010 | 1020 |
| 4.5 | 4 | img-017 | Nút Duyệt | Duyệt | - | false | - | 42 | 1033 | 100 | 1062 |
| 4.6 | 4 | img-018 | Nút Từ chối | Từ chối | - | false | - | 104 | 1033 | 169 | 1062 |
| 4.7 | 4 | img-019 | Ghi chú số tiền chênh lệch không nhập tay | Số tiền chênh lệch không nhập tay — hệ thống tính lại từ số lượng và đơn giá gốc; để người duyệt không đặt được một con số rời khỏi giao dịch | - | false | - | 42 | 1071 | 1010 | 1087 |
| 5 | - | img-020 | Khối kết quả sau khi duyệt | Kết quả sau khi duyệt — FR-CORR-02: không ghi đè lịch sử | - | true | img-021; img-022 | 26 | 1127 | 1026 | 1331 |
| 5.1 | 5 | img-021 | Bảng ba dòng gốc và điều chỉnh và số hiệu lực | Bản ghi \| Số lượng \| Đơn giá \| Vai trò trong lịch sử | - | false | - | 42 | 1171 | 1010 | 1285 |
| 5.2 | 5 | img-022 | Ghi chú lối đảo ngược toàn bộ | "Đảo ngược toàn bộ" là cùng một cơ chế: thêm một dòng triệt tiêu toàn bộ giao dịch gốc; chứ không xoá giao dịch gốc | - | false | - | 42 | 1288 | 1010 | 1305 |
| 6 | - | img-023 | Khối maker-checker khi bạn là người lập | Maker-checker (GOV-RULE-01) — trường hợp bạn là người lập | - | true | img-024; img-025; img-026 | 26 | 1344 | 1026 | 1506 |
| 6.1 | 6 | img-024 | Nút Duyệt ở trạng thái vô hiệu | Duyệt | - | false | - | 42 | 1415 | 100 | 1444 |
| 6.2 | 6 | img-025 | Nút Từ chối ở trạng thái vô hiệu | Từ chối | - | false | - | 104 | 1415 | 169 | 1444 |
| 6.3 | 6 | img-026 | Ghi chú chặn thật nằm ở phía hệ thống | Ẩn nút chỉ là gợi ý trình bày. Chặn thật phải nằm ở server: so người lập với người đang thao tác rồi từ chối; kể cả khi gọi API trực tiếp | - | false | - | 42 | 1447 | 1010 | 1480 |
| 7 | - | img-027 | Khối trạng thái màn | Trạng thái | - | true | img-028; img-029; img-030; img-031; img-032; img-033; img-034; img-035; img-036; img-037; img-038 | 26 | 1519 | 1026 | 1874 |
| 7.1 | 7 | img-028 | Thẻ trạng thái Rỗng | "Không có yêu cầu điều chỉnh nào." Kèm liên kết sang SC-20 để tạo | - | false | - | 42 | 1563 | 277 | 1655 |
| 7.2 | 7 | img-029 | Thẻ trạng thái Rỗng do lọc | Có dữ liệu nhưng lọc không khớp — phải nói rõ là do lọc; khác với "chưa có gì" | - | false | - | 286 | 1563 | 522 | 1655 |
| 7.3 | 7 | img-030 | Thẻ trạng thái Đang tải và lỗi tải | Khung trang hiện trước; lỗi truy vấn thì báo kèm nút tải lại | - | false | - | 531 | 1563 | 766 | 1655 |
