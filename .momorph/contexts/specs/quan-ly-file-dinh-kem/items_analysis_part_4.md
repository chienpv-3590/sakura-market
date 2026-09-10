# Items Analysis - Quản lý file đính kèm

- Nguồn: `.momorph/shots/SC-31-quan-ly-file-dinh-kem.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-31-quan-ly-file-dinh-kem-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2581 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 51
- Batch: part 4 / 4

### Item 7.9: Thẻ trạng thái Không có read-only vì lock

- itemId: img-046
- parentNo: 7
- bbox: (42, 1634) - (277, 1727)
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
  - Mục đích và ngữ cảnh: Đóng lại một giả định dễ sai, kèm lý do nghiệp vụ thật.
  - Thành phần hiển thị: Thẻ có tiêu đề Không có read-only vì lock; mô tả đính kèm được miễn khoá ngày có chủ đích vì một lô nhận vào ngày đã lock vẫn bán ngày sau, nên không bao giờ trả mã lỗi khoá ngày.
  - Chức năng và logic: Vì vậy màn không có trạng thái chỉ đọc theo ngày.
- qa: -

### Item 8: Khối đối chiếu thiết kế và prototype

- itemId: img-047
- parentNo: -
- bbox: (26, 1756) - (1026, 2315)
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
  - Mục đích và ngữ cảnh: Tách rõ phần đã chạy thật khỏi phần còn thiếu; đây là màn có nhiều hạng mục đã đủ nhất trong nhóm.
  - Thành phần hiển thị: Tiêu đề khối viết hoa; bảng ba cột mười hàng dữ liệu với cột cuối phân mức.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

### Item 8.1: Bảng đối chiếu thiết kế và prototype

- itemId: img-048
- parentNo: 8
- bbox: (42, 1800) - (1010, 2299)
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
  - Mục đích và ngữ cảnh: Liệt từng hạng mục kèm mức; ba hàng đầu ở mức đã đủ và đó là điểm khác biệt lớn nhất so với các màn khác của nhóm.
  - Thành phần hiển thị: Ba cột: thiết kế đòi · prototype làm · mức; mười hàng gồm upload và lưu trữ và đọc lại · quy tắc đường dẫn · không phán định tự động · màn quản lý xuyên lô · phân loại tài liệu · tầng lưu trữ · chuyển tầng và phục hồi · hành động vòng đời · phạm vi policy · kiểm soát truy cập.
  - Chức năng và logic: Cột mức có bốn nhãn: đã đủ · chưa có · một phần · xung đột.
- qa: -

### Item 8.1.1: Hàng tiêu đề bảng đối chiếu

- itemId: img-049
- parentNo: 8.1
- bbox: (43, 1800) - (1010, 1827)
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

### Item 8.1.2: Hàng một hạng mục đối chiếu — đại diện

- itemId: img-050
- parentNo: 8.1
- bbox: (43, 1827) - (1010, 1876)
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
  - Mục đích và ngữ cảnh: Một hàng là một hạng mục; mười hàng có cùng cấu trúc nên gộp thành một đại diện.
  - Thành phần hiển thị: Ba ô: mô tả điều thiết kế đòi · mô tả hiện trạng · thẻ mức; hàng đại diện đang hiện hạng mục upload và lưu trữ và đọc lại chứng từ với mức đã đủ.
  - Chức năng và logic: Chỉ đọc. Thẻ mức ở ô cuối lấy một trong bốn giá trị đã đủ · chưa có · một phần · xung đột.
- qa: -

### Item 9: Chân ghi chú phân quyền, đánh đổi và giả định

- itemId: img-051
- parentNo: -
- bbox: (26, 2330) - (1026, 2559)
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
  - Mục đích và ngữ cảnh: Gom năm thứ phải đọc trước khi dựng: phân quyền, đánh đổi cần quyết định kiến trúc, quyết định không xoá file, sáu giả định và ba ghi chú thi hành.
  - Thành phần hiển thị: Năm đoạn chữ nhỏ: đoạn phân quyền đề xuất hai vai trò và nói rõ vai trò tiếp nhận không vào được vì đó là vai ghi đính kèm chứ không phải vai quản lý lưu trữ; đoạn đánh đổi về kiểm soát truy cập chứng từ, chung một quyết định kiến trúc với màn tra cứu vết; đoạn giải thích vì sao không đề xuất xoá file; đoạn sáu giả định cần chốt; đoạn ghi chú về phân trang, đối chiếu kho lưu với cơ sở dữ liệu và ranh giới vẽ khung.
  - Chức năng và logic: Tĩnh. Sáu giả định gồm: tập giá trị loại tài liệu; màn quản một kho hay hai kho; ai được duyệt toàn bộ chứng từ và có siết đọc hay không; có ghi vết cho hành vi mở hoặc tạo lại liên kết hay không; thời hạn của liên kết có chữ ký; hai ngày làm việc theo lịch nào.
- qa: -

