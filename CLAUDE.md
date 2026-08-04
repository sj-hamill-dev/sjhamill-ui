# CLAUDE.md — @sjhamill/ui

**Developer:** Valery Briceno (`vvelez@sjhamill.com`)
**Repo:** [`sj-hamill-dev/sjhamill-ui`](https://github.com/sj-hamill-dev/sjhamill-ui)
**Package name:** `@sjhamill/ui` · **Version:** `0.1.0` (pre-1.0, no strict SemVer yet)
**Type:** Shared React + Tailwind design system consumed as a git dependency by SJ Hamill internal frontends. Not published to npm.

---

## What this repo is

The single source of truth for anything that should look identical across SJ Hamill internal apps:

- **Tailwind preset** — brand palette, radius, animation plugin. Every consumer's `tailwind.config.js` extends this.
- **Global CSS** — `--*` custom properties for the light + dark palettes. Every rendered class name (`bg-primary`, `text-muted-foreground`, etc.) resolves through these.
- **Component library** — 13 shadcn-style React components (`Button`, `Card`, `Badge`, `Alert`, `AlertBanner`, `AppShell`, `SidebarNav`, `PageHeader`, `DataTable`, `ChartLegend`, `KpiCard`, `StatusBadge`, `Logo`, `DarkModeToggle`) available for consumers to import.
- **Utilities** — `cn()` classname helper, currency/number/date formatters, chart color palettes (`TABLEAU_10`, `COST_TYPE_COLORS`, `STATUS_COLORS`).

## What this repo is not

- Not published to npm or GitHub Packages.
- Not bundled — consumers compile raw TypeScript from `src/`.
- No `dist/` output. No rollup/tsup/vite build step.
- No storybook (the `.ds-sync/storybook/` folder is scratch space for the design-sync harness, not a shipped surface).
- No app-specific components (KPI cards keyed to Procore direct-cost types, project pickers, etc. stay in the consumer apps).

---

## Project structure

```
package.json                     @sjhamill/ui@0.1.0, private, type=module, main=./src/index.ts
tailwind-preset.js               Load-bearing #1 — the shared Tailwind preset (all 4 consumers import this)
tsconfig.json
src/
  index.ts                       Public export surface — every named export consumers can import
  components/                    13 shadcn-style React components (.tsx)
  hooks/use-dark-mode.ts         Reads/writes `class="dark"` on <html>
  lib/utils.ts                   Load-bearing #3 — cn(), formatters, chart palettes
  styles/globals.css             Load-bearing #2 — CSS custom properties for light + dark palettes
.github/
  workflows/ci.yml               Typecheck + lint + prettier gate on main
  copilot-instructions.md        AI-behavior rules; defers to this file
  pull_request_template.md
.design-sync/                    Claude Design Sync config (cross-agent bundle previews). See "Design sync" below.
ds-bundle/                       (gitignored) 21-component IIFE bundle output for design-sync consumers.
.ds-sync/                        (gitignored) Build harness for the design-sync converter.
.specstory/                      (gitignored, do not read) Deprecated session-transcript folder.
```

---

## Core surfaces (deploy-order table)

| Surface | File | Consumed by | Breaking change =                       |
|---|---|---|---|
| Tailwind preset | `tailwind-preset.js` | procore-direct-costs-app, procore-direct-costs-embed-app, procore-commitments-app, vendor-analytics-app | Every consumer's utility classes silently re-color. |
| Brand CSS vars | `src/styles/globals.css` | procore-direct-costs-embed-app (direct import); everyone else transitively via the preset's `hsl(var(--*))` references | Renaming a `--*` token breaks every class name that resolves through it. |
| Utility exports | `src/lib/utils.ts` | procore-commitments-app imports `cn`, `formatCurrency`, `formatDateShort`, `formatPercent` via `@sjhamill/ui/lib/utils` | Renaming `cn`, `formatCurrency`, `TABLEAU_10`, `COST_TYPE_COLORS`, or `STATUS_COLORS` = API break. |
| Components | `src/components/*.tsx` → `src/index.ts` | procore-commitments-app imports `Button`, `Card`, `CardContent`, `CardHeader`, `CardTitle`, `Badge`, `KpiCard`, `Logo`, `DarkModeToggle`, `useDarkMode`. Other 3 apps: none yet. | Renaming any of the components above breaks commitments today. Check `grep -r "@sjhamill/ui" ../*-app/src` before renaming. |

---

## Consumer inventory (verified 2026-08-03)

| Consumer repo | package.json dep | Actual imports | Sync workflow? |
|---|---|---|---|
| `procore-direct-costs-app` | `github:sj-hamill-dev/sjhamill-ui#main` | `@sjhamill/ui/tailwind-preset` | Yes — `.github/workflows/sync-sjhamill-ui.yml` (6h cron) |
| `procore-direct-costs-embed-app` | `git+https://github.com/sj-hamill-dev/sjhamill-ui.git#main` | `@sjhamill/ui/tailwind-preset` + `@sjhamill/ui/styles/globals.css` | Yes — same 6h cron |
| `procore-commitments-app` | `github:sj-hamill-dev/sjhamill-ui#main` | `@sjhamill/ui/tailwind-preset` + components (`Button`, `Card` family, `Badge`, `KpiCard`, `Logo`, `DarkModeToggle`) + hook (`useDarkMode`) + utils (`cn`, `formatCurrency`, `formatDateShort`, `formatPercent`) via `@sjhamill/ui/lib/utils` | Yes — same 6h cron |
| `vendor-analytics-app` | `github:sj-hamill-dev/sjhamill-ui#main` | `@sjhamill/ui/tailwind-preset` | **No** — needs sync workflow (tracked as follow-up issue) |

**Takeaway:** four apps depend on the preset. `procore-commitments-app` is the first (and currently only) real consumer of components + hooks + utilities — so renaming anything on the export surface breaks it. The other three apps only consume the preset (plus `globals.css` for the embed app). Any breaking change to a component/util/hook needs a grep across `procore-commitments-app/src` before merging.

---

## Distribution model (the #1 fresh-session gotcha)

`@sjhamill/ui` is a **git-URL npm dependency**, not a published package. Consumers install it directly from GitHub:

```jsonc
// consumer package.json
"dependencies": {
  "@sjhamill/ui": "github:sj-hamill-dev/sjhamill-ui#main"
}
```

**Consequences worth internalizing:**

1. **No dist emission.** The consumer's bundler (Vite) reads `./src/index.ts` directly. `package.json.main` and `package.json.types` both point at `./src/index.ts`. Adding a build step would require every consumer to change `main`/`types`.
2. **Every merge to `main` ships.** There is no release gate. Any consumer whose sync workflow runs next will pick up the new commit within 6 hours.
3. **`peerDependencies` are load-bearing.** `react`, `react-dom`, `tailwindcss` come from the consumer. Do not move them into `dependencies` — that will duplicate React and break hooks.
4. **`files` in `package.json` gates what the git dep ships.** Currently: `src`, `tailwind-preset.js`, `README.md`. If you add a new top-level asset consumers need (say, `postcss-preset.js`), you must add it to `files` or the git dep won't include it.

## How consumers refresh

Each consumer repo has a `.github/workflows/sync-sjhamill-ui.yml` on a 6h cron that:
1. Runs `npm update @sjhamill/ui` (re-resolves `#main` to the latest commit SHA).
2. Opens a PR with the updated `package-lock.json`.
3. On merge, Cloudflare Pages rebuilds the consumer with the new shared code.

**Manual bump when needed:** `npm update @sjhamill/ui` in the consumer, commit `package-lock.json`, push.

## Version / release policy

- Pre-1.0. `package.json.version` is bumped occasionally but is not enforced.
- Consumers pin to `#main` today. Pinning to a tag (`#v0.2.0`) is documented in the README but not currently practiced.
- Any commit landing on `main` is de-facto a release. If a change is risky, coordinate with consumer maintainers before merging.
- Once we hit 1.0, breaking changes will bump minor (0.x era) or major (1.x+), and consumers will pin to tags.

---

## Load-bearing invariants (things a fresh session would get wrong)

1. **The tailwind preset is the primary product for now.** Break a color token in `tailwind-preset.js` and every downstream Cloudflare Pages app silently re-colors within 6h. Components are secondary but no longer safe to casually rename — `procore-commitments-app` imports `Button`, `Card`, `Badge`, `KpiCard`, `Logo`, `DarkModeToggle` and the `useDarkMode` hook by name.
2. **`src/styles/globals.css` defines the CSS-var contract for light + dark.** Renaming a `--*` token silently breaks every Tailwind class that references it. If you must rename, grep every consumer for `hsl(var(--old-name))` first.
3. **Dark mode is `class="dark"` on a parent element** (usually `<html>`). It's NOT React context. Components read CSS custom properties, not props. The `useDarkMode` hook writes the class; components stay context-free.
4. **`cn()` is the only sanctioned className composer** (`clsx` + `tailwind-merge`). Direct string concatenation loses `tailwind-merge`'s conflict resolution.
5. **Radix Slot is a peer of `Button`** via the `asChild` polymorphic pattern. Removing `@radix-ui/react-slot` from `dependencies` would silently break every consumer using `<Button asChild>`.
6. **Every commit to `main` = deploy.** There is no release gate. The sync workflow in each consumer resolves `#main` to the latest SHA within 6 hours. Land breaking changes on a branch and coordinate before merging.
7. **`formatCompactCurrency` is a deprecated alias of `formatCurrency`** kept only so existing call sites don't break. Do not use in new code.

---

## Design sync (`.design-sync/`)

Cross-agent design-review tooling used when two Claude accounts collaborate on the design system. Config lives at `.design-sync/config.json`; conventions at `.design-sync/conventions.md`; live-edit notes at `.design-sync/NOTES.md`. The `ds-bundle/` (single-file IIFE bundle of all 21 components) and `.ds-sync/` (build harness) are generated outputs — both gitignored.

**If you're not doing a design-sync review, leave these folders alone.** Never author component logic inside `ds-bundle/`; it's synthesized from `src/`.

---

## Local development

```powershell
# One-time
npm install

# Typecheck (also what CI runs)
npm run build

# Lint / format (added during 2026-08 cleanup)
npm run lint
npm run format
```

**No dev server** — this repo has no runnable app. To exercise a component visually, either:
1. Author a new component in `src/components/`, then run the consumer app that imports it (fastest path today: procore-direct-costs-embed-app, since it imports `globals.css`).
2. Use the design-sync bundle (`ds-bundle/`) with a preview host.

## CI

`.github/workflows/ci.yml` — single job on `ubuntu-latest`, Node 20:

- `npm ci`
- `npm run build` (typecheck via `tsc --noEmit`)
- `npm run lint` (eslint on `src/`)
- `npm run format:check` (prettier check on `src/`, `tailwind-preset.js`)

Runs on push + PR to `main`. Pre-commit mirrors the same checks locally.

---

## Conventions

- **Components:** shadcn-style. Kebab-case filenames (`app-shell.tsx`), PascalCase exports (`AppShell`). Types exported alongside the component (`export type AppShellProps`).
- **Utilities:** camelCase (`formatCurrency`), colocated in `src/lib/utils.ts`. If it's cross-app-generic, it belongs here; if it knows about Procore/Riskcast/Dynamics domain concepts, it belongs in the consumer.
- **Styling:** Tailwind utility classes only. Never raw CSS or inline `style={}` for layout/spacing/color. Compose dynamic strings with `cn()`.
- **Colors:** never hardcode a hex outside `tailwind-preset.js` / `globals.css` / `TABLEAU_10`. Use `bg-primary`, `text-muted-foreground`, etc.
- **Dark mode:** every color you author must have a `.dark` counterpart in `globals.css`. No component-level dark-mode branches.
- **Accessibility:** rely on Radix primitives for a11y semantics where available (`@radix-ui/react-slot`). Interactive components need visible focus rings — the `--ring` token drives this.
- **Commit convention:** Conventional Commits. Scopes: `preset`, `theme`, `components`, `utils`, `hooks`, `ci`, `docs`.

## What NOT to touch without explicit ask

- `tailwind-preset.js` color / radius tokens — breaks all 4 consumers instantly.
- `src/styles/globals.css` `--*` token names — same blast radius.
- `src/lib/utils.ts` exported names (`cn`, `formatCurrency`, `TABLEAU_10`, `COST_TYPE_COLORS`, `STATUS_COLORS`) — API break for anything on the export surface.
- `ds-bundle/`, `.ds-sync/` — generated. Do not hand-edit.
- `.specstory/` — deprecated. Do not read or reference.
- `.github/workflows/ci.yml` — coordinate CI changes.

---

## Consumer adoption

New consumer adopting the shared shell (`AppShell` + `SidebarFooter` + `SettingsPage`)? Follow [`ADOPTION.md`](ADOPTION.md) — a copy-pasteable checklist that reviewers can tick box-by-box. It ships in the git dep (`files` in package.json), so consumers can also read it from their `node_modules/@sjhamill/ui/ADOPTION.md`.

---

## Issue filing

Use the two-step pattern per `sjhamill-archives/agent-context/AGENT_ISSUE_FILING.md`. This repo does **NOT** have auto-add enabled, so both steps are required:

```powershell
$url = gh issue create --repo sj-hamill-dev/sjhamill-ui --title "..." --body "..."
gh project item-add 2 --owner sj-hamill-dev --url $url
```

Project `2` is the SJ Hamill Dev Roadmap board.

---

*Cleanup performed 2026-08-03 per `sjhamill-archives/REPO_CLEANUP_PLAYBOOK.md`.*
