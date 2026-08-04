import * as React from "react";
import { cn } from "../lib/utils";
import { Avatar } from "./avatar";
import { RoleBadge, type Role } from "./role-badge";

export interface ViewAsTarget {
  id: string;
  name: string;
  email: string;
  role: Role;
  /** 1–2 character avatar initials. */
  initials: string;
  /** Optional avatar background color. Defaults to a deterministic pick from TABLEAU_10. */
  avatarColor?: string;
  /** Optional short hint shown after the role pill, e.g. "4 projects". */
  hint?: string;
}

export interface ViewAsPickerProps {
  /** The signed-in admin's own identity. */
  self: ViewAsTarget;
  /** Whichever target is currently active (may be `self` or someone from `targets`). */
  currentTarget: ViewAsTarget;
  /** Users the admin can impersonate. Should NOT include `self`. */
  targets: ViewAsTarget[];
  /** Called when the admin clicks "View As →" on a target row. */
  onSelect: (target: ViewAsTarget) => void;
  /** Called when the admin returns to their own view. Required when `currentTarget !== self`. */
  onExit?: () => void;
  /** Optional footer note. Defaults to a standard explanation of the View-As banner behavior. */
  footerNote?: React.ReactNode;
  className?: string;
}

const DEFAULT_FOOTER =
  'When viewing as another user, a banner appears at the top of every page. Click "Exit View-As" to return to your admin view.';

/**
 * Admin-only picker for impersonating another user. Sits inside a
 * `SettingsSection` (which owns the "Admin Only" pill and heading).
 *
 * Renders three regions:
 *  1. A "Currently viewing as" state card at the top.
 *  2. A labeled list of switchable targets. Self is always the first row.
 *  3. A footer note explaining the banner behavior.
 *
 * When `currentTarget !== self`, the self-row exposes a "Switch back" link
 * that calls `onExit`; the currently-active target renders a highlighted
 * "Viewing As" chip instead of a "View As →" button.
 */
export function ViewAsPicker({
  self,
  currentTarget,
  targets,
  onSelect,
  onExit,
  footerNote = DEFAULT_FOOTER,
  className,
}: ViewAsPickerProps) {
  const isSelfActive = currentTarget.id === self.id;

  return (
    <div className={cn("flex flex-col gap-3.5 p-5", className)}>
      {/* Current state banner */}
      <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3">
        <Avatar initials={currentTarget.initials} color={currentTarget.avatarColor} size="lg" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">
            Currently viewing as:{" "}
            <span className="text-primary">
              {isSelfActive ? "Yourself" : currentTarget.name}
              {" ("}
              {roleLabel(currentTarget.role)}
              {")"}
            </span>
          </div>
          {currentTarget.hint && (
            <div className="text-xs text-muted-foreground">{currentTarget.hint}</div>
          )}
        </div>
      </div>

      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Available Targets
      </div>

      <div className="flex flex-col gap-1.5">
        <TargetRow
          target={self}
          isSelf
          isActive={isSelfActive}
          onSelect={onExit ?? (() => onSelect(self))}
        />
        {targets.map((t) => (
          <TargetRow
            key={t.id}
            target={t}
            isActive={t.id === currentTarget.id}
            onSelect={() => onSelect(t)}
          />
        ))}
      </div>

      {footerNote && <div className="text-xs text-muted-foreground">{footerNote}</div>}
    </div>
  );
}

interface TargetRowProps {
  target: ViewAsTarget;
  isActive: boolean;
  isSelf?: boolean;
  onSelect: () => void;
}

function TargetRow({ target, isActive, isSelf, onSelect }: TargetRowProps) {
  const activeClass = isSelf
    ? "border-2 border-primary bg-primary/5"
    : "border-2 border-warning bg-warning/5";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border px-3.5 py-2.5",
        isActive ? activeClass : "border-border bg-card",
      )}
    >
      <Avatar initials={target.initials} color={target.avatarColor} size="lg" />
      <div className="flex-1">
        <div className="text-sm font-semibold text-foreground">
          {isSelf ? `Self (${roleLabel(target.role)})` : target.name}
        </div>
        {isSelf ? (
          <div className="text-xs text-muted-foreground">{target.email}</div>
        ) : (
          <div className="mt-0.5 flex items-center gap-1.5">
            <RoleBadge role={target.role} />
            <span className="text-xs text-muted-foreground">
              {target.email}
              {target.hint ? ` · ${target.hint}` : ""}
            </span>
          </div>
        )}
      </div>

      {isActive ? (
        <ActiveChip isSelf={isSelf} />
      ) : (
        <button
          type="button"
          onClick={onSelect}
          className={cn(
            "shrink-0 rounded-md border border-input bg-background px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {isSelf ? "Switch back" : "View As →"}
        </button>
      )}
    </div>
  );
}

function ActiveChip({ isSelf }: { isSelf?: boolean }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold",
        isSelf ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning",
      )}
    >
      {isSelf ? "Current" : "Viewing As"}
    </span>
  );
}

function roleLabel(role: Role): string {
  const map: Record<string, string> = {
    admin: "Admin",
    executive: "Executive",
    pm: "PM",
    viewer: "Viewer",
  };
  return map[role] ?? role;
}
