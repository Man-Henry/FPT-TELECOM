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
    <section className="w-full bg-background border-b border-border py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-border/50 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center text-center space-y-2"
              >
                <div className="p-3 bg-orange-100 dark:bg-orange-950/50 rounded-full text-orange-600 dark:text-orange-400 mb-2">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Partners & Badges */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-8 border-t border-border/50 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Đối tác tin cậy</div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center font-bold text-lg text-slate-400">
            <span>QUALCOMM</span>
            <span>TP-LINK</span>
            <span>ZTE</span>
            <div className="flex items-center gap-1 text-yellow-500">
               Google Reviews <span className="flex text-yellow-400"><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/></span>
            </div>
            <span className="text-orange-500 border border-orange-500/30 px-3 py-1 rounded-full text-sm">Đại lý uỷ quyền FPT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
