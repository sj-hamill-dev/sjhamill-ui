import React from "react";
import { ViewAsBanner } from "@sjhamill/ui";

export function Warning() {
  return (
    <div style={{ maxWidth: 680 }}>
      <ViewAsBanner
        targetLabel="Jake Daniels (PM)"
        permissionsHint="4 projects visible"
        signedInAs="vvelez@sjhamill.com"
        onExit={() => {}}
      />
    </div>
  );
}

export function StaleTarget() {
  return (
    <div style={{ maxWidth: 680 }}>
      <ViewAsBanner targetLabel="Unknown" tone="destructive" onExit={() => {}}>
        <div className="text-sm font-semibold text-destructive">
          <span className="font-bold">View-As target unavailable.</span> This user no longer has
          access.
        </div>
      </ViewAsBanner>
    </div>
  );
}
