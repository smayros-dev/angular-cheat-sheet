# Angular Versions Course — 14 → 16 → 18 → 20 → 22

[![CI](https://github.com/smayros-dev/angular-cheat-sheet/actions/workflows/ci.yml/badge.svg)](https://github.com/smayros-dev/angular-cheat-sheet/actions/workflows/ci.yml)
[![Deploy](https://github.com/smayros-dev/angular-cheat-sheet/actions/workflows/deploy.yml/badge.svg)](https://github.com/smayros-dev/angular-cheat-sheet/actions/workflows/deploy.yml)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/smayros-dev/angular-cheat-sheet?quickstart=1)

**Learn in the browser:** open the repo in GitHub Codespaces. Node 16/18/20, Chrome and every workspace come preinstalled, so you can edit the exercises and run their tests without installing anything. See [docs/apprendre-dans-le-navigateur.md](docs/apprendre-dans-le-navigateur.md).

A self-paced course that takes a classic Angular 14 NgModule app and modernizes
it one major at a time, up to the signal era. Each version lives in its own,
fully independent Angular workspace containing:

- **`src/app/taskboard/`**: the **TaskBoard** reference app, complete and
  written idiomatically for that version (the "before / after" you compare).
- **`src/app/exercises/`**: exercise stubs plus complete specs. The specs
  fail until you implement the stubs, so your test run is your scoreboard.

> **Status:** `ng14`, `ng16` and `ng18` are in place, along with the tooling and
> the lesson skeletons. `ng20`/`ng22`, the full lesson text, the offline lesson
> reader and the `solutions` branch are still on the roadmap; see
> [the implementation plan](docs/superpowers/plans/2026-10-15-angular-versions-course.md).

## Documentation

| Diagram | What it shows |
|---|---|
| [Course toolchain](docs/diagrams/course-toolchain/course-toolchain.html) | Lessons → bundler, workspaces, and how `tools/run.mjs` runs each suite under its own Node |
| [TaskBoard app](docs/diagrams/taskboard-app/taskboard-app.html) | Routes, guard, components and services of the reference app, and what changes from ng14 to ng16 to ng18 |

Open the `.html` files directly in a browser; they work offline. They were
generated with [archify](https://github.com/tt-a1i/archify) from the
`candidate.json` next to each one, and every box links to the source lines it
describes.

- Design spec: [docs/superpowers/specs/…-design.md](docs/superpowers/specs/2026-10-15-angular-versions-course-design.md)
- Implementation plan: [docs/superpowers/plans/…-course.md](docs/superpowers/plans/2026-10-15-angular-versions-course.md)

## Prerequisites

Each workspace pins its own Angular major, which in turn needs a specific Node
major:

| Workspace | Angular | Node | Test runner |
|---|---|---|---|
| `ng14` | 14.2 | 16 | Karma + Jasmine |
| `ng16` | 16.2 | 18 | Karma + Jasmine |
| `ng18` | 18.2 | 20 | Karma + Jasmine |
| `ng20` *(planned)* | 20 | 22 | Vitest |
| `ng22` *(planned)* | 22 | 24 | Vitest |

1. Install a version manager:
   [nvm-windows](https://github.com/coreybutler/nvm-windows) on Windows, or
   [nvm](https://github.com/nvm-sh/nvm) on macOS/Linux.
2. Install every Node major you need: `nvm install 16`, `nvm install 18`,
   `nvm install 20`.
3. Install Chrome or Edge. Karma runs headless, and on Windows
   `karma.conf.js` falls back to Edge if Chrome is missing. Elsewhere, set
   `CHROME_BIN` if Chrome isn't found automatically.

There is **no root `package.json`**. The Angular majors would clash, so each
workspace installs its own dependencies.

## Getting started

Install each workspace with its own Node version:

```bash
nvm use 16 && cd ng14 && npm ci && cd ..
nvm use 18 && cd ng16 && npm ci && cd ..
nvm use 20 && cd ng18 && npm ci && cd ..
```

> On Windows, `nvm use` needs an elevated shell. Without admin rights, call
> the version's binaries directly, e.g.
> `%APPDATA%\nvm\v18.20.8\node.exe %APPDATA%\nvm\v18.20.8\node_modules\npm\bin\npm-cli.js ci`.

### Run the TaskBoard app

```bash
nvm use 18
cd ng16
npm start          # ng serve → http://localhost:4200
```

What you can do in the app:

- **Add tasks** with the form. The title is required and needs at least 3
  characters; pick a status and the list updates immediately.
- See the **"N of M done"** summary, which `TaskService.doneCount` computes
  (a getter in ng14, `computed()` in ng16+).
- Go to **`/login`** and press **Log in**. You're taken to the guarded
  **`/admin`** page, and the board now shows an *Admin* link. Visiting `/admin`
  while logged out redirects you to `/login`.
- Hover over or tab through tasks to see the `tbHighlight` directive.

Run the same steps in `ng14` and `ng18` to compare the same behavior across
three generations of Angular.

### Run the tests

`tools/run.mjs` runs a workspace's suite under the right Node **without
switching your global Node version**. It finds the binary in your nvm install
(nvm-windows `NVM_HOME` or nvm-sh `NVM_DIR`):

```bash
node tools/run.mjs test ng16            # one workspace
node tools/run.mjs test all             # every workspace, keeps going on failure
node tools/run.mjs test all --strict    # stop at the first failing workspace
node tools/run.mjs test all --dry-run   # print the commands + preflight checks only
```

Expected result on this branch: every `taskboard/` spec passes, and every
`exercises/` spec fails until you solve it.

## How to work an exercise

1. Read the lesson in `lessons/NN-*.md` (the lesson index is below).
2. Read the TaskBoard implementation of the same concept, starting from the
   `ng14` baseline and then the version you're targeting.
3. Open the stub in `ngNN/src/app/exercises/…`. Every stub starts with
   `// TODO Angular NN — see lessons/…`.
4. Implement it in that version's idiom, e.g. `*ngIf` in ng16 and `@if` in
   ng18.
5. Run `node tools/run.mjs test ngNN` until the exercise's specs are green.

| # | Lesson | Exercise files (`src/app/exercises/…`) |
|---|---|---|
| 01 | Components & templates | `components/task-badge.component.ts`, `components/task-panel.component.ts` |
| 02 | Directives & pipes | `pipes/task-status.pipe.ts`, `components/task-list.component.ts` |
| 03 | Services & DI | `services/task-store.service.ts` |
| 04 | RxJS & async | `services/task-feed.service.ts` |
| 05 | Forms | `components/task-form.component.ts` |
| 06 | Routing | `routing/session.service.ts`, `routing/can-activate-tasks.guard.ts`, `routing/task.routes.ts`, `routing/login.component.ts` |
| 07 | Signals & change detection | `signals/task-stats.service.ts` |

The exercise specs are identical in every workspace; only the idiom you write
the solution in changes.

## Repository layout

```
angular-cheat-sheet/
├── lessons/              # lesson markdown (source of truth)
├── lessons-data.js       # generated bundle for the offline reader. Don't edit by hand
├── tools/
│   ├── build-lessons.mjs # lessons/*.md → lessons-data.js (validates code links)
│   └── run.mjs           # per-version test orchestrator
├── ng14/ ng16/ ng18/     # independent Angular workspaces
│   └── src/app/{taskboard,exercises}/
└── docs/
    ├── diagrams/         # archify architecture diagrams (offline HTML)
    └── superpowers/      # design spec + implementation plan
```

## CI/CD

GitHub Actions workflows live in `.github/workflows/`:

| Workflow | Trigger | What it does |
|---|---|---|
| **CI** (`ci.yml`) | every PR, plus pushes to `main` / `course-build` / `solutions` | Checks that `lessons-data.js` matches `lessons/`. For each workspace, on its own Node version, it runs the reference app specs (these **must pass**), the exercise scoreboard, and a production build. |
| **Deploy** (`deploy.yml`) | push to `main`, or manual | Builds all three apps and publishes them to GitHub Pages, together with a landing page and the diagrams |

- The exercise scoreboard is informational on every branch except
  `solutions` (and PRs into it), where it must be green.
- CI runs Karma with the `ChromeHeadlessCI` launcher (`--no-sandbox`)
  defined in each `karma.conf.js`. Hosted Ubuntu runners can't use
  Chrome's sandbox.
- **One-time setup for Pages:** Settings → Pages → Source: **GitHub
  Actions**. The site is then served at
  `https://smayros-dev.github.io/angular-cheat-sheet/`, with one app per
  workspace (`/ng14/`, `/ng16/`, `/ng18/`). Reloading a deep link such as
  `/ng16/login` falls back to that app's start page.

## Editing lessons

After changing anything under `lessons/`, rebuild and commit both together:

```bash
node tools/build-lessons.mjs
git add lessons lessons-data.js
```

The build is deterministic, because BOM and CRLF are normalized, and it fails
if a lesson's exercise link points at a missing file.
