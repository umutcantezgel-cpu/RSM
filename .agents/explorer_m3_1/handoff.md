# Handoff Report — explorer_m3_1 (Milestone 3 Translation Plan)

This report outlines the findings and design plan for translating the career page prototype (`RSM Systembau Design-Relaunch/Karriere.dc.html`) into a production-ready localized Next.js routing page under `app/[locale]/karriere/page.tsx`, adhering strictly to the "Modern Academic Glassmorphism" system, next-intl translations, and client component isolation boundaries.

---

## 1. Observation

Direct code investigation of files in `/Users/umurey/Downloads/RSM/` yielded the following findings:

1. **Next.js & Routing Parameters:**
   - `package.json` line 15 defines the Next.js version: `"next": "16.2.9"`.
   - `app/[locale]/layout.tsx` lines 9-16 resolves page routing parameters asynchronously:
     ```typescript
     export default async function LocaleLayout({
       children,
       params
     }: {
       children: React.ReactNode;
       params: Promise<{ locale: string }>;
     }) {
       const { locale } = await params;
     ```
   - Standard React Server Components (RSC) must therefore handle `params` as a `Promise` and resolve them with `await params`.

2. **Design Tokens & Visual Constraints:**
   - `agents/RULES.md` lines 17-19 defines "Modern Academic Glassmorphism":
     - **Geometrie:** *"Absolut keine scharfen Kanten. Verwende exzessiv `rounded-3xl`, `rounded-[2rem]` und `rounded-full` (Pill-Shapes) für alle Karten, Buttons, Container und Inputs."*
     - **Farben:** *"Die Basis ist rein, akademisch und weich (`bg-slate-50`, `bg-gray-100`). Akzente sind AUSSCHLIESSLICH elegant hellblau (`text-blue-600`, `bg-sky-50`, `border-blue-200`, `ring-cyan-300`)."*
     - **Effekte:** *"Tiefes, schwebendes Glassmorphism-Styling. Nutze `bg-white/60`, `backdrop-blur-2xl` und sanfte, großflächige Schatten (z.B. `shadow-2xl shadow-blue-900/5`)."*
   - `agents/RULES.md` lines 21-25 prohibits echten Bilder except for the logo in the header and firm seat in home hero, requiring the `<MediaSlot />` architecture.
   - `agents/RULES.md` lines 28-30 defines accessibility (A11y):
     - Touch targets must be at least `44x44px`.
     - Visible focus rings `focus-visible:ring-2 focus-visible:ring-blue-500` are required for keyboard navigation.
   - `agents/RULES.md` lines 32-34 specifies motion rules:
     - Reveals on scroll (`whileInView`).
     - Respecting `prefers-reduced-motion` is mandatory.

3. **Prototype Layout & Structure:**
   - `RSM Systembau Design-Relaunch/Karriere.dc.html` outlines three main page sections:
     - **Hero Section:** Title: *"Bauen Sie an der Infrastruktur von morgen."*, description, and a styling tag *"Karriere · Engineering Hub"*.
     - **Job Section:** Sidebar title: *"Vier Wege, ein Ziel."*, tagline: *"Offene Positionen"*, interactive application box (*"Initiativbewerbung"* with *"Profil senden"* link), and an interactive list of 4 jobs (role, area, loc, body text, tags) showing expanded details on click.
     - **FAQ Section:** Sidebar label: *"Häufige Fragen"*, title: *"Bevor Sie sich bewerben."*, and an interactive list of 5 FAQs (questions and answers) showing expanded text on click with a plus symbol rotating 45 degrees.

4. **i18n Namespace structure:**
   - `messages/de.json` houses all system translations. We need to add the new `"Karriere"` namespace (see details below) matching existing structures like `"Unternehmen"` and `"Leistungen"`.

---

## 2. Logic Chain

