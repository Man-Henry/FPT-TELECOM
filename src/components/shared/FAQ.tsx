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
  title = 'Câu Hỏi Thường Gặp',
  description = 'Giải đáp mọi thắc mắc của bạn về dịch vụ FPT Telecom',
  data,
}: FAQProps) {
  return (
    <section className="dark:bg-background bg-white py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>

        <Accordion className="w-full">
          {data.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border/50 border-b"
            >
              <AccordionTrigger className="py-5 text-left text-lg font-semibold transition-colors hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
