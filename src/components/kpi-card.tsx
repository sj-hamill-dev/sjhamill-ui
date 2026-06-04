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
 * Large stat tile with an uppercase tracking-wider label, a 4xl tabular
 * number, and optional hint/badge. Used in dashboards across both the
 * standalone team app and the Procore embed view.
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
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card p-5 shadow-sm",
        className
      )}
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
          "mt-3 text-4xl font-semibold tracking-tight tabular-nums",
          TONE_CLASSES[tone]
        )}
      >
        {loading ? <span className="text-muted-foreground">…</span> : value}
      </p>
      {hint != null && (
        <p className="mt-1.5 text-sm text-muted-foreground">
          {loading ? " " : hint}
        </p>
      )}
    </div>
  );
}
