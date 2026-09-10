# Design Context - trang-thai-van-hanh-suy-giam

## Screen info

- Screen: SC-32 · Trạng thái vận hành suy giảm
- Source family: `image` (CREATE mode)
- Source image: `.momorph/shots/SC-32-trang-thai-van-hanh-suy-giam.png` (1280 × 2616)
- Source token: `SC-32-trang-thai-van-hanh-suy-giam` · screen name: `trang-thai-van-hanh-suy-giam`
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Loại màn: **Component cắt ngang** — không có route riêng; hiển thị chồng lên màn khác theo hai lớp
- Tổng số component logic: 53 (batch 4/4)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `7.8` | `7` | `img-046` | Thẻ trạng thái Read-only vì ngày đã lock | Read-only vì ngày đã lock — Replay chạm một ngày nghiệp vụ đã lock: thao tác không vào được; phải đi đường điều chỉnh SC-20 — mã 423. | — | không | — | 775 | 1705 | 1010 | 1798 |
| `8` | — | `img-047` | Khối đối chiếu thiết kế và prototype | ĐỐI CHIẾU PROTOTYPE | — | có | `img-048`; `img-052` | 26 | 1827 | 1026 | 2334 |
| `8.1` | `8` | `img-048` | Bảng đối chiếu ba cột | Thiết kế đòi · Prototype làm · Mức | — | có | `img-049`; `img-050`; `img-051` | 42 | 1871 | 1010 | 2272 |
| `8.1.1` | `8.1` | `img-049` | Hàng tiêu đề bảng đối chiếu | Thiết kế đòi \| Prototype làm \| Mức | — | không | — | 43 | 1871 | 1010 | 1899 |
| `8.1.2` | `8.1` | `img-050` | Hàng hạng mục chưa có — đại diện | Tiếp tục thực hiện tác vụ khi mất kết nối ngắn \| Không có gì trong hướng này: không service worker; không manifest; không lưu trữ hàng đợi trên client \| chưa có | — | không | — | 43 | 1899 | 1010 | 1929 |
| `8.1.3` | `8.1` | `img-051` | Hàng hạng mục xung đột — đại diện | Replay xử lý được ca ngày nghiệp vụ đã lock \| Trigger khoá ngày đã chạy thật và chặn ghi trên các bảng theo ngày — nên replay sẽ bị từ chối; không có đường tự động nào vượt qua \| xung đột | — | không | — | 43 | 2132 | 1010 | 2179 |
| `8.2` | `8` | `img-052` | Ghi chú hai dòng xung đột không phải lỗi prototype | Hai rào đó là hai yêu cầu khác đang chạy đúng. Chúng nói rằng replay không thể vô điều kiện. | — | không | — | 42 | 2275 | 1010 | 2308 |
| `9` | — | `img-053` | Chân ghi chú phân quyền hai phương án và giả định | Phân quyền: không lọc theo vai trò. Quyết định thuộc ADR. Rủi ro riêng của hàng đợi. Năm giả định cần chốt. | — | không | — | 26 | 2349 | 1026 | 2594 |