1. **RSC & next-intl Parameter Fetching:** Since `app/[locale]/karriere/page.tsx` is a top-level page under the `[locale]` route, it should act as a React Server Component (RSC), resolving `params` using `await params` and loading localized translations on the server.
2. **Client Boundary Isolation:** Storing the expansion states (`job` and `faq` active indices) at the section or page level would turn the entire page into a client component. To maximize server rendering speed, the main layout (`KarrierePage`), job container (`HRJobSection`), and FAQ container (`FAQAccordion`) should remain Server Components. By extracting the interactive elements into lightweight Client Components (`HRJobAccordionItem` and `FAQAccordionItem` with `"use client"`), we keep the client footprint minimal.
3. **Accordion State Trade-off:** Making each accordion item (`HRJobAccordionItem`, `FAQAccordionItem`) self-contained by managing its own state (`const [isOpen, setIsOpen] = useState(false)`) allows them to be completely decoupled. This matches the prototype's toggle behavior while avoiding a parent Client Component wrapper for the list.
4. **Tailwind CSS v4 Classes Mapping:**
   - Standard card borders: `border border-slate-200/60` (closed) and `border-blue-200` (open).
   - Glassmorphism backgrounds: `bg-white/60 backdrop-blur-2xl` for FAQ cards.
   - Shadows: `shadow-sm hover:shadow-md` (normal state), and `shadow-xl shadow-blue-900/5` (expanded state) to create depth.
   - Geometry: Section boundaries: `rounded-[2rem]`, buttons and badges: `rounded-full`, card wrappers: `rounded-3xl`.
   - Layout indent alignment: By setting `pl-14 md:pl-22` on the job description body, the text lines up precisely with the job title, compensating for the left-aligned numbers.
5. **Reduced Motion Adaptation:** Framer Motion's `useReducedMotion()` hook should be checked in client elements. If enabled, the height transition should be omitted, animating only the opacity fade-in to prevent layout movement.

---

## 3. Caveats

- **External Assets & Images:** Echte images are completely banned for this page. No illustration or team photo may be added. If any asset placeholder is requested, it must be represented via `<MediaSlot />`.
- **Application Link:** The "Initiativbewerbung" CTA links to `/portal` (represented by `Portal.dc.html` in the prototype). The route `/portal` must exist in next-intl routing.
- **Language Coverage:** German dictionary modifications must be fully completed in `messages/de.json` before other locales (e.g. `en`) are integrated, ensuring 100% sprachliche Reinheit.

---

## 4. Conclusion

The career page can be cleanly implemented under `app/[locale]/karriere/page.tsx` using a server-led composition with client-isolated items. Six files have been drafted and written to the working directory to serve as the blueprint for the implementer agent.

### Drafted Artifact Index:
1. `proposed_messages_de_addition.json` - JSON additions to be merged into `/messages/de.json`.
2. `proposed_page.tsx` - App page router page (`app/[locale]/karriere/page.tsx`).
3. `proposed_HRJobSection.tsx` - RSC for the Open Positions section (`components/karriere/HRJobSection.tsx`).
4. `proposed_HRJobAccordionItem.tsx` - RCC accordion item for positions (`components/karriere/HRJobAccordionItem.tsx`).
5. `proposed_FAQAccordion.tsx` - RSC for the Frequently Asked Questions section (`components/karriere/FAQAccordion.tsx`).
6. `proposed_FAQAccordionItem.tsx` - RCC accordion item for FAQs (`components/karriere/FAQAccordionItem.tsx`).

---

## 5. Verification Method

Once implemented, the following verification suite must be executed:

1. **Linting Check:**
   Verify code style and next-intl literals rule compliance:
   ```bash
   npm run lint
   ```
   *Expected outcome: No compilation errors or jsx-no-literals violations.*

2. **Typescript Compilation & Bundling:**
   Verify there are no missing fields, type errors, or SSR hydration issues:
   ```bash
   npm run build
   ```
   *Expected outcome: "✓ Compiled successfully"*

3. **Empirical Components Verification:**
   Run the test runner script:
   ```bash
   npx tsx components/ui/__tests__/verify_all.tsx
   ```
   *Expected outcome: "🎉 ALL TESTS PASSED SUCCESSFULLY" exit code 0.*

4. **E2E Visual Verification:**
   Run local dev or start the build server, then trigger E2E tests:
   ```bash
   npx tsx components/ui/__tests__/verify_e2e.ts
   ```
   *Expected outcome: Valid screenshots in both normal and reduced motion states showing correct alignment, no console errors.*
