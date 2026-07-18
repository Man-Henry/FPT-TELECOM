'use client';

import React from 'react';
import { Check, Plus, Wifi, Tv, Camera } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const comboPlans = [
  {
    name: 'Combo GIGA',
    price: '235.000đ',
    speed: '300 Mbps',
    description: 'Internet 300Mbps + FPT Play MAX',
    features: [
      'Trang bị Modem Wi-Fi 6',
      'Đầu thu FPT Play Box giọng nói',
      'Gần 200 kênh truyền hình',
      'Độc quyền thể thao UEFA',
    ],
    icons: [<Wifi key="w" className="h-4 w-4" />, <Tv key="t" className="h-4 w-4" />],
    popular: false,
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
    icons: [<Wifi key="w" className="h-4 w-4" />, <Tv key="t" className="h-4 w-4" />],
    popular: true,
  },
  {
    name: 'Combo 3-IN-1',
    price: '350.000đ',
    speed: '1 Gbps',
    description: 'Internet SKY + TV MAX + Camera IQ',
    features: [
      'Giải pháp toàn diện nhất',
      'Trang bị Modem Wi-Fi 6 & Tivi Box',
      'Tặng 01 Camera IQ trị giá 510.000đ',
      'Miễn phí triển khai toàn bộ',
    ],
    icons: [
      <Wifi key="w" className="h-4 w-4" />,
      <Tv key="t" className="h-4 w-4" />,
      <Camera key="c" className="h-4 w-4" />,
    ],
    popular: false,
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
            Kết hợp hoàn hảo, chi phí tiết kiệm tối đa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {comboPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                'relative flex flex-col rounded-xl border p-7',
                plan.popular
                  ? 'border-primary/30 bg-[#0F1A2E]'
                  : 'border-white/[0.06] bg-[#0C1524]',
              )}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold uppercase">
                  Đăng Ký Nhiều Nhất
                </div>
              )}

              <div className="mb-6 border-b border-white/[0.06] pb-6 text-center">
                <div className="mb-3 flex items-center justify-center gap-2 text-slate-500">
                  {plan.icons.map((icon, idx) => (
                    <React.Fragment key={idx}>
                      {icon}
                      {idx < plan.icons.length - 1 && <Plus className="mx-0.5 h-3 w-3" />}
                    </React.Fragment>
                  ))}
                </div>
                <h3
                  className={cn(
                    'mb-2 text-xl font-bold',
                    plan.popular ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {plan.name}
                </h3>
                <p className="text-primary mb-1 text-sm font-medium">{plan.speed}</p>
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

              <a
                href="#dang-ky"
                className={cn(
                  buttonVariants({ variant: plan.popular ? 'default' : 'outline' }),
                  'h-11 w-full rounded-lg font-semibold',
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border-white/[0.06] text-slate-300 hover:bg-white/[0.04]',
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
