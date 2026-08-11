import React from "react";
import { ViewAsPicker } from "@sjhamill/ui";

const SELF = { id: "self", name: "Valery Briceno", email: "vvelez@sjhamill.com", role: "admin" as const, initials: "VB" };
const TARGETS = [
  { id: "1", name: "Jake Daniels", email: "jake.daniels@sjhamill.com", role: "pm" as const, initials: "JD", hint: "4 projects" },
  { id: "2", name: "Maria Kim", email: "maria.kim@sjhamill.com", role: "executive" as const, initials: "MK" },
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
