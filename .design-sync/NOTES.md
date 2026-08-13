# Design Sync Notes — @sjhamill/ui

## Build setup
- No `dist/` — package exports raw TypeScript. Converter uses `--entry ./src/index.ts` (synth-entry mode).
- Tailwind CSS must be compiled before the converter runs: `npx tailwindcss -c .ds-sync/tailwind.config.js -i src/styles/globals.css -o .ds-sync/compiled.css --minify`
- The `.ds-sync/tailwind.config.js` uses the repo's own `tailwind-preset.js` and scans both `src/` and `.design-sync/previews/` for utility classes.
- `cfg.cssEntry` points at the compiled output (`.ds-sync/compiled.css`), not the raw `src/styles/globals.css`.

## Excluded exports
- Hooks: `useDarkMode`
- Utilities: `cn`, `formatCurrency`, `formatCompactCurrency`, `formatNumber`, `formatCompactNumber`, `formatPercent`, `formatDate`, `formatDateShort`, `formatRelativeTime`, `stripProjectPrefix`
- Constants: `CHART_COLORS`, `TABLEAU_10`, `COST_TYPE_COLORS`, `STATUS_COLORS`
- CVA helpers: `buttonVariants`, `badgeVariants`

## Component notes
- **Logo**: Renders an `<img>` whose default `src` (`/sj-hamill-logo.png`, `/sjh-extended-logo-white.png`) is served from each **consumer app's** `public/` directory, not from this repo — the PNGs were removed deliberately in `a32d23b` (`8a4ecae` explains why: Vite can't process asset imports out of `node_modules`). The preview host has no `public/`, so the defaults render broken. `Logo.tsx` now passes its own `lightSrc`/`darkSrc` inline-SVG stand-ins at the real mark's 3.02:1 aspect ratio (3302 × 1092). They exercise sizing and light/dark placement; they are **not** the brand artwork. Do not re-add PNGs to fix this.
- **SidebarNav**: Renders white text on transparent — must be placed on a dark background (e.g. `bg-sidebar`) to be visible. Preview wraps it in a navy div.
- **SidebarFooter**: Same navy-background requirement as SidebarNav — colors resolve through `--sidebar-foreground`. Preview wraps it in a fixed-height navy container.
- **DarkModeToggle**: Small icon button — preview adds label text for visibility.
- **AppShell**: Full-page `h-screen` layout. Preview wraps in a fixed-height container with border to constrain. Since #14/#18 the default logo slot is `<Logo dark />`, so the preview hits the same missing-`public/` problem as `Logo` — it passes an explicit `logo={<Logo dark darkSrc={…} />}` node. Note the sidebar is navy in **both** themes, so it is always the white mark; `AppShellProps.dark` is accepted for API compatibility and ignored.
- **DataTable**: Generic `<T>` component — preview uses concrete row type with construction data.
- **TeamRolesTable**: Thin `DataTable` wrapper — preview reuses the same construction-team roster as `AccountCard`/`ViewAsPicker` for a consistent cast across previews.
- **SettingsPage**: Exports five components from one source file (`SettingsPage`, `SettingsSection`, `SettingsToggle`, `SettingsSelectRow`, `AboutCard`). One composed preview (`SettingsPage.tsx`) demonstrates all five assembled into a realistic settings screen, matching the `AppShell.tsx` precedent of composing multiple components into one scenario.
- **ViewAsBanner / ViewAsPicker**: Admin impersonation UI. Previews cover the default `warning` tone, the `destructive` stale-target state (via `children` override), and the "viewing self" / "impersonating" / "role target" states of the picker. Since #17, `ViewAsTarget.email` is optional — role targets stand for a role rather than a person, and `TargetRow` joins `[email, hint]` with `filter(Boolean)` so the `·` separator disappears. `ViewAsPicker.tsx`'s `RoleTargets` export covers that path.

## Known render warns

**Unverified.** No `.design-sync/previews/*.tsx` file has ever been run through the converter, and none is covered by CI: `tsconfig.json` `include` is `["src"]` and `format:check` only globs `src/**` + `tailwind-preset.js`. Treat the list below as "bugs found by reading", not "the full set".

- `Logo` / `AppShell` — **fixed 2026-08-13.** Both rendered a broken image because the component defaults resolve PNGs from the consumer's `public/`. Both previews now pass explicit sources. See the component notes above.
- `ViewAsPicker` — **fixed 2026-08-13.** Fixtures predated #17 and every target carried an `email`, so the now-optional-email path was uncovered. Added `RoleTargets`.
- Everything else: unknown until a converter run. Re-run `/design-sync` and replace this section with real results.

## Preview coverage (updated 2026-08-11)
Added previews for the 10 components that shipped after the Aug 3 snapshot: `Avatar`, `RoleBadge`, `AccountCard`, `Logo`, `PageFooter`, `SidebarFooter`, `SettingsPage` (+ `SettingsSection`/`SettingsToggle`/`SettingsSelectRow`/`AboutCard`), `TeamRolesTable`, `ViewAsBanner`, `ViewAsPicker`. All 22 `src/components/*.tsx` files now have preview coverage. Not yet re-run through the converter — do that before trusting a regenerated `ds-bundle/`.

## Remote project drift
The Claude Design project (`856cfbca-03de-4bc2-85c9-5412a81da520`) was last written **2026-08-03**. Four PRs have landed since — #14 and #18 (AppShell default logo → always the white mark), #16 (docs), #17 (optional `ViewAsTarget.email`) — so the remote cards are stale for `AppShell`, `Logo`, and `ViewAsPicker` at minimum.

## Re-sync risks
- **Tailwind compilation**: If new utility classes are added to components or previews, the compiled CSS must be regenerated before the converter runs. The `buildCmd` in config handles this.
- **Logo images**: Do not "fix" a broken logo preview by adding PNGs to this repo — that regresses `a32d23b`. Pass `lightSrc`/`darkSrc` or an explicit `logo` node in the preview instead.
- **Previews are outside every gate**: they are not typechecked (`tsconfig.include` = `["src"]`), not linted meaningfully, and not prettier-checked. A preview can reference a prop that no longer exists and CI stays green. Read them against `src/` after any prop rename.
- **No system fonts to watch**: The DS uses the browser's default system font stack — no `@font-face` or external fonts to track.
