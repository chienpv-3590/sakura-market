# Items Analysis - Quản lý batch xuất dữ liệu kế toán

- Nguồn: `.momorph/shots/SC-27-quan-ly-batch-xuat-du-lieu-ke-toan.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-27-quan-ly-batch-xuat-du-lieu-ke-toan-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 1797 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 39
- Batch: part 3 / 3

### Item 6.4: Thẻ trạng thái Không có quyền

- itemId: img-031
- parentNo: 6
- bbox: (775, 1050) - (1010, 1142)
- nameJP: -
- nameTrans: State card forbidden
- itemType: label
- itemSubtype: thẻ trạng thái
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Khai mức chặn của màn: chặn vào trang chứ không chỉ chặn hành động.
  - Thành phần hiển thị: Thẻ có tiêu đề Không có quyền và mô tả vai trò không thuộc bộ phận đối chiếu không vào được màn vì đây là dữ liệu tiền đã bàn giao ra ngoài.
  - Chức năng và logic: Chặn vào trang trả trang không tìm thấy nên không lộ sự tồn tại của tài nguyên.
- qa: -

### Item 6.5: Thẻ trạng thái Đang gửi

- itemId: img-032
- parentNo: 6
- bbox: (42, 1151) - (277, 1243)
- nameJP: -
- nameTrans: State card sending
- itemType: label
- itemSubtype: thẻ trạng thái
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Chặn bấm Gửi lại hai lần trên cùng một batch.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang gửi và mô tả đúng hàng đó vào trạng thái chờ, nút vô hiệu, không cho bấm hai lần.
  - Chức năng và logic: Trạng thái đang gửi là trạng thái của một hàng chứ không của cả bảng; các hàng khác vẫn dùng được.
- qa: -

### Item 6.6: Thẻ trạng thái Gửi lỗi

- itemId: img-033
- parentNo: 6
- bbox: (286, 1151) - (522, 1243)
- nameJP: -
- nameTrans: State card send failed
- itemType: label
- itemSubtype: thẻ trạng thái
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ngăn tình huống tệ nhất: đánh dấu đã bàn giao khi bên nhận chưa nhận.
  - Thành phần hiển thị: Thẻ có tiêu đề Gửi lỗi và mô tả lỗi hiện trên đúng hàng, giữ nguyên trạng thái cũ, không được ghi thành đã xác nhận khi bên nhận chưa nhận.
  - Chức năng và logic: Kết quả lỗi phải phân biệt được với kết quả không rõ; gửi thành công mà mất phản hồi là một ca riêng.
- qa: -

### Item 6.7: Thẻ trạng thái Read-only vì lock

- itemId: img-034
- parentNo: 6
- bbox: (531, 1151) - (766, 1243)
- nameJP: -
- nameTrans: State card lock read-only
- itemType: label
- itemSubtype: thẻ trạng thái
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đảo lại một giả định dễ sai: màn này không bị khoá vì lock.
  - Thành phần hiển thị: Thẻ có tiêu đề Read-only vì lock và mô tả ngược lại là đúng — lock là tiền đề để xuất nên màn ghi về một ngày đã lock và không bao giờ bị khoá vì lock.
  - Chức năng và logic: Vì vậy màn không có trạng thái bị khoá theo ngày và không trả mã lỗi khoá ngày.
- qa: -

### Item 7: Khối đối chiếu thiết kế và prototype

- itemId: img-035
- parentNo: -
- bbox: (26, 1272) - (1026, 1641)
- nameJP: -
- nameTrans: Design vs prototype block
- itemType: others
- itemSubtype: khối bảng ba cột
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Tách rõ phần thiết kế đòi khỏi phần prototype đã làm, để người đọc không đọc bản thi công như thể nó là thiết kế.
  - Thành phần hiển thị: Tiêu đề khối viết hoa; bảng ba cột sáu hàng dữ liệu với cột cuối phân mức lệch.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

### Item 7.1: Bảng đối chiếu thiết kế và prototype

- itemId: img-036
- parentNo: 7
- bbox: (42, 1316) - (1010, 1625)
- nameJP: 設計と実装の差分
- nameTrans: Design gap table
- itemType: table
- itemSubtype: bảng ba cột sáu dòng dữ liệu
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Liệt từng hạng mục lệch kèm mức độ, để phần ước lượng biết chỗ nào là việc mới và chỗ nào là chờ khách chốt.
  - Thành phần hiển thị: Ba cột: thiết kế đòi · prototype làm · mức; sáu hàng dữ liệu gồm màn quản lý batch riêng · trạng thái ở mức batch · tập giá trị trạng thái dòng · kênh gửi thật · định dạng batch code · các trường kèm bắt buộc.
  - Chức năng và logic: Chỉ liệt chỗ khác chứ không liệt chỗ khớp; cột mức phân biệt chưa thi công · thiếu trường bắt buộc · khác không chủ đích · chờ khách chốt · giả định chưa chốt · đúng thiết kế.
- qa: -

### Item 7.1.1: Hàng tiêu đề bảng đối chiếu

- itemId: img-037
- parentNo: 7.1
- bbox: (43, 1316) - (1010, 1344)
- nameJP: -
- nameTrans: Gap table header row
- itemType: label
- itemSubtype: hàng tiêu đề bảng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đặt tên ba cột của bảng đối chiếu.
  - Thành phần hiển thị: Một hàng nền xám nhạt với ba nhãn: Thiết kế đòi · Prototype làm · Mức.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 7.1.2: Hàng một hạng mục đối chiếu — đại diện

- itemId: img-038
- parentNo: 7.1
- bbox: (43, 1344) - (1010, 1390)
- nameJP: -
- nameTrans: Gap row (representative)
- itemType: others
- itemSubtype: hàng dữ liệu bảng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Một hàng là một hạng mục lệch; sáu hàng có cùng cấu trúc nên gộp thành một đại diện.
  - Thành phần hiển thị: Ba ô: mô tả điều thiết kế đòi · mô tả điều prototype làm kèm liên kết sang màn báo cáo · nhãn mức lệch; hàng đại diện đang hiện hạng mục màn quản lý batch riêng tra cứu xuyên nhiều ngày với mức Chưa thi công.
  - Chức năng và logic: Chỉ đọc. Ô giữa có thể chứa liên kết nội bộ tới màn khác trong cùng bộ wireframe.
- qa: -

### Item 8: Chân ghi chú phân quyền và giả định cần chốt

- itemId: img-039
- parentNo: -
- bbox: (26, 1656) - (1026, 1775)
- nameJP: -
- nameTrans: Permission and assumption footer
- itemType: label
- itemSubtype: chân trang chú thích
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Gom hai thứ không thuộc thân màn nhưng bắt buộc phải đọc trước khi dựng: mức chặn theo vai trò và bốn giả định chưa chốt.
  - Thành phần hiển thị: Ba đoạn chữ nhỏ: đoạn phân quyền đề xuất chỉ một vai trò và chặn ở mức vào trang; đoạn bốn giả định cần chốt với khách; đoạn liên kết tới bản as-built.
  - Chức năng và logic: Tĩnh. Bốn giả định gồm: tập giá trị trạng thái bàn giao ở mức batch; số lần thử gửi tối đa; bên nhận xử lý batch trùng ngày theo kiểu thay thế hay cộng dồn; thời hạn giữ tập dòng đã bàn giao.
- qa: -

