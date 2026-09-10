# Design Context - SC-17 · Ghi nhận ngoại lệ giao hàng

## Screen info

- **screen**: SC-17 · Ghi nhận ngoại lệ giao hàng
- **source-family**: image
- **source-token**: SC-17-ghi-nhan-ngoai-le-giao-hang
- **source-image**: .momorph/shots/SC-17-ghi-nhan-ngoai-le-giao-hang.png
- **canvas**: 1280 x 2172 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-023 (FN-06) · ưu tiên P1
- **requirement-refs**: FR-DEL-03 (RFP:683) · liên quan FR-DEL-01 (RFP:681) · FR-CORR-02 (RFP:657) · FR-SETTLE-01 · RPT-04 (RFP:747) · TBL-ATTACH-01 · DR-IMAGE-01
- **data-domain**: D-DELIVERY (RFP:733)
- **state-machine**: FIG-014 (RFP:693) luồng ngoại lệ khi giao hàng — ba nhánh
- **actor**: Bộ phận vận chuyển (đề xuất ROLE-DELIVERY)
- **note**: Màn thuần thiết kế: prototype chưa có bảng; route hay đường ghi nào cho ngoại lệ
- **batch**: 3/3 (4 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 6.6 | 6 | img-031 | Thẻ trạng thái Không có quyền | Không có quyền — Ghi thuộc vai vận chuyển; đọc mở cho mọi vai đang hoạt động vì bộ phận đối chiếu cần thấy ngoại lệ | - | false | - | 286 | 1508 | 522 | 1600 |
| 7 | - | img-032 | Khối đối chiếu thiết kế và prototype | ĐỐI CHIẾU PROTOTYPE | - | true | 7.1 | 26 | 1629 | 1026 | 2052 |
| 7.1 | 7 | img-033 | Bảng đối chiếu ba cột | Thiết kế đòi / Prototype làm / Mức — sáu dòng lệch: chưa có gì cho FE-023; trạng thái ngoại lệ không đặt được; RPT-04 phải để mẫu; ngoại lệ khoá đường chốt; cấp gắn ngoại lệ chưa quyết; quyền ghi và trần số lần chưa quyết | - | false | - | 42 | 1673 | 1010 | 2036 |
| 8 | - | img-034 | Ghi chú chân màn về phân quyền đề xuất và phụ thuộc | Phân quyền đề xuất: ghi ngoại lệ thuộc vai vận chuyển — vai duy nhất ghi được lần giao và là actor của FE-023. Bộ phận đối chiếu cần quyền đọc để lập bảng đối chiếu; có được quyền ghi hay không là câu hỏi còn mở. Phụ thuộc: vào từ SC-15 và SC-16; dữ liệu chảy sang SC-18 và RPT-04 | - | false | - | 26 | 2067 | 1026 | 2150 |
