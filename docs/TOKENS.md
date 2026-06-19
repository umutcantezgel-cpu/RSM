# TOKENS.md — "Modern Academic Glassmorphism" (RSM Systembau)

Diese Tokens und Klassen sind strikt zu verwenden, um das intellektuelle, schwebende Design der RSM Systembau Plattform zu gewährleisten. Keine Abweichungen, keine Hex-Werte im Markup. Nutze ausschließlich Tailwind CSS v4 Utilities.

## 1. Geometrie (Keine scharfen Kanten)
Die Ästhetik basiert auf weichen, organischen Formen.
- **Standard-Karten, Panels & Container:** `rounded-3xl`, `rounded-[2rem]`
- **Buttons, Badges, Inputs:** `rounded-full` (Pill-Shapes)
- **Inner Elements (z.B. in Karten):** `rounded-2xl`

## 2. Farben & Hintergründe
Keine aggressiven oder harten Kontraste. Nur intellektuelle Reinheit.

### Base (Akademisch Weiß/Grau)
- `bg-slate-50`
- `bg-gray-100`
- `bg-white`
- Text (Überschriften): `text-slate-900`
- Text (Body): `text-slate-600` oder `text-slate-500`

### Accents (Elegant Hellblau)
Das gesamte Design wird ausschließlich durch diese Akzente geleitet:
- **Text-Akzente & Links:** `text-blue-600`, `text-blue-700`
- **Subtile Hintergründe (Badges, Active States):** `bg-sky-50`, `bg-blue-50`
- **Borders & Focus Rings:** `border-blue-200`, `border-blue-100`, `ring-cyan-300`, `ring-blue-500/50`

## 3. Glassmorphism & Effekte (Schwebendes UI)
Elemente sollen über dem Hintergrund schweben und eine gewisse Transluzenz aufweisen.
- **Glass-Panels (Karten, Navigation, Portal-Login):** `bg-white/60`, `bg-white/70`, `backdrop-blur-2xl`, `backdrop-blur-3xl`
- **Schatten (weich, tief & großflächig):**
  - Standard Elevation: `shadow-xl shadow-blue-900/5`
  - Hover/Float State: `shadow-2xl shadow-blue-900/10`
- **Borders für Glassmorphism:** `border border-white/60` oder `border-white/40`

## 4. MediaSlot Platzhalter (Statt echten Bildern)
Da ein absolutes Bilder-Verbot herrscht, werden alle grafischen Komponenten wie folgt gestaltet:
- **Container:** Zwingend `rounded-[2rem]` oder `rounded-3xl`, `overflow-hidden`.
- **Gradient:** Sanfte CSS-Mesh-Gradients, z.B. `bg-gradient-to-br from-blue-50 via-white to-sky-100`.
- **Text:** Absolut zentriert, `text-blue-800/50`, uppercase, `tracking-widest`, `font-semibold`, z.B. `[ PLATZHALTER: 3D-BIM VISUALISIERUNG EWS ]`.
- **Icon:** Ein passendes Lucide-Icon React-Komponente (`w-12 h-12 text-blue-300`) elegant über dem Text platziert.

## 5. Typografie & Layout
- Nutze moderne serifenlose Schriften.
- Sauberes Leading: `leading-relaxed` oder `leading-loose` für langen Body-Text.
- Typografische Hierarchie durch Font-Weights (`font-light` bis `font-semibold`). Vermeide extrem fette Fonts (`font-black`), da sie der akademischen Optik widersprechen.
