import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, PhoneCall, RotateCcw } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-9xl font-extrabold text-primary/20">404</h1>
      <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        Trang không tồn tại
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <Link href="/">
          <Button className="w-full gap-2" size="lg">
            <Home className="h-4 w-4" />
            Về trang chủ
          </Button>
        </Link>
        <a
          href={`tel:${siteConfig.hotline.replace(/\./g, '')}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-6 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-white/[0.08]"
        >
          <PhoneCall className="h-4 w-4" />
          Gọi Hotline: {siteConfig.hotline}
        </a>
      </div>
    </div>
  );
}