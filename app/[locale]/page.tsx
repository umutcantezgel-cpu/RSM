import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/ui/Reveal';
import { MediaSlot } from '@/components/ui/MediaSlot';
import { HeroGlobe } from '@/components/ui/HeroGlobe';
import { PageTransition } from '@/components/ui/PageTransition';
import { Building2, LayoutGrid, Flame, Hammer, ArrowRight, Check, MapPin } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface StatItem {
  v: string;
  l: string;
}

interface ServiceItem {
  name: string;
  short: string;
  desc: string;
}

interface RefItem {
  name: string;
  cat: string;
  kpi: string;
  meta: string;
}

const icons = [Building2, LayoutGrid, Flame, Hammer];

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  const heroStats = t.raw('heroStats') as StatItem[];
  const services = t.raw('services') as ServiceItem[];
  const bigStats = t.raw('bigStats') as StatItem[];
  const refs = t.raw('refs') as RefItem[];

  return (
    <PageTransition>
    <div className="flex flex-col gap-24 relative">
      {/* HERO SECTION */}
      <section 
        className="relative overflow-hidden min-h-[clamp(580px,76vh,800px)] flex items-center border-b border-slate-200/50 bg-slate-100/50"
      >
        <HeroGlobe />
        
        {/* Corner registration ticks */}
        <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-blue-300/70 pointer-events-none z-10" />
        <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-blue-300/70 pointer-events-none z-10" />
        <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-blue-300/70 pointer-events-none z-10" />
        <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-blue-300/70 pointer-events-none z-10" />

        {/* Ambient background glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent pointer-events-none z-10" />

        <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 pointer-events-none">
          <Reveal className="max-w-3xl mr-auto pointer-events-auto" direction="up">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1.5px] bg-blue-600"></span>
              <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
                {t('Hero.tagline')}
              </span>
            </div>
            
            <h1 className="font-outfit font-extrabold text-slate-900 text-5xl md:text-7xl leading-[1.05] tracking-tight uppercase">
              {t('Hero.title').split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-slate-600 mt-7 max-w-2xl">
              {t('Hero.description')}
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <Link
                href="/leistungen"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-outfit font-semibold text-sm tracking-wider uppercase text-white bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all cursor-pointer min-h-[44px]"
              >
                {t('Hero.cta_services')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/referenzen"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-outfit font-semibold text-sm tracking-wider uppercase text-slate-900 bg-white/70 backdrop-blur-md border border-blue-200/70 hover:border-blue-400/80 transition-all cursor-pointer min-h-[44px]"
              >
                {t('Hero.cta_references')}
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-9 border-t border-slate-200/60 max-w-2xl">
              {heroStats.map((stat, idx) => (
                <div key={idx} className="pr-4 border-r border-slate-200/60 last:border-r-0">
                  <div className="font-outfit font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
                    {stat.v}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1 leading-snug">
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>

            {/* DGNB & Location chips */}
            <div className="flex flex-wrap items-center gap-4 mt-12">
              <div className="flex items-center gap-3.5 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl p-3.5 shadow-xl shadow-blue-900/5">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </span>
                <div>
                  <div className="font-outfit font-bold text-xs text-slate-900">
                    {t('Hero.dgnb_title')}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {t('Hero.dgnb_desc')}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-full py-2 px-4 text-[10px] font-bold tracking-wider text-slate-500 uppercase shadow-sm shadow-blue-900/5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {t('Hero.location_chip')}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LEISTUNGSFELDER SECTION */}
      <section className="bg-white border-y border-slate-200/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex justify-between items-end gap-6 flex-wrap mb-12" direction="up">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-outfit text-xs font-bold text-slate-300">
                  {t('Leistungsfelder.tag')}
                </span>
                <span className="w-6 h-[1px] bg-slate-200"></span>
                <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
                  {t('Leistungsfelder.title')}
                </span>
              </div>
              <h2 className="font-outfit font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight uppercase">
                {t('Leistungsfelder.heading')}
              </h2>
            </div>
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-2 font-outfit font-bold text-xs tracking-wider uppercase text-slate-900 pb-1 border-b-2 border-blue-600 hover:text-blue-600 transition-colors"
            >
              {t('Leistungsfelder.cta_all_services')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" direction="up" delay={100}>
            {services.map((service, idx) => {
              const IconComponent = icons[idx % icons.length];
              return (
                <Link
                  key={idx}
                  href="/leistungen"
                  className="block bg-slate-50 border border-slate-200/60 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 hover:bg-white"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white mb-5">
                    <IconComponent className="w-5 h-5" />
                  </span>
                  <div className="font-outfit font-bold text-lg text-slate-900">
                    {service.name}
                  </div>
                  <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mt-1">
                    {service.short}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 mt-4">
                    {service.desc}
                  </p>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* VERBUND TEASER SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center">
          {/* MediaSlot for Diagram */}
          <Reveal className="w-full aspect-[4/3] min-h-[300px]" direction="up">
            <MediaSlot
              label={t('DerVerbund.placeholder_label')}
              className="w-full h-full shadow-2xl shadow-blue-900/5"
            />
          </Reveal>

          <Reveal className="flex flex-col items-start" direction="up" delay={150}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-outfit text-xs font-bold text-slate-300">
                {t('DerVerbund.tag')}
              </span>
              <span className="w-6 h-[1px] bg-slate-200"></span>
              <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
                {t('DerVerbund.title')}
              </span>
            </div>
            <h2 className="font-outfit font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight uppercase leading-[1.08]">
              {t('DerVerbund.heading').split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-base leading-relaxed text-slate-600 mt-6 max-w-xl">
              {t('DerVerbund.description')}
            </p>
            <Link
              href="/unternehmen"
              className="inline-flex items-center gap-2 mt-8 font-outfit font-bold text-xs tracking-wider uppercase text-slate-900 pb-1 border-b-2 border-blue-600 hover:text-blue-600 transition-colors"
            >
              {t('DerVerbund.cta_explore')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* BIG STATS DARK SECTION */}
      <section className="bg-slate-900 text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {bigStats.map((stat, idx) => (
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

      {/* REFERENZEN TEASER SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Reveal className="flex justify-between items-end gap-6 flex-wrap mb-12" direction="up">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-outfit text-xs font-bold text-slate-300">
                {t('Referenzen.tag')}
              </span>
              <span className="w-6 h-[1px] bg-slate-200"></span>
              <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
                {t('Referenzen.title')}
              </span>
            </div>
            <h2 className="font-outfit font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight uppercase">
              {t('Referenzen.heading')}
            </h2>
          </div>
          <Link
            href="/referenzen"
            className="inline-flex items-center gap-2 font-outfit font-bold text-xs tracking-wider uppercase text-slate-900 pb-1 border-b-2 border-blue-600 hover:text-blue-600 transition-colors"
          >
            {t('Referenzen.cta_all_projects')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6" direction="up" delay={100}>
          {refs.map((ref, idx) => (
            <Link
              key={idx}
              href="/referenzen"
              className="block bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10"
            >
              <div className="relative aspect-[4/2.6] bg-slate-100 flex items-center justify-center">
                <MediaSlot label={ref.name} className="w-full h-full rounded-none" />
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 border border-slate-100 text-[10px] font-bold tracking-wider text-blue-600 uppercase shadow-sm">
                  {ref.cat}
                </span>
              </div>
              <div className="p-6">
                <div className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
                  {ref.kpi}
                </div>
                <h3 className="font-outfit font-bold text-lg text-slate-900 mt-1">
                  {ref.name}
                </h3>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  {ref.meta}
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* CTA SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center" direction="up">
          {/* Decorative mesh */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(120%_90%_at_50%_0%,black_30%,transparent_75%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="font-outfit font-extrabold text-3xl md:text-4xl text-white uppercase tracking-tight">
              {t('CTA.heading')}
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-slate-300 mt-5">
              {t('CTA.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-outfit font-semibold text-sm tracking-wider uppercase text-slate-900 bg-slate-50 hover:bg-white transition-all cursor-pointer min-h-[44px]"
              >
                {t('CTA.cta_request')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/unternehmen"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-outfit font-semibold text-sm tracking-wider uppercase text-white bg-transparent border border-slate-700 hover:border-slate-500 transition-all cursor-pointer min-h-[44px]"
              >
                {t('CTA.cta_learn_more')}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
    </PageTransition>
  );
}
