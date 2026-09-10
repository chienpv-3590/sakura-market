# Roster 32 màn và ma trận gap — LAB-4

Tài liệu nền của bộ nộp LAB-4. Mọi tài liệu khác trong `docs/lab4/` index theo mã `SC-` ở đây.

**Nguồn:** Screen List LAB-1 — `C:\Projects\Baitap\docs\sakura-market-proposal\01_For External\01_Estimation\01_Effort Estimation\[000] SakuraMarket - Screen List_VI.xlsx`
(**ngoài repo `sakura-market`**, nằm ở thư mục cha `Baitap`; cùng thư mục đó có Function List,
Feature List và User Stories — cả bốn đều là `.xlsx`, không có bản markdown trong repo),
bảng khai LAB-3 (`docs/pham-vi-va-phan-mock.md` § 1–2), roster đọc từ code
(`docs/generated/screen-list.md`), route thật (`src/app/**/page.tsx`).

**Quy tắc giải xung đột:** code thật > bảng khai LAB-3 > Screen List LAB-1. Chỗ nào ba nguồn
lệch thì ghi cả ba, không chọn im lặng.

## 1. Roster 32 màn

| SC- | Tên màn | Loại | Actor chính | FE- | SCR thi công | Route | Trạng thái |
|---|---|---|---|---|---|---|---|
| SC-01 | Đăng nhập | Form | Toàn bộ người dùng nội bộ | FE-001 | SCR001_Login | `/login` | Đã dựng |
| SC-02 | Xác thực MFA và thiết lập bảo mật | Form | Quản trị hệ thống, role phê duyệt | FE-002, FE-004 | — | — | Chưa dựng |
| SC-03 | Danh sách tài khoản | List | Quản trị hệ thống | FE-003 | — | — | Chưa dựng |
| SC-04 | Chi tiết tài khoản và lịch sử quyền | Detail | Quản trị hệ thống | FE-003 | — | — | Chưa dựng |
| SC-05 | Danh sách người tham gia | List | Nhân viên vận hành chợ | FE-005 | SCR003_ParticipantList | `/participants` | Đã dựng |
| SC-06 | Chi tiết và vòng đời hiệu lực người tham gia | Detail | Nhân viên vận hành chợ | FE-005, FE-006 | SCR005_ParticipantDetail (composite) | `/participants/[id]` | Đã dựng |
| SC-07 | Cảnh báo hiệu lực sắp hết hạn | List | Nhân viên vận hành chợ | FE-008 | — | — | Chưa dựng |
| SC-08 | Tiếp nhận lô hàng | Form | Nhân viên tiếp nhận | FE-009, FE-013 | SCR007_LotIntake | `/lots/new` | Đã dựng |
| SC-09 | Ghi nhận kết quả 目利き | Form | Người đánh giá | FE-010 | SCR008_MekikiEntry | `/lots/[id]/mekiki` | Đã dựng |
| SC-10 | Chi tiết lô hàng và điều chỉnh | Detail | Nhân viên tiếp nhận, bộ phận đối chiếu | FE-011, FE-012, FE-013 | SCR009_LotDetail (composite) | `/lots/[id]` | Đã dựng |
| SC-11 | Tạo giao dịch 相対取引 | Form | Vận hành giao dịch | FE-014, FE-015, FE-007 | SCR010_AitaiCreate | `/transactions/new` | Đã dựng |
| SC-12 | Danh sách và chi tiết giao dịch | List/Detail | Vận hành giao dịch | FE-016, FE-017 | SCR011_TransactionsList + SCR012_TransactionDetail | `/transactions`, `/transactions/[id]` | Đã dựng |
| SC-13 | Nhập kết quả せり | Form | Người điều hành đấu giá | FE-018 | SCR013_SeriEntry | `/seri/new` | Đã dựng |
| SC-14 | Tra cứu bản ghi せり | List/Detail | Bộ phận đối chiếu | FE-019 | SCR014_SeriList + SCR015_SeriDetail | `/seri`, `/seri/[id]` | Đã dựng |
| SC-15 | Danh sách giao hàng | List | Bộ phận vận chuyển | FE-020 | SCR016_DeliveryList | `/deliveries` | Đã dựng |
| SC-16 | Chi tiết giao hàng và các lần giao | Detail | Bộ phận vận chuyển | FE-020, FE-021, FE-022, FE-024 | SCR017_DeliveryDetail (composite) | `/deliveries/[id]` | Đã dựng |
| SC-17 | Ghi nhận ngoại lệ giao hàng | Form | Bộ phận vận chuyển | FE-023 | — | — | Chưa dựng |
| SC-18 | Bảng đối chiếu ngày và lock kỳ | Detail | Bộ phận đối chiếu | FE-024, FE-025, FE-026 | SCR018_ReconcileAndLock | `/reconciliation` | Đã dựng |
| SC-19 | Quản lý tranh chấp | List/Detail | Bộ phận đối chiếu | FE-027 | — | — | Chưa dựng |
| SC-20 | Tạo yêu cầu điều chỉnh | Form | Vận hành giao dịch | FE-028 | SCR019_CorrectionRequest | `/corrections/new` | Đã dựng |
| SC-21 | Phê duyệt yêu cầu điều chỉnh | Detail | Bộ phận đối chiếu (người phê duyệt) | FE-029 | SCR020_CorrectionApproval | `/corrections` | Đã dựng |
| SC-22 | Kết quả tính 完納奨励金 | List/Detail | Bộ phận đối chiếu | FE-030, FE-032, FE-043 | SCR021_IncentiveResult | `/incentive` | Đã dựng |
| SC-23 | Danh sách phiên bản biểu suất | List | Quản trị rule | FE-031 | SCR022_RuleVersionList | `/incentive/rules` | Đã dựng |
| SC-24 | Tạo và phê duyệt phiên bản biểu suất | Form | Quản trị rule (maker và checker) | FE-031 | SCR023_RuleVersionNew + SCR024_RuleVersionDetail | `/incentive/rules/new`, `/incentive/rules/[id]` | Đã dựng |
| SC-25 | Danh mục báo cáo | List | Người dùng có quyền | FE-033, FE-034 | SCR025_ReportCatalog | `/reports` | Đã dựng |
| SC-26 | Xem và xuất báo cáo | Detail | Người dùng có quyền | FE-034, FE-035, FE-036 | SCR026_ReportViewer (composite) | `/reports/[reportCode]` | Đã dựng |
| SC-27 | Quản lý batch xuất dữ liệu kế toán | List | Bộ phận đối chiếu | FE-037 | — (chức năng chạy trong SCR026 / RPT-06) | — | Chưa dựng màn riêng — xem § 3.1 |
| SC-28 | Hộp thông báo trong ứng dụng | List | Toàn bộ người dùng nội bộ | FE-038, FE-039 | — | — | Chưa dựng |
| SC-29 | Cấu hình thông báo | Form | Quản trị vận hành | FE-040 | — | — | Chưa dựng |
| SC-30 | Tra cứu audit log | List | Kiểm toán nội bộ, bộ phận hành chính | FE-042 | — (bảng `audit_log` đã có) | — | Chưa dựng |
| SC-31 | Quản lý file đính kèm | List/Detail | Bộ phận đối chiếu | FE-044 | — (bảng `lot_attachment` đã có) | — | Chưa dựng |
| SC-32 | Trạng thái vận hành suy giảm | Component | Người dùng tại hiện trường | FE-045 | — | — | Chưa dựng |

