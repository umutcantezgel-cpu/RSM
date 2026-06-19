# Review Report - Milestone 2: Core Page Assembly

## Review Summary

**Verdict**: REQUEST_CHANGES

The implementation of the core pages for Milestone 2 is mostly complete, well-structured, compiles successfully, and passes all component tests. However, there are critical robustness and localization gaps that need to be addressed before approval, specifically around hardcoded strings in client-side state and text duplications.

---

## Findings

### [Major] Finding 1: Hardcoded `"Alle"` Filter State in `ProjectGrid`

- **What**: The default state of the filter is hardcoded to the German string `"Alle"`, and filtering logic checks against this hardcoded string.
- **Where**: `components/referenzen/ProjectGrid.tsx` (lines 20-25)
- **Why**: This violates localization robustness. In future milestones, if the locale changes to English (or any other language), the first filter chip will display the translated name (e.g. `"All"`), but the active state will default to `"Alle"`. This results in:
  1. No category chip highlighted as active initially (since `"All" === "Alle"` is false).
  2. If the user clicks the translated `"All"` chip, the filtering logic `activeFilter === "Alle"` evaluates to false, which means it will try to find projects whose category is literally `"All"` (which will return no results, hiding all projects).
- **Suggestion**: Use the first element of the `filters` array to set the initial state and perform the bypass check:
  ```tsx
  const [activeFilter, setActiveFilter] = useState(filters[0] || "Alle");
  
  const visibleProjects = projects.filter(
    (project) => activeFilter === filters[0] || project.cat === activeFilter
  );
  ```

### [Minor] Finding 2: Translation Duplication in `unternehmen/page.tsx`

- **What**: The section tag/title renders the same translated key `{t('Leitprinzipien.tag')}` twice.
- **Where**: `app/[locale]/unternehmen/page.tsx` (lines 73-80)
- **Why**: This results in redundant text rendering (`Leitprinzipien — LEITPRINZIPIEN`) instead of a numerical prefix or a distinct title. In comparison, other pages render a section number (e.g., `01` or `02`) or a different tag/title combination.
- **Suggestion**: Replace the first span's content with either a numerical indicator (e.g. `"02"` or read from translations) or add a proper distinct sub-tag in `messages/de.json` and use it.

---

## Verified Claims

- **Zero Inline Styles** → Verified via codebase-wide grep searches for `style=` and `style={` inside the `app/[locale]` and `components` directories → **PASS** (no matches found).
- **Absolute Image Ban / MediaSlot Conformance** → Verified via codebase-wide grep searches for `<img` and `<Image` in implemented pages and components. All image placeholders successfully use `<MediaSlot />` → **PASS**.
- **User-Facing Text Localization** → Checked all texts in `app/[locale]/page.tsx`, `unternehmen/page.tsx`, `leistungen/page.tsx`, and `referenzen/page.tsx`. All components retrieve strings dynamically via `next-intl` namespaces → **PASS** (except for the minor duplication in `unternehmen/page.tsx` and the `"Alle"` string in `ProjectGrid.tsx`).
- **Scroll Reveal Wrappers** → Verified that all sections designed with scroll animation triggers are correctly wrapped in `<Reveal />` (aligned with the raw designs in `RSM Systembau Design-Relaunch/` files) → **PASS**.
- **Successful Build Compilation** → Ran `npm run build` which compiled the static and dynamic pages with zero compiler errors or TypeScript warnings → **PASS**.
- **Component Test Suite Execution** → Ran `npx tsx components/ui/__tests__/verify_all.tsx` to verify component behavior, hydration safety, Framer Motion transitions, and next-intl translation resolutions → **PASS** (all 72 prop combinations and tests successfully pass).

---

## Coverage Gaps

- **Multi-locale testing** — Risk level: Medium. The current setup only verifies `de.json` since only German translations exist. The lack of standard translation keys for layout components like `ProjectGrid` exposes the app to future translation breakage when `en.json` is added in Milestone 3. Recommendation: Address the hardcoded filter state in `ProjectGrid.tsx` now to accept risk.

---

## Unverified Items

- None. All checklist files, pages, and components were fully inspected and verified.
