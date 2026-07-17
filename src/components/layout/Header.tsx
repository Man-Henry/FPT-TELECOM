'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { MegaMenu } from './MegaMenu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-background focus:text-foreground focus:font-bold"
      >
        Skip to main content
      </a>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* Thay placeholder bằng Image thật sau này */}
            <div className="h-8 w-24 bg-primary/20 rounded-md flex items-center justify-center font-bold text-primary">
              {siteConfig.name}
            </div>
          </Link>

          {/* Desktop Mega Menu */}
          <MegaMenu />

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:${siteConfig.hotline.replace(/\./g, '')}`} className={cn(buttonVariants({ variant: 'ghost' }), "font-semibold")}>
              <PhoneCall className="mr-2 h-4 w-4" />
              {siteConfig.hotline}
            </a>
            <Button className="font-semibold bg-orange-500 hover:bg-orange-600 text-white">
              Đăng ký ngay
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger className={buttonVariants({ variant: 'ghost', size: 'icon' })} aria-label="Menu">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Accordion defaultValue={['internet']} className="w-full">
                  <AccordionItem value="internet">
                    <AccordionTrigger>Internet Cáp Quang</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        <Link href="/internet-cap-quang/ca-nhan" onClick={() => setIsMobileMenuOpen(false)}>Gói Cá Nhân & Gia Đình</Link>
                        <Link href="/internet-cap-quang/doanh-nghiep" onClick={() => setIsMobileMenuOpen(false)}>Gói Doanh Nghiệp</Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tv">
                    <AccordionTrigger>Truyền Hình FPT Play</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        <Link href="/truyen-hinh-fpt-play/goi-max" onClick={() => setIsMobileMenuOpen(false)}>Gói Max</Link>
                        <Link href="/truyen-hinh-fpt-play/goi-vip" onClick={() => setIsMobileMenuOpen(false)}>Gói VIP</Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <Link href="/camera-fpt" className="font-medium py-2 border-b" onClick={() => setIsMobileMenuOpen(false)}>
                  Camera FPT
                </Link>
                <Link href="/khuyen-mai" className="font-medium py-2 border-b" onClick={() => setIsMobileMenuOpen(false)}>
                  Khuyến Mãi
                </Link>
                
                <div className="mt-6 flex flex-col gap-3">
                  <a href={`tel:${siteConfig.hotline.replace(/\./g, '')}`} className={cn(buttonVariants({ variant: 'outline' }), "w-full")}>
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Gọi ngay {siteConfig.hotline}
                  </a>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Đăng ký trực tuyến
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
