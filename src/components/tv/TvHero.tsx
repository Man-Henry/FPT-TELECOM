import React from 'react';
import Image from 'next/image';
import { Play, Home, CheckCircle2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function TvHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-900 text-white">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
        {/* TODO: Thay bằng ảnh thật từ CMS/CDN */}
        <Image
          src="/images/hero-truyen-hinh-fpt.jpg"
          alt="Truyền hình FPT Play"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="text-slate-300">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center hover:text-white transition-colors">
                <Home className="h-4 w-4 mr-1" />
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-400" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white font-semibold">Truyền Hình FPT Play</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400 mb-6 backdrop-blur-sm">
            <Play className="mr-2 h-4 w-4 fill-current" />
            Không Giới Hạn Giải Trí
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Thế Giới Giải Trí Đỉnh Cao Cùng <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">FPT Play</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Sở hữu bản quyền UEFA, V-League, AFC và hàng vạn giờ phim điện ảnh đặc sắc. Trải nghiệm xem truyền hình tương tác mượt mà trên mọi thiết bị.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8">
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Gần 200 kênh truyền hình</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>1 tài khoản xem trên 3 thiết bị</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Kho phim HBO Go, DANET</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave transition */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-[50px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,121.22,201.2,110.5,242.42,104.3,283.47,84.81,321.39,56.44Z"
            className="fill-background"
          ></path>
        </svg>
      </div>
    </section>
  );
}
