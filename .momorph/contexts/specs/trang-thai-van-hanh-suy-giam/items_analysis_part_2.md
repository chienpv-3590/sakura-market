# Items Analysis - trang-thai-van-hanh-suy-giam

## Screen info

- Screen: SC-32 · Trạng thái vận hành suy giảm
- Source family: `image` (CREATE mode)
- Source image: `.momorph/shots/SC-32-trang-thai-van-hanh-suy-giam.png` (1280 × 2616)
- Source token: `SC-32-trang-thai-van-hanh-suy-giam` · screen name: `trang-thai-van-hanh-suy-giam`
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Loại màn: **Component cắt ngang** — không có route riêng; hiển thị chồng lên màn khác theo hai lớp
- Tổng số component logic: 53 (batch 2/4)

### Item 4.1.1: Thẻ ngày nghiệp vụ

- `itemId`: `img-016`
- bbox: (548; 672) → (738; 691)
- `nameJP`: 業務日タグ
- `nameTrans`: Business day tag
- `itemType`: label
- `itemSubtype`: thẻ chữ nhỏ trong thanh đầu trang
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Chỉ báo cắt ngang đã có sẵn; đặt cạnh chỉ báo mới để thấy tiền lệ đúng khuôn.
  Thành phần hiển thị: Một thẻ chữ nhỏ với nhãn Ngày nghiệp vụ; một chỗ trống dạng năm tháng ngày; và trạng thái đã lock.
  Chức năng và logic: Không thuộc thành phần này; vẽ để đối chiếu chỗ treo. Trạng thái đã lock của thẻ này chính là điều kiện làm hỏng việc đồng bộ lại ở lớp hai.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Định dạng ngày trên thẻ theo chuẩn nào; ảnh chỉ cho thấy chỗ trống dạng năm tháng ngày?

### Item 4.1.2: Thẻ chỉ báo mất kết nối và số thao tác chờ

- `itemId`: `img-017`
- bbox: (749; 672) → (884; 691)
- `nameJP`: 接続状態バッジ
- `nameTrans`: Connection status badge
- `itemType`: label
- `itemSubtype`: thẻ chữ nhỏ trong thanh đầu trang
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: Điều kiện: đang online và không còn thao tác chờ thì ẩn hoàn toàn.
- `description`:
  Mục đích và ngữ cảnh: Là lớp thứ nhất của thành phần; cho người đang làm việc biết ngay kết nối còn hay đã mất và bao nhiêu thao tác chưa tới được server.
  Thành phần hiển thị: Một thẻ chữ nhỏ gộp hai thông tin trên cùng một dòng: trạng thái kết nối và số thao tác chờ đồng bộ.
  Chức năng và logic: Hiện trên mọi màn sau khi đăng nhập; không lọc theo vai trò vì mất kết nối là sự kiện của thiết bị chứ không của quyền. Đang online và hàng đợi rỗng thì ẩn hoàn toàn.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`:
  Định dạng chuỗi trên thẻ là gì; ảnh chỉ cho thấy một ca là chữ Mất kết nối cộng dấu phân cách cộng số thao tác chờ?
  Trạng thái Rỗng để mở hai lựa chọn là ẩn hoàn toàn hoặc một dấu hiệu tối giản — chọn cái nào?
  Thẻ có bấm được để mở danh sách thao tác chờ không; ảnh không cho thấy nó là nút.

### Item 4.2: Ghi chú tiền lệ chỗ treo chỉ báo cắt ngang

- `itemId`: `img-018`
- bbox: (42; 704) → (1010; 737)
- `nameJP`: —
- `nameTrans`: Mount point precedent note
- `itemType`: label
- `itemSubtype`: đoạn nhắc dưới khối
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Giải trình vì sao chỉ báo này thuộc thanh đầu trang chứ không thuộc từng màn.
  Thành phần hiển thị: Một đoạn chữ nhỏ: chỉ báo ngày nghiệp vụ là tiền lệ đúng khuôn vì gần như mọi màn ghi đều từ chối input khi ngày đã lock; layout sau đăng nhập là điểm treo duy nhất cho một thành phần toàn cục; câu chốt là không còn thao tác chờ và đang online thì ẩn hoàn toàn.
  Chức năng và logic: Tĩnh.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 5: Khối lớp hai banner trong màn

- `itemId`: `img-019`
- bbox: (26; 776) → (1026; 1136)
- `nameJP`: —
- `nameTrans`: In-screen banner layer block
- `itemType`: others
- `itemSubtype`: khối khung giả lập màn nền kèm ghi chú
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Vẽ lớp thứ hai của thành phần: một banner chỉ hiện trên màn có ghi dữ liệu.
  Thành phần hiển thị: Tiêu đề khối nói banner được vẽ chồng lên khung giả lập màn SC-16 chi tiết giao hàng; khung giả lập màn nền đó; một đoạn ghi chú danh sách màn có banner.
  Chức năng và logic: Chỉ đọc. Lớp này là chỗ nửa đồng bộ lại của yêu cầu trở thành một hành động bấm được.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 5.1: Khung giả lập màn nền SC-16

- `itemId`: `img-020`
- bbox: (42; 821) → (1010; 1074)
- `nameJP`: —
- `nameTrans`: Host screen mockup
- `itemType`: others
- `itemSubtype`: khung giả lập một màn nền
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Cho thấy banner đặt ở đâu trong ngữ cảnh một màn thật; vì thành phần không có trang riêng.
  Thành phần hiển thị: Tiêu đề màn nền kèm thẻ khai đây chỉ là giả lập; banner mất kết nối cùng hai nút; một hàng form giả lập ba ô; một đoạn ghi chú vị trí banner.
  Chức năng và logic: Giả lập; chỉ banner và hai nút thuộc thành phần này.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 5.1.1: Tiêu đề màn nền kèm thẻ giả lập

- `itemId`: `img-021`
- bbox: (58; 837) → (994; 857)
- `nameJP`: —
- `nameTrans`: Host screen title with mock tag
- `itemType`: label
- `itemSubtype`: tiêu đề khối kèm thẻ nhỏ
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Nói rõ khung dưới đây là màn khác; không phải một phần của thành phần.
  Thành phần hiển thị: Một dòng tiêu đề mã và tên màn SC-16; kèm một thẻ chữ nhỏ ghi màn nền chỉ giả lập.
  Chức năng và logic: Tĩnh.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 5.1.2: Banner mất kết nối và số thao tác chờ

- `itemId`: `img-022`
- bbox: (58; 865) → (994; 941)
- `nameJP`: オフライン通知バナー
- `nameTrans`: Offline notice banner
- `itemType`: label
- `itemSubtype`: dải chú thích đầu vùng nội dung
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: Điều kiện: chỉ hiện khi màn có ghi dữ liệu và đang mất kết nối hoặc còn thao tác chờ của chính màn đó.
- `description`:
  Mục đích và ngữ cảnh: Chống ca tệ nhất: người dùng nhập xong; tưởng đã lưu; đi làm việc khác và số liệu ngày nghiệp vụ thiếu một dòng.
  Thành phần hiển thị: Một dải chú thích nền vàng nhạt đặt đầu vùng nội dung trên form; nội dung gồm trạng thái Mất kết nối; số thao tác của chính người dùng chưa tới được server; thời điểm thao tác chờ lâu nhất; ngày nghiệp vụ lúc nhập; và hai nút.
  Chức năng và logic: Chỉ hiện khi màn có ghi dữ liệu và đang mất kết nối hoặc còn thao tác chờ của chính màn đó; không phải hộp thoại chặn.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`:
  Định dạng thời điểm và ngày trên banner là gì; ảnh chỉ cho thấy chỗ trống dạng năm tháng ngày giờ phút và năm tháng ngày?
  Banner đếm thao tác chờ của chính màn đó hay của cả hàng đợi; câu chữ nói ba thao tác của bạn nhưng điều kiện hiện lại theo màn.
  Form phía dưới vẫn nhận input khi banner đang hiện hay bị chặn?

