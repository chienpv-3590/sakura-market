# Items Analysis - scr019-correction-request

## Screen context

- source: `.momorph/shots/SC-20-tao-yeu-cau-dieu-chinh.png` (image mode, 1280x1999 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-08 · Feature List FE-028 · RFP FR-CORR-01 (ràng buộc kèm FR-CORR-03; BR-CLOSE-01; FR-AUDIT-01)
- batch: 2/3

### Item 5.1: Ô nhập Lý do

- **itemId**: img-016
- **nameJP**: 理由
- **nameTrans**: Reason
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
- **databaseTable**: correction_request
- **databaseColumn**: reason
- **databaseNote**: Cột bắt buộc không rỗng; là trường lý do mà FR-AUDIT-01 đòi lưu cùng dấu vết kiểm toán của thao tác tạo.
- **validationNote**: Điều kiện: bỏ khoảng trắng hai đầu rồi phải còn nội dung.<br>Lỗi: trắng hoặc chỉ khoảng trắng thì không gửi được; thông báo phải nói rõ là thiếu lý do.
- **bbox**: startX=42 startY=735 endX=1010 endY=831
- **description**:
  - Mục đích và ngữ cảnh: Giải thích tại sao phải điều chỉnh; đây đúng là trường lý do mà FR-AUDIT-01 đòi lưu cùng dấu vết kiểm toán.
  - Thành phần hiển thị: Nhãn Lý do kèm dấu sao bắt buộc; vùng văn bản rộng hết khối hiện một câu mẫu; dòng nhắc bên dưới nêu điều kiện không được để trống.
  - Chức năng và logic: Bắt buộc; là một trong hai điều kiện kích hoạt nút gửi cùng với bằng chứng đính kèm.
- **qa**:
  - Lý do có giới hạn độ dài tối đa nào do khách chốt không?
  - Có cần một danh mục nhóm lý do điều chỉnh kèm văn bản tự do để báo cáo RPT-08 tổng hợp được không?

### Item 5.2: Ô chọn tệp Bằng chứng đính kèm

- **itemId**: img-017
- **nameJP**: 添付証拠（画像またはPDF）
- **nameTrans**: Evidence attachment
- **itemType**: file_or_image
- **itemSubtype**: ô chọn tệp
- **buttonType**: -
- **dataType**: -
- **format**: none
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: correction_request
- **databaseColumn**: evidence_path
- **databaseNote**: Cột bắt buộc không rỗng; tệp lưu trong kho riêng tư và đường dẫn tệp không bao giờ ra file xuất. Xem tệp chỉ qua liên kết có hạn giờ ở SC-21.
- **validationNote**: Điều kiện: bắt buộc phải có tệp theo FR-CORR-01.<br>Điều kiện: định dạng và dung lượng được kiểm ở phía hệ thống; giới hạn của trình duyệt chỉ là gợi ý chứ không phải hàng rào.<br>Lỗi: thiếu tệp · tệp sai định dạng · tệp quá dung lượng phải là ba thông báo phân biệt được.
- **bbox**: startX=42 startY=841 endX=1010 endY=909
- **description**:
  - Mục đích và ngữ cảnh: Bằng chứng cho đề nghị sửa; FR-CORR-01 đòi bằng chứng đính kèm nên trường này bắt buộc chứ không tuỳ chọn.
  - Thành phần hiển thị: Nhãn Bằng chứng đính kèm (ảnh hoặc PDF) kèm dấu sao bắt buộc; ô chọn tệp hiện trạng thái chưa chọn tệp nào; dòng nhắc nêu việc kiểm định dạng và dung lượng ở phía hệ thống.
  - Chức năng và logic: Bắt buộc; hàng rào thật nằm ở phía hệ thống vì gợi ý của trình duyệt bị bỏ qua được.
- **qa**:
  - Định dạng và dung lượng tối đa của tệp bằng chứng là bao nhiêu; TBL-ATTACH-01 và DR-IMAGE-01 chỉ quy định thời hạn lưu chứ không quy định ngưỡng nhận tệp.
  - Một yêu cầu kèm được nhiều tệp hay chỉ đúng một tệp?
  - Tải tệp xong mà bước ghi bản ghi thất bại thì tệp đã tải có được dọn không?

### Item 5.3: Ô hiển thị Trạng thái phê duyệt khi tạo

- **itemId**: img-018
- **nameJP**: 承認状態
- **nameTrans**: Approval status on create
- **itemType**: label
- **itemSubtype**: ô chỉ đọc
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Chờ duyệt
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: correction_request
- **databaseColumn**: status
- **databaseNote**: Cột trạng thái nhận đúng ba giá trị chờ duyệt · đã duyệt · bị từ chối; giá trị khi tạo do phía hệ thống ghi cứng.
- **validationNote**: Điều kiện: trạng thái khi tạo do hệ thống đặt là Chờ duyệt.<br>Lỗi: giá trị gửi từ phía người dùng phải bị bỏ qua; người tạo không chọn trạng thái.
- **bbox**: startX=42 startY=920 endX=1010 endY=988
- **description**:
  - Mục đích và ngữ cảnh: Cho người lập thấy yêu cầu của mình sẽ nằm ở đâu trong vòng đời phê duyệt; và nói rõ trạng thái không phải thứ người lập chọn.
  - Thành phần hiển thị: Nhãn Trạng thái phê duyệt khi tạo và ô chỉ đọc nền xám hiện Chờ duyệt kèm chú thích hệ thống đặt; dòng nhắc nêu vòng đời ba trạng thái và nói quyết định thuộc SC-21.
  - Chức năng và logic: Luôn là Chờ duyệt khi tạo; hai trạng thái còn lại chỉ đến từ quyết định của người duyệt ở SC-21.
- **qa**:
  - Người lập có xem được danh sách yêu cầu mình đã gửi và trạng thái của chúng ngay trên màn này không?

### Item 5.4: Nút Gửi yêu cầu

- **itemId**: img-019
- **nameJP**: 依頼を送信
- **nameTrans**: Submit request button
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
- **transitionNote**: Gửi yêu cầu điều chỉnh. Thành công thì form đóng lại và hiện câu "Đã gửi yêu cầu điều chỉnh; đang chờ duyệt."; quyết định tiếp theo thuộc SC-21.
- **databaseTable**: correction_request
- **databaseColumn**: target_txn_id; reason; evidence_path; status; requested_by; created_at
- **databaseNote**: Thêm đúng một dòng; giao dịch gốc không bị chạm. Thao tác tạo phải sinh một dấu vết kiểm toán mang chủ thể · thời điểm · lý do và bằng chứng theo FR-AUDIT-01.
- **validationNote**: Điều kiện: phải có lý do và có tệp bằng chứng.<br>Điều kiện: ngày nghiệp vụ của giao dịch đích phải đã chốt kỳ.<br>Điều kiện: nút vô hiệu trong lúc đang gửi để không gửi trùng.<br>Lỗi: thông báo lỗi phải nói rõ trường nào chưa đạt — thiếu lý do · thiếu bằng chứng · tệp sai định dạng · tệp quá dung lượng.
- **bbox**: startX=42 startY=1001 endX=130 endY=1030
- **description**:
  - Mục đích và ngữ cảnh: Hành động chính của màn: sinh bản ghi yêu cầu điều chỉnh riêng — đường ghi hợp lệ duy nhất sau khi chốt kỳ.
  - Thành phần hiển thị: Nút chữ nền đậm đặt cuối khối Bước 3.
  - Chức năng và logic: Chỉ kích hoạt khi đủ lý do và bằng chứng; ghi bản ghi yêu cầu ở trạng thái chờ duyệt và không chạm vào giao dịch gốc.
- **qa**:
  - Một giao dịch được phép có bao nhiêu yêu cầu chờ duyệt cùng lúc; nếu là một thì phải chặn ngay ở màn này.
  - Gửi xong thì màn ở lại trạng thái đã gửi hay điều hướng sang danh sách yêu cầu ở SC-21?

### Item 5.5: Nút Gửi yêu cầu ở trạng thái vô hiệu

- **itemId**: img-020
- **nameJP**: 依頼を送信（無効状態）
- **nameTrans**: Submit request button - disabled state
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
- **validationNote**: Điều kiện: thiếu lý do hoặc thiếu tệp bằng chứng thì nút ở trạng thái vô hiệu.<br>Lỗi: không gửi được và không hiện thông báo lỗi vì chưa có thao tác gửi nào.
- **bbox**: startX=133 startY=1001 endX=423 endY=1030
- **description**:
  - Mục đích và ngữ cảnh: Minh hoạ trạng thái vô hiệu của nút gửi ngay trên wireframe để người cài biết chính xác điều kiện chặn.
  - Thành phần hiển thị: Nút chữ mờ đặt cạnh nút gửi thường; nhãn nêu rõ điều kiện làm nút vô hiệu.
  - Chức năng và logic: Là biến thể trạng thái của cùng một nút chứ không phải một nút thứ hai trên bản chạy thật.
- **qa**:
  - -

### Item 6: Khối bất biến thiết kế

- **itemId**: img-021
- **nameJP**: -
- **nameTrans**: Design invariants block
- **itemType**: label
- **itemSubtype**: khối đoạn văn
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: correction_request; transaction_adjustment
- **databaseColumn**: target_txn_id
- **databaseNote**: Hai bảng của miền D-SETTLE đều chỉ thêm dòng; cả hai trỏ về giao dịch đích bằng khoá ngoại và không bảng nào sửa giao dịch gốc.
- **validationNote**: -
- **bbox**: startX=26 startY=1059 endX=1026 endY=1178
- **description**:
  - Mục đích và ngữ cảnh: Viết rõ ba bất biến để không ai cài ngược: hai bản ghi tách rời; hai bảng chỉ thêm; đường dẫn tệp không ra file xuất.
  - Thành phần hiển thị: Khối tiêu đề Bất biến thiết kế và hai đoạn văn: đoạn về quan hệ giữa yêu cầu và giao dịch gốc; đoạn về việc chỉ thêm không sửa và về đường dẫn tệp.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc kiến trúc áp lên toàn màn và lên màn phê duyệt SC-21.
- **qa**:
  - Một yêu cầu đã gửi thì không sửa lại được — muốn đổi phải gửi yêu cầu mới. Có cần thêm đường thu hồi yêu cầu chờ duyệt không?

### Item 7: Khối trạng thái màn

- **itemId**: img-022
- **nameJP**: -
- **nameTrans**: Screen states block
- **itemType**: others
- **itemSubtype**: khối mười thẻ trạng thái
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
- **bbox**: startX=26 startY=1191 endX=1026 endY=1546
- **description**:
  - Mục đích và ngữ cảnh: Liệt kê các trạng thái màn phải xử lý được; hai thẻ về ngày đã chốt và ngày chưa chốt là cặp điều kiện đảo ngược dễ cài sai nhất.
  - Thành phần hiển thị: Mười thẻ xếp ba hàng; mỗi thẻ có tiêu đề trạng thái và một đoạn mô tả hành vi mong đợi.
  - Chức năng và logic: Chỉ trình bày; nội dung là đặc tả hành vi cho ba khối bước và cho nút gửi.
- **qa**:
  - -

### Item 7.1: Thẻ trạng thái Rỗng

- **itemId**: img-023
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
- **bbox**: startX=42 startY=1236 endX=277 endY=1328
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái mở màn: chưa có giao dịch đích nên chưa có gì để nhập.
  - Thành phần hiển thị: Thẻ tiêu đề Rỗng và một đoạn mô tả ngắn.
  - Chức năng và logic: Chỉ hiện khối Bước 1; hai khối sau chưa render.
- **qa**:
  - -

### Item 7.2: Thẻ trạng thái Đang tải

- **itemId**: img-024
- **nameJP**: -
- **nameTrans**: Loading state card
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
- **bbox**: startX=286 startY=1236 endX=522 endY=1328
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái trong lúc tra giao dịch đích.
  - Thành phần hiển thị: Thẻ tiêu đề Đang tải và một đoạn mô tả ngắn.
  - Chức năng và logic: Khung trang hiện trước rồi dữ liệu vào sau để người dùng không thấy trang trắng.
- **qa**:
  - -

### Item 7.3: Thẻ trạng thái Lỗi tải

- **itemId**: img-025
- **nameJP**: -
- **nameTrans**: Load error state card
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
- **bbox**: startX=531 startY=1236 endX=766 endY=1328
- **description**:
  - Mục đích và ngữ cảnh: Phân biệt lỗi hạ tầng với việc không tìm thấy giao dịch; hai thứ này có cách xử lý khác nhau.
  - Thành phần hiển thị: Thẻ tiêu đề Lỗi tải và một đoạn mô tả ngắn.
  - Chức năng và logic: Hiện thông báo kèm nút tải lại chứ không hiện lỗi không tìm thấy.
- **qa**:
  - -

### Item 7.4: Thẻ trạng thái Không có quyền

- **itemId**: img-026
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
- **bbox**: startX=775 startY=1236 endX=1010 endY=1328
- **description**:
  - Mục đích và ngữ cảnh: Khai ranh giới phân quyền của màn và nói rõ chặn ở cả hai đường: vào màn và gọi đường ghi.
  - Thành phần hiển thị: Thẻ tiêu đề Không có quyền và một đoạn mô tả ngắn.
  - Chức năng và logic: Chỉ bộ phận quyết toán vào được màn; vai khác cũng không gửi được yêu cầu bằng cách gọi đường ghi trực tiếp.
- **qa**:
  - -

### Item 7.5: Thẻ trạng thái Không tìm thấy giao dịch

- **itemId**: img-027
- **nameJP**: -
- **nameTrans**: Transaction not found state card
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
- **bbox**: startX=42 startY=1337 endX=277 endY=1429
- **description**:
  - Mục đích và ngữ cảnh: Trạng thái thường gặp nhất khi tra mã; phải sửa được ngay tại chỗ.
  - Thành phần hiển thị: Thẻ tiêu đề Không tìm thấy giao dịch và một đoạn mô tả ngắn.
  - Chức năng và logic: Lỗi hiện ngay tại ô nhập; người dùng sửa mã rồi tra lại mà không mất ngữ cảnh.
- **qa**:
  - -

### Item 7.6: Thẻ trạng thái Ngày đã chốt

- **itemId**: img-028
- **nameJP**: -
- **nameTrans**: Locked date state card
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
- **bbox**: startX=286 startY=1337 endX=522 endY=1429
- **description**:
  - Mục đích và ngữ cảnh: Điều kiện bắt buộc để màn hoạt động; nói rõ đây là đường ghi hợp lệ duy nhất sau khi chốt kỳ.
  - Thành phần hiển thị: Thẻ tiêu đề Ngày đã chốt — điều kiện bắt buộc và một đoạn mô tả ngắn.
  - Chức năng và logic: Form nội dung ở khối Bước 3 hiện đủ và nút gửi khả dụng.
- **qa**:
  - -

### Item 7.7: Thẻ trạng thái Ngày chưa chốt — từ chối

- **itemId**: img-029
- **nameJP**: -
- **nameTrans**: Not-locked rejection state card
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
- **bbox**: startX=531 startY=1337 endX=766 endY=1429
- **description**:
  - Mục đích và ngữ cảnh: Thẻ quan trọng nhất của màn: chiều điều kiện ở đây ĐẢO NGƯỢC so với các màn sửa trực tiếp và rất dễ bị cài ngược lại.
  - Thành phần hiển thị: Thẻ tiêu đề Ngày chưa chốt — từ chối; cụm Điều kiện đảo ngược in đậm.
  - Chức năng và logic: Ngày chưa chốt thì màn không nhận yêu cầu và chỉ đường về màn giao dịch để sửa trực tiếp; đường điều chỉnh chỉ mở SAU khi ngày đã lock.
- **qa**:
  - Thông báo từ chối khi ngày chưa chốt viết ra sao ở cả tiếng Việt và tiếng Nhật; và có kèm liên kết sang màn giao dịch không?

### Item 7.8: Thẻ trạng thái Đang gửi

- **itemId**: img-030
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
- **bbox**: startX=775 startY=1337 endX=1010 endY=1429
- **description**:
  - Mục đích và ngữ cảnh: Chống gửi trùng trên một thao tác chỉ thêm dòng; gửi trùng sẽ sinh hai yêu cầu cho cùng một việc.
  - Thành phần hiển thị: Thẻ tiêu đề Đang gửi và một đoạn mô tả ngắn.
  - Chức năng và logic: Nút gửi vô hiệu trong lúc đang gửi.
- **qa**:
  - -
