## 2026-06-18T21:50:35Z
You are a Worker agent.
Your identity: worker_m3.
Your working directory is /Users/umurey/Downloads/RSM/.agents/worker_m3.

Task:
Translate 3 raw HTML pages into clean Next.js App Router pages under `app/[locale]/` with full next-intl integration and Modern Academic Glassmorphism styling using Tailwind CSS v4.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Instructions:
1. Merge the translations for the three new namespaces ("Karriere", "Portal", "Impressum") into `messages/de.json`. Read the proposed namespaces from:
   - Karriere: `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_messages_de_addition.json`
   - Portal: `/Users/umurey/Downloads/RSM/.agents/explorer_m3_2/handoff.md` (specifically lines 60-84)
   - Impressum: `/Users/umurey/Downloads/RSM/.agents/explorer_m3_3/proposed_de.json`
   Ensure de.json is valid JSON after the merge.

2. Implement the following components:
   - `components/karriere/HRJobSection.tsx` (from `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_HRJobSection.tsx`)
   - `components/karriere/HRJobAccordionItem.tsx` (from `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_HRJobAccordionItem.tsx`)
   - `components/karriere/FAQAccordion.tsx` (from `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_FAQAccordion.tsx`)
   - `components/karriere/FAQAccordionItem.tsx` (from `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_FAQAccordionItem.tsx`)
   - `components/portal/LoginForm.tsx` (from `/Users/umurey/Downloads/RSM/.agents/explorer_m3_2/handoff.md` lines 158-329)

3. Implement the following pages:
   - `app/[locale]/karriere/page.tsx` (from `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_page.tsx`)
   - `app/[locale]/portal/page.tsx` (from `/Users/umurey/Downloads/RSM/.agents/explorer_m3_2/handoff.md` lines 88-154)
   - `app/[locale]/impressum/page.tsx` (from `/Users/umurey/Downloads/RSM/.agents/explorer_m3_3/proposed_page.tsx`)

4. Check your work:
   - Run `npm run build` to verify successful compilation with no type errors.
   - Run `npm run lint` or generic lint commands to make sure next-intl compliance (react/jsx-no-literals) and typescript strict mode pass.
   - Run existing test files (e.g. verify_all.tsx or similar if they are in the codebase) to ensure all tests pass.

5. Document your implementation and build/test logs in a handoff report at `/Users/umurey/Downloads/RSM/.agents/worker_m3/handoff.md` and send me a message when done.
