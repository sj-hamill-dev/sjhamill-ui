import * as React from "react";
import { cn } from "../lib/utils";

export interface ChartLegendItem {
  /** Display label for this series. */
  label: string;
  /** Color swatch — hex or CSS color. */
  color: string;
  /** Optional formatted value shown on the right (e.g. "$32.3K"). */
  value?: React.ReactNode;
}

export interface ChartLegendProps {
  items: ChartLegendItem[];
  /** Optional heading above the legend entries. */
  title?: string;
  className?: string;
}

/**
 * Chart legend that reads from TABLEAU_10 / COST_TYPE_COLORS. The chart
 * itself stays app-specific (Recharts, etc.) — this component provides the
 * consistent legend layout so all apps' charts look identical.
 *
 * Each item renders a small color swatch, a label, and an optional
 * right-aligned value. Wrap in a Card for the bordered look.
 */
export function ChartLegend({ items, title, className }: ChartLegendProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {title && <p className="text-sm font-bold text-foreground">{title}</p>}
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-[9px] w-[9px] shrink-0 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-foreground">{item.label}</span>
          </div>
          {item.value != null && (
            <span className="text-sm tabular-nums text-muted-foreground">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
