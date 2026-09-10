# Items Analysis - Quản lý file đính kèm

- Nguồn: `.momorph/shots/SC-31-quan-ly-file-dinh-kem.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-31-quan-ly-file-dinh-kem-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2581 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 51
- Batch: part 1 / 4

### Item 1: Khối đầu màn quản lý file đính kèm

- itemId: img-001
- parentNo: -
- bbox: (26, 22) - (1026, 122)
- nameJP: -
- nameTrans: Screen header block
- itemType: others
- itemSubtype: khối tiêu đề màn
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Định danh màn và chuỗi truy vết; cho biết đây là màn quản lý chứng từ xuyên lô hàng.
  - Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; dòng metadata liệt kê FE-044 · FN-14 · ưu tiên P1 · ba mã yêu cầu · các mục tham chiếu · loại màn List và Detail · hai route đề xuất · actor · một thẻ trạng thái.
  - Chức năng và logic: Chỉ trình bày; không nhận thao tác nào.
- qa: -

### Item 1.1: Tiêu đề màn

- itemId: img-002
- parentNo: 1
- bbox: (26, 22) - (1026, 48)
- nameJP: 添付ファイル管理
- nameTrans: Screen title
- itemType: label
- itemSubtype: tiêu đề cấp hai
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng biết đang ở màn quản lý toàn bộ file đính kèm của hệ.
  - Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã màn SC-31 và tên màn.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 1.2: Dòng metadata truy vết

- itemId: img-003
- parentNo: 1
- bbox: (26, 60) - (1026, 98)
- nameJP: -
- nameTrans: Traceability metadata line
- itemType: label
- itemSubtype: đoạn văn nhiều dòng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Nối màn về FE-044 và ba mã yêu cầu; khai luôn rằng màn chạm mục bảo vệ thông tin cá nhân.
  - Thành phần hiển thị: Hai dòng chữ nhỏ liệt tính năng · nhóm chức năng · ưu tiên · TBL-ATTACH-01 · DR-RET-01 · DR-IMAGE-01 · các mục tham chiếu · loại màn · hai route đề xuất · actor là bộ phận đối chiếu · thẻ trạng thái.
  - Chức năng và logic: Tĩnh; không có liên kết điều hướng.
- qa: -

### Item 1.2.1: Thẻ trạng thái dựng màn

- itemId: img-004
- parentNo: 1.2
- bbox: (356, 79) - (432, 98)
- nameJP: -
- nameTrans: Build status tag
- itemType: label
- itemSubtype: thẻ nhỏ trong dòng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho biết màn chưa có bản thi công nào để đối chiếu.
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn cuối dòng metadata với nội dung Chưa thi công.
  - Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu chứ không từ dữ liệu nghiệp vụ.
- qa: -

### Item 2: Dải chú thích ba mã yêu cầu và ranh giới phán định

- itemId: img-005
- parentNo: -
- bbox: (26, 138) - (1026, 266)
- nameJP: -
- nameTrans: Requirement and boundary notice
- itemType: label
- itemSubtype: dải chú thích đầu màn
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ghim ba mã yêu cầu chi phối màn, và khai một ranh giới quan trọng: không có phân loại tự động.
  - Thành phần hiển thị: Một dải chú thích nền vàng nhạt ba đoạn: đoạn khai màn chưa thi công; đoạn dẫn TBL-ATTACH-01 và DR-RET-01 với policy bảy năm và ba năm rồi chuyển tầng nguội kèm nghiệm thu là kiểm tra policy lưu trữ và diễn tập phục hồi; đoạn dẫn DR-IMAGE-01 nêu yêu cầu khách không đòi phán định chất lượng tự động và mọi gán nhãn phải giữ yêu cầu con người xác nhận.
  - Chức năng và logic: Tĩnh. Kết luận của đoạn thứ ba là ràng buộc thiết kế: phân loại tài liệu do người đặt và người xác nhận, không suy tự động.
- qa: -

### Item 3: Khối policy lưu trữ hai tầng

- itemId: img-006
- parentNo: -
- bbox: (26, 282) - (1026, 556)
- nameJP: -
- nameTrans: Two-tier retention policy block
- itemType: others
- itemSubtype: khối bảng bốn cột kèm ghi chú
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Trích nguyên văn bảng policy lưu trữ của yêu cầu khách; là nguồn của bốn field trên màn.
  - Thành phần hiển thị: Tiêu đề khối dẫn TBL-ATTACH-01 và nêu rõ đây là nguồn của field số 3 · 4 · 11 · 12; bảng bốn cột ba hàng dữ liệu; một đoạn ghi chú về lý do màn tồn tại.
  - Chức năng và logic: Chỉ đọc; nội dung là ràng buộc phạm vi áp lên bộ lọc và danh sách bên dưới.
- qa: -

### Item 3.1: Bảng policy lưu trữ

- itemId: img-007
- parentNo: 3
- bbox: (42, 327) - (1010, 493)
- nameJP: 保管ポリシー表
- nameTrans: Retention policy table
- itemType: table
- itemSubtype: bảng bốn cột ba dòng dữ liệu
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho thấy chính xác ba nhóm tài liệu mà yêu cầu khách chia, và nhóm nào thuộc phạm vi màn.
  - Thành phần hiển thị: Bốn cột: loại tài liệu · thời gian lưu online · sau đó · trong phạm vi màn này; ba hàng dữ liệu cho nhóm bảy năm, nhóm ba năm và nhóm hồ sơ dự án.
  - Chức năng và logic: Chỉ đọc. Cột cuối là phần khoanh phạm vi của chúng tôi chứ không phải nội dung của yêu cầu khách.
- qa: -

### Item 3.1.1: Hàng tiêu đề bảng policy

- itemId: img-008
- parentNo: 3.1
- bbox: (43, 327) - (1010, 371)
- nameJP: -
- nameTrans: Retention table header row
- itemType: label
- itemSubtype: hàng tiêu đề bảng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đặt tên bốn cột của bảng policy lưu trữ.
  - Thành phần hiển thị: Một hàng nền xám nhạt với bốn nhãn: Loại tài liệu · Thời gian lưu online · Sau đó · Trong phạm vi màn này.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 3.1.2: Hàng nhóm lưu trữ bảy năm

- itemId: img-009
- parentNo: 3.1
- bbox: (43, 371) - (1010, 399)
- nameJP: -
- nameTrans: Seven-year retention row
- itemType: others
- itemSubtype: hàng dữ liệu bảng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: bảng đính kèm đã có thật nhưng không có cột phân loại tài liệu nào, nên hiện không phân biệt được nhóm bảy năm với nhóm ba năm.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Nhóm thứ nhất của policy: chứng từ nghiệp vụ giữ online lâu nhất.
  - Thành phần hiển thị: Bốn ô: phiếu tiếp nhận và phiếu giao dịch và bảng đối chiếu · bảy năm in đậm · theo policy lưu trữ của Chủ đầu tư · Có thuộc nhóm bảy năm.
  - Chức năng và logic: Chỉ đọc. Hết bảy năm thì yêu cầu khách để ngỏ bước sau nên màn không tự quyết bước đó.
- qa:
  - Ba loại tài liệu của nhóm này có phải là ba giá trị riêng biệt hay là một nhóm chung khi người dùng chọn?
  - Hết bảy năm thì màn hiện trạng thái gì; yêu cầu khách chỉ nói theo policy của Chủ đầu tư.

### Item 3.1.3: Hàng nhóm lưu trữ ba năm

- itemId: img-010
- parentNo: 3.1
- bbox: (43, 399) - (1010, 446)
- nameJP: -
- nameTrans: Three-year retention row
- itemType: others
- itemSubtype: hàng dữ liệu bảng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: không có cột tầng lưu trữ và không có mốc chuyển tầng nào trên bảng đính kèm đã có.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Nhóm thứ hai của policy, và là nhóm duy nhất có vòng đời chuyển tầng thật.
  - Thành phần hiển thị: Bốn ô: hình ảnh và chứng từ phụ trợ về tranh chấp hoặc giao hàng · ba năm in đậm · tầng nguội in đậm kèm mốc phục hồi trong tối đa hai ngày làm việc · Có thuộc nhóm ba năm.
  - Chức năng và logic: Chỉ đọc. Mốc tối đa hai ngày làm việc là con số của yêu cầu khách và là lý do tầng lưu trữ phải thấy được trên từng file.
- qa:
  - Hai ngày làm việc tính theo lịch nào; lịch ngày nghiệp vụ của chợ hay lịch hành chính?
  - Một file thuộc cả tranh chấp và giao hàng thì xếp nhóm nào?

### Item 3.1.4: Hàng nhóm ngoài phạm vi màn

- itemId: img-011
- parentNo: 3.1
- bbox: (43, 446) - (1010, 493)
- nameJP: -
- nameTrans: Out-of-scope retention row
- itemType: others
- itemSubtype: hàng dữ liệu bảng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Khoanh rõ nhóm thứ ba nằm ngoài phạm vi màn, để không ai mở rộng màn sang hồ sơ dự án.
  - Thành phần hiển thị: Bốn ô: tài liệu diễn tập chuyển đổi và hồ sơ nghiệm thu · theo vòng đời dự án · theo phương châm lưu trữ của dự án · Không in đậm kèm lý do là hồ sơ dự án chứ không phải dữ liệu chạy trong hệ.
  - Chức năng và logic: Chỉ đọc. Đây là quyết định khoanh phạm vi của chúng tôi và cần khách xác nhận.
- qa:
  - Nhóm hồ sơ dự án có cần một chỗ quản lý trong hệ không; hay giữ ngoài hệ như đề xuất?

### Item 3.2: Ghi chú lý do màn tồn tại

- itemId: img-012
- parentNo: 3
- bbox: (42, 496) - (1010, 530)
- nameJP: -
- nameTrans: Why-this-screen note
- itemType: label
- itemSubtype: đoạn nhắc dưới khối
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Nêu hệ quả của việc không phân loại được tài liệu; đây là lý lẽ chính để dựng màn.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: hai tầng lưu trữ là lý do màn tồn tại vì không phân loại được thì không biết file nào thuộc nhóm nào, tức không thi hành được DR-RET-01; xếp sai nhóm là hoặc chuyển tầng nguội sớm bốn năm và mất bằng chứng không lấy lại được, hoặc giữ online quá hạn.
  - Chức năng và logic: Tĩnh; là căn cứ ưu tiên, không phải mô tả giao diện.
- qa: -

### Item 4: Khối bộ lọc file đính kèm

- itemId: img-013
- parentNo: -
- bbox: (26, 569) - (1026, 869)
- nameJP: -
- nameTrans: Attachment filter block
- itemType: others
- itemSubtype: khối bộ lọc sáu điều kiện và ba nút
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Nơi người đối chiếu tìm chứng từ xuyên lô hàng và xuyên loại tài liệu.
  - Thành phần hiển thị: Tiêu đề khối nêu phạm vi field số 1 tới số 6; hai hàng sáu điều kiện; ba nút hành động cuối khối.
  - Chức năng và logic: Mọi điều kiện đều không bắt buộc. Nút thứ ba là một bộ lọc nhanh cho nhóm quá hạn online mà chưa chuyển tầng nguội.
- qa: -

### Item 4.1: Ô Ngày tải lên từ

- itemId: img-014
- parentNo: 4
- bbox: (42, 613) - (357, 709)
- nameJP: アップロード日 開始
- nameTrans: Upload date from
- itemType: date_picker
- itemSubtype: ô chọn ngày kèm nhãn và dòng nhắc
- buttonType: -
- dataType: date
- format: YYYY-MM-DD
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: -
- databaseTable: lot_attachment
- databaseColumn: created_at
- databaseNote: Cột thời điểm tải lên đã tồn tại thật trên bảng đính kèm.
- validationNote:
  - Điều kiện: phải nhỏ hơn hoặc bằng Ngày tải lên đến.
  - Lỗi: "Khoảng ngày không hợp lệ."
- description:
  - Mục đích và ngữ cảnh: Mốc đầu của khoảng ngày tải lên; là trục thời gian tự nhiên nhất khi tìm một chứng từ đã nộp.
  - Thành phần hiển thị: Nhãn Ngày tải lên từ; ô chọn ngày hiện mẫu YYYY-MM-DD; dòng nhắc ghi field số 1 với ràng buộc nhỏ hơn hoặc bằng đến ngày.
  - Chức năng và logic: Lọc theo ngày tải lên chứ không theo ngày nghiệp vụ, vì chứng từ có thể nộp muộn hơn ngày phát sinh.
- qa:
  - Chỉ nhập từ ngày mà bỏ trống đến ngày thì hiểu là mở đến hôm nay hay báo lỗi?
  - Khoảng ngày có bị giới hạn độ dài tối đa để giữ ngưỡng thời gian phản hồi không?

### Item 4.2: Ô Ngày tải lên đến

- itemId: img-015
- parentNo: 4
- bbox: (368, 613) - (684, 709)
- nameJP: アップロード日 終了
- nameTrans: Upload date to
- itemType: date_picker
- itemSubtype: ô chọn ngày kèm nhãn và dòng nhắc
- buttonType: -
- dataType: date
- format: YYYY-MM-DD
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: -
- databaseTable: lot_attachment
- databaseColumn: created_at
- databaseNote: Cùng cột với ô từ ngày; cột đã tồn tại thật.
- validationNote:
  - Điều kiện: phải lớn hơn hoặc bằng Ngày tải lên từ.
  - Lỗi: "Khoảng ngày không hợp lệ."
- description:
  - Mục đích và ngữ cảnh: Mốc cuối của khoảng ngày tải lên.
  - Thành phần hiển thị: Nhãn Ngày tải lên đến; ô chọn ngày hiện mẫu YYYY-MM-DD; dòng nhắc ghi field số 2 với ràng buộc lớn hơn hoặc bằng từ ngày.
  - Chức năng và logic: Khoảng ngày bao gồm cả hai đầu mút.
- qa:
  - Để trống đến ngày mà có từ ngày thì mặc định lấy tới đâu?

