# Items Analysis - scr019-correction-request

## Screen context

- source: `.momorph/shots/SC-20-tao-yeu-cau-dieu-chinh.png` (image mode, 1280x1999 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-08 · Feature List FE-028 · RFP FR-CORR-01 (ràng buộc kèm FR-CORR-03; BR-CLOSE-01; FR-AUDIT-01)
- batch: 3/3

### Item 7.9: Thẻ trạng thái Gửi lỗi

- **itemId**: img-031
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
- **bbox**: startX=42 startY=1438 endX=277 endY=1530
- **description**:
  - Mục đích và ngữ cảnh: Chốt yêu cầu về chất lượng thông báo lỗi: gom mọi lỗi vào một câu thì người dùng không biết sửa gì.
  - Thành phần hiển thị: Thẻ tiêu đề Gửi lỗi và một đoạn mô tả liệt bốn nhóm lý do.
  - Chức năng và logic: Mỗi nhóm lý do có một thông báo riêng chỉ đúng trường chưa đạt.
- **qa**:
  - Bốn thông báo lỗi này cần bản tiếng Nhật tương ứng; nội dung từng câu do ai chốt?

### Item 7.10: Thẻ trạng thái Đã gửi

- **itemId**: img-032
- **nameJP**: -
- **nameTrans**: Submitted state card
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
- **bbox**: startX=286 startY=1438 endX=522 endY=1530
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái kết thúc luồng tạo; form đóng lại để không gửi thêm một yêu cầu trùng.
  - Thành phần hiển thị: Thẻ tiêu đề Đã gửi và một đoạn mô tả nêu câu thông báo cụ thể.
  - Chức năng và logic: Form bị thay thế bằng thông báo; muốn gửi yêu cầu khác thì tra mã lại từ đầu.
- **qa**:
  - -

### Item 8: Dải câu hỏi chưa chốt

- **itemId**: img-033
- **nameJP**: -
- **nameTrans**: Open questions banner
- **itemType**: label
- **itemSubtype**: dải cảnh báo cuối màn
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
- **bbox**: startX=26 startY=1559 endX=1026 endY=1613
- **description**:
  - Mục đích và ngữ cảnh: Khai hai chỗ yêu cầu khách hàng chưa nói và hệ quả của từng chỗ; đây là hai câu hỏi phải trả lời trước khi cài.
  - Thành phần hiển thị: Dải chữ nhỏ nền vàng nhạt viền nét đứt; nhãn [CHƯA CHỐT] in đậm và hai câu hỏi được đánh số.
  - Chức năng và logic: Chỉ trình bày; nội dung là hai ràng buộc còn thiếu ảnh hưởng tới nút gửi và tới ô chọn tệp.
- **qa**:
  - Một giao dịch được phép có bao nhiêu yêu cầu chờ duyệt cùng lúc; nếu nhiều thì SC-21 cần cách gộp.
  - Ngưỡng định dạng và dung lượng tệp bằng chứng là quy tắc của khách chứ không phải lựa chọn kỹ thuật.

### Item 9: Khối đối chiếu prototype

- **itemId**: img-034
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
- **bbox**: startX=26 startY=1629 endX=1026 endY=1915
- **description**:
  - Mục đích và ngữ cảnh: Khối chú thích tài liệu; không phải thành phần của sản phẩm. Nó đặt cạnh nhau điều thiết kế đòi và điều bản thi công hiện làm.
  - Thành phần hiển thị: Khối viền nét đứt tiêu đề ĐỐI CHIẾU PROTOTYPE chứa bảng ba cột năm dòng; cột Mức phân loại Khớp · Chưa đạt · Chưa chốt · Hở.
  - Chức năng và logic: Chỉ đọc; không có thao tác nào và không tham gia luồng nghiệp vụ của màn.
- **qa**:
  - -

### Item 10: Chân ghi chú phân quyền và tệp bằng chứng

- **itemId**: img-035
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
- **bbox**: startX=26 startY=1930 endX=1026 endY=1977
- **description**:
  - Mục đích và ngữ cảnh: Chốt hai ranh giới của màn: quyền vào màn và quyền đọc tệp bằng chứng; tệp bằng chứng là chỗ duy nhất trong nhóm này chặn cả đường đọc.
  - Thành phần hiển thị: Hai đoạn chữ nhỏ cuối màn: đoạn phân quyền và một liên kết sang bản đặc tả as-built của màn.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc phân quyền áp lên nút gửi và lên ô chọn tệp.
- **qa**:
  - Người duyệt ở SC-21 và người lập ở SC-20 cùng thuộc bộ phận quyết toán; ranh giới giữa hai vai này là ràng buộc maker-checker chứ không phải vai trò khác nhau. Khách có cần tách thành hai vai riêng không?
