'use client';

import * as React from 'react';
import { MessageCircle, Send, ThumbsUp, Users } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export function CommunityHub() {
  return (
    <section className="py-24 bg-orange-600 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-black opacity-10 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <Users className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
            Tham Gia Cộng Đồng Khách Hàng FPT
          </h2>
          
          <p className="text-lg md:text-xl text-orange-100 mb-10 leading-relaxed">
            Nhận thông báo ưu đãi sớm nhất, hỗ trợ kỹ thuật ưu tiên và giao lưu cùng hơn <span className="font-bold text-white text-2xl mx-1">5,000+</span> thành viên đang sử dụng dịch vụ của FPT Telecom.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* 1. Zalo OA (Chính) */}
            <a href={siteConfig.social.zalo} target="_blank" rel="noreferrer" className={cn(buttonVariants({ size: 'lg' }), "w-full sm:w-auto h-14 px-8 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-transform hover:scale-105 shadow-lg shadow-blue-500/30")}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Tham gia Zalo OA
            </a>

            {/* 2. Facebook Group */}
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), "w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-white hover:bg-slate-100 text-blue-700 border-none transition-transform hover:scale-105 shadow-lg shadow-black/10")}>
              <ThumbsUp className="mr-2 h-5 w-5" />
              Group Facebook
            </a>

            {/* 3. Telegram Group */}
            <a href="https://t.me/fpt_telecom_group" target="_blank" rel="noreferrer" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), "w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-sky-500 hover:bg-sky-600 text-white border-none transition-transform hover:scale-105 shadow-lg shadow-sky-500/30")}>
              <Send className="mr-2 h-5 w-5" />
              Cộng đồng Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
