# Plan: Milestone 3 — Secondary Page Assembly

This plan outlines the translation of three prototype HTML files (`Karriere.dc.html`, `Portal.dc.html`, and `Impressum.dc.html`) into Next.js Server Components under `app/[locale]/` using Tailwind v4, next-intl localization, `<MediaSlot />`, and `<Reveal />` components.

## Target Pages & Features

1. **Karriere Page (`app/[locale]/karriere/page.tsx`)**
   - Translate `Karriere.dc.html`.
   - Extracted text namespace: `Karriere` in `messages/de.json`.
   - Interactive components:
     - Jobs Accordion: client component (`components/karriere/HRJobSection.tsx` or similar).
     - FAQs Accordion: client component (`components/karriere/FAQAccordion.tsx` or similar).
   - Dynamic translation retrieval and custom layout blocks.

2. **Portal Page (`app/[locale]/portal/page.tsx`)**
   - Translate `Portal.dc.html`.
   - Extracted text namespace: `Portal` in `messages/de.json`.
   - Interactive components:
     - Login Form: client component (`components/portal/LoginForm.tsx` or similar) with secure input and status/validation feedback.

3. **Impressum Page (`app/[locale]/impressum/page.tsx`)**
   - Translate `Impressum.dc.html`.
   - Extracted text namespace: `Impressum` in `messages/de.json`.
   - Layout blocks for corporate legal info, Kammer registration, and disclaimer.

## Step-by-Step Execution Plan

### Step 1: Exploration
Spawn 3 Explorers to:
- Inspect current codebase setup, styles, and configurations.
- Inspect the 3 HTML prototype files to verify text, icons, structures, and styles.
- Formulate a precise strategy for translation, file structure, styling, and next-intl namespaces.

### Step 2: Implementation
Spawn 1 Worker to:
- Update `messages/de.json` with the new namespaces.
- Write the interactive client components:
  - `components/karriere/HRJobSection.tsx`
  - `components/karriere/FAQAccordion.tsx`
  - `components/portal/LoginForm.tsx`
- Write the server components:
  - `app/[locale]/karriere/page.tsx`
  - `app/[locale]/portal/page.tsx`
  - `app/[locale]/impressum/page.tsx`
- Run local builds and verify that the production build compiler (`npm run build`) runs successfully with zero errors.

### Step 3: Review
Spawn 2 Reviewers to:
- Verify components adhere to `RULES.md` and `TOKENS.md`.
- Verify TypeScript types, next-intl integration, and clean layout structure.
- Verify interactive behaviors work properly.

### Step 4: Verification / Challenge
Spawn 2 Challengers to:
- Stress-test the login form validation and interactive accordion states.
- Ensure no hydration mismatch warnings occur on render.

### Step 5: Integrity Auditing
Spawn 1 Forensic Auditor to:
- Audit code integrity (no hardcoded credentials, mock-only results, clean implementation).
- Provide the final audit report.

### Step 6: Gate Check & Delivery
- If all checks pass, update `progress.md` and `SCOPE.md` status to DONE.
- Deliver `handoff.md` and report to the parent.
