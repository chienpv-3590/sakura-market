# Design Context - scr023-024-rule-version

- Screen: SC-24 · Tạo và phê duyệt phiên bản biểu suất
- Source family: image (`.momorph/shots/SC-24-tao-va-phe-duyet-phien-ban-bieu-suat.png`)
- Source token: SC-24-tao-va-phe-duyet-phien-ban-bieu-suat
- Image space: 1280 x 2560 px; deviceScaleFactor 1
- Batch: 2 / 4 (15 item mỗi phần)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.1 | 4 | img-016 | Ô hiển thị Phiên bản | v4 | — | không | — | 42 | 845 | 357 | 894 |
| 4.2 | 4 | img-017 | Ô hiển thị Ngày hiệu lực | 2026-10-01 | — | không | — | 368 | 845 | 684 | 894 |
| 4.3 | 4 | img-018 | Ô hiển thị Trạng thái | Chờ duyệt | — | không | — | 695 | 845 | 1010 | 894 |
| 4.4 | 4 | img-019 | Ô hiển thị Người lập | Người dùng D | — | không | — | 42 | 904 | 357 | 999 |
| 4.5 | 4 | img-020 | Ô hiển thị Người duyệt | — (điền khi phê duyệt) | — | không | — | 368 | 904 | 684 | 999 |
| 4.6 | 4 | img-021 | Ô hiển thị Nội dung biểu suất | Hệ số 110/100 · tỷ lệ chi trả | — | không | — | 695 | 904 | 1010 | 999 |
| 4.7 | 4 | img-022 | Nút Phê duyệt | Phê duyệt | — | không | — | 42 | 1020 | 121 | 1049 |
| 4.8 | 4 | img-023 | Ô chọn Rollback về phiên bản | v2 (2026-08-01) ▾ | — | không | — | 42 | 1060 | 1010 | 1129 |
| 4.9 | 4 | img-024 | Nút Rollback | Rollback | — | không | — | 42 | 1139 | 113 | 1168 |
| 4.10 | 4 | img-025 | Ghi chú điều kiện hiện hai nút thao tác | Nút Phê duyệt chỉ hiện khi đang chờ duyệt; nút Rollback chỉ hiện khi đang hiệu lực. Cả hai đều ghi dấu vết kiểm toán kèm lý do. | — | không | — | 42 | 1171 | 1010 | 1187 |
| 5 | — | img-026 | Khối maker-checker khi bạn là người lập | Maker-checker (GOV-RULE-01) — trường hợp bạn là người lập | — | có | img-027 · img-028 · img-029 | 26 | 1227 | 1026 | 1424 |
| 5.1 | 5 | img-027 | Nút Phê duyệt ở trạng thái vô hiệu | Phê duyệt | — | không | — | 42 | 1333 | 121 | 1362 |
| 5.2 | 5 | img-028 | Nút Rollback ở trạng thái vô hiệu | Rollback | — | không | — | 124 | 1333 | 195 | 1362 |
| 5.3 | 5 | img-029 | Ghi chú chặn thật nằm ở server | Ẩn nút chỉ là gợi ý trình bày. Chặn thật phải ở server và phải chặn cả khi gọi API trực tiếp. | — | không | — | 42 | 1365 | 1010 | 1398 |
| 6 | — | img-030 | Khối bất biến thiết kế — thay đổi không làm biến dạng dữ liệu đã chốt | Bất biến thiết kế — thay đổi không làm biến dạng dữ liệu đã chốt | — | không | — | 26 | 1437 | 1026 | 1557 |
