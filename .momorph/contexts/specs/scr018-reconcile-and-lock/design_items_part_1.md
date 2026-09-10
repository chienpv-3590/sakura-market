# Design Context - scr018-reconcile-and-lock

## Screen info

- source family: `image`
- source token: `SC-18-bang-doi-chieu-ngay-va-lock-ky`
- source image: `.momorph/shots/SC-18-bang-doi-chieu-ngay-va-lock-ky.png` (1280x2517 px)
- targetLanguage: Vietnamese
- screen: SC-18 · Bảng đối chiếu ngày và lock kỳ
- batch: 1/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | - | img-001 | Khối đầu màn đối chiếu và lock kỳ | SC-18 · Bảng đối chiếu ngày và lock kỳ | - | true | img-002; img-003 | 26 | 22 | 1026 | 138 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-18 · Bảng đối chiếu ngày và lock kỳ | - | false | - | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng metadata truy vết | FE-025 · FE-026 · FE-024 · FN-07 · FN-06 · FR-SETTLE-01; FR-SETTLE-02; FR-CORR-03; FR-DEL-04; BR-CLOSE-01 · D-SETTLE · D-TRADE · D-DELIVERY · FIG-013 · RPT-05 | - | true | img-004 | 26 | 60 | 1026 | 115 |
| 1.2.1 | 1.2 | img-004 | Thẻ trạng thái dựng màn | Đã dựng | - | false | - | 503 | 95 | 555 | 115 |
| 2 | - | img-005 | Khối 1 — chọn ngày nghiệp vụ và trạng thái kỳ | 1 · Chọn ngày nghiệp vụ và trạng thái kỳ | - | true | img-006; img-007; img-008; img-009 | 26 | 154 | 1026 | 336 |
| 2.1 | 2 | img-006 | Ô nhập Ngày nghiệp vụ | 2026-09-09 | - | false | - | 42 | 199 | 276 | 310 |
| 2.2 | 2 | img-007 | Ô hiển thị Trạng thái kỳ | Chưa lock · 未ロック | - | false | - | 287 | 199 | 521 | 310 |
| 2.3 | 2 | img-008 | Ô hiển thị Thời điểm lock | — (hiện kèm JST khi đã lock) | - | false | - | 532 | 199 | 765 | 310 |
| 2.4 | 2 | img-009 | Ô hiển thị Người lock | — (tên hiển thị; không hiện email) | - | false | - | 776 | 199 | 1010 | 310 |
| 3 | - | img-010 | Khối 2 — bảng đối chiếu ngày gom ba nguồn | 2 · Bảng đối chiếu ngày (FE-025 · FR-SETTLE-01) — gom 3 nguồn | - | true | img-011; img-013 | 26 | 349 | 1026 | 689 |
| 3.1 | 3 | img-011 | Bảng đối chiếu ngày tám cột | Nguồn 区分 \| Chứng từ \| Người tham gia 買出人 \| Số lượng 数量 \| Thành tiền (JPY) 金額 \| Đã giao 配送済み \| Chênh lệch 差異 \| Truy vết 配送を見る | - | true | img-012 | 42 | 393 | 1010 | 626 |
| 3.1.1 | 3.1 | img-012 | Nút truy vết lần giao trong dòng | Xem 2 lần giao | - | false | - | 864 | 442 | 968 | 471 |
| 3.2 | 3 | img-013 | Ghi chú quy tắc truy vết và chênh lệch | FE-024 · FR-DEL-04: mỗi dòng phải truy được sang các lần giao liên quan; Chênh lệch chỉ điền được khi có cả hai phía để so | - | false | - | 42 | 629 | 1010 | 663 |
| 4 | - | img-014 | Khối 3 — định nghĩa đủ điều kiện | 3 · "Đủ điều kiện" gồm những gì — FR-SETTLE-01 | - | true | img-015; img-016; img-017; img-018 | 26 | 702 | 1026 | 872 |
| 4.1 | 4 | img-015 | Thẻ định nghĩa Giao dịch thoả thuận | Đã chốt và thuộc ngày nghiệp vụ này. Giao dịch đã hủy vẫn hiện thành dòng đã gạch kèm lý do | - | false | - | 42 | 746 | 277 | 856 |
