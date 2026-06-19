# Analysis Report: `<Reveal />` Scroll Animation Component

## Executive Summary
This report outlines the design and proposed implementation plan for the `<Reveal />` scroll animation component at `components/ui/Reveal.tsx` using `framer-motion`. The design complies strictly with `RULES.md` and `SCOPE.md`, ensuring full TypeScript typing, client-side safety in a Next.js environment, strict avoidance of JSX text literals, and correct handling of user motion preferences via the `useReducedMotion` hook.

---

## 1. Library Verification & Compatibility
- **framer-motion**: Checked `package.json` (line 13) and `package-lock.json` (line 12). The installed version is `^12.40.0`.
- **Export Verification**: A programmatic check confirmed that the `useReducedMotion` hook is successfully exported by the installed `framer-motion` package version.
- **Dependencies**: Uses `clsx` (`^2.1.1`) and `tailwind-merge` (`^3.6.0`) for merging Tailwind classes cleanly.

---

## 2. Accessibility (a11y) & Reduced Motion Design
Under `RULES.md` Section 6, the system MUST respect the user's `prefers-reduced-motion: reduce` preference.

### Graceful Degradation Strategy
1. **No Spatial Movement**: If reduced motion is active, the initial translation offset is forced to `x: 0, y: 0`. No sliding/movement will occur.
2. **Simplified Transition**: The transition is switched from a spring/expo easing curve to a quick, linear or simple ease-out opacity fade.
3. **Shortened Duration**: The animation duration is reduced to `0.2s` (or `0.25s`) for immediate response.
4. **Hydration Mismatch Mitigation**: Because Next.js performs Server-Side Rendering (SSR), `useReducedMotion()` will return `null` on the server and `true` or `false` on the client. If client preferences differ from the server fallback (`false`), it will trigger a React hydration mismatch error. To prevent this, we introduce an `isMounted` state. Before mounting, `shouldReduceMotion` defaults to `false` (matching SSR). Once mounted, it updates to the client's actual preference, ensuring a clean and error-free hydration phase.

---

## 3. Interface Design (Props & Types)
The interface for the `<Reveal />` component is designed as follows:

```typescript
import React from 'react';

export interface RevealProps {
  /** The content to be wrapped and animated */
  children: React.ReactNode;
  /** Optional additional CSS classes for styling */
  className?: string;
  /** Delay before the animation starts (supports seconds or milliseconds) */
  delay?: number;
  /** The direction from which the element slides into view */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}
```

### Smart Delay Detection
To maintain compatibility with both Framer Motion's standard seconds-based delays (e.g. `0.2`) and legacy prototype milliseconds-based delays (e.g. `80`), the component will automatically divide any delay value greater than `10` by `1000` to convert it to seconds.

---

## 4. Animation Variants & Direction Configuration
The initial translation offset is set to `22px` (matching the recycled motion guidance `y:22` in `04_icons_and_motion_primitives.md`).

| Direction | Initial State (`hidden`) | End State (`visible`) | Notes |
| :--- | :--- | :--- | :--- |
| **`up`** | `y: 22, opacity: 0` | `y: 0, opacity: 1` | Slides upward into place |
| **`down`** | `y: -22, opacity: 0` | `y: 0, opacity: 1` | Slides downward into place |
| **`left`** | `x: 22, opacity: 0` | `x: 0, opacity: 1` | Slides leftward into place (starts on right) |
| **`right`** | `x: -22, opacity: 0` | `x: 0, opacity: 1` | Slides rightward into place (starts on left) |
| **`none`** | `x: 0, y: 0, opacity: 0` | `x: 0, y: 0, opacity: 1` | Fades in place without sliding |

### Easing Curve
We utilize a custom cubic bezier easing curve `[0.16, 1, 0.3, 1]` (easeOutExpo) which provides a signature premium feel: starting extremely fast and decelerating smoothly.

---

## 5. Compliance with Project Rules
- **i18n & JSX Literals**: The component has absolutely no user-facing text nodes in its JSX (only `{children}`). Thus, it does not violate the active `react/jsx-no-literals` rule.
- **Client Component Directive**: The component includes the `"use client"` directive at the very top, as required for components using client-side React hooks (`useEffect`, `useState`) and Framer Motion client hooks.
- **Strict TypeScript**: No `any` types are used. All props and states are fully typed.

---

## 6. Proposed Implementation Code
Here is the recommended full source code for `/Users/umurey/Downloads/RSM/components/ui/Reveal.tsx`:

```typescript
"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Standard utility for combining tailwind class names
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  // Check user preference for reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Track mount status to prevent SSR/hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldReduceMotion = isMounted ? !!prefersReducedMotion : false;

  // Convert delay to seconds if it seems to be in milliseconds (> 10)
  const delayInSeconds = delay > 10 ? delay / 1000 : delay;

  // Animation offset
  const offset = 22;

  // Configuration of variants
  const variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion || direction === 'none' ? 0 : (direction === 'left' ? offset : direction === 'right' ? -offset : 0),
      y: shouldReduceMotion || direction === 'none' ? 0 : (direction === 'up' ? offset : direction === 'down' ? -offset : 0),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: shouldReduceMotion ? 'tween' : 'spring',
        duration: shouldReduceMotion ? 0.2 : 0.6,
        delay: delayInSeconds,
        ease: shouldReduceMotion ? 'easeOut' : [0.16, 1, 0.3, 1], // easeOutExpo
        stiffness: shouldReduceMotion ? undefined : 100,
        damping: shouldReduceMotion ? undefined : 20,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```
