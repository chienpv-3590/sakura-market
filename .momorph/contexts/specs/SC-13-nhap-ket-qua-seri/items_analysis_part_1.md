# Items Analysis - SC-13 · Nhập kết quả せり

## Screen context

- **screen**: SC-13 · Nhập kết quả せり
- **source-family**: image
- **source-token**: SC-13-nhap-ket-qua-seri
- **source-image**: .momorph/shots/SC-13-nhap-ket-qua-seri.png
- **canvas**: 1280 x 2208 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-018 (FN-05) · ưu tiên P0
- **requirement-refs**: FR-SERI-01 · FR-SERI-02 · SCOPE-OUT-02 · kế thừa FR-PARTY-02 · BR-PERM-01 · FR-LOT-03 · BR-LOT-02 · FR-CORR-03 · BR-CLOSE-01 · FR-AUDIT-01
- **state-machine**: FIG-012 (RFP:637) — tiêu đề hình phủ cả 相対取引 và せり
- **actor**: Người điều hành đấu giá (ROLE-TRADE)
- **batch**: 1/3 (15 items)

### Item 1: Khối tiêu đề màn hình

- **itemId**: img-001
- **itemName**: Khối tiêu đề màn hình
- **nameJP**: -
- **nameTrans**: Screen header block
- **itemType**: others
- **itemSubtype**: screen_header
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: dải đầu trang định vị người dùng và khai chuỗi truy vết của màn
  Thành phần hiển thị: tiêu đề màn; một dòng meta liệt kê mã FE / FN / yêu cầu khách / ràng buộc phạm vi / actor; và hai thẻ ghi chú
  Chức năng và logic: chỉ hiển thị — không có tương tác nào trong khối này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=22 endX=1026 endY=156

### Item 1.1: Tiêu đề màn hình

- **itemId**: img-002
- **itemName**: Tiêu đề màn hình
- **nameJP**: -
- **nameTrans**: Screen title
- **itemType**: label
- **itemSubtype**: page_title
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: tên màn đặt ngay đầu trang
  Thành phần hiển thị: một dòng chữ đậm "SC-13 · Nhập kết quả せり"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=22 endX=1026 endY=48

### Item 1.2: Dòng meta truy vết yêu cầu

- **itemId**: img-003
- **itemName**: Dòng meta truy vết yêu cầu
- **nameJP**: -
- **nameTrans**: Requirement trace meta line
- **itemType**: label
- **itemSubtype**: screen_meta
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chuỗi truy vết của màn — khai cả bốn yêu cầu kế thừa từ tầng nghiệp vụ vì chúng viết trung tính về kênh
  Thành phần hiển thị: mã FE-018 và nhóm FN-05; ưu tiên P0; hai yêu cầu FR-SERI; ràng buộc phạm vi SCOPE-OUT-02; bốn yêu cầu kế thừa; và actor kèm vai ROLE-TRADE
  Chức năng và logic: văn bản tĩnh — dòng này là căn cứ để màn せり áp cùng hai cửa kiểm với màn 相対取引
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Dòng meta này là chú thích của wireframe hay nội dung sẽ có trên màn thật? Thiết kế không khai.
  - TBL-ROLE-01 (RFP:245) giao ROLE-TRADE cả việc "ghi nhận kết quả đấu giá" — có cần tách một vai người điều hành đấu giá riêng không? Thiết kế dùng chung một vai.
- **position**: startX=26 startY=60 endX=1026 endY=133

### Item 1.3: Thẻ trạng thái thi công

- **itemId**: img-004
- **itemName**: Thẻ trạng thái thi công
- **nameJP**: -
- **nameTrans**: Build status tag
- **itemType**: label
- **itemSubtype**: status_tag
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết màn này đã có bản thi công để đối chiếu
  Thành phần hiển thị: một thẻ chữ nhỏ viền bo với chữ "Đã dựng"
  Chức năng và logic: nhãn tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=385 startY=113 endX=437 endY=133

### Item 1.4: Thẻ ghi chú ranh giới số hóa

