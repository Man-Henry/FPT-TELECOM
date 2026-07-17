import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { Metadata } from 'next';
import { Calendar, Clock, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';

// Generate static params for pre-rendering
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return { title: 'Không tìm thấy bài viết' };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: [post.metadata.author.name],
      images: [{ url: post.metadata.image }],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": metadata.title,
    "image": [metadata.image],
    "datePublished": metadata.date,
    "dateModified": metadata.updatedAt || metadata.date,
    "author": {
      "@type": "Person",
      "name": metadata.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "FPT Telecom",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fpt-telecom.vn/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white dark:bg-background pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link>
            <ChevronRight className="h-4 w-4 mx-2 mt-0.5 shrink-0" />
            <Link href="/tin-tuc" className="hover:text-orange-600 transition-colors">Tin Tức</Link>
            <ChevronRight className="h-4 w-4 mx-2 mt-0.5 shrink-0" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{metadata.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <article className="lg:w-2/3">
              <header className="mb-10">
                <div className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-xs font-semibold text-orange-600 mb-6">
                  {metadata.category}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-foreground">
                  {metadata.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/50 pb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                      {metadata.author.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{metadata.author.name}</p>
                      <p className="text-xs">{metadata.author.bio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(metadata.date).toLocaleDateString('vi-VN')}
                  </div>
                  {metadata.readingTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {metadata.readingTime} phút đọc
                    </div>
                  )}
                </div>
              </header>

              <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12">
                <img 
                  src={metadata.image} 
                  alt={metadata.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* MDX Content Block */}
              <div className="prose prose-slate dark:prose-invert prose-orange max-w-none prose-headings:scroll-mt-28">
                <MDXRemote source={content} components={MDXComponents} />
              </div>

              {/* Tags */}
              {metadata.tags && (
                <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
                  <span className="text-sm font-semibold mr-2 mt-1">Tags:</span>
                  {metadata.tags.map(tag => (
                    <span key={tag} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:w-1/3 hidden lg:block">
              <TableOfContents content={content} />
              
              {/* Banner CTA */}
              <div className="mt-8 sticky top-24 p-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white shadow-xl">
                <h4 className="font-bold text-xl mb-3">Lắp Mạng FPT Ngay!</h4>
                <p className="text-orange-50 text-sm mb-6">Trang bị miễn phí Modem Wi-Fi 6 siêu tốc, thủ tục đơn giản, lắp đặt trong ngày.</p>
                <Link href="/dang-ky-lap-dat" className="block w-full text-center bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors">
                  Xem Bảng Giá
                </Link>
              </div>
            </aside>
            
          </div>
        </div>
      </main>
    </>
  );
}
