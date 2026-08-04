import * as React from "react";
import { cn } from "../lib/utils";
import { DarkModeToggle } from "./dark-mode-toggle";

export interface SidebarFooterProps {
  /** Email of the signed-in user. Rendered at the bottom, truncated to fit. */
  userEmail: string;
  /** Route the Settings link points at. Default `/settings`. */
  settingsHref?: string;
  /**
   * Intercept the Settings-link click (call `e.preventDefault()` then route
   * yourself). Use for SPA routers. When omitted, the link behaves as a plain
   * anchor.
   */
  onSettingsClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Whether dark mode is currently active — passed through to `DarkModeToggle`. */
  dark: boolean;
  /** Called when the dark-mode toggle is clicked. */
  onToggleDark: () => void;
  /** Optional extra items rendered above the email (e.g. a "Help" link). */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Opinionated sidebar footer: a Settings link, the `DarkModeToggle`, and the
 * current user's email. Pass this into `AppShell`'s existing `sidebarFooter`
 * prop so every internal app has the same sidebar chrome.
 *
 * Colors resolve through `--sidebar-foreground` — this component is designed
 * to sit on the navy sidebar background, not the page background.
 */
export function SidebarFooter({
  userEmail,
  settingsHref = "/settings",
  onSettingsClick,
  dark,
  onToggleDark,
  children,
  className,
}: SidebarFooterProps) {
  return (
    <div className={cn("mt-auto flex flex-col gap-2 text-sidebar-foreground", className)}>
      {children}

      <div className="flex items-center justify-between gap-2 border-t border-sidebar-foreground/10 pt-3">
        <a
          href={settingsHref}
          onClick={onSettingsClick}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-sidebar-foreground/80 transition-colors",
            "hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground",
          )}
        >
          <SettingsIcon className="h-4 w-4" />
          <span>Settings</span>
        </a>
        <DarkModeToggle
          dark={dark}
          onToggle={onToggleDark}
          className="text-sidebar-foreground/60 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
        />
      </div>

      <div className="truncate text-[11px] text-sidebar-foreground/50" title={userEmail}>
        {userEmail}
      </div>
    </div>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}
