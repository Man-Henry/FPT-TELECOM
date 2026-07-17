import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { leadApiSchema } from '@/lib/validations/lead';
import { checkRateLimit } from '@/lib/rate-limit';

// Nội dung consent tại thời điểm hiện tại — lưu vào DB cho PDPA compliance
const CONSENT_TEXT = 'Tôi đồng ý với Chính sách bảo mật và cho phép FPT Telecom liên hệ tư vấn.';

export async function POST(request: Request) {
  try {
    // 0.1 CORS & User-Agent Check (Chống Bot & Spam)
    const origin = request.headers.get('origin') || request.headers.get('referer') || '';
    if (process.env.NODE_ENV === 'production' && !origin.includes('fpt-telecom.vn')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const blockedAgents = ['curl', 'python', 'wget', 'bot', 'scraper', 'postman'];
    if (!userAgent || blockedAgents.some((agent) => userAgent.toLowerCase().includes(agent))) {
      return NextResponse.json(
        { success: false, message: 'Trình duyệt không hợp lệ.' },
        { status: 403 },
      );
    }

    // 0.2 Rate Limiting — Upstash Redis (persistent across serverless invocations)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown-ip';

    const ipRateLimit = await checkRateLimit(`ip:${ip}`);
    if (!ipRateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.',
        },
        { status: 429 },
      );
    }

    const body = await request.json();

    // 0.25 Fingerprint Rate Limiting
    if (body.visitorId && body.visitorId !== 'unknown') {
      const fpRateLimit = await checkRateLimit(`fp:${body.visitorId}`);
      if (!fpRateLimit.success) {
        console.warn(`[Spam Blocked] Bot detected via fingerprint rate limit: ${body.visitorId}`);
        return NextResponse.json(
          {
            success: false,
            message: 'Hệ thống phát hiện dấu hiệu spam. Vui lòng thử lại sau.',
          },
          { status: 429 },
        );
      }
    }

    // 0.3 Honeypot Check (Bẫy Bot)
    if (body.honeypot) {
      console.warn(`[Spam Blocked] Bot detected via honeypot from IP: ${ip}`);
      // Trả về 200 để lừa bot, không lưu data
      return NextResponse.json({ success: true, message: 'OK' }, { status: 200 });
    }

    // 1. Verify reCAPTCHA (if configured)
    const recaptchaToken = body.recaptchaToken;
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

    if (recaptchaSecret && recaptchaToken) {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
      const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.error('reCAPTCHA failed:', recaptchaData);
        return NextResponse.json(
          { success: false, message: 'Xác thực reCAPTCHA thất bại. Vui lòng thử lại.' },
          { status: 400 },
        );
      }
    }

    // 2. Validate data — dùng SHARED schema từ validations/lead.ts
    //    leadApiSchema = leadFormSchema + recaptchaToken + visitorId
    const result = leadApiSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Dữ liệu không hợp lệ.',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    const validatedData = result.data;

    // 3. Format message for Telegram
    const message = `
🚨 <b>CÓ KHÁCH HÀNG ĐĂNG KÝ MỚI</b> 🚨
-------------------------------------
👤 <b>Họ tên:</b> ${validatedData.fullName}
📞 <b>SĐT:</b> ${validatedData.phone}
📦 <b>Dịch vụ quan tâm:</b> ${validatedData.service}
📍 <b>Địa chỉ:</b> ${validatedData.address}
📦 <b>Gói cước:</b> ${validatedData.package || 'Chưa chọn'}
📝 <b>Ghi chú:</b> ${validatedData.notes || 'Không có'}
✅ Đã đồng ý CSBM.
`;

    // 4. Save to Database (Primary Storage)
    try {
      await db.lead.create({
        data: {
          fullName: validatedData.fullName,
          phone: validatedData.phone,
          service: validatedData.service,
          address: validatedData.address,
          package: validatedData.package,
          notes: validatedData.notes,
          consent: validatedData.consent,
          consentText: CONSENT_TEXT,
          source: 'WEBSITE',
          ip: ip,
          visitorId: body.visitorId || null,
          userAgent: userAgent || null,
        },
      });
    } catch (dbError) {
      console.error('Database Save Error:', dbError);
      // Tiếp tục gửi Telegram nếu DB sập — để sale vẫn biết có khách
    }

    // 5. Send to Telegram
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramToken || !chatId) {
      console.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in .env.local');
      return NextResponse.json(
        {
          success: true,
          message: 'Dữ liệu đã được lưu thành công (Chưa cấu hình Telegram).',
        },
        { status: 200 },
      );
    }

    const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    // Inline Buttons cho Telegram (Nút "Gọi ngay", "Nhắn Zalo")
    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '📞 Gọi ngay', url: `tel:${validatedData.phone}` },
          { text: '💬 Nhắn Zalo', url: `https://zalo.me/${validatedData.phone}` },
        ],
      ],
    };

    const telegramRes = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard,
      }),
    });

    if (!telegramRes.ok) {
      const errText = await telegramRes.text();
      console.error('Lỗi khi gửi Telegram:', errText);
      // Không throw — data đã lưu DB, Telegram fail không nên crash response
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API /submit-lead error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi hệ thống.' },
      { status: 500 },
    );
  }
}
