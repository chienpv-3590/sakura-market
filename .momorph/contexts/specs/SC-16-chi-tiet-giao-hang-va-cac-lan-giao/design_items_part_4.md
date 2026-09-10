# Design Context - SC-16 · Chi tiết giao hàng và các lần giao

## Screen info

- **screen**: SC-16 · Chi tiết giao hàng và các lần giao
- **source-family**: image
- **source-token**: SC-16-chi-tiet-giao-hang-va-cac-lan-giao
- **source-image**: .momorph/shots/SC-16-chi-tiet-giao-hang-va-cac-lan-giao.png
- **canvas**: 1280 x 2329 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-020 · FE-021 · FE-022 · FE-024 (FN-06) · ưu tiên P0 và P1
- **requirement-refs**: FR-DEL-01 (RFP:681) · FR-DEL-02 (RFP:682) · FR-DEL-04 (RFP:684) · FR-DEL-05 (RFP:685) · BR-DEL-03 (RFP:599) · lưu ý RFP:691
- **data-domain**: D-DELIVERY · D-TRADE · D-SETTLE (RFP:733-734)
- **state-machine**: FIG-029 (RFP:714) vòng đời giao hàng một phần; FIG-014 (RFP:693) luồng ngoại lệ
- **actor**: Bộ phận vận chuyển ghi lần giao; bộ phận đối chiếu chốt hoàn tất
- **note**: Hai đường ghi trên một màn với hai vai trò khác nhau
- **batch**: 4/4 (3 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 8 | - | img-046 | Khối đối chiếu thiết kế và prototype | ĐỐI CHIẾU PROTOTYPE | - | true | 8.1 | 26 | 1823 | 1026 | 2244 |
| 8.1 | 8 | img-047 | Bảng đối chiếu ba cột | Thiết kế đòi / Prototype làm / Mức — sáu dòng lệch: liên kết quyết toán; hai chế độ khoá kỳ; quy tắc quyết toán; lũy kế và tổng lần giao; ngoại lệ khoá đường chốt; ba câu hỏi để ngỏ của RFP | - | false | - | 42 | 1867 | 1010 | 2228 |
| 9 | - | img-048 | Ghi chú chân màn về phân quyền | Phân quyền: đọc mở cho mọi vai đang hoạt động; ghi lần giao thuộc vai vận chuyển; chốt hoàn tất thuộc vai đối chiếu. Ranh giới này chưa được RFP chốt | - | false | - | 26 | 2259 | 1026 | 2307 |
