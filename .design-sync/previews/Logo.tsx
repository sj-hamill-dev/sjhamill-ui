import React from "react";
import { Logo } from "@sjhamill/ui";

// `Logo` defaults to /sj-hamill-logo.png and /sjh-extended-logo-white.png,
// which are served from each CONSUMER app's public/ directory. The preview
// host has no public/, so the defaults render a broken image here. The PNGs
// are deliberately absent from this repo (a32d23b removed them; 8a4ecae
// explains why), so the previews pass their own marks via lightSrc/darkSrc.
//
// These are lightweight SVG stand-ins at the real mark's 3.02:1 aspect ratio.
// They exist to exercise sizing and light/dark placement — they are NOT the
// brand artwork. See .design-sync/NOTES.md.
const MARK_NAVY =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDIgMTAwIiB3aWR0aD0iMzAyIiBoZWlnaHQ9IjEwMCI+PHRleHQgeD0iMCIgeT0iNTIiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCdUaW1lcyBOZXcgUm9tYW4nLHNlcmlmIiBmb250LXNpemU9IjQ2IiBsZXR0ZXItc3BhY2luZz0iMSIgZmlsbD0iIzBiMjk1NCI+U0ogSEFNSUxMPC90ZXh0Pjx0ZXh0IHg9IjIiIHk9IjgwIiBmb250LWZhbWlseT0iSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTUiIGxldHRlci1zcGFjaW5nPSI3LjIiIGZpbGw9IiMwYjI5NTQiPkNPTlNUUlVDVElPTjwvdGV4dD48L3N2Zz4=";

const MARK_WHITE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDIgMTAwIiB3aWR0aD0iMzAyIiBoZWlnaHQ9IjEwMCI+PHRleHQgeD0iMCIgeT0iNTIiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCdUaW1lcyBOZXcgUm9tYW4nLHNlcmlmIiBmb250LXNpemU9IjQ2IiBsZXR0ZXItc3BhY2luZz0iMSIgZmlsbD0iI2ZmZmZmZiI+U0ogSEFNSUxMPC90ZXh0Pjx0ZXh0IHg9IjIiIHk9IjgwIiBmb250LWZhbWlseT0iSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTUiIGxldHRlci1zcGFjaW5nPSI3LjIiIGZpbGw9IiNmZmZmZmYiPkNPTlNUUlVDVElPTjwvdGV4dD48L3N2Zz4=";

export { MARK_NAVY, MARK_WHITE };

export function LightMark() {
  return (
    <div style={{ padding: 16, background: "hsl(0 0% 100%)" }}>
      <Logo lightSrc={MARK_NAVY} style={{ height: 32 }} />
    </div>
  );
}

export function DarkMark() {
  return (
    <div style={{ padding: 16, background: "hsl(217 45% 15%)" }}>
      <Logo dark darkSrc={MARK_WHITE} style={{ height: 32 }} />
    </div>
  );
}
