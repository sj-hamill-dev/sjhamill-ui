import React from "react";
import { Badge } from "@sjhamill/ui";

export function Variants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="success">Posted</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

export function InContext() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="text-sm font-semibold">Sync Status</span>
        <Badge variant="success">3,486 Posted</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="text-sm font-semibold">Exceptions</span>
        <Badge variant="destructive">12 Failed</Badge>
      </div>
    </div>
  );
}
