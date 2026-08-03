# @sjhamill/ui

Shared design system for SJ Hamill internal frontends.

**Full dev source of truth: [`CLAUDE.md`](CLAUDE.md).**
Non-Copilot agents: [`AGENTS.md`](AGENTS.md).

---

## What this actually ships

| Layer | File | Used by (verified 2026-08-03) |
| --- | --- | --- |
| Tailwind preset | [`tailwind-preset.js`](tailwind-preset.js) | procore-direct-costs-app, procore-direct-costs-embed-app, vendor-analytics-app |
| Brand CSS variables (light + dark) | [`src/styles/globals.css`](src/styles/globals.css) | procore-direct-costs-embed-app |
| React components (shadcn-style) | [`src/components/`](src/components/) | Available; no consumer imports yet |
| Utilities & chart palettes | [`src/lib/utils.ts`](src/lib/utils.ts) | Available; no consumer imports yet |

The two load-bearing surfaces today are the **Tailwind preset** and **`globals.css`**. Components are ready for adoption but not yet wired in.

---

## Install in a consumer app

Not published to npm. Consume directly via git URL:

```jsonc
// consumer package.json
{
  "dependencies": {
    "@sjhamill/ui": "github:sj-hamill-dev/sjhamill-ui#main"
  }
}
```

Every consumer has a `.github/workflows/sync-sjhamill-ui.yml` (6h cron) that runs `npm update @sjhamill/ui` and opens a bump PR. Merging that PR triggers a Cloudflare Pages rebuild.

> **Exception:** `vendor-analytics-app` does not have a sync workflow yet — tracked as a follow-up.

For production pins, use a git tag instead of `#main`:

```jsonc
"@sjhamill/ui": "git+https://github.com/sj-hamill-dev/sjhamill-ui.git#v0.2.0"
```

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
