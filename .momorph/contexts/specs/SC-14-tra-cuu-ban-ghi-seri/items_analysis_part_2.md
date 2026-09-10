# Items Analysis - SC-14 · Tra cứu bản ghi せり

## Screen context

- **screen**: SC-14 · Tra cứu bản ghi せり
- **source-family**: image
- **source-token**: SC-14-tra-cuu-ban-ghi-seri
- **source-image**: .momorph/shots/SC-14-tra-cuu-ban-ghi-seri.png
- **canvas**: 1280 x 2224 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-019 (FN-05) · ưu tiên P1
- **requirement-refs**: FR-SERI-03 · kế thừa FR-SERI-02 · FR-SERI-01 · FR-AUDIT-01 · FR-CORR-03 · BR-CLOSE-01 · FR-LOT-03 · BR-LOT-02 · FR-PARTY-02 · NFR-PERF-01
- **state-machine**: FIG-012 (RFP:637) — phủ cả bản ghi せり; cách ánh xạ còn [CHƯA CHỐT]
- **actor**: Bộ phận đối chiếu (ROLE-SETTLEMENT) và ROLE-TRADE
- **note**: Một mã SC- ứng hai màn con: danh sách và chi tiết
- **batch**: 2/3 (15 items)

### Item 2.7: Ghi chú cột bắt buộc và hiệu năng

- **itemId**: img-016
- **itemName**: Ghi chú cột bắt buộc và hiệu năng
- **nameJP**: -
- **nameTrans**: Required column and performance note
- **itemType**: label
- **itemSubtype**: rule_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: lọc theo một trường thì trường đó PHẢI có mặt trong kết quả — người dùng không tự kiểm được nếu thiếu.
  Điều kiện: danh sách phải phân trang và KHÔNG được cắt kết quả trong im lặng.
  Điều kiện: tìm kiếm thông thường phải đạt p95 không vượt 2 giây — NFR-PERF-01 (RFP:807).
- **description**:
  Mục đích và ngữ cảnh: khai ba quy tắc áp thẳng lên bảng danh sách — cột bắt buộc; nhãn chưa chốt của cột trạng thái; và ngưỡng hiệu năng
  Thành phần hiển thị: một đoạn ghi chú nêu lý do cột Ngày nghiệp vụ phải có; lý do cột Trạng thái mang nhãn [CHƯA CHỐT]; ý nghĩa cột Đã sửa; và ngưỡng p95
  Chức năng và logic: văn bản tĩnh — là điều kiện nghiệm thu cho bảng phía trên
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Khi kết quả vượt một trang thì màn hiện tổng số bản ghi không? Thiết kế chỉ cấm cắt âm thầm.
- **position**: startX=42 startY=483 endX=1010 endY=532

### Item 3: Khung 2 — Chi tiết bản ghi và lịch sử chỉnh sửa

- **itemId**: img-017
- **itemName**: Khung 2 — Chi tiết bản ghi và lịch sử chỉnh sửa
- **nameJP**: -
- **nameTrans**: Seri record detail and edit history frame
- **itemType**: others
- **itemSubtype**: detail_frame
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: đọc lại đủ năm trường FR-SERI-02 (RFP:654) đòi; sửa có kiểm soát kèm lý do bắt buộc; và đọc lại before/after — nửa sau của FR-SERI-03 (RFP:655)
  Thành phần hiển thị: tiêu đề khung; một trường lô chỉ đọc; năm trường sửa được; một ô lý do chỉnh sửa; một nút lưu hoặc chỉ dẫn; và một bảng lịch sử sáu cột
  Chức năng và logic: vai ROLE-TRADE và ROLE-SETTLEMENT sửa được; các vai còn lại thấy đủ bản ghi và lịch sử với form sửa đổi thành chỉ dẫn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: -
- **databaseNote**: Đọc và ghi thực thể kết quả đấu giá của D-TRADE. Sửa trực tiếp chỉ hợp lệ khi ngày nghiệp vụ chưa lock.
- **qa**: -
- **position**: startX=26 startY=571 endX=1026 endY=1240

