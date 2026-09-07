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

Sau khi có `.env.local`, khởi tạo dữ liệu:

```bash
npm run db:push       # ap migration (schema, RLS, trigger) len Supabase
npm run seed:users    # tao 9 tai khoan demo ben duoi qua Auth Admin API
```

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

## RLS được thực thi thật — không phải bug

Row Level Security trên mọi bảng nghiệp vụ đọc theo vai trò trong `app_user`.
Đăng nhập bằng tài khoản **sai vai trò** cho một chức năng sẽ thấy **danh
sách rỗng**, không phải lỗi — đó là hành vi đúng của RLS, không phải app bị
hỏng. Ví dụ: `judge@` mở màn giao dịch 相対取引 sẽ không thấy dữ liệu vì
role không được cấp quyền đọc bảng đó.

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
