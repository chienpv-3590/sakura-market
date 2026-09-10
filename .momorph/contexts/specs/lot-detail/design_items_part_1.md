# Design Context - lot-detail

- Nguồn: `.momorph/shots/SC-10-chi-tiet-lo-hang-va-dieu-chinh.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-10-chi-tiet-lo-hang-va-dieu-chinh` · screen-name: `lot-detail`
- Khung ảnh: 1280 x 2556 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-10-chi-tiet-lo-hang-va-dieu-chinh-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 1 of 3 - items 1 .. 4

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Đầu trang màn chi tiết lô hàng | SC-10 · Chi tiết lô hàng và điều chỉnh |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 139 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-10 · Chi tiết lô hàng và điều chỉnh |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-011 · FE-012 · FE-013 · FN-03 · ưu tiên P0 · P1 · yêu cầu FR-LOT-01; FR-LOT-03; FR-LOT-04; BR-LOT-02 · Detail nhiều khối |  | false |  | 26 | 60 | 1026 | 116 |
| 1.3 | 1 | img-004 | Nhãn trạng thái thi công | Đã dựng |  | false |  | 644 | 78 | 696 | 97 |
| 2 |  | img-005 | Khối tổng quan lô hàng | Tổng quan — FE-013 · tiến trình theo FIG-011; năm trạng thái |  | true | img-006; img-007; img-008; img-009; img-010 | 26 | 155 | 1026 | 443 |
| 2.1 | 2 | img-006 | Dải tiến trình năm trạng thái FIG-011 | Trạng thái · 状態 — Tiếp nhận › Đã 下見 › Công bố › Đã chốt › Hoàn tất giao hàng |  | false |  | 42 | 227 | 1010 | 295 |
| 2.2 | 2 | img-007 | Trường ngày nghiệp vụ và cờ lock | Ngày nghiệp vụ · 業務日 — 2026-09-09 · đã lock · Phải hiện; kèm cờ đã lock |  | false |  | 42 | 306 | 276 | 417 |
| 2.3 | 2 | img-008 | Trường số lượng ban đầu | Số lượng ban đầu · 初期数量 — 150.00 |  | false |  | 287 | 306 | 521 | 417 |
| 2.4 | 2 | img-009 | Trường đã giữ cho giao dịch | Đã giữ cho giao dịch · 引当済 — 30.00 |  | false |  | 532 | 306 | 765 | 417 |
| 2.5 | 2 | img-010 | Trường số lượng khả dụng | Số lượng khả dụng · 利用可能数量 — 120.00 · BR-LOT-02: không bao giờ âm; và không sửa trực tiếp |  | false |  | 776 | 306 | 1010 | 417 |
| 3 |  | img-011 | Khối truy vết số lượng khả dụng | Truy vết số lượng khả dụng — nửa sau của BR-LOT-02 |  | true | img-012; img-014 | 26 | 456 | 1026 | 706 |
| 3.1 | 3 | img-012 | Bảng sổ số lượng khả dụng | Thời điểm · 日時 \| Việc \| Chứng từ nguồn \| Thay đổi \| Khả dụng sau \| Người thực hiện |  | true | img-013 | 42 | 500 | 1010 | 644 |
| 3.1.1 | 3.1 | img-013 | Dòng sổ số lượng (đại diện cho bốn dòng mẫu) | 2026-09-09 04:40 JST \| Giữ cho giao dịch \| TRD-0007 \| −30.00 \| 120.00 \| Vận hành A |  | false |  | 43 | 528 | 1010 | 557 |
| 3.2 | 3 | img-014 | Ghi chú hai nửa của BR-LOT-02 | BR-LOT-02 đòi hai thứ; không phải một: số lượng khả dụng không âm và truy vết được tới lịch sử điều chỉnh |  | false |  | 42 | 647 | 1010 | 679 |
| 4 |  | img-015 | Khối kết quả đánh giá | Kết quả đánh giá — FR-LOT-02; đọc từ chính bản ghi đánh giá |  | true | img-016; img-017; img-018; img-019 | 26 | 719 | 1026 | 868 |
