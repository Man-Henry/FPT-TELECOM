'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Wifi, Tv, Camera, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    name: 'Internet Cáp Quang',
    href: '/internet-cap-quang',
    icon: <Wifi className="h-6 w-6" />,
    description: 'Tốc độ siêu tốc, kết nối ổn định',
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
  },
  {
    name: 'Truyền Hình FPT Play',
    href: '/truyen-hinh-fpt-play',
    icon: <Tv className="h-6 w-6" />,
    description: 'Trực tiếp UEFA, hàng ngàn giờ phim',
    color: 'text-green-600 bg-green-100 dark:bg-green-900/30'
  },
  {
    name: 'Camera Thông Minh',
    href: '/camera-fpt',
    icon: <Camera className="h-6 w-6" />,
    description: 'Cảnh báo AI, lưu trữ Cloud an toàn',
    color: 'text-sky-600 bg-sky-100 dark:bg-sky-900/30'
  },
  {
    name: 'Gói Combo Tiết Kiệm',
    href: '/goi-combo',
    icon: <Package className="h-6 w-6" />,
    description: 'Đa tiện ích trên một hoá đơn',
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
  }
];

export function OtherServices() {
  const pathname = usePathname();
  
  // Filter out the current page
  const otherServices = services.filter(service => service.href !== pathname);

  return (
    <section className="py-24 bg-white dark:bg-background border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
            Khám Phá Dịch Vụ Khác
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giải pháp công nghệ toàn diện từ FPT Telecom đáp ứng mọi nhu cầu của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {otherServices.slice(0, 3).map((service, index) => (
            <Link 
              key={index} 
              href={service.href}
              className="group flex flex-col p-6 rounded-2xl border border-border/50 bg-slate-50 dark:bg-slate-900 hover:shadow-lg hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", service.color)}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-muted-foreground text-sm flex-1 mb-6">
                {service.description}
              </p>
              <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                Tìm hiểu thêm <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
