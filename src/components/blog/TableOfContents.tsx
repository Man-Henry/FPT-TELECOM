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
      { rootMargin: '0px 0px -80% 0px' }
    );

    const elements = document.querySelectorAll('h2, h3');
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="sticky top-24 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-border">
      <div className="flex items-center gap-2 mb-4">
        <ListCollapse className="h-5 w-5 text-orange-600" />
        <h4 className="font-bold text-foreground">Nội Dung Bài Viết</h4>
      </div>
      <ul className="space-y-3 text-sm">
        {toc.map((item, index) => (
          <li
            key={index}
            className={cn(
              "transition-colors",
              item.level === 3 ? "ml-4" : "font-medium",
              activeId === item.id ? "text-orange-600" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <a href={`#${item.id}`} className="block line-clamp-2">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
