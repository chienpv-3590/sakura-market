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
- **batch**: 2/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2.7 | 2 | img-016 | Ghi chú cột bắt buộc và hiệu năng | Cột Ngày nghiệp vụ phải có mặt vì nó là tiêu chí lọc — lọc theo một trường mà không thấy trường đó trong kết q | - | false | - | 42 | 483 | 1010 | 532 |
| 3 | - | img-017 | Khung 2 — Chi tiết bản ghi và lịch sử chỉnh sửa | Khung 2 — Chi tiết bản ghi, sửa có kiểm soát, và lịch sử Lô hàng · ロット LOT-0003 — Cá C Lô là cái định danh bản | - | true | 3.1; 3.2; 3.3; 3.4; 3.5; 3.6; 3.7; 3.8; 3.9; 3.10; 3.11; 3.12; 3.13 | 26 | 571 | 1026 | 1240 |
| 3.1 | 3 | img-018 | Tiêu đề khung chi tiết | Khung 2 — Chi tiết bản ghi, sửa có kiểm soát, và lịch sử | - | false | - | 42 | 587 | 1010 | 604 |
| 3.2 | 3 | img-019 | Trường Lô hàng (chỉ đọc) | Lô hàng · ロット LOT-0003 — Cá C Lô là cái định danh bản ghi, không sửa được ở đây. Ghi sai lô thì phải hủy bản g | - | false | - | 42 | 615 | 521 | 710 |
| 3.3 | 3 | img-020 | Trường Người thắng (sửa được) | Người thắng · 落札者 * Người tham gia B ▾ Là một trong năm trường FR-SERI-02 đòi lưu, nên nó cũng nằm trong phạm  | - | false | - | 532 | 615 | 1010 | 710 |
| 3.4 | 3 | img-021 | Trường Số lượng (sửa được) | Số lượng · 数量 * 80,00 Sửa số lượng vẫn phải tôn trọng FR-LOT-03 · BR-LOT-02: không làm số khả dụng của lô âm. | - | false | - | 42 | 720 | 521 | 799 |
| 3.5 | 3 | img-022 | Trường Đơn giá (sửa được) | Đơn giá · 単価 (JPY) * 2 400 | - | false | - | 532 | 720 | 1010 | 799 |
| 3.6 | 3 | img-023 | Trường Thời điểm quyết định (sửa được) | Thời điểm quyết định · 決定時刻 * 2026-09-09 06:35 Không nhận thời điểm tương lai. | - | false | - | 42 | 809 | 521 | 904 |
| 3.7 | 3 | img-024 | Trường Người xác nhận (sửa được) | Người xác nhận · 確認者 * Người dùng A ▾ Đổi người xác nhận là đổi người chịu trách nhiệm — dòng lịch sử phải gọi | - | false | - | 532 | 809 | 1010 | 904 |
| 3.8 | 3 | img-025 | Trường Lý do chỉnh sửa | Lý do chỉnh sửa · 修正理由 * Lệch với sổ tay tại sàn, sửa lại đơn giá Bắt buộc tuyệt đối. Đây là nửa thứ hai của n | - | false | - | 42 | 914 | 1010 | 983 |
| 3.9 | 3 | img-026 | Nút Lưu thay đổi | Lưu thay đổi | - | false | - | 42 | 993 | 133 | 1022 |
| 3.10 | 3 | img-027 | Chỉ dẫn cho vai chỉ tra cứu | Vai ngoài {ROLE-TRADE, ROLE-SETTLEMENT}: chỉ tra cứu | - | false | - | 137 | 993 | 449 | 1022 |
| 3.11 | 3 | img-028 | Tiêu đề mục Lịch sử chỉnh sửa | Lịch sử chỉnh sửa · 変更履歴 — before/after · FR-SERI-03 | - | false | - | 42 | 1035 | 1010 | 1052 |
| 3.12 | 3 | img-029 | Bảng lịch sử chỉnh sửa before/after | Thời điểmNgười thực hiệnTrườngTrướcSauLý do 2026-09-09 09:24Người dùng BNgười thắng Người tham gia CNgười tham | - | false | - | 42 | 1063 | 1010 | 1178 |
| 3.13 | 3 | img-030 | Ghi chú quy tắc đọc lịch sử | Một dòng cho mỗi trường đã đổi, tên trường bằng tiếng nghiệp vụ, mới nhất trước. Mọi lần thử ghi vào ngày đã l | - | false | - | 42 | 1181 | 1010 | 1213 |
