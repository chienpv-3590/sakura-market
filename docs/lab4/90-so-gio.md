# Số giờ đã dùng — LAB-4 Wireframe, architecture và detail design

Sản phẩm nộp bắt buộc của đề. Gộp theo tuần, độ chính xác 0,5h — cùng định dạng
`docs/time-log.md` của LAB-3.

## ⚠️ Dòng cần bạn tự điền trước khi nộp

| Tuần | Giờ thật | Việc chính |
|---|---|---|
| 07/09–13/09 | **`___`h** | Toàn bộ LAB-4 |
| | **Tổng: `___`h** | |

**Vì sao để trống:** con số này là khai báo thời gian của **bạn**, không phải của công cụ. Tôi đo
được thời gian chạy của các tác vụ tự động, nhưng không đo được thời gian bạn ngồi đọc đề, ra
quyết định phạm vi, soát lại kết quả và sửa. Điền số đúng, đừng làm tròn xuống — đề đòi "số giờ
**thật**", và LAB-3 đã tạo tiền lệ khai thẳng 18h trên ngân sách 10h.

## Ước lượng ghi TRƯỚC khi bắt đầu

Ghi trong `plans/260909-1355-lab4-thiet-ke-chi-tiet/phase-08-so-gio-va-nop.md` trước khi làm
việc đầu tiên — để cuối bài so được, chứ không phải điều chỉnh ước lượng cho khớp thực tế.

| Phase | Nội dung | Ước lượng |
|---|---|---|
| 01 | Roster 32 màn + ma trận gap | 1.0h |
| 02 | Database diagram + đối chiếu bảng thật | 1.5h |
| 03 | Architecture design | 2.0h |
| 04 | Screen spec 20 màn đã dựng | 4.5h |
| 05 | Screen spec 12 màn chưa dựng | 2.5h |
| 06 | Wireframe HTML 32 màn | 3.0h |
| 07 | ADR | 1.5h |
| 08 | Số giờ + tự soát + nộp | 0.5h |
| | **Tổng ước lượng** | **16.5h** |

Ngân sách đề là **6.0h**. Ước lượng vượt gần ba lần ngay từ đầu, và nguyên nhân là phạm vi đã
chốt: 32 màn LAB-1 (không chỉ 20 màn đã dựng ở LAB-3) × đặc tả đầy đủ field/validation/trạng
thái/phân quyền, cộng wireframe HTML cho cả 32.

## Sản lượng đo được

| Sản phẩm | Quy mô |
|---|---|
| Roster + ma trận gap | 157 dòng |
| Database diagram (ERD 18 bảng + 1 view, 18 hàng đối chiếu, § bảng cần thêm) | 1365 dòng |
| Architecture design (9 sơ đồ Mermaid, 4 mục nhánh, 57 ID RFP) | 991 dòng |
| Screen spec 32 màn | 5135 dòng, 32 file, không file nào vượt 200 dòng |
| ADR 14 bản + index | 1269 dòng |
| Wireframe: shell + 32 partial | 5119 dòng nguồn → `index.html` 5162 dòng |
| Tự soát tiêu chí | 1 file |
| **Tổng** | **87 file · 1.7M · 2229 tham chiếu `file:dòng`** |

## Ba việc tiêu giờ nhiều nhất so với dự kiến

1. **Hoà giải ba hệ mã màn hình.** Không có trong kế hoạch ban đầu. Repo đang mang song song 32
   mã `SC-` (Screen List LAB-1), 20 mã `SCR0XX` (bảng khai LAB-3) và 26 mã `SCR0XX` (đọc từ
   code) — và hai hệ `SCR` **đánh số khác nhau cho cùng một màn**. Thêm ba màn tồn tại trong code
   mà LAB-1 không thiết kế (`SCR002_Home`, `SCR004_ParticipantNew`, `SCR006_LotsList`), và một mã
   (`SC-27`) bị khai mâu thuẫn ở hai chỗ. Phải chốt xong roster trước mọi việc khác, không thì
   bảy phase sau index sai.

2. **Bốn phát hiện lỗi thật trong code, mỗi phát hiện phải xác minh lại trước khi đưa vào bản
   nộp.** Xem `91-tu-soat-tieu-chi.md` § "Phát hiện kỹ thuật vượt ngoài phạm vi tài liệu". Việc
   này không thuộc phạm vi "viết tài liệu thiết kế" nhưng bỏ qua thì bộ nộp sẽ mô tả một hệ thống
   không tồn tại. Riêng lỗ hổng lock được bốn nguồn độc lập tìm ra trên bốn bảng khác nhau, và
   khung giải thích đúng của nó (hệ quả chưa lường của quyết định dồn lock vào trigger, không
   phải bốn bug lẻ) chỉ hiện ra sau khi đọc `lock_enforcement_fix.sql` — file đã **drop** các
   policy mà lập luận ban đầu dựa vào.

3. **Đối chiếu ngược một giả định phạm vi của LAB-3.** `technical-spec.md:118` của LAB-3 khai
   việc bỏ cửa kiểm hiệu lực ở nhánh せり là giả định có lý lẽ: "RFP không nêu yêu cầu tương
   đương cho せり". Kiểm lại `BR-PERM-01` (RFP:595) và `FR-PARTY-02` (RFP:630, P0) thì lý lẽ đó
   không đứng — cả hai viết trung tính về kênh. Loại việc này tốn giờ vì phải đọc cả tài liệu
   khách lẫn tài liệu nội bộ lẫn code, nhưng đây đúng là điều đề LAB-4 đòi: "phát hiện được chỗ
   prototype làm khác thiết kế".

## Ghi chú về cách làm

Phần lớn khối lượng được chia cho 12 lượt tác vụ song song, mỗi lượt sở hữu một tập file rời
nhau (2 tài liệu lõi · 6 nhóm screen spec · 4 nhóm wireframe), cộng các lượt chạy lại để hợp nhất
phát hiện. Chi phí phối hợp là thật và đã tính vào: bốn lần brief của người điều phối sai và
phải sửa sau khi tác vụ báo lại — SC-10 không đọc `mekiki_record`, nguồn `business_date` không
đến từ payload, một policy RLS đã bị drop, và số vai trò là 7 chứ không 9. Cả bốn đều do tác vụ
bắt được nhờ ràng buộc "tin code, dẫn `file:dòng`", không phải do người điều phối tự soát ra.
