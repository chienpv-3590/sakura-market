# Items Analysis - scr020-correction-approval

## Screen context

- source: `.momorph/shots/SC-21-phe-duyet-yeu-cau-dieu-chinh.png` (image mode, 1280x2369 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-08 · Feature List FE-029 · RFP FR-CORR-02 (ràng buộc kèm GOV-RULE-01 maker-checker; FR-AUDIT-01; FR-INC-03)
- batch: 3/3

### Item 7.4: Thẻ trạng thái Không có quyền

- **itemId**: img-031
- **nameJP**: -
- **nameTrans**: Forbidden state card
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
- **bbox**: startX=775 startY=1563 endX=1010 endY=1655
- **description**:
  - Mục đích và ngữ cảnh: Khai ranh giới phân quyền của màn và nói rõ chặn ở cả hai đường: vào màn và gọi đường quyết định.
  - Thành phần hiển thị: Thẻ tiêu đề Không có quyền và một đoạn mô tả ngắn.
  - Chức năng và logic: Chỉ bộ phận quyết toán vào được màn; vai khác cũng không gọi được đường duyệt trực tiếp.
- **qa**:
  - -

### Item 7.5: Thẻ trạng thái Bạn là người lập

- **itemId**: img-032
- **nameJP**: -
- **nameTrans**: Self-made request state card
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
- **bbox**: startX=42 startY=1664 endX=277 endY=1757
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái maker-checker; là thẻ quan trọng nhất của màn vì nó tách quyền ĐỌC khỏi quyền QUYẾT ĐỊNH.
  - Thành phần hiển thị: Thẻ tiêu đề Bạn là người lập và một đoạn mô tả ngắn.
  - Chức năng và logic: Người lập vẫn thấy đủ dữ liệu của yêu cầu mình gửi nhưng không có nút quyết định; và gọi đường ghi trực tiếp vẫn bị phía hệ thống từ chối.
- **qa**:
  - -

### Item 7.6: Thẻ trạng thái Chờ duyệt và được duyệt

- **itemId**: img-033
- **nameJP**: -
- **nameTrans**: Pending and approvable state card
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
- **bbox**: startX=286 startY=1664 endX=522 endY=1757
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái làm việc bình thường của người duyệt.
  - Thành phần hiển thị: Thẻ tiêu đề Chờ duyệt; được duyệt và một đoạn mô tả ngắn.
  - Chức năng và logic: Panel quyết định hiện đủ gồm ô lý do bắt buộc; hai điều kiện hiện panel cùng đúng.
- **qa**:
  - -

### Item 7.7: Thẻ trạng thái Đã xử lý

- **itemId**: img-034
- **nameJP**: -
- **nameTrans**: Already decided state card
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
- **bbox**: startX=531 startY=1664 endX=766 endY=1757
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái sau quyết định; nói rõ lý do quyết định phải hiện lại được chứ không chỉ nằm trong log.
  - Thành phần hiển thị: Thẻ tiêu đề Đã xử lý và một đoạn mô tả ngắn.
  - Chức năng và logic: Panel quyết định không còn; màn hiện nhãn trạng thái · người duyệt và lý do quyết định.
- **qa**:
  - Lý do quyết định hiện trên dòng danh sách hay chỉ trong phần chi tiết của dòng?

### Item 7.8: Thẻ trạng thái Đang gửi

- **itemId**: img-035
- **nameJP**: -
- **nameTrans**: Submitting state card
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
- **bbox**: startX=775 startY=1664 endX=1010 endY=1757
- **description**:
  - Mục đích và ngữ cảnh: Chống bấm trùng trên một quyết định chỉ được ghi một lần.
  - Thành phần hiển thị: Thẻ tiêu đề Đang gửi và một đoạn mô tả ngắn.
  - Chức năng và logic: Cả nút Duyệt và nút Từ chối vô hiệu trong lúc gửi.
- **qa**:
  - -

### Item 7.9: Thẻ trạng thái Gửi lỗi

- **itemId**: img-036
- **nameJP**: -
- **nameTrans**: Submit error state card
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
- **bbox**: startX=42 startY=1766 endX=277 endY=1858
- **description**:
  - Mục đích và ngữ cảnh: Chốt yêu cầu về chất lượng thông báo lỗi cho thao tác quyết định; bốn nguyên nhân có bốn cách xử lý khác nhau.
  - Thành phần hiển thị: Thẻ tiêu đề Gửi lỗi và một đoạn mô tả liệt bốn nguyên nhân.
  - Chức năng và logic: Mỗi nguyên nhân có một thông báo riêng; đặc biệt phân biệt lỗi nhập liệu với việc người khác đã xử lý trước.
- **qa**:
  - Bốn thông báo lỗi này cần bản tiếng Nhật tương ứng; nội dung từng câu do ai chốt?

### Item 7.10: Thẻ trạng thái Hai người duyệt cùng lúc

- **itemId**: img-037
- **nameJP**: -
- **nameTrans**: Concurrent decision state card
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
- **bbox**: startX=286 startY=1766 endX=522 endY=1858
- **description**:
  - Mục đích và ngữ cảnh: Xử lý tranh chấp đồng thời trên một quyết định chỉ ghi được một lần.
  - Thành phần hiển thị: Thẻ tiêu đề Hai người duyệt cùng lúc và một đoạn mô tả ngắn.
  - Chức năng và logic: Chỉ một quyết định được ghi; người thứ hai nhận thông báo yêu cầu đã được xử lý chứ không ghi đè.
- **qa**:
  - -

### Item 7.11: Thẻ trạng thái Kỳ đã chốt

- **itemId**: img-038
- **nameJP**: -
- **nameTrans**: Locked period state card
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
- **databaseNote**: Hai bảng của màn này cố ý KHÔNG mang tầng chặn ghi theo ngày lock; nếu áp tầng đó lên đây thì đường điều chỉnh sau lock mất luôn.
- **validationNote**: -
- **bbox**: startX=531 startY=1766 endX=766 endY=1858
- **description**:
  - Mục đích và ngữ cảnh: Giải thích vì sao màn này ghi được trong khi ngày nghiệp vụ đã lock; đây là chỗ dễ cài thành chặn oan.
  - Thành phần hiển thị: Thẻ tiêu đề Kỳ đã chốt và một đoạn mô tả ngắn.
  - Chức năng và logic: Kỳ đã chốt là điều kiện luôn đúng vì SC-20 chỉ nhận giao dịch của ngày đã chốt; duyệt vẫn ghi được vì ghi bằng bản ghi MỚI chứ không sửa bản ghi cũ.
- **qa**:
  - -

### Item 8: Khối đối chiếu prototype

- **itemId**: img-039
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
- **bbox**: startX=26 startY=1887 endX=1026 endY=2285
- **description**:
  - Mục đích và ngữ cảnh: Khối chú thích tài liệu; không phải thành phần của sản phẩm. Nó đặt cạnh nhau điều thiết kế đòi và điều bản thi công hiện làm.
  - Thành phần hiển thị: Khối viền nét đứt tiêu đề ĐỐI CHIẾU PROTOTYPE chứa bảng ba cột bảy dòng; cột Mức phân loại Chưa đạt · Khớp · Hở.
  - Chức năng và logic: Chỉ đọc; không có thao tác nào và không tham gia luồng nghiệp vụ của màn.
- **qa**:
  - -

### Item 9: Chân ghi chú phân quyền và tệp bằng chứng

- **itemId**: img-040
- **nameJP**: -
- **nameTrans**: Permission and evidence footnote
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
- **bbox**: startX=26 startY=2300 endX=1026 endY=2347
- **description**:
  - Mục đích và ngữ cảnh: Chốt ranh giới phân quyền của màn và nhắc lại rằng ngoại lệ maker-checker nằm bên trong chính vai trò được phép.
  - Thành phần hiển thị: Hai đoạn chữ nhỏ cuối màn: đoạn phân quyền và một liên kết sang bản đặc tả as-built của màn.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc phân quyền áp lên hai nút quyết định và lên cột Bằng chứng.
- **qa**:
  - Khi người lập là người duy nhất còn hoạt động trong bộ phận quyết toán thì yêu cầu treo mãi; có cần đường leo thang cho trường hợp này không?
