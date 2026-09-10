# Items Analysis - trang-thai-van-hanh-suy-giam

## Screen info

- Screen: SC-32 · Trạng thái vận hành suy giảm
- Source family: `image` (CREATE mode)
- Source image: `.momorph/shots/SC-32-trang-thai-van-hanh-suy-giam.png` (1280 × 2616)
- Source token: `SC-32-trang-thai-van-hanh-suy-giam` · screen name: `trang-thai-van-hanh-suy-giam`
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Loại màn: **Component cắt ngang** — không có route riêng; hiển thị chồng lên màn khác theo hai lớp
- Tổng số component logic: 53 (batch 1/4)

### Item 1: Khối đầu màn trạng thái vận hành suy giảm

- `itemId`: `img-001`
- bbox: (26; 22) → (1026; 122)
- `nameJP`: —
- `nameTrans`: Screen header block
- `itemType`: others
- `itemSubtype`: khối tiêu đề màn
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Định danh thành phần và chuỗi truy vết; khai ngay rằng đây là Component cắt ngang chứ không phải một trang có route.
  Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; dòng metadata liệt FE-045 · FN-14 · ưu tiên P1 · mã yêu cầu NFR-AVL-02 · loại Component · actor là người dùng tại hiện trường · một thẻ trạng thái.
  Chức năng và logic: Chỉ trình bày; không nhận thao tác nào.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 1.1: Tiêu đề màn

- `itemId`: `img-002`
- bbox: (26; 22) → (1026; 48)
- `nameJP`: 縮退運転ステータス
- `nameTrans`: Screen title
- `itemType`: label
- `itemSubtype`: tiêu đề cấp hai
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Cho người đọc biết thành phần này là chỉ báo trạng thái vận hành suy giảm của hệ.
  Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã SC-32 và tên thành phần.
  Chức năng và logic: Tĩnh.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 1.2: Dòng metadata truy vết

- `itemId`: `img-003`
- bbox: (26; 60) → (1026; 98)
- `nameJP`: —
- `nameTrans`: Traceability metadata line
- `itemType`: label
- `itemSubtype`: đoạn văn nhiều dòng
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Nối thành phần về FE-045 và mã yêu cầu duy nhất chi phối nó; khai luôn rằng không có URL để mở.
  Thành phần hiển thị: Hai dòng chữ nhỏ liệt tên tính năng · nhóm chức năng · ưu tiên P1 · NFR-AVL-02 · chữ Component kèm ghi chú không có route riêng và không có URL để mở · bốn vai trò hiện trường · một thẻ trạng thái.
  Chức năng và logic: Tĩnh; không có liên kết điều hướng.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Bốn vai trò hiện trường ghi ở dòng metadata có phải danh sách đóng của người thấy banner trong màn không?

### Item 1.2.1: Thẻ trạng thái dựng màn

- `itemId`: `img-004`
- bbox: (415; 79) → (491; 98)
- `nameJP`: —
- `nameTrans`: Build status tag
- `itemType`: label
- `itemSubtype`: thẻ nhỏ trong dòng
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Cho biết thành phần chưa có bản thi công nào để đối chiếu.
  Thành phần hiển thị: Thẻ chữ nhỏ viền tròn cuối dòng metadata với nội dung Chưa thi công.
  Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu chứ không từ dữ liệu nghiệp vụ.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 2: Dải chú thích yêu cầu và ranh giới thành phần cắt ngang

- `itemId`: `img-005`
- bbox: (26; 138) → (1026; 265)
- `nameJP`: —
- `nameTrans`: Requirement and boundary notice
- `itemType`: label
- `itemSubtype`: dải chú thích đầu màn
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Ghim nguyên văn yêu cầu duy nhất của thành phần; và khai ranh giới quan trọng nhất là đây là Component chồng lên màn khác.
  Thành phần hiển thị: Một dải chú thích nền vàng nhạt ba đoạn: đoạn khai chưa thi công và nói hiện trạng code dồn xuống khối đối chiếu cuối trang; đoạn dẫn nguyên văn NFR-AVL-02 gồm hai nửa là tối thiểu tiếp tục thực hiện tác vụ khi kết nối bị ngắt trong thời gian ngắn và cách đồng bộ lại khi dịch vụ trở lại; kèm nghiệm thu là kịch bản diễn tập business continuity cho từng tác vụ quan trọng; đoạn khai đây là Component không phải trang nên wireframe vẽ chồng lên khung giả lập của SC-16.
  Chức năng và logic: Tĩnh. Kết luận của đoạn thứ ba là ràng buộc thiết kế: không có route; không có 404 riêng; và cả hai nửa của yêu cầu đều phải thấy được trên thành phần.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Hai nửa của yêu cầu có cùng một phạm vi nghiệm thu; hay nửa đồng bộ lại được nghiệm thu riêng?

### Item 3: Khối danh sách tác vụ quan trọng

