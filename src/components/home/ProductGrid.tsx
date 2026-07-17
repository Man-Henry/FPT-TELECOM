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
    <section className="py-24 bg-slate-50 dark:bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Dịch Vụ Nổi Bật Của FPT Telecom
          </h2>
          <p className="text-lg text-muted-foreground">
            Lựa chọn dịch vụ phù hợp nhất với nhu cầu của bạn. Trải nghiệm công nghệ vượt trội cùng FPT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-card border border-border/50 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6 pb-0">
                  <div className={cn('inline-flex p-3 rounded-xl mb-4', product.bgColor, product.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 h-10 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-sm text-muted-foreground font-medium">Giá chỉ từ</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{product.price}</span>
                      <span className="text-sm text-muted-foreground">/tháng</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-foreground">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <Link href={product.href} className={cn(buttonVariants({ variant: 'outline' }), "w-full group-hover:bg-orange-50 dark:group-hover:bg-orange-950/30 group-hover:text-orange-600 group-hover:border-orange-200 transition-colors")}>
                    Xem chi tiết <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                {/* Schema Markup per Product */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Product",
                      "name": product.title,
                      "description": product.description,
                      "brand": {
                        "@type": "Brand",
                        "name": siteConfig.name
                      },
                      "offers": {
                        "@type": "Offer",
                        "url": `${siteConfig.url}${product.href}`,
                        "priceCurrency": "VND",
                        "price": product.price.replace(/\D/g, ''),
                        "itemCondition": "https://schema.org/NewCondition",
                        "availability": "https://schema.org/InStock"
                      }
                    })
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
