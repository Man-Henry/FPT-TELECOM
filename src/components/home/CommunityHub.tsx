'use client';

import * as React from 'react';
import { MessageCircle, Send, ThumbsUp, Users } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export function CommunityHub() {
  return (
    <section className="relative overflow-hidden bg-orange-600 py-24 text-white">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white opacity-5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 -mb-20 -ml-20 h-72 w-72 rounded-full bg-black opacity-10 blur-2xl" />

      <div className="relative z-10 container mx-auto px-4 text-center md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <Users className="h-8 w-8 text-white" />
          </div>

          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
            Tham Gia Cộng Đồng Khách Hàng FPT
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-orange-100 md:text-xl">
            Nhận thông báo ưu đãi sớm nhất, hỗ trợ kỹ thuật ưu tiên và giao lưu cùng hơn{' '}
            <span className="mx-1 text-2xl font-bold text-white">5,000+</span> thành viên đang sử
            dụng dịch vụ của FPT Telecom.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* 1. Zalo OA (Chính) */}
            <a
              href={siteConfig.social.zalo}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-14 w-full rounded-full bg-blue-500 px-8 text-lg text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 hover:bg-blue-600 sm:w-auto',
              )}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Tham gia Zalo OA
            </a>

            {/* 2. Facebook Group */}
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'h-14 w-full rounded-full border-none bg-white px-8 text-lg text-blue-700 shadow-lg shadow-black/10 transition-transform hover:scale-105 hover:bg-slate-100 sm:w-auto',
              )}
            >
              <ThumbsUp className="mr-2 h-5 w-5" />
              Group Facebook
            </a>

            {/* 3. Telegram Group */}
            <a
              href="https://t.me/fpt_telecom_group"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'h-14 w-full rounded-full border-none bg-sky-500 px-8 text-lg text-white shadow-lg shadow-sky-500/30 transition-transform hover:scale-105 hover:bg-sky-600 sm:w-auto',
              )}
            >
              <Send className="mr-2 h-5 w-5" />
              Cộng đồng Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
