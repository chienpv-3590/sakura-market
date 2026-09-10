# Items Analysis - dispute-management

## Screen context

- source: `.momorph/shots/SC-19-quan-ly-tranh-chap.png` (image mode, 1280x2370 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-07 · Feature List FE-027 · RFP FR-SETTLE-03; RPT-09; FR-NOTIFY-01; FR-CORR-02; TBL-ATTACH-01; DR-IMAGE-01
- batch: 2/3

### Item 4.7: Nút Mở tranh chấp mới

- **itemId**: img-016
- **nameJP**: 紛争を新規登録
- **nameTrans**: Open new dispute button
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
- **transitionNote**: Mở khối chi tiết và cập nhật một tranh chấp ở chế độ tạo mới; màn không cần dữ liệu tiền đề nên nút này khả dụng cả khi danh sách rỗng.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: Điều kiện: chỉ bộ phận đối chiếu mở được tranh chấp mới.<br>Lỗi: vai trò khác không thấy nút và cũng không gọi được đường ghi tương ứng.
- **bbox**: startX=91 startY=732 endX=216 endY=761
- **description**:
  - Mục đích và ngữ cảnh: Điểm vào của việc ghi nhận một chênh lệch mới phát hiện; FR-SETTLE-03 lấy chủ thể là bộ phận đối chiếu khi phát hiện chênh lệch.
  - Thành phần hiển thị: Nút chữ nền đậm đặt cạnh nút Lọc.
  - Chức năng và logic: Mở form chi tiết ở chế độ tạo; nguồn phát sinh phải trỏ về một dòng có thật của bảng đối chiếu ngày.
- **qa**:
  - Mở tranh chấp mới là màn riêng hay khối mở ra ngay trong màn danh sách?
  - Một dòng của bảng đối chiếu ngày được phép có nhiều tranh chấp mở cùng lúc không?

### Item 4.8: Ghi chú nguồn tiêu thụ danh sách

- **itemId**: img-017
- **nameJP**: -
- **nameTrans**: Downstream consumer note
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
- **bbox**: startX=42 startY=764 endX=1010 endY=780
- **description**:
  - Mục đích và ngữ cảnh: Nêu hai chỗ tiêu thụ dữ liệu của màn để thấy màn này là điều kiện để báo cáo RPT-09 và thông báo vận hành chạy thật.
  - Thành phần hiển thị: Một đoạn chữ nhỏ dưới bảng; mã RPT-09 và FR-NOTIFY-01 in đậm.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc phạm vi dữ liệu áp lên hạng mục bảng danh sách.
- **qa**:
  - -

### Item 5: Khối 3 — chi tiết và cập nhật một tranh chấp

- **itemId**: img-018
- **nameJP**: -
- **nameTrans**: Dispute detail and update block
- **itemType**: others
- **itemSubtype**: khối form nhiều trường
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
- **bbox**: startX=26 startY=819 endX=1026 endY=1432
- **description**:
  - Mục đích và ngữ cảnh: Nơi ghi và cập nhật đủ các trường FR-SETTLE-03 đòi cho một tranh chấp; cũng là nơi đóng tranh chấp và là nơi bắc sang đường điều chỉnh sau lock.
  - Thành phần hiển thị: Khối viền nét đứt gồm bốn ô ngang ở hàng đầu; ô nguyên nhân dạng vùng văn bản; ba ô ngang ở hàng thứ hai; ô kết quả cuối cùng; ô chọn tệp bằng chứng; ba nút hành động và một đoạn ghi chú phân biệt hai luồng.
  - Chức năng và logic: Ghi được kể cả khi ngày nghiệp vụ đã lock vì bản ghi tranh chấp nói VỀ một ngày chứ không phải bản ghi CỦA ngày đó.
- **qa**:
  - Người phụ trách xử lý được cập nhật những trường nào; và có bị chặn ở trường Kết quả cuối cùng để chỉ bộ phận đối chiếu đóng tranh chấp không?

### Item 5.1: Ô chọn Trạng thái tranh chấp

- **itemId**: img-019
- **nameJP**: 状態
- **nameTrans**: Dispute status
- **itemType**: dropdown
- **itemSubtype**: ô chọn một giá trị
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Mỗi lần đổi trạng thái sinh một dòng mới trong bảng Lịch sử cập nhật ở khối 4.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: chỉ nhận giá trị thuộc tập trạng thái đã chốt với chủ đầu tư; tối thiểu phân biệt được đang mở với đã đóng.<br>Điều kiện: chuyển sang trạng thái đóng thì trường Kết quả cuối cùng bắt buộc phải có nội dung.<br>Lỗi: đóng mà Kết quả cuối cùng còn trống thì từ chối lưu.
- **bbox**: startX=42 startY=863 endX=276 endY=975
- **description**:
  - Mục đích và ngữ cảnh: Trường FR-SETTLE-03 đòi đầu tiên; là cơ sở của danh sách tranh chấp đang mở mà nghiệm thu đòi.
  - Thành phần hiển thị: Nhãn Trạng thái kèm dấu sao bắt buộc; ô chọn hiện Đang xử lý; dòng nhắc nói rõ tập giá trị chưa được yêu cầu khách hàng liệt.
  - Chức năng và logic: Đổi trạng thái là hành vi được ghi lịch sử; chuyển sang đóng thì kéo theo ràng buộc bắt buộc ở trường Kết quả cuối cùng.
- **qa**:
  - Tập trạng thái tranh chấp gồm đúng những giá trị nào và đường đi hợp lệ giữa chúng ra sao; yêu cầu khách hàng không liệt.
  - Tranh chấp đã đóng có mở lại được không; nếu có thì mở lại là một dòng lịch sử mới chứ không xoá kết quả cũ.

### Item 5.2: Ô chọn Nguồn phát sinh

- **itemId**: img-020
- **nameJP**: 発生元
- **nameTrans**: Dispute source
- **itemType**: dropdown
- **itemSubtype**: ô chọn một giá trị
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: cặp loại nguồn và mã chứng từ phải trỏ về một dòng có thật của bảng đối chiếu ngày.<br>Lỗi: không tìm được dòng nguồn thì từ chối lưu; tranh chấp không được treo lơ lửng.
- **bbox**: startX=287 startY=863 endX=521 endY=975
- **description**:
  - Mục đích và ngữ cảnh: Neo tranh chấp vào đúng một dòng chứng từ của bảng đối chiếu ngày để chênh lệch luôn truy được về số gốc.
  - Thành phần hiển thị: Nhãn Nguồn phát sinh kèm dấu sao bắt buộc; ô chọn hiện loại nguồn và mã chứng từ; dòng nhắc nói tranh chấp không treo lơ lửng.
  - Chức năng và logic: Tập giá trị lấy từ ba nguồn của bảng đối chiếu ngày; giá trị gồm hai phần là loại nguồn và mã bản ghi nguồn.
- **qa**:
  - Chọn nguồn bằng cách tra mã chứng từ hay bằng cách mở tranh chấp từ chính dòng của bảng đối chiếu ngày SC-18?

### Item 5.3: Ô nhập Ngày nghiệp vụ của tranh chấp

- **itemId**: img-021
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
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: đúng định dạng YYYY-MM-DD và là một ngày thật.<br>Điều kiện: phải khớp ngày nghiệp vụ của dòng nguồn đã chọn.<br>Lỗi: lệch với dòng nguồn thì từ chối lưu.
- **bbox**: startX=532 startY=863 endX=765 endY=975
- **description**:
  - Mục đích và ngữ cảnh: Gắn tranh chấp vào ngày nghiệp vụ mà chênh lệch phát sinh; là khoá để báo cáo RPT-09 tổng hợp theo ngày.
  - Thành phần hiển thị: Nhãn Ngày nghiệp vụ kèm dấu sao bắt buộc và ô nhập ngày hiện mẫu 2026-09-08.
  - Chức năng và logic: Giá trị phải nhất quán với ngày nghiệp vụ của dòng nguồn; ghi được cả khi ngày đó đã lock.
- **qa**:
  - -

### Item 5.4: Ô chọn Người tham gia liên quan

- **itemId**: img-022
- **nameJP**: 参加者
- **nameTrans**: Related participant
- **itemType**: dropdown
- **itemSubtype**: ô chọn một giá trị
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: participant
- **databaseColumn**: id
- **databaseNote**: Người tham gia lấy từ danh mục người tham gia của miền D-PARTY; bảng tranh chấp giữ tham chiếu tới danh mục này nhưng bản thi công CHƯA có bảng tranh chấp nào.
- **validationNote**: -
- **bbox**: startX=776 startY=863 endX=1010 endY=975
- **description**:
  - Mục đích và ngữ cảnh: Ghi người tham gia dính vào chênh lệch để liên hệ và để tổng hợp theo đối tác.
  - Thành phần hiển thị: Nhãn Người tham gia liên quan và ô chọn hiện Người tham gia A.
  - Chức năng và logic: Không bắt buộc vì có chênh lệch chỉ thuộc nội bộ; giá trị lấy từ danh mục người tham gia và chỉ hiện tên hiển thị.
- **qa**:
  - Trường này để trống được thì báo cáo RPT-09 tổng hợp theo người tham gia xử lý dòng trống ra sao?

### Item 5.5: Ô nhập Nguyên nhân

- **itemId**: img-023
- **nameJP**: 理由
- **nameTrans**: Cause
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
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: bỏ khoảng trắng hai đầu rồi phải còn nội dung.<br>Lỗi: trống hoặc chỉ khoảng trắng thì từ chối lưu.
- **bbox**: startX=42 startY=985 endX=1010 endY=1061
- **description**:
  - Mục đích và ngữ cảnh: Trường FR-SETTLE-03 đòi: chênh lệch phải giải thích được chứ không chỉ được đánh dấu.
  - Thành phần hiển thị: Nhãn Nguyên nhân kèm dấu sao bắt buộc và một vùng văn bản rộng hết khối.
  - Chức năng và logic: Bắt buộc ngay từ lúc mở tranh chấp; nội dung đi vào báo cáo RPT-09 nên phải viết được thành câu.
- **qa**:
  - Nguyên nhân là văn bản tự do hay cần thêm một danh mục nhóm nguyên nhân để tổng hợp được?

### Item 5.6: Ô chọn Người phụ trách xử lý

- **itemId**: img-024
- **nameJP**: 実施者
- **nameTrans**: Assignee
- **itemType**: dropdown
- **itemSubtype**: ô chọn một giá trị
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: chỉ nhận tài khoản đang hoạt động.<br>Điều kiện: người phụ trách bị vô hiệu giữa lúc tranh chấp còn mở thì vẫn phải gán lại được.<br>Lỗi: chọn tài khoản đã vô hiệu thì từ chối lưu.
- **bbox**: startX=42 startY=1071 endX=357 endY=1182
- **description**:
  - Mục đích và ngữ cảnh: Trường FR-SETTLE-03 đòi; lý do chính đáng của yêu cầu này là truy vết trách nhiệm.
  - Thành phần hiển thị: Nhãn Người phụ trách xử lý kèm dấu sao bắt buộc; ô chọn hiện Người dùng B; dòng nhắc nêu chỉ tài khoản đang hoạt động và không hiện email.
  - Chức năng và logic: Hiện tên hiển thị chứ không hiện email; luôn phải gán lại được kể cả khi người đang phụ trách bị vô hiệu.
- **qa**:
  - Đổi người phụ trách có sinh một dòng trong Lịch sử cập nhật như đổi trạng thái không?
  - Có phát thông báo cho người vừa được gán không; FR-NOTIFY-01 chỉ liệt event tranh chấp đang mở.

### Item 5.7: Ô nhập Ngày dự kiến xử lý

- **itemId**: img-025
- **nameJP**: 対応予定日
- **nameTrans**: Due date
- **itemType**: date_picker
- **itemSubtype**: ô chọn ngày một dòng
- **buttonType**: -
- **dataType**: date
- **format**: YYYY-MM-DD
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: đúng định dạng YYYY-MM-DD và là một ngày thật.<br>Điều kiện: không sớm hơn ngày nghiệp vụ của tranh chấp.<br>Lỗi: sớm hơn ngày nghiệp vụ thì từ chối lưu.
- **bbox**: startX=368 startY=1071 endX=684 endY=1182
- **description**:
  - Mục đích và ngữ cảnh: Trường nghiệm thu FR-SETTLE-03 đòi; là cơ sở duy nhất để nói một việc đã quá hạn dự kiến.
  - Thành phần hiển thị: Nhãn Ngày dự kiến xử lý kèm dấu sao bắt buộc; ô nhập ngày hiện mẫu 2026-09-11; dòng nhắc nói rõ nhập tay và thiết kế không tự đặt con số.
  - Chức năng và logic: Nhập tay vì yêu cầu khách hàng không cho ngưỡng SLA nào; hệ thống chỉ so ngày dự kiến với ngày hiện tại để gắn nhãn quá hạn.
- **qa**:
  - Yêu cầu khách hàng dùng đúng chữ SLA xử lý ở RPT-09 nhưng không cho con số; ngưỡng SLA theo mức độ nghiêm trọng có tồn tại không.
  - Ngày dự kiến có được sửa nhiều lần không; nếu có thì mỗi lần sửa có vào Lịch sử cập nhật không?

### Item 5.8: Ô hiển thị Chênh lệch liên quan

- **itemId**: img-026
- **nameJP**: 関連差異
- **nameTrans**: Related variance
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
- **databaseTable**: reconciliation_line
- **databaseColumn**: variance
- **databaseNote**: Giá trị chỉ đọc lấy từ cột chênh lệch của nguồn bảng đối chiếu ngày; không so được thì hiện "không áp dụng" chứ không hiện 0.
- **validationNote**: -
- **bbox**: startX=695 startY=1071 endX=1010 endY=1182
- **description**:
  - Mục đích và ngữ cảnh: Cho người xử lý thấy ngay con số đang tranh chấp mà không phải quay lại bảng đối chiếu.
  - Thành phần hiển thị: Nhãn Chênh lệch liên quan và một ô chỉ đọc nền xám hiện giá trị âm mẫu kèm chú thích nguồn.
  - Chức năng và logic: Dẫn xuất từ dòng nguồn đã chọn; theo đúng quy tắc của SC-18 là không so được thì ghi không áp dụng chứ không hiện 0 hay dấu gạch.
- **qa**:
  - Chênh lệch được chốt lại tại thời điểm mở tranh chấp hay đọc lại mỗi lần mở màn?

### Item 5.9: Ô nhập Kết quả cuối cùng

- **itemId**: img-027
- **nameJP**: 最終結果
- **nameTrans**: Final resolution
- **itemType**: textarea
- **itemSubtype**: vùng văn bản nhiều dòng
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: false
- **minLength**: -
- **maxLength**: 1000
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: bắt buộc khi chuyển tranh chấp sang trạng thái đóng.<br>Lỗi: đóng mà trường này còn trống thì từ chối; đóng tranh chấp không ghi kết quả là mất kết luận nghiệp vụ.
- **bbox**: startX=42 startY=1192 endX=1010 endY=1268
- **description**:
  - Mục đích và ngữ cảnh: Trường FR-SETTLE-03 đòi; là kết luận nghiệp vụ của tranh chấp và là thứ báo cáo RPT-09 tổng hợp lại.
  - Thành phần hiển thị: Nhãn Kết quả cuối cùng kèm dấu sao và chú thích khi đóng; một vùng văn bản rộng hết khối.
  - Chức năng và logic: Không bắt buộc trong lúc còn xử lý nhưng bắt buộc tại thời điểm đóng; đây là ràng buộc theo trạng thái chứ không phải ràng buộc cố định.
- **qa**:
  - Kết quả cuối cùng có cần một danh mục phân loại kết luận kèm theo văn bản tự do không?

### Item 5.10: Ô chọn tệp Ảnh hoặc chứng từ bằng chứng

- **itemId**: img-028
- **nameJP**: 証拠画像・書類
- **nameTrans**: Evidence attachment
- **itemType**: file_or_image
- **itemSubtype**: ô chọn tệp
- **buttonType**: -
- **dataType**: -
- **format**: none
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Bằng chứng tranh chấp thuộc diện lưu 3 năm theo DR-IMAGE-01 và quản lý theo TBL-ATTACH-01; kho tệp là kho riêng tư. Đường dẫn tệp không bao giờ ra file xuất CSV.
- **validationNote**: Điều kiện: kiểm định dạng và dung lượng ở phía hệ thống; giới hạn của trình duyệt chỉ là gợi ý.<br>Lỗi: định dạng không nhận hoặc quá dung lượng thì từ chối và nói rõ trường nào chưa đạt.
- **bbox**: startX=42 startY=1278 endX=1010 endY=1346
- **description**:
  - Mục đích và ngữ cảnh: Cho phép kèm ảnh hoặc chứng từ chứng minh chênh lệch; không bắt buộc vì nhiều tranh chấp chỉ cần đối chiếu số.
  - Thành phần hiển thị: Nhãn Ảnh / chứng từ bằng chứng và ô chọn tệp hiện Chọn tệp… kèm chú thích không bắt buộc; dòng nhắc dẫn TBL-ATTACH-01 và DR-IMAGE-01.
  - Chức năng và logic: Tệp lưu theo policy 3 năm online rồi chuyển cold storage; đường dẫn tệp không bao giờ ra CSV và chỉ mở được qua liên kết có hạn giờ.
- **qa**:
  - Định dạng và dung lượng tối đa của tệp bằng chứng là bao nhiêu; yêu cầu khách hàng chỉ quy định thời hạn lưu chứ không quy định ngưỡng nhận tệp.
  - Một tranh chấp kèm được nhiều tệp hay chỉ một tệp?

### Item 5.11: Nút Lưu tiến độ

- **itemId**: img-029
- **nameJP**: 進捗を保存
- **nameTrans**: Save progress button
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
- **transitionNote**: Lưu các trường đang sửa và sinh một dòng trong Lịch sử cập nhật khi trạng thái đổi; ở lại màn.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: các trường bắt buộc trạng thái · nguồn phát sinh · ngày nghiệp vụ · nguyên nhân · người phụ trách · ngày dự kiến phải hợp lệ.<br>Lỗi: thông báo phải nói rõ trường nào chưa đạt.
- **bbox**: startX=42 startY=1357 endX=128 endY=1386
- **description**:
  - Mục đích và ngữ cảnh: Ghi tiến độ xử lý mà chưa kết luận; giữ tranh chấp ở trạng thái đang mở.
  - Thành phần hiển thị: Nút chữ nền đậm đầu hàng ba nút cuối khối 3.
  - Chức năng và logic: Không đóng tranh chấp; không đòi Kết quả cuối cùng.
- **qa**:
  - Lưu tiến độ có đòi một ghi chú cho dòng lịch sử không; bảng lịch sử có cột Ghi chú.

### Item 5.12: Nút Đóng tranh chấp

- **itemId**: img-030
- **nameJP**: 紛争を終了
- **nameTrans**: Close dispute button
- **itemType**: button
- **itemSubtype**: nút phụ
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Chuyển tranh chấp sang trạng thái đóng và sinh một dòng trong Lịch sử cập nhật; sau đó khối chi tiết về chế độ chỉ đọc.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: trường Kết quả cuối cùng phải có nội dung.<br>Điều kiện: chỉ một kết quả được ghi khi hai người đóng cùng lúc.<br>Lỗi: Kết quả cuối cùng trống thì từ chối; người đóng sau nhận thông báo trạng thái đã đổi chứ không ghi đè kết luận của người trước.
- **bbox**: startX=131 startY=1357 endX=245 endY=1386
- **description**:
  - Mục đích và ngữ cảnh: Kết thúc một tranh chấp kèm kết luận; là chỗ duy nhất trên màn ép trường Kết quả cuối cùng.
  - Thành phần hiển thị: Nút chữ trung tính đặt giữa hàng ba nút.
  - Chức năng và logic: Không tự động đóng theo bất kỳ điều kiện dữ liệu nào; con người phải quyết định và ghi kết quả.
- **qa**:
  - Ai được đóng tranh chấp; bộ phận đối chiếu hay cả người được gán phụ trách. Ranh giới này chưa được yêu cầu khách hàng chốt.
