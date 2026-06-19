# Handoff Report: Impressum Page Design & Translation Plan

## 1. Observation
We have inspected the prototype, styling guides, translation dictionary, and layout files:
- **Prototype File:** `RSM Systembau Design-Relaunch/Impressum.dc.html` (lines 1–76). In lines 61–68, it defines the content blocks:
  - `Diensteanbieter` (label & address)
  - `Vertreten durch` (label & managers)
  - `Kontakt` (label, phone, fax, email)
  - `Registereintrag` (label, registry court, number)
  - `Umsatzsteuer-ID` (label & tax ID)
  - `Aufsicht & Kammer` (label & chamber info)
  - `Verbraucherstreitbeilegung` (label & ODR platform details with `grid-column: 1 / -1`)
  - `Haftungs- & Urheberrechtshinweis` (label & two paragraph texts)
  - `Hinweis` (warning note about placeholder status)
- **Styling Rules (`agents/RULES.md`):**
  - **Rule 1 (i18n):** *"Kein einziger nutzersichtbarer Text im Frontend darf hartkodiert werden. Alles läuft zwingend über next-intl. Die ESLint-Regel react/jsx-no-literals ist streng aktiv."* (lines 5–8).
  - **Rule 3 (Design):** *"Modern Academic Glassmorphism... Geometrie: Absolut keine scharfen Kanten. Verwende exzessiv rounded-3xl, rounded-[2rem] und rounded-full... Farben: Basis ist bg-slate-50, bg-gray-100... Akzente elegant hellblau... Effekte: bg-white/60, backdrop-blur-2xl, shadow-2xl shadow-blue-900/5."* (lines 15–20).
  - **Rule 5 (A11y):** *"Touch-Targets müssen mindestens 44x44px groß sein. Sichtbare Focus-Rings für Tastatur-Navigation sind zwingend (z.B. focus-visible:ring-2 focus-visible:ring-blue-500)."* (lines 27–30).
  - **Rule 6 (Motion):** *"Scroll-Reveals (whileInView)... prefers-reduced-motion respektieren."* (lines 32–35).
- **Design Tokens (`docs/TOKENS.md`):**
  - Standard cards/panels: `rounded-3xl`, `rounded-[2rem]`
  - Glass-Panels: `bg-white/60`, `backdrop-blur-2xl`
  - Shadows: `shadow-xl shadow-blue-900/5` (standard) / `shadow-2xl shadow-blue-900/10` (hover)
  - Borders: `border border-white/60`
- **Translation file (`messages/de.json`):** Defines root namespaces for all current pages (e.g. Header, Footer, Home, Leistungen). Currently does not contain an `"Impressum"` key.
- **Reveal component (`components/ui/Reveal.tsx`):** Available component handles framer-motion transitions with reduced-motion support.

## 2. Logic Chain
To implement a pixel-perfect, compliant Impressum page:
1. **Separation of Translation Data:** The raw HTML blocks in the prototype component script (`renderVals` at lines 59–72) must be translated into discrete key-value strings in the `Impressum` dictionary namespace inside `messages/de.json`. This ensures that we do not pass HTML raw tags through the dictionary and that we conform to next-intl structure.
2. **ESLint Compliance (`react/jsx-no-literals`):** To avoid any JSX literals, all text, including dynamic punctuation, labels, and links (like `tel:`, `mailto:`), should dynamically interpolation values from next-intl (e.g., `href={\`tel:\${t('blocks.kontakt.phone_value')}\`}`).
3. **Glassmorphic Grid Cards:** The blocks should be mapped to responsive flex/grid wrappers:
   - Grid layout: `grid grid-cols-1 md:grid-cols-2 gap-6`
   - General cards style: `bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300`
   - Verbraucherstreitbeilegung card style: spans both columns on larger viewports with `md:col-span-2`.
4. **Touch-Targets & Keyboard A11y:**
   - Link elements (`a` tags for tel, mailto, and ODR platform) must have `min-h-[44px]` and `inline-flex items-center` to satisfy the 44px touch-target rule.
   - Links must use explicit styling: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -mx-1 py-0.5`.
5. **Disclaimer Styling:** The disclaimer block ("Haftungs- & Urheberrechtshinweis") serves as an grounding bottom card. We style it with `bg-slate-900 text-slate-300 border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-xl` to match the dark aesthetic sections (e.g. footer and home-page CTA).

## 3. Caveats
- **Placeholder Values:** The registration details (`HRB 00000`, `DE 000 000 000`) and contact details are placeholder values in the prototype. They must be updated with the actual legal details of RSM Systembau GmbH prior to production release.
- **Single Locale:** Currently only the German (`de`) locale is configured. If other locales (e.g. `en`) are added, a corresponding translation block must be introduced under `messages/en.json`.

## 4. Conclusion
We have generated the exact proposed translation file and page component code within the `.agents/explorer_m3_3/` directory:
- Proposed next-intl JSON namespace: `proposed_de.json`
- Proposed page component structure: `proposed_page.tsx`

These proposals satisfy all styling rules, dynamic text directives, layout constraints, motion requirements, and lint rules of the RSM system.

## 5. Verification Method
An implementer should verify the page as follows:
1. Append the content of `proposed_de.json` into `messages/de.json`.
2. Write the content of `proposed_page.tsx` to `app/[locale]/impressum/page.tsx`.
3. Run ESLint verification:
   ```bash
   npx eslint
   ```
   *Expected outcome: No JSX literal compilation errors.*
4. Run standard Next.js build verification:
   ```bash
   npm run build
   ```
   *Expected outcome: Successful build and layout compilation without type errors.*
5. Run the dev server (`npm run dev`) and visit `/de/impressum` to visually inspect alignment, hover shadow transitions, scroll reveal animations, and ODR links.