### Item 3.1: Tiêu đề khung chi tiết

- **itemId**: img-018
- **itemName**: Tiêu đề khung chi tiết
- **nameJP**: -
- **nameTrans**: Detail frame title
- **itemType**: label
- **itemSubtype**: section_title
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: mở đầu khung chi tiết và nêu ba phần của khung
  Thành phần hiển thị: một dòng tiêu đề "Khung 2 — Chi tiết bản ghi; sửa có kiểm soát; và lịch sử"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=587 endX=1010 endY=604

### Item 3.2: Trường Lô hàng (chỉ đọc)

- **itemId**: img-019
- **itemName**: Trường Lô hàng (chỉ đọc)
- **nameJP**: ロット
- **nameTrans**: Lot (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: LOT-<NNNN> — <tên mặt hàng>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: lô hàng của bản ghi — là cái định danh bản ghi nên KHÔNG sửa được ở đây
  Thành phần hiển thị: nhãn tiếng Việt kèm ロット; một ô chỉ đọc hiện mã lô cùng tên mặt hàng; và một dòng chú thích nêu đường xử lý khi ghi sai lô
  Chức năng và logic: ghi sai lô thì phải hủy bản ghi và nhập lại theo đường yêu cầu điều chỉnh FR-CORR-01 (RFP:656) chứ không sửa tại chỗ
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result; lot
- **databaseColumn**: lot_id; lot_code; item
- **databaseNote**: Khoá ngoại tới thực thể lô hàng của D-LOT; hiển thị mã lô và tên mặt hàng thay cho khoá.
- **qa**: - Ghi sai lô đi đường FR-CORR-01 sang SC-20 — có cần một nút chỉ đường ngay tại trường này không? Ảnh chỉ có chú thích chữ.
- **position**: startX=42 startY=615 endX=521 endY=710

### Item 3.3: Trường Người thắng (sửa được)

- **itemId**: img-020
- **itemName**: Trường Người thắng (sửa được)
- **nameJP**: 落札者
- **nameTrans**: Winner selector (editable)
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: <tên người tham gia>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: sửa được và sửa thì PHẢI ghi một dòng before/after — là một trong năm trường FR-SERI-02 (RFP:654) nên nằm trong phạm vi lịch sử chỉnh sửa của FR-SERI-03 (RFP:655).
  Điều kiện: người thắng mới phải còn hiệu lực 許可/承認 — FR-PARTY-02 (RFP:630); BR-PERM-01 (RFP:595).
  Lỗi: "Người tham gia B đã mất hiệu lực từ <ngày>; không thể lưu thay đổi." — cùng cửa với SC-13.
- **description**:
  Mục đích và ngữ cảnh: sửa người thắng khi số liệu lệch với sổ tay tại sàn — trường này thuộc phạm vi lịch sử chỉnh sửa mà FR-SERI-03 đòi
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select hiện tên người tham gia; và một dòng chú thích nói rõ sửa thì phải có hiệu lực và phải có dòng before/after
  Chức năng và logic: mọi thay đổi phải xuất hiện thành một dòng lịch sử với giá trị trước và sau; không được lưu trong im lặng
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: winner_participant_id
- **databaseNote**: Khoá ngoại tới thực thể người tham gia của D-PARTY. Thiết kế đòi cửa hiệu lực khi sửa — cửa này chưa có trên nhánh せり.
- **qa**:
  - Danh sách người thắng có lọc bỏ người đã mất hiệu lực không? Thiết kế đặt cửa ở bước lưu nên nghiêng về không lọc.
  - Đổi người thắng có kéo theo thay đổi nào ở đường giao nhận hàng không? Thiết kế không nối bản ghi せり với giao hàng.
- **position**: startX=532 startY=615 endX=1010 endY=710

### Item 3.4: Trường Số lượng (sửa được)

- **itemId**: img-021
- **itemName**: Trường Số lượng (sửa được)
- **nameJP**: 数量
- **nameTrans**: Quantity input (editable)
- **itemType**: text_form
- **itemSubtype**: number_input
- **buttonType**: -
- **dataType**: number
- **required**: true
- **format**: <số> với dấu phẩy thập phân — ảnh cho thấy 2 chữ số lẻ
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: sửa số lượng vẫn phải tôn trọng FR-LOT-03 (RFP:634) và BR-LOT-02 (RFP:596) — không làm số khả dụng của lô âm.
  Lỗi: "LOT-0003 chỉ còn <số> khả dụng; số lượng mới cần <số>." — không lưu thay đổi.
- **description**:
  Mục đích và ngữ cảnh: sửa số lượng của kết quả đấu giá — thuộc phạm vi lịch sử chỉnh sửa của FR-SERI-03
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập số; và một dòng chú thích nhắc ràng buộc không âm của tồn lô
  Chức năng và logic: thay đổi số lượng phải điều chỉnh lại phần đã trừ vào tồn của lô; ràng buộc không âm áp cả khi sửa chứ không chỉ khi ghi mới
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: qty
- **databaseNote**: Số lượng của kết quả đấu giá trong D-TRADE. Thiết kế đòi phần chênh lệch khi sửa được phản ánh vào số lượng khả dụng của D-LOT.
- **qa**:
  - Sửa số lượng có tự điều chỉnh phần đã trừ vào tồn lô hay chỉ đổi con số trên bản ghi? Thiết kế đòi không làm tồn âm nhưng không khai cách bù trừ.
  - Sửa số lượng sau khi đã có giao nhận hàng thì xử lý thế nào? Thiết kế không nối bản ghi せり với giao hàng.
- **position**: startX=42 startY=720 endX=521 endY=799

### Item 3.5: Trường Đơn giá (sửa được)

- **itemId**: img-022
- **itemName**: Trường Đơn giá (sửa được)
- **nameJP**: 単価 (JPY)
- **nameTrans**: Unit price input (editable)
- **itemType**: text_form
- **itemSubtype**: number_input
- **buttonType**: -
- **dataType**: integer
- **required**: true
- **format**: <số nguyên JPY> — không có phần thập phân
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: JPY không có phần thập phân nên chỉ nhận số nguyên.
- **description**:
  Mục đích và ngữ cảnh: sửa đơn giá thắng khi lệch với sổ tay tại sàn — tình huống mà FR-SERI-03 nhắm tới
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc và một ô nhập số nguyên
  Chức năng và logic: thay đổi phải xuất hiện thành một dòng before/after trong bảng lịch sử
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: unit_price
- **databaseNote**: Đơn giá của kết quả đấu giá trong D-TRADE. Đơn vị JPY và không có phần thập phân là ràng buộc dữ liệu.
- **qa**: - Sửa đơn giá sau khi kỳ đã được đối chiếu nhưng chưa lock thì có cần cảnh báo ảnh hưởng tới bảng đối chiếu ngày không? Thiết kế không khai.
- **position**: startX=532 startY=720 endX=1010 endY=799

### Item 3.6: Trường Thời điểm quyết định (sửa được)

- **itemId**: img-023
- **itemName**: Trường Thời điểm quyết định (sửa được)
- **nameJP**: 決定時刻
- **nameTrans**: Decided at input (editable)
- **itemType**: date_picker
- **itemSubtype**: datetime_input
- **buttonType**: -
- **dataType**: date
- **required**: true
- **format**: YYYY-MM-DD hh:mm
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: KHÔNG nhận thời điểm tương lai.
  Lỗi: "Thời điểm quyết định không được ở tương lai."
- **description**:
  Mục đích và ngữ cảnh: sửa thời điểm phiên đấu giá chốt tại sàn — một trong năm trường FR-SERI-02 đòi lưu
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập ngày kèm giờ phút; và một dòng chú thích chặn thời điểm tương lai
  Chức năng và logic: thay đổi phải xuất hiện thành một dòng before/after; giá trị tương lai bị chặn vì một phiên chưa diễn ra thì không có kết quả cuối cùng
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: decided_at
- **databaseNote**: Thời điểm quyết định của kết quả đấu giá trong D-TRADE.
- **qa**: - Sửa thời điểm quyết định có kéo theo đổi ngày nghiệp vụ của bản ghi không? Câu hỏi này gắn với mục [CHƯA CHỐT] về ngày nghiệp vụ ở SC-13.
- **position**: startX=42 startY=809 endX=521 endY=904

### Item 3.7: Trường Người xác nhận (sửa được)

- **itemId**: img-024
- **itemName**: Trường Người xác nhận (sửa được)
- **nameJP**: 確認者
- **nameTrans**: Confirmer selector (editable)
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: <tên tài khoản nội bộ>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: phải là một tài khoản nội bộ đang hoạt động — không nhận chữ tự do.
  Điều kiện: dòng lịch sử phải gọi trường bằng TÊN NGHIỆP VỤ chứ không phải tên cột kỹ thuật.
- **description**:
  Mục đích và ngữ cảnh: sửa người chịu trách nhiệm về kết quả — đổi trường này là đổi người chịu trách nhiệm
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select hiện tên tài khoản nội bộ; và một dòng chú thích đòi dòng lịch sử gọi trường bằng tên nghiệp vụ
  Chức năng và logic: thay đổi phải xuất hiện thành một dòng before/after với tên trường mà người kiểm toán đọc được
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: confirmed_by
- **databaseNote**: Khoá ngoại tới tài khoản nội bộ của D-PARTY — chủ thể chịu trách nhiệm về kết quả.
- **qa**:
  - Đổi người xác nhận có cần lý do riêng khác với lý do chỉnh sửa chung không? Thiết kế chỉ đòi một lý do cho mỗi lần sửa.
  - Người xác nhận mới có buộc phải thuộc vai nào không? Thiết kế chỉ nói tài khoản nội bộ đang hoạt động.
- **position**: startX=532 startY=809 endX=1010 endY=904

### Item 3.8: Trường Lý do chỉnh sửa

- **itemId**: img-025
- **itemName**: Trường Lý do chỉnh sửa
- **nameJP**: 修正理由
- **nameTrans**: Edit reason input
- **itemType**: text_form
- **itemSubtype**: text_input
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: <văn bản tự do một dòng>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: BẮT BUỘC TUYỆT ĐỐI — không có lý do thì không ghi gì.
  Lỗi: "Phải nhập lý do chỉnh sửa." — chặn ngay tại trường; không dùng một thông báo lỗi chung.
  Điều kiện: là nửa thứ hai của nghiệm thu FR-SERI-03 (RFP:655) — tra cứu lại được before/after VÀ LÝ DO chỉnh sửa.
  Điều kiện: FR-AUDIT-01 (RFP:710) đòi lý do cho mọi thao tác sửa.
- **description**:
  Mục đích và ngữ cảnh: lý do chỉnh sửa — điều kiện đóng của FR-SERI-03 và của FR-AUDIT-01
  Thành phần hiển thị: nhãn tiếng Việt kèm 修正理由 và dấu sao bắt buộc; một ô nhập chữ rộng cả khung; và một dòng chú thích nói rõ không có lý do thì không ghi gì
  Chức năng và logic: lý do đi kèm từng lần sửa và tra cứu lại được trong bảng lịch sử; thiếu lý do thì toàn bộ thay đổi bị chặn chứ không ghi một phần
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: audit_log
- **databaseColumn**: reason
- **databaseNote**: Lý do chỉnh sửa lưu vào dấu vết kiểm toán mà FR-AUDIT-01 đòi chứ không lưu trên chính bản ghi kết quả đấu giá.
- **qa**:
  - Lý do chỉnh sửa có tập giá trị chọn sẵn hay hoàn toàn tự do? Thiết kế chỉ nói bắt buộc.
  - Có độ dài tối thiểu để chặn lý do rỗng nghĩa như một dấu chấm không? Thiết kế không khai.
  - Ô lý do có được xoá sau mỗi lần lưu thành công để không dùng lại lý do cũ cho lần sửa sau không? Thiết kế không khai.
- **position**: startX=42 startY=914 endX=1010 endY=983

### Item 3.9: Nút Lưu thay đổi

- **itemId**: img-026
- **itemName**: Nút Lưu thay đổi
- **nameJP**: -
- **nameTrans**: Save changes button
- **itemType**: button
- **itemSubtype**: primary_action
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: lý do chỉnh sửa phải có giá trị — không có thì không ghi gì.
  Điều kiện: người thắng mới còn hiệu lực và số lượng mới không làm tồn lô âm — FR-PARTY-02 (RFP:630); FR-LOT-03 (RFP:634).
  Điều kiện: ngày nghiệp vụ chưa lock — FR-CORR-03 (RFP:658); BR-CLOSE-01 (RFP:597).
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock; không sửa trực tiếp được; đường ra là SC-20 và SC-21." — thông báo phải nói ĐÚNG nguyên nhân; lần thử được ghi log.
  Lỗi: "Không có thay đổi nào." — khi người dùng lưu mà không đổi gì thì nói thẳng chứ không báo đã lưu và đã ghi lịch sử.
  Điều kiện: bản ghi phải chưa bị người khác sửa từ lúc đọc — nếu đã bị sửa thì buộc đọc lại giá trị mới trước khi ghi.
  Điều kiện: khi đang gửi thì khoá form và chặn gửi trùng.
- **description**:
  Mục đích và ngữ cảnh: ghi thay đổi có kiểm soát kèm lý do bắt buộc — thao tác duy nhất có tác dụng ghi trên màn này
  Thành phần hiển thị: một nút chính nhãn chữ đặt cạnh chỉ dẫn dành cho vai chỉ tra cứu
  Chức năng và logic: ghi một dòng lịch sử cho MỖI TRƯỜNG đã đổi kèm giá trị trước và sau và lý do; không lưu im lặng bất kỳ trường nào mà form đã cho sửa
- **userAction**: on_click
- **transitionNote**: Ghi thay đổi vào bản ghi rồi làm mới bảng lịch sử để người dùng đọc lại được dòng before/after vừa sinh.
- **databaseTable**: seri_result; audit_log
- **databaseColumn**: winner_participant_id; qty; unit_price; decided_at; confirmed_by; before; after; reason
- **databaseNote**: Ghi các cột thật sự đổi trên thực thể kết quả đấu giá của D-TRADE và một bản ghi audit với before/after và lý do theo FR-AUDIT-01.
- **qa**:
  - Khi hai người sửa cùng một bản ghi đồng thời thì màn của người sau hiện gì? Thiết kế đòi phát hiện được và cho đọc lại giá trị mới nhưng không khai cách hiển thị.
  - Lưu thành công thì màn ở lại chi tiết hay quay về danh sách? Thiết kế nói làm mới lịch sử nên nghiêng về ở lại.
  - Nếu ghi lịch sử thất bại thì thay đổi có bị hoàn lại không? FR-SERI-03 quan tâm nhất tới chỗ này.
- **position**: startX=42 startY=993 endX=133 endY=1022

### Item 3.10: Chỉ dẫn cho vai chỉ tra cứu

- **itemId**: img-027
- **itemName**: Chỉ dẫn cho vai chỉ tra cứu
- **nameJP**: -
- **nameTrans**: Read-only role handoff caption
- **itemType**: label
- **itemSubtype**: handoff_caption
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho vai không được sửa biết ai làm được thao tác này thay vì để một form không có tác dụng
  Thành phần hiển thị: một khối chữ dạng nút tắt với chữ "Vai ngoài {ROLE-TRADE; ROLE-SETTLEMENT}: chỉ tra cứu"
  Chức năng và logic: thay thế form sửa khi vai hiện tại không thuộc hai vai đó; bản ghi và lịch sử vẫn hiện đủ để đối chiếu chéo
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Vai chỉ tra cứu thấy năm trường ở dạng chỉ đọc hay form biến mất hoàn toàn? Thiết kế nói form sửa đổi thành chỉ dẫn.
  - Quyền sửa theo vai chứ không theo người tạo bản ghi — có cần nói rõ điều đó trên màn không?
- **position**: startX=137 startY=993 endX=449 endY=1022

### Item 3.11: Tiêu đề mục Lịch sử chỉnh sửa

- **itemId**: img-028
- **itemName**: Tiêu đề mục Lịch sử chỉnh sửa
- **nameJP**: 変更履歴
- **nameTrans**: Edit history section title
- **itemType**: label
- **itemSubtype**: section_title
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: mở đầu mục lịch sử và dẫn thẳng nghiệm thu của FR-SERI-03
  Thành phần hiển thị: một dòng tiêu đề "Lịch sử chỉnh sửa · 変更履歴 — before/after · FR-SERI-03"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1035 endX=1010 endY=1052

### Item 3.12: Bảng lịch sử chỉnh sửa before/after

- **itemId**: img-029
- **itemName**: Bảng lịch sử chỉnh sửa before/after
- **nameJP**: 変更履歴
- **nameTrans**: Before and after edit history table
- **itemType**: table
- **itemSubtype**: audit_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nơi nghiệm thu của FR-SERI-03 (RFP:655) được thoả — tra cứu lại được before/after và lý do chỉnh sửa
  Thành phần hiển thị: bảng sáu cột: Thời điểm; Người thực hiện; Trường; Trước; Sau; Lý do — ba dòng mẫu gồm hai lần sửa và một dòng tạo bản ghi
  Chức năng và logic: MỘT DÒNG cho mỗi trường đã đổi; tên trường bằng tiếng nghiệp vụ; mới nhất trước; mọi lần thử ghi vào ngày đã lock cũng phải có mặt ở đây theo FR-CORR-03 (RFP:658)
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: audit_log
- **databaseColumn**: created_at; actor_id; before; after; reason
- **databaseNote**: Đọc dấu vết kiểm toán mà FE-041 và FR-AUDIT-01 (RFP:710) đòi ghi. Vì thực thể kết quả đấu giá không có cột trạng thái nào; bảng này là nguồn duy nhất đáp ứng FR-SERI-03.
- **qa**:
  - Tên trường trong cột Trường hiện bằng nhãn nghiệp vụ nào cho từng cột dữ liệu? Thiết kế đòi tên hiểu được nhưng không cho danh sách nhãn.
  - Bảng có phân trang khi bản ghi có nhiều lần sửa không? Thiết kế không khai.
  - Dòng tạo bản ghi hiện dấu gạch ở ba cột — có cần nhãn rõ hơn là bản ghi được tạo không? Ảnh dùng dấu gạch.
- **position**: startX=42 startY=1063 endX=1010 endY=1178

### Item 3.13: Ghi chú quy tắc đọc lịch sử

- **itemId**: img-030
- **itemName**: Ghi chú quy tắc đọc lịch sử
- **nameJP**: -
- **nameTrans**: History reading rule note
- **itemType**: label
- **itemSubtype**: rule_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: một dòng cho MỖI TRƯỜNG đã đổi; tên trường bằng tiếng nghiệp vụ; mới nhất trước.
  Điều kiện: mọi lần thử sửa trực tiếp vào ngày đã lock đều bị chặn VÀ có log — FR-CORR-03 (RFP:658).
- **description**:
  Mục đích và ngữ cảnh: khai điều kiện nghiệm thu của bảng lịch sử ngay dưới bảng
  Thành phần hiển thị: một dòng ghi chú nêu quy tắc một dòng cho mỗi trường; quy tắc đặt tên trường; thứ tự dòng; và nghiệm thu của FR-CORR-03
  Chức năng và logic: văn bản tĩnh — là điều kiện nghiệm thu cho bảng phía trên
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1181 endX=1010 endY=1213