**Đếm:** 20 màn đã dựng · 12 màn chưa dựng · tổng 32. Mã `SC-01..SC-32` đủ, không trùng, không thiếu.

## 2. Ba màn phát sinh khi thi công — không có mã `SC-`

Code có 26 SCR nhưng chỉ 23 SCR ứng được với `SC-`. Ba màn dưới đây là người dùng thấy thật,
route thật, nhưng LAB-1 không thiết kế. Khai ra để LAB-5 không bỏ sót khi break task bảo trì.

| SCR | Tên | Route | Vì sao phát sinh |
|---|---|---|---|
| SCR002_Home | Home (pipeline dashboard) | `/` | Điều hướng theo vai trò qua `roleLanding(user.role)`. LAB-1 giả định vào thẳng màn nghiệp vụ. rebuild-spec gán cho nó feature mới `F012_PipelineDashboard`. |
| SCR004_ParticipantNew | Tạo người tham gia | `/participants/new` | LAB-1 chỉ có SC-05 (danh sách) và SC-06 (chi tiết); form tạo không được tách thành màn riêng trong thiết kế. |
| SCR006_LotsList | Danh sách lô hàng | `/lots` | LAB-1 có SC-08 (form tiếp nhận) và SC-10 (chi tiết) nhưng **không có màn danh sách lô hàng**. Thi công buộc phải thêm để vào được chi tiết. |

## 3. Bất thường phải khai

### 3.1 SC-27 bị khai hai chỗ mâu thuẫn

