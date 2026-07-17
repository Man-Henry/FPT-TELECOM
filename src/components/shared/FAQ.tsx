'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQProps {
  title?: string;
  description?: string;
  data: FAQItem[];
}

export function FAQ({ 
  title = "Câu Hỏi Thường Gặp", 
  description = "Giải đáp mọi thắc mắc của bạn về dịch vụ FPT Telecom",
  data 
}: FAQProps) {
  return (
    <section className="py-24 bg-white dark:bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        <Accordion className="w-full">
          {data.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-orange-600 transition-colors py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
