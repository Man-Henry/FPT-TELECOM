'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Info, Router } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BestSellerTable } from '@/components/home/BestSellerTable';

// Dữ liệu mẫu (Có thể tách ra file constants sau)
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
            Bảng Giá Cước Khuyến Mãi
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Chọn gói cước phù hợp nhất với nhu cầu sử dụng của bạn. FPT Telecom cam kết tốc độ vượt
            trội và ổn định.
          </p>
        </div>

        <Tabs defaultValue="ca-nhan" className="mx-auto w-full max-w-5xl">
          <TabsList className="mx-auto mb-12 grid h-14 w-full max-w-md grid-cols-2 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
            <TabsTrigger
              value="ca-nhan"
              className="h-full rounded-full text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm"
            >
              Cá nhân / Gia đình
            </TabsTrigger>
            <TabsTrigger
              value="doanh-nghiep"
              className="h-full rounded-full text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm"
            >
              Doanh nghiệp / Quán Game
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="ca-nhan"
            className="animate-in fade-in-50 zoom-in-95 mt-0 duration-500"
          >
            <div className="border-border rounded-3xl border bg-slate-50 p-6 md:p-10 dark:bg-slate-900/50">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/50">
                  <Router className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Gói cước Gia Đình</h3>
                  <p className="text-muted-foreground">
                    Phù hợp cho nhu cầu lướt web, học tập, giải trí cơ bản.
                  </p>
                </div>
              </div>

              {/* Tái sử dụng bảng giá từ Home nhưng lược bỏ Title để ghép vào Tab */}
              <div className="mt-8">
                <BestSellerTable />
              </div>

              <div className="mt-8 flex flex-col items-center justify-between rounded-xl border border-orange-200 bg-orange-50 p-4 md:flex-row dark:border-orange-800/30 dark:bg-orange-950/30">
                <div className="mb-4 flex items-start gap-3 md:mb-0">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-orange-700 dark:text-orange-400">
                      Ưu đãi trả trước:
                    </strong>{' '}
                    Trả trước 6 tháng tặng 1 tháng, trả trước 12 tháng tặng 2 tháng. Miễn phí công
                    lắp đặt và trang bị Modem Wi-Fi 6 thế hệ mới.
                  </p>
                </div>
                <a
                  href="#dang-ky"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'bg-orange-600 whitespace-nowrap text-white hover:bg-orange-700',
                  )}
                >
                  Đăng Ký Ngay
                </a>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="doanh-nghiep"
            className="animate-in fade-in-50 zoom-in-95 mt-0 duration-500"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {businessPlans.map((plan, index) => (
                <div
                  key={index}
                  className={cn(
                    'bg-card relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl',
                    plan.popular
                      ? 'border-orange-500 shadow-lg shadow-orange-500/10'
                      : 'border-border',
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase shadow-md">
                      Bán Chạy Nhất
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-foreground mb-2 text-2xl font-bold">{plan.name}</h3>
                    <div className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      Tốc độ: {plan.speed}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-foreground text-4xl font-extrabold">{plan.price}</span>
                      <span className="text-muted-foreground font-medium">/ tháng</span>
                    </div>
                  </div>

                  <ul className="mb-8 flex-1 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#dang-ky"
                    className={cn(
                      buttonVariants({ variant: plan.popular ? 'default' : 'outline' }),
                      'h-12 w-full rounded-xl text-base font-semibold transition-all',
                      plan.popular
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20 hover:bg-orange-700'
                        : '',
                    )}
                  >
                    Đăng Ký {plan.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="border-border mt-8 rounded-2xl border bg-slate-50 p-6 text-center dark:bg-slate-900/50">
              <p className="text-muted-foreground mb-4">
                Đối với mô hình doanh nghiệp lớn, khu công nghiệp cần băng thông cam kết quốc tế
                siêu cao hoặc hệ thống mạng phức tạp.
              </p>
              <Button
                variant="outline"
                className="rounded-full border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Nhận Báo Giá Customized
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
