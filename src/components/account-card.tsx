import * as React from "react";
import { cn } from "../lib/utils";
import { Avatar } from "./avatar";
import { RoleBadge, type Role } from "./role-badge";

export interface AccountCardProps {
  email: string;
  role: Role;
  /** 1–2 character avatar initials. */
  avatarInitials: string;
  /** e.g. "Signed in via Google". Shown on the right. */
  authProvider?: string;
  /** Optional one-line description under the email/role row. */
  description?: React.ReactNode;
  className?: string;
}

/**
 * Read-only card summarizing the current user's identity. Meant to sit
 * inside a `SettingsSection` — supply just the section-level chrome, this
 * component owns the interior layout.
 */
export function AccountCard({
  email,
  role,
  avatarInitials,
  authProvider,
  description,
  className,
}: AccountCardProps) {
  return (
    <div className={cn("flex items-center gap-5 p-5", className)}>
      <Avatar initials={avatarInitials} size="xl" />
      <div className="flex-1">
        <div className="text-sm font-semibold text-foreground">{email}</div>
        <div className="mt-1 flex items-center gap-2">
          <RoleBadge role={role} />
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      </div>
      {authProvider && (
        <div className="text-xs text-muted-foreground">Signed in via {authProvider}</div>
      )}
    </div>
  );
}
