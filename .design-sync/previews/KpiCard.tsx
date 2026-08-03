import React from "react";
import { KpiCard, Badge } from "@sjhamill/ui";

export function DefaultTone() {
  return (
    <div style={{ maxWidth: 280 }}>
      <KpiCard
        label="Total Direct Costs"
        value="$1,234,567"
        hint="3,486 transactions"
        badge={<Badge variant="secondary">All Posted</Badge>}
      />
    </div>
  );
}

export function Tones() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 580 }}>
      <KpiCard label="Revenue" value="$892,340" hint="Q3 2026" tone="success" />
      <KpiCard label="Pending" value="$45,120" hint="12 items" tone="warning" />
      <KpiCard label="Over Budget" value="$23,450" hint="3 cost codes" tone="destructive" />
      <KpiCard label="Total Hours" value="14,280" hint="All projects" />
    </div>
  );
}

export function WithAccent() {
  return (
    <div style={{ maxWidth: 280 }}>
      <KpiCard
        label="Payroll"
        value="$456,789"
        hint="1,204 entries"
        accentColor="#4E79A7"
      />
    </div>
  );
}

export function Loading() {
  return (
    <div style={{ maxWidth: 280 }}>
      <KpiCard label="Syncing Data" value="—" hint="Refreshing..." loading />
    </div>
  );
}
