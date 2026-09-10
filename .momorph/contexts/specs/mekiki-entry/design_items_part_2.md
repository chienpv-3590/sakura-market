# Design Context - mekiki-entry

- Nguồn: `.momorph/shots/SC-09-ghi-nhan-ket-qua-mekiki.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-09-ghi-nhan-ket-qua-mekiki` · screen-name: `mekiki-entry`
- Khung ảnh: 1280 x 1713 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-09-ghi-nhan-ket-qua-mekiki-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 2 of 2 - items 5.2 .. 8

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 5.2 | 5 | img-016 | Trường thời điểm ghi nhận | Thời điểm ghi nhận · 評価日時 — Hệ thống đặt; neo JST · Thời điểm thực của việc ghi; không phải ngày nghiệp vụ |  | false |  | 287 | 673 | 521 | 801 |
| 5.3 | 5 | img-017 | Trường ngày nghiệp vụ của bản ghi | Ngày nghiệp vụ của bản ghi · 業務日 — Kế thừa từ lô hàng · Lô nhận ngày N; đánh giá ngày N+1 thì bản ghi vẫn thuộc kỳ N |  | false |  | 532 | 673 | 765 | 801 |
| 5.4 | 5 | img-018 | Trường trạng thái lô sau khi lưu | Trạng thái lô sau khi lưu · 状態 — Tiếp nhận → Đã 下見 (bước 2/5) · không nhảy thẳng sang Công bố |  | false |  | 776 | 673 | 1010 | 801 |
| 5.5 | 5 | img-019 | Ghi chú chưa chốt về tên trạng thái và tên màn | CHƯA CHỐT — Tên màn là Ghi nhận kết quả 目利き nhưng FIG-011 gọi cạnh này là đăng ký 下見 |  | false |  | 42 | 814 | 1010 | 866 |
| 6 |  | img-020 | Khối trạng thái màn | Trạng thái |  | true | img-021; img-022; img-023; img-024; img-025; img-026; img-027 | 26 | 905 | 1026 | 1193 |
| 6.1 | 6 | img-021 | Trạng thái sẵn sàng nhập | Sẵn sàng nhập — Đúng vai trò và lô còn ở bước 1: một trường nhập; con trỏ đã ở trong đó |  | false |  | 42 | 949 | 277 | 1059 |
| 6.2 | 6 | img-022 | Trạng thái không tìm thấy lô | Không tìm thấy lô — Mã lô không tồn tại: nói rõ; kèm đường về danh sách lô |  | false |  | 286 | 949 | 522 | 1059 |
| 6.3 | 6 | img-023 | Trạng thái sai vai trò | Sai vai trò — Vẫn xem được ngữ cảnh lô; form đổi thành dòng nói rõ chỉ người đánh giá mới ghi được |  | false |  | 531 | 949 | 766 | 1059 |
| 6.4 | 6 | img-024 | Trạng thái đã có kết quả | Đã có kết quả — Lô đã qua bước đánh giá: hiện kết quả đã ghi kèm người và thời điểm; không hiện form nhập mới |  | false |  | 775 | 949 | 1010 | 1059 |
| 6.5 | 6 | img-025 | Trạng thái đang gửi hoặc gửi lỗi | Đang gửi / gửi lỗi — Trường vô hiệu; nút báo đang lưu. Lỗi thì giữ nguyên nội dung đã nhập |  | false |  | 42 | 1068 | 277 | 1177 |
| 6.6 | 6 | img-026 | Trạng thái xung đột đồng thời | Xung đột đồng thời — Hai người đánh giá bấm cùng lúc: người sau bị từ chối vì lô đã rời bước 1; không tạo bản ghi thứ hai |  | false |  | 286 | 1068 | 522 | 1177 |
| 6.7 | 6 | img-027 | Trạng thái ngày nghiệp vụ đã lock | Ngày nghiệp vụ đã lock — không được ghi thêm kết quả vào kỳ đó; từ chối trước khi ghi và chỉ dẫn sang luồng điều chỉnh sau chốt |  | false |  | 531 | 1068 | 766 | 1177 |
| 7 |  | img-028 | Khối đối chiếu prototype | Đối chiếu prototype |  | true | img-029 | 26 | 1206 | 1026 | 1593 |
| 7.1 | 7 | img-029 | Bảng đối chiếu ba cột | Thiết kế đòi \| Prototype làm \| Mức |  | false |  | 42 | 1250 | 1010 | 1577 |
| 8 |  | img-030 | Ghi chú chân màn về phân quyền và đường đọc kết quả | Phân quyền: ghi thuộc vai trò người đánh giá; chặn ở tầng API và tầng dữ liệu. Ghi chú: kết quả phải xem lại được ở chi tiết lô và ở báo cáo lịch sử lô hàng |  | false |  | 26 | 1608 | 1026 | 1691 |
