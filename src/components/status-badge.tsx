import * as React from "react";
import { cn, STATUS_COLORS } from "../lib/utils";

export interface StatusBadgeProps {
  status: string;
  className?: string;
}

const TONE_CLASSES: Record<string, string> = {
  posted: "bg-success/15 text-success ring-1 ring-success/30",
  pending: "bg-warning/15 text-warning ring-1 ring-warning/30",
  failed: "bg-destructive/15 text-destructive ring-1 ring-destructive/30",
  skipped: "bg-muted text-muted-foreground ring-1 ring-border",
  duplicate: "bg-muted text-muted-foreground ring-1 ring-border",
};

/**
 * Compact status pill consistent with the brand palette + chart colors.
 * Falls back to a neutral chip with a colored dot for unknown statuses.
 *
 * Known statuses use a tinted background + matching ring; unknown
 * statuses get a muted background with a colored dot pulled from
 * STATUS_COLORS so the chip still carries semantic color signal.
 */
export function StatusBadge({ status, className }: StatusBadgeProps): React.ReactElement {
  const tone = TONE_CLASSES[status];
  if (tone) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium capitalize",
          tone,
          className
        )}
      >
        {status}
      </span>
    );
  }

  const dotColor = STATUS_COLORS[status] ?? "#94a3b8";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-sm font-medium capitalize text-muted-foreground ring-1 ring-border",
        className
      )}
    >
      <span
        aria-hidden
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      {status}
    </span>
  );
}
