import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { Metadata } from 'next';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Generate static params for pre-rendering
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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
    },
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
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title,
    image: [metadata.image],
    datePublished: metadata.date,
    dateModified: metadata.updatedAt || metadata.date,
    author: {
      '@type': 'Person',
      name: metadata.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FPT Telecom',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fpt-telecom.vn/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="dark:bg-background min-h-screen bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="text-muted-foreground mb-8 flex overflow-x-auto text-sm whitespace-nowrap">
            <Link href="/" className="transition-colors hover:text-orange-600">
              Trang chủ
            </Link>
            <ChevronRight className="mx-2 mt-0.5 h-4 w-4 shrink-0" />
            <Link href="/tin-tuc" className="transition-colors hover:text-orange-600">
              Tin Tức
            </Link>
            <ChevronRight className="mx-2 mt-0.5 h-4 w-4 shrink-0" />
            <span className="text-foreground max-w-[200px] truncate font-medium sm:max-w-none">
              {metadata.title}
            </span>
          </nav>

          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Main Content */}
            <article className="lg:w-2/3">
              <header className="mb-10">
                <div className="mb-6 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-900/30">
                  {metadata.category}
                </div>
                <h1 className="text-foreground mb-6 text-3xl leading-tight font-extrabold tracking-tight md:text-4xl lg:text-5xl">
                  {metadata.title}
                </h1>

                <div className="text-muted-foreground border-border/50 flex flex-wrap items-center gap-6 border-b pb-8 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-500 dark:bg-slate-800">
                      {metadata.author.avatar}
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">{metadata.author.name}</p>
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

              <div className="mb-12 h-[300px] w-full overflow-hidden rounded-2xl md:h-[400px]">
                <Image src={metadata.image} alt={metadata.title} fill className="object-cover" />
              </div>

              {/* MDX Content Block */}
              <div className="prose prose-slate dark:prose-invert prose-orange prose-headings:scroll-mt-28 max-w-none">
                <MDXRemote source={content} components={MDXComponents} />
              </div>

              {/* Tags */}
              {metadata.tags && (
                <div className="border-border mt-12 flex flex-wrap gap-2 border-t pt-8">
                  <span className="mt-1 mr-2 text-sm font-semibold">Tags:</span>
                  {metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block lg:w-1/3">
              <TableOfContents content={content} />

              {/* Banner CTA */}
              <div className="sticky top-24 mt-8 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white shadow-xl">
                <h4 className="mb-3 text-xl font-bold">Lắp Mạng FPT Ngay!</h4>
                <p className="mb-6 text-sm text-orange-50">
                  Trang bị miễn phí Modem Wi-Fi 6 siêu tốc, thủ tục đơn giản, lắp đặt trong ngày.
                </p>
                <Link
                  href="/dang-ky-lap-dat"
                  className="block w-full rounded-xl bg-white py-3 text-center font-bold text-orange-600 transition-colors hover:bg-orange-50"
                >
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
