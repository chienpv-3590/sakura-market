# Items Analysis - Quản lý batch xuất dữ liệu kế toán

- Nguồn: `.momorph/shots/SC-27-quan-ly-batch-xuat-du-lieu-ke-toan.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-27-quan-ly-batch-xuat-du-lieu-ke-toan-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 1797 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 39
- Batch: part 2 / 3

### Item 4.5: Ô chọn Người tham gia

- itemId: img-016
- parentNo: 4
- bbox: (368, 660) - (684, 739)
- nameJP: 参加者
- nameTrans: Participant filter
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả người tham gia
- userAction: on_click
- transitionNote: -
- databaseTable: accounting_export_batch
- databaseColumn: lines
- databaseNote: Mã người tham gia của từng dòng nằm trong bản chụp dòng của batch; batch không có cột người tham gia riêng vì một batch gộp nhiều người tham gia.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Lọc theo người tham gia — trường tối thiểu số 2 của yêu cầu khách; dùng khi kế toán đối chiếu số của một đối tác.
  - Thành phần hiển thị: Nhãn Người tham gia; ô chọn hiện Tất cả người tham gia kèm mũi chỉ xuống; dòng nhắc ghi rõ đây là trường tối thiểu số 2 và nhãn chỉ hiện tên hiển thị chứ không hiện thư điện tử.
  - Chức năng và logic: Danh sách chọn chỉ hiện tên hiển thị của người tham gia; địa chỉ thư điện tử không bao giờ ra giao diện màn này.
- qa:
  - Chọn được nhiều người tham gia cùng lúc hay chỉ một?
  - Danh sách chọn lấy toàn bộ người tham gia hay chỉ những người có mặt trong khoảng ngày đang lọc?
  - Định dạng nhãn hiển thị của một người tham gia là gì; ảnh chỉ cho thấy dòng mặc định nên chưa suy ra được mẫu nhãn.

### Item 4.6: Nút Tra cứu

- itemId: img-017
- parentNo: 4
- bbox: (695, 680) - (759, 709)
- nameJP: 照会
- nameTrans: Search button
- itemType: button
- itemSubtype: nút hành động chính trong hàng
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Nạp lại khối danh sách batch theo các điều kiện đang đặt; ở lại cùng màn và không điều hướng.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Kích hoạt tra cứu; là hành động duy nhất làm đổi nội dung khối danh sách.
  - Thành phần hiển thị: Nút chữ Tra cứu đặt ở đầu ô hành động cuối hàng thứ hai của khối bộ lọc.
  - Chức năng và logic: Không đổi dữ liệu; chỉ đọc. Trong lúc tra cứu thì khối danh sách vào trạng thái đang tải và bộ lọc bị vô hiệu.
- qa:
  - Bấm Tra cứu khi khoảng ngày đang sai thì chặn ngay hay vẫn gửi rồi để server từ chối?
  - Điều kiện tra cứu có được giữ lại trên đường dẫn để chia sẻ lại kết quả không?

### Item 4.7: Nút Xoá điều kiện

- itemId: img-018
- parentNo: 4
- bbox: (763, 680) - (860, 709)
- nameJP: 条件クリア
- nameTrans: Clear filter button
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
- transitionNote: Trả mọi điều kiện về giá trị mặc định và nạp lại danh sách không lọc.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng thoát khỏi một bộ điều kiện đã lọc quá hẹp mà không phải sửa từng ô.
  - Thành phần hiển thị: Nút chữ Xoá điều kiện đặt cạnh nút Tra cứu; kiểu nút phụ nhạt hơn.
  - Chức năng và logic: Đặt hai ô ngày và ô batch code về rỗng; hai ô chọn về giá trị Tất cả; sau đó tự tra cứu lại.
- qa:
  - Xoá điều kiện có tự tra cứu lại ngay hay chỉ xoá rồi chờ người dùng bấm Tra cứu?

### Item 5: Khối danh sách batch xuyên ngày

- itemId: img-019
- parentNo: -
- bbox: (26, 778) - (1026, 993)
- nameJP: -
- nameTrans: Cross-day batch list block
- itemType: others
- itemSubtype: khối bảng chín cột kèm ghi chú
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
  - Mục đích và ngữ cảnh: Nơi người dùng thấy toàn bộ lần bàn giao đã thực hiện và biết lần nào đã thực sự tới bên nhận.
  - Thành phần hiển thị: Tiêu đề khối; bảng chín cột với hai hàng dữ liệu mẫu; một đoạn ghi chú cuối khối về tính chỉ-thêm của batch.
  - Chức năng và logic: Danh sách chỉ đọc; hai hành động trên từng hàng là xem dòng đã bàn giao và gửi lại. Không có đường sửa hay xoá batch.
- qa: -

### Item 5.1: Bảng danh sách batch

- itemId: img-020
- parentNo: 5
- bbox: (42, 822) - (1010, 930)
- nameJP: バッチ一覧
- nameTrans: Batch list table
- itemType: table
- itemSubtype: bảng chín cột chỉ đọc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: accounting_export_batch
- databaseColumn: batch_code; business_date; row_count; total_net_amount_jpy; total_tax_jpy; exported_at; exported_by
- databaseNote: Bảng đã tồn tại với đủ các cột trên; exported_by trỏ tới bảng người dùng và chỉ lấy tên hiển thị. Cột Trạng thái ở mức batch thì CHƯA TỒN TẠI.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Trình bày từng lần bàn giao trên một hàng, đủ để đối chiếu số với kế toán mà không phải mở chi tiết.
  - Thành phần hiển thị: Chín cột: batch code · ngày nghiệp vụ · trạng thái · số dòng · tổng tiền JPY · tổng thuế JPY · thời điểm tạo · người khởi tạo · ô hành động; hai hàng dữ liệu mẫu cùng một ngày nghiệp vụ.
  - Chức năng và logic: Sắp xếp mặc định theo thời điểm tạo giảm dần nên batch mới nhất nằm trên. Batch có 0 dòng vẫn phải hiện; xuất lại cùng một ngày sinh batch mới và batch cũ không bị lọc bớt.
- qa:
  - Bảng phân trang bao nhiêu dòng một trang và có cho đổi cách sắp xếp theo cột không?
  - Một ngày có nhiều batch thì có gom nhóm theo ngày hay để phẳng theo thời điểm tạo?

### Item 5.1.1: Hàng tiêu đề bảng batch

- itemId: img-021
- parentNo: 5.1
- bbox: (43, 823) - (1010, 850)
- nameJP: -
- nameTrans: Batch table header row
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
  - Mục đích và ngữ cảnh: Đặt tên chín cột của bảng danh sách.
  - Thành phần hiển thị: Một hàng nền xám nhạt với tám nhãn cột và một ô cuối để trống dành cho các nút hành động.
  - Chức năng và logic: Tĩnh; không sắp xếp được từ hàng tiêu đề.
- qa: -

### Item 5.1.2: Hàng dữ liệu một batch — đại diện

- itemId: img-022
- parentNo: 5.1
- bbox: (43, 850) - (1010, 890)
- nameJP: -
- nameTrans: Batch data row (representative)
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
- databaseTable: accounting_export_batch
- databaseColumn: batch_code; business_date; row_count; total_net_amount_jpy; total_tax_jpy; exported_at; exported_by
- databaseNote: Bảy cột trên đã tồn tại thật. Ô Trạng thái trên hàng chưa có cột tương ứng ở mức batch: CHƯA TỒN TẠI; hiện chỉ suy được từ bản chụp dòng.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Một hàng là một lần bàn giao; hai hàng mẫu có cùng cấu trúc nên gộp thành một đại diện.
  - Thành phần hiển thị: Tám ô giá trị: batch code BATCH-0002 · ngày nghiệp vụ 2026-09-08 · trạng thái Chờ · số dòng 42 · tổng tiền 6 180 400 · tổng thuế 494 432 · thời điểm tạo 2026-09-09 09:40 · người khởi tạo Người dùng A; ô cuối chứa hai nút hành động.
  - Chức năng và logic: Chỉ đọc; số tiền và số thuế hiện theo đơn vị JPY không có phần lẻ. Cột Trạng thái là trường tối thiểu số 5 nên không được để trống trên hàng.
- qa:
  - Người khởi tạo hiện tên rỗng thì hiện gì; có được rơi về địa chỉ thư điện tử nội bộ không?
  - Tổng tiền và tổng thuế có cần hiện kèm thuế suất đã đóng dấu lên batch để giải thích con số không?

### Item 5.1.3: Nút Xem dòng

- itemId: img-023
- parentNo: 5.1
- bbox: (848, 855) - (928, 884)
- nameJP: 明細を見る
- nameTrans: View lines button
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
- transitionNote: Mở đúng tập dòng đã bàn giao của batch đó; kèm cả sáu trường tối thiểu.
- databaseTable: accounting_export_batch
- databaseColumn: lines
- databaseNote: Tập dòng là bản chụp bất biến nằm ngay trên batch; đọc lại luôn ra đúng cái đã gửi kế toán chứ không tính lại từ dữ liệu hiện tại.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đường đi từ một lần bàn giao tới chính tập dòng đã gửi, để trả lời câu hỏi của kế toán về một con số cụ thể.
  - Thành phần hiển thị: Nút chữ Xem dòng ở ô hành động cuối hàng; kiểu nút phụ.
  - Chức năng và logic: Chỉ đọc; tập dòng là bản chụp đã đóng dấu tại thời điểm xuất nên không đổi theo dữ liệu hiện tại. Batch có 0 dòng vẫn mở được và hiện danh sách rỗng.
- qa:
  - Xem dòng mở ngay trong màn dạng lớp phủ hay điều hướng sang màn báo cáo?
  - Tập dòng có xuất lại được ra tệp không; nếu có thì tệp đó có phải đúng tệp đã bàn giao?

### Item 5.1.4: Nút Gửi lại

- itemId: img-024
- parentNo: 5.1
- bbox: (932, 855) - (992, 884)
- nameJP: 再送信
- nameTrans: Resend button
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
- transitionNote: Gửi lại batch đó tới hệ thống kế toán; hàng vào trạng thái đang gửi và nút bị vô hiệu cho tới khi có kết quả.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi trạng thái bàn giao · thời điểm gửi · lỗi gửi ở mức batch nhưng chưa có bảng hay cột nào giữ chúng.
- validationNote:
  - Điều kiện: chỉ bấm được khi batch đang ở trạng thái cho phép gửi lại.
  - Lỗi: "Batch này đang được gửi." khi có một lượt gửi khác đang chạy trên cùng batch.
  - Điều kiện: hai người bấm cùng lúc thì chỉ một bên thắng.
  - Lỗi: "Batch đã đổi trạng thái; hãy tải lại danh sách." cho bên thua.
- description:
  - Mục đích và ngữ cảnh: Đường xử lý khi một lần bàn giao chưa tới được bên nhận; đây là hành động ghi duy nhất của màn.
  - Thành phần hiển thị: Nút chữ Gửi lại ở ô hành động cuối hàng; đặt cạnh nút Xem dòng.
  - Chức năng và logic: Không tạo batch mới và không sửa nội dung batch; chỉ ghi lại kết quả của lượt gửi. Gửi lỗi thì giữ nguyên trạng thái cũ chứ không ghi thành đã xác nhận.
- qa:
  - Số lần gửi lại tối đa là bao nhiêu; con số retry ba lần của yêu cầu khách chỉ dành cho thông báo nên màn này chưa có căn cứ?
  - Bên nhận xử lý batch trùng ngày theo kiểu thay thế hay cộng dồn; nếu cộng dồn thì Gửi lại có cần một bước xác nhận riêng?
  - Gửi lại có bắt người dùng ghi lý do để lưu vết không?

### Item 5.1.5: Nút Gửi lại ở trạng thái vô hiệu

- itemId: img-025
- parentNo: 5.1
- bbox: (932, 895) - (992, 924)
- nameJP: 再送信（無効）
- nameTrans: Resend button disabled
- itemType: button
- itemSubtype: nút phụ vô hiệu trong hàng
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
- databaseNote: CHƯA TỒN TẠI: điều kiện bật hay tắt nút phụ thuộc trạng thái bàn giao ở mức batch mà cột đó chưa có.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng thấy vì sao một batch không gửi lại được mà không phải bấm thử rồi nhận lỗi.
  - Thành phần hiển thị: Cùng nút Gửi lại nhưng chữ và viền nhạt hơn; xuất hiện trên hàng batch thứ hai đang ở trạng thái Đã điều chỉnh.
  - Chức năng và logic: Không nhận thao tác. Trạng thái vô hiệu là kết quả của trạng thái batch chứ không của vai trò người dùng.
- qa:
  - Những trạng thái nào làm nút Gửi lại tắt; khi tắt thì có hiện dòng giải thích lý do không?

### Item 5.2: Ghi chú tính chỉ-thêm của khối danh sách

- itemId: img-026
- parentNo: 5
- bbox: (42, 933) - (1010, 966)
- nameJP: -
- nameTrans: Append-only note
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
  - Mục đích và ngữ cảnh: Khai bất biến quan trọng nhất của dữ liệu bàn giao: đã gửi ra ngoài tổ chức thì không sửa lại được.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: batch là chỉ-thêm nên không sửa không xoá; xuất lại cùng ngày sinh batch mới và danh sách phải hiện cả batch cũ; batch 0 dòng cũng hiện; Xem dòng mở đúng tập dòng kèm sáu trường tối thiểu; thuế suất và cơ sở thuế được đóng dấu lên từng batch.
  - Chức năng và logic: Tĩnh; giải thích vì sao bảng không có nút sửa hay xoá.
- qa: -

### Item 6: Khối trạng thái màn

- itemId: img-027
- parentNo: -
- bbox: (26, 1006) - (1026, 1259)
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
  - Mục đích và ngữ cảnh: Liệt kê mọi trạng thái mà màn phải xử lý, để phần dựng không bỏ sót trạng thái rỗng và trạng thái lỗi.
  - Thành phần hiển thị: Tiêu đề khối; bảy thẻ xếp thành hai hàng, mỗi thẻ có một tiêu đề nhỏ và một đoạn mô tả.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

### Item 6.1: Thẻ trạng thái Rỗng

- itemId: img-028
- parentNo: 6
- bbox: (42, 1050) - (277, 1142)
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
  - Mục đích và ngữ cảnh: Trạng thái người đọc gặp đầu tiên khi chưa ngày nào được xuất.
  - Thành phần hiển thị: Thẻ có tiêu đề Rỗng và câu hiển thị Chưa có batch nào khớp điều kiện.
  - Chức năng và logic: Rỗng là trạng thái hợp lệ chứ không phải lỗi; bộ lọc vẫn dùng được để đổi điều kiện.
- qa: -

### Item 6.2: Thẻ trạng thái Đang tải

- itemId: img-029
- parentNo: 6
- bbox: (286, 1050) - (522, 1142)
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
  - Mục đích và ngữ cảnh: Cho người dùng biết tra cứu đang chạy để không bấm Tra cứu nhiều lần.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang tải và mô tả skeleton bảng cùng bộ lọc bị vô hiệu.
  - Chức năng và logic: Bộ lọc bị vô hiệu trong lúc tải nên không có hai lượt tra cứu chồng nhau.
- qa: -

### Item 6.3: Thẻ trạng thái Lỗi tải

- itemId: img-030
- parentNo: 6
- bbox: (531, 1050) - (766, 1142)
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
  - Mục đích và ngữ cảnh: Phân biệt lỗi kỹ thuật với danh sách rỗng — hai cái này không được hiện giống nhau.
  - Thành phần hiển thị: Thẻ có tiêu đề Lỗi tải và mô tả khối lỗi kèm nút thử lại; không rơi về danh sách rỗng.
  - Chức năng và logic: Giữ nguyên điều kiện đang lọc khi thử lại.
- qa: -

