import React from "react";
import { Logo } from "@sjhamill/ui";

// Note: references external image files (/sj-hamill-logo.png,
// /sjh-extended-logo-white.png) that don't exist in the bundle context —
// expect a floor card here until placeholder images are added. See
// .design-sync/NOTES.md.

export function LightMark() {
  return (
    <div style={{ padding: 16, background: "hsl(0 0% 100%)" }}>
      <Logo style={{ height: 32 }} />
    </div>
  );
}

export function DarkMark() {
  return (
    <div style={{ padding: 16, background: "hsl(217 45% 15%)" }}>
      <Logo dark style={{ height: 32 }} />
    </div>
  );
}
