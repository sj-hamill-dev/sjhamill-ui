import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@sjhamill/ui";

export function Default() {
  return (
    <div style={{ maxWidth: 480 }}>
      <Alert>
        <AlertTitle>Data refreshed</AlertTitle>
        <AlertDescription>
          All direct cost transactions have been synced from Procore.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function Destructive() {
  return (
    <div style={{ maxWidth: 480 }}>
      <Alert variant="destructive">
        <AlertTitle>Sync failed</AlertTitle>
        <AlertDescription>
          12 transactions could not be posted. Review the failed items below.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function Warning() {
  return (
    <div style={{ maxWidth: 480 }}>
      <Alert variant="warning">
        <AlertTitle>Budget threshold exceeded</AlertTitle>
        <AlertDescription>
          3 cost codes are over 90% of their approved budget.
        </AlertDescription>
      </Alert>
    </div>
  );
}
