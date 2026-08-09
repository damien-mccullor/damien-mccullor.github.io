# CONCEPTS.md — 3 Challenging Concepts

## Module 16 — Personal Portfolio Project
**Author:** Damien McCullor

---

## Concept 1 — CI/CD Pipeline with GitHub Actions & GitHub Pages

### Purpose in the Project
Automated the entire build and deployment process for this portfolio. Every push to the `dev` or `main` branch triggers a GitHub Actions workflow that installs dependencies, builds the React/Vite application, and deploys the static output to GitHub Pages — without any manual steps.

### Why It Was Challenging
Setting up the pipeline revealed several non-obvious failure modes:

- **YAML parsing quirk:** The `on:` trigger keyword in YAML is interpreted as the boolean value `true` when unquoted. The fix was quoting it as `'on':`, which is not intuitive and not well-documented.
- **Artifact accumulation:** Re-running a failed job in the same workflow run uploads a second artifact named `github-pages`. GitHub Actions then fails with "Multiple artifacts found" because it cannot determine which to deploy. The solution was always triggering a *fresh* workflow run with a new commit — not re-running the existing job.
- **Environment protection rules:** GitHub Pages environments restrict deployment to specific branches by default. The `dev` branch had to be explicitly added under `Settings → Environments` before deployments from it could succeed.
- **`npm ci` vs `npm install`:** The `npm ci` command requires a clean, valid `package-lock.json`. After running `npm audit fix --force`, the lockfile was out of sync with `package.json`, causing `npm ci` to fail. The pipeline was switched to `npm install` to resolve this.

### Usage Location
- **File:** `.github/workflows/deploy.yml`
- The entire workflow file — from trigger to deployment — embodies this concept.

---

## Concept 2 — Supabase Backend-as-a-Service: Authentication & Row Level Security

### Purpose in the Project
Supabase serves as the sole backend for this project — handling contact form storage (`messages` table) and admin authentication (Login + Back Office). No custom server or Express API was built; Supabase provides the database, authentication, and access control layer entirely through its managed cloud platform.

### Why It Was Challenging
Supabase introduced several backend concepts that required careful understanding:

- **Row Level Security (RLS):** Every Supabase table has RLS enabled by default. Without an explicit policy, *all* database operations are silently blocked — even for authenticated users. The contact form appeared to work (no JavaScript error), but inserts were rejected by the database. Discovering that a missing `INSERT` policy for the `anon` role was the cause required understanding how Supabase's permission model works at the PostgreSQL policy level. A separate `DELETE` policy for the `authenticated` role was also required for the Back Office delete feature.
- **Session persistence:** After logging in via `supabase.auth.signInWithPassword()`, the session token is stored in `localStorage`. The application needed to read this stored session on every page load using `getSession()` to determine authentication state — without making the user log in again on every navigation or refresh.
- **Graceful degradation:** When Supabase environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are not present (e.g., in local development without a `.env` file), the client returns `null`. Every Supabase call in the application required a null-guard to prevent runtime errors and show a user-friendly error instead.
- **Auth state subscription:** The Header component subscribes to real-time auth state changes using `supabase.auth.onAuthStateChange()` to show or hide the Logout button across all pages — without requiring a page reload.

### Usage Location
- **Client:** `src/lib/supabaseClient.js`
- **Contact form INSERT:** `src/pages/Contact.jsx`
- **Login (signInWithPassword + session check):** `src/pages/Login.jsx`
- **Back Office (SELECT, DELETE, signOut, auth guard):** `src/pages/BackOffice.jsx`
- **Header (auth state subscription, persistent logout):** `src/components/Header.jsx`

---

## Concept 3 — Semantic HTML & Print-Optimized CSS for PDF Resume

### Purpose in the Project
The portfolio's downloadable resume (`public/FSD Resume.pdf`) was authored entirely in HTML and CSS, then printed to PDF through the browser. This approach gave full control over typography, layout, color, and print behavior — without depending on a Word processor or PDF editor.

### Why It Was Challenging
Building a document-quality HTML resume revealed a set of design and technical constraints that standard web pages don't face:

- **Print units vs. screen units:** Web CSS typically uses `px` or `rem`. Print documents require `pt` (points) for font sizes to match typographic standards. 1pt = 1/72 of an inch, which maps correctly to physical paper size when printing. Using `px` for font sizes would have produced unpredictable results across different print settings.
- **Typography standards:** Research revealed that font sizes below 10pt are inaccessible to hiring managers. Section headers require 14–16pt, body text 10–12pt, and the name 18–24pt. The initial draft had body text as low as 8.5pt — well below the readable threshold.
- **ATS compatibility:** Resume-scanning software (ATS) reads raw HTML text. Choosing a universally supported font (Arial) over decorative fonts ensured the document would be parsed correctly by automated hiring systems.
- **`@media print` and `@page` rules:** Standard CSS is ignored in print context unless explicitly scoped. The `@page` rule sets the physical page size and margins. The `break-inside: avoid` property prevents a job entry from being split across two pages. These are CSS features that have no equivalent in screen layout.
- **Color contrast for print:** The project's brand palette uses `#FFD700` (bright gold) and `#B8860B` (dark gold). Bright gold fails WCAG contrast requirements on white paper. The darker `#B8860B` was used for text elements while bright gold was reserved for decorative borders only.
- **Browser print headers:** The browser automatically adds the page URL and timestamp as headers/footers when printing. These had to be explicitly suppressed by the user through the browser's print dialog before generating the PDF.

### Usage Location
- **File:** `resume.html` (root of the project — gitignored, used only to generate `public/FSD Resume.pdf`)
- **PDF served at:** `public/FSD Resume.pdf` → `https://damien-mccullor.github.io/FSD%20Resume.pdf`
