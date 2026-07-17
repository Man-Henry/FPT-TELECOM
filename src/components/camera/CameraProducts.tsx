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
    image: '/images/camera/camera-indoor-fpt.jpg', // TODO: Thay bằng ảnh sản phẩm thật
    description: 'Thiết kế tinh tế, góc nhìn siêu rộng 102 độ, hỗ trợ đàm thoại 2 chiều.',
    features: [
      'Độ phân giải Full HD 1080p',
      'Hồng ngoại ban đêm 10m',
      'Kết nối Wi-Fi / LAN',
      'Đàm thoại 2 chiều',
    ],
    icon: <Wifi className="h-5 w-5" />,
  },
  {
    name: 'Camera Ngoài Trời (Outdoor)',
    price: '900.000đ',
    originalPrice: '1.300.000đ',
    image: '/images/camera/camera-outdoor-fpt.jpg', // TODO: Thay bằng ảnh sản phẩm thật
    description: 'Bền bỉ trước mọi thời tiết. Chuẩn kháng nước, kháng bụi IP66.',
    features: [
      'Kháng nước IP66',
      'Chống chịu nhiệt độ 75°C',
      'Hồng ngoại ban đêm 20m',
      'Cảnh báo thông minh AI',
    ],
    popular: true,
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    name: 'Gói Lưu Trữ Cloud IQ',
    price: '44.000đ',
    originalPrice: '',
    image: '/images/camera/cloud-iq-fpt.jpg', // TODO: Thay bằng ảnh sản phẩm thật
    description: 'Dữ liệu lưu trữ an toàn tuyệt đối trên server FPT tại Việt Nam.',
    features: [
      'Lưu trữ xem lại 3-7 ngày',
      'Không lo mất dữ liệu do trộm/hỏng',
      'Bảo mật 2 lớp an toàn',
      'Nhận diện khuôn mặt AI',
    ],
    icon: <Cloud className="h-5 w-5" />,
  },
];

export function CameraProducts() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Giải Pháp Camera Cho Mọi Nhu Cầu
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Hệ thống giám sát an ninh thông minh, lắp đặt nhanh chóng, hỗ trợ bảo trì suốt đời.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cameraProducts.map((product, index) => (
            <div
              key={index}
              className={cn(
                'bg-card relative flex flex-col overflow-hidden rounded-3xl border transition-all hover:shadow-xl',
                product.popular ? 'border-sky-500 shadow-lg shadow-sky-500/10' : 'border-border',
              )}
            >
              {product.popular && (
                <div className="absolute top-4 right-4 z-10 rounded-full bg-sky-500 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase shadow-md">
                  Khuyên dùng
                </div>
              )}

              <div className="group relative h-48 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-black/10 transition-colors group-hover:bg-transparent" />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-8">
                <div className="mb-3 flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  {product.icon}
                  <h3 className="text-foreground text-xl font-bold">{product.name}</h3>
                </div>

                <p className="text-muted-foreground mb-4 min-h-[40px] text-sm">
                  {product.description}
                </p>

                <div className="border-border/50 mb-6 flex items-baseline gap-2 border-b pb-6">
                  <span className="text-foreground text-3xl font-extrabold">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground font-medium line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-4">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 rounded-full bg-sky-100 p-1 text-sky-600">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-muted-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#dang-ky"
                  className={cn(
                    buttonVariants({ variant: product.popular ? 'default' : 'outline' }),
                    'h-12 w-full rounded-xl text-base font-semibold transition-all',
                    product.popular
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20 hover:bg-sky-700'
                      : '',
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
