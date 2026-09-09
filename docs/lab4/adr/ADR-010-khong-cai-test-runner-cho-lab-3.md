# ADR-010 — Không cài test runner cho LAB-3

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | Đã áp dụng |
| Phạm vi ảnh hưởng | Toàn repo: không `vitest`, `jest`, `@playwright/test`, `pgTAP`, không job test trong CI. Thay bằng script kiểm chạy thật vào database sống ở mỗi phase |

## Bối cảnh

Ba sức ép cùng lúc:

1. **Đề LAB-3 không chấm test.** Điểm nằm ở 20 màn chạy được và bộ tài liệu khai
   phạm vi.
2. **Ngân sách 10h đã căng ở mức 11h thật** khi ra quyết định này (số cuối cùng là
   18h). Dựng runner + fixture + seed cho test là một khoản không nhỏ.
3. **Phần lõi cần chứng minh nằm ở tầng Postgres, không ở tầng JS.** Hai thứ dễ
   sai nhất và đáng chứng minh nhất là: trigger khoá ngày chặn được cả
   `service_role` (ADR-004), và CAS chặn được oversell (ADR-005). Unit test với mock
   client không bắt được cả hai — nó chỉ kiểm lại chính cái mock.

Đây là **miễn trừ đã ghi vết** từ LAB-3, không phải thiếu sót bỏ quên.

## Lựa chọn

Không cài test runner nào. Thay vào đó, mỗi phase phải chứng minh phần lõi của
mình bằng **script chạy thật vào database đang sống** và ghi lại con số kết quả.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Vitest cho `src/lib/**` với mock Supabase client | Phần lõi cần chứng minh nằm ở tầng Postgres. Mock client trả về đúng cái ta lập trình cho nó trả về, nên test sẽ xanh cả khi trigger không tồn tại và CAS không hoạt động — xanh sai còn tệ hơn không có test |
| Playwright cho login + luồng xác nhận giao dịch | Dựng runner + tải browser + seed dữ liệu cho 2 luồng ngốn phần lớn số giờ còn lại của vòng, cho một hạng mục đề không chấm |
| `pgTAP` chạy test ngay trong Postgres | Đúng tầng nhất trong cả danh sách, nhưng phải thêm extension vào project và một đường CI riêng để chạy. Script `node` gọi thẳng REST/psql cho cùng kết quả với chi phí gần bằng 0 ở vòng này |
| Kiểm tay theo checklist rồi khai là "đã kiểm" | Không lặp lại được, không có số. Đúng loại cam kết bằng lời mà RFP `ACC-03` (dòng 1138) từ chối: nghiệm thu NFR đòi "Báo cáo test thực đo hoặc bằng chứng vận hành" |
| Cài runner nhưng để trống, chỉ 1-2 test smoke cho có | Có `npm test` xanh mà không kiểm gì thật là tệ hơn không có: nó tạo cảm giác an toàn sai và CI sẽ được tin |

## Hệ quả

**Chấp nhận được:** phần lõi được chứng minh bằng số thật trên database sống, không
phải bằng mock — trigger trả đúng `P0001` cho **cả** `authenticated` lẫn
`service_role`; 20 request đặt chỗ đồng thời cho đúng **10 thành công**,
`available_qty` không bao giờ âm; 8 request xác nhận đồng thời cho đúng **1 thành
công**; engine `987654 → 1086419` và `1235 → 1358` (chứng minh làm tròn XUỐNG, round
sẽ ra 1359); tự phê duyệt bị **403** ở cả hai luồng maker-checker; CSV xuất ra có
BOM UTF-8, dòng lẫn tiếng Việt và tiếng Nhật không mojibake; chứng từ tiếp nhận
kiểm end-to-end, `422 INVALID_TYPE` và `422 TOO_LARGE` không để lại lô mồ côi.

**Phải chịu:**

- **Không có lưới an toàn khi refactor.** Mọi thay đổi phải kiểm tay, và người kiểm
  phải biết trước cần kiểm gì — kiến thức đó nằm trong tài liệu, không nằm trong
  code chạy được.
- **Script kiểm phụ thuộc database sống.** Project free-tier ngủ sau 7 ngày không
  hoạt động; lúc đó mất luôn khả năng kiểm lại. Những gì đã kiểm là ảnh chụp một
  thời điểm, không phải phép kiểm lặp lại được.
- **Không test nào chạy trong CI**, nên một PR làm hỏng ràng buộc sẽ merge sạch sẽ
  không ai biết. Nói riêng: các hàm thuần dễ hỏng âm thầm nhất — `calculateIncentive`
  (đổi `floor` thành `round` là lệch tiền), `resolveTarget` (thêm một edge sai là mở
  một chuyển trạng thái trái FIG-010) — hiện không có gì canh.
- Ba tài liệu LAB-3 đã khai điều này ra ngoài, nên nó là khoảng trống công khai
  chứ không phải khoảng trống che được.

**Đề xuất cho LAB-5** (đây là hai phương án bỏ ở trên, mở lại khi có ngân sách):
Vitest cho các hàm thuần trong `src/lib/**` — `calculate-incentive.ts`,
`state-machine.ts`, `category-rules.ts`, `business-date.ts` đều không cần mock nào
— và Playwright cho luồng đăng nhập + luồng xác nhận giao dịch.

## Dẫn chứng

- `docs/pham-vi-va-phan-mock.md:138-147` — quyết định gốc, đủ ba lý do và cả phần "nếu làm thật cần thêm gì"
- `docs/pham-vi-va-phan-mock.md:265-291` — mục 5, toàn bộ bằng chứng đã kiểm trên database sống
- `src/lib/incentive/calculate-incentive.ts:1-2` — "Pure function -- no DB access -- so it can be exercised directly with `node -e`"
- `src/lib/incentive/calculate-incentive.ts:3-8` — ba lỗi spec cảnh báo, gồm `Math.round` thay `Math.floor`
- `src/lib/participants/state-machine.ts:31-34` — "Exactly 5 edges -- SM-001 allows no others", ràng buộc không có test nào canh
- RFP `ACC-03` dòng 1138 — nghiệm thu NFR đòi "Báo cáo test thực đo hoặc bằng chứng vận hành"
