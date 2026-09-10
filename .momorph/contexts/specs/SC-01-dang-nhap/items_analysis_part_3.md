# Items Analysis - SC-01 Đăng nhập

- Nguồn: ảnh `.momorph/shots/SC-01-dang-nhap.png` (1280x1892; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-01-dang-nhap-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 3/3

### Item 7: Khối ghi chú phân quyền và yêu cầu khách

- **nameJP**: 権限と顧客要件の注記
- **nameTrans**: Permission and requirement footnote
- **itemType**: label
- **itemSubtype**: footer_note
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: chốt phân quyền của màn và nối từng khối về đúng phần nghiệm thu của FR-IAM-01 (RFP:627)
  - Thành phần hiển thị: ba đoạn chú thích: phân quyền; yêu cầu khách màn này thoả kèm nguyên văn nghiệm thu; và liên kết tới bản as-built
  - Chức năng và logic: khối 1 lo nhánh từ chối; khối 2 lo "vào được đúng khu vực làm việc"; khối 3 lo "và có log" — đây là màn duy nhất trong 32 màn không có cổng xác thực
- **qa**: - Màn công khai này có cần chống truy cập tự động ở mức nào không? NFR-SEC-03 (RFP:811) chỉ đòi khoá tạm theo tài khoản; thiết kế không khai lớp chặn theo nguồn truy cập.
- **bbox**: startX=26 startY=1787 endX=1026 endY=1870

