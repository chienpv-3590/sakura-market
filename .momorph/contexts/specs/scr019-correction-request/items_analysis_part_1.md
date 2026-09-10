# Items Analysis - scr019-correction-request

## Screen context

- source: `.momorph/shots/SC-20-tao-yeu-cau-dieu-chinh.png` (image mode, 1280x1999 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-08 · Feature List FE-028 · RFP FR-CORR-01 (ràng buộc kèm FR-CORR-03; BR-CLOSE-01; FR-AUDIT-01)
- batch: 1/3

### Item 1: Khối đầu màn tạo yêu cầu điều chỉnh

- **itemId**: img-001
- **nameJP**: -
- **nameTrans**: Screen header block
- **itemType**: others
- **itemSubtype**: khối tiêu đề màn
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=26 startY=22 endX=1026 endY=121
- **description**:
  - Mục đích và ngữ cảnh: Định danh màn và chuỗi truy vết của nó; cho biết đây là điểm vào của nhóm điều chỉnh sau khi chốt.
  - Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; dòng metadata liệt kê FE-028 · FN-08 · ưu tiên P0 · FR-CORR-01 cùng các ràng buộc kèm và actor; dòng tham chiếu phụ nêu mã thi công · loại màn · route và một thẻ trạng thái.
  - Chức năng và logic: Chỉ trình bày; không nhận thao tác.
- **qa**:
  - -

### Item 1.1: Tiêu đề màn

- **itemId**: img-002
- **nameJP**: 修正依頼の作成
- **nameTrans**: Screen title
- **itemType**: label
- **itemSubtype**: tiêu đề cấp hai
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=26 startY=22 endX=1026 endY=48
- **description**:
  - Mục đích và ngữ cảnh: Cho người dùng biết đang ở màn tạo yêu cầu điều chỉnh cho một giao dịch thuộc ngày đã chốt.
  - Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã màn SC-20 và tên màn.
  - Chức năng và logic: Tĩnh.
- **qa**:
  - -

### Item 1.2: Dòng metadata truy vết

- **itemId**: img-003
- **nameJP**: -
- **nameTrans**: Traceability metadata line
- **itemType**: label
- **itemSubtype**: đoạn văn nhiều dòng
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=26 startY=60 endX=1026 endY=97
- **description**:
  - Mục đích và ngữ cảnh: Nối màn về đúng tính năng và điều khoản yêu cầu; nêu rõ FR-CORR-01 là yêu cầu chính và ba mã còn lại là ràng buộc kèm.
  - Thành phần hiển thị: Hai dòng chữ nhỏ: dòng tính năng · ưu tiên · yêu cầu và actor; dòng tham chiếu phụ nêu mã thi công · loại màn Form · route và thẻ trạng thái.
  - Chức năng và logic: Tĩnh; không có liên kết điều hướng.
- **qa**:
  - -

### Item 1.2.1: Thẻ trạng thái dựng màn

- **itemId**: img-004
- **nameJP**: -
- **nameTrans**: Build status tag
- **itemType**: label
- **itemSubtype**: thẻ nhỏ trong dòng
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=424 startY=78 endX=476 endY=97
- **description**:
  - Mục đích và ngữ cảnh: Cho biết màn đã có bản thi công để đối chiếu.
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn cuối dòng tham chiếu phụ với nội dung Đã dựng.
  - Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu.
- **qa**:
  - -

### Item 2: Khối thiết kế đòi theo cột nghiệm thu

- **itemId**: img-005
- **nameJP**: -
- **nameTrans**: Acceptance-criteria block
- **itemType**: others
- **itemSubtype**: khối bảng hai cột
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=26 startY=137 endX=1026 endY=311
- **description**:
  - Mục đích và ngữ cảnh: Dịch cột nghiệm thu của yêu cầu khách hàng thành điều phải thấy được trên màn; là bảng kiểm khi nghiệm thu màn này.
  - Thành phần hiển thị: Tiêu đề khối; bên dưới là bảng hai cột ba dòng cho FR-CORR-01 · cặp FR-CORR-03 và BR-CLOSE-01 · FR-AUDIT-01.
  - Chức năng và logic: Chỉ đọc; nội dung là ràng buộc phạm vi áp lên ba khối bước bên dưới.
- **qa**:
  - -

### Item 2.1: Bảng yêu cầu và điều phải thấy trên màn

- **itemId**: img-006
- **nameJP**: -
- **nameTrans**: Requirement-to-screen mapping table
- **itemType**: table
- **itemSubtype**: bảng hai cột
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: correction_request
- **databaseColumn**: target_txn_id; reason; evidence_path; status; requested_by; created_at
- **databaseNote**: Miền dữ liệu D-SETTLE và D-TRADE. Bảng thi công có thật và khớp thiết kế: bản ghi yêu cầu điều chỉnh là bản ghi riêng; INSERT vào bảng này không chịu tầng chặn ghi theo ngày lock.
- **validationNote**: -
- **bbox**: startX=42 startY=181 endX=1010 endY=295
- **description**:
  - Mục đích và ngữ cảnh: Neo từng khối của màn về đúng câu chữ nghiệm thu để không thiết kế thêm hay bớt.
  - Thành phần hiển thị: Ba dòng: FR-CORR-01 đòi bản ghi yêu cầu riêng kèm lý do · bằng chứng đính kèm · trạng thái phê duyệt và giao dịch gốc không đổi trước khi được phê duyệt; FR-CORR-03 cùng BR-CLOSE-01 đòi yêu cầu điều chỉnh là đường ghi hợp lệ duy nhất sau khi chốt kỳ; FR-AUDIT-01 đòi thao tác tạo truy được chủ thể · thời điểm · lý do và bằng chứng.
  - Chức năng và logic: Chỉ đọc; cụm giao dịch gốc không bị thay đổi và cụm đường ghi hợp lệ duy nhất là hai bất biến của màn.
- **qa**:
  - -

### Item 3: Khối Bước 1 — chọn giao dịch đã chốt

- **itemId**: img-007
- **nameJP**: -
- **nameTrans**: Step 1 transaction lookup block
- **itemType**: others
- **itemSubtype**: khối tra mã
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=26 startY=324 endX=1026 endY=473
- **description**:
  - Mục đích và ngữ cảnh: Bước đầu của luồng: tìm ra giao dịch đích. Không có giao dịch đích thì không có gì để điều chỉnh nên hai khối sau chưa hiện.
  - Thành phần hiển thị: Tiêu đề khối; một ô nhập mã giao dịch chiếm gần hết chiều ngang và một nút Tra mã ở mép phải.
  - Chức năng và logic: Kết quả tra quyết định màn ở trạng thái rỗng hay đã có giao dịch đích.
- **qa**:
  - -

### Item 3.1: Ô nhập Mã giao dịch

- **itemId**: img-008
- **nameJP**: 取引番号
- **nameTrans**: Transaction code
- **itemType**: text_form
- **itemSubtype**: ô nhập một dòng
- **buttonType**: -
- **dataType**: string
- **format**: TXN-NNNN theo mẫu hiển thị TXN-0001
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: txn_code
- **databaseNote**: Mã giao dịch là khoá duy nhất dùng để tra ra giao dịch đích. Màn chỉ ĐỌC theo cột này và không bao giờ ghi vào bảng giao dịch.
- **validationNote**: Điều kiện: mã phải khớp đúng một giao dịch có thật.<br>Lỗi: "Không tìm thấy giao dịch với mã này." / 「この取引番号は見つかりません。」 — hiện ngay tại chỗ chứ không điều hướng.
- **bbox**: startX=42 startY=368 endX=937 endY=447
- **description**:
  - Mục đích và ngữ cảnh: Chỗ người quyết toán nhập mã giao dịch cần điều chỉnh; mã này là khoá duy nhất để tìm ra bản ghi đích.
  - Thành phần hiển thị: Nhãn Mã giao dịch kèm dấu sao bắt buộc; ô nhập một dòng hiện mẫu TXN-0001; dòng nhắc bên dưới nêu thông báo lỗi khi không tìm thấy ở cả tiếng Việt và tiếng Nhật.
  - Chức năng và logic: Tra không khớp bản ghi nào thì hiện lỗi ngay tại ô nhập; người dùng sửa mã rồi tra lại mà không mất ngữ cảnh.
- **qa**:
  - Mã giao dịch có buộc đúng mẫu TXN-NNNN hay chấp nhận mã tự do?
  - Có cần chặn độ dài và ký tự lạ ngay tại ô nhập trước khi gửi tra không?
  - Tra không thấy thì có giữ lại giá trị vừa nhập trong ô để sửa tiếp không?

### Item 3.2: Nút Tra mã

- **itemId**: img-009
- **nameJP**: 照会
- **nameTrans**: Lookup button
- **itemType**: button
- **itemSubtype**: nút phụ trong hàng
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Tra giao dịch theo mã đã nhập. Tìm thấy thì Bước 2 và Bước 3 hiện ra; không tìm thấy thì chỉ hiện lỗi ngay tại ô nhập.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=948 startY=385 endX=1010 endY=414
- **description**:
  - Mục đích và ngữ cảnh: Kích hoạt việc tra cứu giao dịch đích; đây là hành động duy nhất khả dụng khi màn còn ở trạng thái rỗng.
  - Thành phần hiển thị: Nút chữ Tra mã đặt ngang hàng với ô nhập mã giao dịch ở mép phải khối Bước 1.
  - Chức năng và logic: Không đổi dữ liệu; chỉ nạp giao dịch đích để hiện hai khối sau.
- **qa**:
  - Bấm Tra mã khi ô nhập còn rỗng thì hiện lỗi gì hay bỏ qua không làm gì?
  - Trong lúc tra có cần trạng thái đang tải riêng cho nút này không?

### Item 4: Khối Bước 2 — giao dịch đích chỉ đọc

- **itemId**: img-010
- **nameJP**: -
- **nameTrans**: Step 2 read-only target block
- **itemType**: others
- **itemSubtype**: khối ba ô chỉ đọc
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: qty; unit_price; business_date
- **databaseNote**: Chỉ đọc từ bảng giao dịch của miền D-TRADE; không có đường ghi nào từ màn này vào bảng đó.
- **validationNote**: -
- **bbox**: startX=26 startY=486 endX=1026 endY=678
- **description**:
  - Mục đích và ngữ cảnh: Hiện giá trị hiện tại của giao dịch đích để người lập nhìn thấy mình đang đề nghị sửa cái gì; toàn khối chỉ đọc vì thiết kế cấm sửa giao dịch gốc.
  - Thành phần hiển thị: Tiêu đề khối dẫn FR-CORR-01; một hàng ba ô chỉ đọc nền xám là Số lượng gốc · Đơn giá gốc · Ngày nghiệp vụ; một đoạn ghi chú cuối khối.
  - Chức năng và logic: Không có ô nào ghi vào giao dịch gốc; điều này đúng cả trước khi yêu cầu được duyệt.
- **qa**:
  - Ngoài số lượng · đơn giá · ngày nghiệp vụ thì người lập còn cần thấy trường nào của giao dịch gốc để viết lý do chính xác?

### Item 4.1: Ô hiển thị Số lượng gốc

- **itemId**: img-011
- **nameJP**: 元の数量
- **nameTrans**: Original quantity
- **itemType**: label
- **itemSubtype**: ô chỉ đọc
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: qty
- **databaseNote**: Chỉ đọc; giá trị này không đổi cho tới khi yêu cầu điều chỉnh được duyệt.
- **validationNote**: -
- **bbox**: startX=42 startY=530 endX=357 endY=625
- **description**:
  - Mục đích và ngữ cảnh: Cho người lập thấy số lượng đang được ghi nhận của giao dịch đích.
  - Thành phần hiển thị: Nhãn Số lượng gốc và ô chỉ đọc nền xám hiện mẫu 120.00 với hai chữ số thập phân.
  - Chức năng và logic: Chỉ đọc; là một trong hai số mà người duyệt ở SC-21 dùng để tính lại phần chênh lệch.
- **qa**:
  - -

### Item 4.2: Ô hiển thị Đơn giá gốc

- **itemId**: img-012
- **nameJP**: 元の単価
- **nameTrans**: Original unit price
- **itemType**: label
- **itemSubtype**: ô chỉ đọc
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: unit_price
- **databaseNote**: Chỉ đọc; đơn giá tính bằng JPY và không có phần lẻ.
- **validationNote**: -
- **bbox**: startX=368 startY=530 endX=684 endY=625
- **description**:
  - Mục đích và ngữ cảnh: Cho người lập thấy đơn giá đang được ghi nhận của giao dịch đích.
  - Thành phần hiển thị: Nhãn Đơn giá gốc và ô chỉ đọc nền xám hiện mẫu 1 850 JPY.
  - Chức năng và logic: Chỉ đọc; đơn giá là số nguyên JPY nên mọi phần chênh lệch đơn giá cũng phải là số nguyên.
- **qa**:
  - -

### Item 4.3: Ô hiển thị Ngày nghiệp vụ của giao dịch đích

- **itemId**: img-013
- **nameJP**: 業務日
- **nameTrans**: Business date
- **itemType**: label
- **itemSubtype**: ô chỉ đọc
- **buttonType**: -
- **dataType**: -
- **format**: YYYY-MM-DD
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: business_date
- **databaseNote**: Ngày nghiệp vụ của giao dịch đích được đối chiếu với bảng lock kỳ của miền D-SETTLE: phải có dòng lock cho ngày đó mới nhận yêu cầu.
- **validationNote**: Điều kiện: chỉ giao dịch thuộc ngày nghiệp vụ ĐÃ chốt kỳ đi qua màn này.<br>Lỗi: ngày chưa chốt thì không nhận yêu cầu và chỉ đường về màn giao dịch để sửa trực tiếp.
- **bbox**: startX=695 startY=530 endX=1010 endY=625
- **description**:
  - Mục đích và ngữ cảnh: Trường quyết định màn có nhận yêu cầu hay không; đây là điều kiện đảo ngược so với các màn sửa trực tiếp.
  - Thành phần hiển thị: Nhãn Ngày nghiệp vụ và ô chỉ đọc hiện ngày kèm nhãn đã chốt kỳ; dòng nhắc bên dưới nói rõ ngày chưa chốt thì sửa thẳng ở màn giao dịch.
  - Chức năng và logic: Điều kiện bắt buộc là ngày đã chốt; đường điều chỉnh chỉ mở SAU khi ngày đã lock chứ không phải trước.
- **qa**:
  - Người lập vào màn khi ngày chưa chốt thì màn chỉ hiện thông báo hay điều hướng thẳng sang màn giao dịch?

### Item 4.4: Ghi chú khối chỉ đọc

- **itemId**: img-014
- **nameJP**: -
- **nameTrans**: Read-only block note
- **itemType**: label
- **itemSubtype**: đoạn nhắc dưới khối
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=42 startY=635 endX=1010 endY=652
- **description**:
  - Mục đích và ngữ cảnh: Nhấn lại bất biến của FR-CORR-01 ngay tại chỗ dễ cài sai nhất: một ô nhập lọt vào khối này là phá bất biến.
  - Thành phần hiển thị: Một đoạn chữ nhỏ cuối khối Bước 2.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc áp lên ba ô chỉ đọc của khối.
- **qa**:
  - -

### Item 5: Khối Bước 3 — nội dung yêu cầu

- **itemId**: img-015
- **nameJP**: -
- **nameTrans**: Step 3 request content block
- **itemType**: others
- **itemSubtype**: khối form ba trường và nút gửi
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: correction_request
- **databaseColumn**: reason; evidence_path; status
- **databaseNote**: Ba trường ghi vào bảng yêu cầu điều chỉnh; bảng chỉ thêm dòng nên một yêu cầu đã gửi thì không sửa lại.
- **validationNote**: -
- **bbox**: startX=26 startY=691 endX=1026 endY=1046
- **description**:
  - Mục đích và ngữ cảnh: Nơi nhập nội dung yêu cầu điều chỉnh: lý do và bằng chứng; hai thứ FR-CORR-01 và FR-AUDIT-01 cùng đòi.
  - Thành phần hiển thị: Tiêu đề khối; vùng văn bản Lý do; ô chọn tệp Bằng chứng đính kèm; ô chỉ đọc Trạng thái phê duyệt khi tạo; hai nút gửi ở hai trạng thái.
  - Chức năng và logic: Nút gửi chỉ kích hoạt khi có đủ lý do và bằng chứng; trạng thái phê duyệt do hệ thống đặt.
- **qa**:
  - -