- **itemId**: img-005
- **itemName**: Thẻ ghi chú ranh giới số hóa
- **nameJP**: -
- **nameTrans**: Digitisation boundary tag
- **itemType**: label
- **itemSubtype**: scope_tag
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nhắc ranh giới phạm vi ngay ở đầu màn — chỉ nhập tay và không nhận dạng tự động
  Thành phần hiển thị: một thẻ chữ nhỏ với chữ "Chỉ nhập tay · không nhận dạng"
  Chức năng và logic: nhãn tĩnh — bám SCOPE-OUT-02 (RFP:405) và FR-SERI-01 (RFP:653)
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=440 startY=113 endX=595 endY=133

### Item 2: Khối form nhập tay kết quả cuối cùng

- **itemId**: img-006
- **itemName**: Khối form nhập tay kết quả cuối cùng
- **nameJP**: -
- **nameTrans**: Final result manual input section
- **itemType**: others
- **itemSubtype**: form_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: toàn bộ phần nhập tay của màn — năm trường mà FR-SERI-02 (RFP:654) đòi lưu cho một kết quả せり cộng trường lô hàng
  Thành phần hiển thị: tiêu đề khối; sáu trường xếp hai cột mỗi trường kèm một dòng chú thích quy tắc; và một nút lưu
  Chức năng và logic: người vận hành nhập kết quả đã chốt tại sàn; FR-SERI-01 (RFP:653) chỉ cho ghi nhận kết quả CUỐI CÙNG do người nhập — không có đường nhận dạng tự động nào
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: -
- **databaseNote**: Ghi vào thực thể kết quả đấu giá của miền D-TRADE (RFP:604) — thực thể riêng khác với thực thể giao dịch 相対取引.
- **qa**: -
- **position**: startX=26 startY=172 endX=1026 endY=606

### Item 2.1: Tiêu đề khối form nhập tay

- **itemId**: img-007
- **itemName**: Tiêu đề khối form nhập tay
- **nameJP**: -
- **nameTrans**: Manual input section title
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
  Mục đích và ngữ cảnh: nói rõ khối này chứa đúng năm trường mà yêu cầu khách đòi và chỉ nhận nhập tay
  Thành phần hiển thị: một dòng tiêu đề "Form nhập tay kết quả cuối cùng — năm trường FR-SERI-02 đòi"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=188 endX=1010 endY=205

### Item 2.2: Trường Lô hàng

- **itemId**: img-008
- **itemName**: Trường Lô hàng
- **nameJP**: ロット
- **nameTrans**: Lot selector
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: LOT-<NNNN> — <tên mặt hàng>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: option chỉ gồm lô đang ở chặng bán được của FIG-011 (RFP:616).
  Điều kiện: một lô có ĐÚNG MỘT kết quả せり cuối cùng — FR-SERI-01 (RFP:653) chỉ cho ghi nhận kết quả cuối cùng nên tính duy nhất phải là ràng buộc dữ liệu chứ không phải một lần đọc trước khi ghi.
  Lỗi: "Lô LOT-0003 đã có kết quả せり; hãy chỉnh sửa bản ghi hiện có thay vì tạo mới." — chỉ đường sang SC-14.
- **description**:
  Mục đích và ngữ cảnh: chọn lô hàng vừa đấu giá xong — lô là cái định danh bản ghi kết quả
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select hiện mã lô và tên mặt hàng; và một dòng chú thích về tính duy nhất theo lô
  Chức năng và logic: hai người nhập cùng một lô cùng lúc thì đúng một người ghi được; tính duy nhất theo lô là ràng buộc dữ liệu chứ không phải quy tắc ở tầng ứng dụng
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: lot_id
- **databaseNote**: Khoá ngoại tới thực thể lô hàng của miền D-LOT (RFP:603). Thiết kế đòi tính duy nhất theo lô là ràng buộc dữ liệu — ràng buộc này CHƯA TỒN TẠI trên thực thể hiện có.
- **qa**:
  - Danh sách lô có lọc theo chặng bán được của FIG-011 giống SC-11 không? Thiết kế nói có nhưng cần xác nhận vì hai màn dùng hai tiêu chí khác nhau ở bản thi công.
  - Option có cần hiện số lượng khả dụng còn lại để người nhập tự cân số lượng không? Thiết kế không khai.
  - Lô đã có kết quả せり thì bị loại khỏi danh sách hay vẫn hiện kèm cảnh báo? Thiết kế chỉ nói chặn tạo mới.
