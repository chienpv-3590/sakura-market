# Design Context - lot-detail

- Nguồn: `.momorph/shots/SC-10-chi-tiet-lo-hang-va-dieu-chinh.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-10-chi-tiet-lo-hang-va-dieu-chinh` · screen-name: `lot-detail`
- Khung ảnh: 1280 x 2556 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-10-chi-tiet-lo-hang-va-dieu-chinh-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 2 of 3 - items 4.1 .. 6.5

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.1 | 4 | img-016 | Trường kết quả thẩm định | Kết quả thẩm định · 目利き結果 — Trên A; thân dày; mắt trong |  | false |  | 42 | 763 | 357 | 812 |
| 4.2 | 4 | img-017 | Trường người xác nhận | Người xác nhận · 評価担当者 — Người đánh giá A |  | false |  | 368 | 763 | 684 | 812 |
| 4.3 | 4 | img-018 | Trường thời điểm ghi nhận | Thời điểm ghi nhận · 評価日時 — 2026-09-09 03:10 JST |  | false |  | 695 | 763 | 1010 | 812 |
| 4.4 | 4 | img-019 | Ghi chú nguồn của kết quả đánh giá | Nghiệm thu FR-LOT-02 đòi với mỗi kết quả truy ngược được người ghi và thời điểm — nên khối này lấy dữ liệu từ bản ghi đánh giá |  | false |  | 42 | 825 | 1010 | 841 |
| 5 |  | img-020 | Khối chứng từ tiếp nhận | Chứng từ tiếp nhận — FR-LOT-01 |  | true | img-021; img-023; img-024 | 26 | 881 | 1026 | 1111 |
| 5.1 | 5 | img-021 | Bảng danh sách chứng từ | Tệp · ファイル \| Loại chứng từ \| Dung lượng · サイズ \| Thời điểm tải lên · アップロード日時 |  | true | img-022 | 42 | 925 | 1010 | 1011 |
| 5.1.1 | 5.1 | img-022 | Dòng chứng từ (đại diện cho hai dòng mẫu) | chung-tu-tiep-nhan-01.pdf \| Phiếu tiếp nhận \| 412.5 KB \| 2026-09-09 02:41 JST |  | false |  | 43 | 953 | 1010 | 981 |
| 5.2 | 5 | img-023 | Nút đính kèm thêm chứng từ | Đính kèm thêm chứng từ |  | false |  | 42 | 1020 | 197 | 1049 |
| 5.3 | 5 | img-024 | Ghi chú đường đính kèm bù | Phải có đường đính kèm ở đây; vì SC-08 chỉ người dùng sang màn này khi chứng từ lỗi |  | false |  | 42 | 1052 | 1010 | 1084 |
| 6 |  | img-025 | Khối điều chỉnh thuộc tính | Điều chỉnh thuộc tính — FE-012 · FR-LOT-04 |  | true | img-026; img-027; img-028; img-029; img-030; img-031 | 26 | 1124 | 1026 | 1380 |
| 6.1 | 6 | img-026 | Trường chọn trường cần sửa | Trường cần sửa · 修正する項目 * — Mặt hàng ▾ · Số kiện · Danh sách trắng hẹp; có chủ đích |  | false |  | 42 | 1168 | 276 | 1279 |
| 6.2 | 6 | img-027 | Trường giá trị hiện tại | Giá trị hiện tại · 現在値 — Mặt hàng mẫu · Hiện trước khi sửa — nửa before của cặp before/after |  | false |  | 287 | 1168 | 521 | 1279 |
| 6.3 | 6 | img-028 | Trường giá trị mới | Giá trị mới · 新しい値 * — Nhập giá trị mới · Kiểu và ràng buộc đổi theo trường đã chọn; cùng ngưỡng với SC-08 |  | false |  | 532 | 1168 | 765 | 1279 |
| 6.4 | 6 | img-029 | Trường lý do sửa | Lý do sửa · 修正理由 * — Nhập lý do sửa · Nghiệm thu FR-LOT-04: bản ghi điều chỉnh phải có reason; chủ thể và before/after |  | false |  | 776 | 1168 | 1010 | 1279 |
| 6.5 | 6 | img-030 | Nút lưu điều chỉnh | Lưu điều chỉnh |  | false |  | 42 | 1289 | 145 | 1318 |
