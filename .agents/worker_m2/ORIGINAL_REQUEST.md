## 2026-06-18T21:19:47Z
Objective:
Translate 4 raw HTML pages into clean Next.js Server Components under app/[locale]/, and set up all translations.
1. Translate `Home.dc.html` -> `app/[locale]/page.tsx`.
2. Translate `Unternehmen.dc.html` -> `app/[locale]/unternehmen/page.tsx`.
3. Translate `Leistungen.dc.html` -> `app/[locale]/leistungen/page.tsx`.
4. Translate `Referenzen.dc.html` -> `app/[locale]/referenzen/page.tsx`.

Requirements to follow:
- Strict compliance with RULES.md and TOKENS.md.
- Absolutely no inline styles. Use Tailwind CSS v4 styling only (rounded borders, light theme, hellblau accents, glassmorphic shadows).
- Absolutely no images or <img> tags. Use the <MediaSlot /> component (imported from @/components/ui/MediaSlot) for all graphic boxes.
- Extract all text strings into messages/de.json and retrieve them via next-intl.
- Use the client-side <Reveal /> wrapper (imported from @/components/ui/Reveal) for soft scroll animations.
- Safe hydration and proper TypeScript types (strict checks must pass).

Steps to execute:
1. Merge the proposed JSON structure from /Users/umurey/Downloads/RSM/.agents/explorer_m2_1/analysis.md into /Users/umurey/Downloads/RSM/messages/de.json.
2. Create a type helper file `global.d.ts` at the root of the project to allow autocomplete and type check next-intl translations:
   ```typescript
   type Messages = typeof import('./messages/de.json');
   declare global {
     interface IntlMessages extends Messages {}
   }
   ```
3. Implement the client-side interactive subcomponents under components/:
   - `components/unternehmen/NexusTabs.tsx`: Interactive tabs for partner switcher using useState.
   - `components/leistungen/ServiceTabs.tsx`: Interactive tabs for services breakdown.
   - `components/referenzen/ProjectGrid.tsx`: Category filtering for projects list with button elements.
   Make sure these client components are marked with "use client" and accept pre-resolved props or typed structured translations passed from parent Server Components. Make sure they use Tailwind v4 styling (no inline styles). Use Lucide-React icons instead of hardcoded raw SVGs.
4. Implement the page components under `app/[locale]/:`
   - `app/[locale]/page.tsx`
   - `app/[locale]/unternehmen/page.tsx`
   - `app/[locale]/leistungen/page.tsx`
   - `app/[locale]/referenzen/page.tsx`
   They must be Server Components, and explicitly await page parameters: `const { locale } = await params;` and use `const t = await getTranslations({ locale, namespace: '...' })` from `next-intl/server`.
   Ensure the Home page contains a `<MediaSlot label="3D-BIM Visualisierung EWS" />` to satisfy the tests.
5. Verify your changes by running `npm run build` and verifying that it compiles cleanly with zero TypeScript errors or linter warnings.
6. Verify your changes using the verification test: `npx tsx components/ui/__tests__/verify_all.tsx`.