- **position**: startX=42 startY=216 endX=521 endY=328

### Item 2.3: Trường Người thắng

- **itemId**: img-009
- **itemName**: Trường Người thắng
- **nameJP**: 落札者
- **nameTrans**: Winner selector
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
  Điều kiện: người thắng phải có 許可 hoặc 承認 CÒN HIỆU LỰC tại thời điểm chốt kết quả — BR-PERM-01 (RFP:595) và FR-PARTY-02 (RFP:630) viết ở tầng quy tắc nghiệp vụ và không giới hạn kênh.
  Lỗi: "Người tham gia B đã mất hiệu lực từ <ngày>; không thể ghi kết quả せり." — không ghi bản ghi.
- **description**:
  Mục đích và ngữ cảnh: người thắng phiên đấu giá — một trong năm trường FR-SERI-02 (RFP:654) đòi lưu
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select hiện tên người tham gia; và một dòng chú thích nói rõ vì sao cửa hiệu lực áp cho cả kênh せり
  Chức năng và logic: ghi kết quả せり đúng là một lần chốt giao dịch nên cửa hiệu lực 許可/承認 áp y như ở SC-11; lý do từ chối phải nêu tên người tham gia và ngày mất hiệu lực
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: winner_participant_id
- **databaseNote**: Khoá ngoại tới thực thể người tham gia của miền D-PARTY (RFP:602). Thiết kế đòi cửa hiệu lực tại thời điểm chốt kết quả — cửa này CHƯA CÓ trên nhánh せり của bản thi công.
- **qa**:
  - Danh sách có lọc theo phân loại người tham gia nào không? FR-PARTY-01 (RFP:629) đòi bốn phân loại không được gộp nhưng thiết kế màn này không nói phân loại nào được thắng đấu giá.
  - Người tham gia mất hiệu lực có bị loại khỏi danh sách hay vẫn hiện rồi bị từ chối ở bước lưu? Thiết kế đặt cửa ở thời điểm chốt kết quả.
  - Danh sách dài thì select có tìm theo tên không? Thiết kế không khai.
- **position**: startX=532 startY=216 endX=1010 endY=328

### Item 2.4: Trường Số lượng

- **itemId**: img-010
- **itemName**: Trường Số lượng
- **nameJP**: 数量
- **nameTrans**: Quantity input
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
  Điều kiện: không vượt số lượng khả dụng của lô và không làm số đó âm — FR-LOT-03 (RFP:634) đòi kiểm trước khi cho phép giao dịch; BR-LOT-02 (RFP:596) đòi truy vết được.
  Lỗi: "LOT-0003 chỉ còn <số> khả dụng; kết quả せり cần <số>." — không ghi bản ghi.
- **description**:
  Mục đích và ngữ cảnh: số lượng của kết quả đấu giá — một trong năm trường FR-SERI-02 đòi lưu
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập số; và một dòng chú thích nói rõ tồn của lô là tồn dùng chung cho cả hai kênh bán
  Chức năng và logic: tồn của lô dùng chung nên số lượng ghi ở kênh せり phải trừ vào cùng một số khả dụng mà kênh 相対取引 đang dùng — nếu không thì một lô bán được hai lần
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: qty
- **databaseNote**: Số lượng của kết quả đấu giá trong D-TRADE. Thiết kế đòi trừ vào số lượng khả dụng của thực thể lô hàng (D-LOT) — đường trừ này CHƯA CÓ trên nhánh せり.
- **qa**:
  - Đơn vị đo có hiện cạnh ô nhập không? Thiết kế không khai.
  - Số chữ số thập phân tối đa là bao nhiêu? Ảnh cho thấy hai chữ số nhưng thiết kế không khai ngưỡng.
  - Một lô có thể đấu giá một phần rồi bán phần còn lại qua 相対取引 không? Thiết kế nói tồn dùng chung nhưng không khai có được chia lô theo kênh hay không.
