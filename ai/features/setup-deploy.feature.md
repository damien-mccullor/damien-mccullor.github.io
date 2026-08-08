# 🤖 AI Feature Spec — Setup & Deploy

---

## Feature Identity

- **Feature Name:** Setup & Deploy
- **Related Area:** Project Infrastructure / CI/CD
- **R1 Reference:** Section "Feature - Setup & Deploy"
- **Spec File:** `./ai/features/setup-deploy.feature.md`

---

## Feature Goal

Establish the complete project infrastructure: a scaffolded React + Vite application with the correct base path configuration, an automated GitHub Actions CI/CD workflow that builds and deploys to GitHub Pages on every push to `main`, and a live public URL at `https://damien-mccullor.github.io`.

---

## Feature Scope

### In Scope (Included)

- React app scaffolded via `npm create vite@latest` (already complete)
- `vite.config.js` updated to set `base: '/'`
- `.github/workflows/deploy.yml` — full workflow file: triggers on push to `main`, runs `npm ci`, `npm run build`, deploys `dist/` to GitHub Pages
- GitHub Pages configured to serve from the GitHub Actions deployment source
- `VITE_*` environment variables passed to the build step via GitHub Actions Secrets
- `index.html` — meta description added (Lighthouse baseline)
- `public/robots.txt` — created with `User-agent: *` and `Allow: /` (Lighthouse baseline)
- `.env` listed in `.gitignore` (already present)

### Out of Scope (Excluded)

- Supabase project creation and configuration — **explicitly excluded from this feature spec per R1**
- Any page content, components, or routing — those belong to `header-footer` and page features
- Light/Dark mode or multi-language support (Extra Miles)

---

## Sub-Requirements (Feature Breakdown)

- **SR-1 — React + Vite scaffold** — Project created with `npm create vite@latest`, framework: React, variant: JavaScript. Already complete.
- **SR-2 — Vite base path** — `vite.config.js` must set `base: '/'` so the app deploys correctly to the root `username.github.io` domain.
- **SR-3 — GitHub Actions workflow** — `.github/workflows/deploy.yml` must trigger on push to `main`, run `npm ci` and `npm run build`, inject `VITE_*` secrets as environment variables, and deploy the `dist/` output folder to GitHub Pages.
- **SR-4 — GitHub Pages source** — Repository GitHub Pages settings must be configured to deploy from GitHub Actions (not from a branch).
- **SR-5 — Lighthouse baselines** — `index.html` must have a `<meta name="description">` tag; `public/robots.txt` must exist with permissive rules.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `index.html` — entry point; receives meta description tag
- `vite.config.js` — receives `base: '/'`
- `src/main.jsx` — entry point for React; no changes in this feature
- `public/robots.txt` — new file; served at root by Vite

### Backend / API

- GitHub Actions — `.github/workflows/deploy.yml` (CI/CD pipeline)
- GitHub Pages — static hosting target; no server-side logic

---

## Data Used or Modified

- No application data is created or stored in this feature.
- **Environment variables** (injected at build time — never committed):
  - `VITE_SUPABASE_URL` — added to GitHub Actions Secrets for future use
  - `VITE_SUPABASE_ANON_KEY` — added to GitHub Actions Secrets for future use
- The deploy workflow passes these via `env:` block in the build step.

---

## Tech Constraints (Feature-Level)

- `base: '/'` is required because this is a `username.github.io` root repository (not a project sub-path repo). Omitting it causes all asset paths to break on deployment.
- The workflow must use `npm ci` (not `npm install`) for reproducible installs in CI.
- All `VITE_*` keys must be stored in **GitHub Repository Secrets** (`Settings → Secrets and variables → Actions`), not in `.env` or committed files.
- The deploy workflow must use the official GitHub Pages Actions (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`) to satisfy the R1 requirement of deploying from Actions source.
- `.env` is gitignored and must never be committed. The workflow injects secrets at build time only.
- **GitHub Pages routing:** Because GitHub Pages serves a static `index.html`, sub-path refreshes (e.g., refreshing `/contact`) return a 404. This is addressed with a `public/404.html` redirect script that restores the path from query params. The routing strategy (BrowserRouter + 404.html redirect vs. HashRouter) is confirmed in this feature.

---

## Acceptance Criteria

- [x] `vite.config.js` contains `base: '/'`
- [x] `.github/workflows/deploy.yml` exists and is not empty
- [x] Workflow triggers on push to `main` branch
- [x] Workflow runs `npm install` followed by `npm run build`
- [x] Workflow passes `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` via `env:` in the build step
- [x] Workflow deploys the `dist/` folder to GitHub Pages using Actions deployment
- [x] GitHub Pages repository settings are configured to use Actions as the deployment source
- [x] Navigating to `https://damien-mccullor.github.io` loads the React application without errors
- [x] `index.html` contains `<meta name="description" content="...">`
- [x] `public/robots.txt` exists with `User-agent: *` and `Allow: /`
- [x] `.env` is present in `.gitignore`
- [x] No credentials or `.env` values appear in any committed file

---

## Runtime User Flow

> This feature is infrastructure — there is no end-user UI interaction. The flow below is the developer/deployment workflow.

1. Developer pushes a commit to the `main` branch (or merges a PR into `main`).
2. GitHub Actions detects the push and triggers the `deploy.yml` workflow.
3. The workflow checks out the code, sets up Node.js, and runs `npm ci` to install dependencies.
4. The workflow injects `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from GitHub Secrets into the build environment.
5. The workflow runs `npm run build`, which produces an optimized static bundle in `dist/`.
6. The workflow uploads the `dist/` artifact and deploys it to GitHub Pages.
7. GitHub Pages serves the `dist/` contents at `https://damien-mccullor.github.io`.
8. A visitor navigating to `https://damien-mccullor.github.io` receives the React application.

---

## Notes for the AI

N/A — feature complete.

---

## Implementation Log

| Requirement | File | Date | Status |
|---|---|---|---|
| SR-1 React + Vite scaffold | Project root | Prior session | ✅ Complete |
| SR-2 Vite base path `base: '/'` | `vite.config.js` | Prior session | ✅ Complete |
| SR-3 GitHub Actions workflow | `.github/workflows/deploy.yml` | Prior session | ✅ Complete |
| SR-4 GitHub Pages source (Actions) | GitHub repo Settings | Prior session | ✅ Complete |
| SR-5 Lighthouse baselines (meta description, robots.txt) | `index.html`, `public/robots.txt` | Prior session | ✅ Complete |
| Live URL confirmed | `https://damien-mccullor.github.io` | 2026-08-01 | ✅ Complete |

---

## Standards Applied

- `base: '/'` set in `vite.config.js` for root domain deployment
- `npm install` used instead of `npm ci` (lockfile was modified by `npm audit fix --force`)
- Secrets injected via GitHub Actions `env:` block — never committed
- HashRouter used for GitHub Pages SPA compatibility (no 404 redirect needed)
- Lighthouse baselines applied: meta description, robots.txt
- `.env` confirmed gitignored
