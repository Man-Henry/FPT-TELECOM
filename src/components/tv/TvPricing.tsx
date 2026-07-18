'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const tvPlans = [
  {
    name: 'Gói SPORT', price: '73.000đ', description: 'Chuyên biệt cho tín đồ thể thao.',
    features: ['Trực tiếp UEFA Champions League', 'Độc quyền V-League, AFC', 'Xem đồng thời 1 thiết bị', 'Kho Highlights thể thao'],
    popular: false,
  },
  {
    name: 'Gói MAX', price: '88.000đ', description: 'Gói tiêu chuẩn cho cá nhân và gia đình.',
    features: ['Gần 200 kênh truyền hình', 'Độc quyền thể thao UEFA', 'Kho phim điện ảnh, anime', 'Xem đồng thời 3 thiết bị'],
    popular: true,
  },
  {
    name: 'Gói VIP', price: '120.000đ', description: 'Trải nghiệm đỉnh cao không giới hạn.',
    features: ['Đầy đủ quyền lợi Gói MAX', 'Tích hợp HBO Go, K+', 'Không quảng cáo', 'Xem đồng thời 5 thiết bị'],
    popular: false,
  },
];

export function TvPricing() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">Bảng Giá FPT Play</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">Đăng ký một lần, xem trên đa nền tảng.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {tvPlans.map((plan, index) => (
            <div key={index} className={cn(
              'relative flex flex-col rounded-xl border p-7',
              plan.popular ? 'border-primary/30 bg-[#0F1A2E]' : 'border-white/[0.06] bg-[#0C1524]',
            )}>
              {plan.popular && (
                <div className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold uppercase">
                  Phổ Biến Nhất
                </div>
              )}

              <div className="mb-6 border-b border-white/[0.06] pb-6 text-center">
                <h3 className={cn('mb-2 text-xl font-bold', plan.popular ? 'text-primary' : 'text-foreground')}>{plan.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-foreground text-3xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground">/ tháng</span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="text-primary/50 mt-0.5 h-4 w-4 shrink-0" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#dang-ky" className={cn(
                buttonVariants({ variant: plan.popular ? 'default' : 'outline' }),
                'h-11 w-full rounded-lg font-semibold',
                plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-white/[0.06] text-slate-300 hover:bg-white/[0.04]',
              )}>
                Đăng Ký {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
