# ADR-011 — Áp cửa kiểm hiệu lực và trừ tồn cho nhánh せり, siết xuống tầng DB

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | **Đề xuất** — chưa thi công |
| Phạm vi ảnh hưởng | `POST /api/seri-results`; bảng `seri_result` (thêm `unique (lot_id)`), `lot.available_qty`; `checkParticipantEligibility()`, `reserveLotQty()`; màn SC-13 (nhập kết quả せり), SC-18 (đối chiếu ngày) |

## Bối cảnh

Cùng một nghiệp vụ — bán một lô cho một người tham gia — nhưng hai kênh đi qua số cửa
kiểm khác nhau:

| Cửa kiểm | 相対取引 | せり |
|---|---|---|
| Hiệu lực người mua | `confirm-transaction.ts:72` gọi `checkParticipantEligibility()` | **không gọi** |
| Trừ tồn lô hàng | `confirm-transaction.ts:78` gọi `reserveLotQty()` | **không gọi** |

Đường ghi `seri_result` chỉ kiểm lô có tồn tại (`seri-results/route.ts:55-61`) và lô
chưa có bản ghi せり nào (`:63-66`); grep `checkParticipantEligibility`, `reserveLotQty`,
`available_qty` toàn file: 0 kết quả. **Nhưng hai cửa kiểm này không cùng loại gap.**

**Cửa hiệu lực — có giả định ghi vết, và giả định đó sai.** LAB-3 **không bỏ sót**:
*"LAB-3 không kiểm tra lại hiệu lực 許可/承認 tại bước nhập せり như đã yêu cầu cho
相対取引 (BR-PERM-01) — RFP không nêu yêu cầu tương đương cho せり, coi đây là giả định
phạm vi LAB-3."* (`technical-spec.md:118`). Lý lẽ có chỗ tựa: dòng yêu cầu của せり (`FR-SERI-01`, RFP dòng 653) truy vết tới
`D-TRADE` chứ **không** nhắc `BR-PERM-01`. **Nhưng đối chiếu lại RFP thì nó không đứng
được:** `BR-PERM-01` (RFP dòng 595) — *"Phải kiểm tra hiệu lực của 許可/承認 **tại thời
điểm giao dịch**"* — là quy tắc nghiệp vụ **không gắn kênh nào**; `FR-PARTY-02` (RFP
dòng 630, **P0**) — *"kiểm tra hiệu lực 許可 hoặc 承認 của người tham gia **tại thời
điểm chốt giao dịch**"*, truy vết `BR-PERM-01, D-PARTY` — viết trung tính về kênh;
`FR-AITAI-01`/`FR-AITAI-02` (RFP dòng 650–651) **cũng** truy vết `BR-PERM-01`, tức là
*một áp dụng cụ thể* của quy tắc chung chứ không phải nơi nó được sinh ra; và RFP §B.3
(dòng 1264) mang tiêu đề *"**Phương thức** giao dịch"* — せり và 相対取引 là hai
**phương thức** của cùng một hành vi. Giả định đã lẫn "các dòng せり không nhắc lại quy
tắc" với "quy tắc không áp dụng cho せり"; `FR-PARTY-02` là yêu cầu P0 độc lập.

**Cửa trừ tồn — gap không ghi vết.** `technical-spec.md` § 5.2 Assumptions **không
nhắc gì** về trừ tồn — không giả định nào che nó.
Và yêu cầu ở đây trung tính về kênh ngay từ chủ thể: `BR-LOT-02` (RFP dòng 596) nói
*"Số lượng khả dụng của lô hàng không được âm"* — thuộc tính **của lô**, không của kênh
bán; `FR-LOT-03` (RFP dòng 634, **P0**) đòi kiểm số lượng khả dụng *"trước khi chốt
bán"*, nghiệm thu *"Ngăn bán vượt (oversell)"*. Hệ quả thật: せり không trừ tồn nên vòng
CAS ở nhánh 相対取引 không bao giờ thấy phần đã bán qua せり — **bán vượt tồn giữa hai
kênh**; ADR-005 chứng minh chống oversell bằng số cho đúng kênh 相対取引, con số đó không
nói gì về kênh còn lại.

