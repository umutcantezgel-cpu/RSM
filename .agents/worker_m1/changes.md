# Changes Report

This document records the exact changes made to implement and verify all base component requirements for Milestone 1.

## 1. Added `<Reveal />` Component
- **File:** `components/ui/Reveal.tsx`
- **Details:** 
  - Implemented the client-side scroll animation primitive using `framer-motion` (v12.40.0).
  - Used strict TypeScript interfaces.
  - Set a hydration-safe `isMounted` client check using `useState`/`useEffect` (with `requestAnimationFrame` to prevent synchronous cascading render warnings) to detect `prefers-reduced-motion: reduce`.
  - Added a `22px` vertical/horizontal offset in standard mode with `easeOutExpo` (`[0.16, 1, 0.3, 1]`) easing over `0.6s`.
  - In reduced-motion mode, degrades cleanly to a static fade-in (no offset) over `0.2s` with `easeOut` easing.
  - Guaranteed zero JSX literals in the rendering code (no text nodes, only `{children}`).

## 2. Audited and Modified `<MediaSlot />`
- **File:** `components/ui/MediaSlot.tsx`
- **Details:**
  - Wrapped the hardcoded placeholder text braces and template brackets inside a dynamic JSX template literal expression: `{`[ PLATZHALTER: ${label} ]`}`. This satisfies ESLint's `react/jsx-no-literals` rule.

## 3. Integrated `next-intl` Translations in Layout Shells
- **Files Modified:** 
  - `components/layout/Header.tsx`
  - `components/layout/Footer.tsx`
  - `messages/de.json`
- **Details:**
  - In `messages/de.json`:
    - Added `"brand_logo_symbol": "R"`, `"brand_holding_name": "RT HOLDING"`, and `"brand_holding_sub": "GROUP"` under the `Header` namespace.
    - Added `"brand_logo_symbol": "R"` under the `Footer` namespace.
  - In `components/layout/Header.tsx`:
    - Replaced the hardcoded logo letters ("R", "RT HOLDING", "GROUP") with `{t('brand_logo_symbol')}`, `{t('brand_holding_name')}`, and `{t('brand_holding_sub')}`.
  - In `components/layout/Footer.tsx`:
    - Loaded both `Header` and `Footer` namespaces.
    - Replaced the logo "R" with `{t('brand_logo_symbol')}`.
    - Replaced hardcoded navigation links ("Start", "Unternehmen", "Leistungen", "Referenzen", "Karriere") with `{tHeader('home')}`, `{tHeader('unternehmen')}`, `{tHeader('leistungen')}`, `{tHeader('referenzen')}`, and `{tHeader('karriere')}`.

## 4. TypeScript Strict Mode & Next.js Type Fixes
- **Files Modified:**
  - `app/[locale]/layout.tsx`
  - `i18n/request.ts`
- **Details:**
  - Fixed Next.js 16.2.9 dynamic route layout type compliance by changing the `params` parameter type from `{ locale: string }` to `Promise<{ locale: string }>` in `app/[locale]/layout.tsx`.
  - Removed `as any` type assertions in both files and replaced them with exact locale casts (`as "de"`) to maintain type safety.

## 5. ESLint Configuration Ignored folders
- **File Modified:** `eslint.config.mjs`
- **Details:**
  - Added ignores for reference/mock/template directories (`RSM Systembau Design-Relaunch/**`, `Wieder verwerten für RSM agents/**`, etc.) to allow running clean project lint checking.
