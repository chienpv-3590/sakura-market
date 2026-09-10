# Items Analysis - dispute-management

## Screen context

- source: `.momorph/shots/SC-19-quan-ly-tranh-chap.png` (image mode, 1280x2370 px)
- targetLanguage: Vietnamese (nameJP: Japanese, nameTrans: English)
- design source of truth: Function List FN-07 · Feature List FE-027 · RFP FR-SETTLE-03; RPT-09; FR-NOTIFY-01; FR-CORR-02; TBL-ATTACH-01; DR-IMAGE-01
- batch: 1/3

### Item 1: Khối đầu màn quản lý tranh chấp

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
- **bbox**: startX=26 startY=22 endX=1026 endY=121
- **description**:
  - Mục đích và ngữ cảnh: Định danh màn và chuỗi truy vết của nó; cho biết đây là nhánh quản lý tồn đọng của nhóm đối chiếu và chốt kỳ.
  - Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; dòng metadata liệt kê FE-027 · FN-07 · ưu tiên P1 · FR-SETTLE-03 · miền dữ liệu D-SETTLE · báo cáo tiêu thụ RPT-09 · thông báo FR-NOTIFY-01; dòng tham chiếu phụ nêu chưa có mã thi công và route đề xuất cùng một thẻ trạng thái.
  - Chức năng và logic: Chỉ trình bày; không nhận thao tác.
- **qa**:
  - -

### Item 1.1: Tiêu đề màn

- **itemId**: img-002
- **nameJP**: 紛争管理
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
  - Mục đích và ngữ cảnh: Cho người dùng biết đang ở màn mở · theo dõi và đóng tranh chấp phát sinh khi rà số cuối ngày.
  - Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã màn SC-19 và tên màn.
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
- **bbox**: startX=26 startY=60 endX=1026 endY=97
- **description**:
  - Mục đích và ngữ cảnh: Nối màn về đúng tính năng và điều khoản yêu cầu; đồng thời khai route còn là đề xuất chứ chưa phải đường thật.
  - Thành phần hiển thị: Hai dòng chữ nhỏ: dòng tính năng · ưu tiên · yêu cầu · miền dữ liệu · báo cáo và thông báo; dòng tham chiếu phụ nêu chưa có mã thi công cùng route đề xuất và actor.
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
- **bbox**: startX=572 startY=78 endX=647 endY=97
- **description**:
  - Mục đích và ngữ cảnh: Cho biết màn chưa có bản thi công nào để đối chiếu; mọi mô tả trên màn là thiết kế phải dựng.
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn cuối dòng tham chiếu phụ với nội dung Chưa thi công.
  - Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu.
- **qa**:
  - -

### Item 2: Dải cảnh báo màn chưa có bản thi công

- **itemId**: img-005
- **nameJP**: -
- **nameTrans**: Not-yet-built banner
- **itemType**: label
- **itemSubtype**: dải cảnh báo đầu màn
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
- **bbox**: startX=26 startY=137 endX=1026 endY=172
- **description**:
  - Mục đích và ngữ cảnh: Nói thẳng khoảng trống: mọi trường trên màn đọc từ FR-SETTLE-03 và cột nghiệm thu của nó chứ không từ một bản cài đặt nào.
  - Thành phần hiển thị: Dải chữ nhỏ nền vàng nhạt viền nét đứt nằm ngay dưới khối đầu màn; câu đầu in đậm.
  - Chức năng và logic: Chỉ trình bày; là ghi chú tài liệu chứ không phải thành phần sản phẩm.
- **qa**:
  - -

### Item 3: Khối 1 — sáu trường FR-SETTLE-03 đòi

