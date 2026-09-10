# Items Analysis - trang-thai-van-hanh-suy-giam

## Screen info

- Screen: SC-32 · Trạng thái vận hành suy giảm
- Source family: `image` (CREATE mode)
- Source image: `.momorph/shots/SC-32-trang-thai-van-hanh-suy-giam.png` (1280 × 2616)
- Source token: `SC-32-trang-thai-van-hanh-suy-giam` · screen name: `trang-thai-van-hanh-suy-giam`
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Loại màn: **Component cắt ngang** — không có route riêng; hiển thị chồng lên màn khác theo hai lớp
- Tổng số component logic: 53 (batch 4/4)

### Item 7.8: Thẻ trạng thái Read-only vì ngày đã lock

- `itemId`: `img-046`
- bbox: (775; 1705) → (1010; 1798)
- `nameJP`: 業務日ロックによる読み取り専用
- `nameTrans`: Locked business day state card
- `itemType`: label
- `itemSubtype`: thẻ trạng thái
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: Điều kiện: đồng bộ lại chạm một ngày nghiệp vụ đã lock thì thao tác không vào được; đường còn lại là yêu cầu điều chỉnh ở SC-20 với mã 423.
- `description`:
  Mục đích và ngữ cảnh: Ràng buộc nặng nhất của thành phần; nói rằng việc đồng bộ lại không thể vô điều kiện.
  Thành phần hiển thị: Thẻ tiêu đề Read-only vì ngày đã lock; nội dung nói replay chạm một ngày nghiệp vụ đã lock thì nêu rõ thao tác không vào được và phải đi đường điều chỉnh SC-20 với mã 423.
  Chức năng và logic: Không có đường tự động vượt qua; người dùng phải nhập lại tay qua màn yêu cầu điều chỉnh.
- `userAction`: —
- `transitionNote`: Chỉ sang màn tạo yêu cầu điều chỉnh SC-20; người dùng nhập lại tay ở đó.
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Thành phần tự mở màn yêu cầu điều chỉnh kèm dữ liệu đã nhập; hay chỉ chỉ đường và người dùng nhập lại từ đầu?

### Item 8: Khối đối chiếu thiết kế và prototype

- `itemId`: `img-047`
- bbox: (26; 1827) → (1026; 2334)
- `nameJP`: —
- `nameTrans`: Design versus prototype block
- `itemType`: others
- `itemSubtype`: khối bảng ba cột kèm ghi chú
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Dồn hiện trạng code xuống một chỗ để phần trên chỉ nói cái thiết kế đòi.
  Thành phần hiển thị: Tiêu đề khối ĐỐI CHIẾU PROTOTYPE; một bảng ba cột chín hàng dữ liệu; một đoạn ghi chú về hai dòng xung đột.
  Chức năng và logic: Chỉ đọc.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 8.1: Bảng đối chiếu ba cột

- `itemId`: `img-048`
- bbox: (42; 1871) → (1010; 2272)
- `nameJP`: 設計と試作の差分表
- `nameTrans`: Design versus prototype table
- `itemType`: table
- `itemSubtype`: bảng ba cột chín dòng dữ liệu
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Cho thấy khoảng cách giữa thiết kế và bản đã dựng; và phân loại từng khoảng cách.
  Thành phần hiển thị: Ba cột: thiết kế đòi · prototype làm · mức; chín hàng dữ liệu với thẻ mức là chưa có; một phần; hoặc xung đột.
  Chức năng và logic: Chỉ đọc; không sắp xếp được.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 8.1.1: Hàng tiêu đề bảng đối chiếu

- `itemId`: `img-049`
- bbox: (43; 1871) → (1010; 1899)
- `nameJP`: —
- `nameTrans`: Comparison table header row
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
  Mục đích và ngữ cảnh: Đặt tên ba cột để đọc được chín hàng bên dưới.
  Thành phần hiển thị: Ba ô tiêu đề: Thiết kế đòi · Prototype làm · Mức.
  Chức năng và logic: Tĩnh.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 8.1.2: Hàng hạng mục chưa có — đại diện

