import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/Reveal';
import { PageTransition } from '@/components/ui/PageTransition';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ImpressumPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Impressum' });

  return (
    <PageTransition>
    <div className="flex flex-col gap-12">
      {/* PAGE HEAD */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Reveal className="max-w-3xl" direction="up">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1.5px] bg-blue-600" />
            <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
              {t('PageHead.tagline')}
            </span>
          </div>
          <h1 className="font-outfit font-extrabold text-slate-900 text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight uppercase">
            {t('PageHead.title')}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 mt-6 max-w-2xl">
            {t('PageHead.subtitle')}
          </p>
        </Reveal>
      </section>

      {/* CONTENT & BLOCKS */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-24">
        <Reveal direction="up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Diensteanbieter */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300">
              <div className="font-outfit text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-4">
                {t('blocks.diensteanbieter.label')}
              </div>
              <div className="text-[15px] leading-relaxed text-slate-600">
                <strong className="text-slate-900 font-semibold block mb-1">
                  {t('blocks.diensteanbieter.company')}
                </strong>
                {t('blocks.diensteanbieter.street')}<br />
                {t('blocks.diensteanbieter.city')}<br />
                {t('blocks.diensteanbieter.country')}
              </div>
            </div>

            {/* Vertreten durch */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300">
              <div className="font-outfit text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-4">
                {t('blocks.vertreten_durch.label')}
              </div>
              <div className="text-[15px] leading-relaxed text-slate-600">
                <div className="mb-1">{t('blocks.vertreten_durch.title')}</div>
                <strong className="text-slate-900 font-semibold block">
                  {t('blocks.vertreten_durch.manager_1')}
                </strong>
                <strong className="text-slate-900 font-semibold block">
                  {t('blocks.vertreten_durch.manager_2')}
                </strong>
              </div>
            </div>

            {/* Kontakt */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300">
              <div className="font-outfit text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-4">
                {t('blocks.kontakt.label')}
              </div>
              <div className="text-[15px] leading-relaxed text-slate-600 flex flex-col gap-1.5">
                <div>
                  <span>{t('blocks.kontakt.phone_label')}</span>
                  <a 
                    href={`tel:${t('blocks.kontakt.phone_value')}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -mx-1 py-0.5 min-h-[44px] inline-flex items-center"
                  >
                    {t('blocks.kontakt.phone_value')}
                  </a>
                </div>
                <div>
                  <span>{t('blocks.kontakt.fax_label')}</span>
                  <span className="text-slate-500">{t('blocks.kontakt.fax_value')}</span>
                </div>
                <div>
                  <span>{t('blocks.kontakt.email_label')}</span>
                  <a 
                    href={`mailto:${t('blocks.kontakt.email_value')}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -mx-1 py-0.5 min-h-[44px] inline-flex items-center"
                  >
                    {t('blocks.kontakt.email_value')}
                  </a>
                </div>
              </div>
            </div>

            {/* Registereintrag */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300">
              <div className="font-outfit text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-4">
                {t('blocks.registereintrag.label')}
              </div>
              <div className="text-[15px] leading-relaxed text-slate-600">
                <strong className="text-slate-900 font-semibold block mb-1">
                  {t('blocks.registereintrag.title')}
                </strong>
                <div>
                  <span>{t('blocks.registereintrag.court_label')}</span>
                  <span>{t('blocks.registereintrag.court_value')}</span>
                </div>
                <div>
                  <span>{t('blocks.registereintrag.number_label')}</span>
                  <span>{t('blocks.registereintrag.number_value')}</span>
                </div>
              </div>
            </div>

            {/* Umsatzsteuer-ID */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300">
              <div className="font-outfit text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-4">
                {t('blocks.umsatzsteuer_id.label')}
              </div>
              <div className="text-[15px] leading-relaxed text-slate-600">
                <div className="mb-1">{t('blocks.umsatzsteuer_id.title')}</div>
                <strong className="text-slate-900 font-semibold block">
                  {t('blocks.umsatzsteuer_id.value')}
                </strong>
              </div>
            </div>

            {/* Aufsicht & Kammer */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300">
              <div className="font-outfit text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-4">
                {t('blocks.aufsicht_kammer.label')}
              </div>
              <div className="text-[15px] leading-relaxed text-slate-600">
                <div className="mb-1">{t('blocks.aufsicht_kammer.chamber_label')}</div>
                <div className="text-slate-900 font-semibold mb-2">{t('blocks.aufsicht_kammer.chamber_value')}</div>
                <div className="text-xs text-slate-500">
                  <span>{t('blocks.aufsicht_kammer.profession_label')}</span>
                  <span>{t('blocks.aufsicht_kammer.profession_value')}</span>
                </div>
              </div>
            </div>

            {/* Verbraucherstreitbeilegung */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 md:col-span-2">
              <div className="font-outfit text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-4">
                {t('blocks.verbraucherstreitbeilegung.label')}
              </div>
              <div className="text-[15px] leading-relaxed text-slate-600">
                <span>{t('blocks.verbraucherstreitbeilegung.text')}</span>
                <a 
                  href={`https://${t('blocks.verbraucherstreitbeilegung.link_text')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -mx-1 py-0.5 inline-flex items-center min-h-[44px]"
                >
                  {t('blocks.verbraucherstreitbeilegung.link_text')}
                </a>
              </div>
            </div>

          </div>
        </Reveal>

        {/* Disclaimer Section */}
        <Reveal direction="up" delay={0.2}>
          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-blue-900/5 text-slate-300 relative overflow-hidden">
            {/* Decorative mesh pattern overlay */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="font-outfit text-[11px] font-bold tracking-widest text-blue-300 uppercase mb-5">
                {t('disclaimer.label')}
              </div>
              <p className="text-sm leading-relaxed text-slate-400 max-w-4xl mb-6">
                {t('disclaimer.p1')}
              </p>
              <p className="text-sm leading-relaxed text-slate-400 max-w-4xl">
                {t('disclaimer.p2')}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Warning/Note Text */}
        <Reveal direction="up" delay={0.25}>
          <p className="text-[12.5px] leading-relaxed text-slate-400 mt-8 max-w-2xl">
            {t('note')}
          </p>
        </Reveal>
      </section>
    </div>
    </PageTransition>
  );
}