- **itemId**: img-006
- **nameJP**: -
- **nameTrans**: Required field inventory block
- **itemType**: others
- **itemSubtype**: khối bảng ba cột
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
- **bbox**: startX=26 startY=188 endX=1026 endY=450
- **description**:
  - Mục đích và ngữ cảnh: Liệt kê đủ các trường FR-SETTLE-03 và cột nghiệm thu của nó đòi; đây là bảng kiểm để không thiết kế thiếu trường nào.
  - Thành phần hiển thị: Khối viền nét đứt tiêu đề dẫn FR-SETTLE-03; bên dưới là bảng ba cột Trường · Nguồn · Vì sao có với sáu dòng.
  - Chức năng và logic: Chỉ đọc; nội dung là ràng buộc phạm vi áp lên khối chi tiết tranh chấp và khối lịch sử cập nhật.
- **qa**:
  - -

### Item 3.1: Bảng sáu trường và nguồn yêu cầu

- **itemId**: img-007
- **nameJP**: -
- **nameTrans**: Field-to-requirement mapping table
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
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: -
- **bbox**: startX=42 startY=233 endX=1010 endY=434
- **description**:
  - Mục đích và ngữ cảnh: Truy từng trường về đúng câu chữ của yêu cầu khách hàng; bốn trường lấy từ thân yêu cầu và hai trường lấy từ cột nghiệm thu.
  - Thành phần hiển thị: Sáu dòng: Trạng thái tranh chấp · Nguyên nhân · Người phụ trách xử lý đến từ FR-SETTLE-03; Ngày dự kiến xử lý và Lịch sử cập nhật đến từ nghiệm thu FR-SETTLE-03; Kết quả cuối cùng đến từ FR-SETTLE-03.
  - Chức năng và logic: Chỉ đọc; kết luận quan trọng nhất của bảng là Lịch sử cập nhật phải là một bảng con chỉ thêm chứ không phải một ô ghi chú.
- **qa**:
  - Nghiệm thu FR-SETTLE-03 đòi danh sách tranh chấp đang mở nên trạng thái tối thiểu phải phân biệt đang mở với đã đóng; tập giá trị đầy đủ do khách chốt.

### Item 4: Khối 2 — danh sách tranh chấp đang mở

- **itemId**: img-008
- **nameJP**: -
- **nameTrans**: Open dispute list block
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
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: -
- **bbox**: startX=26 startY=463 endX=1026 endY=806
- **description**:
  - Mục đích và ngữ cảnh: Hàng đợi việc của bộ phận đối chiếu; nghiệm thu FR-SETTLE-03 đòi đúng chữ danh sách tranh chấp đang mở nên đây là hạng mục bắt buộc chứ không phải tiện ích.
  - Thành phần hiển thị: Khối viền nét đứt gồm một hàng bốn ô lọc; bảng tám cột ba dòng mẫu; hai nút Lọc và Mở tranh chấp mới; một đoạn ghi chú nguồn tiêu thụ.
  - Chức năng và logic: Mặc định lọc theo trạng thái đang mở; là nguồn dữ liệu của báo cáo RPT-09 và của thông báo tranh chấp đang mở thuộc phạm vi FR-NOTIFY-01.
- **qa**:
  - Danh sách có phân trang không; và sắp xếp mặc định theo ngày dự kiến gần nhất hay theo số ngày tồn đọng lớn nhất?

### Item 4.1: Ô lọc Trạng thái

- **itemId**: img-009
- **nameJP**: 状態
- **nameTrans**: Status filter
- **itemType**: dropdown
- **itemSubtype**: ô chọn một giá trị
- **buttonType**: -
- **dataType**: string
- **format**: -
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Đang mở
- **userAction**: on_click
- **transitionNote**: Đổi giá trị rồi bấm Lọc thì tải lại bảng danh sách theo trạng thái mới; không rời màn.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: chỉ nhận giá trị thuộc tập trạng thái tranh chấp đã chốt với chủ đầu tư.<br>Lỗi: giá trị ngoài tập phải bị từ chối và nói rõ là lọc sai chứ không trả danh sách rỗng im lặng.
- **bbox**: startX=42 startY=507 endX=276 endY=602
- **description**:
  - Mục đích và ngữ cảnh: Chọn nhóm tranh chấp cần xem; mặc định là đang mở vì màn này là hàng đợi việc chứ không phải kho lưu trữ.
  - Thành phần hiển thị: Nhãn Trạng thái; ô chọn hiện Đang mở kèm mũi tên; dòng nhắc bên dưới giải thích lý do chọn mặc định đó.
  - Chức năng và logic: Giá trị mặc định đang mở; tập giá trị đầy đủ chưa được yêu cầu khách hàng liệt nên phải chốt trước khi cài.
