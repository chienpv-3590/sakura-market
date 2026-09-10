# Câu hỏi cho chủ đầu tư — gom từ toàn bộ bộ thiết kế LAB-4

Bộ đặc tả 32 màn sinh ra **200 câu hỏi** rải trong mục 9 của từng `spec-be/SC-*.md`, cộng các mục
`[CHƯA CHỐT]` của `20-architecture-design.md` và § 7 của `10-database-diagram.md`.

Tài liệu này gom chúng lại. Việc gom không phải để cho gọn — nó lộ ra điều quan trọng nhất:

> **200 câu hỏi không phải 200 quyết định.** Phần lớn là **một câu hỏi lặp lại trên nhiều màn**.
> Câu *"vai nào được đọc dữ liệu này?"* xuất hiện ở **16 màn**; câu *"ngày nghiệp vụ bám vào đâu?"*
> ở **8 màn**. Trả lời **12 quyết định** ở nhóm A và B là mở khoá gần hết 200 câu.

## Cách dùng tài liệu này

- **Nhóm A — chặn thiết kế, phải trả lời trước khi break task.** Đây là chỗ **tài liệu khách tự
  chống nhau** hoặc thiếu định nghĩa mà không suy ra được. Không trả lời thì không ước lượng được,
  vì hai đáp án cho hai khối lượng khác nhau.
- **Nhóm B — chặn một màn hoặc một tính năng**, ước lượng được nhưng có rủi ro làm lại.
- **Nhóm C — con số vận hành.** Dựng được trước, cần chốt trước khi go-live.

Mỗi câu ghi: **hỏi gì · hai phía kèm số dòng RFP · chênh lệch nếu chọn khác**. Chỗ nào là **đề
xuất của bên dự thầu** chứ không phải yêu cầu khách thì nói rõ — đó là chỗ **ta phải giải trình**,
không phải chỗ khách phải chọn.

---

# Nhóm A — chặn thiết kế (7 quyết định)

## A1. Vòng đời giao dịch có chặng "Chờ xác nhận" hay không?

**Tài liệu khách tự chống nhau.**

| Phía | Nguồn |
|---|---|
| **Có** bước phê duyệt | `FIG-012` (RFP:637-644) vẽ `Nháp → (gửi) → Chờ xác nhận → (phê duyệt) → Đã chốt`, kèm đường từ chối. Dòng 644 khai các trạng thái này là **đối tượng kiểm toán** |
| **Không** có | `FR-AITAI-01` (RFP:650), `FR-AITAI-02` (RFP:651), `FR-SERI-01/02/03` (RFP:653-655) **không nhắc bước phê duyệt nào**. FR-AITAI-02 chỉ đòi từ chối **tự động theo điều kiện** |

**Chênh lệch:** có bước duyệt thì phát sinh trạng thái trung gian, quyền duyệt, **hàng đợi việc
chờ duyệt — một màn chưa có mã `SC-` nào**, SLA duyệt, và maker-checker trên luồng chiếm **~90%
giá trị giao dịch** của chợ (`FIG-009`, RFP:363). Tức là mở rộng phạm vi, không chỉ thêm một cột.

**Chạm:** SC-11, SC-12, SC-13, SC-14 · `ADR-015`

**Hỏi một lần cho cả hai kênh** — `FIG-012` là vòng đời dùng chung cho 相対取引 **và** せり.

## A2. 下見 và 目利き là hai việc hay một việc gọi hai tên?

**Tài liệu khách tự chống nhau.**

| Phía | Nguồn |
|---|---|
| **Hai việc** | Bảng thuật ngữ định nghĩa riêng: RFP:1469 目利き *"Thẩm định chất lượng bằng kinh nghiệm"* vs RFP:1470 下見 *"Xem hàng trước khi giao dịch"*. RFP:456 kể **tuần tự hai bước**. `FIG-011` (RFP:616) lấy **"Đã 下見"** làm một trạng thái |
| **Một việc** | RFP:474 viết *"Thẩm định (目利き) — 下見 bằng mắt"*. RFP:225, 326, 532 nối hai chữ bằng gạch chéo |

**Chênh lệch:** nếu là hai việc thì thiếu **cả một bảng và một màn**, không phải một giá trị trạng
thái. `FIG-011` có **5** trạng thái, prototype có 4 — thiếu đúng "Đã 下見".

**Chạm:** SC-08, SC-09, SC-10 · `20-architecture-design.md` § 4.2 · `10-database-diagram.md` D-21

## A3. Sửa một bản ghi đã chốt nhưng ngày **chưa** lock — đi đường nào?

**Tài liệu khách tự chống nhau.** Đây là khoảng trống giữa "đã chốt" và "đã lock".

