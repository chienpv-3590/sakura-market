# Items Analysis - Hộp thông báo trong ứng dụng

- Nguồn: `.momorph/shots/SC-28-hop-thong-bao-trong-ung-dung.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-28-hop-thong-bao-trong-ung-dung-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2245 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 44
- Batch: part 3 / 3

### Item 6.3: Thẻ trạng thái Lỗi tải

- itemId: img-031
- parentNo: 6
- bbox: (531, 1123) - (766, 1198)
- nameJP: -
- nameTrans: State card load error
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
  - Mục đích và ngữ cảnh: Phân biệt lỗi kỹ thuật với hộp thư rỗng.
  - Thành phần hiển thị: Thẻ có tiêu đề Lỗi tải và mô tả thông báo lỗi kèm nút thử lại.
  - Chức năng và logic: Không rơi về trạng thái rỗng khi truy vấn thất bại.
- qa: -

### Item 6.4: Thẻ trạng thái Không có quyền

- itemId: img-032
- parentNo: 6
- bbox: (775, 1123) - (1010, 1198)
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
  - Mục đích và ngữ cảnh: Khai mức chặn khi người dùng mở thẳng một thông báo không thuộc mình.
  - Thành phần hiển thị: Thẻ có tiêu đề Không có quyền và mô tả mở thẳng thông báo của người khác trả trang không tìm thấy chứ không phải lỗi từ chối quyền.
  - Chức năng và logic: Trả trang không tìm thấy là có chủ đích, không lộ sự tồn tại của thông báo người khác.
- qa: -

### Item 6.5: Thẻ trạng thái Đang gửi

- itemId: img-033
- parentNo: 6
- bbox: (42, 1207) - (277, 1301)
- nameJP: -
- nameTrans: State card writing
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
  - Mục đích và ngữ cảnh: Chặn bấm đánh dấu đã đọc hai lần trên cùng một dòng.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang gửi và mô tả đang ghi trạng thái đã đọc nên dòng đó bị vô hiệu.
  - Chức năng và logic: Là trạng thái của một dòng chứ không của cả danh sách.
- qa: -

### Item 6.6: Thẻ trạng thái Gửi lỗi

- itemId: img-034
- parentNo: 6
- bbox: (286, 1207) - (522, 1301)
- nameJP: -
- nameTrans: State card write failed
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
  - Mục đích và ngữ cảnh: Giữ đúng sự thật khi ghi trạng thái đã đọc thất bại.
  - Thành phần hiển thị: Thẻ có tiêu đề Gửi lỗi và mô tả ghi đã đọc thất bại thì hiện thông báo lỗi và giữ nguyên trạng thái chưa đọc.
  - Chức năng và logic: Không đổi giao diện trước rồi sửa sau; trạng thái hiển thị luôn khớp dữ liệu đã ghi.
- qa: -

### Item 6.7: Thẻ trạng thái Đang retry kênh ngoài

- itemId: img-035
- parentNo: 6
- bbox: (531, 1207) - (766, 1301)
- nameJP: -
- nameTrans: State card retrying
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
  - Mục đích và ngữ cảnh: Phân biệt còn đang thử với đã thất bại — hai cái này không được hiện giống nhau.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang retry kênh ngoài và mô tả còn trong ba lần thử thì hiện nhãn đang gửi email hai trên ba và chưa phải thất bại.
  - Chức năng và logic: Chỉ khi hết trần ba lần thì mới chuyển sang trạng thái thất bại chốt.
- qa: -

### Item 6.8: Thẻ trạng thái Vào queue cảnh báo vận hành

- itemId: img-036
- parentNo: 6
- bbox: (775, 1207) - (1010, 1301)
- nameJP: -
- nameTrans: State card ops queue
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
  - Mục đích và ngữ cảnh: Chính điều kiện nghiệm thu của FR-NOTIFY-02; là một trạng thái riêng chứ không phải gửi lỗi chung.
  - Thành phần hiển thị: Thẻ có tiêu đề Vào queue cảnh báo vận hành và mô tả hết ba lần thử mà vẫn thất bại; có nhãn riêng trên dòng và mở được log gửi; không gộp với gửi lỗi.
  - Chức năng và logic: Trạng thái này là đầu vào của phần giám sát vận hành, nên phải phát được cảnh báo ra ngoài màn.
- qa: -

### Item 6.9: Thẻ trạng thái Quá hạn 5 phút

- itemId: img-037
- parentNo: 6
- bbox: (42, 1310) - (277, 1402)
- nameJP: -
- nameTrans: State card deadline missed
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
  - Mục đích và ngữ cảnh: Ràng buộc thời gian riêng của thông báo Critical theo FR-NOTIFY-02.
  - Thành phần hiển thị: Thẻ có tiêu đề Quá hạn 5 phút và mô tả thông báo Critical chưa gửi xong sau năm phút thì hiện nhãn quá hạn và tính vào cảnh báo vận hành dù retry còn dở.
  - Chức năng và logic: Quá hạn và hết trần retry là hai điều kiện độc lập; chỉ cần một trong hai là phải cảnh báo.
- qa: -

### Item 6.10: Thẻ trạng thái Không có read-only vì lock

- itemId: img-038
- parentNo: 6
- bbox: (286, 1310) - (522, 1402)
- nameJP: -
- nameTrans: State card no lock read-only
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
  - Mục đích và ngữ cảnh: Đóng lại một giả định dễ sai: màn này không liên quan tới khoá ngày nghiệp vụ.
  - Thành phần hiển thị: Thẻ có tiêu đề Không có read-only vì lock và mô tả màn không chạm bảng bị lock ngày nên không bao giờ trả mã lỗi khoá ngày.
  - Chức năng và logic: Vì vậy không có trạng thái chỉ đọc theo ngày trên màn này.
- qa: -

### Item 7: Khối đối chiếu thiết kế và prototype

- itemId: img-039
- parentNo: -
- bbox: (26, 1431) - (1026, 1975)
- nameJP: -
- nameTrans: Design vs prototype block
- itemType: others
- itemSubtype: khối bảng ba cột kèm ghi chú
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
  - Mục đích và ngữ cảnh: Tách rõ phần thiết kế đòi khỏi hiện trạng code, và nói thẳng thứ tự dựng đúng.
  - Thành phần hiển thị: Tiêu đề khối viết hoa; bảng ba cột mười hàng dữ liệu; một đoạn ghi chú về thứ tự phụ thuộc.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

### Item 7.1: Bảng đối chiếu thiết kế và prototype

- itemId: img-040
- parentNo: 7
- bbox: (42, 1475) - (1010, 1912)
- nameJP: 設計と実装の差分
- nameTrans: Design gap table
- itemType: table
- itemSubtype: bảng ba cột mười dòng dữ liệu
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
  - Mục đích và ngữ cảnh: Liệt từng hạng mục lệch kèm mức, trong đó bốn hàng là bốn nhóm nguồn event.
  - Thành phần hiển thị: Ba cột: thiết kế đòi · prototype làm · mức; mười hàng gồm hộp thông báo · kênh email và trần retry · log gửi · mốc năm phút · queue cảnh báo · bốn nhóm nguồn event · phạm vi đọc theo người nhận.
  - Chức năng và logic: Cột mức có ba nhãn: chưa có · một phần · xung đột. Ba trong bốn nhóm nguồn event chưa có dữ liệu, nhóm thứ tư chỉ ghi ca thành công.
- qa: -

### Item 7.1.1: Hàng tiêu đề bảng đối chiếu

- itemId: img-041
- parentNo: 7.1
- bbox: (43, 1475) - (1010, 1503)
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

- itemId: img-042
- parentNo: 7.1
- bbox: (43, 1503) - (1010, 1550)
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
  - Mục đích và ngữ cảnh: Một hàng là một hạng mục lệch; mười hàng có cùng cấu trúc nên gộp thành một đại diện.
  - Thành phần hiển thị: Ba ô: mô tả điều thiết kế đòi · mô tả hiện trạng code · thẻ mức; hàng đại diện đang hiện hạng mục hộp thông báo in-app với mức chưa có.
  - Chức năng và logic: Chỉ đọc. Thẻ mức ở ô cuối lấy một trong ba giá trị chưa có · một phần · xung đột.
- qa: -

### Item 7.2: Ghi chú thứ tự phụ thuộc

- itemId: img-043
- parentNo: 7
- bbox: (42, 1915) - (1010, 1948)
- nameJP: -
- nameTrans: Dependency order note
- itemType: label
- itemSubtype: đoạn nhắc dưới khối
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
  - Mục đích và ngữ cảnh: Cảnh báo hệ quả nếu dựng màn này trước các màn sinh event; đây là kết luận quan trọng nhất của khối đối chiếu.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: ba trong bốn nhóm event chưa có nguồn dữ liệu và nhóm thứ tư chỉ ghi ca thành công; dựng SC-28 trước SC-07 và SC-17 và SC-19 là dựng một hộp gần như rỗng; thứ tự đúng là dữ liệu tranh chấp và đường ghi ngoại lệ giao hàng trước rồi mới tới SC-28.
  - Chức năng và logic: Tĩnh; là điều kiện tiền đề về thứ tự, không phải gợi ý ưu tiên.
- qa: -

### Item 8: Chân ghi chú phân quyền, hạ tầng và giả định

- itemId: img-044
- parentNo: -
- bbox: (26, 1990) - (1026, 2223)
- nameJP: -
- nameTrans: Permission infra and assumption footer
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
  - Mục đích và ngữ cảnh: Gom ba thứ phải đọc trước khi dựng: phạm vi đọc theo người nhận, hai phương án hạ tầng, và các giả định chưa chốt.
  - Thành phần hiển thị: Năm đoạn chữ nhỏ: đoạn phân quyền nêu cả bảy vai trò vào được và mỗi người chỉ thấy thông báo của mình hoặc của vai trò mình giữ; đoạn nói đây là dữ liệu đầu tiên trong hệ không nên theo khuôn đọc rộng; đoạn hai phương án hạ tầng thuộc quyết định kiến trúc; đoạn năm giả định cần chốt; đoạn ghi chú chống trùng và đối tượng bị xoá.
  - Chức năng và logic: Tĩnh. Năm giả định gồm: tập loại event; mốc năm phút tính từ đâu; thời hạn lưu thông báo và số dòng mỗi trang; gửi theo vai trò có đủ hay cần đích danh; đã đọc theo từng người nhận.
- qa: -

