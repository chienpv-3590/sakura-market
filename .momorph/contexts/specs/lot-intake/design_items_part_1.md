# Design Context - lot-intake

- Nguồn: `.momorph/shots/SC-08-tiep-nhan-lo-hang.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-08-tiep-nhan-lo-hang` · screen-name: `lot-intake`
- Khung ảnh: 1280 x 2185 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-08-tiep-nhan-lo-hang-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 1 of 3 - items 1 .. 4.3

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Đầu trang màn tiếp nhận lô hàng | SC-08 · Tiếp nhận lô hàng |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 122 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-08 · Tiếp nhận lô hàng |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-009 · FE-013 · FN-03 · ưu tiên P0 · yêu cầu FR-LOT-01; NFR-USE-01 · Form · actor: nhân viên tiếp nhận |  | false |  | 26 | 60 | 1026 | 98 |
| 1.3 | 1 | img-004 | Nhãn trạng thái thi công | Đã dựng |  | false |  | 888 | 60 | 941 | 79 |
| 2 |  | img-005 | Khối yêu cầu dùng được bằng bàn phím | Dùng được bằng bàn phím — NFR-USE-01 là yêu cầu chức năng; không phải trang trí |  | false |  | 26 | 138 | 1026 | 230 |
| 3 |  | img-006 | Khối trường nhập | Trường nhập — FR-LOT-01 |  | true | img-007; img-008; img-009; img-010; img-011 | 26 | 243 | 1026 | 526 |
| 3.1 | 3 | img-007 | Trường mặt hàng | Mặt hàng · 品目 * — Nhập tên mặt hàng · Tab 1 · Bắt buộc; cắt khoảng trắng hai đầu |  | false |  | 42 | 287 | 521 | 356 |
| 3.2 | 3 | img-008 | Trường số kiện | Số kiện · 梱数 * — 0 · số nguyên ≥ 1 · Tab 2 · Thông tin kiện hàng mà FR-LOT-01 đòi |  | false |  | 42 | 366 | 521 | 434 |
| 3.3 | 3 | img-009 | Trường số lượng ban đầu | Số lượng ban đầu · 初期数量 * — 0.00 · > 0; hai chữ số thập phân · Tab 3 |  | false |  | 532 | 287 | 1010 | 372 |
| 3.4 | 3 | img-010 | Trường chứng từ tiếp nhận | Chứng từ tiếp nhận · 受付証憑 * — Chọn tệp · Tab 4 · Nghiệm thu FR-LOT-01: lưu được các chứng từ bắt buộc |  | false |  | 532 | 382 | 1010 | 470 |
| 3.5 | 3 | img-011 | Nút lưu lô hàng | Lưu lô hàng · Tab 5 |  | false |  | 42 | 481 | 130 | 510 |
| 4 |  | img-012 | Khối trường hệ thống sinh | Trường hệ thống sinh — không nhập được |  | true | img-013; img-014; img-015; img-016 | 26 | 539 | 1026 | 772 |
| 4.1 | 4 | img-013 | Trường mã lô hàng | Mã lô hàng · ロット番号 — LOT-0001 (mẫu) · Nghiệm thu FR-LOT-01: mỗi lô một mã duy nhất |  | false |  | 42 | 583 | 276 | 746 |
| 4.2 | 4 | img-014 | Trường ngày nghiệp vụ | Ngày nghiệp vụ · 業務日 — Ngày nghiệp vụ hiện hành (JST) · Quyết định lô thuộc kỳ nào khi đối chiếu và lock (FR-SETTLE-01) |  | false |  | 287 | 583 | 521 | 746 |
| 4.3 | 4 | img-015 | Trường số lượng khả dụng | Số lượng khả dụng · 利用可能数量 — = Số lượng ban đầu · BR-LOT-02: từ đây trở đi chỉ đổi qua đường giữ / hoàn số lượng |  | false |  | 532 | 583 | 765 | 746 |
