var index_default = {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/chat") {
      try {
        const body = await request.json();
        const message = body.message;
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("Chưa cấu hình GEMINI_API_KEY trên Cloudflare Dashboard");

        // ✅ FIX 1: Sửa tên model
        const model = "gemini-1.5-flash";

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            // ✅ FIX 2: Sửa cấu trúc systemInstruction
            systemInstruction: {
              parts: [{ text: "Bạn là trợ lý AI trên Website FPT Telecom. Hãy trả lời cực kỳ ngắn gọn, súc tích, thân thiện bằng tiếng Việt. Nếu không rõ, hãy yêu cầu khách hàng để lại SĐT." }]
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
          throw new Error("Lỗi từ Gemini API: " + errText);
        }
        const data = await geminiRes.json();
        const reply = data.candidates[0].content.parts[0].text;
        return new Response(JSON.stringify({ reply }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error("Lỗi:", error);
        return new Response(JSON.stringify({ error: "Lỗi Backend: " + error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }
    return new Response("API hoạt động bình thường!", { headers: corsHeaders });
  }
};
export {
  index_default as default
};