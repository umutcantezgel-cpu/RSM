# Analysis Report: Content Extraction & i18n Mapping

This report documents the extraction of all user-facing strings and data structures from the 4 HTML prototypes of RSM Systembau Design-Relaunch:
- `Home.dc.html`
- `Unternehmen.dc.html`
- `Leistungen.dc.html`
- `Referenzen.dc.html`

The goal is to design a unified JSON schema compatible with `next-intl` (or similar next i18n packages) to be merged into `/Users/umurey/Downloads/RSM/messages/de.json`.

---

## 1. Prototype Structure Analysis & Extracted Lists

Below is the breakdown of key data arrays declared in the `<script>` blocks at the bottom of each prototype, which are utilized for template rendering.

### A. Home Prototype (`Home.dc.html`)
- **`heroStats`**: Stat values shown under the hero heading (4 items).
- **`bigStats`**: Dark stats section highlighting achievements (4 items).
- **`services`**: Highlighted service cards (4 items).
- **`refs`**: Selection of featured references (3 items).

### B. Unternehmen Prototype (`Unternehmen.dc.html`)
- **`nexus`** (referenced as `raw` in script): Tabbed corporate structure detailing entities like RSM Systembau, RT Holding, Team Simon, and Werkules (4 items).
- **`values`**: Company principles/values (3 items).

### C. Leistungen Prototype (`Leistungen.dc.html`)
- **`services`** (referenced as `raw` in script): Detailed breakdown of the 4 service offerings with descriptions and point lists.
- **`steps`**: The 5 stages of the RSM construction process.
- **`esg`**: ESG / sustainability initiatives (3 items).

### D. Referenzen Prototype (`Referenzen.dc.html`)
- **`chips`** (derived from `filters`): Filter categories ('Alle', 'Logistik', 'Öffentliche Hand', 'Hospitality', 'Industrie', 'Gewerbe').
- **`refs`**: Full list of projects with descriptions, KPIs, and metadata (6 items).
- **`stats`**: Summary statistics in dark section (4 items).

---

## 2. Proposed JSON Structure for `messages/de.json`

The following structure retains the existing `Header` and `Footer` namespaces, and introduces namespaced sections for the 4 core pages: `Home`, `Unternehmen`, `Leistungen`, and `Referenzen`.

