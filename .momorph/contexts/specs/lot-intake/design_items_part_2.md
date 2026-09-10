# Design Context - lot-intake

- Nguồn: `.momorph/shots/SC-08-tiep-nhan-lo-hang.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-08-tiep-nhan-lo-hang` · screen-name: `lot-intake`
- Khung ảnh: 1280 x 2185 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-08-tiep-nhan-lo-hang-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 2 of 3 - items 4.4 .. 7.3

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.4 | 4 | img-016 | Trường trạng thái lô | Trạng thái · 状態 — Tiếp nhận — bước 1/5 của FIG-011 · FE-013 đòi trạng thái đi theo state machine FIG-011 |  | false |  | 776 | 583 | 1010 | 746 |
| 5 |  | img-017 | Khối máy trạng thái FIG-011 | FIG-011 — trạng thái lô hàng; đúng NĂM trạng thái |  | true | img-018; img-020; img-021 | 26 | 785 | 1026 | 1110 |
| 5.1 | 5 | img-018 | Bảng năm trạng thái của FIG-011 | # \| Trạng thái \| Sự kiện vào \| Ai làm \| Màn |  | true | img-019 | 42 | 829 | 1010 | 1001 |
| 5.1.1 | 5.1 | img-019 | Dòng trạng thái (đại diện cho năm dòng) | 1 \| Tiếp nhận \| Lô hàng đến quầy \| Nhân viên tiếp nhận \| SC-08 (màn này) |  | false |  | 43 | 857 | 1010 | 886 |
| 5.2 | 5 | img-020 | Ghi chú năm trạng thái và bốn cạnh | Năm trạng thái; bốn cạnh; đi một chiều. Cái phải phân biệt được là lô đã tiếp nhận nhưng chưa xem hàng với lô đã xem hàng chờ công bố |  | false |  | 42 | 1004 | 1010 | 1037 |
| 5.3 | 5 | img-021 | Ghi chú chưa chốt về 下見 và 目利き | CHƯA CHỐT — RFP dùng 下見 (xem hàng trước) ở FIG-011 nhưng dùng 目利き (thẩm định) ở FR-LOT-02 và FE-010 |  | false |  | 42 | 1048 | 1010 | 1083 |
| 6 |  | img-022 | Khối kết quả sau khi lưu | Kết quả sau khi lưu — thay hẳn form; không phải toast |  | true | img-023; img-024; img-025; img-026 | 26 | 1123 | 1026 | 1335 |
| 6.1 | 6 | img-023 | Trường mã lô hàng vừa tạo | Mã lô hàng vừa tạo — LOT-0001 · Cỡ lớn; chỉ đọc; tự nhận con trỏ |  | false |  | 42 | 1167 | 1010 | 1250 |
| 6.2 | 6 | img-024 | Nút ghi kết quả đánh giá | Ghi kết quả đánh giá |  | false |  | 42 | 1261 | 176 | 1290 |
| 6.3 | 6 | img-025 | Nút tiếp nhận lô khác | Tiếp nhận lô khác |  | false |  | 179 | 1261 | 296 | 1290 |
| 6.4 | 6 | img-026 | Ghi chú hai đường tiếp | Hai đường tiếp: sang SC-09; hoặc nhập lô kế tiếp ngay — nhịp làm việc thật là nhiều lô liên tiếp |  | false |  | 42 | 1293 | 1010 | 1309 |
| 7 |  | img-027 | Khối trạng thái màn | Trạng thái |  | true | img-028; img-029; img-030; img-031; img-032; img-033; img-034 | 26 | 1348 | 1026 | 1636 |
| 7.1 | 7 | img-028 | Trạng thái mặc định | Mặc định — Bốn trường trống; con trỏ ở trường đầu |  | false |  | 42 | 1392 | 277 | 1502 |
| 7.2 | 7 | img-029 | Trạng thái lỗi nhập | Lỗi nhập — Báo trên đúng trường sai và nói rõ sai thế nào (NFR-USE-01). Giữ nguyên dữ liệu đã nhập |  | false |  | 286 | 1392 | 522 | 1502 |
| 7.3 | 7 | img-030 | Trạng thái đang gửi | Đang gửi — Các trường vô hiệu; nút báo đang lưu; không cho gửi lần hai |  | false |  | 531 | 1392 | 766 | 1502 |
