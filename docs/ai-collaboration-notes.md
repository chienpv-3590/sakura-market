# Ghi chú làm việc với AI — LAB-3 Sakura Market

Deliverable #5. Đề bài đòi **chỗ AI sinh sai, cách phát hiện và sửa** — nên
bản này ghi lỗi, không ghi lời khen công cụ.

## Công cụ và cách dùng

Claude Code (Opus) trong terminal, dùng theo hai lớp: một phiên chính điều
phối, và sub-agent chạy từng phase độc lập. Kỷ luật đặt ra từ đầu: **mỗi
phase phải tự chứng minh bằng lệnh chạy thật trên DB thật**, không nhận báo
cáo "đã xong" mà không có output kèm theo. Chính kỷ luật đó bắt được phần
lớn lỗi bên dưới.

## Bảy lỗi đáng ghi

**1. AI khẳng định sai về bảo mật hệ thống nó vừa viết.**
Tôi (phiên chính) nói với người dùng: "đăng nhập role nào chỉ thấy dữ liệu
role đó". Một sub-agent được giao đọc lại migration đã chứng minh ngược:
policy `read_all_active_users` mở quyền **đọc** mọi bảng cho mọi role đang
hoạt động; RLS chỉ chặn ở khâu **ghi**. README mang lỗi này nhiều ngày.
→ *Phát hiện:* giao agent đọc thẳng file migration thay vì hỏi lại AI.
→ *Bài học:* AI nói về code nó tự viết vẫn phải kiểm bằng nguồn.

**2. Kiểm chứng chạy sai môi trường mà vẫn báo "đạt".**
Tôi báo "đã verify production build" — thực tế `npm start` thất bại vì port
3000 bị dev server giữ, nên mọi mã 200 tôi báo đều đến từ dev.
→ *Phát hiện:* xem lại log, thấy `npm start` có lỗi mà tôi bỏ qua.
→ *Sửa:* chạy lại trên port 3100 và kiểm dấu vết dev (`hot-update`,
`react-refresh`) trong HTML trước khi kết luận. Về sau khi deploy, cùng loại
bẫy này xuất hiện lại: alias có thể trỏ deployment cũ, nên phải `vercel
inspect` xác nhận alias trỏ đúng bản mới rồi mới tin kết quả test.

**3. Suy giá trị từ tên biến.**
Design system có ramp `--cacao-*`. AI đoán theo nghĩa từ "cacao" → màu nâu.
Bản design thật: **xanh** `#137DD0`.
→ *Bài học:* tên token không phải nguồn dữ liệu. Sau lỗi này mọi giá trị màu
đều lấy từ file, không suy diễn.

**4. CSS đúng trong source nhưng không có trong bundle đang chạy.**
`.cds-progress__fill` có `display:inline`; phần tử inline không phải replaced
element thì bỏ qua `width`/`height`, nên thanh tiến trình không bao giờ vẽ ra
— dù `getComputedStyle` báo width đúng.
→ *Phát hiện:* agent tester crop pixel thật của vùng đó thay vì đọc computed
style. Sau đó phát hiện bản sửa **đã có trong source nhưng chưa vào CSS
bundle** của dev server (compiler trễ).
→ *Bài học:* với UI, bằng chứng là pixel, không phải giá trị tính toán.

**5. Form đăng nhập thiếu `method` — mật khẩu lên URL.**
Submit trước khi hydrate xong thì browser làm GET mặc định, mật khẩu vào
query string. Sửa thành `method="post"`.
→ *Bài học:* AI viết form React thường quên trạng thái *chưa hydrate*.

**6. Font thiếu subset, tiếng Việt âm thầm fallback.**
Noto Sans JP nạp `latin-ext`; ký tự Việt dựng sẵn (U+1EA0–1EF9) nằm ở subset
`vietnamese` riêng. Chữ có dấu vẫn hiện nhưng bằng font khác.
→ *Bài học:* "vẫn hiện" không có nghĩa là "đúng font".

**7. Báo động dựa trên dữ liệu cũ.**
Tôi báo "tạo lô hàng đang lỗi 400 trên môi trường thật" theo một phát hiện
audit — số đó đo giữa lúc migration đang chạy, đã hết đúng. Ngoài ra DB thật
đã **trôi khỏi `seed.sql`** (`TXN-20260902-02` là `cancelled` trên DB nhưng
`confirmed` trong file).
→ *Sửa:* mọi agent về sau đều truy vấn DB thật, không coi `seed.sql` là mô
tả trạng thái.

## Hai lỗi vận hành của tôi (không phải lỗi sinh code)

- **Nhân đôi agent.** Tưởng agent phase 09 đã chết sau 3 ngày gián đoạn nên
  spawn cái thứ hai. Agent thứ hai phát hiện file đang đổi dưới tay nó và tự
  dừng — đúng cách. Nguyên nhân: không gọi `ListAgents` trước khi spawn.
- **Diệt tiến trình quá rộng.** `taskkill /IM node.exe` để dừng một tiến
  trình Vercel treo, kéo theo cả server production người dùng đang test.
  Đáng ra nhắm đúng PID.

## Chỗ AI *không* sai mà công cụ bên ngoài chặn đúng

Khi set biến môi trường Vercel, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` bị từ
chối: Vercel thấy tiền tố `NEXT_PUBLIC_` cộng chuỗi trông như credential nên
**bắt khai `--type config` tường minh**. Script của tôi in ra dòng hint mơ hồ
nên tôi tưởng đã ghi xong — `vercel env ls` mới cho thấy biến không tồn tại.
→ *Bài học:* kiểm bằng lệnh liệt kê phía server, đừng tin exit code của
script mình viết.

## Điều lấy được, gói gọn

Giá trị lớn nhất không phải tốc độ sinh code, mà là **bắt AI phải nộp bằng
chứng**. Mỗi phase đều có mẫu: chụp sha256 hoặc mã HTTP **trước** khi sửa,
làm, rồi đo lại và so. Chính mẫu này bắt được lỗi #1, #2, #4 và lỗi
`env` cuối — bốn lỗi mà nếu tin báo cáo "đã xong" thì đều lọt tới bài nộp.

Hạn chế còn lại, khai thẳng: dự án **không có test tự động** (miễn trừ có
chủ đích, ghi trong `plan.md`), nên toàn bộ kiểm chứng là script chạy tay
trên DB thật. Làm thật thì phải có test.
