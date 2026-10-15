# Angular Versions Course — 14 → 16 → 18 → 20 → 22 — Design

Date: 2026-10-15
Status: approved by user (design presented in chat, section by section)

## Goal

A self-paced course that takes a working Angular 14 baseline and modernizes it,
version by version, up to Angular 22 (current stable as of 2026-06-03). The
project is a structural clone of `../java-cheat-sheet` (Java 8 → 11 → 17 → 21 → 25),
adapted to Angular's ecosystem. Full course: lessons, offline diagrams, a browser
lesson reader, and hands-on exercises with automated tests — decided scope:
"Full course (Recommended)".

Audience: a developer who knows Angular basics and wants to modernize a legacy
NgModules app to the current signal-era Angular.

## Decisions (user-approved)

| Decision | Choice |
|---|---|
| Scope | Full course: lessons + diagrams + index + exercises with tests + `solutions` branch |
| Organizing axis | Angular versions (like Java's 8→25) |
| Version arc | 5 workspaces: **14 → 16 → 18 → 20 → 22** (even hops; baseline older than 16 as requested) |
| Exercise format | Independent Angular workspace per version + per-version tests + `solutions` branch |
| Overall approach | Approach A — faithful clone of the java-cheat-sheet structure |

## Version arc rationale

- v22 is current stable (June 2026); v21/v20 are LTS; v19 and earlier are EOL.
- Angular now ships one major per year (v23 ~ June 2027).
- Even hops 14→16→18→20→22 each introduce a milestone era:
  - **14** — classic NgModule baseline, typed reactive forms, standalone only a preview.
  - **16** — signals (developer preview), esbuild dev server, hydration preview.
  - **18** — `@if/@for/@switch/@defer` era, `@let`, zoneless developer preview.
  - **20** — signal-based APIs (`linkedSignal`, `resource`, `httpResource`).
  - **22** — Signal Forms, Angular Aria, async reactivity stable; OnPush default (former default renamed `Eager`).

Feature-to-version assignments in this spec and in the content matrix are
**indicative**; the implementation plan verifies each against official release
notes / angular.dev changelogs (one web check per version).

## Sample app

**TaskBoard** — a small task tracker (projects, tasks, filters, forms,
dashboard). Every workspace contains the same app:

- `src/app/taskboard/` — fully implemented, always working, idiomatic for that
  version (the "before/after" reference; in `ng14` it is written in legacy
  NgModule style, in `ng22` it is standalone + signals + Signal Forms).
- `src/app/exercises/` — the exercise stubs learners implement.

## Course content — 7 lessons

| # | Lesson | Covers | Version highlights (indicative) |
|---|---|---|---|
| 01 | Components & templates | inputs/outputs, view queries, content projection | 14: `@Input/@Output`, `ngOnChanges` → 16/18: signal `input()/output()` → 20/22: signal queries, template arrow functions |
| 02 | Directives & pipes | structural directives, custom pipes | 14: `*ngIf/*ngFor` → 18: `@if/@for/@switch/@defer`, `@let` → 22: multi-case `@switch`, spread in templates |
| 03 | Services & DI | providers, tokens, `inject()` | 14: class providers, injection tokens → 16: `inject()` → 22: modern DI patterns |
| 04 | RxJS & async | observables, async pipe, interop | 14: `async` pipe, subscription lifecycle → 16: `takeUntilDestroyed`, `toSignal` → 20/22: `resource()`, `httpResource()` |
| 05 | Forms | template-driven → typed reactive → signal forms | 14: typed reactive forms → 20: control events API → 22: Signal Forms stable |
| 06 | Routing | routes, guards, lazy loading | 14: class guards → 16: functional guards → 18: `loadComponent`, `canMatch` → 22: Navigation API |
| 07 | Signals & change detection | `signal/computed/effect`, OnPush, zoneless | 16: signals preview → 18: zoneless preview → 20: `linkedSignal` → 22: OnPush default (Eager) |

Each lesson's format (ported from the Java lessons): intro → concept sections
with before/after snippets → `## Exercises` table listing the stub files per
module → version-migration notes.

## Repository structure

```
angular-cheat-sheet/
├── index.html                  # diagram gallery entry point
├── lessons.html                # browser lesson reader (offline)
├── lessons-data.js             # generated from lessons/*.md, committed
├── README.md
├── .gitignore
├── tools/
│   ├── build-lessons.mjs       # lessons/*.md → lessons-data.js
│   └── run.mjs                 # orchestrates per-version test runs via nvm
├── lessons/
│   ├── 01-components-templates.md
│   ├── 02-directives-pipes.md
│   ├── 03-services-di.md
│   ├── 04-rxjs-async.md
│   ├── 05-forms.md
│   ├── 06-routing.md
│   └── 07-signals-cd.md
├── diagrams/
│   ├── 00-versions/            # ng-14..ng-22 overview pages (5)
│   └── 01-components-templates/ … 07-signals-cd/   # concept diagrams (~10)
├── ng14/  ng16/  ng18/  ng20/  ng22/               # 5 Angular workspaces
│   ├── package.json            # deps pinned to that major, own node_modules
│   ├── angular.json / tsconfig*.json / package-lock.json
│   └── src/app/
│       ├── taskboard/          # shared sample app (implemented)
│       └── exercises/          # stubs + *.spec.ts (or .vitest) tests
├── docs/superpowers/specs/…    # this document
└── docs/superpowers/plans/…    # implementation plan (writing-plans output)
```

- **No root package.json / npm workspaces** — Angular majors clash; each
  workspace is fully independent.
- Visual language, light+dark CSS, and page layout of `index.html`,
  `lessons.html`, and the diagrams ported from the Java project.

## Exercises & tests

**Test equivalence rule:** every topic exposes the same exercise surface in all
5 modules — same file names and behavior contracts — but each is written
idiomatically for its version's runner.

- Test runner by era: Karma + Jasmine (`ng14`, `ng16`, `ng18`); Vitest
  (`ng20`, `ng22`).
- Required Node per module (via `nvm`): 14→Node 16, 16→Node 18, 18→Node 20,
  20→Node 22, 22→Node 24.

**Stub mechanics** (analog of `UnsupportedOperationException("TODO Java NN - …")`):

- Stubs fail visibly: services `throwError(() => new Error('TODO Angular 16 — see lessons/…'))`,
  pipes return a placeholder, guards return `false`, components have empty logic.
- Tests are complete and runnable before the exercise — they fail, forming the
  scoreboard.
- TaskBoard reference app is always complete on `main`.

**Commands** (also in README):

- `node tools/run.mjs test ng16` — switches Node via nvm, runs one workspace.
- `node tools/run.mjs test all` — sequential scoreboard across the 5 modules;
  failing workspaces do not stop the run (analog of
  `maven.test.failure.ignore=true`); `--strict` fails fast.
- nvm-windows switches global Node: `run.mjs` switches, runs, then restores
  Node 24. Tests run sequentially, never in parallel.

**Solutions branch:** `solutions` holds completed exercise implementations;
file tree identical to `main`, only `src/app/exercises/**` differs.
`git diff main solutions -- ng16/src/app/exercises` shows the answers.

## Lessons & browser reader

- `lessons/*.md` is the source of truth.
- `node tools/build-lessons.mjs` generates `lessons-data.js`; run after every
  lesson edit; both files committed together (same workflow as the Java project).
- `lessons.html` renders all 7 lessons offline (file://) with a sidebar.

## Diagrams (~15, standalone offline HTML)

- **5 version overviews** (`diagrams/00-versions/`): "What's new in Angular
  NN" — feature badges per area, support-window dates, required Node version.
- **~10 concept diagrams**, 1–3 per lesson, e.g.: NgModule→standalone
  evolution; structural directives → `@if/@for/@defer` (incl. `@let`); DI tree
  + `inject()`; signal graph (`signal→computed→effect`); RxJS ↔ signals
  interop; typed reactive forms → Signal Forms; class → functional guards +
  lazy routes; hydration + `@defer` flow; zoneless/Eager change detection.
- Layout: `diagrams/<lesson>/<name>/<name>.html`; linked from the matching
  lesson and from `index.html`.

## README

Ported structure: goal, prerequisites (nvm + per-version Node), version tour,
how-to-work-an-exercise, lesson order table, commands, version × topic matrix,
solutions branch, diagram index.

## Verification criteria

- Each workspace installs and `ng test` runs under its required Node.
- On `main`: every workspace's tests **fail** on the stubs (complete scoreboard).
- On `solutions`: `node tools/run.mjs test all --strict` is green across all 5.
- `lessons.html`, `index.html`, and every diagram open via file:// with working
  links; `tools/build-lessons.mjs` is idempotent.
- Lesson `## Exercises` tables match the actual stub files.

## Risks & fallbacks

- **Angular 14/16 under nvm on Windows** — older CLIs + Karma on Node 16/18.
  Fallback: document per-module `nvm use` steps; if a blocker appears, run the
  oldest module's tests under WSL.
- **Karma deprecation/removal** — used only for 14–18 (supported there); 20/22
  use Vitest. If Vitest turns out not to be usable in `ng20` (support was
  experimental around 20.x), `ng20` falls back to its still-available Karma
  builder; the plan confirms this during the per-version release-note check.
- **Feature-to-version drift** — indicative assignments verified against
  official release notes during planning.
- **Schematics/`ng update` between majors** — not part of the course; modules
  are independent workspaces, learners do not run `ng update`.

## Out of scope (YAGNI)

- No `ng update` migration exercises, no real legacy codebase to import.
- No server-side rendering / SSG deep dives (hydration is diagram + lesson
  coverage only).
- No e2e testing (Playwright/Cypress) — unit tests only.
- No CI workflows (can be added later if requested).
- No Angular Material / component-library topics.
- No TypeScript-version matrix beyond what each Angular major pins.