```json
{
  "Header": {
    "brand_logo_symbol": "R",
    "brand_holding_name": "RT HOLDING",
    "brand_holding_sub": "GROUP",
    "home": "Start",
    "unternehmen": "Unternehmen",
    "leistungen": "Leistungen",
    "referenzen": "Referenzen",
    "karriere": "Karriere",
    "portal": "Portal"
  },
  "Footer": {
    "brand_logo_symbol": "R",
    "brand_name": "RSM SYSTEMBAU",
    "brand_group": "RT HOLDING GROUP",
    "description": "Generalunternehmer für schlüsselfertige B2B-Bauprojekte im DACH-Raum. Modul-Systembau, technische Gebäudeausrüstung, Brandschutz und Premium-Innenausbau — vertikal integriert und digital gesteuert.",
    "badges": {
      "dgnb": "DGNB",
      "iso": "ISO 9001",
      "dsgvo": "DSGVO"
    },
    "nav_title": "Navigation",
    "legal_title": "Rechtliches",
    "legal_impressum": "Impressum",
    "legal_datenschutz": "Datenschutz",
    "legal_agb": "AGB",
    "legal_portal": "Mitarbeiter-Portal",
    "contact_title": "Kontakt",
    "address": "Ernst-Leitz-Straße 1–5\n35578 Wetzlar",
    "phone": "+49 6441 9999 000",
    "email": "kontakt@rsm-systembau.de",
    "copyright": "© 2026 RSM Systembau GmbH · RT Holding Group. Alle Rechte vorbehalten.",
    "claim": "Bauen mit System."
  },
  "Home": {
    "Hero": {
      "tagline": "Generalunternehmer · Wetzlar",
      "title": "Wir bauen\nmit System.",
      "description": "Die RSM Systembau GmbH realisiert als Generalunternehmer der RT Holding schlüsselfertige Bauprojekte im siebenstelligen Volumen. Vier Gewerke, ein Ansprechpartner, eine lückenlose Verantwortung — von der modularen Konstruktion bis zur protokollierten Übergabe.",
      "cta_services": "Leistungen",
      "cta_references": "Referenzen",
      "dgnb_title": "DGNB-konform",
      "dgnb_desc": "Zirkuläres Bauen & ESG",
      "location_chip": "Firmensitz · Ernst-Leitz-Straße, Wetzlar"
    },
    "heroStats": [
      { "v": "90+", "l": "Fachkräfte im Verbund" },
      { "v": "€\u20097 M+", "l": "Volumen pro Auftrag" },
      { "v": "4", "l": "Gewerke unter einem Dach" },
      { "v": "100%", "l": "Termin- & Kostengarantie" }
    ],
    "Leistungsfelder": {
      "tag": "01",
      "title": "Leistungsfelder",
      "heading": "Vier Gewerke. Eine Verantwortung.",
      "cta_all_services": "Alle Leistungen"
    },
    "services": [
      {
        "name": "Generalunternehmer",
        "short": "Schlüsselfertig",
        "desc": "Ein Vertrag, ein Ansprechpartner, ein garantierter Preis — null Schnittstellenrisiko."
      },
      {
        "name": "Modul-Systembau",
        "short": "Just-in-Time",
        "desc": "Industrielle Vorfertigung verkürzt die Bauzeit um bis zu 50 % bei reproduzierbarer Qualität."
      },
      {
        "name": "TGA & Brandschutz",
        "short": "Planwerk · KBV",
        "desc": "Integrale technische Gebäudeausrüstung, kollisionsfrei im BIM-Modell koordiniert."
      },
      {
        "name": "Roh- & Innenausbau",
        "short": "Team Simon",
        "desc": "Über 90 eigene Fachkräfte — Spezialisten für großformatige Fliesen und Naturstein."
      }
    ],
    "DerVerbund": {
      "tag": "02",
      "title": "Der Verbund",
      "heading": "Die Symbiose\nder Giganten.",
      "description": "Hinter jedem Projekt steht ein präzise orchestrierter Unternehmensverbund: die kapitalstarke RT Holding als Fundament, die Team Simon GmbH mit über 90 Fachkräften als handwerkliche Tiefe und die Werkules GmbH als digitale PropTech-Engine. Vertikale Integration als strategischer Vorteil.",
      "cta_explore": "Unternehmen entdecken",
      "placeholder_diagram": "[ Platzhalter: Unternehmens-Diagramm ]"
    },
    "bigStats": [
      { "v": "€\u20092,8 M", "l": "Öffentliches Projektvolumen (Allendorf)" },
      { "v": "1.200 m²", "l": "Großformatfliesen (EWS Frankfurt)" },
      { "v": "−50%", "l": "Bauzeit durch Modul-Systembau" },
      { "v": "24/7", "l": "Projekttransparenz via Werkules" }
    ],
    "Referenzen": {
      "tag": "03",
      "title": "Referenzen",
      "heading": "Beweis statt Behauptung.",
      "cta_all_projects": "Alle Projekte"
    },
    "refs": [
      { "name": "EWS Frankfurt", "cat": "Logistik", "kpi": "Logistik-Masterclass", "meta": "1.200 m² Großformatfliesen" },
      { "name": "Unterkunft Allendorf", "cat": "Öffentliche Hand", "kpi": "Holzrahmenbau", "meta": "€ 2,8 Mio · termingerecht" },
      { "name": "Villa Raab", "cat": "Hospitality", "kpi": "Premium-Mosaik", "meta": "Naturstein & Detailtiefe" }
    ],
    "CTA": {
      "heading": "Ihr nächstes Millionenprojekt.",
      "description": "Übergeben Sie uns Ihre Projektunterlagen — wir prüfen Machbarkeit, Termin und Budget und liefern einen verbindlichen Vorschlag aus einer Hand.",
      "cta_request": "Projekt anfragen",
      "cta_learn_more": "Mehr erfahren"
    }
  },
  "Unternehmen": {
    "PageHead": {
      "tagline": "Unternehmen · Corporate Nexus",
      "title": "Die Symbiose der Giganten.",
      "description": "Hinter jedem RSM-Projekt steht ein präzise orchestrierter Unternehmensverbund. Vier spezialisierte Einheiten greifen ineinander wie die Komponenten eines Tragwerks — kapitalstark gesteuert, handwerklich tief verwurzelt und digital vernetzt. Diese vertikale Integration ist kein Zufall, sondern strategisches Fundament."
    },
    "nexus": [
      {
        "tag": "Generalunternehmer",
        "num": "01",
        "name": "RSM Systembau GmbH",
        "role": "Die ausführende Kraft",
        "body": "Als Generalunternehmer ist die RSM Systembau GmbH der zentrale Knotenpunkt jedes Bauvorhabens. Sie übernimmt die schlüsselfertige Realisierung siebenstelliger Projekte und bündelt sämtliche Gewerke in einer einzigen, vertraglich verbindlichen Verantwortung — vom ersten Spatenstich bis zur protokollierten Übergabe.",
        "stats": [
          { "v": "SPOC", "l": "Single Point of Contact" },
          { "v": "100%", "l": "Termin- & Kostengarantie" },
          { "v": "DIN", "l": "ISO 9001 Prozesse" }
        ]
      },
      {
        "tag": "Holding",
        "num": "02",
        "name": "RT Holding",
        "role": "Das strategische Fundament",
        "body": "Die RT Holding bildet die kapital- und steuerungsseitige Dachstruktur des Verbunds. Sie sichert finanzielle Solidität, allokiert Investitionen und verantwortet die strategische Ausrichtung der Beteiligungen. Für Auftraggeber bedeutet das einen bonitätsstarken Partner mit langfristigem Planungshorizont.",
        "stats": [
          { "v": "Bonität", "l": "Geprüfte Stabilität" },
          { "v": "Multi", "l": "Beteiligungsstruktur" },
          { "v": "Langfrist", "l": "Investitionshorizont" }
        ]
      },
      {
        "tag": "Ausbau-Power",
        "num": "03",
        "name": "Team Simon GmbH",
        "role": "Die handwerkliche Tiefe",
        "body": "Mit über 90 Fachkräften liefert die Team Simon GmbH die operative Schlagkraft im Roh- und Innenausbau. Die Spezialisierung auf großformatige Fliesen- und Natursteinarbeiten verleiht dem Verbund eine Ausführungsqualität, die im Generalunternehmer-Markt selten vertikal integriert verfügbar ist.",
        "stats": [
          { "v": "90+", "l": "Eigene Fachkräfte" },
          { "v": "Premium", "l": "Großformat & Mosaik" },
          { "v": "In-House", "l": "Keine Lücken" }
        ]
      },
      {
        "tag": "PropTech-Engine",
        "num": "04",
        "name": "Werkules GmbH",
        "role": "Die digitale Intelligenz",
        "body": "Die Werkules GmbH ist die PropTech-Engine des Verbunds. Ihre Softwareplattform digitalisiert Aufmaß, Disposition, Bautagebuch und Abrechnung in Echtzeit und überführt das Handwerk in das Zeitalter datengetriebener Steuerung — Handwerk 4.0 als realer Wettbewerbsvorteil.",
        "stats": [
          { "v": "Realtime", "l": "Bautagebuch & Aufmaß" },
          { "v": "4.0", "l": "Handwerk digital" },
          { "v": "API", "l": "BIM-Schnittstellen" }
        ]
      }
    ],
    "Leitprinzipien": {
      "tag": "Leitprinzipien",
      "heading": "Worauf wir bauen."
    },
    "values": [
      {
        "t": "Verbindlichkeit",
        "d": "Fixe Termine, garantierte Maximalpreise und eine lückenlose Gewährleistung aus einer Hand. Was wir zusagen, halten wir vertraglich."
      },
      {
        "t": "Geschwindigkeit",
        "d": "Industrielle Vorfertigung und digitale Steuerung verkürzen die Bauzeit drastisch — ohne Kompromiss bei der Ausführungsqualität."
      },
      {
        "t": "Tiefe",
        "d": "Über 90 eigene Fachkräfte statt anonymer Subunternehmer-Ketten. Verantwortung bleibt im Haus, Qualität bleibt kontrollierbar."
      }
    ],
    "CTA": {
      "heading": "Lernen Sie den Verbund kennen.",
      "description": "Vier Unternehmen, eine Philosophie — und ein Ansprechpartner für Ihr Vorhaben.",
      "cta_contact": "Kontakt aufnehmen"
    }
  },
  "Leistungen": {
    "PageHead": {
      "tagline": "Leistungen · In-House Performance",
      "title": "Vier Gewerke. Eine Verantwortung.",
      "description": "Wo klassische Bauträger Dutzende Subunternehmer koordinieren, hält RSM die gesamte Wertschöpfung im eigenen Verbund. Das eliminiert Schnittstellenrisiken und macht uns zum verlässlichen Single Point of Contact für siebenstellige Vorhaben."
    },
    "services": [
      {
        "name": "Generalunternehmer",
        "short": "Schlüsselfertig",
        "lead": "Ein Vertrag, ein Ansprechpartner, ein garantierter Preis.",
        "body": "Als Generalunternehmer übernimmt RSM die vollständige Koordination aller am Bau beteiligten Gewerke. Auftraggeber delegieren das gesamte Schnittstellen-, Termin- und Mängelrisiko an einen einzigen, haftenden Partner. Das eliminiert die kostspielige Reibung klassischer Einzelvergabe und schafft die Planungssicherheit, die institutionelle Investoren bei siebenstelligen Volumina voraussetzen.",
        "points": [
          "Garantierter Maximalpreis (GMP) & Fixtermine",
          "Lückenlose Gewährleistung aus einer Hand",
          "Reduktion der Schnittstellen von Dutzenden auf eine"
        ]
      },
      {
        "name": "Modul-Systembau",
        "short": "Just-in-Time",
        "lead": "Industrielle Vorfertigung statt wetterabhängiger Baustelle.",
        "body": "Der modulare Systembau verlagert bis zu 80 % der Wertschöpfung in die witterungsunabhängige Werkhalle. Raummodule werden parallel zur Baufeldvorbereitung gefertigt und just-in-time montiert. Gegenüber konventionellen Verfahren verkürzt dies die Bauzeit drastisch bei gleichbleibend reproduzierbarer Präzisionsqualität.",
        "points": [
          "Bis zu 50 % verkürzte Bauzeit",
          "Reproduzierbare Werkhallen-Qualität",
          "Rückbaubar & re-konfigurierbar (zirkulär)"
        ]
      },
      {
        "name": "TGA & Brandschutz",
        "short": "Planwerk · KBV · SprING",
        "lead": "Technische Gebäudeausrüstung als integrierte Disziplin.",
        "body": "Die technische Gebäudeausrüstung entscheidet über Betriebskosten, Sicherheit und Genehmigungsfähigkeit. Über die Partner Planwerk, KBV und SprING integriert RSM Heizung, Lüftung, Sanitär, Elektro sowie den anlagentechnischen Brandschutz bereits in der Entwurfsphase — kollisionsfrei im BIM-Modell koordiniert statt nachträglich improvisiert.",
        "points": [
          "Integrale TGA-Planung im BIM-Modell",
          "Anlagentechnischer Brandschutz (SprING)",
          "Sachverständige Abnahme & Dokumentation"
        ]
      },
      {
        "name": "Roh- & Innenausbau",
        "short": "Team Simon Power",
        "lead": "Vom tragenden Rohbau bis zur perfekten Oberfläche.",
        "body": "Mit die Team Simon GmbH und ihren über 90 Fachkräften verfügt der Verbund über eine im Markt seltene vertikale Integration des Ausbaus. Die Kernkompetenz liegt in der großformatigen Fliesen- und Natursteinverlegung — eine Disziplin, die bei Logistikflächen wie bei hochwertiger Hospitality-Architektur kompromisslose Maßhaltigkeit verlangt.",
        "points": [
          "Großformat- & Mosaik-Verlegung in Perfektion",
          "Tragender Rohbau & Komplett-Innenausbau",
          "Eigene Kolonnen — keine Subunternehmer-Lücken"
        ]
      }
    ],
    "activeService_placeholder_prefix": "[ Platzhalter:",
    "activeService_placeholder_suffix": " ]",
    "DerProzess": {
      "tag": "Der RSM-Prozess",
      "heading": "Von der Vision zur protokollierten Übergabe."
    },
    "steps": [
      { "n": "01", "t": "Bedarfsanalyse", "d": "Gemeinsame Klärung von Ziel, Budget und Vergaberahmen — transparent und unverbindlich." },
      { "n": "02", "t": "Integrale Planung", "d": "Architektur, Statik, TGA und Brandschutz kollisionsfrei im gemeinsamen BIM-Modell." },
      { "n": "03", "t": "Werkfertigung", "d": "Bis zu 80 % Wertschöpfung witterungsunabhängig in der Halle, parallel zum Baufeld." },
      { "n": "04", "t": "Montage", "d": "Module werden just-in-time angeliefert und mit minimaler Bauzeit montiert." },
      { "n": "05", "t": "Übergabe", "d": "Protokollierte, mängelfreie Abnahme inklusive vollständiger digitaler Dokumentation." }
    ],
    "Nachhaltigkeit": {
      "tagline": "Nachhaltigkeit & ESG",
      "heading": "Bauen, das sich für die Bilanz von morgen rechnet."
    },
    "esg": [
      { "k": "Cradle to Cradle", "t": "Zirkuläres Bauen", "d": "Module werden sortenrein konstruiert und am Ende des Lebenszyklus wiederverwendet. Der Bau wird zum Materialdepot." },
      { "k": "CO₂-Speicher", "t": "Holzrahmenbau", "d": "Nachwachsende Rohstoffe binden CO₂ über die gesamte Nutzungsdauer und vereinen Ökobilanz mit serieller Vorfertigung." },
      { "k": "PV-Integration", "t": "Das Dach als Kraftwerk", "d": "Integrierte Photovoltaik macht Gebäude vom Energieverbraucher zum Prosumer — ein messbarer Beitrag zur Amortisation." }
    ],
    "CTA": {
      "heading": "Welches Gewerk braucht Ihr Projekt?",
      "description": "Oder alle vier — aus einer Hand. Lassen Sie uns über Machbarkeit, Termin und Budget sprechen.",
      "cta_start": "Anfrage starten"
    }
  },
  "Referenzen": {
    "PageHead": {
      "tagline": "Referenzen · Prestige",
      "title": "Beweis statt Behauptung.",
      "description": "Ausgewählte Projekte aus Logistik, öffentlicher Hand, Hospitality und Industrie — jedes ein Beleg für die vertikale Tiefe des Verbunds."
    },
    "filters": {
      "Alle": "Alle",
      "Logistik": "Logistik",
      "OeffentlicheHand": "Öffentliche Hand",
      "Hospitality": "Hospitality",
      "Industrie": "Industrie",
      "Gewerbe": "Gewerbe"
    },
    "chips": [
      "Alle",
      "Logistik",
      "Öffentliche Hand",
      "Hospitality",
      "Industrie",
      "Gewerbe"
    ],
    "refs": [
      {
        "name": "EWS Frankfurt",
        "cat": "Logistik",
        "meta": "1.200 m² Großformatfliesen",
        "kpi": "Logistik-Masterclass",
        "body": "Verlegung von 1.200 m² maßhaltiger Großformatfliesen unter laufendem Logistikbetrieb — eine Präzisionsleistung unter Zeitdruck, die Ebenheitstoleranzen im Submillimeterbereich einhielt."
      },
      {
        "name": "Unterkunft Allendorf",
        "cat": "Öffentliche Hand",
        "meta": "€ 2,8 Mio · Holzrahmenbau",
        "kpi": "Öffentlicher Auftraggeber",
        "body": "Schlüsselfertige Errichtung in nachhaltiger Holzrahmenbauweise. Vergaberechtskonform realisiert, termingerecht übergeben und ein Referenzbeispiel für sozial verantwortliches, serielles Bauen."
      },
      {
        "name": "Villa Raab",
        "cat": "Hospitality",
        "meta": "Premium-Mosaikarbeiten",
        "kpi": "Hospitality-Exzellenz",
        "body": "Hochwertige Mosaik- und Natursteinarbeiten für ein anspruchsvolles Hospitality-Objekt. Handwerkliche Detailtiefe trifft auf die logistische Disziplin eines Generalunternehmers."
      },
      {
        "name": "Industriepark Mittelhessen",
        "cat": "Industrie",
        "meta": "Modulare Produktionshalle",
        "kpi": "Just-in-Time Montage",
        "body": "Modular vorgefertigte Produktionshalle, just-in-time montiert bei minimaler Störung des angrenzenden Werkbetriebs. Erweiterbar konzipiert für zukünftige Skalierung."
      },
      {
        "name": "Gewerbecampus Gießen",
        "cat": "Gewerbe",
        "meta": "TGA & Brandschutz integral",
        "kpi": "BIM-koordiniert",
        "body": "Integrale TGA- und Brandschutzplanung über alle Gewerke, kollisionsfrei im BIM-Modell koordiniert und sachverständig abgenommen."
      },
      {
        "name": "Logistikzentrum RheinMain",
        "cat": "Logistik",
        "meta": "Hochregal-Bodenplatte",
        "kpi": "Submillimeter-Ebenheit",
        "body": "Großflächige Industriebodenplatte für ein automatisiertes Hochregallager mit höchsten Anforderungen an Ebenheit und Belastbarkeit."
      }
    ],
    "stats": [
      { "v": "€\u20092,8 M", "l": "Größtes öffentliches Projektvolumen" },
      { "v": "1.200 m²", "l": "Großformatfliesen in einem Projekt" },
      { "v": "6+", "l": "Branchen-Sektoren abgedeckt" },
      { "v": "100%", "l": "Termingerechte Übergaben" }
    ],
    "CTA": {
      "heading": "Wird Ihr Projekt das nächste?",
      "description": "Erzählen Sie uns davon — wir zeigen Ihnen, wie wir es realisieren würden.",
      "cta_request": "Projekt anfragen"
    }
  }
}
```

---

## 3. Integration Strategy

To integrate this structure into the Next.js app context:
1. **File Overwrite/Merge**: Since we are in a read-only role, the implementer agent should merge the above structure into `/Users/umurey/Downloads/RSM/messages/de.json`.
2. **Translation Keys Hooking**:
   - For lists (e.g. `heroStats`, `services`), mapping should be done dynamically using translations, e.g. `t.raw('Home.heroStats')` if using `next-intl` raw arrays, or structured component-level mappings.
   - SVGs / icons should remain in standard React components (e.g. keying off of a service ID like `gu`, `mod`, `tga`, `aus` or similar).

---

## 4. Verification

The extracted strings were verified verbatim against:
- `Home.dc.html` lines 180–213 (Script Data) and 45–173 (Static Layout)
- `Unternehmen.dc.html` lines 105–144 (Script Data) and 31–99 (Static Layout)
- `Leistungen.dc.html` lines 124–175 (Script Data) and 30–118 (Static Layout)
- `Referenzen.dc.html` lines 89–118 (Script Data) and 30–83 (Static Layout)
