import React from 'react';
import Image from 'next/image';
import { Camera, ShieldAlert, Cloud, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function CameraHero() {
  return (
    <section className="relative overflow-hidden bg-[#0A1128] pt-32 pb-20 text-white md:pt-40 md:pb-28">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/90 to-[#0A1128]/60" />
        <Image
          src="/images/hero-camera-fpt.jpg"
          alt="Camera An Ninh FPT"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-6">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="text-slate-500">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="flex items-center transition-colors hover:text-slate-300"
              >
                <Home className="mr-1 h-4 w-4" />
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-600" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-white">Camera FPT</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-3xl">
          <div className="text-primary mb-6 inline-flex items-center rounded-md bg-white/[0.04] px-3 py-1 text-sm font-medium">
            <Camera className="mr-2 h-4 w-4" />
            Giải Pháp An Ninh
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            FPT Camera IQ — <span className="text-primary">Giám Sát An Toàn</span> Bằng AI
          </h1>

          <p className="text-muted-foreground mb-8 max-w-2xl text-lg md:text-xl">
            Công nghệ AI nhận diện khuôn mặt, cảnh báo thông minh. Lưu trữ mã hoá an toàn trên Cloud
            Việt Nam.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/[0.04] p-2.5 text-slate-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">Cảnh Báo AI</span>
                <span className="text-sm text-slate-500">Phân biệt người/vật</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/[0.04] p-2.5 text-slate-400">
                <Cloud className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">Lưu Trữ Cloud</span>
                <span className="text-sm text-slate-500">Bảo mật chuẩn quốc tế</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 z-20 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-[50px] w-full md:h-[100px]"
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
