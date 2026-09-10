# Items Analysis - Tra cứu audit log

- Nguồn: `.momorph/shots/SC-30-tra-cuu-audit-log.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-30-tra-cuu-audit-log-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2147 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 43
- Batch: part 2 / 3

### Item 4: Khối kết quả tra cứu

- itemId: img-016
- parentNo: -
- bbox: (26, 677) - (1026, 926)
- nameJP: -
- nameTrans: Result block
- itemType: others
- itemSubtype: khối bảng bảy cột kèm ghi chú và ba nút
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
  - Mục đích và ngữ cảnh: Nơi trả lời câu hỏi của người điều tra; khối này chạm dữ liệu nhạy nên chỉ vẽ khung và nhãn.
  - Thành phần hiển thị: Tiêu đề khối nêu phạm vi field số 7 tới số 11 và nói rõ chỉ vẽ khung và nhãn; bảng bảy cột với hai hàng mẫu ở hai ca khác nhau; một đoạn ghi chú; ba nút phân trang và xuất.
  - Chức năng và logic: Chỉ đọc; không có form ghi nào trên màn. Phân trang thực hiện phía server.
- qa: -

### Item 4.1: Bảng kết quả audit

- itemId: img-017
- parentNo: 4
- bbox: (42, 721) - (1010, 818)
- nameJP: 監査ログ一覧
- nameTrans: Audit result table
- itemType: table
- itemSubtype: bảng bảy cột chỉ đọc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: audit_log
- databaseColumn: created_at; action; entity; entity_id; actor_id; reason; before; after
- databaseNote: Bảng audit đã tồn tại với đủ tám cột trên và đang được ghi thật ở nhiều điểm gọi khắp hệ. Riêng cột ngày nghiệp vụ thì CHƯA TỒN TẠI nên cột thứ hai của bảng hiện chưa có nguồn.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Trình bày từng bản ghi audit trên một hàng, đủ để truy được bốn thứ mà điều kiện nghiệm thu của phía ghi đòi.
  - Thành phần hiển thị: Bảy cột: thời điểm · ngày nghiệp vụ · thao tác · thực thể và mã · người thực hiện · lý do · trước và sau; hai hàng mẫu chỉ chứa nhãn dạng chứ không chứa dữ liệu thật.
  - Chức năng và logic: Sắp xếp mặc định theo thời điểm giảm dần. Bảng chỉ tăng theo thời gian nên phân trang là bắt buộc từ đầu, không tải hết rồi lọc ở giao diện.
- qa:
  - Bảng phân trang bao nhiêu dòng một trang và trần kết quả là bao nhiêu?
  - Có cho đổi cách sắp xếp theo cột không; nếu có thì cột nào?
  - Hai hàng mẫu cố ý không chứa dữ liệu thật; bản dựng có cần chế độ che dữ liệu cho môi trường trình diễn không?

### Item 4.1.1: Hàng tiêu đề bảng kết quả

- itemId: img-018
- parentNo: 4.1
- bbox: (43, 721) - (1010, 749)
- nameJP: -
- nameTrans: Result table header row
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
  - Mục đích và ngữ cảnh: Đặt tên bảy cột của bảng kết quả.
  - Thành phần hiển thị: Một hàng nền xám nhạt với bảy nhãn: Thời điểm · Ngày nghiệp vụ · Thao tác · Thực thể và ID · Người thực hiện · Lý do · Trước và Sau.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 4.1.2: Hàng bản ghi có người thực hiện — đại diện

- itemId: img-019
- parentNo: 4.1
- bbox: (43, 749) - (1010, 789)
- nameJP: -
- nameTrans: Audit row with actor (representative)
- itemType: others
- itemSubtype: hàng dữ liệu bảng
- buttonType: -
- dataType: -
- format: YYYY-MM-DD hh:mm
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: audit_log
- databaseColumn: created_at; action; entity; entity_id; actor_id; reason
- databaseNote: Sáu cột này đã tồn tại thật. Ô ngày nghiệp vụ trên hàng thì CHƯA TỒN TẠI cột tương ứng.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca thông thường: một thao tác do một người dùng nội bộ thực hiện, có lý do và có nội dung trước sau.
  - Thành phần hiển thị: Bảy ô mang nhãn dạng: thời điểm dạng YYYY-MM-DD hh:mm · ngày nghiệp vụ dạng YYYY-MM-DD · nhãn thao tác · nhãn thực thể kèm mã · tên hiển thị người thực hiện · nhãn lý do có thể rỗng · một nút mở panel so sánh.
  - Chức năng và logic: Chỉ đọc. Nội dung trước và sau không hiện thô trên bảng vì là dữ liệu tự do; chỉ mở trong panel so sánh.
- qa:
  - Lý do rỗng thì hiện dấu gạch hay để ô trống?
  - Tên hiển thị của người thực hiện dài quá thì cắt bớt hay xuống dòng?

### Item 4.1.3: Nút Mở panel so sánh trước và sau

- itemId: img-020
- parentNo: 4.1
- bbox: (869, 754) - (965, 783)
- nameJP: 差分パネルを開く
- nameTrans: Open diff panel button
- itemType: button
- itemSubtype: nút phụ trong hàng
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Mở panel so sánh nội dung trước và sau của đúng bản ghi đó.
- databaseTable: audit_log
- databaseColumn: before; after
- databaseNote: Hai cột đã tồn tại thật và cho phép rỗng; panel so sánh đã được dựng ở hai màn chi tiết khác nên dùng lại được.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đường duy nhất xem nội dung trước và sau; tách khỏi bảng vì dữ liệu này tự do và có thể rất dài.
  - Thành phần hiển thị: Nút chữ Mở panel diff ở ô cuối hàng; kiểu nút phụ.
  - Chức năng và logic: Chỉ đọc. Cả hai giá trị trước và sau rỗng là ca hợp lệ nên panel phải chịu được ca đó mà không lỗi.
- qa:
  - Panel so sánh có giới hạn độ dài nội dung hiển thị không?
  - Nội dung trước và sau có cần che một số trường nhạy trước khi hiện không; nếu có thì trường nào?
  - Định dạng trình bày nội dung so sánh là gì; ảnh chỉ vẽ nút nên chưa suy ra được.

### Item 4.1.4: Hàng bản ghi không có người thực hiện

- itemId: img-021
- parentNo: 4.1
- bbox: (43, 789) - (1010, 817)
- nameJP: -
- nameTrans: Audit row without actor
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
- databaseTable: audit_log
- databaseColumn: actor_id; before; after; reason
- databaseNote: Ba cột trước sau và lý do cho phép rỗng, và cột người thực hiện cũng cho phép rỗng — nên ca này là ca hợp lệ của bảng đã tồn tại chứ không phải dữ liệu lỗi.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca biên bắt buộc phải xử lý: bản ghi do hệ thống ghi, không có chủ thể và không có nội dung trước sau.
  - Thành phần hiển thị: Bảy ô: thời điểm · dấu gạch ở ô ngày nghiệp vụ · nhãn thao tác · nhãn thực thể kèm mã · chữ hệ thống ở ô người thực hiện · dấu gạch ở ô lý do · chữ ghi rõ cả hai giá trị trước và sau đều rỗng.
  - Chức năng và logic: Người thực hiện rỗng thì hiện chữ hệ thống chứ không để ô trống, vì có đường ghi xảy ra trước khi có phiên đăng nhập. Người thực hiện đã bị vô hiệu thì dòng vẫn hiện, không ẩn dòng.
- qa:
  - Chữ hiện thay cho người thực hiện rỗng là hệ thống; có cần phân biệt các nguồn hệ thống khác nhau không?
  - Dòng không có nội dung trước sau thì nút mở panel so sánh ẩn đi hay hiện ở trạng thái vô hiệu?

### Item 4.2: Ghi chú bốn thứ nghiệm thu và các ca rỗng

- itemId: img-022
- parentNo: 4
- bbox: (42, 821) - (1010, 871)
- nameJP: -
- nameTrans: Acceptance and empty-case note
- itemType: label
- itemSubtype: đoạn nhắc dưới khối
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
  - Mục đích và ngữ cảnh: Nối cột của bảng về đúng điều kiện nghiệm thu của phía ghi, và liệt các ca rỗng mà bản dựng phải chịu được.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: các cột thời điểm · người thực hiện · trước và sau · lý do là đúng bốn thứ mà điều kiện nghiệm thu của FR-AUDIT-01 đòi truy được; người thực hiện rỗng hiện chữ hệ thống; người thực hiện đã vô hiệu thì dòng vẫn hiện; nội dung trước sau là dữ liệu tự do nên không hiện thô trên bảng mà dùng lại panel so sánh đã dựng; cả hai rỗng là hợp lệ nên panel không được lỗi.
  - Chức năng và logic: Tĩnh; là bảng kiểm cho phần dựng bảng kết quả.
- qa: -

### Item 4.3: Nút Trang trước

- itemId: img-023
- parentNo: 4
- bbox: (42, 881) - (128, 910)
- nameJP: 前のページ
- nameTrans: Previous page button
- itemType: button
- itemSubtype: nút phân trang
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Nạp trang kết quả trước đó, giữ nguyên điều kiện đang lọc.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Một nửa của cặp phân trang; phân trang là bắt buộc vì bảng audit chỉ tăng.
  - Thành phần hiển thị: Nút chữ Trang trước ở đầu hàng nút dưới bảng kết quả; kiểu nút phụ.
  - Chức năng và logic: Vô hiệu khi đang ở trang đầu. Phân trang thực hiện phía server, không phải cắt ở giao diện.
- qa:
  - Ở trang đầu thì nút ẩn đi hay hiện ở trạng thái vô hiệu?
  - Có cần ô nhảy tới trang bất kỳ không; hay chỉ trước và sau?

### Item 4.4: Nút Trang sau

- itemId: img-024
- parentNo: 4
- bbox: (132, 881) - (208, 910)
- nameJP: 次のページ
- nameTrans: Next page button
- itemType: button
- itemSubtype: nút phân trang
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Nạp trang kết quả tiếp theo, giữ nguyên điều kiện đang lọc.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Nửa còn lại của cặp phân trang.
  - Thành phần hiển thị: Nút chữ Trang sau cạnh nút Trang trước; kiểu nút phụ.
  - Chức năng và logic: Vô hiệu khi đã ở trang cuối hoặc khi kết quả đã đạt trần.
- qa:
  - Kết quả vượt trần thì nút này vô hiệu và hiện lời nhắc thu hẹp điều kiện chứ không cho đi tiếp?

### Item 4.5: Nút Xuất CSV ở trạng thái vô hiệu

- itemId: img-025
- parentNo: 4
- bbox: (212, 881) - (450, 910)
- nameJP: CSV出力（無効）
- nameTrans: Export CSV disabled
- itemType: button
- itemSubtype: nút vô hiệu kèm nhãn giải thích
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
  - Mục đích và ngữ cảnh: Khai một quyết định phạm vi ngay trên giao diện: không mở đường mang dữ liệu audit ra ngoài hệ thống ở vòng đầu.
  - Thành phần hiển thị: Nút chữ Xuất CSV kèm ngay trong nhãn dòng chữ không đề xuất cho vòng đầu; chữ và viền nhạt hơn.
  - Chức năng và logic: Không nhận thao tác. Lý do là FR-AUDIT-02 chỉ đòi tìm kiếm, và phạm vi xuất dữ liệu của yêu cầu khách khoanh vào catalog báo cáo mà audit không thuộc catalog đó.
- qa:
  - Nút này giữ ở trạng thái vô hiệu hay bỏ hẳn khỏi giao diện vòng đầu?
  - Nếu khách yêu cầu xuất thì cần thêm kiểm soát gì trước khi mở đường đó?

### Item 5: Khối hiệu năng

- itemId: img-026
- parentNo: -
- bbox: (26, 939) - (1026, 1105)
- nameJP: -
- nameTrans: Performance block
- itemType: others
- itemSubtype: khối ba ô chỉ đọc
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
  - Mục đích và ngữ cảnh: Đưa ngưỡng NFR-PERF-01 vào thân màn thay vì để nó thành chuyện hạ tầng ở cuối tài liệu.
  - Thành phần hiển thị: Tiêu đề khối nêu ngưỡng p95 không vượt hai giây là một yêu cầu của màn; ba ô chỉ đọc là phân trang phía server, mỗi tiêu chí một cột lọc được, và kịch bản tìm kiếm tiêu chuẩn.
  - Chức năng và logic: Chỉ đọc; ba ô là ba ràng buộc thiết kế, không phải ô nhập.
- qa: -

### Item 5.1: Ô Phân trang phía server

- itemId: img-027
- parentNo: 5
- bbox: (42, 984) - (357, 1079)
- nameJP: サーバー側ページング
- nameTrans: Server-side pagination
- itemType: label
- itemSubtype: ô chỉ đọc kèm nhãn và dòng nhắc
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
- databaseNote: Bảng audit đã tồn tại và là bảng chỉ-thêm nên số dòng chỉ tăng theo thời gian; số dòng nhỏ ở môi trường hiện tại không nói gì về một năm vận hành.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ràng buộc thứ nhất của ngưỡng thời gian phản hồi: không bao giờ tải hết rồi lọc ở giao diện.
  - Thành phần hiển thị: Nhãn Phân trang phía server; ô chỉ đọc nền xám ghi số dòng mỗi trang và trần kết quả; dòng nhắc nói rõ phân trang từ đầu và bảng audit chỉ tăng chứ không giảm.
  - Chức năng và logic: Số dòng mỗi trang và trần kết quả là hai con số chưa có nguồn nên phải chốt với khách.
- qa:
  - Số dòng mỗi trang và trần kết quả là bao nhiêu; yêu cầu khách không cho con số nào nên cần khách chốt?
  - Vượt trần thì chặn hẳn hay vẫn cho xem trang đầu kèm lời nhắc thu hẹp?

### Item 5.2: Ô Mỗi tiêu chí một cột lọc được

- itemId: img-028
- parentNo: 5
- bbox: (368, 984) - (684, 1079)
- nameJP: 各条件に索引可能な列
- nameTrans: One filterable column per criterion
- itemType: label
- itemSubtype: ô chỉ đọc kèm nhãn và dòng nhắc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: audit_log
- databaseColumn: -
- databaseNote: Bảng audit đã tồn tại nhưng hiện KHÔNG có index nào ngoài khoá chính, nên mọi bộ lọc đều quét toàn bảng. Đây là rào riêng, độc lập với việc thiếu cột ngày nghiệp vụ và cột người tham gia.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ràng buộc thứ hai, và là chỗ ngưỡng thời gian phản hồi gặp hiện trạng dữ liệu.
  - Thành phần hiển thị: Nhãn Mỗi tiêu chí một cột lọc được; ô chỉ đọc nền xám ghi bốn tiêu chí thành bốn đường lọc có index; dòng nhắc nói rõ tiêu chí không có cột thì phải lọc bằng nối bảng hoặc quét bảng, và cả hai đều không đạt ngưỡng khi bảng lớn.
  - Chức năng và logic: Đây là ràng buộc độc lập với việc có đủ bốn cột: có đủ cột mà không có index thì vẫn không đạt ngưỡng.
- qa:
  - Bốn tiêu chí có cần đạt ngưỡng khi dùng riêng lẻ, hay chỉ khi kết hợp đủ để thu hẹp kết quả?

### Item 5.3: Ô Kịch bản tìm kiếm tiêu chuẩn

- itemId: img-029
- parentNo: 5
- bbox: (695, 984) - (1010, 1079)
- nameJP: 標準検索シナリオ
- nameTrans: Standard search scenario
- itemType: label
- itemSubtype: ô chỉ đọc kèm nhãn và dòng nhắc
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
  - Mục đích và ngữ cảnh: Ràng buộc thứ ba: ngưỡng chỉ nghiệm thu được nếu định nghĩa được kịch bản đo.
  - Thành phần hiển thị: Nhãn Kịch bản tìm kiếm tiêu chuẩn; ô chỉ đọc nền xám ghi phải chốt để load test; dòng nhắc nói rõ nghiệm thu là báo cáo load test nên kịch bản tiêu chuẩn và tải thiết kế baseline phải là con số chốt với khách.
  - Chức năng và logic: Không chốt được hai thứ này thì ngưỡng p95 không có cách nào nghiệm thu.
- qa:
  - Kịch bản tìm kiếm tiêu chuẩn gồm những truy vấn nào và tải thiết kế baseline là bao nhiêu bản ghi?
  - Ngưỡng đo trên môi trường nào; môi trường trình diễn hay môi trường tương đương sản xuất?

### Item 6: Khối trạng thái màn

- itemId: img-030
- parentNo: -
- bbox: (26, 1118) - (1026, 1356)
- nameJP: -
- nameTrans: Screen state block
- itemType: others
- itemSubtype: khối bảy thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Liệt kê mọi trạng thái màn phải xử lý, trong đó hai thẻ nói rõ trạng thái nào KHÔNG áp dụng.
  - Thành phần hiển thị: Tiêu đề khối; bảy thẻ xếp thành hai hàng, mỗi thẻ có một tiêu đề nhỏ và một đoạn mô tả.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

