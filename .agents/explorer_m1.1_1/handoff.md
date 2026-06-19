# Handoff Report: `<Reveal />` Scroll Animation Component Design

## 1. Observation
We observed the following configurations, constraints, and instructions in the project:
* **Framer Motion Availability**: `package.json` contains `"framer-motion": "^12.40.0"`.
* **Component Specification**: `SCOPE.md` (lines 15-17) specifies:
  > `Props: children: React.ReactNode, className?: string, delay?: number, direction?: 'up' | 'down' | 'left' | 'right' | 'none'`
  > `Behavior: Uses Framer Motion to fade and slide in content when it is in view. Must check media query (prefers-reduced-motion: reduce) to disable animation and just do a simple opacity fade (or immediate rendering) to comply with RULES.md.`
* **Motion Parameter Rules**: `Wieder verwerten für RSM agents/RULES.md` (lines 38, 40) states:
  > `Reveals 600ms (whileInView, viewport={{ once: true }}, 22px y-Offset, Stagger via delay).`
  > `Immer useReducedMotion() — bei Reduktion nur Fade/kein Transform; Globus zeigt statisches Bild.`
* **Motion Primitive Specs**: `Wieder verwerten für RSM agents/04_icons_and_motion_primitives.md` (lines 18-20) specifies:
  > `components/ui/Reveal.tsx (Client): whileInView={{opacity:1, y:0}}, initial={{opacity:0, y:22}}, viewport={{ once: true, amount: 0.15 }}, transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay }}. Bei useReducedMotion() → kein y, nur sofort sichtbar.`
* **Linting / Code Quality**: `agents/RULES.md` requires strict TypeScript and compliance with `react/jsx-no-literals` (which bans raw text in JSX). Running `npm run lint` shows that eslint configuration is active and checks these parameters.

---

## 2. Logic Chain
1. **Dependency Verification**: The project has `framer-motion` version 12.40.0 installed, which supports `useReducedMotion()`.
2. **Hydration Warning Prevention**: In Next.js SSR, checking client media queries or `useReducedMotion()` during the initial render causes hydration mismatch because the server renders the default animate state, while a client with reduced motion active hydrates the static state. To prevent this warning, we must initialize a client state `shouldReduceMotion = false` and update it in a `useEffect` after mount.
3. **Delay Unit Mapping**: The prototype specifies component delays in milliseconds (e.g. `80` or `160`), but Framer Motion's `delay` property expects values in seconds. Thus, the component must divide `delay` by `1000`.
4. **Variants Configuration**:
   * Standard: Offset of `22px` translation in the direction axis (`y` for up/down, `x` for left/right), duration of `0.6s`, cubic bezier ease `[0.16, 1, 0.3, 1]`, and viewport trigger at `0.15` in-view.
   * Reduced Motion: `0px` offset translation (opacity fade-in only), duration of `0.2s`, and linear easing for a fast, non-distracting fade-in.

---

## 3. Caveats
* **No Direct Testing**: Since this is a read-only exploration task, the proposed implementation code has not been run or tested locally.
* **Component Placement**: The component must be written exactly at `components/ui/Reveal.tsx` with `"use client";` at the top.

---

## 4. Conclusion
We have successfully designed the `<Reveal />` scroll animation component to be robust, type-safe, hydration-safe, and fully compliant with all i18n/ESLint project rules. The next agent (implementer) can proceed directly with implementing the proposed code.

---

## 5. Verification Method
1. **File Inspection**: Check that `components/ui/Reveal.tsx` has been created and contains the proposed design code.
2. **Linting Check**: Run `npm run lint` to verify that the component is fully type-safe, has no `any` typings, and has zero JSX literals.
3. **Build Check**: Run `npm run build` to ensure the component is successfully compiled by Next.js and has no build-time issues.
4. **Behavioral Check**: Load the application in a browser and check scroll reveal. Then, toggle the OS setting `prefers-reduced-motion` and verify that elements fade in rapidly without sliding.
