'use client';

import React from 'react';
import { Check, Plus, Wifi, Tv, Camera } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const comboPlans = [
  {
    name: 'Combo GIGA',
    price: '235.000đ',
    speed: '150 Mbps',
    description: 'Internet 150Mbps + FPT Play MAX',
    features: [
      'Trang bị Modem Wi-Fi 6',
      'Đầu thu FPT Play Box giọng nói',
      'Gần 200 kênh truyền hình',
      'Độc quyền thể thao UEFA',
    ],
    icons: [<Wifi key="w" className="h-5 w-5" />, <Tv key="t" className="h-5 w-5" />],
    popular: false,
    color: 'border-pink-500',
  },
  {
    name: 'Combo SKY',
    price: '285.000đ',
    speed: '1 Gbps',
    description: 'Internet Không Giới Hạn + FPT Play MAX',
    features: [
      'Tốc độ Download lên đến 1Gbps',
      'Trang bị Modem Wi-Fi 6 2 băng tần',
      'Đầu thu FPT Play Box giọng nói',
      'Gần 200 kênh truyền hình, UEFA',
    ],
    icons: [<Wifi key="w" className="h-5 w-5" />, <Tv key="t" className="h-5 w-5" />],
    popular: true,
    color: 'border-purple-600',
  },
  {
    name: 'Combo 3-IN-1',
    price: '350.000đ',
    speed: '1 Gbps',
    description: 'Internet SKY + TV MAX + Camera IQ',
    features: [
      'Giải pháp toàn diện nhất',
      'Trang bị Modem Wi-Fi 6 & Tivi Box',
      'Trang bị 01 Camera IQ thông minh',
      'Miễn phí triển khai toàn bộ',
    ],
    icons: [
      <Wifi key="w" className="h-5 w-5" />,
      <Tv key="t" className="h-5 w-5" />,
      <Camera key="c" className="h-5 w-5" />,
    ],
    popular: false,
    color: 'border-blue-600',
  },
];

export function ComboPricing() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Bảng Giá Gói Combo
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Sự kết hợp hoàn hảo mang lại trải nghiệm đỉnh cao với chi phí tiết kiệm tối đa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {comboPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                'bg-card relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl',
                plan.popular
                  ? 'z-10 scale-100 border-purple-600 shadow-lg shadow-purple-600/10 md:scale-105'
                  : 'border-border',
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-md">
                  Đăng Ký Nhiều Nhất
                </div>
              )}

              <div className="border-border/50 mb-6 border-b pb-6 text-center">
                <div className="mb-4 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
                  {plan.icons.map((icon, idx) => (
                    <React.Fragment key={idx}>
                      {icon}
                      {idx < plan.icons.length - 1 && <Plus className="mx-0.5 h-3 w-3" />}
                    </React.Fragment>
                  ))}
                </div>

                <h3
                  className={cn(
                    'mb-2 text-2xl font-bold',
                    plan.popular ? 'text-purple-600' : 'text-foreground',
                  )}
                >
                  {plan.name}
                </h3>
                <p className="mb-2 text-sm font-semibold text-orange-500">{plan.speed}</p>
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
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-pink-100 text-pink-600',
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
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 hover:bg-purple-700'
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
