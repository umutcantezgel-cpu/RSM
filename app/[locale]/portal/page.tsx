import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/Reveal';
import LoginForm from '@/components/portal/LoginForm';
import { PageTransition } from '@/components/ui/PageTransition';
import { Check } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PortalPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Portal' });

  const features = t.raw('features') as string[];

  return (
    <PageTransition>
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex justify-center">
      <Reveal className="w-full" direction="up">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] rounded-[2rem] overflow-hidden border border-white/40 bg-white/60 backdrop-blur-2xl shadow-2xl shadow-blue-900/5">
          {/* LEFT COLUMN: Dark Info Block */}
          <div className="bg-slate-900 text-slate-100 p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
            {/* White grid overlay */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(120%_100%_at_0%_0%,black_25%,transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-8.5 h-[1.5px] bg-sky-300"></span>
                <span className="font-outfit text-xs font-bold tracking-[0.16em] uppercase text-sky-300">
                  {t('zero_trust_badge')}
                </span>
              </div>
              
              <h1 className="font-outfit font-black text-3xl md:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-[1.05]">
                {t('title')}
              </h1>
              
              <p className="text-sm md:text-base leading-relaxed text-slate-400 mt-6 max-w-md">
                {t('description')}
              </p>
              
              <div className="flex flex-col gap-4 mt-9">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3.5 text-slate-200 text-sm md:text-base">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 text-sky-300 shrink-0">
                      <Check className="w-4 h-4" strokeWidth={2.6} />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Login Form */}
          <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-12 lg:p-16 flex items-center justify-center border-t border-slate-100 lg:border-t-0 lg:border-l border-slate-200/40">
            <div className="w-full max-w-sm">
              <LoginForm />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
    </PageTransition>
  );
}
