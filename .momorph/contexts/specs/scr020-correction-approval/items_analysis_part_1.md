# Items Analysis - scr020-correction-approval

## Screen context

- source: `.momorph/shots/SC-21-phe-duyet-yeu-cau-dieu-chinh.png` (image mode, 1280x2369 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-08 · Feature List FE-029 · RFP FR-CORR-02 (ràng buộc kèm GOV-RULE-01 maker-checker; FR-AUDIT-01; FR-INC-03)
- batch: 1/3

### Item 1: Khối đầu màn phê duyệt yêu cầu điều chỉnh

- **itemId**: img-001
- **nameJP**: -
- **nameTrans**: Screen header block
- **itemType**: others
- **itemSubtype**: khối tiêu đề màn
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
- **bbox**: startX=26 startY=22 endX=1026 endY=138
- **description**:
  - Mục đích và ngữ cảnh: Định danh màn và chuỗi truy vết của nó; cho biết đây là cửa quyết định của nhóm điều chỉnh sau khi chốt.
  - Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; dòng metadata liệt kê FE-029 · FN-08 · ưu tiên P0 · FR-CORR-02 cùng ba ràng buộc kèm và actor; dòng tham chiếu phụ nêu mã thi công · loại màn List-Detail · route và một thẻ trạng thái.
  - Chức năng và logic: Chỉ trình bày; không nhận thao tác.
- **qa**:
  - -

### Item 1.1: Tiêu đề màn

- **itemId**: img-002
- **nameJP**: 修正依頼の承認
- **nameTrans**: Screen title
- **itemType**: label
- **itemSubtype**: tiêu đề cấp hai
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
- **bbox**: startX=26 startY=22 endX=1026 endY=48
- **description**:
  - Mục đích và ngữ cảnh: Cho người dùng biết đang ở màn duyệt hoặc từ chối yêu cầu điều chỉnh và sinh bản ghi đảo ngược hoặc phần chênh lệch.
  - Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã màn SC-21 và tên màn.
  - Chức năng và logic: Tĩnh.
- **qa**:
  - -

### Item 1.2: Dòng metadata truy vết

- **itemId**: img-003
- **nameJP**: -
- **nameTrans**: Traceability metadata line
- **itemType**: label
- **itemSubtype**: đoạn văn nhiều dòng
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
- **bbox**: startX=26 startY=60 endX=1026 endY=115
- **description**:
  - Mục đích và ngữ cảnh: Nối màn về đúng tính năng và điều khoản yêu cầu; nêu rõ maker-checker đến từ GOV-RULE-01 chứ không từ FR-CORR-02.
  - Thành phần hiển thị: Ba dòng chữ nhỏ: dòng tính năng · ưu tiên và yêu cầu; dòng actor nêu bộ phận quyết toán vai người duyệt; dòng tham chiếu phụ nêu mã thi công · loại màn · route và thẻ trạng thái.
  - Chức năng và logic: Tĩnh; không có liên kết điều hướng.
- **qa**:
  - -

### Item 1.2.1: Thẻ trạng thái dựng màn

- **itemId**: img-004
- **nameJP**: -
- **nameTrans**: Build status tag
- **itemType**: label
- **itemSubtype**: thẻ nhỏ trong dòng
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
- **bbox**: startX=430 startY=95 endX=482 endY=115
- **description**:
  - Mục đích và ngữ cảnh: Cho biết màn đã có bản thi công để đối chiếu.
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn cuối dòng tham chiếu phụ với nội dung Đã dựng.
  - Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu.
- **qa**:
  - -

### Item 2: Khối thiết kế đòi theo cột nghiệm thu

- **itemId**: img-005
- **nameJP**: -
- **nameTrans**: Acceptance-criteria block
- **itemType**: others
- **itemSubtype**: khối bảng hai cột
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
- **bbox**: startX=26 startY=154 endX=1026 endY=358
- **description**:
  - Mục đích và ngữ cảnh: Dịch cột nghiệm thu của bốn yêu cầu thành điều phải thấy được trên màn; là bảng kiểm khi nghiệm thu màn này.
  - Thành phần hiển thị: Tiêu đề khối; bên dưới là bảng hai cột bốn dòng cho FR-CORR-02 · GOV-RULE-01 · FR-AUDIT-01 · FR-INC-03.
  - Chức năng và logic: Chỉ đọc; nội dung là ràng buộc phạm vi áp lên panel quyết định và bảng kết quả.
- **qa**:
  - -

### Item 2.1: Bảng yêu cầu và điều phải thấy trên màn

- **itemId**: img-006
- **nameJP**: -
- **nameTrans**: Requirement-to-screen mapping table
- **itemType**: table
- **itemSubtype**: bảng hai cột
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
- **databaseColumn**: status; approved_by; requested_by; kind; qty_delta; unit_price_delta; amount_delta
- **databaseNote**: Miền dữ liệu D-SETTLE và D-TRADE. Hai bảng thi công có thật và khớp thiết kế; cả hai chỉ thêm dòng. Sắc thái: điều kiện người duyệt khác người lập KHÔNG được cài bằng ràng buộc cơ sở dữ liệu mà chỉ so ở tầng ứng dụng.
- **validationNote**: -
- **bbox**: startX=42 startY=199 endX=1010 endY=342
- **description**:
  - Mục đích và ngữ cảnh: Neo từng khối của màn về đúng câu chữ nghiệm thu; bốn dòng là bốn ràng buộc độc lập chứ không suy ra được lẫn nhau.
  - Thành phần hiển thị: Bốn dòng: FR-CORR-02 đòi duyệt hoặc từ chối được và sau khi duyệt bản ghi gốc vẫn giữ nguyên cùng bản ghi đảo ngược hoặc chênh lệch truy được về yêu cầu; GOV-RULE-01 đòi người phê duyệt khác người lập; FR-AUDIT-01 đòi thao tác phê duyệt truy được chủ thể · thời điểm · trước sau và lý do; FR-INC-03 đòi phần chênh lệch tiền thưởng xuất hiện ở kỳ tiếp theo.
  - Chức năng và logic: Chỉ đọc; dòng GOV-RULE-01 in đậm cụm ràng buộc riêng vì maker-checker không suy ra được từ vai trò.
- **qa**:
  - -

### Item 3: Khối danh sách yêu cầu

- **itemId**: img-007
- **nameJP**: -
- **nameTrans**: Request list block
- **itemType**: others
- **itemSubtype**: khối lọc và bảng danh sách
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
- **databaseColumn**: status; reason; requested_by; approved_by; evidence_path
- **databaseNote**: Danh sách đọc từ bảng yêu cầu điều chỉnh; mã giao dịch lấy qua khoá ngoại tới bảng giao dịch.
- **validationNote**: -
- **bbox**: startX=26 startY=371 endX=1026 endY=700
- **description**:
  - Mục đích và ngữ cảnh: Hàng đợi quyết định của người duyệt: thấy yêu cầu nào đang chờ · lý do người lập nêu · bằng chứng và trạng thái maker-checker của chính mình trên từng dòng.
  - Thành phần hiển thị: Tiêu đề khối; một ô lọc theo trạng thái; bảng năm cột bốn dòng mẫu; một đoạn ghi chú về liên kết bằng chứng.
  - Chức năng và logic: Mặc định lọc chờ duyệt; cột Maker-checker nói rõ dòng nào người đang xem được phép quyết định.
- **qa**:
  - Danh sách có phân trang không; và sắp xếp mặc định theo thời điểm gửi cũ nhất trước hay mới nhất trước?

### Item 3.1: Ô lọc theo trạng thái

- **itemId**: img-008
- **nameJP**: 状態で絞り込み
- **nameTrans**: Status filter
- **itemType**: dropdown
- **itemSubtype**: ô chọn một giá trị
- **buttonType**: -
- **dataType**: string
- **format**: -
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Chờ duyệt
- **userAction**: on_click
- **transitionNote**: Đổi giá trị thì tải lại bảng danh sách theo trạng thái mới; không rời màn.
- **databaseTable**: correction_request
- **databaseColumn**: status
- **databaseNote**: Cột trạng thái nhận đúng ba giá trị chờ duyệt · đã duyệt · bị từ chối; lựa chọn tất cả là bộ lọc rỗng chứ không phải một giá trị của cột.
- **validationNote**: Điều kiện: chỉ nhận bốn lựa chọn tất cả · chờ duyệt · đã duyệt · bị từ chối.<br>Lỗi: giá trị ngoài tập phải bị từ chối và nói rõ là lọc sai; không được trả danh sách rỗng im lặng vì người dùng sẽ đọc thành hết việc.
- **bbox**: startX=42 startY=415 endX=1010 endY=494
- **description**:
  - Mục đích và ngữ cảnh: Chọn nhóm yêu cầu cần xem; mặc định là chờ duyệt vì màn này là hàng đợi quyết định.
  - Thành phần hiển thị: Nhãn Lọc theo trạng thái; ô chọn rộng hết khối hiện Chờ duyệt; dòng nhắc bên dưới liệt bốn lựa chọn và nêu lựa chọn mặc định.
  - Chức năng và logic: Bộ lọc phải là ô chọn ngay trên màn; và phải phân biệt được trạng thái rỗng do hết việc với trạng thái rỗng do lọc không khớp.
- **qa**:
  - Bộ lọc có nhớ lựa chọn lần trước khi người dùng trở lại màn không?
  - Có cần thêm bộ lọc theo ngày nghiệp vụ hoặc theo người lập khi hàng đợi dài không?

### Item 3.2: Bảng danh sách yêu cầu năm cột

- **itemId**: img-009
- **nameJP**: 修正依頼一覧
- **nameTrans**: Correction request list table
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
- **databaseTable**: correction_request
- **databaseColumn**: target_txn_id; reason; status; evidence_path; requested_by; approved_by
- **databaseNote**: Mã giao dịch lấy qua khoá ngoại tới bảng giao dịch. Cột Maker-checker là giá trị dẫn xuất từ việc so người lập với người đang xem.
- **validationNote**: -
- **bbox**: startX=42 startY=504 endX=1010 endY=654
- **description**:
  - Mục đích và ngữ cảnh: Cho người duyệt đủ dữ liệu để quyết định ngay trên danh sách: sửa cái gì · vì sao · đang ở trạng thái nào · có bằng chứng gì và mình có được quyết định dòng này không.
  - Thành phần hiển thị: Năm cột; bốn dòng mẫu phủ đủ bốn tình huống: chờ duyệt và duyệt được · chờ duyệt nhưng chính mình là người lập · đã duyệt · bị từ chối. Cột Trạng thái là nhãn màu; cột Bằng chứng là liên kết; cột Maker-checker hiện tên người lập và người duyệt.
  - Chức năng và logic: Chỉ đọc; dòng bị từ chối không có liên kết bằng chứng nào là một khả năng cần xử lý; cột Maker-checker phải nói thẳng khi người đang xem không được quyết định dòng đó.
- **qa**:
  - Dòng bị từ chối trong ảnh mẫu để dấu gạch ở cột Bằng chứng — bằng chứng bị thu hồi sau khi từ chối hay chỉ là trạng thái không tạo được liên kết?
  - Cột Lý do dài thì cắt bớt kèm chỗ mở rộng hay hiện đủ và để dòng cao lên?

### Item 3.2.1: Nhãn trạng thái yêu cầu trong dòng

- **itemId**: img-010
- **nameJP**: -
- **nameTrans**: Request status badge
- **itemType**: label
- **itemSubtype**: nhãn trong ô bảng
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
- **databaseColumn**: status
- **databaseNote**: Ba giá trị của cột trạng thái; giá trị khi tạo luôn là chờ duyệt và do phía hệ thống đặt.
- **validationNote**: -
- **bbox**: startX=494 startY=537 endX=553 endY=557
- **description**:
  - Mục đích và ngữ cảnh: Cho biết ngay dòng nào còn phải quyết định.
  - Thành phần hiển thị: Nhãn chữ nhỏ viền tròn trong ô cột Trạng thái; bốn dòng mẫu cho ba giá trị Chờ duyệt · Đã duyệt · Bị từ chối. Các nhãn gộp thành một hạng mục vì cùng cấu trúc và cùng vai trò.
  - Chức năng và logic: Chỉ đọc; trạng thái đổi được đúng một lần từ chờ duyệt sang đã duyệt hoặc bị từ chối.
- **qa**:
  - -

### Item 3.3: Ghi chú liên kết bằng chứng có hạn giờ

- **itemId**: img-011
- **nameJP**: -
- **nameTrans**: Time-limited evidence link note
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
- **databaseNote**: Đường dẫn tệp bằng chứng không bao giờ có mặt trong file xuất; báo cáo log điều chỉnh sau lock RPT-08 cố ý không có cột này.
- **validationNote**: -
- **bbox**: startX=42 startY=657 endX=1010 endY=673
- **description**:
  - Mục đích và ngữ cảnh: Chốt cách mở tệp bằng chứng: liên kết có hạn giờ sinh tại thời điểm mở màn; đây là ràng buộc bảo mật của tệp chứng từ.
  - Thành phần hiển thị: Một đoạn chữ nhỏ dưới bảng; cụm có hạn giờ in đậm.
  - Chức năng và logic: Chỉ trình bày; nội dung là ràng buộc áp lên cột Bằng chứng của bảng danh sách.
- **qa**:
  - Liên kết bằng chứng có hạn giờ là bao nhiêu giây; và hết hạn giữa lúc người duyệt đang xem thì màn xử lý ra sao?

### Item 4: Khối panel quyết định

- **itemId**: img-012
- **nameJP**: -
- **nameTrans**: Decision panel block
- **itemType**: others
- **itemSubtype**: khối form quyết định
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
- **databaseColumn**: kind; qty_delta; unit_price_delta; amount_delta
- **databaseNote**: Panel ghi một dòng mới vào bảng điều chỉnh giao dịch; bảng này chỉ thêm dòng và không bao giờ sửa bản ghi giao dịch gốc.
- **validationNote**: -
- **bbox**: startX=26 startY=713 endX=1026 endY=1114
- **description**:
  - Mục đích và ngữ cảnh: Nơi thực hiện quyết định của FR-CORR-02: duyệt hoặc từ chối; và nơi chọn hình thức ghi là đảo ngược toàn bộ hay chỉ phần chênh lệch.
  - Thành phần hiển thị: Tiêu đề khối nêu hai điều kiện hiện panel; bên dưới là ô chọn Loại điều chỉnh dạng nhóm lựa chọn; hai ô chênh lệch số lượng và đơn giá; vùng văn bản Lý do quyết định; hai nút Duyệt và Từ chối; một đoạn ghi chú về cách tính số tiền.
  - Chức năng và logic: Chỉ hiện khi yêu cầu đang chờ duyệt VÀ người xem khác người lập; hai điều kiện phải cùng đúng.
- **qa**:
  - -

### Item 4.1: Ô chọn Loại điều chỉnh

- **itemId**: img-013
- **nameJP**: 修正区分
- **nameTrans**: Adjustment kind
- **itemType**: radio_button
- **itemSubtype**: nhóm hai lựa chọn loại trừ nhau
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Đảo ngược toàn bộ (reverse)
- **userAction**: on_click
- **transitionNote**: Chọn chỉ phần chênh lệch thì hai ô chênh lệch trở thành bắt buộc; chọn đảo ngược toàn bộ thì hệ thống tự triệt tiêu toàn bộ giá trị gốc.
- **databaseTable**: transaction_adjustment
- **databaseColumn**: kind
- **databaseNote**: Cột loại điều chỉnh nhận đúng hai giá trị đảo ngược và chênh lệch; đây là ràng buộc ở tầng cơ sở dữ liệu.
- **validationNote**: Điều kiện: đúng một trong hai lựa chọn đảo ngược toàn bộ hoặc chỉ phần chênh lệch.<br>Lỗi: thiếu loại điều chỉnh khi bấm Duyệt thì từ chối và nói rõ là chưa chọn loại điều chỉnh.
- **bbox**: startX=42 startY=757 endX=1010 endY=825
- **description**:
  - Mục đích và ngữ cảnh: Chọn hình thức ghi bản ghi mới; hai lối này là hai lối duy nhất FR-CORR-02 cho phép.
  - Thành phần hiển thị: Nhãn Loại điều chỉnh kèm dấu sao bắt buộc; một hàng hai lựa chọn loại trừ nhau với lựa chọn đảo ngược toàn bộ đang được chọn; dòng nhắc nêu cả hai lối đều thêm bản ghi mới.
  - Chức năng và logic: Cả hai lối đều THÊM bản ghi mới; không lối nào sửa bản ghi gốc. Đảo ngược toàn bộ là cùng một cơ chế: thêm một dòng triệt tiêu toàn bộ giao dịch gốc chứ không xoá giao dịch gốc.
- **qa**:
  - Đảo ngược toàn bộ rồi có cần tạo lại giao dịch đúng bằng một đường riêng không; hay việc tạo lại nằm ngoài phạm vi màn này?

### Item 4.2: Ô nhập Chênh lệch số lượng

- **itemId**: img-014
- **nameJP**: 数量の差分
- **nameTrans**: Quantity delta
- **itemType**: text_form
- **itemSubtype**: ô nhập số một dòng
- **buttonType**: -
- **dataType**: integer
- **format**: số thập phân hai chữ số; nhận giá trị âm
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction_adjustment
- **databaseColumn**: qty_delta
- **databaseNote**: Cột số thập phân hai chữ số; nhận giá trị âm vì lối đảo ngược phải triệt tiêu được giá trị gốc.
- **validationNote**: Điều kiện: bắt buộc khi chọn chỉ phần chênh lệch.<br>Điều kiện: chênh lệch số lượng và chênh lệch đơn giá không được cùng bằng 0 — không có gì để ghi thì bị từ chối.<br>Lỗi: thiếu hoặc không hợp lệ thì từ chối và nói rõ chênh lệch không hợp lệ.
- **bbox**: startX=42 startY=836 endX=521 endY=915
- **description**:
  - Mục đích và ngữ cảnh: Nhập phần số lượng phải cộng thêm hoặc trừ đi so với giao dịch gốc.
  - Thành phần hiển thị: Nhãn Chênh lệch số lượng kèm dấu sao bắt buộc; ô nhập số hiện mẫu -12.00; dòng nhắc nêu điều kiện bắt buộc và điều kiện không được cả hai bằng 0.
  - Chức năng và logic: Chỉ bắt buộc ở lối chỉ phần chênh lệch; nhận số âm; hệ thống dùng giá trị này cùng đơn giá gốc để tính lại số tiền chênh lệch.
- **qa**:
  - Chênh lệch số lượng có bị chặn theo biên nào không; ví dụ trừ nhiều hơn số lượng gốc thành số hiệu lực âm.
  - Số lượng lấy đơn vị gì và có bao nhiêu chữ số thập phân do khách chốt?

### Item 4.3: Ô nhập Chênh lệch đơn giá

- **itemId**: img-015
- **nameJP**: 単価の差分
- **nameTrans**: Unit price delta
- **itemType**: text_form
- **itemSubtype**: ô nhập số một dòng
- **buttonType**: -
- **dataType**: integer
- **format**: số nguyên JPY; không có phần lẻ
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction_adjustment
- **databaseColumn**: unit_price_delta
- **databaseNote**: Cột số nguyên; đơn giá tính bằng JPY nên mọi phần lẻ phải bị chặn trước khi tới tầng cơ sở dữ liệu.
- **validationNote**: Điều kiện: bắt buộc khi chọn chỉ phần chênh lệch.<br>Điều kiện: phải là số nguyên JPY — đơn giá không có phần lẻ.<br>Điều kiện: không được cùng bằng 0 với chênh lệch số lượng.<br>Lỗi: nhập số thập phân phải bị từ chối ngay như lỗi nhập liệu chứ không rơi thành lỗi hệ thống.
- **bbox**: startX=532 startY=836 endX=1010 endY=915
- **description**:
  - Mục đích và ngữ cảnh: Nhập phần đơn giá phải cộng thêm hoặc trừ đi so với giao dịch gốc.
  - Thành phần hiển thị: Nhãn Chênh lệch đơn giá kèm dấu sao bắt buộc; ô nhập số hiện mẫu 0; dòng nhắc nêu đơn giá tính bằng JPY và không có phần lẻ.
  - Chức năng và logic: Chỉ bắt buộc ở lối chỉ phần chênh lệch; phải chặn số thập phân ngay tại ô nhập vì đây là lỗi nhập liệu chứ không phải lỗi hệ thống.
- **qa**:
  - Chênh lệch đơn giá có biên trên hay biên dưới nào do khách chốt không?
