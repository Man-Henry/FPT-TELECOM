import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReviewItem {
  id: string | number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

interface CustomerReviewsProps {
  title?: string;
  description?: string;
  reviews: ReviewItem[];
}

export function CustomerReviews({
  title = 'Khách Hàng Nói Gì Về Chúng Tôi?',
  description = 'Hàng triệu khách hàng trên toàn quốc đã tin tưởng lựa chọn dịch vụ FPT Telecom.',
  reviews,
}: CustomerReviewsProps) {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="dark:bg-background border-border/50 flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-6 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5',
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted text-muted',
                    )}
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-8 flex-1 text-base leading-relaxed italic">
                &ldquo;{review.content}&rdquo;
              </p>

              <div className="mt-auto flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="text-foreground font-bold">{review.name}</h4>
                  <p className="text-muted-foreground text-sm">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