**`unique (lot_id)` — câu hỏi LAB-3 cố ý để ngỏ.** `seri_result` chỉ có index thường (`transaction.sql:47`), không unique; cửa chống trùng
là đọc-rồi-ghi (`seri-results/route.ts:63-66`) — TOCTOU thật. LAB-3 **biết**: § 5.2 khai
*"Mỗi lô hàng chỉ có tối đa 1 bản ghi せり đang hoạt động trong LAB-3"* (`:119`), và
§ 5.3 Unresolved Questions ghi thẳng *"Chưa chốt cơ chế tránh race condition… (unique
constraint ở DB hay optimistic lock ở tầng ứng dụng) — cần quyết định khi triển khai
schema thật"* (`:121-123`). ADR này là chỗ chốt câu hỏi đó.

## Lựa chọn

1. **Gọi `checkParticipantEligibility()` và `reserveLotQty()` trong đường ghi
   `seri_result`** — parity với `confirm-transaction.ts:72,78`, kèm lỗi phân biệt được
   (`INELIGIBLE_PARTY` có `detail`, `INSUFFICIENT_QTY`).
2. **`unique (lot_id)` trên `seri_result`** thay index thường — chốt câu hỏi § 5.3 theo
   hướng "unique constraint ở DB".
3. **Trigger `BEFORE INSERT` kiểm hiệu lực người thắng** làm tuyến cuối — bài học
   ADR-004: một ràng buộc P0 không nên chỉ có tầng ứng dụng canh. Trừ tồn không cần
   tuyến cuối mới: `CHECK (available_qty >= 0)` (`lot.sql:11`) đã sẵn ở đó, chỉ chưa có
   tác dụng với せり vì せり chưa hề trừ.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Giữ nguyên giả định phạm vi của LAB-3 (`technical-spec.md:118`) | `FR-PARTY-02` là **P0** và không giới hạn kênh; `BR-PERM-01` viết ở tầng quy tắc nghiệp vụ, không ở tầng kênh. Nếu chủ đầu tư thực sự muốn miễn cho せり thì đó phải là **một thay đổi yêu cầu có văn bản**, không phải một giả định của bên thi công |
| Chỉ sửa ở tầng app: thêm hai lời gọi vào route, không đổi schema | Sửa được đường qua route, nhưng cặp ràng buộc P0 vẫn chỉ có ứng dụng canh — `service_role` (bỏ qua RLS) hay psql vẫn ghi được bản ghi せり cho người mất hiệu lực và vẫn tạo được bản ghi trùng lô. Đúng loại lỗ ADR-004 đã bắt ở cơ chế lock |
| Dùng trigger thay cho lời gọi trong route (chỉ tầng DB) | Trigger bắn được một mã lỗi, không mang được `eligibility.reason` để SC-13 nói cho người nhập biết vì sao bị từ chối. Đúng chỗ ADR-004 Fix #2 đã trả giá: một từ chối không phân biệt được thì tầng trên không dịch nổi thành thông báo dùng được |
| Optimistic lock ở tầng ứng dụng cho cửa chống trùng (nhánh còn lại của § 5.3) | Vẫn là đọc-rồi-ghi, chỉ hẹp cửa sổ lại chứ không đóng. Và phải quyết xoá bản ghi nào khi phát hiện trùng — thêm một đường ghi bù cho vấn đề mà một `unique` giải xong |
| Gộp `seri_result` vào `transaction` để dùng lại nguyên vòng CAS sẵn có | Trái ADR-001, và đảo lại tỉ số 3-vs-1: F005/F007/F010 đang viết theo giả định せり là bảng riêng. Đổi mô hình dữ liệu để tránh viết hai lời gọi hàm là cái giá sai |
| Trigger `AFTER INSERT` tự trừ `available_qty` trong DB | Trừ tồn phải **chặn** được lần ghi làm âm tồn, nên nó là việc của `BEFORE`. Và nó làm hai kênh trừ tồn bằng hai cơ chế khác nhau — CAS ở kênh này, trigger ở kênh kia — khó soát hơn một hàm dùng chung |

## Hệ quả

**Chấp nhận được:** hai kênh bán có cùng bộ cửa kiểm, nên `FR-PARTY-02` và `FR-LOT-03`
được thực thi cho toàn bộ khối lượng chứ không phải cho 90% đi qua 相対取引.
`lot.available_qty` thành con số đúng nghĩa "còn lại bán được". Bản ghi trùng lô thành
`23505` ở tầng DB, app dịch thành 409 — cùng khuôn `business_day_lock` dùng cho
double-lock race; và câu hỏi § 5.3 của LAB-3 được chốt bằng văn bản.

**Phải chịu:**

