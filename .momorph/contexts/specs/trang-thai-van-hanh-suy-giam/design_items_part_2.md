# Design Context - trang-thai-van-hanh-suy-giam

## Screen info

- Screen: SC-32 · Trạng thái vận hành suy giảm
- Source family: `image` (CREATE mode)
- Source image: `.momorph/shots/SC-32-trang-thai-van-hanh-suy-giam.png` (1280 × 2616)
- Source token: `SC-32-trang-thai-van-hanh-suy-giam` · screen name: `trang-thai-van-hanh-suy-giam`
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Loại màn: **Component cắt ngang** — không có route riêng; hiển thị chồng lên màn khác theo hai lớp
- Tổng số component logic: 53 (batch 2/4)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `4.1.1` | `4.1` | `img-016` | Thẻ ngày nghiệp vụ | Ngày nghiệp vụ: YYYY-MM-DD · đã lock | — | không | — | 548 | 672 | 738 | 691 |
| `4.1.2` | `4.1` | `img-017` | Thẻ chỉ báo mất kết nối và số thao tác chờ | Mất kết nối · 3 thao tác chờ | — | không | — | 749 | 672 | 884 | 691 |
| `4.2` | `4` | `img-018` | Ghi chú tiền lệ chỗ treo chỉ báo cắt ngang | Tiền lệ đúng khuôn: chỉ báo ngày nghiệp vụ đặt ở top header vì gần như mọi màn ghi đều từ chối input khi ngày đã lock. | — | không | — | 42 | 704 | 1010 | 737 |
| `5` | — | `img-019` | Khối lớp hai banner trong màn | Lớp 2 · Banner trong màn — vẽ chồng lên khung giả lập SC-16 /deliveries/[id] | — | có | `img-020`; `img-027` | 26 | 776 | 1026 | 1136 |
| `5.1` | `5` | `img-020` | Khung giả lập màn nền SC-16 | SC-16 · Chi tiết giao hàng và các lần giao — màn nền; chỉ giả lập | — | có | `img-021`; `img-022`; `img-023`; `img-024`; `img-025`; `img-026` | 42 | 821 | 1010 | 1074 |
| `5.1.1` | `5.1` | `img-021` | Tiêu đề màn nền kèm thẻ giả lập | SC-16 · Chi tiết giao hàng và các lần giao \| màn nền; chỉ giả lập | — | không | — | 58 | 837 | 994 | 857 |
| `5.1.2` | `5.1` | `img-022` | Banner mất kết nối và số thao tác chờ | Mất kết nối. 3 thao tác của bạn chưa tới được server. Thao tác chờ lâu nhất: YYYY-MM-DD hh:mm · ngày nghiệp vụ lúc nhập: YYYY-MM-DD. | — | không | — | 58 | 865 | 994 | 941 |
| `5.1.3` | `5.1` | `img-023` | Nút Đồng bộ lại | Đồng bộ lại | — | không | — | 794 | 874 | 881 | 903 |
| `5.1.4` | `5.1` | `img-024` | Nút Xem thao tác chờ | Xem thao tác chờ | — | không | — | 70 | 903 | 187 | 932 |
| `5.1.5` | `5.1` | `img-025` | Hàng form giả lập của màn nền | Lô hàng LOT-0001 \| Số lượng lần giao này 0 \| Ghi nhận lần giao | — | không | — | 58 | 952 | 994 | 1011 |
| `5.1.6` | `5.1` | `img-026` | Ghi chú vị trí và điều kiện hiện banner | Banner nằm đầu vùng nội dung; trên form; chỉ hiện khi màn có ghi dữ liệu và đang mất kết nối hoặc còn thao tác chờ của chính màn đó. | — | không | — | 58 | 1014 | 994 | 1047 |
| `5.2` | `5` | `img-027` | Ghi chú danh sách màn có banner trong màn | Các màn có banner trong màn: SC-08 · SC-11 · SC-16; cộng SC-17 nếu tính. Form vẫn nhận input hay bị chặn là tuỳ phương án ADR. | — | không | — | 42 | 1077 | 1010 | 1110 |
| `6` | — | `img-028` | Khối bảng field dẫn xuất | Field #1–#7 — không có field nhập; toàn bộ dẫn xuất từ hàng đợi cục bộ và trạng thái mạng | — | có | `img-029` | 26 | 1149 | 1026 | 1512 |
| `6.1` | `6` | `img-029` | Bảng bảy field dẫn xuất | # · Nhãn · Kiểu · Nguồn dẫn xuất và ràng buộc | — | có | `img-030`; `img-031`; `img-032`; `img-033`; `img-034`; `img-035`; `img-036`; `img-037` | 42 | 1193 | 1010 | 1496 |
| `6.1.1` | `6.1` | `img-030` | Hàng tiêu đề bảng field | # \| Nhãn \| Kiểu \| Nguồn dẫn xuất và ràng buộc | — | không | — | 43 | 1194 | 1010 | 1221 |
