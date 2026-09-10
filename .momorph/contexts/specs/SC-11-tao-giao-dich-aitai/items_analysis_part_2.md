# Items Analysis - SC-11 · Tạo giao dịch 相対取引

## Screen context

- **screen**: SC-11 · Tạo giao dịch 相対取引
- **source-family**: image
- **source-token**: SC-11-tao-giao-dich-aitai
- **source-image**: .momorph/shots/SC-11-tao-giao-dich-aitai.png
- **canvas**: 1280 x 2061 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-014 · FE-015 · FE-007 (FN-04 và FN-02) · ưu tiên P0
- **requirement-refs**: FR-AITAI-01 · FR-AITAI-02 · FR-PARTY-02 · BR-PERM-01 · BR-LOT-02 · FR-LOT-03 · FR-CORR-03 · BR-CLOSE-01 · FR-AUDIT-01 · NFR-PERF-02
- **state-machine**: FIG-012 (RFP:637) — phủ cả 相対取引 và せり
- **actor**: Vận hành giao dịch (ROLE-TRADE)
- **batch**: 2/3 (15 items)

### Item 3.1: Tiêu đề khối hệ thống gán

- **itemId**: img-016
- **itemName**: Tiêu đề khối hệ thống gán
- **nameJP**: -
- **nameTrans**: System-assigned section title
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
  Mục đích và ngữ cảnh: nói rõ ranh giới giữa phần người nhập và phần hệ thống quyết
  Thành phần hiển thị: một dòng tiêu đề "Hệ thống gán — không nhập tay"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=496 endX=1010 endY=513

### Item 3.2: Trường Mã giao dịch (chỉ đọc)

