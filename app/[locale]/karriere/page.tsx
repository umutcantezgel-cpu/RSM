import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/Reveal';
import HRJobSection from '@/components/karriere/HRJobSection';
import FAQAccordion from '@/components/karriere/FAQAccordion';
import { PageTransition } from '@/components/ui/PageTransition';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function KarrierePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Karriere' });

  return (
    <PageTransition>
    <div className="flex flex-col gap-24">
      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Reveal className="max-w-4xl" direction="up">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1.5px] bg-blue-600"></span>
            <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
              {t('PageHead.tagline')}
            </span>
          </div>
          <h1 className="font-outfit font-extrabold text-slate-900 text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight uppercase">
            {t('PageHead.title')}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 mt-6 max-w-3xl">
            {t('PageHead.description')}
          </p>
        </Reveal>
      </section>

      {/* JOBS SECTION */}
      <HRJobSection locale={locale} />

      {/* FAQ SECTION */}
      <FAQAccordion locale={locale} />
    </div>
    </PageTransition>
  );
}
