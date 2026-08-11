import React from "react";
import { RoleBadge } from "@sjhamill/ui";

export function Roles() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <RoleBadge role="admin" />
      <RoleBadge role="executive" />
      <RoleBadge role="pm" />
      <RoleBadge role="viewer" />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <RoleBadge role="admin" size="sm" />
      <RoleBadge role="admin" size="md" />
    </div>
  );
}

export function CustomLabel() {
  return <RoleBadge role="pm" label="Project Manager" />;
}
