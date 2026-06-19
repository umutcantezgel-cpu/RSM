# Original User Request

## Initial Request — 2026-06-18T21:04:00Z

# Teamwork Project Prompt — Draft

> Status: Launched

Konvertierung der verbleibenden HTML-Prototypen in Next.js Server Components und Sicherstellung der Vercel Deployment Readiness für "RSM Systembau".

Working directory: /Users/umurey/Downloads/RSM
Integrity mode: development

## Requirements

### R1. Page Assembly (HTML zu Next.js)
Übersetze das rohe HTML der folgenden Dateien aus `/Users/umurey/Downloads/RSM/RSM Systembau Design-Relaunch/` in saubere Next.js Server Components im `app/[locale]/` Verzeichnis:
- `Home.dc.html` → `app/[locale]/page.tsx`
- `Unternehmen.dc.html` → `app/[locale]/unternehmen/page.tsx`
- `Leistungen.dc.html` → `app/[locale]/leistungen/page.tsx`
- `Referenzen.dc.html` → `app/[locale]/referenzen/page.tsx`
- `Karriere.dc.html` → `app/[locale]/karriere/page.tsx`
- `Portal.dc.html` → `app/[locale]/portal/page.tsx`
- `Impressum.dc.html` → `app/[locale]/impressum/page.tsx`

Dabei müssen proprietäre HTML-Tags (`<sc-for>`, `<x-dc>`, `<helmet>`) und Inline-Styles in sauberes React (`.map()`) und semantische Tailwind v4 Utilities übersetzt werden. Nutze eine neu zu erstellende `<Reveal />` Wrapper-Komponente für sanfte Scroll-Animationen (beachte `prefers-reduced-motion`). Nutze die existierende `<MediaSlot />` Komponente für alle Bilder.

### R2. Vercel Deployment Readiness
Das Projekt muss Vercel-ready sein.
- Führe einen Typecheck durch (`tsc --noEmit`) und behebe alle TypeScript-Fehler.
- Ergänze fehlende `key`-Props in Listen und korrigiere DOM-Attribute (`class` -> `className`, `onclick` -> `onClick`, etc.).
- Optimiere die `next.config.ts` für Vercel.

### R3. Build Success
Stelle sicher, dass `npm run build` im Verzeichnis `/Users/umurey/Downloads/RSM` absolut fehlerfrei durchläuft. Falls die Auslagerung in `messages/de.json` für i18n den Build blockiert, dürfen Strings temporär hardcodiert werden, um den Deployment-Blocker zu lösen.

## Acceptance Criteria

### Page Assembly
- [ ] Alle 7 Seiten-Routen existieren im `app/[locale]/` Verzeichnis und exportieren default React Components.
- [ ] Keine Inline-Styles oder proprietären Tags (`<sc-for>`, `<x-dc>`) sind in den `.tsx` Dateien verblieben.
- [ ] Bild-Platzhalter verwenden ausschließlich die `<MediaSlot />` Komponente.

### Deployment & Build
- [ ] `npx tsc --noEmit` gibt keine Fehler aus.
- [ ] `npm run build` schließt erfolgreich ab, ohne ESLint- oder TypeScript-Fehler, die den Build abbrechen lassen.
- [ ] Alle Komponenten nutzen korrekte React-Attribute (`className` statt `class`).
