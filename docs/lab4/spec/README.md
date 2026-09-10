# Screen spec 32 màn — bản AS-BUILT

> ## ⚠️ Đọc dòng này trước khi dùng thư mục này để dựng code
>
> Thư mục này là **bản as-built**: prototype LAB-3 **hiện đang làm gì**, mọi khẳng định dẫn
> `file:dòng`. Nó **không phải** đặc tả để dựng theo.
>
> Prototype dựng trong ~18h, và nó có cả chỗ **cố ý đơn giản hoá** lẫn chỗ **thiếu ngoài chủ
> đích**. Dựng theo thư mục này là dựng lại nguyên những chỗ đó.
>
> **Đặc tả để dựng nằm ở hai chỗ khác:**
>
> | Cần gì | Đọc ở đâu | Nguồn chân lý |
> |---|---|---|
> | Đặc tả UI/FE theo component (22 cột) | `.momorph/specs/{màn}.csv` | Function List + Feature List + RFP |
> | Đặc tả BE: API · dữ liệu · trạng thái · quy tắc · phân quyền | `../spec-be/SC-XX-*.md` | Function List + Feature List + RFP |
> | Prototype hiện làm gì, và lệch thiết kế ở đâu | **thư mục này** | Code thật |
>
> Chỗ lệch giữa thiết kế và prototype được gom ở `../10-database-diagram.md` § 4 (21 hàng) và
> ở khối `ĐỐI CHIẾU PROTOTYPE` của từng wireframe.

## Template

Template dùng chung cho cả 20 màn đã dựng và 12 màn chưa dựng. **Một template duy nhất** — đừng
tạo bản thứ hai. Màn chưa dựng dùng thêm mục 9; màn đã dựng bỏ mục 9.

Lưu ý về 12 màn chưa dựng: chúng không có gì "as-built", nên nội dung của chúng trong thư mục này
là **đề xuất thiết kế ban đầu** (bám RFP, có banner riêng trong từng file). Bản thiết kế chính
thức của chúng vẫn là CSV 22 cột + spec BE như bảng trên.

## Template