- `itemId`: `img-006`
- bbox: (26; 281) → (1026; 603)
- `nameJP`: —
- `nameTrans`: Critical task scope block
- `itemType`: others
- `itemSubtype`: khối bảng bốn cột kèm hai ghi chú
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Khai danh sách tác vụ cần chạy được khi mất kết nối; và khai luôn rằng danh sách này là suy ra chứ không phải trích dẫn.
  Thành phần hiển thị: Tiêu đề khối nói yêu cầu không liệt kê tác vụ nào và ba tác vụ dưới đây cần khách xác nhận; một bảng bốn cột ba hàng dữ liệu; hai đoạn ghi chú về nguồn của con số ba và về hai màn nhập tại chỗ không được gọi tên.
  Chức năng và logic: Chỉ đọc; nội dung là phạm vi nghiệm thu đề xuất của thành phần.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Danh sách tác vụ quan trọng là cấu hình được hay cố định trong bản dựng?

### Item 3.1: Bảng ba tác vụ quan trọng

- `itemId`: `img-007`
- bbox: (42; 326) → (1010; 495)
- `nameJP`: 重要業務一覧表
- `nameTrans`: Critical task table
- `itemType`: table
- `itemSubtype`: bảng bốn cột ba dòng dữ liệu
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Cho thấy chính xác ba tác vụ được đề xuất tính là tác vụ quan trọng và rủi ro đồng bộ lại của từng tác vụ.
  Thành phần hiển thị: Bốn cột: tác vụ · màn · vì sao là tác vụ hiện trường · đồng bộ lại; ba hàng dữ liệu cho nhập lô hàng; chốt giao dịch và ghi nhận giao hàng.
  Chức năng và logic: Chỉ đọc; mỗi hàng gắn một màn có ghi dữ liệu và một ca đồng bộ lại có thể thất bại.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Nếu khách chốt thêm tác vụ thì bảng này và phạm vi banner sinh lại theo cấu hình hay phải sửa mã?

### Item 3.1.1: Hàng tiêu đề bảng tác vụ

- `itemId`: `img-008`
- bbox: (43; 326) → (1010; 353)
- `nameJP`: —
- `nameTrans`: Task table header row
- `itemType`: label
- `itemSubtype`: hàng tiêu đề bảng
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Đặt tên bốn cột để đọc được ba hàng dữ liệu bên dưới.
  Thành phần hiển thị: Bốn ô tiêu đề: Tác vụ · Màn · Vì sao là tác vụ hiện trường · Đồng bộ lại.
  Chức năng và logic: Tĩnh; không sắp xếp được.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 3.1.2: Hàng tác vụ Nhập lô hàng

- `itemId`: `img-009`
- bbox: (43; 353) → (1010; 400)
- `nameJP`: —
- `nameTrans`: Lot intake task row
- `itemType`: others
- `itemSubtype`: hàng dữ liệu bảng
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Tác vụ thứ nhất trong danh sách suy ra; gắn với màn tiếp nhận lô hàng.
  Thành phần hiển thị: Bốn ô: tên tác vụ Nhập lô hàng; màn SC-08 với route tạo lô; lý do là lô đến trong khung dịch vụ 02:00–10:00 JST và nhập ngay tại bến; rủi ro đồng bộ lại là cấp mã lô thuộc server nên trùng mã khi replay phải chặn được.
  Chức năng và logic: Chỉ đọc. Hàng này nói ra một ràng buộc thật: mã lô do server cấp nên thao tác nằm trong hàng đợi chưa có mã cho tới khi đồng bộ thành công.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`: Khi mất kết nối thì mã lô hàng hiển thị tạm cho người dùng là gì; và đổi sang mã thật lúc đồng bộ ra sao?

### Item 3.1.3: Hàng tác vụ Chốt giao dịch

- `itemId`: `img-010`
- bbox: (43; 400) → (1010; 448)
- `nameJP`: —
- `nameTrans`: Trade confirmation task row
- `itemType`: others
- `itemSubtype`: hàng dữ liệu bảng
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Tác vụ thứ hai; gắn với màn tạo giao dịch trực tiếp.
  Thành phần hiển thị: Bốn ô: tên tác vụ Chốt giao dịch; màn SC-11 với route tạo giao dịch; lý do là chốt giá tại sàn và không chờ được; rủi ro đồng bộ lại là số lượng khả dụng có thể đã đổi lúc replay nên xung đột là thật và không tự giải được.
  Chức năng và logic: Chỉ đọc. Hàng này là ca xung đột nặng nhất của danh sách: một giao dịch hợp lệ lúc nhập có thể vô hiệu lúc đồng bộ.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`: Người dùng thấy gì khi giao dịch trong hàng đợi bị từ chối vì số lượng đã hết; và ai chịu trách nhiệm nhập lại?

### Item 3.1.4: Hàng tác vụ Ghi nhận giao hàng

