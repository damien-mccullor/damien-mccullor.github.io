# 🤖 AI Feature Spec — Project Layout (Header / Footer)

---

## Feature Identity

- **Feature Name:** Project Layout (Header / Footer)
- **Related Area:** Global UI Shell / Navigation / Responsive Layout
- **R1 Reference:** Section "Feature - Project layout"
- **Spec File:** `./ai/features/header-footer.feature.md`

---

## Feature Goal

Establish the persistent site-wide layout: a sticky header with the AI-generated logo and navigation links, a footer with contact info and copyright, and a `Layout` wrapper component that sandwiches all page content. Implement routing and responsive behavior so the site works correctly on both desktop (horizontal top nav) and mobile (icon-only bottom nav).

---

## Feature Scope

### In Scope (Included)

- Install `react-router-dom` and configure routing in `src/main.jsx`
- Routing strategy: **HashRouter** for GitHub Pages compatibility (URL stays `https://damien-mccullor.github.io/#/...`)
- `src/components/Layout.jsx` — wraps all page content between Header and Footer
- `src/components/Header.jsx` — sticky, contains logo + desktop horizontal nav links
- `src/components/Footer.jsx` — contact info, social links, copyright notice
- `src/pages/` — placeholder stubs for all 6 public routes (Home, Portfolio, Links, Contact, Login, BackOffice) — enough for navigation to work
- `src/App.jsx` — wired to RouterProvider with all routes, Login and BackOffice excluded from nav
- `src/constants/brandColors.js` — brand color palette (single source of truth for all colors)
- AI-generated logo image placed in `src/assets/` and documented (AI tool noted in spec)
- Desktop responsive behavior (>768px): nav links horizontal in header
- Mobile responsive behavior (≤768px): nav links become icons, displayed in a fixed bottom bar
- Logo scales appropriately, no overflow on any viewport

### Out of Scope (Excluded)

- Any actual page content — page stubs only (each page feature fills in its own content)
- Supabase calls — no data fetching in this feature
- Back Office protected route logic — belongs to `back-office` feature
- Light/Dark mode or multi-language support (Extra Miles)

---

## Sub-Requirements (Feature Breakdown)

- **SR-1 — Install react-router-dom** — Run `npm install react-router-dom`. Configure `HashRouter` in `src/main.jsx` wrapping `<App />`.
- **SR-2 — Brand colors** — Create `src/constants/brandColors.js` with the project's color palette. All components reference this file — no hardcoded hex values elsewhere.
- **SR-3 — Layout component** — `src/components/Layout.jsx` renders `<Header />`, `<main>{children}</main>`, and `<Footer />`. All page routes render inside Layout.
- **SR-4 — Header component** — Sticky/fixed at top. Contains the AI-generated logo (links to `/`) and navigation links to Home, Portfolio, Links, and Contact. LOGIC BRIEFING required.
- **SR-5 — Footer component** — Appears on every page. Includes email, social links, and copyright notice. LOGIC BRIEFING required.
- **SR-6 — AI-generated logo** — Logo image in `src/assets/`. `<img alt="Damien McCullor logo">`. AI tool used is documented below in Tech Constraints.
- **SR-7 — Page stubs** — Create minimal placeholder components for all routes: `Home.jsx`, `Portfolio.jsx`, `Links.jsx`, `Contact.jsx`, `Login.jsx`, `BackOffice.jsx`.
- **SR-8 — Responsive layout** — CSS media query at 768px breakpoint: desktop shows horizontal nav in header; mobile shows icon-only fixed bottom nav bar. Logo scales without overflow on any viewport. Text readable without horizontal scrolling. Sections stack vertically on narrow viewports.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/main.jsx` — adds HashRouter wrapper
- `src/App.jsx` — defines all routes; Login and BackOffice routes excluded from nav
- `src/components/Layout.jsx` — persistent wrapper rendered for every route
- `src/components/Header.jsx` — logo + nav links; sticks to top
- `src/components/Footer.jsx` — contact + copyright
- `src/constants/brandColors.js` — color constants (new file)
- `src/pages/Home.jsx` — stub
- `src/pages/Portfolio.jsx` — stub
- `src/pages/Links.jsx` — stub
- `src/pages/Contact.jsx` — stub
- `src/pages/Login.jsx` — stub
- `src/pages/BackOffice.jsx` — stub
- `src/assets/logo.png` (or `.svg`) — AI-generated logo image

### Backend / API

- N/A — no backend calls in this feature

---

## Data Used or Modified

- No application data is used or stored.
- Brand color values are defined as constants in `src/constants/brandColors.js` — referenced by all components.

---

## Tech Constraints (Feature-Level)

- **Routing:** Use `HashRouter` from `react-router-dom`. GitHub Pages cannot serve sub-paths from a static host without a 404.html redirect. HashRouter resolves this by keeping all navigation in the URL hash (e.g., `/#/portfolio`), matching R1's requirement that the base URL stays `https://damien-mccullor.github.io`.
- **Logo:** Must be AI-generated. Document the AI tool here once generated: `[AI tool: Gemini, ChatGPT, GitHub Copilot]`. Place image at `src/assets/logo.png` or `src/assets/logo.svg`. Include `alt="Damien McCullor logo"` on the `<img>` tag.
- **Responsive breakpoint:** `768px` is the exact R1-specified breakpoint. Desktop (>768px): horizontal nav at top. Mobile (≤768px): icon-only nav at bottom of viewport.
- **Mobile bottom nav:** Must use icons (not text labels) per R1. Use inline SVG icons — do not import an icon library for a handful of icons (lessons-learned rule).
- **No inline hex values:** All colors from `brandColors.js`. Verify every text color meets WCAG AA (4.5:1) before committing.
- **`<main>` landmark:** The Layout component must wrap page content in a `<main>` element (Lighthouse baseline).
- **Route-level code splitting:** `main.jsx` must use `React.lazy()` + `<Suspense>` for all page components except the entry route (Lighthouse baseline).
- **LOGIC BRIEFING:** Required on `Header.jsx`, `Footer.jsx`, `Layout.jsx`, and all page stubs.

