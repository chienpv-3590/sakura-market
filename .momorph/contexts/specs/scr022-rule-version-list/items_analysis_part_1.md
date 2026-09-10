# Items Analysis - scr022-rule-version-list

- Screen: SC-23 · Danh sách phiên bản biểu suất
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 1 / 3

### Item 1: Khối đầu màn danh sách phiên bản biểu suất

- nameJP: 画面ヘッダー
- nameTrans: Screen header block
- itemType: others
- itemSubtype: khối đầu trang
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
  Mục đích và ngữ cảnh: Định danh màn SC-23 — nơi quản trị rule đọc toàn bộ vòng đời các phiên bản biểu suất 完納奨励金.
  Thành phần hiển thị: Tiêu đề màn ở dòng trên; dưới là dòng metadata gồm mã FE; mã FN; mức ưu tiên; danh sách yêu cầu khách; actor và thẻ trạng thái dựng.
  Chức năng và logic: Thuần hiển thị; không có tương tác. Cả vai người lập và vai người duyệt dùng chung màn này; tách nhau ở SC-24 theo người tạo từng phiên bản.
- qa: -
- bbox: startX 26 · startY 22 · endX 1026 · endY 138

### Item 1.1: Tiêu đề màn

- nameJP: 画面タイトル
- nameTrans: Screen title
- itemType: label
- itemSubtype: tiêu đề trang
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
  Mục đích và ngữ cảnh: Cho biết đang ở màn danh sách phiên bản; không phải màn tạo hay duyệt phiên bản.
  Thành phần hiển thị: Một dòng chữ gồm mã màn SC-23 và tên màn Danh sách phiên bản biểu suất.
  Chức năng và logic: Tĩnh; không đổi theo bộ lọc trạng thái đang chọn.
- qa: -
- bbox: startX 26 · startY 22 · endX 1026 · endY 48

### Item 1.2: Dòng metadata màn

- nameJP: 画面メタ情報
- nameTrans: Screen metadata line
- itemType: label
- itemSubtype: dòng metadata
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
  Mục đích và ngữ cảnh: Truy được từ màn về đúng tính năng và đúng yêu cầu khách mà màn phải thoả.
  Thành phần hiển thị: Chuỗi phân tách bằng dấu · gồm mã FE-031; mã FN-09; mức ưu tiên P0; bốn mã yêu cầu khách kèm baseline TBL-RATE-01 và năng lực CAP-06; actor quản trị rule; mã thi công SCR022_RuleVersionList; loại List; route /incentive/rules và thẻ trạng thái.
  Chức năng và logic: Tĩnh. Dòng này khai rõ actor gồm cả vai người lập và vai người duyệt — điều kiện tách hai vai không nằm ở vai trò mà ở người tạo từng phiên bản.
- qa: -
- bbox: startX 26 · startY 60 · endX 1026 · endY 115

### Item 1.2.1: Thẻ trạng thái dựng màn

- nameJP: 実装状況タグ
- nameTrans: Build status tag
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
  Mục đích và ngữ cảnh: Cho biết màn đã có bản thi công để đối chiếu; không phải cam kết rằng thiết kế đã đạt.
  Thành phần hiển thị: Một thẻ chữ nhỏ nằm cuối dòng metadata.
  Chức năng và logic: Tĩnh. Mức đạt hay chưa đạt của từng yêu cầu nằm ở khối đối chiếu prototype cuối màn.
- qa: -
- bbox: startX 392 · startY 95 · endX 444 · endY 115

### Item 2: Khối yêu cầu khách phải thấy trên màn

- nameJP: 受入条件ブロック
- nameTrans: Acceptance criteria block
- itemType: others
- itemSubtype: khối tài liệu yêu cầu
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
  Mục đích và ngữ cảnh: Ghi lại đúng phần Nghiệm thu của bốn yêu cầu khách mà màn này phải chứng minh.
  Thành phần hiển thị: Tiêu đề khối và một bảng hai cột: mã yêu cầu và điều phải thấy được trên màn.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là chuẩn nghiệm thu cho chính màn này; mọi cột bảng bên dưới phải truy về được một dòng ở đây.
