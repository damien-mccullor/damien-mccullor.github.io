# 🤖 AI Feature Spec — Login Page

---

## Feature Identity

- **Feature Name:** Login Page
- **Related Area:** Admin Authentication / Secret Route
- **R1 Reference:** Section "Feature - Login page"
- **Spec File:** `./ai/features/login-page.feature.md`

---

## Feature Goal

Build a secret admin login page at `/#/login`. The route is not in the navigation — it is only accessible by typing the URL directly. On valid credentials, Supabase Auth authenticates the admin and redirects to the Back Office. Failed attempts show a red error message. An existing valid session bypasses the form and redirects immediately.

---

## Feature Scope

### In Scope (Included)

- `src/pages/Login.jsx` — replaces the current stub with full content
- `src/pages/Login.css` — page-specific styles
- Email input (type="email") and password input (type="password") with a submit button
- `supabase.auth.signInWithPassword()` on submit
- Redirect to `/#/backoffice` on success
- Error message (red, visually distinct) on failure
- Session check on mount — redirect to Back Office if already logged in
- LOGIC BRIEFING and SECTION comments on `Login.jsx`

### Out of Scope (Excluded)

- User registration — admin account is pre-created in Supabase dashboard
- "Forgot password" flow
- Multi-factor authentication
- Any navigation link to this route — it must remain secret

---

## Sub-Requirements (Feature Breakdown)

- **SR-1 — AI Feature Specification** — This file. Created before implementation begins.
- **SR-2 — Secret route** — `/#/login` is NOT linked in Header, Footer, or mobile bottom nav. Only accessible by typing the URL.
- **SR-3 — Login form fields** — Email input (type="email"), password input (type="password"), and a submit/login button.
- **SR-4 — Supabase authentication** — On submit, calls `supabase.auth.signInWithPassword({ email, password })`. Uses `src/lib/supabaseClient.js`.
- **SR-5 — Login success** — On successful auth, navigate to `/backoffice`. Session persists across page refresh. Existing valid session redirects immediately on mount.
- **SR-6 — Login failure** — If credentials are wrong, display a visually distinct red error message.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/pages/Login.jsx` — full page replacing the stub
- `src/pages/Login.css` — form and error styles
- `src/App.jsx` — `/#/login` route already defined; no changes needed

### Backend / BaaS

- **Supabase Auth** — `supabase.auth.signInWithPassword()` for email/password auth
- **Admin credentials:** `admin@codeboxx.com` / `C0deB0xx4dm!n` (pre-created in Supabase dashboard — never committed)

---

## Data Used or Modified

- No application data is created or modified.
- Supabase Auth session is established in the browser on successful login.
- Admin credentials are stored in Supabase Auth — never in the codebase.

---

## Tech Constraints (Feature-Level)

- **Navigation exclusion:** `Header.jsx`, `Footer.jsx`, and mobile nav must NOT link to `/#/login`. This is already the case — verify at pre-commit.
- **Session check on mount:** `useEffect` calls `supabase.auth.getSession()` — if session exists, redirect to `/backoffice` immediately.
- **Navigation:** Use `useNavigate()` from `react-router-dom` for programmatic redirect.
- **Supabase null-guard:** If client is null, show error message.
- **Colors:** All color values from `brandColors.js`. No hardcoded hex values.
- **LOGIC BRIEFING:** Required on `Login.jsx`.

---

## Acceptance Criteria

- [x] Login page renders at `/#/login`
- [x] `/#/login` is NOT linked in Header, Footer, or mobile bottom nav
- [x] An email input (type="email") is present
- [x] A password input (type="password") is present
- [x] A submit/login button is present
- [x] On submit, `supabase.auth.signInWithPassword()` is called with entered credentials
- [x] The Supabase client from `src/lib/supabaseClient.js` is used
- [x] On successful login, the user is redirected to `/#/backoffice`
- [ ] The session persists after page refresh (live-environment verification required)
- [x] If a valid session already exists on mount, user is redirected to `/#/backoffice` immediately
- [x] On failed login, a red error message is displayed
- [x] All colors come from `brandColors.js` — no hardcoded hex for brand elements in `Login.jsx`
- [x] `Login.jsx` has a LOGIC BRIEFING block and SECTION comments

---

## Runtime User Flow

1. Admin types `https://damien-mccullor.github.io/#/login` directly into the browser.
2. If already logged in (valid session), they are immediately redirected to the Back Office.
3. If not logged in, the Login page renders with an email and password form.
4. Admin enters `admin@codeboxx.com` and `C0deB0xx4dm!n` and clicks Login.
5. On success, the session is established and the admin is redirected to `/#/backoffice`.
6. If credentials are wrong, a red error message appears below the form.

---

## Implementation Log

| Requirement | File | Date | Status |
|---|---|---|---|
| SR-1 AI Feature Specification | `ai/features/login-page.feature.md` | 2026-08-02 | ✅ Complete |
| SR-2 Secret route (not in nav — verified in Header.jsx) | `src/components/Header.jsx` (no change needed) | 2026-08-02 | ✅ Complete |
| SR-3 Login form fields (email, password, submit) | `src/pages/Login.jsx`, `src/pages/Login.css` | 2026-08-02 | ✅ Complete |
| SR-4 Supabase signInWithPassword | `src/pages/Login.jsx` | 2026-08-02 | ✅ Complete |
| SR-5 Login success: redirect + session check on mount | `src/pages/Login.jsx` | 2026-08-02 | ✅ Complete |
| SR-6 Login failure: red error message | `src/pages/Login.jsx`, `src/pages/Login.css` | 2026-08-02 | ✅ Complete |

---

## Standards Applied

- LOGIC BRIEFING block present at top of `Login.jsx`
- SECTION comments on all structural blocks
- Brand colors applied via `brandColors.js` inline styles in JSX
- CSS pseudo-selector (`:focus`) uses `#B8860B` (accentDark) — cannot use inline style for pseudo-states
- Supabase null-guard in place — graceful degradation when env vars missing
- `navigate(..., { replace: true })` used so back button doesn’t return to login after auth
- Session persisted by Supabase localStorage by default
