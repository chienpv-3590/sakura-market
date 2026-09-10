# Design Context - scr018-reconcile-and-lock

## Screen info

- source family: `image`
- source token: `SC-18-bang-doi-chieu-ngay-va-lock-ky`
- source image: `.momorph/shots/SC-18-bang-doi-chieu-ngay-va-lock-ky.png` (1280x2517 px)
- targetLanguage: Vietnamese
- screen: SC-18 · Bảng đối chiếu ngày và lock kỳ
- batch: 2/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.2 | 4 | img-016 | Thẻ định nghĩa Bản ghi đấu giá | Kết quả cuối cùng đã ghi nhận của ngày; kèm người xác nhận (FR-SERI-02) | - | false | - | 286 | 746 | 522 | 856 |
| 4.3 | 4 | img-017 | Thẻ định nghĩa Giao hàng | Lần giao có ngày nghiệp vụ của chính nó bằng ngày này — không lấy theo ngày của giao dịch mẹ | - | false | - | 531 | 746 | 766 | 856 |
| 4.4 | 4 | img-018 | Thẻ định nghĩa Ngoại lệ giao hàng | Ngoại lệ đã xác nhận của ngày này (FE-023). Thành phần thứ ba FR-SETTLE-01 đòi | - | false | - | 775 | 746 | 1010 | 856 |
| 5 | - | img-019 | Khối 4 — lock ngày nghiệp vụ | 4 · Lock ngày nghiệp vụ (FE-026 · FR-SETTLE-02) — không hoàn tác được | - | true | img-020; img-021; img-022; img-027 | 26 | 885 | 1026 | 1270 |
| 5.1 | 5 | img-020 | Nút Lock ngày nghiệp vụ | Lock ngày nghiệp vụ · 業務日をロック | - | false | - | 42 | 929 | 264 | 958 |
| 5.2 | 5 | img-021 | Thẻ điều kiện hiện nút lock | chỉ bộ phận đối chiếu; chỉ khi ngày chưa lock | - | false | - | 268 | 934 | 479 | 954 |
| 5.3 | 5 | img-022 | Hộp xác nhận lock | Xác nhận rõ ràng — bước bắt buộc; kiểm ở cả giao diện và hệ thống | - | true | img-023; img-024; img-025; img-026 | 42 | 969 | 1010 | 1208 |
| 5.3.1 | 5.3 | img-023 | Tiêu đề hộp xác nhận | Xác nhận rõ ràng — bước bắt buộc; kiểm ở cả giao diện và hệ thống | - | false | - | 58 | 985 | 994 | 1002 |
| 5.3.2 | 5.3 | img-024 | Ô gõ lại ngày để xác nhận | 2026-09-09 | - | false | - | 58 | 1068 | 994 | 1153 |
| 5.3.3 | 5.3 | img-025 | Nút Xác nhận lock | Xác nhận lock | - | false | - | 58 | 1163 | 156 | 1192 |
| 5.3.4 | 5.3 | img-026 | Nút Hủy trong hộp xác nhận | Hủy | - | false | - | 160 | 1163 | 208 | 1192 |
| 5.4 | 5 | img-027 | Ghi chú hệ quả sau khi lock | Lock xong kéo theo chốt số của ngày; mở đường xuất kế toán (SC-27 · IF-ACC-01) và tính 完納奨励金 theo FIG-013 (SC-22) | - | false | - | 42 | 1211 | 1010 | 1244 |
| 6 | - | img-028 | Khối 5 — bảng đường vào sau khi lock | 5 · Sau khi lock — BR-CLOSE-01 · FR-CORR-03 · FE-026 | - | true | img-029; img-030 | 26 | 1283 | 1026 | 1562 |
| 6.1 | 6 | img-029 | Bảng đường vào và kết quả sau lock | Đường vào \| Sau khi lock \| Ghi log | - | false | - | 42 | 1327 | 1010 | 1500 |
| 6.2 | 6 | img-030 | Ghi chú nghiệm thu hai điều kiện | Nghiệm thu FR-CORR-03 là hai điều kiện cùng lúc: mọi lần thử sửa trực tiếp đều bị chặn và đều có log | - | false | - | 42 | 1503 | 1010 | 1535 |
