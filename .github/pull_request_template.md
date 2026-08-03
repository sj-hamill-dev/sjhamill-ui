## What

<!-- One sentence: what changed. -->

## Why

<!-- Motivation + link to issue: "Closes #N" if this closes a tracked issue. -->

## Consumer impact

<!-- Which of the 4 downstream apps could this affect?
     - procore-direct-costs-app       (preset only)
     - procore-direct-costs-embed-app (preset + globals.css)
     - procore-commitments-app        (preset + components + hooks + utils — the sensitive one)
     - vendor-analytics-app           (preset only)
     Remember: every merge to main ships within 6h via each consumer's
     sync-sjhamill-ui.yml. If this changes tailwind-preset.js, globals.css
     tokens, or any exported name from src/index.ts, call it out. -->

## Checklist

- [ ] `npm run build` passes (typecheck)
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] If this changes a `--*` CSS token name, a Tailwind preset color, or a public export, I've grep'd the 4 consumer repos for the old name (especially `procore-commitments-app`).
- [ ] `CLAUDE.md` updated if the load-bearing invariants section changed.
- [ ] Not touching `ds-bundle/`, `.ds-sync/`, `.design-sync/`, `.specstory/`, or `.github/workflows/` without an explicit ask.
