import React from "react";
import { TeamRolesTable } from "@sjhamill/ui";

const MEMBERS = [
  { id: "1", name: "Valery Briceno", email: "vvelez@sjhamill.com", role: "admin" as const, initials: "VB", projectsLabel: "All (17)", lastActive: "Just now" },
  { id: "2", name: "Jake Daniels", email: "jake.daniels@sjhamill.com", role: "pm" as const, initials: "JD", projectsLabel: "4 assigned", lastActive: "2 min ago" },
  { id: "3", name: "Maria Kim", email: "maria.kim@sjhamill.com", role: "executive" as const, initials: "MK", projectsLabel: "All (17)", lastActive: "1 hr ago" },
  { id: "4", name: "Sam Patel", email: "sam.patel@sjhamill.com", role: "viewer" as const, initials: "SP", projectsLabel: "2 assigned", lastActive: "Yesterday" },
];

export function Default() {
  return (
    <div style={{ maxWidth: 720 }}>
      <TeamRolesTable members={MEMBERS} />
    </div>
  );
}

export function WithInviteAndRoleClick() {
  return (
    <div style={{ maxWidth: 720 }}>
      <TeamRolesTable members={MEMBERS} onInvite={() => {}} onRoleClick={() => {}} />
    </div>
  );
}
