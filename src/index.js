export default {
  async fetch(request, env, ctx) {
    // Thiết lập CORS để web frontend có thể gọi được
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/chat') {
      try {
        const body = await request.json();
        const message = body.message;

        // Lấy API Key từ biến môi trường (Bảo mật)
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("Chưa cấu hình GEMINI_API_KEY trên Cloudflare Dashboard"); 
        const model = "gemini-1.5-flash";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        // Gọi API Google Gemini trực tiếp bằng fetch
        const geminiRes = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: "Bạn là trợ lý ảo AI trên Website FPT Telecom. Hãy trả lời cực kỳ ngắn gọn, súc tích, thân thiện bằng tiếng Việt. Nếu không rõ, hãy yêu cầu khách hàng để lại SĐT." }]
            },
            contents: [
              {
                role: "user",
                parts: [{ text: message }]
              }
            ]
          })
        });

        if (!geminiRes.ok) {
          const errText = await geminiRes.text();
          throw new Error('Lỗi từ Gemini API: ' + errText);
        }

        const data = await geminiRes.json();
        const reply = data.candidates[0].content.parts[0].text;

        return new Response(JSON.stringify({ reply }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (error) {
        console.error("Lỗi:", error);
        return new Response(JSON.stringify({ error: "Hệ thống AI đang bận hoặc quá tải. Vui lòng thử lại sau!" }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response("API hoạt động bình thường!", { headers: corsHeaders });
  },
};
