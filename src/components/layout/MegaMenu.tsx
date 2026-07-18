'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const internetPackages = [
  {
    title: 'Gói Cá Nhân & Gia Đình',
    href: '/internet-cap-quang#ca-nhan',
    description: 'Băng thông không giới hạn, phù hợp giải trí đa phương tiện.',
  },
  {
    title: 'Gói Doanh Nghiệp',
    href: '/internet-cap-quang#doanh-nghiep',
    description: 'Băng thông quốc tế lớn, cam kết tốc độ cao, độ trễ thấp.',
  },
  {
    title: 'Gói F-Game / Sky / Max',
    href: '/internet-cap-quang#f-game-sky-max',
    description: 'Tối ưu đặc biệt cho game thủ và streamer.',
  },
];

const tvPackages = [
  {
    title: 'Gói FPT Play Max',
    href: '/truyen-hinh-fpt-play#goi-max',
    description: 'Hơn 200 kênh truyền hình trong nước và quốc tế đặc sắc.',
  },
  {
    title: 'Gói FPT Play VIP',
    href: '/truyen-hinh-fpt-play#goi-vip',
    description: 'Kho phim HBO GO, trực tiếp độc quyền UEFA Champions League.',
  },
];

export function MegaMenu() {
  return (
    <NavigationMenu className="z-50 hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Internet Cáp Quang</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 rounded-lg border border-white/[0.06] bg-[#0F1A2E] p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {internetPackages.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Truyền Hình FPT Play</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 rounded-lg border border-white/[0.06] bg-[#0F1A2E] p-3 md:w-[500px] md:grid-cols-2">
              {tvPackages.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/camera-fpt" />}
            className={navigationMenuTriggerStyle()}
          >
            Camera FPT
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/goi-combo#khuyen-mai" />}
            className={navigationMenuTriggerStyle()}
          >
            Khuyến Mãi
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink
          href={href || '#'}
          ref={ref}
          className={cn(
            'block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-white/[0.04] focus:bg-white/[0.04]',
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-snug">{children}</p>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';