- **position**: startX=42 startY=338 endX=521 endY=433

### Item 2.5: Trường Đơn giá

- **itemId**: img-011
- **itemName**: Trường Đơn giá
- **nameJP**: 単価 (JPY)
- **nameTrans**: Unit price input
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
  Điều kiện: là giá thắng CUỐI CÙNG của phiên — màn không tính hay suy ra giá.
- **description**:
  Mục đích và ngữ cảnh: giá thắng cuối cùng của phiên đấu giá — một trong năm trường FR-SERI-02 đòi lưu
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập số nguyên; và một dòng chú thích nói rõ đây là giá thắng cuối cùng
  Chức năng và logic: chỉ nhận số nguyên JPY; giá hình thành ở sàn đấu giá chứ không do hệ thống suy ra
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: unit_price
- **databaseNote**: Đơn giá của kết quả đấu giá trong D-TRADE. Đơn vị JPY và không có phần thập phân là ràng buộc dữ liệu.
- **qa**:
  - Ô nhập có tự định dạng nhóm nghìn khi gõ như giá trị 2 400 trong ảnh hay chỉ nhận số trần?
  - Có ngưỡng trên nào cho đơn giá cần cảnh báo nhập sai không? Thiết kế không khai.
- **position**: startX=532 startY=338 endX=1010 endY=433

### Item 2.6: Trường Thời điểm quyết định

- **itemId**: img-012
- **itemName**: Trường Thời điểm quyết định
- **nameJP**: 決定時刻
- **nameTrans**: Decided at input
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
  Điều kiện: có thể sớm hơn lúc nhập liệu vì phiên đấu giá chạy trước khi người vận hành nhập.
- **description**:
  Mục đích và ngữ cảnh: thời điểm phiên đấu giá chốt tại sàn — một trong năm trường FR-SERI-02 đòi lưu và là nửa của cặp người xác nhận cộng thời điểm
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập ngày kèm giờ phút; và một dòng chú thích nói rõ giá trị có thể sớm hơn lúc nhập liệu
  Chức năng và logic: do người vận hành nhập chứ không lấy đồng hồ hệ thống; thời điểm tương lai bị chặn vì một phiên chưa diễn ra thì không có kết quả cuối cùng
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: decided_at
- **databaseNote**: Thời điểm quyết định của kết quả đấu giá trong D-TRADE — mốc mà cửa hiệu lực 許可/承認 của BR-PERM-01 nên được đánh giá theo.
- **qa**:
  - Thời điểm quyết định nhập theo múi giờ nào? BR-INC-01 (RFP:598) dùng JST cho ngày nghiệp vụ nhưng thiết kế không khai múi giờ của trường này.
  - Có giới hạn nhập bù về quá khứ không? Thiết kế chỉ chặn tương lai.
  - Thời điểm quyết định có phải nằm trong khung giờ dịch vụ 02:00–10:00 JST của FIG-020 (RFP:819) không? Thiết kế không đòi.
- **position**: startX=42 startY=443 endX=521 endY=538

### Item 2.7: Trường Người xác nhận

- **itemId**: img-013
- **itemName**: Trường Người xác nhận
- **nameJP**: 確認者
- **nameTrans**: Confirmer selector
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: <tên tài khoản nội bộ>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: người đang đăng nhập
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: phải là một tài khoản nội bộ ĐANG HOẠT ĐỘNG — không nhận chữ tự do.
  Điều kiện: giá trị đầu là người đang đăng nhập.
- **description**:
  Mục đích và ngữ cảnh: người chịu trách nhiệm về kết quả — FR-SERI-02 (RFP:654) nhắc tên cặp người xác nhận cộng thời điểm
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select hiện tên tài khoản nội bộ với giá trị đầu là người đang đăng nhập; và một dòng chú thích nói rõ đây không phải chữ tự do
  Chức năng và logic: là một tham chiếu tới tài khoản nội bộ chứ không phải văn bản; đổi người xác nhận là đổi người chịu trách nhiệm nên thao tác này thuộc phạm vi lịch sử chỉnh sửa của FR-SERI-03 (RFP:655)
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: confirmed_by
- **databaseNote**: Khoá ngoại tới tài khoản nội bộ của miền D-PARTY (RFP:602) — chủ thể chịu trách nhiệm về kết quả.
- **qa**:
  - Người xác nhận có buộc phải là người đang đăng nhập hay được chọn một tài khoản khác? Ảnh cho chọn nên nghiêng về được chọn.
  - Người xác nhận có buộc phải thuộc vai nào không? Thiết kế chỉ nói tài khoản nội bộ đang hoạt động.
