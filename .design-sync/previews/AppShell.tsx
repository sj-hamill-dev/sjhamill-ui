import React from "react";
import { AppShell, PageHeader, KpiCard, Badge } from "@sjhamill/ui";

const NAV_ITEMS = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Transactions", href: "#", badge: "3,486" },
  { label: "Vendors", href: "#" },
  { label: "Reports", href: "#" },
];

export function FullLayout() {
  return (
    <div style={{ height: 480, border: "1px solid hsl(215 20% 86%)", borderRadius: 8, overflow: "hidden" }}>
      <AppShell
        appName="Direct Costs"
        navItems={NAV_ITEMS}
        toolsHomeUrl="#"
        sidebarFooter="valerybriceno@gmail.com"
      >
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          <PageHeader title="Dashboard" subtitle="Q3 2026 overview" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <KpiCard label="Total Costs" value="$1,234,567" hint="3,486 transactions" badge={<Badge variant="success">All Posted</Badge>} />
            <KpiCard label="Pending" value="$45,120" hint="12 items" tone="warning" />
            <KpiCard label="Failed" value="$6,480" hint="1 item" tone="destructive" />
          </div>
        </div>
      </AppShell>
    </div>
  );
}
