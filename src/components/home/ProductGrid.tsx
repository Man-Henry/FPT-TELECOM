'use client';

import * as React from 'react';
import Link from 'next/link';
import { Wifi, Tv, Camera, PackagePlus, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

const products = [
  {
    title: 'Internet Cáp Quang',
    description: 'Tốc độ cực cao, kết nối ổn định cho gia đình và doanh nghiệp.',
    price: '195.000đ',
    icon: Wifi,
    href: '/internet-cap-quang',
    features: ['Modem ONT Wi-Fi 6 thế hệ mới', 'Băng thông từ 300 Mbps', 'Tặng 1-2 tháng cước'],
  },
  {
    title: 'Truyền Hình FPT Play',
    description: 'Hơn 200 kênh truyền hình đặc sắc và độc quyền UEFA Champions League.',
    price: '88.000đ',
    icon: Tv,
    href: '/truyen-hinh-fpt-play',
    features: ['200+ Kênh giải trí', 'Độc quyền thể thao', 'Xem trên đa thiết bị'],
  },
  {
    title: 'Camera FPT',
    description: 'Giải pháp an ninh thông minh, lưu trữ đám mây an toàn bảo mật.',
    price: '900.000đ',
    icon: Camera,
    href: '/camera-fpt',
    features: ['Hình ảnh Full HD 1080p', 'Cảnh báo thông minh', 'Lưu trữ Cloud an toàn'],
  },
  {
    title: 'Gói Combo Tiết Kiệm',
    description: 'Kết hợp hoàn hảo Internet và Truyền hình, tiết kiệm lên đến 30%.',
    price: '225.000đ',
    icon: PackagePlus,
    href: '/goi-combo',
    features: ['Internet Wi-Fi 6', 'Truyền hình FPT Play', 'Tặng tài khoản VIP'],
  },
];

export function ProductGrid() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Dịch Vụ Nổi Bật
          </h2>
          <p className="text-muted-foreground text-lg">
            Lựa chọn dịch vụ phù hợp nhất với nhu cầu của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className="group flex flex-col justify-between rounded-xl border border-white/[0.06] bg-[#0F1A2E] p-6 transition-colors hover:border-white/[0.1]"
              >
                <div>
                  <div className="text-muted-foreground mb-4 inline-flex rounded-lg bg-white/[0.04] p-2.5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-bold">{product.title}</h3>
                  <p className="text-muted-foreground mb-5 line-clamp-2 text-sm">
                    {product.description}
                  </p>

                  <div className="mb-5">
                    <span className="text-muted-foreground text-xs">Giá chỉ từ</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-primary text-xl font-bold">{product.price}</span>
                      <span className="text-muted-foreground text-xs">/tháng</span>
                    </div>
                  </div>

                  <ul className="mb-6 space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-muted-foreground flex items-center text-sm">
                        <div className="bg-primary/40 mr-2 h-1 w-1 shrink-0 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={product.href}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full border-white/[0.06] text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-white',
                  )}
                >
                  Xem chi tiết <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      '@context': 'https://schema.org',
                      '@type': 'Product',
                      name: product.title,
                      description: product.description,
                      brand: { '@type': 'Brand', name: siteConfig.name },
                      offers: {
                        '@type': 'Offer',
                        url: `${siteConfig.url}${product.href}`,
                        priceCurrency: 'VND',
                        price: product.price.replace(/\D/g, ''),
                        itemCondition: 'https://schema.org/NewCondition',
                        availability: 'https://schema.org/InStock',
                      },
                    }),
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
