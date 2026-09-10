# Design Context - dispute-management

## Screen info

- source family: `image`
- source token: `SC-19-quan-ly-tranh-chap`
- source image: `.momorph/shots/SC-19-quan-ly-tranh-chap.png` (1280x2370 px)
- targetLanguage: Vietnamese
- screen: SC-19 · Quản lý tranh chấp
- batch: 3/3 (14 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 5.13 | 5 | img-031 | Nút Tạo yêu cầu điều chỉnh | Tạo yêu cầu điều chỉnh (SC-20) | - | false | - | 248 | 1357 | 433 | 1386 |
| 5.14 | 5 | img-032 | Ghi chú hai luồng khác nhau | Tranh chấp và điều chỉnh hậu-lock là hai luồng khác nhau: tranh chấp có thể dẫn tới một yêu cầu điều chỉnh nhưng không thay thế nó | - | false | - | 42 | 1389 | 1010 | 1405 |
| 6 | - | img-033 | Khối 4 — lịch sử cập nhật chỉ thêm | 4 · Lịch sử cập nhật — append-only | - | true | img-034; img-035 | 26 | 1445 | 1026 | 1620 |
| 6.1 | 6 | img-034 | Bảng lịch sử cập nhật năm cột | Thời điểm \| Từ trạng thái \| Đến trạng thái \| Ghi chú \| Người ghi | - | false | - | 42 | 1489 | 1010 | 1575 |
| 6.2 | 6 | img-035 | Ghi chú nguyên tắc chỉ thêm | Mỗi lần đổi trạng thái sinh một dòng; không sửa và không xoá dòng cũ — cùng nguyên tắc bảo toàn lịch sử của FR-CORR-02 | - | false | - | 42 | 1578 | 1010 | 1594 |
| 7 | - | img-036 | Khối 5 — trạng thái màn | 5 · Trạng thái màn | - | true | img-037; img-038; img-039; img-040; img-041; img-042 | 26 | 1633 | 1026 | 1887 |
| 7.1 | 7 | img-037 | Thẻ trạng thái Rỗng | "Không có tranh chấp nào đang mở." Vẫn mở được tranh chấp mới — màn không cần dữ liệu tiền đề | - | false | - | 42 | 1677 | 277 | 1770 |
| 7.2 | 7 | img-038 | Thẻ trạng thái Quá hạn dự kiến | Ngày dự kiến đã qua mà chưa đóng: nhãn cảnh báo trên dòng; và là đầu vào của thông báo FR-NOTIFY-01 | - | false | - | 286 | 1677 | 522 | 1770 |
| 7.3 | 7 | img-039 | Thẻ trạng thái Đã đóng | Chỉ đọc; hiện kết quả cuối cùng và toàn bộ lịch sử. Mở lại được hay không là câu hỏi còn mở | - | false | - | 531 | 1677 | 766 | 1770 |
| 7.4 | 7 | img-040 | Thẻ trạng thái Ngày nghiệp vụ đã lock | Vẫn ghi được — tranh chấp gần như luôn nổi lên sau khi chốt kỳ; khoá nó theo ngày nghiệp vụ là khoá đúng lúc cần nhất | - | false | - | 775 | 1677 | 1010 | 1770 |
| 7.5 | 7 | img-041 | Thẻ trạng thái Hai người đóng cùng lúc | Chỉ một kết quả được ghi; người sau nhận thông báo trạng thái đã đổi; không ghi đè kết luận của người trước | - | false | - | 42 | 1779 | 277 | 1871 |
| 7.6 | 7 | img-042 | Thẻ trạng thái Đang tải · Lỗi tải · Không có quyền | Skeleton bảng; lỗi có nút thử lại. Đọc mở cho vai đối chiếu và người được gán phụ trách | - | false | - | 286 | 1779 | 522 | 1871 |
| 8 | - | img-043 | Khối đối chiếu prototype | Thiết kế đòi \| Prototype làm \| Mức | - | false | - | 26 | 1900 | 1026 | 2268 |
| 9 | - | img-044 | Chân ghi chú phân quyền và phụ thuộc | Phân quyền đề xuất: mở và đóng thuộc bộ phận đối chiếu; người được gán phụ trách cập nhật được tiến độ nhưng không đóng | - | false | - | 26 | 2283 | 1026 | 2348 |