---

## Acceptance Criteria

- [x] `react-router-dom` is in `package.json` dependencies
- [x] `HashRouter` is configured in `src/main.jsx` wrapping the app
- [x] `src/constants/brandColors.js` exists and is the only place hex values are defined
- [x] `src/components/Layout.jsx` exists and wraps all page routes
- [x] `src/components/Header.jsx` exists with a sticky/fixed position
- [x] Header contains the AI-generated logo; clicking it navigates to `/`
- [x] Logo has an appropriate `alt` attribute
- [x] Header contains navigation links to Home (`/`), Portfolio (`/#/portfolio`), Links (`/#/links`), and Contact (`/#/contact`)
- [x] `src/components/Footer.jsx` exists and renders on every page
- [x] Footer includes email, at least one social link, and a copyright notice
- [x] Header background and styling are consistent across all pages
- [x] On desktop (>768px), navigation links are displayed horizontally in the header
- [x] On mobile (≤768px), navigation links become icons and are displayed in a fixed bottom bar
- [x] Logo scales without overflow on mobile viewports
- [x] Text is readable without horizontal scrolling on mobile
- [x] Global `img { max-width: 100%; height: auto; }` rule exists in `src/index.css`
- [x] All 6 page stub files exist in `src/pages/`
- [x] Login and BackOffice routes are NOT shown in the navigation
- [x] Every new component file has a LOGIC BRIEFING block and SECTION comments
- [x] No hardcoded hex values outside `brandColors.js`
- [x] AI tool used for logo generation is documented in this spec

---

## Runtime User Flow

1. Visitor navigates to `https://damien-mccullor.github.io`.
2. The React app loads. `HashRouter` initializes and matches the `/#/` (or empty hash) route to the `Home` page stub.
3. `Layout` renders: the sticky `Header` appears at the top with the logo and nav links; the `Footer` appears at the bottom.
4. On desktop, the visitor sees horizontal nav links (Home, Portfolio, Links, Contact) in the header.
5. On mobile, the nav links collapse and a fixed icon bar appears at the bottom of the screen.
6. The visitor clicks the logo — the app navigates to `/` (Home).
7. The visitor clicks a nav link (e.g., Portfolio) — the URL updates to `/#/portfolio` and the Portfolio stub renders inside the Layout without a page reload.
8. The visitor scrolls down on a long page — the header remains visible due to sticky/fixed positioning.
9. The visitor resizes the browser window across the 768px breakpoint — layout shifts between desktop and mobile nav without breaking any content.
