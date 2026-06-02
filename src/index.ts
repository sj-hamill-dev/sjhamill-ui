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
