import React from "react";
import { AppShell, PageHeader, KpiCard, Badge, Logo } from "@sjhamill/ui";

const NAV_ITEMS = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Transactions", href: "#", badge: "3,486" },
  { label: "Vendors", href: "#" },
  { label: "Reports", href: "#" },
];

// AppShell's default logo slot is `<Logo dark />`, which resolves
// /sjh-extended-logo-white.png from the consumer's public/ directory. The
// preview host has no public/, so the default renders broken here. Pass an
// explicit `logo` node with an inline SVG stand-in instead — same 3.02:1
// aspect ratio as the real mark, so sidebar sizing is faithful even though
// the artwork is not. See .design-sync/previews/Logo.tsx and NOTES.md.
const MARK_WHITE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDIgMTAwIiB3aWR0aD0iMzAyIiBoZWlnaHQ9IjEwMCI+PHRleHQgeD0iMCIgeT0iNTIiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCdUaW1lcyBOZXcgUm9tYW4nLHNlcmlmIiBmb250LXNpemU9IjQ2IiBsZXR0ZXItc3BhY2luZz0iMSIgZmlsbD0iI2ZmZmZmZiI+U0ogSEFNSUxMPC90ZXh0Pjx0ZXh0IHg9IjIiIHk9IjgwIiBmb250LWZhbWlseT0iSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTUiIGxldHRlci1zcGFjaW5nPSI3LjIiIGZpbGw9IiNmZmZmZmYiPkNPTlNUUlVDVElPTjwvdGV4dD48L3N2Zz4=";

export function FullLayout() {
  return (
    <div style={{ height: 480, border: "1px solid hsl(215 20% 86%)", borderRadius: 8, overflow: "hidden" }}>
      <AppShell
        appName="Direct Costs"
        navItems={NAV_ITEMS}
        toolsHomeUrl="#"
        logo={<Logo dark darkSrc={MARK_WHITE} className="h-10 w-auto max-w-full object-contain" />}
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
