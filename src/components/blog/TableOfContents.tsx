'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { ListCollapse } from 'lucide-react';

interface TocItem {
  id: string;
  level: number;
  text: string;
}

export function TableOfContents({ content }: { content: string }) {
  const toc = useMemo(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: TocItem[] = [];

    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();

      const id = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      items.push({ id, level, text });
    }

    return items;
  }, [content]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' },
    );

    const elements = document.querySelectorAll('h2, h3');
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="border-border sticky top-24 rounded-2xl border bg-slate-50 p-6 dark:bg-slate-900/50">
      <div className="mb-4 flex items-center gap-2">
        <ListCollapse className="h-5 w-5 text-orange-600" />
        <h4 className="text-foreground font-bold">Nội Dung Bài Viết</h4>
      </div>
      <ul className="space-y-3 text-sm">
        {toc.map((item, index) => (
          <li
            key={index}
            className={cn(
              'transition-colors',
              item.level === 3 ? 'ml-4' : 'font-medium',
              activeId === item.id
                ? 'text-orange-600'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <a href={`#${item.id}`} className="line-clamp-2 block">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
