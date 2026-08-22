/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: TỰ ĐỘNG LƯU LEAD GOOGLE SHEET & BÁO EMAIL TỨC THÌ
 * Dành cho Website: FPT Telecom (https://fpttelecomvn.click/)
 * ==============================================================================
 *
 * HƯỚNG DẪN CÀI ĐẶT 1 LẦN DUY NHẤT (MẤT 2 PHÚT):
 *
 * BƯỚC 1: Tạo Google Sheet mới
 * - Truy cập: https://sheets.google.com -> Tạo 1 bảng tính mới (ví dụ đặt tên: "FPT Telecom - Khách Hàng 2026")
 *
 * BƯỚC 2: Mở trình soạn thảo Apps Script
 * - Trên thanh menu Google Sheet: Chọn "Tiện ích mở rộng" (Extensions) -> "Apps Script".
 * - Xóa sạch đoạn mã mặc định có sẵn (function myFunction() { ... }).
 * - Dán toàn bộ nội dung trong tệp này vào.
 * - Thay đổi email của bạn ở dòng 28: const EMAIL_RECEIVER = "tvm19624@gmail.com, mantv2@fpt.com";
 * - Nhấn biểu tượng "Lưu" (Save - Ctrl+S).
 *
 * BƯỚC 3: Triển khai Web App (Deploy)
 * - Nhấn nút màu xanh "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 * - Bấm vào biểu tượng bánh răng bên trái "Chọn loại" -> Chọn "Ứng dụng web" (Web app).
 * - Điền các mục như sau:
 *     + Mô tả (Description): FPT Lead Engine API
 *     + Thực thi dưới dạng (Execute as): "Tôi" (Me - email của bạn)
 *     + Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone)  <--- [BẮT BUỘC CHỌN MỤC NÀY]
 * - Nhấn nút "Triển khai" (Deploy).
 * - Nhấn "Ủy quyền truy cập" (Authorize access) -> Chọn tài khoản Google của bạn -> Bấm "Nâng cao" (Advanced) -> Chọn "Đi tới ... (không an toàn)" -> Bấm "Cho phép" (Allow).
 *
 * BƯỚC 4: Lấy URL Web App
 * - Copy đường link "URL ứng dụng web" (kết thúc bằng /exec).
 * - Dán URL này vào tệp `js/script.js` tại biến `GOOGLE_SHEETS_ENDPOINT`.
 * ==============================================================================
 */

// ĐIỀN EMAIL CỦA BẠN VÀO ĐÂY ĐỂ NHẬN THÔNG BÁO TỨC THÌ KHI CÓ KHÁCH ĐĂNG KÝ
const EMAIL_RECEIVER = "tvm19624@gmail.com";

