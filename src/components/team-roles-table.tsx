import * as React from "react";
import { cn } from "../lib/utils";
import { Avatar } from "./avatar";
import { DataTable, type DataTableColumn } from "./data-table";
import { RoleBadge, type Role } from "./role-badge";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  /** 1–2 character avatar initials. */
  initials: string;
  /** Optional avatar background color. Defaults to a deterministic pick from TABLEAU_10. */
  avatarColor?: string;
  /** Freeform label for the projects column, e.g. "All (17)" or "4 assigned". */
  projectsLabel?: string;
  /** Freeform label for the last-active column, e.g. "2 min ago". */
  lastActive?: string;
}

export interface TeamRolesTableProps {
  members: TeamMember[];
  /**
   * Called when the admin clicks the role cell for a member. The library
   * doesn't own the dropdown/menu — pass a callback that opens whatever role
   * picker your app already has. Provide `renderRoleCell` to override the
   * default cell rendering entirely.
   */
  onRoleClick?: (member: TeamMember) => void;
  /** Custom renderer for the role cell. Overrides the default outlined-chip look. */
  renderRoleCell?: (member: TeamMember) => React.ReactNode;
  /** Called when the "+ Invite User" button in the toolbar is clicked. Button is only rendered when this is provided. */
  onInvite?: () => void;
  className?: string;
}

/**
 * Thin `DataTable` wrapper with the Team & Roles columns from the Settings
 * mock pre-configured: User (avatar + email), Role (RoleBadge or outlined
 * chip), Projects, Last Active. The actual role-change dropdown is a
 * consumer concern — this wrapper only surfaces `onRoleClick(member)`.
 */
export function TeamRolesTable({
  members,
  onRoleClick,
  renderRoleCell,
  onInvite,
  className,
}: TeamRolesTableProps) {
  const columns: DataTableColumn<TeamMember>[] = [
    {
      key: "user",
      header: "User",
      cell: (m) => (
        <div className="flex items-center gap-2.5">
          <Avatar initials={m.initials} color={m.avatarColor} />
          <div>
            <div className="text-sm font-semibold text-foreground">{m.name}</div>
            <div className="text-xs text-muted-foreground">{m.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      width: "w-[140px]",
      cell: (m) => renderRoleCell?.(m) ?? <DefaultRoleCell member={m} onClick={onRoleClick} />,
    },
    {
      key: "projects",
      header: "Projects",
      width: "w-[140px]",
      cell: (m) => <span className="text-sm text-foreground">{m.projectsLabel ?? "—"}</span>,
    },
    {
      key: "lastActive",
      header: "Last Active",
      width: "w-[100px]",
      cell: (m) => <span className="text-xs text-muted-foreground">{m.lastActive ?? "—"}</span>,
    },
  ];

  const toolbarActions = onInvite ? (
    <button
      type="button"
      onClick={onInvite}
      className={cn(
        "rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-colors",
        "hover:bg-primary/90",
      )}
    >
      + Invite User
    </button>
  ) : undefined;

  return (
    <DataTable<TeamMember>
      className={className}
      columns={columns}
      data={members}
      rowKey={(m) => m.id}
      toolbarActions={toolbarActions}
    />
  );
}

interface DefaultRoleCellProps {
  member: TeamMember;
  onClick?: (m: TeamMember) => void;
}

function DefaultRoleCell({ member, onClick }: DefaultRoleCellProps) {
  if (!onClick) {
    return <RoleBadge role={member.role} />;
  }
  return (
    <button
      type="button"
      onClick={() => onClick(member)}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground",
        "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <span className="capitalize">{member.role}</span>
      <span aria-hidden className="text-muted-foreground">
        ▾
      </span>
    </button>
  );
}
