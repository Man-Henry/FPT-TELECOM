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
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: 'Tin tức & Khuyến mãi FPT Telecom mới nhất',
  description: 'Cập nhật các chương trình khuyến mãi lắp mạng FPT, thủ thuật sử dụng Internet và truyền hình FPT Play mới nhất.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  
  if (!posts || posts.length === 0) {
    return <div className="container py-24 text-center">Chưa có bài viết nào.</div>;
  }

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-background pt-24 pb-20">
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

        <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-foreground">
          Góc Tư Vấn & Tin Tức
        </h1>

        {/* Featured Post */}
        <div className="mb-16 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-border shadow-sm group">
          <Link href={`/tin-tuc/${featuredPost.slug}`} className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
              <Image 
                src={featuredPost.image} 
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Mới nhất
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-orange-600 font-medium mb-2">{featuredPost.category}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {featuredPost.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/tin-tuc/${post.slug}`}
              className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-border hover:shadow-md hover:border-orange-500/30 transition-all group"
            >
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-sm font-semibold text-orange-600 mb-2">{post.category}</span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                  {post.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
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
