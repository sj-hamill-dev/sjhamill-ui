import React from "react";
import { SidebarFooter } from "@sjhamill/ui";

export function Default() {
  return (
    <div
      style={{
        width: 220,
        background: "hsl(214 77% 19%)",
        padding: 12,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        height: 160,
      }}
    >
      <SidebarFooter userEmail="vvelez@sjhamill.com" dark={false} onToggleDark={() => {}} />
    </div>
  );
}

export function DarkModeOn() {
  return (
    <div
      style={{
        width: 220,
        background: "hsl(214 77% 19%)",
        padding: 12,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        height: 160,
      }}
    >
      <SidebarFooter userEmail="jake.daniels@sjhamill.com" dark onToggleDark={() => {}} />
    </div>
  );
}

export function NoSignOut() {
  return (
    <div
      style={{
        width: 220,
        background: "hsl(214 77% 19%)",
        padding: 12,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        height: 160,
      }}
    >
      <SidebarFooter
        userEmail="vvelez@sjhamill.com"
        signOutUrl={false}
        dark={false}
        onToggleDark={() => {}}
      />
    </div>
  );
}
