'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex h-[80vh] max-h-[800px] min-h-[600px] w-full items-center justify-center overflow-hidden">
      {/* Background Video (Desktop) / Image (Mobile) */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 hidden h-full w-full object-cover opacity-60 md:block"
        >
          {/* TODO: Thay bằng video thật từ CDN/CMS */}
          <source
            src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/videos/hero-fpt.mp4'}
            type="video/mp4"
          />
        </video>
        {/* Placeholder image for mobile — TODO: Thay bằng ảnh hero thật */}
        <div className="absolute inset-0 h-full w-full bg-[url('/images/hero-internet-fpt.jpg')] bg-cover bg-center opacity-60 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-slate-900/50 to-slate-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white md:px-6">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight drop-shadow-md md:text-5xl lg:text-6xl">
          Internet Cáp Quang FPT <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Tốc Độ Vượt Trội
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 drop-shadow md:text-xl">
          Lắp đặt mạng FPT toàn quốc. Miễn phí Modem Wi-Fi 6, trang bị đầu thu FPT Play 4K. Hỗ trợ
          sự cố kỹ thuật 24/7.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="h-14 w-full rounded-full bg-orange-500 px-8 text-lg text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105 hover:bg-orange-600 sm:w-auto"
          >
            Nhận báo giá ngay
          </Button>
          <Link
            href="/khuyen-mai"
            className="focus-visible:ring-ring/50 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 text-lg font-medium text-white backdrop-blur-sm transition-colors outline-none hover:bg-white/20 focus-visible:ring-3 sm:w-auto"
          >
            Xem khuyến mãi <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Fade overlay at bottom */}
      <div className="from-background absolute right-0 bottom-0 left-0 z-0 h-32 bg-gradient-to-t to-transparent" />
    </section>
  );
}
