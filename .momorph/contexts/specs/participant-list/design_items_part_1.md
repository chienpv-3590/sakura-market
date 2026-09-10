# Design Context - participant-list

- Nguồn: `.momorph/shots/SC-05-danh-sach-nguoi-tham-gia.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-05-danh-sach-nguoi-tham-gia` · screen-name: `participant-list`
- Khung ảnh: 1280 x 1772 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-05-danh-sach-nguoi-tham-gia-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 1 of 3 - items 1 .. 4.1

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Đầu trang màn danh sách người tham gia | SC-05 · Danh sách người tham gia |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 139 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-05 · Danh sách người tham gia |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-005 · FN-02 · ưu tiên P0 · yêu cầu FR-PARTY-01 · List · actor |  | false |  | 26 | 60 | 1026 | 116 |
| 1.3 | 1 | img-004 | Nhãn trạng thái thi công | Đã dựng |  | false |  | 58 | 78 | 110 | 97 |
| 2 |  | img-005 | Khối bốn phân loại là bốn ranh giới | Bốn phân loại là bốn ranh giới — FR-PARTY-01 · FIG-004 · RFP §02-08 |  | true | img-006; img-009 | 26 | 155 | 1026 | 407 |
| 2.1 | 2 | img-006 | Bảng căn cứ tham gia theo FIG-004 | Phân loại · 区分 \| Điều kiện tham gia \| Thực hiện giao dịch \| Gỡ tạm ngừng |  | true | img-007; img-008 | 42 | 200 | 1010 | 345 |
| 2.1.1 | 2.1 | img-007 | Hàng phân loại (đại diện cho bốn hàng) | 卸売業者 \| Đăng ký chợ \| Chấp thuận \| Chấp thuận |  | false |  | 43 | 227 | 1010 | 256 |
| 2.1.2 | 2.1 | img-008 | Nhãn chưa chốt của dòng 買出人 (đại diện cho ba ô) | CHƯA CHỐT |  | false |  | 268 | 319 | 337 | 339 |
| 2.2 | 2 | img-009 | Ghi chú FIG-004 không có dòng cho 買出人 | FIG-004 không có dòng nào cho 買出人 — chỉ 卸売業者, 仲卸, 売買参加者 và đơn vị vận hành chợ |  | false |  | 42 | 348 | 1010 | 380 |
| 3 |  | img-010 | Khối bộ lọc | Bộ lọc |  | true | img-011; img-012; img-013 | 26 | 420 | 1026 | 585 |
| 3.1 | 3 | img-011 | Bộ lọc phân loại | Tất cả ▾ · 卸売業者 · 仲卸 · 売買参加者 · 買出人 |  | false |  | 42 | 464 | 357 | 559 |
| 3.2 | 3 | img-012 | Bộ lọc trạng thái hiệu lực | Tất cả ▾ |  | false |  | 368 | 464 | 684 | 559 |
| 3.3 | 3 | img-013 | Ô tìm theo tên | Tìm theo tên |  | false |  | 695 | 464 | 1010 | 559 |
| 4 |  | img-014 | Khối bảng danh sách người tham gia | Bảng danh sách — nghiệm thu FR-PARTY-01: thấy được loại và trạng thái hiệu lực |  | true | img-015; img-018; img-019 | 26 | 598 | 1026 | 897 |
| 4.1 | 4 | img-015 | Bảng sáu cột người tham gia | Tên · 名称 \| Phân loại · 区分 \| Căn cứ tham gia · 参加根拠 \| Trạng thái · 状態 \| Hiệu lực từ · 有効開始日 \| Hiệu lực đến · 有効終了日 |  | true | img-016; img-017 | 42 | 642 | 1010 | 792 |
