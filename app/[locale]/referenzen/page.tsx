import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/ui/Reveal';
import ProjectGrid from '@/components/referenzen/ProjectGrid';
import { PageTransition } from '@/components/ui/PageTransition';
import { ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface ProjectItem {
  name: string;
  cat: string;
  meta: string;
  kpi: string;
  body: string;
}

interface StatItem {
  v: string;
  l: string;
}

export default async function ReferenzenPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Referenzen' });

  const filters = t.raw('chips') as string[];
  const projects = t.raw('refs') as ProjectItem[];
  const stats = t.raw('stats') as StatItem[];

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

      {/* PROJECT GRID SECTION */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <Reveal direction="up">
          <ProjectGrid filters={filters} projects={projects} />
        </Reveal>
      </section>

      {/* STATS SECTION */}
      <section className="bg-slate-900 text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="pl-6 border-l border-slate-700">
                <div className="font-outfit font-extrabold text-3xl md:text-4xl text-white tracking-tight">
                  {stat.v}
                </div>
                <div className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
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
            {t('CTA.cta_request')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>
    </div>
    </PageTransition>
  );
}
