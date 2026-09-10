# Items Analysis - Quản lý batch xuất dữ liệu kế toán

- Nguồn: `.momorph/shots/SC-27-quan-ly-batch-xuat-du-lieu-ke-toan.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-27-quan-ly-batch-xuat-du-lieu-ke-toan-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 1797 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 39
- Batch: part 1 / 3

### Item 1: Khối đầu màn quản lý batch xuất kế toán

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
  - Mục đích và ngữ cảnh: Định danh màn và chuỗi truy vết của nó; cho biết đây là điểm vào duy nhất của nhóm tích hợp kế toán.
  - Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; dòng metadata liệt kê FE-037 · FN-11 · ưu tiên P0 · yêu cầu IF-ACC-01 và DR-SETTLE-01 cùng actor; dòng tham chiếu phụ nêu route đề xuất và một thẻ trạng thái.
  - Chức năng và logic: Chỉ trình bày; không nhận thao tác nào.
- qa: -

### Item 1.1: Tiêu đề màn

- itemId: img-002
- parentNo: 1
- bbox: (26, 22) - (1026, 48)
- nameJP: 会計データ出力バッチ管理
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
  - Mục đích và ngữ cảnh: Cho người dùng biết đang ở màn quản lý các lần bàn giao dữ liệu đối chiếu sang hệ thống kế toán.
  - Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã màn SC-27 và tên màn.
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
  - Mục đích và ngữ cảnh: Nối màn về đúng tính năng và điều khoản yêu cầu khách; nêu rõ IF-ACC-01 và DR-SETTLE-01 là hai yêu cầu chính.
  - Thành phần hiển thị: Hai dòng chữ nhỏ: dòng tính năng · nhóm chức năng · ưu tiên · yêu cầu · actor đề xuất; dòng tham chiếu phụ nêu route đề xuất và thẻ trạng thái.
  - Chức năng và logic: Tĩnh; không có liên kết điều hướng.
- qa: -

### Item 1.2.1: Thẻ trạng thái dựng màn

- itemId: img-004
- parentNo: 1.2
- bbox: (300, 79) - (376, 98)
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
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn cuối dòng tham chiếu phụ với nội dung Chưa thi công.
  - Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu chứ không từ dữ liệu nghiệp vụ.
- qa: -

### Item 2: Dải chú thích ranh giới phạm vi thiết kế

- itemId: img-005
- parentNo: -
- bbox: (26, 138) - (1026, 191)
- nameJP: -
- nameTrans: Design scope notice banner
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
  - Mục đích và ngữ cảnh: Chặn cách đọc sai rằng cả phần tích hợp kế toán chưa làm; khoanh đúng phần thiết kế đòi mà chưa có.
  - Thành phần hiển thị: Một dải chú thích nền vàng nhạt, chữ đậm ở đầu câu; nội dung phân biệt phần đã chạy qua màn báo cáo và phần còn thiếu là tra cứu xuyên nhiều ngày cùng trạng thái bàn giao.
  - Chức năng và logic: Tĩnh; là ghi chú dành cho người đọc thiết kế và không hiện cho người dùng cuối.
- qa: -

### Item 3: Khối 6 trường tối thiểu bắt buộc của dữ liệu bàn giao

- itemId: img-006
- parentNo: -
- bbox: (26, 207) - (1026, 515)
- nameJP: -
- nameTrans: Mandatory export fields block
- itemType: others
- itemSubtype: khối bảng ba cột kèm ghi chú
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
  - Mục đích và ngữ cảnh: Ghim đúng tập trường mà yêu cầu khách bắt buộc phải có trong mỗi lần bàn giao; là bảng kiểm khi nghiệm thu màn này.
  - Thành phần hiển thị: Tiêu đề khối dẫn DR-SETTLE-01; bảng ba cột sáu dòng cho từng trường tối thiểu; một đoạn ghi chú cuối khối về bên nhận và hai trường kèm bắt buộc.
  - Chức năng và logic: Chỉ đọc; nội dung là ràng buộc phạm vi áp lên khối danh sách và khối bộ lọc bên dưới.
- qa: -

### Item 3.1: Bảng 6 trường tối thiểu

- itemId: img-007
- parentNo: 3
- bbox: (42, 251) - (1010, 452)
- nameJP: 最小必須項目一覧
- nameTrans: Mandatory field table
- itemType: table
- itemSubtype: bảng ba cột sáu dòng dữ liệu
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
  - Mục đích và ngữ cảnh: Liệt kê từng trường tối thiểu kèm nội dung mà yêu cầu khách gán cho nó; người đọc dùng bảng này để kiểm bản xuất có đủ trường hay không.
  - Thành phần hiển thị: Ba cột: số thứ tự · tên trường tối thiểu · nội dung theo yêu cầu khách; sáu hàng dữ liệu là ngày nghiệp vụ · người tham gia · tổng số tiền · thuế · trạng thái · batch code.
  - Chức năng và logic: Chỉ đọc; không phân trang; không sắp xếp lại được.
- qa: -

### Item 3.1.1: Hàng tiêu đề bảng 6 trường

- itemId: img-008
- parentNo: 3.1
- bbox: (43, 252) - (1010, 279)
- nameJP: -
- nameTrans: Mandatory field table header row
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
  - Mục đích và ngữ cảnh: Đặt tên ba cột để đọc được các hàng dữ liệu bên dưới.
  - Thành phần hiển thị: Một hàng nền xám nhạt với ba nhãn: dấu thăng · Trường tối thiểu · Nội dung theo yêu cầu khách.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 3.1.2: Hàng một trường tối thiểu — đại diện sáu hàng

- itemId: img-009
- parentNo: 3.1
- bbox: (43, 279) - (1010, 308)
- nameJP: -
- nameTrans: Mandatory field row (representative)
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
  - Mục đích và ngữ cảnh: Một hàng mô tả một trường tối thiểu; sáu hàng có cùng cấu trúc nên gộp thành một đại diện.
  - Thành phần hiển thị: Ba ô trên một hàng: số thứ tự · tên trường in đậm · câu mô tả nội dung; hàng đại diện đang hiện trường số 1 là Ngày nghiệp vụ với nội dung ngày nghiệp vụ đã lock.
  - Chức năng và logic: Chỉ đọc. Nội dung sáu hàng theo thứ tự: ngày nghiệp vụ đã lock; mã người tham gia hoặc nhóm người tham gia được gộp; tổng số tiền đã tính cả điều chỉnh sau lock đã duyệt; số thuế tương ứng tổng số tiền của dòng; trạng thái dòng gồm chờ · đã xác nhận · đã điều chỉnh; batch code là mã lần xuất cho ngày đã chốt và một ngày có thể có nhiều batch.
- qa: -

### Item 3.2: Ghi chú bên nhận và hai trường kèm

- itemId: img-010
- parentNo: 3
- bbox: (42, 455) - (1010, 488)
- nameJP: -
- nameTrans: Receiver and extra-field note
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
  - Mục đích và ngữ cảnh: Khai bên nhận dữ liệu và hai trường phải kèm ngoài sáu trường tối thiểu; đồng thời khai phần chưa chốt của interface.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: bên nhận là hệ thống kế toán hiện hành do bộ phận tài chính vận hành; mỗi bản xuất phải kèm thời điểm tạo và người khởi tạo; phương thức kết nối · xác thực · retry · nghiệm thu interface chốt tại buổi làm việc về interface.
  - Chức năng và logic: Tĩnh; nội dung này là lý do vì sao khối trạng thái bàn giao còn ở dạng đề xuất.
- qa: -

### Item 4: Khối bộ lọc tra cứu batch xuyên nhiều ngày

- itemId: img-011
- parentNo: -
- bbox: (26, 528) - (1026, 765)
- nameJP: -
- nameTrans: Cross-day batch filter block
- itemType: others
- itemSubtype: khối bộ lọc năm điều kiện và hai nút
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
  - Mục đích và ngữ cảnh: Cho bộ phận đối chiếu tìm lại một hoặc một nhóm lần bàn giao mà không bị buộc phải biết trước đúng một ngày nghiệp vụ.
  - Thành phần hiển thị: Tiêu đề khối; hai hàng điều kiện gồm khoảng ngày nghiệp vụ · batch code · trạng thái · người tham gia; cuối hàng thứ hai là nút Tra cứu và nút Xoá điều kiện.
  - Chức năng và logic: Mọi điều kiện đều không bắt buộc; để trống hết thì tra cứu trả về toàn bộ batch theo trang. Điều kiện được gửi cùng nhau trong một lần tra cứu.
- qa: -

### Item 4.1: Ô Ngày nghiệp vụ từ

- itemId: img-012
- parentNo: 4
- bbox: (42, 572) - (357, 650)
- nameJP: 業務日 開始
- nameTrans: Business date from
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
- databaseTable: accounting_export_batch
- databaseColumn: business_date
- databaseNote: Bảng đã tồn tại và có index theo business_date. Sắc thái: đường đọc hiện có chỉ lọc đúng một business_date; lọc theo khoảng là đường đọc mới mà thiết kế đòi.
- validationNote:
  - Điều kiện: phải nhỏ hơn hoặc bằng Ngày nghiệp vụ đến.
  - Lỗi: "Khoảng ngày không hợp lệ." — hiện ngay tại ô nhập chứ không điều hướng.
  - Điều kiện: chỉ nhận ngày đã lock.
  - Lỗi: "Ngày này chưa chốt kỳ nên chưa có gì để bàn giao."
- description:
  - Mục đích và ngữ cảnh: Mốc đầu của khoảng ngày nghiệp vụ cần tra; đây là điều kiện phân biệt màn này với danh sách batch của đúng một ngày.
  - Thành phần hiển thị: Nhãn Ngày nghiệp vụ từ; ô chọn ngày hiện mẫu YYYY-MM-DD; dòng nhắc bên dưới nêu hai ràng buộc là nhỏ hơn hoặc bằng đến ngày và chỉ nhận ngày đã lock.
  - Chức năng và logic: Lock là tiền đề của bàn giao nên ngày chưa lock không bao giờ có batch; ô này lọc trên ngày nghiệp vụ của batch chứ không trên thời điểm tạo batch.
- qa:
  - Ô này có tự chặn ngày trong tương lai không; hay để server trả danh sách rỗng?
  - Chỉ nhập từ ngày mà bỏ trống đến ngày thì hiểu là mở đến hôm nay hay báo lỗi?
  - Ngày chưa lock thì chặn ngay tại ô nhập hay để tra cứu rồi trả rỗng?

### Item 4.2: Ô Ngày nghiệp vụ đến

- itemId: img-013
- parentNo: 4
- bbox: (368, 572) - (684, 650)
- nameJP: 業務日 終了
- nameTrans: Business date to
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
- databaseTable: accounting_export_batch
- databaseColumn: business_date
- databaseNote: Cùng cột với ô từ ngày; khoảng ngày là điều kiện bao gồm cả hai đầu mút.
- validationNote:
  - Điều kiện: phải lớn hơn hoặc bằng Ngày nghiệp vụ từ.
  - Lỗi: "Khoảng ngày không hợp lệ." — hiện ngay tại ô nhập.
- description:
  - Mục đích và ngữ cảnh: Mốc cuối của khoảng ngày nghiệp vụ cần tra.
  - Thành phần hiển thị: Nhãn Ngày nghiệp vụ đến; ô chọn ngày hiện mẫu YYYY-MM-DD; dòng nhắc nêu ràng buộc lớn hơn hoặc bằng từ ngày và nói rõ khoảng ngày sai thì báo lỗi tại field.
  - Chức năng và logic: Lỗi khoảng ngày báo tại field chứ không chặn cả khối; hai ô ngày cùng chịu một quy tắc nên chỉ cần một thông báo lỗi.
- qa:
  - Khoảng ngày có bị giới hạn độ dài tối đa để giữ ngưỡng thời gian phản hồi không?
  - Để trống đến ngày mà có từ ngày thì mặc định lấy tới đâu?

### Item 4.3: Ô Batch code

- itemId: img-014
- parentNo: 4
- bbox: (695, 572) - (1010, 650)
- nameJP: バッチコード
- nameTrans: Batch code
- itemType: text_form
- itemSubtype: ô nhập một dòng kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: BATCH-NNNN theo mẫu hiển thị BATCH-0001
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: accounting_export_batch
- databaseColumn: batch_code
- databaseNote: Cột đã tồn tại và là duy nhất trên toàn bảng. Sắc thái: định dạng mã do hai bên thống nhất ở buổi làm việc về interface nên mẫu hiển thị chỉ là giả định làm việc.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đường tra nhanh khi người dùng đã biết đúng mã của một lần bàn giao — thường là khi kế toán gọi lại hỏi về một mã cụ thể.
  - Thành phần hiển thị: Nhãn Batch code; ô nhập một dòng hiện mẫu BATCH-0001; dòng nhắc nói rõ đây là cách tra cứu chính xác một lần xuất.
  - Chức năng và logic: Nhập batch code thì các điều kiện khác trở nên không cần thiết vì batch code là duy nhất trong toàn hệ; không khớp thì trả danh sách rỗng chứ không báo lỗi.
- qa:
  - Tra batch code có phân biệt chữ hoa chữ thường không?
  - Có cho tra theo một phần của mã hay bắt buộc khớp trọn mã?
  - Mẫu BATCH-0001 là mẫu đã chốt hay chỉ là mẫu minh hoạ cần khách xác nhận?

### Item 4.4: Ô chọn Trạng thái

- itemId: img-015
- parentNo: 4
- bbox: (42, 660) - (357, 739)
- nameJP: ステータス
- nameTrans: Status filter
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: -
- databaseTable: accounting_export_batch
- databaseColumn: lines
- databaseNote: Yêu cầu khách khai trường này ở mức DÒNG (Trạng thái dòng) nên giá trị nằm trong bản chụp dòng của batch. Không có cột trạng thái riêng ở mức batch: CHƯA TỒN TẠI.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Lọc theo trạng thái của dữ liệu bàn giao — trường tối thiểu số 5 của yêu cầu khách.
  - Thành phần hiển thị: Nhãn Trạng thái; ô chọn hiện giá trị đang chọn là Tất cả kèm mũi chỉ xuống; dòng nhắc liệt ba giá trị chờ · đã xác nhận · đã điều chỉnh và ghi rõ đây là trường tối thiểu số 5.
  - Chức năng và logic: Tập giá trị lấy đúng ba giá trị mà yêu cầu khách khai; giá trị Tất cả là mặc định và không lọc gì.
- qa:
  - Lọc theo trạng thái là lọc batch có ít nhất một dòng ở trạng thái đó; hay lọc batch mà toàn bộ dòng ở trạng thái đó?
  - Một batch có nhiều dòng khác trạng thái nhau thì cột Trạng thái ở danh sách hiện giá trị nào?
  - Định dạng giá trị gửi lên cho ô chọn này là chuỗi tiếng Việt hiển thị hay một mã cố định; ảnh không cho thấy nên cần khách chốt.

