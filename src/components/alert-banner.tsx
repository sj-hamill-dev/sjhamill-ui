import * as React from "react";
import { cn } from "../lib/utils";

export interface AlertBannerProps {
  /** The message content (can include <strong> for counts). */
  children: React.ReactNode;
  /** Visual tone — determines background/border/text color. */
  tone?: "warning" | "destructive" | "info";
  /** Text for the right-side action link (e.g. "Review →"). */
  actionLabel?: string;
  /** Callback when the action link is clicked. */
  onAction?: () => void;
  /** href for the action link — use instead of onAction for navigation. */
  actionHref?: string;
  className?: string;
}

const TONE_STYLES = {
  warning: {
    wrapper: "bg-warning/10 border-warning/30",
    dot: "bg-warning",
    text: "text-warning",
    action: "text-warning font-semibold",
  },
  destructive: {
    wrapper: "bg-destructive/10 border-destructive/30",
    dot: "bg-destructive",
    text: "text-destructive",
    action: "text-destructive font-semibold",
  },
  info: {
    wrapper: "bg-primary/5 border-primary/20",
    dot: "bg-primary",
    text: "text-primary",
    action: "text-primary font-semibold",
  },
} as const;

/**
 * A compact, horizontal alert banner with a status dot, message, and an
 * optional action link. Use for exception counts, sync warnings, and
 * action-needed notifications at the top of a page section.
 *
 * Different from the block-level `Alert` component — this is a single-line
 * banner designed to sit between the PageHeader and the main content.
 */
export function AlertBanner({
  children,
  tone = "warning",
  actionLabel,
  onAction,
  actionHref,
  className,
}: AlertBannerProps) {
  const styles = TONE_STYLES[tone];
  const ActionTag = actionHref ? "a" : "button";

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border px-4 py-3",
        styles.wrapper,
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span aria-hidden className={cn("h-2 w-2 shrink-0 rounded-full", styles.dot)} />
        <span className={cn("text-sm", styles.text)}>{children}</span>
      </div>
      {actionLabel && (
        <ActionTag
          className={cn("shrink-0 text-sm", styles.action)}
          onClick={onAction}
          {...(actionHref ? { href: actionHref } : {})}
        >
          {actionLabel}
        </ActionTag>
      )}
    </div>
  );
}
