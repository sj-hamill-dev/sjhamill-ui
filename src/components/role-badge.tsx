import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/** Canonical roles the design system has palette + copy for. Unknown strings fall back to a neutral pill. */
export type Role = "admin" | "executive" | "pm" | "viewer" | (string & {});

const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  executive: "Executive",
  pm: "PM",
  viewer: "Viewer",
};

const roleBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 font-semibold uppercase tracking-wider",
  {
    variants: {
      role: {
        admin: "bg-primary text-primary-foreground",
        executive: "bg-primary/10 text-primary",
        pm: "bg-warning/10 text-warning",
        viewer: "bg-muted text-muted-foreground",
        default: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "text-[10px]",
        md: "text-[11px] px-2.5 py-1",
      },
    },
    defaultVariants: {
      role: "default",
      size: "sm",
    },
  },
);

export interface RoleBadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "role">,
    Omit<VariantProps<typeof roleBadgeVariants>, "role"> {
  role: Role;
  /** Override the default capitalized label ("Admin", "PM", etc.). */
  label?: string;
}

/**
 * Compact role pill. Recognized `role` values (admin, executive, pm, viewer)
 * get brand-aligned colors; unknown values fall back to a neutral muted pill.
 * Provide `label` to override the built-in copy.
 */
export function RoleBadge({ role, label, size, className, ...props }: RoleBadgeProps) {
  const variant =
    role in ROLE_LABELS ? (role as "admin" | "executive" | "pm" | "viewer") : "default";
  const text = label ?? ROLE_LABELS[role] ?? role;
  return (
    <span className={cn(roleBadgeVariants({ role: variant, size }), className)} {...props}>
      {text}
    </span>
  );
}
