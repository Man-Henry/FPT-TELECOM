'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { MegaMenu } from './MegaMenu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function scrollToDangKy() {
  const element = document.getElementById('dang-ky');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

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
        className="focus:bg-background focus:text-foreground sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:font-bold"
      >
        Skip to main content
      </a>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'border-b border-white/[0.06] bg-[#0C1524]/90 shadow-sm backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-foreground flex h-8 w-24 items-center justify-center rounded font-bold">
              {siteConfig.name}
            </div>
          </Link>

          {/* Desktop Mega Menu */}
          <MegaMenu />

{/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${siteConfig.hotline.replace(/\./g, '')}`}
              className={cn(buttonVariants({ variant: 'ghost' }), 'text-muted-foreground font-medium hover:text-foreground')}
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              {siteConfig.hotline}
            </a>
            <Button className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90" onClick={scrollToDangKy}>
              Đăng ký ngay
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-white/[0.06] bg-[#0C1524] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <Accordion defaultValue={['internet']} className="w-full">
                  <AccordionItem value="internet">
                    <AccordionTrigger>Internet Cáp Quang</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        <Link
                          href="/internet-cap-quang#ca-nhan"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Gói Cá Nhân & Gia Đình
                        </Link>
                        <Link
                          href="/internet-cap-quang#doanh-nghiep"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Gói Doanh Nghiệp
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tv">
                    <AccordionTrigger>Truyền Hình FPT Play</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        <Link
                          href="/truyen-hinh-fpt-play#goi-max"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Gói Max
                        </Link>
                        <Link
                          href="/truyen-hinh-fpt-play#goi-vip"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Gói VIP
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link
                  href="/camera-fpt"
                  className="border-b border-white/[0.06] py-2 font-medium text-slate-300 transition-colors hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camera FPT
                </Link>
                <Link
                  href="/goi-combo#khuyen-mai"
                  className="border-b border-white/[0.06] py-2 font-medium text-slate-300 transition-colors hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Khuyến Mãi
                </Link>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`tel:${siteConfig.hotline.replace(/\./g, '')}`}
                    className={cn(buttonVariants({ variant: 'outline' }), 'w-full border-white/[0.06]')}
                  >
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Gọi ngay {siteConfig.hotline}
                  </a>
                  <Button
                    className="bg-primary text-primary-foreground w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById('dang-ky')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
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
