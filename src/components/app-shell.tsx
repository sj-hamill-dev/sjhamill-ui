import * as React from "react";
import { cn } from "../lib/utils";
import { Logo } from "./logo";

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
  /** Optional icon rendered to the left of the label. */
  icon?: React.ReactNode;
}

/**
 * Shape of the link component consumers can pass to render nav items with
 * their router of choice (e.g. react-router `Link`). Default is `<a>`, which
 * triggers a full page reload — pass this for SPA-style client-side routing.
 */
export interface SidebarNavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export interface SidebarNavProps {
  items: NavItem[];
  className?: string;
  /** Override the anchor element used for each item. Defaults to `<a href>`. */
  linkComponent?: React.ComponentType<SidebarNavLinkProps>;
}

/**
 * Labeled navigation list for the sidebar. Each item renders as an anchor
 * with a small square indicator dot — active items get a white dot and
 * semibold text; inactive items get a muted dot and lighter text.
 *
 * Construction users don't memorise icon-only rails, so every item is a
 * readable label. Keep the list short (4–6 items).
 */
export function SidebarNav({ items, className, linkComponent }: SidebarNavProps) {
  const LinkComponent = linkComponent ?? DefaultLink;
  return (
    <nav className={cn("flex flex-col gap-0.5", className)}>
      {items.map((item) => (
        <LinkComponent
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
            item.active
              ? "bg-white/[.14] font-semibold text-sidebar-foreground"
              : "text-sidebar-foreground/70 hover:bg-white/[.08] hover:text-sidebar-foreground",
          )}
        >
          {item.icon != null ? (
            <span aria-hidden className="flex h-4 w-4 shrink-0 items-center justify-center">
              {item.icon}
            </span>
          ) : (
            <span
              aria-hidden
              className={cn(
                "h-[7px] w-[7px] shrink-0 rounded-sm",
                item.active ? "bg-sidebar-foreground" : "bg-sidebar-foreground/40",
              )}
            />
          )}
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge != null && (
            <span className="shrink-0 text-xs text-sidebar-foreground/60">{item.badge}</span>
          )}
        </LinkComponent>
      ))}
    </nav>
  );
}

function DefaultLink({ href, className, children }: SidebarNavLinkProps) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// AppShell
// ---------------------------------------------------------------------------

export const DEFAULT_TOOLS_HOME_URL = "https://tools.sjhamillconstruction.com";

export interface AppShellProps {
  /** Application name shown below the logo in the sidebar header. */
  appName: string;
  /** Navigation items rendered in the sidebar. */
  navItems: NavItem[];
  /** Content rendered below the nav in the sidebar (e.g. user email, dark mode toggle). */
  sidebarFooter?: React.ReactNode;
  /** Accepted for API compatibility and currently unused: the sidebar is dark
   * in both themes, so its logo does not vary with the theme. */
  dark?: boolean;
  /**
   * Renders a "← Back to Tools" link above the nav pointing to this URL.
   * Defaults to `https://tools.sjhamillconstruction.com`. Pass `false` to
   * suppress the link entirely.
   */
  toolsHomeUrl?: string | false;
  /** Override the anchor element used for nav items. Defaults to `<a href>`. */
  linkComponent?: React.ComponentType<SidebarNavLinkProps>;
  /**
   * Custom logo rendered above the app name in the sidebar header. When
   * omitted, the white SJ Hamill mark renders.
   *
   * The sidebar is dark in BOTH themes, so whatever you pass here must read
   * on navy. Do NOT key this to the page theme — see the comment at the
   * render site.
   */
  logo?: React.ReactNode;
  /** Main page content. */
  children: React.ReactNode;
  className?: string;
}

/**
 * Full-page shell with a fixed navy sidebar and a scrollable content area.
 * The sidebar renders the SJ Hamill logo, an app name, a `SidebarNav`, and
 * an optional footer slot. Each consumer app passes its own navItems and
 * content; the chrome stays identical across apps.
 *
 * Below the `md` breakpoint the sidebar collapses into a top bar with a
 * hamburger that opens the same sidebar as an overlay drawer. Desktop
 * rendering is unchanged.
 */
export function AppShell({
  appName,
  navItems,
  linkComponent,
  sidebarFooter,
  toolsHomeUrl = DEFAULT_TOOLS_HOME_URL,
  logo,
  children,
  className,
}: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Escape closes the drawer. Only bound while it's open.
  React.useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  // Always the white mark: the sidebar is dark in BOTH themes (--sidebar is
  // brand navy in light, slate ink in dark), so keying this to the page theme
  // painted the dark-ink logo onto navy and it vanished in light mode.
  const logoNode = logo ?? <Logo dark className="h-10 w-auto max-w-full object-contain" />;

  // Shared by the desktop aside and the mobile drawer so the two can't drift.
  const sidebarContent = (
    <>
      {/* Logo + app name */}
      <div className="flex flex-col items-center gap-2 border-b border-sidebar-foreground/10 pb-5 text-center">
        {logoNode}
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/70">
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

      <SidebarNav items={navItems} linkComponent={linkComponent} />

      {sidebarFooter && (
        <div className="mt-auto text-xs text-sidebar-foreground/50">{sidebarFooter}</div>
      )}
    </>
  );

  return (
    <div className={cn("flex h-screen overflow-hidden", className)}>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col gap-5 overflow-y-auto bg-sidebar p-5 text-sidebar-foreground md:flex">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            aria-hidden
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={`${appName} navigation`}
            className="absolute inset-y-0 left-0 flex w-64 flex-col gap-5 overflow-y-auto bg-sidebar p-5 text-sidebar-foreground shadow-xl"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-1.5 text-sidebar-foreground hover:bg-sidebar-foreground/10"
              >
                <CloseIcon />
              </button>
            </div>
            {/* Any nav activation dismisses the drawer. Capture on the wrapper
                rather than threading an onClick through SidebarNavLinkProps —
                consumers pass their own router Link and can't be relied on to
                forward it. */}
            <div
              className="contents"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setDrawerOpen(false);
              }}
            >
              {sidebarContent}
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-sidebar-foreground/10 bg-sidebar px-4 text-sidebar-foreground md:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="inline-flex items-center justify-center rounded-md border border-sidebar-foreground/20 bg-sidebar-foreground/5 p-1.5 text-sidebar-foreground hover:bg-sidebar-foreground/10"
          >
            <MenuIcon />
          </button>
          <span className="flex h-7 items-center [&_img]:h-7 [&_img]:w-auto">{logoNode}</span>
        </div>

        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="h-5 w-5"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="h-5 w-5"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
