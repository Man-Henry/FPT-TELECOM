/**
 * Cloudflare Worker — FPT Telecom · CA TRỰC TRÊN TELEGRAM + HYBRID AI (D1)
 * 
 * Bindings: DB (D1)
 * Secrets: ADMIN_TOKEN, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */

const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const SYSTEM_INSTRUCTION = `Bạn là "Trợ lý ảo FPT Telecom" — nhân viên tư vấn thân thiện, chuyên nghiệp, nhiệt tình.
- Tư vấn dịch vụ FPT Telecom: internet cáp quang (FTTH), truyền hình FPT Play, camera FPT, FPT Smart Home, các gói combo.
- Gợi ý gói cước theo nhu cầu (số người dùng; mục đích: học tập, làm việc, chơi game, xem phim...).
- Giải thích rõ ràng, dễ hiểu cho khách hàng phổ thông.
- LUÔN trả lời bằng TIẾNG VIỆT, giọng gần gũi, lịch sự, dùng emoji vừa phải; ngắn gọn, xuống dòng khi liệt kê.
- KHÔNG bịa giá cước/khuyến mãi cụ thể. Nếu khách hỏi giá chính xác, đưa khoảng giá tham khảo.
- Luôn kết thúc bằng một câu hỏi gợi mở để tiếp tục hỗ trợ.`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS },
  });

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function checkAdmin(request, env) {
  const h = request.headers.get("Authorization") || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  return safeEqual(token, env.ADMIN_TOKEN || "");
}

const clip = (s, n = 2000) => (typeof s === "string" ? s.slice(0, n) : "");

