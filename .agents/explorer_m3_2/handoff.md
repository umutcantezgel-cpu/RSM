# Handoff Report — explorer_m3_2

## 1. Observation

- **Prototype Analyzed:** `RSM Systembau Design-Relaunch/Portal.dc.html`
- **Key Files Read:**
  - `agents/RULES.md`
  - `docs/TOKENS.md`
  - `messages/de.json`
  - `app/[locale]/layout.tsx`
  - `components/ui/Reveal.tsx`
  - `components/ui/MediaSlot.tsx`
- **Key Design Requirements from `RULES.md` & `TOKENS.md`:**
  - **i18n priority:** Absolutely no hardcoded user-visible text. The hook `useTranslations` (client-side) and `getTranslations` (server-side) must be used.
  - **Design system:** "Modern Academic Glassmorphism". Includes `rounded-3xl` / `rounded-[2rem]` for containers, `rounded-full` for inputs, buttons, badges. Use of `.glass-panel` class mapping to `bg-white/60 backdrop-blur-2xl shadow-2xl shadow-blue-900/5 border border-white/60`.
  - **Accent Colors:** Elegant light blue (`text-blue-600`, `bg-sky-50`, `border-blue-200`, `ring-cyan-300`).
  - **Motion:** Wrap grid card in `<Reveal direction="up" />` component which automatically respects `prefers-reduced-motion`.
- **Prototype Logic and Content:**
  - Zero-Trust Portal badge, title, description on the left.
  - A decorative radial gradient grid overlay on the left dark zinc-900 section.
  - An interactive login form on the right.
  - Form validation: Check for empty username/password, and validate corporate email format regex `^[^@\s]+@[^@\s]+\.[^@\s]+$`.
  - Form interaction feedback states: Success (`bg-[#eef4fb] border-[#b9d4ec] text-[#2e567c]`) and Error (`bg-red-50 border-red-200 text-red-700`).

---

## 2. Logic Chain

- **Layout Structure:**
  - The `app/[locale]/layout.tsx` file already wraps all sub-pages with `<Header />` and `<Footer />` inside `<main className="flex-1 pt-24 pb-16">`. Therefore, the page component under `app/[locale]/portal/page.tsx` should only return the core layout structure and login component itself, avoiding redundant header and footer rendering.
- **i18n Translation Mapping:**
  - A new namespace `"Portal"` must be appended to `messages/de.json` so that all headings, labels, button texts, validation messages, and success texts are localized.
- **Component Breakdown:**
  - The page requires a Server component `app/[locale]/portal/page.tsx` to read dynamic parameters, resolve translations server-side, and render the static layout containing the dark column and the client component `<LoginForm />`.
  - The login form requires state management (inputs, messaging, pending status) and browser interaction (`onSubmit`). Thus, it must be implemented as a client component `"use client"` at `components/portal/LoginForm.tsx`.
- **CSS Styling Compliance:**
  - We map prototype inline styles to Tailwind CSS v4. Specifically:
    - Inner card grid: `grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] rounded-[2rem] overflow-hidden border border-slate-200/60 bg-white/40 backdrop-blur-xl shadow-2xl shadow-blue-900/5`
    - Dark column: `bg-[#18181b] text-slate-100 p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-center min-h-[400px]`
    - Right glass panel column: `bg-white/60 backdrop-blur-2xl p-8 md:p-12 lg:p-16 flex items-center justify-center border-t border-slate-100 lg:border-t-0 lg:border-l border-slate-200/40`
    - Inputs: `rounded-full` (pill shape as strictly specified in `TOKENS.md`), `px-5 py-3.5 bg-slate-50 border border-slate-200/80`
    - Login button: `w-full mt-7 py-3.5 px-6 rounded-full font-outfit font-semibold text-xs tracking-wider uppercase text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-75 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px]` (meeting minimum A11y 44px touch-target requirement).

---

## 3. Caveats

- **Mock Authentication:** The validation behavior uses local state mimicking an API check. In a production setting, this should connect to NextAuth or a server action endpoint.
- **Image Exclusion:** The layout does not use any images, matching the strict "no images unless explicitly permitted" rule. It uses standard Lucide icons (`Lock`, `ArrowRight`, `CheckCircle2`, `AlertTriangle`, `ShieldCheck`).
- **Locale Routing:** Next.js uses internationalized routing. The component uses `next-intl` to support localized pages.

---

## 4. Conclusion

