# Design Context - participant-list

- Nguồn: `.momorph/shots/SC-05-danh-sach-nguoi-tham-gia.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-05-danh-sach-nguoi-tham-gia` · screen-name: `participant-list`
- Khung ảnh: 1280 x 1772 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-05-danh-sach-nguoi-tham-gia-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 2 of 3 - items 4.1.1 .. 6.5

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.1.1 | 4.1 | img-016 | Dòng dữ liệu người tham gia (đại diện cho bốn dòng mẫu) | Người tham gia A \| 仲卸 \| Giấy phép (許可) \| Có hiệu lực \| 2026-04-01 \| 2027-03-31 |  | false |  | 43 | 670 | 1010 | 700 |
| 4.1.2 | 4.1 | img-017 | Badge trạng thái hiệu lực (đại diện) | Có hiệu lực |  | false |  | 513 | 675 | 577 | 695 |
| 4.2 | 4 | img-018 | Ghi chú cột và phân trang | Tên là link sang SC-06. Ngày hết hiệu lực để trống nghĩa là vô hạn hạn... |  | false |  | 42 | 795 | 1010 | 828 |
| 4.3 | 4 | img-019 | Ghi chú badge trạng thái không phải kết luận hiệu lực | Badge trạng thái là giá trị đã lưu của profile, không phải kết luận hôm nay giao dịch được hay không |  | false |  | 42 | 838 | 1010 | 871 |
| 5 |  | img-020 | Khối hành động | Hành động — FE-005 đòi CRUD đủ bốn phép |  | true | img-021; img-022; img-023; img-024 | 26 | 910 | 1026 | 1068 |
| 5.1 | 5 | img-021 | Nút tạo mới người tham gia | Tạo mới |  | false |  | 42 | 954 | 111 | 983 |
| 5.2 | 5 | img-022 | Nút mở chi tiết hoặc sửa | Mở chi tiết / sửa |  | false |  | 115 | 954 | 226 | 983 |
| 5.3 | 5 | img-023 | Ghi chú phân quyền hành động | Tạo và sửa thuộc quyền quản trị người tham gia; sửa mở sang SC-06 |  | false |  | 42 | 989 | 521 | 1022 |
| 5.4 | 5 | img-024 | Khối câu hỏi mở về phép xoá profile | Xoá profile CHƯA CHỐT — FE-005 ghi CRUD nhưng xoá đi là mất truy vết |  | false |  | 532 | 954 | 1010 | 1052 |
| 6 |  | img-025 | Khối trạng thái màn | Trạng thái |  | true | img-026; img-027; img-028; img-029; img-030; img-031 | 26 | 1081 | 1026 | 1352 |
| 6.1 | 6 | img-026 | Trạng thái rỗng | Rỗng — Chưa có profile nào, hoặc bộ lọc không khớp |  | false |  | 42 | 1125 | 277 | 1218 |
| 6.2 | 6 | img-027 | Trạng thái đang tải | Đang tải — Khung xương giữ đúng số cột |  | false |  | 286 | 1125 | 522 | 1218 |
| 6.3 | 6 | img-028 | Trạng thái lỗi tải | Lỗi tải — Khối lỗi kèm nút thử lại, giữ nguyên bộ lọc |  | false |  | 531 | 1125 | 766 | 1218 |
| 6.4 | 6 | img-029 | Trạng thái chỉ đọc | Chỉ đọc — hai hành động ghi đổi thành dòng nhắc vai trò phụ trách |  | false |  | 775 | 1125 | 1010 | 1218 |
| 6.5 | 6 | img-030 | Trạng thái dòng có căn cứ lệch | Dòng có căn cứ lệch — cặp (phân loại, căn cứ) không khớp FIG-004 |  | false |  | 42 | 1227 | 277 | 1336 |