- **qa**:
  - Tập giá trị trạng thái tranh chấp gồm những giá trị nào; yêu cầu khách hàng không liệt tập này ở đâu.
  - Bộ lọc có nhớ lựa chọn lần trước khi người dùng trở lại màn không?

### Item 4.2: Ô lọc Ngày nghiệp vụ

- **itemId**: img-010
- **nameJP**: 業務日
- **nameTrans**: Business date filter
- **itemType**: date_picker
- **itemSubtype**: ô chọn ngày một dòng
- **buttonType**: -
- **dataType**: date
- **format**: YYYY-MM-DD
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Lọc danh sách theo ngày nghiệp vụ của tranh chấp; không rời màn.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: đúng định dạng YYYY-MM-DD và là một ngày thật.<br>Lỗi: định dạng sai thì báo lỗi tại ô lọc và giữ nguyên danh sách cũ.
- **bbox**: startX=287 startY=507 endX=521 endY=602
- **description**:
  - Mục đích và ngữ cảnh: Khoanh danh sách về một ngày nghiệp vụ cụ thể khi cần rà lại số của ngày đó.
  - Thành phần hiển thị: Nhãn Ngày nghiệp vụ · 業務日 và ô nhập ngày hiện mẫu 2026-09-08.
  - Chức năng và logic: Không bắt buộc; bỏ trống thì danh sách không giới hạn theo ngày.
- **qa**:
  - Lọc theo một ngày duy nhất là đủ hay cần lọc theo khoảng ngày cho việc rà tồn đọng nhiều ngày?

### Item 4.3: Ô lọc Nguồn phát sinh

- **itemId**: img-011
- **nameJP**: 発生元
- **nameTrans**: Source type filter
- **itemType**: dropdown
- **itemSubtype**: ô chọn một giá trị
- **buttonType**: -
- **dataType**: string
- **format**: -
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Tất cả
- **userAction**: on_click
- **transitionNote**: Lọc danh sách theo loại nguồn phát sinh; không rời màn.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: Điều kiện: chỉ nhận ba loại nguồn của bảng đối chiếu ngày — giao dịch thoả thuận · đấu giá · giao hàng — hoặc giá trị Tất cả.<br>Lỗi: giá trị khác phải bị từ chối.
- **bbox**: startX=532 startY=507 endX=765 endY=602
- **description**:
  - Mục đích và ngữ cảnh: Cho phép tách tranh chấp theo nơi phát sinh vì cách xử lý ba nhánh khác nhau.
  - Thành phần hiển thị: Nhãn Nguồn phát sinh; ô chọn hiện Tất cả; dòng nhắc liệt ba nguồn của bảng đối chiếu ngày FE-025.
  - Chức năng và logic: Tập giá trị lấy đúng ba nguồn của bảng đối chiếu ngày để tranh chấp luôn trỏ về một dòng có thật.
- **qa**:
  - Ngoài ba nguồn của bảng đối chiếu ngày có nguồn tranh chấp nào khác cần mở không; ví dụ tranh chấp về tiền thưởng?

### Item 4.4: Ô lọc Người phụ trách

- **itemId**: img-012
- **nameJP**: 担当者
- **nameTrans**: Assignee filter
- **itemType**: dropdown
- **itemSubtype**: ô chọn một giá trị
- **buttonType**: -
- **dataType**: string
- **format**: -
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Tất cả
- **userAction**: on_click
- **transitionNote**: Lọc danh sách theo người phụ trách xử lý; không rời màn.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: -
- **bbox**: startX=776 startY=507 endX=1010 endY=602
- **description**:
  - Mục đích và ngữ cảnh: Cho người phụ trách xem đúng phần việc của mình và cho người quản lý xem tải của từng người.
  - Thành phần hiển thị: Nhãn Người phụ trách và ô chọn hiện Tất cả.
  - Chức năng và logic: Danh sách chọn chỉ gồm tài khoản đang hoạt động; hiện tên hiển thị chứ không hiện email.
