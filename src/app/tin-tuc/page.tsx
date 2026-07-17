import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Tin tức & Khuyến mãi FPT Telecom mới nhất',
  description:
    'Cập nhật các chương trình khuyến mãi lắp mạng FPT, thủ thuật sử dụng Internet và truyền hình FPT Play mới nhất.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  if (!posts || posts.length === 0) {
    return <div className="container py-24 text-center">Chưa có bài viết nào.</div>;
  }

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <main className="dark:bg-background min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tin Tức</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-foreground mb-8 text-4xl font-extrabold tracking-tight">
          Góc Tư Vấn & Tin Tức
        </h1>

        {/* Featured Post */}
        <div className="border-border group mb-16 overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900">
          <Link href={`/tin-tuc/${featuredPost.slug}`} className="flex flex-col md:flex-row">
            <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-1/2">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
                Mới nhất
              </div>
            </div>
            <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
              <span className="mb-2 font-medium text-orange-600">{featuredPost.category}</span>
              <h2 className="mb-4 text-2xl font-bold transition-colors group-hover:text-orange-600 md:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-6 line-clamp-3">{featuredPost.description}</p>

              <div className="mt-auto flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {featuredPost.author.name}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(featuredPost.date).toLocaleDateString('vi-VN')}
                </div>
                {featuredPost.readingTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readingTime} phút đọc
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/tin-tuc/${post.slug}`}
              className="border-border group flex flex-col overflow-hidden rounded-2xl border bg-white transition-all hover:border-orange-500/30 hover:shadow-md dark:bg-slate-900"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 text-sm font-semibold text-orange-600">{post.category}</span>
                <h3 className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-orange-600">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 text-sm">
                  {post.description}
                </p>
                <div className="border-border/50 mt-auto flex items-center justify-between border-t pt-4">
                  <div className="text-xs text-slate-500">
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </div>
                  <div className="flex items-center text-sm font-semibold text-orange-600">
                    Đọc tiếp <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
