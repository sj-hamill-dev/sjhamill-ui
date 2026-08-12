# @sjhamill/ui

Shared design system for SJ Hamill internal frontends.

**Full dev source of truth: [`CLAUDE.md`](CLAUDE.md).**
Adopting the shell in a consumer app: [`ADOPTION.md`](ADOPTION.md).
Non-Copilot agents: [`AGENTS.md`](AGENTS.md).

---

## What this actually ships

| Layer | File | Used by (verified 2026-08-03) |
| --- | --- | --- |
| Tailwind preset | [`tailwind-preset.js`](tailwind-preset.js) | procore-direct-costs-app, procore-direct-costs-embed-app, procore-commitments-app, vendor-analytics-app |
| Brand CSS variables (light + dark) | [`src/styles/globals.css`](src/styles/globals.css) | procore-direct-costs-embed-app |
| React components (shadcn-style) | [`src/components/`](src/components/) | procore-commitments-app (`Button`, `Card`, `Badge`, `KpiCard`, `Logo`, `DarkModeToggle`) |
| Utilities & chart palettes | [`src/lib/utils.ts`](src/lib/utils.ts) | procore-commitments-app (`cn`, `formatCurrency`, `formatDateShort`, `formatPercent`) |

The load-bearing surfaces today are the **Tailwind preset** (all 4 apps), **`globals.css`** (embed app), and the **component + util export surface** (`procore-commitments-app`). Renaming any exported component or utility breaks commitments — grep it first.

---

## Install in a consumer app

Not published to npm. Consume directly via git URL, pinned to an exact commit:

```jsonc
// consumer package.json
{
  "dependencies": {
    "@sjhamill/ui": "github:sj-hamill-dev/sjhamill-ui#3392d293f950ba46d9f944de5fe4dbf754f42d4f"
  }
}
```

> **Never spec a branch.** `#main` makes the dependency a moving target: anything landing here reaches production in every consumer on the next cron tick, unreviewed. A git tag (`#v0.2.0`) is fine too — a branch is not.

Every consumer has a `.github/workflows/sync-sjhamill-ui.yml` (6h cron) that resolves the latest commit on this repo's `main`, repins to it, runs `npm run build`, and — only if the build passes — opens a bump PR. Merging that PR triggers a Cloudflare Pages rebuild.

The build step catches type and compile breaks only. **Open the app and look at it before merging a sync PR** — a visual regression compiles perfectly and the review is the only place it gets caught.

## Wire it up

```js
// tailwind.config.js  (consumer)
import sjhamillPreset from "@sjhamill/ui/tailwind-preset";

export default {
  presets: [sjhamillPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@sjhamill/ui/src/**/*.{ts,tsx}",
  ],
};
```

```tsx
// src/main.tsx  (consumer)
import "@sjhamill/ui/styles/globals.css";
```

```tsx
// Anywhere in the consumer app
import { Button, Card, cn, formatCurrency } from "@sjhamill/ui";
```

Full export surface: [`src/index.ts`](src/index.ts).

---

## What belongs here vs. in a consumer

**Belongs here:** anything that should look identical across every SJ Hamill frontend — brand palette, shared components, generic formatters, chart palettes.

**Belongs in the consumer:** anything tied to a specific domain (Procore direct cost types, Riskcast projects, Dynamics stages) or a specific data shape (Flask endpoint responses, BigQuery table columns).

Test: would this make sense in a hypothetical third SJ Hamill frontend that does something unrelated to Procore? If yes → here. If no → consumer app.

---

## Local dev

```powershell
npm install
npm run build          # typecheck (also what CI runs)
npm run lint
npm run format:check
```

No dev server — this repo has no runnable app. To see a component render, import it from a consumer app (fastest: procore-direct-costs-embed-app).

## Contributing

1. Branch from `main`.
2. `npm run build && npm run lint && npm run format:check` all pass.
3. Open PR — template will prompt you for consumer-impact analysis.
4. **Every merge to `main` ships to all consumers within 6h.** Coordinate breaking changes before merging.

Pre-commit hooks mirror CI: `pip install pre-commit && pre-commit install` runs typecheck + lint + prettier on every commit.

---

## License

Internal — proprietary to SJ Hamill Construction. Not for redistribution.
