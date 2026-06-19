## 2026-06-18T21:54:49Z
Fix styling and accessibility violations identified by the reviewers in the implemented files.

Detailed Findings to Fix:

1. Hex Values in Markup (Styling Violation):
   - In `app/[locale]/portal/page.tsx` line 22: Replace custom hex color `bg-[#18181b]` with the standard token-compliant class `bg-slate-900`.
   - In `app/[locale]/portal/page.tsx` lines 28, 29, 45: Replace `bg-[#a9caea]` and `text-[#a9caea]` with standard Tailwind classes like `bg-blue-400/20` and `text-blue-400` or `text-sky-300` to align with the Design Tokens.
   - In `components/portal/LoginForm.tsx` lines 149 and 154: Replace hex colors `bg-[#eef4fb] border-[#b9d4ec] text-[#2e567c]` and `text-[#2e567c]` with standard classes: `bg-blue-50 border-blue-200 text-blue-800` (or `bg-sky-50 border-blue-100`).

2. Non-existent Tailwind v4 Colors:
   - In `app/[locale]/impressum/page.tsx` line 86: Change `text-slate-650` to standard `text-slate-500` or `text-slate-600`.
   - In `app/[locale]/impressum/page.tsx` line 191: Change `text-slate-450` to standard `text-slate-400`.

3. Keyboard Navigation & Touch Target Size in LoginForm (A11y Failure):
   - In `components/portal/LoginForm.tsx` lines 115-132:
     - Apply `min-h-[44px] inline-flex items-center` to the "Remember Me" label wrapper.
     - Apply `min-h-[44px] inline-flex items-center px-2 py-1` to the "Forgot Password" link to guarantee a touch target of at least 44px.
     - Add visible focus outlines `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2` to both the checkbox input and the "Forgot Password" link.
     - Add `role="alert"` or `aria-live="polite"` to the feedback message box.
     - Associate input fields with the error message via `aria-invalid` (true/false) and `aria-describedby` when an error is active.

4. Minor Styling Inconsistencies in Portal Grid:
   - In `app/[locale]/portal/page.tsx` line 20: Change `bg-white/40` to `bg-white/60`, `backdrop-blur-xl` to `backdrop-blur-2xl`, and `border-slate-200/60` to `border-white/40` to match TOKENS.md.

5. Hardcoded Punctuation/Symbols in JSX:
   - In `components/karriere/HRJobAccordionItem.tsx` line 46: Instead of hardcoded middle dot `{job.area} · {job.loc}`, define a key `"job_meta": "{area} · {loc}"` in `messages/de.json` under `"Karriere"` and use `{t('job_meta', { area: job.area, loc: job.loc })}`.
   - In `components/karriere/FAQAccordion.tsx` line 24: Replace the hardcoded em-dash `—` with a localized key. E.g. add a key under `"FAQSection"` in `messages/de.json` and use it.

Verify and Test:
- Run `npm run build` to ensure successful compilation.
- Run `npm run lint` to ensure zero ESLint/TypeScript warnings.
- Run `npx tsx components/ui/__tests__/verify_all.tsx` to verify component test suite runs cleanly.

Document your changes and build/test logs in a handoff report at `/Users/umurey/Downloads/RSM/.agents/worker_m3_fix/handoff.md` and notify me when complete.
