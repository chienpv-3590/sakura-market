# Design Context - SC-14 · Tra cứu bản ghi せり

## Screen info

- **screen**: SC-14 · Tra cứu bản ghi せり
- **source-family**: image
- **source-token**: SC-14-tra-cuu-ban-ghi-seri
- **source-image**: .momorph/shots/SC-14-tra-cuu-ban-ghi-seri.png
- **canvas**: 1280 x 2224 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-019 (FN-05) · ưu tiên P1
- **requirement-refs**: FR-SERI-03 · kế thừa FR-SERI-02 · FR-SERI-01 · FR-AUDIT-01 · FR-CORR-03 · BR-CLOSE-01 · FR-LOT-03 · BR-LOT-02 · FR-PARTY-02 · NFR-PERF-01
- **state-machine**: FIG-012 (RFP:637) — phủ cả bản ghi せり; cách ánh xạ còn [CHƯA CHỐT]
- **actor**: Bộ phận đối chiếu (ROLE-SETTLEMENT) và ROLE-TRADE
- **note**: Một mã SC- ứng hai màn con: danh sách và chi tiết
- **batch**: 1/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | - | img-001 | Khối tiêu đề màn hình | SC-14 · Tra cứu bản ghi せり FE-019 Tra cứu bản ghi せり và lịch sử sửa · FN-05 · ưu tiên P1 Yêu cầu khách: FR-SER | - | true | 1.1; 1.2; 1.3; 1.4 | 26 | 22 | 1026 | 174 |
| 1.1 | 1 | img-002 | Tiêu đề màn hình | SC-14 · Tra cứu bản ghi せり | - | false | - | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-019 Tra cứu bản ghi せり và lịch sử sửa · FN-05 · ưu tiên P1 Yêu cầu khách: FR-SERI-03 — "tra cứu lại bản ghi | - | false | - | 26 | 60 | 1026 | 151 |
| 1.3 | 1 | img-004 | Thẻ trạng thái thi công | Đã dựng | - | false | - | 568 | 131 | 621 | 151 |
| 1.4 | 1 | img-005 | Thẻ ghi chú gộp hai màn con | Một mã SC- ứng hai màn con | - | false | - | 624 | 131 | 768 | 151 |
| 2 | - | img-006 | Khung 1 — Danh sách kết quả せり | Khung 1 — Danh sách kết quả せり Mã lô hàng · ロット番号 LOT-0003 Tìm được cả khi nhập một phần mã; thiếu một ký tự k | - | true | 2.1; 2.2; 2.3; 2.4; 2.5; 2.6; 2.7 | 26 | 190 | 1026 | 558 |
| 2.1 | 2 | img-007 | Tiêu đề khung danh sách | Khung 1 — Danh sách kết quả せり | - | false | - | 42 | 206 | 1010 | 223 |
| 2.2 | 2 | img-008 | Tiêu chí tìm Mã lô hàng | Mã lô hàng · ロット番号 LOT-0003 Tìm được cả khi nhập một phần mã; thiếu một ký tự không nên ra rỗng không lời giải | - | false | - | 42 | 234 | 276 | 345 |
| 2.3 | 2 | img-009 | Tiêu chí tìm Ngày nghiệp vụ | Ngày nghiệp vụ · 業務日 2026-09-09 Tiêu chí của bộ phận đối chiếu: bản ghi thuộc kỳ nào (FR-SETTLE-01). Sai định  | - | false | - | 287 | 234 | 521 | 345 |
| 2.4 | 2 | img-010 | Tiêu chí tìm Người thắng | Người thắng · 落札者 Người tham gia B Phục vụ RPT-10 (theo người tham gia) và RPT-11 (theo loại giao dịch). | - | false | - | 532 | 234 | 765 | 345 |
| 2.5 | 2 | img-011 | Nhóm nút tìm và nhập mới | Tìm Nhập kết quả せり Nút nhập mới dẫn sang SC-13, chỉ hiện với ROLE-TRADE. | - | true | 2.5.1; 2.5.2 | 776 | 234 | 1010 | 345 |
| 2.5.1 | 2.5 | img-012 | Nút Tìm | Tìm | - | false | - | 776 | 254 | 823 | 283 |
| 2.5.2 | 2.5 | img-013 | Nút Nhập kết quả せり | Nhập kết quả せり | - | false | - | 827 | 254 | 950 | 283 |
| 2.6 | 2 | img-014 | Bảng danh sách kết quả せり | Lô hàngロットNgười thắng落札者Số lượng数量 Đơn giá単価Thời điểm quyết định決定時刻 Ngày nghiệp vụ業務日Trạng thái状態Đã sửa修正 Tha | - | true | 2.6.1 | 42 | 355 | 1010 | 480 |
| 2.6.1 | 2.6 | img-015 | Nút Xem chi tiết trên dòng (đại diện) | Xem chi tiết | - | false | - | 899 | 405 | 987 | 434 |
