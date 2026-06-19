## 2026-06-18T22:10:16Z
Objective:
Implement build validation and design token/rule compliance fixes for Milestone 4.2.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks:
1. Add strict `"react/jsx-no-literals": "error"` enforcement to ESLint.
   - Edit `eslint.config.mjs` to configure the rule for production JSX files.
   - To avoid errors in test files, restrict this rule only to `app/**/*.tsx` and `components/**/*.tsx` (excluding `**/__tests__/**` or using `ignores` option).
2. Clean up hardcoded text and design token geometry issues:
   - Localize the label `"3D-BIM Visualisierung EWS"` passed to `<MediaSlot />` in `app/[locale]/page.tsx` line 193.
   - Add the key `"placeholder_label": "3D-BIM Visualisierung EWS"` under `"DerVerbund"` in `messages/de.json`.
   - Update the Hero CTA buttons in `app/[locale]/page.tsx` to use `rounded-full` instead of `rounded-2xl` to comply with the button geometry token in `TOKENS.md` (`rounded-full` for all buttons, badges, inputs).
3. Scan other files under `app/` and `components/` to ensure no other buttons, inputs, or badges violate the `rounded-full` geometry token or have hardcoded literals.
4. Run `npm run lint` and `npm run build` and resolve any issues or compilation warnings that arise.
5. Write your changes summary to `/Users/umurey/Downloads/RSM/.agents/sub_orch_m4/worker_4_2/changes.md` and your final verification results and handoff report to `/Users/umurey/Downloads/RSM/.agents/sub_orch_m4/worker_4_2/handoff.md`. Include the commands run and outputs.
6. Send a message to the parent (conversation ID 5db7f2dd-bdf0-4a0e-9ced-a58ae6a6b092) with a concise summary of changes and a link to your handoff report.
