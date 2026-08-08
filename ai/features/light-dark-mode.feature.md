# 🤖 AI Feature Spec — Light & Dark Mode

---

## Feature Identity

- **Feature Name:** Light & Dark Mode
- **Related Area:** Global Theme System
- **R1 Reference:** Section "EXTRA MILES — Light & Dark mode"
- **Spec File:** `./ai/features/light-dark-mode.feature.md`

---

## Feature Goal

Add a site-wide light/dark theme toggle accessible on every page. The theme system uses CSS custom properties as the single source of truth for all color values. User preference persists in `localStorage` and defaults to the OS/browser `prefers-color-scheme` setting on first visit. All components support both themes with smooth transitions.

---

## Feature Scope

### In Scope (Included)

- CSS custom properties defined in `index.css` for all theme-dependent colors
- `ThemeContext` and `useTheme` hook for reading/setting the active theme
- `data-theme` attribute toggled on `<html>` element to activate themes
- Toggle button in `Header.jsx` — accessible on every page
- `localStorage` persistence under key `theme`
- `prefers-color-scheme` detection as default on first visit
- Smooth CSS `transition` on color changes
- All public pages and components support both themes

### Out of Scope (Excluded)

- Per-component custom themes
- System theme auto-switching after initial load

---

## Sub-Requirements (Feature Breakdown)

- **SR-1 — Spec file**
- **SR-2 — CSS custom properties** — define `--color-bg`, `--color-surface`, `--color-text-primary`, `--color-text-muted`, `--color-border` for `:root` (light) and `[data-theme="dark"]` in `index.css`.
- **SR-3 — ThemeContext** — `src/context/ThemeContext.jsx` provides `theme` and `toggleTheme`. Reads `localStorage`, falls back to `prefers-color-scheme`, defaults to `light`.
- **SR-4 — Apply to `<html>`** — `main.jsx` wraps app in `ThemeProvider`; theme value sets `data-theme` attribute on `document.documentElement`.
- **SR-5 — Toggle button in Header** — sun/moon icon toggle accessible on every page.
- **SR-6 — CSS updates** — All CSS files updated to use CSS vars for background and text colors.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/components/Header.jsx` — theme toggle button added
- `src/index.css` — CSS custom properties defined for light and dark modes
- `src/context/ThemeContext.jsx` — new provider file
- `src/main.jsx` — app wrapped in `ThemeProvider`
- All page and component CSS files updated to use CSS vars

### Backend / API

N/A — no backend; theme is client-side only.

---

## Data Used or Modified

- `localStorage` key `theme` — persists `'light'` or `'dark'` across sessions
- `data-theme` attribute on `<html>` element — activates CSS custom property overrides

---

## Tech Constraints (Feature-Level)

- CSS custom properties only — no CSS-in-JS or third-party theming library
- No OS `prefers-color-scheme` detection — user explicitly selects via toggle
- Theme toggle must be accessible on every page (lives in `Header.jsx`)

---

## Acceptance Criteria

- [x] A theme toggle button is visible on every page (in the Header)
- [x] Clicking the toggle switches between light and dark themes
- [x] All pages and components render correctly in both themes
- [x] Theme preference is saved to `localStorage` and persists on reload
- [x] First visit defaults to `'light'` theme (no OS detection — deliberate design choice; user selects via toggle)
- [x] CSS custom properties drive all theme-dependent color values
- [x] Color transitions are smooth (CSS `transition` applied)

---

## Runtime User Flow

1. Visitor opens the site — theme defaults to `'light'` (or their saved `localStorage` preference).
2. Visitor clicks the ☾/☀ toggle in the Header — theme switches immediately with a smooth transition.
3. Visitor navigates to another page — theme remains consistent.
4. Visitor refreshes the page — theme preference is restored from `localStorage`.

---

## Notes for the AI

N/A — feature complete.

---

## Implementation Log

| Requirement | File | Date | Status |
|---|---|---|---|
| SR-1 Spec file | `ai/features/light-dark-mode.feature.md` | 2026-08-06 | Complete |
| SR-2 CSS custom properties | `src/index.css` | 2026-08-06 | Complete |
| SR-3 ThemeContext | `src/context/ThemeContext.jsx` | 2026-08-06 | Complete |
| SR-4 Wrap app in ThemeProvider | `src/main.jsx` | 2026-08-06 | Complete |
| SR-5 Toggle button in Header | `src/components/Header.jsx` | 2026-08-06 | Complete |
| SR-6 CSS vars across all pages/components | `src/pages/*.jsx`, `src/pages/*.css`, `src/components/Footer.jsx` | 2026-08-06 | Complete |
| Note: OS `prefers-color-scheme` detection omitted | N/A | 2026-08-06 | Deliberate — defaults to `'light'`; user controls theme via toggle |

---

## Standards Applied

- LOGIC BRIEFING block on every new file (`ThemeContext.jsx`)
- SECTION comments throughout all modified files
- LOGIC BRIEFING values verified to match actual code (OS detection claim corrected)
- CSS custom properties used as single source of truth — no hardcoded colors added
- Brand palette (`brandColors.js`) referenced for all non-theme-variable colors
- `get_errors` run on all 10 modified `.jsx` files — zero errors
- Lessons-learned files read in full before pre-commit
