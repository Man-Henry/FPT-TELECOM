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
  title = "Khách Hàng Nói Gì Về Chúng Tôi?",
  description = "Hàng triệu khách hàng trên toàn quốc đã tin tưởng lựa chọn dịch vụ FPT Telecom.",
  reviews
}: CustomerReviewsProps) {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "h-5 w-5", 
                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                    )} 
                  />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-8 text-base leading-relaxed italic flex-1">
                &ldquo;{review.content}&rdquo;
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-lg shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
