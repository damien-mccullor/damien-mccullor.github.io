# 🤖 AI Specification — Personal Portfolio (Module 16)

> **Agent rule:** Read this file in full at the start of every session. Output a one-line confirmation before writing any code:
> `"ai/ai-spec.md reviewed — [last updated feature from the progress table]."`

---

## Project Identity

- **Project Name:** damien-mccullor.github.io
- **Short Description:** Personal portfolio website for Damien McCullor — a public-facing static site showcasing skills, work experience, projects, and a contact form, with a protected admin back office for managing contact submissions.
- **Project Type:** Static SPA (React + Vite), deployed to GitHub Pages via GitHub Actions, Supabase as BaaS
- **Live URL:** `https://damien-mccullor.github.io`
- **Module:** 16 — Final Module (Professional Development)

---

## Goal and Scope

### Goal

Build and deploy a personal portfolio website using React (Vite), integrated with Supabase for contact form storage and admin authentication, deployed automatically to GitHub Pages via a GitHub Actions workflow. The site must be publicly accessible, mobile-responsive, and demonstrate frontend design, Supabase integration, and CI/CD deployment.

### In Scope (Build Now)

- React + Vite scaffold deployed to GitHub Pages via GitHub Actions
- Responsive layout with Header, Footer, Navbar, Logo
- Home page: intro, technical skills, soft skills, AI-generated images
- Portfolio page: education, work experience, projects, downloadable PDF resume
- Links page: minimum 3 cards with image, title, description, external URL
- Contact page: form submitting to Supabase `messages` table with validation and feedback
- Login page: secret route, Supabase `signInWithPassword`, redirect to Back Office
- Back Office: protected route, messages table display, view modal, delete, logout
- `CONCEPTS.md` file at project root (content is user-owned)
- LeetCode screenshots at `./LeetCode-Challenges/<challenge-name>.png` (user-owned)
- Elevator pitch scripts at `./docs/script-1.md` and `./docs/script-2.md`
- Elevator pitch feedback at `./docs/pitch-feedback.md`

### Out of Scope (Do NOT Build)

- Custom backend server — Supabase is the only backend infrastructure
- Server-side rendering
- User registration or public auth flows
- Any database tables other than `messages`
- Light/Dark mode toggle (Extra Mile — only if all main requirements complete)
- Multi-language support (Extra Mile — only if all main requirements complete)
- Recorded videos of any kind — all video deliverables are user-owned
- Submission Summary document — user-owned, never committed to GitHub

---

## Users and Use Cases

- **Visitor (public):** browses Home, Portfolio, Links, and Contact pages; submits contact form
- **Admin (Damien):** accesses Login page by typing URL directly; manages contact messages in Back Office

---

## Feature Index

| # | Feature | Spec File | Status |
|---|---|---|---|
| 1 | Setup & Deploy | `ai/features/setup-deploy.feature.md` | In Progress |
| 2 | Project Layout (Header / Footer) | `ai/features/header-footer.feature.md` | Complete |
| 3 | Home Page | `ai/features/home-page.feature.md` | Pending |
| 4 | Portfolio Page | `ai/features/portfolio-page.feature.md` | Pending |
| 5 | Link Page | `ai/features/link-page.feature.md` | Pending |
| 6 | Contact Page | `ai/features/contact-page.feature.md` | Pending |
| 7 | Login Page | `ai/features/login-page.feature.md` | Pending |
| 8 | Back Office | `ai/features/back-office.feature.md` | Pending |

---

## Implementation Progress

| Feature | Spec Written | Code Complete | Verified vs R1 | Status |
|---|---|---|---|---|
| Setup & Deploy | [x] | [ ] | [ ] | In Progress |
| Project Layout | [x] | [x] | [ ] | In Progress |
| Home Page | [ ] | [ ] | [ ] | Pending |
| Portfolio Page | [ ] | [ ] | [ ] | Pending |
| Link Page | [ ] | [ ] | [ ] | Pending |
| Contact Page | [ ] | [ ] | [ ] | Pending |
| Login Page | [ ] | [ ] | [ ] | Pending |
| Back Office | [ ] | [ ] | [ ] | Pending |

