// ============================================================
// Zod Validation Schemas — Lead Form
// ============================================================
// Shared giữa Frontend (React Hook Form) và Backend (API Route).
// ============================================================

import { z } from 'zod';

// Regex SĐT Việt Nam (cập nhật 2026)
// Đầu số: 03x, 05x, 07x, 08x, 09x
const phoneRegex = /^(0)(3|5|7|8|9)\d{8}$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự')
    .trim(),

  phone: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ (VD: 0901234567)').trim(),

  need: z.enum(['Internet cáp quang', 'Truyền hình FPT Play', 'Camera FPT', 'Gói Combo', 'Khác'], {
    message: 'Vui lòng chọn nhu cầu',
  }),

  address: z
    .string()
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    .max(200, 'Địa chỉ không được quá 200 ký tự')
    .trim()
    .optional(),

  package: z.string().max(100).trim().optional(),

  note: z.string().max(500, 'Ghi chú không được quá 500 ký tự').trim().optional(),

  consent: z.literal(true, {
    message: 'Bạn cần đồng ý với Chính sách bảo mật để tiếp tục',
  }),

  // reCAPTCHA token (auto-filled by frontend)
  recaptchaToken: z.string().min(1, 'Xác thực reCAPTCHA thất bại').optional(),

  // Honeypot field (phải rỗng — nếu có giá trị = bot)
  website: z.string().max(0, 'Spam detected').optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Schema cho API validation (bao gồm recaptchaToken bắt buộc)
export const leadApiSchema = leadFormSchema.extend({
  recaptchaToken: z.string().min(1, 'reCAPTCHA token is required'),
});

export type LeadApiData = z.infer<typeof leadApiSchema>;
