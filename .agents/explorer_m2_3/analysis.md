# Architectural & Type System Analysis — Milestone 2: Core Page Assembly

This analysis establishes the architectural patterns, type contracts, and data-flow boundaries for Milestone 2 (Core Page Assembly). It ensures that all translated Next.js pages (`app/[locale]/page.tsx`, `unternehmen`, `leistungen`, `referenzen`) align with the strict requirements of Next.js 16, `next-intl` v4, Tailwind CSS v4, and the verification test suite.

---

## 1. Next.js 16 Asynchronous Page Parameters

In Next.js 16 (and Next.js 15), layout and page parameters (`params` and `searchParams`) are resolved asynchronously. They are typed as `Promise` objects to support React Server Components (RSC) and future optimizations.

### Server Component Pattern
In Server Components (e.g., `page.tsx`, `layout.tsx`), the page parameters must be explicitly awaited before accessing properties:

```tsx
// app/[locale]/unternehmen/page.tsx
interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  // Await params prior to accessing 'locale'
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  
  // Proceed with locale-dependent logic
}
```

### Client Component Pattern
If a Page component itself is marked with `"use client"`, it cannot be an `async` function. In this scenario, React's `use` hook must be employed to read the promise value synchronously during render:

```tsx
// app/[locale]/portal/page.tsx (Client Component)
"use client";

import { use } from 'react';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function Page({ params, searchParams }: PageProps) {
  const { locale } = use(params);
  const resolvedSearchParams = use(searchParams);
  
  // Proceed with client render
}
```

*Note: Component layouts like `app/[locale]/layout.tsx` must also follow this pattern. The layout currently implements this correctly by awaiting `params` to validate the locale prior to rendering the `NextIntlClientProvider`.*

---

## 2. next-intl useTranslations / getTranslations Bindings

To satisfy `RULES.md` (§1 Universelle i18n & §7 TypeScript Strict Mode), all user-facing strings must be retrieved dynamically, and key resolution must be fully typed to prevent runtime lookup errors.

### Enabling Type-Safe Key Autocomplete
Currently, the next-intl bindings fallback to accepting any string because the global namespace typing is not defined. To resolve this, a global type definition file `global.d.ts` must be created in the root of the workspace to merge the json schema from `messages/de.json` into the `IntlMessages` interface:

```typescript
// global.d.ts
type Messages = typeof import('./messages/de.json');

declare global {
  // Merges message catalog structure into next-intl's type lookup
  interface IntlMessages extends Messages {}
}
```

With this mapping:
- `useTranslations('Header')` will strictly accept keys defined under the `Header` block in `de.json` (e.g., `brand_holding_name`, `home`, `unternehmen`).
- Any attempt to use an undefined namespace or key (e.g., `t('wrong_key')`) will throw a compile-time TypeScript error.

### Server vs. Client translation calls
- **Server Components:** Must retrieve translations using `getTranslations`:
  ```typescript
  import { getTranslations } from 'next-intl/server';
  const t = await getTranslations({ locale, namespace: 'Unternehmen' });
  ```
- **Client Components:** Must retrieve translations using the hook `useTranslations` (provided that `NextIntlClientProvider` wraps the tree):
  ```typescript
  import { useTranslations } from 'next-intl';
  const t = useTranslations('Header');
  ```

---

## 3. Server-Client Component Boundary Design Patterns

To maintain high performance and clean SEO, we should maximize React Server Components (RSC) usage while keeping Client Components (RCC) small and focused on user interaction. When passing data across this boundary, we must navigate the serialization requirements of Next.js.

### Pattern Comparison

| Aspect | Pattern A: Translation-Driven (RCC-based lookup) | Pattern B: Props-Driven (RSC-based mapping) |
|---|---|---|
| **Data Flow** | Server passes minimal identifiers; Client Component calls `useTranslations` internally. | Server resolves all translations and passes fully populated data models down as props. |
| **Serialization** | Minimal serialization overhead (only primitive values/IDs). | Moderate serialization overhead (full translated object structure is passed). |
| **Decoupling** | High coupling between Client Component and next-intl translation structure. | High decoupling. Client Component is a pure presenter that can easily be tested/mocked without i18n context. |
| **Type Safety** | Relies on nested string template safety of next-intl. | Guaranteed by strict TypeScript interface contracts. No assertion required. |

