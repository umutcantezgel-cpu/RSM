"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Lock, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function LoginForm() {
  const t = useTranslations('Portal');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    if (!email.trim() || !password.trim()) {
      setMessage({
        ok: false,
        text: t('error_empty')
      });
      return;
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email.trim())) {
      setMessage({
        ok: false,
        text: t('error_invalid_email')
      });
      return;
    }

    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setMessage({
        ok: true,
        text: t('success_message')
      });
    }, 800);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (message) setMessage(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (message) setMessage(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Form Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
          <Lock className="w-5 h-5" />
        </span>
        <div>
          <h2 className="font-outfit font-bold text-lg text-slate-900 tracking-tight">
            {t('form_title')}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('form_subtitle')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div>
          <label 
            htmlFor="email"
            className="block font-outfit text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2"
          >
            {t('label_email')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={t('placeholder_email')}
            disabled={isPending}
            aria-invalid={message && !message.ok ? "true" : "false"}
            aria-describedby={message && !message.ok ? "login-error" : undefined}
            className="w-full px-5 py-3.5 rounded-full bg-slate-50 border border-slate-200/80 text-slate-900 placeholder-slate-400 text-sm font-sans outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        {/* Password Field */}
        <div className="mt-5">
          <label 
            htmlFor="password"
            className="block font-outfit text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2"
          >
            {t('label_password')}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder={t('placeholder_password')}
            disabled={isPending}
            aria-invalid={message && !message.ok ? "true" : "false"}
            aria-describedby={message && !message.ok ? "login-error" : undefined}
            className="w-full px-5 py-3.5 rounded-full bg-slate-50 border border-slate-200/80 text-slate-900 placeholder-slate-400 text-sm font-sans outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mt-5 text-xs text-slate-500">
          <label className="min-h-[44px] inline-flex items-center gap-2 cursor-pointer select-none hover:text-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isPending}
              className="w-4.5 h-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />
            <span>{t('checkbox_remember')}</span>
          </label>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="min-h-[44px] inline-flex items-center px-2 py-1 text-blue-600 hover:text-blue-700 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full"
          >
            {t('link_forgot_password')}
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-7 py-3.5 px-6 rounded-full font-outfit font-semibold text-xs tracking-wider uppercase text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-75 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
        >
          {t('btn_submit')}
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Feedback Message */}
        {message && (
          <div 
            id="login-error"
            role="alert"
            className={`mt-5 p-4 rounded-2xl border text-xs md:text-sm font-medium leading-relaxed flex items-start gap-2.5 transition-all duration-300 ${
              message.ok 
                ? "bg-blue-50 border-blue-200 text-blue-800" 
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {message.ok ? (
              <CheckCircle2 className="w-4.5 h-4.5 text-blue-800 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4.5 h-4.5 text-red-700 shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Security Info */}
        <div className="flex items-center gap-2 justify-center mt-6 text-slate-400 text-[11px] tracking-wide uppercase font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400/80" />
          <span>{t('security_info')}</span>
        </div>
      </form>
    </div>
  );
}