function doPost(e) {
  const lock = LockService.getScriptLock();
  // Khóa tránh xung đột khi nhiều khách bấm đăng ký cùng 1 giây
  lock.tryLock(15000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName("Khách Hàng Đăng Ký");

    // Tự động tạo Sheet và Header nếu chưa có
    if (!sheet) {
      sheet = doc.insertSheet("Khách Hàng Đăng Ký");
      sheet.appendRow([
        "Thời Gian Đăng Ký",
        "Họ Và Tên",
        "Số Điện Thoại",
        "Địa Chỉ / Khu Vực",
        "Gói Cước Đăng Ký",
        "Ghi Chú / Nhu Cầu",
        "Thời Gian Hẹn Gọi",
        "Vị Trí / Tọa Độ (GPS)",
      ]);

      // Định dạng giao diện tiêu đề bảng tính
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0056d6");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160);
      sheet.setColumnWidth(2, 180);
      sheet.setColumnWidth(3, 150);
      sheet.setColumnWidth(4, 250);
      sheet.setColumnWidth(5, 200);
      sheet.setColumnWidth(6, 220);
      sheet.setColumnWidth(7, 160);
      sheet.setColumnWidth(8, 200);
    }

    const data = e.parameter || {};
    const now = Utilities.formatDate(
      new Date(),
      "GMT+7",
      "dd/MM/yyyy HH:mm:ss",
    );

    const name = data["Họ tên"] || data["name"] || "Khách Hàng";
    const phone = data["Số điện thoại"] || data["phone"] || "Chưa có";
    const address =
      data["Khu vực"] || data["address"] || data["Địa chỉ"] || "Chưa cung cấp";
    const pkg = data["Gói cước"] || data["package"] || "Tư vấn chung";
    const note = data["Ghi chú"] || data["note"] || "Không có";
    const timePref = data["Thời gian liên hệ"] || "Gọi ngay bây giờ";
    const location = data["Tọa độ"] || "Chưa xác định";

    // 1. LƯU DỮ LIỆU VÀO GOOGLE SHEET
    sheet.appendRow([
      now,
      name,
      "'" + phone, // Dấu nháy đơn giữ nguyên số 0 ở đầu số điện thoại
      address,
      pkg,
      note,
      timePref,
      location,
    ]);

    // 2. GỬI EMAIL THÔNG BÁO TỨC THÌ ĐẾN CHỦ WEBSITE
    if (EMAIL_RECEIVER && EMAIL_RECEIVER.includes("@")) {
      const emailSubject = `🔥 [FPT TELECOM] Khách mới: ${name} - Gói ${pkg} (${phone})`;

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, -apple-system, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
            .header { background: linear-gradient(135deg, #0056d6 0%, #002e7a 100%); color: #ffffff; padding: 25px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
            .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 24px; color: #1e293b; }
            .badge { display: inline-block; background: #ea580c; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 15px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .table td { padding: 12px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .table td.label { width: 140px; font-weight: bold; color: #64748b; }
            .table td.value { color: #0f172a; font-weight: 600; }
            .phone-box { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 12px 16px; margin: 20px 0; text-align: center; }
            .phone-link { font-size: 22px; font-weight: 800; color: #ea580c; text-decoration: none; display: inline-block; }
            .btn-call { display: block; width: 100%; background: #ea580c; color: #ffffff; text-align: center; padding: 14px 0; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin-top: 15px; }
            .footer { background: #f8fafc; padding: 14px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>⚡ CÓ KHÁCH HÀNG ĐĂNG KÝ MỚI!</h1>
              <p>Hệ thống tự động tiếp nhận khách hàng FPT Telecom</p>
            </div>
            <div class="content">
              <div class="badge">LEAD NÓNG CẦN GỌI NGAY</div>
              
              <div class="phone-box">
                <span style="font-size: 13px; color: #9a3412;">Số điện thoại khách hàng:</span><br>
                <a href="tel:${phone}" class="phone-link">${phone} 📞</a>
              </div>

              <table class="table">
                <tr>
                  <td class="label">👤 Họ và tên:</td>
                  <td class="value" style="font-size: 16px; color: #0056d6;">${name}</td>
                </tr>
                <tr>
                  <td class="label">📦 Gói cước:</td>
                  <td class="value" style="color: #ea580c; font-size: 15px;">${pkg}</td>
                </tr>
                <tr>
                  <td class="label">📍 Địa chỉ:</td>
                  <td class="value">${address}</td>
                </tr>
                <tr>
                  <td class="label">⏰ Hẹn gọi:</td>
                  <td class="value">${timePref}</td>
                </tr>
                <tr>
                  <td class="label">📝 Nhu cầu / Ghi chú:</td>
                  <td class="value">${note}</td>
                </tr>
                <tr>
                  <td class="label">🕒 Thời gian gửi:</td>
                  <td class="value" style="color: #64748b; font-weight: normal;">${now}</td>
                </tr>
                <tr>
                  <td class="label">🗺️ Vị trí GPS:</td>
                  <td class="value" style="color: #64748b; font-size: 12px; font-weight: normal;">${location}</td>
                </tr>
              </table>

              <a href="tel:${phone}" class="btn-call">BẤM ĐỂ GỌI TƯ VẤN NGAY 📲</a>
            </div>
            <div class="footer">
              Email được gửi tự động từ Website: https://fpttelecomvn.click/
            </div>
          </div>
        </body>
        </html>
      `;

      try {
        MailApp.sendEmail({
          to: EMAIL_RECEIVER,
          subject: emailSubject,
          htmlBody: emailHtml,
        });
      } catch (mailErr) {
        console.error("Lỗi gửi mail: " + mailErr);
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", data: data }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "running",
      message: "FPT Telecom Google Sheet & Email API is active!",
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}
