import * as React from "react";
import { cn } from "../lib/utils";

export interface KpiCardProps {
  label: string;
  value: React.ReactNode;
  /** Sub-line shown below the headline value (e.g. "3,486 items"). */
  hint?: React.ReactNode;
  /** Optional small chip on the top right (e.g. "↑ 5%" or "All Posted"). */
  badge?: React.ReactNode;
  /** Visual emphasis for the value. */
  tone?: "default" | "success" | "warning" | "destructive";
  /** Optional decorative accent strip on the left edge. */
  accentColor?: string;
  loading?: boolean;
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  default: "text-foreground",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

/**
 * Large stat tile with an uppercase tracking-wider label, a container-sized
 * tabular number, and optional hint/badge. Used in dashboards across both the
 * standalone team app and the Procore embed view.
 *
 * The card must get its width from its parent (a grid track or a flex item
 * with an explicit basis) — inline-size containment means it will not size
 * itself from the value text.
 */
export function KpiCard({
  label,
  value,
  hint,
  badge,
  tone = "default",
  accentColor,
  loading,
  className,
}: KpiCardProps) {
  return (
    <div
      // `container-type: inline-size` lets the value below size itself off the
      // card's own width rather than the viewport, so a 5- or 6-up KPI row
      // shrinks the number instead of clipping it. Set inline because the
      // consuming apps are on Tailwind 3.4 without the container-query plugin.
      style={{ containerType: "inline-size" }}
      className={cn("relative overflow-hidden rounded-lg border bg-card p-5 shadow-sm", className)}
    >
      {accentColor && (
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-1.5"
          style={{ backgroundColor: accentColor }}
        />
      )}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>
      <p
        className={cn(
          // Caps at the historical text-4xl (2.25rem) on roomy cards and
          // scales down to 1.125rem on narrow ones. 17cqi fits an 11-char
          // currency string ("$12,345,678") inside the card's content box
          // with headroom at every column count the apps use (4/5/6-up).
          "mt-3 text-[clamp(1.125rem,17cqi,2.25rem)] font-semibold leading-tight tracking-tight tabular-nums",
          TONE_CLASSES[tone],
        )}
      >
        {loading ? <span className="text-muted-foreground">…</span> : value}
      </p>
      {hint != null && (
        <p className="mt-1.5 text-sm text-muted-foreground">{loading ? " " : hint}</p>
      )}
    </div>
  );
}
