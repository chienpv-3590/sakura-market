# Items Analysis - report-viewer

- Screen: SC-26 · Xem và xuất báo cáo
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 3 / 3

### Item 6.3: Thẻ trạng thái RPT-06 xem trước và xem batch

- nameJP: RPT-06 プレビュー・バッチ表示カード
- nameTrans: RPT-06 preview and batch card
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
  Mục đích và ngữ cảnh: Phân biệt hai chế độ của RPT-06 để không ai gửi kế toán một bản xem trước.
  Thành phần hiển thị: Thẻ tiêu đề RPT-06 xem trước / xem batch kèm hai đoạn: chưa có batch code thì xem được số liệu; nút xuất vô hiệu và chỉ tạo batch được nếu là bộ phận quyết toán; có batch code thì dòng lấy từ ảnh chụp của batch và xuất CSV hoạt động.
  Chức năng và logic: Thuần hiển thị tài liệu. Chế độ xem trước là số liệu hiện tại chưa gửi; chế độ xem batch là số liệu đã gửi và bất biến.
- qa: -
- bbox: startX 531 · startY 1533 · endX 766 · endY 1659

### Item 6.4: Thẻ trạng thái Mã báo cáo không tồn tại

- nameJP: 未定義レポートコードカード
- nameTrans: Unknown report code card
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
  Mục đích và ngữ cảnh: Khai ranh giới phạm vi của FN-10: danh mục chỉ có 12 mã và không có công cụ tự tạo báo cáo.
  Thành phần hiển thị: Thẻ tiêu đề Mã báo cáo không tồn tại kèm mô tả ra trang không tìm thấy vì catalog chỉ có 12 mã và không có đường tự tạo mã mới.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là ranh giới phạm vi được khách khai rõ; không phải giới hạn kỹ thuật tạm thời.
- qa: -
- bbox: startX 775 · startY 1533 · endX 1010 · endY 1659

### Item 6.5: Thẻ trạng thái Đang tải và lỗi tải

- nameJP: 読み込み・読み込み失敗カード
- nameTrans: Loading and load error card
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
  Mục đích và ngữ cảnh: Mô tả hai trạng thái nạp dữ liệu của màn.
  Thành phần hiển thị: Thẻ tiêu đề Đang tải / lỗi tải kèm mô tả khung trang hiện dần và lỗi truy vấn rơi vào khối lỗi kèm nút tải lại.
  Chức năng và logic: Thuần hiển thị tài liệu. Lỗi truy vấn phải cho người dùng thử lại; không được để màn trắng.
- qa: -
- bbox: startX 42 · startY 1668 · endX 277 · endY 1760

### Item 6.6: Thẻ trạng thái Không có quyền

- nameJP: 権限なしカード
- nameTrans: No permission card
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
  Mục đích và ngữ cảnh: Khai rõ màn này không gác vai trò khi vào; chặn là ở một hành động duy nhất.
  Thành phần hiển thị: Thẻ tiêu đề Không có quyền kèm mô tả không áp dụng khi vào màn vì cả 7 vai trò xem; lọc; phân trang và xuất CSV được; chỉ hành động tạo batch bị chặn theo vai trò.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là ngoại lệ so với các màn khác của hệ thống nên phải khai rõ để không bị dựng thành gác vai trò.
- qa: -
- bbox: startX 286 · startY 1668 · endX 522 · endY 1760

### Item 6.7: Thẻ trạng thái Đang gửi và gửi lỗi

- nameJP: 送信中・送信失敗カード
- nameTrans: Submitting and submit error card
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
  Mục đích và ngữ cảnh: Mô tả hành vi của thao tác tạo batch trong lúc chạy và khi lỗi.
  Thành phần hiển thị: Thẻ tiêu đề Đang gửi / gửi lỗi kèm mô tả nút vô hiệu khi đang gửi và lỗi phải nói rõ lý do: ngày chưa lock; hoặc có yêu cầu tạo batch cùng lúc.
  Chức năng và logic: Thuần hiển thị tài liệu. Mỗi nguyên nhân lỗi phải có thông báo riêng để người dùng biết nên chờ; nên lock ngày; hay nên thử lại.
- qa: -
- bbox: startX 531 · startY 1668 · endX 766 · endY 1760

