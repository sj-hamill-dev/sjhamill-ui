import { cn } from "../lib/utils";

export interface PageFooterProps {
  /** Company name. Defaults to "SJ Hamill Construction". */
  company?: string;
  /** Builder credit line. Defaults to "Built by Valery Briceno Velez". */
  credit?: string;
  className?: string;
}

/**
 * Minimal page footer rendered at the bottom of the main content area,
 * below all page content. Shows the company name and builder credit,
 * centered, with a top border.
 */
export function PageFooter({
  company = "SJ Hamill Construction",
  credit = "Built by Valery Briceno Velez",
  className,
}: PageFooterProps) {
  return (
    <footer className={cn("border-t py-6 text-center", className)}>
      <div className="text-xs text-muted-foreground">{company}</div>
      <div className="mt-0.5 text-xs font-semibold text-muted-foreground">{credit}</div>
    </footer>
  );
}
