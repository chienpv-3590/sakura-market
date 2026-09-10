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
- **batch**: 2/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 3.1 | 3 | img-016 | Tiêu đề khối hệ thống gán | Hệ thống gán — không nhập tay | - | false | - | 42 | 635 | 1010 | 652 |
| 3.2 | 3 | img-017 | Trường Ngày nghiệp vụ (chỉ đọc) | Ngày nghiệp vụ · 業務日 2026-09-09 Ngày nghiệp vụ mà bản ghi thuộc về — đơn vị của kỳ đối chiếu (FR-SETTLE-01) và | - | false | - | 42 | 663 | 521 | 774 |
| 3.3 | 3 | img-018 | Trường Kênh giao dịch (chỉ đọc) | Kênh · 取引区分 せり Kênh 相対取引 ghi ở SC-11. Hai kênh khác nhau ở cách hình thành giá, giống nhau ở chỗ đều là một lầ | - | false | - | 532 | 663 | 1010 | 774 |
| 4 | - | img-019 | Khối vòng đời bản ghi せり | Vòng đời bản ghi せり — FIG-012 phủ cả hai kênh (RFP:637) Từ trạng tháiSự kiệnTới trạng tháiGhi chú thiết kế Nhá | - | true | 4.1; 4.2; 4.3 | 26 | 813 | 1026 | 1108 |
| 4.1 | 4 | img-020 | Tiêu đề khối vòng đời | Vòng đời bản ghi せり — FIG-012 phủ cả hai kênh (RFP:637) | - | false | - | 42 | 829 | 1010 | 846 |
| 4.2 | 4 | img-021 | Bảng chuyển trạng thái FIG-012 cho kênh せり | Từ trạng tháiSự kiệnTới trạng tháiGhi chú thiết kế Nháp · 下書きgửi Chờ xác nhận [CHƯA CHỐT] FIG-012 có bước này. | - | false | - | 42 | 857 | 1010 | 1004 |
| 4.3 | 4 | img-022 | Ghi chú ánh xạ vòng đời chưa chốt | Tiêu đề FIG-012 ghi thẳng: "trạng thái của bản ghi 相対取引 và せり" — thiết kế coi hai kênh dùng chung một vòng đời | - | false | - | 42 | 1015 | 1010 | 1081 |
| 5 | - | img-023 | Khối ngoài phạm vi — cố ý không có trên màn | Ngoài phạm vi — cố ý không có trên màn Không upload ảnh, không OCR, không nhận dạng ký hiệu tay 手やり. SCOPE-OUT | - | true | 5.1 | 26 | 1121 | 1026 | 1235 |
| 5.1 | 5 | img-024 | Tiêu đề khối ngoài phạm vi | Ngoài phạm vi — cố ý không có trên màn | - | false | - | 42 | 1137 | 1010 | 1154 |
| 6 | - | img-025 | Khối trạng thái màn | Trạng thái màn Mặc định Năm trường trống hoặc có giá trị đầu; người xác nhận mặc định là người đang đăng nhập. | - | true | 6.1; 6.2 | 26 | 1248 | 1026 | 1653 |
| 6.1 | 6 | img-026 | Tiêu đề khối trạng thái màn | Trạng thái màn | - | false | - | 42 | 1264 | 1010 | 1281 |
| 6.2 | 6 | img-027 | Lưới thẻ trạng thái màn | Mặc định Năm trường trống hoặc có giá trị đầu; người xác nhận mặc định là người đang đăng nhập. Rỗng — không c | - | true | 6.2.1 | 42 | 1292 | 1010 | 1637 |
| 6.2.1 | 6.2 | img-028 | Thẻ trạng thái màn (đại diện) | Mặc định Năm trường trống hoặc có giá trị đầu; người xác nhận mặc định là người đang đăng nhập. | - | false | - | 42 | 1292 | 277 | 1384 |
| 7 | - | img-029 | Khối đối chiếu prototype | Đối chiếu prototype Thiết kế đòiPrototype làmMức FIG-012 phủ cả 相対取引 và せり — một vòng đời dùng chung, thuộc đố | - | true | 7.1; 7.2 | 26 | 1666 | 1026 | 2106 |
| 7.1 | 7 | img-030 | Tiêu đề khối đối chiếu prototype | Đối chiếu prototype | - | false | - | 42 | 1682 | 1010 | 1699 |