### Recommended Approach: Pattern B (Props-Driven with Explicit Data Contracts)
To guarantee strict type safety and simplify client components, we recommend resolving translations on the server (RSC) and passing fully-typed, serialized objects. This keeps interaction logic separate from localization structure.

---

## 4. Component Boundary Data Contracts (Milestone 2 Pages)

Here are the concrete TypeScript contracts and boundary layouts for the three main interactive pages in Milestone 2:

### A. Unternehmen — `/unternehmen` (Nexus Tabs)
The Corporate Nexus section features four tabs representing the partner network.

**Data Contract (`components/sections/NexusSection.tsx`):**
```typescript
export interface NexusStat {
  value: string;
  label: string;
}

export interface NexusItem {
  id: 'rsm' | 'holding' | 'teamSimon' | 'werkules';
  tag: string;
  num: string;
  name: string;
  role: string;
  body: string;
  stats: [NexusStat, NexusStat, NexusStat]; // Fixed tuple of 3 stats
}

export interface NexusSectionProps {
  items: NexusItem[];
}
```

**Implementation Design:**
```tsx
// components/sections/NexusSection.tsx
"use client";

import React, { useState } from 'react';
import type { NexusSectionProps } from './NexusSection.types';

export function NexusSection({ items }: NexusSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = items[activeIdx];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-8 items-start">
      {/* Tab Triggers */}
      <div className="flex flex-col gap-3">
        {items.map((item, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 backdrop-blur-2xl ${
                isActive
                  ? "border-blue-200 bg-white/80 shadow-xl shadow-blue-900/5 font-bold"
                  : "border-slate-200/60 bg-white/45 hover:bg-white/60"
              }`}
            >
              <div className="flex justify-between items-center gap-2">
                <span className={`text-[11px] font-bold tracking-wider uppercase ${isActive ? "text-blue-600" : "text-slate-400"}`}>
                  {item.tag}
                </span>
                <span className="font-outfit text-xs font-bold text-slate-300">{item.num}</span>
              </div>
              <div className={`font-outfit font-semibold text-lg mt-2 ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                {item.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="rounded-[2rem] border border-slate-200/60 bg-slate-50/50 p-8 lg:p-11 relative overflow-hidden backdrop-blur-3xl">
        <div className="relative z-10">
          <span className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">{activeItem.role}</span>
          <h2 className="font-outfit font-extrabold text-2xl lg:text-3xl text-slate-900 mt-2">{activeItem.name}</h2>
          <p className="text-slate-600 mt-5 leading-relaxed">{activeItem.body}</p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200">
            {activeItem.stats.map((st, i) => (
              <div key={i} className="pr-4 border-r border-slate-200 last:border-0 last:pr-0">
                <div className="font-outfit font-extrabold text-xl lg:text-2xl text-blue-600">{st.value}</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### B. Leistungen — `/leistungen` (In-House Performance Services)
The Services section lists four key corporate capabilities (Generalunternehmer, Modul-Systembau, TGA & Brandschutz, Roh- & Innenausbau) with corresponding detail panels and geometry placeholders.

**Data Contract (`components/sections/ServicesSection.tsx`):**
```typescript
export interface ServiceItem {
  id: 'generalunternehmer' | 'systembau' | 'tga' | 'ausbau';
  name: string;
  short: string;
  iconName: 'Building' | 'Grid' | 'Flame' | 'Hammer'; // Safe string representation of Lucide icons
  lead: string;
  body: string;
  points: [string, string, string]; // Fixed array of 3 bullet points
}

export interface ServicesSectionProps {
  services: ServiceItem[];
}
```

**Implementation Design:**
- The Server Component maps translation fields and supplies the list of services.
- The Client Component matches `iconName` to a client-rendered Lucide icon dynamically:
```tsx
import * as Icons from 'lucide-react';

function ServiceIcon({ name }: { name: ServiceItem['iconName'] }) {
  const IconComponent = Icons[name as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
  return IconComponent ? <IconComponent className="w-5 h-5" /> : <Icons.HelpCircle className="w-5 h-5" />;
}
```
- This keeps icon loading client-centric and preserves serialization limits.

---

### C. Referenzen — `/referenzen` (Asymmetric Filterable Grid)
The references page renders projects that can be filtered using a chips navigation bar.

**Data Contract (`components/sections/ReferencesSection.tsx`):**
```typescript
export type CategoryId = 'all' | 'logistik' | 'public' | 'hospitality' | 'industrie' | 'gewerbe';

export interface ReferenceCategory {
  id: CategoryId;
  label: string; // Translated category title for the chip
}

export interface ReferenceProject {
  id: string;
  name: string;
  categoryId: Exclude<CategoryId, 'all'>; // Projects must be assigned a concrete category
  categoryLabel: string; // Pre-translated category label (e.g. "Logistik")
  meta: string;
  kpi: string;
  body: string;
}

export interface ReferencesSectionProps {
  categories: ReferenceCategory[];
  projects: ReferenceProject[];
}
```

**Filtering Logic & A11y (in Client Component):**
- Uses a local state `const [activeCategory, setActiveCategory] = useState<CategoryId>('all')`.
- Safe filtering condition: `const visible = activeCategory === 'all' ? projects : projects.filter(p => p.categoryId === activeCategory)`.
- Renders filter chips as `<button role="tab" aria-selected={isActive} ...>` to comply with accessibility requirements.

---

## 5. Verification Test Expectations

The following expectations are gathered directly from the tests under `components/ui/__tests__/`. Developers must implement these specific hooks, components, properties, and routes to satisfy testing criteria.

### Component-Level Expectations (`verify_all.tsx`)

1. **`<Reveal />` Animation Component:**
   - Props contract: `children: React.ReactNode`, `className?: string`, `delay?: number`, `direction?: 'up' | 'down' | 'left' | 'right' | 'none'`.
   - Normal motion styling:
     - `direction="up"` -> Must yield inline styles containing `translateY(22px)`.
     - `direction="down"` -> Must yield inline styles containing `translateY(-22px)`.
     - `direction="left"` -> Must yield inline styles containing `translateX(22px)`.
     - `direction="right"` -> Must yield inline styles containing `translateX(-22px)`.
     - `direction="none"` -> Must contain NO translation transforms.
   - Reduced motion behavior:
     - When `prefers-reduced-motion` resolves to `true`, **all translations must be disabled** (`translate` properties omitted).
   - SSR/Hydration mismatch protection:
     - Initial client renders must output HTML matching SSR output, regardless of user motion settings. This requires delaying animation state mount using React mounting lifecycle hook (`useEffect`).

2. **`<MediaSlot />` Image Placeholder Component:**
   - Props contract: `label: string`, `className?: string`.
   - Markup geometry: Must contain class `rounded-[2rem]`, a background gradient classes matching `bg-gradient-to-br`, and render text format `[ PLATZHALTER: {label} ]`.
   - Icon: Must render a Lucide Image icon or matching SVG.

3. **i18n Header/Footer Translation Keys:**
   - The dictionary `messages/de.json` must resolve namespaces `Header` and `Footer` with specific keys.
   - Header must render: Brand logo symbol, Brand holding name/sub (`RT HOLDING`), menu routes (`Start`, `Unternehmen`, `Leistungen`, `Referenzen`, `Karriere`), and `Portal`.
   - Footer must render: Brand name `RSM SYSTEMBAU`, description (`Generalunternehmer für schlüsselfertige B2B-Bauprojekte...`), address `Wetzlar`, and the brand claim `Bauen mit System.`.

### E2E Test Expectations (`verify_e2e.ts`)

1. **Routing:**
   - The test server serves routes on port `3001` (e.g., `http://localhost:3001/de`).
   - The root route `/de` (Home Page) must resolve and render without errors.
   - Other subpages (`/unternehmen`, `/leistungen`, `/referenzen`, `/karriere`, `/portal`) must be correctly defined as subpages under `app/[locale]/`.

2. **Home Page (`/de` or `/`) Content Check:**
   - Must contain a `<MediaSlot />` component with the label: **`3D-BIM Visualisierung EWS`**.
   - If this specific label is missing or differs in capitalization, the E2E test will fail.

3. **Performance & Warnings:**
   - Console logs will be scanned for any React hydration mismatch errors.
   - Failed network requests (status >= 400, except normal Next.js route prefetch aborts) will fail the test.
