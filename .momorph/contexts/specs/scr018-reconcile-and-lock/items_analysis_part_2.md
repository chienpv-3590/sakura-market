# Items Analysis - scr018-reconcile-and-lock

## Screen context

- source: `.momorph/shots/SC-18-bang-doi-chieu-ngay-va-lock-ky.png` (image mode, 1280x2517 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-07/FN-06 · Feature List FE-024/FE-025/FE-026 · RFP FR-SETTLE-01, FR-SETTLE-02, FR-CORR-03, FR-DEL-04, BR-CLOSE-01, FR-AUDIT-01
- batch: 2/3

### Item 4.2: Thẻ định nghĩa Bản ghi đấu giá

- **itemId**: img-016
- **nameJP**: せり
- **nameTrans**: Auction record eligibility card
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
- **bbox**: startX=286 startY=746 endX=522 endY=856
- **description**:
  - Mục đích và ngữ cảnh: Nêu điều kiện để một bản ghi đấu giá vào bảng đối chiếu.
  - Thành phần hiển thị: Thẻ có tiêu đề Bản ghi せり và một đoạn văn ngắn dẫn FR-SERI-02.
  - Chức năng và logic: Chỉ nhận kết quả cuối cùng đã ghi nhận của ngày và bản ghi phải mang người xác nhận theo FR-SERI-02.
- **qa**:
  - -

### Item 4.3: Thẻ định nghĩa Giao hàng

- **itemId**: img-017
- **nameJP**: 配送
- **nameTrans**: Delivery eligibility card
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
- **bbox**: startX=531 startY=746 endX=766 endY=856
- **description**:
  - Mục đích và ngữ cảnh: Chốt quy tắc dễ cài sai nhất của bảng đối chiếu: lần giao thuộc về ngày của chính nó chứ không thuộc ngày của giao dịch sinh ra nó.
  - Thành phần hiển thị: Thẻ có tiêu đề Giao hàng và một đoạn văn ngắn; cụm ngày nghiệp vụ của chính nó được in đậm.
  - Chức năng và logic: Lọc lần giao theo ngày nghiệp vụ riêng của lần giao; lý do là một giao dịch có thể trải nhiều ngày.
- **qa**:
  - -

### Item 4.4: Thẻ định nghĩa Ngoại lệ giao hàng

- **itemId**: img-018
- **nameJP**: 配送例外
- **nameTrans**: Delivery exception eligibility card
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
- **databaseNote**: Thiết kế đòi nguồn ngoại lệ giao hàng đã xác nhận; bản thi công chưa có bảng ngoại lệ nào nên nhánh này chưa có nguồn.
- **validationNote**: -
- **bbox**: startX=775 startY=746 endX=1010 endY=856
- **description**:
  - Mục đích và ngữ cảnh: Khẳng định ngoại lệ giao hàng là thành phần ngang hàng với giao dịch và giao hàng trong bảng đối chiếu; đây là chỗ FR-SETTLE-01 hay bị đọc thiếu.
  - Thành phần hiển thị: Thẻ có tiêu đề Ngoại lệ giao hàng và một đoạn văn ngắn dẫn FE-023 cùng FR-SETTLE-01.
  - Chức năng và logic: Chỉ nhận ngoại lệ đã xác nhận của ngày đang xem; nguồn dữ liệu là màn ghi nhận ngoại lệ giao hàng SC-17.
- **qa**:
  - Ngoại lệ đã xác nhận nhưng sau đó bị đánh dấu sai thì có bị rút khỏi bảng đối chiếu của ngày hay giữ lại kèm nhãn?

### Item 5: Khối 4 — lock ngày nghiệp vụ

- **itemId**: img-019
- **nameJP**: -
- **nameTrans**: Business day lock block
- **itemType**: others
- **itemSubtype**: khối hành động có hộp xác nhận
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
- **databaseNote**: Ghi đúng một dòng cho một ngày nghiệp vụ; khoá chính trên ngày nghiệp vụ biến hai lệnh lock đồng thời thành một lỗi trùng khoá.
- **validationNote**: -
- **bbox**: startX=26 startY=885 endX=1026 endY=1270
- **description**:
  - Mục đích và ngữ cảnh: Hạng mục P0 của FE-026: chốt số chính thức của ngày nghiệp vụ; đây là hành động một chiều nên toàn khối được thiết kế quanh việc chống bấm nhầm.
  - Thành phần hiển thị: Nút hành động màu cảnh báo kèm thẻ điều kiện; bên dưới là hộp xác nhận rõ ràng gồm hai dòng cảnh báo · ô gõ lại ngày · nút xác nhận và nút hủy; cuối khối là đoạn ghi chú hệ quả sau lock.
  - Chức năng và logic: Chỉ mở cho bộ phận đối chiếu và chỉ khi ngày còn chưa lock; đi qua hộp xác nhận mới gửi được lệnh lock.
- **qa**:
  - -

### Item 5.1: Nút Lock ngày nghiệp vụ

- **itemId**: img-020
- **nameJP**: 業務日をロック
- **nameTrans**: Lock business day button
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
- **transitionNote**: Mở hộp xác nhận rõ ràng ngay bên dưới; chưa gửi lệnh lock nào ở bước này.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: Điều kiện: chỉ hiện cho bộ phận đối chiếu và chỉ khi ngày nghiệp vụ còn chưa lock.<br>Lỗi: vai trò khác hoặc ngày đã lock thì nút không tồn tại trên màn.
- **bbox**: startX=42 startY=929 endX=264 endY=958
- **description**:
  - Mục đích và ngữ cảnh: Điểm vào duy nhất của thao tác chốt kỳ; tách riêng khỏi hộp xác nhận để việc bấm nút này chưa gây ra hậu quả nào.
  - Thành phần hiển thị: Nút chữ viền đỏ nhạt đặt đầu khối 4; ngay bên phải là thẻ nhắc điều kiện hiện nút.
  - Chức năng và logic: Chỉ mở hộp xác nhận; mọi kiểm tra vai trò và trạng thái lock phải làm lại ở phía hệ thống khi gửi lệnh.
- **qa**:
  - Khi ngày nghiệp vụ đang chọn không có dòng nào đủ điều kiện thì nút này vẫn mở hay bị vô hiệu kèm lời nhắc riêng?

### Item 5.2: Thẻ điều kiện hiện nút lock

- **itemId**: img-021
- **nameJP**: -
- **nameTrans**: Lock button visibility tag
- **itemType**: label
- **itemSubtype**: thẻ nhỏ cạnh nút
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
- **bbox**: startX=268 startY=934 endX=479 endY=954
- **description**:
  - Mục đích và ngữ cảnh: Nói thẳng hai điều kiện hiện nút để người dùng vai khác không đi tìm nút đã bị ẩn.
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn nằm ngay sau nút lock.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc phân quyền và trạng thái của hạng mục nút lock.
- **qa**:
  - -

### Item 5.3: Hộp xác nhận lock

- **itemId**: img-022
- **nameJP**: ロック確認ダイアログ
- **nameTrans**: Lock confirmation dialog
- **itemType**: popup_dialog
- **itemSubtype**: hộp xác nhận trong trang
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
- **validationNote**: Điều kiện: chuỗi người dùng gõ lại phải trùng đúng ngày nghiệp vụ đang chọn mới cho gửi.<br>Điều kiện: chuỗi gõ lại phải được gửi lên và kiểm ở phía hệ thống chứ không chỉ kiểm ở giao diện.<br>Lỗi: chuỗi không trùng thì nút xác nhận không kích hoạt.
- **bbox**: startX=42 startY=969 endX=1010 endY=1208
- **description**:
  - Mục đích và ngữ cảnh: Chặn giữa người dùng và một hành động không hoàn tác được; lock sai ngày là hỏng thật vì không có đường mở lock nào.
  - Thành phần hiển thị: Hộp viền nét đứt gồm tiêu đề Xác nhận rõ ràng; dòng cảnh báo màu Hành động này không thể hoàn tác · ロック解除の方法はありません; một dòng giải thích sau khi lock chỉ còn đường yêu cầu điều chỉnh có phê duyệt qua SC-20 và SC-21; ô gõ lại ngày; nút Xác nhận lock và nút Hủy.
  - Chức năng và logic: Chỉ hiện sau khi bấm nút lock; nút xác nhận chỉ kích hoạt khi chuỗi gõ lại trùng ngày nghiệp vụ; bấm Hủy thì đóng hộp và không gửi gì.
- **qa**:
  - Hộp xác nhận này là hộp nổi che màn hay khối mở ra ngay trong trang; và có bẫy tiêu điểm bàn phím không?
  - Đóng hộp bằng phím Esc hay bằng cách bấm ra ngoài có được coi là hủy không?

### Item 5.3.1: Tiêu đề hộp xác nhận

- **itemId**: img-023
- **nameJP**: -
- **nameTrans**: Confirmation dialog heading
- **itemType**: label
- **itemSubtype**: tiêu đề khối con
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
- **bbox**: startX=58 startY=985 endX=994 endY=1002
- **description**:
  - Mục đích và ngữ cảnh: Đặt tên cho bước xác nhận và nói ngay bước này bắt buộc phải được kiểm ở hai phía.
  - Thành phần hiển thị: Một dòng tiêu đề chữ nhỏ in hoa đầu hộp xác nhận.
  - Chức năng và logic: Tĩnh.
- **qa**:
  - -

### Item 5.3.2: Ô gõ lại ngày để xác nhận

- **itemId**: img-024
- **nameJP**: 確認のため業務日を再入力
- **nameTrans**: Retype business date to confirm
- **itemType**: text_form
- **itemSubtype**: ô nhập một dòng
- **buttonType**: -
- **dataType**: string
- **format**: YYYY-MM-DD
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Không lưu vào bảng nào; chỉ dùng để đối chiếu với ngày nghiệp vụ của lệnh lock ở phía hệ thống.
- **validationNote**: Điều kiện: chuỗi phải trùng đúng ngày nghiệp vụ đang chọn sau khi bỏ khoảng trắng hai đầu.<br>Điều kiện: chuỗi phải được gửi kèm lệnh lock và kiểm lại ở phía hệ thống.<br>Lỗi: chưa trùng thì nút Xác nhận lock giữ trạng thái vô hiệu; hệ thống nhận chuỗi sai thì từ chối lệnh lock.
- **bbox**: startX=58 startY=1068 endX=994 endY=1153
- **description**:
  - Mục đích và ngữ cảnh: Buộc người dùng gõ lại đúng ngày sắp bị chốt; đây là cách đổi một cú bấm thành một hành động có ý thức.
  - Thành phần hiển thị: Nhãn Gõ lại ngày để xác nhận · 確認のため業務日を再入力 kèm dấu sao bắt buộc; ô nhập rộng gần hết hộp; dòng nhắc bên dưới nói rõ chuỗi này phải được gửi lên và kiểm ở phía hệ thống.
  - Chức năng và logic: So khớp chuỗi với ngày nghiệp vụ đang chọn để kích hoạt nút xác nhận; đồng thời gửi kèm lệnh lock để hệ thống kiểm lại vì xác nhận chỉ nằm ở giao diện thì một lệnh gọi trực tiếp là lock được.
- **qa**:
  - Chuỗi gõ lại có so khớp phân biệt khoảng trắng và dấu gạch nối như hiển thị hay chấp nhận mọi cách viết cùng một ngày?
  - Sau khi gõ đúng rồi người dùng đổi ngày nghiệp vụ ở khối 1 thì ô này có bị xoá trắng không?

### Item 5.3.3: Nút Xác nhận lock

- **itemId**: img-025
- **nameJP**: ロックを確定
- **nameTrans**: Confirm lock button
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
- **transitionNote**: Gửi lệnh lock ngày nghiệp vụ. Thành công thì màn chuyển sang trạng thái đã lock chỉ đọc và mở đường xuất kế toán SC-27 cùng đường tính thưởng SC-22. Thất bại thì hiện lỗi phân biệt được lý do.
- **databaseTable**: business_day_lock
- **databaseColumn**: business_date; locked_at; locked_by
- **databaseNote**: Chỉ thêm một dòng; không có đường sửa hay xoá dòng lock nên không tồn tại thao tác mở lock.
- **validationNote**: Điều kiện: chỉ kích hoạt khi ô gõ lại ngày đã trùng và không đang gửi.<br>Điều kiện: hệ thống kiểm lại vai trò · tính hợp lệ của ngày nghiệp vụ · chuỗi xác nhận và việc ngày chưa lock.<br>Lỗi: thông báo lỗi phải phân biệt được lý do — ngày sai · đã lock rồi · không đủ quyền · lỗi hệ thống.
- **bbox**: startX=58 startY=1163 endX=156 endY=1192
- **description**:
  - Mục đích và ngữ cảnh: Thực hiện hành động chốt kỳ; là hành động chính của màn và là hành động một chiều duy nhất trong nhóm đối chiếu.
  - Thành phần hiển thị: Nút chữ viền đỏ nằm cuối hộp xác nhận; vô hiệu khi chuỗi gõ lại chưa trùng hoặc khi đang gửi.
  - Chức năng và logic: Lock thành công kéo theo chốt số của ngày · mở đường xuất kế toán và tính thưởng theo FIG-013; thất bại của bước tính thưởng không được làm lock mất tác dụng nhưng phải hiện ra cho người vận hành.
- **qa**:
  - Khi lock thành công nhưng bước tính thưởng kéo theo thất bại thì màn hiện thông báo cảnh báo riêng như thế nào?
  - Hai người bấm xác nhận cùng lúc thì người sau nhận đúng thông báo ngày đã được lock chứ không phải lỗi hệ thống chung — thông báo đó viết ra sao?

### Item 5.3.4: Nút Hủy trong hộp xác nhận

- **itemId**: img-026
- **nameJP**: キャンセル
- **nameTrans**: Cancel button
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
- **transitionNote**: Đóng hộp xác nhận và trở về khối 4; không gửi lệnh nào và không thay đổi dữ liệu.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=160 startY=1163 endX=208 endY=1192
- **description**:
  - Mục đích và ngữ cảnh: Cho người dùng lùi lại khỏi một hành động không hoàn tác được mà không để lại hậu quả.
  - Thành phần hiển thị: Nút chữ trung tính đặt cạnh nút Xác nhận lock.
  - Chức năng và logic: Đóng hộp và xoá chuỗi đã gõ; không gọi hệ thống.
- **qa**:
  - -

### Item 5.4: Ghi chú hệ quả sau khi lock

- **itemId**: img-027
- **nameJP**: -
- **nameTrans**: Post-lock consequence note
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
- **bbox**: startX=42 startY=1211 endX=1010 endY=1244
- **description**:
  - Mục đích và ngữ cảnh: Nói rõ lock không phải một thao tác cô lập: nó là cửa mở cho xuất kế toán và tính thưởng; và nói rõ thứ tự ưu tiên khi một bước kéo theo thất bại.
  - Thành phần hiển thị: Một đoạn chữ nhỏ cuối khối 4; cụm phải hiện ra được in đậm.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc áp lên hạng mục nút Xác nhận lock.
- **qa**:
  - -

### Item 6: Khối 5 — bảng đường vào sau khi lock

- **itemId**: img-028
- **nameJP**: -
- **nameTrans**: Post-lock write paths block
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
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=26 startY=1283 endX=1026 endY=1562
- **description**:
  - Mục đích và ngữ cảnh: Liệt kê đủ mọi đường ghi có thể nhắm vào một ngày đã lock và kết quả của từng đường; đây là bảng nghiệm thu của FE-026 và FR-CORR-03.
  - Thành phần hiển thị: Tiêu đề khối dẫn BR-CLOSE-01 · FR-CORR-03 · FE-026; bên dưới là bảng ba cột năm dòng và một đoạn ghi chú nghiệm thu.
  - Chức năng và logic: Chỉ đọc; nội dung là đặc tả hành vi của tầng chặn ghi sau lock.
- **qa**:
  - -

### Item 6.1: Bảng đường vào và kết quả sau lock

- **itemId**: img-029
- **nameJP**: -
- **nameTrans**: Post-lock path outcome table
- **itemType**: table
- **itemSubtype**: bảng ba cột
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
- **databaseNote**: Đường ghi hợp lệ sau lock đi qua bảng yêu cầu điều chỉnh và bảng điều chỉnh giao dịch của miền D-SETTLE; hai bảng này cố ý không chịu tầng chặn ghi theo ngày lock.
- **validationNote**: Điều kiện: sửa · xoá · tạo mới bản ghi mang ngày đã lock đều bị chặn.<br>Điều kiện: mỗi lần thử bị chặn phải sinh một dòng log mang chủ thể · thời điểm · đối tượng bị nhắm · đường vào và kết quả bị chặn.<br>Lỗi: đường mở lock không tồn tại; mọi nhu cầu sửa số phải đi đường yêu cầu điều chỉnh có phê duyệt.
- **bbox**: startX=42 startY=1327 endX=1010 endY=1500
- **description**:
  - Mục đích và ngữ cảnh: Trả lời dứt điểm câu hỏi sau khi lock thì còn làm được gì; nghiệm thu FR-CORR-03 là hai điều kiện cùng lúc nên bảng có riêng một cột ghi log.
  - Thành phần hiển thị: Ba cột Đường vào · Sau khi lock · Ghi log; năm dòng gồm sửa · xoá · tạo mới · mở lock và yêu cầu điều chỉnh có phê duyệt; dòng tạo mới và dòng yêu cầu điều chỉnh in đậm phần kết luận.
  - Chức năng và logic: Ba đường ghi trực tiếp đều bị chặn và đều ghi log; mở lock không có đường nào; yêu cầu điều chỉnh có phê duyệt là đường duy nhất còn lại và nó sinh bản ghi đảo ngược hoặc phần chênh lệch chứ không ghi đè lịch sử.
- **qa**:
  - Dòng tạo mới bản ghi mang ngày đã lock được xếp vào diện phải chặn theo suy luận từ mục đích của lock; khách có xác nhận cách đọc này không?
  - Log của một lần thử bị chặn có phát thông báo cho người vận hành hay chỉ nằm trong nhật ký tra cứu?

### Item 6.2: Ghi chú nghiệm thu hai điều kiện

- **itemId**: img-030
- **nameJP**: -
- **nameTrans**: Two-condition acceptance note
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
- **bbox**: startX=42 startY=1503 endX=1010 endY=1535
- **description**:
  - Mục đích và ngữ cảnh: Nhấn lại điểm dễ đạt một nửa: chặn được mà không ghi log thì chưa đạt FR-CORR-03; và nói rõ lock chặn ghi chứ không chặn đọc.
  - Thành phần hiển thị: Một đoạn chữ nhỏ dưới bảng; các cụm đều bị chặn · đều có log · ghi · đọc được in đậm hoặc in nghiêng.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc nghiệm thu áp lên hạng mục bảng đường vào.
- **qa**:
  - -