// Hàm chống HTML Injection
function escapeHTML(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Hàm mã hóa/che giấu dữ liệu nhạy cảm (PII)
function maskSensitiveData(text) {
  if (typeof text !== "string") return "";
  
  const excludedPhones = ["0358513269", "0383900321", "+84358513269", "+84383900321"];
  
  // Mã hóa email (ví dụ: abc@gmail.com -> a**@gmail.com)
  let masked = text.replace(/([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (match, p1, p2) => {
    if (p1.length <= 2) return `***@${p2}`;
    return `${p1.slice(0, 2)}***@${p2}`;
  });

  // Mã hóa số điện thoại VN (10 số, bắt đầu bằng 0 hoặc +84)
  masked = masked.replace(/(?:(?:\+84|0)[35789]\d{8})/g, (match) => {
    if (excludedPhones.includes(match)) {
      return match;
    }
    if (match.startsWith('+84')) {
      return match.slice(0, 6) + "***" + match.slice(-3);
    }
    return match.slice(0, 4) + "***" + match.slice(-3);
  });

  return masked;
}

const SESSION_TIMEOUT_MS = 5 * 60 * 1000; // 5 phút

// Bộ nhớ đệm tạm thời cho Rate Limiting chống spam (giới hạn theo IP)
const rateLimitMap = new Map();

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (!env.DB) return json({ error: "Thiếu binding D1." }, 500);

    const url = new URL(request.url);
    const p = url.pathname;

    // Lấy IP khách hàng
    const clientIP = request.headers.get("CF-Connecting-IP") || "unknown";

    try {
      // ========== 1. TẠO BẢNG (gọi 1 lần) ==========
      if (p === "/api/_migrate") {
        if (!checkAdmin(request, env)) return json({ error: "Sai mật khẩu." }, 401);
        
        // Chạy từng lệnh riêng biệt để tránh lỗi parse của D1 exec()
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS sessions (
             id TEXT PRIMARY KEY,
             status TEXT NOT NULL DEFAULT 'active',
             created_at INTEGER NOT NULL,
             last_active_at INTEGER NOT NULL
          )
        `).run();

        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS messages (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             session_id TEXT NOT NULL,
             sender TEXT NOT NULL,
             text TEXT NOT NULL,
             created_at INTEGER NOT NULL
          )
        `).run();

        await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_session ON messages(session_id, id)`).run();
        await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status, last_active_at)`).run();
        
        return json({ ok: true, note: "Bảng đã sẵn sàng (sessions + messages)." });
      }

      // ========== 2. ĐÓNG PHIÊN CHỦ ĐỘNG (Switch về AI) ==========
      if (p === "/api/close" && request.method === "POST") {
        const { session } = await request.json();
        const sid = clip(session, 64);
        if (!sid) return json({ error: "Thiếu phiên" }, 400);

        // Đóng session trên D1
        await env.DB.prepare("UPDATE sessions SET status = 'closed' WHERE id = ?").bind(sid).run();

        // Báo nhân viên
        await sendTelegram(env, env.TELEGRAM_CHAT_ID, `⚠️ Khách (SS: ${sid}) đã rời khỏi Live Chat và quay lại với AI.`, null);
        return json({ ok: true });
      }

      // ========== 3. KHÁCH GỬI TIN ==========
      if (p === "/api/chat" && request.method === "POST") {

        // Rate Limiter cơ bản (10 tin / phút)
        const nowMs = Date.now();
        const rp = rateLimitMap.get(clientIP) || { count: 0, resetAt: nowMs + 60000 };
        if (nowMs > rp.resetAt) {
          rp.count = 1;
          rp.resetAt = nowMs + 60000;
        } else {
          rp.count++;
        }
        rateLimitMap.set(clientIP, rp);

        // Nếu env.RATE_LIMITER được cấu hình, dùng cái của Cloudflare (cao cấp)
        if (env.RATE_LIMITER) {
          const { success } = await env.RATE_LIMITER.limit({ key: clientIP });
          if (!success) return json({ error: "Gửi quá nhanh. Vui lòng chậm lại!" }, 429);
        } else {
          // Dùng Rate limit Map in-memory
          if (rp.count > 15) return json({ error: "Gửi quá nhanh. Vui lòng chậm lại!" }, 429);
        }

        const { session, text, history = [], mode } = await request.json();
        const sid = clip(session, 64), body = clip(text).trim();
        if (!sid || !body) return json({ error: "Thiếu phiên hoặc nội dung." }, 400);

        // NẾU LÀ CHẾ ĐỘ LIVE CHAT
        if (mode === "live") {
          const sess = await env.DB.prepare("SELECT id, status FROM sessions WHERE id = ?").bind(sid).first();
          let isNewLiveSession = false;

          if (!sess || sess.status === "closed") {
            await env.DB.prepare(
              `INSERT OR REPLACE INTO sessions (id, status, created_at, last_active_at) VALUES (?, 'active', ?, ?)`
            ).bind(sid, nowMs, nowMs).run();
            isNewLiveSession = true;
          } else {
            await env.DB.prepare("UPDATE sessions SET last_active_at = ? WHERE id = ?").bind(nowMs, sid).run();
          }

          const maskedBody = maskSensitiveData(body);
          await env.DB.prepare("INSERT INTO messages (session_id, sender, text, created_at) VALUES (?,?,?,?)").bind(sid, "visitor", maskedBody, nowMs).run();

          // Gửi thông báo đến Admin
          let textToSend = `🔔 <b>Khách</b> (SS: ${sid})\n\n${escapeHTML(body)}`;

          if (isNewLiveSession && history.length > 0) {
            const recentChat = history.slice(-4).map(h =>
              `[${h.role === 'model' ? 'AI' : 'Khách'}]: ${escapeHTML(h.text)}`
            ).join("\n");
            textToSend = `🚨 <b>Yêu cầu hỗ trợ trực tiếp!</b> (SS: ${sid})\n\n<b>Lịch sử chat AI gần nhất:</b>\n<i>${recentChat}</i>\n\n<b>Khách nhắn:</b> ${escapeHTML(body)}`;
          }

          await sendTelegram(env, env.TELEGRAM_CHAT_ID, textToSend, sid);
          return json({ ok: true });
        }

        // NẾU LÀ CHẾ ĐỘ AI
        else {
          if (!env.AI) return json({ error: "Thiếu binding Workers AI." }, 500);

          const messages = [
            { role: "system", content: SYSTEM_INSTRUCTION },
            ...history
              .filter(h => (h.role === "user" || h.role === "model") && typeof h.text === "string")
              .map(h => ({ role: h.role === "model" ? "assistant" : "user", content: h.text })),
            { role: "user", content: body },
          ];

          const out = await env.AI.run(MODEL, { messages, max_tokens: 600 });
          const reply = out?.response || out?.choices?.[0]?.message?.content || "";

          if (!reply) return json({ error: "Xin lỗi, trợ lý AI đang bận." }, 500);
          return json({ reply });
        }
      }

      // ========== 4. KHÁCH POLL ==========
      if (p === "/api/poll" && request.method === "GET") {
        const sid = clip(url.searchParams.get("session"), 64);
        const after = parseInt(url.searchParams.get("after") || "0", 10) || 0;
        if (!sid) return json({ messages: [], closed: true });

        const now = Date.now();
        const sess = await env.DB.prepare("SELECT id, status, last_active_at FROM sessions WHERE id = ?").bind(sid).first();

        if (!sess || sess.status === "closed") {
          return json({ messages: [], closed: true, reason: "session_closed" });
        }

        const elapsed = now - sess.last_active_at;
        if (elapsed > SESSION_TIMEOUT_MS) {
          // Tự động đóng phiên
          await env.DB.prepare("UPDATE sessions SET status = 'closed' WHERE id = ?").bind(sid).run();

          // BÁO CHO ADMIN RẰNG KHÁCH ĐÃ ĐÓNG PHIÊN
          await sendTelegram(env, env.TELEGRAM_CHAT_ID, `⚠️ Hệ thống tự động đóng phiên <b>${sid}</b> do khách không tương tác quá 5 phút.`, null);

          return json({
            messages: [],
            closed: true,
            reason: "timeout",
            inactive_minutes: Math.round(elapsed / 60000)
          });
        }

        await env.DB.prepare("UPDATE sessions SET last_active_at = ? WHERE id = ?").bind(now, sid).run();

        const rows = await env.DB.prepare(
          "SELECT id, text, created_at FROM messages WHERE session_id=? AND sender='owner' AND id>? ORDER BY id"
        ).bind(sid, after).all();

        return json({ messages: rows.results || [], closed: false });
      }

      // ========== 5. TELEGRAM WEBHOOK TỔNG HỢP (Message + Callback Query) ==========
      if (p === "/telegram" && request.method === "POST") {
        const body = await request.json();

        // 5.1. XỬ LÝ CALLBACK QUERY (Khi Admin bấm nút Inline Keyboard)
        if (body.callback_query) {
          const cb = body.callback_query;
          if (!cb?.data) return json({ ok: true });

          const [action, sessionId] = cb.data.split(":");
          if (action === "reply") {
            await sendTelegram(env, cb.message.chat.id, `👉 <b>Đang reply khách ${sessionId}</b>\nGõ câu trả lời ngay dưới tin này:`, null);
          } else if (action === "copy") {
            await sendTelegram(env, cb.message.chat.id, `📋 Session ID: <code>${sessionId}</code>`, null);
          }

          // Trả lời Telegram thật nhanh để hết quay vòng (spinner)
          const token = env.TELEGRAM_BOT_TOKEN;
          await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ callback_query_id: cb.id, text: action === "reply" ? `Reply khách ${sessionId}` : "Đã copy SS" }),
          });

          return json({ ok: true });
        }

        // 5.2. XỬ LÝ TIN NHẮN BÌNH THƯỜNG
        const msg = body.message || body.edited_message;
        if (!msg || !msg.text) return json({ ok: true });

        // Bỏ qua các tin nhắn hệ thống sinh ra từ callback
        if (msg.text.startsWith("👉") || msg.text.includes("Đang reply khách")) {
          return json({ ok: true });
        }

        let sessionId = null;
        if (msg.reply_to_message?.text) {
          const m = msg.reply_to_message.text.match(/SS:\s*([a-zA-Z0-9-_]+)/);
          if (m) sessionId = clip(m[1], 64);
        }
        if (!sessionId) {
          const m = msg.text.match(/SS:\s*([a-zA-Z0-9-_]+)/);
          if (m) sessionId = clip(m[1], 64);
        }

        if (!sessionId) {
          await sendTelegram(env, msg.chat.id, `⚠️ Không xác định được khách. Vui lòng <b>reply vào đúng tin</b>.`, null);
          return json({ ok: true });
        }

        const sess = await env.DB.prepare("SELECT id, status FROM sessions WHERE id = ?").bind(sessionId).first();

        if (!sess || sess.status === "closed") {
          await sendTelegram(env, msg.chat.id, `⚠️ Phiên <b>${sessionId}</b> đã đóng. Tin nhắn của bạn không được gửi.`, null);
          return json({ ok: true });
        }

        const replyText = clip(msg.text).trim();
        await env.DB.prepare("INSERT INTO messages (session_id, sender, text, created_at) VALUES (?,?,?,?)").bind(sessionId, "owner", replyText, Date.now()).run();
        await env.DB.prepare("UPDATE sessions SET last_active_at = ? WHERE id = ?").bind(Date.now(), sessionId).run();

        await sendTelegram(env, msg.chat.id, `✅ Đã gửi cho khách <b>${sessionId}</b>:\n${escapeHTML(replyText.slice(0, 80))}${replyText.length > 80 ? "…" : ""}`, null);
        return json({ ok: true });
      }

      // ========== 6. ĐĂNG KÝ WEBHOOK TỪ ADMIN ==========
      if (p === "/_setup-telegram") {
        const token = env.TELEGRAM_BOT_TOKEN;
        if (!token) return json({ error: "Chưa đặt TELEGRAM_BOT_TOKEN." }, 400);
        const webhookUrl = `${url.origin}/telegram`;
        const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: webhookUrl,
            allowed_updates: ["message", "callback_query"],
          }),
        });
        return res.ok ? json({ ok: true, note: "Webhook Telegram đã kích hoạt." }) : json({ error: "Lỗi webhook." }, 500);
      }

      return json({ error: "Not Found" }, 404);
    } catch (err) {
      return json({ error: "Lỗi máy chủ: " + (err?.message || err) }, 500);
    }
  },
};

// ========== HÀM GỬI TELEGRAM ==========
async function sendTelegram(env, chatId, text, sessionId = null) {
  const token = env.TELEGRAM_BOT_TOKEN;
  if (!token || !chatId) return;
  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const payload = {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    };
    if (sessionId) {
      payload.reply_markup = {
        inline_keyboard: [[
          { text: "↩️ Reply khách này", callback_data: `reply:${sessionId}` },
          { text: "📋 Copy SS", callback_data: `copy:${sessionId}` },
        ]],
      };
    }
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("Telegram error:", e);
  }
}
