import React from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const articles = [
  {
    id: 1,
    title: 'Wi-Fi 6 là gì? Tại sao nên nâng cấp lên chuẩn Wi-Fi 6?',
    excerpt:
      'Tìm hiểu về công nghệ Wi-Fi 6 tiên tiến nhất hiện nay, mang lại tốc độ cực nhanh, giảm độ trễ và hỗ trợ nhiều thiết bị kết nối cùng lúc.',
    image: '/images/blog/wifi6-thumbnail.jpg', // TODO: Thay bằng ảnh thật
    date: '15/07/2026',
    author: 'FPT Telecom',
    slug: '/tin-tuc/wi-fi-6-la-gi',
  },
  {
    id: 2,
    title: 'Hướng dẫn đổi mật khẩu Wi-Fi FPT cực dễ qua ứng dụng Hi FPT',
    excerpt:
      'Chỉ với vài thao tác đơn giản trên điện thoại di động, bạn hoàn toàn có thể tự đổi tên và mật khẩu Wi-Fi tại nhà mà không cần gọi kỹ thuật.',
    image: '/images/blog/doi-mat-khau-wifi-thumbnail.jpg', // TODO: Thay bằng ảnh thật
    date: '10/07/2026',
    author: 'Admin',
    slug: '/tin-tuc/huong-dan-doi-mat-khau-wifi',
  },
  {
    id: 3,
    title: 'F-Safe: Giải pháp bảo mật toàn diện cho mạng gia đình',
    excerpt:
      'Khám phá tính năng bảo mật F-Safe tích hợp sẵn trên modem FPT, giúp bảo vệ trẻ em khỏi nội dung độc hại và ngăn chặn mã độc.',
    image: '/images/blog/f-safe-thumbnail.jpg', // TODO: Thay bằng ảnh thật
    date: '05/07/2026',
    author: 'Chuyên gia Bảo mật',
    slug: '/tin-tuc/f-safe-bao-mat-gia-dinh',
  },
];

export function RelatedArticles() {
  return (
    <section className="dark:bg-background border-border/50 border-t bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-foreground mb-3 text-3xl font-bold tracking-tight">
              Bài Viết Nổi Bật
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Cập nhật những tin tức công nghệ mới nhất và mẹo sử dụng Internet hiệu quả.
            </p>
          </div>
          <Link
            href="/tin-tuc"
            className={cn(buttonVariants({ variant: 'outline' }), 'group rounded-full')}
          >
            Xem tất cả tin tức
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group border-border/50 bg-card flex flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={article.slug} className="relative block aspect-video overflow-hidden">
                <div className="absolute inset-0 z-10 bg-black/10 transition-colors group-hover:bg-transparent" />
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="text-muted-foreground mb-4 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {article.author}
                  </span>
                </div>

                <h3 className="group-hover:text-foreground mb-3 line-clamp-2 text-xl font-bold transition-colors">
                  <Link href={article.slug}>{article.title}</Link>
                </h3>

                <p className="text-muted-foreground mb-6 line-clamp-3 flex-1 text-sm">
                  {article.excerpt}
                </p>

                <Link
                  href={article.slug}
                  className="text-primary hover:text-primary/80 mt-auto inline-flex items-center text-sm font-semibold transition-colors"
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
