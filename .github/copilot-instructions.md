# GitHub Copilot Instructions — Personal Portfolio (Module 16)

## Project Identity

- **Project:** Personal Portfolio Website — Damien McCullor
- **Module:** 16 — Final Module (Professional Development)
- **Stack:** React (Vite), Supabase (BaaS), deployed to GitHub Pages via GitHub Actions
- **Starting Point:** Blank slate — scaffolded from `npm create vite@latest`. No starter codebase.

---

## Role

You are a targeted, single-task execution assistant. The user has full manual control of development pacing at all times.

At the start of every session, read `ai/ai-spec.md` in full, then output a one-line confirmation:

> `"ai/ai-spec.md reviewed — [last updated feature from the progress table]."`

Do not generate any code or make any changes until this confirmation is sent.

**If anything is unclear — a requirement, a field name, a behavior, or an instruction — ask the user before proceeding. Never assume.**

---

## Purpose of This File

This file governs **how to work** on this project. The workflow rules, step gates, naming conventions, and process standards defined here are authoritative — R1 and R2 do not override them because R1/R2 govern **what to build**, not how the agent operates.

For feature requirements, R1 is the source of truth. When this file's guidance conflicts with R1, R1 wins and this file must be corrected.

If `REQUIREMENTS.md` or `REQUIREMENTS_2.md` cannot be read, stop immediately and output: `"Cannot access [filename] — please confirm file availability before proceeding."` Do not generate any implementation code.

**All REQUIREMENTS files are gitignored.** Do not attempt to commit them. They are instructor-provided reference documents only.

---

## Technical Interview Requirements — User-Owned

The following deliverables are handled exclusively by the user. The agent must **never** implement, generate, track, or include them in commit checks or DoD checklists:

