'use client';

import * as React from 'react';
import { MessageCircle, ThumbsUp, Users } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export function CommunityHub() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0A1128] py-24 text-white">
      <div className="container mx-auto px-4 text-center md:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="text-muted-foreground mb-6 inline-flex rounded-lg bg-white/[0.04] p-3">
            <Users className="h-7 w-7" />
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Cộng Đồng Khách Hàng FPT
          </h2>

          <p className="text-muted-foreground mb-10 text-lg">
            Nhận thông báo ưu đãi sớm nhất, hỗ trợ kỹ thuật ưu tiên cùng{' '}
            <span className="text-primary font-semibold">5,000+</span> thành viên.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteConfig.social.zaloGroup}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg px-6 font-semibold',
              )}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Nhóm Zalo
            </a>

            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'h-12 rounded-lg border-white/[0.08] bg-white/[0.04] px-6 font-semibold text-slate-300 hover:bg-white/[0.08]',
              )}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
