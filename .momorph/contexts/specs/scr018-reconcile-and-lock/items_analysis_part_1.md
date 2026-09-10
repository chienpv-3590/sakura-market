# Items Analysis - scr018-reconcile-and-lock

## Screen context

- source: `.momorph/shots/SC-18-bang-doi-chieu-ngay-va-lock-ky.png` (image mode, 1280x2517 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-07/FN-06 · Feature List FE-024/FE-025/FE-026 · RFP FR-SETTLE-01, FR-SETTLE-02, FR-CORR-03, FR-DEL-04, BR-CLOSE-01, FR-AUDIT-01
- batch: 1/3

### Item 1: Khối đầu màn đối chiếu và lock kỳ

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
- **bbox**: startX=26 startY=22 endX=1026 endY=138
- **description**:
  - Mục đích và ngữ cảnh: Định danh màn và chuỗi truy vết của nó về tính năng và yêu cầu khách hàng; người đọc biết ngay màn này thuộc nhóm đối chiếu và chốt kỳ.
  - Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; bên dưới là dòng metadata liệt kê FE-024 · FE-025 · FE-026 · FN-07 · FN-06 · ưu tiên P0 · P1 · các mã yêu cầu · miền dữ liệu · sơ đồ FIG-013 · báo cáo RPT-05 và một thẻ trạng thái dựng.
  - Chức năng và logic: Chỉ trình bày; không nhận thao tác và không gọi dữ liệu.
- **qa**:
  - Dòng metadata truy vết này có phải hiện trên bản chạy thật cho người vận hành hay chỉ dùng trong tài liệu thiết kế?

### Item 1.1: Tiêu đề màn

- **itemId**: img-002
- **nameJP**: 業務日照合と締め
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
  - Mục đích và ngữ cảnh: Cho người dùng biết đang ở màn lập bảng đối chiếu ngày và lock kỳ của bộ phận đối chiếu.
  - Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã màn SC-18 và tên màn cách nhau bằng dấu chấm giữa.
  - Chức năng và logic: Tĩnh; không thay đổi theo ngày nghiệp vụ đang chọn hay theo trạng thái lock.
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
- **bbox**: startX=26 startY=60 endX=1026 endY=115
- **description**:
  - Mục đích và ngữ cảnh: Nối màn về đúng tính năng và điều khoản yêu cầu mà nó phải thoả; là chỗ kiểm tra phạm vi khi nghiệm thu.
  - Thành phần hiển thị: Ba dòng chữ nhỏ: dòng tính năng và ưu tiên; dòng mã yêu cầu khách hàng cùng miền dữ liệu và sơ đồ; dòng tham chiếu phụ gồm mã thi công · route · actor và thẻ trạng thái.
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
- **bbox**: startX=503 startY=95 endX=555 endY=115
- **description**:
  - Mục đích và ngữ cảnh: Cho biết màn này đã có bản thi công để đối chiếu; ảnh hưởng tới cách đọc khối đối chiếu prototype ở cuối màn.
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn nằm cuối dòng tham chiếu phụ với nội dung Đã dựng.
  - Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu chứ không từ dữ liệu nghiệp vụ.
- **qa**:
  - -

### Item 2: Khối 1 — chọn ngày nghiệp vụ và trạng thái kỳ

- **itemId**: img-005
- **nameJP**: -
- **nameTrans**: Business date and period status block
- **itemType**: others
- **itemSubtype**: khối form bốn ô ngang
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: business_day_lock
- **databaseColumn**: business_date; locked_at; locked_by
- **databaseNote**: Miền dữ liệu D-SETTLE. Bảng thi công có thật và khớp thiết kế: sự tồn tại của một dòng theo business_date chính là trạng thái đã lock.
- **validationNote**: -
- **bbox**: startX=26 startY=154 endX=1026 endY=336
- **description**:
  - Mục đích và ngữ cảnh: Đặt ngữ cảnh cho cả màn: mọi số liệu bên dưới thuộc đúng một ngày nghiệp vụ và trạng thái lock của ngày đó quyết định màn ở chế độ ghi hay chỉ đọc.
  - Thành phần hiển thị: Một hàng bốn ô: ngày nghiệp vụ có thể nhập; ba ô chỉ đọc là trạng thái kỳ · thời điểm lock · người lock.
  - Chức năng và logic: Đổi ngày nghiệp vụ thì tải lại bảng đối chiếu và trạng thái lock của ngày mới; ba ô chỉ đọc luôn phản ánh đúng ngày đang chọn.
- **qa**:
  - Khi ngày nghiệp vụ đổi mà bảng đang tải thì ba ô chỉ đọc giữ giá trị cũ hay xoá trắng?

### Item 2.1: Ô nhập Ngày nghiệp vụ

- **itemId**: img-006
- **nameJP**: 業務日
- **nameTrans**: Business date
- **itemType**: date_picker
- **itemSubtype**: ô chọn ngày một dòng
- **buttonType**: -
- **dataType**: date
- **format**: YYYY-MM-DD
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Đổi giá trị thì tải lại toàn màn theo ngày nghiệp vụ mới: bảng đối chiếu ở khối 2 và trạng thái kỳ ở khối 1 đều đổi theo.
- **databaseTable**: business_day_lock
- **databaseColumn**: business_date
- **databaseNote**: Khoá chính của bảng lock kỳ; cũng là tham số lọc của nguồn bảng đối chiếu ngày.
- **validationNote**: Điều kiện: đúng định dạng YYYY-MM-DD và là một ngày thật.<br>Điều kiện: ngày nghiệp vụ neo theo JST và không nhận ngày tương lai.<br>Lỗi: phải báo lỗi rõ ràng ngay tại ô nhập; tuyệt đối không âm thầm đổi sang ngày hôm nay.
- **bbox**: startX=42 startY=199 endX=276 endY=310
- **description**:
  - Mục đích và ngữ cảnh: Chọn ngày nghiệp vụ cần đối chiếu và chốt; đây là tham số duy nhất quyết định toàn bộ nội dung màn.
  - Thành phần hiển thị: Nhãn Ngày nghiệp vụ · 業務日 kèm dấu sao bắt buộc; ô nhập một dòng hiện mẫu 2026-09-09; dòng nhắc bên dưới nêu rõ neo JST và không nhận ngày tương lai.
  - Chức năng và logic: Giá trị đi vào truy vấn tổng hợp ba nguồn của ngày đó và truy vấn trạng thái lock; nhập sai thì dừng lại ở lỗi chứ không tự chuyển ngày.
- **qa**:
  - Mở màn lần đầu thì ngày nghiệp vụ mặc định là ngày hôm nay theo JST hay ngày gần nhất còn chưa lock?
  - Người dùng gõ tay một ngày quá khứ rất xa thì có chặn theo một biên dưới nào không?
  - Ngày nghiệp vụ có được đưa lên địa chỉ trang để chia sẻ lại và tải lại đúng ngày không?

### Item 2.2: Ô hiển thị Trạng thái kỳ

- **itemId**: img-007
- **nameJP**: ロック状態
- **nameTrans**: Period lock status
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
- **databaseTable**: business_day_lock
- **databaseColumn**: business_date
- **databaseNote**: Trạng thái dẫn xuất: có dòng theo ngày nghiệp vụ thì là đã lock; không có dòng thì là chưa lock. Không phải một cột riêng.
- **validationNote**: -
- **bbox**: startX=287 startY=199 endX=521 endY=310
- **description**:
  - Mục đích và ngữ cảnh: Nói ngay màn đang ở chế độ nào: chưa lock thì còn đường ghi trực tiếp; đã lock thì chỉ còn đường yêu cầu điều chỉnh.
  - Thành phần hiển thị: Nhãn Trạng thái kỳ · ロック状態 và một ô chỉ đọc nền xám hiện Chưa lock · 未ロック.
  - Chức năng và logic: Giá trị dẫn xuất từ việc ngày nghiệp vụ đang chọn có bản ghi lock hay không; quyết định nút lock ở khối 4 có hiện hay không.
- **qa**:
  - Trạng thái này có hai giá trị hay cần thêm một giá trị trung gian cho lúc đang gửi lệnh lock?

### Item 2.3: Ô hiển thị Thời điểm lock

- **itemId**: img-008
- **nameJP**: ロック日時
- **nameTrans**: Locked at
- **itemType**: label
- **itemSubtype**: ô chỉ đọc
- **buttonType**: -
- **dataType**: -
- **format**: YYYY-MM-DD HH:mm JST
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: business_day_lock
- **databaseColumn**: locked_at
- **databaseNote**: Dấu thời gian của lần lock; ngày nghiệp vụ neo JST nên giá trị phải hiện kèm JST.
- **validationNote**: -
- **bbox**: startX=532 startY=199 endX=765 endY=310
- **description**:
  - Mục đích và ngữ cảnh: Cho biết kỳ được chốt lúc nào; là một trong các thông tin FR-AUDIT-01 đòi truy được cho thao tác lock.
  - Thành phần hiển thị: Nhãn Thời điểm lock · ロック日時 và ô chỉ đọc; khi chưa lock hiện dấu gạch kèm ghi chú sẽ hiện kèm JST khi đã lock.
  - Chức năng và logic: Chỉ có giá trị khi ngày đã lock; phải hiện kèm mốc múi giờ JST để không lệch với ngày nghiệp vụ.
- **qa**:
  - Khi hiện thời điểm lock có cần hiện thêm giờ theo múi giờ của trình duyệt cho người dùng ở múi giờ khác không?

### Item 2.4: Ô hiển thị Người lock

- **itemId**: img-009
- **nameJP**: 実施者
- **nameTrans**: Locked by
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
- **databaseTable**: business_day_lock
- **databaseColumn**: locked_by
- **databaseNote**: Khoá ngoại về tài khoản người dùng nội bộ; chỉ lấy tên hiển thị của tài khoản.
- **validationNote**: -
- **bbox**: startX=776 startY=199 endX=1010 endY=310
- **description**:
  - Mục đích và ngữ cảnh: FR-AUDIT-01 đòi truy được chủ thể của thao tác lock nên trường này phải hiện trên màn chứ không chỉ nằm trong log.
  - Thành phần hiển thị: Nhãn Người lock · 実施者 kèm ô chỉ đọc; dòng nhắc bên dưới dẫn FR-AUDIT-01 làm lý do trường này phải hiện.
  - Chức năng và logic: Lấy tên hiển thị của tài khoản đã thực hiện lock; không bao giờ hiện email hay mã tài khoản.
- **qa**:
  - Nếu tài khoản đã lock sau đó bị vô hiệu hoá thì màn hiện tên hiển thị cũ hay hiện thêm nhãn đã vô hiệu?

### Item 3: Khối 2 — bảng đối chiếu ngày gom ba nguồn

- **itemId**: img-010
- **nameJP**: -
- **nameTrans**: Daily reconciliation table block
- **itemType**: others
- **itemSubtype**: khối bảng có ghi chú
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: reconciliation_line
- **databaseColumn**: business_date; source_type; source_id; participant_id; qty; amount_jpy; variance
- **databaseNote**: Miền dữ liệu D-SETTLE gom từ D-TRADE và D-DELIVERY. Nguồn thi công là một view tính khi gọi. Sắc thái: view hiện chỉ hợp ba nhánh giao dịch thoả thuận · đấu giá · lần giao; thiết kế còn đòi nhánh thứ tư là ngoại lệ giao hàng đã xác nhận.
- **validationNote**: -
- **bbox**: startX=26 startY=349 endX=1026 endY=689
- **description**:
  - Mục đích và ngữ cảnh: Đây là hạng mục chính của FE-025: tổng hợp giao dịch · giao hàng · ngoại lệ đủ điều kiện của một ngày nghiệp vụ thành một bảng để đối chiếu trước khi chốt.
  - Thành phần hiển thị: Tiêu đề khối dẫn FE-025 và FR-SETTLE-01; bên dưới là bảng tám cột có dòng tổng cuối bảng và hai đoạn ghi chú quy tắc.
  - Chức năng và logic: Bảng chỉ đọc; nội dung phụ thuộc ngày nghiệp vụ đang chọn ở khối 1 và không bị lock chặn vì lock chỉ chặn ghi.
- **qa**:
  - Bảng có cần phân trang hay sắp xếp theo cột khi một ngày cao điểm có hàng trăm dòng không?

### Item 3.1: Bảng đối chiếu ngày tám cột

- **itemId**: img-011
- **nameJP**: 日次照合表
- **nameTrans**: Daily reconciliation table
- **itemType**: table
- **itemSubtype**: bảng tám cột kèm dòng tổng
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: reconciliation_line
- **databaseColumn**: source_type; source_id; participant_id; qty; amount_jpy; variance
- **databaseNote**: Bốn nhánh nguồn thiết kế đòi: giao dịch thoả thuận · bản ghi đấu giá · lần giao hàng · ngoại lệ giao hàng đã xác nhận. Nhánh ngoại lệ chưa có nguồn dữ liệu trong bản thi công.
- **validationNote**: Điều kiện: cột Chênh lệch chỉ điền được khi có cả hai phía để so.<br>Lỗi: không so được thì ghi "không áp dụng"; tuyệt đối không hiện 0 hay dấu gạch vì người đọc sẽ hiểu thành không lệch.
- **bbox**: startX=42 startY=393 endX=1010 endY=626
- **description**:
  - Mục đích và ngữ cảnh: Trình bày mọi chứng từ đủ điều kiện của ngày nghiệp vụ cùng số lượng · thành tiền · phần đã giao và chênh lệch để bộ phận đối chiếu rà trước khi lock.
  - Thành phần hiển thị: Tám cột nhãn song ngữ Việt và Nhật; bốn dòng dữ liệu mẫu gồm hai giao dịch thoả thuận · một bản ghi đấu giá · một ngoại lệ giao thiếu; dòng cuối là Tổng đủ điều kiện in đậm gộp số lượng · thành tiền · đã giao và chênh lệch.
  - Chức năng và logic: Chỉ đọc và luôn lọc theo ngày nghiệp vụ đang chọn; lần giao được tính theo ngày nghiệp vụ của chính nó chứ không theo ngày của giao dịch mẹ; giao dịch đã hủy vẫn hiện thành dòng đã gạch kèm lý do thay vì biến mất khỏi bảng.
- **qa**:
  - Dòng Tổng đủ điều kiện cộng gộp cả nhánh ngoại lệ vào cột số lượng hay chỉ cộng ba nhánh chứng từ?
  - Giao dịch đã hủy hiện thành dòng gạch kèm lý do thì lý do hủy lấy từ đâu và hiện ở cột nào?
  - Khi ngày nghiệp vụ không có dòng nào đủ điều kiện thì bảng hiện trạng thái rỗng riêng hay chỉ còn dòng tổng bằng 0?

### Item 3.1.1: Nút truy vết lần giao trong dòng

- **itemId**: img-012
- **nameJP**: 配送を見る
- **nameTrans**: Delivery drill-down button
- **itemType**: button
- **itemSubtype**: nút phụ trong ô bảng
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Mở phần truy vết các lần giao liên quan của chính dòng đó; khi chưa có lần giao nào thì hiện đúng câu Chưa có lần giao thay vì mở rỗng.
- **databaseTable**: reconciliation_line
- **databaseColumn**: source_type; source_id
- **databaseNote**: Cặp loại nguồn và mã bản ghi nguồn là đường đi từ một dòng quyết toán sang các lần giao liên quan theo FR-DEL-04.
- **validationNote**: -
- **bbox**: startX=864 startY=442 endX=968 endY=471
- **description**:
  - Mục đích và ngữ cảnh: Thoả FE-024 và FR-DEL-04: từ một dòng của bảng quyết toán truy được các lần giao hàng liên quan.
  - Thành phần hiển thị: Nút chữ nhỏ nằm trong ô cột Truy vết của từng dòng; nhãn đổi theo dữ liệu thật của dòng: Xem 2 lần giao · Chưa có lần giao · Xem 1 lần giao · Xem ngoại lệ. Bốn nút của bốn dòng gộp thành một hạng mục vì cùng cấu trúc và cùng vai trò; khác nhau chỉ ở nhãn dữ liệu.
  - Chức năng và logic: Phải có ở mọi nhánh kể cả nhánh đấu giá và kể cả khi chưa có lần giao nào; câu Chưa có lần giao là một câu trả lời hợp lệ chứ không phải ô trống.
- **qa**:
  - Phần truy vết mở ra là hàng phụ mở rộng ngay trong bảng hay là màn riêng SC-16?
  - Lỗi mạng khi truy vết và không có lần giao nào phải hiện khác nhau như thế nào?

### Item 3.2: Ghi chú quy tắc truy vết và chênh lệch

- **itemId**: img-013
- **nameJP**: -
- **nameTrans**: Traceability and variance rule note
- **itemType**: label
- **itemSubtype**: đoạn nhắc dưới bảng
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
- **bbox**: startX=42 startY=629 endX=1010 endY=663
- **description**:
  - Mục đích và ngữ cảnh: Chốt hai quy tắc trình bày dễ cài sai nhất của bảng: đường truy vết phải có ở mọi nhánh và ô chênh lệch không được nói dối.
  - Thành phần hiển thị: Hai đoạn chữ nhỏ dưới bảng; các mã yêu cầu và từ khoá quy tắc in đậm; câu "không áp dụng" và ký tự 0 được nêu tương phản với nhau.
  - Chức năng và logic: Chỉ trình bày; nội dung của nó là ràng buộc áp lên hạng mục bảng và hạng mục nút truy vết.
- **qa**:
  - -

### Item 4: Khối 3 — định nghĩa đủ điều kiện

- **itemId**: img-014
- **nameJP**: -
- **nameTrans**: Eligibility definition block
- **itemType**: others
- **itemSubtype**: khối bốn thẻ định nghĩa
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
- **bbox**: startX=26 startY=702 endX=1026 endY=872
- **description**:
  - Mục đích và ngữ cảnh: Định nghĩa đúng bốn thành phần mà FR-SETTLE-01 gọi là đủ điều kiện; thiếu định nghĩa này thì bảng đối chiếu tự do gom sai và số chốt sai theo.
  - Thành phần hiển thị: Bốn thẻ ngang nhau: Giao dịch thoả thuận · Bản ghi đấu giá · Giao hàng · Ngoại lệ giao hàng.
  - Chức năng và logic: Chỉ trình bày; nội dung bốn thẻ là điều kiện lọc của nguồn bảng đối chiếu.
- **qa**:
  - Danh sách bốn thành phần này đã đủ chưa; có chứng từ nào khác của ngày nghiệp vụ cũng phải vào bảng đối chiếu không?

### Item 4.1: Thẻ định nghĩa Giao dịch thoả thuận

- **itemId**: img-015
- **nameJP**: 相対取引
- **nameTrans**: Negotiated trade eligibility card
- **itemType**: label
- **itemSubtype**: thẻ định nghĩa
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
- **bbox**: startX=42 startY=746 endX=277 endY=856
- **description**:
  - Mục đích và ngữ cảnh: Nêu điều kiện để một giao dịch thoả thuận vào bảng đối chiếu và cách xử lý giao dịch đã hủy.
  - Thành phần hiển thị: Thẻ có tiêu đề Giao dịch 相対取引 và một đoạn văn ngắn.
  - Chức năng và logic: Điều kiện gồm hai phần: đã chốt và thuộc đúng ngày nghiệp vụ đang xem; giao dịch đã hủy không được biến mất vì biến mất là mất dấu vết.
- **qa**:
  - Giao dịch đang ở trạng thái chờ xác nhận vào ngày đó thì có vào bảng đối chiếu hay bị loại?
