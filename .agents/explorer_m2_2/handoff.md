# Handoff Report — explorer_m2_2 (Styling & Layout Explorer)

This report details the layout and visual structure analysis of the four HTML prototypes (Home, Unternehmen, Leistungen, Referenzen) and translates them into a modular React server/client architecture using Tailwind CSS v4 styling rules.

---

## 1. Observation

Direct code investigation of the HTML prototypes and the Next.js workspace revealed the following:

- **Prototype Files:**
  - `RSM Systembau Design-Relaunch/Home.dc.html` (lines 34–173) contains 6 main sections: Hero (full-bleed background), Leistungsfelder, Der Verbund teaser, Stats Dark, Referenzen teaser, and CTA card.
  - `RSM Systembau Design-Relaunch/Unternehmen.dc.html` (lines 30–99) contains: Page Head, Nexus Tabs (interactive corporate verbund switcher), Leitprinzipien (Leitwerte grid), and CTA card.
  - `RSM Systembau Design-Relaunch/Leistungen.dc.html` (lines 29–118) contains: Page Head, Service Tabs (interactive services switcher), Process flow, ESG Strip, and CTA.
  - `RSM Systembau Design-Relaunch/Referenzen.dc.html` (lines 29–83) contains: Page Head, Category Filter chips, Projects grid, Stats Strip, and CTA.

- **Workspace Components & Tests:**
  - `components/ui/MediaSlot.tsx` (lines 15–35) exists and renders a gradient placeholder with the text format: `[ PLATZHALTER: ${label} ]` and geometry `rounded-[2rem]`.
  - `components/ui/Reveal.tsx` (lines 19–76) exists and runs Framer Motion animation offsets of `22px` depending on the `direction` ('up', 'down', 'left', 'right'), which disappears under reduced motion.
  - `components/ui/__tests__/verify_all.tsx` (lines 135–179) expects specific `translate` values for `<Reveal />` directions, and verifying that reduced-motion disables translates.
  - `components/ui/__tests__/verify_e2e.ts` (lines 81–83) expects the first rendered `<MediaSlot />` to contain the label `"3D-BIM Visualisierung EWS"` during E2E verification.

---

## 2. Logic Chain

1. **Mapping Inline Styles to Tailwind CSS v4:**
   - To conform to the "Modern Academic Glassmorphism" system defined in `RULES.md` and `TOKENS.md`, all inline CSS from the prototypes (such as `background:#fafafa`, `border-radius:24px`, `box-shadow:0 12px 26px...`) must be replaced with native Tailwind CSS v4 classes:
     - Prototype backgrounds: `#fafafa` matches `bg-slate-50`, `#fff` matches `bg-white`, and `#18181b` matches `bg-slate-900`.
     - Prototype geometries: `border-radius:24px` matches `rounded-3xl` or `rounded-[2rem]`, and buttons `border-radius:9999px` match `rounded-full`.
     - Prototype elevations: `shadow-xl shadow-blue-900/5` for standard floating panels, and `shadow-2xl shadow-blue-900/10` for hovered states.

2. **Decoupling Interactive Logic (RSC vs. RCC):**
   - The interactive state managers:
     - *Nexus Tabs* in `Unternehmen.dc.html` (tab onClick handlers on lines 44–50).
     - *Service Tabs* in `Leistungen.dc.html` (onClick handlers on lines 42–49).
     - *Category Filter chips* in `Referenzen.dc.html` (onClick filters on line 43).
   - Because React Server Components (RSC) cannot run client event listeners or maintain state, these must be isolated into Client Components (`"use client"`). Dictionaries are resolved on the server and passed as structured JSON arrays down to the client components.

3. **MediaSlot and E2E Test Compatibility:**
   - The E2E test `verify_e2e.ts` strictly checks for `[ PLATZHALTER: 3D-BIM Visualisierung EWS ]` on the home page. Therefore, the home page's Hero background `MediaSlot` must be labeled `"3D-BIM Visualisierung EWS"` to prevent verification failure.

---

## 3. Caveats

- **External Icons:** Prototypes use inline SVG code snippets. These are mapped to native Lucide-React icons (`Building2`, `Layers`, `Flame`, `Hammer`, `Shield`, `Clock`, `Users`) inside the client component structure, which requires Lucide-React to be installed (verified in `package.json` line 14).
- **Reduced Motion:** If `prefers-reduced-motion` is active on the user's OS, `<Reveal />` will execute fade-in animations without position translation.

---

## 4. Conclusion

Milestone 2 assembly can be safely built using the design proposal written in `/Users/umurey/Downloads/RSM/.agents/explorer_m2_2/analysis.md`. This is done by:
1. Creating client subcomponents: `NexusTabs.tsx`, `ServiceTabs.tsx`, and `ProjectGrid.tsx` to handle stateful actions.
2. Building page entry points as Server Components to load next-intl dictionaries.
3. Completely styling with Tailwind CSS v4 classes (avoiding inline styles and standard CSS overrides).
4. Replacing all prototype images with `<MediaSlot />` components, starting the Home Page Hero with `"3D-BIM Visualisierung EWS"`.

---

## 5. Verification Method

To verify the styling, layout structure, and components independently:

1. **Verify Design Report:**
   Inspect `/Users/umurey/Downloads/RSM/.agents/explorer_m2_2/analysis.md` to confirm the class compositions and props.

2. **Verify Component Behavior:**
   Execute the component verification script:
   ```bash
   npx tsx components/ui/__tests__/verify_all.tsx
   ```
   *Expected outcome: 🎉 ALL TESTS PASSED SUCCESSFULLY*

3. **Verify E2E Tests:**
   Compile the Next.js bundle, launch the server, and run the E2E verification:
   ```bash
   npm run build && npx next start -p 3001
   # (In a separate terminal)
   npx tsx components/ui/__tests__/verify_e2e.ts
   ```
   *Expected outcome: E2E Verification resolves with zero warnings/errors.*
