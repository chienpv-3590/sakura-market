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
- **batch**: 3/3 (6 items)

### Item 6.2: Lưới thẻ trạng thái màn

- **itemId**: img-031
- **itemName**: Lưới thẻ trạng thái màn
- **nameJP**: -
- **nameTrans**: Screen state card grid
- **itemType**: others
- **itemSubtype**: state_card_grid
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: trạng thái rỗng phải nêu lý do và đường đi tiếp (SC-08 tiếp nhận; SC-10 công bố) thay vì để form vô nghĩa.
  Điều kiện: lỗi tải phải phân biệt được với trạng thái rỗng và có nút thử lại.
  Điều kiện: ngoài ROLE-TRADE thì không vào được màn — TBL-ROLE-01 (RFP:245).
  Điều kiện: khi đang gửi thì khoá form và chặn gửi trùng.
  Lỗi: "Người tham gia A đã mất hiệu lực từ <ngày>; không thể chốt giao dịch." — không trừ số lượng và bản ghi giữ ở Nháp.
  Lỗi: "LOT-0001 chỉ còn <số> khả dụng; giao dịch cần <số>." — không trừ số lượng.
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock." — FR-CORR-03 (RFP:658) và BR-CLOSE-01 (RFP:597); mọi lần thử đều bị chặn và có log; đường ra duy nhất là SC-20 và SC-21.
- **description**:
  Mục đích và ngữ cảnh: bảy nhánh hiển thị của màn: mặc định; rỗng; đang tải và lỗi tải; không có quyền và đang gửi; từ chối vì hết hiệu lực; từ chối vì không đủ số lượng; ngày nghiệp vụ đã lock
  Thành phần hiển thị: một lưới bốn cột chứa bảy thẻ viền nét đứt — mỗi thẻ một tiêu đề và một đoạn mô tả hành vi
  Chức năng và logic: bảy thẻ dùng chung một kết cấu và chỉ khác nội dung nên gộp thành một thành phần đại diện ở mục con; hai thẻ từ chối là hai cửa kiểm của FE-015 và phải hiện lý do riêng biệt
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Trạng thái đang tải và trạng thái lỗi tải gộp trong một thẻ — trên màn thật đây là hai nhánh khác nhau và cần hai cách hiển thị khác nhau; có tách không?
  - Khi vai không có quyền thì màn trả không tìm thấy để không lộ sự tồn tại tài nguyên hay báo thẳng là thiếu quyền? Thiết kế chỉ nói không vào được.
  - Trạng thái ngày nghiệp vụ đã lock có được phát hiện trước khi bấm gửi hay chỉ lộ ra sau khi gửi? Thiết kế không khai.
- **position**: startX=42 startY=1427 endX=1010 endY=1637

### Item 6.2.1: Thẻ trạng thái màn (đại diện)

- **itemId**: img-032
- **itemName**: Thẻ trạng thái màn (đại diện)
- **nameJP**: -
- **nameTrans**: Screen state card (representative)
- **itemType**: others
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: một thẻ trạng thái — lấy thẻ đầu tiên Mặc định làm đại diện cho cả bảy thẻ có cùng kết cấu
  Thành phần hiển thị: một thẻ viền nét đứt gồm tiêu đề trạng thái và một đoạn mô tả — thẻ đại diện ghi "Bốn trường trống hoặc có giá trị đầu; nút bật"
  Chức năng và logic: lặp bảy lần trong lưới với nội dung khác nhau; kết cấu và cách đọc giống nhau nên chỉ đặc tả một lần
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Thẻ Mặc định nói bốn trường trống hoặc có giá trị đầu — trường nào có giá trị đầu và giá trị đầu là gì? Thiết kế để mở.
  - Giá trị mẫu trong ảnh (LOT-0001 · Người tham gia A · 120;00 · 1 800) là giá trị đầu thật hay chỉ dữ liệu minh hoạ của wireframe?
