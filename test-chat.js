const message = "Xin chào, bạn có biết gói cước Internet nào rẻ nhất không?";

console.log("Đang gửi câu hỏi tới AI: ", message);
console.log("Vui lòng chờ...");

fetch('https://fpttelecomvn.tvm19624.workers.dev/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: message })
})
.then(async res => {
  const text = await res.text();
  if (res.status === 200) {
    console.log("\n✅ AI PHẢN HỒI THÀNH CÔNG:");
    console.log(text);
  } else {
    console.log("\n❌ CÓ LỖI XẢY RA (Mã lỗi: " + res.status + "):");
    console.log(text);
    if (text.includes("Chưa cấu hình GEMINI_API_KEY")) {
      console.log("=> Gợi ý: Bạn chưa thiết lập biến GEMINI_API_KEY trên Cloudflare Dashboard (hoặc quên tick Encrypt).");
    } else if (text.includes("API_KEY_INVALID")) {
      console.log("=> Gợi ý: API Key của bạn không hợp lệ hoặc bị sai. Vui lòng kiểm tra lại Google AI Studio.");
    }
  }
})
.catch(err => console.error("\n❌ KHÔNG THỂ KẾT NỐI TỚI SERVER:", err));
