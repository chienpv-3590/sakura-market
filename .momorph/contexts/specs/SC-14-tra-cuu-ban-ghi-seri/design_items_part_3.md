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
- **batch**: 3/3 (8 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4 | - | img-031 | Khối trạng thái màn | Trạng thái màn Rỗng (danh sách)Nêu rõ bộ lọc đang áp và cho tìm lại. Đang tải · Lỗi tải Khung chờ cho bảng; lỗ | - | true | 4.1; 4.2 | 26 | 1253 | 1026 | 1659 |
| 4.1 | 4 | img-032 | Tiêu đề khối trạng thái màn | Trạng thái màn | - | false | - | 42 | 1269 | 1010 | 1286 |
| 4.2 | 4 | img-033 | Lưới thẻ trạng thái màn | Rỗng (danh sách)Nêu rõ bộ lọc đang áp và cho tìm lại. Đang tải · Lỗi tải Khung chờ cho bảng; lỗi tải phải phân | - | true | 4.2.1 | 42 | 1297 | 1010 | 1643 |
| 4.2.1 | 4.2 | img-034 | Thẻ trạng thái màn (đại diện) | Rỗng (danh sách)Nêu rõ bộ lọc đang áp và cho tìm lại. | - | false | - | 42 | 1297 | 277 | 1389 |
| 5 | - | img-035 | Khối đối chiếu prototype | Đối chiếu prototype Thiết kế đòiPrototype làmMức FR-SERI-02 + FR-SERI-03: người thắng là một trong năm trường  | - | true | 5.1; 5.2 | 26 | 1672 | 1026 | 2104 |
| 5.1 | 5 | img-036 | Tiêu đề khối đối chiếu prototype | Đối chiếu prototype | - | false | - | 42 | 1688 | 1010 | 1705 |
| 5.2 | 5 | img-037 | Bảng đối chiếu thiết kế và prototype | Thiết kế đòiPrototype làmMức FR-SERI-02 + FR-SERI-03: người thắng là một trong năm trường bắt buộc, sửa được v | - | false | - | 42 | 1716 | 1010 | 2088 |
| 6 | - | img-038 | Khối ghi chú phân quyền và đường sửa | Phân quyền: tra cứu mở cho các vai đang hoạt động để đối chiếu chéo; sửa thuộc ROLE-TRADE và ROLE-SETTLEMENT ( | - | false | - | 26 | 2119 | 1026 | 2202 |
