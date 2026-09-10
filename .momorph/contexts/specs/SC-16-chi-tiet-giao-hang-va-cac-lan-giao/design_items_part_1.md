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
- **batch**: 1/4 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | - | img-001 | Khối đầu trang màn chi tiết giao hàng | SC-16 · Chi tiết giao hàng và các lần giao · FE-020 · FE-021 · FE-022 · FE-024 · FN-06 · P0 · P1 | - | true | 1.1; 1.2; 1.3 | 26 | 22 | 1026 | 138 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-16 · Chi tiết giao hàng và các lần giao | - | false | - | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-020 · FE-021 · FE-022 · FE-024 · FN-06 · ưu tiên P0 · P1 · yêu cầu FR-DEL-01; FR-DEL-02; FR-DEL-04; FR-DEL-05; BR-DEL-03 · miền D-DELIVERY · D-TRADE · D-SETTLE · sơ đồ FIG-029 · FIG-014 | - | false | - | 26 | 60 | 1026 | 115 |
| 1.3 | 1 | img-004 | Nhãn trạng thái thi công | Đã dựng | - | false | - | 660 | 95 | 713 | 115 |
| 2 | - | img-005 | Khối nhận dạng và liên kết giao hàng | 1 · Đầu trang — nhận dạng và liên kết (FE-020 · FE-024) | - | true | 2.1; 2.2; 2.3; 2.4; 2.5; 2.6; 2.7; 2.8 | 26 | 154 | 1026 | 378 |
| 2.1 | 2 | img-006 | Trường mã giao dịch | Mã giao dịch · 取引番号 — TXN-0001 | - | false | - | 42 | 199 | 276 | 294 |
| 2.2 | 2 | img-007 | Trường người tham gia | Người tham gia · 買出人 — Người tham gia B | - | false | - | 287 | 199 | 521 | 294 |
| 2.3 | 2 | img-008 | Trường ngày nghiệp vụ của giao dịch | Ngày nghiệp vụ của giao dịch · 業務日 — 2026-09-09 — Ngày của giao dịch, khác ngày nghiệp vụ của từng lần giao | - | false | - | 532 | 199 | 765 | 294 |
| 2.4 | 2 | img-009 | Trường trạng thái giao hàng | Trạng thái · 状態 — Đang giao · 配送中 — 4 giá trị FR-DEL-01: chờ · đang giao · hoàn tất · ngoại lệ | - | false | - | 776 | 199 | 1010 | 294 |
| 2.5 | 2 | img-010 | Liên kết sang lô hàng | Lô hàng LOT-0001 | - | false | - | 42 | 304 | 163 | 333 |
| 2.6 | 2 | img-011 | Liên kết sang bảng đối chiếu ngày | Bảng đối chiếu ngày 2026-09-09 | - | false | - | 166 | 304 | 359 | 333 |
| 2.7 | 2 | img-012 | Liên kết sang ngoại lệ giao hàng | Ngoại lệ giao hàng | - | false | - | 363 | 304 | 488 | 333 |
| 2.8 | 2 | img-013 | Ghi chú quan hệ hai chiều FR-DEL-04 | FR-DEL-04 đòi quan hệ hai chiều: từ đây sang bản quyết toán ngày và ngược lại, từ một dòng quyết toán truy được các lần giao. Liên kết phải có mọi lúc, không chỉ sau khi ngày đã lock | - | false | - | 42 | 336 | 1010 | 352 |
| 3 | - | img-014 | Khối lũy kế và số lượng còn lại | 2 · Lũy kế và số lượng còn lại (FE-021 · FR-DEL-05) | - | true | 3.1; 3.2; 3.3; 3.4; 3.5; 3.6 | 26 | 391 | 1026 | 776 |
| 3.1 | 3 | img-015 | Trường số lượng đặt | Số lượng đặt · 注文数量 — 120.00 | - | false | - | 42 | 435 | 276 | 530 |
