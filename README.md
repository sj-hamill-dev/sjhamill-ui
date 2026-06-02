# @sjhamill/ui

Shared design system and UI primitives for SJ Hamill internal frontends.
Consumed by `procore-direct-costs-app`, `procore-direct-costs-embed-app`,
and any future internal tools.

> Anything that should look identical across SJ Hamill apps belongs here.
> App-specific UI (KPI cards keyed to direct-cost types, the View-As picker,
> etc.) stays in each app's own `src/components/`.

---

## Install in a consumer app

This package is **not** published to npm. Consumers depend on it directly
via a Git URL pinned to a branch or tag:

```jsonc
// package.json (consumer)
{
  "dependencies": {
    "@sjhamill/ui": "git+https://github.com/sj-hamill-dev/sjhamill-ui.git#main"
  }
}
```

Then run `npm install`. To bump to the latest commit on `main`:

```
npm update @sjhamill/ui
```

For production builds, pin to a Git tag instead of `#main` so a midnight
commit can't change what your next deploy ships:

```jsonc
"@sjhamill/ui": "git+https://github.com/sj-hamill-dev/sjhamill-ui.git#v0.1.0"
```

---

## What's included

| Layer | What | Where |
| --- | --- | --- |
| Tailwind preset | Brand colors, border radius, animation plugin | `tailwind-preset.js` |
| Global CSS | CSS variables for the brand palette (light + dark) | `src/styles/globals.css` |
| Components | `Button`, `Card`, `Badge`, `Alert` (shadcn-style) | `src/components/` |
| Utilities | `cn()`, currency/number/date formatters, chart palettes | `src/lib/utils.ts` |

---

## Wire it up in a consumer app

### 1. Install peer dependencies the consumer needs

```
npm i tailwindcss postcss autoprefixer
```

(The package's `dependencies` — `clsx`, `tailwind-merge`, `class-variance-authority`,
`@radix-ui/react-slot`, `tailwindcss-animate` — install transitively. You
don't need to add them to the consumer.)

### 2. Tailwind config — extend the shared preset

```js
// tailwind.config.js  (consumer app)
import sjhamillPreset from "@sjhamill/ui/tailwind-preset";

export default {
  presets: [sjhamillPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    // Scan the shared package so its component classes get included:
    "./node_modules/@sjhamill/ui/src/**/*.{ts,tsx}",
  ],
};
```

### 3. PostCSS config — standard Tailwind setup

```js
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 4. Import the global stylesheet once

```tsx
// src/main.tsx  (consumer)
import "@sjhamill/ui/styles/globals.css";
import { StrictMode } from "react";
// ...
```

### 5. Use the components and utilities

```tsx
import { Card, CardHeader, CardTitle, CardContent, Button, cn, formatCurrency } from "@sjhamill/ui";

export function ProjectCard({ name, total }: { name: string; total: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{formatCurrency(total)}</div>
        <Button variant="outline" size="sm" className={cn("mt-4")}>
          View details
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## What does NOT belong here

- **App-specific data shapes.** No interfaces tied to a specific Flask
  endpoint or BigQuery table. Keep those in the consumer's `src/types/`.
- **Anything that knows about Procore project numbers, direct cost types,
  or other domain concepts.** Generic primitives only.
- **Charts.** Recharts is heavy and the chart layouts are app-specific.
  Each app keeps its own chart components; what they share is the color
  palette (already exported from `lib/utils`).
- **App layouts.** Each app's chrome (header, nav, footer) is different
  and should live in the consumer.

When in doubt: would this make sense in a hypothetical *third* SJ Hamill
frontend that does something unrelated to Procore? If yes, it belongs
here. If no, leave it in the consuming app.

---

## Updating the shared package

Standard flow:

1. Make the change in a feature branch of this repo.
2. PR + merge to `main`.
3. In each consumer app, run `npm update @sjhamill/ui` and commit the
   updated `package-lock.json`.
4. Push the consumer change — Cloudflare Pages auto-rebuilds with the
   new shared code.

For production:

1. Tag the release: `git tag v0.2.0 && git push --tags`.
2. Update consumers' `package.json` to pin the new tag.
3. PR + merge in each consumer.

### Optional: deploy-hook automation

To skip the manual `npm update` step, configure a GitHub Action in this
repo that fires Cloudflare Pages deploy hooks for each consumer when
`main` updates. Each consumer's Pages project has a deploy-hook URL
under **Settings → Builds & deployments → Deploy hooks**. The Action
pulls those from repository secrets and `curl`s them on every push to
`main`. Net effect: edit + push here, all consumers rebuild within
~3 minutes.

---

## Versioning

Keep `package.json` `version` in sync with Git tags. Pre-1.0 the API may
change between minor versions; once we hit 1.0 we'll start treating
breaking changes as a real bump.

---

## License

Internal — proprietary to SJ Hamill Construction. Not for redistribution.
