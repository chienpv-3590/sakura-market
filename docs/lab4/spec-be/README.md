# Spec BE 32 màn — template và index

Đặc tả tầng backend cho từng màn, **dựng được mà không cần hỏi lại tác giả**. Cặp với CSV 22 cột
(đặc tả UI/FE) ở `.momorph/specs/`.

## Ba tầng tài liệu — đọc đúng vai từng cái

| Tài liệu | Vai | Nguồn chân lý |
|---|---|---|
| `.momorph/specs/{màn}.csv` | Đặc tả **UI/FE** theo component, 22 cột | Function List + Feature List + RFP |
| `docs/lab4/spec-be/SC-XX-*.md` | Đặc tả **BE**: API, dữ liệu, trạng thái, quy tắc, phân quyền | Function List + Feature List + RFP |
| `docs/lab4/spec/SC-XX-*.md` | **Bản as-built** — prototype LAB-3 hiện làm gì | Code thật, dẫn `file:dòng` |

Hai cái đầu là **thiết kế phải dựng**. Cái thứ ba là **hiện trạng để đối chiếu**. Đừng đọc bản
as-built như thể nó là spec — prototype dựng trong ~18h và có những chỗ cố ý đơn giản hoá cùng
những chỗ thiếu ngoài chủ đích, cả hai đã được khai ở `10-database-diagram.md` § 4.

## Nguồn chân lý — thứ tự ưu tiên

1. **RFP** (`C:\Projects\Baitap\RFP_...VI_v1.0.md`, ngoài repo) — tài liệu khách. Bảng yêu cầu
   `FR-*`/`NFR-*`/`BR-*`/`GOV-*`/`IF-*`/`TBL-*`/`DR-*` và sơ đồ `FIG-*`.
2. **Function List / Feature List** (LAB-1) — `FN-xx` → `FE-0xx` → `SC-xx`, mỗi `FE` mang danh
   sách yêu cầu RFP và quy tắc nghiệp vụ cụ thể.
3. **Prototype** — chỉ để đối chiếu và để cảnh báo chỗ đã lệch. **Không** phải nguồn của thiết kế.

Bản trích sẵn (nhanh hơn, nhưng dẫn chứng thì dẫn RFP gốc kèm số dòng):
`plans/260909-1355-lab4-thiet-ke-chi-tiet/nguon-yeu-cau-khach-hang.md`,
`nguon-function-list-va-feature-list.md`, `chi-muc-sc-fe-yeu-cau.md`.

## Template