```markdown
# SC-XX — <tên màn>

| | |
|---|---|
| Mã thi công | SCR0XX / SCR0XX + SCR0YY / — (chưa dựng) |
| Route | `/path` / — |
| Loại | Form / List / Detail / List-Detail / Component |
| Actor chính | ... |
| FE- / FR- | FE-0XX / FR-XXX-0X |
| Trạng thái | Đã dựng / Chưa dựng |

<!-- CHỈ màn chưa dựng: banner này, đặt ngay dưới bảng đầu -->
> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

## 1. Mục đích

Một đoạn. Màn này giải quyết việc gì cho ai, ở khâu nào của ngày nghiệp vụ.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc / không
- Vai trò được vào: ...
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên)
- Tiền đề dữ liệu: ...

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|

- **Nguồn**: `bảng.cột` trong Postgres, hoặc `dẫn xuất` kèm công thức, hoặc `chỉ UI`.
- **Validation client** và **server** là hai cột riêng vì chúng lệch nhau trong thực tế. Ô nào
  không tìm thấy trong code thì ghi `chưa có — đề xuất`, không ghi như thể đã có.
- **Nhãn JA** chỉ lấy từ file i18n. Không có key thì ghi `chưa có key JA`, không dịch đoán.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|

Tối thiểu phải có: `rỗng` · `đang tải` · `lỗi tải` · `không có quyền` · `đang gửi` · `gửi lỗi`.
Màn chạm bảng bị lock (`transaction`, `seri_result`, `mekiki_record`, `delivery_shipment`) **bắt
buộc** thêm dòng `read-only vì ngày đã lock` với mã **423**.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|

**Bảy** vai trò, không phải chín: ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY ·
ROLE-SETTLEMENT · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN (CHECK ở
`supabase/migrations/20260904090000_core_identity.sql:11-16`). Chín là số **tài khoản demo** —
`settlement`/`settlement-lead` dùng chung ROLE-SETTLEMENT, `ruleadmin`/`rulechecker` dùng chung
ROLE-RULE-ADMIN, để người duyệt khác người tạo. Liệt vai trò nào liên quan, không cần đủ 7 dòng.

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng**, có chủ đích. Đừng viết
spec như thể đọc cũng bị chặn theo vai trò. Chặn là ở **ghi** và ở **vào trang**.

> **⚠️ `FR-601` là mã nội bộ của LAB-3, KHÔNG phải mã yêu cầu của khách.** Grep toàn văn RFP: **0
> hit**. Vì nó mang tiền tố `FR-` giống mã thật (`FR-IAM-01`, `FR-PARTY-02`…) nên rất dễ bị đọc
> thành yêu cầu khách — và đã bị chính bộ tài liệu này đọc sai một lần.
> Trong thư mục **as-built** này thì dẫn `FR-601` là **hợp lệ**: nó ghi lại điều LAB-3 đã tin và
> đã cài. Nhưng nó **không** được dùng làm căn cứ trong đặc tả thiết kế (`../spec-be/`).
> Căn cứ khách thật về phân quyền là **RFP:311** (§02-08): *"Đơn vị dự thầu phải **đề xuất** cơ chế
> phân tách quyền và truy vết"* — tức RFP giao việc này cho bên dự thầu, không bắt đọc rộng.
> Xem `../adr/ADR-014-siet-quyen-doc-du-lieu-nhay.md`.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|

## 7. Edge case

Danh sách gạch đầu dòng. Ưu tiên: đồng thời (CAS), ngày đã lock, dữ liệu mất hiệu lực giữa
phiên, số lượng vượt, quyền bị thu hồi giữa phiên.

## 8. Dẫn chứng

- `src/app/...:dòng` — ...
- `supabase/migrations/...:dòng` — ...

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | ... | Ghi ngược vào `../10-database-diagram.md` § bảng cần thêm |
| Hạ tầng | ... | Ví dụ: email/queue, offline queue |
| Màn/API phụ thuộc | ... | |

### Giả định cần chốt

Mọi con số nghiệp vụ (ngưỡng, thời hạn, hạn mức) mà RFP không nói phải nằm ở đây, kèm ảnh hưởng
nếu sai và nơi phải sửa. Không rải số bịa vào bảng field.
```

## Quy tắc cứng

1. **Mỗi file dưới 200 dòng.** Vượt thì tách theo SCR con, cập nhật index bên dưới.
2. **Không ô validation nào để trống.** Không có trong code → `chưa có — đề xuất`.
3. **Mọi khẳng định về code dẫn `file:dòng`.** Không khẳng định từ ký ức.
4. **404 không phải 403** khi thiếu quyền vào trang — quyết định có chủ đích của LAB-3.
5. **Không chép email, mật khẩu, ref project Supabase** vào spec. Repo là public.
6. Dữ liệu mẫu dùng tên giả rõ ràng: `Người tham gia A`, `LOT-0001`.

## Index 32 màn

