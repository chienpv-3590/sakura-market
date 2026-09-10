# Items Analysis - scr021-incentive-result

- Screen: SC-22 · Kết quả tính 完納奨励金
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 3 / 3

### Item 7.7: Thẻ trạng thái Dòng 0 JPY

- nameJP: 0円行カード
- nameTrans: Zero amount row card
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
  Mục đích và ngữ cảnh: Khẳng định dòng 0 JPY là kết quả nghiệp vụ thật; không phải thiếu dữ liệu.
  Thành phần hiển thị: Thẻ tiêu đề Dòng 0 JPY kèm mô tả đây là kết quả thật của BR-INC-01 khi quá hạn và nhãn nguyên nhân phải nói rõ.
  Chức năng và logic: Thuần hiển thị tài liệu. Dòng 0 JPY không được lọc bỏ khi đối chiếu; bỏ đi là mất bằng chứng đã tính.
- qa: -
- bbox: startX 531 · startY 1385 · endX 766 · endY 1494

### Item 7.8: Thẻ trạng thái Chỉ đọc

- nameJP: 読み取り専用カード
- nameTrans: Read-only card
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
  Mục đích và ngữ cảnh: Khai rằng màn không có bất kỳ thao tác ghi nào.
  Thành phần hiển thị: Thẻ tiêu đề Chỉ đọc kèm mô tả kết quả do hệ thống ghi khi chốt kỳ hoặc khi duyệt điều chỉnh.
  Chức năng và logic: Thuần hiển thị tài liệu. Vì không có đường ghi cho người dùng nên màn không có trạng thái đang gửi hay gửi lỗi.
- qa: -
- bbox: startX 775 · startY 1385 · endX 1010 · endY 1494

### Item 8: Ghi chú CHƯA CHỐT về phạm vi phiên bản hoá biểu suất

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
  Mục đích và ngữ cảnh: Khai một chỗ tài liệu khách tự chống nhau; để không ai tự quyết hộ khách ở tầng thiết kế.
  Thành phần hiển thị: Một khối ghi chú viền nét: BR-INC-01 cố định hệ số 110/100; trong khi FE-031; FR-INC-02 và CAP-06 đòi quản lý được công thức và biểu suất; NFR-OPS-02 đòi đổi được không cần triển khai lại.
  Chức năng và logic: Thuần hiển thị tài liệu. Câu hỏi để lại cho khách: phần nào của công thức được phiên bản hoá; và hệ số 110/100 có nằm trong phần đó không.
- qa: -
- bbox: startX 26 · startY 1523 · endX 1026 · endY 1595

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
- bbox: startX 26 · startY 1611 · endX 1026 · endY 2072

### Item 9.1: Bảng đối chiếu thiết kế và prototype

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
  Thành phần hiển thị: Tám dòng gồm ba mức: Chưa đạt cho biểu suất là hằng trong mã nguồn; chênh lệch không gắn với kỳ gốc; chênh lệch không hiện mã yêu cầu điều chỉnh và số tiền tính từ bảng dữ liệu mẫu. Khớp cho cột phiên bản luôn hiện. Hở cho bộ lọc người tham gia chỉ có ở API; kỳ sai âm thầm rơi về hôm nay và engine chạy đồng bộ trong lần chốt kỳ.
  Chức năng và logic: Bảng tĩnh; không lọc. Chỉ liệt những chỗ khác nhau; chỗ khớp chỉ nêu khi cần chặn cách đọc sai.
- qa: -
- bbox: startX 42 · startY 1655 · endX 1010 · endY 2056

### Item 10: Chân ghi chú phân quyền và nguồn as-built

- nameJP: 権限・出典フッター
- nameTrans: Permission and source footer
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
  Mục đích và ngữ cảnh: Chốt lại phân quyền của màn và trỏ về tài liệu hiện trạng của prototype.
  Thành phần hiển thị: Hai dòng: dòng phân quyền nói chỉ bộ phận quyết toán vào được và chỉ đọc; dòng thứ hai là liên kết sang tài liệu bản as-built của màn.
  Chức năng và logic: Thuần hiển thị. Bảng kết quả không có đường ghi cho người dùng đăng nhập; chỉ hệ thống ghi được.
- qa: -
- bbox: startX 26 · startY 2087 · endX 1026 · endY 2134