- qa: -
- bbox: startX 26 · startY 154 · endX 1026 · endY 358

### Item 2.1: Bảng yêu cầu và điểm nghiệm thu

- nameJP: 要求・受入条件テーブル
- nameTrans: Requirement and acceptance table
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
  Mục đích và ngữ cảnh: Bốn dòng yêu cầu mà màn phải thoả; mỗi dòng nói rõ điều gì phải nhìn thấy được.
  Thành phần hiển thị: Bốn dòng: FR-RULE-01 (mọi phiên bản ghi đủ người tạo; người phê duyệt; ngày hiệu lực và trạng thái); FR-INC-02 với TBL-RATE-01 (bản nháp chưa có hiệu lực cho tới khi được phê duyệt và rollback được theo từng version); GOV-RULE-01 (thay đổi tối đa 4 lần mỗi năm kèm maker-checker; ngày hiệu lực và rollback); NFR-OPS-02 với CAP-06 (biểu suất cập nhật bằng thay đổi cấu hình có kiểm soát; nghiệm thu bằng demo đổi rule bằng version mới).
  Chức năng và logic: Bảng tĩnh; không lọc; không sắp xếp. Bốn dòng là cố định theo Feature List của màn.
- qa: -
- bbox: startX 42 · startY 199 · endX 1010 · endY 342

### Item 3: Khối hạn mức thay đổi trong năm

- nameJP: 年間変更上限ブロック
- nameTrans: Annual change quota block
- itemType: others
- itemSubtype: khối chỉ số chỉ đọc
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
  Mục đích và ngữ cảnh: Đưa hạn mức 4 lần đổi rule mỗi năm của GOV-RULE-01 lên bề mặt màn; hạn mức không thấy được thì không ai giữ được.
  Thành phần hiển thị: Tiêu đề khối và hai ô hiển thị chỉ đọc đặt cạnh nhau: số lần đổi rule đã dùng và phiên bản đang có hiệu lực.
  Chức năng và logic: Chỉ đọc; không nhận nhập. Hết hạn mức thì nút tạo phiên bản phải tắt ngay tại màn kèm lý do; không để người lập gửi rồi mới bị từ chối.
- qa: -
- bbox: startX 26 · startY 371 · endX 1026 · endY 536

### Item 3.1: Ô hiển thị Số lần đổi rule đã dùng

- nameJP: 年間ルール変更回数
- nameTrans: Annual rule change count
- itemType: label
- itemSubtype: ô hiển thị chỉ đọc
- buttonType: -
- dataType: integer
- format: <đã dùng> / 4 lần — còn <còn lại> lần
- required: -
- minLength: -
- maxLength: -
- defaultValue: 3 / 4 lần — còn 1 lần
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế đòi một chỉ số đếm số phiên bản đã được phê duyệt trong năm; hiện chưa có thực thể hay cột nào giữ mốc năm và số đếm này nên phần mapping để trống. Prototype không đếm và không chặn.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Cho quản trị rule biết còn được đổi rule mấy lần trong năm theo GOV-RULE-01.
  Thành phần hiển thị: Nhãn Số lần đổi rule đã dùng; một ô chữ chỉ đọc mang giá trị 3 / 4 lần — còn 1 lần; dòng gợi ý nói đếm theo phiên bản đã được phê duyệt trong năm.
  Chức năng và logic: Đếm theo phiên bản đã được phê duyệt; bản nháp chờ duyệt không tính. Khi đã dùng 4 trên 4 thì nút tạo phiên bản mới ở khối bộ lọc phải tắt kèm lý do.
- qa:
  - Mốc năm của hạn mức là năm dương lịch hay năm tài chính Nhật; vì hai cách cho hai thời điểm đặt lại khác nhau?
  - Rollback có bị tính là một lần đổi trong hạn mức không?
  - Khi đã hết hạn mức mà khách cần đổi rule gấp thì màn cho đường ngoại lệ nào; hay chặn tuyệt đối?