The translation plan maps the HTML prototype structure to Next.js v16 + React v19 components, utilizing Tailwind CSS v4 and `next-intl` localization. This satisfies all requirements in `RULES.md` and `TOKENS.md`.

### Proposed Translation Namespace for `messages/de.json`

```json
  "Portal": {
    "zero_trust_badge": "Zero-Trust Portal",
    "title": "Sicherer Zugang. Ohne Kompromisse.",
    "description": "Das RSM-Portal ersetzt unsichere PDF-Verteiler und Mail-Anhänge durch eine vollständig verschlüsselte, auditierbare Plattform. Jeder Zugriff wird verifiziert, jede Sitzung protokolliert — DSGVO-konform by Architecture.",
    "features": [
      "Ende-zu-Ende-Verschlüsselung & Mehr-Faktor-Authentifizierung",
      "Vollständige Zugriffs-Auditierung jeder Sitzung",
      "Werkules-Integration für Bautagebuch, Aufmaß & Lohn"
    ],
    "form_title": "Portal-Anmeldung",
    "form_subtitle": "RSM Systembau · RT Holding",
    "label_email": "Unternehmens-E-Mail",
    "placeholder_email": "vorname.name@rsm-systembau.de",
    "label_password": "Passwort",
    "placeholder_password": "••••••••••••",
    "checkbox_remember": "Angemeldet bleiben",
    "link_forgot_password": "Passwort vergessen?",
    "btn_submit": "Sicher anmelden",
    "security_info": "256-bit TLS · DSGVO-konform · MFA",
    "error_empty": "Bitte Benutzerkennung und Passwort eingeben.",
    "error_invalid_email": "Bitte eine gültige Unternehmens-E-Mail verwenden.",
    "success_message": "Zugang verifiziert — Zero-Trust-Sitzung wird initialisiert …"
  }
```

### Proposed Server Component: `app/[locale]/portal/page.tsx`

```tsx
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/Reveal';
import LoginForm from '@/components/portal/LoginForm';
import { Check } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PortalPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Portal' });

  const features = t.raw('features') as string[];

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex justify-center">
      <Reveal className="w-full" direction="up">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] rounded-[2rem] overflow-hidden border border-slate-200/60 bg-white/40 backdrop-blur-xl shadow-2xl shadow-blue-900/5">
          {/* LEFT COLUMN: Dark Info Block */}
          <div className="bg-[#18181b] text-slate-100 p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
            {/* White grid overlay */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(120%_100%_at_0%_0%,black_25%,transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-8.5 h-[1.5px] bg-[#a9caea]"></span>
                <span className="font-outfit text-xs font-bold tracking-[0.16em] uppercase text-[#a9caea]">
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
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 text-[#a9caea] shrink-0">
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
  );
}
```

### Proposed Client Component: `components/portal/LoginForm.tsx`

```tsx
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
            className="w-full px-5 py-3.5 rounded-full bg-slate-50 border border-slate-200/80 text-slate-900 placeholder-slate-400 text-sm font-sans outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mt-5 text-xs text-slate-500">
          <label className="flex items-center gap-2 cursor-pointer select-none hover:text-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isPending}
              className="w-4.5 h-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer accent-blue-600"
            />
            <span>{t('checkbox_remember')}</span>
          </label>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
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
            className={`mt-5 p-4 rounded-2xl border text-xs md:text-sm font-medium leading-relaxed flex items-start gap-2.5 transition-all duration-300 ${
              message.ok 
                ? "bg-[#eef4fb] border-[#b9d4ec] text-[#2e567c]" 
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {message.ok ? (
              <CheckCircle2 className="w-4.5 h-4.5 text-[#2e567c] shrink-0 mt-0.5" />
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
```

---

## 5. Verification Method

To independently verify the implementation:
1. **Compilation Check:** Run `npm run build` to ensure the new files are correctly imported and compiled under TypeScript.
2. **Linting Check:** Run `npm run lint` to confirm zero ESLint violations. In particular, ensure the `react/jsx-no-literals` rule passes with no hardcoded UI strings.
3. **Behavioral Test:**
   - Leave fields empty -> Submit. Message must display: *"Bitte Benutzerkennung und Passwort eingeben."*
   - Enter invalid email format (e.g., `test@`) -> Submit. Message must display: *"Bitte eine gültige Unternehmens-E-Mail verwenden."*
   - Enter correct format -> Submit. Message must display: *"Zugang verifiziert — Zero-Trust-Sitzung wird initialisiert …"*
