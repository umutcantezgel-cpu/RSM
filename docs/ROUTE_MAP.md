# ROUTE_MAP.md — Seitenarchitektur RSM Systembau GmbH

Die Navigation und das Routing-System für die B2B-Architektur der RSM Systembau.
Alle Routen unterliegen der `next-intl` Middleware für i18n, weshalb jede Route unterhalb des Locale-Prefix (z.B. `/de/`, `/en/`) existiert.

## 1. Hauptseiten (Public B2B)

- **`/` (Startseite)**
  - Hero-Scrollytelling mit tiefen Glassmorphism-Cards.
  - Fokus: RSM als Generalunternehmer, ESG-Richtlinien, BIM (Building Information Modeling).
- **`/unternehmen/nexus`**
  - Thema: Die "Symbiose der Giganten"
  - Vorstellung des Netzwerks: RSM Systembau, RT Holding, Team Simon, Werkules GmbH.
- **`/leistungen/generalunternehmer`**
  - Fokus auf 7-stellige Enterprise-Projekte.
  - Das Konzept des "Single-Point-of-Contact".
- **`/leistungen/tga-brandschutz`**
  - Detaillierte Leistungen.
  - Integration von Planwerk, KBV und SprING.
- **`/referenzen`**
  - Wunderschönes, asymmetrisches Masonry-Grid (in abgerundeter Glassmorphism-Optik).
  - Highlights: "EWS Frankfurt", "Flüchtlingsunterkunft Allendorf", "Villa Raab".
- **`/karriere`**
  - Modernes HR-Hub für Fachkräfte.
  - Zielgruppen: Bauleiter, Ingenieure, TGA-Fachplaner.

## 2. Geschlossene Bereiche

- **`/portal`**
  - Zero-Trust Mitarbeiter-Portal.
  - UI: Hochsichere Login-Maske, stilisiert im extrem eleganten Glassmorphism-Look (`backdrop-blur-3xl`, `rounded-[2rem]`, weiche blaue Schatten).

## 3. Legal & Compliance

- **`/impressum`**
  - DSGVO-konforme, cleane und reduzierte Darstellung.
- **`/datenschutz`**
  - Sauberes, akademisch-übersichtliches Layout für alle rechtlichen Dokumente.

---

> **Hinweis für Agenten:** Jede dieser Routen nutzt zwingend die in `START_HERE.md` und `TOKENS.md` definierten UI-Primitives und das "Modern Academic Glassmorphism" Design System.
