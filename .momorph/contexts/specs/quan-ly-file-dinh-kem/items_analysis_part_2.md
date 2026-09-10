# Items Analysis - Quản lý file đính kèm

- Nguồn: `.momorph/shots/SC-31-quan-ly-file-dinh-kem.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-31-quan-ly-file-dinh-kem-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2581 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 51
- Batch: part 2 / 4

### Item 4.3: Ô chọn Loại tài liệu

- itemId: img-016
- parentNo: 4
- bbox: (695, 613) - (1010, 709)
- nameJP: 書類種別
- nameTrans: Document type filter
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: bảng đính kèm đã có thật nhưng không có cột phân loại tài liệu nào, nên hiện không phân biệt được nhóm bảy năm với nhóm ba năm.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Field quan trọng nhất của màn: phân loại tài liệu là điều kiện để thi hành được policy lưu trữ.
  - Thành phần hiển thị: Nhãn Loại tài liệu; ô chọn hiện Tất cả kèm mũi chỉ xuống; dòng nhắc ghi field số 3 với tập giá trị lấy từ cột thứ nhất của bảng policy, do người đặt, và nói rõ không phán định tự động theo DR-IMAGE-01.
  - Chức năng và logic: Tập giá trị lấy từ bảng policy ở khối trên. Giá trị do người đặt và người xác nhận; không có đường suy tự động từ nội dung file.
- qa:
  - Tập giá trị loại tài liệu gồm những giá trị nào; yêu cầu khách chia ba nhóm nhưng không cho tập giá trị dữ liệu?
  - Ai được đặt và đổi loại tài liệu của một file đã tải lên?
  - Đổi loại tài liệu có làm đổi nhóm lưu trữ và hạn online của file đó không?
  - Định dạng giá trị gửi lên là chuỗi tiếng Việt hiển thị hay một mã cố định; ảnh chỉ cho thấy dòng Tất cả.

### Item 4.4: Ô chọn Nhóm lưu trữ

- itemId: img-017
- parentNo: 4
- bbox: (42, 719) - (357, 814)
- nameJP: 保管グループ
- nameTrans: Retention group filter
- itemType: dropdown
- itemSubtype: ô chọn một giá trị dẫn xuất kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: bảng đính kèm đã có thật nhưng không có cột phân loại tài liệu nào, nên hiện không phân biệt được nhóm bảy năm với nhóm ba năm. Nhóm lưu trữ là giá trị dẫn xuất từ loại tài liệu nên cũng chưa có nguồn.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng lọc thẳng theo nhóm bảy năm hay ba năm mà không phải nhớ loại tài liệu nào thuộc nhóm nào.
  - Thành phần hiển thị: Nhãn Nhóm lưu trữ; ô chọn hiện Tất cả kèm hai giá trị bảy năm và ba năm; dòng nhắc ghi field số 4 là dẫn xuất từ field số 3 theo bảng policy và nói rõ không nhập tay để hai giá trị không lệch nhau.
  - Chức năng và logic: Là giá trị dẫn xuất, không có ô nhập riêng ở phía ghi. Đây là cách chặn rủi ro hai nguồn chân lý giữa loại tài liệu và nhóm lưu trữ.
- qa:
  - Nhóm lưu trữ có bao giờ khác kết quả suy từ loại tài liệu không; nếu có thì lấy giá trị nào?
  - Định dạng nhãn hai nhóm là bảy năm và ba năm, hay dùng mã nội bộ; ảnh cho thấy nhãn tiếng Việt.

### Item 4.5: Ô chọn Lô hàng

- itemId: img-018
- parentNo: 4
- bbox: (368, 719) - (684, 814)
- nameJP: ロット
- nameTrans: Lot filter
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: LOT-NNNN theo mẫu hiển thị LOT-0001
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: -
- databaseTable: lot_attachment
- databaseColumn: lot_id
- databaseNote: Cột khoá ngoại tới lô hàng đã tồn tại thật. Sắc thái: mọi chứng từ hiện đều buộc phải gắn một lô hàng, nên chứng từ không thuộc lô nào thì chưa có chỗ lưu.
- validationNote:
  - Điều kiện: mã lô không tồn tại thì trả danh sách rỗng.
  - Lỗi: không trả lỗi 4xx cho mã lô lạ.
- description:
  - Mục đích và ngữ cảnh: Đường tra khi người dùng đã biết chứng từ mình cần thuộc lô hàng nào.
  - Thành phần hiển thị: Nhãn Lô hàng; ô chọn hiện mẫu LOT-0001 kèm mũi chỉ xuống; dòng nhắc ghi field số 5 và nói rõ mã không tồn tại thì trả danh sách rỗng.
  - Chức năng và logic: Mã lô lạ trả rỗng chứ không báo lỗi, cùng nguyên tắc với các ô tra mã khác của hệ.
- qa:
  - Chứng từ không gắn lô hàng nào — ví dụ bảng đối chiếu ngày — thì màn này quản thế nào?
  - Danh sách chọn lô hàng lấy toàn bộ lô hay chỉ lô có chứng từ?

### Item 4.6: Ô chọn Người tải lên

- itemId: img-019
- parentNo: 4
- bbox: (695, 719) - (1010, 814)
- nameJP: アップロード者
- nameTrans: Uploader filter
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: -
- databaseTable: lot_attachment
- databaseColumn: uploaded_by
- databaseNote: Cột đã tồn tại thật và trỏ tới bảng người dùng nội bộ; chỉ lấy tên hiển thị. Cột cho phép rỗng nên phía đọc phải chịu được ca rỗng.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Tiêu chí phụ; dùng khi cần truy lại ai đã nộp một chứng từ.
  - Thành phần hiển thị: Nhãn Người tải lên; ô chọn hiện Chọn kèm mũi chỉ xuống; dòng nhắc ghi field số 6 với ràng buộc hiện tên hiển thị và không hiện thư điện tử theo mục bảo vệ thông tin cá nhân, và rỗng thì hiện chữ không rõ chứ không ẩn dòng.
  - Chức năng và logic: Không hiện thư điện tử là ràng buộc bảo mật áp cho toàn màn. Người tải lên rỗng vẫn hiện dòng vì file vẫn là bằng chứng.
- qa:
  - Danh sách chọn có bao gồm tài khoản đã bị vô hiệu không?
  - Định dạng nhãn hiển thị một người tải lên là gì; ảnh chỉ cho thấy dòng mặc định.

### Item 4.7: Nút Tra cứu

- itemId: img-020
- parentNo: 4
- bbox: (42, 824) - (107, 853)
- nameJP: 照会
- nameTrans: Search button
- itemType: button
- itemSubtype: nút hành động chính cuối khối
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Nạp lại khối danh sách theo các điều kiện đang đặt; ở lại cùng màn.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Kích hoạt tra cứu; là hành động duy nhất làm đổi nội dung khối danh sách.
  - Thành phần hiển thị: Nút chữ Tra cứu ở đầu hàng nút cuối khối bộ lọc.
  - Chức năng và logic: Không đổi dữ liệu; chỉ đọc. Trong lúc tra cứu thì khối danh sách vào trạng thái đang tải.
- qa:
  - Bấm Tra cứu khi chưa đặt điều kiện nào thì trả toàn bộ hay yêu cầu tối thiểu một điều kiện?
  - Điều kiện tra cứu có được giữ lại trên đường dẫn để chia sẻ lại kết quả không; nếu có thì có rủi ro gì với dữ liệu nhạy?

### Item 4.8: Nút Xoá điều kiện

- itemId: img-021
- parentNo: 4
- bbox: (110, 824) - (207, 853)
- nameJP: 条件クリア
- nameTrans: Clear filter button
- itemType: button
- itemSubtype: nút phụ cuối khối
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Trả mọi điều kiện về giá trị mặc định.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng bắt đầu lại một câu hỏi mới mà không phải sửa từng ô.
  - Thành phần hiển thị: Nút chữ Xoá điều kiện cạnh nút Tra cứu; kiểu nút phụ.
  - Chức năng và logic: Đặt các ô ngày về rỗng và các ô chọn về giá trị Tất cả.
- qa:
  - Xoá điều kiện có tự tra cứu lại ngay hay chỉ xoá rồi chờ người dùng bấm Tra cứu?

### Item 4.9: Nút Chỉ hiện quá hạn online mà chưa chuyển tầng nguội

- itemId: img-022
- parentNo: 4
- bbox: (211, 824) - (470, 853)
- nameJP: オンライン期限切れのみ表示
- nameTrans: Overdue-only filter button
- itemType: button
- itemSubtype: nút lọc nhanh cuối khối
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Đặt bộ lọc về đúng nhóm file đã quá hạn online mà chưa được đánh dấu chuyển tầng nguội.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: không có cột tầng lưu trữ và không có mốc chuyển tầng nào trên bảng đính kèm đã có. Điều kiện lọc này cần cả hạn online dẫn xuất và tầng lưu trữ, nên hiện chưa có nguồn.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đường vào công việc thật của policy lưu trữ: gom đúng những file đang vi phạm hạn online.
  - Thành phần hiển thị: Nút chữ Chỉ hiện quá hạn online mà chưa chuyển cold ở cuối hàng nút; kiểu nút phụ.
  - Chức năng và logic: Là một bộ lọc dựng sẵn chứ không phải một hành động ghi. Không hiện được nhóm này thì policy lưu trữ chỉ là chữ trên giấy.
- qa:
  - Nút này là bộ lọc bật tắt hay một chế độ xem riêng?
  - Bật nút này có bỏ qua các điều kiện đang đặt hay cộng thêm vào chúng?

### Item 5: Khối danh sách file đính kèm

- itemId: img-023
- parentNo: -
- bbox: (26, 882) - (1026, 1176)
- nameJP: -
- nameTrans: Attachment list block
- itemType: others
- itemSubtype: khối bảng mười cột kèm ghi chú
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
  - Mục đích và ngữ cảnh: Nơi trả lời câu hỏi của người đối chiếu; khối chạm dữ liệu nhạy nên chỉ vẽ khung và nhãn.
  - Thành phần hiển thị: Tiêu đề khối nêu phạm vi field số 7 tới số 13 và nói rõ chỉ vẽ khung và nhãn; bảng mười cột với ba hàng mẫu ở ba trạng thái vòng đời khác nhau; một đoạn ghi chú.
  - Chức năng và logic: Danh sách chỉ đọc với ba hành động theo hàng tuỳ trạng thái. Phải phân trang từ đầu vì số file tăng theo số lô nhân số chứng từ mỗi lô.
- qa: -

### Item 5.1: Bảng danh sách file

- itemId: img-024
- parentNo: 5
- bbox: (42, 926) - (1010, 1113)
- nameJP: 添付ファイル一覧
- nameTrans: Attachment list table
- itemType: table
- itemSubtype: bảng mười cột chỉ đọc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot_attachment
- databaseColumn: file_name; mime_type; file_size; created_at; lot_id; uploaded_by
- databaseNote: Sáu cột này đã tồn tại thật trên bảng đính kèm, dung lượng có ràng buộc lớn hơn 0. Bảng cũng có một cột đường dẫn lưu trữ, nhưng cột đó CỐ Ý không ánh xạ ra bất kỳ cột giao diện nào và không ra bất kỳ bản xuất nào. Bốn cột loại tài liệu · nhóm lưu trữ · hết hạn online · tầng lưu trữ thì CHƯA TỒN TẠI.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Trình bày từng file trên một hàng, đủ để người đối chiếu biết trước file mở được ngay hay phải chờ phục hồi.
  - Thành phần hiển thị: Mười cột: tên file · loại tài liệu · nhóm lưu trữ · loại MIME · dung lượng · ngày tải lên · hết hạn lưu online · tầng lưu trữ · thời gian truy xuất · ô hành động; ba hàng mẫu chỉ chứa nhãn dạng.
  - Chức năng và logic: Bảng cố ý KHÔNG có cột nào cho đường dẫn lưu trữ của file. Cột hết hạn lưu online là giá trị dẫn xuất từ ngày tải lên cộng hạn của nhóm lưu trữ.
- qa:
  - Bảng phân trang bao nhiêu dòng một trang và có trần kết quả không?
  - Có cho đổi cách sắp xếp theo cột không; nếu có thì cột nào?
  - Định dạng hiển thị dung lượng là byte thuần hay quy đổi sang đơn vị đọc được?

### Item 5.1.1: Hàng tiêu đề bảng danh sách

- itemId: img-025
- parentNo: 5.1
- bbox: (43, 927) - (1010, 970)
- nameJP: -
- nameTrans: List table header row
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
  - Mục đích và ngữ cảnh: Đặt tên mười cột của bảng danh sách.
  - Thành phần hiển thị: Một hàng nền xám nhạt với chín nhãn cột và một ô cuối để trống dành cho các nút hành động.
  - Chức năng và logic: Tĩnh. Không có nhãn nào cho đường dẫn lưu trữ của file — đây là chủ đích, không phải thiếu sót.
- qa: -

### Item 5.1.2: Hàng file nhóm bảy năm còn online

- itemId: img-026
- parentNo: 5.1
- bbox: (43, 970) - (1010, 1017)
- nameJP: -
- nameTrans: Seven-year online file row
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
- databaseTable: lot_attachment
- databaseColumn: file_name; mime_type; file_size; created_at
- databaseNote: Bốn cột này đã tồn tại thật. Ba ô loại tài liệu · nhóm lưu trữ · hết hạn online và ô tầng lưu trữ thì CHƯA TỒN TẠI.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca thông thường: một chứng từ nghiệp vụ còn trong hạn online nên mở được ngay.
  - Thành phần hiển thị: Chín ô mang nhãn dạng: tên file · loại tài liệu phiếu tiếp nhận · nhóm lưu trữ bảy năm · loại MIME · dung lượng theo byte · ngày tải lên dạng YYYY-MM-DD hh:mm · hết hạn lưu online dạng YYYY-MM-DD kèm chú thích dẫn xuất · thẻ online · thời gian truy xuất là ngay; ô cuối có nút xem file.
  - Chức năng và logic: Thời gian truy xuất bằng ngay là hệ quả của tầng online. Hết hạn lưu online là giá trị dẫn xuất chứ không nhập tay.
- qa:
  - Tên file dài quá thì cắt bớt hay xuống dòng?
  - Hết hạn lưu online của nhóm bảy năm hiện thế nào khi ngày đó còn rất xa?

### Item 5.1.3: Nút Xem file

- itemId: img-027
- parentNo: 5.1
- bbox: (891, 976) - (960, 1005)
- nameJP: ファイルを見る
- nameTrans: View file button
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
- transitionNote: Mở file qua một đường dẫn có chữ ký do máy chủ sinh với thời hạn ngắn.
- databaseTable: lot_attachment
- databaseColumn: -
- databaseNote: Bảng đính kèm đã tồn tại và đường đọc lại bằng đường dẫn có chữ ký thời hạn ngắn đã chạy thật. Cột đường dẫn lưu trữ chỉ dùng ở phía máy chủ để sinh đường dẫn có chữ ký, không bao giờ ra giao diện.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đường duy nhất đọc nội dung file; chỉ hiện cho file đang ở tầng online.
  - Thành phần hiển thị: Nút chữ Xem file ở ô hành động cuối hàng; kiểu nút phụ.
  - Chức năng và logic: Mọi đường xem file đi qua một đường dẫn có chữ ký do máy chủ sinh, thời hạn ngắn, kho lưu riêng tư. Một đường dẫn hỏng không làm sập cả trang: dòng vẫn hiện tên và loại và dung lượng và ngày, chỉ mất liên kết.
- qa:
  - Thời hạn của đường dẫn có chữ ký là bao nhiêu; và có được nới ra so với giá trị đang dùng ở màn chi tiết lô hàng không?
  - Có ghi vết mỗi lần mở file không; nếu ghi thì mỗi lần dựng danh sách sinh bao nhiêu dòng?
  - Phân biệt chưa sinh được liên kết với file không còn tồn tại bằng thông báo nào?

### Item 5.1.4: Hàng file nhóm ba năm quá hạn online chưa chuyển tầng

- itemId: img-028
- parentNo: 5.1
- bbox: (43, 1017) - (1010, 1065)
- nameJP: -
- nameTrans: Overdue three-year file row
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
- databaseNote: CHƯA TỒN TẠI: không có cột tầng lưu trữ và không có mốc chuyển tầng nào trên bảng đính kèm đã có. Trạng thái quá hạn cần cả hạn online dẫn xuất và tầng lưu trữ nên hiện chưa có nguồn.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca vi phạm policy: file nhóm ba năm đã hết hạn online mà chưa ai đánh dấu chuyển tầng nguội.
  - Thành phần hiển thị: Chín ô: tên file · loại tài liệu ảnh ngoại lệ giao hàng · nhóm lưu trữ ba năm · loại MIME · dung lượng · ngày tải lên · hết hạn lưu online kèm một thẻ riêng quá hạn và chưa chuyển · thẻ online · thời gian truy xuất là ngay; ô cuối có nút đánh dấu chuyển tầng nguội.
  - Chức năng và logic: Thẻ quá hạn và chưa chuyển là một trạng thái riêng, không gộp vào tầng lưu trữ. Nhóm này gom được thành một danh sách bằng nút lọc nhanh ở khối bộ lọc.
- qa:
  - Ai chịu trách nhiệm đánh dấu chuyển tầng nguội; và có cần một quy trình nhắc tự động không?
  - File quá hạn mà chưa chuyển thì có bị chặn xem không, hay vẫn mở được như bình thường?

### Item 5.1.5: Nút Đánh dấu chuyển tầng nguội

- itemId: img-029
- parentNo: 5.1
- bbox: (891, 1026) - (1002, 1055)
- nameJP: コールドへ移行
- nameTrans: Mark move to cold button
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
- transitionNote: Ghi tầng lưu trữ của file thành tầng nguội cùng thời điểm chuyển; dòng đó vào trạng thái chờ trong lúc ghi.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: không có cột tầng lưu trữ và không có mốc chuyển tầng nào trên bảng đính kèm đã có. Bảng đính kèm hiện là bảng chỉ-thêm tuyệt đối nên hành động này cần một đường ghi hẹp đúng hai cột, cố ý hẹp chứ không mở đường ghi chung.
- validationNote:
  - Điều kiện: chỉ bấm được khi file đã được phân loại.
  - Lỗi: "File chưa phân loại nên chưa suy được nhóm lưu trữ."
  - Điều kiện: chỉ bấm được khi file đã quá hạn online.
  - Lỗi: "File còn trong hạn lưu online."
- description:
  - Mục đích và ngữ cảnh: Hành động ghi duy nhất của vòng đời lưu trữ, và là lý do duy nhất cần một đường ghi hẹp trên bảng đính kèm.
  - Thành phần hiển thị: Nút chữ Đánh dấu chuyển cold ở ô hành động của hàng quá hạn; kiểu nút hành động chính.
  - Chức năng và logic: Không xoá file: chứng từ là bằng chứng nghiệp vụ nên hết hạn online thì chuyển tầng lưu trữ chứ không xoá. Lỗi ghi thì báo trên đúng dòng và không đổi trạng thái.
- qa:
  - Hành động này chạy tay từng file hay có đường chạy theo lô?
  - Có cần bước xác nhận trước khi chuyển tầng không; chuyển rồi thì thời gian truy xuất tăng lên tối đa hai ngày làm việc.
  - Có ghi vết cho hành động này không; và có bắt ghi lý do không?

### Item 5.1.6: Hàng file đã ở tầng nguội

- itemId: img-030
- parentNo: 5.1
- bbox: (43, 1065) - (1010, 1112)
- nameJP: -
- nameTrans: Cold-tier file row
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
- databaseNote: CHƯA TỒN TẠI: không có cột tầng lưu trữ và không có mốc chuyển tầng nào trên bảng đính kèm đã có.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca sau khi chuyển tầng: file vẫn còn nhưng không mở ngay được nữa.
  - Thành phần hiển thị: Chín ô: tên file · loại tài liệu ảnh chứng từ tranh chấp · nhóm lưu trữ ba năm · loại MIME · dung lượng · ngày tải lên · hết hạn lưu online · thẻ cold · thời gian truy xuất là tối đa hai ngày làm việc in đậm; ô cuối có nút yêu cầu phục hồi.
  - Chức năng và logic: Không còn liên kết xem trực tiếp. Thời gian truy xuất tối đa hai ngày làm việc là con số của yêu cầu khách nên phải hiện trước khi người dùng bấm, không phải sau.
- qa:
  - File ở tầng nguội có còn hiện dung lượng và loại MIME đầy đủ không?
  - Hết cả hạn ba năm và đã ở tầng nguội thì màn hiện trạng thái gì?

