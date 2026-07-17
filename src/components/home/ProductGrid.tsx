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
    price: '185.000đ',
    icon: Wifi,
    href: '/internet-cap-quang',
    features: ['Wi-Fi 6 thế hệ mới', 'Không giới hạn băng thông', 'Tặng 1-2 tháng cước'],
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-950',
  },
  {
    title: 'Truyền Hình FPT Play',
    description: 'Hơn 200 kênh truyền hình đặc sắc và độc quyền UEFA Champions League.',
    price: '88.000đ',
    icon: Tv,
    href: '/truyen-hinh-fpt-play',
    features: ['200+ Kênh giải trí', 'Độc quyền thể thao', 'Xem trên đa thiết bị'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
  },
  {
    title: 'Camera FPT',
    description: 'Giải pháp an ninh thông minh, lưu trữ đám mây an toàn bảo mật.',
    price: '900.000đ',
    icon: Camera,
    href: '/camera-fpt',
    features: ['Hình ảnh Full HD 1080p', 'Cảnh báo thông minh', 'Lưu trữ Cloud an toàn'],
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-950',
  },
  {
    title: 'Gói Combo Tiết Kiệm',
    description: 'Kết hợp hoàn hảo Internet và Truyền hình, tiết kiệm lên đến 30%.',
    price: '225.000đ',
    icon: PackagePlus,
    href: '/goi-combo',
    features: ['Internet Wi-Fi 6', 'Truyền hình FPT Play', 'Tặng tài khoản VIP'],
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-950',
  },
];

export function ProductGrid() {
  return (
    <section className="dark:bg-background bg-slate-50 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Dịch Vụ Nổi Bật Của FPT Telecom
          </h2>
          <p className="text-muted-foreground text-lg">
            Lựa chọn dịch vụ phù hợp nhất với nhu cầu của bạn. Trải nghiệm công nghệ vượt trội cùng
            FPT.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className="group dark:bg-card border-border/50 relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="p-6 pb-0">
                  <div
                    className={cn(
                      'mb-4 inline-flex rounded-xl p-3',
                      product.bgColor,
                      product.color,
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-2 text-xl font-bold">{product.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2 h-10 text-sm">
                    {product.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-muted-foreground text-sm font-medium">Giá chỉ từ</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {product.price}
                      </span>
                      <span className="text-muted-foreground text-sm">/tháng</span>
                    </div>
                  </div>

                  <ul className="mb-8 space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-foreground flex items-center text-sm">
                        <div className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto p-6 pt-0">
                  <Link
                    href={product.href}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-full transition-colors group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-600 dark:group-hover:bg-orange-950/30',
                    )}
                  >
                    Xem chi tiết <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                {/* Schema Markup per Product */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      '@context': 'https://schema.org',
                      '@type': 'Product',
                      name: product.title,
                      description: product.description,
                      brand: {
                        '@type': 'Brand',
                        name: siteConfig.name,
                      },
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
