import * as React from "react";
import { cn } from "../lib/utils";

export interface PageHeaderProps {
  /** Page title — the large heading. */
  title: string;
  /** Optional one-line description below the title. */
  subtitle?: React.ReactNode;
  /** Action buttons rendered on the right side of the header. */
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Standard page header with a title, optional subtitle, and a right-aligned
 * action slot. Used at the top of every page across all apps.
 */
export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </div>
  );
}
