# Items Analysis - Tra cứu audit log

- Nguồn: `.momorph/shots/SC-30-tra-cuu-audit-log.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-30-tra-cuu-audit-log-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2147 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 43
- Batch: part 3 / 3

### Item 6.1: Thẻ trạng thái Rỗng

- itemId: img-031
- parentNo: 6
- bbox: (42, 1162) - (277, 1238)
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
  - Mục đích và ngữ cảnh: Kết quả rỗng là câu trả lời hợp lệ của một cuộc điều tra, không phải lỗi.
  - Thành phần hiển thị: Thẻ có tiêu đề Rỗng và mô tả câu hiển thị không có bản ghi audit nào khớp điều kiện kèm gợi ý đổi bộ lọc.
  - Chức năng và logic: Gợi ý đổi bộ lọc là cần thiết vì bốn tiêu chí kết hợp lại rất dễ cho ra rỗng.
- qa: -

### Item 6.2: Thẻ trạng thái Đang tải

- itemId: img-032
- parentNo: 6
- bbox: (286, 1162) - (522, 1238)
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
  - Mục đích và ngữ cảnh: Cho người dùng biết truy vấn đang chạy; quan trọng vì truy vấn audit có thể chậm.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang tải và mô tả skeleton bảng.
  - Chức năng và logic: Bộ lọc bị vô hiệu trong lúc tải để không có hai truy vấn chồng nhau.
- qa: -

### Item 6.3: Thẻ trạng thái Lỗi tải

- itemId: img-033
- parentNo: 6
- bbox: (531, 1162) - (766, 1238)
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
  - Mục đích và ngữ cảnh: Phân biệt lỗi kỹ thuật với kết quả rỗng — hai cái này dẫn tới hai hành động khác nhau.
  - Thành phần hiển thị: Thẻ có tiêu đề Lỗi tải và mô tả khối lỗi kèm nút thử lại.
  - Chức năng và logic: Giữ nguyên điều kiện đang lọc khi thử lại.
- qa: -

### Item 6.4: Thẻ trạng thái Không có quyền

- itemId: img-034
- parentNo: 6
- bbox: (775, 1162) - (1010, 1238)
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
  - Mục đích và ngữ cảnh: Khai mức chặn của màn; đây là màn chạm dữ liệu nhạy nên chặn ở mức vào trang.
  - Thành phần hiển thị: Thẻ có tiêu đề Không có quyền và mô tả vai trò không được vào thì nhận trang không tìm thấy chứ không phải lỗi từ chối quyền.
  - Chức năng và logic: Chặn vào trang trả trang không tìm thấy là có chủ đích, không lộ sự tồn tại của tài nguyên. Quyền bị thu hồi giữa phiên thì lần điều hướng sau cũng vào trạng thái này.
- qa: -

### Item 6.5: Thẻ trạng thái Đang gửi và gửi lỗi — không áp dụng

- itemId: img-035
- parentNo: 6
- bbox: (42, 1247) - (277, 1340)
- nameJP: -
- nameTrans: State card not applicable
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
  - Mục đích và ngữ cảnh: Nói rõ hai trạng thái ghi không áp dụng, để phần dựng không thêm form vào một màn chỉ đọc.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang gửi và gửi lỗi, mô tả không áp dụng vì màn chỉ đọc và không có form ghi.
  - Chức năng và logic: Hệ quả: màn không có mã lỗi nào của đường ghi.
- qa: -

### Item 6.6: Thẻ trạng thái Quá nhiều kết quả

- itemId: img-036
- parentNo: 6
- bbox: (286, 1247) - (522, 1340)
- nameJP: -
- nameTrans: State card too many results
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
  - Mục đích và ngữ cảnh: Trạng thái sinh ra trực tiếp từ ngưỡng thời gian phản hồi, không phải một giới hạn tuỳ ý.
  - Thành phần hiển thị: Thẻ có tiêu đề Quá nhiều kết quả và mô tả vượt trần thì thông báo cần thu hẹp điều kiện kèm phân trang, và nói rõ đây là ràng buộc NFR-PERF-01.
  - Chức năng và logic: Thông báo phải chỉ ra tiêu chí nào nên thu hẹp, không chỉ nói kết quả quá nhiều.
- qa: -

### Item 6.7: Thẻ trạng thái Không có read-only vì lock

- itemId: img-037
- parentNo: 6
- bbox: (531, 1247) - (766, 1340)
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
  - Mục đích và ngữ cảnh: Đóng lại một giả định dễ sai: audit không thuộc nhóm bảng bị khoá theo ngày.
  - Thành phần hiển thị: Thẻ có tiêu đề Không có read-only vì lock và mô tả audit không thuộc nhóm bảng bị lock ngày, màn không ghi gì, nên không bao giờ trả mã lỗi khoá ngày.
  - Chức năng và logic: Vì vậy màn không có trạng thái chỉ đọc theo ngày.
- qa: -

### Item 7: Khối đối chiếu thiết kế và prototype

- itemId: img-038
- parentNo: -
- bbox: (26, 1369) - (1026, 1882)
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
  - Mục đích và ngữ cảnh: Tách rõ phần thiết kế đòi khỏi hiện trạng, và phân loại đúng bản chất của từng rào.
  - Thành phần hiển thị: Tiêu đề khối viết hoa; bảng ba cột tám hàng dữ liệu; một đoạn ghi chú phân loại ba rào khác loại.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

### Item 7.1: Bảng đối chiếu thiết kế và prototype

- itemId: img-039
- parentNo: 7
- bbox: (42, 1413) - (1010, 1802)
- nameJP: 設計と実装の差分
- nameTrans: Design gap table
- itemType: table
- itemSubtype: bảng ba cột tám dòng dữ liệu
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
  - Mục đích và ngữ cảnh: Liệt từng hạng mục kèm mức, trong đó phần ghi audit đã đủ còn phần đọc thì còn ba rào.
  - Thành phần hiển thị: Ba cột: thiết kế đòi · prototype làm · mức; tám hàng gồm dữ liệu audit để tra · màn tra cứu xuyên thực thể · bốn tiêu chí lần lượt · ngưỡng thời gian phản hồi · kiểm soát truy cập theo vai trò.
  - Chức năng và logic: Cột mức có bốn nhãn: đã đủ · một phần · chưa có · xung đột. Hàng đầu là hàng duy nhất ở mức đã đủ.
- qa: -

### Item 7.1.1: Hàng tiêu đề bảng đối chiếu

- itemId: img-040
- parentNo: 7.1
- bbox: (43, 1413) - (1010, 1441)
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

- itemId: img-041
- parentNo: 7.1
- bbox: (43, 1441) - (1010, 1488)
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
  - Mục đích và ngữ cảnh: Một hàng là một hạng mục; tám hàng có cùng cấu trúc nên gộp thành một đại diện.
  - Thành phần hiển thị: Ba ô: mô tả điều thiết kế đòi · mô tả hiện trạng · thẻ mức; hàng đại diện đang hiện hạng mục có dữ liệu audit để tra với mức đã đủ.
  - Chức năng và logic: Chỉ đọc. Thẻ mức ở ô cuối lấy một trong bốn giá trị đã đủ · một phần · chưa có · xung đột.
- qa: -

### Item 7.2: Ghi chú ba rào khác loại

- itemId: img-042
- parentNo: 7
- bbox: (42, 1805) - (1010, 1855)
- nameJP: -
- nameTrans: Three distinct barriers note
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
  - Mục đích và ngữ cảnh: Chặn cách đọc gộp sai rằng màn đạt ba trên bốn tiêu chí; ba rào có bản chất khác nhau và cách sửa khác nhau.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: ID giao dịch là chuyện hình dạng truy vấn vì chỉ có một cặp cột thay vì một cột nên sửa được ở tầng đọc; ngày nghiệp vụ và người tham gia là chuyện dữ liệu chưa từng được ghi nên phải sửa phía ghi ở mọi điểm gọi và dữ liệu cũ không lấp lại được; hiệu năng là chuyện index nên độc lập với hai cái trên, và có đủ bốn cột mà không có index thì vẫn không đạt ngưỡng.
  - Chức năng và logic: Tĩnh; là kết luận quan trọng nhất của khối đối chiếu và là căn cứ để ước lượng đúng.
- qa: -

### Item 8: Chân ghi chú phân quyền, đánh đổi và giả định

- itemId: img-043
- parentNo: -
- bbox: (26, 1897) - (1026, 2125)
- nameJP: -
- nameTrans: Permission tradeoff and assumption footer
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
  - Mục đích và ngữ cảnh: Gom năm thứ phải đọc trước khi dựng: ánh xạ vai trò, đánh đổi cần quyết định kiến trúc, quyết định không xuất dữ liệu, bốn giả định và ghi chú bảo mật.
  - Thành phần hiển thị: Năm đoạn chữ nhỏ: đoạn phân quyền đề xuất một vai trò cho vòng đầu và nói rõ hai vai trò mà yêu cầu khách gọi tên không có trong bảy vai trò của hệ; đoạn đánh đổi giữa mở đọc và siết đọc, chung một quyết định kiến trúc với màn quản lý file đính kèm; đoạn giải thích vì sao không đề xuất xuất dữ liệu; đoạn bốn giả định cần chốt; đoạn ghi chú bảo mật.
  - Chức năng và logic: Tĩnh. Bốn giả định gồm: ai được tra cứu và có siết đọc hay không; tập giá trị loại thao tác cho ô chọn; có ghi audit cho chính hành vi tra cứu audit hay không; số dòng mỗi trang cùng trần kết quả và định nghĩa kịch bản tìm kiếm tiêu chuẩn.
- qa: -

