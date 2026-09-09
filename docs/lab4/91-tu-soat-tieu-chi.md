# Tự soát theo 4 tiêu chí đạt — LAB-4

Bốn tiêu chí chép từ đề (`docs/aidd-lab-roadmap-and-assignments-vi.md` § LAB-4 § "Sản phẩm nộp
bắt buộc"). Mỗi tiêu chí có **phép kiểm đếm được**, không phải tự nhận. Ô kết quả chỉ có Đạt hoặc
Chưa đạt — không có "cơ bản đạt".

## Bảng soát

| # | Tiêu chí đề | Phép kiểm | Kết quả | Dẫn chứng |
|---|---|---|---|---|
| 1 | Kiến trúc phản ánh đúng ràng buộc nghiệp vụ đặc thù, không tổng quát hoá | Đếm ID yêu cầu RFP được dẫn trong `20-architecture-design.md` (ngưỡng tự đặt: ≥ 6) · có đủ 4 mục điểm phân nhánh · có phân biệt trạng thái thi công | **Đạt** | **57 ID riêng biệt** · 4 mục nhánh ở § 4.1 許可/承認 · § 4.2 相対取引/せり · § 4.3 trước/sau lock · § 4.4 maker-checker · 3 nhãn dùng 35 lần (8 `[ĐÃ THI CÔNG]`, 16 `[LAB-5]`, 11 `[CHƯA CHỐT]`) |
| 2 | Screen spec đủ chi tiết để break task ở LAB-5 mà không cần hỏi lại tác giả | **Làm thật**: lấy 2 màn, thử viết task chỉ đọc file spec đó, không mở file khác | **Đạt** | Xem § "Phép kiểm tiêu chí 2" bên dưới — 6 task từ SC-11, 5 task từ SC-17, mỗi task có file · dòng · nguyên nhân · tiêu chí xong |
| 3 | ADR có đủ 4 phần cho từng quyết định | Script kiểm 6 tiêu đề mục trong từng file `adr/ADR-*.md` | **Đạt** | **14/14 bản** có Bối cảnh · Lựa chọn · Phương án đã bỏ · Hệ quả · "Phải chịu" không rỗng · Dẫn chứng. 9 `Đã áp dụng` / 5 `Đề xuất` |
| 4 | Database diagram đối chiếu đúng bảng thật ở LAB-3, không chỉ vẽ lý thuyết | Đếm entity trong `erDiagram` so với `create table` trong migration · đếm hàng đối chiếu · parse ERD bằng mermaid thật | **Đạt** | ERD **19 entity** = 18 bảng + 1 view; migration có **18** `create table` → khớp · § 4 có **18 hàng**, cả 18 đều dẫn `file:dòng` · ERD parse bằng **mermaid 11.17.2** thật: 19 entity, 34 relationship, entity duy nhất không PK là `reconciliation_line` (đúng vì nó là view) · 18 bảng + 1 view **đếm sống** trên database đang chạy qua endpoint gốc PostgREST |

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
