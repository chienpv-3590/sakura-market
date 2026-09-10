# Items Analysis - scr023-024-rule-version

- Screen: SC-24 · Tạo và phê duyệt phiên bản biểu suất
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 1 / 4

### Item 1: Khối đầu màn tạo và phê duyệt phiên bản biểu suất

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
  Mục đích và ngữ cảnh: Định danh màn SC-24 — nơi quản trị rule tạo bản nháp biểu suất; rồi một người khác phê duyệt hoặc rollback.
  Thành phần hiển thị: Tiêu đề màn ở dòng trên; dưới là dòng metadata gồm mã FE; mã FN; mức ưu tiên; danh sách yêu cầu khách; actor và thẻ trạng thái dựng.
  Chức năng và logic: Thuần hiển thị; không có tương tác. Một mã SC ứng hai khung con: khung tạo phiên bản và khung phê duyệt kèm rollback.
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
  Mục đích và ngữ cảnh: Cho biết đây là màn có thao tác ghi; khác với SC-23 chỉ đọc danh sách.
  Thành phần hiển thị: Một dòng chữ gồm mã màn SC-24 và tên màn Tạo và phê duyệt phiên bản biểu suất.
  Chức năng và logic: Tĩnh; không đổi theo phiên bản đang mở hay theo vai người xem.
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
  Thành phần hiển thị: Chuỗi phân tách bằng dấu · gồm mã FE-031; mã FN-09; mức ưu tiên P0; bốn mã yêu cầu khách kèm baseline TBL-RATE-01; actor; hai mã thi công SCR023_RuleVersionNew và SCR024_RuleVersionDetail kèm route của từng khung và thẻ trạng thái.
  Chức năng và logic: Tĩnh. Dòng này khai thẳng ràng buộc quan trọng nhất của màn: người lập và người duyệt là hai người khác nhau — điều kiện này không suy ra được từ vai trò.
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
  Thành phần hiển thị: Một thẻ chữ nhỏ nằm cuối dòng metadata; sau route của hai khung con.
  Chức năng và logic: Tĩnh. Mức đạt hay chưa đạt của từng yêu cầu nằm ở khối đối chiếu prototype cuối màn.
- qa: -
- bbox: startX 695 · startY 95 · endX 747 · endY 115

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
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là chuẩn nghiệm thu cho cả hai khung con của màn.
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
  Thành phần hiển thị: Bốn dòng: FR-INC-02 (tạo được phiên bản có ngày hiệu lực trong tương lai; bản nháp chưa có hiệu lực cho tới khi được phê duyệt; rollback theo từng version); GOV-RULE-01 (người duyệt khác người lập; tối đa 4 lần mỗi năm; có ngày hiệu lực; có rollback; thay đổi không làm biến dạng dữ liệu đã chốt trước ngày hiệu lực); FR-RULE-01 (lưu và hiện đủ người tạo; người phê duyệt; ngày hiệu lực; trạng thái); NFR-OPS-02 (đổi biểu suất bằng phiên bản mới; không sửa mã nguồn và không sửa dữ liệu lịch sử).
  Chức năng và logic: Bảng tĩnh; không lọc; không sắp xếp. Bốn dòng là cố định theo Feature List của màn.
- qa: -
- bbox: startX 42 · startY 199 · endX 1010 · endY 342

### Item 3: Khung tạo phiên bản — vai người lập

- nameJP: バージョン作成フォーム
- nameTrans: Create version form block
- itemType: others
- itemSubtype: khối biểu mẫu tạo
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
  Mục đích và ngữ cảnh: Nơi người lập soạn một bản nháp phiên bản biểu suất có ngày hiệu lực trong tương lai.
  Thành phần hiển thị: Tiêu đề khung; hàng đầu gồm ô chọn Ngày hiệu lực và ô hiển thị Hạn mức năm nay; rồi ô nhập Nội dung biểu suất; ô nhập Lý do thay đổi; hai biến thể của nút Tạo bản nháp và một ghi chú về các field server tự đặt.
  Chức năng và logic: Gửi bằng phương thức ghi; tạo một dòng phiên bản ở trạng thái chờ duyệt. Bản nháp không chi phối cách tính ở SC-22 cho tới khi được phê duyệt và tới ngày hiệu lực.