- bbox: startX 42 · startY 415 · endX 521 · endY 510

### Item 3.2: Ô hiển thị Phiên bản đang có hiệu lực

- nameJP: 有効中バージョン
- nameTrans: Active rule version
- itemType: label
- itemSubtype: ô hiển thị chỉ đọc
- buttonType: -
- dataType: string
- format: v<số phiên bản> · hiệu lực từ YYYY-MM-DD
- required: -
- minLength: -
- maxLength: -
- defaultValue: v3 · hiệu lực từ 2026-09-01
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: effective_from
- databaseNote: Phiên bản đang chi phối cách tính là phiên bản đã duyệt có ngày hiệu lực gần nhất đã tới. Prototype có bảng và cột này; nhưng nhiều dòng cùng mang trạng thái đang hiệu lực và việc chọn một dòng chỉ xảy ra lúc đọc.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Cho biết phiên bản nào đang chi phối cách tính thưởng ở SC-22 ngay lúc này.
  Thành phần hiển thị: Nhãn Phiên bản đang có hiệu lực; một ô chữ chỉ đọc mang giá trị v3 · hiệu lực từ 2026-09-01; dòng gợi ý nói luôn có đúng một phiên bản đang chi phối cách tính ở SC-22.
  Chức năng và logic: Thiết kế đòi đúng một phiên bản đang hiệu lực tại mỗi thời điểm. Nếu không có phiên bản nào thì màn phải cảnh báo vì SC-22 sẽ không tính được thưởng.
- qa: -
- bbox: startX 532 · startY 415 · endX 1010 · endY 510

### Item 4: Khối bộ lọc trạng thái

- nameJP: 絞り込みブロック
- nameTrans: Filter block
- itemType: others
- itemSubtype: khối bộ lọc
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
  Mục đích và ngữ cảnh: Thu hẹp danh sách phiên bản theo trạng thái vòng đời; và là chỗ đặt đường sang màn tạo phiên bản.
  Thành phần hiển thị: Tiêu đề khối; ô chọn Lọc theo trạng thái; nút Lọc và nút Tạo phiên bản mới đặt cùng một hàng.
  Chức năng và logic: Gửi bằng phương thức GET về chính màn; không ghi dữ liệu. Nút tạo phiên bản chỉ điều hướng; việc tạo nằm ở SC-24.
- qa: -
- bbox: startX 26 · startY 549 · endX 1026 · endY 698

### Item 4.1: Ô chọn Lọc theo trạng thái

- nameJP: 状態で絞り込み
- nameTrans: Status filter select
- itemType: dropdown
- itemSubtype: ô chọn lọc
- buttonType: -
- dataType: string
- format: Tất cả | Chờ duyệt | Đã duyệt; chờ tới ngày hiệu lực | Đang hiệu lực | Đã bị thay thế | Đã rollback
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: -
- transitionNote: Không điều hướng; nạp lại chính màn SC-23 theo trạng thái đã chọn.
- databaseTable: incentive_rule_version
- databaseColumn: status
- databaseNote: Lọc theo trạng thái vòng đời của phiên bản. Prototype chỉ lưu ba giá trị trong cột này; hai trạng thái Đã bị thay thế và Đã duyệt chờ tới ngày hiệu lực được tính lúc đọc nên không lọc được.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Tìm nhanh nhóm phiên bản cần xem: bản còn chờ duyệt; bản đang chi phối cách tính; hay bản đã bị thay thế.
  Thành phần hiển thị: Nhãn Lọc theo trạng thái; ô chọn mang giá trị mặc định Tất cả; dòng gợi ý liệt kê đủ 5 trạng thái của vòng đời.
  Chức năng và logic: Thiết kế đòi lọc được cả 5 trạng thái; kể cả hai trạng thái phụ thuộc thời điểm là Đã duyệt chờ tới ngày hiệu lực và Đã bị thay thế.
- qa:
  - Khi lọc bằng một giá trị không nằm trong 5 trạng thái thì màn bỏ lọc và hiện tất cả; hay báo lỗi tại field?
  - Đường trên trang và đường qua API phải cho cùng một kết quả với cùng một giá trị lọc — chọn hành vi nào làm chuẩn?
