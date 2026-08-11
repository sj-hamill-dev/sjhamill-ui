import React from "react";
import { Avatar } from "@sjhamill/ui";

export function Sizes() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar initials="VB" size="sm" />
      <Avatar initials="VB" size="md" />
      <Avatar initials="VB" size="lg" />
      <Avatar initials="VB" size="xl" />
    </div>
  );
}

export function DeterministicColors() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Avatar initials="JD" size="lg" />
      <Avatar initials="MK" size="lg" />
      <Avatar initials="AP" size="lg" />
      <Avatar initials="SH" size="lg" />
    </div>
  );
}

export function ExplicitColor() {
  return <Avatar initials="VB" size="lg" color="#4E79A7" />;
}
