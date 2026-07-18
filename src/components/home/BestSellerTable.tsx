'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const plans = [
  {
    name: 'Giga',
    speed: '300 Mbps',
    price: '195.000đ',
    devices: '1 - 5 thiết bị',
    mesh: false,
    recommended: false,
    features: [
      'Tốc độ Download/Upload: 300Mbps',
      'Trang bị Modem Wifi tiêu chuẩn',
      'Phù hợp cá nhân, gia đình nhỏ',
      'Hỗ trợ kỹ thuật 24/7',
    ],
  },
  {
    name: 'Sky',
    speed: '1 Gbps / 300 Mbps',
    price: '195.000đ',
    devices: '4 - 10 thiết bị',
    mesh: true,
    recommended: true,
    features: [
      'Tốc độ Download lên đến 1Gbps',
      'Upload 300Mbps',
      'Trang bị Modem ONT Wifi 6 thế hệ mới',
      'Phù hợp gia đình nhiều thiết bị, Livestream',
    ],
  },
  {
    name: 'F-Game',
    speed: '1 Gbps / 300 Mbps',
    price: '225.000đ',
    devices: '5 - 15 thiết bị',
    mesh: true,
    recommended: false,
    features: [
      'Tốc độ Download lên đến 1Gbps',
      'Modem ONT Wifi 6 + Ultra Fast',
      'Tối ưu Gaming, độ trễ cực thấp',
      'Phù hợp Game thủ, Streamer',
    ],
  },
  {
    name: 'Meta',
    speed: '1 Gbps / 1 Gbps',
    price: '300.000đ',
    devices: '10+ thiết bị',
    mesh: true,
    recommended: false,
    features: [
      'Tốc độ Download/Upload đối xứng 1Gbps',
      'Trang bị Modem Wifi chịu tải cao',
      'Băng thông lớn, ổn định tuyệt đối',
      'Phù hợp nhà rộng, quán cafe, văn phòng nhỏ',
    ],
  },
];

export function BestSellerTable() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0A1128] py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Bảng Giá Internet
          </h2>
          <p className="text-muted-foreground text-lg">
            So sánh các gói cước bán chạy nhất.
          </p>
        </div>

        <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-8 md:mx-0 md:overflow-visible md:px-0">
          <div className="mx-auto flex gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  'relative flex w-[300px] shrink-0 snap-center flex-col rounded-xl border p-7 sm:w-[340px] md:w-full',
                  plan.recommended
                    ? 'border-primary/40 bg-[#0F1A2E]'
                    : 'border-white/[0.06] bg-[#0C1524]',
                )}
              >
                {plan.recommended && (
                  <div className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold uppercase">
                    Khuyên Dùng
                  </div>
                )}

                <div className="mb-6 text-center">
                  <h3 className="text-foreground mb-2 text-xl font-bold">{plan.name}</h3>
                  <div className="text-primary mb-2 text-3xl font-extrabold">{plan.speed}</div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-foreground text-lg font-semibold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">/tháng</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/[0.06] py-2 text-sm">
                      <span className="text-muted-foreground">Thiết bị</span>
                      <span className="text-foreground font-medium">{plan.devices}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/[0.06] py-2 text-sm">
                      <span className="text-muted-foreground">Mesh Wi-Fi</span>
                      <span>
                        {plan.mesh ? (
                          <Check className="h-4 w-4 text-emerald-500/70" />
                        ) : (
                          <X className="h-4 w-4 text-slate-600" />
                        )}
                      </span>
                    </div>
                  </div>

                  <ul className="mb-8 space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-muted-foreground flex items-start text-sm">
                        <Check className="text-primary/60 mr-2 h-4 w-4 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#dang-ky"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'w-full rounded-lg font-semibold',
                    plan.recommended
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]',
                  )}
                >
                  Đăng ký ngay
                </Link>

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
