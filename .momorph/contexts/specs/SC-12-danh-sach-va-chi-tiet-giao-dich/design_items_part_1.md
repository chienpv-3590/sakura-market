# Design Context - SC-12 · Danh sách và chi tiết giao dịch

## Screen info

- **screen**: SC-12 · Danh sách và chi tiết giao dịch
- **source-family**: image
- **source-token**: SC-12-danh-sach-va-chi-tiet-giao-dich
- **source-image**: .momorph/shots/SC-12-danh-sach-va-chi-tiet-giao-dich.png
- **canvas**: 1280 x 2143 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-017 (P0) · FE-016 (P1) · FE-014 (P0) · FN-04
- **requirement-refs**: FR-AITAI-01 · FR-AITAI-03 · FR-CORR-01 · FR-CORR-03 · BR-CLOSE-01 · BR-LOT-02 · FR-AUDIT-01 · NFR-PERF-01 · NFR-PERF-02
- **state-machine**: FIG-012 (RFP:637) — phủ cả 相対取引 và せり
- **actor**: ROLE-TRADE hành động; các vai đang hoạt động còn lại tra cứu
- **note**: Một mã SC- ứng hai màn con: danh sách và chi tiết
- **batch**: 1/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | - | img-001 | Khối tiêu đề màn hình | SC-12 · Danh sách và chi tiết giao dịch FE-017 Tra cứu và theo dõi giao dịch (P0) · FE-016 Hủy giao dịch chưa  | - | true | 1.1; 1.2; 1.3; 1.4 | 26 | 22 | 1026 | 138 |
| 1.1 | 1 | img-002 | Tiêu đề màn hình | SC-12 · Danh sách và chi tiết giao dịch | - | false | - | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-017 Tra cứu và theo dõi giao dịch (P0) · FE-016 Hủy giao dịch chưa lock (P1) · FE-014 Tạo giao dịch 相対取引 (P | - | false | - | 26 | 60 | 1026 | 115 |
| 1.3 | 1 | img-004 | Thẻ trạng thái thi công | Đã dựng | - | false | - | 764 | 95 | 817 | 115 |
| 1.4 | 1 | img-005 | Thẻ ghi chú gộp hai màn con | Một mã SC- ứng hai màn con | - | false | - | 820 | 95 | 964 | 115 |
| 2 | - | img-006 | Khung 1 — Danh sách giao dịch | Khung 1 — Danh sách giao dịch · FE-017 Ngày nghiệp vụ · 業務日 2026-09-09 Tiêu chí chính: ngày nghiệp vụ là đơn v | - | true | 2.1; 2.2; 2.3; 2.4; 2.5; 2.6; 2.7 | 26 | 154 | 1026 | 587 |
| 2.1 | 2 | img-007 | Tiêu đề khung danh sách | Khung 1 — Danh sách giao dịch · FE-017 | - | false | - | 42 | 170 | 1010 | 188 |
| 2.2 | 2 | img-008 | Bộ lọc Ngày nghiệp vụ | Ngày nghiệp vụ · 業務日 2026-09-09 Tiêu chí chính: ngày nghiệp vụ là đơn vị của kỳ đối chiếu (FR-SETTLE-01). Giá  | - | false | - | 42 | 199 | 276 | 310 |
| 2.3 | 2 | img-009 | Bộ lọc Trạng thái | Trạng thái · 状態 Tất cả ▾ Option = đủ các trạng thái của FIG-012, kể cả Chờ xác nhận nếu khách chốt là có bước  | - | false | - | 287 | 199 | 521 | 310 |
| 2.4 | 2 | img-010 | Bộ lọc Người mua | Người mua · 買出人 Người tham gia A Phục vụ RPT-01 (giao dịch theo ngày) và RPT-10 (theo người tham gia). | - | false | - | 532 | 199 | 765 | 310 |
| 2.5 | 2 | img-011 | Nhóm nút lọc và tạo mới | Lọc Tạo mới Nút "Tạo mới" dẫn sang SC-11, chỉ hiện với ROLE-TRADE. | - | true | 2.5.1; 2.5.2 | 776 | 199 | 1010 | 310 |
| 2.5.1 | 2.5 | img-012 | Nút Lọc | Lọc | - | false | - | 776 | 219 | 822 | 248 |
| 2.5.2 | 2.5 | img-013 | Nút Tạo mới | Tạo mới | - | false | - | 825 | 219 | 895 | 248 |
| 2.6 | 2 | img-014 | Bảng danh sách giao dịch | Mã giao dịch取引番号Lô hàngロットNgười mua買出人 Số lượng数量Đơn giá単価Ngày nghiệp vụ業務日 Trạng thái状態Thao tác操作 TXN-0001LOT | - | true | 2.6.1; 2.6.2 | 42 | 320 | 1010 | 524 |
| 2.6.1 | 2.6 | img-015 | Nút Xem trên dòng (đại diện) | Xem | - | false | - | 872 | 369 | 923 | 398 |
