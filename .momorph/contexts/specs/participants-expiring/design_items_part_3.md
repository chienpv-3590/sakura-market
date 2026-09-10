# Design Context - participants-expiring

- Nguồn: `.momorph/shots/SC-07-canh-bao-hieu-luc-sap-het-han.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-07-canh-bao-hieu-luc-sap-het-han` · screen-name: `participants-expiring`
- Khung ảnh: 1280 x 2271 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-07-canh-bao-hieu-luc-sap-het-han-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 3 of 3 - items 7.1 .. 10

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 7.1 | 7 | img-031 | Bảng danh sách đường đăng ký chợ | Còn lại (ngày) \| Tên · 名称 \| Phân loại \| Ngày hết hiệu lực · 有効終了日 \| Trạng thái · 状態 \| Hành động |  | true | img-032 | 42 | 1255 | 1010 | 1354 |
| 7.1.1 | 7.1 | img-032 | Dòng cảnh báo đăng ký chợ (đại diện cho hai dòng mẫu) | 9 \| Người tham gia G \| 卸売業者 \| 2026-09-18 \| Có hiệu lực \| Ghi nhận đã đăng ký lại |  | false |  | 43 | 1283 | 1010 | 1323 |
| 7.2 | 7 | img-033 | Nút ghi nhận đã đăng ký lại | Ghi nhận đã đăng ký lại |  | false |  | 802 | 1288 | 949 | 1317 |
| 7.3 | 7 | img-034 | Nhãn chưa chốt ở ô hành động của 買出人 | CHƯA CHỐT |  | false |  | 802 | 1328 | 872 | 1348 |
| 7.4 | 7 | img-035 | Ghi chú 買出人 không có dòng trong FIG-004 | 買出人 không có dòng nào trong FIG-004 — không biết căn cứ tham gia là gì; nên cũng không biết thủ tục gia hạn nào áp dụng |  | false |  | 42 | 1357 | 1010 | 1389 |
| 8 |  | img-036 | Khối trạng thái màn | Trạng thái |  | true | img-037; img-038; img-039; img-040; img-041; img-042 | 26 | 1429 | 1026 | 1750 |
| 8.1 | 8 | img-037 | Trạng thái rỗng | Rỗng — Không ai vào khoảng cảnh báo: thông báo hiện riêng từng đường kèm ngưỡng đang áp dụng |  | false |  | 42 | 1473 | 277 | 1582 |
| 8.2 | 8 | img-038 | Trạng thái rỗng một đường | Rỗng một đường — Khối rỗng vẫn giữ tiêu đề và ngưỡng của nó; không ẩn cả khối |  | false |  | 286 | 1473 | 522 | 1582 |
| 8.3 | 8 | img-039 | Trạng thái đang tải hoặc lỗi tải | Đang tải / lỗi tải — Khung xương cho cả ba đường; lỗi tải có nút thử lại; giữ bộ lọc |  | false |  | 531 | 1473 | 766 | 1582 |
| 8.4 | 8 | img-040 | Trạng thái quá hạn mà trạng thái chưa đổi | Quá hạn mà trạng thái chưa đổi — Đã qua ngày hết hiệu lực nhưng trạng thái vẫn có hiệu lực: nhãn cảnh báo nặng hơn |  | false |  | 775 | 1473 | 1010 | 1582 |
| 8.5 | 8 | img-041 | Trạng thái đang gửi hoặc gửi lỗi | Đang gửi / gửi lỗi — Chỉ nút của đúng dòng đó bị vô hiệu; không khoá cả bảng |  | false |  | 42 | 1591 | 277 | 1734 |
| 8.6 | 8 | img-042 | Trạng thái không xác định được căn cứ | Không xác định được căn cứ — Dòng có cặp (phân loại, căn cứ) lệch: xếp riêng; không nhét vào đường nào |  | false |  | 286 | 1591 | 522 | 1734 |
| 9 |  | img-043 | Khối đối chiếu prototype | Đối chiếu prototype |  | true | img-044 | 26 | 1763 | 1026 | 2133 |
| 9.1 | 9 | img-044 | Bảng đối chiếu ba cột | Thiết kế đòi \| Prototype làm \| Mức |  | false |  | 42 | 1808 | 1010 | 2117 |
| 10 |  | img-045 | Ghi chú chân màn về phân quyền và cách tính ngày | Phân quyền: đề xuất vai trò quản trị người tham gia. Ghi chú: ngày hết hiệu lực để trống là vô hạn hạn; không bao giờ vào màn này |  | false |  | 26 | 2148 | 1026 | 2249 |
