# Analysis Report: `<Reveal />` Scroll Animation Component Design

## Summary
The `<Reveal />` scroll animation component has been designed as a client-side wrapper (`"use client"`) using `framer-motion` (v12.40.0). It incorporates strict TypeScript interfaces, full compliance with `RULES.md` and ESLint constraints (especially `react/jsx-no-literals`), handles direction-based entry transitions with a `22px` offset, and handles system-level accessibility settings gracefully by disabling translations and simplifying transitions using `useReducedMotion()` with a hydration-safe React state pattern.

---

## 1. Environment & Dependency Verification
We verified the following in the project root:
- **`framer-motion`**: Installed in `package.json` under `dependencies` as `"framer-motion": "^12.40.0"`.
- **Environment**: Next.js 16.2.9 with React 19.2.4.

---

## 2. Accessibility & Hydration Safety (prefers-reduced-motion)
- **Problem**: Next.js App Router uses Server-Side Rendering (SSR). Directly checking the media query `prefers-reduced-motion` or using `useReducedMotion()` to conditionally set initial variants will cause a **hydration mismatch** because the server renders the default animate state, whereas a client with reduced motion active will hydrate the static/reduced state.
- **Solution**: We initialize a state variable `shouldReduceMotion` to `false` and update it in a `useEffect` after mounting. This guarantees that the initial client hydration matches the server render, preventing console errors, while instantly switching to a smooth, translation-free fade transition for users who prefer reduced motion.
- **Degradation**: When reduced motion is active, the component shifts from using slide-and-fade offsets (e.g. `y: 22`) to a simple opacity-only fade-in with a faster, linear duration of `0.2s` for a better user experience.

---

## 3. Component Interface Design
The component will be placed at `components/ui/Reveal.tsx` as a named export `Reveal`.

### Props Contract (`RevealProps`)
| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | Yes | - | Content to be animated. |
| `className` | `string` | No | `undefined` | Optional Tailwind/custom classes to apply to the wrapper. |
| `delay` | `number` | No | `0` | Delay in **milliseconds** (converted internally to seconds). |
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'none'` | No | `'up'` | Direction from which the content slides in. |

---

## 4. Animation Specification & Variants
- **Viewport**: Trigger animation `whileInView` with `viewport={{ once: true, amount: 0.15 }}`.
- **Duration**: `0.6s` (600ms) for standard motion; `0.2s` (200ms) for reduced-motion fade.
- **Easing**: Custom Bezier curve `[0.16, 1, 0.3, 1]` for standard motion; `linear` for reduced-motion.
- **Offset**: `22px` translation offset on the selected axis.

### Code Sketch (`components/ui/Reveal.tsx`)
```tsx
"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

interface CustomProps {
  direction: 'up' | 'down' | 'left' | 'right' | 'none';
  shouldReduceMotion: boolean;
}

const variants = {
  hidden: ({ direction, shouldReduceMotion }: CustomProps) => {
    if (shouldReduceMotion) {
      return { opacity: 0 };
    }
    const offset = 22; // 22px as per RULES.md
    switch (direction) {
      case 'up':
        return { opacity: 0, y: offset };
      case 'down':
        return { opacity: 0, y: -offset };
      case 'left':
        return { opacity: 0, x: offset };
      case 'right':
        return { opacity: 0, x: -offset };
      case 'none':
      default:
        return { opacity: 0 };
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setShouldReduceMotion(true);
    }
  }, [prefersReduced]);

  const delayInSeconds = delay / 1000;
  const customProps: CustomProps = { direction, shouldReduceMotion };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={customProps}
      variants={variants}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: shouldReduceMotion ? 'linear' : [0.16, 1, 0.3, 1],
        delay: delayInSeconds,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## 5. Compliance & Rule Checking
1. **i18n & JSX Literals (`react/jsx-no-literals`)**: The code contains absolutely zero JSX literals. The children are wrapped directly inside `{children}`, and attributes are strictly non-user-facing system strings (`"hidden"`, `"visible"`, `"up"`, etc.).
2. **TypeScript Strict Mode**: The interface is fully typed with explicit interfaces for props (`RevealProps`) and animation options (`CustomProps`). No uses of `any` exist.
3. **Design System Accent Colors**: The component acts as a layout container and does not introduce hardcoded margins, paddings, or theme colors, keeping style configuration cleanly separated through the `className` prop.
