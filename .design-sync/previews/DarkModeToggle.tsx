import React from "react";
import { DarkModeToggle } from "@sjhamill/ui";

export function LightMode() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <DarkModeToggle dark={false} onToggle={() => {}} />
      <span className="text-sm text-muted-foreground">Light mode</span>
    </div>
  );
}

export function DarkMode() {
  return (
    <div className="dark" style={{ display: "flex", alignItems: "center", gap: 12, background: "hsl(247 56% 5%)", padding: 16, borderRadius: 8 }}>
      <DarkModeToggle dark={true} onToggle={() => {}} />
      <span style={{ color: "hsl(0 0% 98%)", fontSize: 14 }}>Dark mode</span>
    </div>
  );
}
