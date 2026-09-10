# Design Context - SC-25 · Danh mục báo cáo

## Screen info

- **screen**: SC-25 · Danh mục báo cáo
- **source-family**: image
- **source-token**: SC-25-danh-muc-bao-cao
- **source-image**: .momorph/shots/SC-25-danh-muc-bao-cao.png
- **canvas**: 1280 x 1544 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-033 · FE-034 (FN-10) · ưu tiên P0
- **requirement-refs**: FR-RPT-01 (RFP:707) · FR-RPT-03 (RFP:709) · TBL-REPORT-01 (RFP:740-757)
- **data-domain**: D-SETTLE · D-TRADE · D-DELIVERY (RFP:707) — màn danh mục không đọc thực thể nghiệp vụ nào
- **actor**: Mọi người dùng nội bộ đang hoạt động — cả 7 vai trò
- **note**: Danh mục là hằng của yêu cầu khách: đúng 12 mã, không thêm không bớt
- **batch**: 1/2 (15 items)

## Item overview

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | - | img-001 | Khối đầu trang màn danh mục báo cáo | SC-25 · Danh mục báo cáo · FE-033 · FE-034 · FN-10 · ưu tiên P0 · yêu cầu FR-RPT-01 · FR-RPT-03 · TBL-REPORT-01 · actor mọi người dùng nội bộ đang hoạt động, cả 7 vai trò | - | true | 1.1; 1.2; 1.3 | 26 | 22 | 1026 | 139 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-25 · Danh mục báo cáo | - | false | - | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-033 Khung báo cáo dùng chung · FE-034 Nhóm báo cáo ngày · FN-10 Báo cáo và xuất dữ liệu · ưu tiên P0 · yêu cầu FR-RPT-01; FR-RPT-03; TBL-REPORT-01 · actor mọi người dùng nội bộ đang hoạt động | - | false | - | 26 | 60 | 1026 | 116 |
| 1.3 | 1 | img-004 | Nhãn trạng thái thi công | Đã dựng | - | false | - | 324 | 96 | 376 | 116 |
| 2 | - | img-005 | Khối điểm vào chung của 12 báo cáo bắt buộc | Điểm vào chung — 12 báo cáo bắt buộc của TBL-REPORT-01 | - | true | 2.1; 2.2 | 26 | 155 | 1026 | 637 |
| 2.1 | 2 | img-006 | Bảng danh mục báo cáo năm cột | Mã · Báo cáo bắt buộc · Tần suất · Bộ lọc · Nhóm FE — đúng 12 dòng RPT-01 đến RPT-12 | - | true | 2.1.1; 2.1.2 | 42 | 200 | 1010 | 574 |
| 2.1.1 | 2.1 | img-007 | Hàng tiêu đề năm cột | Mã / Báo cáo bắt buộc / Tần suất / Bộ lọc / Nhóm FE | - | false | - | 43 | 200 | 1010 | 227 |
| 2.1.2 | 2.1 | img-008 | Dòng báo cáo (đại diện cho 12 dòng) | RPT-01 / Tổng hợp giao dịch theo từng ngày nghiệp vụ / Hàng ngày / Ngày nghiệp vụ / FE-034 | - | false | - | 43 | 227 | 1010 | 256 |
| 2.2 | 2 | img-009 | Ghi chú ràng buộc nguyên trạng danh mục | Bảng này là bản sao nguyên trạng của TBL-REPORT-01: đúng 12 dòng, không thêm không bớt. Bấm mã là sang SC-26 để chạy báo cáo đó. Cột Bộ lọc nói bộ lọc bắt buộc của mã theo yêu cầu khách, và phải cùng một nguồn với form lọc ở SC-26 — không phải hai câu mô tả rời nhau | - | false | - | 42 | 577 | 1010 | 610 |
| 3 | - | img-010 | Khối khung dùng chung cho cả 12 mã | FE-033 · Khung dùng chung cho cả 12 mã | - | true | 3.1; 3.2; 3.3; 3.4 | 26 | 650 | 1026 | 858 |
| 3.1 | 3 | img-011 | Trường cơ chế bộ lọc dùng chung | Bộ lọc — Một form, chỉ hiện field mà mã đang xem khai — Field lấy đúng theo cột Bộ lọc của TBL-REPORT-01. Chi tiết ở SC-26 | - | false | - | 42 | 694 | 357 | 789 |
| 3.2 | 3 | img-012 | Trường cơ chế phân trang dùng chung | Phân trang — Kích thước trang cố định, số trang đi qua URL — Cùng một cơ chế cho mọi mã, kể cả nhóm báo cáo tháng | - | false | - | 368 | 694 | 684 | 789 |
| 3.3 | 3 | img-013 | Trường cơ chế xuất CSV dùng chung | Xuất CSV — Lấy toàn bộ tập đã lọc, không giới hạn theo trang — Nghiệm thu FR-RPT-01: đủ trường bắt buộc và xuất được CSV | - | false | - | 695 | 694 | 1010 | 789 |
| 3.4 | 3 | img-014 | Ghi chú ranh giới phạm vi báo cáo | Ranh giới phạm vi (FR-RPT-03, FN-10): danh mục này chính là toàn bộ bề mặt báo cáo — Chủ đầu tư không yêu cầu công cụ tự tạo báo cáo. Người dùng không tự dựng template, không tự chọn cột, không tự đặt bộ lọc mới. Thêm mã thứ 13 là việc phát triển, không phải việc cấu hình | - | false | - | 42 | 799 | 1010 | 831 |
| 4 | - | img-015 | Khối trạng thái màn | Trạng thái | - | true | 4.1; 4.2; 4.3; 4.4; 4.5; 4.6; 4.7 | 26 | 871 | 1026 | 1107 |
