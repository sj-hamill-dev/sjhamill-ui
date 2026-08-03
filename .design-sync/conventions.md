# SJ Hamill UI — Design Conventions

## Setup

No provider or wrapper is needed. Components are self-contained — they read CSS custom properties from the stylesheet, not from React context.

Dark mode: add `class="dark"` to a parent element. Light mode is the default (no class needed). The `.dark` class switches every `--*` token to its dark palette value.

## Styling idiom: Tailwind utility classes

This is a **Tailwind CSS** design system with a custom preset. All styling uses Tailwind utility classes — never raw CSS or inline styles for layout, spacing, or color.

### Color families

| Family | Utility pattern | Use |
|---|---|---|
| primary | `bg-primary`, `text-primary-foreground` | Brand navy — buttons, links, active states |
| secondary | `bg-secondary`, `text-secondary-foreground` | Cool gray — secondary buttons, muted fills |
| destructive | `bg-destructive`, `text-destructive-foreground` | Red — errors, delete actions |
| success | `bg-success`, `text-success-foreground` | Green — posted, complete states |
| warning | `bg-warning`, `text-warning-foreground` | Amber — pending, caution states |
| muted | `bg-muted`, `text-muted-foreground` | Subtle backgrounds, secondary text |
| accent | `bg-accent`, `text-accent-foreground` | Hover highlights |
| card | `bg-card`, `text-card-foreground` | Card surfaces |
| sidebar | `bg-sidebar`, `text-sidebar-foreground` | Navy sidebar chrome |
| background/foreground | `bg-background`, `text-foreground` | Page base |

All colors resolve through `hsl(var(--<name>))`. The `border`, `input`, and `ring` tokens control borders, inputs, and focus rings.

### Spacing and layout

Standard Tailwind spacing (`p-4`, `gap-3`, `mt-2`, etc.). Border radius uses the `--radius` token: `rounded-lg`, `rounded-md`, `rounded-sm`.

### Typography

No custom fonts — the system font stack. Use `text-sm` for body, `text-xs` for labels/captions, `text-2xl`/`text-4xl` for headings and KPI values. `font-semibold` and `font-bold` for emphasis. `tabular-nums` for numeric columns. `uppercase tracking-wider` for small labels.

## Where the truth lives

- **Tokens & global styles**: `_ds_bundle.css` (imported via `styles.css`) — all CSS custom properties and Tailwind utilities
- **Per-component API**: each `<Name>.d.ts` and `<Name>.prompt.md` under `components/general/<Name>/`
- **Color constants**: `CHART_COLORS`, `TABLEAU_10`, `COST_TYPE_COLORS`, `STATUS_COLORS` are exported from the bundle for chart/status coloring

## Utilities

`cn(...classes)` merges Tailwind classes with conflict resolution (from `clsx` + `tailwind-merge`). Always use it when composing dynamic class strings.

## Example: a dashboard section

```tsx
import { PageHeader, Button, KpiCard, Badge, Card, CardHeader, CardTitle, CardContent, DataTable, AlertBanner } from "@sjhamill/ui";

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Direct Costs"
        subtitle="Q3 2026 — all active projects"
        actions={<Button size="sm">Sync Now</Button>}
      />
      <AlertBanner tone="warning" actionLabel="Review →">
        <strong>12 transactions</strong> pending approval.
      </AlertBanner>
      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Total" value="$1.2M" hint="3,486 items" badge={<Badge variant="success">Posted</Badge>} />
        <KpiCard label="Pending" value="$45K" tone="warning" />
        <KpiCard label="Failed" value="$6.4K" tone="destructive" />
      </div>
    </div>
  );
}
```