- `itemId`: `img-011`
- bbox: (43; 448) → (1010; 494)
- `nameJP`: —
- `nameTrans`: Delivery recording task row
- `itemType`: others
- `itemSubtype`: hàng dữ liệu bảng
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Tác vụ thứ ba; gắn với màn chi tiết giao hàng và các lần giao.
  Thành phần hiển thị: Bốn ô: tên tác vụ Ghi nhận giao hàng; màn SC-16 với route chi tiết giao hàng; lý do là ghi từng lần giao ngoài hiện trường trên tablet; rủi ro đồng bộ lại là lần giao thuộc ngày nghiệp vụ lúc nhập và ngày đó có thể đã lock lúc replay.
  Chức năng và logic: Chỉ đọc. Hàng này là nguồn của field số bảy: phải giữ ngày nghiệp vụ lúc nhập mới trả lời được thao tác thuộc ngày nào.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`: Thao tác nhập trước 10:00 mà chỉ đồng bộ được sau đó thì hiển thị thuộc ngày nghiệp vụ nào trên màn?

### Item 3.2: Ghi chú nguồn của ba tác vụ

- `itemId`: `img-012`
- bbox: (42; 498) → (1010; 549)
- `nameJP`: —
- `nameTrans`: Provenance note for the three tasks
- `itemType`: label
- `itemSubtype`: đoạn nhắc dưới bảng
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Khai đúng bản chất của con số ba để không ai đọc danh sách như thể yêu cầu khách đã liệt kê.
  Thành phần hiển thị: Một đoạn chữ nhỏ: NFR-AVL-02 chỉ nói tối thiểu tiếp tục thực hiện tác vụ và nghiệm thu cho từng tác vụ quan trọng; RFP không liệt kê và không nói con số ba; con số ba đến từ Feature List FE-045; chỗ duy nhất gọi tên đúng ba luồng hiện trường là NFR-USE-01 với nhập lô hàng · chốt giao dịch và ghi nhận giao hàng; câu chốt là đây là suy luận không phải trích dẫn nên phải chốt với khách trước khi lấy làm phạm vi nghiệm thu.
  Chức năng và logic: Tĩnh; là ghi chú phạm vi nghiệm thu phải chốt trước khi lấy làm căn cứ.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 3.3: Ghi chú hai màn nhập tại chỗ ngoài danh sách

- `itemId`: `img-013`
- bbox: (42; 559) → (1010; 576)
- `nameJP`: —
- `nameTrans`: Out-of-list on-site screens note
- `itemType`: label
- `itemSubtype`: đoạn nhắc dưới bảng
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Nói ra hệ quả nếu khách mở rộng danh sách tác vụ quan trọng.
  Thành phần hiển thị: Một dòng chữ nhỏ: SC-09 ghi nhận kết quả thẩm định và SC-13 nhập kết quả đấu giá cũng là thao tác tại chỗ nhưng NFR-USE-01 không gọi tên; tính vào thì danh sách thành năm và ngân sách đổi theo.
  Chức năng và logic: Tĩnh.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Hai màn nhập tại chỗ này có được tính vào danh sách tác vụ quan trọng không?

### Item 4: Khối lớp một chỉ báo toàn cục

- `itemId`: `img-014`
- bbox: (26; 616) → (1026; 763)
- `nameJP`: —
- `nameTrans`: Global indicator layer block
- `itemType`: others
- `itemSubtype`: khối khung giả lập thanh đầu trang kèm ghi chú
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Vẽ lớp thứ nhất của thành phần: một chỉ báo có mặt trên mọi màn sau khi đăng nhập.
  Thành phần hiển thị: Tiêu đề khối nói chỉ báo toàn cục nằm ở thanh đầu trang trên mọi màn sau khi đăng nhập; một khung giả lập thanh đầu trang; một đoạn ghi chú về tiền lệ chỗ treo.
  Chức năng và logic: Chỉ đọc. Lớp này luôn có mặt nhưng chỉ đổi hình thái khi mất kết nối hoặc còn thao tác chờ.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 4.1: Khung giả lập thanh đầu trang

- `itemId`: `img-015`
- bbox: (42; 660) → (1010; 701)
- `nameJP`: —
- `nameTrans`: Top header mockup
- `itemType`: others
- `itemSubtype`: khung giả lập thanh đầu trang bốn phần
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Cho thấy chỉ báo mới nằm cạnh chỉ báo nào và ở phần nào của thanh đầu trang.
  Thành phần hiển thị: Bốn phần trên một hàng: nhãn tên hệ và điều hướng ở bên trái; thẻ ngày nghiệp vụ; thẻ chỉ báo kết nối; nhãn người dùng có dấu mở menu ở bên phải.
  Chức năng và logic: Giả lập; chỉ thẻ chỉ báo kết nối thuộc thành phần này.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Chỉ báo toàn cục cập nhật theo thời gian thực khi số thao tác chờ đổi; hay chỉ cập nhật khi tải lại màn?
