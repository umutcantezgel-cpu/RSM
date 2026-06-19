## 2026-06-18T21:52:55Z

You are a Reviewer agent.
Your identity: reviewer_m3_2.
Your working directory is /Users/umurey/Downloads/RSM/.agents/reviewer_m3_2.
Task:
Verify correctness, styling compliance, typescript types, next-intl integration, and clean layout structure for the implemented pages and components:
- `app/[locale]/karriere/page.tsx`
- `app/[locale]/portal/page.tsx`
- `app/[locale]/impressum/page.tsx`
- `components/karriere/HRJobSection.tsx`
- `components/karriere/HRJobAccordionItem.tsx`
- `components/karriere/FAQAccordion.tsx`
- `components/karriere/FAQAccordionItem.tsx`
- `components/portal/LoginForm.tsx`
- `messages/de.json`

Specifically, verify:
1. Pure next-intl integration: Ensure absolutely no user-visible strings are hardcoded in JSX (except maybe standard punctuation if dynamically constructed, though react/jsx-no-literals is active). Check de.json namespaces "Karriere", "Portal", and "Impressum".
2. Compliance with RULES.md and TOKENS.md: Check that there are absolutely no inline styles, and only Tailwind CSS v4 variables/classes are used. Exessive rounded corners (rounded-3xl, rounded-[2rem], rounded-full), hellblau/cyan accents, and glassmorphic panels/shadows.
3. Accessible touch target spacing (min-h-[44px] on interactive links, inputs, and buttons) and outlines/rings.
4. Correct use of <Reveal /> and <MediaSlot /> component (strictly no <img> tags).
5. Run the build/lint commands (`npm run build`, `npm run lint`) to confirm they compile successfully without any warnings/errors.
Write your review report and verdict at `/Users/umurey/Downloads/RSM/.agents/reviewer_m3_2/handoff.md`.
