import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const t = useTranslations('Footer');
  const tHeader = useTranslations('Header');

  return (
    <footer className="relative overflow-hidden bg-slate-900 text-slate-400 font-sans mt-32 rounded-t-[2rem]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4">
              <Logo variant="light" />
              <span className="h-6 w-px bg-slate-700 rounded-full hidden sm:block"></span>
              <div className="flex flex-col leading-tight">
                <span className="font-outfit font-bold text-[13px] text-white tracking-wide">{t('brand_name')}</span>
                <span className="text-[9px] font-semibold tracking-[0.22em] text-slate-500">{t('brand_group')}</span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-400 max-w-sm">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1.5 rounded-full border border-slate-700 text-[11px] tracking-wider text-slate-300 uppercase">{t('badges.dgnb')}</span>
              <span className="px-3 py-1.5 rounded-full border border-slate-700 text-[11px] tracking-wider text-slate-300 uppercase">{t('badges.iso')}</span>
              <span className="px-3 py-1.5 rounded-full border border-slate-700 text-[11px] tracking-wider text-slate-300 uppercase">{t('badges.dsgvo')}</span>
            </div>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-6">{t('nav_title')}</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/" className="text-slate-300 hover:text-blue-300 transition-colors">{tHeader('home')}</Link>
              <Link href="/unternehmen" className="text-slate-300 hover:text-blue-300 transition-colors">{tHeader('unternehmen')}</Link>
              <Link href="/leistungen" className="text-slate-300 hover:text-blue-300 transition-colors">{tHeader('leistungen')}</Link>
              <Link href="/referenzen" className="text-slate-300 hover:text-blue-300 transition-colors">{tHeader('referenzen')}</Link>
              <Link href="/karriere" className="text-slate-300 hover:text-blue-300 transition-colors">{tHeader('karriere')}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-6">{t('legal_title')}</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/impressum" className="text-slate-300 hover:text-blue-300 transition-colors">{t('legal_impressum')}</Link>
              <Link href="/datenschutz" className="text-slate-300 hover:text-blue-300 transition-colors">{t('legal_datenschutz')}</Link>
              <Link href="/agb" className="text-slate-300 hover:text-blue-300 transition-colors">{t('legal_agb')}</Link>
              <Link href="/portal" className="text-slate-300 hover:text-blue-300 transition-colors">{t('legal_portal')}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-6">{t('contact_title')}</h4>
            <div className="flex flex-col gap-4 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{t('address')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{t('phone')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{t('email')}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="h-px bg-slate-800 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>{t('copyright')}</div>
          <div className="font-outfit tracking-widest uppercase">{t('claim')}</div>
        </div>
      </div>
    </footer>
  );
}
