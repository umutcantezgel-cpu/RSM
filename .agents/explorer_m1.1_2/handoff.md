# Handoff Report: `<Reveal />` scroll animation component design

## 1. Observation
We observed the following parameters and configurations in the codebase:
- **`framer-motion` presence:** In `/Users/umurey/Downloads/RSM/package.json` line 13:
  `"framer-motion": "^12.40.0",`
- **Framework & environment:** In `/Users/umurey/Downloads/RSM/package.json` lines 15, 17:
  `"next": "16.2.9",`
  `"react": "19.2.4",`
- **Strict TypeScript:** In `/Users/umurey/Downloads/RSM/tsconfig.json` line 7:
  `"strict": true,`
- **Design rules & motion guidelines:** 
  - In `/Users/umurey/Downloads/RSM/agents/RULES.md` lines 31-33:
    ```markdown
    ## 6. Motion (Framer Motion)
    - Fließende, weiche Übergänge. Reveals beim Scrollen (`whileInView`).
    - Zwingend: Die Einstellung prefers-reduced-motion (z.B. via useReducedMotion) muss strikt respektiert werden. Bei reduzierter Bewegung auf harte Transitions verzichten und stattdessen Fades verwenden.
    ```
  - In reference `/Users/umurey/Downloads/RSM/Wieder verwerten für RSM agents/RULES.md` line 38:
    `UI-Transitions 150–300ms, Reveals 600ms (whileInView, viewport={{ once: true }}, 22px y-Offset, Stagger via delay).`
- **Interface Contract:** In `/Users/umurey/Downloads/RSM/.agents/sub_orch_m1/SCOPE.md` lines 15-18:
  ```markdown
  ### `<Reveal />`
  - Props: `children: React.ReactNode`, `className?: string`, `delay?: number`, `direction?: 'up' | 'down' | 'left' | 'right' | 'none'`
  - Behavior: Uses Framer Motion to fade and slide in content when it is in view. Must check media query `(prefers-reduced-motion: reduce)` to disable animation and just do a simple opacity fade (or immediate rendering) to comply with RULES.md.
  ```

---

## 2. Logic Chain
1. Since the project uses **Next.js App Router (version 16.2.9)** (Observation: `package.json`), all client components are pre-rendered on the server.
2. If `useReducedMotion()` is queried immediately during hydration, it will evaluate to `false` on the server and `true` on a client with reduced motion enabled, leading to different inline styles. This results in React hydration mismatch warnings.
3. Therefore, to ensure hydration-safe rendering, the evaluation of `shouldReduceMotion` must be gated by a `mounted` state using `useEffect`.
4. According to design instructions (Observation: `RULES.md` and reference `RULES.md`), the default reveal should slide in with a **`22px` offset**, run for **`600ms`**, and use the ease **`[0.16, 1, 0.3, 1]`** (easeOutExpo).
5. When `prefers-reduced-motion: reduce` is active (Observation: `RULES.md`), transitions must avoid hard translations and instead fade. Thus, we degrade the motion offset to `0` and use a simple, shorter opacity fade-in transition (duration: `0.25s`, ease: `easeOut`).
6. Because `react/jsx-no-literals` is strict, the component must not return any raw text strings in JSX; it should output only children wrapped in `{children}` inside the `<motion.div>`.

---

## 3. Caveats
- We did not implement or test the component in a browser context since this is a read-only exploration task. The code design is based on the verified API contract of `framer-motion@12.40.0` and Next.js SSR conventions.
- Hydration safe state forces a re-render on mount if the user's OS has reduced motion enabled. This causes a single post-hydration update, which is standard and safe, but the developer should keep it in mind.

---

## 4. Conclusion
The `<Reveal />` component at `components/ui/Reveal.tsx` can be successfully implemented as a client component (`"use client"`) using the designed dynamic initial/transition state selection. The structure avoids hydration issues, strictly conforms to the requested types, and matches all animation duration, offset, and ease specifications from `RULES.md`.

---

## 5. Verification Method
1. **Compilation Check:** Once implemented, run `npx tsc --noEmit` from the root directory to verify there are no strict TypeScript compiler issues.
2. **ESLint Audit:** Run `npm run lint` or `npx eslint components/ui/Reveal.tsx` to verify compliance with the `react/jsx-no-literals` rule.
3. **Motion Verification:** Emulate `prefers-reduced-motion: reduce` in Chrome DevTools (under rendering tab) and verify that:
   - No `translateY` or `translateX` offsets are applied.
   - Elements only fade in smoothly using a standard `0.25s` transition.
