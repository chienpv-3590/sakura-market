# Số giờ đã dùng — LAB-3 Sakura Market

Deliverable #6. Gộp theo tuần, độ chính xác 0,5h.

| Tuần | Ngày làm | Giờ | Nội dung chính |
|---|---|---|---|
| 31/08 – 06/09 | T6 04/09 | **5,0h** | Hạ tầng, Next.js + i18n, schema/RLS/trigger, đăng nhập & phân quyền, tiếp nhận lô hàng, 目利き, người tham gia, 相対取引 + せり |
| 07/09 – 13/09 | T2 07/09 · T3 08/09 | **13,0h** | Giao nhận, đối chiếu, khóa kỳ, điều chỉnh, 完納奨励金, dashboard, design system `cds-*`, sửa README theo sự thật, và nhóm P0 kế toán + báo cáo (RPT-06 = `IF-ACC-01`, RPT-02, RPT-03, RPT-08) |
| | **Tổng** | **18,0h** | |

## Ghi rõ về con số này

**Ngân sách đề bài là 10h, thực tế 18h.** Không làm tròn xuống cho khớp.

Phần vượt tập trung vào ba việc, đều phát sinh sau khi phần "chạy được" đã
xong:

1. **Làm lại tầng giao diện.** Lớp token tự suy từ tên biến bị thay hoàn
   toàn bằng design system `cds-*` thật (commit `16:22` ngày 07/09). Đây là
   làm lại, không phải làm thêm — chi tiết trong
   [`ai-collaboration-notes.md`](./ai-collaboration-notes.md) lỗi #3.

2. **Ba lượt audit đối chiếu tài liệu với code**, phát hiện tài liệu đã khai
   quá phần dựng được. Sửa tài liệu về đúng sự thật mất thêm giờ nhưng là
   phần đáng giá nhất của đợt này.

3. **Đóng khoảng trống P0 kế toán** (`IF-ACC-01`/`FN-11`/`FE-037`) — hạng mục
   P0 trong Function List đã gửi khách mà chưa có một dòng code. Phát hiện ở
   audit, làm trong 6 phase ngày 08/09.

Nếu chỉ tính tới lúc "hệ thống chạy được và đăng nhập được" thì khoảng 10h
là đúng ngân sách. 8h còn lại là chi phí của việc **kiểm lại và sửa những
gì đã tưởng là xong** — trong đó có cả sửa tài liệu do chính AI viết sai.
