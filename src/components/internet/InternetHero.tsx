import React from 'react';
import Image from 'next/image';
import { Wifi, ShieldCheck, Zap, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function InternetHero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 pt-32 pb-20 text-white md:pt-40 md:pb-28">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-800/90 to-transparent" />
        {/* TODO: Thay bằng ảnh thật từ CMS/CDN */}
        <Image
          src="/images/hero-internet-fpt.jpg"
          alt="Internet Cáp Quang FPT"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-6">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="text-slate-300">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="flex items-center transition-colors hover:text-white"
              >
                <Home className="mr-1 h-4 w-4" />
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-400" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-white">
                Internet Cáp Quang
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400 backdrop-blur-sm">
            <Zap className="mr-2 h-4 w-4" />
            Băng thông không giới hạn
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Lắp Mạng Internet Cáp Quang{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              FPT Telecom
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Trải nghiệm tốc độ Wi-Fi 6 đỉnh cao, đường truyền cáp quang ổn định 100%, đáp ứng mọi
            nhu cầu từ giải trí gia đình đến vận hành doanh nghiệp.
          </p>

          <div className="mt-12 flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 backdrop-blur-sm">
                <Wifi className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Wi-Fi 6</span>
                <span className="text-sm text-slate-400">Thiết bị thế hệ mới</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400 backdrop-blur-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Bảo Mật F-Safe</span>
                <span className="text-sm text-slate-400">An toàn lướt web</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave transition to next section */}
      <div className="absolute right-0 bottom-0 left-0 z-20 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-[50px] w-full md:h-[100px]"
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
