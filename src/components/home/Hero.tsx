'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] max-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Video (Desktop) / Image (Mobile) */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-60"
        >
          {/* TODO: Thay bằng video thật từ CDN/CMS */}
          <source src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/videos/hero-fpt.mp4'} type="video/mp4" />
        </video>
        {/* Placeholder image for mobile — TODO: Thay bằng ảnh hero thật */}
        <div 
          className="md:hidden absolute inset-0 w-full h-full bg-cover bg-center opacity-60 bg-[url('/images/hero-internet-fpt.jpg')]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-slate-900/50 to-slate-900/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-md">
          Internet Cáp Quang FPT <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Tốc Độ Vượt Trội
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-8 drop-shadow">
          Lắp đặt mạng FPT toàn quốc. Miễn phí Modem Wi-Fi 6, trang bị đầu thu FPT Play 4K. Hỗ trợ sự cố kỹ thuật 24/7.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-transform hover:scale-105 shadow-lg shadow-orange-500/30">
            Nhận báo giá ngay
          </Button>
          <Link href="/khuyen-mai" className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 px-8 text-lg font-medium rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            Xem khuyến mãi <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Fade overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
}
