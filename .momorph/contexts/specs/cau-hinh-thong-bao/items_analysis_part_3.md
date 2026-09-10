# Items Analysis - Cấu hình thông báo

- Nguồn: `.momorph/shots/SC-29-cau-hinh-thong-bao.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-29-cau-hinh-thong-bao-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2262 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 45
- Batch: part 3 / 3

### Item 5.1: Thẻ trạng thái Rỗng

- itemId: img-031
- parentNo: 5
- bbox: (42, 1317) - (277, 1410)
- nameJP: -
- nameTrans: State card empty
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
  - Mục đích và ngữ cảnh: Trạng thái ngày đầu: chưa loại event nào được cấu hình.
  - Thành phần hiển thị: Thẻ có tiêu đề Rỗng và mô tả liệt danh sách loại event với trạng thái chưa cấu hình kèm nút tạo.
  - Chức năng và logic: Rỗng không có nghĩa là không có loại event nào; danh sách loại event vẫn hiện để quản trị biết còn thiếu gì.
- qa: -

### Item 5.2: Thẻ trạng thái Đang tải

- itemId: img-032
- parentNo: 5
- bbox: (286, 1317) - (522, 1410)
- nameJP: -
- nameTrans: State card loading
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
  - Mục đích và ngữ cảnh: Cho người dùng biết cấu hình đang được nạp.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang tải và mô tả skeleton.
  - Chức năng và logic: Form bị vô hiệu trong lúc nạp.
- qa: -

### Item 5.3: Thẻ trạng thái Lỗi tải

- itemId: img-033
- parentNo: 5
- bbox: (531, 1317) - (766, 1410)
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
  - Mục đích và ngữ cảnh: Phân biệt lỗi kỹ thuật với trạng thái chưa cấu hình.
  - Thành phần hiển thị: Thẻ có tiêu đề Lỗi tải và mô tả thông báo lỗi kèm nút thử lại.
  - Chức năng và logic: Không rơi về trạng thái rỗng khi truy vấn thất bại — rỗng và lỗi dẫn tới hai hành động khác nhau.
- qa: -

### Item 5.4: Thẻ trạng thái Không có quyền

- itemId: img-034
- parentNo: 5
- bbox: (775, 1317) - (1010, 1410)
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
  - Mục đích và ngữ cảnh: Khai hai mức chặn khác nhau cho hai trục vào màn và gọi đường ghi.
  - Thành phần hiển thị: Thẻ có tiêu đề Không có quyền và mô tả vai trò khác ROLE-SYS-ADMIN nhận trang không tìm thấy ở route và lỗi từ chối quyền khi gọi đường ghi.
  - Chức năng và logic: Hai mã khác nhau là có chủ đích: chặn vào trang không lộ sự tồn tại tài nguyên, còn đường ghi thì từ chối tường minh.
- qa: -

### Item 5.5: Thẻ trạng thái Đang gửi

- itemId: img-035
- parentNo: 5
- bbox: (42, 1419) - (277, 1512)
- nameJP: -
- nameTrans: State card submitting
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
  - Mục đích và ngữ cảnh: Chặn bấm lưu hai lần khi một phiên bản đang được ghi.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang gửi và mô tả form bị vô hiệu kèm chỉ báo đang chạy.
  - Chức năng và logic: Toàn form bị vô hiệu vì lưu là một thao tác trên cả dòng cấu hình chứ không trên từng field.
- qa: -

### Item 5.6: Thẻ trạng thái Gửi lỗi

- itemId: img-036
- parentNo: 5
- bbox: (286, 1419) - (522, 1512)
- nameJP: -
- nameTrans: State card submit failed
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
  - Mục đích và ngữ cảnh: Giữ lại công sức của quản trị khi lưu thất bại.
  - Thành phần hiển thị: Thẻ có tiêu đề Gửi lỗi và mô tả server từ chối hoặc so sánh phiên bản thất bại thì hiện lỗi tại field và giữ nguyên giá trị đang nhập.
  - Chức năng và logic: Không xoá form khi lỗi; giá trị đang nhập là dữ liệu chưa lưu của người dùng.
- qa: -

### Item 5.7: Thẻ trạng thái Kênh chưa khả dụng

- itemId: img-037
- parentNo: 5
- bbox: (531, 1419) - (766, 1512)
- nameJP: -
- nameTrans: State card channel unavailable
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
  - Mục đích và ngữ cảnh: Ngăn màn bán một lời hứa rỗng: cấu hình kênh email khi chưa có hạ tầng gửi.
  - Thành phần hiển thị: Thẻ có tiêu đề Kênh chưa khả dụng và mô tả đã chọn email nhưng chưa có hạ tầng gửi thì cảnh báo rõ là cấu hình lưu được nhưng email sẽ không gửi.
  - Chức năng và logic: Trạng thái này bắt buộc, không phải trang trí: không có nó thì quản trị tưởng email đã hoạt động.
- qa: -

### Item 5.8: Thẻ trạng thái Event chưa có nguồn dữ liệu

- itemId: img-038
- parentNo: 5
- bbox: (775, 1419) - (1010, 1512)
- nameJP: -
- nameTrans: State card no event source
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
  - Mục đích và ngữ cảnh: Ngăn cách hiểu sai thứ hai: bật một loại event mà đường sinh event chưa tồn tại.
  - Thành phần hiển thị: Thẻ có tiêu đề Event chưa có nguồn dữ liệu và mô tả bật một event mà đường sinh event chưa tồn tại thì hiện nhãn sẽ không phát sinh, để quản trị không tưởng là đã hoạt động.
  - Chức năng và logic: Cấu hình vẫn lưu được nhưng phải nói rõ nó sẽ im lặng cho tới khi có nguồn event.
- qa: -

### Item 5.9: Thẻ trạng thái Không có read-only vì lock

- itemId: img-039
- parentNo: 5
- bbox: (42, 1521) - (277, 1596)
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

### Item 6: Khối đối chiếu thiết kế và prototype

- itemId: img-040
- parentNo: -
- bbox: (26, 1625) - (1026, 2013)
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
  - Mục đích và ngữ cảnh: Tách rõ phần thiết kế đòi khỏi hiện trạng code, và nêu một xung đột phải xử trước khi dựng.
  - Thành phần hiển thị: Tiêu đề khối viết hoa; bảng ba cột sáu hàng dữ liệu; một đoạn ghi chú về rủi ro hai nguồn chân lý.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

### Item 6.1: Bảng đối chiếu thiết kế và prototype

- itemId: img-041
- parentNo: 6
- bbox: (42, 1669) - (1010, 1933)
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
  - Mục đích và ngữ cảnh: Liệt từng hạng mục lệch kèm mức, trong đó có một hạng mục ở mức xung đột.
  - Thành phần hiển thị: Ba cột: thiết kế đòi · prototype làm · mức; sáu hàng gồm bảng cấu hình · phiên bản hoá cấu hình · lịch sử gửi bất biến · thời điểm gửi theo giờ · ngưỡng cấu hình được · phân quyền ghi.
  - Chức năng và logic: Cột mức có ba nhãn: chưa có · một phần · xung đột. Hàng ngưỡng là hàng duy nhất ở mức xung đột.
- qa: -

### Item 6.1.1: Hàng tiêu đề bảng đối chiếu

- itemId: img-042
- parentNo: 6.1
- bbox: (43, 1670) - (1010, 1697)
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

### Item 6.1.2: Hàng một hạng mục đối chiếu — đại diện

- itemId: img-043
- parentNo: 6.1
- bbox: (43, 1697) - (1010, 1745)
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
  - Thành phần hiển thị: Ba ô: mô tả điều thiết kế đòi · mô tả hiện trạng code · thẻ mức; hàng đại diện đang hiện hạng mục bảng cấu hình thông báo với mức chưa có.
  - Chức năng và logic: Chỉ đọc. Thẻ mức ở ô cuối lấy một trong ba giá trị chưa có · một phần · xung đột.
- qa: -

### Item 6.2: Ghi chú rủi ro hai nguồn chân lý

- itemId: img-044
- parentNo: 6
- bbox: (42, 1936) - (1010, 1987)
- nameJP: -
- nameTrans: Two sources of truth note
- itemType: label
- itemSubtype: đoạn nhắc cuối khối
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
  - Mục đích và ngữ cảnh: Nêu xung đột phải xử trước khi dựng, vì để nguyên thì hai con số cùng mang một tên.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: FR-PARTY-03 đòi ngưỡng cảnh báo sắp hết hiệu lực là cấu hình được và ngưỡng đó đúng là field số 7 của màn này; nếu màn này quản ngưỡng đó thì phải bỏ hằng số cứng và cho báo cáo đọc cấu hình; để cả hai tồn tại là để quản trị đổi trên màn mà báo cáo vẫn cắt ở con số cũ và không ai biết cái nào đúng.
  - Chức năng và logic: Tĩnh; là điều kiện tiền đề, không phải khuyến nghị.
- qa: -

### Item 7: Chân ghi chú phân quyền, hạ tầng và giả định

- itemId: img-045
- parentNo: -
- bbox: (26, 2028) - (1026, 2240)
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
  - Mục đích và ngữ cảnh: Gom bốn thứ phải đọc trước khi dựng: phân quyền, ranh giới quyết định hạ tầng, năm giả định và hai ghi chú thi hành.
  - Thành phần hiển thị: Bốn đoạn chữ nhỏ: đoạn phân quyền nêu chỉ một vai trò được vào và hai mã lỗi cho hai trục cùng lưu ý danh sách người nhận đích danh phơi ra ai nhận cảnh báo gì; đoạn khai quyết định hạ tầng thuộc quyết định kiến trúc và field thời điểm gửi khiến cả phương án chỉ có kênh trong ứng dụng cũng không đủ; đoạn năm giả định cần chốt; đoạn ghi chú về event không bao giờ phát sinh và về thứ tự ghi khi không có giao dịch xuyên bảng.
  - Chức năng và logic: Tĩnh. Năm giả định gồm: ánh xạ actor quản trị vận hành sang một vai trò của hệ; ngưỡng mặc định từng loại event; thời điểm gửi có buộc trong khung giờ dịch vụ; một dòng cho mỗi loại event; bắt buộc lý do khi sửa.
- qa: -