- qa: -
- bbox: startX 26 · startY 371 · endX 1026 · endY 788

### Item 3.1: Ô chọn Ngày hiệu lực

- nameJP: 発効日
- nameTrans: Effective date input
- itemType: date_picker
- itemSubtype: ô chọn ngày bắt buộc
- buttonType: -
- dataType: date
- format: YYYY-MM-DD
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: effective_from
- databaseNote: Ngày phiên bản bắt đầu chi phối cách tính. Prototype có đúng cột này với ràng buộc không rỗng; nhưng ô chọn ngày phía trình duyệt không đặt giới hạn nhỏ nhất.
- validationNote:
  Điều kiện: giá trị phải đúng dạng YYYY-MM-DD và là một ngày lịch thật.
  Lỗi: báo lỗi tại field và không gửi biểu mẫu.
  Điều kiện: ngày hiệu lực phải ở tương lai; nghĩa là sau ngày nghiệp vụ JST hôm nay.
  Lỗi: ô chọn ngày không cho chọn quá khứ ngay từ đầu; và server vẫn từ chối nếu bị gửi qua đường khác.
- description:
  Mục đích và ngữ cảnh: Chọn mốc từ ngày nào phiên bản mới bắt đầu chi phối cách tính thưởng.
  Thành phần hiển thị: Nhãn Ngày hiệu lực kèm dấu bắt buộc; ô ngày mang giá trị mẫu 2026-10-01; dòng gợi ý nói phải là ngày trong tương lai và ô chọn ngày không cho chọn quá khứ.
  Chức năng và logic: Chặn hai tầng: ô chọn ngày không cho chọn quá khứ; và server vẫn kiểm lại. Chỉ dựa vào server báo lỗi sau khi gửi là chưa đủ theo thiết kế.
- qa:
  - Ngày hiệu lực có được đúng bằng ngày mai; hay phải cách hôm nay một số ngày tối thiểu để kịp thông báo?
  - Hai phiên bản chờ duyệt cùng một ngày hiệu lực có được phép cùng tồn tại không?
- bbox: startX 42 · startY 415 · endX 521 · endY 510

### Item 3.2: Ô hiển thị Hạn mức năm nay

- nameJP: 本年度の変更上限
- nameTrans: Annual quota display
- itemType: label
- itemSubtype: ô hiển thị chỉ đọc
- buttonType: -
- dataType: integer
- format: <đã dùng> / 4 lần đã dùng
- required: -
- minLength: -
- maxLength: -
- defaultValue: 3 / 4 lần đã dùng
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế đòi một chỉ số đếm số lần đổi rule trong năm; hiện chưa có thực thể hay cột nào giữ mốc năm và số đếm này nên phần mapping để trống. Prototype không đếm và không chặn lần thứ 5.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Cho người lập biết còn được tạo phiên bản mấy lần trong năm trước khi bấm gửi.
  Thành phần hiển thị: Nhãn Hạn mức năm nay; một ô chữ chỉ đọc mang giá trị 3 / 4 lần đã dùng; dòng gợi ý nói hết 4 trên 4 thì form không cho gửi kèm lý do GOV-RULE-01.
  Chức năng và logic: Chỉ đọc; không nhận nhập. Hết hạn mức thì cả biểu mẫu tắt tại màn; không để người lập gửi rồi mới nhận lỗi.
- qa:
  - Mốc năm của hạn mức là năm dương lịch hay năm tài chính Nhật?
  - Rollback có bị tính là một lần đổi trong hạn mức không?
- bbox: startX 532 · startY 415 · endX 1010 · endY 510

### Item 3.3: Ô nhập Nội dung biểu suất

