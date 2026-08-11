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
- **Logo**: Uses `<img>` tags referencing external image files (`/sj-hamill-logo.png`, `/sjh-extended-logo-white.png`). Ships with floor card since images don't exist in the bundle context. Authorable if placeholder images are added.
- **SidebarNav**: Renders white text on transparent — must be placed on a dark background (e.g. `bg-sidebar`) to be visible. Preview wraps it in a navy div.
- **SidebarFooter**: Same navy-background requirement as SidebarNav — colors resolve through `--sidebar-foreground`. Preview wraps it in a fixed-height navy container.
- **DarkModeToggle**: Small icon button — preview adds label text for visibility.
- **AppShell**: Full-page `h-screen` layout. Preview wraps in a fixed-height container with border to constrain.
- **DataTable**: Generic `<T>` component — preview uses concrete row type with construction data.
- **TeamRolesTable**: Thin `DataTable` wrapper — preview reuses the same construction-team roster as `AccountCard`/`ViewAsPicker` for a consistent cast across previews.
- **SettingsPage**: Exports five components from one source file (`SettingsPage`, `SettingsSection`, `SettingsToggle`, `SettingsSelectRow`, `AboutCard`). One composed preview (`SettingsPage.tsx`) demonstrates all five assembled into a realistic settings screen, matching the `AppShell.tsx` precedent of composing multiple components into one scenario.
- **ViewAsBanner / ViewAsPicker**: Admin impersonation UI. Previews cover the default `warning` tone, the `destructive` stale-target state (via `children` override), and both "viewing self" / "impersonating" states of the picker.

## Known render warns
- (none — all components render cleanly after Tailwind compilation fix, pending re-verification of the 10 newly-added previews below)

## Preview coverage (updated 2026-08-11)
Added previews for the 10 components that shipped after the Aug 3 snapshot: `Avatar`, `RoleBadge`, `AccountCard`, `Logo`, `PageFooter`, `SidebarFooter`, `SettingsPage` (+ `SettingsSection`/`SettingsToggle`/`SettingsSelectRow`/`AboutCard`), `TeamRolesTable`, `ViewAsBanner`, `ViewAsPicker`. All 22 `src/components/*.tsx` files now have preview coverage. Not yet re-run through the converter — do that before trusting a regenerated `ds-bundle/`.

## Re-sync risks
- **Tailwind compilation**: If new utility classes are added to components or previews, the compiled CSS must be regenerated before the converter runs. The `buildCmd` in config handles this.
- **Logo images**: If brand logo files are ever added to the repo, a Logo preview could be authored.
- **No system fonts to watch**: The DS uses the browser's default system font stack — no `@font-face` or external fonts to track.
