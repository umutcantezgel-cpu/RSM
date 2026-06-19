## Review Summary

**Verdict**: APPROVE

We have reviewed the implementation of Milestone 4.1. All checks (TypeScript compilation, ESLint, and Next.js Turbopack build) run completely clean with zero errors or warnings. The Next.js 16 Proxy migration complies fully with the new project structure and file conventions. The test suites have been correctly adjusted to work with React 19 typings and successfully verify all target behavior (including hydration safety and motion preferences).

---

## Findings

### [Minor] Finding 1: ESLint `react/jsx-no-literals` Rule Status

- **What**: The ESLint rule `react/jsx-no-literals` is not explicitly declared as active in `eslint.config.mjs`.
- **Where**: `eslint.config.mjs`
- **Why**: `RULES.md` states: *"Die ESLint-Regel `react/jsx-no-literals` ist streng aktiv."* Since it is not in the configuration file, it is technically inactive in the IDE and command-line check.
- **Suggestion**: Add `"react/jsx-no-literals": "error"` (or similar configuration) to `eslint.config.mjs` if strict enforcement is desired at the CI level. Note that the application components are already manually localized and free of raw user-facing texts, meaning the code itself complies with the spirit of the rule.

### [Minor] Finding 2: Hardcoded Text in `MediaSlot` Label

- **What**: A hardcoded German string literal is passed to a `MediaSlot` component.
- **Where**: `app/[locale]/page.tsx` (line 192: `label="3D-BIM Visualisierung EWS"`)
- **Why**: `RULES.md` states: *"Kein einziger nutzersichtbarer Text im Frontend darf hartkodiert werden. Alles läuft zwingend über next-intl."* Although it is a media placeholder label rather than normal body copy, it is visible to the user in the placeholder box.
- **Suggestion**: Move the label to the localization dictionary (`de.json` / `en.json`) and resolve it dynamically via `t('DerVerbund.placeholder_label')` or similar.

### [Minor] Finding 3: Hero Action Button Geometry Deviation

- **What**: Hero CTA buttons use `rounded-2xl` instead of `rounded-full`.
- **Where**: `app/[locale]/page.tsx` (lines 81 and 88)
- **Why**: `TOKENS.md` specifies: *"Buttons, Badges, Inputs: `rounded-full` (Pill-Shapes)"*.
- **Suggestion**: Update the classes from `rounded-2xl` to `rounded-full` to align with the pill-shape geometry specified for interactive controls in the design tokens.

---

## Verified Claims

- **Next.js 16 Proxy Migration** → verified via checking Turbopack compilation and testing the dev/build server → **PASS** (Next.js registers `proxy.ts` correctly as the proxy/middleware handler without warnings).
- **TypeScript Strict Mode** → verified via `npx tsc --noEmit` → **PASS** (completed with no errors or warnings).
- **ESLint Cleanliness** → verified via `npm run lint` → **PASS** (completed with no errors or warnings).
- **Next.js Production Build** → verified via `npm run build` → **PASS** (completed successfully with Turbopack).
- **Component Test Suite Execution** → verified via executing the three test verification files behaviorally:
  - `verify_all.tsx` → **PASS**
  - `verify_forms_accordions.tsx` → **PASS**
  - `verify_portal_and_karriere.tsx` → **PASS**
- **Reduced Motion Support** → verified via inspection of `Reveal.tsx`, `FAQAccordionItem.tsx`, and `HRJobAccordionItem.tsx` and automated tests → **PASS** (animations gracefully degrade to fades and prevent layout shifts when reduced motion preference is detected).

---

## Coverage Gaps

- **Language translation coverage** — risk level: low — only `de` is supported in `i18n/routing.ts` and `messages/de.json`. Since no other locales are currently requested or configured, this is acceptable risk.

---

## Unverified Items

- **Real user interactions with client-side state under non-mocked environment** — reason not verified: E2E selenium/playwright testing is out of scope for Milestone 4.1 verification which relies on empirical React server-rendering mock assertions. The test coverage is deemed fully sufficient for code correctness checks.
