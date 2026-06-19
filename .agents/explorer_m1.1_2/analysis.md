# Analysis Report: `<Reveal />` Component Design

## Summary
This analysis details the design and implementation specifications for the client-side `<Reveal />` scroll-animation component in `components/ui/Reveal.tsx`. It verifies the availability of `framer-motion@12.40.0`, outlines a safe strategy for handling `prefers-reduced-motion` in Next.js SSR to avoid hydration mismatches, and designs strict type contracts and animation variants.

---

## 1. Project Constraints & Environment Audit

### 1.1 Dependency Verification
We examined the root `package.json` to verify the installation of `framer-motion`.
- **File Path:** `/Users/umurey/Downloads/RSM/package.json`
- **Findings:**
  - `framer-motion` is installed at version `^12.40.0` (line 13).
  - The project is built using **Next.js 16.2.9** and **React 19.2.4** (lines 15, 17).
  - Tailwind CSS v4 is used for styling (lines 22, 28).

| Dependency | Version | Scope |
|---|---|---|
| `framer-motion` | `^12.40.0` | Production |
| `react` | `19.2.4` | Production |
| `next` | `16.2.9` | Production |

### 1.2 TypeScript Configuration
We examined the root `tsconfig.json`.
- **File Path:** `/Users/umurey/Downloads/RSM/tsconfig.json`
- **Findings:**
  - Strict type checking is active (`"strict": true`, line 7).
  - Path alias mapping is configured (`"@/*": ["./*"]`, line 22).

---

## 2. Reduced Motion Strategy

The project rules (`agents/RULES.md` and the reference rules) mandate supporting the `prefers-reduced-motion: reduce` preference:
- **Constraint:** Avoid harsh movement/transitions and utilize gentle fades instead (Rule 6).
- **Tooling:** Framer Motion provides the `useReducedMotion()` hook.

### 2.1 Next.js Hydration Safeguard
In Next.js, components are pre-rendered on the server, where `useReducedMotion()` defaults to `false`. If a client has reduced motion enabled, evaluating this hook immediately during hydration can cause a **hydration mismatch** warning due to differing style tags (e.g. `transform: translateY(...)` vs `transform: none`).

**Recommended Strategy:**
Defer evaluating the hook's value until the component has mounted on the client.
```tsx
const shouldReduceMotion = useReducedMotion();
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(false); // set on client mount
  setIsMounted(true);
}, []);

const isReduced = isMounted ? shouldReduceMotion : false;
```
This guarantees that the initial render matches the server-rendered DOM exactly, and the animation states are safely updated only after mount.

---

## 3. `<Reveal />` Component Design

### 3.1 Interface Contract
Following `SCOPE.md`, the component must expose the following interface:

```typescript
export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}
```

### 3.2 Animation Constants & Variants
- **y-Offset / x-Offset:** `22px` (as specified in rule 38 of the reference `RULES.md`).
- **Ease Function:** `[0.16, 1, 0.3, 1]` (easeOutExpo).
- **Duration:** `0.6s` (600ms) for normal motion; `0.25s` for a soft fade-in when reduced motion is active.
- **Viewport Config:** `once: true`, `amount: 0.15` (meaning it triggers when 15% of the element is visible in the viewport).

### 3.3 Dynamic Variant Formulation

```typescript
// Initial/Hidden variant state logic:
const getInitial = (isReduced: boolean, direction: string, offset: number) => {
  if (isReduced || direction === 'none') {
    return { opacity: 0, x: 0, y: 0 };
  }
  switch (direction) {
    case 'up':
      return { opacity: 0, x: 0, y: offset };
    case 'down':
      return { opacity: 0, x: 0, y: -offset };
    case 'left':
      return { opacity: 0, x: offset, y: 0 };
    case 'right':
      return { opacity: 0, x: -offset, y: 0 };
    default:
      return { opacity: 0, x: 0, y: 0 };
  }
};

// Transition variant state logic:
const getTransition = (isReduced: boolean, delay: number) => {
  if (isReduced) {
    return {
      duration: 0.25, // Short fade
      ease: 'easeOut',
      delay,
    };
  }
  return {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1], // easeOutExpo
    delay,
  };
};
```

---

## 4. Full Recommended Implementation Plan

Below is the designed code structure for `components/ui/Reveal.tsx`. This code conforms strictly to all TypeScript, React, and ESLint constraints (including no JSX text literals):

```tsx
"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isReduced = mounted ? !!shouldReduceMotion : false;
  const offset = 22; // Standard offset from design guidelines

  const initial = isReduced || direction === 'none'
    ? { opacity: 0, x: 0, y: 0 }
    : {
        opacity: 0,
        x: direction === 'left' ? offset : direction === 'right' ? -offset : 0,
        y: direction === 'up' ? offset : direction === 'down' ? -offset : 0,
      };

  const transition = isReduced
    ? {
        duration: 0.25,
        ease: 'easeOut',
        delay,
      }
    : {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay,
      };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## 5. Verification Checklist

The future implementation of this design can be verified using:
1. **ESLint Validation:** Run `npm run lint` or `npx eslint components/ui/Reveal.tsx` to verify zero violations (e.g. `react/jsx-no-literals`).
2. **Type Checking:** Run `npx tsc --noEmit` to ensure strict type safety.
3. **Reduced Motion Simulation:** 
   - Open Chrome DevTools.
   - Run `Cmd+Shift+P` -> type "Rendering".
   - Under "Emulate CSS media feature prefers-reduced-motion", select `prefers-reduced-motion: reduce`.
   - Observe that the `<Reveal />` animation slides are disabled, and elements fade in smoothly over `0.25s` on scroll.
