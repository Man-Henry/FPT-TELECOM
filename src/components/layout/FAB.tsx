'use client';

import * as React from 'react';
import { Phone, MessageCircle, MessageSquare, Send, Mail, X, Plus } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function FAB() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Nút liên hệ phụ (ẩn khi màn hình nhỏ và đang đóng) */}
      <div className={cn("flex-col items-end gap-4 transition-all duration-300 origin-bottom", isOpen ? "flex opacity-100 scale-100" : "hidden opacity-0 scale-90 md:flex md:opacity-100 md:scale-100")}>
        {/* Telegram Bot */}
        <a
          href="https://t.me/fpt_telecom_bot" // Thay bằng link bot thực tế
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Chat Telegram"
        >
          <Send className="h-5 w-5 ml-[-2px] mt-[2px]" />
          <span className="absolute right-full mr-4 hidden items-center whitespace-nowrap rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:flex group-hover:opacity-100">
            Telegram Bot
            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-800"></span>
          </span>
        </a>

        {/* SMS */}
        <a
          href={`sms:${siteConfig.hotline.replace(/\./g, '')}`}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Gửi SMS"
        >
          <Mail className="h-5 w-5" />
          <span className="absolute right-full mr-4 hidden items-center whitespace-nowrap rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:flex group-hover:opacity-100">
            Gửi tin nhắn SMS
            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-800"></span>
          </span>
        </a>

        {/* Messenger */}
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Chat Messenger"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="absolute right-full mr-4 hidden items-center whitespace-nowrap rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:flex group-hover:opacity-100">
            Facebook Messenger
            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-800"></span>
          </span>
        </a>

        {/* Zalo Button */}
        <a
          href={siteConfig.social.zalo}
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Chat Zalo"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute right-full mr-4 hidden items-center whitespace-nowrap rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:flex group-hover:opacity-100">
            Chat Zalo
            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-800"></span>
          </span>
        </a>
      </div>

      {/* Main Action Group */}
      <div className="flex gap-4">
        {/* Toggle Button for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition-transform active:scale-95"
          aria-label="Mở menu liên hệ"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>

        {/* Phone Call Button with Pulse Animation */}
        <a
          href={`tel:${siteConfig.hotline.replace(/\./g, '')}`}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Gọi Hotline"
        >
          <div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75"></div>
          <Phone className="relative h-7 w-7 animate-pulse" />
          <span className="absolute right-full mr-4 hidden items-center whitespace-nowrap rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:flex group-hover:opacity-100">
            {siteConfig.hotline}
            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-800"></span>
          </span>
        </a>
      </div>
    </div>
  );
}
