'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const plans = [
  {
    name: 'Giga',
    speed: '150 Mbps',
    price: '185.000đ',
    devices: '1 - 3 thiết bị',
    mesh: false,
    recommended: false,
    features: [
      'Tốc độ Download/Upload: 150Mbps',
      'Modem Wi-Fi 6 2 băng tần',
      'Phù hợp cá nhân, gia đình nhỏ',
      'Lắp đặt miễn phí',
    ],
  },
  {
    name: 'Sky',
    speed: '1 Gbps / 150 Mbps',
    price: '225.000đ',
    devices: '4 - 10 thiết bị',
    mesh: true,
    recommended: true,
    features: [
      'Tốc độ Download lên đến 1Gbps',
      'Upload 150Mbps',
      'Trang bị 1 Modem Wi-Fi 6',
      'Phù hợp gia đình nhiều thiết bị, Livestream',
    ],
  },
  {
    name: 'Meta',
    speed: '1 Gbps',
    price: '325.000đ',
    devices: '10+ thiết bị',
    mesh: true,
    recommended: false,
    features: [
      'Tốc độ Download/Upload 1Gbps',
      'Trang bị Modem Wi-Fi 6',
      'Độ trễ thấp, tối ưu chơi Game',
      'Phù hợp Streamer, nhà rộng, quán cafe nhỏ',
    ],
  },
];

export function BestSellerTable() {
  return (
    <section className="border-border/50 relative overflow-hidden border-t bg-white py-24 dark:bg-zinc-950">
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-full max-w-3xl -translate-x-1/2 rounded-full bg-orange-500/10 blur-[100px] dark:bg-orange-500/5" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Bảng Giá Internet Nổi Bật
          </h2>
          <p className="text-muted-foreground text-lg">
            So sánh các gói cước bán chạy nhất. Chọn gói phù hợp với số lượng thiết bị và nhu cầu sử
            dụng của bạn.
          </p>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-8 md:mx-0 md:px-0">
          <div className="mx-auto flex gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  'bg-card relative flex w-[300px] shrink-0 snap-center flex-col rounded-3xl border p-8 shadow-sm transition-transform hover:-translate-y-1 sm:w-[340px]',
                  plan.recommended
                    ? 'border-orange-500 shadow-xl ring-2 shadow-orange-500/10 ring-orange-500/20'
                    : 'border-border',
                )}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-sm font-bold tracking-wide text-white uppercase shadow-sm">
                    Khuyên Dùng
                  </div>
                )}

                <div className="mb-6 text-center">
                  <h3 className="text-foreground mb-2 text-2xl font-bold">{plan.name}</h3>
                  <div className="mb-2 text-4xl font-extrabold text-orange-600 dark:text-orange-400">
                    {plan.speed}
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-foreground text-xl font-semibold">{plan.price}</span>
                    <span className="text-muted-foreground">/tháng</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-8 space-y-4">
                    <div className="border-border/50 flex items-center justify-between border-b py-2 text-sm">
                      <span className="text-muted-foreground">Thiết bị khuyên dùng</span>
                      <span className="text-foreground font-medium">{plan.devices}</span>
                    </div>
                    <div className="border-border/50 flex items-center justify-between border-b py-2 text-sm">
                      <span className="text-muted-foreground">Mesh Wi-Fi (Mua thêm)</span>
                      <span className="text-foreground font-medium">
                        {plan.mesh ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-slate-300 dark:text-slate-700" />
                        )}
                      </span>
                    </div>
                  </div>

                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-muted-foreground flex items-start text-sm">
                        <Check className="mr-3 h-5 w-5 shrink-0 text-orange-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#dang-ky"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'w-full rounded-full font-semibold transition-all',
                    plan.recommended
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 hover:bg-orange-600'
                      : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200',
                  )}
                >
                  Đăng ký ngay
                </Link>

                {/* Offer Schema */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      '@context': 'https://schema.org',
                      '@type': 'Offer',
                      name: `Gói cước ${plan.name} - ${plan.speed}`,
                      price: plan.price.replace(/\D/g, ''),
                      priceCurrency: 'VND',
                      availability: 'https://schema.org/InStock',
                      description: plan.features.join('. '),
                    }),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
