"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Logo } from '@/components/ui/Logo';
import { LogIn, Menu, X, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const links = [
    { key: 'home', href: '/', num: '01' },
    { key: 'unternehmen', href: '/unternehmen', num: '02' },
    { key: 'leistungen', href: '/leistungen', num: '03' },
    { key: 'referenzen', href: '/referenzen', num: '04' },
    { key: 'karriere', href: '/karriere', num: '05' },
  ] as const;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
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
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 shrink-0 pointer-events-auto cursor-pointer group -ml-1 md:-ml-2 relative z-[70]">
            <Logo variant="dark" className="transition-transform duration-300 group-hover:scale-105" />
            <span className="h-6 w-px bg-slate-300/60 rounded-full hidden sm:block transition-colors"></span>
            <span className={cn(
              "text-[10px] sm:text-[11px] font-semibold tracking-widest text-slate-500 uppercase leading-tight hidden sm:block transition-opacity",
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            )}>
              {t('brand_holding_name')}<br />
              <span className="text-[9px] text-slate-400">{t('brand_holding_sub')}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
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

          {/* Right Actions: Portal Button & Mobile Toggle */}
          <div className="flex items-center gap-3 relative z-[70]">
            <Link
              href="/portal"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-outfit font-semibold text-xs sm:text-sm tracking-wide uppercase border-2 transition-all shrink-0",
                mobileMenuOpen 
                  ? "border-transparent text-slate-400 hover:text-white" 
                  : "text-slate-900 border-slate-900 hover:bg-slate-900 hover:text-white"
              )}
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">{t('portal')}</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                mobileMenuOpen ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              )}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
            style={{
              background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            }}
          >
            {/* Background Texture */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }} 
            />

            <div className="flex-1 flex flex-col gap-6 relative z-10">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 mt-4">
                {links.map((l, i) => {
                  const isActive = pathname === l.href;
                  return (
                    <motion.div
                      key={l.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={l.href}
                        className="group flex items-center justify-between py-4 border-b border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-blue-500/70 tracking-widest font-mono">
                            {l.num}
                          </span>
                          <span className={cn(
                            "text-2xl sm:text-3xl font-outfit font-semibold uppercase tracking-wide transition-colors",
                            isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                          )}>
                            {t(l.key)}
                          </span>
                        </div>
                        <ArrowRight className={cn(
                          "w-5 h-5 transition-all",
                          isActive ? "text-blue-500 opacity-100" : "text-slate-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                        )} />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile Footer / Branding */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-8 flex flex-col gap-4"
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-outfit font-bold tracking-widest uppercase text-sm mb-2">
                    RSM SYSTEMBAU
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Dein Partner für exzellenten, schnellen und zuverlässigen Systembau weltweit. Brick by Brick.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
