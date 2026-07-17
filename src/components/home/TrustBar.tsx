import * as React from 'react';
import { Users, Clock, ShieldCheck, Star } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '5,000+',
    label: 'Khách hàng tin dùng',
  },
  {
    icon: Clock,
    value: '24h',
    label: 'Triển khai siêu tốc',
  },
  {
    icon: ShieldCheck,
    value: '100%',
    label: 'Chính hãng FPT',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Đánh giá hài lòng',
  },
];

export function TrustBar() {
  return (
    <section className="bg-background border-border w-full border-b py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="divide-border/50 mb-12 grid grid-cols-2 gap-6 divide-x md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-2 text-center"
              >
                <div className="mb-2 rounded-full bg-orange-100 p-3 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-foreground text-2xl font-bold">{stat.value}</h3>
                <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Partners & Badges */}
        <div className="border-border/50 flex flex-col items-center justify-center gap-8 border-t pt-8 opacity-75 grayscale transition-all duration-300 hover:grayscale-0 md:flex-row md:gap-16">
          <div className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            Đối tác tin cậy
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 text-lg font-bold text-slate-400 md:gap-12">
            <span>QUALCOMM</span>
            <span>TP-LINK</span>
            <span>ZTE</span>
            <div className="flex items-center gap-1 text-yellow-500">
              Google Reviews{' '}
              <span className="flex text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </span>
            </div>
            <span className="rounded-full border border-orange-500/30 px-3 py-1 text-sm text-orange-500">
              Đại lý uỷ quyền FPT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