```markdown
# SC-XX — <tên màn> · Spec BE

| | |
|---|---|
| FE liên quan | FE-0XX (tên tính năng), FE-0YY |
| FN | FN-XX (nhóm chức năng) |
| Ưu tiên | P0 / P1 |
| Yêu cầu khách | FR-*, NFR-*, BR-*, GOV-*, TBL-* |
| Miền dữ liệu | D-PARTY / D-LOT / D-TRADE / D-DELIVERY / D-SETTLE / D-INCENTIVE |
| State machine | FIG-0XX (nếu có) |
| Đã thi công | Có / Không / Một phần |

## 1. Phạm vi backend của màn này

Một đoạn: màn này cần BE làm gì, và **không** làm gì (dẫn `SCOPE-OUT-*` nếu có).

## 2. Hợp đồng API

Một mục cấp 3 cho mỗi endpoint.

### `<METHOD> /api/<path>`

| | |
|---|---|
| Thoả yêu cầu | FE-0XX · FR-* |
| Xác thực | bắt buộc / không |
| Vai trò được gọi | ... |
| Idempotent | có / không — nếu không thì nói cách chống gửi trùng |

**Request** — bảng: tham số · vị trí (path/query/body) · kiểu · bắt buộc · ràng buộc · nguồn yêu cầu.
Nêu rõ trường nào **server tự quyết, không nhận từ client**.

**Response 2xx** — bảng: trường · kiểu · ý nghĩa.

**Mã lỗi** — bảng: mã HTTP · mã nghiệp vụ · điều kiện phát sinh · yêu cầu RFP tương ứng.
Mỗi mã phải truy được về một điều kiện cụ thể, không viết "lỗi chung".

**Tác dụng phụ** — bảng ghi/xoá bảng nào, ghi audit gì, có phát thông báo không.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|

**Tầng thực thi** dùng đúng ba tầng của `10-database-diagram.md` § 3:
tầng 1 Postgres constraint · tầng 2 trigger · tầng 3 tầng ứng dụng.
Ràng buộc P0 nên nằm tầng 1 hoặc 2 — nêu rõ nếu thiết kế đòi mà chỗ hiện tại là tầng 3.

## 4. Vòng đời trạng thái

Sơ đồ theo `FIG-*` của RFP, rồi bảng chuyển trạng thái:

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|

Guard là chỗ dễ mất nhất. Ví dụ FIG-010 chỉ có **một** cạnh `Tạm ngừng → Có hiệu lực`, nhưng
FIG-004 đòi **thủ tục khác nhau theo loại người tham gia** trên cạnh đó — đó là guard, không phải
thêm cạnh.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|

Dẫn `BR-*` nguyên văn, đừng diễn giải lại. Con số nghiệp vụ (hệ số, ngưỡng, hạn) phải dẫn được
nguồn hoặc nằm ở mục 9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Thao tác 1 | Thao tác 2 | ... |
|---|---|---|---|

Bảy vai trò: ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT ·
ROLE-RULE-ADMIN · ROLE-SYS-ADMIN. Ô ghi: cho phép / từ chối kèm **mã lỗi**.

Ba điểm bắt buộc khai đúng:

- **⚠️ `FR-601` KHÔNG phải mã yêu cầu của khách.** Grep RFP: **0 hit**. Đó là mã nội bộ của LAB-3,
  và vì nó mang tiền tố `FR-` giống mã thật (`FR-IAM-01`, `FR-PARTY-02`…) nên rất dễ bị đọc thành
  yêu cầu khách. **Đừng dẫn `FR-601` ở mục 1–9.**
  Căn cứ thật về phân quyền đọc là RFP:311 (§02-08): *"Đơn vị dự thầu phải **đề xuất** cơ chế phân
  tách quyền và truy vết tương ứng với các vai trò nêu trên."* — RFP **giao cho bên dự thầu đề
  xuất**, không hề bắt đọc mở. Nên "mọi vai trò đọc được mọi bảng" là **quyết định thiết kế của
  LAB-3**, không phải yêu cầu khách; ở mục 1–9 phải khai nó là **đề xuất**, và mọi căng thẳng với
  RFP §09-06 (APPI, RFP:886) đi vào **mục 9**. `FR-601` chỉ được xuất hiện ở mục 10 và 11, với
  nhãn rõ là mã nội bộ LAB-3.
- **Đọc và ghi là hai trục khác nhau** — nêu rõ trục nào chặn theo vai trò, trục nào không, và
  dẫn căn cứ cho từng trục.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên.
- Chỗ nào cần **maker-checker** (`GOV-RULE-01`) thì nói rõ điều kiện "người duyệt khác người tạo"
  là một ràng buộc riêng, không suy ra được từ vai trò.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|

`FR-AUDIT-01` đòi audit cho tạo · sửa · phê duyệt · lock · đổi quyền, kèm chủ thể, timestamp,
before/after, lý do.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|

Chỉ liệt `NFR-*` **thật sự** áp cho màn này, kèm hệ quả cụ thể. Đừng chép cả danh sách NFR.

## 9. Câu hỏi cho chủ đầu tư

Gạch đầu dòng. Mỗi câu: hỏi gì · vì sao cần trước khi code · ảnh hưởng nếu chọn sai.

Mọi chỗ tài liệu khách **tự chống nhau** phải nằm ở đây, khai cả hai phía kèm số dòng RFP —
không chọn hộ khách.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|

Chỉ liệt chỗ **khác**, không liệt chỗ khớp. Mức: khác có chủ đích / khác không chủ đích /
cần khách chốt. Dẫn `file:dòng` cho phía prototype và số dòng RFP cho phía thiết kế.
Nếu không lệch gì thì ghi "không lệch" — đừng bỏ trống mục.

## 11. Dẫn chứng

- RFP:dòng — ...
- Feature List `FE-0XX` — ...
- `file:dòng` (chỉ cho phần đối chiếu prototype)
```

