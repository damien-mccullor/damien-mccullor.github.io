# 🤖 AI Feature Spec — Languages (Internationalization)

---

## Feature Identity

- **Feature Name:** Languages
- **Related Area:** Internationalization (i18n)
- **R1 Reference:** Section "EXTRA MILES — Languages"
- **Spec File:** `./ai/features/languages.feature.md`

---

## Feature Goal

Add support for English and French across all user-facing text in the site. A language switcher in the Header allows visitors to switch languages on any page. All navigation, headings, paragraphs, button labels, and form labels are translated. The selected language persists in `localStorage` and defaults to the browser's language setting.

---

## Feature Scope

### In Scope (Included)

- `src/i18n/en.json` — English translation keys
- `src/i18n/fr.json` — French translation keys
- `LanguageContext` and `useTranslation` hook
- Language switcher in `Header.jsx` — accessible on every page (EN / FR toggle)
- All public-facing text in nav, pages (Home, Portfolio, Links, Contact), and forms replaced with translation keys
- `localStorage` persistence under key `language`
- Browser language detection as default on first visit

### Out of Scope (Excluded)

- Back Office and Login pages (admin-only, not public-facing)
- Right-to-left (RTL) language support
- Machine translation — all text is manually authored

---

## Sub-Requirements

- **SR-1 — Spec file**
- **SR-2 — Translation files** — `src/i18n/en.json` and `src/i18n/fr.json` with all text keys
- **SR-3 — LanguageContext** — `src/context/LanguageContext.jsx` provides `language`, `setLanguage`, and `t(key)` lookup function. Reads `localStorage`, falls back to `navigator.language`, defaults to `en`.
- **SR-4 — Language switcher in Header** — `EN | FR` toggle visible on every page.
- **SR-5 — Apply translations** — All public page components use `t('key')` for user-facing text.

---

## Translation Key Structure

```json
{
  "nav.home": "Home",
  "nav.portfolio": "Portfolio",
  "nav.links": "Links",
  "nav.contact": "Contact",
  "home.tagline": "Full-Stack Developer",
  "home.bio": "...",
  "home.skills_title": "Technical Skills",
  "home.soft_skills_title": "Soft Skills & Talents",
  "contact.title": "Contact",
  "contact.subtitle": "Send a message and I will get back to you.",
  "contact.name_label": "Name",
  "contact.email_label": "Email",
  "contact.message_label": "Message",
  "contact.submit": "Send Message",
  "contact.sending": "Sending…",
  "contact.success": "Message sent! We will be in touch soon.",
  "contact.error": "Something went wrong. Please try again.",
  "...": "..."
}
```

---

## Acceptance Criteria

- [x] A language switcher (`EN | FR`) is visible in the Header on every page
- [x] Clicking `FR` switches all user-facing text to French
- [x] Clicking `EN` switches all user-facing text back to English
- [x] Navigation labels are translated in both Header and mobile nav
- [x] All page headings, paragraphs, and button labels are translated
- [x] Contact form field labels and feedback messages are translated
- [x] Language preference is saved to `localStorage` and persists on reload
- [x] First visit defaults to browser language (`navigator.language`)

---

## Runtime User Flow

1. Visitor opens the site — language defaults to their browser setting (English if not French).
2. Visitor clicks `FR` in the Header — all text switches to French immediately.
3. Visitor navigates to another page — language remains consistent.
4. Visitor refreshes the page — language preference is restored from `localStorage`.

---

## Implementation Log

| Requirement | File | Date | Status |
|---|---|---|---|
| SR-1 Spec file | `ai/features/languages.feature.md` | 2026-08-05 | ✅ Complete |
| SR-2 Translation files (en.json, fr.json) | `src/i18n/en.json`, `src/i18n/fr.json` | 2026-08-05 | ✅ Complete |
| SR-3 LanguageContext + useLanguage hook | `src/context/LanguageContext.jsx` | 2026-08-05 | ✅ Complete |
| SR-4 Language switcher in Header (EN/FR, every page) | `src/components/Header.jsx`, `src/components/Header.css` | 2026-08-05 | ✅ Complete |
| SR-5 Translations applied to all public pages | `src/pages/Home.jsx`, `Portfolio.jsx`, `Links.jsx`, `Contact.jsx` | 2026-08-05 | ✅ Complete |

---

## Standards Applied

- LOGIC BRIEFING updated on `Header.jsx`; new LOGIC BRIEFING on `LanguageContext.jsx`
- `get_errors` run on all 7 modified files — no errors
- `t()` dot-notation resolver handles nested JSON keys gracefully (returns key on missing translation)
- `localStorage` persistence + `navigator.language` browser fallback + `'en'` default
- Extra mile note: this feature modified prior-completed files (`Header.jsx`, all public pages) — accepted per extra mile policy
