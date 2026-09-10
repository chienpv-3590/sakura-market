# Design Context - SC-13 · Nhập kết quả せり

## Screen info

- **screen**: SC-13 · Nhập kết quả せり
- **source-family**: image
- **source-token**: SC-13-nhap-ket-qua-seri
- **source-image**: .momorph/shots/SC-13-nhap-ket-qua-seri.png
- **canvas**: 1280 x 2208 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-018 (FN-05) · ưu tiên P0
- **requirement-refs**: FR-SERI-01 · FR-SERI-02 · SCOPE-OUT-02 · kế thừa FR-PARTY-02 · BR-PERM-01 · FR-LOT-03 · BR-LOT-02 · FR-CORR-03 · BR-CLOSE-01 · FR-AUDIT-01
- **state-machine**: FIG-012 (RFP:637) — tiêu đề hình phủ cả 相対取引 và せり
- **actor**: Người điều hành đấu giá (ROLE-TRADE)
- **batch**: 1/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | - | img-001 | Khối tiêu đề màn hình | SC-13 · Nhập kết quả せり FE-018 Nhập kết quả せり · FN-05 Ghi nhận kết quả đấu giá せり · ưu tiên P0 Yêu cầu khách: | - | true | 1.1; 1.2; 1.3; 1.4 | 26 | 22 | 1026 | 156 |
| 1.1 | 1 | img-002 | Tiêu đề màn hình | SC-13 · Nhập kết quả せり | - | false | - | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-018 Nhập kết quả せり · FN-05 Ghi nhận kết quả đấu giá せり · ưu tiên P0 Yêu cầu khách: FR-SERI-01, FR-SERI-02  | - | false | - | 26 | 60 | 1026 | 133 |
| 1.3 | 1 | img-004 | Thẻ trạng thái thi công | Đã dựng | - | false | - | 385 | 113 | 437 | 133 |
| 1.4 | 1 | img-005 | Thẻ ghi chú ranh giới số hóa | Chỉ nhập tay · không nhận dạng | - | false | - | 440 | 113 | 595 | 133 |
| 2 | - | img-006 | Khối form nhập tay kết quả cuối cùng | Form nhập tay kết quả cuối cùng — năm trường FR-SERI-02 đòi Lô hàng · ロット * LOT-0003 — Cá C ▾ Lô đang ở chặng  | - | true | 2.1; 2.2; 2.3; 2.4; 2.5; 2.6; 2.7; 2.8 | 26 | 172 | 1026 | 606 |
| 2.1 | 2 | img-007 | Tiêu đề khối form nhập tay | Form nhập tay kết quả cuối cùng — năm trường FR-SERI-02 đòi | - | false | - | 42 | 188 | 1010 | 205 |
| 2.2 | 2 | img-008 | Trường Lô hàng | Lô hàng · ロット * LOT-0003 — Cá C ▾ Lô đang ở chặng bán được của FIG-011. Một lô có đúng một kết quả せり cuối cùn | - | false | - | 42 | 216 | 521 | 328 |
| 2.3 | 2 | img-009 | Trường Người thắng | Người thắng · 落札者 * Người tham gia B ▾ Người tham gia có 許可/承認 còn hiệu lực tại thời điểm chốt kết quả — BR-PE | - | false | - | 532 | 216 | 1010 | 328 |
| 2.4 | 2 | img-010 | Trường Số lượng | Số lượng · 数量 * 80,00 Không vượt số lượng khả dụng của lô và không làm số đó âm — FR-LOT-03 (P0) đòi kiểm "trư | - | false | - | 42 | 338 | 521 | 433 |
| 2.5 | 2 | img-011 | Trường Đơn giá | Đơn giá · 単価 (JPY) * 2 400 Giá thắng cuối cùng, JPY không phần thập phân. | - | false | - | 532 | 338 | 1010 | 433 |
| 2.6 | 2 | img-012 | Trường Thời điểm quyết định | Thời điểm quyết định · 決定時刻 * 2026-09-09 06:35 Thời điểm phiên đấu giá chốt tại sàn, do người vận hành nhập —  | - | false | - | 42 | 443 | 521 | 538 |
| 2.7 | 2 | img-013 | Trường Người xác nhận | Người xác nhận · 確認者 * Người dùng A ▾ Người chịu trách nhiệm về kết quả, là một tài khoản nội bộ đang hoạt độn | - | false | - | 532 | 443 | 1010 | 538 |
| 2.8 | 2 | img-014 | Nút Lưu kết quả せり | Lưu kết quả せり | - | false | - | 42 | 561 | 156 | 590 |
| 3 | - | img-015 | Khối trường hệ thống gán | Hệ thống gán — không nhập tay Ngày nghiệp vụ · 業務日 2026-09-09 Ngày nghiệp vụ mà bản ghi thuộc về — đơn vị của  | - | true | 3.1; 3.2; 3.3 | 26 | 619 | 1026 | 800 |
