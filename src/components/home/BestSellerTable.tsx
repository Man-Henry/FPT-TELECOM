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
    <section className="py-24 bg-white dark:bg-zinc-950 border-t border-border/50 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-orange-500/10 dark:bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Bảng Giá Internet Nổi Bật
          </h2>
          <p className="text-lg text-muted-foreground">
            So sánh các gói cước bán chạy nhất. Chọn gói phù hợp với số lượng thiết bị và nhu cầu sử dụng của bạn.
          </p>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
          <div className="flex gap-6 mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col w-[300px] sm:w-[340px] shrink-0 snap-center rounded-3xl border bg-card p-8 shadow-sm transition-transform hover:-translate-y-1",
                  plan.recommended ? "border-orange-500 ring-2 ring-orange-500/20 shadow-orange-500/10 shadow-xl" : "border-border"
                )}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase shadow-sm">
                    Khuyên Dùng
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="text-4xl font-extrabold text-orange-600 dark:text-orange-400 mb-2">
                    {plan.speed}
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xl font-semibold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/tháng</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between text-sm py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Thiết bị khuyên dùng</span>
                      <span className="font-medium text-foreground">{plan.devices}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Mesh Wi-Fi (Mua thêm)</span>
                      <span className="font-medium text-foreground">
                        {plan.mesh ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-slate-300 dark:text-slate-700" />
                        )}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <Check className="mr-3 h-5 w-5 text-orange-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#dang-ky"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    "w-full rounded-full font-semibold transition-all",
                    plan.recommended
                      ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200"
                  )}
                >
                  Đăng ký ngay
                </Link>

                {/* Offer Schema */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Offer",
                      "name": `Gói cước ${plan.name} - ${plan.speed}`,
                      "price": plan.price.replace(/\D/g, ''),
                      "priceCurrency": "VND",
                      "availability": "https://schema.org/InStock",
                      "description": plan.features.join('. ')
                    })
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