| Phía | Nguồn |
|---|---|
| **Phải qua yêu cầu điều chỉnh có phê duyệt** | `FR-CORR-01` (RFP:656) lấy trigger là *"cần sửa **giao dịch đã chốt**"*, nghiệm thu *"giao dịch gốc **không bị thay đổi** trước khi được phê duyệt"* — **không nhắc lock** |
| **Sửa trực tiếp được, chỉ cần lịch sử** | `FR-CORR-03` (RFP:658) chỉ chặn bản ghi của **ngày đã lock**. `FR-SERI-03` (RFP:655) giả định có lịch sử chỉnh sửa before/after — hàm ý sửa trực tiếp là bình thường |

**Chênh lệch:** quyết định `PATCH` của SC-14 có hợp lệ hay không, và luồng sửa của SC-10/SC-12
đi đường trực tiếp hay đường phê duyệt.

**Chạm:** SC-10, SC-12, SC-14, SC-20, SC-21

## A4. Phạm vi hủy gồm những chặng nào?

**Tài liệu khách chưa đủ để suy.**

| Phía | Nguồn |
|---|---|
| Gồm cả `Nháp` | `FR-AITAI-03` (RFP:652) đặt điều kiện theo lock — *"hủy giao dịch **chưa lock**"* |
| Chỉ từ `Đã chốt` | `FIG-012` chỉ vẽ **một** cạnh vào `Hủy / Đính chính`, đi từ `Đã chốt`. Không có cạnh nào từ `Nháp` |

Thêm dấu hiệu điều khoản này viết khi chỉ nghĩ tới giao dịch đã chốt: nghiệm thu đòi *"số lượng
khả dụng được **hồi phục chính xác**"* — mà nháp **chưa bao giờ trừ tồn**, nên câu đó rỗng nghĩa
với nháp.

**Chênh lệch:** nếu nháp không hủy được thì nháp sai **nằm lại trong ngày bị lock** và làm lệch
bảng đối chiếu `FR-SETTLE-01`.

**Chạm:** SC-11, SC-12

## A5. "Quy tắc quyết toán hiện hành" là gì?

**Tài liệu khách không định nghĩa.** `BR-DEL-03` (RFP:599) đòi *"chỉ coi việc giao hàng là hoàn tất
khi số lượng đã xác nhận **khớp với quy tắc quyết toán hiện hành**"* — nhưng RFP **không định nghĩa
"quy tắc quyết toán" ở đâu cả**: không dung sai, không quy tắc làm tròn, không phiên bản.

**Chênh lệch:** BE **không dựng nổi cổng kiểm của `FE-022`** từ chữ đó. Đây là cổng kiểm chính của
việc chốt hoàn tất giao hàng.

**Chạm:** SC-15, SC-16, SC-18

## A6. Ánh xạ chủ thể nghiệp vụ của RFP sang 7 vai kỹ thuật

**Tài liệu khách dùng hai hệ khái niệm mà không nối chúng.** RFP mô tả chủ thể bằng **tên tổ
chức**, hệ thống chỉ có **7 vai kỹ thuật** trong `TBL-ROLE-01` — và nhiều chủ thể RFP gọi tên
không khớp vai nào:

| Chủ thể RFP nêu | Nguồn | Khớp vai nào? |
|---|---|---|
| "bộ phận hành chính / kiểm toán nội bộ" | `FR-AUDIT-02` | **không** |
| "Đơn vị vận hành chợ", "Hội đồng xét lại" | `FIG-004` (RFP:288-294) | **không** |
| "nhân viên vận hành chợ" | `FE-008` | **không** |

**Chênh lệch:** đây là câu **chặn ma trận phân quyền của ~16 màn**. Không có ánh xạ thì cột "ai
được phép" của mọi bảng chuyển trạng thái đều treo.

**Chạm:** gần như toàn bộ 32 màn

## A7. Vai nào được **đọc** dữ liệu cá nhân? — và đây là chỗ **ta phải giải trình**

**Không phải hai yêu cầu khách chống nhau.** Một phía là **đề xuất của bên dự thầu**, phía kia là
yêu cầu khách **bằng chữ**:

- **Đọc rộng cho mọi vai trò là đề xuất của LAB-3**, không phải yêu cầu khách. `FR-601` — mã được
  dẫn khắp prototype — **không tồn tại trong RFP** (grep toàn văn: **0 hit**). Căn cứ khách thật là
  **RFP:311** (§02-08): *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết"*.
- **RFP §09-06 dòng 886** đòi *"kiểm soát truy cập theo vai trò (RBAC) … áp dụng cho thông tin cá
  nhân"* — **bằng chữ**, không phải khuyến nghị.

