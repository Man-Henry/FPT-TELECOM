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
    features: ['Phù hợp 30 thiết bị', 'Băng thông quốc tế 10.8 Mbps', 'IP Tĩnh', 'Trang bị Modem Vigor'],
    popular: false,
  },
  {
    name: 'Super 400',
    speed: '400 Mbps',
    price: '1.400.000đ',
    features: ['Phù hợp 50 thiết bị', 'Băng thông quốc tế 12.6 Mbps', 'IP Tĩnh', 'Trang bị Modem Vigor/Mikrotik'],
    popular: true,
  },
  {
    name: 'Super 500',
    speed: '500 Mbps',
    price: '2.500.000đ',
    features: ['Phù hợp 70 thiết bị', 'Băng thông quốc tế 18.9 Mbps', 'IP Tĩnh', 'Trang bị Modem Vigor/Mikrotik'],
    popular: false,
  },
];

export function PricingTabs() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Bảng Giá Cước Khuyến Mãi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chọn gói cước phù hợp nhất với nhu cầu sử dụng của bạn. FPT Telecom cam kết tốc độ vượt trội và ổn định.
          </p>
        </div>

        <Tabs defaultValue="ca-nhan" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-14 rounded-full bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger value="ca-nhan" className="rounded-full text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all h-full">
              Cá nhân / Gia đình
            </TabsTrigger>
            <TabsTrigger value="doanh-nghiep" className="rounded-full text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all h-full">
              Doanh nghiệp / Quán Game
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ca-nhan" className="mt-0 animate-in fade-in-50 zoom-in-95 duration-500">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-10 rounded-3xl border border-border">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <Router className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Gói cước Gia Đình</h3>
                  <p className="text-muted-foreground">Phù hợp cho nhu cầu lướt web, học tập, giải trí cơ bản.</p>
                </div>
              </div>
              
              {/* Tái sử dụng bảng giá từ Home nhưng lược bỏ Title để ghép vào Tab */}
              <div className="mt-8">
                <BestSellerTable />
              </div>

              <div className="mt-8 flex flex-col md:flex-row items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800/30">
                <div className="flex items-start gap-3 mb-4 md:mb-0">
                  <Info className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-orange-700 dark:text-orange-400">Ưu đãi trả trước:</strong> Trả trước 6 tháng tặng 1 tháng, trả trước 12 tháng tặng 2 tháng. Miễn phí công lắp đặt và trang bị Modem Wi-Fi 6 thế hệ mới.
                  </p>
                </div>
                <a href="#dang-ky" className={cn(buttonVariants({ variant: "default" }), "bg-orange-600 hover:bg-orange-700 text-white whitespace-nowrap")}>
                  Đăng Ký Ngay
                </a>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="doanh-nghiep" className="mt-0 animate-in fade-in-50 zoom-in-95 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {businessPlans.map((plan, index) => (
                <div key={index} className={cn(
                  "relative flex flex-col p-8 rounded-3xl border bg-card transition-all hover:shadow-xl hover:-translate-y-1",
                  plan.popular ? "border-orange-500 shadow-lg shadow-orange-500/10" : "border-border"
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
                      Bán Chạy Nhất
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 inline-block px-3 py-1 rounded-full mb-4">
                      Tốc độ: {plan.speed}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground font-medium">/ tháng</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="#dang-ky" className={cn(
                    buttonVariants({ variant: plan.popular ? 'default' : 'outline' }),
                    "w-full h-12 rounded-xl text-base font-semibold transition-all",
                    plan.popular ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/20" : ""
                  )}>
                    Đăng Ký {plan.name}
                  </a>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-border text-center">
              <p className="text-muted-foreground mb-4">
                Đối với mô hình doanh nghiệp lớn, khu công nghiệp cần băng thông cam kết quốc tế siêu cao hoặc hệ thống mạng phức tạp.
              </p>
              <Button variant="outline" className="rounded-full border-blue-500 text-blue-600 hover:bg-blue-50">
                Nhận Báo Giá Customized
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