- **itemId**: img-017
- **itemName**: Trường Mã giao dịch (chỉ đọc)
- **nameJP**: 取引番号
- **nameTrans**: Transaction code (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: TXN-<NNNN>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: mã định danh nghiệp vụ của giao dịch — nghiệm thu FR-AITAI-01 (RFP:650) đòi mã duy nhất
  Thành phần hiển thị: nhãn tiếng Việt kèm 取引番号; một ô chỉ đọc hiện mã; và một dòng chú thích
  Chức năng và logic: hệ thống cấp mã và bảo đảm tính duy nhất; cách cấp và định dạng mã thuộc spec BE chứ không thuộc màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: txn_code
- **databaseNote**: Mã giao dịch của miền D-TRADE. Tính duy nhất là ràng buộc dữ liệu vì nghiệm thu FR-AITAI-01 đòi mã duy nhất.
- **qa**:
  - Người vận hành có cần đọc mã giao dịch ngay sau khi tạo nháp để nói lại cho khách không? Thiết kế không khai nơi mã xuất hiện sau khi gửi.
  - Mã có cần sao chép được bằng một thao tác không? Ảnh chỉ hiện một ô chỉ đọc.
- **position**: startX=42 startY=524 endX=276 endY=651

### Item 3.3: Trường Ngày nghiệp vụ (chỉ đọc)

- **itemId**: img-018
- **itemName**: Trường Ngày nghiệp vụ (chỉ đọc)
- **nameJP**: 業務日
- **nameTrans**: Business date (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: YYYY-MM-DD
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: ngày nghiệp vụ mà giao dịch thuộc về — đơn vị của kỳ đối chiếu FR-SETTLE-01 (RFP:659) và của lock FR-SETTLE-02 (RFP:660)
  Thành phần hiển thị: nhãn tiếng Việt kèm 業務日; một ô chỉ đọc hiện ngày; và một dòng chú thích mang nhãn [CHƯA CHỐT]
  Chức năng và logic: hệ thống gán ngày nghiệp vụ đang mở; thiết kế chưa khai có được nhập bù cho một ngày khác không nên trường vẫn ở dạng chỉ đọc
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: business_date
- **databaseNote**: Ngày nghiệp vụ của bản ghi trong miền D-TRADE — cũng là khoá đối chiếu với miền D-SETTLE (RFP:606) khi lock kỳ.
- **qa**:
  - Ngày nghiệp vụ có được nhập bù cho một ngày khác không? Thiết kế ghi [CHƯA CHỐT]; câu trả lời đổi kỳ đối chiếu của FR-SETTLE-01 và cách lock ứng xử theo FR-CORR-03.
  - Nếu cho nhập bù thì trường đổi thành ô nhập ngày và cần cửa kiểm ngày đã lock ngay tại trường — có đúng không?
  - Người dùng làm việc ngoài JST có cần chú thích rằng ngày nghiệp vụ tính theo JST không? BR-INC-01 (RFP:598) dùng JST cho ngày nghiệp vụ.
- **position**: startX=287 startY=524 endX=521 endY=651

### Item 3.4: Trường Trạng thái (chỉ đọc)

- **itemId**: img-019
- **itemName**: Trường Trạng thái (chỉ đọc)
- **nameJP**: 状態
- **nameTrans**: Status (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: Nháp · 下書き | Chờ xác nhận | Đã chốt | Hủy / Đính chính
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Nháp · 下書き
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chặng hiện tại của bản ghi trong vòng đời FIG-012 (RFP:637)
  Thành phần hiển thị: nhãn tiếng Việt kèm 状態; một ô chỉ đọc hiện chặng đầu Nháp · 下書き; và một dòng chú thích trỏ sang khối vòng đời
  Chức năng và logic: giá trị đầu luôn là Nháp · 下書き; các chặng còn lại đổi qua sự kiện của FIG-012 chứ không sửa trực tiếp được
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: status
- **databaseNote**: Trạng thái của thực thể giao dịch trong D-TRADE. Tập giá trị thiết kế đòi là bốn chặng của FIG-012; giá trị Chờ xác nhận CHƯA TỒN TẠI trong ràng buộc trạng thái hiện có.
- **qa**:
  - Nhãn hiển thị của các chặng dùng tiếng Việt kèm tiếng Nhật như ảnh hay chỉ một thứ tiếng?
  - Chặng "Hủy / Đính chính" của FIG-012 gộp hai nghĩa khác nhau — trên màn có tách thành hai nhãn không?
- **position**: startX=532 startY=524 endX=765 endY=651

### Item 3.5: Trường Kênh giao dịch (chỉ đọc)

- **itemId**: img-020
- **itemName**: Trường Kênh giao dịch (chỉ đọc)
- **nameJP**: 取引区分
- **nameTrans**: Trade channel (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: 相対取引
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 相対取引
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết bản ghi thuộc kênh 相対取引 — kênh chính chiếm phần lớn giá trị giao dịch của chợ
  Thành phần hiển thị: nhãn tiếng Việt kèm 取引区分; một ô chỉ đọc hiện 相対取引; và một dòng chú thích trỏ kênh せり sang SC-13
  Chức năng và logic: màn này chỉ tạo bản ghi kênh 相対取引; FIG-012 phủ cả hai kênh nên vòng đời dùng chung với bản ghi せり
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: type
- **databaseNote**: Thuộc tính kênh của bản ghi giao dịch trong D-TRADE. Sắc thái: cột kênh hiện có bị ghim đúng một giá trị 相対取引 nên không phân biệt được hai kênh — bản ghi せり nằm ở một thực thể riêng.
- **qa**:
  - Trường chỉ có một giá trị trên màn này — có cần giữ trên UI để người vận hành đọc hay bỏ đi?
  - Ở các màn tra cứu và báo cáo gộp hai kênh (RPT-11 theo loại giao dịch) thì kênh hiện bằng nhãn nào?
- **position**: startX=776 startY=524 endX=1010 endY=651

### Item 4: Khối vòng đời bản ghi giao dịch

- **itemId**: img-021
- **itemName**: Khối vòng đời bản ghi giao dịch
- **nameJP**: -
- **nameTrans**: Transaction lifecycle section
- **itemType**: others
- **itemSubtype**: lifecycle_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai vòng đời FIG-012 (RFP:637) mà bản ghi giao dịch phải đi theo — cũng là tập trạng thái thuộc đối tượng kiểm toán
  Thành phần hiển thị: tiêu đề khối; một bảng bốn cột liệt kê từng cạnh chuyển trạng thái; và một khối ghi chú [CHƯA CHỐT]
  Chức năng và logic: chỉ hiển thị — là hợp đồng trạng thái cho các thao tác đặt ở SC-12
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: status
- **databaseNote**: Vòng đời của thực thể giao dịch trong D-TRADE. FIG-012 phủ cả 相対取引 và せり nên cùng một vòng đời áp cho hai kênh.
- **qa**: -
- **position**: startX=26 startY=690 endX=1026 endY=1087

### Item 4.1: Tiêu đề khối vòng đời

- **itemId**: img-022
- **itemName**: Tiêu đề khối vòng đời
- **nameJP**: -
- **nameTrans**: Lifecycle section title
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
  Mục đích và ngữ cảnh: định vị nguồn của vòng đời — dẫn thẳng số hình và số dòng RFP
  Thành phần hiển thị: một dòng tiêu đề "Vòng đời bản ghi giao dịch — FIG-012 (RFP:637)"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=706 endX=1010 endY=723

### Item 4.2: Bảng chuyển trạng thái FIG-012

- **itemId**: img-023
- **itemName**: Bảng chuyển trạng thái FIG-012
- **nameJP**: 状態遷移
- **nameTrans**: FIG-012 transition table
- **itemType**: table
- **itemSubtype**: transition_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt kê đủ năm cạnh chuyển trạng thái của FIG-012 kèm ghi chú thiết kế cho từng cạnh
  Thành phần hiển thị: bảng bốn cột: Từ trạng thái; Sự kiện; Tới trạng thái; Ghi chú thiết kế — năm dòng và ba thẻ [CHƯA CHỐT] gắn vào chặng Chờ xác nhận
  Chức năng và logic: mọi cặp trạng thái và sự kiện ngoài bảng là chuyển trạng thái không hợp lệ; các cạnh sau khi chốt đi qua yêu cầu điều chỉnh ở SC-20 và phê duyệt ở SC-21 chứ không sửa trực tiếp
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: status
- **databaseNote**: Tập trạng thái hợp lệ của D-TRADE theo FIG-012. Giá trị Chờ xác nhận chưa có trong ràng buộc trạng thái hiện có nên thiết kế đòi mở rộng tập giá trị nếu khách chốt là có bước duyệt.
- **qa**:
  - Chặng Chờ xác nhận có thật không? FIG-012 (RFP:637) có bước phê duyệt nhưng FR-AITAI-01 (RFP:650) và FR-AITAI-02 (RFP:651) chỉ đòi từ chối tự động theo điều kiện.
  - Nếu có bước phê duyệt thì vai nào duyệt và có đòi người duyệt khác người tạo không? TBL-ROLE-01 (RFP:245) chưa giao trách nhiệm này cho vai nào.
  - Cạnh từ chối quay về Nháp có cần trường lý do từ chối không? FIG-012 chỉ vẽ cạnh mà không nói dữ liệu kèm theo.
- **position**: startX=42 startY=734 endX=1010 endY=983

### Item 4.3: Ghi chú tài liệu khách tự chống nhau

- **itemId**: img-024
- **itemName**: Ghi chú tài liệu khách tự chống nhau
- **nameJP**: -
- **nameTrans**: Conflicting requirement note
- **itemType**: label
- **itemSubtype**: open_decision_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai thẳng chỗ tài liệu khách tự chống nhau để không ai chọn hộ khách khi thiết kế API
  Thành phần hiển thị: một khối ghi chú nền nhạt mở đầu bằng [CHƯA CHỐT] — nêu hai phía của mâu thuẫn và ba hệ quả nếu có bước duyệt
  Chức năng và logic: văn bản tĩnh — chặn việc thiết kế API trước khi khách chốt vì luồng này gánh phần lớn giá trị giao dịch
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Hai cửa kiểm của khối kế tiếp đánh giá lúc gửi; lúc phê duyệt; hay cả hai lần? Ghi chú nêu rõ đây là điểm chưa rõ.
  - Nếu có bước duyệt thì cần một màn hàng đợi việc chờ duyệt — màn đó chưa có mã SC- nào trong danh sách màn hiện tại.
- **position**: startX=42 startY=994 endX=1010 endY=1059

### Item 5: Khối hai cửa kiểm khi chốt

- **itemId**: img-025
- **itemName**: Khối hai cửa kiểm khi chốt
- **nameJP**: -
- **nameTrans**: Confirm-time gate section
- **itemType**: others
- **itemSubtype**: rule_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai hai cửa kiểm mà FE-015 và FR-AITAI-02 (RFP:651) đòi trước khi một giao dịch được chốt
  Thành phần hiển thị: tiêu đề khối; một bảng bốn cột cho hai cửa kiểm; và một khối ghi chú về nghiệm thu và tải cao điểm
  Chức năng và logic: chỉ hiển thị — là hợp đồng từ chối cho thao tác chốt đặt ở SC-12
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: participant; lot
- **databaseColumn**: -
- **databaseNote**: Cửa thứ nhất đọc hiệu lực của thực thể người tham gia (D-PARTY); cửa thứ hai đọc số lượng khả dụng của thực thể lô hàng (D-LOT).
- **qa**: -
- **position**: startX=26 startY=1100 endX=1026 endY=1369

### Item 5.1: Tiêu đề khối hai cửa kiểm

- **itemId**: img-026
- **itemName**: Tiêu đề khối hai cửa kiểm
- **nameJP**: -
- **nameTrans**: Gate section title
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
  Mục đích và ngữ cảnh: định vị nguồn của hai cửa kiểm theo mã tính năng và mã yêu cầu
  Thành phần hiển thị: một dòng tiêu đề "Hai cửa kiểm khi chốt — FE-015 · FR-AITAI-02"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1116 endX=1010 endY=1133

### Item 5.2: Bảng hai cửa kiểm và lý do từ chối

- **itemId**: img-027
- **itemName**: Bảng hai cửa kiểm và lý do từ chối
- **nameJP**: -
- **nameTrans**: Gate and rejection reason table
- **itemType**: table
- **itemSubtype**: rule_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: 買出人 phải còn hiệu lực 許可/承認 tại thời điểm chốt giao dịch — FR-PARTY-02 (RFP:630); BR-PERM-01 (RFP:595); FE-007.
  Lỗi: "Người tham gia A đã mất hiệu lực từ 2026-09-01; không thể chốt giao dịch." — không chốt giao dịch.
  Điều kiện: số lượng khả dụng của lô phải đủ cho số lượng của giao dịch — FR-LOT-03 (RFP:634); BR-LOT-02 (RFP:596).
  Lỗi: "LOT-0001 chỉ còn 80;00 khả dụng; giao dịch cần 120;00." — số lượng khả dụng không bao giờ âm.
- **description**:
  Mục đích và ngữ cảnh: hai lý do từ chối phải phân biệt được trên màn — nghiệm thu FR-AITAI-02 đòi hiển thị lý do và không tạo giao dịch
  Thành phần hiển thị: bảng bốn cột: Cửa kiểm; Yêu cầu nguồn; Thời điểm đánh giá; Màn phải hiển thị khi không thoả — hai dòng kèm câu lý do mẫu viết bằng tiếng người
  Chức năng và logic: cửa hiệu lực đánh giá tại thời điểm chốt chứ không tại lúc tạo nháp và cũng không theo ngày nghiệp vụ; cửa số lượng đánh giá trước khi cho phép chốt; một thông báo chung cho cả hai cửa là không thoả nghiệm thu
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: participant; lot
- **databaseColumn**: status; valid_from; valid_to; available_qty
- **databaseNote**: Cửa hiệu lực đọc trạng thái và khoảng hiệu lực của người tham gia (D-PARTY). Cửa số lượng đọc và trừ số lượng khả dụng của lô hàng (D-LOT) — BR-LOT-02 đòi giá trị này không âm.
- **qa**:
  - Hai cửa kiểm đánh giá lúc gửi; lúc phê duyệt; hay cả hai lần? Thiết kế chưa khai và câu trả lời đổi hành vi màn.
  - Khi bị từ chối vì thiếu số lượng thì màn có cho sửa số lượng của bản ghi rồi chốt lại hay phải hủy và tạo bản ghi mới?
  - Hai lý do hiện tại chỗ nào — một vùng thông báo chung của màn hay ngay tại trường liên quan? Ảnh chỉ khai nội dung câu chứ không khai vị trí.
- **position**: startX=42 startY=1144 endX=1010 endY=1266

### Item 5.3: Ghi chú nghiệm thu và tải cao điểm

- **itemId**: img-028
- **itemName**: Ghi chú nghiệm thu và tải cao điểm
- **nameJP**: -
- **nameTrans**: Acceptance and peak-load note
- **itemType**: label
- **itemSubtype**: rule_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nhắc hai điều dễ mất: nghiệm thu đòi hai lý do phân biệt được và hai cửa này nằm trên đường nóng nhất của hệ thống
  Thành phần hiển thị: một khối ghi chú nêu nghiệm thu FR-AITAI-02 và profile tải FIG-LOAD-01 (RFP:829) với 1.200 giao dịch/ngày; 600 lô/ngày; 60 người dùng đồng thời ở ngày cao điểm
  Chức năng và logic: văn bản tĩnh — cơ chế chống trừ số lượng hai lần thuộc spec BE chứ không thuộc màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - NFR-PERF-02 (RFP:808) đòi không làm chậm tác vụ giao dịch cốt lõi ở ngày cao điểm — có ngưỡng thời gian phản hồi riêng cho thao tác chốt không? NFR-PERF-01 (RFP:807) chỉ đặt ngưỡng cho tìm kiếm.
  - Khi hai người chốt cùng một lô gần như đồng thời thì màn của người thua hiện lý do gì? Ảnh chỉ khai hai lý do nghiệp vụ.
- **position**: startX=42 startY=1277 endX=1010 endY=1342

### Item 6: Khối trạng thái màn

- **itemId**: img-029
- **itemName**: Khối trạng thái màn
- **nameJP**: -
- **nameTrans**: Screen states section
- **itemType**: others
- **itemSubtype**: states_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt kê đủ các trạng thái màn phải phủ để không sót nhánh nào khi thi công
  Thành phần hiển thị: tiêu đề khối và một lưới bảy thẻ trạng thái
  Chức năng và logic: chỉ hiển thị — mỗi thẻ là một nhánh hiển thị mà màn phải có
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1382 endX=1026 endY=1653

### Item 6.1: Tiêu đề khối trạng thái màn

- **itemId**: img-030
- **itemName**: Tiêu đề khối trạng thái màn
- **nameJP**: -
- **nameTrans**: Screen states section title
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
  Mục đích và ngữ cảnh: mở đầu khối liệt kê trạng thái màn
  Thành phần hiển thị: một dòng tiêu đề "Trạng thái màn"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1398 endX=1010 endY=1416

