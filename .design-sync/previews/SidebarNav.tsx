import React from "react";
import { SidebarNav } from "@sjhamill/ui";

export function WithActiveItem() {
  return (
    <div style={{ width: 200, background: "hsl(214 77% 19%)", padding: 12, borderRadius: 8 }}>
      <SidebarNav
        items={[
          { label: "Dashboard", href: "#", active: true },
          { label: "Transactions", href: "#", badge: "3,486" },
          { label: "Vendors", href: "#" },
          { label: "Reports", href: "#" },
        ]}
      />
    </div>
  );
}