- **Migration thêm `unique (lot_id)` trên bảng đang có dữ liệu**: phải dò và xử lý dòng
  trùng **trước**, không thì migration fail giữa đường — giữ bản ghi nào là quyết định
  nghiệp vụ. Nặng hơn: ràng buộc này đóng luôn khả năng đấu giá lại cùng một lô. § 5.2
  (`:119`) khai LAB-3 không hỗ trợ nhiều vòng, nên nếu nghiệp vụ thật có đấu lại thì
  `unique (lot_id)` **sai** và phải là `unique` trên một cặp có số vòng.
- **Trừ tồn cho せり đổi ý nghĩa của `lot.available_qty`**, nên báo cáo chạy trên dữ liệu
  cũ có thể lệch: lô đã bán qua せり trước đây vẫn mang `available_qty` chưa trừ. Phải
  quyết có backfill hay không; backfill thì các dòng đó đi qua trigger khoá ngày
  (ADR-004) nếu ngày đã lock.
- **Cửa hiệu lực làm luồng nhập せり chậm thêm một round-trip**, đúng khung giờ cao điểm
  02:30–05:00 (RFP §02-07) — cùng loại chi phí ADR-008 chịu ở đường lock.
- **Trigger `BEFORE INSERT` mới trên `seri_result`** phải được cấp quyền tường minh cho
  `service_role` như `private.is_business_day_locked()` đã phải làm, không thì nó chết ở
  chính lệnh tra và trả `42501` thay vì lỗi nghiệp vụ. Nên gộp một migration với ADR-012.
- **Đây là bác bỏ một giả định LAB-3 đã ghi vết, nên phải nói lại với khách** — không
  phải sửa một bug im lặng: bộ nộp LAB-3 có một câu khai rằng RFP không đòi cửa kiểm
  này, và câu đó phải được đính chính.
- **Chưa thi công:** kênh せり vẫn bán được cho người mất hiệu lực và vẫn không trừ tồn.

## Dẫn chứng

- `src/lib/transactions/confirm-transaction.ts:72-76,78-83` — hai cửa kiểm của 相対取引: `checkParticipantEligibility()` → `INELIGIBLE_PARTY` kèm `detail`; `reserveLotQty()` → `INSUFFICIENT_QTY`
- `src/app/api/seri-results/route.ts:55-66` — toàn bộ cửa kiểm của nhánh せり (lô tồn tại + chưa có bản ghi); `:63-66` là cửa chống trùng đọc-rồi-ghi (TOCTOU); `:68-78` insert không chạm `available_qty`
- `supabase/migrations/20260904090300_transaction.sql:47` — `create index idx_seri_result_lot`: **index thường, không unique**
- `supabase/migrations/20260904090200_lot.sql:2-4,11` — `CHECK (available_qty >= 0)` là tuyến phòng thứ hai, đang chỉ được kênh 相対取引 nuôi
- RFP dòng 595 (`BR-PERM-01`), 596 (`BR-LOT-02`) — hai quy tắc nghiệp vụ, cả hai viết không gắn kênh
- RFP dòng 630 (`FR-PARTY-02`, **P0**, truy vết `BR-PERM-01, D-PARTY`), 634 (`FR-LOT-03`, **P0**, truy vết `BR-LOT-02`, nghiệm thu "Ngăn bán vượt") — trung tính về kênh; dòng 650-651 `FR-AITAI-01/02` cũng truy vết hai quy tắc đó, tức là áp dụng cụ thể chứ không phải nguồn
- RFP dòng 653 — `FR-SERI-01` truy vết chỉ `D-TRADE`: chỗ tựa của giả định LAB-3. Dòng 1264 — §B.3 "**Phương thức** giao dịch"; dòng 363 / Phụ lục C.5 dòng 1360 — tỷ trọng 90/10
- `C:\Projects\Baitap\plans\260904-0841-lab3-sakura-market-prototype\spec\seriresultentry\technical-spec.md:118` *(ngoài repo, thư mục plan LAB-3)* — § 5.2: giả định phạm vi về cửa hiệu lực
- `…\seriresultentry\technical-spec.md:119` *(ngoài repo)* — § 5.2: "tối đa 1 bản ghi せり đang hoạt động", không hỗ trợ đấu lại; `:121-123` — § 5.3 Unresolved Questions: race condition để ngỏ, "unique constraint ở DB hay optimistic lock ở tầng ứng dụng"
- `docs/lab4/adr/ADR-005-khong-transaction-xuyen-bang-cas-va-ghi-bu.md` — số chống oversell đã kiểm chỉ thuộc kênh 相対取引
