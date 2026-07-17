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
      'Kho Highlights, Tạp chí thể thao'
    ],
    popular: false,
    color: 'bg-emerald-500'
  },
  {
    name: 'Gói MAX',
    price: '88.000đ',
    description: 'Gói giải trí tiêu chuẩn cho cá nhân và gia đình nhỏ.',
    features: [
      'Gần 200 kênh truyền hình',
      'Độc quyền thể thao UEFA',
      'Kho phim điện ảnh, anime',
      'Xem đồng thời 3 thiết bị'
    ],
    popular: true,
    color: 'bg-orange-500'
  },
  {
    name: 'Gói VIP',
    price: '120.000đ',
    description: 'Trải nghiệm đỉnh cao không giới hạn cho cả gia đình.',
    features: [
      'Đầy đủ quyền lợi Gói MAX',
      'Tích hợp HBO Go, K+',
      'Không quảng cáo',
      'Xem đồng thời 5 thiết bị'
    ],
    popular: false,
    color: 'bg-purple-600'
  }
];

export function TvPricing() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Bảng Giá Cước FPT Play
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hàng ngàn giờ giải trí đỉnh cao đang chờ đón bạn. Đăng ký một lần, xem trên đa nền tảng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tvPlans.map((plan, index) => (
            <div key={index} className={cn(
              "relative flex flex-col p-8 rounded-3xl border bg-card transition-all hover:shadow-xl hover:-translate-y-1",
              plan.popular ? "border-orange-500 shadow-lg shadow-orange-500/10 scale-100 md:scale-105 z-10" : "border-border"
            )}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md">
                  Phổ Biến Nhất
                </div>
              )}
              
              <div className="mb-6 text-center border-b border-border/50 pb-6">
                <h3 className={cn("text-2xl font-bold mb-2", plan.popular ? "text-orange-600" : "text-foreground")}>
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 h-10">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground font-medium">/ tháng</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={cn("p-1 rounded-full shrink-0 mt-0.5", plan.popular ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600")}>
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-muted-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#dang-ky" className={cn(
                buttonVariants({ variant: plan.popular ? 'default' : 'outline' }),
                "w-full h-12 rounded-xl text-base font-semibold transition-all",
                plan.popular ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/20" : ""
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
