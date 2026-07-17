'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import fpPromise from '@fingerprintjs/fingerprintjs';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { leadFormSchema, SERVICE_OPTIONS, type LeadFormData } from '@/lib/validations/lead';

export function LeadFormInner() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  // zodResolver infer LeadFormData — khớp 1-1 với useForm<LeadFormData>
  // Không cần as any vì z.boolean().refine() giữ type boolean cho consent
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      // service: omitted → undefined → Select hiển thị placeholder
      address: '',
      package: '',
      notes: '',
      consent: false,
      honeypot: '',
    },
  });

  // Xử lý Submit
  async function onSubmit(values: LeadFormData) {
    // Honeypot check (nếu bot điền vào trường ẩn này, chặn lại)
    if (values.honeypot) {
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Get Fingerprint ID
      let visitorId = 'unknown';
      try {
        const fp = await fpPromise.load();
        const result = await fp.get();
        visitorId = result.visitorId;
      } catch {
        // Silent fail — không log ra console để tránh lộ cơ chế bảo mật
      }

      // 2. Execute reCAPTCHA
      let recaptchaToken = '';
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha('submit_lead');
      }

      const payload = {
        ...values,
        source: 'WEBSITE' as const,
        recaptchaToken,
        visitorId,
      };

      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Lỗi gửi dữ liệu, vui lòng thử lại sau.');
      }

      setShowSuccess(true);
      form.reset();
    } catch (error: unknown) {
      setErrorMsg(error instanceof Error ? error.message : 'Đã xảy ra lỗi.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="dang-ky" className="py-24 bg-slate-50 dark:bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto bg-white dark:bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-border/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Đăng Ký Khảo Sát Hạ Tầng & Báo Giá
            </h2>
            <p className="text-muted-foreground">
              Để lại thông tin, nhân viên FPT Telecom sẽ liên hệ tư vấn miễn phí cho bạn trong vòng 5 phút.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Field Ẩn chống Spam (Honeypot) */}
              <div className="hidden" aria-hidden="true">
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Không điền vào trường này</FormLabel>
                      <FormControl>
                        <Input tabIndex={-1} autoComplete="off" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và Tên <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Nguyễn Văn A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="0987654321" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dịch vụ quan tâm <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn dịch vụ bạn muốn đăng ký" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Internet Cáp Quang">Internet Cáp Quang</SelectItem>
                        <SelectItem value="Truyền Hình FPT Play">Truyền Hình FPT Play</SelectItem>
                        <SelectItem value="Combo Internet + Truyền Hình">Combo Internet + Truyền Hình</SelectItem>
                        <SelectItem value="Camera FPT">Camera FPT</SelectItem>
                        <SelectItem value="Khác">Khác / Cần tư vấn thêm</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ lắp đặt <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện" {...field} />
                    </FormControl>
                    <FormDescription>
                      FPT cần địa chỉ chính xác để kiểm tra hạ tầng cáp quang tuyến đường nhà bạn.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="package"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gói cước quan tâm (Tùy chọn)</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: Gói SUPER 200, Gói F-Safe..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Nếu chưa rõ, nhân viên sẽ tư vấn gói phù hợp khi liên hệ.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú thêm (Tùy chọn)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Bạn muốn lắp cho nhà riêng, quán cafe, hay chung cư..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Tôi đồng ý với{' '}
                        <a href="/chinh-sach-bao-mat" className="text-orange-600 hover:underline" target="_blank">
                          Chính sách bảo mật
                        </a>{' '}
                        và cho phép FPT Telecom liên hệ tư vấn. <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription>
                        Bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {errorMsg && (
                <div className="text-sm font-medium text-red-500 bg-red-50 dark:bg-red-950/50 p-3 rounded-md">
                  {errorMsg}
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg shadow-orange-500/30" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isSubmitting ? 'Đang gửi yêu cầu...' : 'Gửi Yêu Cầu Tư Vấn'}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2">Đăng ký thành công!</DialogTitle>
            <DialogDescription className="text-base">
              Cảm ơn bạn đã quan tâm đến dịch vụ của FPT Telecom. Yêu cầu của bạn đã được ghi nhận. Chuyên viên tư vấn sẽ liên hệ lại qua số điện thoại bạn cung cấp trong thời gian sớm nhất (thường là 5 phút).
            </DialogDescription>
          </DialogHeader>
          <Button type="button" variant="secondary" onClick={() => setShowSuccess(false)} className="mt-6 w-full">
            Đóng
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function LeadForm() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <LeadFormInner />
    </GoogleReCaptchaProvider>
  );
}
