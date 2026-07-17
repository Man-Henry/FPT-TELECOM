'use client';

import React from 'react';
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
      'Đàm thoại 2 chiều'
    ],
    icon: <Wifi className="h-5 w-5" />
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
      'Cảnh báo thông minh AI'
    ],
    popular: true,
    icon: <ShieldCheck className="h-5 w-5" />
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
      'Nhận diện khuôn mặt AI'
    ],
    icon: <Cloud className="h-5 w-5" />
  }
];

export function CameraProducts() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Giải Pháp Camera Cho Mọi Nhu Cầu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hệ thống giám sát an ninh thông minh, lắp đặt nhanh chóng, hỗ trợ bảo trì suốt đời.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cameraProducts.map((product, index) => (
            <div key={index} className={cn(
              "relative flex flex-col rounded-3xl border bg-card transition-all hover:shadow-xl overflow-hidden",
              product.popular ? "border-sky-500 shadow-lg shadow-sky-500/10" : "border-border"
            )}>
              {product.popular && (
                <div className="absolute top-4 right-4 bg-sky-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md z-10">
                  Khuyên dùng
                </div>
              )}
              
              <div className="h-48 overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 text-sky-600 dark:text-sky-400">
                  {product.icon}
                  <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{product.description}</p>
                
                <div className="flex items-baseline gap-2 mb-6 border-b border-border/50 pb-6">
                  <span className="text-3xl font-extrabold text-foreground">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground font-medium line-through">{product.originalPrice}</span>
                  )}
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-sky-100 text-sky-600 shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-muted-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="#dang-ky" className={cn(
                  buttonVariants({ variant: product.popular ? 'default' : 'outline' }),
                  "w-full h-12 rounded-xl text-base font-semibold transition-all",
                  product.popular ? "bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/20" : ""
                )}>
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