`docs/pham-vi-va-phan-mock.md:55` liệt SC-27 trong bảng "12 màn ngoài phạm vi" nhưng cùng dòng
ghi "**Đã dựng** — dùng chung màn báo cáo (RPT-06)".

**Cách khai của LAB-4:** thiết kế LAB-1 có màn riêng · thi công LAB-3 không có màn riêng, chức
năng xuất chạy trong SCR026 (`/reports/[reportCode]`, mã báo cáo RPT-06) · bảng
`accounting_export_batch` tồn tại thật, kiểm sống **2026-09-08 có 0 batch, 2026-09-09 có 2 batch**
(xem `10-database-diagram.md` § 6). **Chưa xác định nguyên nhân hai batch xuất hiện** — có thể do
quá trình kiểm chứng gọi đường xuất, có thể do thao tác khác. Ai cần con số này cho mục đích
nghiệp vụ thì phải truy `exported_by`/`created_at` của hai dòng đó, đừng suy từ đây.

**Hệ quả cho LAB-5:** phần "theo dõi batch code và trạng thái gửi" là task riêng, không gộp vào
task báo cáo. Phần "xuất được dữ liệu kế toán" thì đã xong, đừng ước lượng lại.

### 3.2 Sáu SCR composite mà LAB-1 gộp thành một màn

`SC-12`, `SC-14`, `SC-24` mỗi mã ứng hai SCR (danh sách + chi tiết, hoặc tạo + phê duyệt).
`SC-06`, `SC-10`, `SC-16`, `SC-26` là composite trong chính một SCR. Screen spec của các màn này
phải tách mục theo từng SCR con, không gộp thành một bảng field.

### 3.3 Ba hệ mã tồn tại song song

| Hệ mã | Số lượng | Nguồn | Vai trò |
|---|---|---|---|
| `SC-01..SC-32` | 32 | Screen List LAB-1 | **Khoá chính của LAB-4** — bản thiết kế |
| `SCR001..SCR020` | 20 | `pham-vi-va-phan-mock.md` § 1 | Bảng khai LAB-3, đánh số cũ |
| `SCR001..SCR026` | 26 | `docs/generated/screen-list.md` | rebuild-spec đọc từ code — bản thi công |

Hai hệ `SCR` đánh số **khác nhau cho cùng một màn** (ví dụ `SCR007` cũ là LotIntake, `SCR007`
mới cũng là LotIntake nhưng `SCR008` cũ là TransactionList còn `SCR008` mới là MekikiEntry).
Cột "SCR thi công" của roster § 1 dùng **hệ 26 mã mới**, vì đó là hệ đọc từ code.

## 4. Ma trận gap — LAB-4 cần gì, LAB-3 có gì

| Sản phẩm nộp LAB-4 | Tài sản LAB-3 dùng lại được | Mức dùng lại | Phải làm mới |
|---|---|---|---|
| **Wireframe chi tiết 32 màn** | `DesignSystem/RoleDashboard.standalone.html` (cách đóng gói); app đã deploy (tham chiếu thị giác) | Thấp — chỉ là tiền lệ kỹ thuật | Toàn bộ 32 wireframe. `docs/design-guidelines.md` phần hex/class đã stale, không dùng |
| **Architecture design** | `docs/system/architecture.md` (218 dòng, 2 mermaid: system + data flow), `api-map.md`, `behavior-logic.md` | Cao cho phần cấu trúc | 4 mục điểm phân nhánh logic · điểm thực thi ràng buộc 3 tầng · điểm tích hợp IF-ACC-01 · ràng buộc khung giờ 02:00–10:00 |
| **Screen spec 32 màn** | `screen-list.md` (component + data displayed), `permissions-matrix.md` (1634 dòng), `behavior-logic.md`, `user-stories.md` | Trung bình — có phân quyền và quy tắc, **không có bảng field/validation nào** | Bảng field · validation client/server · bảng trạng thái · cho cả 32 màn. Đây là phần nặng nhất |
| **ADR** | `pham-vi-va-phan-mock.md` § 4 (QĐ-1..QĐ-6, dạng văn xuôi), § dòng 138–147 (miễn trừ test) | Cao — nội dung đã có, sai định dạng | Chuyển sang 4 phần · bổ sung dẫn chứng file:dòng · 3 ADR mới của LAB-4 |
| **Database diagram** | `docs/generated/entities.md` (785 dòng, đã có `erDiagram`, đã đối chiếu bảng thật) | Rất cao | Bảng đối chiếu thiết kế ↔ thi công · bảng 3 tầng ràng buộc · mục bảng cần thêm cho 12 màn chưa dựng |
| **Số giờ thật** | `docs/time-log.md` (định dạng LAB-3) | Cao — theo đúng định dạng | Số liệu của LAB-4 |

