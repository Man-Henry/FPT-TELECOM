'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Wifi, Tv, Camera, Package } from 'lucide-react';

const services = [
  {
    name: 'Internet Cáp Quang',
    href: '/internet-cap-quang',
    icon: <Wifi className="h-5 w-5" />,
    description: 'Tốc độ siêu tốc, kết nối ổn định',
  },
  {
    name: 'Truyền Hình FPT Play',
    href: '/truyen-hinh-fpt-play',
    icon: <Tv className="h-5 w-5" />,
    description: 'Trực tiếp UEFA, hàng ngàn giờ phim',
  },
  {
    name: 'Camera Thông Minh',
    href: '/camera-fpt',
    icon: <Camera className="h-5 w-5" />,
    description: 'Cảnh báo AI, lưu trữ Cloud an toàn',
  },
  {
    name: 'Gói Combo Tiết Kiệm',
    href: '/goi-combo',
    icon: <Package className="h-5 w-5" />,
    description: 'Đa tiện ích trên một hoá đơn',
  },
];

export function OtherServices() {
  const pathname = usePathname();
  const otherServices = services.filter((service) => service.href !== pathname);

  return (
    <section className="bg-background border-t border-white/[0.06] py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight">
            Khám Phá Dịch Vụ Khác
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Giải pháp công nghệ toàn diện từ FPT Telecom.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {otherServices.slice(0, 3).map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group flex flex-col rounded-xl border border-white/[0.06] bg-[#0F1A2E] p-6 transition-colors hover:border-white/[0.1]"
            >
              <div className="text-muted-foreground mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.04] transition-transform group-hover:scale-105">
                {service.icon}
              </div>
              <h3 className="text-foreground mb-2 text-lg font-bold">{service.name}</h3>
              <p className="text-muted-foreground mb-5 flex-1 text-sm">{service.description}</p>
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
