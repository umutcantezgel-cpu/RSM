import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/ui/Reveal';
import HRJobAccordionItem from './HRJobAccordionItem';
import { ArrowRight } from 'lucide-react';

interface JobItem {
  role: string;
  area: string;
  loc: string;
  body: string;
  tags: string[];
}

interface HRJobSectionProps {
  locale: string;
}

export default async function HRJobSection({ locale }: HRJobSectionProps) {
  const t = await getTranslations({ locale, namespace: 'Karriere' });
  const jobs = t.raw('jobs') as JobItem[];

  return (
    <section className="bg-white border-y border-slate-200/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          
          {/* LEFT COLUMN: STICKY TITLE AND INITIATIVE CARD */}
          <div className="lg:sticky lg:top-28 space-y-8">
            <Reveal direction="up">
              <div className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase mb-4">
                {t('HRJobSection.tagline')}
              </div>
              <h2 className="font-outfit font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight uppercase">
                {t('HRJobSection.heading')}
              </h2>
            </Reveal>

            <Reveal direction="up" delay={100}>
              <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300">
                <h3 className="font-outfit font-bold text-lg text-slate-900 tracking-tight">
                  {t('HRJobSection.initiative_title')}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 mt-2.5 mb-6">
                  {t('HRJobSection.initiative_desc')}
                </p>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-outfit font-semibold text-xs tracking-wider uppercase text-white bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
                >
                  {t('HRJobSection.initiative_cta')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: ACCORDION LIST */}
          <div className="space-y-4">
            <Reveal direction="up" delay={200}>
              <div className="flex flex-col gap-4">
                {jobs.map((job, idx) => (
                  <HRJobAccordionItem
                    key={idx}
                    job={job}
                    num={String(idx + 1).padStart(2, '0')}
                  />
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