- `itemId`: `img-050`
- bbox: (43; 1899) → (1010; 1929)
- `nameJP`: —
- `nameTrans`: Missing item row - representative
- `itemType`: others
- `itemSubtype`: hàng dữ liệu bảng — đại diện cho năm hàng cùng khuôn
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Đại diện cho nhóm hạng mục mà thiết kế đòi nhưng bản đã dựng chưa có gì.
  Thành phần hiển thị: Ba ô: thiết kế đòi là tiếp tục thực hiện tác vụ khi mất kết nối ngắn; prototype làm là không có gì trong hướng này với không service worker; không manifest; không lưu trữ hàng đợi trên client; một thẻ mức chưa có.
  Chức năng và logic: Chỉ đọc. Năm hàng cùng khuôn gộp về hàng này: tiếp tục tác vụ; đồng bộ lại; cache dữ liệu tham chiếu; ping thật; và vết audit cho thao tác trong hàng đợi.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Nhóm chưa có này có thứ tự thi công bắt buộc không; cache dữ liệu tham chiếu là tiền đề của việc nhập được khi mất kết nối?

### Item 8.1.3: Hàng hạng mục xung đột — đại diện

- `itemId`: `img-051`
- bbox: (43; 2132) → (1010; 2179)
- `nameJP`: —
- `nameTrans`: Conflicting item row - representative
- `itemType`: others
- `itemSubtype`: hàng dữ liệu bảng — đại diện cho ba hàng cùng khuôn
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Đại diện cho nhóm hạng mục mà bản đã dựng đang chạy đúng một yêu cầu khác và vì thế chặn thiết kế của thành phần này.
  Thành phần hiển thị: Ba ô: thiết kế đòi là đồng bộ lại xử lý được ca ngày nghiệp vụ đã lock; prototype làm là khoá ngày đã chạy thật và chặn ghi trên các bảng theo ngày nên đồng bộ lại sẽ bị từ chối và không có đường tự động nào vượt qua; một thẻ mức xung đột.
  Chức năng và logic: Chỉ đọc. Ba hàng cùng khuôn gộp về hàng này: ca ngày đã lock; ca số lượng đã đổi; và ca danh sách tác vụ quan trọng chưa chốt.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Ba ca xung đột này giải bằng cách thu phạm vi hay bằng cách để người dùng nhập lại tay; ảnh nói phải chọn nhưng không chọn.

### Item 8.2: Ghi chú hai dòng xung đột không phải lỗi prototype

- `itemId`: `img-052`
- bbox: (42; 2275) → (1010; 2308)
- `nameJP`: —
- `nameTrans`: Conflict interpretation note
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
  Mục đích và ngữ cảnh: Không cho ai đọc hai dòng xung đột thành lỗi của bản đã dựng.
  Thành phần hiển thị: Một đoạn chữ nhỏ: hai rào đó là hai yêu cầu khác đang chạy đúng gồm chốt kỳ và chặn bán vượt số lượng; chúng nói rằng việc đồng bộ lại không thể vô điều kiện; nên thiết kế phải chọn hoặc chấp nhận người dùng nhập lại tay qua SC-20 hoặc thu phạm vi về suy giảm chỉ đọc.
  Chức năng và logic: Tĩnh.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 9: Chân ghi chú phân quyền hai phương án và giả định

- `itemId`: `img-053`
- bbox: (26; 2349) → (1026; 2594)
- `nameJP`: —
- `nameTrans`: Footer note on roles tradeoffs assumptions
- `itemType`: label
- `itemSubtype`: chân trang chú thích
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Gom ba thứ phải đọc trước khi dựng: phân quyền; hai phương án cần quyết định; và năm giả định chưa chốt.
  Thành phần hiển thị: Một đoạn chú thích nhiều dòng: phân quyền không lọc theo vai trò với cả bảy vai trò thấy chỉ báo toàn cục và bốn vai trò hiện trường thấy thêm banner trong màn; hai phương án là suy giảm chỉ đọc và hàng đợi ghi cộng đồng bộ lại kèm đánh đổi từng phương án; rủi ro riêng của hàng đợi là nó nằm trên thiết bị nên nằm ngoài mọi lớp phân quyền và audit của hệ; năm giả định cần chốt; một liên kết tới file đặc tả.
  Chức năng và logic: Tĩnh. Câu chốt là quyết định thuộc ADR chứ không thuộc thành phần này.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`:
  Chọn phương án nào; suy giảm chỉ đọc chỉ thoả một phần yêu cầu còn hàng đợi ghi thì đúng chữ nhưng xung đột với chốt kỳ và chặn bán vượt số lượng?
  Hàng đợi khoá theo người dùng trên thiết bị dùng chung được thi hành thế nào ở phía giao diện?
