# Design Context - trang-thai-van-hanh-suy-giam

## Screen info

- Screen: SC-32 · Trạng thái vận hành suy giảm
- Source family: `image` (CREATE mode)
- Source image: `.momorph/shots/SC-32-trang-thai-van-hanh-suy-giam.png` (1280 × 2616)
- Source token: `SC-32-trang-thai-van-hanh-suy-giam` · screen name: `trang-thai-van-hanh-suy-giam`
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Loại màn: **Component cắt ngang** — không có route riêng; hiển thị chồng lên màn khác theo hai lớp
- Tổng số component logic: 53 (batch 3/4)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `6.1.2` | `6.1` | `img-031` | Hàng field một Trạng thái kết nối | 1 \| Trạng thái kết nối \| badge \| Cờ online của trình duyệt cộng một lần ping thật tới server. Không tin cờ online một mình. | — | không | — | 43 | 1221 | 1010 | 1267 |
| `6.1.3` | `6.1` | `img-032` | Hàng field hai Số thao tác chờ đồng bộ | 2 \| Số thao tác chờ đồng bộ \| number \| Đếm bản ghi trong hàng đợi cục bộ. Bằng 0 thì ẩn chỉ báo | — | không | — | 43 | 1267 | 1010 | 1314 |
| `6.1.4` | `6.1` | `img-033` | Hàng field ba Thao tác chờ lâu nhất | 3 \| Thao tác chờ lâu nhất \| datetime \| Hàng đợi cục bộ. Cảnh báo mạnh hơn khi vượt ngưỡng — thời gian ngắn chưa được định lượng | — | không | — | 43 | 1314 | 1010 | 1344 |
| `6.1.5` | `6.1` | `img-034` | Hàng field bốn Trạng thái đồng bộ | 4 \| Trạng thái đồng bộ \| badge \| Tiến trình replay hàng đợi — nửa đồng bộ lại của NFR-AVL-02 | — | không | — | 43 | 1344 | 1010 | 1374 |
| `6.1.6` | `6.1` | `img-035` | Hàng field năm Thao tác đồng bộ thất bại | 5 \| Thao tác đồng bộ thất bại \| number \| Bản ghi bị server từ chối khi replay. Không tự xoá; phải người dùng xử lý | — | không | — | 43 | 1374 | 1010 | 1420 |
| `6.1.7` | `6.1` | `img-036` | Hàng field sáu Lý do thất bại | 6 \| Lý do thất bại \| text \| Mã lỗi cộng thông điệp server của lần replay. Giữ nguyên mã lỗi gốc 409 / 423 / 422 | — | không | — | 43 | 1420 | 1010 | 1449 |
| `6.1.8` | `6.1` | `img-037` | Hàng field bảy Ngày nghiệp vụ lúc nhập | 7 \| Ngày nghiệp vụ lúc nhập \| date \| Ngày nghiệp vụ JST tại thời điểm xếp vào hàng đợi. Server so lại với ngày hiện tại và trạng thái lock | — | không | — | 43 | 1449 | 1010 | 1496 |
| `7` | — | `img-038` | Khối trạng thái màn | Trạng thái | — | có | `img-039`; `img-040`; `img-041`; `img-042`; `img-043`; `img-044`; `img-045`; `img-046` | 26 | 1525 | 1026 | 1814 |
| `7.1` | `7` | `img-039` | Thẻ trạng thái Rỗng | Rỗng (mặc định) — Online; hàng đợi rỗng: ẩn hoàn toàn; hoặc một dấu hiệu tối giản. | — | không | — | 42 | 1569 | 277 | 1696 |
| `7.2` | `7` | `img-040` | Thẻ trạng thái Đang tải | Đang tải — Đang đọc hàng đợi cục bộ khi khởi động: chỉ báo trung tính; không báo online sớm. | — | không | — | 286 | 1569 | 522 | 1696 |
| `7.3` | `7` | `img-041` | Thẻ trạng thái Lỗi tải | Lỗi tải — Không đọc được hàng đợi: cảnh báo chế độ suy giảm không khả dụng; và chặn ghi. | — | không | — | 531 | 1569 | 766 | 1696 |
| `7.4` | `7` | `img-042` | Thẻ trạng thái Không có quyền | Không có quyền — Không áp dụng: thành phần không có route riêng. Màn chứa nó giữ nguyên cơ chế 404 của mình. | — | không | — | 775 | 1569 | 1010 | 1696 |
| `7.5` | `7` | `img-043` | Thẻ trạng thái Mất kết nối | Mất kết nối — Ping server thất bại: badge cộng banner trên màn có ghi dữ liệu. | — | không | — | 42 | 1705 | 277 | 1798 |
| `7.6` | `7` | `img-044` | Thẻ trạng thái Đang đồng bộ lại | Đang đồng bộ lại — Đang replay hàng đợi: badge Đang đồng bộ cộng tiến độ. Là trạng thái nghiệm thu của nửa sau NFR-AVL-02. | — | không | — | 286 | 1705 | 522 | 1798 |
| `7.7` | `7` | `img-045` | Thẻ trạng thái Đồng bộ thất bại | Đồng bộ thất bại — Replay bị server từ chối: badge cộng danh sách thao tác thất bại. Hành động: xem lý do; nhập lại tay; bỏ thao tác. | — | không | — | 531 | 1705 | 766 | 1798 |
