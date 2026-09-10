# Design Context - SC-11 · Tạo giao dịch 相対取引

## Screen info

- **screen**: SC-11 · Tạo giao dịch 相対取引
- **source-family**: image
- **source-token**: SC-11-tao-giao-dich-aitai
- **source-image**: .momorph/shots/SC-11-tao-giao-dich-aitai.png
- **canvas**: 1280 x 2061 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-014 · FE-015 · FE-007 (FN-04 và FN-02) · ưu tiên P0
- **requirement-refs**: FR-AITAI-01 · FR-AITAI-02 · FR-PARTY-02 · BR-PERM-01 · BR-LOT-02 · FR-LOT-03 · FR-CORR-03 · BR-CLOSE-01 · FR-AUDIT-01 · NFR-PERF-02
- **state-machine**: FIG-012 (RFP:637) — phủ cả 相対取引 và せり
- **actor**: Vận hành giao dịch (ROLE-TRADE)
- **batch**: 1/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | - | img-001 | Khối tiêu đề màn hình | SC-11 · Tạo giao dịch 相対取引 FE-014 Tạo giao dịch 相対取引 · FE-015 Từ chối chốt giao dịch không hợp lệ · FE-007 Chặ | - | true | 1.1; 1.2; 1.3; 1.4 | 26 | 22 | 1026 | 138 |
| 1.1 | 1 | img-002 | Tiêu đề màn hình | SC-11 · Tạo giao dịch 相対取引 | - | false | - | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-014 Tạo giao dịch 相対取引 · FE-015 Từ chối chốt giao dịch không hợp lệ · FE-007 Chặn giao dịch khi hiệu lực đã | - | false | - | 26 | 60 | 1026 | 115 |
| 1.3 | 1 | img-004 | Thẻ trạng thái thi công | Đã dựng | - | false | - | 448 | 95 | 500 | 115 |
| 1.4 | 1 | img-005 | Thẻ ghi chú trọng số nghiệp vụ | FN-04 gánh ~90% giá trị giao dịch của chợ | - | false | - | 503 | 95 | 707 | 115 |
| 2 | - | img-006 | Khối form nhập giao dịch | Form nhập — các trường FR-AITAI-01 đòi Lô hàng · ロット * LOT-0001 — Cá A ▾ Lô đang ở chặng bán được của FIG-011  | - | true | 2.1; 2.2; 2.3; 2.4; 2.5; 2.6; 2.7; 2.8 | 26 | 154 | 1026 | 467 |
| 2.1 | 2 | img-007 | Tiêu đề khối form nhập | Form nhập — các trường FR-AITAI-01 đòi | - | false | - | 42 | 170 | 1010 | 188 |
| 2.2 | 2 | img-008 | Trường Lô hàng | Lô hàng · ロット * LOT-0001 — Cá A ▾ Lô đang ở chặng bán được của FIG-011 và còn số lượng khả dụng. Ràng buộc số  | - | false | - | 42 | 199 | 521 | 294 |
| 2.3 | 2 | img-009 | Trường Người mua | Người mua · 買出人 * Người tham gia A ▾ Đúng phân loại 買出人 của FR-PARTY-01, không gộp với ba loại còn lại. Danh s | - | false | - | 532 | 199 | 1010 | 294 |
| 2.4 | 2 | img-010 | Trường Số lượng | Số lượng · 数量 * 120,00 Cùng đơn vị với số lượng ban đầu của lô (FR-LOT-01). Không được làm số khả dụng của lô  | - | false | - | 42 | 304 | 521 | 399 |
| 2.5 | 2 | img-011 | Trường Đơn giá | Đơn giá · 単価 (JPY) * 1 800 JPY, không phần thập phân. Giá đã thống nhất giữa hai bên. | - | false | - | 532 | 304 | 1010 | 399 |
| 2.6 | 2 | img-012 | Nút Tạo nháp | Tạo nháp | - | false | - | 42 | 422 | 117 | 451 |
| 2.7 | 2 | img-013 | Nút Tạo nháp và gửi xác nhận | Tạo nháp và gửi xác nhận | - | false | - | 121 | 422 | 278 | 451 |
| 2.8 | 2 | img-014 | Thẻ ghi chú phụ thuộc mục chưa chốt | nút thứ hai phụ thuộc mục [CHƯA CHỐT] ở khối vòng đời | - | false | - | 282 | 427 | 551 | 447 |
| 3 | - | img-015 | Khối trường hệ thống gán | Hệ thống gán — không nhập tay Mã giao dịch · 取引番号 TXN-0001 FR-AITAI-01 nghiệm thu: "giao dịch có mã duy nhất". | - | true | 3.1; 3.2; 3.3; 3.4; 3.5 | 26 | 480 | 1026 | 677 |
