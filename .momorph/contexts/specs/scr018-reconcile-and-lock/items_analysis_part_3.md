# Items Analysis - scr018-reconcile-and-lock

## Screen context

- source: `.momorph/shots/SC-18-bang-doi-chieu-ngay-va-lock-ky.png` (image mode, 1280x2517 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-07/FN-06 · Feature List FE-024/FE-025/FE-026 · RFP FR-SETTLE-01, FR-SETTLE-02, FR-CORR-03, FR-DEL-04, BR-CLOSE-01, FR-AUDIT-01
- batch: 3/3

### Item 7: Khối 6 — trạng thái màn

- **itemId**: img-031
- **nameJP**: -
- **nameTrans**: Screen states block
- **itemType**: others
- **itemSubtype**: khối sáu thẻ trạng thái
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
- **bbox**: startX=26 startY=1575 endX=1026 endY=1862
- **description**:
  - Mục đích và ngữ cảnh: Liệt kê các trạng thái màn phải xử lý được; ba trong sáu thẻ mô tả tình huống có thể làm hỏng số chốt nếu bỏ qua.
  - Thành phần hiển thị: Sáu thẻ xếp hai hàng; mỗi thẻ có tiêu đề trạng thái và một đoạn mô tả hành vi mong đợi.
  - Chức năng và logic: Chỉ trình bày; nội dung là đặc tả hành vi cho các hạng mục nút lock · bảng đối chiếu và khối 1.
- **qa**:
  - -

### Item 7.1: Thẻ trạng thái Chưa lock có dữ liệu

- **itemId**: img-032
- **nameJP**: -
- **nameTrans**: Unlocked with data state card
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
- **bbox**: startX=42 startY=1619 endX=277 endY=1711
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái làm việc bình thường của màn trước khi chốt kỳ.
  - Thành phần hiển thị: Thẻ tiêu đề Chưa lock; có dữ liệu và một đoạn mô tả ngắn.
  - Chức năng và logic: Hiện bảng đầy đủ cùng nút lock cho đúng vai; ba thao tác khả dụng là đổi ngày · truy vết và lock.
- **qa**:
  - -

### Item 7.2: Thẻ trạng thái Chưa lock rỗng

- **itemId**: img-033
- **nameJP**: -
- **nameTrans**: Unlocked empty state card
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
- **bbox**: startX=286 startY=1619 endX=522 endY=1711
- **description**:
  - Mục đích và ngữ cảnh: Bắt một cái bẫy thật: khoá một ngày không có dữ liệu là khoá vĩnh viễn một ngày trắng vì không có đường mở lock.
  - Thành phần hiển thị: Thẻ tiêu đề Chưa lock; rỗng và một đoạn mô tả nêu yêu cầu cảnh báo riêng.
  - Chức năng và logic: Vẫn cho lock nhưng phải có cảnh báo riêng trước khi cho lock; nội dung cảnh báo khác với hộp xác nhận thường.
- **qa**:
  - Cảnh báo trước khi lock một ngày trắng là một dòng thêm trong hộp xác nhận hay một bước xác nhận thứ hai?

### Item 7.3: Thẻ trạng thái Đã lock chỉ đọc

- **itemId**: img-034
- **nameJP**: -
- **nameTrans**: Locked read-only state card
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
- **bbox**: startX=531 startY=1619 endX=766 endY=1711
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái sau khi chốt kỳ; khẳng định lock chặn ghi chứ không chặn đọc.
  - Thành phần hiển thị: Thẻ tiêu đề Đã lock — chỉ đọc và một đoạn mô tả ngắn.
  - Chức năng và logic: Nút lock biến mất; bảng đối chiếu vẫn hiện đủ kèm thời điểm và người lock; mọi nhu cầu sửa được chỉ đường sang màn tạo yêu cầu điều chỉnh SC-20.
- **qa**:
  - -

### Item 7.4: Thẻ trạng thái Đang gửi và Gửi lỗi

- **itemId**: img-035
- **nameJP**: -
- **nameTrans**: Submitting and submit-error state card
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
- **bbox**: startX=775 startY=1619 endX=1010 endY=1711
- **description**:
  - Mục đích và ngữ cảnh: Chốt hai hành vi khi gửi lệnh lock: chống gửi trùng và không gom mọi lỗi vào một câu.
  - Thành phần hiển thị: Thẻ tiêu đề Đang gửi · Gửi lỗi và một đoạn mô tả liệt kê bốn nhóm lý do lỗi.
  - Chức năng và logic: Nút vô hiệu trong lúc gửi; thông báo lỗi phải phân biệt được bốn lý do vì mỗi lý do có cách xử lý khác nhau.
- **qa**:
  - Bốn nhóm lý do lỗi này cần bốn câu thông báo riêng ở cả tiếng Việt và tiếng Nhật; nội dung từng câu do ai chốt?

### Item 7.5: Thẻ trạng thái Hai người lock cùng lúc

- **itemId**: img-036
- **nameJP**: -
- **nameTrans**: Concurrent lock state card
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
- **bbox**: startX=42 startY=1720 endX=277 endY=1846
- **description**:
  - Mục đích và ngữ cảnh: Xử lý tranh chấp đồng thời trên một hành động một chiều; hai kỳ chốt cho cùng một ngày là hỏng dữ liệu.
  - Thành phần hiển thị: Thẻ tiêu đề Hai người lock cùng lúc và một đoạn mô tả ngắn.
  - Chức năng và logic: Chỉ một lần lock có hiệu lực; người sau nhận thông báo ngày đã được lock và hệ thống không tạo kỳ thứ hai.
- **qa**:
  - -

### Item 7.6: Thẻ trạng thái Khung giờ chốt

- **itemId**: img-037
- **nameJP**: -
- **nameTrans**: Closing time window state card
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
- **bbox**: startX=286 startY=1720 endX=522 endY=1846
- **description**:
  - Mục đích và ngữ cảnh: Ghi nhận ràng buộc vận hành về khung giờ chốt kỳ và nói rõ nó chưa được quyết thành ràng buộc kỹ thuật.
  - Thành phần hiển thị: Thẻ tiêu đề Khung giờ chốt 08:00–10:00 và một đoạn mô tả nêu câu hỏi còn mở.
  - Chức năng và logic: Cùng một màn phục vụ hai chế độ theo giờ: đối chiếu tạm ở đoạn sớm và chốt ở đoạn 08:00–10:00; việc biến khung giờ thành ràng buộc kỹ thuật hay không là câu hỏi còn mở.
- **qa**:
  - Khung giờ 08:00–10:00 có phải chặn cứng nút lock ngoài giờ không; hay chỉ cảnh báo và vẫn cho lock?

### Item 8: Khối đối chiếu prototype

- **itemId**: img-038
- **nameJP**: -
- **nameTrans**: Design versus prototype comparison block
- **itemType**: table
- **itemSubtype**: bảng ba cột trong khối chú thích
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
- **bbox**: startX=26 startY=1875 endX=1026 endY=2397
- **description**:
  - Mục đích và ngữ cảnh: Khối chú thích tài liệu; không phải thành phần của sản phẩm. Nó đặt cạnh nhau điều thiết kế đòi và điều bản thi công hiện làm để người đọc thấy khoảng lệch.
  - Thành phần hiển thị: Khối viền nét đứt tiêu đề ĐỐI CHIẾU PROTOTYPE chứa bảng ba cột bảy dòng; cột Mức phân loại khác có chủ đích · khác không chủ đích · cần khách chốt.
  - Chức năng và logic: Chỉ đọc; không có thao tác nào và không tham gia luồng nghiệp vụ của màn.
- **qa**:
  - -

### Item 9: Chân ghi chú phân quyền và tính một chiều của lock

- **itemId**: img-039
- **nameJP**: -
- **nameTrans**: Permission and one-way lock footnote
- **itemType**: label
- **itemSubtype**: chân trang chú thích
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
- **bbox**: startX=26 startY=2412 endX=1026 endY=2495
- **description**:
  - Mục đích và ngữ cảnh: Chốt hai điều dễ cài sai của màn: ranh giới phân quyền tách đọc khỏi ghi; và lock không có đường lùi ở bất kỳ tầng nào.
  - Thành phần hiển thị: Ba đoạn chữ nhỏ cuối màn: đoạn phân quyền; đoạn về tính một chiều của lock; và một liên kết sang bản đặc tả as-built của màn.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc phân quyền áp lên hạng mục nút lock và là lý do bước xác nhận phải được kiểm ở phía hệ thống.
- **qa**:
  - Ngoài bộ phận đối chiếu thì có vai nào cần quyền lock dự phòng khi người phụ trách vắng mặt không?
