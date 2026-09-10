# Items Analysis - scr023-024-rule-version

- Screen: SC-24 · Tạo và phê duyệt phiên bản biểu suất
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 3 / 4

### Item 7: Khối liệt kê trạng thái của cả hai khung

- nameJP: 画面状態一覧ブロック
- nameTrans: Screen state list block
- itemType: others
- itemSubtype: khối tài liệu trạng thái
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
  Mục đích và ngữ cảnh: Liệt kê đủ mười hai trạng thái mà hai khung con phải xử lý để không bỏ sót đường rẽ nào lúc dựng.
  Thành phần hiển thị: Tiêu đề khối và mười hai thẻ trạng thái xếp thành ba hàng bốn cột; mỗi thẻ có tiêu đề và một đoạn mô tả hành vi.
  Chức năng và logic: Thuần hiển thị tài liệu. Bốn trạng thái phụ thuộc vai người xem là chỗ dễ mất nhất: chờ duyệt được duyệt; chờ duyệt tự lập; đang hiệu lực; và đang hiệu lực tự lập.
- qa: -
- bbox: startX 26 · startY 1570 · endX 1026 · endY 1924

### Item 7.1: Thẻ trạng thái Rỗng khi tạo

- nameJP: 空状態カード(作成)
- nameTrans: Empty create state card
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
  Mục đích và ngữ cảnh: Mô tả khung tạo lúc vừa mở; chưa nhập gì.
  Thành phần hiển thị: Thẻ tiêu đề Rỗng (tạo) kèm mô tả form trống và nút tạo tắt cho tới khi đủ ngày hiệu lực; nội dung và lý do.
  Chức năng và logic: Thuần hiển thị tài liệu. Nút tắt là mặc định; không phải trạng thái lỗi.
- qa: -
- bbox: startX 42 · startY 1614 · endX 277 · endY 1689

### Item 7.2: Thẻ trạng thái Hết hạn mức năm

- nameJP: 年間上限到達カード
- nameTrans: Annual quota exhausted card
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
  Mục đích và ngữ cảnh: Mô tả khung tạo khi đã dùng hết 4 lần đổi rule trong năm.
  Thành phần hiển thị: Thẻ tiêu đề Hết hạn mức năm kèm mô tả đã 4 trên 4 lần; form tạo tắt kèm lý do và không cho gửi rồi mới báo lỗi.
  Chức năng và logic: Thuần hiển thị tài liệu. Chặn ở màn trước khi gửi là yêu cầu thiết kế; không chỉ chặn ở server.
- qa: -
- bbox: startX 286 · startY 1614 · endX 522 · endY 1689

### Item 7.3: Thẻ trạng thái Đang tải và lỗi tải

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
  Mục đích và ngữ cảnh: Mô tả hai trạng thái nạp dữ liệu của cả hai khung.
  Thành phần hiển thị: Thẻ tiêu đề Đang tải / lỗi tải kèm mô tả khung trang hiện trước và lỗi truy vấn thì báo kèm nút tải lại.
  Chức năng và logic: Thuần hiển thị tài liệu. Lỗi truy vấn phải cho người dùng thử lại; không được để màn trắng.
- qa: -
- bbox: startX 531 · startY 1614 · endX 766 · endY 1689

### Item 7.4: Thẻ trạng thái Không tìm thấy

- nameJP: 未検出カード
- nameTrans: Not found card
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
  Mục đích và ngữ cảnh: Mô tả hành vi khi mở một phiên bản không tồn tại.
  Thành phần hiển thị: Thẻ tiêu đề Không tìm thấy kèm mô tả phiên bản không tồn tại thì ra trang không tìm thấy.
  Chức năng và logic: Thuần hiển thị tài liệu. Trả trang không tìm thấy là có chủ đích để không lộ sự tồn tại của tài nguyên.
- qa: -
- bbox: startX 775 · startY 1614 · endX 1010 · endY 1689

### Item 7.5: Thẻ trạng thái Không có quyền

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
  Mục đích và ngữ cảnh: Mô tả hành vi khi người dùng không thuộc quản trị rule.
  Thành phần hiển thị: Thẻ tiêu đề Không có quyền kèm mô tả ngoài quản trị rule thì không vào được và cả ba đường ghi tạo; duyệt; rollback đều không gọi được.
  Chức năng và logic: Thuần hiển thị tài liệu. Chặn phải áp cho cả trang và cả ba đường ghi; chặn ở một phía là hở.
- qa: -
- bbox: startX 42 · startY 1698 · endX 277 · endY 1790

### Item 7.6: Thẻ trạng thái Chờ duyệt và được duyệt

- nameJP: 承認待ち・承認可カード
- nameTrans: Pending and approvable card
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
  Mục đích và ngữ cảnh: Mô tả trường hợp người xem khác người lập nên được phép phê duyệt.
  Thành phần hiển thị: Thẻ tiêu đề Chờ duyệt; được duyệt kèm mô tả có nút Phê duyệt và kèm nội dung biểu suất để đọc.
  Chức năng và logic: Thuần hiển thị tài liệu. Nội dung biểu suất phải đọc được ở trạng thái này; duyệt mù là mất ý nghĩa của cổng.
- qa: -
- bbox: startX 286 · startY 1698 · endX 522 · endY 1790

### Item 7.7: Thẻ trạng thái Chờ duyệt và tự lập

