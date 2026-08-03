import * as React from "react";
import { cn } from "../lib/utils";

// ---------------------------------------------------------------------------
// Column definition
// ---------------------------------------------------------------------------

export interface DataTableColumn<T> {
  /** Unique key for this column — used as the React key and sort identifier. */
  key: string;
  /** Column header label. */
  header: string;
  /** Render the cell content for a row. */
  cell: (row: T, index: number) => React.ReactNode;
  /** Right-align this column (numbers / currency). Default false. */
  align?: "left" | "right";
  /** Whether this column is sortable. Default false. */
  sortable?: boolean;
  /** Optional fixed width (Tailwind class like "w-[100px]"). */
  width?: string;
}

// ---------------------------------------------------------------------------
// Filter tab definition
// ---------------------------------------------------------------------------

export interface DataTableFilterTab {
  /** Unique key for this filter. */
  key: string;
  /** Display label. */
  label: string;
  /** Optional count badge shown after the label. */
  count?: number;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DataTableProps<T> {
  /** Column definitions. */
  columns: DataTableColumn<T>[];
  /** Row data. */
  data: T[];
  /** Unique key extractor for each row. */
  rowKey: (row: T, index: number) => string | number;

  // Toolbar
  /** Filter tabs rendered in the toolbar (e.g. All / Posted / Pending). */
  filterTabs?: DataTableFilterTab[];
  /** Currently active filter tab key. */
  activeFilter?: string;
  /** Callback when a filter tab is clicked. */
  onFilterChange?: (key: string) => void;
  /** Placeholder text for the search input. */
  searchPlaceholder?: string;
  /** Current search value. */
  searchValue?: string;
  /** Callback when search input changes. */
  onSearchChange?: (value: string) => void;
  /** Extra toolbar content (e.g. Export button) rendered after search. */
  toolbarActions?: React.ReactNode;

  // Sorting
  /** Currently sorted column key. */
  sortKey?: string;
  /** Sort direction. */
  sortDir?: "asc" | "desc";
  /** Callback when a sortable column header is clicked. */
  onSort?: (key: string) => void;

  // Pagination
  /** Total row count (may differ from data.length if paginated server-side). */
  totalCount?: number;
  /** 1-indexed page number. */
  page?: number;
  /** Rows per page. */
  pageSize?: number;
  /** Callback when page changes. */
  onPageChange?: (page: number) => void;

  /** Optional click handler for a row. */
  onRowClick?: (row: T, index: number) => void;
  /** Callback to determine row background class (e.g. for tinting failed rows). */
  rowClassName?: (row: T, index: number) => string | undefined;
  /** Title shown in the toolbar (e.g. "Source Transactions"). */
  title?: string;
  /** Subtitle shown next to the title (e.g. "4,352 total"). */
  titleHint?: React.ReactNode;

  className?: string;
}

/**
 * Configurable data table with toolbar (filter tabs + search), sortable
 * headers, pagination footer, and row click support. Columns, rows, filters,
 * and all behaviour are passed as props from the consumer app — the component
 * owns only the chrome.
 *
 * Conventions baked in:
 * - Right-aligned numbers/currency (via column.align)
 * - Sort arrow on the active column only
 * - Total count + Prev/Next footer (never "page 3 of ?")
 * - Alternating row tint on hover
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  filterTabs,
  activeFilter,
  onFilterChange,
  searchPlaceholder = "Search…",
  searchValue,
  onSearchChange,
  toolbarActions,
  sortKey,
  sortDir = "asc",
  onSort,
  totalCount,
  page = 1,
  pageSize = 50,
  onPageChange,
  onRowClick,
  rowClassName,
  title,
  titleHint,
  className,
}: DataTableProps<T>) {
  const total = totalCount ?? data.length;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const hasNext = end < total;
  const hasPrev = page > 1;

  return (
    <div className={cn("overflow-hidden rounded-lg border bg-card shadow-sm", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
        <div className="flex items-center gap-3">
          {title && (
            <div className="text-sm font-bold text-foreground">
              {title}
              {titleHint && (
                <span className="ml-1.5 font-normal text-muted-foreground">{titleHint}</span>
              )}
            </div>
          )}
          {filterTabs && filterTabs.length > 0 && (
            <div className="flex gap-0.5 rounded-md bg-muted p-0.5">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onFilterChange?.(tab.key)}
                  className={cn(
                    "rounded-[5px] px-2.5 py-1.5 text-xs font-semibold transition-colors",
                    activeFilter === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                  {tab.count != null && <span className="ml-1 opacity-70">({tab.count})</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onSearchChange != null && (
            <input
              type="text"
              value={searchValue ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="min-w-[150px] rounded-md border bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          )}
          {toolbarActions}
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortKey === col.key;
              const arrow = isSorted ? (sortDir === "asc" ? " ↑" : " ↓") : "";
              return (
                <th
                  key={col.key}
                  className={cn(
                    "border-b px-5 py-2.5 text-[10.5px] font-bold uppercase tracking-wider",
                    col.align === "right" ? "text-right" : "text-left",
                    isSorted ? "border-b-2 border-primary text-primary" : "text-muted-foreground",
                    col.sortable && "cursor-pointer select-none",
                    col.width,
                  )}
                  onClick={col.sortable ? () => onSort?.(col.key) : undefined}
                >
                  {col.header}
                  {arrow}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={rowKey(row, i)}
              className={cn(
                "transition-colors",
                i % 2 === 0 ? "bg-card" : "bg-muted/30",
                onRowClick && "cursor-pointer hover:bg-accent/50",
                rowClassName?.(row, i),
              )}
              onClick={onRowClick ? () => onRowClick(row, i) : undefined}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "border-b border-border/50 px-5 py-2.5",
                    col.align === "right" ? "text-right tabular-nums" : "text-left",
                    col.width,
                  )}
                >
                  {col.cell(row, i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-5 py-2.5">
        <span className="text-xs text-muted-foreground">
          Showing {start}–{end} of {total.toLocaleString()}
        </span>
        <div className="flex gap-1.5">
          <button
            disabled={!hasPrev}
            onClick={() => onPageChange?.(page - 1)}
            className="rounded-md border px-2 py-1 text-xs font-semibold text-foreground disabled:text-muted-foreground disabled:opacity-50"
          >
            ← Prev
          </button>
          <button
            disabled={!hasNext}
            onClick={() => onPageChange?.(page + 1)}
            className="rounded-md border px-2 py-1 text-xs font-semibold text-foreground disabled:text-muted-foreground disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
