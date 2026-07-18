'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Info, Router } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BestSellerTable } from '@/components/home/BestSellerTable';

const businessPlans = [
  {
    name: 'Super 250',
    speed: '250 Mbps',
    price: '900.000đ',
    features: [
      'Phù hợp 30 thiết bị',
      'Băng thông quốc tế 10.8 Mbps',
      'IP Tĩnh',
      'Trang bị Modem Vigor',
    ],
    popular: false,
  },
  {
    name: 'Super 400',
    speed: '400 Mbps',
    price: '1.400.000đ',
    features: [
      'Phù hợp 50 thiết bị',
      'Băng thông quốc tế 12.6 Mbps',
      'IP Tĩnh',
      'Trang bị Modem Vigor/Mikrotik',
    ],
    popular: true,
  },
  {
    name: 'Super 500',
    speed: '500 Mbps',
    price: '2.500.000đ',
    features: [
      'Phù hợp 70 thiết bị',
      'Băng thông quốc tế 18.9 Mbps',
      'IP Tĩnh',
      'Trang bị Modem Vigor/Mikrotik',
    ],
    popular: false,
  },
];

export function PricingTabs() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Bảng Giá Cước
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Chọn gói cước phù hợp nhất.
          </p>
        </div>

        <Tabs defaultValue="ca-nhan" className="mx-auto w-full max-w-5xl">
          <TabsList className="mx-auto mb-12 grid h-12 w-full max-w-md grid-cols-2 rounded-lg bg-white/[0.04] p-1">
            <TabsTrigger
              value="ca-nhan"
              className="h-full rounded-md text-sm font-semibold data-[state=active]:bg-white/[0.08] data-[state=active]:text-white"
            >
              Cá nhân / Gia đình
            </TabsTrigger>
            <TabsTrigger
              value="doanh-nghiep"
              className="h-full rounded-md text-sm font-semibold data-[state=active]:bg-white/[0.08] data-[state=active]:text-white"
            >
              Doanh nghiệp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ca-nhan" className="animate-in fade-in-50 mt-0 duration-300">
            <div className="rounded-xl border border-white/[0.06] bg-[#0C1524] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-white/[0.04] p-2 text-slate-400">
                  <Router className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Gói cước Gia Đình</h3>
                  <p className="text-muted-foreground text-sm">
                    Phù hợp nhu cầu lướt web, học tập, giải trí.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <BestSellerTable />
              </div>

              <div className="mt-6 flex flex-col items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 md:flex-row">
                <div className="mb-4 flex items-start gap-3 md:mb-0">
                  <Info className="text-primary/60 mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Ưu đãi:</strong> Trả trước 6 tháng tặng 1
                    tháng, 12 tháng tặng 2 tháng. Phí hòa mạng: 300.000đ. Mesh/Modem lắp thêm:
                    +20.000đ/tháng.
                  </p>
                </div>
                <a
                  href="#dang-ky"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap',
                  )}
                >
                  Đăng Ký Ngay
                </a>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="doanh-nghiep" className="animate-in fade-in-50 mt-0 duration-300">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {businessPlans.map((plan, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative flex flex-col rounded-xl border p-7',
                    plan.popular
                      ? 'border-primary/30 bg-[#0F1A2E]'
                      : 'border-white/[0.06] bg-[#0C1524]',
                  )}
                >
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-0.5 text-xs font-semibold uppercase">
                      Bán Chạy Nhất
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-foreground mb-2 text-xl font-bold">{plan.name}</h3>
                    <div className="text-primary mb-3 inline-block rounded bg-white/[0.04] px-2 py-0.5 text-sm font-medium">
                      {plan.speed}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-foreground text-3xl font-extrabold">{plan.price}</span>
                      <span className="text-muted-foreground">/ tháng</span>
                    </div>
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/60" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#dang-ky"
                    className={cn(
                      buttonVariants({ variant: plan.popular ? 'default' : 'outline' }),
                      'h-11 w-full rounded-lg font-semibold',
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-white/[0.06] text-slate-300 hover:bg-white/[0.04]',
                    )}
                  >
                    Đăng Ký {plan.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#0C1524] p-5 text-center">
              <p className="text-muted-foreground mb-3 text-sm">
                Doanh nghiệp lớn cần băng thông cam kết?
              </p>
              <Button
                variant="outline"
                className="rounded-lg border-white/[0.06] text-slate-300 hover:bg-white/[0.04]"
              >
                Nhận Báo Giá
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
