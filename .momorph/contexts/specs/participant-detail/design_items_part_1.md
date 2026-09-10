# Design Context - participant-detail

- Nguồn: `.momorph/shots/SC-06-chi-tiet-va-vong-doi-hieu-luc.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-06-chi-tiet-va-vong-doi-hieu-luc` · screen-name: `participant-detail`
- Khung ảnh: 1280 x 2359 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-06-chi-tiet-va-vong-doi-hieu-luc-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 1 of 3 - items 1 .. 3.5

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Đầu trang màn chi tiết người tham gia | SC-06 · Chi tiết và vòng đời hiệu lực người tham gia |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 139 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-06 · Chi tiết và vòng đời hiệu lực người tham gia |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-005 · FE-006 · FN-02 · ưu tiên P0 · yêu cầu FR-PARTY-01 · Detail 4 khối · actor |  | false |  | 26 | 60 | 1026 | 116 |
| 1.3 | 1 | img-004 | Nhãn trạng thái thi công | Đã dựng |  | false |  | 388 | 78 | 440 | 97 |
| 2 |  | img-005 | Khối profile chỉ đọc | Profile — chỉ đọc, mọi vai trò vận hành |  | true | img-006; img-007; img-008; img-009 | 26 | 155 | 1026 | 382 |
| 2.1 | 2 | img-006 | Trường phân loại (chỉ đọc) | Phân loại · 区分 — 仲卸 |  | false |  | 42 | 228 | 521 | 277 |
| 2.2 | 2 | img-007 | Trường căn cứ tham gia (chỉ đọc) | Căn cứ tham gia · 参加根拠 — Giấy phép (許可) · Suy từ phân loại theo FIG-004; không nhập tự do |  | false |  | 42 | 287 | 521 | 355 |
| 2.3 | 2 | img-008 | Trường trạng thái hiệu lực (chỉ đọc) | Trạng thái hiệu lực · 有効状態 — Có hiệu lực |  | false |  | 532 | 228 | 1010 | 277 |
| 2.4 | 2 | img-009 | Trường khoảng hiệu lực (chỉ đọc) | Khoảng hiệu lực · 有効期間 — 2026-04-01 → 2027-03-31 · Ngày kết thúc để trống nghĩa là vô hạn hạn / 無期限 |  | false |  | 532 | 287 | 1010 | 355 |
| 3 |  | img-010 | Khối sửa profile | Sửa profile — FE-005, quyền quản trị người tham gia |  | true | img-011; img-012; img-013; img-014; img-015; img-016 | 26 | 395 | 1026 | 701 |
| 3.1 | 3 | img-011 | Trường phân loại đã khoá | Phân loại · 区分 — 仲卸 — khoá; bất biến · Đổi phân loại là đổi ranh giới pháp lý |  | false |  | 42 | 439 | 521 | 524 |
| 3.2 | 3 | img-012 | Trường tên | Tên · 名称 * — Người tham gia A |  | false |  | 42 | 534 | 521 | 583 |
| 3.3 | 3 | img-013 | Trường hiệu lực từ | Hiệu lực từ · 有効開始日 * — 2026-04-01 |  | false |  | 532 | 439 | 1010 | 488 |
| 3.4 | 3 | img-014 | Trường hiệu lực đến | Hiệu lực đến · 有効終了日 — 2027-03-31 · Để trống là vô hạn hạn |  | false |  | 532 | 498 | 1010 | 566 |
| 3.5 | 3 | img-015 | Trường lý do cập nhật | Lý do cập nhật · 更新理由 * — Nhập lý do thay đổi · đi vào logical audit cùng before/after (FR-AUDIT-01) |  | false |  | 532 | 577 | 1010 | 645 |
