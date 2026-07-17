import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const articles = [
  {
    id: 1,
    title: 'Wi-Fi 6 là gì? Tại sao nên nâng cấp lên chuẩn Wi-Fi 6?',
    excerpt: 'Tìm hiểu về công nghệ Wi-Fi 6 tiên tiến nhất hiện nay, mang lại tốc độ cực nhanh, giảm độ trễ và hỗ trợ nhiều thiết bị kết nối cùng lúc.',
    image: '/images/blog/wifi6-thumbnail.jpg', // TODO: Thay bằng ảnh thật
    date: '15/07/2026',
    author: 'FPT Telecom',
    slug: '/tin-tuc/wi-fi-6-la-gi'
  },
  {
    id: 2,
    title: 'Hướng dẫn đổi mật khẩu Wi-Fi FPT cực dễ qua ứng dụng Hi FPT',
    excerpt: 'Chỉ với vài thao tác đơn giản trên điện thoại di động, bạn hoàn toàn có thể tự đổi tên và mật khẩu Wi-Fi tại nhà mà không cần gọi kỹ thuật.',
    image: '/images/blog/doi-mat-khau-wifi-thumbnail.jpg', // TODO: Thay bằng ảnh thật
    date: '10/07/2026',
    author: 'Admin',
    slug: '/tin-tuc/huong-dan-doi-mat-khau-wifi'
  },
  {
    id: 3,
    title: 'F-Safe: Giải pháp bảo mật toàn diện cho mạng gia đình',
    excerpt: 'Khám phá tính năng bảo mật F-Safe tích hợp sẵn trên modem FPT, giúp bảo vệ trẻ em khỏi nội dung độc hại và ngăn chặn mã độc.',
    image: '/images/blog/f-safe-thumbnail.jpg', // TODO: Thay bằng ảnh thật
    date: '05/07/2026',
    author: 'Chuyên gia Bảo mật',
    slug: '/tin-tuc/f-safe-bao-mat-gia-dinh'
  }
];

export function RelatedArticles() {
  return (
    <section className="py-24 bg-white dark:bg-background border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3 text-foreground">
              Bài Viết Nổi Bật
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Cập nhật những tin tức công nghệ mới nhất và mẹo sử dụng Internet hiệu quả.
            </p>
          </div>
          <Link href="/tin-tuc" className={cn(buttonVariants({ variant: "outline" }), "rounded-full group")}>
            Xem tất cả tin tức
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="group rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 bg-card flex flex-col">
              <Link href={article.slug} className="aspect-video overflow-hidden relative block">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {article.author}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  <Link href={article.slug}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm flex-1">
                  {article.excerpt}
                </p>
                
                <Link 
                  href={article.slug} 
                  className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors mt-auto"
                >
                  Đọc tiếp <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