- bbox: startX 42 · startY 593 · endX 827 · endY 672

### Item 4.2: Nút Lọc

- nameJP: 絞り込みボタン
- nameTrans: Filter button
- itemType: button
- itemSubtype: nút phụ trong hàng lọc
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Nạp lại chính màn SC-23 với trạng thái đã chọn; không sang màn khác.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Áp dụng trạng thái đã chọn cho danh sách phiên bản.
  Thành phần hiển thị: Một nút chữ đặt sau ô chọn trạng thái; ngang hàng với ô chọn.
  Chức năng và logic: Gửi biểu mẫu bằng phương thức GET; không ghi dữ liệu và không có trạng thái đang gửi vì màn chỉ đọc.
- qa: -
- bbox: startX 838 · startY 610 · endX 883 · endY 639

### Item 4.3: Nút Tạo phiên bản mới

- nameJP: 新規バージョン作成ボタン
- nameTrans: Create new version button
- itemType: button
- itemSubtype: nút chính điều hướng
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Sang SC-24 khung SCR023 tạo phiên bản; route /incentive/rules/new.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Đường vào thao tác tạo bản nháp phiên bản biểu suất; đặt ngay cạnh bộ lọc để người lập không phải tìm.
  Thành phần hiển thị: Một nút chữ nhấn mạnh đặt cuối hàng bộ lọc.
  Chức năng và logic: Chỉ điều hướng; không ghi dữ liệu ở màn này. Khi đã dùng hết hạn mức 4 lần trong năm thì nút phải tắt kèm lý do GOV-RULE-01.
- qa: - Nút ở trạng thái tắt vì hết hạn mức trình bày lý do ở đâu: chú thích cạnh nút; hay một khối cảnh báo riêng phía trên danh sách?
- bbox: startX 887 · startY 610 · endX 1010 · endY 639

### Item 5: Khối danh sách phiên bản

- nameJP: バージョン一覧ブロック
- nameTrans: Version list block
- itemType: others
- itemSubtype: khối danh sách
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
  Mục đích và ngữ cảnh: Nơi đọc toàn bộ vòng đời các phiên bản biểu suất; kèm đủ dữ kiện để kiểm soát thay đổi.
  Thành phần hiển thị: Tiêu đề khối; bảng danh sách sáu cột và một ghi chú ba đoạn ở dưới bảng.
  Chức năng và logic: Chỉ đọc; sắp mới nhất lên trước. Mọi thao tác tạo; duyệt và rollback nằm ở SC-24.
- qa: -
- bbox: startX 26 · startY 711 · endX 1026 · endY 984

### Item 5.1: Bảng danh sách phiên bản

- nameJP: バージョン一覧テーブル
- nameTrans: Version list table
- itemType: table
- itemSubtype: bảng danh sách
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: -
- databaseNote: Một dòng bảng là một phiên bản biểu suất. Prototype có bảng incentive_rule_version thật với đủ các cột tương ứng; số phiên bản có ràng buộc duy nhất.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Toàn bộ phiên bản biểu suất theo thứ tự mới nhất lên trước; mỗi dòng là một phiên bản.
  Thành phần hiển thị: Sáu cột: Phiên bản; Nội dung biểu suất; Ngày hiệu lực; Trạng thái; Người lập; Người duyệt. Bốn dòng mẫu cho bốn trạng thái: chờ duyệt; đang hiệu lực; đã bị thay thế và đã rollback.
  Chức năng và logic: Chỉ đọc; không phân trang. Số phiên bản là liên kết mở màn SC-24 cho phiên bản đó. Phiên bản đã bị thay thế hoặc đã rollback không bị xoá vì kết quả thưởng cũ ở SC-22 còn trỏ về chúng.
- qa: - Trần 4 lần đổi mỗi năm giữ danh sách nhỏ; nhưng sau nhiều năm thì màn có cần phân trang hoặc lọc theo năm không?
- bbox: startX 42 · startY 755 · endX 1010 · endY 905