- **position**: startX=532 startY=443 endX=1010 endY=538

### Item 2.8: Nút Lưu kết quả せり

- **itemId**: img-014
- **itemName**: Nút Lưu kết quả せり
- **nameJP**: -
- **nameTrans**: Save seri result button
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
  Điều kiện: cả sáu trường bắt buộc phải có giá trị.
  Điều kiện: người thắng còn hiệu lực 許可/承認 — FR-PARTY-02 (RFP:630); BR-PERM-01 (RFP:595).
  Điều kiện: lô còn đủ số lượng khả dụng — FR-LOT-03 (RFP:634); BR-LOT-02 (RFP:596).
  Điều kiện: lô chưa có kết quả せり nào — FR-SERI-01 (RFP:653).
  Điều kiện: ngày nghiệp vụ chưa lock — FR-CORR-03 (RFP:658); BR-CLOSE-01 (RFP:597).
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock; không thể ghi bản ghi mới." — mọi lần thử đều bị chặn và có log; đường ra là SC-20 và SC-21.
  Điều kiện: khi đang gửi thì khoá form và chặn gửi trùng.
- **description**:
  Mục đích và ngữ cảnh: ghi kết quả đấu giá cuối cùng vào hệ thống
  Thành phần hiển thị: một nút chính nhãn chữ đặt ở đáy khối form
  Chức năng và logic: gửi sáu trường của khối; hệ thống gán ngày nghiệp vụ và kênh; ghi logical audit theo FR-AUDIT-01 (RFP:710) với chủ thể và timestamp và before/after và lý do
- **userAction**: on_click
- **transitionNote**: Ghi bản ghi kết quả せり rồi chuyển sang chi tiết bản ghi ở SC-14 để người vận hành đọc lại.
- **databaseTable**: seri_result
- **databaseColumn**: lot_id; winner_participant_id; qty; unit_price; decided_at; confirmed_by; business_date
- **databaseNote**: Ghi một bản ghi mới vào thực thể kết quả đấu giá của D-TRADE kèm một bản ghi audit. Thiết kế đòi thao tác này trừ số lượng khả dụng của D-LOT — đường trừ đó chưa có.
- **qa**:
  - Sau khi lưu thành công màn chuyển sang SC-14 — có cần thông báo thành công trước khi chuyển không? Thiết kế chỉ nói chuyển sang chi tiết.
  - Sáu trường có giữ lại giá trị vừa nhập khi gửi thất bại không? Thiết kế không khai.
  - Luồng này có cần dùng được bằng bàn phím như NFR-USE-01 (RFP:816) đòi cho luồng chốt giao dịch không? FE-018 không nhắc NFR-USE-01.
- **position**: startX=42 startY=561 endX=156 endY=590

### Item 3: Khối trường hệ thống gán

- **itemId**: img-015
- **itemName**: Khối trường hệ thống gán
- **nameJP**: -
- **nameTrans**: System-assigned field section
- **itemType**: others
- **itemSubtype**: readonly_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: hai giá trị hệ thống tự quyết — nêu tường minh để người vận hành không đi tìm chỗ nhập
  Thành phần hiển thị: tiêu đề khối và hai trường chỉ đọc: ngày nghiệp vụ và kênh
  Chức năng và logic: chỉ hiển thị — không nhận giá trị từ người dùng ở bất kỳ trường nào trong khối
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: -
- **databaseNote**: Hai giá trị do hệ thống gán trên thực thể kết quả đấu giá của D-TRADE.
- **qa**: -
- **position**: startX=26 startY=619 endX=1026 endY=800

