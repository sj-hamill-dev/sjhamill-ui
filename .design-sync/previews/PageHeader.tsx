import React from "react";
import { PageHeader, Button } from "@sjhamill/ui";

export function WithActions() {
  return (
    <div style={{ maxWidth: 640 }}>
      <PageHeader
        title="Direct Costs"
        subtitle="Q3 2026 — all active projects"
        actions={
          <>
            <Button variant="outline" size="sm">Export CSV</Button>
            <Button size="sm">Sync Now</Button>
          </>
        }
      />
    </div>
  );
}

export function TitleOnly() {
  return (
    <div style={{ maxWidth: 640 }}>
      <PageHeader title="Vendor Analytics" />
    </div>
  );
}
