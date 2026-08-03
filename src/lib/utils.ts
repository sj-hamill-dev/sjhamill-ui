/**
 * Shared utilities for SJ Hamill internal frontends.
 *
 * If a helper is genuinely cross-app — formatters, the cn() className helper,
 * chart color palettes — it lives here. App-specific helpers (e.g. anything
 * that knows about procore_direct_costs_sync columns) belongs in the app's
 * own src/lib/.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conflict resolution.
 *
 *   cn("px-2 py-1", "px-4")  →  "py-1 px-4"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------------------------
// Number / currency / date formatters
// ---------------------------------------------------------------------------

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * @deprecated Use formatCurrency instead. Kept as an alias so existing
 * call sites don't break — always returns the full dollar amount now.
 */
export function formatCompactCurrency(value: number | null | undefined): string {
  return formatCurrency(value);
}

export function formatNumber(value: number | null | undefined): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCompactNumber(value: number | null | undefined): string {
  if (value == null) return "—";
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (abs >= 10_000) return `${(value / 1_000).toFixed(1)}K`;
  return formatNumber(value);
}

export function formatPercent(value: number | null | undefined, fractionDigits = 1): string {
  if (value == null || isNaN(value)) return "—";
  return `${(value * 100).toFixed(fractionDigits)}%`;
}

/**
 * Strips a leading project-number prefix like "23-60 " or "24-09 " from a
 * project name so we don't show the number twice when it's already in a
 * separate column.
 */
export function stripProjectPrefix(name: string | null | undefined): string {
  if (!name) return "";
  return name.replace(/^\d{2}-\d{2,3}\s+/, "").trim() || name;
}

/** Human-friendly relative time: "2 hours ago", "yesterday", "Apr 15". */
export function formatRelativeTime(value: string | null | undefined): string {
  if (!value) return "—";
  const then = new Date(value).getTime();
  if (Number.isNaN(then)) return "—";
  const diffSec = Math.round((Date.now() - then) / 1000);
  const abs = Math.abs(diffSec);
  if (abs < 60) return diffSec >= 0 ? "just now" : "in a few seconds";
  if (abs < 3600) {
    const m = Math.round(abs / 60);
    return `${m} minute${m === 1 ? "" : "s"} ${diffSec >= 0 ? "ago" : "from now"}`;
  }
  if (abs < 86_400) {
    const h = Math.round(abs / 3600);
    return `${h} hour${h === 1 ? "" : "s"} ${diffSec >= 0 ? "ago" : "from now"}`;
  }
  if (abs < 7 * 86_400) {
    const d = Math.round(abs / 86_400);
    if (d === 1) return diffSec >= 0 ? "yesterday" : "tomorrow";
    return `${d} day${d === 1 ? "" : "s"} ${diffSec >= 0 ? "ago" : "from now"}`;
  }
  return formatDateShort(value);
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US");
  }
  return new Date(value).toLocaleString("en-US");
}

export function formatDateShort(value: string | null | undefined): string {
  if (!value) return "—";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Chart / status color palettes
// ---------------------------------------------------------------------------

/**
 * Brand-aligned palette for chrome (header, accents). Charts use the more
 * distinct Tableau 10 palette below for better categorical separation —
 * keeping brand navy only for the page chrome.
 */
export const CHART_COLORS = {
  primary: "#0b2954",
  slate: "#0f172a",
  gray: "#364151",
  accent: "#f59e0b",
  coolGray: "#d1dae5",
  success: "#1f9d55",
  warning: "#d97706",
  danger: "#dc2626",
} as const;

/**
 * Tableau 10 — high-contrast categorical palette used for charts.
 * Order is the canonical Tableau 10 order so adjacent series stay distinct.
 */
export const TABLEAU_10 = [
  "#4E79A7", // blue
  "#F28E2B", // orange
  "#E15759", // red
  "#76B7B2", // teal
  "#59A14F", // green
  "#EDC948", // yellow
  "#B07AA1", // purple
  "#FF9DA7", // pink
  "#9C755F", // brown
  "#BAB0AC", // gray
] as const;

/**
 * Stable color assignment for the three Procore direct cost types.
 *   payroll = blue   (#4E79A7)
 *   invoice = orange (#F28E2B)
 *   expense = teal   (#76B7B2)
 */
export const COST_TYPE_COLORS: Record<string, string> = {
  payroll: TABLEAU_10[0],
  invoice: TABLEAU_10[1],
  expense: TABLEAU_10[3],
};

/** Stable color assignment for sync_status values. */
export const STATUS_COLORS: Record<string, string> = {
  posted: CHART_COLORS.success,
  pending: CHART_COLORS.warning,
  failed: CHART_COLORS.danger,
  skipped: CHART_COLORS.coolGray,
  duplicate: CHART_COLORS.gray,
  unposted: TABLEAU_10[6],
};
