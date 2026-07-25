export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/chat") {
      try {
        const body = await request.json();
        
        // Gọi thẳng AI của Cloudflare (Miễn phí 100%, không cần API Key)
        const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
            messages: [
                { role: "system", content: "Bạn là trợ lý AI trên Website FPT Telecom. Hãy trả lời cực kỳ ngắn gọn, thân thiện bằng tiếng Việt. Báo giá Internet từ 195.000đ/tháng." },
                { role: "user", content: body.message }
            ]
        });

        return new Response(JSON.stringify({ reply: response.response }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Lỗi Backend: " + error.message }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }
    return new Response("API hoạt động bình thường!", { headers: corsHeaders });
  }
};