import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/ui/Reveal';
import NexusTabs from '@/components/unternehmen/NexusTabs';
import { PageTransition } from '@/components/ui/PageTransition';
import { ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface Stat {
  v: string;
  l: string;
}

interface NexusItem {
  tag: string;
  num: string;
  name: string;
  role: string;
  body: string;
  stats: Stat[];
}

interface ValueItem {
  t: string;
  d: string;
}

const valueIcons = [ShieldCheck, Clock, Users];

export default async function UnternehmenPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Unternehmen' });

  const nexusItems = t.raw('nexus') as NexusItem[];
  const valueItems = t.raw('values') as ValueItem[];

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

      {/* NEXUS TABS SECTION */}
      <section className="bg-white border-y border-slate-200/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <NexusTabs items={nexusItems} />
          </Reveal>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <Reveal className="max-w-2xl mb-12" direction="up">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-outfit text-xs font-bold text-slate-300">
              {"—"}
            </span>
            <span className="w-6 h-[1px] bg-slate-200"></span>
            <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
              {t('Leitprinzipien.tag')}
            </span>
          </div>
          <h2 className="font-outfit font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight uppercase">
            {t('Leitprinzipien.heading')}
          </h2>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6" direction="up" delay={100}>
          {valueItems.map((val, idx) => {
            const IconComponent = valueIcons[idx % valueIcons.length];
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/60 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-600 mb-5">
                  <IconComponent className="w-5 h-5" />
                </span>
                <h3 className="font-outfit font-bold text-lg md:text-xl text-slate-900 tracking-tight">
                  {val.t}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 mt-3.5">
                  {val.d}
                </p>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* CTA SECTION */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal
          className="bg-slate-900 border border-slate-800 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
          direction="up"
        >
          <div>
            <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-white tracking-tight uppercase">
              {t('CTA.heading')}
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-3 max-w-xl">
              {t('CTA.description')}
            </p>
          </div>
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-outfit font-semibold text-sm tracking-wider uppercase text-slate-900 bg-slate-50 hover:bg-white transition-all cursor-pointer min-h-[44px] shrink-0"
          >
            {t('CTA.cta_contact')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>
    </div>
    </PageTransition>
  );
}
