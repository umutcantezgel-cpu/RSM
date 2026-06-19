# RULES.md — Verbindliche Regeln für ALLE Agenten (ANTIGRAVITY 2.0 PROTOKOLL)

> Diese Datei vor jedem Arbeitspaket lesen. Sie definiert die Code-Qualität und das Design-System für die **RSM Systembau GmbH**. Verstöße gegen diese Regeln werden nicht toleriert. Das alte Projekt "K-Aqua" ist inhaltlich vergessen, wir nutzen **NUR** die Architektur.

## 1. Universelle i18n (Höchste Priorität)
- **Kein einziger** nutzersichtbarer Text im Frontend darf hartkodiert werden. Alles läuft zwingend über `next-intl` (`useTranslations`, `getTranslations`).
- Die ESLint-Regel `react/jsx-no-literals` ist **streng aktiv**. 
- Dictionaries bilden die einzige Quelle der Wahrheit für Content.

## 2. Sprach-Reinheit
- Keine gemischtsprachigen Auslieferungen.
- Jede Sprache muss zu 100% übersetzt sein, bevor sie dem User angeboten wird.
- TypeScript Typisierung von i18n Keys muss einwandfrei funktionieren.

## 3. Das Neue Design System: "Modern Academic Glassmorphism"
Das alte Design wird radikal verworfen! Implementiere zwingend:
- **Geometrie:** Absolut **keine scharfen Kanten**. Verwende exzessiv `rounded-3xl`, `rounded-[2rem]` und `rounded-full` (Pill-Shapes) für alle Karten, Buttons, Container und Inputs.
- **Farben:** Die Basis ist rein, akademisch und weich (`bg-slate-50`, `bg-gray-100`). Akzente sind **AUSSCHLIESSLICH elegant hellblau** (`text-blue-600`, `bg-sky-50`, `border-blue-200`, `ring-cyan-300`).
- **Effekte:** Tiefes, schwebendes Glassmorphism-Styling. Nutze `bg-white/60`, `backdrop-blur-2xl` und sanfte, großflächige Schatten (z.B. `shadow-2xl shadow-blue-900/5`).

## 4. Absolutes Bilder-Verbot
- Keine echten Bilder, keine `<img src="..." />`, keine Remote-Bilder! 
  **AUSNAHME:** Das RSM-Firmenlogo im Header sowie das Bild des Firmensitzes in der Home-Hero-Sektion müssen echte Bilder (`/assets/rsm-logo.jpg` bzw. das entsprechende Hero-Bild) sein!
- Nutze für alle restlichen Bildflächen zwingend die **`<MediaSlot />`** Architektur aus dem alten Projekt.
- Platzhalter bestehen aus wunderschönen, abgerundeten Divs mit **sanften CSS-Mesh-Gradients**, zentriertem Text (z.B. `[ PLATZHALTER: 3D-BIM Visualisierung EWS ]`) und **hellblauen Lucide-Icons** zur visuellen Unterstützung.

## 5. A11y & Interaktion
- Touch-Targets müssen mindestens **44x44px** groß sein.
- Sichtbare Focus-Rings für Tastatur-Navigation sind **zwingend** (z.B. `focus-visible:ring-2 focus-visible:ring-blue-500`).
- Kontrastwerte müssen den WCAG AA Vorgaben entsprechen.

## 6. Motion (Framer Motion)
- Fließende, weiche Übergänge. Reveals beim Scrollen (`whileInView`).
- **Zwingend:** Die Einstellung `prefers-reduced-motion` (z.B. via `useReducedMotion`) muss strikt respektiert werden. Bei reduzierter Bewegung auf harte Transitions verzichten und stattdessen Fades verwenden.

## 7. Code-Qualität
- **TypeScript Strict Mode** ist Pflicht. Voll typisierte Daten-Verträge für alle Komponenten. Keine `any` oder unsauberen Typisierungen.
- Alle UI-Komponenten müssen sauber extrahiert und wiederverwendbar sein.
