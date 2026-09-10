# Items Analysis - dispute-management

## Screen context

- source: `.momorph/shots/SC-19-quan-ly-tranh-chap.png` (image mode, 1280x2370 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-07 · Feature List FE-027 · RFP FR-SETTLE-03; RPT-09; FR-NOTIFY-01; FR-CORR-02; TBL-ATTACH-01; DR-IMAGE-01
- batch: 3/3

### Item 5.13: Nút Tạo yêu cầu điều chỉnh

- **itemId**: img-031
- **nameJP**: 修正依頼を作成
- **nameTrans**: Create correction request button
- **itemType**: button
- **itemSubtype**: nút phụ dẫn sang màn khác
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Chuyển sang màn tạo yêu cầu điều chỉnh SC-20 kèm ngữ cảnh chứng từ nguồn; tranh chấp vẫn ở trạng thái hiện tại và không tự đóng.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=248 startY=1357 endX=433 endY=1386
- **description**:
  - Mục đích và ngữ cảnh: Bắc từ nhánh tranh chấp sang nhánh điều chỉnh sau lock khi kết luận là phải sửa số.
  - Thành phần hiển thị: Nút chữ trung tính cuối hàng ba nút; nhãn nêu rõ màn đích SC-20.
  - Chức năng và logic: Tranh chấp có thể dẫn tới một yêu cầu điều chỉnh nhưng không thay thế nó; sửa số vẫn phải qua maker-checker của nhóm FN-08.
- **qa**:
  - Yêu cầu điều chỉnh sinh từ đây có lưu liên kết ngược về tranh chấp để RPT-09 và RPT-08 khớp nhau không?
  - Nút này có bị vô hiệu khi ngày nghiệp vụ của chứng từ nguồn còn chưa lock không; SC-20 chỉ nhận ngày đã lock.

### Item 5.14: Ghi chú hai luồng khác nhau

- **itemId**: img-032
- **nameJP**: -
- **nameTrans**: Two distinct flows note
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
- **bbox**: startX=42 startY=1389 endX=1010 endY=1405
- **description**:
  - Mục đích và ngữ cảnh: Chặn một cách hiểu sai thường gặp: gộp tranh chấp vào yêu cầu điều chỉnh sẽ mất phần theo dõi tồn đọng và làm hỏng maker-checker.
  - Thành phần hiển thị: Một đoạn chữ nhỏ cuối khối 3; cụm hai luồng khác nhau in đậm.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc kiến trúc áp lên hạng mục nút Tạo yêu cầu điều chỉnh.
- **qa**:
  - -

### Item 6: Khối 4 — lịch sử cập nhật chỉ thêm

- **itemId**: img-033
- **nameJP**: -
- **nameTrans**: Append-only update history block
- **itemType**: others
- **itemSubtype**: khối bảng năm cột
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
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: -
- **bbox**: startX=26 startY=1445 endX=1026 endY=1620
- **description**:
  - Mục đích và ngữ cảnh: Thoả phần nghiệm thu FR-SETTLE-03 đòi lịch sử cập nhật; là chỗ giữ dấu vết ai đổi gì và lúc nào.
  - Thành phần hiển thị: Khối viền nét đứt tiêu đề nêu append-only; bên dưới là bảng năm cột hai dòng mẫu và một đoạn ghi chú nguyên tắc.
  - Chức năng và logic: Chỉ đọc; mỗi lần đổi trạng thái ở khối 3 sinh một dòng mới ở đây.
- **qa**:
  - -

### Item 6.1: Bảng lịch sử cập nhật năm cột

- **itemId**: img-034
- **nameJP**: 状態変更履歴
- **nameTrans**: Update history table
- **itemType**: table
- **itemSubtype**: bảng năm cột
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
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn. Thiết kế đòi đây là một bảng con chỉ thêm chứ không phải một cột ghi chú.
- **validationNote**: -
- **bbox**: startX=42 startY=1489 endX=1010 endY=1575
- **description**:
  - Mục đích và ngữ cảnh: Trả lời câu hỏi tranh chấp này đã đi qua những bước nào và ai chịu trách nhiệm từng bước.
  - Thành phần hiển thị: Năm cột Thời điểm · Từ trạng thái · Đến trạng thái · Ghi chú · Người ghi; hai dòng mẫu xếp mới nhất trước; dòng mở tranh chấp có cột Từ trạng thái là dấu gạch.
  - Chức năng và logic: Chỉ thêm dòng; không sửa và không xoá dòng cũ theo cùng nguyên tắc bảo toàn lịch sử của FR-CORR-02.
- **qa**:
  - Ghi chú cho mỗi dòng lịch sử là bắt buộc hay tuỳ chọn?
  - Lịch sử có ghi cả lần đổi người phụ trách và lần đổi ngày dự kiến hay chỉ ghi lần đổi trạng thái?

### Item 6.2: Ghi chú nguyên tắc chỉ thêm

- **itemId**: img-035
- **nameJP**: -
- **nameTrans**: Append-only principle note
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
- **bbox**: startX=42 startY=1578 endX=1010 endY=1594
- **description**:
  - Mục đích và ngữ cảnh: Nêu rõ nguyên tắc bảo toàn lịch sử của bảng và dẫn nguồn nguyên tắc đó về FR-CORR-02.
  - Thành phần hiển thị: Một đoạn chữ nhỏ dưới bảng lịch sử.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc áp lên hạng mục bảng lịch sử cập nhật.
- **qa**:
  - -

### Item 7: Khối 5 — trạng thái màn

- **itemId**: img-036
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
- **bbox**: startX=26 startY=1633 endX=1026 endY=1887
- **description**:
  - Mục đích và ngữ cảnh: Liệt kê các trạng thái màn phải xử lý được; thẻ về ngày nghiệp vụ đã lock là thẻ dễ cài ngược nhất.
  - Thành phần hiển thị: Sáu thẻ xếp hai hàng; mỗi thẻ có tiêu đề trạng thái và một đoạn mô tả hành vi mong đợi.
  - Chức năng và logic: Chỉ trình bày; nội dung là đặc tả hành vi cho khối danh sách và khối chi tiết.
- **qa**:
  - -

### Item 7.1: Thẻ trạng thái Rỗng

- **itemId**: img-037
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
- **bbox**: startX=42 startY=1677 endX=277 endY=1770
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái tốt của màn: không còn việc tồn đọng. Vẫn phải mở được tranh chấp mới.
  - Thành phần hiển thị: Thẻ tiêu đề Rỗng và một đoạn mô tả nêu câu thông báo cụ thể.
  - Chức năng và logic: Nút Mở tranh chấp mới vẫn khả dụng; màn không có dữ liệu tiền đề nào.
- **qa**:
  - -

### Item 7.2: Thẻ trạng thái Quá hạn dự kiến

- **itemId**: img-038
- **nameJP**: -
- **nameTrans**: Overdue state card
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
- **bbox**: startX=286 startY=1677 endX=522 endY=1770
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái đáng chú ý nhất của một hàng đợi việc; là thứ báo cáo RPT-09 và thông báo vận hành cần.
  - Thành phần hiển thị: Thẻ tiêu đề Quá hạn dự kiến và một đoạn mô tả ngắn.
  - Chức năng và logic: Điều kiện là ngày dự kiến đã qua mà tranh chấp chưa đóng; hệ quả là nhãn cảnh báo trên dòng và một event thông báo thuộc phạm vi FR-NOTIFY-01.
- **qa**:
  - Thông báo quá hạn gửi cho ai và gửi mấy lần; FR-NOTIFY-03 cho cấu hình người nhận và thời điểm gửi.

### Item 7.3: Thẻ trạng thái Đã đóng

- **itemId**: img-039
- **nameJP**: -
- **nameTrans**: Closed state card
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
- **bbox**: startX=531 startY=1677 endX=766 endY=1770
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái kết thúc; khai luôn một câu hỏi chưa được yêu cầu khách hàng trả lời.
  - Thành phần hiển thị: Thẻ tiêu đề Đã đóng và một đoạn mô tả ngắn.
  - Chức năng và logic: Khối chi tiết về chế độ chỉ đọc; kết quả cuối cùng và toàn bộ lịch sử vẫn hiện đủ.
- **qa**:
  - Tranh chấp đã đóng có mở lại được không; nếu có thì ai được mở lại.

### Item 7.4: Thẻ trạng thái Ngày nghiệp vụ đã lock

- **itemId**: img-040
- **nameJP**: -
- **nameTrans**: Locked business date state card
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
- **databaseNote**: Bảng tranh chấp và bảng lịch sử cập nhật KHÔNG mang tầng chặn ghi theo ngày lock; đây là quyết định thiết kế cần khai rõ để không cài ngược.
- **validationNote**: -
- **bbox**: startX=775 startY=1677 endX=1010 endY=1770
- **description**:
  - Mục đích và ngữ cảnh: Chặn một cách cài sai nghiêm trọng: áp tầng chặn ghi sau lock lên bản ghi tranh chấp sẽ làm màn vô dụng đúng lúc cần nhất.
  - Thành phần hiển thị: Thẻ tiêu đề Ngày nghiệp vụ đã lock; cụm Vẫn ghi được in đậm.
  - Chức năng và logic: Bản ghi tranh chấp nói VỀ một ngày nghiệp vụ chứ không phải bản ghi CỦA ngày đó nên không chịu tầng chặn ghi theo ngày lock; cùng lối với bảng yêu cầu điều chỉnh.
- **qa**:
  - -

### Item 7.5: Thẻ trạng thái Hai người đóng cùng lúc

- **itemId**: img-041
- **nameJP**: -
- **nameTrans**: Concurrent close state card
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
- **bbox**: startX=42 startY=1779 endX=277 endY=1871
- **description**:
  - Mục đích và ngữ cảnh: Xử lý tranh chấp đồng thời trên hành động đóng; ghi đè kết luận của người khác là mất kết luận nghiệp vụ.
  - Thành phần hiển thị: Thẻ tiêu đề Hai người đóng cùng lúc và một đoạn mô tả ngắn.
  - Chức năng và logic: Chỉ một kết quả được ghi; người đóng sau nhận thông báo trạng thái đã đổi.
- **qa**:
  - -

### Item 7.6: Thẻ trạng thái Đang tải · Lỗi tải · Không có quyền

- **itemId**: img-042
- **nameJP**: -
- **nameTrans**: Loading error and forbidden state card
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
- **bbox**: startX=286 startY=1779 endX=522 endY=1871
- **description**:
  - Mục đích và ngữ cảnh: Gom ba trạng thái hạ tầng của màn và khai luôn ranh giới đọc.
  - Thành phần hiển thị: Thẻ tiêu đề gộp ba trạng thái và một đoạn mô tả ngắn.
  - Chức năng và logic: Đang tải hiện khung bảng trước; lỗi tải kèm nút thử lại; quyền đọc mở cho vai đối chiếu và cho người được gán phụ trách.
- **qa**:
  - Người được gán phụ trách thuộc vai khác bộ phận đối chiếu thì vào được màn ở mức nào; chỉ xem việc của mình hay xem cả danh sách?

### Item 8: Khối đối chiếu prototype

- **itemId**: img-043
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
- **bbox**: startX=26 startY=1900 endX=1026 endY=2268
- **description**:
  - Mục đích và ngữ cảnh: Khối chú thích tài liệu; không phải thành phần của sản phẩm. Nó đặt cạnh nhau điều thiết kế đòi và điều bản thi công hiện có để thấy khoảng trống.
  - Thành phần hiển thị: Khối viền nét đứt tiêu đề ĐỐI CHIẾU PROTOTYPE chứa bảng ba cột sáu dòng; cột Mức phân loại khác không chủ đích và cần khách chốt.
  - Chức năng và logic: Chỉ đọc; không có thao tác nào và không tham gia luồng nghiệp vụ của màn.
- **qa**:
  - -

### Item 9: Chân ghi chú phân quyền và phụ thuộc

- **itemId**: img-044
- **nameJP**: -
- **nameTrans**: Permission and dependency footnote
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
- **bbox**: startX=26 startY=2283 endX=1026 endY=2348
- **description**:
  - Mục đích và ngữ cảnh: Khai ranh giới phân quyền còn là đề xuất và liệt các màn phụ thuộc hai chiều của màn này.
  - Thành phần hiển thị: Ba đoạn chữ nhỏ cuối màn: đoạn phân quyền đề xuất; đoạn phụ thuộc nêu SC-18 · SC-20 · SC-21 · RPT-09 · SC-28; và một liên kết sang bản đặc tả của màn.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc phân quyền áp lên các hạng mục nút của khối 3 và là bản đồ phụ thuộc dữ liệu.
- **qa**:
  - Ranh giới mở · cập nhật · đóng chưa được yêu cầu khách hàng chốt; ba mức quyền này do khách quyết định.
