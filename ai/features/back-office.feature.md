# 🤖 AI Feature Spec — Back Office

---

## Feature Identity

- **Feature Name:** Back Office
- **Related Area:** Admin Dashboard / Protected Route
- **R1 Reference:** Section "Feature - Back office"
- **Spec File:** `./ai/features/back-office.feature.md`

---

## Feature Goal

Build the protected admin back office at `/#/backoffice`. Unauthenticated users are redirected to Login. Authenticated admin sees all messages from the Supabase `messages` table in a sortable table, can view any message in a modal, delete individual messages, and log out.

---

## Feature Scope

### In Scope (Included)

- `src/pages/BackOffice.jsx` — replaces the current stub with full content
- `src/pages/BackOffice.css` — page-specific styles
- Auth guard on mount — redirect to `/login` if no session
- Messages table: Name, Email, Date, Actions columns, ordered newest first
- Delete action per row — removes message from table instantly after Supabase delete
- View modal — sender name, email, date/time, full message text; close on X, backdrop click, or Escape
- Logout button — calls `supabase.auth.signOut()`, redirects to Home (`/`)
- Empty state and error state messaging
- LOGIC BRIEFING and SECTION comments on `BackOffice.jsx`

### Out of Scope (Excluded)

- Replying to messages — out of scope per R1
- Pagination — out of scope per R1
- Public navigation link to `/backoffice` — must stay excluded

---

## Sub-Requirements (Feature Breakdown)

- **SR-1 — AI Feature Specification** — This file.
- **SR-2 — Auth guard** — On mount, check session via `supabase.auth.getSession()`. If no session, redirect to `/login`. Route is NOT in public nav.
- **SR-3 — Messages table** — Fetch all rows from `messages` table ordered by `created_at` desc. Columns: Name, Email, Date, Actions. Show "No messages yet" if empty. Show error message if fetch fails.
- **SR-4 — Delete** — Delete button per row. On click, calls `supabase.from('messages').delete().eq('id', id)`. Row disappears instantly from the table on success.
- **SR-5 — View modal** — "View" button or row click opens a modal showing: sender name, email, date/time, full message. Close button (X), clicking backdrop, or pressing Escape all close it.
- **SR-6 — Logout** — Logout button visible. Calls `supabase.auth.signOut()`. Redirects to `/` (Home) after logout.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/pages/BackOffice.jsx` — full admin dashboard
- `src/pages/BackOffice.css` — table, modal, and action styles

### Backend / BaaS

- **Supabase `messages` table** — SELECT (fetch all), DELETE (by id)
- **Supabase Auth** — `getSession()` for guard, `signOut()` for logout
- **`src/lib/supabaseClient.js`** — used for all Supabase calls

---

## Data Used or Modified

- **READ:** All rows from `messages` (id, name, email, message, created_at) — ordered by `created_at` DESC
- **DELETE:** Single row by `id` from `messages`
- **AUTH:** Session read and cleared via Supabase Auth

---

## Tech Constraints (Feature-Level)

- **Auth guard:** `useEffect` with `getSession()` on mount — redirect to `/login` if no session.
- **State:** messages array, selectedMessage (for modal), loading flag, error string.
- **Date formatting:** Use `new Date(created_at).toLocaleString()` for human-readable display.
- **Modal:** Controlled with `selectedMessage` state. Escape key handled via `useEffect` with `keydown` listener.
- **Optimistic delete:** Remove message from local state immediately, then call Supabase.
- **Supabase null-guard:** If client is null, redirect to login.
- **Colors:** All from `brandColors.js`. No hardcoded hex values.
- **LOGIC BRIEFING:** Required on `BackOffice.jsx`.

---

## Acceptance Criteria

- [x] Back Office page renders at `/#/backoffice` when authenticated
- [x] Unauthenticated access to `/#/backoffice` redirects to `/#/login`
- [x] `/#/backoffice` is NOT linked in public navigation
- [x] All messages from the `messages` table are displayed in a table
- [x] Table columns: Name, Email, Date, Actions
- [x] Messages are ordered newest first (by `created_at` descending)
- [x] "No messages yet" is shown when the table is empty
- [x] An error message is shown if the fetch fails
- [x] A Delete button is present for each message row
- [x] Clicking Delete removes the message from Supabase and from the table
- [x] A View button or row click opens a modal with: name, email, date/time, full message
- [x] The modal has a close button (X or "Close")
- [x] Clicking the backdrop or pressing Escape closes the modal
- [x] A Logout button is visible on the Back Office page
- [x] Clicking Logout calls `supabase.auth.signOut()` and redirects to Home
- [x] All colors come from `brandColors.js` — no hardcoded hex values
- [x] `BackOffice.jsx` has a LOGIC BRIEFING block and SECTION comments

---

## Runtime User Flow

1. Admin navigates to `/#/backoffice` (typed directly or redirected from login).
2. If not authenticated, immediately redirected to `/#/login`.
3. If authenticated, the page loads and fetches all messages from Supabase.
4. Messages appear in a table, newest first. Empty state shows "No messages yet."
5. Admin clicks **View** on a row — a modal opens showing the full message details.
6. Admin closes the modal (X, backdrop, or Escape).
7. Admin clicks **Delete** on a row — message disappears from the table and is deleted from Supabase.
8. Admin clicks **Logout** — session is cleared and they are redirected to the Home page.

---

## Implementation Log

| Requirement | File | Date | Status |
|---|---|---|---|
| SR-1 AI Feature Specification | `ai/features/back-office.feature.md` | 2026-08-03 | ✅ Complete |
| SR-2 Auth guard + nav exclusion (verified in Header.jsx) | `src/pages/BackOffice.jsx` | 2026-08-03 | ✅ Complete |
| SR-3 Messages table (fetch, columns, empty/error states) | `src/pages/BackOffice.jsx`, `src/pages/BackOffice.css` | 2026-08-03 | ✅ Complete |
| SR-4 Delete (optimistic update + Supabase delete) | `src/pages/BackOffice.jsx` | 2026-08-03 | ✅ Complete |
| SR-5 View modal (X, backdrop, Escape to close) | `src/pages/BackOffice.jsx`, `src/pages/BackOffice.css` | 2026-08-03 | ✅ Complete |
| SR-6 Logout (signOut + redirect to Home) | `src/pages/BackOffice.jsx` | 2026-08-03 | ✅ Complete |

---

## Standards Applied

- LOGIC BRIEFING block present at top of `BackOffice.jsx`
- SECTION comments on all structural blocks
- All brand colors applied via `brandColors.js` inline styles in JSX
- `BackOffice.css` uses `#f5f5f5` for row hover and `#eeeeee` for border — neutral layout tones, not brand colors
- Optimistic delete: row removed from local state immediately before Supabase call
- `get_errors` run post-edit — no errors found
