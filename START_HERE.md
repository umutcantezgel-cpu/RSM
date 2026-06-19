# 🏛️ RSM Systembau · Antigravity-Startpunkt

> **WICHTIG:** Das alte K-Aqua Projekt ist Geschichte. Wir verwenden *nur* die hochgelobte Code-Architektur (Next.js 15, React 19, Tailwind CSS v4, i18n, Framer Motion) wieder. Jeglicher inhaltlicher Bezug zu Wasser, Rohren, PP-RCT, etc. wurde **restlos gelöscht**.

Willkommen, Agent. Dieser Ordner ist **direkt in Google Antigravity 2.0 importierbar** und enthält das technologische Fundament für die neue Enterprise-Plattform der **RSM Systembau GmbH**.

---

## 🏗️ Architektur & Tech-Stack (Phase 1: Purge & Pivot)
Die alte Code-Architektur bleibt unser unerschütterliches Fundament:
- **Next.js 15 & React 19**
- **TypeScript Strict Mode**
- **Tailwind CSS v4**
- **Framer Motion** (inkl. strict `prefers-reduced-motion`)
- **next-intl** (Universelle i18n - kein hartkodierter Text)

## 🎨 Phase 2: Design System "Modern Academic Glassmorphism"
Das neue Design ist intellektuell, schwebend und hochmodern. Das alte UI wird komplett verdrängt durch:
1. **Keine scharfen Kanten:** Exzessive Nutzung von `rounded-3xl`, `rounded-[2rem]`, `rounded-full`.
2. **Farbpalette:** Akademisches Weiß (`bg-white`), weiche Grautöne (`bg-slate-50`, `bg-gray-100`) mit eleganten **hellblauen Akzenten** (`text-blue-600`, `bg-sky-50`, `border-blue-200`, `ring-cyan-300`).
3. **Glassmorphism:** Schwebende UI-Elemente durch `bg-white/60`, `backdrop-blur-2xl` und diffuse Schatten (`shadow-2xl shadow-blue-900/5`).
4. **Absolutes Bilder-Verbot:** Keine echten Bilder! Wir nutzen ausschließlich `<MediaSlot />` mit sanften CSS-Mesh-Gradients, zentriertem Text und hellblauen Lucide-Icons.

## 📁 Neue Struktur (Phase 3: Route Map)

```text
rsm-systembau/
├─ START_HERE.md            ← dies hier
├─ package.json             ← Abhängigkeiten
├─ docs/
│  ├─ ROUTE_MAP.md          ← Die B2B-Architektur (RSM, Nexus, etc.)
│  ├─ TOKENS.md             ← "Modern Academic Glassmorphism" Tailwind-Klassen
├─ agents/
│  ├─ RULES.md              ← ⚠️ VERBINDLICH — zuerst lesen (Antigravity 2.0 Protokoll)
```

## 📜 Arbeitsweise (Multi-Agenten)
Die Agenten (01-26) lesen zuerst `agents/RULES.md`, dann `docs/TOKENS.md` und setzen die Architektur gemäß `docs/ROUTE_MAP.md` um.
Das Antigravity 2.0 Protokoll (Code-Qualität, i18n, A11y) gilt für jede Code-Zeile!
