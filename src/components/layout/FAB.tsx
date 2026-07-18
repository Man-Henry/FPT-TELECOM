'use client';

import * as React from 'react';
import { Phone, MessageCircle, MessageSquare, Send, Mail, X, Plus } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function FAB() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {/* Contact buttons */}
      <div
        className={cn(
          'origin-bottom flex-col items-end gap-3 transition-all duration-200',
          isOpen
            ? 'flex scale-100 opacity-100'
            : 'hidden scale-95 opacity-0 md:flex md:scale-100 md:opacity-100',
        )}
      >
        <a
          href={`sms:${siteConfig.hotline.replace(/\./g, '')}`}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#1A2A42] text-slate-300 shadow-sm transition-colors hover:bg-[#1F3352] hover:text-white"
          aria-label="Gửi SMS"
        >
          <Mail className="h-4.5 w-4.5" />
        </a>

        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#1A2A42] text-slate-300 shadow-sm transition-colors hover:bg-[#1F3352] hover:text-white"
          aria-label="Chat Messenger"
        >
          <MessageSquare className="h-4.5 w-4.5" />
        </a>

        <a
          href={siteConfig.social.zalo}
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1A2A42] text-slate-300 shadow-sm transition-colors hover:bg-[#1F3352] hover:text-white"
          aria-label="Chat Zalo"
        >
          <MessageCircle className="h-5.5 w-5.5" />
        </a>
      </div>

      {/* Main Action Group */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A2A42] text-slate-300 shadow-sm transition-colors hover:bg-[#1F3352] hover:text-white active:scale-95 md:hidden"
          aria-label="Mở menu liên hệ"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </button>

        <a
          href={`tel:${siteConfig.hotline.replace(/\./g, '')}`}
          className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full shadow-sm transition-colors hover:bg-primary/90"
          aria-label="Gọi Hotline"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
