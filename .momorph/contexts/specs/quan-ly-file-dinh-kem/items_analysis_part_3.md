# Items Analysis - Quản lý file đính kèm

- Nguồn: `.momorph/shots/SC-31-quan-ly-file-dinh-kem.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-31-quan-ly-file-dinh-kem-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2581 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 51
- Batch: part 3 / 4

### Item 5.1.7: Nút Yêu cầu phục hồi

- itemId: img-031
- parentNo: 5.1
- bbox: (891, 1074) - (1002, 1103)
- nameJP: 復元を依頼
- nameTrans: Request restore button
- itemType: button
- itemSubtype: nút phụ trong hàng
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Tạo một yêu cầu phục hồi cho file đó và hiện thời điểm yêu cầu cùng hạn dự kiến.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một chỗ ghi yêu cầu phục hồi kèm thời điểm yêu cầu và hạn dự kiến, nhưng bảng đính kèm đã có không có cột nào cho việc này và cũng chưa có tầng lưu trữ nguội.
- validationNote:
  - Điều kiện: không cho yêu cầu trùng khi đã có một yêu cầu đang chờ.
  - Lỗi: "Đã có yêu cầu phục hồi đang chờ cho file này."
- description:
  - Mục đích và ngữ cảnh: Đường duy nhất lấy lại một file đã chuyển tầng nguội, và là chỗ mốc hai ngày làm việc trở thành cam kết với người dùng.
  - Thành phần hiển thị: Nút chữ Yêu cầu phục hồi ở ô hành động của hàng đã ở tầng nguội; kiểu nút phụ.
  - Chức năng và logic: Đã yêu cầu rồi thì hiện thời điểm yêu cầu và hạn dự kiến, không cho yêu cầu trùng. Mốc hạn dự kiến tính theo tối đa hai ngày làm việc của yêu cầu khách.
- qa:
  - Hai ngày làm việc tính theo lịch nào và mốc bắt đầu là thời điểm yêu cầu hay đầu ngày làm việc kế tiếp?
  - Phục hồi xong thì file trở lại tầng online vĩnh viễn hay chỉ trong một khoảng thời gian?
  - Ai được yêu cầu phục hồi; và có thông báo cho người yêu cầu khi file đã sẵn sàng không?

### Item 5.2: Ghi chú tầng lưu trữ và các field dẫn xuất

- itemId: img-032
- parentNo: 5
- bbox: (42, 1116) - (1010, 1149)
- nameJP: -
- nameTrans: Storage tier and derived field note
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
  - Mục đích và ngữ cảnh: Giải thích vì sao tầng lưu trữ phải là một cột thấy được, và chốt cách tính hai field dẫn xuất.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: tầng lưu trữ là thuộc tính thấy được của file chứ không phải chi tiết hạ tầng vì nó đổi hẳn thời gian truy xuất từ mở ngay sang tối đa hai ngày làm việc, và người đối chiếu cần biết trước khi bấm chứ không sau; field số 11 hết hạn online dẫn xuất từ ngày tải lên cộng hạn của nhóm lưu trữ; field số 9 dung lượng theo byte và phải lớn hơn 0; field số 13 mọi đường xem file đi qua đường dẫn có chữ ký do máy chủ sinh với thời hạn ngắn.
  - Chức năng và logic: Tĩnh; là bảng kiểm cho phần dựng bảng danh sách.
- qa: -

### Item 6: Khối ba quy tắc cứng về đường dẫn file

- itemId: img-033
- parentNo: -
- bbox: (26, 1189) - (1026, 1341)
- nameJP: -
- nameTrans: Hard rules on file path block
- itemType: others
- itemSubtype: khối ba thẻ quy tắc
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
  - Mục đích và ngữ cảnh: Gom ba ràng buộc bảo mật không thương lượng của màn vào một chỗ, để phần dựng không phải suy đoán.
  - Thành phần hiển thị: Tiêu đề khối nêu ba quy tắc cứng và ghi rõ không thương lượng; ba thẻ, mỗi thẻ một quy tắc kèm lý do.
  - Chức năng và logic: Chỉ đọc; là ràng buộc thiết kế, không phải khuyến nghị.
- qa: -

### Item 6.1: Thẻ quy tắc đường dẫn không bao giờ ra ngoài

- itemId: img-034
- parentNo: 6
- bbox: (42, 1233) - (359, 1325)
- nameJP: -
- nameTrans: Rule card path never exposed
- itemType: label
- itemSubtype: thẻ quy tắc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot_attachment
- databaseColumn: -
- databaseNote: Bảng đính kèm có một cột đường dẫn lưu trữ và cột đó đang được giữ đúng: không phơi ra giao diện, và đã bị loại khỏi bản xuất của báo cáo liên quan. Quy tắc này giữ nguyên.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Quy tắc thứ nhất và là quy tắc chặt nhất: đường dẫn lưu trữ của file không ra khỏi phía máy chủ.
  - Thành phần hiển thị: Thẻ có tiêu đề đánh số một và tên Đường dẫn không bao giờ ra ngoài; mô tả nói rõ đường dẫn không bao giờ hiện lên giao diện và không bao giờ ra bản xuất, đây là quy tắc đã áp ở một báo cáo và giữ y nguyên, và bảng danh sách cố ý không có cột nào cho nó.
  - Chức năng và logic: Hệ quả kiểm được: không cột giao diện nào và không bản xuất nào mang đường dẫn lưu trữ.
- qa:
  - Quy tắc này có áp cho cả bản ghi vết không; tức đường dẫn có được phép xuất hiện trong nội dung trước sau của một dòng vết không?

### Item 6.2: Thẻ quy tắc mọi đường xem đi qua liên kết có chữ ký

- itemId: img-035
- parentNo: 6
- bbox: (368, 1233) - (684, 1325)
- nameJP: -
- nameTrans: Rule card signed URL only
- itemType: label
- itemSubtype: thẻ quy tắc
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
- databaseNote: Đường đọc lại bằng liên kết có chữ ký thời hạn ngắn trên kho lưu riêng tư đã chạy thật; quy tắc này là giữ nguyên hiện trạng chứ không phải yêu cầu mới.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Quy tắc thứ hai: không có đường đọc file nào khác ngoài liên kết có chữ ký do máy chủ sinh.
  - Thành phần hiển thị: Thẻ có tiêu đề đánh số hai và tên Mọi đường xem file đi qua signed URL; mô tả nói rõ máy chủ sinh, thời hạn ngắn, kho lưu riêng tư, và thời hạn ngắn là biện pháp duy nhất đang có chống chia sẻ lại liên kết nên không nới cho tiện.
  - Chức năng và logic: Hệ quả: kho lưu phải giữ ở chế độ riêng tư và không có đường công khai nào.
- qa:
  - Thời hạn của liên kết là bao nhiêu và có cần khác nhau giữa file nhóm bảy năm và nhóm ba năm không?
  - Người dùng mở file trên thiết bị hiện trường có cần thời hạn dài hơn không; nếu có thì bù bằng biện pháp nào?

### Item 6.3: Thẻ quy tắc một liên kết hỏng không làm sập trang

- itemId: img-036
- parentNo: 6
- bbox: (693, 1233) - (1010, 1325)
- nameJP: -
- nameTrans: Rule card graceful link failure
- itemType: label
- itemSubtype: thẻ quy tắc
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
  - Mục đích và ngữ cảnh: Quy tắc thứ ba, về độ bền của giao diện: mất liên kết không được làm mất cả danh sách.
  - Thành phần hiển thị: Thẻ có tiêu đề đánh số ba và tên Một link hỏng không làm sập cả trang; mô tả nói rõ dòng vẫn hiện tên và loại và dung lượng và ngày, chỉ mất liên kết, và phải phân biệt chưa sinh được liên kết với file không còn tồn tại.
  - Chức năng và logic: Hai ca đó dẫn tới hai hành động khác nhau nên không được hiện giống nhau.
- qa:
  - Chưa sinh được liên kết thì hiện thông báo gì và có nút thử lại riêng cho dòng đó không?
  - File không còn tồn tại trong kho lưu thì dòng đó hiện trạng thái gì; và có gom được thành danh sách file mồ côi không?

### Item 7: Khối trạng thái màn

- itemId: img-037
- parentNo: -
- bbox: (26, 1354) - (1026, 1743)
- nameJP: -
- nameTrans: Screen state block
- itemType: others
- itemSubtype: khối chín thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Liệt kê mọi trạng thái màn phải xử lý, trong đó bốn thẻ là trạng thái riêng của vòng đời lưu trữ.
  - Thành phần hiển thị: Tiêu đề khối; chín thẻ xếp thành ba hàng, mỗi thẻ có một tiêu đề nhỏ và một đoạn mô tả.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

### Item 7.1: Thẻ trạng thái Rỗng

- itemId: img-038
- parentNo: 7
- bbox: (42, 1398) - (277, 1490)
- nameJP: -
- nameTrans: State card empty
- itemType: label
- itemSubtype: thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Kết quả rỗng là câu trả lời hợp lệ, không phải lỗi.
  - Thành phần hiển thị: Thẻ có tiêu đề Rỗng và câu hiển thị không có file đính kèm nào khớp điều kiện.
  - Chức năng và logic: Bộ lọc vẫn dùng được để đổi điều kiện.
- qa: -

### Item 7.2: Thẻ trạng thái Đang tải và lỗi tải

- itemId: img-039
- parentNo: 7
- bbox: (286, 1398) - (522, 1490)
- nameJP: -
- nameTrans: State card loading and error
- itemType: label
- itemSubtype: thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Gộp hai trạng thái đọc vào một thẻ vì cùng một hành vi giao diện.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang tải và lỗi tải; mô tả skeleton bảng, và lỗi thì hiện khối lỗi kèm nút thử lại.
  - Chức năng và logic: Lỗi tải không rơi về danh sách rỗng — hai cái này dẫn tới hai hành động khác nhau.
- qa: -

### Item 7.3: Thẻ trạng thái Không có quyền

- itemId: img-040
- parentNo: 7
- bbox: (531, 1398) - (766, 1490)
- nameJP: -
- nameTrans: State card forbidden
- itemType: label
- itemSubtype: thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Khai mức chặn của màn; đây là màn chạm dữ liệu nhạy nên chặn ở mức vào trang.
  - Thành phần hiển thị: Thẻ có tiêu đề Không có quyền và mô tả vai trò không được vào thì nhận trang không tìm thấy chứ không phải lỗi từ chối quyền.
  - Chức năng và logic: Chặn vào trang trả trang không tìm thấy là có chủ đích, không lộ sự tồn tại của tài nguyên.
- qa: -

### Item 7.4: Thẻ trạng thái Đang gửi và gửi lỗi

- itemId: img-041
- parentNo: 7
- bbox: (775, 1398) - (1010, 1490)
- nameJP: -
- nameTrans: State card submitting and failed
- itemType: label
- itemSubtype: thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Trạng thái của hai hành động vòng đời trên từng hàng.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang gửi và gửi lỗi; mô tả bấm hành động vòng đời thì dòng đó vào trạng thái chờ, lỗi báo trên đúng dòng và không đổi trạng thái.
  - Chức năng và logic: Là trạng thái của một hàng chứ không của cả bảng; các hàng khác vẫn dùng được.
- qa: -

### Item 7.5: Thẻ trạng thái Chưa phân loại

- itemId: img-042
- parentNo: 7
- bbox: (42, 1499) - (277, 1625)
- nameJP: -
- nameTrans: State card unclassified
- itemType: label
- itemSubtype: thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Ca chặn quan trọng nhất: chưa phân loại thì không suy được nhóm lưu trữ nên không tính được hạn.
  - Thành phần hiển thị: Thẻ có tiêu đề Chưa phân loại; mô tả loại tài liệu rỗng thì không suy ra nhóm lưu trữ và không tính hạn, hiện nhãn cần phân loại và chặn hành động vòng đời.
  - Chức năng và logic: Chặn hành động vòng đời là bắt buộc: đánh dấu chuyển tầng cho một file chưa biết thuộc nhóm nào là đúng cách xếp sai nhóm.
- qa: -

### Item 7.6: Thẻ trạng thái Quá hạn online chưa chuyển tầng nguội

- itemId: img-043
- parentNo: 7
- bbox: (286, 1499) - (522, 1625)
- nameJP: -
- nameTrans: State card overdue online
- itemType: label
- itemSubtype: thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Trạng thái là thước đo policy lưu trữ có được thi hành hay không.
  - Thành phần hiển thị: Thẻ có tiêu đề Quá hạn online và chưa chuyển cold; mô tả nhóm ba năm đã hết hạn mà chưa ai đánh dấu thì hiện nhãn riêng và gom được thành danh sách, và nói rõ không hiện được nhóm này thì DR-RET-01 chỉ là chữ trên giấy.
  - Chức năng và logic: Gom thành danh sách là điều kiện để có người xử lý; không có danh sách thì không ai biết còn bao nhiêu file quá hạn.
- qa: -

### Item 7.7: Thẻ trạng thái Đã chuyển tầng nguội và đang chờ phục hồi

- itemId: img-044
- parentNo: 7
- bbox: (531, 1499) - (766, 1625)
- nameJP: -
- nameTrans: State card cold and restoring
- itemType: label
- itemSubtype: thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Hai trạng thái sau khi chuyển tầng, nơi mốc hai ngày làm việc thành cam kết thấy được.
  - Thành phần hiển thị: Thẻ có tiêu đề Đã chuyển cold và đang chờ phục hồi; mô tả không còn liên kết xem trực tiếp và chỉ còn yêu cầu phục hồi kèm mốc tối đa hai ngày làm việc, đã yêu cầu rồi thì hiện thời điểm yêu cầu và hạn dự kiến và không cho yêu cầu trùng.
  - Chức năng và logic: Chặn yêu cầu trùng là cần thiết vì mỗi yêu cầu phục hồi là một chi phí thật ở tầng lưu trữ.
- qa: -

### Item 7.8: Thẻ trạng thái Link hết hạn

- itemId: img-045
- parentNo: 7
- bbox: (775, 1499) - (1010, 1625)
- nameJP: -
- nameTrans: State card link expired
- itemType: label
- itemSubtype: thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Hệ quả trực tiếp của quy tắc thời hạn ngắn: liên kết sẽ hết hạn trong lúc người dùng còn ở trên trang.
  - Thành phần hiển thị: Thẻ có tiêu đề Link hết hạn; mô tả quá thời hạn hoặc sinh lỗi thì dòng vẫn hiện và liên kết thay bằng nút tạo lại link.
  - Chức năng và logic: Tạo lại liên kết là hành động chỉ đọc, không đổi dữ liệu của file.
- qa: -