## Quy tắc cứng

1. **Mỗi file dưới 250 dòng.** BE spec dài hơn UI spec nhưng dài quá thì tách theo endpoint.
2. **Mọi con số nghiệp vụ phải dẫn nguồn** hoặc nằm ở mục 9. Không bịa ngưỡng cho spec trông đầy đủ.
3. **Mỗi mã lỗi truy được về một điều kiện.** Không có "lỗi chung".
4. **Tài liệu khách chống nhau → mục 9**, khai cả hai phía. Không chọn hộ.
5. **Prototype chỉ xuất hiện ở mục 10 và 11.** Mục 1–9 là thiết kế; đừng để hành vi prototype rò
   vào phần thiết kế.
6. **Không chép email, mật khẩu, ref project Supabase.** Repo là public.

## Index 32 màn

| SC- | Tên | FE liên quan | Ưu tiên | Đã thi công | Spec BE | Dòng |
|---|---|---|---|---|---|---|
| SC-01 | Đăng nhập | FE-001 (Đăng nhập và gán vai trò) | P0 | Có | [SC-01-dang-nhap.md](./SC-01-dang-nhap.md) | 248 |
| SC-02 | Xác thực MFA và thiết lập bảo mật | FE-002 (MFA cho tài khoản quản trị và role phê duyệt), FE-004 (Kiểm soát phiên đăng nhập) | P0 | Không | [SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.md](./SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.md) | 249 |
| SC-03 | Danh sách tài khoản | FE-003 (Quản lý tài khoản và quyền) — nửa "cấp · tạm ngừng · mở lại" | P0 | Không | [SC-03-danh-sach-tai-khoan.md](./SC-03-danh-sach-tai-khoan.md) | 250 |
| SC-04 | Chi tiết tài khoản và lịch sử quyền | FE-003 (Quản lý tài khoản và quyền) — nửa "ghi nhận lịch sử thay đổi" | P0 | Không | [SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.md](./SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.md) | 250 |
| SC-05 | Danh sách người tham gia | FE-005 (Quản lý profile người tham gia) | P0 | Có | [SC-05-danh-sach-nguoi-tham-gia.md](./SC-05-danh-sach-nguoi-tham-gia.md) | 250 |
| SC-06 | Chi tiết và vòng đời hiệu lực người tham gia | FE-005 (Quản lý profile người tham gia), FE-006 (Vòng đời hiệu lực tham gia) | P0 | Một phần | [SC-06-chi-tiet-va-vong-doi-hieu-luc.md](./SC-06-chi-tiet-va-vong-doi-hieu-luc.md) | 250 |
| SC-07 | Cảnh báo hiệu lực sắp hết hạn | FE-008 (Cảnh báo profile sắp hết hiệu lực) | P1 | Không | [SC-07-canh-bao-hieu-luc-sap-het-han.md](./SC-07-canh-bao-hieu-luc-sap-het-han.md) | 249 |
| SC-08 | Tiếp nhận lô hàng | FE-009 (Tiếp nhận lô hàng), FE-013 (Tra cứu lô hàng và trạng thái) | P0 | Có | [SC-08-tiep-nhan-lo-hang.md](./SC-08-tiep-nhan-lo-hang.md) | 244 |
| SC-09 | Ghi nhận kết quả 目利き | FE-010 (Ghi nhận kết quả 目利き) | P0 | Có | [SC-09-ghi-nhan-ket-qua-mekiki.md](./SC-09-ghi-nhan-ket-qua-mekiki.md) | 228 |
| SC-10 | Chi tiết lô hàng và điều chỉnh | FE-011 (Kiểm soát số lượng khả dụng), FE-012 (Điều chỉnh thuộc tính lô hàng), FE-013 (Tra cứu lô hàng và trạng thái) | P0 · P1 | Một phần | [SC-10-chi-tiet-lo-hang-va-dieu-chinh.md](./SC-10-chi-tiet-lo-hang-va-dieu-chinh.md) | 250 |
| SC-11 | Tạo giao dịch 相対取引 | FE-014 (Tạo giao dịch 相対取引), FE-015 (Từ chối chốt giao dịch không hợp lệ), FE-007 (Chặn giao dịch khi hiệu lực đã hết) | P0 | Một phần | [SC-11-tao-giao-dich-aitai.md](./SC-11-tao-giao-dich-aitai.md) | 248 |
| SC-12 | Danh sách và chi tiết giao dịch | FE-017 (Tra cứu và theo dõi giao dịch, P0), FE-016 (Hủy giao dịch chưa lock, P1), FE-014 (Tạo giao dịch 相対取引, P0) | P0 · P1 | Một phần | [SC-12-danh-sach-va-chi-tiet-giao-dich.md](./SC-12-danh-sach-va-chi-tiet-giao-dich.md) | 250 |
| SC-13 | Nhập kết quả せり | FE-018 (Nhập kết quả せり) | P0 | Một phần | [SC-13-nhap-ket-qua-seri.md](./SC-13-nhap-ket-qua-seri.md) | 246 |
| SC-14 | Tra cứu bản ghi せり | FE-019 (Tra cứu bản ghi せり và lịch sử sửa) | P1 | Một phần | [SC-14-tra-cuu-ban-ghi-seri.md](./SC-14-tra-cuu-ban-ghi-seri.md) | 249 |
| SC-15 | Danh sách giao hàng | FE-020 (Theo dõi trạng thái giao hàng) | P0 | Một phần | [SC-15-danh-sach-giao-hang.md](./SC-15-danh-sach-giao-hang.md) | 225 |
| SC-16 | Chi tiết giao hàng và các lần giao | FE-020 (Theo dõi trạng thái), FE-021 (Giao hàng nhiều lần), FE-022 (Chốt hoàn tất), FE-024 (Liên kết giao hàng ↔ quyết toán) | P0 (FE-020, FE-022) · P1 (FE-021, FE-024) | Một phần | [SC-16-chi-tiet-giao-hang-va-cac-lan-giao.md](./SC-16-chi-tiet-giao-hang-va-cac-lan-giao.md) | 249 |
| SC-17 | Ghi nhận ngoại lệ giao hàng | FE-023 (Ghi nhận ngoại lệ giao hàng) | P1 | Không | [SC-17-ghi-nhan-ngoai-le-giao-hang.md](./SC-17-ghi-nhan-ngoai-le-giao-hang.md) | 250 |
| SC-18 | Bảng đối chiếu ngày và lock kỳ | FE-025 (Bảng đối chiếu ngày), FE-026 (Lock ngày nghiệp vụ), FE-024 (Liên kết giao hàng ↔ quyết toán) | P0 (FE-025, FE-026) · P1 (FE-024) | Một phần | [SC-18-bang-doi-chieu-ngay-va-lock-ky.md](./SC-18-bang-doi-chieu-ngay-va-lock-ky.md) | 248 |
| SC-19 | Quản lý tranh chấp | FE-027 (Quản lý tranh chấp) | P1 | **Không** — chưa có bảng, chưa có endpoint, chưa có màn | [SC-19-quan-ly-tranh-chap.md](./SC-19-quan-ly-tranh-chap.md) | 249 |
| SC-20 | Tạo yêu cầu điều chỉnh | FE-028 (Yêu cầu điều chỉnh sau khi chốt) | P0 | Có | [SC-20-tao-yeu-cau-dieu-chinh.md](./SC-20-tao-yeu-cau-dieu-chinh.md) | 247 |
| SC-21 | Phê duyệt yêu cầu điều chỉnh | FE-029 (Phê duyệt điều chỉnh và sinh reverse/delta) | P0 | Có | [SC-21-phe-duyet-yeu-cau-dieu-chinh.md](./SC-21-phe-duyet-yeu-cau-dieu-chinh.md) | 242 |
| SC-22 | Kết quả tính 完納奨励金 | FE-030 (Engine tính 完納奨励金), FE-032 (Delta tiền thưởng kỳ tiếp theo), FE-043 (Hiển thị version rule đã áp dụng) | P0 (FE-030, FE-032) · P1 (FE-043) | Một phần | [SC-22-ket-qua-tinh-incentive.md](./SC-22-ket-qua-tinh-incentive.md) | 227 |
| SC-23 | Danh sách phiên bản biểu suất | FE-031 (Quản lý phiên bản biểu suất) | P0 | Một phần | [SC-23-danh-sach-phien-ban-bieu-suat.md](./SC-23-danh-sach-phien-ban-bieu-suat.md) | 232 |
| SC-24 | Tạo và phê duyệt phiên bản biểu suất | FE-031 (Quản lý phiên bản biểu suất) | P0 | Một phần | [SC-24-tao-va-phe-duyet-phien-ban-bieu-suat.md](./SC-24-tao-va-phe-duyet-phien-ban-bieu-suat.md) | 250 |
| SC-25 | Danh mục báo cáo | FE-033 (Khung báo cáo dùng chung), FE-034 (Nhóm báo cáo ngày RPT-01..RPT-05) | P0 | Một phần | [SC-25-danh-muc-bao-cao.md](./SC-25-danh-muc-bao-cao.md) | 204 |
| SC-26 | Xem và xuất báo cáo | FE-034 (nhóm ngày RPT-01..05), FE-035 (nhóm kế toán/thưởng/điều chỉnh/tranh chấp RPT-06..09), FE-036 (nhóm tháng RPT-10..12) | P0 (FE-034, FE-035) · P1 (FE-036) | Một phần | [SC-26-xem-va-xuat-bao-cao.md](./SC-26-xem-va-xuat-bao-cao.md) | 254 |
| SC-27 | Quản lý batch xuất dữ liệu kế toán | FE-037 (Xuất dữ liệu đối chiếu sang kế toán) | P0 | Không | [SC-27-quan-ly-batch-xuat-du-lieu-ke-toan.md](./SC-27-quan-ly-batch-xuat-du-lieu-ke-toan.md) | 250 |
| SC-28 | Hộp thông báo trong ứng dụng | FE-038 (Thông báo in-app và email), FE-039 (Thông báo Critical trong 5 phút) | P1 | Không | [SC-28-hop-thong-bao-trong-ung-dung.md](./SC-28-hop-thong-bao-trong-ung-dung.md) | 244 |
| SC-29 | Cấu hình thông báo | FE-040 (Cấu hình thông báo) | P1 | Không | [SC-29-cau-hinh-thong-bao.md](./SC-29-cau-hinh-thong-bao.md) | 231 |
| SC-30 | Tra cứu audit log | FE-042 (Tìm kiếm audit); phụ thuộc FE-041 (Ghi logical audit — phía ghi, không có màn) | P1 | Không | [SC-30-tra-cuu-audit-log.md](./SC-30-tra-cuu-audit-log.md) | 225 |
| SC-31 | Quản lý file đính kèm | FE-044 (Quản lý file đính kèm) | P1 | Không | [SC-31-quan-ly-file-dinh-kem.md](./SC-31-quan-ly-file-dinh-kem.md) | 249 |
| SC-32 | Trạng thái vận hành suy giảm | FE-045 (Vận hành suy giảm khi mất kết nối) | P1 | Không | [SC-32-trang-thai-van-hanh-suy-giam.md](./SC-32-trang-thai-van-hanh-suy-giam.md) | 249 |

**Đếm:** 32/32 màn. Tổng 7786 dòng.

Đặc tả UI/FE tương ứng (CSV 22 cột + bbox JSON + ảnh chú thích) ở `.momorph/specs/`, một bộ ba file mỗi màn.
Câu hỏi cho chủ đầu tư đã gom ở [`../92-cau-hoi-cho-chu-dau-tu.md`](../92-cau-hoi-cho-chu-dau-tu.md).
