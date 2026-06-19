import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/Reveal';
import FAQAccordionItem from './FAQAccordionItem';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  locale: string;
}

export default async function FAQAccordion({ locale }: FAQAccordionProps) {
  const t = await getTranslations({ locale, namespace: 'Karriere' });
  const faqs = t.raw('faqs') as FAQItem[];

  return (
    <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-4xl">
        <Reveal className="mb-12" direction="up">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-outfit text-xs font-bold text-slate-300">{t('FAQSection.dash')}</span>
            <span className="w-6 h-[1px] bg-slate-200"></span>
            <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
              {t('FAQSection.tagline')}
            </span>
          </div>
          <h2 className="font-outfit font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight uppercase">
            {t('FAQSection.heading')}
          </h2>
        </Reveal>

        <Reveal className="space-y-4" direction="up" delay={100}>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <FAQAccordionItem key={idx} faq={faq} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