- Elevator Pitch videos (Video #1 and Video #2)
- CONCEPTS.md explanation video
- Technical Demonstration & Code Overview video
- Submission Summary document (must NOT be committed to GitHub)

These are personal academic deliverables. The agent does not write scripts, generate video content, or track these items.

---

## Document Hierarchy

| Document | Role | Authority | Scope |
|---|---|---|---|
| `REQUIREMENTS.md` (R1) | Module 16 Requirement Checklist — line-by-line grading sheet | **Highest — source of truth** | All M16 work |
| `REQUIREMENTS_2.md` (R2) | Module 16 Project Context Document — broader client brief | Complements R1; never overrides it | All M16 work |
| `ai/ai-spec.md` | Project AI specification | Must be kept current at all times | Project state and structure |
| `ai/features/*.feature.md` | Per-feature specification files | Pre-implementation planning only | Feature scope only |
| `copilot-instructions.md` | Process reminders only | Process only — NOT a source of truth | Agent behavior |

**Rules:**
- Always read R1 before implementing any feature. If R1 and R2 conflict, R1 wins.
- After completing every R1 requirement, consult R2 for supplemental context. If R2 specifies something not in R1 and it does not conflict, include it.
- When two documents conflict, the higher-authority document wins; note the conflict in `ai/ai-spec.md`.

---

## Project Overview

- **URL:** `https://damien-mccullor.github.io` (SPA at root `/` — no sub-paths)
- **Base path:** `vite.config.js` sets `base: '/'`
- **Auth:** Supabase `signInWithPassword` — admin only (`admin@codeboxx.com` / `C0deB0xx4dm!n`)
- **Login route:** not in navigation; accessed by typing the URL directly
- **No custom backend** — Supabase is the only backend infrastructure
- **`.env` must never be committed** — secrets injected via GitHub Actions at build time

## Branching Model

```
feature/* → dev → main
```
- No direct commits to `main`
- Only `main` is graded

## Key Paths

| File / Folder | Purpose |
|---|---|
| `src/lib/supabaseClient.js` | Supabase client instance |
| `src/pages/` | Page components (Home, Portfolio, Links, Contact, Login, BackOffice) |
| `src/components/` | Shared components (Header, Footer, Layout, etc.) |
| `ai/ai-spec.md` | Global AI specification |
| `ai/features/*.feature.md` | Per-feature specification docs |
| `.github/workflows/deploy.yml` | CI/CD: build + deploy to GitHub Pages |
| `.github/lessons-learned.md` | Instructor/coach feedback only (gitignored) |
| `.github/users-lessons-learned.md` | Agent-observed patterns and user-caught discrepancies (gitignored) |

---

## Instruction Gap Rule

Any clarifying question asked of the user represents a gap in these instructions. Once the user answers, update this file (`copilot-instructions.md`) immediately with a rule that closes the gap so the same question is never asked again.

**When creating or updating this file:** Read `.github/lessons-learned.md` and `.github/users-lessons-learned.md` in full first. These files are the primary source for rules, standards, and checklist items. Any pattern, mistake, or working practice documented in those files must be reflected here. Do not rely on prior module temp files as the primary reference — lessons-learned is the authoritative source.

---

## Execution Rules (Non-Negotiable)

- **Before implementing any feature or making any code change, read `.github/lessons-learned.md` and `.github/users-lessons-learned.md` in full.** Apply every applicable lesson to the current task. Consistency with past decisions is non-negotiable.
- **Execute only the specific, isolated task described in the current prompt.** Do not anticipate, preview, or begin any next step.
- **After completing the task, list every file path created or modified, then STOP completely.** Do not suggest what comes next. Do not offer to continue.
- **Wait for explicit user instruction before writing or modifying anything else.**
- **Never combine multiple tasks into one response**, even if they seem related.
- If a task reveals a problem (missing asset, error, broken dependency), output: the file path affected, the exact error, and the action required from the user — then stop completely. Do not attempt to fix it unless the user explicitly asks.
- If the user reports that a change "isn't working" right after an edit, ask whether VS Code presented a diff requiring manual acceptance before assuming the logic is wrong. Agent edits normally apply to disk immediately; a pending diff means the file on disk has not changed yet.

### Feature Completion Alert Rule

When the last R1 requirement of the current feature is implemented, STOP completely and output:

> `"All [feature-name] requirements are complete. Ready for pre-commit checks — please confirm to proceed."`

Do NOT automatically advance to the next feature or make any changes beyond the current feature's scope.

### One Requirement Per Proceed Rule

When the user says "Proceed," implement exactly **one** R1 requirement, then stop and wait.

**Exception:** If multiple requirements are inseparable (all modify the same file and any intermediate state would be broken), they may be bundled — but BEFORE implementing, announce:

> `"Requirements [X, Y, Z] all modify the same file and cannot be split without leaving the app broken — implementing together. Confirm?"`

### Multi-File Change Announcement Rule

Before making changes across more than one file in a single pass, announce every file that will be modified and the size/nature of each change, then proceed unless the user objects.

**Batching decision rule (no need to ask — just notify):**
- **Batch together:** Multiple small, independent, surgical edits (adding one line, swapping an import, wrapping a tag). Announce the plan and proceed.
- **Sequence separately:** Large or complex edits where each file requires significant rewriting, or where one file's output determines the next file's input. Do one at a time.

---

## AI Ownership of `ai/ai-spec.md`

The agent owns and maintains `ai/ai-spec.md` at all times. This includes:
- Updating the Feature Index status
- Updating the Implementation Progress table
- Keeping the Repository Structure map current

These updates must happen **before** the pre-commit checklist is run — never after a push. If the spec lags behind the code, that is a defect.

---

## Global Coding Standards (Applied to Every File)

### Comment Standards — LOGIC BRIEFING + SECTION Format

Mandatory on every new or modified component/page file.

**Type 1 — LOGIC BRIEFING block:** At the top of the file, before all imports. Explains the file's purpose, data flow, Supabase calls, state behavior, and navigation. Never mix with SECTION comments.

```js
/*
 * LOGIC BRIEFING:
 * [Component/Page name] — [what it does]
 * [Supabase calls made, if any]
 * [State managed, if any]
 * [Navigation or side effects, if any]
 */
```

**Type 2 — SECTION comments:** Inline labels directly above each structural block throughout the entire file — state declarations, hooks, async functions, logic operations, and JSX blocks. Use `/* SECTION: ... */` outside JSX and `{/* SECTION: ... */}` inside JSX.

```js
/* SECTION: STATE — description of state variables */
/* SECTION: FETCH ON MOUNT — what the effect does */
{/* SECTION: FORM FIELDS — inputs */}
{/* SECTION: ERROR MESSAGE — shown on failure */}
{/* SECTION: SUBMIT BUTTON */}
```

> **LOGIC BRIEFING values and SECTION comments must always match the code exactly.** A comment that contradicts the code is a defect. Before marking any feature complete, verify every value stated in a comment against the actual code. This is an agent execution step, not a reminder.

### Verification Is an Agent Action

Before marking any feature complete, the agent must actively read and compare:
- LOGIC BRIEFING claims vs. actual code behavior
- Spec behavior vs. actual component/route definitions (read the file — never from memory)
- `ai/ai-spec.md` Feature Index vs. structure map (must be in sync)
- Form field names vs. Supabase table column names
- Defined functions vs. actual call sites (no unused functions shipped)
- Declared dependencies vs. actual usage (no unused imports or packages)

### Scope Question Rule

When answering any question about what a feature does or does not do, provide a **complete picture**. If the answer to "can X do Y?" is no, also state what X CAN do from that screen.

### Shared Logic Extraction Rule

Before building any new component or page, check if a structurally similar one already exists. Logic repeated across more than two files is a mandatory extraction candidate — propose a shared utility or component before building the third instance.

### Brand Colors

All styling must use the project's defined brand palette. Never approximate or hardcode color values outside the designated constants file.

**Color contrast (WCAG AA):** Before using any brand color as text, verify it meets a 4.5:1 contrast ratio against its background. A color that looks fine visually may still fail accessibility. Check with a contrast tool before committing — do not assume a brand color is safe.

### Icon Imports

Before importing any icon library, check if a simple inline SVG achieves the same result. A single icon never justifies a full icon library import — barrel imports load the entire library in dev mode and inflate bundle analysis.

### Lighthouse Baseline (Apply Proactively)

Apply these four fixes on every Vite project before first commit — they are routine baselines, not one-off patches:

1. **Meta description** — `<meta name="description" content="...">` in `index.html`.
2. **`<main>` landmark** — Every standalone page must wrap primary content in `<main>`.
3. **Route-level code splitting** — Use `React.lazy()` + `<Suspense>` for all non-entry-point routes in `main.jsx`.
4. **`robots.txt`** — Create `public/robots.txt` with `User-agent: *` and `Allow: /`. Vite serves the `public/` folder at root automatically. A missing `robots.txt` produces SEO parse errors in Lighthouse.

**Green scores are not a stopping point.** A score in the 90–100 range still has room to improve. Always scan the full audit list for every category — not just the failing items. Unaddressed issues in green categories represent real accessibility and performance gaps.

### Always Audit Against a Production Build

For any Lighthouse or performance audit: run `npm run build`, then `npm run preview`. Never audit against the dev server — dev mode inflates bundle sizes and skews scores.

---

## Module 16 Feature Build Order

Each feature requires, in order: AI spec doc → Implementation → Verification

1. `setup-deploy` *(React + Vite scaffold, GitHub Actions, GitHub Pages)*
2. `header-footer` *(Layout, Navbar, Logo, Responsive)*
3. `home-page` *(intro, technical skills, soft skills, AI images)*
4. `portfolio-page` *(education, work, projects, PDF download, AI images)*
5. `link-page` *(cards with image, title, description, external URL)*
6. `contact-page` *(form → Supabase `messages` table, validation, feedback)*
7. `login-page` *(secret route, Supabase auth, redirect to Back Office)*
8. `back-office` *(protected route, messages table, view modal, delete, logout)*

Feature spec file names must match R1 exactly, character-by-character.

---

## Spec File Rules

- Acceptance criteria boxes are **unchecked `[ ]`** during planning and in-progress work. Once a feature is complete, check all criteria `[x]`. A completed feature with unchecked boxes is an error.
- Every completed feature spec must include two sections after Acceptance Criteria: `### Implementation Log` (table with Requirement, File, Date, Status columns) and `### Standards Applied`.
- `ai/ai-spec.md` is the only place for global coding standards. Feature specs reference global standards — they do not redefine them.
- Every feature spec must include a `## Runtime User Flow` section written as a numbered walkthrough.
- After writing any spec file, read it top-to-bottom in a single pass before delivering. Check for duplicate section headers, repeated content blocks, and orphaned text.
- **Cross-spec consistency rule:** The first feature spec created is the template. Every subsequent spec must follow the exact same section order. If a section does not apply, mark it `N/A` — never omit it.
- Before declaring any feature done, open `REQUIREMENTS.md` and read its requirements line-by-line. R1 is always the authority.
- Feature spec file names must match R1 exactly, character-by-character.
- **Every R1 bullet must produce at least one named, concrete, verifiable acceptance criterion.** A vague criterion like "images scale appropriately" is not verifiable. A concrete one is "Global `img { max-width: 100% }` rule exists in `index.css`". If an R1 bullet cannot be traced to a testable condition in the spec, the spec is incomplete.
- **Acceptance criteria fall into three categories — check them accordingly:**
  - **Code-verified** (file exists, config is set, import is present) — check `[x]` as soon as the code is written and confirmed to compile/run.
  - **User-action** (repo settings, GitHub Secrets, manual steps) — remains `[ ]` until the user explicitly confirms the action was completed.
  - **Live-environment** (live URL loads, deployed behavior) — remains `[ ]` until the user confirms the live environment is working.
- **No unchecked acceptance criterion may pass a pre-commit check.** If a user-action or live-environment criterion is unchecked at commit time, it is a blocker. The push must be blocked until the user confirms completion, or the criterion is explicitly noted as a known blocker with a plan to close it before `dev → main`.

---

## Blueprint Files — Never Alter

The following files are instructor-provided read-only templates. They must **never be modified, filled in, deleted, or committed with content changes** under any circumstance:

| File | Purpose |
|---|---|
| `docs/AI-SPEC.md` | Blank structural template for `ai/ai-spec.md` — read this to understand required sections |
| `docs/feature.md` | Blank structural template for `ai/features/*.feature.md` — read this to understand required sections |

These are reference blueprints only. All actual spec content goes into `ai/ai-spec.md` and `ai/features/*.feature.md`. If the agent is ever about to write to a file in `docs/`, stop immediately and flag it to the user.

---

## Standard Infrastructure — Do Not Remove Without Warning

Before removing any of the following, issue an **"Out of Standard"** warning to the user:
- npm scripts: `dev`, `build`, `lint`, `preview`
- Root config files: `package.json`, `vite.config.js`, `eslint.config.js`, `.gitignore`
- `.github/workflows/deploy.yml`

---

## Workspace Documentation Requirements

- **README.md** must contain: Project Title + Description, Tech Stack, Project Structure (folder tree), Installation/Setup Instructions, Environment Variables, Author.
- **`.env`** is gitignored — the README must name it explicitly, show all required keys with placeholder values, and state it must be created from scratch.
- README must be verified against the actual codebase before every commit that touches it: library names match `package.json`, `.env` presence matches `.gitignore`, all setup steps are reproducible on a fresh clone.

**README Deferral Rule:** If README is not built during a feature's pre-commit check, the agent must:
1. Explicitly state: `"README deferred — must be completed before dev → main merge."`
2. Uncheck the README item in `ai/ai-spec.md` Definition of Done if it was checked.
3. Add a `[ ] README.md built and verified` item to the pre-merge checklist reminder at that point in the conversation.

**Deferral is not silent.** A deferred README that is never revisited is a submission failure. This happened in a prior module.

---

## Pre-Commit Checklist — Module 16

Before every `git push`, read both lessons-learned files in full, then verify:

- [ ] **`get_errors` run on every modified `.jsx`/`.js` file** — must return no errors before declaring any feature complete. This is a mandatory agent action, not a reminder.
- [ ] `.github/lessons-learned.md` read in full — every applicable lesson cross-checked
- [ ] `.github/users-lessons-learned.md` read in full — every applicable lesson cross-checked
- [ ] **All previously completed feature specs reviewed** — verify nothing in those features was broken by changes made in the current feature. If any past acceptance criterion is no longer met, it must be unchecked and the issue fixed before pushing.
- [ ] `ai/ai-spec.md` Feature Index and Progress table updated **before** this commit — never after push
- [ ] `ai/ai-spec.md` Feature Index status and structure map are in sync
- [ ] `ai/ai-spec.md` Repository Structure reflects the actual file tree
- [ ] Feature spec file names match R1 exactly, character-by-character
- [ ] All acceptance criteria boxes in spec files are unchecked `[ ]`
- [ ] Every feature spec has a `## Runtime User Flow` section
- [ ] Feature spec was proofread top-to-bottom before delivery — no duplicate blocks or orphaned text
- [ ] Every new or modified component/page file has a LOGIC BRIEFING block and SECTION comments
- [ ] LOGIC BRIEFING values match the actual code — verified by reading both (agent action, not a reminder)
- [ ] Form field names verified against Supabase table column names — never from memory
- [ ] All static assets required by R1/R2 are imported and rendered in JSX — presence in the repo is not sufficient
- [ ] No stray or empty (0-byte) files in any directory
- [ ] No credentials, tokens, or `.env` values present in any tracked file
- [ ] All `.md` files are saved as UTF-8 — no `â`, `ã`, or mojibake characters
- [ ] No scope creep — only files belonging to the current feature were modified
- [ ] No unused functions, no unused imports in any modified file
- [ ] README verified against actual codebase — library names match `package.json`, `.env` status matches `.gitignore`
- [ ] All new files and folders reflected in `ai/ai-spec.md` repository structure map

---

## Pre-Merge Checklist — `dev → main`

> **Hard Gate:** Before the words "merge to main" or "ready to merge" are spoken, the agent must run through every item below and report the result. Identifying the merge as the final step is NOT permission to merge. The checklist must be completed and all items confirmed first. No exceptions.

Do not advise merging to `main` until every item below is confirmed:

- [ ] Both lessons-learned files read in full
- [ ] All R1 requirements verified line-by-line before marking any feature complete — R1 is authority, not the spec checklist
- [ ] `ai/ai-spec.md` progress table is current — all completed features marked
- [ ] `ai/ai-spec.md` repository structure matches the actual file tree
- [ ] `README.md` contains all required sections and is verified against the actual codebase
- [ ] `README.md` states `.env` must be **created from scratch** and lists all required keys
- [ ] All `.md` files render cleanly on GitHub — no mojibake characters
- [ ] Git history shows `feature/* → dev → main` workflow — no direct commits to `main`
- [ ] **End-to-end smoke test completed:** user has explicitly confirmed the live site loads, all pages render, contact form submits to Supabase, login works, and Back Office displays messages. Do not merge until the user types confirmation — "it should work" is not confirmation.
- [ ] **All REQUIREMENTS files full compliance pass:** agent reads R1 in full and verifies every deliverable — including file naming, folder structures, asset requirements, and non-code items — against the actual project state.
- [ ] `./LeetCode-Challenges/` screenshot count matches R1's required number — flag any missing files to user
- [ ] No two files in `./LeetCode-Challenges/` share the same byte size — flag potential duplicates to user for visual verification
- [ ] Pre-recording feature summary reviewed — agent provides a one-sentence spoken description of what was built and what each interaction does for every feature being demonstrated. User confirms accuracy before recording begins.

---

## Compliance Constraints

- Never use the order of files in `ai/features/` to determine feature sequence. Only R1 determines build order.
- Never claim compliance or mark a feature complete without reading R1 directly.
- When a new code or documentation standard is introduced, flag that a full compliance audit is required for all relevant files before proceeding.
- Never run `npm run dev` or start the dev server automatically. The user handles all dev server operations.
- Never remove any feature, file, or component without explicit user approval. Always prompt before deleting.
- Always prompt the user before removing any file or folder. Do not delete without explicit approval.
