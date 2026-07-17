// ============================================================
// Zod Validation Schemas — Lead Form
// ============================================================
// SOURCE OF TRUTH cho validation — Shared giữa Frontend và Backend.
// Field names PHẢI khớp 1-1 với Prisma schema (fullName, service, notes).
// ============================================================

import { z } from 'zod';

// Regex SĐT Việt Nam (cập nhật 2026)
// Đầu số: 03x, 05x, 07x, 08x, 09x
const phoneRegex = /^(0)(3|5|7|8|9)\d{8}$/;

// Danh sách dịch vụ — dùng chung cho form Select + Zod enum
export const SERVICE_OPTIONS = [
  'Internet cáp quang',
  'Truyền hình FPT Play',
  'Camera FPT',
  'Gói Combo',
  'Khác',
] as const;

// --- Schema cho Frontend Form (React Hook Form) ---
export const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự')
    .trim(),

  phone: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ (VD: 0901234567)').trim(),

  service: z.enum(SERVICE_OPTIONS, {
    message: 'Vui lòng chọn dịch vụ quan tâm',
  }),

  address: z
    .string()
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    .max(200, 'Địa chỉ không được quá 200 ký tự')
    .trim(),

  package: z.string().max(100).trim().optional(),

  notes: z.string().max(500, 'Ghi chú không được quá 500 ký tự').trim().optional(),

  consent: z.boolean().refine((val) => val === true, {
    message: 'Bạn cần đồng ý với Chính sách bảo mật để tiếp tục',
  }),

  // Honeypot field — phải rỗng, nếu có giá trị = bot
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Input type — dùng cho React Hook Form defaultValues
// z.input = type TRƯỚC khi validate (consent: boolean thay vì true)
export type LeadFormInput = z.input<typeof leadFormSchema>;

// --- Schema cho API validation (backend) ---
// Bao gồm recaptchaToken bắt buộc + visitorId
export const leadApiSchema = leadFormSchema.extend({
  recaptchaToken: z.string().min(1, 'reCAPTCHA token is required'),
  visitorId: z.string().optional(),
});

export type LeadApiData = z.infer<typeof leadApiSchema>;
