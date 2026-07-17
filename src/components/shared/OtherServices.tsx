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
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
  },
  {
    name: 'Truyền Hình FPT Play',
    href: '/truyen-hinh-fpt-play',
    icon: <Tv className="h-6 w-6" />,
    description: 'Trực tiếp UEFA, hàng ngàn giờ phim',
    color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
  },
  {
    name: 'Camera Thông Minh',
    href: '/camera-fpt',
    icon: <Camera className="h-6 w-6" />,
    description: 'Cảnh báo AI, lưu trữ Cloud an toàn',
    color: 'text-sky-600 bg-sky-100 dark:bg-sky-900/30',
  },
  {
    name: 'Gói Combo Tiết Kiệm',
    href: '/goi-combo',
    icon: <Package className="h-6 w-6" />,
    description: 'Đa tiện ích trên một hoá đơn',
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
  },
];

export function OtherServices() {
  const pathname = usePathname();

  // Filter out the current page
  const otherServices = services.filter((service) => service.href !== pathname);

  return (
    <section className="dark:bg-background border-border/50 border-t bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight">
            Khám Phá Dịch Vụ Khác
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Giải pháp công nghệ toàn diện từ FPT Telecom đáp ứng mọi nhu cầu của bạn.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {otherServices.slice(0, 3).map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group border-border/50 hover:border-primary/50 flex flex-col rounded-2xl border bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900"
            >
              <div
                className={cn(
                  'mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
                  service.color,
                )}
              >
                {service.icon}
              </div>
              <h3 className="text-foreground group-hover:text-primary mb-2 text-xl font-bold transition-colors">
                {service.name}
              </h3>
              <p className="text-muted-foreground mb-6 flex-1 text-sm">{service.description}</p>
              <div className="text-primary mt-auto flex items-center text-sm font-semibold">
                Tìm hiểu thêm{' '}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
