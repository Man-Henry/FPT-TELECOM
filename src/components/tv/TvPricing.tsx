'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const tvPlans = [
  {
    name: 'Gói SPORT',
    price: '73.000đ',
    description: 'Chuyên biệt dành cho tín đồ thể thao chân chính.',
    features: [
      'Trực tiếp UEFA Champions League',
      'Độc quyền V-League, AFC',
      'Xem đồng thời 1 thiết bị',
      'Kho Highlights, Tạp chí thể thao',
    ],
    popular: false,
    color: 'bg-emerald-500',
  },
  {
    name: 'Gói MAX',
    price: '88.000đ',
    description: 'Gói giải trí tiêu chuẩn cho cá nhân và gia đình nhỏ.',
    features: [
      'Gần 200 kênh truyền hình',
      'Độc quyền thể thao UEFA',
      'Kho phim điện ảnh, anime',
      'Xem đồng thời 3 thiết bị',
    ],
    popular: true,
    color: 'bg-orange-500',
  },
  {
    name: 'Gói VIP',
    price: '120.000đ',
    description: 'Trải nghiệm đỉnh cao không giới hạn cho cả gia đình.',
    features: [
      'Đầy đủ quyền lợi Gói MAX',
      'Tích hợp HBO Go, K+',
      'Không quảng cáo',
      'Xem đồng thời 5 thiết bị',
    ],
    popular: false,
    color: 'bg-purple-600',
  },
];

export function TvPricing() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Bảng Giá Cước FPT Play
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Hàng ngàn giờ giải trí đỉnh cao đang chờ đón bạn. Đăng ký một lần, xem trên đa nền tảng.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {tvPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                'bg-card relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl',
                plan.popular
                  ? 'z-10 scale-100 border-orange-500 shadow-lg shadow-orange-500/10 md:scale-105'
                  : 'border-border',
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-md">
                  Phổ Biến Nhất
                </div>
              )}

              <div className="border-border/50 mb-6 border-b pb-6 text-center">
                <h3
                  className={cn(
                    'mb-2 text-2xl font-bold',
                    plan.popular ? 'text-orange-600' : 'text-foreground',
                  )}
                >
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-4 h-10 text-sm">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-foreground text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground font-medium">/ tháng</span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className={cn(
                        'mt-0.5 shrink-0 rounded-full p-1',
                        plan.popular
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-green-100 text-green-600',
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-muted-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#dang-ky"
                className={cn(
                  buttonVariants({ variant: plan.popular ? 'default' : 'outline' }),
                  'h-12 w-full rounded-xl text-base font-semibold transition-all',
                  plan.popular
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20 hover:bg-orange-700'
                    : '',
                )}
              >
                Đăng Ký {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