### Item 6.8: Thẻ trạng thái Read-only vì lock

- nameJP: 締め後読み取り専用カード
- nameTrans: Read-only after lock card
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
  Mục đích và ngữ cảnh: Chặn một cách đọc sai: ở màn này lock không khoá gì; lock là điều kiện để làm được việc.
  Thành phần hiển thị: Thẻ tiêu đề Read-only vì lock kèm mô tả ngược lại là đúng vì lock là tiền đề để tạo batch và màn này không bao giờ khoá vì lock.
  Chức năng và logic: Thuần hiển thị tài liệu. Khai ngược lại như vậy là có chủ đích vì các màn khác của hệ thống bị khoá sau lock.
- qa: -
- bbox: startX 775 · startY 1668 · endX 1010 · endY 1760

### Item 7: Khối đối chiếu prototype

- nameJP: プロトタイプ差分ブロック
- nameTrans: Prototype comparison block
- itemType: others
- itemSubtype: khối tài liệu đối chiếu
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
  Mục đích và ngữ cảnh: Đặt cách cài đặt hiện tại của prototype tách khỏi phần thiết kế; để đọc spec không lẫn hiện trạng vào yêu cầu.
  Thành phần hiển thị: Tiêu đề khối và một bảng ba cột: thiết kế đòi; prototype làm và mức lệch.
  Chức năng và logic: Thuần hiển thị tài liệu. Khối này là hiện trạng để đối chiếu; không phải nguồn của thiết kế.
- qa: -
- bbox: startX 26 · startY 1789 · endX 1026 · endY 2268

### Item 7.1: Bảng đối chiếu thiết kế và prototype

- nameJP: 設計・実装差分テーブル
- nameTrans: Design versus prototype table
- itemType: table
- itemSubtype: bảng tài liệu
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
  Mục đích và ngữ cảnh: Tám chỗ prototype khác thiết kế; kèm mức lệch của từng chỗ.
  Thành phần hiển thị: Tám dòng: 7 trên 12 mã chạy thật và 5 mã còn dùng dữ liệu mẫu; bản xuất kế toán rơi về thư điện tử nội bộ; đường xuất CSV không ghi dấu vết kiểm toán; ngày nghiệp vụ sai âm thầm rơi về hôm nay; RPT-09 chưa dựng vì phụ thuộc SC-19; thuế suất và cơ sở thuế còn là giả định; chức năng batch đang nằm trong màn này thay vì SC-27; và một ghi chú nội bộ khai sai số mã dùng dữ liệu mẫu.
  Chức năng và logic: Bảng tĩnh; không lọc. Hai dòng nặng nhất là rò thư điện tử nội bộ ra ngoài tổ chức và việc xuất dữ liệu không truy vết được.
- qa: -
- bbox: startX 42 · startY 1833 · endX 1010 · endY 2252

### Item 8: Chân ghi chú phân quyền; định dạng CSV và nguồn as-built

- nameJP: 権限・CSV仕様・出典フッター
- nameTrans: Permission CSV format and source footer
- itemType: label
- itemSubtype: chân ghi chú màn
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
  Mục đích và ngữ cảnh: Chốt lại phân quyền; định dạng file xuất và trỏ về tài liệu hiện trạng của prototype.
  Thành phần hiển thị: Ba dòng: dòng phân quyền nói cả 7 vai trò lọc; phân trang và xuất CSV được và riêng tạo batch chỉ bộ phận quyết toán; dòng định dạng CSV nói UTF-8 có BOM; phân tách dấu phẩy; quoting RFC 4180; kết dòng CRLF; tên file theo mã và ngày và riêng RPT-06 dựng từ batch code đã xác nhận trong cơ sở dữ liệu; dòng cuối là liên kết sang tài liệu bản as-built.
  Chức năng và logic: Thuần hiển thị. UTF-8 có BOM là bắt buộc để file chở được cả chữ Nhật và tiếng Việt có dấu; lấy tên file từ giá trị đã xác nhận trong cơ sở dữ liệu là lớp chặn chèn nội dung vào phần đầu phản hồi.
- qa: - Hệ kế toán bên nhận đọc được UTF-8 có BOM; hay đang chờ một bảng mã khác?
- bbox: startX 26 · startY 2283 · endX 1026 · endY 2385
