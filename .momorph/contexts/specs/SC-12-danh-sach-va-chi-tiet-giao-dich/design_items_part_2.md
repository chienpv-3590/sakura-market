# Design Context - SC-12 · Danh sách và chi tiết giao dịch

## Screen info

- **screen**: SC-12 · Danh sách và chi tiết giao dịch
- **source-family**: image
- **source-token**: SC-12-danh-sach-va-chi-tiet-giao-dich
- **source-image**: .momorph/shots/SC-12-danh-sach-va-chi-tiet-giao-dich.png
- **canvas**: 1280 x 2143 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-017 (P0) · FE-016 (P1) · FE-014 (P0) · FN-04
- **requirement-refs**: FR-AITAI-01 · FR-AITAI-03 · FR-CORR-01 · FR-CORR-03 · BR-CLOSE-01 · BR-LOT-02 · FR-AUDIT-01 · NFR-PERF-01 · NFR-PERF-02
- **state-machine**: FIG-012 (RFP:637) — phủ cả 相対取引 và せり
- **actor**: ROLE-TRADE hành động; các vai đang hoạt động còn lại tra cứu
- **note**: Một mã SC- ứng hai màn con: danh sách và chi tiết
- **batch**: 2/3 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2.6.2 | 2.6 | img-016 | Nút Hủy trên dòng | Hủy | - | false | - | 926 | 369 | 974 | 398 |
| 2.7 | 2 | img-017 | Ghi chú phân trang và hiệu năng | Mã lô luôn hiện dạng người đọc được (LOT-0001), không bao giờ là khoá nội bộ. NFR-PERF-02 · FIG-LOAD-01: cao đ | - | false | - | 42 | 527 | 1010 | 561 |
| 3 | - | img-018 | Khung 2 — Chi tiết giao dịch và thao tác | Khung 2 — Chi tiết giao dịch và thao tác · FE-016 · FE-017 Vòng đời bản ghi · 状態遷移 (FIG-012) Nháp ─ gửi ─▸ Chờ | - | true | 3.1; 3.2; 3.3; 3.4; 3.5; 3.6; 3.7; 3.8; 3.9; 3.10; 3.11; 3.12; 3.13; 3.14; 3.15; 3.16; 3.17; 3.18 | 26 | 600 | 1026 | 1356 |
| 3.1 | 3 | img-019 | Tiêu đề khung chi tiết | Khung 2 — Chi tiết giao dịch và thao tác · FE-016 · FE-017 | - | false | - | 42 | 616 | 1010 | 633 |
| 3.2 | 3 | img-020 | Dải vòng đời bản ghi | Vòng đời bản ghi · 状態遷移 (FIG-012) Nháp ─ gửi ─▸ Chờ xác nhận [CHƯA CHỐT] ─ phê duyệt ─▸ ● Đã chốt ─▸ Hủy / Đín | - | false | - | 42 | 644 | 1010 | 730 |
| 3.3 | 3 | img-021 | Trường Mã giao dịch (chỉ đọc) | Mã giao dịch · 取引番号 TXN-0001 | - | false | - | 42 | 741 | 357 | 790 |
| 3.4 | 3 | img-022 | Trường Lô hàng (chỉ đọc) | Lô hàng · ロット LOT-0001 — Cá A | - | false | - | 368 | 741 | 684 | 790 |
| 3.5 | 3 | img-023 | Trường Người mua (chỉ đọc) | Người mua · 買出人 Người tham gia A | - | false | - | 695 | 741 | 1010 | 790 |
| 3.6 | 3 | img-024 | Trường Số lượng (chỉ đọc) | Số lượng · 数量 120,00 | - | false | - | 42 | 800 | 357 | 849 |
| 3.7 | 3 | img-025 | Trường Đơn giá (chỉ đọc) | Đơn giá · 単価 (JPY) 1 800 | - | false | - | 368 | 800 | 684 | 849 |
| 3.8 | 3 | img-026 | Trường Ngày nghiệp vụ (chỉ đọc) | Ngày nghiệp vụ · 業務日 2026-09-09 | - | false | - | 695 | 800 | 1010 | 849 |
| 3.9 | 3 | img-027 | Trường Người chốt (chỉ đọc) | Người chốt · 確定者 Người dùng A "Ai chốt, chốt lúc nào" phải đọc được ngay trên chi tiết, không phải suy từ bảng | - | false | - | 42 | 859 | 521 | 954 |
| 3.10 | 3 | img-028 | Trường Thời điểm chốt (chỉ đọc) | Thời điểm chốt · 確定時刻 2026-09-09 09:12 | - | false | - | 532 | 859 | 1010 | 954 |
| 3.11 | 3 | img-029 | Trường Lý do hủy | Lý do hủy · 取消理由 * Người mua rút hàng tại quầy FR-AITAI-03 đòi hủy kèm lý do và hoàn lại chính xác số lượng kh | - | false | - | 42 | 964 | 1010 | 1048 |
| 3.12 | 3 | img-030 | Trường Số lượng khả dụng trước và sau khi hủy | Số lượng khả dụng của lô — trước và sau khi hủy LOT-0001: 80,00 → 200,00 (hoàn lại đúng 120,00) Người vận hành | - | false | - | 42 | 1059 | 1010 | 1127 |