Nên bản đề xuất trước (đọc rộng cả 18 bảng) **không thoả một yêu cầu khách**, và đó là **thiếu sót
của bên dự thầu phải sửa**, không phải đánh đổi để khách chọn.

**Cái duy nhất thật sự cần khách quyết là câu hẹp hơn:** vai nào được đọc `audit_log`, chứng từ
đính kèm, và bảng tài khoản — vì `FR-AUDIT-02` nêu chủ thể không có trong `TBL-ROLE-01` (xem A6).

**Chênh lệch:** siết ba mặt nhạy làm **vỡ đường review LAB-7** (`rls_core.sql:30` khai tài khoản
review cần thấy toàn hệ thống end-to-end) — phải cấp một vai review riêng hoặc chấp nhận review hẹp.

**Chạm:** SC-01, SC-03, SC-04, SC-05, SC-06, SC-07, SC-15, SC-16, SC-17, SC-18, SC-19, SC-20,
SC-25, SC-26, SC-27, SC-30, SC-31 · `ADR-014`

---

# Nhóm B — chặn một màn hoặc một tính năng (5 quyết định)

## B1. Ngày nghiệp vụ bám vào đâu?

Một câu, **8 màn**. RFP không nói ngày nghiệp vụ của một bản ghi bám vào **sự kiện nghiệp vụ** hay
**lúc nhập liệu**, và hai cách cho hai kỳ đối chiếu khác nhau:

| Màn | Câu cụ thể |
|---|---|
| SC-08 | Ngày nghiệp vụ bắt đầu 00:00 hay **02:00** theo giờ Nhật? (RFP §02-07 mở ngày lúc 02:00) |
| SC-09 | Bản ghi thẩm định bám **lô** hay bám **lúc ghi**? |
| SC-11 | Có được nhập bù cho một ngày khác không? |
| SC-13 | Bản ghi せり bám `決定時刻` hay lúc nhập? Đấu giá 6h sáng, nhập bù buổi trưa → hai kỳ |
| SC-15, SC-16 | Ngày của **giao dịch** hay của **từng lần giao**? |
| SC-17 | Ngoại lệ phát hiện muộn thuộc ngày nào? |

**Chênh lệch:** quyết định cả kỳ của `FR-SETTLE-01` và việc lock ứng xử thế nào. Cũng là câu quyết
định lỗ hổng **backdate vào ngày đã lock** có tồn tại hay không.

## B2. `BR-INC-01` cố định 110/100 — vậy phiên bản biểu suất quản lý cái gì?

| Phía | Nguồn |
|---|---|
| Hệ số **cố định** | `BR-INC-01` (RFP:598, §B.5 RFP:1276-1287) ghi rõ 110/100, làm tròn xuống JPY, không gia hạn, quá hạn = 0 |
| Biểu suất **đổi được không cần deploy** | `FR-INC-02` (RFP:679), `CAP-06` (RFP:546), `NFR-OPS-02` (RFP:815) |

`FR-INC-01` (RFP:678) còn nhắc *"tỷ lệ chi trả"* như một yếu tố riêng mà RFP **không cho giá trị**.

**Chênh lệch:** nếu 110/100 nằm trong `rate_table` thì phiên bản hoá có nghĩa; nếu không thì
`NFR-OPS-02` không đạt được bằng cơ chế phiên bản. **Chạm:** SC-22, SC-23, SC-24

## B3. "Kỳ tiếp theo" và mốc "năm" là gì?

- **"Kỳ tiếp theo"** — `BR-INC-01` (RFP:598) và `FR-INC-03` (RFP:680) đều dùng cụm này, RFP **không
  định nghĩa** "kỳ" là ngày nghiệp vụ hay kỳ tháng của `FR-RPT-02` (RFP:708).
- **"Tối đa 4 lần/năm"** của `GOV-RULE-01` (RFP:601) — năm **dương lịch** hay **năm tài chính Nhật**
  (01/4–31/3)? Rollback có tính là một lần? Bản nháp bị từ chối có tính?

**Chạm:** SC-21, SC-22, SC-23, SC-24

## B4. Tập giá trị trạng thái của bản xuất kế toán

RFP **Phụ lục D.2 (RFP:1399)** khai `Trạng thái dòng` với tập **`chờ / đã xác nhận / đã điều chỉnh`**.

Cần khách xác nhận **điều kiện sinh ra từng giá trị**, và **bên nhận xử lý batch trùng ngày theo
kiểu thay thế hay cộng dồn** — vì UNIQUE `(business_date, seq)` hiện cho phép nhiều batch một ngày.