### Item 5.1.3: Nút Đồng bộ lại

- `itemId`: `img-023`
- bbox: (794; 874) → (881; 903)
- `nameJP`: 再同期ボタン
- `nameTrans`: Resync button
- `itemType`: button
- `itemSubtype`: nút phụ trong banner
- `buttonType`: text_only
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Là nửa thứ hai của yêu cầu — cách đồng bộ lại khi dịch vụ trở lại — nên phải có mặt ngay cạnh chỗ người dùng vừa nhập.
  Thành phần hiển thị: Một nút chữ nhỏ nằm trong banner với nhãn Đồng bộ lại.
  Chức năng và logic: Bấm thì chạy lại việc gửi các thao tác đang chờ; kết quả có thể là thành công; xung đột số lượng; hoặc bị chặn vì ngày nghiệp vụ đã lock.
- `userAction`: on_click
- `transitionNote`: Chạy lại việc gửi các thao tác đang chờ; ở lại màn hiện tại và chuyển banner sang trạng thái đang đồng bộ.
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`:
  Nút này bấm được khi đang mất kết nối hay chỉ mở khi đã có mạng lại?
  Có tự động đồng bộ khi mạng trở lại; hay bắt buộc người dùng bấm?
  Bấm liên tiếp nhiều lần thì chặn gửi trùng ở phía màn thế nào?

### Item 5.1.4: Nút Xem thao tác chờ

- `itemId`: `img-024`
- bbox: (70; 903) → (187; 932)
- `nameJP`: 保留操作の確認ボタン
- `nameTrans`: View pending operations button
- `itemType`: button
- `itemSubtype`: nút phụ trong banner
- `buttonType`: text_only
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Cho người dùng xem đúng những thao tác nào chưa tới được server; vì một con số đếm không đủ để xử lý.
  Thành phần hiển thị: Một nút chữ nhỏ nằm trong banner với nhãn Xem thao tác chờ.
  Chức năng và logic: Bấm thì mở danh sách thao tác đang chờ; ảnh chỉ cho thấy nút chứ không cho thấy màn hay hộp thoại đích.
- `userAction`: on_click
- `transitionNote`: Mở danh sách các thao tác đang chờ đồng bộ; ảnh không cho thấy danh sách đó nằm ở đâu.
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`:
  Danh sách thao tác chờ mở dạng hộp thoại trong màn hay một màn riêng?
  Trong danh sách đó người dùng bỏ được một thao tác chờ không; và bỏ thao tác có cần nhập lý do?