| SC- | Tên | File | Đã dựng | Trạng thái spec |
|---|---|---|---|---|
| SC-01 | Đăng nhập | `SC-01-dang-nhap.md` | Có | ✅ |
| SC-02 | Xác thực MFA và thiết lập bảo mật | `SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.md` | Không | ⚠️ |
| SC-03 | Danh sách tài khoản | `SC-03-danh-sach-tai-khoan.md` | Không | ⚠️ |
| SC-04 | Chi tiết tài khoản và lịch sử quyền | `SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.md` | Không | ⚠️ |
| SC-05 | Danh sách người tham gia | `SC-05-danh-sach-nguoi-tham-gia.md` | Có | ✅ |
| SC-06 | Chi tiết và vòng đời hiệu lực người tham gia | `SC-06-chi-tiet-va-vong-doi-hieu-luc.md` | Có | ✅ |
| SC-07 | Cảnh báo hiệu lực sắp hết hạn | `SC-07-canh-bao-hieu-luc-sap-het-han.md` | Không | ⚠️ |
| SC-08 | Tiếp nhận lô hàng | `SC-08-tiep-nhan-lo-hang.md` | Có | ✅ |
| SC-09 | Ghi nhận kết quả 目利き | `SC-09-ghi-nhan-ket-qua-mekiki.md` | Có | ✅ |
| SC-10 | Chi tiết lô hàng và điều chỉnh | `SC-10-chi-tiet-lo-hang-va-dieu-chinh.md` | Có | ✅ |
| SC-11 | Tạo giao dịch 相対取引 | `SC-11-tao-giao-dich-aitai.md` | Có | ✅ |
| SC-12 | Danh sách và chi tiết giao dịch | `SC-12-danh-sach-va-chi-tiet-giao-dich.md` | Có | ✅ |
| SC-13 | Nhập kết quả せり | `SC-13-nhap-ket-qua-seri.md` | Có | ✅ |
| SC-14 | Tra cứu bản ghi せり | `SC-14-tra-cuu-ban-ghi-seri.md` | Có | ✅ |
| SC-15 | Danh sách giao hàng | `SC-15-danh-sach-giao-hang.md` | Có | ✅ |
| SC-16 | Chi tiết giao hàng và các lần giao | `SC-16-chi-tiet-giao-hang-va-cac-lan-giao.md` | Có | ✅ |
| SC-17 | Ghi nhận ngoại lệ giao hàng | `SC-17-ghi-nhan-ngoai-le-giao-hang.md` | Không | ⚠️ |
| SC-18 | Bảng đối chiếu ngày và lock kỳ | `SC-18-bang-doi-chieu-ngay-va-lock-ky.md` | Có | ✅ |
| SC-19 | Quản lý tranh chấp | `SC-19-quan-ly-tranh-chap.md` | Không | ⚠️ |
| SC-20 | Tạo yêu cầu điều chỉnh | `SC-20-tao-yeu-cau-dieu-chinh.md` | Có | ✅ |
| SC-21 | Phê duyệt yêu cầu điều chỉnh | `SC-21-phe-duyet-yeu-cau-dieu-chinh.md` | Có | ✅ |
| SC-22 | Kết quả tính 完納奨励金 | `SC-22-ket-qua-tinh-incentive.md` | Có | ✅ |
| SC-23 | Danh sách phiên bản biểu suất | `SC-23-danh-sach-phien-ban-bieu-suat.md` | Có | ✅ |
| SC-24 | Tạo và phê duyệt phiên bản biểu suất | `SC-24-tao-va-phe-duyet-phien-ban-bieu-suat.md` | Có | ✅ |
| SC-25 | Danh mục báo cáo | `SC-25-danh-muc-bao-cao.md` | Có | ✅ |
| SC-26 | Xem và xuất báo cáo | `SC-26-xem-va-xuat-bao-cao.md` | Có | ✅ |
| SC-27 | Quản lý batch xuất dữ liệu kế toán | `SC-27-quan-ly-batch-xuat-du-lieu-ke-toan.md` | Không | ⚠️ |
| SC-28 | Hộp thông báo trong ứng dụng | `SC-28-hop-thong-bao-trong-ung-dung.md` | Không | ⚠️ |
| SC-29 | Cấu hình thông báo | `SC-29-cau-hinh-thong-bao.md` | Không | ⚠️ |
| SC-30 | Tra cứu audit log | `SC-30-tra-cuu-audit-log.md` | Không | ⚠️ |
| SC-31 | Quản lý file đính kèm | `SC-31-quan-ly-file-dinh-kem.md` | Không | ⚠️ |
| SC-32 | Trạng thái vận hành suy giảm | `SC-32-trang-thai-van-hanh-suy-giam.md` | Không | ⚠️ |

**Đếm:** 20 màn đã dựng (✅) · 12 màn chưa dựng (⚠️) · tổng 32.

✅ = spec bám code thật, mọi khẳng định dẫn `file:dòng`.
⚠️ = spec đầy đủ nhưng field/validation là **đề xuất thiết kế**, và mục 9 có phần
"Giả định cần chốt" chờ chủ đầu tư. Đừng đọc như hiện trạng.
