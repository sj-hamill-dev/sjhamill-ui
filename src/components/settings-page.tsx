import * as React from "react";
import { cn } from "../lib/utils";

// ---------------------------------------------------------------------------
// SettingsPage
// ---------------------------------------------------------------------------

export interface SettingsPageProps {
  title?: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Standard settings-page layout: header (title + subtitle) followed by a
 * vertical stack of `SettingsSection`s. Drop this inside `AppShell`'s
 * content area.
 */
export function SettingsPage({
  title = "Settings",
  subtitle = "Manage your account, team access, and app preferences.",
  children,
  className,
}: SettingsPageProps) {
  return (
    <div className={cn("flex flex-col gap-7 bg-muted/50 p-9", className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SettingsSection
// ---------------------------------------------------------------------------

export interface SettingsSectionProps {
  title: string;
  /** Optional description shown under the title. */
  description?: React.ReactNode;
  /** Right-side accessory shown next to the title (e.g. an "Admin Only" pill). */
  accessory?: React.ReactNode;
  /** Right-side action shown next to the accessory (e.g. an "+ Invite User" button). */
  action?: React.ReactNode;
  /** Section body content. When omitted, the section renders header-only (rare). */
  children?: React.ReactNode;
  /** When true, the section body has no built-in padding — use for content that owns its own layout (e.g. `TeamRolesTable`). */
  bodyFlush?: boolean;
  className?: string;
}

/**
 * A bordered card with a header (title + optional description + optional
 * right-side accessory / action) and a body slot. Compose these inside
 * `SettingsPage` to build the full page.
 */
export function SettingsSection({
  title,
  description,
  accessory,
  action,
  children,
  bodyFlush = false,
  className,
}: SettingsSectionProps) {
  return (
    <section
      className={cn("overflow-hidden rounded-lg border bg-card text-card-foreground", className)}
    >
      <header className="flex items-start justify-between gap-4 border-b px-5 py-4">
        <div>
          <div className="text-base font-bold text-foreground">{title}</div>
          {description && <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>}
        </div>
        {(accessory || action) && (
          <div className="flex shrink-0 items-center gap-2">
            {accessory}
            {action}
          </div>
        )}
      </header>
      {children && <div className={cn(bodyFlush ? "" : "flex flex-col gap-4 p-5")}>{children}</div>}
    </section>
  );
}

// ---------------------------------------------------------------------------
// SettingsToggle
// ---------------------------------------------------------------------------

export interface SettingsToggleProps {
  label: string;
  description?: React.ReactNode;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Label + description on the left, switch on the right. The switch is a
 * button with `role="switch"` and `aria-checked` — no native checkbox.
 */
export function SettingsToggle({
  label,
  description,
  checked,
  onChange,
  disabled,
  className,
}: SettingsToggleProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div>
        <div className="text-sm font-semibold text-foreground">{label}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          checked ? "bg-primary" : "bg-secondary",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5",
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SettingsSelectRow
// ---------------------------------------------------------------------------

export interface SettingsSelectOption {
  value: string;
  label: string;
}

export interface SettingsSelectRowProps {
  label: string;
  description?: React.ReactNode;
  value: string;
  options: SettingsSelectOption[];
  onChange: (next: string) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Label + description on the left, styled native `<select>` on the right.
 * Used for preferences like "Default Landing Page" or "Number Format".
 */
export function SettingsSelectRow({
  label,
  description,
  value,
  options,
  onChange,
  disabled,
  className,
}: SettingsSelectRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div>
        <div className="text-sm font-semibold text-foreground">{label}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className={cn(
            "cursor-pointer appearance-none rounded-md border border-input bg-background py-1.5 pl-3 pr-8 text-xs text-foreground",
            "focus:outline-none focus:ring-1 focus:ring-ring",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          ▾
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AboutCard
// ---------------------------------------------------------------------------

export interface AboutLink {
  label: string;
  href: string;
}

export interface AboutCardProps {
  appName: string;
  version: string;
  /** Multi-line credit text — e.g. `<>SJ Hamill Construction<br />Built by ...</>`. */
  credit?: React.ReactNode;
  links?: AboutLink[];
  className?: string;
}

/**
 * App identity + version + credits + external links. Bottom card of the
 * Settings page. Renders as a bordered card so it can sit outside a
 * `SettingsSection`, or drop it inside one with `bodyFlush` for a nested look.
 */
const DEFAULT_CREDIT = (
  <>
    SJ Hamill Construction
    <br />
    Built by Valery Briceno Velez.
  </>
);

export function AboutCard({ appName, version, credit = DEFAULT_CREDIT, links, className }: AboutCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border bg-card p-5 text-card-foreground",
        className,
      )}
    >
      <div>
        <div className="text-base font-bold text-foreground">{appName}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">Version {version}</div>
        {credit && <div className="mt-1.5 text-xs text-muted-foreground">{credit}</div>}
      </div>
      {links && links.length > 0 && (
        <div className="flex shrink-0 gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium text-primary hover:underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
