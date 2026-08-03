import React from "react";
import { StatusBadge } from "@sjhamill/ui";

export function KnownStatuses() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <StatusBadge status="posted" />
      <StatusBadge status="pending" />
      <StatusBadge status="failed" />
      <StatusBadge status="skipped" />
      <StatusBadge status="duplicate" />
    </div>
  );
}

export function UnknownStatus() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <StatusBadge status="unposted" />
      <StatusBadge status="reviewing" />
    </div>
  );
}
