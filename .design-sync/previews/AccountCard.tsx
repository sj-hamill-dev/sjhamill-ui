import React from "react";
import { AccountCard } from "@sjhamill/ui";

export function Default() {
  return (
    <div style={{ maxWidth: 520, border: "1px solid hsl(215 20% 86%)", borderRadius: 8 }}>
      <AccountCard
        email="vvelez@sjhamill.com"
        role="admin"
        avatarInitials="VB"
        authProvider="Google"
      />
    </div>
  );
}

export function WithDescription() {
  return (
    <div style={{ maxWidth: 520, border: "1px solid hsl(215 20% 86%)", borderRadius: 8 }}>
      <AccountCard
        email="jake.daniels@sjhamill.com"
        role="pm"
        avatarInitials="JD"
        description="4 projects assigned"
      />
    </div>
  );
}
