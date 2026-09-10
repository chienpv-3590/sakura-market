# Tự soát theo 4 tiêu chí đạt — LAB-4

Bốn tiêu chí chép từ đề (`docs/aidd-lab-roadmap-and-assignments-vi.md` § LAB-4 § "Sản phẩm nộp
bắt buộc"). Mỗi tiêu chí có **phép kiểm đếm được**, không phải tự nhận. Ô kết quả chỉ có Đạt hoặc
Chưa đạt — không có "cơ bản đạt".

## Bảng soát

| # | Tiêu chí đề | Phép kiểm | Kết quả | Dẫn chứng |
|---|---|---|---|---|
| 1 | Kiến trúc phản ánh đúng ràng buộc nghiệp vụ đặc thù, không tổng quát hoá | Đếm ID yêu cầu RFP được dẫn trong `20-architecture-design.md` (ngưỡng tự đặt: ≥ 6) · có đủ 4 mục điểm phân nhánh · có 5 state machine của RFP · có phân biệt trạng thái thi công | **Đạt** | 4 mục nhánh ở **§ 5.1** 許可/承認 · **§ 5.2** 相対取引/せり · **§ 5.3** trước/sau lock · **§ 5.4** maker-checker; cộng **§ 4** với 5 state machine (`FIG-010/011/012/014/029`) kèm đối chiếu prototype. 3 nhãn phân biệt trạng thái thi công. Đếm cuối: **2.080 lần dẫn RFP theo số dòng** và **2.831 tham chiếu `file:dòng`** trên toàn bộ `docs/lab4/` |
| 2 | Screen spec đủ chi tiết để break task ở LAB-5 mà không cần hỏi lại tác giả | **Làm thật**: lấy 2 màn, thử viết task chỉ đọc file spec đó, không mở file khác | **Đạt** | Xem § "Phép kiểm tiêu chí 2" bên dưới — 6 task từ SC-11, 5 task từ SC-17, mỗi task có file · dòng · nguyên nhân · tiêu chí xong |
| 3 | ADR có đủ 4 phần cho từng quyết định | Script kiểm 6 tiêu đề mục trong từng file `adr/ADR-*.md` | **Đạt** | **15/15 bản** có Bối cảnh · Lựa chọn · Phương án đã bỏ · Hệ quả · "Phải chịu" không rỗng · Dẫn chứng. 9 `Đã áp dụng` / 6 `Đề xuất` |
| 4 | Database diagram đối chiếu đúng bảng thật ở LAB-3, không chỉ vẽ lý thuyết | Đếm entity trong `erDiagram` so với `create table` trong migration · đếm hàng đối chiếu · parse ERD bằng mermaid thật | **Đạt** | ERD **19 entity** = 18 bảng + 1 view; migration có **18** `create table` → khớp · § 4 có **21 hàng**, cả 21 đều dẫn `file:dòng`, và thang mức độ có 4 bậc (khớp · khác có chủ đích · khác không chủ đích · **cần khách chốt**) · ERD parse bằng **mermaid 11.17.2** thật: 19 entity, 34 relationship, entity duy nhất không PK là `reconciliation_line` (đúng vì nó là view) · 18 bảng + 1 view **đếm sống** trên database đang chạy qua endpoint gốc PostgREST |

## Phép kiểm tiêu chí 2 — làm thật, không suy luận

Cách làm: chọn một màn đã dựng phức tạp nhất và một màn chưa dựng, mở **đúng một file spec** cho
mỗi màn, thử viết task như thể sắp đưa vào GitHub Project ở LAB-5. Chỗ nào phải mở file khác thì
spec còn thiếu.

### Từ `spec/SC-11-tao-giao-dich-aitai.md` — 6 task, không mở file nào khác

| Task | Nguyên nhân trong spec | Sửa ở đâu | Tiêu chí xong |
|---|---|---|---|
| Chặn tạo nháp trên ngày đã lock | Mục 4 dòng cuối + mục 7: route không tra `business_day_lock`, trigger chỉ `before update or delete` → sinh nháp mồ côi, chốt mới 423 | `src/app/api/transactions/route.ts` | Nháp không tạo được trên ngày đã lock, trả 423 |
| Phân biệt thông báo lỗi ở form tạo | Mục 4 trạng thái "gửi lỗi": 422 `lot_not_available`, 422 `invalid_request`, 400 `invalid_json`, 500 đều ra một câu | `src/components/transactions/aitai-create-form.tsx:49-53` | Bốn mã ra bốn thông báo khác nhau |
| Xử lý lỗi truy vấn ở trang tạo | Mục 4 "lỗi tải": `page.tsx:21-29` bỏ `error` khi destructuring → lỗi DB hiện y như "hết lô hàng" | `src/app/(app)/transactions/new/page.tsx:21-29` | DB lỗi hiện thông báo khác trạng thái rỗng |
| Bịt cửa sổ `revertToDraft` trúng lock | Mục 7: lock xảy ra sau CAS tầng 1 và trước bù trừ → `revertToDraft` trúng P0001, throw 500, dòng đứng ở `confirmed` dù cửa đã fail | `src/lib/transactions/confirm-transaction.ts:18-20` | Cửa fail + ngày bị lock giữa lúc chốt không để lại dòng `confirmed` sai |
| Thống nhất audit cho 423 | Mục 7: cancel ghi `locked_write_attempt`, confirm trả 423 trần | `src/app/api/transactions/[id]/confirm/route.ts:34-37` | Cả hai đường 423 đều để lại vết audit |
| `txn_code` dùng sequence thay vì đếm-rồi-cộng | Mục 7: `nextTxnSeq` đếm rồi +1, UNIQUE bắt `23505`, retry đúng 1 lần → ba người cùng lúc thì người thứ ba nhận 500 | `src/app/api/transactions/route.ts:36,95-105` | Ba request tạo đồng thời đều thành công |

### Từ `spec/SC-17-ghi-nhan-ngoai-le-giao-hang.md` — 5 task, không mở file nào khác

| Task | Nguyên nhân trong spec | Sửa ở đâu | Tiêu chí xong |
|---|---|---|---|
| Migration bảng `delivery_exception` | Mục 3: 7 cột đề xuất, `kind` CHECK đúng 4 giá trị `FR-DEL-03` (giao thiếu / giao thừa / hoàn trả / hủy một phần), `qty` CHECK > 0 | `supabase/migrations/` | CHECK từ chối giá trị thứ 5; `business_date` và `confirmed_by` không nhận từ body |
| Mở đường ghi `delivery.status = 'ngoại lệ'` | Mục 1: giá trị CHECK **đã có** (`delivery.sql:10-11`) nhưng không đường nào đặt được — `recordShipment` chỉ đặt `'đang giao'` (`record-shipment.ts:96`), `completeDelivery` chỉ `'hoàn tất'` (`complete-delivery.ts:66`) | `src/lib/deliveries/` | Sau khi ghi ngoại lệ, `delivery.status` = `'ngoại lệ'` |
| Lật `RPT-04` từ mock sang thật | Mục 1: `RPT-04` phải để `isMock: true` (`registry.ts:89-96`) **vì** thiếu dữ liệu ngoại lệ. Màn này là điều kiện để báo cáo đó chạy | `src/lib/reports/registry.ts` | RPT-04 trả 200 thay vì 403 `MOCK_REPORT` |
| Route + form ghi ngoại lệ | Mục 2: đề xuất `/deliveries/[id]/exceptions/new`, ROLE-DELIVERY (vai trò duy nhất ghi được `delivery_shipment`), 404 khi sai vai | `src/app/(app)/deliveries/[id]/exceptions/new/` | Vai trò khác nhận 404, không phải 403 |
| Upload chứng từ theo khuôn đã có | Mục 3 field 8: dùng lại `intake-doc-upload.ts:4-12` — 5MB, 4 loại MIME, kiểm ở **server**, `accept` của client chỉ là gợi ý | `src/lib/lots/` hoặc module tương đương | File sai loại/quá cỡ bị chặn ở server, không chỉ ở client |

**Kết luận phép kiểm:** cả hai file đủ để ra task có tiêu chí xong. Điểm đáng chú ý là task "lật
`RPT-04`" — nó không hiện ra từ tên màn, chỉ hiện ra vì spec nói rõ *vì sao* màn này bị chặn. Đó
là loại thông tin làm ước lượng effort ở LAB-5 đúng thay vì đoán.

## Giới hạn đã biết của bộ nộp

Khai ra để người review không phải tự tìm.

1. **`docs/generated/*` có ít nhất một dẫn chứng bịa** — `permissions-matrix.md:1038` dẫn
   `src/app/(app)/reports/page.tsx:877`, file đó có 63 dòng. Mọi dẫn chứng `file:dòng` trong bộ
   LAB-4 đều kiểm trực tiếp từ code, không chép lại từ tầng generated. Xem
   `00-roster-va-gap.md` § 7.2.
2. **Ba câu hỏi cần chủ đầu tư chốt, không phải ba việc thi công** — khai `[CHƯA CHỐT]` chứ không
   tự quyết: đường gỡ tạm ngừng của 買出人 (FIG-004 chỉ phủ 3/4 category, ADR-007) · vai trò nào
   được đọc audit log (`FR-AUDIT-02` nêu "bộ phận hành chính / kiểm toán nội bộ", không khớp vai
   trò nào trong `TBL-ROLE-01`, ADR-014) · luồng "giao muộn, ghi bù" nếu chặn INSERT trên ngày đã
   lock (ADR-012).
3. **Ba agent viết spec màn đã dựng không có đường dẫn RFP** — RFP nằm ngoài repo
   (`C:\Projects\Baitap\RFP_...md`), nên các dẫn chiếu `FIG-004` và §02-08 dòng 309 trong
   `spec/SC-01..SC-26` là dẫn theo brief của orchestrator. Nội dung đã được đối chiếu RFP gốc và
   đúng, nhưng ai xác nhận lại phải mở RFP chứ đừng tìm trong `docs/`.
4. **`FE-0XX` không phải mã yêu cầu RFP** — grep `FE-[0-9]` trên toàn văn RFP: 0 kết quả. Đó là
   hệ mã của Screen List LAB-1. Mã yêu cầu thật là `FR-*`/`NFR-*`/`BR-*`. Xem
   `00-roster-va-gap.md` § 7.1.
5. **Mermaid trong `20-architecture-design.md` chưa render thật** — 9 sơ đồ đã lint cấu trúc
   (subgraph/end cân, không quote lẻ, không pipe trần trong label) nhưng chưa chạy
   `mermaid.parse`. ERD trong `10-database-diagram.md` thì **đã** parse bằng mermaid 11.17.2 thật.

## Phát hiện kỹ thuật vượt ngoài phạm vi tài liệu

Trong quá trình đối chiếu, bốn nhóm phát hiện là **lỗi/gap thật trong code**, không phải thiếu
tài liệu. Đã ghi vào ADR và bảng đối chiếu; LAB-5 nên tách task riêng. Xếp theo mức nặng:

| # | Phát hiện | Mức |
|---|---|---|
| 1 | **Nhánh せり bỏ cả hai cửa kiểm mà nhánh 相対取引 có** — không kiểm hiệu lực người mua (`FR-PARTY-02`, P0) và không trừ tồn lô (`FR-LOT-03`, P0, "ngăn bán vượt"). LAB-3 có ghi vết phần hiệu lực như một giả định phạm vi, nhưng viện dẫn "RFP không đòi cho せり" không đứng được vì `BR-PERM-01` và `FR-PARTY-02` viết trung tính về kênh | P0 |
| 2 | **Lock không chặn INSERT trên cả 4 bảng bị lock** — hệ quả chưa lường của quyết định dồn lock vào trigger (ADR-004): RLS đã bỏ hết kiểm lock, trigger chỉ `before update or delete`, route không tra. Ca nặng nhất là `mekiki_record` vì nó thừa hưởng `lot.business_date` nên **backdate được vào ngày quá khứ đã lock bằng UI bình thường** | P0 |
| 3 | **Email lọt vào CSV gửi kế toán** — `rpt-06-accounting-export.ts` chủ động select `email` rồi rơi về nó khi `display_name` rỗng; RPT-08 làm đúng (rơi về `id`). Cộng với **xuất CSV không ghi audit** nên không truy được ai tải | P0 |
| 4 | **せり không có đường giao nhận** — `delivery` chỉ có FK tới `transaction`, nên `variance` của mọi dòng seri là NULL *vì không có dữ liệu*, không phải vì khớp. Rủi ro là người đối chiếu đọc sai | P1 |

---

## Cập nhật sau vòng regrounding — đổi NỀN của bộ nộp

Bốn tiêu chí trên vẫn Đạt, nhưng bộ nộp đã đổi **nguồn chân lý** sau khi làm rõ một điều đề bài
LAB-4 không nói: *"Từ prototype chạy thật LAB-3 … phát triển thành bộ thiết kế đầy đủ hơn"* đọc
theo nghĩa hiển nhiên nhất sẽ dẫn tới **đặc tả prototype**. Lượt đầu đã làm đúng như vậy và phải
bỏ 21 CSV.

**Nguồn chân lý hiện tại:** RFP (tài liệu khách) → Function List / Feature List → *rồi mới* đến
prototype, và prototype chỉ là **đối tượng đối chiếu**, không phải nguồn của thiết kế.

### Ba tầng tài liệu — vai khác nhau, đừng đọc lẫn

| Tài liệu | Vai | Quy mô |
|---|---|---|
| `.momorph/specs/*.csv` | Đặc tả **UI/FE** theo component, 22 cột | **1.252 item** / 32 file, kèm bbox JSON + ảnh chú thích |
| `spec-be/SC-*.md` | Đặc tả **BE**: API · dữ liệu · trạng thái · quy tắc · phân quyền · audit | **7.754 dòng** / 32 file |
| `spec/SC-*.md` | **Bản as-built** — prototype hiện làm gì | 5.159 dòng / 32 file |

### Kiểm đã chạy trên sản phẩm mới

| Phép kiểm | Kết quả |
|---|---|
| Hợp đồng CSV 22 cột trên cả 32 file (header khớp từng ký tự · mọi dòng đúng 22 ô · `No` khớp `itemNo` từng phần tử · không bbox ngược) | **Đạt** — 32/32, 1.252 item, 0 lỗi |
| Toạ độ bbox lấy từ `getBoundingClientRect()` thật, không ước lượng | **Đạt** — ảnh và toạ độ dùng chung một khung (rộng 1280, `deviceScaleFactor=1`) |
| `spec-be` mục 1–9 sạch dấu vết prototype (`src/`, `supabase/`) | **Đạt** — kiểm bằng script |
| Wireframe self-contained | **Đạt** — 0 tham chiếu ngoài trong `index.html` |
| Soát bảo mật 6 mẫu trên `docs/lab4/` + `.momorph/` | **Đạt** — 0 hit |

### Ba lỗi trong bộ nộp đã tự phát hiện và sửa

Ghi ra vì chúng là bài học, không phải để tự khen:

1. **`FR-601` trình bày như mã yêu cầu của khách** — grep RFP: **0 hit**, nó là mã nội bộ LAB-3.
   Vì mang tiền tố `FR-` giống mã thật nên đã bị chính bộ tài liệu này đọc sai. Căn cứ khách thật
   là **RFP:311** (§02-08): RFP *giao cho bên dự thầu **đề xuất*** cơ chế phân quyền. Hệ quả:
   `ADR-014` đã đóng khung lại từ "hai yêu cầu khách chống nhau, khách phải chọn" thành
   "**đề xuất của ta chống một yêu cầu khách bằng chữ, ta phải sửa**".
2. **`FIG-004` bị khai là "đòi ba đường gỡ tạm ngừng"** — sai. `FIG-010` (RFP:609) chỉ có **một**
   cạnh; `FIG-004` cho **thủ tục và thẩm quyền trên cạnh đó**. Cách khai sai đã lan ra 5 tài liệu
   trước khi bị bắt, và nếu để nguyên thì BE dev sẽ dựng ba transition thừa. `ADR-007` đã viết lại
   và **đổi tên file**, vì tên file là thứ người ta đọc khi quét cây thư mục.
3. **`spec/SC-32` khai một lớp bảo vệ KHÔNG tồn tại** — nó nói replay hàng đợi offline bị chặn với
   mã 423. Thực tế trigger khoá ngày là `before update **or delete**`, không phủ INSERT, nên replay
   **ghi vào im lặng**. Đây là loại lỗi tài liệu nguy hiểm nhất: dev đọc rồi không dựng cổng chặn
   vì tin DB đã chặn.

### Đóng góp lớn nhất của vòng này

**200 câu hỏi cho chủ đầu tư gom thành 12 quyết định** — `92-cau-hoi-cho-chu-dau-tu.md`. Việc gom
lộ ra rằng phần lớn là **một câu lặp trên nhiều màn**: *"vai nào được đọc dữ liệu này?"* ở **17
màn**, *"ngày nghiệp vụ bám vào đâu?"* ở **8 màn**. Và một lỗ hổng chưa ai gọi tên: RFP mô tả chủ
thể bằng **tên tổ chức** ("bộ phận hành chính", "Đơn vị vận hành chợ", "Hội đồng xét lại"), hệ
thống chỉ có **7 vai kỹ thuật**, và **không chủ thể nào trong đó khớp vai nào** — nó chặn ma trận
phân quyền của gần như toàn bộ 32 màn.

Tài liệu đó cũng tách riêng **hai thứ không phải câu hỏi cho khách mà là lỗi trong gói đề xuất của
ta**: ưu tiên đảo ngược (`FE-025` P0 phụ thuộc `FE-023` P1; `RPT-09` trong nhóm P0 phụ thuộc
`FE-027` P1), và chính chuyện `FR-601`.