### Item 5.1.5: Hàng form giả lập của màn nền

- `itemId`: `img-025`
- bbox: (58; 952) → (994; 1011)
- `nameJP`: —
- `nameTrans`: Host screen form row mockup
- `itemType`: others
- `itemSubtype`: hàng ba ô của màn nền
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Cho thấy banner nằm trên form chứ không chèn giữa form.
  Thành phần hiển thị: Ba ô trên một hàng: ô Lô hàng chỉ đọc với một mã mẫu; ô Số lượng lần giao này với giá trị 0; và một nút Ghi nhận lần giao.
  Chức năng và logic: Giả lập của màn nền; không thuộc thành phần này. Nút ghi của màn nền chính là chỗ sinh ra thao tác xếp vào hàng đợi.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Nút ghi của màn nền có đổi nhãn hay đổi trạng thái khi đang mất kết nối để người dùng biết thao tác chỉ vào hàng đợi?

### Item 5.1.6: Ghi chú vị trí và điều kiện hiện banner

- `itemId`: `img-026`
- bbox: (58; 1014) → (994; 1047)
- `nameJP`: —
- `nameTrans`: Banner placement note
- `itemType`: label
- `itemSubtype`: đoạn nhắc dưới khung giả lập
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Chốt vị trí và điều kiện hiện của banner để không ai đặt nó thành một hộp thoại chặn.
  Thành phần hiển thị: Một đoạn chữ nhỏ: banner nằm đầu vùng nội dung trên form; chỉ hiện khi màn có ghi dữ liệu và đang mất kết nối hoặc còn thao tác chờ của chính màn đó; nút Đồng bộ lại là nửa thứ hai của yêu cầu nên phải nằm ngay cạnh chỗ người dùng vừa nhập.
  Chức năng và logic: Tĩnh.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 5.2: Ghi chú danh sách màn có banner trong màn

- `itemId`: `img-027`
- bbox: (42; 1077) → (1010; 1110)
- `nameJP`: —
- `nameTrans`: Banner host screens note
- `itemType`: label
- `itemSubtype`: đoạn nhắc cuối khối
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Nối lớp hai về đúng danh sách tác vụ quan trọng ở khối trên.
  Thành phần hiển thị: Một đoạn chữ nhỏ: các màn có banner là ba tác vụ quan trọng SC-08 · SC-11 · SC-16; cộng SC-17 nếu tính vì chưa dựng và cùng bối cảnh SC-16; câu chốt là form vẫn nhận input hay bị chặn là tuỳ phương án ở khối cuối.
  Chức năng và logic: Tĩnh; nói rõ wireframe không quyết thay.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: SC-17 có thuộc phạm vi banner không; và nếu có thì dùng chung điều kiện hiện với SC-16?

### Item 6: Khối bảng field dẫn xuất

- `itemId`: `img-028`
- bbox: (26; 1149) → (1026; 1512)
- `nameJP`: —
- `nameTrans`: Derived field block
- `itemType`: others
- `itemSubtype`: khối bảng bốn cột kèm tiêu đề
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Liệt toàn bộ dữ liệu thành phần này hiển thị; và khai rằng không có ô nhập nào.
  Thành phần hiển thị: Tiêu đề khối nói không có field nhập và toàn bộ dẫn xuất từ hàng đợi cục bộ cùng trạng thái mạng; một bảng bốn cột bảy hàng dữ liệu.
  Chức năng và logic: Chỉ đọc; mỗi hàng là một giá trị dẫn xuất kèm ràng buộc riêng.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 6.1: Bảng bảy field dẫn xuất

- `itemId`: `img-029`
- bbox: (42; 1193) → (1010; 1496)
- `nameJP`: 導出項目一覧表
- `nameTrans`: Derived field table
- `itemType`: table
- `itemSubtype`: bảng bốn cột bảy dòng dữ liệu
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Là bảng field của thành phần; và cũng là chỗ khai rằng mọi giá trị đều dẫn xuất chứ không nhập.
  Thành phần hiển thị: Bốn cột: số thứ tự · nhãn · kiểu · nguồn dẫn xuất và ràng buộc; bảy hàng dữ liệu.
  Chức năng và logic: Chỉ đọc; không sắp xếp được và không lọc được.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 6.1.1: Hàng tiêu đề bảng field

- `itemId`: `img-030`
- bbox: (43; 1194) → (1010; 1221)
- `nameJP`: —
- `nameTrans`: Field table header row
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
  Mục đích và ngữ cảnh: Đặt tên bốn cột để đọc được bảy hàng field bên dưới.
  Thành phần hiển thị: Bốn ô tiêu đề: dấu số · Nhãn · Kiểu · Nguồn dẫn xuất và ràng buộc.
  Chức năng và logic: Tĩnh.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —
