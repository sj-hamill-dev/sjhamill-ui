import React from "react";
import { ViewAsPicker } from "@sjhamill/ui";

const SELF = { id: "self", name: "Valery Briceno", email: "vvelez@sjhamill.com", role: "admin" as const, initials: "VB" };
const TARGETS = [
  { id: "1", name: "Jake Daniels", email: "jake.daniels@sjhamill.com", role: "pm" as const, initials: "JD", hint: "4 projects" },
  { id: "2", name: "Maria Kim", email: "maria.kim@sjhamill.com", role: "executive" as const, initials: "MK" },
];

// Since #17, ViewAsTarget.email is optional: a target can stand for a ROLE
// rather than a person. The row then shows only the role pill + hint, with no
// "·" separator. Keep a role target in the fixtures so that path stays covered.
const ROLE_TARGETS = [
  ...TARGETS,
  { id: "role-pm", name: "Any Project Manager", role: "pm" as const, initials: "PM", hint: "role-based target" },
  { id: "role-viewer", name: "Any Viewer", role: "viewer" as const, initials: "VW" },
];

export function ViewingSelf() {
  return (
    <div style={{ maxWidth: 560, border: "1px solid hsl(215 20% 86%)", borderRadius: 8 }}>
      <ViewAsPicker self={SELF} currentTarget={SELF} targets={TARGETS} onSelect={() => {}} />
    </div>
  );
}

export function ImpersonatingTarget() {
  return (
    <div style={{ maxWidth: 560, border: "1px solid hsl(215 20% 86%)", borderRadius: 8 }}>
      <ViewAsPicker
        self={SELF}
        currentTarget={TARGETS[0]}
        targets={TARGETS}
        onSelect={() => {}}
        onExit={() => {}}
      />
    </div>
  );
}

/** Role targets carry no email — the row falls back to the role pill + hint alone. */
export function RoleTargets() {
  return (
    <div style={{ maxWidth: 560, border: "1px solid hsl(215 20% 86%)", borderRadius: 8 }}>
      <ViewAsPicker
        self={SELF}
        currentTarget={ROLE_TARGETS[2]}
        targets={ROLE_TARGETS}
        onSelect={() => {}}
        onExit={() => {}}
      />
    </div>
  );
}
