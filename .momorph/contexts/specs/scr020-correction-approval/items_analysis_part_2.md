# Items Analysis - scr020-correction-approval

## Screen context

- source: `.momorph/shots/SC-21-phe-duyet-yeu-cau-dieu-chinh.png` (image mode, 1280x2369 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-08 · Feature List FE-029 · RFP FR-CORR-02 (ràng buộc kèm GOV-RULE-01 maker-checker; FR-AUDIT-01; FR-INC-03)
- batch: 2/3

### Item 4.4: Ô nhập Lý do quyết định

- **itemId**: img-016
- **nameJP**: 判断理由
- **nameTrans**: Decision reason
- **itemType**: textarea
- **itemSubtype**: vùng văn bản nhiều dòng
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: true
- **minLength**: -
- **maxLength**: 1000
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Lý do quyết định phải vào dấu vết kiểm toán của thao tác phê duyệt theo FR-AUDIT-01 cùng chủ thể · thời điểm và giá trị trước sau.
- **validationNote**: Điều kiện: bắt buộc cho CẢ duyệt và từ chối.<br>Điều kiện: bỏ khoảng trắng hai đầu rồi phải còn nội dung.<br>Lỗi: lý do rỗng thì từ chối thao tác; lý do rỗng là thao tác không giải thích được về sau.
- **bbox**: startX=42 startY=925 endX=1010 endY=1020
- **description**:
  - Mục đích và ngữ cảnh: Trường lý do mà FR-AUDIT-01 đòi cho thao tác phê duyệt; là thứ giải thích quyết định về sau khi có kiểm toán.
  - Thành phần hiển thị: Nhãn Lý do quyết định kèm dấu sao bắt buộc; vùng văn bản rộng hết khối hiện một câu mẫu; dòng nhắc nêu bắt buộc cho cả duyệt và từ chối.
  - Chức năng và logic: Bắt buộc ở cả hai nhánh quyết định; nội dung đi vào dấu vết kiểm toán chứ không chỉ hiện trên màn.
- **qa**:
  - Lý do quyết định có hiện lại trên danh sách sau khi đã xử lý không; thẻ trạng thái Đã xử lý nói là có.
  - Lý do từ chối có được gửi lại cho người lập bằng thông báo không?

### Item 4.5: Nút Duyệt

- **itemId**: img-017
- **nameJP**: 承認
- **nameTrans**: Approve button
- **itemType**: button
- **itemSubtype**: nút hành động chính
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Duyệt yêu cầu: sinh một bản ghi điều chỉnh mới rồi phần chênh lệch tiền thưởng xuất hiện ở kỳ tiếp theo và xem được ở SC-22; bản ghi gốc giữ nguyên.
- **databaseTable**: correction_request; transaction_adjustment
- **databaseColumn**: status; approved_by; kind; qty_delta; unit_price_delta; amount_delta
- **databaseNote**: Một lần duyệt phải là một thao tác trọn vẹn: đổi trạng thái yêu cầu và ghi dòng điều chỉnh không được để lỡ nửa đường.
- **validationNote**: Điều kiện: người duyệt phải khác người lập — ràng buộc riêng của GOV-RULE-01; không suy ra được từ vai trò.<br>Điều kiện: yêu cầu phải còn ở trạng thái chờ duyệt.<br>Điều kiện: phải có loại điều chỉnh và lý do quyết định; ở lối chỉ phần chênh lệch thì hai ô chênh lệch phải hợp lệ và không cùng bằng 0.<br>Điều kiện: nút vô hiệu trong lúc đang gửi để không bấm trùng.<br>Lỗi: tự duyệt yêu cầu của chính mình phải bị từ chối kể cả khi gọi đường ghi trực tiếp; người quyết định sau nhận thông báo yêu cầu đã được xử lý.
- **bbox**: startX=42 startY=1033 endX=100 endY=1062
- **description**:
  - Mục đích và ngữ cảnh: Hành động chính của màn: chấp thuận điều chỉnh và sinh bản ghi đảo ngược hoặc phần chênh lệch thay vì ghi đè lịch sử.
  - Thành phần hiển thị: Nút chữ nền đậm đặt cuối panel quyết định.
  - Chức năng và logic: Duyệt xong thì bản ghi gốc vẫn giữ nguyên; số hiệu lực hiện tại đọc ra bằng cách cộng dồn gốc và các dòng điều chỉnh; phần chênh lệch tiền thưởng xuất hiện ở kỳ tiếp theo theo FR-INC-03.
- **qa**:
  - Duyệt xong mà bước sinh phần chênh lệch tiền thưởng thất bại thì màn báo cho người duyệt như thế nào?
  - Một yêu cầu duyệt xong có phát thông báo cho người lập không?

### Item 4.6: Nút Từ chối

- **itemId**: img-018
- **nameJP**: 却下
- **nameTrans**: Reject button
- **itemType**: button
- **itemSubtype**: nút hành động cảnh báo
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Từ chối yêu cầu: yêu cầu chuyển sang trạng thái bị từ chối; không sinh bản ghi điều chỉnh nào và giao dịch gốc không đổi.
- **databaseTable**: correction_request
- **databaseColumn**: status; approved_by
- **databaseNote**: Chỉ đổi trạng thái yêu cầu; không ghi dòng nào vào bảng điều chỉnh giao dịch.
- **validationNote**: Điều kiện: người từ chối phải khác người lập.<br>Điều kiện: yêu cầu phải còn ở trạng thái chờ duyệt.<br>Điều kiện: phải có lý do quyết định.<br>Lỗi: lý do rỗng thì từ chối thao tác; người quyết định sau nhận thông báo yêu cầu đã được xử lý.
- **bbox**: startX=104 startY=1033 endX=169 endY=1062
- **description**:
  - Mục đích và ngữ cảnh: Nhánh quyết định thứ hai của FR-CORR-02; từ chối cũng là một quyết định phải giải thích được.
  - Thành phần hiển thị: Nút chữ viền đỏ đặt cạnh nút Duyệt.
  - Chức năng và logic: Không sinh bản ghi điều chỉnh; nhưng vẫn đòi lý do quyết định và vẫn vào dấu vết kiểm toán như nhánh duyệt.
- **qa**:
  - Yêu cầu bị từ chối rồi thì người lập gửi lại được yêu cầu mới cho cùng giao dịch không?

### Item 4.7: Ghi chú số tiền chênh lệch không nhập tay

- **itemId**: img-019
- **nameJP**: -
- **nameTrans**: Amount computed server-side note
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
- **databaseTable**: transaction_adjustment
- **databaseColumn**: amount_delta
- **databaseNote**: Cột số tiền chênh lệch tính bằng JPY do hệ thống tự tính từ số lượng và đơn giá gốc đọc lại tại thời điểm duyệt; không nhận giá trị từ người dùng.
- **validationNote**: -
- **bbox**: startX=42 startY=1071 endX=1010 endY=1087
- **description**:
  - Mục đích và ngữ cảnh: Chốt một bất biến về tiền: người duyệt không đặt được số tiền tuỳ ý; số tiền luôn suy ra từ số gốc và phần chênh lệch.
  - Thành phần hiển thị: Một đoạn chữ nhỏ cuối panel quyết định.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc áp lên hai ô chênh lệch và lên nút Duyệt.
- **qa**:
  - -

### Item 5: Khối kết quả sau khi duyệt

- **itemId**: img-020
- **nameJP**: -
- **nameTrans**: Post-approval result block
- **itemType**: others
- **itemSubtype**: khối bảng bốn cột
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction; transaction_adjustment
- **databaseColumn**: qty; unit_price; qty_delta; unit_price_delta
- **databaseNote**: Số hiệu lực hiện tại là giá trị dẫn xuất bằng cách cộng dồn bản ghi gốc và các dòng điều chỉnh; không có cột nào lưu sẵn giá trị này.
- **validationNote**: -
- **bbox**: startX=26 startY=1127 endX=1026 endY=1331
- **description**:
  - Mục đích và ngữ cảnh: Vẽ rõ hình dạng dữ liệu sau khi duyệt để không ai cài thành ghi đè: ba dòng gồm gốc · dòng điều chỉnh và số hiệu lực hiện tại.
  - Thành phần hiển thị: Tiêu đề khối dẫn FR-CORR-02; bảng bốn cột ba dòng; một đoạn ghi chú về lối đảo ngược toàn bộ.
  - Chức năng và logic: Chỉ đọc; nội dung là đặc tả kết quả của nút Duyệt.
- **qa**:
  - -

### Item 5.1: Bảng ba dòng gốc và điều chỉnh và số hiệu lực

- **itemId**: img-021
- **nameJP**: -
- **nameTrans**: Original versus adjustment table
- **itemType**: table
- **itemSubtype**: bảng bốn cột
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
- **bbox**: startX=42 startY=1171 endX=1010 endY=1285
- **description**:
  - Mục đích và ngữ cảnh: Trả lời dứt điểm câu hỏi sau khi duyệt thì số nào là số đúng; và khẳng định báo cáo kỳ đã chốt vẫn ra đúng số cũ.
  - Thành phần hiển thị: Bốn cột; ba dòng: giao dịch gốc giữ nguyên 120.00 và 1 850 JPY; dòng điều chỉnh mang -12.00 và 0; số hiệu lực hiện tại 108.00 và 1 850 JPY.
  - Chức năng và logic: Chỉ đọc; số hiệu lực hiện tại đọc ra bằng cách CỘNG DỒN chứ không phải một giá trị bị ghi đè; báo cáo của kỳ đã chốt vẫn dùng số gốc.
- **qa**:
  - Số hiệu lực hiện tại hiện ở những màn nào; và màn giao dịch SC-12 có hiện cả hai số gốc và số hiệu lực không?
  - Một giao dịch có nhiều dòng điều chỉnh thì bảng này hiện đủ mọi dòng hay chỉ dòng mới nhất?

### Item 5.2: Ghi chú lối đảo ngược toàn bộ

- **itemId**: img-022
- **nameJP**: -
- **nameTrans**: Full reverse mechanism note
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
- **bbox**: startX=42 startY=1288 endX=1010 endY=1305
- **description**:
  - Mục đích và ngữ cảnh: Chặn cách cài sai thẳng thắn nhất: dùng lệnh xoá cho lối đảo ngược toàn bộ.
  - Thành phần hiển thị: Một đoạn chữ nhỏ dưới bảng kết quả.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc áp lên lựa chọn đảo ngược toàn bộ của ô Loại điều chỉnh.
- **qa**:
  - -

### Item 6: Khối maker-checker khi bạn là người lập

- **itemId**: img-023
- **nameJP**: -
- **nameTrans**: Maker-checker self-approval block
- **itemType**: others
- **itemSubtype**: khối minh hoạ trạng thái
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
- **databaseColumn**: requested_by; approved_by
- **databaseNote**: So người lập với người đang thao tác. Sắc thái: điều kiện người duyệt khác người lập KHÔNG có ràng buộc ở tầng cơ sở dữ liệu mà chỉ được so ở tầng ứng dụng.
- **validationNote**: -
- **bbox**: startX=26 startY=1344 endX=1026 endY=1506
- **description**:
  - Mục đích và ngữ cảnh: Vẽ rõ trường hợp người xem chính là người lập; đây là ràng buộc riêng của GOV-RULE-01 và là chỗ dễ cài thành chỉ ẩn nút.
  - Thành phần hiển thị: Khối viền nét đứt tiêu đề dẫn GOV-RULE-01; một đoạn khẳng định không phê duyệt được yêu cầu do chính mình tạo; hai nút Duyệt và Từ chối ở trạng thái vô hiệu; một đoạn ghi chú về chỗ chặn thật.
  - Chức năng và logic: Panel quyết định không hiện và hai nút không tồn tại; nhưng chặn thật phải nằm ở phía hệ thống.
- **qa**:
  - -

### Item 6.1: Nút Duyệt ở trạng thái vô hiệu

- **itemId**: img-024
- **nameJP**: 承認（無効状態）
- **nameTrans**: Approve button - disabled state
- **itemType**: button
- **itemSubtype**: nút hành động vô hiệu
- **buttonType**: text_only
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
- **validationNote**: Điều kiện: người xem chính là người lập thì nút ở trạng thái vô hiệu và panel quyết định không render.<br>Lỗi: gọi đường ghi trực tiếp phải bị phía hệ thống từ chối vì tự phê duyệt.
- **bbox**: startX=42 startY=1415 endX=100 endY=1444
- **description**:
  - Mục đích và ngữ cảnh: Minh hoạ trạng thái vô hiệu của nút Duyệt khi người xem là người lập.
  - Thành phần hiển thị: Nút chữ mờ trong khối minh hoạ maker-checker.
  - Chức năng và logic: Là biến thể trạng thái của cùng một nút; ẩn nút chỉ là gợi ý trình bày chứ không phải hàng rào.
- **qa**:
  - -

### Item 6.2: Nút Từ chối ở trạng thái vô hiệu

- **itemId**: img-025
- **nameJP**: 却下（無効状態）
- **nameTrans**: Reject button - disabled state
- **itemType**: button
- **itemSubtype**: nút hành động vô hiệu
- **buttonType**: text_only
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
- **validationNote**: Điều kiện: người xem chính là người lập thì nút ở trạng thái vô hiệu.<br>Lỗi: gọi đường ghi trực tiếp phải bị phía hệ thống từ chối vì tự quyết định yêu cầu của chính mình.
- **bbox**: startX=104 startY=1415 endX=169 endY=1444
- **description**:
  - Mục đích và ngữ cảnh: Minh hoạ trạng thái vô hiệu của nút Từ chối khi người xem là người lập.
  - Thành phần hiển thị: Nút chữ mờ đặt cạnh nút Duyệt vô hiệu.
  - Chức năng và logic: Ràng buộc maker-checker áp cho cả hai nhánh quyết định chứ không chỉ nhánh duyệt.
- **qa**:
  - Người lập có được tự từ chối yêu cầu của mình như một cách thu hồi không; hay đó phải là một đường thu hồi riêng?

### Item 6.3: Ghi chú chặn thật nằm ở phía hệ thống

- **itemId**: img-026
- **nameJP**: -
- **nameTrans**: Server-side enforcement note
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
- **bbox**: startX=42 startY=1447 endX=1010 endY=1480
- **description**:
  - Mục đích và ngữ cảnh: Nói thẳng maker-checker là ràng buộc kiến trúc chứ không phải quy tắc trình bày; và nói rõ nó không suy ra được từ vai trò.
  - Thành phần hiển thị: Một đoạn chữ nhỏ cuối khối; các cụm chỉ là gợi ý trình bày và không suy ra được từ vai trò in đậm.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc áp lên hai nút quyết định và lên panel quyết định. Người lập và người duyệt cùng thuộc bộ phận quyết toán nên phân quyền theo vai trò không thay được ràng buộc này.
- **qa**:
  - -

### Item 7: Khối trạng thái màn

- **itemId**: img-027
- **nameJP**: -
- **nameTrans**: Screen states block
- **itemType**: others
- **itemSubtype**: khối mười một thẻ trạng thái
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
- **bbox**: startX=26 startY=1519 endX=1026 endY=1874
- **description**:
  - Mục đích và ngữ cảnh: Liệt kê các trạng thái màn phải xử lý được; ba thẻ về maker-checker · rỗng do lọc và kỳ đã chốt là ba chỗ dễ bỏ sót.
  - Thành phần hiển thị: Mười một thẻ xếp ba hàng; mỗi thẻ có tiêu đề trạng thái và một đoạn mô tả hành vi mong đợi.
  - Chức năng và logic: Chỉ trình bày; nội dung là đặc tả hành vi cho bảng danh sách và panel quyết định.
- **qa**:
  - -

### Item 7.1: Thẻ trạng thái Rỗng

- **itemId**: img-028
- **nameJP**: -
- **nameTrans**: Empty state card
- **itemType**: label
- **itemSubtype**: thẻ trạng thái
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
- **bbox**: startX=42 startY=1563 endX=277 endY=1655
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái hết việc; vẫn phải chỉ đường sang màn tạo yêu cầu.
  - Thành phần hiển thị: Thẻ tiêu đề Rỗng và một đoạn mô tả nêu câu thông báo cụ thể.
  - Chức năng và logic: Kèm liên kết sang SC-20 để người dùng không phải tự tìm đường.
- **qa**:
  - -

### Item 7.2: Thẻ trạng thái Rỗng do lọc

- **itemId**: img-029
- **nameJP**: -
- **nameTrans**: Empty-by-filter state card
- **itemType**: label
- **itemSubtype**: thẻ trạng thái
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
- **bbox**: startX=286 startY=1563 endX=522 endY=1655
- **description**:
  - Mục đích và ngữ cảnh: Phân biệt hai trạng thái rỗng khác nhau về bản chất; gộp chúng lại làm người duyệt tưởng đã hết việc.
  - Thành phần hiển thị: Thẻ tiêu đề Rỗng do lọc và một đoạn mô tả ngắn.
  - Chức năng và logic: Thông báo phải nói rõ là do bộ lọc và gợi ý bỏ lọc; khác hẳn thông báo chưa có yêu cầu nào.
- **qa**:
  - -

### Item 7.3: Thẻ trạng thái Đang tải và lỗi tải

- **itemId**: img-030
- **nameJP**: -
- **nameTrans**: Loading and load-error state card
- **itemType**: label
- **itemSubtype**: thẻ trạng thái
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
- **bbox**: startX=531 startY=1563 endX=766 endY=1655
- **description**:
  - Mục đích và ngữ cảnh: Gom hai trạng thái hạ tầng khi nạp danh sách.
  - Thành phần hiển thị: Thẻ tiêu đề Đang tải / lỗi tải và một đoạn mô tả ngắn.
  - Chức năng và logic: Khung trang hiện trước rồi dữ liệu vào sau; lỗi truy vấn thì báo kèm nút tải lại.
- **qa**:
  - -