## 5. Phân loại 12 màn chưa dựng theo mức khó

Quyết định thứ tự làm ở phase-05 và mức chắc của spec.

| Mức | Màn | Đặc điểm | Hệ quả cho spec |
|---|---|---|---|
| **1 — có bảng, thiếu màn** | SC-27, SC-30, SC-31 | `accounting_export_batch`, `audit_log`, `lot_attachment` đã tồn tại | Spec bám cột thật, chắc nhất. Ứng viên làm trước ở LAB-5 |
| **2 — có nghiệp vụ, thiếu cả bảng lẫn màn** | SC-07, SC-17, SC-19 | `FR-PARTY-03`, `FR-DEL-03`, `FR-SETTLE-03` | Spec phải đề xuất bảng/cột, ghi ngược vào `10-database-diagram.md` |
| **3 — cần hạ tầng ngoài phạm vi** | SC-02, SC-03, SC-04, SC-28, SC-29, SC-32 | MFA · quản lý tài khoản · email/queue · offline queue | Spec đầy đủ nhưng phải khai điều kiện hạ tầng, kẻo LAB-5 ước lượng thiếu |

**Lưu ý về lý do hoãn SC-02/03/04:** `pham-vi-va-phan-mock.md` § 2b đã sửa lý do từ "không cần
vì demo cố định" sang lý do thật — bật MFA làm 9 tài khoản demo dùng chung mật khẩu không trình
bày được. Spec LAB-4 chép lý do đã sửa, không quay về lý do cũ.

## 6. Nơi tiêu thụ roster này

| Tài liệu | Dùng cột nào |
|---|---|
| `10-database-diagram.md` | § 5 mức 1/2/3 → mục "bảng cần thêm" |
| `20-architecture-design.md` | § 1 cột FE- để định vị màn; ID yêu cầu RFP thì dẫn `FR-`/`NFR-` (xem cảnh báo § 7) |
| `spec/SC-*.md` | § 1 toàn bộ · § 3.2 để biết màn nào phải tách mục composite |
| `wireframes/index.html` | § 1 cột Trạng thái → dấu hiệu thị giác "CHƯA THI CÔNG" |
| `adr/` | § 3 các bất thường → ứng viên ADR |

## 7. Hai cảnh báo về nguồn — đọc trước khi dựa vào tài liệu nào

### 7.1 `FE-0XX` KHÔNG phải mã yêu cầu RFP

Grep `FE-[0-9]` trên toàn văn RFP: **0 kết quả**. `FE-` là hệ mã của Screen List LAB-1, dùng để
định vị màn giữa các tài liệu LAB-1 với nhau. Mã yêu cầu thật của RFP là `FR-*` (54 lần xuất
hiện), `NFR-*`, `BR-*`, `IF-*`, `GOV-*`, `TBL-*`, `DR-*`.

Nên: dùng `FE-` để tra chéo trong bộ LAB-1, dùng `FR-`/`NFR-` khi cần dẫn yêu cầu khách. Đừng
trình bày `FE-` với khách như thể đó là mã của họ.

### 7.2 Tầng `docs/generated/*` có ít nhất một dẫn chứng bịa

`docs/generated/permissions-matrix.md:1038` dẫn `src/app/(app)/reports/page.tsx:877`. File đó có
**63 dòng**.

Không có nghĩa phải bỏ tầng generated — phần lớn nội dung đã được đối chiếu lại với code trong
quá trình làm LAB-4 và khớp. Nhưng **số dòng trong tầng generated phải kiểm lại trước khi dựa
vào**, và mọi dẫn chứng `file:dòng` trong bộ LAB-4 đều được kiểm trực tiếp từ code chứ không chép
lại từ tầng generated.

Một điểm liên quan: `docs/generated/behavior-logic.md` (185 dòng) **không chứa quy tắc nghiệp vụ
nào** — nội dung của nó nói về thực thi nền/scheduled và event-listener phía client, rồi kết luận
hệ thống không có gì chạy nền. Ma trận gap § 4 vì thế **không** liệt nó là nguồn quy tắc nghiệp
vụ cho screen spec; nguồn đúng là code + `permissions-matrix.md` + functional-spec/technical-spec
của LAB-3.
