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
- **batch**: 2/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 3.1 | 3 | img-016 | Tiêu đề khối hệ thống gán | Hệ thống gán — không nhập tay | - | false | - | 42 | 496 | 1010 | 513 |
| 3.2 | 3 | img-017 | Trường Mã giao dịch (chỉ đọc) | Mã giao dịch · 取引番号 TXN-0001 FR-AITAI-01 nghiệm thu: "giao dịch có mã duy nhất". Định dạng mã và cách cấp là v | - | false | - | 42 | 524 | 276 | 651 |
| 3.3 | 3 | img-018 | Trường Ngày nghiệp vụ (chỉ đọc) | Ngày nghiệp vụ · 業務日 2026-09-09 Ngày nghiệp vụ đang mở. [CHƯA CHỐT] — thiết kế không nói có được nhập bù cho n | - | false | - | 287 | 524 | 521 | 651 |
| 3.4 | 3 | img-019 | Trường Trạng thái (chỉ đọc) | Trạng thái · 状態 Nháp · 下書き Giá trị đầu của vòng đời FIG-012, xem khối dưới. | - | false | - | 532 | 524 | 765 | 651 |
| 3.5 | 3 | img-020 | Trường Kênh giao dịch (chỉ đọc) | Kênh · 取引区分 相対取引 Kênh せり ghi ở SC-13. FIG-012 phủ cả hai kênh nên vòng đời dùng chung. | - | false | - | 776 | 524 | 1010 | 651 |
| 4 | - | img-021 | Khối vòng đời bản ghi giao dịch | Vòng đời bản ghi giao dịch — FIG-012 (RFP:637) Từ trạng tháiSự kiệnTới trạng tháiGhi chú thiết kế Nháp · 下書きgử | - | true | 4.1; 4.2; 4.3 | 26 | 690 | 1026 | 1087 |
| 4.1 | 4 | img-022 | Tiêu đề khối vòng đời | Vòng đời bản ghi giao dịch — FIG-012 (RFP:637) | - | false | - | 42 | 706 | 1010 | 723 |
| 4.2 | 4 | img-023 | Bảng chuyển trạng thái FIG-012 | Từ trạng tháiSự kiệnTới trạng tháiGhi chú thiết kế Nháp · 下書きgửi Chờ xác nhận [CHƯA CHỐT] FIG-012 có bước này. | - | false | - | 42 | 734 | 1010 | 983 |
| 4.3 | 4 | img-024 | Ghi chú tài liệu khách tự chống nhau | [CHƯA CHỐT] — tài liệu khách tự chống nhau: sơ đồ FIG-012 nói có bước phê duyệt, bảng yêu cầu của chính luồng  | - | false | - | 42 | 994 | 1010 | 1059 |
| 5 | - | img-025 | Khối hai cửa kiểm khi chốt | Hai cửa kiểm khi chốt — FE-015 · FR-AITAI-02 Cửa kiểmYêu cầu nguồnThời điểm đánh giáMàn phải hiển thị khi khôn | - | true | 5.1; 5.2; 5.3 | 26 | 1100 | 1026 | 1369 |
| 5.1 | 5 | img-026 | Tiêu đề khối hai cửa kiểm | Hai cửa kiểm khi chốt — FE-015 · FR-AITAI-02 | - | false | - | 42 | 1116 | 1010 | 1133 |
| 5.2 | 5 | img-027 | Bảng hai cửa kiểm và lý do từ chối | Cửa kiểmYêu cầu nguồnThời điểm đánh giáMàn phải hiển thị khi không thoả Hiệu lực 許可/承認 của 買出人 FR-PARTY-02 (P0 | - | false | - | 42 | 1144 | 1010 | 1266 |
| 5.3 | 5 | img-028 | Ghi chú nghiệm thu và tải cao điểm | FR-AITAI-02 nghiệm thu: "Hệ thống hiển thị lý do từ chối và không tạo giao dịch" — hai lý do phải phân biệt đư | - | false | - | 42 | 1277 | 1010 | 1342 |
| 6 | - | img-029 | Khối trạng thái màn | Trạng thái màn Mặc địnhBốn trường trống hoặc có giá trị đầu, nút bật. Rỗng — không có lô bán được Nêu rõ lý do | - | true | 6.1; 6.2 | 26 | 1382 | 1026 | 1653 |
| 6.1 | 6 | img-030 | Tiêu đề khối trạng thái màn | Trạng thái màn | - | false | - | 42 | 1398 | 1010 | 1416 |
