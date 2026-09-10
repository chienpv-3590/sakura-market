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
- **batch**: 2/4 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 3.2 | 3 | img-016 | Trường đã giao lũy kế | Đã giao lũy kế · 配送済み累計 — 60.00 — Tổng của mọi lần giao đã xác nhận, phải luôn khớp với bảng ở mục 4 | - | false | - | 287 | 435 | 521 | 530 |
| 3.3 | 3 | img-017 | Trường số lượng còn lại | Còn lại · 残数量 — 60.00 | - | false | - | 532 | 435 | 765 | 530 |
| 3.4 | 3 | img-018 | Trường tiến độ giao hàng | Tiến độ — 50% (2 lần giao dự kiến) | - | false | - | 776 | 435 | 1010 | 530 |
| 3.5 | 3 | img-019 | Sơ đồ FIG-029 vòng đời giao hàng một phần | Ghi nhận một lần giao → Đối chiếu số lượng lũy kế và còn lại → Còn lại lớn hơn 0 thì chờ lần giao tiếp theo; Còn lại bằng 0 thì chốt hoàn tất theo cổng kiểm BR-DEL-03 | - | false | - | 42 | 577 | 1010 | 730 |
| 3.6 | 3 | img-020 | Ghi chú vòng lặp mở của FIG-029 | Vòng lặp mở — RFP không đặt giới hạn số lần chia. Còn lại lớn hơn 0 thì giao hàng chưa hoàn tất, bất kể đã giao bao nhiêu lần | - | false | - | 42 | 733 | 1010 | 749 |
| 4 | - | img-021 | Khối ghi nhận lần giao mới | 3 · Ghi nhận lần giao mới (FE-021) | - | true | 4.1; 4.2; 4.3; 4.4; 4.5; 4.6 | 26 | 789 | 1026 | 999 |
| 4.1 | 4 | img-022 | Trường số lượng lần này | Số lượng lần này · 今回の数量 * — 60.00 — Lớn hơn 0, không vượt số lượng còn lại. Vượt thì phải đi đường ngoại lệ giao thừa ở SC-17 | - | false | - | 42 | 833 | 276 | 944 |
| 4.2 | 4 | img-023 | Trường thời điểm giao | Thời điểm giao · 配送日時 * — 2026-09-09 05:40 | - | false | - | 287 | 833 | 521 | 944 |
| 4.3 | 4 | img-024 | Trường người xác nhận lần giao | Người xác nhận · 実施者 — Người dùng B (từ phiên đăng nhập) — Hệ thống đặt, không nhận từ người nhập | - | false | - | 532 | 833 | 765 | 944 |
| 4.4 | 4 | img-025 | Trường lần thứ | Lần thứ · 回数 — 2 — hệ thống cấp, liên tục, không trùng | - | false | - | 776 | 833 | 1010 | 944 |
| 4.5 | 4 | img-026 | Nút ghi nhận lần giao | Ghi nhận lần giao | - | false | - | 42 | 954 | 159 | 983 |
| 4.6 | 4 | img-027 | Nhãn giới hạn vai trò của đường ghi | chỉ vai vận chuyển | - | false | - | 163 | 960 | 257 | 979 |
| 5 | - | img-028 | Khối bảng các lần giao | 4 · Các lần giao — bảng chỉ đọc, sắp theo lần tăng dần | - | true | 5.1; 5.2 | 26 | 1012 | 1026 | 1206 |
| 5.1 | 5 | img-029 | Bảng các lần giao bảy cột | Lần · Mã lần giao · Số lượng · Thời điểm giao · Ngày nghiệp vụ · Người xác nhận · Ngoại lệ liên quan | - | true | 5.1.1; 5.1.2; 5.1.3 | 42 | 1056 | 1010 | 1160 |
| 5.1.1 | 5.1 | img-030 | Hàng tiêu đề bảng các lần giao | Lần回数 / Mã lần giao / Số lượng数量 / Thời điểm giao配送日時 / Ngày nghiệp vụ業務日 / Người xác nhận実施者 / Ngoại lệ liên quan | - | false | - | 43 | 1057 | 1010 | 1100 |
