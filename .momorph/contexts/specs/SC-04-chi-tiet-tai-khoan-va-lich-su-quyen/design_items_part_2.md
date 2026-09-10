# Design Context - SC-04 Chi tiết tài khoản và lịch sử quyền

- Nguồn: ảnh `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.png` (1280x1823; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 2/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 3.10 | 3 | img-016 | Nút Lưu thay đổi quyền | Lưu thay đổi quyền |  | false |  | 532 | 522 | 657 | 551 |
| 3.11 | 3 | img-017 | Nút Mở khoá tạm | Mở khoá tạm |  | false |  | 661 | 522 | 757 | 551 |
| 3.12 | 3 | img-018 | Nút Tạm ngừng | Tạm ngừng |  | false |  | 760 | 522 | 846 | 551 |
| 3.13 | 3 | img-019 | Ghi chú đổi vai trò làm phiên chưa đủ mức | Đổi vai trò sang một vai trò thuộc diện bắt buộc MFA làm phiên hiện tại của người đó không còn đủ mức → lần điều hướng kế tiếp của họ quay về SC-02. |  | false |  | 532 | 554 | 1010 | 586 |
| 4 |  | img-020 | Khối lịch sử quyền before/after | 2 · Lịch sử quyền — before/after; FR-IAM-02 bắt buộc hiển thị |  | true | img-021; img-022; img-025 | 26 | 749 | 1026 | 991 |
| 4.1 | 4 | img-021 | Tiêu đề khối lịch sử quyền | 2 · Lịch sử quyền — before/after; FR-IAM-02 bắt buộc hiển thị |  | false |  | 42 | 765 | 1010 | 782 |
| 4.2 | 4 | img-022 | Bảng lịch sử quyền | Thời điểm / Loại thay đổi / Trước (vai trò · quyền) / Sau (vai trò · quyền) / Lý do / Chủ thể thực hiện |  | true | img-023; img-024 | 42 | 793 | 1010 | 913 |
| 4.2.1 | 4.2 | img-023 | Dòng lịch sử quyền (đại diện) | 2026-02-11 09:14 / cấp quyền / — / ROLE-INTAKE · đang hoạt động / Nhận việc tại quầy tiếp nhận / Quản trị A |  | false |  | 43 | 821 | 1010 | 852 |
| 4.2.2 | 4.2 | img-024 | Thẻ loại thay đổi trong dòng (đại diện) | cấp quyền |  | false |  | 168 | 827 | 228 | 846 |
| 4.3 | 4 | img-025 | Ghi chú năm loại thay đổi và tính chỉ ghi thêm | Bốn loại đầu đều là thay đổi quyền theo FR-IAM-02; loại thứ năm thuộc NFR-SEC-03. Cả hai cột Trước và Sau mang cặp giá trị. Lịch sử chỉ ghi thêm. |  | false |  | 42 | 916 | 1010 | 965 |
| 5 |  | img-026 | Khối trạng thái màn | Trạng thái |  | true | img-027; img-028 | 26 | 1004 | 1026 | 1275 |
| 5.1 | 5 | img-027 | Tiêu đề khối trạng thái màn | Trạng thái |  | false |  | 42 | 1020 | 1010 | 1037 |
| 5.2 | 5 | img-028 | Lưới thẻ trạng thái màn | Chưa có thay đổi nào / Đang tải / Lỗi tải / Không có quyền / Không tìm thấy tài khoản / Thiếu lý do / Bị chặn theo quy tắc / Xung đột |  | true | img-029 | 42 | 1048 | 1010 | 1259 |
| 5.2.1 | 5.2 | img-029 | Thẻ trạng thái màn (đại diện) | Chưa có thay đổi nào — Khối 1 đầy đủ; khối 2 chỉ có dòng cấp quyền đầu tiên. Nếu trống hẳn thì phải nói rõ là thiếu dấu vết. |  | false |  | 42 | 1048 | 277 | 1158 |
| 6 |  | img-030 | Khối đối chiếu prototype | ĐỐI CHIẾU PROTOTYPE |  | true | img-031; img-032 | 26 | 1288 | 1026 | 1667 |