- **qa**:
  - Có cần một lựa chọn nhanh chỉ việc của tôi ngoài danh sách chọn từng người không?

### Item 4.5: Bảng danh sách tranh chấp tám cột

- **itemId**: img-013
- **nameJP**: 紛争一覧
- **nameTrans**: Dispute list table
- **itemType**: table
- **itemSubtype**: bảng tám cột
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
- **bbox**: startX=42 startY=612 endX=1010 endY=732
- **description**:
  - Mục đích và ngữ cảnh: Hiện đủ thông tin để quyết định việc nào làm trước: ai chịu trách nhiệm · hạn dự kiến và đã tồn đọng bao lâu.
  - Thành phần hiển thị: Tám cột; ba dòng mẫu phủ ba nguồn phát sinh; cột Trạng thái là nhãn màu; cột Tồn đọng hiện số ngày.
  - Chức năng và logic: Chỉ đọc; nội dung theo bốn ô lọc phía trên; cột Tồn đọng và nhãn quá hạn là giá trị dẫn xuất tính từ ngày hiện tại theo JST.
- **qa**:
  - Cột Tồn đọng đếm từ ngày mở tranh chấp hay từ ngày nghiệp vụ phát sinh chênh lệch?
  - Dòng đã đóng có nên xuất hiện trong danh sách mặc định không; ảnh mẫu có một dòng đã đóng trong khi bộ lọc để đang mở.

### Item 4.5.1: Nhãn trạng thái tranh chấp trong dòng

- **itemId**: img-014
- **nameJP**: -
- **nameTrans**: Dispute status badge
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
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Miền dữ liệu D-SETTLE. Thiết kế đòi trường này nhưng bản thi công CHƯA có bảng tranh chấp nào nên không có bảng và cột thật để dẫn.
- **validationNote**: -
- **bbox**: startX=841 startY=645 endX=901 endY=665
- **description**:
  - Mục đích và ngữ cảnh: Cho biết ngay tình trạng của một tranh chấp; là cột người dùng quét mắt đầu tiên.
  - Thành phần hiển thị: Nhãn chữ nhỏ viền tròn trong ô cột Trạng thái; ba dòng mẫu cho ba giá trị Đang xử lý · Quá hạn dự kiến · Đã đóng. Ba nhãn gộp thành một hạng mục vì cùng cấu trúc và cùng vai trò.
  - Chức năng và logic: Chỉ đọc; nhãn Quá hạn dự kiến là giá trị dẫn xuất khi ngày dự kiến đã qua mà tranh chấp chưa đóng chứ không phải một trạng thái người dùng đặt.
- **qa**:
  - Quá hạn dự kiến là một trạng thái riêng trong tập giá trị hay chỉ là nhãn phủ lên trạng thái đang mở?

### Item 4.6: Nút Lọc

- **itemId**: img-015
- **nameJP**: 絞り込み
- **nameTrans**: Apply filter button
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
- **transitionNote**: Tải lại bảng danh sách theo bốn ô lọc hiện tại; không rời màn.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **bbox**: startX=42 startY=732 endX=87 endY=761
- **description**:
  - Mục đích và ngữ cảnh: Áp bộ lọc đã chọn lên danh sách.
  - Thành phần hiển thị: Nút chữ trung tính đặt ngay dưới bảng danh sách.
  - Chức năng và logic: Không đổi dữ liệu; chỉ đổi tập dòng hiện trên bảng.
- **qa**:
  - Bộ lọc áp ngay khi đổi ô chọn hay phải bấm nút này; nếu phải bấm thì có cần nhắc khi người dùng đổi ô mà chưa bấm không?
