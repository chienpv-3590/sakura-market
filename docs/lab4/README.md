# LAB-4 — Wireframe, architecture và detail design

Bộ nộp của bài LAB-4, phát triển từ prototype chạy thật LAB-3. Đầu vào trực tiếp để break task
ở LAB-5.

**Ngân sách đề:** 6.0h · **Thực tế:** xem [`90-so-gio.md`](./90-so-gio.md)
**Phạm vi:** 32 màn LAB-1 (SC-01..SC-32), mọi màn đặc tả đầy đủ field · validation · trạng thái · phân quyền

## Năm sản phẩm nộp

| # | Sản phẩm | Nơi xem |
|---|---|---|
| 1 | **Wireframe chi tiết 32 màn** | [`wireframes/index.html`](./wireframes/index.html) — mở trực tiếp bằng browser, không cần server |
| 2 | **Architecture design** | [`20-architecture-design.md`](./20-architecture-design.md) |
| 3 | **Screen spec / detail design** | [`spec/`](./spec/README.md) — 32 file, một file mỗi màn |
| 4 | **ADR** | [`adr/`](./adr/README.md) |
| 5 | **Database diagram** | [`10-database-diagram.md`](./10-database-diagram.md) |
| + | **Số giờ thật đã dùng** | [`90-so-gio.md`](./90-so-gio.md) |

## Thứ tự đọc

**Nếu bạn sắp break task ở LAB-5:** 1 → 3 → 5 → 4
**Nếu bạn muốn hiểu hệ thống trước:** 1 → 2 → 3
**Nếu bạn review thiết kế:** 2 → 4 → 5

1. [`00-roster-va-gap.md`](./00-roster-va-gap.md) — **bắt đầu ở đây.** Roster 32 màn, ba hệ mã
   màn hình được hoà giải, ma trận gap giữa cái LAB-4 cần và cái LAB-3 đã có
2. [`20-architecture-design.md`](./20-architecture-design.md) — thành phần, luồng dữ liệu, và
   bốn điểm phân nhánh logic đặc thù của đề
3. [`spec/README.md`](./spec/README.md) — template và index 32 màn
4. [`adr/README.md`](./adr/README.md) — các quyết định kiến trúc, mỗi bản đủ bối cảnh · lựa chọn ·
   phương án đã bỏ · hệ quả
5. [`10-database-diagram.md`](./10-database-diagram.md) — ERD 18 bảng + 1 view, đối chiếu với
   bảng thật đã tạo ở LAB-3
6. [`91-tu-soat-tieu-chi.md`](./91-tu-soat-tieu-chi.md) — tự soát theo 4 tiêu chí đạt của đề

## Quan hệ với tài liệu LAB-3

`docs/lab4/` **không ghi đè** gì của LAB-3. Các tài liệu dưới đây giữ nguyên làm bằng chứng đối
chiếu, và LAB-4 dẫn sang chúng:

| Tài liệu LAB-3 | Vai trò với LAB-4 |
|---|---|
| `docs/generated/*` (tiếng Anh, do rebuild-spec đọc từ code) | Bằng chứng hiện trạng. LAB-4 dẫn sang, không dịch lại |
| `docs/system/architecture.md` | Bản mô tả kiến trúc **hiện trạng**. `20-architecture-design.md` là bản **thiết kế**, file riêng |
| `docs/pham-vi-va-phan-mock.md` | Phạm vi và phần mock của LAB-3. Nguồn của QĐ-1..QĐ-6 → chuyển thành ADR |
| `docs/gia-dinh-tich-hop-ke-toan.md` | 5 giả định IF-ACC-01, dùng ở mục điểm tích hợp |
| `docs/time-log.md` | Định dạng khai giờ, `90-so-gio.md` theo cùng khuôn |

## Dựng lại wireframe

`wireframes/index.html` là **file sinh ra**. Đừng sửa tay — sửa partial rồi build lại:

```bash
node scripts/build-wireframes.mjs
```

Nguồn: `wireframes/shell.html` (khung, CSS, điều hướng) + `wireframes/screens/*.html` (32 partial).
Mỗi partial mở đầu bằng một dòng `<!-- meta: sc=… | name=… | group=… | status=… -->`; script đọc
dòng đó để sinh sidebar, nên thêm màn mới không phải sửa khung.

Mở bằng `file://` được vì file không tải tài nguyên ngoài nào — không CDN, không font ngoài,
không ảnh ngoài. Deep link theo mã màn: `index.html#SC-11`.

## Lưu ý khi đọc

- Màn **chưa thi công** có viền gạch đứt trong wireframe và banner "Màn chưa thi công" trong spec.
  Field và validation của những màn đó là **đề xuất thiết kế**, chưa tồn tại trong code.
- Chỗ nào tài liệu khẳng định về hành vi hệ thống đều dẫn `file:dòng`. Chỗ nào không dẫn được thì
  ghi rõ là giả định.
- Con số nghiệp vụ không có trong tài liệu khách nằm ở mục "Giả định cần chốt" của từng file spec,
  không rải vào bảng field.
