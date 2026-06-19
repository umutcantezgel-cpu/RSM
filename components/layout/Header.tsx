"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Logo } from '@/components/ui/Logo';
import { LogIn } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { key: 'home', href: '/', num: '01' },
    { key: 'unternehmen', href: '/unternehmen', num: '02' },
    { key: 'leistungen', href: '/leistungen', num: '03' },
    { key: 'referenzen', href: '/referenzen', num: '04' },
    { key: 'karriere', href: '/karriere', num: '05' },
  ] as const;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
      style={{ viewTransitionName: 'site-header' }}
    >
      <nav
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between transition-all duration-300",
          scrolled ? "rounded-[2rem] glass-panel w-[95%] max-w-6xl" : "bg-transparent w-full"
        )}
      >
        <Link href="/" className="flex items-center gap-3 shrink-0 pointer-events-auto cursor-pointer group -ml-1 md:-ml-2">
          <Logo variant="dark" className="transition-transform duration-300 group-hover:scale-105" />
          <span className="h-6 w-px bg-slate-300/60 rounded-full hidden sm:block transition-colors"></span>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-slate-500 uppercase leading-tight hidden sm:block">
            {t('brand_holding_name')}<br />
            <span className="text-[9px] text-slate-400">{t('brand_holding_sub')}</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.key}
                href={l.href}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-outfit text-sm tracking-wide uppercase",
                  isActive 
                    ? "font-bold text-slate-900 bg-slate-100/80" 
                    : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                )}
              >
                <span 
                  className={cn(
                    "text-[10px] font-bold tracking-wider",
                    isActive ? "text-blue-600" : "text-slate-300"
                  )}
                >
                  {l.num}
                </span>
                {t(l.key)}
              </Link>
            );
          })}
        </div>

        <Link
          href="/portal"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-outfit font-semibold text-sm tracking-wide uppercase text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all shrink-0"
        >
          <LogIn className="w-4 h-4" />
          {t('portal')}
        </Link>
      </nav>
    </header>
  );
}
