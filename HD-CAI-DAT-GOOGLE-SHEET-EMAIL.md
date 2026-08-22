# 📋 HƯỚNG DẪN CÀI ĐẶT LƯU LEAD GOOGLE SHEET & BÁO EMAIL TỨC THÌ

Hệ thống đã được lập trình sẵn để tự động bắt thông tin khi khách bấm **"Đăng ký ngay"** ở bất kỳ gói cước nào, sau đó gửi thẳng về **Google Sheet** và **Email** của bạn trong 3 giây.

---

## 🚀 Các bước cài đặt nhanh (Mất 2 phút)

### Bước 1: Mở Google Sheet
1. Truy cập [Google Sheets](https://sheets.google.com).
2. Tạo một trang tính trống mới (Đặt tên: `FPT Telecom - Khách Hàng 2026`).

---

### Bước 2: Dán mã Google Apps Script
1. Trên thanh công cụ Google Sheet, chọn: **Tiện ích mở rộng** *(Extensions)* ➔ **Apps Script**.
2. Xóa hết tất cả code mẫu có sẵn trong ô soạn thảo.
3. Mở tệp [`google-apps-script.js`](./google-apps-script.js) trong dự án của bạn, copy toàn bộ nội dung và dán vào Apps Script.
4. Kiểm tra dòng 28:
   ```javascript
   const EMAIL_RECEIVER = "tvm19624@gmail.com, mantv2@fpt.com";
   ```
   *(Thay đổi thành email bạn muốn nhận thông báo nếu cần)*.
5. Nhấn biểu tượng **Lưu** 💾 *(Ctrl + S)*.

---

### Bước 3: Triển khai ứng dụng Web (Deploy)
1. Nhấn nút xanh **Triển khai** *(Deploy)* ở góc trên bên phải ➔ Chọn **Tùy chọn triển khai mới** *(New deployment)*.
2. Bấm vào biểu tượng bánh răng bên trái dòng "Chọn loại" ➔ Chọn **Ứng dụng web** *(Web app)*.
3. Điền các trường cấu hình:
   - **Mô tả** *(Description)*: `FPT Telecom Lead Engine`
   - **Thực thi dưới dạng** *(Execute as)*: `Tôi (địa chỉ email của bạn)`
   - **Ai có quyền truy cập** *(Who has access)*: `Bất kỳ ai (Anyone)` ⚠️ *(Bắt buộc chọn Bất kỳ ai để website gửi dữ liệu được)*
4. Nhấn **Triển khai** *(Deploy)*.
5. Nhấn **Ủy quyền truy cập** *(Authorize access)*:
   - Chọn tài khoản Google của bạn.
   - Nếu hiện cảnh báo *"Google chưa xác minh ứng dụng này"*, bấm vào chữ **Nâng cao** *(Advanced)* ở dưới góc trái.
   - Bấm tiếp vào dòng **Đi tới ... (không an toàn)** *(Go to ... unsafe)*.
   - Nhấn **Cho phép** *(Allow)*.

---

### Bước 4: Hoàn tất
1. Copy đường link **URL ứng dụng web** *(URL kết thúc bằng `/exec`)*.
2. Mở file [`js/script.js`](./js/script.js), dán URL vừa copy vào dòng cấu hình:
   ```javascript
   const GOOGLE_SHEETS_ENDPOINT = "URL_APPS_SCRIPT_CUA_BAN_O_DAY";
   ```
3. Chạy file `push_code.bat` để đẩy lên Website!

---

## 🎯 Kết quả nhận được:
1. **Google Sheet**: Tự động tạo bảng cột màu xanh chuyên nghiệp, lưu: *Thời gian, Họ tên, Số điện thoại (giữ số 0 đầu), Địa chỉ, Tên gói cước đã bấm, Ghi chú, Thời gian hẹn gọi, Tọa độ GPS*.
2. **Email thông báo**: Nhận ngay 1 email HTML sang trọng màu xanh - cam FPT, kèm nút **"BẤM ĐỂ GỌI TƯ VẤN NGAY"** giúp bạn liên hệ khách hàng ngay lập tức khi họ vừa gửi form.
