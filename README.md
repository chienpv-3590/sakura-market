# Sakura Market — LAB-3 Prototype

Sakura Market là hệ thống hỗ trợ vận hành chợ bán buôn thủy sản (Product A):
tiếp nhận lô hàng, ghi nhận 目利き, giao dịch 相対取引/せり, giao nhận, đối
chiếu ngày và tính 完納奨励金. Đây là **prototype LAB-3**, dựng trong ngân
sách ~11h — **không phải hệ thống production**, dữ liệu trong database là bộ
seed mock, không có dữ liệu nghiệp vụ thật. Danh sách đầy đủ 20 màn đã dựng,
12 màn ngoài phạm vi và phần mock chi tiết nằm ở
[`docs/pham-vi-va-phan-mock.md`](./docs/pham-vi-va-phan-mock.md).

## Supabase project

- Project: **Aicoding**
- Ref: `esgqneojskshvidhivgv`
- Region: `ap-southeast-1`
- Dashboard: https://supabase.com/dashboard/project/esgqneojskshvidhivgv

## Chạy local

```bash
npm install
cp .env.example .env.local   # dien 3 khoa tu Supabase Dashboard -> Settings -> API Keys
npm run dev                  # http://localhost:3000
```

Sau khi có `.env.local`, khởi tạo dữ liệu — **đủ cả ba bước**:

```bash
npm run db:push       # 1. ap migration (schema, RLS, trigger) len Supabase
npm run seed:users    # 2. tao 9 tai khoan demo ben duoi qua Auth Admin API
```

**3. Nạp dữ liệu nghiệp vụ mẫu** — bước này phải làm tay:

Mở Supabase Dashboard → **SQL Editor**, dán toàn bộ nội dung `supabase/seed.sql`
rồi chạy. Sẽ có 10 người tham gia, 12 lô hàng, 12 giao dịch, 6 phiếu giao hàng
và 2 phiên bản biểu suất.

> Vì sao phải làm tay: `supabase db push --include-seed` **im lặng không chạy
> seed** khi không còn migration nào pending (lỗi CLI đang mở). Nó không báo
> lỗi, chỉ đơn giản là không nạp gì.

**Bỏ bước 3 thì app vẫn chạy và vẫn đăng nhập được, nhưng mọi danh sách đều
rỗng.** Đó là triệu chứng của thiếu seed, không phải của phân quyền.

## Tài khoản demo

Email dạng `<tên>@sakura-market.local`, mật khẩu chung: **`SakuraDemo@2026`**.

| Email | Vai trò | Dùng để xem gì |
|---|---|---|
| `intake@sakura-market.local` | ROLE-INTAKE | Tiếp nhận lô hàng |
| `judge@sakura-market.local` | ROLE-JUDGE | Ghi nhận 目利き |
| `trade@sakura-market.local` | ROLE-TRADE | **Giao dịch 相対取引 — màn quan trọng nhất, đăng nhập bằng tài khoản này để xem** |
| `delivery@sakura-market.local` | ROLE-DELIVERY | Giao nhận hàng |
| `settlement@sakura-market.local` | ROLE-SETTLEMENT | Tạo yêu cầu đối chiếu/điều chỉnh |
| `settlement-lead@sakura-market.local` | ROLE-SETTLEMENT | Phê duyệt điều chỉnh (khác người tạo) |
| `ruleadmin@sakura-market.local` | ROLE-RULE-ADMIN | Soạn phiên bản biểu suất 完納奨励金 |
| `rulechecker@sakura-market.local` | ROLE-RULE-ADMIN | Phê duyệt phiên bản biểu suất (khác người soạn) |
| `sysadmin@sakura-market.local` | ROLE-SYS-ADMIN | Quản trị hệ thống |

Hai cặp tài khoản tách đôi là **cố ý**, không phải trùng lặp thừa:
`settlement` / `settlement-lead` để người phê duyệt điều chỉnh khác người tạo
yêu cầu; `ruleadmin` / `rulechecker` để tách người soạn và người duyệt biểu
suất theo maker-checker của `GOV-RULE-01`. Cả hai luồng đều từ chối tự phê
duyệt (403).

**Nhập sai mật khẩu 5 lần liên tiếp sẽ khóa tạm tài khoản 15 phút** — chờ 15
phút rồi thử lại.

## RLS được thực thi thật — nhưng chỉ ở khâu GHI

Row Level Security bật trên cả 16 bảng nghiệp vụ, và nó phân quyền theo vai
trò trong `app_user`. Cần nói chính xác nó chặn cái gì:

- **Đọc: mọi vai trò đang hoạt động đọc được mọi bảng.** Đây là chủ đích —
  `FR-601` đòi các vai trò khác phải nhìn được ở mức chỉ-đọc. `judge@` mở màn
  giao dịch 相対取引 **vẫn thấy đủ dữ liệu**, giống hệt `trade@`.
- **Ghi: chặn theo vai trò.** `intake@` không sửa được `transaction`,
  `trade@` không tạo được lô hàng. Thử qua API cũng bị Postgres chặn, không
  chỉ ẩn nút trên giao diện.
- **Vào trang: chặn ở tầng ứng dụng** bằng `requireRole`, không phải RLS.
  Vai trò không có quyền mở `/corrections` nhận **404** — cố ý trả 404 thay vì
  403 để không lộ sự tồn tại của tài nguyên.

**Nếu mọi danh sách đều rỗng thì đó là thiếu bước seed** (bước 3 mục "Chạy
local"), không phải RLS.

## Khi gặp lỗi kết nối DB (Resume project)

Dự án Supabase free-tier tự ngủ sau 7 ngày không có truy vấn. Nếu app báo
lỗi kết nối: mở dashboard Supabase → chọn org → chọn project
`sakura-market` (ref `esgqneojskshvidhivgv`) → bấm **Resume project** → xác
nhận → chờ khoảng 30 giây rồi tải lại app. Dữ liệu và cấu hình giữ nguyên;
Supabase bảo đảm khôi phục được trong vòng 1 năm.

## Bản deploy

- Vercel URL: `<chưa deploy — điền sau>`

## Ghi chú bảo mật

Đây là môi trường demo với dữ liệu mock, không phải hệ thống thật. Chín tài
khoản demo dùng chung một mật khẩu là đánh đổi có ý thức để giảng viên và
người review LAB-7 đăng nhập được. Chạy lại `npm run seed:users` bất cứ lúc
nào để khôi phục 9 tài khoản này.
