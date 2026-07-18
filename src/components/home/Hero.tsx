'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

function scrollToDangKy() {
  const element = document.getElementById('dang-ky');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Hero() {
  return (
    <section className="relative flex h-[80vh] max-h-[800px] min-h-[600px] w-full items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#0A1128]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 hidden h-full w-full object-cover opacity-25 md:block"
        >
          <source
            src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/videos/hero-fpt.mp4'}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 h-full w-full bg-[url('/images/hero-internet-fpt.jpg')] bg-cover bg-center opacity-25 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/60 via-[#0A1128]/80 to-[#0A1128]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white md:px-6">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          Internet Cáp Quang FPT <br className="hidden md:block" />
          <span className="text-primary">
            Tốc Độ Vượt Trội
          </span>
        </h1>

        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg md:text-xl">
          Lắp đặt mạng FPT toàn quốc. Miễn phí Modem Wi-Fi 6, trang bị đầu thu FPT Play 4K. Hỗ trợ
          sự cố kỹ thuật 24/7.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground h-13 w-full rounded-lg px-8 text-base font-semibold hover:bg-primary/90 sm:w-auto"
            onClick={scrollToDangKy}
          >
            Nhận báo giá ngay
          </Button>
          <Link
            href="/goi-combo#khuyen-mai"
            className="focus-visible:ring-ring/50 inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-8 text-base font-medium text-slate-300 transition-colors outline-none hover:bg-white/[0.08] focus-visible:ring-3 sm:w-auto"
          >
            Xem khuyến mãi <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="from-background absolute right-0 bottom-0 left-0 z-0 h-32 bg-gradient-to-t to-transparent" />
    </section>
  );
}
