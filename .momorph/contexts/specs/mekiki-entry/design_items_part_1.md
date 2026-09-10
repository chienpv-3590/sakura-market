# Design Context - mekiki-entry

- Nguồn: `.momorph/shots/SC-09-ghi-nhan-ket-qua-mekiki.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-09-ghi-nhan-ket-qua-mekiki` · screen-name: `mekiki-entry`
- Khung ảnh: 1280 x 1713 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-09-ghi-nhan-ket-qua-mekiki-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 1 of 2 - items 1 .. 5.1

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Đầu trang màn ghi kết quả đánh giá | SC-09 · Ghi nhận kết quả 目利き |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 122 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-09 · Ghi nhận kết quả 目利き |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-010 · FN-03 · ưu tiên P0 · yêu cầu FR-LOT-02; SCOPE-OUT-01 · Form · actor: người đánh giá |  | false |  | 26 | 60 | 1026 | 98 |
| 1.3 | 1 | img-004 | Nhãn trạng thái thi công | Đã dựng |  | false |  | 723 | 60 | 775 | 79 |
| 2 |  | img-005 | Khối ranh giới phán đoán của con người | Ranh giới phán đoán của con người — SCOPE-OUT-01 · FIG-008 |  | false |  | 26 | 138 | 1026 | 230 |
| 3 |  | img-006 | Khối ngữ cảnh lô hàng | Ngữ cảnh lô hàng — chỉ đọc |  | true | img-007; img-008; img-009; img-010 | 26 | 243 | 1026 | 392 |
| 3.1 | 3 | img-007 | Trường mã lô | Mã lô · ロット番号 — LOT-0001 |  | false |  | 42 | 287 | 276 | 366 |
| 3.2 | 3 | img-008 | Trường mặt hàng | Mặt hàng · 品目 — Mặt hàng mẫu |  | false |  | 287 | 287 | 521 | 366 |
| 3.3 | 3 | img-009 | Trường trạng thái hiện tại của lô | Trạng thái hiện tại · 状態 — Tiếp nhận — bước 1/5 của FIG-011 · Chỉ lô ở bước 1 mới chờ ghi kết quả |  | false |  | 532 | 287 | 765 | 366 |
| 3.4 | 3 | img-010 | Trường ngày nghiệp vụ của lô | Ngày nghiệp vụ của lô · 業務日 — 2026-09-09 · Hiện ra để người ghi biết bản ghi rơi vào kỳ nào |  | false |  | 776 | 287 | 1010 | 366 |
| 4 |  | img-011 | Khối kết quả đánh giá bằng mắt | Kết quả đánh giá bằng mắt — FR-LOT-02 |  | true | img-012; img-013 | 26 | 405 | 1026 | 616 |
| 4.1 | 4 | img-012 | Trường kết quả thẩm định | Kết quả thẩm định · 目利き結果 * — Nhận định của người đánh giá — ví dụ: trên A; thân dày; mắt trong |  | false |  | 42 | 449 | 1010 | 561 |
| 4.2 | 4 | img-013 | Nút lưu kết quả | Lưu kết quả · Enter cũng lưu — NFR-USE-01 |  | false |  | 42 | 571 | 130 | 600 |
| 5 |  | img-014 | Khối truy vết bắt buộc | Truy vết bắt buộc — nghiệm thu FR-LOT-02: truy ngược được người ghi và thời điểm |  | true | img-015; img-016; img-017; img-018; img-019 | 26 | 629 | 1026 | 892 |
| 5.1 | 5 | img-015 | Trường người xác nhận | Người xác nhận · 評価担当者 — Người đánh giá A (phiên đang đăng nhập) · Phải hiện trên màn; không chỉ lưu ngầm |  | false |  | 42 | 673 | 276 | 801 |