---

## Pages / Routes (Project Map)

All routes are client-side. The app is a SPA deployed at `https://damien-mccullor.github.io`.

| Route | Component | In Nav | Protected |
|---|---|---|---|
| `/` | `Home` | Yes | No |
| `/portfolio` | `Portfolio` | Yes | No |
| `/links` | `Links` | Yes | No |
| `/contact` | `Contact` | Yes | No |
| `/login` | `Login` | **No** — URL only | No |
| `/backoffice` | `BackOffice` | **No** | Yes — redirects to `/login` if unauthenticated |

> **GitHub Pages routing note:** Because GitHub Pages serves a static index.html, sub-path refreshes return a 404 unless handled. This is resolved with a `public/404.html` redirect trick or by using hash-based routing. Implementation decision is deferred to the `setup-deploy` feature spec.

---

## Data and Models

### Supabase — `messages` Table

| Column | Type | Notes |
|---|---|---|
| `id` | `int8` (serial) | Primary key, auto-generated |
| `name` | `text` | Sender's name — required |
| `email` | `text` | Sender's email — required |
| `message` | `text` | Message body — required |
| `created_at` | `timestamptz` | Auto-set by Supabase, ordered descending in Back Office |

### Supabase Auth

- Provider: email/password (`signInWithPassword`)
- Admin user pre-created in Supabase dashboard — **not** created via the app
- Credentials: `admin@codeboxx.com` / `C0deB0xx4dm!n`
- Session persists after page refresh

### Environment Variables (`.env` — gitignored, never commit)

```
VITE_SUPABASE_URL=<your_supabase_project_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

Both keys are injected at build time via GitHub Actions Secrets (`Settings → Secrets and variables → Actions`).

---

## Tech Stack and Tools

### Frontend

- React 19 (Vite scaffold)
- React DOM 19
- React Router (to be installed — version TBD in `setup-deploy`)
- CSS Modules or plain CSS (no Tailwind — keep it simple)

### Backend / BaaS

- Supabase — contact form storage + email/password auth
- No custom Express or Node.js server

### Deployment

- GitHub Actions — automated build and deploy on push to `main`
- GitHub Pages — static hosting at `https://damien-mccullor.github.io`
- Vite `base: '/'` (root domain repo)

### Tools / Libraries

- Vite 8 — build tool and dev server
- ESLint 10 — linting
- `react-router-dom` (installed)
- `@supabase/supabase-js` (installed)

---

## Repository Structure

> This reflects the **planned final state**. The agent must update this map whenever a new file or folder is created.

```
damien-mccullor.github.io/
├── .github/
│   ├── copilot-instructions.md       — agent process rules (never alter)
│   ├── lessons-learned.md            — instructor feedback (gitignored)
│   ├── users-lessons-learned.md      — agent workflow notes (gitignored)
│   └── workflows/
│       └── deploy.yml                — GitHub Actions CI/CD
├── ai/
│   ├── ai-spec.md                    — this file (global AI specification)
│   └── features/
│       ├── setup-deploy.feature.md   ✓ written
│       ├── header-footer.feature.md  ✓ written
│       ├── home-page.feature.md
│       ├── portfolio-page.feature.md
│       ├── link-page.feature.md
│       ├── contact-page.feature.md
│       ├── login-page.feature.md
│       └── back-office.feature.md
├── docs/
│   ├── AI-SPEC.md                    — blueprint template (never alter)
│   ├── feature.md                    — blueprint template (never alter)
│   ├── script-1.md                   — elevator pitch script 1
│   ├── script-2.md                   — elevator pitch script 2
│   └── pitch-feedback.md             — feedback on elevator pitch
├── LeetCode-Challenges/
│   ├── word-search-ii.png
│   ├── design-twitter.png
│   ├── task-scheduler.png
│   ├── course-schedule.png
│   └── serialize-and-deserialize-binary-tree.png
├── public/
│   ├── robots.txt                    — SEO; User-agent: * Allow: /
│   └── resume.pdf                    — downloadable CV (Portfolio page)
├── src/
│   ├── assets/
│   │   ├── black-background/
│   │   │   ├── BWG.png              — header logo (AI-generated: Gemini, ChatGPT, Copilot)
│   │   │   ├── BGFF.png             — footer logo (AI-generated)
│   │   │   └── [other variants]
│   │   └── white_background/
│   │       └── [white bg variants]
│   ├── components/
│   │   ├── Header.jsx             ✓ created
│   │   ├── Header.css
│   │   ├── Footer.jsx             ✓ created
│   │   ├── Footer.css
│   │   ├── Layout.jsx             ✓ created
│   │   └── Layout.css
│   ├── constants/
│   │   └── brandColors.js            — brand palette — single source of truth for colors
│   ├── lib/
│   │   └── supabaseClient.js         — Supabase client instance  ✓ created
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Links.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── BackOffice.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env                              — gitignored; never commit
├── .gitignore
├── CONCEPTS.md                       — 3 challenging concepts (user-owned content)
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## Coding Standards

> These standards apply to every new or modified component and page file.

### LOGIC BRIEFING + SECTION Comment Format

**Type 1 — LOGIC BRIEFING block:** Placed at the top of the file, before all imports. Required on every component and page file.

```js
/*
 * LOGIC BRIEFING:
 * [Component/Page name] — [what it does]
 * [Supabase calls made, if any]
 * [State managed, if any]
 * [Navigation or side effects, if any]
 */