- nameJP: 料率内容
- nameTrans: Rate table input
- itemType: text_form
- itemSubtype: ô nhập bắt buộc
- buttonType: -
- dataType: string
- format: none
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: rate_table
- databaseNote: Nội dung biểu suất của phiên bản. Prototype có cột này nhưng biểu mẫu không có ô nào cho nó; giá trị được server ghi cứng và engine tính thưởng không đọc lại.
- validationNote:
  Điều kiện: nội dung biểu suất không được để trống.
  Lỗi: nút Tạo bản nháp giữ trạng thái vô hiệu cho tới khi có giá trị.
- description:
  Mục đích và ngữ cảnh: Đây là chỗ NFR-OPS-02 đòi đổi biểu suất bằng cấu hình: tham số nào được phiên bản hoá thì phải nhập được ở đây chứ không nằm trong mã nguồn.
  Thành phần hiển thị: Nhãn Nội dung biểu suất kèm dấu bắt buộc; ô nhập ghi hệ số 110/100 cố định theo BR-INC-01 và một chỗ trống cho tỷ lệ chi trả kèm chú thích xem [CHƯA CHỐT].
  Chức năng và logic: Hệ số 110/100 do khách cố định nên không phải tham số người dùng đổi. Phần tham số thật sự được phiên bản hoá còn chờ khách chốt nên hình dạng ô nhập chưa khoá được.
- qa:
  - Tham số nào của công thức được phiên bản hoá; và hệ số 110/100 có nằm trong đó không?
  - Sau khi khách chốt; ô này là một chuỗi tự do; một số duy nhất; hay một bảng nhiều dòng theo bậc?
  - Nội dung biểu suất có cần kiểm hợp lệ theo miền giá trị trước khi cho gửi không?
- bbox: startX 42 · startY 520 · endX 1010 · endY 588

### Item 3.4: Ô nhập Lý do thay đổi

- nameJP: 変更理由
- nameTrans: Change reason textarea
- itemType: textarea
- itemSubtype: ô nhập nhiều dòng bắt buộc
- buttonType: -
- dataType: string
- format: none
- required: true
- minLength: -
- maxLength: 1000
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế coi lý do là dữ liệu bắt buộc của dấu vết kiểm toán cho thao tác tạo. Prototype lưu chuỗi này vào phần mô tả của nội dung biểu suất và coi là ghi chú tuỳ chọn; chưa có chỗ lưu riêng cho lý do nên phần mapping để trống.
- validationNote:
  Điều kiện: lý do thay đổi không được để trống.
  Lỗi: nút Tạo bản nháp giữ trạng thái vô hiệu cho tới khi có giá trị.
- description:
  Mục đích và ngữ cảnh: Ghi lý do đổi biểu suất; FR-AUDIT-01 đòi dấu vết kiểm toán của thao tác tạo phải có lý do.
  Thành phần hiển thị: Nhãn Lý do thay đổi kèm dấu bắt buộc; ô nhập nhiều dòng mang câu mẫu Điều chỉnh theo thoả thuận quý IV với Chủ đầu tư.
  Chức năng và logic: Là dữ liệu bắt buộc chứ không phải ghi chú tuỳ chọn. Lý do đi kèm dòng dấu vết kiểm toán của thao tác tạo phiên bản.
- qa:
  - Độ dài tối thiểu của lý do là bao nhiêu để tránh người dùng nhập một ký tự cho qua?
  - Lý do có hiện lại cho người duyệt đọc ở khung phê duyệt không?
- bbox: startX 42 · startY 599 · endX 1010 · endY 694

### Item 3.5: Nút Tạo bản nháp

