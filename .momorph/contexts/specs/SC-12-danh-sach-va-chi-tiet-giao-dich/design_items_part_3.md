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
- **batch**: 3/3 (14 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 3.13 | 3 | img-031 | Nút Chốt | Chốt | - | false | - | 42 | 1138 | 94 | 1167 |
| 3.14 | 3 | img-032 | Nút Xác nhận hủy | Xác nhận hủy | - | false | - | 98 | 1138 | 194 | 1167 |
| 3.15 | 3 | img-033 | Chỉ dẫn cho vai chỉ tra cứu | Vai khác ROLE-TRADE: chỉ tra cứu, mục thao tác đổi thành chỉ dẫn | - | false | - | 198 | 1138 | 558 | 1167 |
| 3.16 | 3 | img-034 | Tiêu đề mục Lịch sử | Lịch sử · 履歴 | - | false | - | 42 | 1180 | 1010 | 1197 |
| 3.17 | 3 | img-035 | Bảng lịch sử thao tác | Thời điểmNgười thực hiệnHành độngLý doThay đổi 2026-09-09 09:12Người dùng AChốt giao dịch— Trạng thái: Nháp →  | - | false | - | 42 | 1208 | 1010 | 1294 |
| 3.18 | 3 | img-036 | Ghi chú nghĩa vụ audit | FR-AUDIT-01 (FE-041): mỗi dòng có chủ thể, timestamp, before/after và lý do. Mọi lần thử ghi vào ngày đã lock  | - | false | - | 42 | 1297 | 1010 | 1329 |
| 4 | - | img-037 | Khối trạng thái màn | Trạng thái màn Rỗng (danh sách)Nêu rõ bộ lọc đang áp và cho lọc lại. Đang tải · Lỗi tải Khung chờ cho bảng; lỗ | - | true | 4.1; 4.2 | 26 | 1369 | 1026 | 1723 |
| 4.1 | 4 | img-038 | Tiêu đề khối trạng thái màn | Trạng thái màn | - | false | - | 42 | 1385 | 1010 | 1402 |
| 4.2 | 4 | img-039 | Lưới thẻ trạng thái màn | Rỗng (danh sách)Nêu rõ bộ lọc đang áp và cho lọc lại. Đang tải · Lỗi tải Khung chờ cho bảng; lỗi tải phải phân | - | true | 4.2.1 | 42 | 1413 | 1010 | 1707 |
| 4.2.1 | 4.2 | img-040 | Thẻ trạng thái màn (đại diện) | Rỗng (danh sách)Nêu rõ bộ lọc đang áp và cho lọc lại. | - | false | - | 42 | 1413 | 277 | 1488 |
| 5 | - | img-041 | Khối đối chiếu prototype | Đối chiếu prototype Thiết kế đòiPrototype làmMức FIG-012: có Chờ xác nhận và cạnh từ chối; bộ lọc và thanh tiế | - | true | 5.1; 5.2 | 26 | 1736 | 1026 | 2023 |
| 5.1 | 5 | img-042 | Tiêu đề khối đối chiếu prototype | Đối chiếu prototype | - | false | - | 42 | 1752 | 1010 | 1769 |
| 5.2 | 5 | img-043 | Bảng đối chiếu thiết kế và prototype | Thiết kế đòiPrototype làmMức FIG-012: có Chờ xác nhận và cạnh từ chối; bộ lọc và thanh tiến trình phải phủ đủ  | - | false | - | 42 | 1780 | 1010 | 2007 |
| 6 | - | img-044 | Khối ghi chú phân quyền và gộp màn | Phân quyền: tra cứu mở cho các vai đang hoạt động để đối chiếu chéo; chốt và hủy thuộc ROLE-TRADE (TBL-ROLE-01 | - | false | - | 26 | 2038 | 1026 | 2121 |