```

**Type 2 — SECTION comments:** Inline labels directly above each structural block. Use `/* SECTION: ... */` outside JSX and `{/* SECTION: ... */}` inside JSX.

```js
/* SECTION: STATE — form fields and submission status */
/* SECTION: SUBMIT HANDLER — validates and calls Supabase INSERT */
{/* SECTION: FORM FIELDS — name, email, message inputs */}
{/* SECTION: FEEDBACK MESSAGE — success or error */}
```

### Brand Colors

All colors must come from `src/constants/brandColors.js`. Never hardcode hex values elsewhere. Always verify text colors meet WCAG AA (4.5:1 contrast ratio) against their background before committing.

### No Unused Code

No unused imports, unused functions, or unused variables in any committed file.

---

## How to Run the Project

```bash
# Install dependencies
npm install

# Start dev server (user-initiated only — agent never runs this)
npm run dev

# Production build
npm run build

# Preview production build (for Lighthouse audits)
npm run preview

# Lint
npm run lint
```

**Environment setup:** Create `.env` from scratch at the project root (never copy from repo — it is gitignored):

```
VITE_SUPABASE_URL=<your_supabase_project_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

---

## Definition of Done

> All boxes must remain unchecked `[ ]` until the project is fully complete and verified against R1.

- [ ] React Vite app is live at `https://damien-mccullor.github.io`
- [ ] All 8 feature spec files exist in `ai/features/` and match R1 file names exactly
- [ ] All R1 requirements for all 8 features are implemented and verified line-by-line
- [ ] All pages render without errors on the live GitHub Pages URL
- [ ] Contact form successfully inserts a row into the Supabase `messages` table
- [ ] Login with `admin@codeboxx.com` / `C0deB0xx4dm!n` redirects to Back Office
- [ ] Navigating to `/backoffice` while unauthenticated redirects to the Login page
- [ ] Session persists — refreshing the Back Office page does not log the admin out
- [ ] Mobile navigation renders icons at the bottom on viewports ≤ 768px
- [ ] All AI-generated images have appropriate `alt` text
- [ ] Downloadable PDF resume is accessible from the Portfolio page
- [ ] `README.md` contains all 6 required sections and is verified against the actual codebase
- [ ] `.env` is confirmed absent from the repository (in `.gitignore`)
- [ ] `CONCEPTS.md` exists at `./CONCEPTS.md`
- [ ] LeetCode screenshots exist in `./LeetCode-Challenges/` — 5 files, no duplicates
- [ ] `docs/script-1.md`, `docs/script-2.md`, `docs/pitch-feedback.md` exist
- [ ] No credentials, tokens, or `.env` values committed to any tracked file
- [ ] Git history shows `feature/* → dev → main` workflow
