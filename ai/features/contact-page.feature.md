# 🤖 AI Feature Spec — Contact Page

---

## Feature Identity

- **Feature Name:** Contact Page
- **Related Area:** Public-Facing Page / Contact Form + Supabase Integration
- **R1 Reference:** Section "Feature - Contact page"
- **Spec File:** `./ai/features/contact-page.feature.md`

---

## Feature Goal

Build the public contact page at `/#/contact`. The page presents a form with name, email, and message fields. On valid submission, the form data is inserted into the Supabase `messages` table. The user receives clear success or failure feedback, and the form clears on success.

---

## Feature Scope

### In Scope (Included)

- `src/pages/Contact.jsx` — replaces the current stub with full content
- `src/pages/Contact.css` — page-specific styles
- Contact form: name text input, email input, message textarea — all with visible labels
- Client-side validation: required fields, email format check, error display
- Supabase INSERT to `messages` table on valid submission
- Success feedback: visually distinct, form clears, auto-dismisses
- Failure feedback: visually distinct error message
- LOGIC BRIEFING and SECTION comments on `Contact.jsx`

### Out of Scope (Excluded)

- Server-side validation — Supabase RLS handles data security
- CAPTCHA or spam protection
- Email notification on submission — out of scope per R1
- Back Office — belongs to `back-office` feature

---

## Sub-Requirements (Feature Breakdown)

- **SR-1 — AI Feature Specification** — This file. Created before implementation begins.
- **SR-2 — Form fields** — Three inputs present: name (text), email (type="email"), message (textarea). All have visible labels or placeholders.
- **SR-3 — Client-side validation** — All three fields required. Email validated for proper format. Errors displayed to the user. Submit rejected when validation fails.
- **SR-4 — Supabase submission** — On valid submit, `supabase.from('messages').insert(...)` called with `{ name, email, message }`. Uses `supabaseClient.js`.
- **SR-5 — Success/failure feedback** — Success: green/check, form clears, disappears after a few seconds. Failure: red/X, stays visible until next action.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/pages/Contact.jsx` — full page replacing the stub
- `src/pages/Contact.css` — form and feedback styles

### Backend / BaaS

- **Supabase `messages` table** — target for INSERT operations
- **`src/lib/supabaseClient.js`** — Supabase client instance used for the insert

---

## Data Used or Modified

### Supabase `messages` Table Schema

| Column | Type | Notes |
|---|---|---|
| `id` | `int8` (serial) | Auto-generated primary key |
| `name` | `text` | Sender's name — required |
| `email` | `text` | Sender's email — required |
| `message` | `text` | Message body — required |
| `created_at` | `timestamptz` | Auto-set by Supabase |

### Payload Sent on Submission

```js
{ name: formName, email: formEmail, message: formMessage }
```

---

## Tech Constraints (Feature-Level)

- **Supabase client:** Import from `src/lib/supabaseClient.js`. If client is null (env vars missing), show failure feedback gracefully.
- **State:** `useState` for form fields (name, email, message), validation errors, and feedback status.
- **Auto-dismiss:** Success message clears after ~4 seconds using `setTimeout`.
- **Colors:** All color values from `src/constants/brandColors.js`. No hardcoded hex values.
- **LOGIC BRIEFING:** Required on `Contact.jsx`.

---

## Acceptance Criteria

- [x] Contact page renders at `/#/contact`
- [x] A text input for **name** is present with a visible label or placeholder
- [x] An email input (type="email") for **email** is present with a visible label or placeholder
- [x] A textarea for **message** is present with a visible label or placeholder
- [x] Submitting with any empty field shows a validation error and does not submit
- [x] Submitting with an invalid email format shows a validation error and does not submit
- [x] On valid submission, `supabase.from('messages').insert(...)` is called with `name`, `email`, `message`
- [x] The Supabase client from `src/lib/supabaseClient.js` is used
- [x] A visually distinct success message appears after successful submission (green/check)
- [x] The form fields are cleared after successful submission
- [x] The success message disappears after a few seconds
- [x] A visually distinct failure message appears if the insert fails (red/X)
- [x] All colors come from `brandColors.js` — no hardcoded hex values
- [x] `Contact.jsx` has a LOGIC BRIEFING block and SECTION comments

---

## Runtime User Flow

1. Visitor clicks "Contact" in the navigation.
2. The Contact page renders with a form (name, email, message fields).
3. Visitor fills in all fields and clicks Submit.
4. If any field is empty or email is invalid, an error message appears inline and the form does not submit.
5. If all fields are valid, the form data is sent to Supabase.
6. On success: a green success message appears, the form clears, and the message fades after ~4 seconds.
7. On failure: a red error message appears and remains until the user interacts again.

---

## Implementation Log

| Requirement | File | Date | Status |
|---|---|---|---|
| SR-1 AI Feature Specification | `ai/features/contact-page.feature.md` | 2026-08-02 | ✅ Complete |
| SR-2 Form fields (name, email, message with labels) | `src/pages/Contact.jsx`, `src/pages/Contact.css` | 2026-08-02 | ✅ Complete |
| SR-3 Client-side validation (required + email format) | `src/pages/Contact.jsx` | 2026-08-02 | ✅ Complete |
| SR-4 Supabase insert to `messages` table | `src/pages/Contact.jsx` | 2026-08-02 | ✅ Complete |
| SR-5 Success/failure feedback (auto-dismiss success) | `src/pages/Contact.jsx`, `src/pages/Contact.css` | 2026-08-02 | ✅ Complete |

---

## Standards Applied

- LOGIC BRIEFING block present at top of `Contact.jsx`
- SECTION comments on all structural blocks
- All brand colors applied via `brandColors.js` inline styles
- Supabase null-guard in place — graceful degradation when env vars missing
- `created_at` auto-set by Supabase — not in insert payload
- Success message auto-dismisses after 4 seconds via `setTimeout`
- Semantic feedback colors used for success/error (accessibility-standard green/red)
