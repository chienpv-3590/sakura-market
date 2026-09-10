# Design Context - participants-expiring

- Nguồn: `.momorph/shots/SC-07-canh-bao-hieu-luc-sap-het-han.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-07-canh-bao-hieu-luc-sap-het-han` · screen-name: `participants-expiring`
- Khung ảnh: 1280 x 2271 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-07-canh-bao-hieu-luc-sap-het-han-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 1 of 3 - items 1 .. 4.2

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Đầu trang màn cảnh báo hiệu lực | SC-07 · Cảnh báo hiệu lực sắp hết hạn |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 122 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-07 · Cảnh báo hiệu lực sắp hết hạn |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-008 · FN-02 · ưu tiên P1 · yêu cầu FR-PARTY-03 · List · actor: quản trị người tham gia |  | false |  | 26 | 60 | 1026 | 98 |
| 1.3 | 1 | img-004 | Nhãn trạng thái chưa thi công | Chưa thi công |  | false |  | 878 | 60 | 954 | 79 |
| 2 |  | img-005 | Khối tiêu chí nghiệm thu FR-PARTY-03 | Nghiệm thu FR-PARTY-03: các profile đúng nằm trong khoảng cảnh báo cấu hình được sẽ hiện trong danh sách cảnh báo |  | false |  | 26 | 138 | 1026 | 209 |
| 3 |  | img-006 | Khối cấu hình ngưỡng cảnh báo | Cấu hình ngưỡng cảnh báo — thứ FR-PARTY-03 đòi phải cấu hình được |  | true | img-007; img-009; img-010; img-011; img-012 | 26 | 225 | 1026 | 565 |
| 3.1 | 3 | img-007 | Bảng ngưỡng hiện hành theo căn cứ tham gia | Căn cứ tham gia · 参加根拠 \| Phân loại áp dụng \| Ngưỡng cảnh báo \| Người sửa gần nhất \| Thời điểm sửa |  | true | img-008 | 42 | 269 | 1010 | 384 |
| 3.1.1 | 3.1 | img-008 | Dòng ngưỡng theo căn cứ (đại diện cho ba dòng) | Giấy phép (許可) \| 仲卸 \| 30 ngày \| Quản trị A \| 2026-04-01 09:00 JST |  | false |  | 43 | 297 | 1010 | 326 |
| 3.2 | 3 | img-009 | Trường ngưỡng số ngày | Ngưỡng (số ngày) * — 30 · Số nguyên dương. Mỗi căn cứ một giá trị riêng |  | false |  | 42 | 395 | 282 | 490 |
| 3.3 | 3 | img-010 | Trường lý do đổi ngưỡng | Lý do đổi ngưỡng * — Nhập lý do · Đổi ngưỡng là đổi quy tắc vận hành — vào logical audit (FR-AUDIT-01) |  | false |  | 293 | 395 | 533 | 490 |
| 3.4 | 3 | img-011 | Nút lưu ngưỡng | Lưu ngưỡng |  | false |  | 544 | 411 | 634 | 440 |
| 3.5 | 3 | img-012 | Ghi chú câu hỏi chưa chốt về số ngưỡng | Ba ngưỡng độc lập là đề xuất. Câu hỏi CHƯA CHỐT: một ngưỡng dùng chung, một ngưỡng theo căn cứ, hay theo từng phân loại |  | false |  | 42 | 503 | 1010 | 539 |
| 4 |  | img-013 | Khối bộ lọc | Bộ lọc |  | true | img-014; img-015; img-016; img-017 | 26 | 578 | 1026 | 743 |
| 4.1 | 4 | img-014 | Bộ lọc căn cứ tham gia | Căn cứ tham gia · 参加根拠 — Tất cả ▾ · 許可 · 承認 · Đăng ký · Ba đường; không có giá trị gộp |  | false |  | 42 | 622 | 276 | 717 |
| 4.2 | 4 | img-015 | Bộ lọc phân loại | Phân loại · 区分 — Tất cả ▾ · Chỉ những phân loại thuộc căn cứ đang chọn |  | false |  | 287 | 622 | 521 | 717 |
