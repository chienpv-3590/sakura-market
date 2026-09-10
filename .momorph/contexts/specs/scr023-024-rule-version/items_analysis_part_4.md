# Items Analysis - scr023-024-rule-version

- Screen: SC-24 · Tạo và phê duyệt phiên bản biểu suất
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 4 / 4

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
  Mục đích và ngữ cảnh: Bảy chỗ prototype khác thiết kế; kèm mức lệch của từng chỗ.
  Thành phần hiển thị: Bảy dòng gồm bốn mức: Chưa đạt cho biểu mẫu không có ô biểu suất; hạn mức 4 lần mỗi năm không được đếm và việc tạo phiên bản không ghi dấu vết kiểm toán. Khớp cho maker-checker chặn ở server cho cả duyệt và rollback. Hở cho ô ngày không đặt giới hạn nhỏ nhất và rollback không có giao dịch trọn vẹn. Chưa chốt cho việc rollback kiểm người lập của phiên bản đang bị hạ cấp.
  Chức năng và logic: Bảng tĩnh; không lọc. Chỉ liệt những chỗ khác nhau; chỗ khớp chỉ nêu khi cần chặn cách đọc sai.
- qa: -
- bbox: startX 42 · startY 2069 · endX 1010 · endY 2441

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
  Thành phần hiển thị: Hai dòng: dòng phân quyền nói chỉ quản trị rule vào được cả hai khung và điều kiện quyết định không phải vai trò nào mà là người duyệt phải khác người lập; dòng thứ hai là liên kết sang tài liệu bản as-built của màn.
  Chức năng và logic: Thuần hiển thị. Hai tài khoản demo tách đôi một người lập và một người duyệt là cố ý.
- qa: -
- bbox: startX 26 · startY 2472 · endX 1026 · endY 2538
