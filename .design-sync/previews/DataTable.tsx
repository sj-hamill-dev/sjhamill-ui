import React from "react";
import { DataTable, StatusBadge } from "@sjhamill/ui";

const ROWS = [
  { id: "1", project: "23-60 Riverside Commons", vendor: "Apex Concrete LLC", amount: 45230.00, status: "posted" },
  { id: "2", project: "24-09 Harbor View Tower", vendor: "Meridian Electric", amount: 12750.50, status: "pending" },
  { id: "3", project: "24-09 Harbor View Tower", vendor: "Summit Steel Inc", amount: 89100.00, status: "posted" },
  { id: "4", project: "23-60 Riverside Commons", vendor: "Precision Plumbing", amount: 6480.25, status: "failed" },
  { id: "5", project: "24-12 Oakmont Plaza", vendor: "Apex Concrete LLC", amount: 31200.00, status: "posted" },
];

const COLUMNS = [
  { key: "project", header: "Project", cell: (r: typeof ROWS[0]) => r.project, sortable: true },
  { key: "vendor", header: "Vendor", cell: (r: typeof ROWS[0]) => r.vendor, sortable: true },
  { key: "amount", header: "Amount", cell: (r: typeof ROWS[0]) => `$${r.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, align: "right" as const, sortable: true },
  { key: "status", header: "Status", cell: (r: typeof ROWS[0]) => <StatusBadge status={r.status} /> },
];

const TABS = [
  { key: "all", label: "All", count: 5 },
  { key: "posted", label: "Posted", count: 3 },
  { key: "pending", label: "Pending", count: 1 },
  { key: "failed", label: "Failed", count: 1 },
];

export function FullFeatured() {
  return (
    <div style={{ maxWidth: 820 }}>
      <DataTable
        columns={COLUMNS}
        data={ROWS}
        rowKey={(r) => r.id}
        title="Source Transactions"
        titleHint="5 total"
        filterTabs={TABS}
        activeFilter="all"
        searchPlaceholder="Search vendors…"
        sortKey="amount"
        sortDir="desc"
        totalCount={5}
        page={1}
        pageSize={50}
      />
    </div>
  );
}
