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
- **DarkModeToggle**: Small icon button — preview adds label text for visibility.
- **AppShell**: Full-page `h-screen` layout. Preview wraps in a fixed-height container with border to constrain.
- **DataTable**: Generic `<T>` component — preview uses concrete row type with construction data.

## Known render warns
- (none — all 21 render cleanly after Tailwind compilation fix)

## Re-sync risks
- **Tailwind compilation**: If new utility classes are added to components or previews, the compiled CSS must be regenerated before the converter runs. The `buildCmd` in config handles this.
- **Logo images**: If brand logo files are ever added to the repo, a Logo preview could be authored.
- **No system fonts to watch**: The DS uses the browser's default system font stack — no `@font-face` or external fonts to track.
