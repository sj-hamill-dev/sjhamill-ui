import * as React from "react";
import { cn } from "../lib/utils";

// ---------------------------------------------------------------------------
// SidebarNav
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
  /** Whether this item is currently active. */
  active?: boolean;
  /** Optional badge (e.g. count) rendered to the right of the label. */
  badge?: React.ReactNode;
}

export interface SidebarNavProps {
  items: NavItem[];
  className?: string;
}

/**
 * Labeled navigation list for the sidebar. Each item renders as an anchor
 * with a small square indicator dot — active items get a white dot and
 * semibold text; inactive items get a muted dot and lighter text.
 *
 * Construction users don't memorise icon-only rails, so every item is a
 * readable label. Keep the list short (4–6 items).
 */
export function SidebarNav({ items, className }: SidebarNavProps) {
  return (
    <nav className={cn("flex flex-col gap-0.5", className)}>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
            item.active
              ? "bg-white/[.14] font-semibold text-sidebar-foreground"
              : "text-sidebar-foreground/70 hover:bg-white/[.08] hover:text-sidebar-foreground"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-[7px] w-[7px] shrink-0 rounded-sm",
              item.active ? "bg-sidebar-foreground" : "bg-sidebar-foreground/40"
            )}
          />
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge != null && (
            <span className="shrink-0 text-xs text-sidebar-foreground/60">
              {item.badge}
            </span>
          )}
        </a>
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// AppShell
// ---------------------------------------------------------------------------

export interface AppShellProps {
  /** Application name shown next to the logo in the sidebar header. */
  appName: string;
  /** Navigation items rendered in the sidebar. */
  navItems: NavItem[];
  /** Content rendered below the nav in the sidebar (e.g. user email, dark mode toggle). */
  sidebarFooter?: React.ReactNode;
  /** Whether the user's dark mode preference is active — controls the Logo variant. */
  dark?: boolean;
  /** When set, renders a "← Back to Tools" link above the nav pointing to this URL. */
  toolsHomeUrl?: string;
  /** Main page content. */
  children: React.ReactNode;
  className?: string;
}

/**
 * Full-page shell with a fixed navy sidebar and a scrollable content area.
 * The sidebar renders the SJ Hamill logo, an app name, a `SidebarNav`, and
 * an optional footer slot. Each consumer app passes its own navItems and
 * content; the chrome stays identical across apps.
 */
export function AppShell({
  appName,
  navItems,
  sidebarFooter,
  toolsHomeUrl,
  children,
  className,
}: AppShellProps) {
  return (
    <div className={cn("flex h-screen overflow-hidden", className)}>
      {/* Sidebar */}
      <aside className="flex w-[220px] shrink-0 flex-col gap-5 bg-sidebar p-5 text-sidebar-foreground">
        {/* Logo + app name */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-bold text-primary">
            SH
          </div>
          <span className="text-sm font-bold text-sidebar-foreground">
            {appName}
          </span>
        </div>

        {toolsHomeUrl && (
          <a
            href={toolsHomeUrl}
            className="flex items-center gap-1.5 text-xs text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
          >
            <span aria-hidden>←</span>
            <span>Back to Tools</span>
          </a>
        )}

        <SidebarNav items={navItems} />

        {sidebarFooter && (
          <div className="mt-auto text-xs text-sidebar-foreground/50">
            {sidebarFooter}
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
