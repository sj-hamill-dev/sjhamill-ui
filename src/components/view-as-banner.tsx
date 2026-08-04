import * as React from "react";
import { cn } from "../lib/utils";

export interface ViewAsBannerProps {
  /** Human label for the impersonated user, e.g. "Jake Daniels (PM)". */
  targetLabel: string;
  /** Optional short hint appended to the primary message, e.g. "4 projects visible". */
  permissionsHint?: string;
  /** The signed-in user (the actual admin). Shown in the secondary line. Falls back to a generic message when omitted. */
  signedInAs?: string;
  /** Called when the admin clicks "Exit View-As". */
  onExit: () => void;
  /**
   * Visual variant. `warning` (default) is used for the normal impersonating
   * state; `destructive` is used to surface a stale/failed target — in that
   * case supply the failure copy via `children`.
   */
  tone?: "warning" | "destructive";
  /**
   * Optional override for the primary message. When provided, the standard
   * "View-As mode. You're seeing the app as X" copy is replaced entirely.
   * Used by the stale-target error state.
   */
  children?: React.ReactNode;
  className?: string;
}

const TONE_STYLES = {
  warning: {
    wrapper: "bg-warning/10 border-warning/30",
    icon: "text-warning",
    title: "text-warning",
    secondary: "text-warning/80",
    button: "border-warning/30 text-warning",
  },
  destructive: {
    wrapper: "bg-destructive/10 border-destructive/30",
    icon: "text-destructive",
    title: "text-destructive",
    secondary: "text-destructive/80",
    button: "border-destructive/30 text-destructive",
  },
} as const;

/**
 * Full-width banner shown at the top of every page while an admin is
 * impersonating another user (View-As mode). Different from the block-level
 * `Alert` and the compact `AlertBanner` — this is specifically the View-As
 * chrome and always exposes an "Exit View-As" affordance on the right.
 *
 * Render this inside `AppShell`'s content area, above `PageHeader`.
 */
export function ViewAsBanner({
  targetLabel,
  permissionsHint,
  signedInAs,
  onExit,
  tone = "warning",
  children,
  className,
}: ViewAsBannerProps) {
  const styles = TONE_STYLES[tone];

  return (
    <div
      role="status"
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border px-5 py-3.5",
        styles.wrapper,
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <EyeIcon className={cn("h-4 w-4 shrink-0", styles.icon)} />
        <div>
          {children ?? (
            <>
              <div className={cn("text-sm font-semibold", styles.title)}>
                <span className="font-bold">View-As mode.</span> You&apos;re seeing the app as{" "}
                {targetLabel}
                {permissionsHint ? ` — ${permissionsHint}` : ""}.
              </div>
              <div className={cn("mt-0.5 text-xs", styles.secondary)}>
                {signedInAs
                  ? `You're still signed in as ${signedInAs}. Navigate normally — all pages will reflect ${targetLabel}'s permissions.`
                  : "You're still signed in as yourself. Navigate normally — all pages reflect the impersonated user's permissions."}
              </div>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onExit}
        className={cn(
          "shrink-0 rounded-md border bg-background px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-accent",
          styles.button,
        )}
      >
        Exit View-As
      </button>
    </div>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}