- nameJP: 下書き作成ボタン
- nameTrans: Create draft button
- itemType: button
- itemSubtype: nút chính
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Tạo xong thì về SC-23 danh sách phiên bản; dòng mới ở trạng thái chờ duyệt.
- databaseTable: incentive_rule_version
- databaseColumn: -
- databaseNote: Ghi một dòng phiên bản mới ở trạng thái chờ duyệt. Prototype có bảng này và ghi đúng trạng thái khởi tạo; nhưng không ghi dòng dấu vết kiểm toán cho thao tác tạo.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Gửi bản nháp phiên bản biểu suất để người khác phê duyệt.
  Thành phần hiển thị: Một nút chữ nhấn mạnh đặt dưới ô nhập lý do.
  Chức năng và logic: Chỉ bật khi đã đủ ngày hiệu lực; nội dung biểu suất và lý do. Hệ thống tự đặt số phiên bản; trạng thái khởi tạo chờ duyệt và người lập; người lập không nhập được ba giá trị đó.
- qa:
  - Sau khi tạo xong thì về danh sách SC-23; hay mở luôn chi tiết phiên bản vừa tạo?
  - Hai người lập tạo cùng lúc dẫn tới trùng số phiên bản thì thông báo cho người thứ hai như thế nào?
- bbox: startX 42 · startY 707 · endX 140 · endY 736

### Item 3.6: Nút Tạo bản nháp ở trạng thái vô hiệu

- nameJP: 下書き作成ボタン(無効)
- nameTrans: Create draft button disabled
- itemType: button
- itemSubtype: nút ở trạng thái vô hiệu
- buttonType: text_only
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
  Mục đích và ngữ cảnh: Biến thể vô hiệu của nút tạo; vẽ để nói rõ điều kiện bật nút chứ không phải một nút thứ hai trên màn thật.
  Thành phần hiển thị: Một nút chữ mờ kèm chú thích trong nhãn về ba điều kiện còn thiếu.
  Chức năng và logic: Nút tắt khi thiếu bất kỳ một trong ba field bắt buộc; hoặc khi đã dùng hết hạn mức 4 lần trong năm.
- qa: -
- bbox: startX 143 · startY 707 · endX 473 · endY 736

### Item 3.7: Ghi chú field server tự đặt

- nameJP: サーバー自動設定の注記
- nameTrans: Server-assigned fields note
- itemType: label
- itemSubtype: ghi chú khối
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
  Mục đích và ngữ cảnh: Vạch rõ đâu là giá trị client gửi và đâu là giá trị server tự quyết; để không ai mở ba giá trị đó ra cho client.
  Thành phần hiển thị: Một đoạn ghi chú dưới hàng nút: hệ thống tự đặt số phiên bản; trạng thái khởi tạo chờ duyệt và người lập; bản nháp không chi phối cách tính ở SC-22 cho tới khi được phê duyệt và tới ngày hiệu lực.
  Chức năng và logic: Thuần hiển thị. Ba giá trị server tự đặt là chốt an toàn: nhận số phiên bản hay người lập từ client là mở đường lách cổng maker-checker.
- qa: -
- bbox: startX 42 · startY 745 · endX 1010 · endY 762

### Item 4: Khung phê duyệt và rollback — vai người duyệt

- nameJP: 承認・ロールバックブロック
- nameTrans: Approve and rollback block
- itemType: others
- itemSubtype: khối chi tiết và thao tác
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
  Mục đích và ngữ cảnh: Nơi người duyệt đọc nội dung phiên bản rồi phê duyệt; hoặc rollback phiên bản đang hiệu lực về một phiên bản trước.
  Thành phần hiển thị: Tiêu đề khung; hai hàng field chỉ đọc gồm sáu ô; nút Phê duyệt; ô chọn phiên bản đích để rollback; nút Rollback và một ghi chú về điều kiện hiện nút.
  Chức năng và logic: Hai thao tác ghi khác nhau; mỗi thao tác chỉ hiện ở đúng một trạng thái. Cả hai đều ghi dấu vết kiểm toán kèm lý do và cả hai đều chịu ràng buộc người duyệt khác người lập.
- qa: -
- bbox: startX 26 · startY 801 · endX 1026 · endY 1214
