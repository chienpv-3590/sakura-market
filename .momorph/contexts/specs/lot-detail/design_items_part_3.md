# Design Context - lot-detail

- Nguồn: `.momorph/shots/SC-10-chi-tiet-lo-hang-va-dieu-chinh.png` — image mode, chế độ CREATE, một ảnh một lượt
- source-token: `SC-10-chi-tiet-lo-hang-va-dieu-chinh` · screen-name: `lot-detail`
- Khung ảnh: 1280 x 2556 px, deviceScaleFactor=1
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Toạ độ đọc từ `SC-10-chi-tiet-lo-hang-va-dieu-chinh-dom-boxes.json` (`getBoundingClientRect()` thật), không ước lượng
- `reference_specs.md` để rỗng — image mode không có item-level reference

Batch 3 of 3 - items 6.6 .. 10

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 6.6 | 6 | img-031 | Ghi chú một trường một lý do một dòng lịch sử | Mỗi lần gửi sửa đúng một trường; một lý do; một dòng lịch sử — đó là nghĩa của có kiểm soát |  | false |  | 42 | 1321 | 1010 | 1354 |
| 7 |  | img-032 | Khối lịch sử điều chỉnh | Lịch sử điều chỉnh — FR-LOT-04; mới nhất trước |  | true | img-033; img-035 | 26 | 1393 | 1026 | 1643 |
| 7.1 | 7 | img-033 | Bảng bảy cột lịch sử điều chỉnh | Việc \| Trường \| Trước · 変更前 \| Sau · 変更後 \| Lý do · 理由 \| Người thực hiện \| Thời điểm · 日時 |  | true | img-034 | 42 | 1437 | 1010 | 1581 |
| 7.1.1 | 7.1 | img-034 | Dòng lịch sử điều chỉnh (đại diện cho bốn dòng mẫu) | Bị chặn vì đã lock \| Số kiện \| 10 \| 12 \| Đếm lại kiện sau kiểm đêm \| Đối chiếu A \| 2026-09-09 10:15 JST |  | false |  | 43 | 1465 | 1010 | 1494 |
| 7.2 | 7 | img-035 | Ghi chú phạm vi bảng lịch sử | Chỉ liệt trường thực sự đổi. Lần thử bị chặn vì lock cũng phải có dòng — BR-CLOSE-01 đòi mọi lần thử sửa sau lock đều bị chặn và ghi log |  | false |  | 42 | 1584 | 1010 | 1616 |
| 8 |  | img-036 | Khối trạng thái màn | Trạng thái |  | true | img-037; img-038; img-039; img-040; img-041; img-042 | 26 | 1656 | 1026 | 1943 |
| 8.1 | 8 | img-037 | Trạng thái rỗng | Rỗng — Chưa có chứng từ; điều chỉnh hay kết quả đánh giá: mỗi khối nói riêng; kèm hành động khả dụng của khối đó |  | false |  | 42 | 1700 | 277 | 1809 |
| 8.2 | 8 | img-038 | Trạng thái đang tải hoặc lỗi tải hoặc không tìm thấy | Đang tải / lỗi tải / không tìm thấy — Khung xương theo từng khối; một khối lỗi không làm mất các khối còn lại |  | false |  | 286 | 1700 | 522 | 1809 |
| 8.3 | 8 | img-039 | Trạng thái chỉ đọc vì thiếu quyền | Chỉ đọc vì thiếu quyền — Giữ nguyên khối điều chỉnh; đổi nội dung thành dòng nhắc vai trò phụ trách |  | false |  | 531 | 1700 | 766 | 1809 |
| 8.4 | 8 | img-040 | Trạng thái chỉ đọc vì ngày đã lock | Chỉ đọc vì ngày đã lock — Biết trước từ cờ lock ở khối tổng quan; nên chặn trước khi nhập |  | false |  | 775 | 1700 | 1010 | 1809 |
| 8.5 | 8 | img-041 | Trạng thái xung đột đồng thời | Xung đột đồng thời — Hai người sửa cùng một trường: người sau bị từ chối vì giá trị trước đã đổi; phải xem lại giá trị hiện tại rồi gửi lại |  | false |  | 42 | 1818 | 277 | 1927 |
| 8.6 | 8 | img-042 | Trạng thái số lượng không đủ | Số lượng không đủ — Không xảy ra ở màn này: màn không đổi số lượng. Chặn oversell nằm ở đường chốt giao dịch và ghi nhận giao hàng (FR-LOT-03) |  | false |  | 286 | 1818 | 522 | 1927 |
| 9 |  | img-043 | Khối đối chiếu prototype | Đối chiếu prototype |  | true | img-044 | 26 | 1956 | 1026 | 2418 |
| 9.1 | 9 | img-044 | Bảng đối chiếu ba cột | Thiết kế đòi \| Prototype làm \| Mức |  | false |  | 42 | 2000 | 1010 | 2402 |
| 10 |  | img-045 | Ghi chú chân màn về phân quyền và truy vết | Phân quyền: đọc mở cho các vai trò vận hành; điều chỉnh thuộc tính thuộc bộ phận đối chiếu; chặn ở cả tầng API. Ghi chú: đây là màn tập trung của FN-03 |  | false |  | 26 | 2433 | 1026 | 2534 |
