import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/ui/Reveal';
import ServiceTabs from '@/components/leistungen/ServiceTabs';
import { PageTransition } from '@/components/ui/PageTransition';
import { ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface ServiceItem {
  name: string;
  short: string;
  lead: string;
  body: string;
  points: string[];
}

interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

interface EsgItem {
  k: string;
  t: string;
  d: string;
}

export default async function LeistungenPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Leistungen' });

  const services = t.raw('services') as ServiceItem[];
  const steps = t.raw('steps') as ProcessStep[];
  const esgItems = t.raw('esg') as EsgItem[];

  return (
    <PageTransition>
    <div className="flex flex-col gap-24">
      {/* PAGE HEAD */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Reveal className="max-w-3xl" direction="up">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1.5px] bg-blue-600"></span>
            <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
              {t('PageHead.tagline')}
            </span>
          </div>
          <h1 className="font-outfit font-extrabold text-slate-900 text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight uppercase">
            {t('PageHead.title')}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 mt-6 max-w-2xl">
            {t('PageHead.description')}
          </p>
        </Reveal>
      </section>

      {/* SERVICE TABS SECTION */}
      <section className="bg-white border-y border-slate-200/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <ServiceTabs services={services} />
          </Reveal>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <Reveal className="max-w-2xl mb-12" direction="up">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-outfit text-xs font-bold text-slate-300">
              {"—"}
            </span>
            <span className="w-6 h-[1px] bg-slate-200"></span>
            <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
              {t('DerProzess.tag')}
            </span>
          </div>
          <h2 className="font-outfit font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight uppercase">
            {t('DerProzess.heading')}
          </h2>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-6 border-t border-slate-200/60" direction="up" delay={100}>
          {steps.map((step, idx) => (
            <div key={idx} className="pr-4 border-r border-slate-200/60 last:border-r-0 md:odd:border-r-0 lg:odd:border-r">
              <div className="font-outfit font-extrabold text-sm text-blue-600 tracking-wide">
                {step.n}
              </div>
              <div className="font-outfit font-bold text-base text-slate-900 mt-3.5">
                {step.t}
              </div>
              <p className="text-xs leading-relaxed text-slate-500 mt-2">
                {step.d}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ESG SECTION */}
      <section className="bg-slate-900 text-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-12" direction="up">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[1.5px] bg-blue-300/80"></span>
              <span className="font-outfit text-xs font-bold tracking-widest text-blue-300/80 uppercase">
                {t('Nachhaltigkeit.tagline')}
              </span>
            </div>
            <h2 className="font-outfit font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase max-w-2xl leading-none">
              {t('Nachhaltigkeit.heading')}
            </h2>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6" direction="up" delay={100}>
            {esgItems.map((esg, idx) => (
              <div
                key={idx}
                className="border border-slate-800 rounded-3xl p-8 bg-slate-950/40"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-slate-800 text-[10px] font-bold tracking-wider text-blue-300/80 uppercase">
                  {esg.k}
                </div>
                <div className="font-outfit font-bold text-lg md:text-xl text-white mt-5">
                  {esg.t}
                </div>
                <p className="text-sm leading-relaxed text-slate-400 mt-3">
                  {esg.d}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal
          className="border border-slate-200/60 rounded-3xl p-10 md:p-14 bg-white shadow-xl shadow-blue-900/5 flex flex-col md:flex-row md:items-center justify-between gap-8"
          direction="up"
        >
          <div>
            <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight uppercase">
              {t('CTA.heading')}
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-3 max-w-xl">
              {t('CTA.description')}
            </p>
          </div>
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-outfit font-semibold text-sm tracking-wider uppercase text-white bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer min-h-[44px] shrink-0"
          >
            {t('CTA.cta_start')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>
    </div>
    </PageTransition>
  );
}
