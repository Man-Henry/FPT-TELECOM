import * as React from 'react';
import { Users, Clock, ShieldCheck, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: '5,000+', label: 'Khách hàng tin dùng' },
  { icon: Clock, value: '24h', label: 'Triển khai siêu tốc' },
  { icon: ShieldCheck, value: '100%', label: 'Chính hãng FPT' },
  { icon: Star, value: '4.9/5', label: 'Đánh giá hài lòng' },
];

export function TrustBar() {
  return (
    <section className="border-b border-white/[0.06] bg-[#0C1524] py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-2 text-center"
              >
                <div className="text-muted-foreground mb-2 rounded-lg bg-white/[0.04] p-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-foreground text-2xl font-bold">{stat.value}</h3>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Partners */}
        <div className="flex flex-col items-center justify-center gap-8 border-t border-white/[0.06] pt-8 md:flex-row md:gap-12">
          <span className="text-xs font-medium tracking-widest text-slate-500 uppercase">
            Đối tác
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-slate-500 md:gap-10">
            <span>QUALCOMM</span>
            <span>TP-LINK</span>
            <span>ZTE</span>
            <div className="flex items-center gap-1">
              Google Reviews
              <span className="ml-1 flex text-yellow-500/70">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
