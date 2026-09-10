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
- **batch**: 3/4 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 5.1.2 | 5.1 | img-031 | Dòng lần giao (đại diện cho hai dòng mẫu) | 1 / SHP-0001 / 60.00 / 2026-09-08 06:10 / 2026-09-08 / Người dùng B / — | - | false | - | 43 | 1100 | 1010 | 1129 |
| 5.1.3 | 5.1 | img-032 | Nhãn ngoại lệ liên quan trên dòng lần giao | Giao thiếu 8.00 | - | false | - | 827 | 1135 | 908 | 1154 |
| 5.2 | 5 | img-033 | Ghi chú ngày nghiệp vụ riêng của từng lần giao | Mỗi lần giao mang ngày nghiệp vụ riêng — một giao dịch có thể trải nhiều ngày, nên quyết toán ngày chỉ gom những lần giao thuộc chính ngày đó | - | false | - | 42 | 1163 | 1010 | 1179 |
| 6 | - | img-034 | Khối chốt hoàn tất giao hàng | 5 · Chốt hoàn tất giao hàng (FE-022 · FR-DEL-02 · BR-DEL-03) | - | true | 6.1; 6.2; 6.3; 6.4 | 26 | 1219 | 1026 | 1492 |
| 6.1 | 6 | img-035 | Nút xác nhận hoàn tất | Xác nhận hoàn tất · 完了確定 | - | false | - | 42 | 1263 | 217 | 1292 |
| 6.2 | 6 | img-036 | Nhãn điều kiện bật nút chốt | bật khi số lượng đã xác nhận khớp quy tắc quyết toán hiện hành | - | false | - | 220 | 1268 | 519 | 1288 |
| 6.3 | 6 | img-037 | Bảng bốn cổng kiểm trước khi chốt | Cổng kiểm trước khi chốt / Nguồn — bốn dòng: khớp quy tắc quyết toán (BR-DEL-03); không thiếu trường bắt buộc (FR-DEL-02); không còn ngoại lệ đang mở (FR-DEL-03 · FIG-014); xác nhận rõ ràng của người có quyền (FE-022) | - | false | - | 42 | 1303 | 1010 | 1446 |
| 6.4 | 6 | img-038 | Ghi chú hậu quả sau khi chốt | Chốt xong thì khối ghi lần giao biến mất và giao hàng trở thành đầu vào đủ điều kiện của bảng đối chiếu ngày (FE-025) | - | false | - | 42 | 1449 | 1010 | 1466 |
| 7 | - | img-039 | Khối trạng thái màn | 6 · Trạng thái màn | - | true | 7.1; 7.2; 7.3; 7.4; 7.5; 7.6 | 26 | 1505 | 1026 | 1810 |
| 7.1 | 7 | img-040 | Thẻ trạng thái Chờ và Đang giao | Chờ / Đang giao — Đủ 5 khối. Ghi lần giao mới; chốt hoàn tất chỉ bật khi qua hết cổng kiểm | - | false | - | 42 | 1549 | 277 | 1675 |
| 7.2 | 7 | img-041 | Thẻ trạng thái Ngoại lệ | Ngoại lệ — Có ngoại lệ đang mở: dải cảnh báo và liên kết sang SC-17. Chốt hoàn tất bị khoá | - | false | - | 286 | 1549 | 522 | 1675 |
| 7.3 | 7 | img-042 | Thẻ trạng thái Hoàn tất | Hoàn tất — trạng thái cuối. Chỉ đọc toàn bộ. Sai sót sau đó đi đường điều chỉnh có kiểm soát SC-20 và SC-21 | - | false | - | 531 | 1549 | 766 | 1675 |
| 7.4 | 7 | img-043 | Thẻ trạng thái Ngày của lần giao đã lock | Ngày của lần giao đã lock — Lần giao thuộc ngày đã lock không sửa hay xoá trực tiếp được, và cũng không ghi thêm lần giao mới vào ngày đó | - | false | - | 775 | 1549 | 1010 | 1675 |
| 7.5 | 7 | img-044 | Thẻ trạng thái Hai người ghi cùng lúc | Hai người ghi cùng lúc — Lũy kế là điểm tuần tự hoá: người sau phải kiểm lại số còn lại với con số mới, không được ghi vượt | - | false | - | 42 | 1684 | 277 | 1794 |
| 7.6 | 7 | img-045 | Thẻ trạng thái Không tìm thấy; Không quyền; Đang tải và Lỗi tải | Không tìm thấy · Không quyền · Đang tải · Lỗi tải — Đọc mở cho mọi vai đang hoạt động, chặn ở hành động ghi. Tải có skeleton, lỗi có nút thử lại | - | false | - | 286 | 1684 | 522 | 1794 |