- **position**: startX=42 startY=1427 endX=277 endY=1519

### Item 7: Khối đối chiếu prototype

- **itemId**: img-033
- **itemName**: Khối đối chiếu prototype
- **nameJP**: -
- **nameTrans**: Prototype divergence section
- **itemType**: others
- **itemSubtype**: divergence_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: tách phần hiện trạng thi công ra khỏi phần thiết kế để bản đặc tả không bị hành vi prototype rò vào
  Thành phần hiển thị: tiêu đề khối và một bảng ba cột đối chiếu thiết kế với prototype
  Chức năng và logic: chỉ hiển thị — khối này là phần đối chiếu chứ không phải yêu cầu của màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1666 endX=1026 endY=1941

### Item 7.1: Tiêu đề khối đối chiếu prototype

- **itemId**: img-034
- **itemName**: Tiêu đề khối đối chiếu prototype
- **nameJP**: -
- **nameTrans**: Divergence section title
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
  Mục đích và ngữ cảnh: mở đầu khối đối chiếu hiện trạng
  Thành phần hiển thị: một dòng tiêu đề "Đối chiếu prototype"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1682 endX=1010 endY=1699

### Item 7.2: Bảng đối chiếu thiết kế và prototype

- **itemId**: img-035
- **itemName**: Bảng đối chiếu thiết kế và prototype
- **nameJP**: -
- **nameTrans**: Design versus prototype table
- **itemType**: table
- **itemSubtype**: divergence_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt kê bốn hạng mục và mức lệch giữa điều thiết kế đòi và điều prototype đang làm
  Thành phần hiển thị: bảng ba cột: Thiết kế đòi; Prototype làm; Mức — bốn dòng với các mức Cần khách chốt; Khác không chủ đích P0; Khớp
  Chức năng và logic: chỉ hiển thị — ba dòng đầu là lệch phải xử lý và dòng cuối ghi nhận phần đã khớp ở nhánh 相対取引
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Hai lỗi từ chối đang dùng chung một câu thông báo ở prototype — thứ tự ưu tiên sửa là tách message trước hay chờ khách chốt bước duyệt trước?
  - Prototype vẫn ghi được bản ghi mới vào ngày đã lock — trong lúc chờ sửa thì màn có cần cảnh báo trước khi gửi không?
- **position**: startX=42 startY=1710 endX=1010 endY=1925

### Item 8: Khối ghi chú phân quyền và audit

- **itemId**: img-036
- **itemName**: Khối ghi chú phân quyền và audit
- **nameJP**: -
- **nameTrans**: Permission and audit note
- **itemType**: label
- **itemSubtype**: footer_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: hành động ghi thuộc ROLE-TRADE theo TBL-ROLE-01 (RFP:245).
  Điều kiện: tạo và chốt đều phải để lại logical audit theo FR-AUDIT-01 (RFP:710) gồm chủ thể; timestamp; before/after và lý do.
- **description**:
  Mục đích và ngữ cảnh: khai phân quyền của màn và nghĩa vụ audit — hai điều dễ bị bỏ khi thi công
  Thành phần hiển thị: một khối ghi chú ba đoạn: phân quyền ghi và đọc; nghĩa vụ logical audit; và một liên kết tới bản as-built của prototype
  Chức năng và logic: chỉ hiển thị — quyền đọc mở rộng cho các vai đang hoạt động để đối chiếu chéo trong khi quyền ghi chỉ thuộc ROLE-TRADE
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Quyền đọc mở cho mọi vai đang hoạt động nhưng các bảng có thông tin cá nhân thì siết ở đâu? Ghi chú trỏ sang một quyết định kiến trúc riêng.
  - Audit của lần ghi bị chặn vì ngày đã lock có cùng dạng bản ghi với audit của lần ghi thành công không? FR-CORR-03 chỉ đòi có log.
- **position**: startX=26 startY=1956 endX=1026 endY=2039

