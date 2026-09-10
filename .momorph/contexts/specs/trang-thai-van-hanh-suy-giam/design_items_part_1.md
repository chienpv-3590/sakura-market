# Design Context - trang-thai-van-hanh-suy-giam

## Screen info

- Screen: SC-32 · Trạng thái vận hành suy giảm
- Source family: `image` (CREATE mode)
- Source image: `.momorph/shots/SC-32-trang-thai-van-hanh-suy-giam.png` (1280 × 2616)
- Source token: `SC-32-trang-thai-van-hanh-suy-giam` · screen name: `trang-thai-van-hanh-suy-giam`
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Loại màn: **Component cắt ngang** — không có route riêng; hiển thị chồng lên màn khác theo hai lớp
- Tổng số component logic: 53 (batch 1/4)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `1` | — | `img-001` | Khối đầu màn trạng thái vận hành suy giảm | SC-32 · Trạng thái vận hành suy giảm | — | có | `img-002`; `img-003` | 26 | 22 | 1026 | 122 |
| `1.1` | `1` | `img-002` | Tiêu đề màn | SC-32 · Trạng thái vận hành suy giảm | — | không | — | 26 | 22 | 1026 | 48 |
| `1.2` | `1` | `img-003` | Dòng metadata truy vết | FE-045 Vận hành suy giảm khi mất kết nối · FN-14 · P1 · NFR-AVL-02 · Component — không có route riêng · actor: người dùng tại hiện trường | — | có | `img-004` | 26 | 60 | 1026 | 98 |
| `1.2.1` | `1.2` | `img-004` | Thẻ trạng thái dựng màn | Chưa thi công | — | không | — | 415 | 79 | 491 | 98 |
| `2` | — | `img-005` | Dải chú thích yêu cầu và ranh giới thành phần cắt ngang | Chưa thi công. NFR-AVL-02 là nguồn duy nhất cho hành vi này. Đây là Component; không phải trang. | — | không | — | 26 | 138 | 1026 | 265 |
| `3` | — | `img-006` | Khối danh sách tác vụ quan trọng | "Tác vụ quan trọng" — NFR-AVL-02 không liệt kê tác vụ nào; ba tác vụ dưới đây là suy ra; cần khách xác nhận | — | có | `img-007`; `img-012`; `img-013` | 26 | 281 | 1026 | 603 |
| `3.1` | `3` | `img-007` | Bảng ba tác vụ quan trọng | Tác vụ · Màn · Vì sao là tác vụ hiện trường · Đồng bộ lại | — | có | `img-008`; `img-009`; `img-010`; `img-011` | 42 | 326 | 1010 | 495 |
| `3.1.1` | `3.1` | `img-008` | Hàng tiêu đề bảng tác vụ | Tác vụ \| Màn \| Vì sao là tác vụ hiện trường \| Đồng bộ lại | — | không | — | 43 | 326 | 1010 | 353 |
| `3.1.2` | `3.1` | `img-009` | Hàng tác vụ Nhập lô hàng | Nhập lô hàng \| SC-08 /lots/new \| Lô đến trong khung dịch vụ 02:00–10:00 JST; nhập ngay tại bến \| Cấp mã lô là việc của server — trùng mã khi replay phải chặn được | — | không | — | 43 | 353 | 1010 | 400 |
| `3.1.3` | `3.1` | `img-010` | Hàng tác vụ Chốt giao dịch | Chốt giao dịch \| SC-11 /transactions/new \| Chốt giá tại sàn; không chờ được \| Số lượng khả dụng có thể đã đổi lúc replay — xung đột thật; không tự giải được | — | không | — | 43 | 400 | 1010 | 448 |
| `3.1.4` | `3.1` | `img-011` | Hàng tác vụ Ghi nhận giao hàng | Ghi nhận giao hàng \| SC-16 /deliveries/[id] \| Ghi từng lần giao ngoài hiện trường; trên tablet \| Lần giao thuộc ngày nghiệp vụ lúc nhập; ngày đó có thể đã lock lúc replay | — | không | — | 43 | 448 | 1010 | 494 |
| `3.2` | `3` | `img-012` | Ghi chú nguồn của ba tác vụ | Ba tác vụ này lấy từ đâu. RFP không liệt kê; cũng không nói con số ba. Con số 3 đến từ Feature List FE-045. NFR-USE-01 gọi tên đúng ba luồng hiện trường. Đây là suy luận; không phải trích dẫn. | — | không | — | 42 | 498 | 1010 | 549 |
| `3.3` | `3` | `img-013` | Ghi chú hai màn nhập tại chỗ ngoài danh sách | SC-09 và SC-13 cũng là thao tác tại chỗ; nhưng NFR-USE-01 không gọi tên — tính vào thì danh sách thành 5 và ngân sách đổi theo. | — | không | — | 42 | 559 | 1010 | 576 |
| `4` | — | `img-014` | Khối lớp một chỉ báo toàn cục | Lớp 1 · Chỉ báo toàn cục — top header; mọi màn sau khi đăng nhập | — | có | `img-015`; `img-018` | 26 | 616 | 1026 | 763 |
| `4.1` | `4` | `img-015` | Khung giả lập thanh đầu trang | Sakura Market · điều hướng \| Ngày nghiệp vụ: YYYY-MM-DD · đã lock \| Mất kết nối · 3 thao tác chờ \| Người tham gia A | — | có | `img-016`; `img-017` | 42 | 660 | 1010 | 701 |