- nameJP: 承認待ち・自作カード
- nameTrans: Pending and self-created card
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
  Mục đích và ngữ cảnh: Mô tả trường hợp người xem chính là người lập nên bị chặn phê duyệt.
  Thành phần hiển thị: Thẻ tiêu đề Chờ duyệt; tự lập kèm mô tả chỉ ghi chú; không nút và gọi API trực tiếp vẫn bị từ chối.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là nửa quan trọng của cổng maker-checker; chặn phải ở server.
- qa: -
- bbox: startX 531 · startY 1698 · endX 766 · endY 1790

### Item 7.8: Thẻ trạng thái Đang hiệu lực

- nameJP: 有効中カード
- nameTrans: Active state card
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
  Mục đích và ngữ cảnh: Mô tả khung thao tác khi phiên bản đang chi phối cách tính.
  Thành phần hiển thị: Thẻ tiêu đề Đang hiệu lực kèm mô tả có nút Rollback kèm ô chọn phiên bản đích hợp lệ.
  Chức năng và logic: Thuần hiển thị tài liệu. Ở trạng thái này không có nút Phê duyệt vì phiên bản đã qua cổng.
- qa: -
- bbox: startX 775 · startY 1698 · endX 1010 · endY 1790

### Item 7.9: Thẻ trạng thái Đã duyệt và chờ tới ngày hiệu lực

- nameJP: 承認済み・発効日待ちカード
- nameTrans: Approved and scheduled card
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
  Mục đích và ngữ cảnh: Mô tả khoảng giữa: đã qua cổng duyệt nhưng chưa tới ngày hiệu lực.
  Thành phần hiển thị: Thẻ tiêu đề Đã duyệt; chờ tới ngày hiệu lực kèm mô tả nói rõ chưa chi phối cách tính và số thưởng chưa đổi tới ngày hiệu lực.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là chỗ dễ đọc sai nhất: bấm Phê duyệt xong mà số thưởng không đổi là đúng thiết kế.
- qa: -
- bbox: startX 42 · startY 1799 · endX 277 · endY 1908

### Item 7.10: Thẻ trạng thái Không còn gì để làm

- nameJP: 操作不可カード
- nameTrans: No action available card
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
  Mục đích và ngữ cảnh: Mô tả trường hợp phiên bản đã ra khỏi vòng thao tác.
  Thành phần hiển thị: Thẻ tiêu đề Không còn gì để làm kèm mô tả đã rollback hoặc đã bị thay thế thì không hiện khối thao tác.
  Chức năng và logic: Thuần hiển thị tài liệu. Ẩn cả khối thao tác ở trạng thái này khác với việc hiện khối rỗng của trường hợp tự lập.
- qa: -
- bbox: startX 286 · startY 1799 · endX 522 · endY 1908

### Item 7.11: Thẻ trạng thái Đang gửi

- nameJP: 送信中カード
- nameTrans: Submitting card
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
  Mục đích và ngữ cảnh: Mô tả hành vi trong lúc một thao tác ghi đang chạy.
  Thành phần hiển thị: Thẻ tiêu đề Đang gửi kèm mô tả nút vô hiệu và không cho bấm trùng.
  Chức năng và logic: Thuần hiển thị tài liệu. Chặn bấm trùng là bắt buộc vì cả ba thao tác đều không tự chống gửi lặp.
- qa: -
- bbox: startX 531 · startY 1799 · endX 766 · endY 1908

### Item 7.12: Thẻ trạng thái Gửi lỗi

- nameJP: 送信失敗カード
- nameTrans: Submit error card
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
  Mục đích và ngữ cảnh: Liệt kê đủ các nguyên nhân lỗi mà thông báo phải nói rõ; không gộp thành lỗi chung.
  Thành phần hiển thị: Thẻ tiêu đề Gửi lỗi kèm năm nguyên nhân: ngày không ở tương lai; tự duyệt hoặc tự rollback; phiên bản đích không hợp lệ; người khác đã xử lý trước; trùng số phiên bản do tạo cùng lúc.
  Chức năng và logic: Thuần hiển thị tài liệu. Mỗi nguyên nhân phải có thông báo riêng để người dùng biết nên sửa gì hay nên thử lại.
- qa: -
- bbox: startX 775 · startY 1799 · endX 1010 · endY 1908

### Item 8: Ghi chú CHƯA CHỐT về hạn mức năm và maker-checker của rollback

- nameJP: 未確定事項の注記
- nameTrans: Open question note
- itemType: label
- itemSubtype: ghi chú chưa chốt
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
  Mục đích và ngữ cảnh: Khai bốn chỗ tài liệu khách chưa nói rõ; để không ai tự quyết hộ khách ở tầng thiết kế.
  Thành phần hiển thị: Một khối ghi chú viền nét gồm bốn câu hỏi: mốc năm là năm dương lịch hay năm tài chính Nhật; rollback có tính vào hạn mức không; maker-checker của rollback kiểm người lập của phiên bản đang bị hạ cấp hay của phiên bản đích; và câu chung với SC-22 và SC-23 về tham số nào được phiên bản hoá.
  Chức năng và logic: Thuần hiển thị tài liệu. Câu hỏi thứ nhất ảnh hưởng trực tiếp tới lúc nào biểu mẫu tạo bị tắt.
- qa: -
- bbox: startX 26 · startY 1937 · endX 1026 · endY 2009

### Item 9: Khối đối chiếu prototype

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
- bbox: startX 26 · startY 2025 · endX 1026 · endY 2457
