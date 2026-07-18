'use client';

import React from 'react';
import Image from 'next/image';
import { Check, ShieldCheck, Cloud, Wifi } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const cameraProducts = [
  {
    name: 'Camera Trong Nhà (Indoor)',
    price: '800.000đ',
    originalPrice: '1.200.000đ',
    image: '/images/camera/camera-indoor-fpt.jpg',
    description: 'Thiết kế tinh tế, góc nhìn siêu rộng 102 độ, hỗ trợ đàm thoại 2 chiều.',
    features: [
      'Độ phân giải Full HD 1080p',
      'Hồng ngoại ban đêm 10m',
      'Kết nối Wi-Fi / LAN',
      'Đàm thoại 2 chiều',
    ],
    icon: <Wifi className="h-4 w-4" />,
  },
  {
    name: 'Camera Ngoài Trời (Outdoor)',
    price: '900.000đ',
    originalPrice: '1.300.000đ',
    image: '/images/camera/camera-outdoor-fpt.jpg',
    description: 'Bền bỉ trước mọi thời tiết. Chuẩn kháng nước, kháng bụi IP66.',
    features: [
      'Kháng nước IP66',
      'Chống chịu nhiệt độ 75°C',
      'Hồng ngoại ban đêm 20m',
      'Cảnh báo thông minh AI',
    ],
    popular: true,
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    name: 'Gói Lưu Trữ Cloud IQ',
    price: '44.000đ',
    originalPrice: '',
    image: '/images/camera/cloud-iq-fpt.jpg',
    description: 'Dữ liệu lưu trữ an toàn tuyệt đối trên server FPT tại Việt Nam.',
    features: [
      'Lưu trữ xem lại 3-7 ngày',
      'Không lo mất dữ liệu do trộm/hỏng',
      'Bảo mật 2 lớp an toàn',
      'Nhận diện khuôn mặt AI',
    ],
    icon: <Cloud className="h-4 w-4" />,
  },
];

export function CameraProducts() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Camera Cho Mọi Nhu Cầu
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Giám sát an ninh thông minh, lắp đặt nhanh chóng.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cameraProducts.map((product, index) => (
            <div
              key={index}
              className={cn(
                'relative flex flex-col overflow-hidden rounded-xl border',
                product.popular
                  ? 'border-primary/30 bg-[#0F1A2E]'
                  : 'border-white/[0.06] bg-[#0C1524]',
              )}
            >
              {product.popular && (
                <div className="bg-primary text-primary-foreground absolute top-3 right-3 z-10 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase">
                  Khuyên dùng
                </div>
              )}

              <div className="group relative h-44 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="text-muted-foreground mb-2 flex items-center gap-2">
                  {product.icon}
                  <h3 className="text-foreground text-lg font-bold">{product.name}</h3>
                </div>
                <p className="text-muted-foreground mb-4 min-h-[36px] text-sm">
                  {product.description}
                </p>

                <div className="mb-5 flex items-baseline gap-2 border-b border-white/[0.06] pb-5">
                  <span className="text-foreground text-2xl font-extrabold">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground text-sm line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                <ul className="mb-6 flex-1 space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="text-primary/50 mt-0.5 h-4 w-4 shrink-0" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#dang-ky"
                  className={cn(
                    buttonVariants({ variant: product.popular ? 'default' : 'outline' }),
                    'h-11 w-full rounded-lg font-semibold',
                    product.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-white/[0.06] text-slate-300 hover:bg-white/[0.04]',
                  )}
                >
                  Mua Ngay
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