Ngoài ra: trạng thái **bàn giao ở mức batch** là **đề xuất thiết kế cho màn quản lý**, RFP **không
đòi** trường này (RFP:767 để ngỏ phương thức kết nối/retry/nghiệm thu cho buổi làm việc về
interface). **Chạm:** SC-26, SC-27

## B5. Thuế — RFP đòi trường nhưng không cho giá trị

`IF-ACC-01` liệt **"thuế"** trong 6 trường tối thiểu (RFP:1398), nhưng RFP **không nêu thuế suất**,
**không nói đơn giá là 税込 hay 税抜**, và không nói tính theo dòng hay theo người/ngày.

**Chạm:** SC-26, SC-27

---

# Nhóm C — con số vận hành (cần trước go-live, không chặn ước lượng)

RFP không định lượng những chỗ này. Danh sách gọn; chi tiết ở mục 9 của từng spec.

| Nhóm | Chưa có | Màn |
|---|---|---|
| Bảo mật | Vai nào thuộc diện **bắt buộc MFA** (`FE-002` nói "role có quyền phê duyệt", RFP không định nghĩa vai nào) · ngưỡng khoá tạm và cách đếm · thời lượng timeout phiên (`NFR-SEC-03` không định lượng) | SC-01, SC-02 |
| Cảnh báo hiệu lực | Ngưỡng cảnh báo mấy ngày, **một giá trị dùng chung hay một giá trị mỗi căn cứ tham gia** (`FR-PARTY-03` chỉ nói "cấu hình được") | SC-07 |
| Thông báo | Tập loại event đóng hay mở · ngưỡng gửi (`FR-NOTIFY-03` không cho số nào) | SC-28, SC-29 |
| Tranh chấp | Tập trạng thái · **ngưỡng SLA** (`FR-SETTLE-03` đòi "ngày dự kiến xử lý" nhưng không nêu ngưỡng, mà `RPT-09` lại đòi báo cáo SLA) | SC-19, SC-26 |
| Tệp đính kèm | Trần dung lượng · danh sách loại tệp · số tệp mỗi bản ghi · **bằng chứng điều chỉnh thuộc dòng lưu trữ nào** trong hai dòng của `TBL-ATTACH-01` (RFP:771-774: 7 năm vs 3 năm) | SC-08, SC-17, SC-19, SC-20, SC-31 |
| Giao nhận | **Trần số lần chia giao hàng** (RFP:691 tự khai để ngỏ) · ngưỡng "giao hàng ùn tắc" của `RPT-04` | SC-15, SC-16 |
| Phân trang | `pageSize` mặc định · trần số dòng của bản xuất CSV | SC-15, SC-25 |
| Mã nghiệp vụ | Công thức **mã lô hàng** của chợ · định dạng **batch code** | SC-08, SC-27 |
| Vận hành suy giảm | **`NFR-AVL-02` không liệt kê và không nói con số ba tác vụ** — con số 3 chỉ có trong Feature List. Chỗ duy nhất RFP gọi tên ba luồng hiện trường là `NFR-USE-01` | SC-32 |

---

# Hai vấn đề **không phải câu hỏi cho khách** — là lỗi trong bộ đề xuất của ta

Ghi ở đây để không lẫn vào danh sách trên.

**Ưu tiên đảo ngược trong Feature List.** `FE-025` (bảng đối chiếu ngày) là **P0** và
`FR-SETTLE-01` đòi nó gom *"ngoại lệ đủ điều kiện"* — nhưng nguồn ngoại lệ duy nhất `FE-023` là
**P1**. Một P0 phụ thuộc một P1, nên hạng mục P0 đó **vĩnh viễn không hoàn chỉnh** cho tới khi P1
xong. Cùng dạng: `FE-027` là P1 nhưng `RPT-09` nằm trong nhóm báo cáo P0. Đây là việc **sửa lại ưu
tiên trong gói đề xuất**, không phải việc hỏi khách.

**`FR-601` là mã nội bộ trình bày như mã khách.** Xem A7. Đã sửa trong bộ LAB-4; nhưng nếu gói
LAB-1 đã gửi khách có dẫn nó thì cần đính chính.

---

# Nơi đọc chi tiết

| Cần gì | Đọc ở đâu |
|---|---|
| Toàn văn từng câu, kèm "vì sao cần trước khi code" và "chọn sai thì sao" | `spec-be/SC-XX-*.md` **mục 9** |
| Chỗ prototype làm khác thiết kế | `spec-be/SC-XX-*.md` **mục 10** · `10-database-diagram.md` **§ 4** (21 hàng) |
| Quyết định kiến trúc đã ra và đang đề xuất | `adr/README.md` (15 ADR) |
| Bốn quyết định chặn ước lượng, dạng bảng | `20-architecture-design.md` § 10 |
