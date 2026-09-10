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
- **batch**: 3/3 (6 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 6.2 | 6 | img-031 | Lưới thẻ trạng thái màn | Mặc địnhBốn trường trống hoặc có giá trị đầu, nút bật. Rỗng — không có lô bán được Nêu rõ lý do và đường đi ti | - | true | 6.2.1 | 42 | 1427 | 1010 | 1637 |
| 6.2.1 | 6.2 | img-032 | Thẻ trạng thái màn (đại diện) | Mặc địnhBốn trường trống hoặc có giá trị đầu, nút bật. | - | false | - | 42 | 1427 | 277 | 1519 |
| 7 | - | img-033 | Khối đối chiếu prototype | Đối chiếu prototype Thiết kế đòiPrototype làmMức FIG-012 có trạng thái Chờ xác nhận giữa Nháp và Đã chốt, kèm  | - | true | 7.1; 7.2 | 26 | 1666 | 1026 | 1941 |
| 7.1 | 7 | img-034 | Tiêu đề khối đối chiếu prototype | Đối chiếu prototype | - | false | - | 42 | 1682 | 1010 | 1699 |
| 7.2 | 7 | img-035 | Bảng đối chiếu thiết kế và prototype | Thiết kế đòiPrototype làmMức FIG-012 có trạng thái Chờ xác nhận giữa Nháp và Đã chốt, kèm cạnh từ chối Trạng t | - | false | - | 42 | 1710 | 1010 | 1925 |
| 8 | - | img-036 | Khối ghi chú phân quyền và audit | Phân quyền: hành động ghi thuộc ROLE-TRADE (TBL-ROLE-01). Quyền đọc mở rộng cho các vai đang hoạt động để đối  | - | false | - | 26 | 1956 | 1026 | 2039 |
