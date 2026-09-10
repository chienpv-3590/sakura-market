# Items Analysis - scr022-rule-version-list

- Screen: SC-23 · Danh sách phiên bản biểu suất
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 3 / 3

### Item 7: Ghi chú CHƯA CHỐT về phạm vi phiên bản hoá biểu suất

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
  Chức năng và logic: Thuần hiển thị tài liệu. Câu hỏi để lại cho khách: một phiên bản biểu suất quản lý tham số nào. Cột Nội dung biểu suất chỉ vẽ được đầy đủ sau khi có câu trả lời.
- qa: -
- bbox: startX 26 · startY 1246 · endX 1026 · endY 1317

### Item 8: Khối đối chiếu prototype

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
- bbox: startX 26 · startY 1333 · endX 1026 · endY 1795

### Item 8.1: Bảng đối chiếu thiết kế và prototype

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
  Thành phần hiển thị: Tám dòng gồm ba mức: Chưa đạt cho biểu suất là hằng trong mã nguồn; hạn mức 4 lần mỗi năm không được đếm và việc tạo phiên bản không ghi dấu vết kiểm toán. Khớp cho bốn cột người lập; người duyệt; ngày hiệu lực và trạng thái. Hở cho chỉ lọc được 3 trạng thái; nhiều dòng cùng đang hiệu lực; tên rơi về thư điện tử và hai kiểu rỗng dùng chung một trạng thái.
  Chức năng và logic: Bảng tĩnh; không lọc. Chỉ liệt những chỗ khác nhau; chỗ khớp chỉ nêu khi cần chặn cách đọc sai.
- qa: -
- bbox: startX 42 · startY 1377 · endX 1010 · endY 1779

### Item 9: Chân ghi chú phân quyền và nguồn as-built

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
  Thành phần hiển thị: Hai dòng: dòng phân quyền nói chỉ quản trị rule vào được và màn chỉ đọc; dòng thứ hai là liên kết sang tài liệu bản as-built của màn.
  Chức năng và logic: Thuần hiển thị. Cả người lập và người duyệt dùng chung màn này; tách nhau ở SC-24 theo người tạo từng phiên bản.
- qa: -
- bbox: startX 26 · startY 1810 · endX 1026 · endY 1875
