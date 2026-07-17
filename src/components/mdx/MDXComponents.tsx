import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const MDXComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn('mt-2 scroll-m-20 text-4xl font-bold tracking-tight', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn('mt-8 scroll-m-20 text-2xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href?.startsWith('/');
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className={cn(
            'font-medium text-orange-600 underline underline-offset-4 hover:text-orange-700',
            className,
          )}
          {...props}
        />
      );
    }
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'font-medium text-orange-600 underline underline-offset-4 hover:text-orange-700',
          className,
        )}
        href={href || '#'}
        {...props}
      />
    );
  },
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'text-muted-foreground mt-6 border-l-4 border-orange-500 bg-orange-50 py-2 pl-6 italic dark:bg-orange-950/30',
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="border-border my-6 w-full overflow-y-auto rounded-lg border">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('border-border even:bg-muted/50 m-0 border-t p-0', className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border-border border-b bg-slate-100 px-4 py-3 text-left font-bold dark:bg-slate-800 [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border-border border-b px-4 py-3 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  CallToAction: ({ title, link }: { title: string; link: string }) => (
    <div className="my-8 flex flex-col items-center justify-between rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-lg sm:flex-row">
      <h3 className="m-0 mb-4 text-xl font-bold sm:mb-0">{title}</h3>
      <Link
        href={link}
        className={cn(buttonVariants({ variant: 'secondary' }), 'font-bold shadow-md')}
      >
        Đăng ký ngay
      </Link>
    </div>
  ),
};
