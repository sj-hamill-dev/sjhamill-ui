/**
 * Public surface for @sjhamill/ui.
 *
 * Consumers import from the root:
 *
 *   import { Button, Card, cn, formatCurrency } from "@sjhamill/ui";
 *
 * The Tailwind preset and the global stylesheet are also exposed as
 * subpath exports — see package.json "exports" and the README.
 */

// Components
export { Button, buttonVariants, type ButtonProps } from "./components/button";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/card";
export { Badge, badgeVariants, type BadgeProps } from "./components/badge";
export { Alert, AlertTitle, AlertDescription } from "./components/alert";
export { KpiCard, type KpiCardProps } from "./components/kpi-card";
export { StatusBadge, type StatusBadgeProps } from "./components/status-badge";
export { Logo, type LogoProps } from "./components/logo";
export { DarkModeToggle, type DarkModeToggleProps } from "./components/dark-mode-toggle";

// New shared primitives
export {
  AppShell,
  SidebarNav,
  type AppShellProps,
  type SidebarNavProps,
  type SidebarNavLinkProps,
  type NavItem,
} from "./components/app-shell";
export { PageHeader, type PageHeaderProps } from "./components/page-header";
export { AlertBanner, type AlertBannerProps } from "./components/alert-banner";
export {
  DataTable,
  type DataTableProps,
  type DataTableColumn,
  type DataTableFilterTab,
} from "./components/data-table";
export {
  ChartLegend,
  type ChartLegendProps,
  type ChartLegendItem,
} from "./components/chart-legend";

// Settings shell + sidebar footer (2026-08-04)
export { Avatar, type AvatarProps, type AvatarSize } from "./components/avatar";
export { RoleBadge, type RoleBadgeProps, type Role } from "./components/role-badge";
export { AccountCard, type AccountCardProps } from "./components/account-card";
export {
  ViewAsPicker,
  type ViewAsPickerProps,
  type ViewAsTarget,
} from "./components/view-as-picker";
export { ViewAsBanner, type ViewAsBannerProps } from "./components/view-as-banner";
export {
  TeamRolesTable,
  type TeamRolesTableProps,
  type TeamMember,
} from "./components/team-roles-table";
export {
  SettingsPage,
  SettingsSection,
  SettingsToggle,
  SettingsSelectRow,
  AboutCard,
  type SettingsPageProps,
  type SettingsSectionProps,
  type SettingsToggleProps,
  type SettingsSelectRowProps,
  type SettingsSelectOption,
  type AboutCardProps,
  type AboutLink,
} from "./components/settings-page";
export { SidebarFooter, type SidebarFooterProps } from "./components/sidebar-footer";

// Hooks
export { useDarkMode } from "./hooks/use-dark-mode";

// Utilities & formatters
export {
  cn,
  formatCurrency,
  formatCompactCurrency,
  formatNumber,
  formatCompactNumber,
  formatPercent,
  formatDate,
  formatDateShort,
  formatRelativeTime,
  stripProjectPrefix,
  CHART_COLORS,
  TABLEAU_10,
  COST_TYPE_COLORS,
  STATUS_COLORS,
} from "./lib/utils";
