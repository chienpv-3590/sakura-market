# ADR — Sakura Market, bộ nộp LAB-4

Mười quyết định kiến trúc đã ra trên prototype LAB-3, cộng một quyết định LAB-4
buộc phải ra khi soát thiết kế lại. Không bản nào ở đây là quyết định phát minh
cho đủ số: mỗi bản dẫn được nguồn gốc và dẫn chứng `file:dòng`.

**Nguồn nguyên liệu:** `docs/pham-vi-va-phan-mock.md` § 4 (QĐ-1..QĐ-6, dòng 190+)
và dòng 138–147 (miễn trừ test); RFP §02-06 FIG-004 và §02-08.

## Cách đọc cột Trạng thái

| Trạng thái | Nghĩa |
|---|---|
| **Đã áp dụng** | Đã thi công trong LAB-3, kiểm chứng được bằng code hoặc bằng script chạy thật vào database sống |
| **Đề xuất** | Chưa thi công. LAB-5 phải làm — cho tới lúc đó prototype vẫn ở trạng thái ADR mô tả |

## Index

| Mã | Quyết định | Nguồn | Trạng thái |
|---|---|---|---|
| [ADR-001](./ADR-001-seri-result-la-bang-rieng.md) | `seri_result` là bảng riêng, không dùng discriminator trên `transaction.type` | QĐ-1 | Đã áp dụng |
| [ADR-002](./ADR-002-denormalize-business-date.md) | Denormalize `business_date` để trigger đọc không JOIN | QĐ-2 | Đã áp dụng |
| [ADR-003](./ADR-003-pham-vi-trigger-khoa-ngay.md) | Phạm vi trigger khoá ngày: 4 bảng, miễn `lot` và `delivery` | QĐ-3 | Đã áp dụng |
| [ADR-004](./ADR-004-lock-o-trigger-khong-o-rls.md) | Đặt lock ở trigger chứ không ở RLS | QĐ-4 | Đã áp dụng |
| [ADR-005](./ADR-005-khong-transaction-xuyen-bang-cas-va-ghi-bu.md) | Không có transaction xuyên bảng — CAS + ghi bù | QĐ-5 | Đã áp dụng |
| [ADR-006](./ADR-006-file-dinh-kem-that-qua-storage.md) | Lưu file đính kèm thật qua Storage | QĐ-6 | Đã áp dụng |
| [ADR-007](./ADR-007-tach-ba-duong-go-tam-ngung-theo-fig-004.md) | Tách 3 đường gỡ tạm ngừng theo FIG-004, đưa `license_type` xuống tầng DB | LAB-4 | **Đề xuất** |
| [ADR-008](./ADR-008-engine-incentive-chay-dong-bo-trong-request.md) | Engine 完納奨励金 chạy đồng bộ trong request thay vì job nền | LAB-3 | Đã áp dụng |
| [ADR-009](./ADR-009-tra-404-thay-vi-403-khi-thieu-quyen.md) | Trả 404 thay vì 403 khi thiếu quyền vào trang | LAB-3 | Đã áp dụng |
| [ADR-010](./ADR-010-khong-cai-test-runner-cho-lab-3.md) | Không cài test runner cho LAB-3 | LAB-3 | Đã áp dụng |
| [ADR-011](./ADR-011-cua-kiem-hieu-luc-va-tru-ton-cho-nhanh-seri.md) | Áp cửa kiểm hiệu lực và trừ tồn cho nhánh せり, siết xuống tầng DB | LAB-4 | **Đề xuất** |
| [ADR-012](./ADR-012-chan-insert-tren-ngay-da-lock.md) | Chặn INSERT trên ngày đã lock | LAB-4 | **Đề xuất** |
| [ADR-013](./ADR-013-duong-giao-nhan-cho-seri.md) | Đường giao nhận cho せり | LAB-4 | **Đề xuất** |
| [ADR-014](./ADR-014-siet-quyen-doc-du-lieu-nhay.md) | Siết quyền đọc dữ liệu nhạy: `FR-601` đá với §09-06 (APPI) | LAB-4 | **Đề xuất** |

9 bản **Đã áp dụng**, 5 bản **Đề xuất** (ADR-007, 011, 012, 013, 014).

Hai bản mang mục `[CHƯA CHỐT]` — chỗ chủ đầu tư phải quyết, ADR không tự chọn:
ADR-007 (đường gỡ tạm ngừng của 買出人) và ADR-014 (vai trò nào được đọc `audit_log`).

## Bản nào đọc trước

**Hai bản đọc trước tiên: ADR-007 và ADR-011.**

[ADR-007](./ADR-007-tach-ba-duong-go-tam-ngung-theo-fig-004.md) là chỗ duy nhất
trong cả bộ nộp nói thẳng rằng prototype đang vi phạm một nguyên tắc **bắt buộc**
của RFP (§02-08 dòng 309 — không được gộp 許可 và 承認 thành một quy tắc chung), nói
cách sửa, và nói sửa thì mất gì.

[ADR-011](./ADR-011-cua-kiem-hieu-luc-va-tru-ton-cho-nhanh-seri.md) là gap kỹ thuật
nặng nhất: nhánh せり không kiểm hiệu lực người mua và không trừ tồn lô hàng, nên
`FR-PARTY-02` và `FR-LOT-03` (cả hai P0) chỉ được thực thi trên kênh 相対取引.

### Ba cụm đọc theo nhóm

- **Khoá ngày nghiệp vụ:** ADR-002 (cột `business_date` ở đâu) → ADR-003 (trigger
  gắn trên bảng nào) → ADR-004 (vì sao trigger chứ không RLS) → ADR-005 (vì sao
  không có transaction thật để dựa vào) → **ADR-012** (chặn INSERT — sửa hệ quả xấu
  mà ADR-003 đã khai).
- **Nhánh せり thiếu gì:** ADR-001 (vì sao là bảng riêng) → **ADR-011** (cửa kiểm và
  trừ tồn) → **ADR-013** (đường giao nhận).
- **Người tham gia và quyền đọc:** ADR-007 (許可/承認 và ba đường gỡ tạm ngừng) →
  ADR-009 (404 che *trang*) → **ADR-014** (siết RLS để che *dữ liệu* — `FR-601` đá với
  §09-06 APPI; ADR-009 không phải lớp chắn dữ liệu).

## Nơi tiêu thụ

- `docs/lab4/10-database-diagram.md` — bảng đối chiếu thiết kế ↔ thi công dẫn về ADR-001, 002, 003, 011, 013
- `docs/lab4/20-architecture-design.md` — điểm thực thi ràng buộc 3 tầng dẫn về ADR-004, 007, 009, 012, 014; § 4.2 (dòng 444–465) là phát hiện gốc của ADR-013
- `docs/lab4/spec/SC-03`, `SC-04`, `SC-30`, `SC-31` — cả bốn để ngỏ cùng một quyết định và dẫn về ADR-014
- LAB-5 — năm bản `Đề xuất` là năm epic: ADR-011 (P0, chặn oversell giữa hai kênh) · ADR-007 (P0, tuân thủ §02-08) · ADR-013 (P0, `FR-DEL-01` cho せり) · ADR-012 (toàn vẹn lock, **cần chủ đầu tư quyết** luồng giao muộn) · ADR-014 (APPI, **cần chủ đầu tư quyết** vai trò đọc audit). ADR-010 là đường vào cho việc dựng test
